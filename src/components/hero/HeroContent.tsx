"use client";

import { motion } from "framer-motion";
import Logo from "@/components/brand/Logo";
import Isotipo from "@/components/brand/Isotipo";
import Tagline from "@/components/brand/Tagline";
import HeroNeonCanvas from "@/components/hero/HeroNeonCanvas";
import ScrollIndicator from "@/components/navigation/ScrollIndicator";
import SocialFooter from "@/components/navigation/SocialFooter";
import HeroMenu from "@/components/navigation/HeroMenu";

interface HeroContentProps {
  ready: boolean;
  heroInteractive: boolean;
  scrollLocked?: boolean;
  onDiscoverClick: () => void;
  brandTopGap: string;
  logoScale: number;
  isotipoSize: number;
  headlineVisible: boolean;
  discoverOpacity: number;
  menuOpacity: number;
  menuY: number;
  streakOpacity?: number;
}

function BrandingBlock({
  ready,
  logoScale,
  isotipoSize,
  headlineVisible,
  compact = false,
  smoothHeadline = false,
}: {
  ready: boolean;
  logoScale: number;
  isotipoSize: number;
  headlineVisible: boolean;
  compact?: boolean;
  smoothHeadline?: boolean;
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
        animate={
          smoothHeadline
            ? {
                opacity: headlineVisible ? 1 : 0,
                y: headlineVisible ? 0 : 10,
              }
            : {
                opacity: headlineVisible ? 1 : 0,
                y: headlineVisible ? 0 : 16,
                maxHeight: headlineVisible ? 160 : 0,
                marginTop: headlineVisible ? (compact ? 12 : 28) : 0,
              }
        }
        transition={{ duration: smoothHeadline ? 0.65 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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

function HeroContent({
  ready,
  heroInteractive,
  scrollLocked = false,
  onDiscoverClick,
  brandTopGap,
  logoScale,
  isotipoSize,
  headlineVisible,
  discoverOpacity,
  menuOpacity,
  menuY,
  streakOpacity = 1,
}: HeroContentProps) {
  const showMobileDiscover = discoverOpacity > 0.02;

  return (
    <section
      id="hero"
      aria-label="XAMANI — Intro y Hero"
      className="relative isolate flex h-[100dvh] min-h-[600px] w-full flex-col overflow-hidden bg-[#0b1520]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: ready ? streakOpacity : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroNeonCanvas
          className="absolute inset-0 h-full w-full"
          active={ready && streakOpacity > 0.02}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0b1520]/25 via-transparent to-[#0b1520]/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[#0b1520]/80 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Móvil */}
      <div className="relative z-10 flex h-full min-h-0 flex-col px-4 md:hidden">
        <div
          className="flex shrink-0 flex-col items-center text-center"
          style={{ paddingTop: brandTopGap }}
        >
          <BrandingBlock
            ready={ready}
            logoScale={logoScale}
            isotipoSize={isotipoSize}
            headlineVisible={headlineVisible}
            smoothHeadline
          />
        </div>

        <div
          className={`flex min-h-0 w-full flex-1 flex-col justify-center py-2 ${heroInteractive ? "" : "pointer-events-none"}`}
          style={{
            opacity: menuOpacity,
            transform: `translate3d(0, ${menuY}px, 0)`,
          }}
        >
          <HeroMenu />
        </div>

        <div className="relative flex shrink-0 flex-col items-center pb-[calc(1.85rem+env(safe-area-inset-bottom))]">
          {showMobileDiscover ? (
            <div
              className="mb-3 flex w-full justify-center"
              style={{
                opacity: ready ? discoverOpacity : 0,
                pointerEvents: ready && discoverOpacity > 0.2 ? "auto" : "none",
              }}
              aria-hidden={!showMobileDiscover}
            >
              <ScrollIndicator animateEntrance={false} onClick={onDiscoverClick} />
            </div>
          ) : null}

          <motion.div
            className="-translate-y-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <SocialFooter variant="icons" />
          </motion.div>
        </div>
      </div>

      {/* Desktop + tablet — espaciado simétrico branding ↔ menú ↔ redes */}
      <div className="relative z-10 hidden h-full min-h-0 md:grid md:grid-rows-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <div aria-hidden="true" />

        <div
          className="flex flex-col items-center px-4 text-center sm:px-6"
          style={{ paddingTop: brandTopGap }}
        >
          <BrandingBlock
            ready={ready}
            logoScale={logoScale}
            isotipoSize={isotipoSize}
            headlineVisible={headlineVisible}
          />
        </div>

        <div aria-hidden="true" />

        <motion.div
          className={`flex w-full items-center justify-center ${heroInteractive ? "" : "pointer-events-none"}`}
          animate={{ opacity: menuOpacity, y: menuY }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroMenu />
        </motion.div>

        <div aria-hidden="true" />

        <div className="relative flex w-full flex-col items-center pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          <div
            className="absolute bottom-full left-0 right-0 mb-4 flex justify-center"
            style={{
              opacity: ready ? discoverOpacity : 0,
              visibility: discoverOpacity > 0.02 ? "visible" : "hidden",
              pointerEvents: ready && discoverOpacity > 0.2 ? "auto" : "none",
            }}
            aria-hidden={discoverOpacity <= 0.02}
          >
            <ScrollIndicator animateEntrance={false} onClick={onDiscoverClick} />
          </div>

          <motion.div
            className="-translate-y-3.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <SocialFooter variant="icons" />
          </motion.div>
        </div>

        <div aria-hidden="true" />
      </div>
    </section>
  );
}

export default HeroContent;
