"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ROADMAP_PATH, ROADMAP_VIEWBOX } from "./data";

const GLYPH_SIZE = 42;
const WINE = "#771335";
const GLYPH_SRC = "/images/geroglifico-mapa.png";

function pointOnPath(path: SVGPathElement | null, progress: number) {
  if (!path) {
    return { x: 98, y: 64, angle: 0 };
  }

  const length = path.getTotalLength();
  const t = Math.max(0, Math.min(1, progress));
  const at = path.getPointAtLength(length * t);
  const ahead = path.getPointAtLength(Math.min(length, length * t + 5));
  const angle =
    (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;

  return { x: at.x, y: at.y, angle };
}

interface ModeloRoadmapGlyphProps {
  progress: MotionValue<number>;
}

export default function ModeloRoadmapGlyph({ progress }: ModeloRoadmapGlyphProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const transform = useTransform(progress, (p) => {
    const { x, y, angle } = pointOnPath(pathRef.current, p);
    const half = GLYPH_SIZE / 2;
    return `translate(${x - half} ${y - half}) rotate(${angle} ${half} ${half})`;
  });

  const opacity = useTransform(progress, [0, 0.012], [0.85, 1]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox={`0 0 ${ROADMAP_VIEWBOX.width} ${ROADMAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path ref={pathRef} d={ROADMAP_PATH} fill="none" stroke="none" />
      <motion.g style={{ transform, opacity }}>
        <foreignObject
          x={0}
          y={0}
          width={GLYPH_SIZE}
          height={GLYPH_SIZE}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundColor: WINE,
              WebkitMaskImage: `url(${GLYPH_SRC})`,
              maskImage: `url(${GLYPH_SRC})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter: "drop-shadow(0 0 5px rgba(119, 19, 53, 0.55))",
            }}
          />
        </foreignObject>
      </motion.g>
    </svg>
  );
}
