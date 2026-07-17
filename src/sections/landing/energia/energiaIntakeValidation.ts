const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Códigos de país (E.164) reconocidos — evita ladas inventadas. */
const VALID_COUNTRY_CALLING_CODES = [
  "1",
  "7",
  "20",
  "27",
  "30",
  "31",
  "32",
  "33",
  "34",
  "36",
  "39",
  "40",
  "41",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "81",
  "82",
  "84",
  "86",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "98",
  "212",
  "213",
  "216",
  "218",
  "220",
  "221",
  "234",
  "351",
  "352",
  "353",
  "354",
  "358",
  "380",
  "381",
  "385",
  "386",
  "420",
  "421",
  "502",
  "503",
  "504",
  "505",
  "506",
  "507",
  "508",
  "509",
  "591",
  "592",
  "593",
  "595",
  "598",
] as const;

const COUNTRY_CODES_BY_LENGTH = [...VALID_COUNTRY_CALLING_CODES].sort(
  (a, b) => b.length - a.length
);

export interface EnergiaIntakeData {
  nombre: string;
  whatsapp: string;
  email: string;
}

export interface EnergiaIntakeErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
}

export interface ParsedWhatsApp {
  countryCode: string;
  nationalNumber: string;
  e164: string;
}

/** Permite edición libre: +, dígitos y espacios. */
export function sanitizeWhatsAppInput(value: string): string {
  const cleaned = value.replace(/[^\d+\s]/g, "");
  const digitsAndSpaces = cleaned.replace(/\+/g, "");
  const hasLeadingPlus = cleaned.trimStart().startsWith("+");
  return hasLeadingPlus ? `+${digitsAndSpaces}` : digitsAndSpaces;
}

function formatNationalMexico(digits: string): string {
  const national = digits.slice(0, 10);
  if (national.length <= 2) return national;
  if (national.length <= 6) return `${national.slice(0, 2)} ${national.slice(2)}`;
  return `${national.slice(0, 2)} ${national.slice(2, 6)} ${national.slice(6)}`;
}


/** Formato legible mientras se escribe: +52 55 0000 0000 (máx. 10 dígitos nacionales). */
export function formatWhatsAppDisplay(value: string): string {
  const sanitized = sanitizeWhatsAppInput(value);
  if (!sanitized) return "";

  const hasLeadingPlus = sanitized.trimStart().startsWith("+");
  const digits = sanitized.replace(/\D/g, "");

  if (!digits) return hasLeadingPlus ? "+" : "";

  if (hasLeadingPlus && digits.startsWith("52")) {
    const national = digits.slice(2, 12);
    const nationalFormatted = formatNationalMexico(national);
    return nationalFormatted ? `+52 ${nationalFormatted}` : "+52";
  }

  if (hasLeadingPlus) {
    const limited = digits.slice(0, 12);
    return `+${limited}`;
  }

  return formatNationalMexico(digits);
}

export function countWhatsAppDigitsBefore(value: string, cursor: number): number {
  return value.slice(0, cursor).replace(/\D/g, "").length;
}

export function getWhatsAppCursorPosition(formatted: string, digitsBeforeCursor: number): number {
  if (digitsBeforeCursor <= 0) {
    return formatted.startsWith("+") ? 1 : 0;
  }

  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index])) {
      seen += 1;
      if (seen >= digitsBeforeCursor) {
        return index + 1;
      }
    }
  }

  return formatted.length;
}

export function parseWhatsAppNumber(input: string): ParsedWhatsApp | null {
  const digits = input.replace(/\D/g, "");
  if (!digits) return null;

  // 10 dígitos sin prefijo internacional → se asume México (+52).
  if (digits.length === 10) {
    return {
      countryCode: "52",
      nationalNumber: digits,
      e164: `52${digits}`,
    };
  }

  for (const code of COUNTRY_CODES_BY_LENGTH) {
    if (!digits.startsWith(code)) continue;

    const nationalNumber = digits.slice(code.length);
    if (!nationalNumber) return null;

    return {
      countryCode: code,
      nationalNumber,
      e164: `${code}${nationalNumber}`,
    };
  }

  return null;
}

export function isValidCountryCallingCode(code: string): boolean {
  return (VALID_COUNTRY_CALLING_CODES as readonly string[]).includes(code);
}


export function validateWhatsAppNumber(input: string): string | undefined {
  const trimmed = input.trim();
  if (!trimmed) {
    return "Ingresa tu número de WhatsApp.";
  }

  const digits = trimmed.replace(/\D/g, "");

  // 10 dígitos nacionales, o +52 + 10 dígitos.
  const national =
    digits.length === 12 && digits.startsWith("52")
      ? digits.slice(2)
      : digits.length === 10
        ? digits
        : null;

  if (!national || !/^\d{10}$/.test(national)) {
    return "Ingresa un número de 10 dígitos.";
  }

  return undefined;
}

export function validateEnergiaIntake(data: EnergiaIntakeData): EnergiaIntakeErrors {
  const errors: EnergiaIntakeErrors = {};
  const nombre = data.nombre.trim();

  if (!nombre) {
    errors.nombre = "Ingresa tu nombre.";
  } else if (nombre.length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres.";
  }

  const whatsappError = validateWhatsAppNumber(data.whatsapp);
  if (whatsappError) {
    errors.whatsapp = whatsappError;
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  return errors;
}

export const ENERGIA_INTAKE_STORAGE_KEY = "xamani-energia-intake";

export type EnergiaIntakeStored = {
  nombre: string;
  whatsapp: string;
  email: string;
  savedAt: string;
};

export function saveEnergiaIntake(data: EnergiaIntakeData) {
  const parsed = parseWhatsAppNumber(data.whatsapp.trim());
  if (!parsed) {
    throw new Error("WhatsApp inválido al guardar.");
  }

  const payload: EnergiaIntakeStored = {
    nombre: data.nombre.trim(),
    whatsapp: parsed.e164,
    email: data.email.trim(),
    savedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(ENERGIA_INTAKE_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function loadEnergiaIntake(): EnergiaIntakeStored | null {
  try {
    const raw = sessionStorage.getItem(ENERGIA_INTAKE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EnergiaIntakeStored;
  } catch {
    return null;
  }
}
