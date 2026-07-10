"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Isotipo from "@/components/brand/Isotipo";
import HeroNeonCanvas from "@/components/hero/HeroNeonCanvas";
import EnergiaProcessFlow from "@/sections/landing/energia/EnergiaProcessFlow";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

type EnergiaStep = "intro" | "intake";

const FEATURES = [
  {
    id: "questions",
    label: "20 PREGUNTAS ENFOCADAS EN TI",
    icon: "target",
  },
  {
    id: "time",
    label: "2 - 3 MINUTOS PARA CONOCERTE",
    icon: "clock",
  },
  {
    id: "result",
    label: "RESULTADO INMEDIATO",
    icon: "star",
  },
] as const;

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  if (type === "target") {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#6ec4d9" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="20" cy="20" r="11" fill="none" stroke="#6ec4d9" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="20" cy="20" r="4.5" fill="#6ec4d9" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#babab9" strokeOpacity="0.55" strokeWidth="1.2" />
        <path
          d="M20 11v9l6 4"
          fill="none"
          stroke="#babab9"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
      <path
        d="M20 4l2.2 6.8H29l-5.6 4.1 2.1 6.8L20 17.6l-5.5 4.1 2.1-6.8L11 10.8h6.8L20 4z"
        fill="none"
        stroke="#771335"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="3" fill="#771335" fillOpacity="0.85" />
    </svg>
  );
}

function EnergiaLogo() {
  return (
    <span
      className="inline-flex max-w-full items-center font-ambit text-[clamp(1.85rem,8.5vw,4.5rem)] font-semibold uppercase leading-none tracking-[0.1em] sm:tracking-[0.18em]"
      aria-hidden="true"
    >
      <span className="text-xamani-wine">XΛMΛNI</span>
    </span>
  );
}

function EnergiaRing() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="energia-ring-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#6ec4d9" stopOpacity="0.95" />
          <stop offset="52%" stopColor="#babab9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#771335" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle
        cx="180"
        cy="180"
        r="168"
        fill="none"
        stroke="url(#energia-ring-gradient)"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function GradientDivider() {
  return (
    <div className="relative mx-auto my-5 w-full max-w-[15rem] sm:my-6 sm:max-w-[18rem] lg:max-w-[20rem]">
      <div
        className="h-px w-full bg-gradient-to-r from-xamani-cyan via-xamani-silver/25 to-xamani-wine"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-xamani-silver/70 sm:h-5 sm:w-5">
        <Isotipo className="h-full w-full" />
      </div>
    </div>
  );
}

export default function EnergiaXamani() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<EnergiaStep>("intro");
  const [showingResultado, setShowingResultado] = useState(false);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  const allowVerticalScroll = step !== "intro" || showingResultado || isMobile;

  return (
    <section
      id="agenda-asesoria"
      aria-label="Descubre tu energía XAMANI"
      className={`energia-min-h relative overflow-x-hidden overscroll-x-none bg-[#0b1520] ${
        allowVerticalScroll ? "overflow-y-auto overscroll-y-contain" : "overflow-hidden"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroNeonCanvas
          className="absolute inset-0 h-full w-full"
          active
          pinViewport={isMobile && !prefersReducedMotion && !showingResultado}
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

      <div
        className={`energia-min-h relative z-10 flex w-full justify-center px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[calc(var(--nav-offset)+1.25rem)] sm:px-8 sm:pt-[calc(var(--nav-offset)+1.5rem)] md:px-12 lg:px-16 ${
          showingResultado ? "items-start" : "items-center"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {step === "intro" ? (
            <motion.div
              key="energia-intro"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              transition={transition}
              className="mx-auto my-auto flex w-full max-w-5xl flex-col items-center"
            >
              <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[30rem] lg:max-w-[34rem]">
                <div className="relative mx-auto aspect-square w-full max-w-[min(100%,52vh)] sm:max-w-none">
                  <EnergiaRing />

                  <div className="absolute inset-0 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:px-5 max-md:pb-3 max-md:pt-5 max-md:text-center md:grid md:place-items-center md:px-10 md:text-center">
                    <div className="flex flex-col items-center text-center md:-translate-y-1 lg:-translate-y-2">
                      <div className="mb-3 h-6 w-6 text-xamani-silver/80 sm:mb-4 sm:h-7 sm:w-7 md:mb-6 md:h-12 md:w-12 lg:mb-7 lg:h-14 lg:w-14">
                        <Isotipo className="h-full w-full" />
                      </div>

                      <p className="font-archia text-[0.58rem] uppercase tracking-[0.34em] text-xamani-silver/85 sm:text-micro">
                        Descubre tu
                      </p>

                      <h1 className="mt-2 font-ambit text-[clamp(2.1rem,9vw,4.75rem)] font-light uppercase leading-[0.95] tracking-[0.08em] text-white sm:tracking-[0.1em] md:text-[clamp(2.75rem,4.5vw,4.5rem)]">
                        Energía
                      </h1>

                      <div className="mt-1 sm:mt-2">
                        <EnergiaLogo />
                      </div>

                      <GradientDivider />

                      <p className="max-w-[16rem] font-archia text-[0.8rem] leading-relaxed text-xamani-silver/80 sm:max-w-[18rem] sm:text-sm md:max-w-[22rem] md:text-base">
                        Conoce la energía que te impulsa de forma natural y cómo puede llevarte más
                        lejos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-1.5 sm:mt-10 sm:gap-4 lg:mt-12 lg:max-w-4xl lg:gap-6">
                {FEATURES.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`flex flex-col items-center px-0.5 text-center sm:px-3 ${
                      index > 0 ? "border-l border-white/10" : ""
                    }`}
                  >
                    <div className="mb-2.5 flex h-9 items-center justify-center sm:mb-4 sm:h-11">
                      <FeatureIcon type={feature.icon} />
                    </div>
                    <p className="font-archia text-[0.5rem] uppercase leading-snug tracking-[0.1em] text-xamani-silver/75 sm:text-[0.58rem] sm:tracking-[0.16em] md:text-[0.62rem] lg:text-xs lg:tracking-[0.18em]">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 sm:mt-10 lg:mt-12">
                <div className="rounded-pill bg-gradient-to-r from-xamani-cyan via-xamani-silver/35 to-xamani-wine p-px shadow-[0_0_28px_rgba(110,196,217,0.12)]">
                  <button
                    type="button"
                    onClick={() => setStep("intake")}
                    className="inline-flex min-h-[48px] min-w-[min(82vw,17rem)] touch-manipulation items-center justify-center gap-3 rounded-pill bg-[#0b1520]/92 px-10 py-3.5 font-ambit text-[0.68rem] uppercase tracking-[0.22em] text-xamani-silver transition-colors duration-300 ease-out-expo hover:bg-[#0f1d2c]/95 active:scale-[0.98] sm:min-w-[18rem] sm:px-12 sm:text-xs sm:tracking-[0.32em] md:min-w-[20rem] md:px-14 md:py-4 lg:min-w-[22rem]"
                  >
                    Comenzar
                    <span aria-hidden="true" className="text-base leading-none">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="energia-intake"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              transition={transition}
              className={`w-full max-w-6xl ${showingResultado ? "" : "my-auto"}`}
            >
              <EnergiaProcessFlow
                onBackToIntro={() => {
                  setShowingResultado(false);
                  setStep("intro");
                }}
                onResultadoChange={setShowingResultado}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
