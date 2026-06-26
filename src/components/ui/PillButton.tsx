import { type ButtonHTMLAttributes } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
}

export default function PillButton({
  filled = true,
  className = "",
  children,
  ...props
}: PillButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-pill px-8 py-3.5 font-ambit text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-out-expo ${
        filled
          ? "bg-xamani-wine text-xamani-silver hover:shadow-glow-wine"
          : "border border-xamani-silver/30 bg-transparent text-xamani-silver hover:border-xamani-silver/60"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
