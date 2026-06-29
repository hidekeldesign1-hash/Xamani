"use client";

import { type MotionValue } from "framer-motion";
import { useCallback, useLayoutEffect, useRef } from "react";
import { ROADMAP_VIEWBOX } from "./data";
import { getRoadmapPointAtProgress } from "./roadmapPathMath";

const WINE = "#771335";
const ISOTIPO_SRC = "/images/isotipo.png";

interface ModeloRoadmapGlyphProps {
  progress: MotionValue<number>;
  /** Respaldo iOS/Android: recalcular desde scroll crudo si el MV derivado no dispara. */
  scrollYProgress?: MotionValue<number>;
  resolveProgress?: (rawScroll: number) => number;
}

export default function ModeloRoadmapGlyph({
  progress,
  scrollYProgress,
  resolveProgress,
}: ModeloRoadmapGlyphProps) {
  const glyphRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef(-1);

  const readProgress = useCallback(() => {
    if (scrollYProgress && resolveProgress) {
      return resolveProgress(scrollYProgress.get());
    }
    return progress.get();
  }, [progress, scrollYProgress, resolveProgress]);

  const applyProgress = useCallback((value: number) => {
    if (Math.abs(value - lastProgressRef.current) < 0.0001) return;
    lastProgressRef.current = value;

    const glyph = glyphRef.current;
    if (!glyph) return;

    const { x, y } = getRoadmapPointAtProgress(value);
    const leftPct = (x / ROADMAP_VIEWBOX.width) * 100;
    const topPct = (y / ROADMAP_VIEWBOX.height) * 100;

    // left/top % son relativos al contenedor del mapa; translate(-50%) centra el isotipo.
    glyph.style.left = `${leftPct}%`;
    glyph.style.top = `${topPct}%`;
    glyph.style.transform = "translate3d(-50%, -50%, 0)";
    glyph.style.opacity = value <= 0.002 ? "0.85" : "1";
  }, []);

  useLayoutEffect(() => {
    let rafId = 0;
    let scheduled = false;

    const scheduleSync = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(() => {
        scheduled = false;
        applyProgress(readProgress());
      });
    };

    scheduleSync();

    const unsubProgress = progress.on("change", scheduleSync);
    const unsubScroll =
      scrollYProgress?.on("change", scheduleSync) ?? (() => undefined);

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("touchend", scheduleSync, { passive: true });
    window.visualViewport?.addEventListener("scroll", scheduleSync, {
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", scheduleSync, {
      passive: true,
    });
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", scheduleSync, { passive: true });
    }

    return () => {
      unsubProgress();
      unsubScroll();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("touchend", scheduleSync);
      window.removeEventListener("scrollend", scheduleSync);
      window.visualViewport?.removeEventListener("scroll", scheduleSync);
      window.visualViewport?.removeEventListener("resize", scheduleSync);
    };
  }, [progress, scrollYProgress, applyProgress, readProgress]);

  return (
    <div
      ref={glyphRef}
      className="roadmap-glyph pointer-events-none absolute z-[2] aspect-square w-[20.25%] max-w-[5.0625rem] will-change-[left,top,transform] filter drop-shadow-[0_14px_20px_rgba(119,19,53,0.5)]"
      style={{
        left: `${(98 / ROADMAP_VIEWBOX.width) * 100}%`,
        top: `${(64 / ROADMAP_VIEWBOX.height) * 100}%`,
        transform: "translate3d(-50%, -50%, 0)",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          backgroundColor: WINE,
          WebkitMaskImage: `url(${ISOTIPO_SRC})`,
          maskImage: `url(${ISOTIPO_SRC})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          filter: "drop-shadow(0 0 6px rgba(119, 19, 53, 0.55))",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
