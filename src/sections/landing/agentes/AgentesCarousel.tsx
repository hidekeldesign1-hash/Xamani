"use client";

import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";
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
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Agente anterior" : "Siguiente agente"}
      className={`absolute top-1/2 z-20 flex h-11 w-8 -translate-y-1/2 touch-manipulation items-center justify-center border-0 bg-transparent p-0 text-xl text-xamani-silver transition-colors enabled:active:text-xamani-cyan enabled:hover:text-xamani-cyan disabled:opacity-25 sm:relative sm:top-auto sm:z-auto sm:h-10 sm:w-10 sm:min-h-[44px] sm:min-w-[44px] sm:translate-y-0 sm:rounded-full sm:border sm:border-white/15 sm:bg-xamani-navy/40 sm:text-lg sm:backdrop-blur-sm sm:enabled:hover:border-xamani-cyan/40 ${
        isPrev ? "left-0.5 sm:left-auto" : "right-0.5 sm:right-auto"
      }`}
    >
      {isPrev ? "←" : "→"}
    </button>
  );
}

export default function AgentesCarousel() {
  const isMobile = useIsMobile();
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

  const getMaxScroll = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return 0;
    return Math.max(0, track.scrollWidth - viewport.clientWidth);
  }, []);

  const getTargetXForIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return 0;

      const maxScroll = getMaxScroll();
      if (maxScroll === 0) return 0;

      const card = track.children[index] as HTMLElement | undefined;
      if (!card) return 0;

      const centeredOffset =
        card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;

      return -Math.min(maxScroll, Math.max(0, centeredOffset));
    },
    [getMaxScroll]
  );

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const currentX = x.get();
    let nearest = 0;
    let minDistance = Infinity;

    for (let index = 0; index < AGENTES_DATA.length; index++) {
      const distance = Math.abs(currentX - getTargetXForIndex(index));
      if (distance < minDistance) {
        minDistance = distance;
        nearest = index;
      }
    }

    return nearest;
  }, [getTargetXForIndex, x]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    if (!isMobile) {
      setMaxDrag(getMaxScroll());
      setActiveIndex(getNearestIndex());
    }

    const step = getStep();
    if (step > 0 && isMobile) {
      setActiveIndex(
        Math.min(
          AGENTES_DATA.length - 1,
          Math.max(0, Math.round(viewport.scrollLeft / step))
        )
      );
    }
  }, [getMaxScroll, getNearestIndex, getStep, isMobile]);

  useEffect(() => {
    measure();
    const rafId = requestAnimationFrame(measure);

    const track = trackRef.current;
    const viewport = viewportRef.current;
    const resizeObserver =
      track && viewport
        ? new ResizeObserver(() => {
            measure();
          })
        : null;

    resizeObserver?.observe(track!);
    resizeObserver?.observe(viewport!);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, isMobile]);

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

  const scrollMobileToIndex = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    const targetLeft =
      card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;

    viewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  const snapToIndex = useCallback(
    (index: number) => {
      collapseActiveCard();

      if (isMobile) {
        scrollMobileToIndex(index);
        return;
      }

      const target = getTargetXForIndex(index);
      animate(x, target, { type: "spring", stiffness: 320, damping: 36 });
      setActiveIndex(index);
    },
    [collapseActiveCard, getTargetXForIndex, isMobile, scrollMobileToIndex, x]
  );

  const snapToNearest = useCallback(() => {
    snapToIndex(getNearestIndex());
  }, [getNearestIndex, snapToIndex]);

  const handleDragStart = () => {
    collapseActiveCard();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const velocityBoost = info.velocity.x * 0.15;
    const projectedX = x.get() + velocityBoost;
    x.set(projectedX);

    const track = trackRef.current;
    if (!track) return;

    let nearest = 0;
    let minDistance = Infinity;

    for (let index = 0; index < AGENTES_DATA.length; index++) {
      const distance = Math.abs(projectedX - getTargetXForIndex(index));
      if (distance < minDistance) {
        minDistance = distance;
        nearest = index;
      }
    }

    snapToIndex(nearest);
  };

  const handleMobileScroll = useCallback(() => {
    collapseActiveCard();
    measure();
  }, [collapseActiveCard, measure]);

  useEffect(() => {
    if (isMobile) return;

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
  }, [collapseActiveCard, getNearestIndex, getStep, getTargetXForIndex, isMobile, maxDrag, snapToNearest, x]);

  const goPrev = () => snapToIndex(Math.max(0, activeIndex - 1));
  const goNext = () =>
    snapToIndex(Math.min(AGENTES_DATA.length - 1, activeIndex + 1));

  const isCarouselLocked = !isMobile && activeCard !== null;

  return (
    <div ref={containerRef} className="relative">
      <p className="mb-4 font-archia text-xs text-xamani-silver-muted sm:text-sm">
        {isMobile
          ? "Desliza horizontalmente o usa las flechas para conocer a nuestros agentes"
          : "Desliza o usa el scroll horizontal para conocer a nuestros agentes"}
      </p>

      <div className="relative -mx-6 sm:mx-0 sm:flex sm:items-center sm:gap-3 md:gap-4">
        <CarouselNavButton
          direction="prev"
          onClick={goPrev}
          disabled={activeIndex === 0}
        />

        <div
          ref={viewportRef}
          onScroll={isMobile ? handleMobileScroll : undefined}
          style={
            isMobile
              ? { WebkitOverflowScrolling: "touch" }
              : { touchAction: isCarouselLocked ? "auto" : "pan-x pan-y" }
          }
          className={`w-full overscroll-x-contain sm:min-w-0 sm:flex-1 ${
            isMobile
              ? "scrollbar-none snap-x snap-mandatory overflow-x-auto"
              : `overflow-hidden ${
                  isCarouselLocked
                    ? ""
                    : "cursor-grab active:cursor-grabbing"
                }`
          }`}
        >
          <motion.div
            ref={trackRef}
            drag={isCarouselLocked ? false : isMobile ? false : "x"}
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.08}
            style={isMobile ? { gap: GAP_PX } : { x, gap: GAP_PX }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex w-max pb-2"
          >
            {AGENTES_DATA.map((agente, index) => (
              <div
                key={agente.nombre}
                className={`relative h-[24.5rem] w-[min(86vw,21rem)] shrink-0 snap-center sm:h-[26.5rem] sm:w-[23rem] ${
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

      <div className="mt-4 flex justify-center gap-1.5 sm:mt-4">
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
