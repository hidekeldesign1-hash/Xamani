import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-xamani-wine text-xamani-silver hover:bg-xamani-wine-muted border border-xamani-wine",
  outline:
    "bg-transparent text-xamani-silver border border-xamani-silver/40 hover:border-xamani-silver",
  ghost: "bg-transparent text-xamani-silver hover:text-white",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-pill px-6 py-3 font-ambit text-sm uppercase tracking-widest transition-colors duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
