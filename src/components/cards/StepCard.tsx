interface StepCardProps {
  step: number;
  title: string;
  description: string;
  isActive?: boolean;
  onSelect?: () => void;
}

export default function StepCard({
  step,
  title,
  description,
  isActive = false,
  onSelect,
}: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-card border p-5 text-left transition-all duration-300 ease-out-expo ${
        isActive
          ? "border-xamani-cyan/40 bg-white/8 shadow-glow"
          : "border-white/10 bg-white/3 hover:border-white/20"
      }`}
    >
      <span className="mb-2 block font-ambit text-sm text-xamani-cyan">
        {String(step).padStart(2, "0")}
      </span>
      <h3 className="mb-2 font-ambit text-lg text-xamani-silver">{title}</h3>
      <p className="font-archia text-sm text-xamani-silver-muted">
        {description}
      </p>
    </button>
  );
}
