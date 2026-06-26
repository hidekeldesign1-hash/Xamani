"use client";

import {
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroContent from "@/components/hero/HeroContent";
import { useThrottledMotionValueEvent } from "@/hooks/useThrottledMotionValueEvent";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

/** Espacio de scroll que alimenta la transición intro → hero final */
const SCROLL_VH = 100;
const MOBILE_SCROLL_VH = 72;
/** Congelar cuando la animación llegó al hero completo */
const FREEZE_THRESHOLD = 0.97;

type Stage = "transition" | "frozen";

function lerp(map: number[], values: number[], v: number): number {
  if (v <= map[0]) return values[0];
  if (v >= map[map.length - 1]) return values[values.length - 1];
  for (let i = 0; i < map.length - 1; i++) {
    if (v <= map[i + 1]) {
      const t = (v - map[i]) / (map[i + 1] - map[i]);
      return values[i] + t * (values[i + 1] - values[i]);
    }
  }
  return values[values.length - 1];
}

/** Móvil: la animación visual termina antes del fin del scroll (colchón anti-brinco). */
const MOBILE_VISUAL_COMPLETE = 0.86;
const MOBILE_FREEZE_THRESHOLD = 0.992;

function finalVisual(
  isotipoIntro: number,
  isotipoFinal: number,
  isMobile = false
) {
  return visualFromProgress(1, isotipoIntro, isotipoFinal, isMobile);
}

function visualFromProgress(
  v: number,
  isotipoIntro: number,
  isotipoFinal: number,
  isMobile = false
) {
  if (isMobile) {
    const p = Math.min(1, v);

    return {
      brandTopGap: `${lerp([0, MOBILE_VISUAL_COMPLETE], [20, 9], p)}vh`,
      logoScale: lerp([0, MOBILE_VISUAL_COMPLETE], [1, 0.68], p),
      isotipoSize: lerp([0, MOBILE_VISUAL_COMPLETE], [isotipoIntro, isotipoFinal], p),
      headlineVisible: p > 0.2,
      discoverOpacity: Math.max(0, 1 - p / 0.07),
      menuOpacity: lerp([0.36, 0.82], [0, 1], p),
      menuY: lerp([0.36, 0.82], [18, 0], p),
      streakOpacity: lerp([0, 0.46, 0.8], [1, 0.35, 0], p),
    };
  }

  return {
    brandTopGap: `${lerp([0, 1], [22, 6], v)}vh`,
    logoScale: lerp([0, 1], [1, 0.62], v),
    isotipoSize: lerp([0, 1], [isotipoIntro, isotipoFinal], v),
    headlineVisible: v > 0.28,
    discoverOpacity: Math.max(0, 1 - v / 0.07),
    menuOpacity: lerp([0.42, 0.72], [0, 1], v),
    menuY: lerp([0.42, 0.72], [12, -20], v),
    streakOpacity: lerp([0, 0.55, 0.85], [1, 0.35, 0], v),
  };
}

export default function IntroHeroExperience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>("transition");
  const touchStartY = useRef(0);
  const savedScrollY = useRef(0);
  const unfreezingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Stage>("transition");
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const isotipoFinal = prefersReducedMotion ? 56 : 64;
  const isotipoIntro = prefersReducedMotion ? 52 : 48;

  const [visual, setVisual] = useState({
    brandTopGap: "22vh",
    logoScale: 1,
    isotipoSize: isotipoIntro,
    headlineVisible: false,
    discoverOpacity: 1,
    menuOpacity: 0,
    menuY: 12,
    streakOpacity: 1,
  });

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const getMaxScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const viewportH = window.visualViewport?.height ?? window.innerHeight;
    return Math.max(0, el.offsetHeight - viewportH);
  }, []);

  const lockScroll = useCallback(() => {
    const maxScroll = getMaxScroll();
    savedScrollY.current = maxScroll;
    window.scrollTo({ top: maxScroll, behavior: "instant" as ScrollBehavior });
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.backgroundColor = "#0b1520";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${maxScroll}px`;
    document.body.style.width = "100%";
    document.body.style.backgroundColor = "#0b1520";
    document.body.style.overscrollBehaviorY = "none";
  }, [getMaxScroll]);

  const resetBodyScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.documentElement.style.backgroundColor = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.backgroundColor = "";
    document.body.style.overscrollBehaviorY = "";
    savedScrollY.current = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const freezeAtEnd = useCallback(() => {
    if (stageRef.current === "frozen") return;

    const v = scrollYProgress.get();
    const visualComplete = isMobile ? MOBILE_VISUAL_COMPLETE : FREEZE_THRESHOLD;
    if (v < visualComplete) return;

    stageRef.current = "frozen";
    setVisual(finalVisual(isotipoIntro, isotipoFinal, isMobile));
    setStage("frozen");
    lockScroll();
  }, [lockScroll, isotipoIntro, isotipoFinal, isMobile, scrollYProgress]);

  const unlockScroll = useCallback(() => {
    const y = savedScrollY.current;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, []);

  const returnToIntro = useCallback(() => {
    if (stageRef.current !== "frozen") return;
    stageRef.current = "transition";
    unfreezingRef.current = true;
    unlockScroll();
    setStage("transition");
    savedScrollY.current = 0;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.setTimeout(() => {
      unfreezingRef.current = false;
    }, 900);
  }, [unlockScroll]);

  const freezeThreshold = isMobile ? MOBILE_FREEZE_THRESHOLD : FREEZE_THRESHOLD;

  const applyScrollProgress = useCallback(
    (v: number) => {
      if (stageRef.current === "frozen") return;

      if (unfreezingRef.current) {
        setVisual(visualFromProgress(v, isotipoIntro, isotipoFinal, isMobile));
        return;
      }

      setVisual(visualFromProgress(v, isotipoIntro, isotipoFinal, isMobile));

      if (v >= freezeThreshold) {
        freezeAtEnd();
      }
    },
    [freezeAtEnd, freezeThreshold, isMobile, isotipoFinal, isotipoIntro]
  );

  useThrottledMotionValueEvent(scrollYProgress, applyScrollProgress, isMobile);

  useEffect(() => {
    if (stage !== "transition" || !isMobile) return;

    const flushScrollState = () => {
      if (unfreezingRef.current || stageRef.current === "frozen") return;
      applyScrollProgress(scrollYProgress.get());
    };

    const clampOverscroll = () => {
      if (unfreezingRef.current) return;
      const max = getMaxScroll();
      if (max > 0 && window.scrollY > max) {
        window.scrollTo({ top: max, behavior: "instant" as ScrollBehavior });
      }
      flushScrollState();
    };

    window.addEventListener("scroll", clampOverscroll, { passive: true });
    window.addEventListener("touchend", flushScrollState, { passive: true });
    window.addEventListener("scrollend", flushScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", clampOverscroll);
      window.removeEventListener("touchend", flushScrollState);
      window.removeEventListener("scrollend", flushScrollState);
    };
  }, [stage, isMobile, applyScrollProgress, scrollYProgress, getMaxScroll]);

  useEffect(() => {
    if (stage !== "transition" || isMobile) return;

    const clampOverscroll = () => {
      if (unfreezingRef.current) return;
      const max = getMaxScroll();
      if (max > 0 && window.scrollY > max) {
        window.scrollTo({ top: max, behavior: "instant" as ScrollBehavior });
      }
    };

    window.addEventListener("scroll", clampOverscroll, { passive: true });
    return () => window.removeEventListener("scroll", clampOverscroll);
  }, [stage, isMobile, getMaxScroll]);

  useEffect(() => {
    if (stage !== "frozen") return;

    const blockScrollDown = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      returnToIntro();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? touchStartY.current;
      const delta = currentY - touchStartY.current;
      if (delta < -8) {
        e.preventDefault();
        return;
      }
      if (delta > 12) {
        e.preventDefault();
        returnToIntro();
      }
    };

    window.addEventListener("wheel", blockScrollDown, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", blockScrollDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [stage, returnToIntro]);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    setReady(true);
    setVisual(finalVisual(isotipoIntro, isotipoFinal, isMobile));
    setStage("frozen");
    savedScrollY.current = 0;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, [prefersReducedMotion, isotipoFinal, isotipoIntro, isMobile]);

  useEffect(() => () => resetBodyScroll(), [resetBodyScroll]);

  useEffect(() => {
    if (!isMobile) return;
    document.documentElement.style.backgroundColor = "#0b1520";
    document.documentElement.style.overscrollBehaviorY = "none";
    document.body.style.backgroundColor = "#0b1520";
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.overscrollBehaviorY = "";
      document.body.style.backgroundColor = "";
      document.body.style.overscrollBehaviorY = "";
    };
  }, [isMobile]);

  const completeTransition = useCallback(() => {
    if (stageRef.current === "frozen") return;
    const maxScroll = getMaxScroll();
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  }, [getMaxScroll]);

  const nudgeScroll = useCallback(() => {
    if (stageRef.current === "frozen") return;
    window.scrollBy({ top: window.innerHeight * 0.35, behavior: "smooth" });
  }, []);

  const handleDiscover = useCallback(() => {
    if (stageRef.current === "frozen") return;
    const v = scrollYProgress.get();
    if (v >= 0.75) {
      completeTransition();
    } else {
      nudgeScroll();
    }
  }, [scrollYProgress, completeTransition, nudgeScroll]);

  const totalHeight = prefersReducedMotion
    ? "100svh"
    : `calc(100svh + ${isMobile ? MOBILE_SCROLL_VH : SCROLL_VH}svh)`;

  const heroInteractive =
    stage === "frozen" || visual.menuOpacity > 0.75;

  return (
    <>
      <div
        ref={scrollRef}
        style={{ height: totalHeight }}
        className="relative bg-[#0b1520]"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 min-h-[100svh] bg-[#0b1520]">
        <HeroContent
          ready={ready}
          heroInteractive={heroInteractive}
          scrollLocked={stage === "frozen"}
          onDiscoverClick={handleDiscover}
          {...visual}
        />
      </div>
    </>
  );
}
