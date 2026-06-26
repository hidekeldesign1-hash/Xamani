"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "@/components/brand/Logo";
import Isotipo from "@/components/brand/Isotipo";
import Tagline from "@/components/brand/Tagline";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import SocialFooter from "@/components/navigation/SocialFooter";
import HeroMenu from "@/components/navigation/HeroMenu";

interface HeroContentProps {
  ready: boolean;
  heroInteractive: boolean;
  scrollLocked?: boolean;
  onDiscoverClick: () => void;
  onVolverClick?: () => void;
  brandTopGap: string;
  logoScale: number;
  isotipoSize: number;
  headlineVisible: boolean;
  discoverOpacity: number;
  menuOpacity: number;
  menuY: number;
  streakOpacity?: number;
  streakBlur?: number;
  streakScale?: number;
}

function BrandingBlock({
  ready,
  logoScale,
  isotipoSize,
  headlineVisible,
  compact = false,
}: {
  ready: boolean;
  logoScale: number;
  isotipoSize: number;
  headlineVisible: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${compact ? "gap-2" : ""}`}>
      <div
        className="text-xamani-silver"
        style={{
          width: isotipoSize,
          height: isotipoSize,
          marginBottom: compact ? 8 : 16,
        }}
      >
        <Isotipo className="h-full w-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ transform: `scale(${logoScale})` }} className="origin-center">
          <Logo
            className={
              compact
                ? "text-[clamp(1.5rem,7vw,2rem)] tracking-[0.28em]"
                : "text-[clamp(2rem,9vw,4.25rem)] tracking-[0.28em] sm:tracking-[0.35em]"
            }
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
        transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={compact ? "mt-1" : "mt-5 sm:mt-6"}
      >
        <Tagline />
      </motion.div>

      <motion.div
        className="w-full max-w-4xl overflow-hidden px-2"
        initial={false}
        animate={{
          opacity: headlineVisible ? 1 : 0,
          y: headlineVisible ? 0 : 16,
          maxHeight: headlineVisible ? 160 : 0,
          marginTop: headlineVisible ? (compact ? 12 : 28) : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className={
            compact
              ? "font-ambit text-[0.68rem] font-medium uppercase leading-[1.75] tracking-[0.16em] text-xamani-silver"
              : "font-ambit text-[clamp(0.72rem,2.4vw,1.2rem)] font-medium uppercase leading-[1.85] tracking-[0.18em] text-xamani-silver sm:tracking-[0.26em] md:text-[1.25rem] md:tracking-[0.32em]"
          }
        >
          Elegimos construir lo que{" "}
          <span className="text-xamani-cyan">trasciende.</span>
        </h2>
      </motion.div>
    </div>
  );
}

function VolverButton({
  menuOpacity,
  onVolverClick,
}: {
  menuOpacity: number;
  onVolverClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onVolverClick}
      className="flex flex-col items-center gap-1.5 border-0 bg-transparent p-2"
      aria-label="Volver a la intro"
      animate={{ opacity: menuOpacity }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        className="text-xamani-silver/70"
        aria-hidden="true"
      >
        <path
          d="M1 1L7 7L13 1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-archia text-[0.6rem] uppercase tracking-[0.35em] text-xamani-silver/70">
        Volver
      </span>
    </motion.button>
  );
}

function HeroContent({
  ready,
  heroInteractive,
  scrollLocked = false,
  onDiscoverClick,
  onVolverClick,
  brandTopGap,
  logoScale,
  isotipoSize,
  headlineVisible,
  discoverOpacity,
  menuOpacity,
  menuY,
  streakOpacity = 0,
  streakBlur = 0,
  streakScale = 1,
}: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const mobileMenuMode = menuOpacity > 0.45;

  return (
    <section
      id="hero"
      aria-label="XAMANI — Intro y Hero"
      className="flex h-[100dvh] min-h-[600px] w-full flex-col overflow-hidden bg-xamani-navy-surface"
    >
      <div className="absolute inset-0 bg-xamani-navy-surface" aria-hidden="true" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: streakOpacity,
          filter: `blur(${streakBlur}px)`,
          scale: streakScale,
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: ready ? 1 : 0, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/intro-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-xamani-navy-surface/30 via-transparent to-xamani-navy-surface/60" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-xamani-navy-surface to-transparent" />
      </motion.div>

      {/* Móvil */}
      <div
        className={`relative z-10 flex h-full min-h-0 flex-col px-4 md:hidden ${
          mobileMenuMode
            ? "justify-center gap-2.5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
            : ""
        }`}
        style={mobileMenuMode ? undefined : { paddingTop: brandTopGap }}
      >
        <BrandingBlock
          ready={ready}
          logoScale={logoScale}
          isotipoSize={isotipoSize}
          headlineVisible={headlineVisible}
          compact={mobileMenuMode}
        />

        {mobileMenuMode ? (
          <motion.div
            className={`w-full ${heroInteractive ? "" : "pointer-events-none"}`}
            initial={false}
            animate={{ opacity: menuOpacity }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroMenu />
          </motion.div>
        ) : (
          <div className="min-h-0 flex-1" aria-hidden="true" />
        )}

        <div
          className={`flex shrink-0 flex-col items-center gap-2 ${
            mobileMenuMode ? "" : "pb-[calc(1rem+env(safe-area-inset-bottom))]"
          }`}
        >
          {!mobileMenuMode && (
            <motion.div
              className={`w-full ${heroInteractive ? "" : "pointer-events-none"}`}
              animate={{ opacity: menuOpacity }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroMenu />
            </motion.div>
          )}

          {scrollLocked ? (
            <VolverButton menuOpacity={menuOpacity} onVolverClick={onVolverClick} />
          ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <SocialFooter variant="icons" />
          </motion.div>

          {!scrollLocked ? (
            <motion.div
              animate={{ opacity: discoverOpacity }}
              transition={{ duration: 0.3 }}
            >
              <ScrollIndicator animateEntrance={!ready} onClick={onDiscoverClick} />
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Desktop */}
      <div className="relative z-10 hidden h-full min-h-0 flex-col md:flex">
        <div
          className="flex shrink-0 flex-col items-center px-4 text-center sm:px-6"
          style={{ paddingTop: brandTopGap }}
        >
          <BrandingBlock
            ready={ready}
            logoScale={logoScale}
            isotipoSize={isotipoSize}
            headlineVisible={headlineVisible}
          />
        </div>

        <motion.div
          className={`flex min-h-0 w-full flex-1 flex-col justify-center pt-4 sm:pt-6 ${heroInteractive ? "" : "pointer-events-none"}`}
          animate={{ opacity: menuOpacity, y: menuY }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroMenu />
        </motion.div>

        <div className="flex w-full shrink-0 flex-col items-center gap-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <SocialFooter variant="icons" />
          </motion.div>

          <motion.div
            animate={{ opacity: discoverOpacity }}
            transition={{ duration: 0.3 }}
            className={scrollLocked ? "pointer-events-none" : undefined}
          >
            <ScrollIndicator animateEntrance={!ready} onClick={onDiscoverClick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
