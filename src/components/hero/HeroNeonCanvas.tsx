"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

const BG = "#0b1520";
const PALETTE = ["#ffffff", "#1b6a85", "#771335", "#a1124a"] as const;

interface StreakSprite {
  canvas: HTMLCanvasElement;
  offsetX: number;
  offsetY: number;
}

interface LightStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  direction: 1 | -1;
  baseAlpha: number;
  minY: number;
  maxY: number;
  sprite: StreakSprite;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pickSideX(width: number): number {
  const left = Math.random() < 0.5;
  const norm = left ? Math.random() * 0.3 : 0.7 + Math.random() * 0.3;
  return norm * width;
}

function bakeStreakSprite(
  color: string,
  lineWidth: number,
  length: number,
  blur: number,
  dpr: number
): StreakSprite {
  const pad = Math.ceil(blur * 1.35 + lineWidth * 2);
  const sw = Math.ceil(lineWidth + pad * 2);
  const sh = Math.ceil(length + pad * 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.ceil(sw * dpr));
  canvas.height = Math.max(1, Math.ceil(sh * dpr));

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { canvas, offsetX: pad, offsetY: pad };
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cx = pad + lineWidth / 2;
  const y0 = pad;
  const y1 = pad + length;
  const gradient = ctx.createLinearGradient(cx, y0, cx, y1);
  gradient.addColorStop(0, hexToRgba(color, 0));
  gradient.addColorStop(0.08, hexToRgba(color, 0.85));
  gradient.addColorStop(0.5, hexToRgba(color, 1));
  gradient.addColorStop(0.92, hexToRgba(color, 0.85));
  gradient.addColorStop(1, hexToRgba(color, 0));

  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx, y0);
  ctx.lineTo(cx, y1);
  ctx.stroke();

  return { canvas, offsetX: pad, offsetY: pad };
}

function bakeBackground(
  width: number,
  height: number,
  dpr: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, width, height);

  const cx = width * 0.5;
  const cy = height * 0.48;
  const radius = Math.max(width, height) * 0.62;
  const vignette = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  vignette.addColorStop(0, "rgba(11, 21, 32, 0.72)");
  vignette.addColorStop(0.5, "rgba(11, 21, 32, 0.28)");
  vignette.addColorStop(1, "rgba(11, 21, 32, 0)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  const floor = ctx.createLinearGradient(0, height * 0.68, 0, height);
  floor.addColorStop(0, "rgba(11, 21, 32, 0)");
  floor.addColorStop(1, "rgba(11, 21, 32, 0.85)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, height * 0.68, width, height * 0.32);

  return canvas;
}

function createStreaks(
  width: number,
  height: number,
  count: number,
  dpr: number
): LightStreak[] {
  return Array.from({ length: count }, () => {
    const length = height * (0.18 + Math.random() * 0.55);
    const minY = -length * 0.35;
    const maxY = height - length * 0.2;
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]!;
    const lineWidth = 1 + Math.random() * 2.2;
    const blur = 14 + Math.random() * 16;

    return {
      x: pickSideX(width),
      y: minY + Math.random() * (maxY - minY),
      length,
      speed: 0.35 + Math.random() * 1.1,
      direction: Math.random() < 0.5 ? 1 : -1,
      baseAlpha: 0.55 + Math.random() * 0.45,
      minY,
      maxY,
      sprite: bakeStreakSprite(color, lineWidth, length, blur, dpr),
    };
  });
}

interface HeroNeonCanvasProps {
  className?: string;
  /** Pausa el loop cuando el fondo no es visible (p. ej. scroll a hero final). */
  active?: boolean;
  /** Móvil: fija la altura al cargar para evitar saltos cuando cambia la barra del navegador. */
  pinViewport?: boolean;
}

export default function HeroNeonCanvas({
  className = "",
  active = true,
  pinViewport = false,
}: HeroNeonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streaksRef = useRef<LightStreak[]>([]);
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const rafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const visibleRef = useRef(true);
  const activeRef = useRef(active);
  const tickRef = useRef<FrameRequestCallback>(() => {});
  const lockedHeightRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const shouldPinViewport = pinViewport && isMobile;

  useEffect(() => {
    if (!shouldPinViewport) {
      lockedHeightRef.current = null;
    }
  }, [shouldPinViewport]);

  useEffect(() => {
    activeRef.current = active;
    if (!active) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    if (
      !prefersReducedMotion &&
      visibleRef.current &&
      !document.hidden &&
      rafRef.current === null
    ) {
      lastFrameRef.current = 0;
      rafRef.current = requestAnimationFrame(tickRef.current);
    }
  }, [active, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    } as CanvasRenderingContext2DSettings);
    if (!ctx) return;

    const lineCount = isMobile ? 28 : 48;
    const frameInterval = isMobile ? 1000 / 30 : 1000 / 60;
    const maxDpr = isMobile ? 1 : 1.5;
    /** Escritorio: pantallas más altas hacen que el mismo px/frame se perciba más lento. */
    const speedMultiplier = isMobile ? 1 : 1.38;
    let lastPaintAt = 0;

    const paintFrame = (animate: boolean, deltaMs = 16.67) => {
      const { width, height, dpr } = sizeRef.current;
      if (width <= 0 || height <= 0 || !bgRef.current) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(bgRef.current, 0, 0, width, height);

      ctx.globalCompositeOperation = "screen";
      for (const streak of streaksRef.current) {
        if (animate) {
          const step = (deltaMs / 16.67) * speedMultiplier;
          streak.y += streak.speed * streak.direction * step;

          if (streak.y <= streak.minY) {
            streak.y = streak.minY;
            streak.direction = 1;
          } else if (streak.y >= streak.maxY) {
            streak.y = streak.maxY;
            streak.direction = -1;
          }
        }

        const range = streak.maxY - streak.minY || 1;
        const travel = (streak.y - streak.minY) / range;
        const travelAlpha = 0.45 + 0.55 * Math.sin(Math.PI * travel);
        ctx.globalAlpha = streak.baseAlpha * travelAlpha;
        ctx.drawImage(
          streak.sprite.canvas,
          streak.x - streak.sprite.offsetX,
          streak.y - streak.sprite.offsetY
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const readSize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      let height = parent?.clientHeight ?? window.innerHeight;

      if (shouldPinViewport) {
        if (lockedHeightRef.current === null) {
          lockedHeightRef.current = Math.round(
            window.visualViewport?.height ?? window.innerHeight
          );
        }
        height = lockedHeightRef.current;
      }

      return { width, height };
    };

    const rebuild = () => {
      const { width, height } = readSize();
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      sizeRef.current = { width, height, dpr };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      bgRef.current = bakeBackground(width, height, dpr);
      streaksRef.current = createStreaks(width, height, lineCount, dpr);
    };

    const scheduleRebuild = (forceHeightReset = false) => {
      if (forceHeightReset) {
        lockedHeightRef.current = null;
      }
      if (resizeRafRef.current !== null) return;
      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = null;
        rebuild();
        if (prefersReducedMotion) {
          paintFrame(false);
        }
      });
    };

    const tick: FrameRequestCallback = (now) => {
      if (
        document.hidden ||
        !visibleRef.current ||
        !activeRef.current ||
        prefersReducedMotion
      ) {
        rafRef.current = null;
        return;
      }

      if (now - lastFrameRef.current >= frameInterval) {
        const deltaMs = lastPaintAt > 0 ? now - lastPaintAt : frameInterval;
        lastPaintAt = now;
        lastFrameRef.current = now;
        paintFrame(true, deltaMs);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tickRef.current = tick;

    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const start = () => {
      rebuild();
      stop();
      lastFrameRef.current = 0;
      lastPaintAt = 0;

      // Siempre pinta un frame estático (evita canvas en blanco al pausar en móvil).
      paintFrame(false);

      if (prefersReducedMotion) {
        return;
      }

      if (activeRef.current && visibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (
        activeRef.current &&
        visibleRef.current &&
        !prefersReducedMotion
      ) {
        lastFrameRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true;
        if (!visibleRef.current || !activeRef.current) {
          stop();
          return;
        }
        if (!document.hidden && !prefersReducedMotion && rafRef.current === null) {
          lastFrameRef.current = 0;
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );

    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      if (shouldPinViewport) return;
      scheduleRebuild();
    });
    const parent = canvas.parentElement;
    if (parent && !shouldPinViewport) ro.observe(parent);

    const onWindowResize = () => {
      if (shouldPinViewport) {
        const parent = canvas.parentElement;
        const width = parent?.clientWidth ?? window.innerWidth;
        if (width !== sizeRef.current.width) {
          scheduleRebuild(true);
        }
        return;
      }
      scheduleRebuild();
    };

    const onOrientation = () => scheduleRebuild(true);

    requestAnimationFrame(start);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("orientationchange", onOrientation);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      if (resizeRafRef.current !== null) {
        cancelAnimationFrame(resizeRafRef.current);
      }
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("orientationchange", onOrientation);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isMobile, prefersReducedMotion, shouldPinViewport]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} [transform:translateZ(0)] [will-change:transform]`}
      aria-hidden="true"
    />
  );
}
