export const XAMANI_WHATSAPP_PHONE = "525538988562";

export const XAMANI_PHONE_DISPLAY = "55 3898 8562";

export const XAMANI_PHONE_TEL = `tel:+${XAMANI_WHATSAPP_PHONE}`;

export const WHATSAPP_JOIN_MESSAGE = "Quiero ser Xamani, dame más información";

export const WHATSAPP_ASESORIA_MESSAGE = "Busco una asesoria";

export const WHATSAPP_ASESORIA_PHONE = "525573966005";

export const XAMANI_SOCIAL_LINKS = {
  instagram:
    "https://www.instagram.com/xamanimx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  tiktok: "https://www.tiktok.com/@xamanimx?_r=1&_t=ZS-97Xhc9NETmK",
  linkedin: "https://www.linkedin.com/company/holaxamani/",
} as const;

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

  return `https://wa.me/${WHATSAPP_ASESORIA_PHONE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_ASESORIA_URL = buildAsesoriaWhatsAppUrl();
