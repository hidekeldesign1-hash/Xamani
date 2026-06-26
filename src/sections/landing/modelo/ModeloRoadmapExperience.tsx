"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import PillLink from "@/components/ui/PillLink";
import { ROUTES } from "@/data/heroMenu";
import {
  CTA_THRESHOLD,
  MODELO_CTA_COPY,
  MODELO_STEPS,
} from "./data";
import ModeloRoadmapCanvas from "./ModeloRoadmapCanvas";
import ModeloRoadmapCta from "./ModeloRoadmapCta";
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
      <aside className="mt-14 max-w-sm">
        <p className="mb-5 font-archia text-sm leading-relaxed text-xamani-silver-muted">
          {MODELO_CTA_COPY}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PillLink href={ROUTES.equipo} filled={false} className="justify-center">
            Conoce al equipo
          </PillLink>
          <PillLink href={ROUTES.asesoria} className="justify-center">
            Agenda una asesoría
          </PillLink>
        </div>
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
        : anim >= CTA_THRESHOLD;

      if (showCta) {
        setCtaRevealed(true);
      } else if (
        isMobile
          ? raw < scrollSegments.ctaRawStart - REVEAL_BACK_BUFFER
          : anim < CTA_THRESHOLD - REVEAL_BACK_BUFFER
      ) {
        setCtaRevealed(false);
      }

      const active =
        MODELO_STEPS.filter((s) => anim >= s.threshold).slice(-1)[0]?.title ??
        "Inicio";
      setActiveTitle(active);

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

  useMotionValueEvent(scrollYProgress, "change", (raw) => {
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
      aria-label="Ruta del modelo de negocio"
      className="relative -mt-20 w-full max-md:-mt-24 md:-mt-24"
      style={{ height: `${scrollSegments.totalVh}vh` }}
    >
      <div className="sticky top-0 relative flex h-[calc(100dvh-6.25rem-env(safe-area-inset-bottom))] min-h-[480px] overflow-hidden max-md:top-0 md:top-[max(5.75rem,calc(4.75rem+env(safe-area-inset-top)))] md:h-[calc(100dvh-max(5.75rem,calc(4.75rem+env(safe-area-inset-top))))] md:min-h-[520px]"
      >
        <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-3 max-md:justify-start max-md:pt-5 max-md:pb-5 sm:px-6 md:px-6 md:pb-6 md:pt-10">
          <div className="relative min-h-0 w-full flex-1 max-md:translate-y-5">
            <ModeloRoadmapCanvas>
              <ModeloRoadmapPath progress={animProgress} />

              {MODELO_STEPS.map((step) => (
                <ModeloStepNode
                  key={step.id}
                  step={step}
                  visible={revealedIds.has(step.id)}
                />
              ))}
            </ModeloRoadmapCanvas>

            {MODELO_STEPS.map((step) => (
              <ModeloStepCard
                key={step.id}
                step={step}
                visible={revealedIds.has(step.id)}
              />
            ))}

            <ModeloRoadmapCta visible={ctaRevealed} />
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-1 z-20 flex justify-center md:bottom-3"
          initial={false}
          animate={{ opacity: showScrollHint ? 1 : 0, y: showScrollHint ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ pointerEvents: showScrollHint ? "auto" : "none" }}>
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
