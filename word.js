// Keep the source document's header and citation, and add the Notes column.
function makeWordDocument(report) {
  const escapeXml = text => text.replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu, "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const encoder = new TextEncoder();
  const parts = Object.fromEntries(Object.entries(s4Template.wordParts)
    .map(([name, base64]) => [name, templateBytes(base64)]));
  const widths = s4Template.widths.map(width => Math.round(width * 20));

  function cell(text, width, { span = 1, bold = false, shade = false } = {}) {
    const properties = '<w:tcPr><w:tcW w:w="' + width + '" w:type="dxa"/>' +
      (span > 1 ? '<w:gridSpan w:val="' + span + '"/>' : '') +
      (shade ? '<w:shd w:fill="BFE5F5"/>' : '') + '<w:vAlign w:val="top"/></w:tcPr>';
    const value = escapeXml(text).replace(/\r\n|\r|\n/g, '</w:t><w:br/><w:t xml:space="preserve">');
    return '<w:tc>' + properties +
      '<w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>' +
      '<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="19"/>' +
      (bold ? '<w:b/>' : '') + '</w:rPr><w:t xml:space="preserve">' + value +
      '</w:t></w:r></w:p></w:tc>';
  }
  const total = widths.reduce((sum, value) => sum + value, 0);
  const borders = ["top", "left", "bottom", "right", "insideH", "insideV"]
    .map(side => '<w:' + side + ' w:val="single" w:sz="4" w:color="000000"/>').join("");
  let table = '<w:tbl><w:tblPr><w:tblW w:w="' + total + '" w:type="dxa"/>' +
    '<w:tblLayout w:type="fixed"/><w:tblBorders>' + borders + '</w:tblBorders>' +
    '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="70" w:type="dxa"/>' +
    '<w:bottom w:w="60" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr>' +
    '<w:tblGrid>' + widths.map(width => '<w:gridCol w:w="' + width + '"/>').join("") + '</w:tblGrid>';
  table += '<w:tr><w:trPr><w:tblHeader/></w:trPr>' +
    cell("Section/item", widths[0] + widths[1], { span: 2, bold: true }) +
    ["Item\nnumber", "Recommendations", "Page\nnumber", "Notes"]
      .map((text, index) => cell(text, widths[index + 2], { bold: true })).join("") + '</w:tr>';
  let section = "";
  for (const row of templateRows(report)) {
    if (section !== row.group) {
      section = row.group;
      table += '<w:tr>' + cell(section, total, { span: 6, bold: true, shade: true }) + '</w:tr>';
    }
    table += '<w:tr>' + row.cells.map((text, index) => cell(text, widths[index])).join("") + '</w:tr>';
  }
  table += '</w:tbl>';
  const documentXml = new TextDecoder().decode(parts["word/document.xml"])
    .replace(/\{\{(MANUSCRIPT|TABLE)\}\}/g, (_, key) => key === "TABLE" ? table :
      escapeXml(report.manuscript).replace(/\r\n|\r|\n/g, '</w:t><w:br/><w:t xml:space="preserve">'));
  parts["word/document.xml"] = encoder.encode(documentXml);
  return zipParts(parts);
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipParts(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const directory = [];
  let offset = 0;
  let directorySize = 0;
  for (const [path, content] of Object.entries(files)) {
    const name = encoder.encode(path);
    const data = content;
    const checksum = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(12, 33, true);
    local.setUint32(14, checksum, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    chunks.push(local.buffer, name, data);
    const central = new DataView(new ArrayBuffer(46));
    central.setUint32(0, 0x02014b50, true);
    central.setUint16(4, 20, true);
    central.setUint16(6, 20, true);
    central.setUint16(14, 33, true);
    central.setUint32(16, checksum, true);
    central.setUint32(20, data.length, true);
    central.setUint32(24, data.length, true);
    central.setUint16(28, name.length, true);
    central.setUint32(42, offset, true);
    directory.push(central.buffer, name);
    directorySize += 46 + name.length;
    offset += 30 + name.length + data.length;
  }
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, directory.length / 2, true);
  end.setUint16(10, directory.length / 2, true);
  end.setUint32(12, directorySize, true);
  end.setUint32(16, offset, true);
  return new Blob([...chunks, ...directory, end.buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  });
}
