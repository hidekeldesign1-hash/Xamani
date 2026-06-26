"use client";

import { motion, type Variants } from "framer-motion";

interface ScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
  animateEntrance?: boolean;
  label?: string;
  labelPosition?: "above" | "below";
  variant?: "default" | "prominent";
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.85, ease: EASE },
  },
};

function ChevronDown({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.57)}
      viewBox="0 0 14 8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProminentGraphic() {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ y: [0, 7, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <span className="h-14 w-px bg-gradient-to-b from-transparent via-xamani-cyan/50 to-xamani-wine/90" />
      <motion.div
        className="flex flex-col items-center -space-y-1"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={22} className="text-xamani-cyan drop-shadow-[0_0_10px_rgba(110,196,217,0.45)]" />
        <ChevronDown size={22} className="text-xamani-silver" />
      </motion.div>
    </motion.div>
  );
}

function DefaultGraphic() {
  return (
    <>
      <span className="h-10 w-px bg-gradient-to-b from-xamani-silver/10 via-xamani-silver/40 to-xamani-silver/10" />
      <motion.span
        className="text-xamani-silver"
        animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown />
      </motion.span>
    </>
  );
}

export default function ScrollIndicator({
  className = "",
  onClick,
  animateEntrance = true,
  label,
  labelPosition = "above",
  variant = "default",
}: ScrollIndicatorProps) {
  const isProminent = variant === "prominent";
  const displayLabel = label ?? (isProminent ? "Descubrir..." : "Descubre");
  const ariaLabel = isProminent ? "Descubrir más contenido" : "Descubre más contenido";

  const labelEl = (
    <span
      className={
        isProminent
          ? "font-archia text-[0.62rem] tracking-[0.32em] text-xamani-silver/85 transition-colors group-hover:text-xamani-silver"
          : "font-archia text-[0.6rem] uppercase tracking-[0.4em] text-xamani-silver/70 transition-colors group-hover:text-xamani-silver sm:text-micro"
      }
    >
      {displayLabel}
    </span>
  );

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group flex cursor-pointer flex-col items-center border-0 bg-transparent p-2 ${
        isProminent ? "gap-2.5" : "gap-3"
      } ${className}`}
      aria-label={ariaLabel}
      initial={animateEntrance ? "hidden" : false}
      animate="visible"
      variants={fadeUp}
    >
      {labelPosition === "above" ? labelEl : null}

      {isProminent ? <ProminentGraphic /> : <DefaultGraphic />}

      {labelPosition === "below" ? labelEl : null}
    </motion.button>
  );
}
