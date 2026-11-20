const statuses = {
  "": "Awaiting review",
  reported: "Reported",
  partial: "Partial",
  missing: "Not reported",
  na: "Not applicable"
};
const items = groups.flatMap(([, entries]) => entries);
const ids = new Set(items.map(([id]) => id));
const storageKey = "succeed-digital:" + source.version + ":1";
const fields = { status: 10, location: 500, notes: 10000, justification: 10000 };
const byId = id => document.getElementById(id);
const views = new Map();
const sections = [];
let pdfExporting = false;

function make(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function parseBackup(json) {
  const value = JSON.parse(json);
  if (!value || value.schema !== 1 || value.guideline !== source.version ||
      typeof value.title !== "string" || value.title.length > 500 ||
      !value.responses || typeof value.responses !== "object" || Array.isArray(value.responses)) {
    throw new Error("Select a SUCCEED Digital JSON backup for this edition of the checklist.");
  }
  const responses = {};
  for (const [id, response] of Object.entries(value.responses)) {
    if (!ids.has(id) || !response || !Object.hasOwn(statuses, response.status) ||
        Object.entries(fields).some(([key, limit]) => typeof response[key] !== "string" || response[key].length > limit)) {
      throw new Error("The backup contains an invalid checklist response.");
    }
    responses[id] = Object.fromEntries(Object.keys(fields).map(key => [key, response[key]]));
  }
  return { schema: 1, guideline: source.version, title: value.title, responses };
}

let state = { schema: 1, guideline: source.version, title: "", responses: {} };
let hasStoredDraft = false;
try {
  const saved = localStorage.getItem(storageKey);
  if (saved !== null) {
    hasStoredDraft = true;
    state = parseBackup(saved);
  }
  // Probe write access even when the browser has no draft yet.
  if (!hasStoredDraft) localStorage.setItem(storageKey, JSON.stringify(state));
} catch {
  byId("save-state").textContent = "Browser storage could not be loaded. Changes may be lost when you close or reload this page.";
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    byId("save-state").textContent = "Changes are saved in this browser.";
  } catch {
    byId("save-state").textContent = "Browser storage is unavailable or full. Changes may be lost when you close or reload this page.";
  }
}

function responseFor(id) {
  return state.responses[id] ?? { status: "", location: "", notes: "", justification: "" };
}

function pendingReason(response) {
  return response.status === "na" && !response.justification.trim();
}

function recorded(id) {
  const response = responseFor(id);
  return Boolean(response.status) && !pendingReason(response);
}

function updateProgress() {
  const counts = Object.fromEntries(Object.keys(statuses).map(key => [key, 0]));
  let pending = 0;
  for (const [id] of items) {
    const response = responseFor(id);
    if (pendingReason(response)) pending++;
    else counts[response.status]++;
  }
  const done = items.length - counts[""] - pending;
  byId("progress-count").querySelector("strong").textContent = done + " / " + items.length;
  byId("progress").value = done;
  byId("counts").replaceChildren();
  for (const [label, count] of [...Object.entries(statuses).slice(1).map(([key, label]) => [label, counts[key]]),
    ["Needs justification", pending], [statuses[""], counts[""]]]) {
    const row = make("div");
    row.append(make("dt", label), make("dd", String(count)));
    byId("counts").append(row);
  }
  for (const { entries, counter } of sections) {
    counter.textContent = entries.filter(([id]) => recorded(id)).length + "/" + entries.length;
  }
  updateDownloadAvailability();
}

function updateDownloadAvailability() {
  const remaining = items.filter(([id]) => !recorded(id)).length;
  byId("word").disabled = remaining > 0;
  byId("pdf").disabled = remaining > 0 || pdfExporting;
  byId("download-status").textContent = remaining
    ? "Downloads are unavailable. Record all 33 responses to continue (" + remaining +
      " remaining). Choose a status for every item and provide a justification for every Not applicable response. Reported, Partial and Not reported each count as a recorded response."
    : "All 33 responses are recorded. Word and PDF downloads are available.";
}

function applyFilter() {
  const filter = byId("filter").value;
  let total = 0;
  for (const { entries, section } of sections) {
    let visible = 0;
    for (const [id, , , , conditional] of entries) {
      const { status } = responseFor(id);
      const show = filter === "all" || (filter === "open" && !recorded(id)) ||
        (filter === "gap" && ["partial", "missing"].includes(status)) ||
        (filter === "conditional" && conditional);
      views.get(id).card.hidden = !show;
      if (show) visible++;
    }
    section.hidden = !visible;
    total += visible;
  }
  byId("empty").hidden = total !== 0;
}

function updateCard(id) {
  const { reasonLabel, controls, error } = views.get(id);
  const response = responseFor(id);
  const required = response.status === "na";
  reasonLabel.hidden = !required;
  controls.justification.required = required;
  controls.justification.setAttribute("aria-invalid", String(pendingReason(response)));
  error.hidden = !pendingReason(response);
}

function buildCard([id, title, recommendation, subgroup, conditional]) {
  const card = make("article");
  card.setAttribute("aria-labelledby", id + "-heading");
  const heading = make("h4", undefined, "item-heading");
  heading.id = id + "-heading";
  heading.append(make("span", id, "id"), make("span", title));
  if (conditional) heading.append(make("span", "Contains a condition", "conditional"));
  if (subgroup) card.append(make("p", subgroup, "subgroup"));
  card.append(heading, make("p", recommendation, "recommendation"));
  const explanation = explanations[id];
  const helpButton = make("button", "Explanation", "explanation-button");
  helpButton.type = "button";
  helpButton.setAttribute("aria-label", id + " explanation");
  helpButton.setAttribute("aria-expanded", "false");
  helpButton.setAttribute("aria-controls", id + "-explanation");
  const helpPanel = make("div", undefined, "explanation-panel");
  helpPanel.id = id + "-explanation";
  helpPanel.hidden = true;
  helpPanel.setAttribute("role", "region");
  helpPanel.setAttribute("aria-label", id + " explanation");
  const sourceLink = make("a", "Read the explanation and examples in the source PDF");
  sourceLink.href = "resources/SUCCEED-explanations-and-examples.pdf#page=" + explanation.page;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener";
  sourceLink.setAttribute("aria-label", id + " source explanation and examples (opens in a new tab)");
  helpPanel.append(
    make("p", explanation.text),
    make("p", "Gogovor et al. The SUCCEED reporting guideline: explanations and examples, p. " +
      explanation.pages + ". Reference numbers refer to the bibliography in the source document.", "explanation-source"),
    sourceLink
  );
  helpButton.addEventListener("click", () => {
    helpPanel.hidden = !helpPanel.hidden;
    helpButton.setAttribute("aria-expanded", String(!helpPanel.hidden));
    helpButton.textContent = helpPanel.hidden ? "Explanation" : "Hide explanation";
  });
  heading.append(helpButton);
  card.append(helpPanel);
  const form = make("div", undefined, "fields");
  const controls = {};
  const labels = {};
  for (const [key, caption, tag] of [
    ["status", "Reporting status", "select"],
    ["location", "Manuscript page / section", "input"],
    ["justification", "Why is this item not applicable? (required)", "textarea"],
    ["notes", "Notes", "textarea"]
  ]) {
    const label = make("label", caption, tag === "textarea" ? "wide" : "");
    const control = make(tag);
    control.id = id + "-" + key;
    control.setAttribute("aria-label", id + " " + caption);
    if (key === "status") {
      for (const [value, text] of Object.entries(statuses)) {
        const option = make("option", text);
        option.value = value;
        control.append(option);
      }
    } else {
      control.maxLength = fields[key];
    }
    control.addEventListener("input", () => {
      state.responses[id] = { ...responseFor(id), [key]: control.value };
      updateCard(id);
      updateProgress();
      save();
    });
    // Keep an edited item visible while the user is still inside its card.
    label.append(control);
    form.append(label);
    controls[key] = control;
    labels[key] = label;
  }
  const error = make("span", "Enter a justification to record this response and export the checklist.", "error");
  error.id = id + "-reason-error";
  controls.justification.setAttribute("aria-describedby", error.id);
  labels.justification.append(error);
  card.addEventListener("focusout", event => {
    if (!card.contains(event.relatedTarget)) applyFilter();
  });
  card.append(form);
  views.set(id, { card, controls, reasonLabel: labels.justification, error, helpButton, helpPanel });
  return card;
}

for (const [name, entries] of groups) {
  const section = make("section", undefined, "group");
  section.id = name.toLowerCase().replaceAll(" ", "-");
  const heading = make("h3", name);
  heading.tabIndex = -1;
  const link = make("a", name);
  link.href = "#" + section.id;
  const counter = make("span");
  link.append(counter);
  link.addEventListener("click", event => {
    event.preventDefault();
    if (section.hidden) {
      byId("filter").value = "all";
      applyFilter();
    }
    section.scrollIntoView();
    heading.focus({ preventScroll: true });
  });
  section.append(heading, ...entries.map(buildCard));
  byId("checklist").append(section);
  byId("nav").append(link);
  sections.push({ entries, section, counter, link });
}

function populate() {
  byId("title").value = state.title;
  for (const [id, { controls }] of views) {
    for (const [key, control] of Object.entries(controls)) control.value = responseFor(id)[key];
    updateCard(id);
  }
  updateProgress();
  applyFilter();
}

const attribution = byId("source-text");
attribution.append(make("p", "SUCCEED reporting aid: Progress counts recorded responses and does not assess reporting or study quality."), make("p", source.citation), make("p", source.attribution));
const links = make("p");
for (const [label, href] of [["BMJ article", source.doi], ["Table 1 PDF", source.table],
  ["OSF resources", source.osf], ["EQUATOR checklist", source.equator], ["CC BY-NC 4.0", source.license]]) {
  if (links.childNodes.length) links.append(" · ");
  const anchor = make("a", label);
  anchor.href = href;
  links.append(anchor);
}
attribution.append(links, make("p", source.footnote));

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = make("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function report() {
  const manuscript = "Manuscript: " + (state.title.trim() || "Untitled");
  const endMatter = [
    source.citation, source.table, source.attribution, source.license,
    "OSF resources: " + source.osf, source.footnote
  ];
  const body = groups.map(([name, entries]) => ({
    name,
    entries: entries.map(([id, title, recommendation, subgroup]) => {
      const response = responseFor(id);
      const status = statuses[response.status] + (pendingReason(response) ? " (justification required)" : "");
      const values = [
        "Reporting status: " + status,
        "Manuscript page / section: " + (response.location.trim() || "—")
      ];
      if (response.status === "na") values.push("Justification: " + (response.justification.trim() || "—"));
      values.push("Notes: " + (response.notes.trim() || "—"));
      return { id, location: response.location, status: response.status,
        heading: id + " · " + (subgroup ? subgroup + " / " : "") + title, recommendation, values };
    })
  }));
  return { title: "SUCCEED Digital · Checklist", manuscript, body, endMatter };
}

function buildPrintReport() {
  const { title, manuscript, body, endMatter } = report();
  const target = byId("print-report");
  const manuscriptTitle = make("p");
  manuscriptTitle.append(make("strong", manuscript));
  target.replaceChildren(make("h1", title), manuscriptTitle);
  for (const { name, entries } of body) {
    target.append(make("h2", name));
    for (const { heading, recommendation, values } of entries) {
      const article = make("article");
      article.append(make("h3", heading), make("p", recommendation),
        ...values.map(value => make("p", value, "response")));
      target.append(article);
    }
  }
  target.append(make("h2", "Guideline & sources"), ...endMatter.map(text => make("p", text)));
}

function canExport() {
  const entry = items.find(([id]) => pendingReason(responseFor(id))) ||
    items.find(([id]) => !recorded(id));
  if (!entry) return true;
  byId("filter").value = "all";
  applyFilter();
  const needsReason = pendingReason(responseFor(entry[0]));
  byId("notice").textContent = "Record all 33 responses before downloading. " +
    (needsReason ? "Enter the required justification for " : "Choose a reporting status for ") + entry[0] + ".";
  views.get(entry[0]).controls[needsReason ? "justification" : "status"].focus();
  return false;
}

byId("filter").addEventListener("change", applyFilter);
byId("title").addEventListener("input", event => {
  state.title = event.target.value;
  save();
});
byId("word").addEventListener("click", () => {
  if (!canExport()) return;
  download(makeWordDocument(report()), "succeed-checklist.docx");
  byId("notice").textContent = "Word checklist prepared.";
});
byId("pdf").addEventListener("click", async () => {
  if (pdfExporting || !canExport()) return;
  pdfExporting = true;
  updateDownloadAvailability();
  byId("notice").textContent = "Preparing PDF…";
  try {
    download(await makePdfDocument(report()), "succeed-checklist.pdf");
    byId("notice").textContent = "PDF checklist prepared.";
  } catch (error) {
    byId("notice").textContent = "PDF export could not finish. Please try again. " + error.message;
  } finally {
    pdfExporting = false;
    updateDownloadAvailability();
  }
});
window.addEventListener("beforeprint", buildPrintReport);
populate();
