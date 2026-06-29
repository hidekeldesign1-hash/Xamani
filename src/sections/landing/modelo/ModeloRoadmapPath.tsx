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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full filter drop-shadow-[0_18px_22px_rgba(119,19,53,0.28)]"
      viewBox={`0 0 ${ROADMAP_VIEWBOX.width} ${ROADMAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="roadmap-wine-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="10"
            floodColor="rgba(119, 19, 53, 0.45)"
          />
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="3"
            floodColor="rgba(27, 106, 133, 0.2)"
          />
        </filter>
      </defs>
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
        filter="url(#roadmap-wine-glow)"
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
