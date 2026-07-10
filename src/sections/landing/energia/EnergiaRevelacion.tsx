"use client";

import { motion, useReducedMotion } from "framer-motion";
import Isotipo from "@/components/brand/Isotipo";
import { EnergiaTypeIcon } from "./EnergiaIcons";
import { ENERGIA_TYPES, type EnergiaResult } from "./energiaTypes";

interface EnergiaRevelacionProps {
  result: EnergiaResult;
}

export default function EnergiaRevelacion({ result }: EnergiaRevelacionProps) {
  const prefersReducedMotion = useReducedMotion();
  const dominant = ENERGIA_TYPES[result.dominant];
  const complementary = ENERGIA_TYPES[result.complementary];

  const ease = [0.22, 1, 0.36, 1] as const;
  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease },
        };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-2 pb-1 pt-9 text-center sm:px-3 sm:pb-3 sm:pt-11 md:pt-10">
      <motion.span
        className="inline-flex shrink-0 rounded-pill border border-white/20 px-4 py-1.5 font-archia text-[0.58rem] uppercase tracking-[0.28em] text-xamani-silver/85 sm:text-micro"
        {...fadeUp(0.05)}
      >
        Revelación
      </motion.span>

      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center py-1.5 sm:py-3">
        <motion.div className="shrink-0" {...fadeUp(0.15)}>
          <EnergiaTypeIcon
            type={dominant.id}
            className="h-[5rem] w-[5rem] sm:h-[6.75rem] sm:w-[6.75rem] md:h-[7.25rem] md:w-[7.25rem]"
          />
        </motion.div>

        <motion.p
          className="mt-4 shrink-0 font-archia text-[0.58rem] uppercase tracking-[0.28em] text-xamani-silver/70 sm:mt-6 sm:text-micro"
          {...fadeUp(0.25)}
        >
          Tu energía dominante es
        </motion.p>

        <motion.h2
          className="mt-2 shrink-0 font-ambit text-[clamp(1.65rem,6vw,2.6rem)] font-semibold uppercase leading-none tracking-[0.12em] sm:tracking-[0.14em]"
          style={{ color: dominant.accent }}
          {...fadeUp(0.32)}
        >
          {dominant.name}
        </motion.h2>

        <motion.p
          className="mt-2 shrink-0 font-archia text-[0.95rem] text-xamani-silver/80 sm:text-base"
          {...fadeUp(0.38)}
        >
          {dominant.shortLabel}
        </motion.p>

        <motion.div
          className="relative my-5 w-full max-w-[13rem] shrink-0 sm:my-6 sm:max-w-[15rem]"
          {...fadeUp(0.45)}
        >
          <div
            className="h-px w-full bg-gradient-to-r from-xamani-cyan via-xamani-silver/20 to-xamani-wine"
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-xamani-silver/70">
            <Isotipo className="h-full w-full" />
          </div>
        </motion.div>

        <motion.p
          className="shrink-0 font-archia text-[0.95rem] text-xamani-silver/80 sm:text-base"
          {...fadeUp(0.52)}
        >
          Energía complementaria:{" "}
          <span className="font-medium tracking-[0.08em] text-xamani-silver">
            {complementary.name}
          </span>
        </motion.p>
      </div>
    </div>
  );
}
