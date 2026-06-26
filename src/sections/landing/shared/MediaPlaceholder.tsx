interface MediaPlaceholderProps {
  label?: string;
  className?: string;
  aspect?: "square" | "portrait" | "landscape" | "hero";
}

const aspectMap = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  hero: "aspect-[4/3] min-h-[220px] sm:aspect-[16/10] sm:min-h-[280px]",
};

export default function MediaPlaceholder({
  label,
  className = "",
  aspect = "landscape",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative w-full max-w-full overflow-hidden rounded-card-lg border border-white/10 bg-gradient-to-br from-xamani-navy-light/40 via-xamani-navy-deep to-xamani-navy ${aspectMap[aspect]} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
        <div className="absolute left-1/2 top-1/2 h-full w-full max-h-[120%] max-w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,transparent_20%,#113345_70%)] sm:max-h-[140%] sm:max-w-[140%]" />
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 block h-[42%] w-px origin-bottom bg-xamani-silver sm:h-1/2"
            style={{ transform: `translate(-50%, -100%) rotate(${i * 45}deg)` }}
          />
        ))}
      </div>
      {label ? (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-archia text-[0.5rem] uppercase tracking-[0.28em] text-xamani-silver/40 sm:bottom-4 sm:left-4 sm:translate-x-0 sm:text-[0.55rem] sm:tracking-[0.3em]">
          {label}
        </span>
      ) : null}    </div>
  );
}
