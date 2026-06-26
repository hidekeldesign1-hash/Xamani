"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroContent from "@/components/hero/HeroContent";

/** Espacio de scroll que alimenta la transición intro → hero final */
const SCROLL_VH = 100;
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

function finalVisual(isotipoFinal: number) {
  return {
    brandTopGap: "6vh",
    logoScale: 0.62,
    isotipoSize: isotipoFinal,
    headlineVisible: true,
    discoverOpacity: 1,
    menuOpacity: 1,
    menuY: -20,
    streakOpacity: 0,
    streakBlur: 0,
    streakScale: 1,
  };
}

function visualFromProgress(
  v: number,
  isotipoIntro: number,
  isotipoFinal: number
) {
  return {
    brandTopGap: `${lerp([0, 1], [22, 6], v)}vh`,
    logoScale: lerp([0, 1], [1, 0.62], v),
    isotipoSize: lerp([0, 1], [isotipoIntro, isotipoFinal], v),
    headlineVisible: v > 0.28,
    discoverOpacity: lerp([0, 0.12, 0.32, 0.48, 0.62], [1, 1, 0.15, 0.15, 1], v),
    menuOpacity: lerp([0.42, 0.72], [0, 1], v),
    menuY: lerp([0.42, 0.72], [12, -20], v),
    streakOpacity: lerp([0, 0.55, 0.85], [1, 0.35, 0], v),
    streakBlur: lerp([0, 0.75], [0, 28], v),
    streakScale: lerp([0, 0.85], [1, 1.08], v),
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
    streakBlur: 0,
    streakScale: 1,
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
    return el ? Math.max(0, el.offsetHeight - window.innerHeight) : 0;
  }, []);

  const lockScroll = useCallback(() => {
    const maxScroll = getMaxScroll();
    savedScrollY.current = maxScroll;
    window.scrollTo({ top: maxScroll, behavior: "instant" as ScrollBehavior });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${maxScroll}px`;
    document.body.style.width = "100%";
  }, [getMaxScroll]);

  const resetBodyScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    savedScrollY.current = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const freezeAtEnd = useCallback(() => {
    if (stageRef.current === "frozen") return;
    stageRef.current = "frozen";
    setVisual(finalVisual(isotipoFinal));
    setStage("frozen");
    lockScroll();
  }, [lockScroll, isotipoFinal]);

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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (stageRef.current === "frozen") return;

    if (unfreezingRef.current) {
      setVisual(visualFromProgress(v, isotipoIntro, isotipoFinal));
      return;
    }

    if (v >= FREEZE_THRESHOLD) {
      freezeAtEnd();
      return;
    }

    setVisual(visualFromProgress(v, isotipoIntro, isotipoFinal));
  });

  useEffect(() => {
    if (stage !== "transition") return;

    const clampScroll = () => {
      if (unfreezingRef.current) return;
      const max = getMaxScroll();
      if (max <= 0) return;
      if (window.scrollY >= max * FREEZE_THRESHOLD) {
        freezeAtEnd();
        return;
      }
      if (window.scrollY > max) {
        window.scrollTo({ top: max, behavior: "instant" as ScrollBehavior });
      }
    };

    window.addEventListener("scroll", clampScroll, { passive: true });
    return () => window.removeEventListener("scroll", clampScroll);
  }, [stage, getMaxScroll, freezeAtEnd]);

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
    setVisual(finalVisual(isotipoFinal));
    setStage("frozen");
    savedScrollY.current = 0;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, [prefersReducedMotion, isotipoFinal]);

  useEffect(() => () => resetBodyScroll(), [resetBodyScroll]);

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
    ? "100dvh"
    : `calc(100dvh + ${SCROLL_VH}dvh)`;

  const heroInteractive =
    stage === "frozen" || visual.menuOpacity > 0.75;

  return (
    <>
      <div
        ref={scrollRef}
        style={{ height: totalHeight }}
        className="relative"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10">
        <HeroContent
          ready={ready}
          heroInteractive={heroInteractive}
          scrollLocked={stage === "frozen"}
          onDiscoverClick={handleDiscover}
          onVolverClick={returnToIntro}
          {...visual}
        />
      </div>
    </>
  );
}
