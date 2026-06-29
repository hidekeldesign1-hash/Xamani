"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import Isotipo from "@/components/brand/Isotipo";
import HeroNeonCanvas from "@/components/hero/HeroNeonCanvas";
import SiteFooter from "@/components/layout/SiteFooter";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_JOIN_URL } from "@/data/contact";
import { useThrottledMotionValueEvent } from "@/hooks/useThrottledMotionValueEvent";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

const WINE = "#771335";
const SILVER = "#babab9";
const SCROLL_VH = 360;
const MOBILE_SCROLL_VH = 300;

type BlockMotion = { opacity: number; y: number };

interface MotionTuning {
  fade: number;
  enterY: number;
  exitY: number;
}

const DESKTOP_TUNING: MotionTuning = { fade: 0.04, enterY: 48, exitY: -50 };
const MOBILE_TUNING: MotionTuning = { fade: 0.085, enterY: 22, exitY: -26 };

function computeBlockMotion(
  progress: number,
  start: number,
  end: number,
  tuning: MotionTuning
): BlockMotion {
  const { fade, enterY, exitY } = tuning;
  const isFirst = start <= 0;
  const isLast = end >= 1;

  if (isFirst) {
    if (progress <= end - fade) return { opacity: 1, y: 0 };
    if (progress >= end + fade) return { opacity: 0, y: exitY };
    const t = (progress - (end - fade)) / (2 * fade);
    return { opacity: 1 - t, y: exitY * t };
  }

  if (isLast) {
    if (progress <= start - fade) return { opacity: 0, y: enterY };
    if (progress >= start) return { opacity: 1, y: 0 };
    const t = (progress - (start - fade)) / fade;
    return { opacity: t, y: enterY * (1 - t) };
  }

  if (progress <= start - fade) return { opacity: 0, y: enterY };
  if (progress >= end + fade) return { opacity: 0, y: exitY };
  if (progress >= start && progress <= end - fade) return { opacity: 1, y: 0 };

  if (progress < start) {
    const t = (progress - (start - fade)) / fade;
    return { opacity: t, y: enterY * (1 - t) };
  }

  const t = (progress - (end - fade)) / (2 * fade);
  return { opacity: 1 - t, y: exitY * t };
}

function computeAllBlocks(progress: number, tuning: MotionTuning): BlockMotion[] {
  return [
    computeBlockMotion(progress, 0, 0.2, tuning),
    computeBlockMotion(progress, 0.21, 0.4, tuning),
    computeBlockMotion(progress, 0.41, 0.6, tuning),
    computeBlockMotion(progress, 0.61, 0.8, tuning),
    computeBlockMotion(progress, 0.81, 1, tuning),
  ];
}

function computeCtaMotion(progress: number, isMobile: boolean): BlockMotion {
  const showAt = isMobile ? 0.82 : 0.84;
  const fullAt = isMobile ? 0.9 : 0.92;
  const enterY = isMobile ? 18 : 28;

  if (progress <= showAt) return { opacity: 0, y: enterY };
  if (progress >= fullAt) return { opacity: 1, y: 0 };

  const t = (progress - showAt) / (fullAt - showAt);
  return { opacity: t, y: enterY * (1 - t) };
}

function applyBlockMotion(el: HTMLElement, motion: BlockMotion) {
  el.style.opacity = String(motion.opacity);
  el.style.transform = `translate3d(0, ${motion.y}px, 0)`;
  el.style.pointerEvents = motion.opacity > 0.05 ? "auto" : "none";
}

function ManifiestoClosing({
  ctaRef,
}: {
  ctaRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex flex-col items-center gap-7 sm:gap-8">
      <div className="h-11 w-11 text-xamani-silver/35 sm:h-12 sm:w-12">
        <Isotipo className="h-full w-full" />
      </div>
      <p className="font-ambit text-[clamp(1.75rem,5vw,3rem)] font-normal text-xamani-silver">
        Conviértete en <span className="font-bold text-white">XAMANI</span>
      </p>
      <div
        ref={ctaRef}
        className="will-change-[transform,opacity]"
        style={{ opacity: 0, transform: "translate3d(0, 18px, 0)", pointerEvents: "none" }}
      >
        <PillLink href={WHATSAPP_JOIN_URL} className="mt-2 sm:mt-4">
          Enviar mi perfil
        </PillLink>
      </div>
    </div>
  );
}

function ScrollBlock({
  blockRef,
  initialVisible = false,
  children,
}: {
  blockRef: (el: HTMLDivElement | null) => void;
  initialVisible?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      ref={blockRef}
      className="absolute inset-0 flex items-center justify-center px-2 will-change-[transform,opacity]"
      style={{
        opacity: initialVisible ? 1 : 0,
        transform: "translate3d(0, 0, 0)",
        pointerEvents: initialVisible ? "auto" : "none",
      }}
    >
      <div className="w-full max-w-4xl text-center">{children}</div>
    </div>
  );
}

function StaticManifiesto() {
  return (
    <section
      id="manifiesto"
      aria-label="Manifiesto"
      className="relative overflow-hidden bg-[#0b1520] px-6 py-24 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroNeonCanvas className="absolute inset-0 h-full w-full" active />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0b1520]/30 via-transparent to-[#0b1520]/55"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto max-w-4xl space-y-24 text-center">
        <div>
          <h1 className="font-ambit text-3xl font-bold leading-tight text-xamani-silver sm:text-4xl">
            Este es un llamado a la{" "}
            <span style={{ color: WINE }}>TRANSFORMACIÓN</span>.
          </h1>
          <p className="mt-6 font-archia text-base text-[#babab9] sm:text-lg">
            Este es el camino del héroe que eligen los valientes como tú.
          </p>
        </div>
        <div className="space-y-6">
          <p className="font-ambit text-2xl font-light text-xamani-silver">
            Ser XAMANI es un estado del ser.
          </p>
          <p className="font-ambit text-3xl font-bold text-xamani-silver">
            Ser es <span style={{ color: SILVER }}>XAMANI</span> es{" "}
            <span style={{ color: WINE }}>PUNK</span>.
          </p>
        </div>
        <div className="space-y-8">
          <p className="font-archia text-base text-xamani-silver sm:text-lg">
            Arriesga siempre, hazlo diferente, no repitas, deja de estar
            anestesiado.
          </p>
          <p
            className="font-ambit text-2xl font-bold sm:text-3xl"
            style={{ color: WINE }}
          >
            Muévete. Avanza. Siempre.
          </p>
          <p className="mx-auto inline-block border border-xamani-wine/30 px-6 py-4 font-ambit text-xl font-bold text-xamani-silver">
            Trabaja chingón y gana chingón.
          </p>
        </div>
        <div className="space-y-8 font-archia text-base leading-relaxed text-xamani-silver sm:text-lg">
          <p>
            Nunca dejes de soñar porque tú{" "}
            <span className="font-bold" style={{ color: WINE }}>
              BRILLAS
            </span>{" "}
            distinto porque si lo haces con amor, iluminas el camino porque si
            confías, escribes tu propia historia.
          </p>
          <p>
            Transforma lo invisible y hazlo aunque tengas miedo, aunque duela;{" "}
            <span className="font-bold" style={{ color: WINE }}>
              cuando tú te transformas
            </span>
            , transformas la vida de los que te rodean.
          </p>
        </div>
        <div className="flex flex-col items-center gap-7 sm:gap-8">
          <div className="h-11 w-11 text-xamani-silver/35 sm:h-12 sm:w-12">
            <Isotipo className="h-full w-full" />
          </div>
          <p className="font-ambit text-[clamp(1.75rem,5vw,3rem)] font-normal text-xamani-silver">
            Conviértete en <span className="font-bold text-white">XAMANI</span>
          </p>
          <PillLink href={WHATSAPP_JOIN_URL} className="mt-2 sm:mt-4">
            Enviar mi perfil
          </PillLink>
        </div>
      </div>
      <SiteFooter className="!mt-16" />
    </section>
  );
}

export default function ElManifiesto() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayHiddenRef = useRef(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const scrollVh = isMobile ? MOBILE_SCROLL_VH : SCROLL_VH;

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const registerBlockRef = useCallback((index: number, el: HTMLDivElement | null) => {
    blockRefs.current[index] = el;
  }, []);

  const applyScrollMotion = useCallback(
    (progress: number) => {
      const animProgress = Math.min(1, Math.max(0, progress));
      const tuning = isMobile ? MOBILE_TUNING : DESKTOP_TUNING;
      const motions = computeAllBlocks(animProgress, tuning);
      const ctaMotion = computeCtaMotion(animProgress, isMobile);

      motions.forEach((motion, index) => {
        const el = blockRefs.current[index];
        if (el) applyBlockMotion(el, motion);
      });

      const ctaEl = ctaRef.current;
      if (ctaEl) applyBlockMotion(ctaEl, ctaMotion);

      const discoverOpacity = Math.max(0, 1 - animProgress / 0.07);
      const discoverEl = discoverRef.current;
      if (discoverEl) {
        discoverEl.style.opacity = String(discoverOpacity);
        discoverEl.style.visibility = discoverOpacity > 0.02 ? "visible" : "hidden";
        discoverEl.style.pointerEvents = discoverOpacity > 0.2 ? "auto" : "none";
      }

      const shouldHideOverlay = animProgress >= 0.995;
      if (shouldHideOverlay !== overlayHiddenRef.current) {
        overlayHiddenRef.current = shouldHideOverlay;
        const overlay = overlayRef.current;
        if (overlay) {
          overlay.style.opacity = shouldHideOverlay ? "0" : "1";
          overlay.style.pointerEvents = shouldHideOverlay ? "none" : "auto";
          overlay.setAttribute("aria-hidden", String(shouldHideOverlay));
        }
      }
    },
    [isMobile]
  );

  useThrottledMotionValueEvent(scrollYProgress, applyScrollMotion);

  useEffect(() => {
    applyScrollMotion(scrollYProgress.get());
  }, [applyScrollMotion, scrollYProgress]);

  useEffect(() => {
    if (!isMobile) return;

    const lockViewport = () => {
      const h = Math.round(window.visualViewport?.height ?? window.innerHeight);
      document.documentElement.style.setProperty("--manifiesto-vh", `${h}px`);
    };

    document.documentElement.style.backgroundColor = "#0b1520";
    document.documentElement.style.overscrollBehaviorY = "none";
    document.body.style.backgroundColor = "#0b1520";
    document.body.style.overscrollBehaviorY = "none";
    lockViewport();

    window.addEventListener("orientationchange", lockViewport);
    return () => {
      window.removeEventListener("orientationchange", lockViewport);
      document.documentElement.style.removeProperty("--manifiesto-vh");
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.overscrollBehaviorY = "";
      document.body.style.backgroundColor = "";
      document.body.style.overscrollBehaviorY = "";
    };
  }, [isMobile]);

  const nudgeScroll = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * (isMobile ? 0.22 : 0.18), behavior: "smooth" });
  }, [isMobile]);

  if (prefersReducedMotion) {
    return <StaticManifiesto />;
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="relative w-full"
        style={{ height: `${scrollVh}vh` }}
        aria-hidden="true"
      />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[6] bg-[#0b1520] max-md:h-[var(--manifiesto-vh,100svh)] md:inset-0">
        <HeroNeonCanvas
          className="absolute inset-0 h-full w-full"
          active
          pinViewport={isMobile}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0b1520]/35 via-transparent to-[#0b1520]/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0b1520]/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      <section
        ref={overlayRef}
        aria-label="Manifiesto"
        className="fixed inset-0 z-[8] flex items-center justify-center"
        style={{ opacity: 1 }}
      >
        <div className="relative h-[min(70vh,540px)] w-full max-w-4xl px-6 sm:px-8">
          <ScrollBlock blockRef={(el) => registerBlockRef(0, el)} initialVisible>
            <h1 className="text-balance font-ambit text-[clamp(1.75rem,5.5vw,3.25rem)] font-bold leading-[1.15] text-xamani-silver">
              Este es un llamado a la{" "}
              <span style={{ color: WINE }}>TRANSFORMACIÓN</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-archia text-base leading-relaxed text-[#babab9] sm:mt-8 sm:text-lg">
              Este es el camino del héroe que eligen los valientes como tú.
            </p>
          </ScrollBlock>

          <ScrollBlock blockRef={(el) => registerBlockRef(1, el)}>
            <div className="space-y-6 sm:space-y-8">
              <p className="font-ambit text-[clamp(1.35rem,4vw,2.25rem)] font-light leading-snug tracking-wide text-xamani-silver">
                Ser XAMANI es un estado del ser.
              </p>
              <p className="font-ambit text-[clamp(1.65rem,5vw,2.75rem)] font-bold leading-tight text-xamani-silver">
                Ser es <span style={{ color: SILVER }}>XAMANI</span> es{" "}
                <span style={{ color: WINE }}>PUNK</span>.
              </p>
            </div>
          </ScrollBlock>

          <ScrollBlock blockRef={(el) => registerBlockRef(2, el)}>
            <div className="space-y-8 sm:space-y-10">
              <p className="mx-auto max-w-2xl font-archia text-base leading-relaxed text-xamani-silver sm:text-lg">
                Arriesga siempre, hazlo diferente, no repitas, deja de estar
                anestesiado.
              </p>
              <p
                className="font-ambit text-[clamp(1.5rem,4.5vw,2.5rem)] font-bold leading-tight"
                style={{ color: WINE }}
              >
                Muévete.
                <br />
                Avanza.
                <br />
                Siempre.
              </p>
              <p className="mx-auto inline-block border border-xamani-wine/35 px-6 py-3.5 font-ambit text-lg font-bold text-xamani-silver sm:px-8 sm:py-4 sm:text-xl">
                Trabaja chingón y gana chingón.
              </p>
            </div>
          </ScrollBlock>

          <ScrollBlock blockRef={(el) => registerBlockRef(3, el)}>
            <div className="mx-auto max-w-3xl space-y-8 sm:space-y-10">
              <p className="font-archia text-base leading-[1.9] text-xamani-silver sm:text-lg">
                Nunca dejes de soñar porque tú{" "}
                <span className="font-bold" style={{ color: WINE }}>
                  BRILLAS
                </span>{" "}
                distinto porque si lo haces con amor, iluminas el camino porque
                si confías, escribes tu propia historia.
              </p>
              <p className="font-archia text-base leading-[1.9] text-xamani-silver sm:text-lg">
                Transforma lo invisible y hazlo aunque tengas miedo, aunque
                duela;{" "}
                <span className="font-bold" style={{ color: WINE }}>
                  cuando tú te transformas
                </span>
                , transformas la vida de los que te rodean.
              </p>
            </div>
          </ScrollBlock>

          <ScrollBlock blockRef={(el) => registerBlockRef(4, el)}>
            <ManifiestoClosing ctaRef={ctaRef} />
          </ScrollBlock>
        </div>

        <div
          ref={discoverRef}
          className="absolute inset-x-0 z-10 flex justify-center max-md:bottom-[calc(6.25rem+env(safe-area-inset-bottom))] max-md:top-auto md:bottom-20"
          style={{ opacity: 1, visibility: "visible" }}
          aria-hidden={false}
        >
          <ScrollIndicator animateEntrance={false} onClick={nudgeScroll} />
        </div>
      </section>

      <SiteFooter className="relative z-[9] !mt-0" />
    </>
  );
}
