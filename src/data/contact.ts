export const XAMANI_WHATSAPP_PHONE = "525551406721";

export const WHATSAPP_JOIN_MESSAGE = "Quiero ser Xamani, dame mas información";

export const WHATSAPP_ASESORIA_MESSAGE = "Busco una asesoria";

export const WHATSAPP_JOIN_URL = `https://wa.me/${XAMANI_WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_JOIN_MESSAGE
)}`;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${XAMANI_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function isWhatsAppUrl(href: string) {
  return href.includes("wa.me");
}

/** Abre WhatsApp de forma fiable en iOS, Android y desktop. */
export function openWhatsAppUrl(url: string) {
  if (typeof window === "undefined") return;

  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    window.matchMedia("(pointer: coarse)").matches;

  if (isMobile) {
    window.location.assign(url);
    return;
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(url);
  }
}

export function buildAsesoriaWhatsAppUrl(fullName = "") {
  const trimmed = fullName.trim();
  const message = trimmed
    ? `${WHATSAPP_ASESORIA_MESSAGE}. Mi nombre es ${trimmed}`
    : WHATSAPP_ASESORIA_MESSAGE;

  return buildWhatsAppUrl(message);
}

export const WHATSAPP_ASESORIA_URL = buildAsesoriaWhatsAppUrl();
