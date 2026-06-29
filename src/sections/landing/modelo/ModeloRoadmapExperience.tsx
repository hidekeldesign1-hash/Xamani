"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import PillLink from "@/components/ui/PillLink";
import { useThrottledMotionValueEvent } from "@/hooks/useThrottledMotionValueEvent";
import { ROUTES } from "@/data/heroMenu";
import {
  MODELO_CTA_COPY,
  MODELO_STEPS,
} from "./data";
import ModeloRoadmapCanvas from "./ModeloRoadmapCanvas";
import ModeloRoadmapCta from "./ModeloRoadmapCta";
import ModeloRoadmapGlyph from "./ModeloRoadmapGlyph";
import ModeloRoadmapPath from "./ModeloRoadmapPath";
import ModeloStepCard from "./ModeloStepCard";
import ModeloStepNode from "./ModeloStepNode";
import {
  computeRevealedScrollState,
  type RevealedScrollState,
} from "./roadmapScrollState";
import { useIsMobile } from "./useIsMobile";

/** Espacio de scroll antes de que inicie la animación del mapa */
const LEAD_IN_VH = 32;
const ANIM_SCROLL_VH = 168;
/** Pausa de scroll en móvil (~0,5 s) tras el último punto, antes del difuminado */
const MOBILE_HOLD_VH = 10;
/** Tramo final en móvil para ver el CTA con difuminado */
const MOBILE_CTA_TAIL_VH = 16;
const REVEAL_BACK_BUFFER = 0.05;

interface ScrollSegments {
  totalVh: number;
  leadRatio: number;
  animSpan: number;
  holdSpan: number;
  ctaRawStart: number;
}

function getScrollSegments(isMobile: boolean): ScrollSegments {
  const extraVh = isMobile ? MOBILE_HOLD_VH + MOBILE_CTA_TAIL_VH : 0;
  const totalVh = LEAD_IN_VH + ANIM_SCROLL_VH + extraVh;
  const leadRatio = LEAD_IN_VH / totalVh;
  const animSpan = ANIM_SCROLL_VH / totalVh;
  const holdSpan = isMobile ? MOBILE_HOLD_VH / totalVh : 0;
  const ctaRawStart = leadRatio + animSpan + holdSpan;

  return { totalVh, leadRatio, animSpan, holdSpan, ctaRawStart };
}

function toAnimProgress(raw: number, seg: ScrollSegments): number {
  if (raw <= seg.leadRatio) return 0;
  const animEnd = seg.leadRatio + seg.animSpan;
  if (raw >= animEnd) return 1;
  return (raw - seg.leadRatio) / seg.animSpan;
}

function StaticRoadmap() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16">
      <ol className="space-y-10 border-l border-xamani-silver/20 pl-8">
        {MODELO_STEPS.map((step) => (
          <li key={step.id}>
            <p className="mb-1 font-ambit text-xs font-semibold tracking-[0.35em] text-xamani-wine">
              {step.number}
            </p>
            <h3 className="font-ambit text-base font-bold uppercase text-xamani-silver">
              {step.title}
            </h3>
            <p className="mt-2 font-archia text-sm text-xamani-silver-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <aside className="mt-14 max-w-xl">
        <p className="mb-8 font-archia text-lg leading-relaxed text-xamani-silver-muted sm:text-xl">
          {MODELO_CTA_COPY}
        </p>
        <PillLink href={ROUTES.equipo} className="min-w-[16rem] justify-center">
          Conviertete en Xamani
        </PillLink>
      </aside>
    </div>
  );
}

const INITIAL_SCROLL_STATE: RevealedScrollState = {
  revealedIds: new Set(),
  activeStepId: null,
  activeTitle: "Inicio",
  ctaRevealed: false,
  showScrollHint: true,
};

export default function ModeloRoadmapExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const scrollSegments = useMemo(
    () => getScrollSegments(isMobile),
    [isMobile]
  );
  const [scrollState, setScrollState] =
    useState<RevealedScrollState>(INITIAL_SCROLL_STATE);

  const { revealedIds, ctaRevealed, showScrollHint, activeTitle, activeStepId } =
    scrollState;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const animProgress = useTransform(scrollYProgress, (raw) =>
    toAnimProgress(raw, scrollSegments)
  );

  const updateRevealed = useCallback(
    (anim: number, raw: number) => {
      setScrollState((prev) =>
        computeRevealedScrollState(anim, raw, prev, {
          isMobile,
          ctaRawStart: scrollSegments.ctaRawStart,
          leadRatio: scrollSegments.leadRatio,
          animSpan: scrollSegments.animSpan,
          revealBackBuffer: REVEAL_BACK_BUFFER,
        })
      );
    },
    [
      isMobile,
      scrollSegments.ctaRawStart,
      scrollSegments.leadRatio,
      scrollSegments.animSpan,
    ]
  );

  useThrottledMotionValueEvent(scrollYProgress, (raw) => {
    updateRevealed(toAnimProgress(raw, scrollSegments), raw);
  });

  useEffect(() => {
    const raw = scrollYProgress.get();
    updateRevealed(toAnimProgress(raw, scrollSegments), raw);
  }, [scrollYProgress, isMobile, updateRevealed, scrollSegments]);

  const nudgeScroll = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 0.3, behavior: "smooth" });
  }, []);

  if (prefersReducedMotion) {
    return <StaticRoadmap />;
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Ruta de El Camino Xamani"
      className="relative -mt-20 w-full max-md:-mt-24 md:-mt-24"
      style={{ height: `${scrollSegments.totalVh}vh` }}
    >
      <div className="roadmap-sticky-viewport sticky top-0 relative flex min-h-[480px] overflow-hidden max-md:top-0 md:min-h-[520px]"
      >
        <div
          className={`relative mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-3 transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-md:justify-start max-md:pt-5 max-md:pb-5 sm:px-6 md:px-6 md:pb-6 md:pt-10 ${
            ctaRevealed ? "pointer-events-none opacity-20" : "opacity-100"
          } ${
            ctaRevealed && !prefersReducedMotion
              ? "blur-[6px] [transform:translateZ(0)]"
              : "blur-0"
          }`}
        >
          <div className="roadmap-perspective relative min-h-0 w-full flex-1 max-md:translate-y-5">
            <div className="roadmap-3d-plane relative h-full w-full">
              <ModeloRoadmapCanvas>
                <ModeloRoadmapPath progress={animProgress} />
                <ModeloRoadmapGlyph
                  progress={animProgress}
                  scrollYProgress={scrollYProgress}
                  resolveProgress={(raw) => toAnimProgress(raw, scrollSegments)}
                />
                {MODELO_STEPS.map((step) => (
                  <ModeloStepNode
                    key={step.id}
                    step={step}
                    visible={revealedIds.has(step.id)}
                    activeStepId={activeStepId}
                    isMobile={isMobile}
                  />
                ))}
              </ModeloRoadmapCanvas>

              {MODELO_STEPS.map((step) => (
                <ModeloStepCard
                  key={step.id}
                  step={step}
                  visible={revealedIds.has(step.id)}
                  activeStepId={activeStepId}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA a nivel del viewport sticky — blur cubre toda el área visible */}
        <ModeloRoadmapCta visible={ctaRevealed} />

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-1 z-20 flex justify-center md:bottom-3"
          initial={false}
          animate={{ opacity: showScrollHint && !ctaRevealed ? 1 : 0, y: showScrollHint && !ctaRevealed ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ pointerEvents: showScrollHint && !ctaRevealed ? "auto" : "none" }}>
            <ScrollIndicator
              variant="prominent"
              label="Descubrir..."
              labelPosition="below"
              animateEntrance={false}
              onClick={nudgeScroll}
            />
          </div>
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        Paso activo: {activeTitle}
      </p>
    </section>
  );
}
