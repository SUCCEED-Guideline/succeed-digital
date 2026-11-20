// Landscape checklist with full responses in the Page number and Notes columns.
async function makePdfDocument(report) {
  const { PDFDocument, StandardFonts, rgb } = PDFLib;
  const pdf = await PDFDocument.create();
  const logo = await pdf.embedPng(templateBytes(s4Template.logo));
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = 841.8;
  const pageHeight = 595.4;
  const margin = 42;
  const bottom = 42;
  const widths = s4Template.widths;
  const totalWidth = widths.reduce((sum, width) => sum + width, 0);
  const black = rgb(0, 0, 0);
  const blue = rgb(0.75, 0.90, 0.96);
  const size = 9;
  const lineHeight = 12;
  const padding = 4;
  let page;
  let y;
  let currentSection = "";

  function metrics(text, font, fontSize) {
    try {
      font.encodeText(text.replace(/[\r\n\t]/g, " "));
      return { width: value => font.widthOfTextAtSize(value, fontSize) };
    } catch {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const cssFont = (font === bold ? "bold " : "") + fontSize + "px Arial, sans-serif";
      context.font = cssFont;
      return { width: value => context.measureText(value).width, canvas, cssFont };
    }
  }

  function wrap(text, width, font = regular, fontSize = size) {
    const clean = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
      .replace(/\r\n?/g, "\n").replace(/\t/g, "    ");
    const measure = metrics(clean, font, fontSize);
    const lines = [];
    for (const paragraph of clean.split("\n")) {
      let line = "";
      for (const word of paragraph.split(/(?<=\s)/u)) {
        if (line && measure.width(line + word) > width) {
          lines.push(line.trimEnd());
          line = "";
        }
        for (const character of word) {
          if (line && measure.width(line + character) > width) {
            lines.push(line.trimEnd());
            line = "";
          }
          line += character;
        }
      }
      lines.push(line.trimEnd());
    }
    return lines;
  }

  async function textLine(text, x, top, font = regular, fontSize = size) {
    if (!text) return;
    const measure = metrics(text, font, fontSize);
    if (!measure.canvas) {
      page.drawText(text, { x, y: top - fontSize, font, size: fontSize, color: black });
      return;
    }
    const canvas = measure.canvas;
    canvas.width = Math.ceil(Math.max(1, measure.width(text)) * 3);
    canvas.height = Math.ceil(fontSize * 1.5 * 3);
    const context = canvas.getContext("2d");
    context.scale(3, 3);
    context.font = measure.cssFont;
    context.fillStyle = "#000000";
    context.textBaseline = "alphabetic";
    context.fillText(text, 0, fontSize);
    const image = await pdf.embedPng(canvas.toDataURL("image/png"));
    page.drawImage(image, { x, y: top - canvas.height / 3, width: canvas.width / 3, height: canvas.height / 3 });
  }

  async function drawCells(lines, columnWidths, height, font = regular, fill) {
    let x = margin;
    for (let index = 0; index < columnWidths.length; index++) {
      page.drawRectangle({ x, y: y - height, width: columnWidths[index], height,
        borderWidth: 0.4, borderColor: black, ...(fill ? { color: fill } : {}) });
      for (const [line, text] of lines[index].entries()) {
        await textLine(text, x + padding, y - padding - line * lineHeight, font);
      }
      x += columnWidths[index];
    }
    y -= height;
  }

  async function sectionHeading(continued = false) {
    await drawCells([[currentSection + (continued ? " (continued)" : "")]], [totalWidth], 20, bold, blue);
  }

  async function newPage(table = true, first = false) {
    page = pdf.addPage([pageWidth, pageHeight]);
    page.drawImage(logo, { x: margin, y: pageHeight - 59, width: 240, height: 31 });
    y = pageHeight - 70;
    if (first) {
      for (const line of wrap(report.manuscript, totalWidth, bold, 10)) {
        await textLine(line, margin, y, bold, 10);
        y -= 14;
      }
      y -= 8;
    }
    if (table) {
      const headings = ["Section/item", "Item\nnumber", "Recommendations", "Page\nnumber", "Notes"];
      const headerWidths = [widths[0] + widths[1], ...widths.slice(2)];
      const lines = headings.map((text, index) => wrap(text, headerWidths[index] - padding * 2, bold));
      await drawCells(lines, headerWidths, Math.max(...lines.map(row => row.length)) * lineHeight + padding * 2, bold);
      if (currentSection) await sectionHeading(true);
    }
  }

  await newPage(true, true);
  for (const row of templateRows(report)) {
    const lines = row.cells.map((text, index) => wrap(text, widths[index] - padding * 2));
    const length = Math.max(...lines.map(cell => cell.length));
    const fullHeight = length * lineHeight + padding * 2;
    if (row.group !== currentSection) {
      if (y - Math.min(fullHeight, 120) - 20 < bottom) {
        currentSection = "";
        await newPage();
      }
      currentSection = row.group;
      await sectionHeading();
    }
    // Keep ordinary rows together, and split unusually long responses safely.
    if (fullHeight <= 400 && y - fullHeight < bottom) await newPage();
    let offset = 0;
    while (offset < length) {
      const capacity = Math.floor((y - bottom - padding * 2) / lineHeight);
      if (capacity < 1) {
        await newPage();
        continue;
      }
      const count = Math.min(capacity, length - offset);
      const chunk = lines.map(cell => cell.slice(offset, offset + count));
      if (offset > 0 && chunk[2].length === 0) chunk[2] = [row.id];
      await drawCells(chunk, widths, count * lineHeight + padding * 2);
      offset += count;
      if (offset < length) await newPage();
    }
  }
  const citationLines = wrap(source.citation, totalWidth);
  if (y - citationLines.length * lineHeight - 24 < bottom) await newPage(false);
  y -= 16;
  for (const line of citationLines) {
    await textLine(line, margin, y);
    y -= lineHeight;
  }
  pdf.getPages().forEach((sheet, index) => {
    const number = String(index + 1);
    sheet.drawText(number, { x: (pageWidth - regular.widthOfTextAtSize(number, 9)) / 2,
      y: 22, size: 9, font: regular, color: black });
  });
  pdf.setTitle(report.title);
  return new Blob([await pdf.save()], { type: "application/pdf" });
}
