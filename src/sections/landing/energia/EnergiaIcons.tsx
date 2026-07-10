import type { EnergiaTypeId } from "./energiaTypes";

const CYAN = "#6ec4d9";
const MINT = "#7dcf8a";
const PINK = "#e05c8e";
const WHITE = "#f2f2f2";

/** Foto 4 — pirámide / trapecio dentro de círculos */
function MeyajIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <circle cx="60" cy="60" r="50" stroke={CYAN} strokeWidth="1.35" />
      <circle cx="60" cy="60" r="44" stroke={WHITE} strokeWidth="0.9" strokeOpacity="0.75" />

      {/* Estrella superior */}
      <g transform="translate(60 12)" stroke={WHITE} strokeWidth="1.1" strokeLinecap="round">
        <path d="M0-4.2v8.4M-4.2 0h8.4M-3-3l6 6M3-3l-6 6" />
      </g>

      {/* Trapecio escalonado */}
      <path d="M44 36 L76 36 L84 92 L36 92 Z" stroke={CYAN} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M46 50h28M44 64h32M40 78h40" stroke={WHITE} strokeWidth="1.35" strokeLinecap="round" />
      <path d="M60 32v64" stroke={PINK} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Foto 1 — arcos cian/magenta + eje central */
function NepaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <circle cx="60" cy="60" r="50" stroke={WHITE} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="42" stroke={MINT} strokeWidth="1.15" />

      {/* Puntos polares */}
      <rect x="57.2" y="15.2" width="5.6" height="5.6" rx="1.2" fill={MINT} transform="rotate(22 60 18)" />
      <rect x="57.2" y="99.2" width="5.6" height="5.6" rx="1.2" fill={MINT} transform="rotate(22 60 102)" />

      {/* Arcos laterales */}
      <path
        d="M48 28c-16 12-18 36-8 52 5 8 13 14 20 16"
        stroke={CYAN}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M72 28c16 12 18 36 8 52-5 8-13 14-20 16"
        stroke={PINK}
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Eje y óvalo central */}
      <path d="M60 26v68" stroke={WHITE} strokeWidth="1.35" strokeLinecap="round" />
      <ellipse cx="60" cy="60" rx="8" ry="18" stroke={WHITE} strokeWidth="1.25" />
    </svg>
  );
}

/** Foto 3 — ojo estilizado */
function BalamIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      {/* Párpados */}
      <path d="M28 58c12-18 28-26 32-26s20 8 32 26" stroke={WHITE} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M28 62c12 18 28 26 32 26s20-8 32-26" stroke={WHITE} strokeWidth="1.7" strokeLinecap="round" />

      {/* Extensiones laterales */}
      <path d="M18 60h12M90 60h12" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />

      {/* Pestañas / rayos */}
      <path d="M60 28v-12M48 32l-6-10M72 32l6-10" stroke={PINK} strokeWidth="1.6" strokeLinecap="round" />

      {/* Iris / pupila */}
      <circle cx="60" cy="56" r="13" stroke={PINK} strokeWidth="2.1" />
      <circle cx="60" cy="52" r="5.2" fill={CYAN} />
      <path d="M48 64c6 7 18 10 24 0" stroke={CYAN} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Foto 2 — constelación / red geométrica */
function KanIcon({ className = "" }: { className?: string }) {
  const nodes = {
    top: { x: 60, y: 28 },
    midL: { x: 32, y: 48 },
    midR: { x: 88, y: 48 },
    lowL: { x: 40, y: 78 },
    lowR: { x: 80, y: 78 },
    bottom: { x: 60, y: 96 },
  };

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <circle cx="60" cy="60" r="50" stroke={WHITE} strokeWidth="1.15" />
      <circle cx="60" cy="60" r="28" fill={CYAN} fillOpacity="0.06" />

      {/* Contorno azul */}
      <path
        d={`M${nodes.top.x} ${nodes.top.y}
            L${nodes.midL.x} ${nodes.midL.y}
            L${nodes.lowL.x} ${nodes.lowL.y}
            L${nodes.bottom.x} ${nodes.bottom.y}
            L${nodes.lowR.x} ${nodes.lowR.y}
            L${nodes.midR.x} ${nodes.midR.y}
            Z`}
        stroke={CYAN}
        strokeWidth="1.45"
        strokeLinejoin="round"
      />

      {/* Ejes magenta */}
      <path
        d={`M${nodes.top.x} ${nodes.top.y} L${nodes.bottom.x} ${nodes.bottom.y}
            M${nodes.midL.x} ${nodes.midL.y} L${nodes.midR.x} ${nodes.midR.y}
            M${nodes.lowL.x} ${nodes.lowL.y} L${nodes.lowR.x} ${nodes.lowR.y}`}
        stroke={PINK}
        strokeWidth="1.35"
        strokeLinecap="round"
      />

      {/* Nodos */}
      <Node cx={nodes.top.x} cy={nodes.top.y} ring={CYAN} />
      <Node cx={nodes.midL.x} cy={nodes.midL.y} ring={PINK} />
      <Node cx={nodes.midR.x} cy={nodes.midR.y} ring={PINK} />
      <Node cx={nodes.lowL.x} cy={nodes.lowL.y} ring={CYAN} />
      <Node cx={nodes.lowR.x} cy={nodes.lowR.y} ring={CYAN} />
      <Node cx={nodes.bottom.x} cy={nodes.bottom.y} ring={PINK} />

      {/* Puntos verdes de acento */}
      <circle cx="24" cy="40" r="2.1" fill={MINT} />
      <circle cx="96" cy="40" r="2.1" fill={MINT} />
      <circle cx="24" cy="84" r="2.1" fill={MINT} />
      <circle cx="96" cy="84" r="2.1" fill={MINT} />
    </svg>
  );
}

function Node({ cx, cy, ring }: { cx: number; cy: number; ring: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="5.2" stroke={ring} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="2.2" fill={WHITE} />
    </g>
  );
}

export function EnergiaTypeIcon({
  type,
  className = "h-28 w-28 sm:h-32 sm:w-32",
}: {
  type: EnergiaTypeId;
  className?: string;
}) {
  switch (type) {
    case "meyaj":
      return <MeyajIcon className={className} />;
    case "nepa":
      return <NepaIcon className={className} />;
    case "balam":
      return <BalamIcon className={className} />;
    case "kan":
      return <KanIcon className={className} />;
  }
}
