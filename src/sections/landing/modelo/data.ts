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
    title: "Diagnóstico estratégico",
    description:
      "Mapeamos contexto, riesgos y oportunidades para definir un rumbo claro y accionable.",
    node: { x: 98, y: 64 },
    side: "left",
    threshold: 0.1,
  },
  {
    id: "02",
    number: "02",
    title: "Arquitectura de valor",
    description:
      "Diseñamos modelos de negocio, procesos y cultura alineados al propósito de la organización.",
    node: { x: 298, y: 168 },
    side: "right",
    threshold: 0.28,
  },
  {
    id: "03",
    number: "03",
    title: "Implementación guiada",
    description:
      "Acompañamos la ejecución con metodologías probadas y seguimiento de indicadores clave.",
    node: { x: 72, y: 316 },
    side: "left",
    threshold: 0.48,
  },
  {
    id: "04",
    number: "04",
    title: "Acompañamiento continuo",
    description:
      "Sostenemos el crecimiento con revisiones periódicas, mentoría y ajustes estratégicos.",
    node: { x: 302, y: 464 },
    side: "right",
    threshold: 0.68,
  },
  {
    id: "05",
    number: "05",
    title: "Evolución y trascendencia",
    description:
      "Maximizamos el impacto a largo plazo asegurando la permanencia y el valor de la marca en el tiempo.",
    node: { x: 66, y: 612 },
    side: "left",
    threshold: 0.86,
  },
];

export const CTA_THRESHOLD = 0.9;

export const MODELO_CTA_COPY =
  "Un modelo integral que combina análisis profundo, ejecución disciplinada y acompañamiento humano para generar impacto real.";

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
