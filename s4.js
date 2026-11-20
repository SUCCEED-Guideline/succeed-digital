function templateBytes(base64) {
  return Uint8Array.from(atob(base64), character => character.charCodeAt(0));
}

function checklistEntries(report) {
  return report.body.flatMap(group => group.entries);
}

function templateLocation(entry) {
  const value = entry.location.trim();
  if (!value) return entry.status === "na" ? "N/A" : "—";
  return value;
}

function templateNotes(entry) {
  return entry.values.filter(value => !value.startsWith("Manuscript page / section:")).join("\n");
}

function templateRows(report) {
  const entries = new Map(checklistEntries(report).map(entry => [entry.id, entry]));
  return s4Template.rows.map(row => {
    const entry = entries.get(row.id);
    return { ...row, cells: [
      row.labels[0], row.labels[1] || "", row.id, row.recommendation,
      templateLocation(entry), templateNotes(entry)
    ] };
  });
}
