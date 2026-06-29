"use client";

import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import AgenteCard from "./AgenteCard";
import { AGENTES_DATA } from "./data";

const GAP_PX = 16;

function CarouselNavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Agente anterior" : "Siguiente agente"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-xamani-navy/40 text-lg text-xamani-silver backdrop-blur-sm transition-colors enabled:hover:border-xamani-cyan/40 enabled:hover:text-xamani-cyan disabled:opacity-30 sm:flex"
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

export default function AgentesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelSnapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cardWidth =
      (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    return cardWidth + GAP_PX;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const dragLimit = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setMaxDrag(dragLimit);

    const step = getStep();
    if (step > 0) {
      setActiveIndex(
        Math.min(AGENTES_DATA.length - 1, Math.round(Math.abs(x.get()) / step))
      );
    }
  }, [getStep, x]);

  useEffect(() => {
    measure();
    const rafId = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const collapseActiveCard = useCallback(() => {
    setActiveCard(null);
  }, []);

  const handleCardActivate = useCallback((index: number) => {
    setActiveCard((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    if (activeCard === null) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-agente-card]")) return;
      collapseActiveCard();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeCard, collapseActiveCard]);

  const snapToIndex = useCallback(
    (index: number) => {
      const step = getStep();
      if (step <= 0) return;

      const target = -Math.min(maxDrag, Math.max(0, index * step));
      animate(x, target, { type: "spring", stiffness: 320, damping: 36 });
      setActiveIndex(index);
      collapseActiveCard();
    },
    [collapseActiveCard, getStep, maxDrag, x]
  );

  const snapToNearest = useCallback(() => {
    const step = getStep();
    if (step <= 0) return;

    const index = Math.min(
      AGENTES_DATA.length - 1,
      Math.max(0, Math.round(Math.abs(x.get()) / step))
    );
    snapToIndex(index);
  }, [getStep, snapToIndex, x]);

  const handleDragStart = () => {
    collapseActiveCard();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const step = getStep();
    if (step <= 0) return;

    const velocityBoost = info.velocity.x * 0.15;
    const projected = Math.abs(x.get() - velocityBoost);
    const nextIndex = Math.min(
      AGENTES_DATA.length - 1,
      Math.max(0, Math.round(projected / step))
    );

    snapToIndex(nextIndex);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (delta === 0) return;

      event.preventDefault();
      collapseActiveCard();

      const nextX = Math.min(0, Math.max(-maxDrag, x.get() - delta));
      x.set(nextX);

      const step = getStep();
      if (step > 0) {
        setActiveIndex(
          Math.min(
            AGENTES_DATA.length - 1,
            Math.max(0, Math.round(Math.abs(nextX) / step))
          )
        );
      }

      if (wheelSnapTimerRef.current) {
        clearTimeout(wheelSnapTimerRef.current);
      }
      wheelSnapTimerRef.current = setTimeout(snapToNearest, 140);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", onWheel);
      if (wheelSnapTimerRef.current) {
        clearTimeout(wheelSnapTimerRef.current);
      }
    };
  }, [collapseActiveCard, getStep, maxDrag, snapToNearest, x]);

  const goPrev = () => snapToIndex(Math.max(0, activeIndex - 1));
  const goNext = () =>
    snapToIndex(Math.min(AGENTES_DATA.length - 1, activeIndex + 1));

  const isCarouselLocked = activeCard !== null;

  return (
    <div ref={containerRef} className="relative">
      <p className="mb-4 font-archia text-xs text-xamani-silver-muted sm:text-sm">
        Desliza o usa el scroll horizontal para conocer a nuestros agentes
      </p>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <CarouselNavButton
          direction="prev"
          onClick={goPrev}
          disabled={activeIndex === 0}
        />

        <div
          ref={viewportRef}
          style={{ touchAction: isCarouselLocked ? "auto" : "pan-y pinch-zoom" }}
          className={`min-w-0 flex-1 overflow-hidden overscroll-x-contain ${
            isCarouselLocked
              ? ""
              : "cursor-grab active:cursor-grabbing"
          }`}
        >
          <motion.div
            ref={trackRef}
            drag={isCarouselLocked ? false : "x"}
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.08}
            style={{ x, gap: GAP_PX }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex pb-2"
          >
            {AGENTES_DATA.map((agente, index) => (
              <div
                key={agente.nombre}
                className={`relative h-[26rem] w-[min(88vw,22rem)] shrink-0 sm:h-[28rem] sm:w-[24rem] ${
                  activeCard === index ? "z-30" : ""
                }`}
              >
                <AgenteCard
                  agente={agente}
                  isActive={activeCard === index}
                  onActivate={() => handleCardActivate(index)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <CarouselNavButton
          direction="next"
          onClick={goNext}
          disabled={activeIndex >= AGENTES_DATA.length - 1}
        />
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {AGENTES_DATA.map((agente, index) => (
          <button
            key={agente.nombre}
            type="button"
            aria-label={`Ir al agente ${index + 1}`}
            onClick={() => snapToIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-xamani-cyan"
                : "w-1.5 bg-xamani-silver/25 hover:bg-xamani-silver/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
