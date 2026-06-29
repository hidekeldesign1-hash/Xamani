"use client";

import { memo } from "react";
import type { ModeloStep } from "./data";
import { ROADMAP_VIEWBOX } from "./data";
import { getStepDepthStyle } from "./roadmapDepth";
import {
  getNodeMotionStyle,
  getStepMotionTransition,
  ROADMAP_DEPTH_EASE,
} from "./roadmapScrollState";

interface ModeloStepNodeProps {
  step: ModeloStep;
  visible: boolean;
  activeStepId: string | null;
  isMobile: boolean;
}

function ModeloStepNode({
  step,
  visible,
  activeStepId,
  isMobile,
}: ModeloStepNodeProps) {
  const leftPct = (step.node.x / ROADMAP_VIEWBOX.width) * 100;
  const topPct = (step.node.y / ROADMAP_VIEWBOX.height) * 100;
  const depth = getStepDepthStyle(step.id, activeStepId, visible);
  const isFocused = visible && step.id === activeStepId;
  const motionStyle = getNodeMotionStyle(depth, visible, isFocused);
  const transition = getStepMotionTransition(isMobile);

  return (
    <div
      className="roadmap-step-node pointer-events-none absolute z-[1] will-change-transform"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        ...motionStyle,
        transition: `opacity ${transition.duration}s ${ROADMAP_DEPTH_EASE}, transform ${transition.duration}s ${ROADMAP_DEPTH_EASE}, filter ${transition.duration}s ${ROADMAP_DEPTH_EASE}`,
      }}
    >
      {visible && (
        <div
          className="absolute inset-0 -m-3 rounded-full bg-xamani-wine/55"
          aria-hidden="true"
        />
      )}
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        className="relative"
        aria-hidden="true"
      >
        <circle
          cx={7}
          cy={7}
          r={5.5}
          fill="none"
          stroke="#babab9"
          strokeWidth={1.5}
          opacity={visible ? 0.7 : 0.35}
        />
        <circle
          cx={7}
          cy={7}
          r={4}
          fill="#771335"
          opacity={visible ? 1 : 0}
        />
      </svg>
      <span className="sr-only">{step.title}</span>
    </div>
  );
}

export default memo(ModeloStepNode);
