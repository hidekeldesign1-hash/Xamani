"use client";

import { type MotionValue } from "framer-motion";
import { useCallback, useLayoutEffect, useRef } from "react";
import { ROADMAP_VIEWBOX } from "./data";
import { getRoadmapPointAtProgress } from "./roadmapPathMath";

const WINE = "#771335";
const GLYPH_SRC = "/images/geroglifico-mapa.png";

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

  const readProgress = useCallback(() => {
    if (scrollYProgress && resolveProgress) {
      return resolveProgress(scrollYProgress.get());
    }
    return progress.get();
  }, [progress, scrollYProgress, resolveProgress]);

  const applyProgress = useCallback(
    (value: number) => {
      const glyph = glyphRef.current;
      if (!glyph) return;

      const { x, y, angle } = getRoadmapPointAtProgress(value);
      const left = (x / ROADMAP_VIEWBOX.width) * 100;
      const top = (y / ROADMAP_VIEWBOX.height) * 100;

      glyph.style.left = `${left}%`;
      glyph.style.top = `${top}%`;
      glyph.style.transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`;
      glyph.style.opacity = value <= 0.002 ? "0.85" : "1";
    },
    []
  );

  const syncGlyph = useCallback(() => {
    applyProgress(readProgress());
  }, [applyProgress, readProgress]);

  useLayoutEffect(() => {
    syncGlyph();

    const unsubProgress = progress.on("change", applyProgress);
    const unsubScroll =
      scrollYProgress?.on("change", syncGlyph) ?? (() => undefined);

    let rafId = 0;
    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    let ticking = false;

    const tick = () => {
      syncGlyph();
      if (ticking) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const startTicking = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(tick);
    };

    const stopTicking = () => {
      ticking = false;
      cancelAnimationFrame(rafId);
      syncGlyph();
    };

    const onScrollActivity = () => {
      syncGlyph();
      startTicking();
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(stopTicking, 120);
    };

    window.addEventListener("scroll", onScrollActivity, { passive: true });
    window.addEventListener("touchend", onScrollActivity, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScrollActivity, {
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", onScrollActivity, {
      passive: true,
    });
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", onScrollActivity, { passive: true });
    }

    return () => {
      unsubProgress();
      unsubScroll();
      stopTicking();
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", onScrollActivity);
      window.removeEventListener("touchend", onScrollActivity);
      window.removeEventListener("scrollend", onScrollActivity);
      window.visualViewport?.removeEventListener("scroll", onScrollActivity);
      window.visualViewport?.removeEventListener("resize", onScrollActivity);
    };
  }, [progress, scrollYProgress, applyProgress, syncGlyph]);

  return (
    <div
      ref={glyphRef}
      className="pointer-events-none absolute z-[2] aspect-square w-[10.5%] max-w-[2.65rem] will-change-[left,top,transform]"
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
          WebkitMaskImage: `url(${GLYPH_SRC})`,
          maskImage: `url(${GLYPH_SRC})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
