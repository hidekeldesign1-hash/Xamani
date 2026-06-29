"use client";

import { type MotionValue } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { ROADMAP_VIEWBOX } from "./data";
import { getRoadmapPointAtProgress } from "./roadmapPathMath";

const WINE = "#771335";
const ISOTIPO_SRC = "/images/isotipo.png";
/** Tiempo sin actividad antes de detener el loop de frames (momentum iOS). */
const SCROLL_IDLE_MS = 160;

interface ModeloRoadmapGlyphProps {
  progress: MotionValue<number>;
  /** Respaldo iOS/Android: recalcular desde scroll crudo si el MV derivado no dispara. */
  scrollYProgress?: MotionValue<number>;
  resolveProgress?: (rawScroll: number) => number;
}

function getMapParent(glyph: HTMLDivElement): HTMLElement | null {
  const parent = glyph.parentElement;
  return parent instanceof HTMLElement ? parent : null;
}

export default function ModeloRoadmapGlyph({
  progress,
  scrollYProgress,
  resolveProgress,
}: ModeloRoadmapGlyphProps) {
  const glyphRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const scrollYProgressRef = useRef(scrollYProgress);
  const resolveProgressRef = useRef(resolveProgress);

  progressRef.current = progress;
  scrollYProgressRef.current = scrollYProgress;
  resolveProgressRef.current = resolveProgress;

  useLayoutEffect(() => {
    const glyph = glyphRef.current;
    if (!glyph) return;

    const readProgress = () => {
      const scroll = scrollYProgressRef.current;
      const resolve = resolveProgressRef.current;
      if (scroll && resolve) {
        return resolve(scroll.get());
      }
      return progressRef.current.get();
    };

    const applyProgress = (value: number) => {
      const parent = getMapParent(glyph);
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w <= 0 || h <= 0) return;

      const { x, y } = getRoadmapPointAtProgress(value);
      const xPx = (x / ROADMAP_VIEWBOX.width) * w;
      const yPx = (y / ROADMAP_VIEWBOX.height) * h;

      // Solo transform en px — evita layout/reflow por left/top en cada frame (crítico en Safari iOS).
      glyph.style.left = "0";
      glyph.style.top = "0";
      glyph.style.transform = `translate3d(${xPx}px, ${yPx}px, 0) translate3d(-50%, -50%, 0)`;
      glyph.style.opacity = value <= 0.002 ? "0.85" : "1";
    };

    let loopRaf = 0;
    let looping = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const frame = () => {
      applyProgress(readProgress());
      if (looping) {
        loopRaf = requestAnimationFrame(frame);
      }
    };

    const beginLoop = () => {
      if (!looping) {
        looping = true;
        loopRaf = requestAnimationFrame(frame);
      }
      applyProgress(readProgress());
    };

    const scheduleIdleStop = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        looping = false;
        cancelAnimationFrame(loopRaf);
        applyProgress(readProgress());
      }, SCROLL_IDLE_MS);
    };

    const onActivity = () => {
      beginLoop();
      scheduleIdleStop();
    };

    applyProgress(readProgress());

    const unsubProgress = progress.on("change", onActivity);
    const unsubScroll =
      scrollYProgress?.on("change", onActivity) ?? (() => undefined);

    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("touchmove", onActivity, { passive: true });
    window.addEventListener("touchend", onActivity, { passive: true });
    window.visualViewport?.addEventListener("scroll", onActivity, {
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", onActivity, {
      passive: true,
    });
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", onActivity, { passive: true });
    }

    const parent = getMapParent(glyph);
    const resizeObserver =
      parent && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => applyProgress(readProgress()))
        : null;
    resizeObserver?.observe(parent!);

    return () => {
      unsubProgress();
      unsubScroll();
      looping = false;
      cancelAnimationFrame(loopRaf);
      if (idleTimer) clearTimeout(idleTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchmove", onActivity);
      window.removeEventListener("touchend", onActivity);
      window.removeEventListener("scrollend", onActivity);
      window.visualViewport?.removeEventListener("scroll", onActivity);
      window.visualViewport?.removeEventListener("resize", onActivity);
    };
  }, [progress, scrollYProgress]);

  return (
    <div
      ref={glyphRef}
      className="roadmap-glyph pointer-events-none absolute left-0 top-0 z-[2] aspect-square w-[20.25%] max-w-[5.0625rem] will-change-transform filter drop-shadow-[0_14px_20px_rgba(119,19,53,0.5)]"
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
