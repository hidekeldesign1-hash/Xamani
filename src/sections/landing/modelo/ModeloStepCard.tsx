"use client";

import { motion } from "framer-motion";
import type { ModeloStep } from "./data";
import { MOBILE_CARD_TOP, MOBILE_PATH_GUTTER, ROADMAP_VIEWBOX } from "./data";
import { useIsMobile } from "./useIsMobile";

interface ModeloStepCardProps {
  step: ModeloStep;
  visible: boolean;
}

export default function ModeloStepCard({ step, visible }: ModeloStepCardProps) {
  const isMobile = useIsMobile();
  const isLeft = step.side === "left";

  const desktopTopPct = (step.node.y / ROADMAP_VIEWBOX.height) * 100;
  const topPct = isMobile ? MOBILE_CARD_TOP[step.id] : desktopTopPct;

  const gutter = MOBILE_PATH_GUTTER;

  const positionStyle = isMobile
    ? isLeft
      ? {
          left: "0.5rem",
          right: `calc(50% + ${gutter})`,
          width: "auto",
        }
      : {
          left: `calc(50% + ${gutter})`,
          right: "0.5rem",
          width: "auto",
        }
    : isLeft
      ? {
          right: "calc(50% + min(13.5rem, 29vw))",
          width: "min(21rem, calc(50% - min(13.5rem, 29vw) - 1.25rem))",
        }
      : {
          left: "calc(50% + min(13.5rem, 29vw))",
          width: "min(21rem, calc(50% - min(13.5rem, 29vw) - 1.25rem))",
        };

  return (
    <motion.article
      className={`absolute isolate z-10 max-md:z-[8] max-md:translate-y-0 md:max-w-[21rem] md:-translate-y-1/2 ${
        isMobile || !isLeft ? "text-left" : "text-right"
      }`}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : isMobile ? 10 : 16,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        top: `${topPct}%`,
        ...positionStyle,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {isMobile && (
        <div
          className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 z-0 rounded-xl border border-xamani-navy-light/20 bg-xamani-navy-deep/75 backdrop-blur-[8px]"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 max-md:px-2.5 max-md:py-2">
        <p className="mb-1 font-ambit text-[0.58rem] font-semibold tracking-[0.28em] text-xamani-wine max-md:mb-0.5 md:text-xs">
          {step.number}
        </p>
        <h3 className="text-balance font-ambit text-[0.62rem] font-bold uppercase leading-[1.25] tracking-[0.04em] text-xamani-silver max-md:leading-[1.3] md:text-sm md:leading-snug md:tracking-[0.05em]">
          {step.title}
        </h3>
        <p className="mt-1.5 font-archia text-[0.58rem] leading-[1.45] text-xamani-silver-muted max-md:mt-1 max-md:leading-[1.4] md:mt-2 md:text-sm md:leading-[1.7]">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}
