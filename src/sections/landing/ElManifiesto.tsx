"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import Isotipo from "@/components/brand/Isotipo";
import SiteFooter from "@/components/layout/SiteFooter";
import PillLink from "@/components/ui/PillLink";
import { useThrottledMotionValueEvent } from "@/hooks/useThrottledMotionValueEvent";
import { useIsMobile } from "@/sections/landing/modelo/useIsMobile";

const WINE = "#771335";
const SILVER = "#babab9";
const SCROLL_VH = 360;
const MOBILE_SCROLL_VH = 260;
const PERFIL_MAILTO =
  "mailto:HOLA@XAMANI.COM.MX?subject=Enviar%20mi%20perfil";

type BlockMotion = { opacity: number; y: number };

function computeBlockMotion(
  progress: number,
  start: number,
  end: number
): BlockMotion {
  const fade = 0.04;
  const isFirst = start <= 0;
  const isLast = end >= 1;

  if (isFirst) {
    if (progress <= end - fade) return { opacity: 1, y: 0 };
    if (progress >= end + fade) return { opacity: 0, y: -50 };
    const t = (progress - (end - fade)) / (2 * fade);
    return { opacity: 1 - t, y: -50 * t };
  }

  if (isLast) {
    if (progress <= start - fade) return { opacity: 0, y: 48 };
    if (progress >= start) return { opacity: 1, y: 0 };
    const t = (progress - (start - fade)) / fade;
    return { opacity: t, y: 48 * (1 - t) };
  }

  if (progress <= start - fade) return { opacity: 0, y: 48 };
  if (progress >= end + fade) return { opacity: 0, y: -50 };
  if (progress >= start && progress <= end - fade) return { opacity: 1, y: 0 };

  if (progress < start) {
    const t = (progress - (start - fade)) / fade;
    return { opacity: t, y: 48 * (1 - t) };
  }

  const t = (progress - (end - fade)) / (2 * fade);
  return { opacity: 1 - t, y: -50 * t };
}

function computeAllBlocks(progress: number): BlockMotion[] {
  return [
    computeBlockMotion(progress, 0, 0.2),
    computeBlockMotion(progress, 0.21, 0.4),
    computeBlockMotion(progress, 0.41, 0.6),
    computeBlockMotion(progress, 0.61, 0.8),
    computeBlockMotion(progress, 0.81, 1),
  ];
}

function computeCtaMotion(progress: number): BlockMotion {
  const showAt = 0.84;
  const fullAt = 0.92;

  if (progress <= showAt) return { opacity: 0, y: 28 };
  if (progress >= fullAt) return { opacity: 1, y: 0 };

  const t = (progress - showAt) / (fullAt - showAt);
  return { opacity: t, y: 28 * (1 - t) };
}

function ManifiestoClosing({ ctaMotion }: { ctaMotion: BlockMotion }) {
  return (
    <div className="flex flex-col items-center gap-7 sm:gap-8">
      <div className="h-11 w-11 text-xamani-silver/35 sm:h-12 sm:w-12">
        <Isotipo className="h-full w-full" />
      </div>
      <p className="font-ambit text-[clamp(1.75rem,5vw,3rem)] font-normal text-xamani-silver">
        Conviértete en <span className="font-bold text-white">XAMANI</span>
      </p>
      <motion.div
        style={{
          opacity: ctaMotion.opacity,
          transform: `translate3d(0, ${ctaMotion.y}px, 0)`,
          pointerEvents: ctaMotion.opacity > 0.05 ? "auto" : "none",
        }}
      >
        <PillLink href={PERFIL_MAILTO} className="mt-2 sm:mt-4">
          Enviar mi perfil
        </PillLink>
      </motion.div>
    </div>
  );
}

function ScrollBlock({
  motion: block,
  children,
}: {
  motion: BlockMotion;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-2"
      style={{
        opacity: block.opacity,
        transform: `translate3d(0, ${block.y}px, 0)`,
        pointerEvents: block.opacity > 0.05 ? "auto" : "none",
      }}
    >
      <div className="w-full max-w-4xl text-center">{children}</div>
    </motion.div>
  );
}

function StaticManifiesto() {
  return (
    <section
      id="manifiesto"
      aria-label="El Manifiesto"
      className="bg-xamani-navy-surface px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-4xl space-y-24 text-center">
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
        <ManifiestoClosing ctaMotion={{ opacity: 1, y: 0 }} />
      </div>
      <SiteFooter className="!mt-16" />
    </section>
  );
}

export default function ElManifiesto() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const scrollVh = isMobile ? MOBILE_SCROLL_VH : SCROLL_VH;
  const [blocks, setBlocks] = useState<BlockMotion[]>(() =>
    computeAllBlocks(0)
  );
  const [cta, setCta] = useState<BlockMotion>(() => computeCtaMotion(0));
  const [animDone, setAnimDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useThrottledMotionValueEvent(scrollYProgress, (progress) => {
    const animProgress = Math.min(1, progress);
    setBlocks(computeAllBlocks(animProgress));
    setCta(computeCtaMotion(animProgress));
    setAnimDone(progress >= 0.995);
  });

  if (prefersReducedMotion) {
    return <StaticManifiesto />;
  }

  return (
    <>
      <div
        ref={scrollRef}
        id="manifiesto"
        className="relative w-full"
        style={{ height: `${scrollVh}vh` }}
        aria-hidden={animDone}
      />

      <section
        aria-label="El Manifiesto"
        aria-hidden={animDone}
        className={`fixed inset-0 z-[8] flex items-center justify-center bg-xamani-navy-surface transition-opacity duration-300 ${
          animDone ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative h-[min(70vh,540px)] w-full max-w-4xl px-6 sm:px-8">
          <ScrollBlock motion={blocks[0]}>
            <h1 className="text-balance font-ambit text-[clamp(1.75rem,5.5vw,3.25rem)] font-bold leading-[1.15] text-xamani-silver">
              Este es un llamado a la{" "}
              <span style={{ color: WINE }}>TRANSFORMACIÓN</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-archia text-base leading-relaxed text-[#babab9] sm:mt-8 sm:text-lg">
              Este es el camino del héroe que eligen los valientes como tú.
            </p>
          </ScrollBlock>

          <ScrollBlock motion={blocks[1]}>
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

          <ScrollBlock motion={blocks[2]}>
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

          <ScrollBlock motion={blocks[3]}>
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

          <ScrollBlock motion={blocks[4]}>
            <ManifiestoClosing ctaMotion={cta} />
          </ScrollBlock>
        </div>
      </section>

      <SiteFooter className="relative z-[9] !mt-0" />
    </>
  );
}
