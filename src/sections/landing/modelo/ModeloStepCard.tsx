"use client";

import { memo } from "react";
import type { ModeloStep } from "./data";
import { MOBILE_CARD_TOP, MOBILE_PATH_GUTTER, ROADMAP_VIEWBOX } from "./data";
import { getStepDepthStyle } from "./roadmapDepth";
import {
  getStepMotionStyle,
  getStepMotionTransition,
  ROADMAP_DEPTH_EASE,
} from "./roadmapScrollState";

interface ModeloStepCardProps {
  step: ModeloStep;
  visible: boolean;
  activeStepId: string | null;
  isMobile: boolean;
}

function ModeloStepCard({
  step,
  visible,
  activeStepId,
  isMobile,
}: ModeloStepCardProps) {
  const isLeft = step.side === "left";
  const depth = getStepDepthStyle(step.id, activeStepId, visible);
  const motionStyle = getStepMotionStyle(depth, visible, isMobile);
  const transition = getStepMotionTransition(isMobile);

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
    <article
      className={`roadmap-step-card absolute isolate z-10 max-md:z-[8] max-md:translate-y-0 will-change-transform md:max-w-[21rem] ${
        isMobile || !isLeft ? "text-left" : "text-right"
      }`}
      style={{
        top: `${topPct}%`,
        ...positionStyle,
        ...motionStyle,
        pointerEvents: visible ? "auto" : "none",
        transition: `opacity ${transition.duration}s ${ROADMAP_DEPTH_EASE}, transform ${transition.duration}s ${ROADMAP_DEPTH_EASE}, filter ${transition.duration}s ${ROADMAP_DEPTH_EASE}`,
      }}
    >
      {isMobile && (
        <div
          className="roadmap-card-glass pointer-events-none absolute -inset-x-2 -inset-y-1.5 z-0 rounded-xl border border-xamani-navy-light/20 bg-xamani-navy-deep/75 backdrop-blur-[6px]"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 max-md:px-2.5 max-md:py-2">
        <p className="mb-1 font-ambit text-[0.58rem] font-semibold tracking-[0.28em] text-xamani-wine max-md:mb-0.5 md:text-xs">
          {step.number}
        </p>
        <h3 className="text-balance font-ambit text-[0.62rem] font-bold leading-[1.25] tracking-[0.02em] text-xamani-silver max-md:leading-[1.3] md:text-sm md:leading-snug">
          {step.title}
        </h3>
        <p className="mt-1.5 text-pretty font-archia text-[0.54rem] leading-[1.38] text-xamani-silver-muted max-md:mt-1 max-md:leading-[1.35] md:mt-2 md:text-[0.8125rem] md:leading-[1.55]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export default memo(ModeloStepCard, (prev, next) => {
  return (
    prev.visible === next.visible &&
    prev.activeStepId === next.activeStepId &&
    prev.isMobile === next.isMobile &&
    prev.step.id === next.step.id
  );
});
