"use client";

import { motion, useReducedMotion } from "framer-motion";
import Isotipo from "@/components/brand/Isotipo";
import {
  ENERGIA_QUIZ_TOTAL,
  QUIZ_MILESTONE_HOLD_MS,
  type QuizMilestoneConfig,
} from "./energiaQuizConfig";

function formatQuestionNumber(value: number) {
  return String(value).padStart(2, "0");
}

interface EnergiaQuizMilestoneProps {
  milestone: QuizMilestoneConfig;
}

export default function EnergiaQuizMilestone({ milestone }: EnergiaQuizMilestoneProps) {
  const prefersReducedMotion = useReducedMotion();
  const progress = (milestone.afterQuestion / ENERGIA_QUIZ_TOTAL) * 100;
  const holdSeconds = QUIZ_MILESTONE_HOLD_MS / 1000;

  return (
    <div className="flex h-full w-full flex-col items-center text-center">
      <div className="flex w-full shrink-0 flex-col items-center">
        <div className="relative mb-4 flex h-5 items-center justify-center sm:mb-5 sm:h-6">
          <div
            className="absolute right-full mr-2 h-px w-8 bg-gradient-to-r from-transparent to-xamani-cyan sm:w-10"
            aria-hidden="true"
          />
          <div className="h-5 w-5 text-xamani-silver/80 sm:h-6 sm:w-6">
            <Isotipo className="h-full w-full" />
          </div>
          <div
            className="absolute left-full ml-2 h-px w-8 bg-gradient-to-l from-transparent to-xamani-wine sm:w-10"
            aria-hidden="true"
          />
        </div>

        <p className="font-archia text-[0.58rem] uppercase tracking-[0.28em] text-xamani-silver/70 sm:text-micro">
          {formatQuestionNumber(milestone.afterQuestion)} / {ENERGIA_QUIZ_TOTAL}
        </p>

        <div className="mt-3 w-full max-w-md sm:mt-4 md:max-w-xl">
          <div
            className="h-1.5 overflow-hidden rounded-pill bg-white/[0.08]"
            role="progressbar"
            aria-valuenow={milestone.afterQuestion}
            aria-valuemin={0}
            aria-valuemax={ENERGIA_QUIZ_TOTAL}
            aria-label={`Progreso del cuestionario: ${milestone.afterQuestion} de ${ENERGIA_QUIZ_TOTAL}`}
          >
            <div
              className="h-full rounded-pill bg-gradient-to-r from-xamani-cyan via-xamani-cyan/85 to-xamani-cyan/70 shadow-[0_0_16px_rgba(110,196,217,0.45)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center px-2 sm:px-1">
        <h2 className="mx-auto max-w-[18rem] text-balance font-ambit text-[1.35rem] font-light leading-snug tracking-[0.02em] text-xamani-silver sm:max-w-3xl sm:text-[clamp(1.05rem,2.8vw,1.75rem)] md:whitespace-nowrap md:leading-none">
          {milestone.title}
        </h2>

        <p className="mt-4 max-w-[17rem] text-balance font-archia text-[0.95rem] leading-snug text-xamani-silver/65 sm:mt-3 sm:max-w-xl sm:text-[clamp(0.8rem,1.8vw,1.05rem)] md:max-w-none md:whitespace-nowrap md:leading-none">
          {milestone.subtitle}
        </p>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center">
        <div className="w-full max-w-2xl md:max-w-3xl">
          <div
            className="h-1.5 w-full overflow-hidden rounded-pill bg-white/[0.08]"
            role="progressbar"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiempo restante antes de continuar"
          >
            <motion.div
              className="h-full rounded-pill bg-gradient-to-r from-xamani-wine/75 via-xamani-wine to-[#9e1a42] shadow-[0_0_16px_rgba(119,19,53,0.55)]"
              initial={{ width: prefersReducedMotion ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: prefersReducedMotion ? 0 : holdSeconds,
                ease: "linear",
              }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-1 sm:mt-9">
          <p className="font-archia text-xs uppercase tracking-[0.18em] text-xamani-silver/55 sm:text-sm">
            Continúa automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}
