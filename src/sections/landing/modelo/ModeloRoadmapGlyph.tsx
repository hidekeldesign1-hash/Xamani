"use client";

import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { ROADMAP_PATH, ROADMAP_VIEWBOX } from "./data";

const GLYPH_SIZE = 42;
const WINE = "#771335";
const GLYPH_SRC = "/images/geroglifico-mapa.png";

function applyGlyphTransform(
  path: SVGPathElement | null,
  group: SVGGElement | null,
  progress: number
) {
  if (!path || !group) return;

  const length = path.getTotalLength();
  const t = Math.max(0, Math.min(1, progress));
  const atLen = length * t;
  const at = path.getPointAtLength(atLen);
  const ahead = path.getPointAtLength(Math.min(length, atLen + 5));
  const angle =
    (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
  const half = GLYPH_SIZE / 2;

  group.setAttribute(
    "transform",
    `translate(${at.x - half} ${at.y - half}) rotate(${angle} ${half} ${half})`
  );
  group.style.opacity = t <= 0.002 ? "0.85" : "1";
}

interface ModeloRoadmapGlyphProps {
  progress: MotionValue<number>;
}

export default function ModeloRoadmapGlyph({ progress }: ModeloRoadmapGlyphProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const glyphRef = useRef<SVGGElement>(null);

  const syncGlyph = (value: number) => {
    applyGlyphTransform(pathRef.current, glyphRef.current, value);
  };

  useLayoutEffect(() => {
    syncGlyph(progress.get());
  }, [progress]);

  useMotionValueEvent(progress, "change", syncGlyph);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox={`0 0 ${ROADMAP_VIEWBOX.width} ${ROADMAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path ref={pathRef} d={ROADMAP_PATH} fill="none" stroke="none" />
      <g ref={glyphRef}>
        <foreignObject x={0} y={0} width={GLYPH_SIZE} height={GLYPH_SIZE}>
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
      </g>
    </svg>
  );
}
