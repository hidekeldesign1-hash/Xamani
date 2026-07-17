import { NextResponse } from "next/server";

const SHEETS_WEBAPP_URL = process.env.GOOGLE_SHEETS_ENERGIA_WEBAPP_URL;

type SheetsPayload = {
  action: "intake" | "resultado";
  nombre?: string;
  telefono?: string;
  correo?: string;
  dominante?: string;
  complementaria?: string;
};

async function postToGoogleSheets(payload: SheetsPayload) {
  if (!SHEETS_WEBAPP_URL) {
    throw new Error("Falta configurar GOOGLE_SHEETS_ENERGIA_WEBAPP_URL.");
  }

  // Apps Script responde 302; si se sigue el redirect con POST se convierte en GET y falla.
  // El registro se guarda en el POST inicial; el JSON llega con un GET al Location.
  const upstream = await fetch(SHEETS_WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "manual",
    cache: "no-store",
  });

  if (upstream.status === 401 || upstream.status === 403) {
    throw new Error(
      "El Web App de Google no está público. En Apps Script: Implementar → Administrar implementaciones → Acceso: Cualquiera."
    );
  }

  const location = upstream.headers.get("location");

  if (location) {
    const echo = await fetch(location, { method: "GET", cache: "no-store" });
    const raw = (await echo.text()).trim();

    if (
      raw.includes("No se encontró la función") ||
      raw.startsWith("<!DOCTYPE") ||
      raw.startsWith("<html")
    ) {
      throw new Error(
        "El Web App no tiene doPost publicado. Guarda el script e implementa una nueva versión."
      );
    }

    try {
      const parsed = JSON.parse(raw) as { ok?: boolean; error?: string };
      if (parsed.ok === false) {
        throw new Error(parsed.error || "Google Sheets rechazó el registro.");
      }
      return parsed;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { ok: true };
      }
      throw error;
    }
  }

  const raw = (await upstream.text()).trim();

  if (!upstream.ok) {
    throw new Error("No se pudo guardar en Google Sheets.");
  }

  if (
    raw.includes("No se encontró la función") ||
    raw.startsWith("<!DOCTYPE") ||
    raw.startsWith("<html")
  ) {
    throw new Error(
      "El Web App no tiene doPost publicado. Guarda el script e implementa una nueva versión."
    );
  }

  try {
    const parsed = JSON.parse(raw) as { ok?: boolean; error?: string };
    if (parsed.ok === false) {
      throw new Error(parsed.error || "Google Sheets rechazó el registro.");
    }
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { ok: true };
    }
    throw error;
  }
}

export async function POST(request: Request) {
  if (!SHEETS_WEBAPP_URL) {
    return NextResponse.json(
      { ok: false, error: "Falta configurar GOOGLE_SHEETS_ENERGIA_WEBAPP_URL." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const action = body.action === "resultado" ? "resultado" : "intake";
  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
  const telefono = typeof body.telefono === "string" ? body.telefono.trim() : "";
  const correo = typeof body.correo === "string" ? body.correo.trim() : "";
  const dominante = typeof body.dominante === "string" ? body.dominante.trim() : "";
  const complementaria =
    typeof body.complementaria === "string" ? body.complementaria.trim() : "";

  if (action === "intake") {
    if (!nombre || !telefono || !correo) {
      return NextResponse.json(
        { ok: false, error: "Nombre, teléfono y correo son obligatorios." },
        { status: 400 }
      );
    }
  } else if ((!correo && !telefono) || !dominante || !complementaria) {
    return NextResponse.json(
      {
        ok: false,
        error: "Correo o teléfono, dominante y complementaria son obligatorios.",
      },
      { status: 400 }
    );
  }

  try {
    await postToGoogleSheets({
      action,
      nombre,
      telefono,
      correo,
      dominante,
      complementaria,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error de conexión con Google Sheets.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
