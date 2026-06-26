import Link from "next/link";

interface PillLinkProps {
  href: string;
  filled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function PillLink({
  href,
  filled = true,
  className = "",
  children,
}: PillLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-ambit text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-300 ease-out-expo sm:px-8 sm:text-xs sm:tracking-[0.2em] ${
        filled
          ? "bg-xamani-wine text-xamani-silver hover:shadow-glow-wine"
          : "border border-xamani-silver/30 bg-transparent text-xamani-silver hover:border-xamani-silver/60"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
