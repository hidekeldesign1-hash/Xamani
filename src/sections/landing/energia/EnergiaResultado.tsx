"use client";

import { motion, useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl } from "@/data/contact";
import { EnergiaTypeIcon } from "./EnergiaIcons";
import {
  buildEnergiaWhatsAppMessage,
  ENERGIA_TYPES,
  getEnergiaCombination,
  type EnergiaResult,
} from "./energiaTypes";

interface EnergiaResultadoProps {
  result: EnergiaResult;
  onBack?: () => void;
}

export default function EnergiaResultado({ result, onBack }: EnergiaResultadoProps) {
  const prefersReducedMotion = useReducedMotion();
  const dominant = ENERGIA_TYPES[result.dominant];
  const complementary = ENERGIA_TYPES[result.complementary];
  const combination = getEnergiaCombination(result.dominant, result.complementary);
  const whatsappUrl = buildWhatsAppUrl(buildEnergiaWhatsAppMessage(result));

  const ease = [0.22, 1, 0.36, 1] as const;
  const fade = (delay: number) =>
    prefersReducedMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease },
        };

  return (
    <div className="mx-auto w-full max-w-6xl pb-[env(safe-area-inset-bottom)]">
      {onBack ? (
        <div className="mb-5 flex justify-start sm:mb-6">
          <button
            type="button"
            onClick={onBack}
            aria-label="Regresar a la revelación"
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-xamani-silver/70 transition-colors duration-300 hover:border-xamani-cyan/50 hover:bg-xamani-cyan/10 hover:text-xamani-cyan hover:shadow-glow sm:h-10 sm:w-10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
              <path
                d="M14 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 12h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-5 lg:items-stretch">
        <motion.article
          className="relative flex flex-col overflow-hidden rounded-card-lg border border-white/12 bg-[#0b1520]/94 p-5 shadow-glass max-md:backdrop-blur-sm sm:p-7 md:bg-[#0b1520]/88 md:p-8 md:backdrop-blur-glass"
          {...fade(0.05)}
        >
          <span className="inline-flex w-fit rounded-pill border border-white/20 px-3.5 py-1 font-archia text-[0.55rem] uppercase tracking-[0.28em] text-xamani-silver/85">
            Resultado
          </span>

          <h2
            className="mt-5 font-ambit text-[clamp(2.1rem,8vw,3.5rem)] font-semibold uppercase leading-none tracking-[0.1em] sm:tracking-[0.12em]"
            style={{ color: dominant.accent }}
          >
            {dominant.name}
          </h2>

          <p className="mt-2 font-archia text-base text-xamani-silver sm:text-lg">
            {dominant.shortLabel}
          </p>

          <p className="mt-4 max-w-xl font-archia text-sm leading-relaxed text-xamani-silver/75 sm:text-[0.95rem]">
            {dominant.description}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2 border-y border-white/10 py-4 sm:mt-8 sm:gap-4">
            <div className="min-w-0">
              <p className="font-archia text-[0.5rem] uppercase tracking-[0.14em] text-xamani-silver/45 sm:text-[0.55rem] sm:tracking-[0.2em]">
                Dominante
              </p>
              <p
                className="mt-1.5 break-words font-ambit text-xs uppercase tracking-[0.08em] sm:text-base sm:tracking-[0.12em]"
                style={{ color: dominant.accent }}
              >
                {dominant.name}
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-archia text-[0.5rem] uppercase tracking-[0.14em] text-xamani-silver/45 sm:text-[0.55rem] sm:tracking-[0.2em]">
                Complementaria
              </p>
              <p
                className="mt-1.5 break-words font-ambit text-xs uppercase tracking-[0.08em] sm:text-base sm:tracking-[0.12em]"
                style={{ color: complementary.accent }}
              >
                {complementary.name}
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-archia text-[0.5rem] uppercase tracking-[0.14em] text-xamani-silver/45 sm:text-[0.55rem] sm:tracking-[0.2em]">
                Combinación
              </p>
              <p className="mt-1.5 break-words font-archia text-xs lowercase tracking-[0.02em] text-xamani-cyan sm:text-base sm:tracking-[0.04em]">
                {combination.keyword}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-4 sm:mt-7 sm:px-5 sm:py-5">
            <p className="font-ambit text-[0.78rem] uppercase leading-snug tracking-[0.12em] text-xamani-silver sm:text-xs">
              {combination.title}
            </p>
            <p className="mt-2.5 font-archia text-sm leading-relaxed text-xamani-silver/70">
              {combination.description}
            </p>
          </div>

          <div className="mt-8 flex justify-center pb-1 sm:mt-10">
            <div className="rounded-pill bg-gradient-to-r from-xamani-wine/80 via-xamani-wine to-xamani-wine/80 p-px shadow-[0_0_24px_rgba(119,19,53,0.35)]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-pill bg-[#0b1520]/95 px-8 py-3.5 font-ambit text-[0.68rem] uppercase tracking-[0.18em] text-xamani-silver transition-colors duration-300 hover:bg-[#120818]/95 active:scale-[0.98] sm:px-10 sm:text-xs sm:tracking-[0.26em]"
              >
                Quiero formar parte
              </a>
            </div>
          </div>
        </motion.article>

        <div className="flex flex-col gap-4 lg:gap-5">
          <motion.article
            className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-card-lg border border-white/12 bg-[#0b1520]/94 px-5 py-6 text-center shadow-glass max-md:backdrop-blur-sm sm:px-6 sm:py-7 md:bg-[#0b1520]/88 md:backdrop-blur-glass"
            {...fade(0.15)}
          >
            <EnergiaTypeIcon
              type={complementary.id}
              className="h-[5.5rem] w-[5.5rem] sm:h-[6.25rem] sm:w-[6.25rem] md:h-[6.75rem] md:w-[6.75rem]"
            />

            <h3
              className="mt-5 font-ambit text-[clamp(1.75rem,4vw,2.15rem)] font-semibold uppercase tracking-[0.12em] sm:mt-6"
              style={{ color: complementary.accent }}
            >
              {complementary.name}
            </h3>

            <p className="mt-2 font-archia text-base text-xamani-silver sm:text-lg">
              {complementary.shortLabel}
            </p>

            <p className="mt-4 max-w-sm font-archia text-[0.95rem] leading-relaxed text-xamani-silver/70 sm:mt-5 sm:text-base">
              {complementary.complementaryBlurb}
            </p>
          </motion.article>

          <motion.article
            className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-card-lg border border-white/12 bg-[#0b1520]/94 px-5 py-6 text-center shadow-glass max-md:backdrop-blur-sm sm:px-6 sm:py-7 md:bg-[#0b1520]/88 md:backdrop-blur-glass"
            {...fade(0.25)}
          >
            <h3 className="max-w-sm text-balance font-ambit text-[clamp(0.95rem,2.4vw,1.2rem)] uppercase leading-snug tracking-[0.12em] text-xamani-silver sm:tracking-[0.16em]">
              Tu camino en XAMANI puede comenzar aquí
            </h3>

            <p className="mt-5 max-w-sm font-archia text-[0.95rem] leading-relaxed text-xamani-silver/70 sm:mt-6 sm:text-base">
              Conoce cómo podrías desarrollar tu energía dentro de la comunidad.
            </p>

            <div className="mt-7 w-full max-w-xs sm:mt-8">
              <div className="rounded-pill bg-gradient-to-r from-xamani-cyan/70 via-xamani-cyan/40 to-xamani-cyan/70 p-px">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-pill bg-[#0b1520]/95 px-6 py-3.5 font-ambit text-[0.68rem] uppercase tracking-[0.18em] text-xamani-silver transition-colors duration-300 hover:bg-[#0f1d2c]/95 active:scale-[0.98] sm:text-xs sm:tracking-[0.22em]"
                >
                  Ir a WhatsApp
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
