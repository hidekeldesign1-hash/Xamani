interface LogoPatternLayerProps {
  className?: string;
  /** Tamaño de cada celda del patrón en px */
  tileSize?: number;
  /** Opacidad del patrón (0–1). Por defecto muy sutil. */
  opacity?: number;
}

/**
 * Capa decorativa de isotipos repetidos — patrón de marca XAMANI
 */
export default function LogoPatternLayer({
  className = "",
  tileSize = 76,
  opacity = 0.045,
}: LogoPatternLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundImage: "url('/images/isotipo.png')",
          backgroundSize: `${tileSize}px ${tileSize}px`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: opacity * 0.85,
          backgroundImage: "url('/images/isotipo.png')",
          backgroundSize: `${tileSize}px ${tileSize}px`,
          backgroundRepeat: "repeat",
          backgroundPosition: `${tileSize / 2}px ${tileSize / 2}px`,
        }}
      />
    </div>
  );
}
