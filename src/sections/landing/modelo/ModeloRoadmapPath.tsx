"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ROADMAP_PATH, ROADMAP_TAIL, ROADMAP_VIEWBOX } from "./data";

const SILVER = "#babab9";
const WINE = "#771335";

interface ModeloRoadmapPathProps {
  progress: MotionValue<number>;
}

export default function ModeloRoadmapPath({ progress }: ModeloRoadmapPathProps) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 ${ROADMAP_VIEWBOX.width} ${ROADMAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        d={ROADMAP_PATH}
        fill="none"
        stroke={SILVER}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.22}
      />
      <motion.path
        d={ROADMAP_PATH}
        fill="none"
        stroke={WINE}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
        }}
      />
      <path
        d={ROADMAP_TAIL}
        fill="none"
        stroke={SILVER}
        strokeWidth={1.5}
        strokeDasharray="6 10"
        strokeLinecap="round"
        opacity={0.3}
      />
    </svg>
  );
}
