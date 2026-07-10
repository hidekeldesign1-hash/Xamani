"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

/** Largo (horizontal) y alto del flujo Energía XAMANI — intake, cuestionario, etc. */
export const ENERGIA_PROCESS_CARD_WIDTH =
  "mx-auto w-full max-w-[22rem] sm:max-w-md md:max-w-[43rem] lg:max-w-[47rem] xl:max-w-[52rem]";

export const ENERGIA_PROCESS_CARD_PANEL =
  "relative flex min-h-0 flex-col overflow-hidden rounded-card-lg border border-white/12 bg-[#0b1520]/94 px-5 py-7 shadow-glass max-md:backdrop-blur-sm md:bg-[#0b1520]/88 md:backdrop-blur-glass sm:px-7 sm:py-8 md:px-11 md:py-6 lg:px-12 lg:py-6";

const CARD_HOVER_GLOW =
  "0 0 36px rgba(110,196,217,0.16), 0 0 52px rgba(119,19,53,0.1), 0 0 0 1px rgba(255,255,255,0.1)";

function BackArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M14 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface EnergiaProcessCardProps {
  children: ReactNode;
  className?: string;
  onBack?: () => void;
  backLabel?: string;
  cardPulse?: boolean;
}

export default function EnergiaProcessCard({
  children,
  className = "",
  onBack,
  backLabel = "Regresar al paso anterior",
  cardPulse = false,
}: EnergiaProcessCardProps) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const allowHoverEffects = !isMobile && !prefersReducedMotion;

  return (
    <div className={ENERGIA_PROCESS_CARD_WIDTH}>
      <motion.div
        className={`${ENERGIA_PROCESS_CARD_PANEL} ${className}`}
        animate={
          cardPulse && !prefersReducedMotion
            ? isMobile
              ? {
                  boxShadow: [
                    "0 0 0 rgba(110,196,217,0)",
                    "0 0 28px rgba(110,196,217,0.2)",
                    "0 0 0 rgba(110,196,217,0)",
                  ],
                }
              : {
                  scale: [1, 1.018, 1],
                  boxShadow: [
                    "0 0 0 rgba(110,196,217,0)",
                    "0 0 32px rgba(110,196,217,0.18)",
                    "0 0 0 rgba(110,196,217,0)",
                  ],
                }
            : { scale: 1 }
        }
        whileHover={
          allowHoverEffects
            ? {
                boxShadow: CARD_HOVER_GLOW,
                borderColor: "rgba(255,255,255,0.22)",
              }
            : undefined
        }
        transition={{
          scale: { duration: 0.58, ease: [0.22, 1, 0.36, 1], times: [0, 0.42, 1] },
          boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          borderColor: { duration: 0.35, ease: "easeOut" },
        }}
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="absolute left-3 top-3 z-20 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-xamani-silver/65 transition-colors duration-300 ease-out-expo hover:border-xamani-cyan/50 hover:bg-xamani-cyan/10 hover:text-xamani-cyan hover:shadow-glow focus-visible:outline-none focus-visible:border-xamani-cyan/55 focus-visible:bg-xamani-cyan/12 focus-visible:text-xamani-cyan focus-visible:shadow-glow active:scale-95 active:border-xamani-cyan/65 active:bg-xamani-cyan/15 active:text-xamani-cyan sm:left-5 sm:top-5 sm:h-9 sm:w-9 md:left-6 md:top-5"
          >
            <BackArrowIcon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
          </button>
        ) : null}

        <div
          className="pointer-events-none absolute bottom-8 left-0 top-8 w-px bg-gradient-to-b from-xamani-cyan/70 via-xamani-cyan/25 to-transparent max-md:bottom-10 max-md:top-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-8 right-0 top-8 w-px bg-gradient-to-b from-xamani-wine/70 via-xamani-wine/25 to-transparent max-md:bottom-10 max-md:top-10"
          aria-hidden="true"
        />
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </motion.div>
    </div>
  );
}
