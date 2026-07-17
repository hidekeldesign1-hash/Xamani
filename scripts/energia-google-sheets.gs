/**
 * Pega este código completo en Apps Script de tu hoja (Código.gs),
 * guarda e implementa una NUEVA VERSIÓN del Web App.
 *
 * Columnas esperadas en la fila 1:
 * A: Nombre | B: telefono | C: correo | D: fecha | E: dominante | F: complementaria
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const action = data.action || "intake";

    if (action === "resultado") {
      const correo = String(data.correo || "")
        .trim()
        .toLowerCase();
      const telefono = String(data.telefono || "").trim();
      const dominante = data.dominante || "";
      const complementaria = data.complementaria || "";

      const values = sheet.getDataRange().getValues();
      let rowIndex = -1;

      for (var i = values.length - 1; i >= 1; i--) {
        var rowCorreo = String(values[i][2] || "")
          .trim()
          .toLowerCase();
        var rowTel = String(values[i][1] || "").trim();
        if ((correo && rowCorreo === correo) || (telefono && rowTel === telefono)) {
          rowIndex = i + 1;
          break;
        }
      }

      if (rowIndex === -1) {
        sheet.appendRow([
          data.nombre || "",
          telefono,
          data.correo || "",
          new Date(),
          dominante,
          complementaria,
        ]);
      } else {
        sheet.getRange(rowIndex, 5).setValue(dominante);
        sheet.getRange(rowIndex, 6).setValue(complementaria);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ ok: true, updated: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.nombre || "",
      data.telefono || "",
      data.correo || "",
      new Date(),
      "",
      "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
