"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import PillLink from "@/components/ui/PillLink";
import { useThrottledMotionValueEvent } from "@/hooks/useThrottledMotionValueEvent";
import { ROUTES } from "@/data/heroMenu";
import {
  DESKTOP_CTA_THRESHOLD,
  MODELO_CTA_COPY,
  MODELO_STEPS,
} from "./data";
import ModeloRoadmapCanvas from "./ModeloRoadmapCanvas";
import ModeloRoadmapCta from "./ModeloRoadmapCta";
import ModeloRoadmapGlyph from "./ModeloRoadmapGlyph";
import ModeloRoadmapPath from "./ModeloRoadmapPath";
import ModeloStepCard from "./ModeloStepCard";
import ModeloStepNode from "./ModeloStepNode";
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

export default function ModeloRoadmapExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const scrollSegments = getScrollSegments(isMobile);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const [ctaRevealed, setCtaRevealed] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [activeTitle, setActiveTitle] = useState("Inicio");
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const animProgress = useTransform(scrollYProgress, (raw) =>
    toAnimProgress(raw, scrollSegments)
  );

  const updateRevealed = useCallback(
    (anim: number, raw: number) => {
      setRevealedIds((prev) => {
        const next = new Set(prev);
        for (const step of MODELO_STEPS) {
          if (anim >= step.threshold) {
            next.add(step.id);
          } else if (anim < step.threshold - REVEAL_BACK_BUFFER) {
            next.delete(step.id);
          }
        }
        return next;
      });

      const showCta = isMobile
        ? raw >= scrollSegments.ctaRawStart
        : anim >= DESKTOP_CTA_THRESHOLD;

      if (showCta) {
        setCtaRevealed(true);
      } else if (
        isMobile
          ? raw < scrollSegments.ctaRawStart - REVEAL_BACK_BUFFER
          : anim < DESKTOP_CTA_THRESHOLD - REVEAL_BACK_BUFFER
      ) {
        setCtaRevealed(false);
      }

      const activeStep =
        MODELO_STEPS.filter((s) => anim >= s.threshold).slice(-1)[0] ?? null;
      setActiveTitle(activeStep?.title ?? "Inicio");
      setActiveStepId(activeStep?.id ?? null);

      const hintFadeEnd = scrollSegments.leadRatio + scrollSegments.animSpan * 0.1;
      setShowScrollHint(!showCta && raw < hintFadeEnd);
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
        <motion.div
          className="relative mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-3 max-md:justify-start max-md:pt-5 max-md:pb-5 sm:px-6 md:px-6 md:pb-6 md:pt-10"
          initial={false}
          animate={{
            opacity: ctaRevealed ? 0.2 : 1,
            filter: ctaRevealed && !prefersReducedMotion ? "blur(6px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: ctaRevealed ? "none" : "auto" }}
        >
          <div className="relative min-h-0 w-full flex-1 max-md:translate-y-5 [perspective:1200px]">
            <div className="relative h-full w-full origin-center [transform-style:preserve-3d] [transform:rotateX(15deg)] [backface-visibility:hidden]">
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
                  />
                ))}
              </ModeloRoadmapCanvas>

              {MODELO_STEPS.map((step) => (
                <ModeloStepCard
                  key={step.id}
                  step={step}
                  visible={revealedIds.has(step.id)}
                  activeStepId={activeStepId}
                />
              ))}
            </div>
          </div>
        </motion.div>

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
