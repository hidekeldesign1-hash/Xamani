export interface ModeloStep {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Posición del nodo en el viewBox del SVG */
  node: { x: number; y: number };
  side: "left" | "right";
  /** Umbral de scroll (0–1) para activar el paso */
  threshold: number;
}

export const ROADMAP_VIEWBOX = { width: 400, height: 820 } as const;

/**
 * Zigzag compacto — cada vértice pasa por los nodos de los 5 pasos.
 */
export const ROADMAP_PATH = `
  M 98 64
  H 268
  C 298 64 298 88 298 112
  V 168
  C 298 188 278 188 258 188
  H 98
  C 72 188 72 212 72 236
  V 316
  C 72 336 92 336 112 336
  H 272
  C 302 336 302 360 302 384
  V 464
  C 302 484 282 484 262 484
  H 92
  C 66 484 66 508 66 532
  V 612
`;

export const ROADMAP_TAIL = `M 66 612 V 760`;

export const MODELO_STEPS: ModeloStep[] = [
  {
    id: "01",
    number: "01",
    title: "La Llamada",
    description:
      "Todo gran cambio empieza con una llamada interna: la sensación de que estás hecho para algo más.",
    node: { x: 98, y: 64 },
    side: "left",
    threshold: 0.1,
  },
  {
    id: "02",
    number: "02",
    title: "La Iniciación",
    description:
      "Te damos estructura, metodología y herramientas para construir bases sólidas desde el día 1.",
    node: { x: 298, y: 168 },
    side: "right",
    threshold: 0.28,
  },
  {
    id: "03",
    number: "03",
    title: "La Travesía",
    description:
      "Te acompañamos en cada reto hasta convertir la incertidumbre en confianza mediante coaching personalizado y acompañamiento estratégico.",
    node: { x: 72, y: 316 },
    side: "left",
    threshold: 0.48,
  },
  {
    id: "04",
    number: "04",
    title: "La Maestría",
    description:
      "El conocimiento eleva tu valor y expande tu potencial.",
    node: { x: 302, y: 464 },
    side: "right",
    threshold: 0.68,
  },
  {
    id: "05",
    number: "05",
    title: "El Legado",
    description:
      "Construyes una empresa, una marca y una vida con propósito.",
    node: { x: 66, y: 612 },
    side: "left",
    threshold: 0.86,
  },
];

/** Desktop: CTA tras leer el paso 05 — isotipo cerca del nodo final. */
export const DESKTOP_CTA_THRESHOLD = 0.97;
/** Legacy alias — móvil usa scroll raw, no este valor. */
export const CTA_THRESHOLD = 0.9;

export const MODELO_CTA_COPY =
  "Nosotros te decimos cómo, tú decides cuándo";

export const ROADMAP_ASPECT_RATIO = `${ROADMAP_VIEWBOX.width} / ${ROADMAP_VIEWBOX.height}`;

/** Separación horizontal texto ↔ línea del mapa (móvil) */
export const MOBILE_PATH_GUTTER = "2.85rem";

/** Posiciones verticales de tarjetas en móvil (%) — alineadas al nodo, sin solapar */
export const MOBILE_CARD_TOP: Record<string, number> = {
  "01": 5,
  "02": 17,
  "03": 34,
  "04": 52,
  "05": 69,
};
