"use client";

import { motion } from "framer-motion";
import type { ModeloStep } from "./data";
import { ROADMAP_VIEWBOX } from "./data";

interface ModeloStepNodeProps {
  step: ModeloStep;
  visible: boolean;
}

export default function ModeloStepNode({ step, visible }: ModeloStepNodeProps) {
  const leftPct = (step.node.x / ROADMAP_VIEWBOX.width) * 100;
  const topPct = (step.node.y / ROADMAP_VIEWBOX.height) * 100;

  return (
    <motion.div
      className="pointer-events-none absolute z-[1]"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1.2 : 0.75,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        translateX: "-50%",
        translateY: "-50%",
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
    </motion.div>
  );
}
