import { DESKTOP_CTA_THRESHOLD, MODELO_STEPS } from "./data";

export interface RevealedScrollState {
  revealedIds: Set<string>;
  activeStepId: string | null;
  activeTitle: string;
  ctaRevealed: boolean;
  showScrollHint: boolean;
}

function setsEqual(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const id of a) {
    if (!b.has(id)) return false;
  }
  return true;
}

export function computeRevealedScrollState(
  anim: number,
  raw: number,
  prev: RevealedScrollState,
  options: {
    isMobile: boolean;
    ctaRawStart: number;
    leadRatio: number;
    animSpan: number;
    revealBackBuffer: number;
  }
): RevealedScrollState {
  const {
    isMobile,
    ctaRawStart,
    leadRatio,
    animSpan,
    revealBackBuffer,
  } = options;

  const nextRevealed = new Set(prev.revealedIds);
  let revealedChanged = false;

  for (const step of MODELO_STEPS) {
    if (anim >= step.threshold) {
      if (!nextRevealed.has(step.id)) {
        nextRevealed.add(step.id);
        revealedChanged = true;
      }
    } else if (
      anim < step.threshold - revealBackBuffer &&
      nextRevealed.has(step.id)
    ) {
      nextRevealed.delete(step.id);
      revealedChanged = true;
    }
  }

  const showCta = isMobile
    ? raw >= ctaRawStart
    : anim >= DESKTOP_CTA_THRESHOLD;

  let ctaRevealed = prev.ctaRevealed;
  if (showCta) {
    ctaRevealed = true;
  } else if (
    isMobile
      ? raw < ctaRawStart - revealBackBuffer
      : anim < DESKTOP_CTA_THRESHOLD - revealBackBuffer
  ) {
    ctaRevealed = false;
  }

  const activeStep =
    MODELO_STEPS.filter((s) => anim >= s.threshold).slice(-1)[0] ?? null;
  const activeStepId = activeStep?.id ?? null;
  const activeTitle = activeStep?.title ?? "Inicio";

  const hintFadeEnd = leadRatio + animSpan * 0.1;
  const showScrollHint = !showCta && raw < hintFadeEnd;

  const revealedIds = revealedChanged ? nextRevealed : prev.revealedIds;

  if (
    setsEqual(revealedIds, prev.revealedIds) &&
    activeStepId === prev.activeStepId &&
    activeTitle === prev.activeTitle &&
    ctaRevealed === prev.ctaRevealed &&
    showScrollHint === prev.showScrollHint
  ) {
    return prev;
  }

  return {
    revealedIds,
    activeStepId,
    activeTitle,
    ctaRevealed,
    showScrollHint,
  };
}

export function getStepMotionTransition(isMobile: boolean) {
  return {
    duration: isMobile ? 0.38 : 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
  };
}

export const ROADMAP_DEPTH_EASE =
  "cubic-bezier(0.22, 1, 0.36, 1)";

export function getStepMotionStyle(
  depth: { scale: number; blurPx: number; opacity: number },
  visible: boolean,
  isMobile: boolean,
  yOffset = 16
) {
  const yEnter = visible ? 0 : isMobile ? 10 : yOffset;
  const scale = visible ? depth.scale : 0.95;

  return {
    opacity: visible ? depth.opacity : 0,
    transform: isMobile
      ? `translate3d(0, ${yEnter}px, 0) scale(${scale})`
      : `translate3d(0, calc(-50% + ${yEnter}px), 0) scale(${scale})`,
    filter: visible ? `blur(${depth.blurPx}px)` : "blur(1px)",
  };
}

export function getNodeMotionStyle(
  depth: { scale: number; blurPx: number; opacity: number },
  visible: boolean,
  isFocused: boolean
) {
  const scale = visible ? (isFocused ? 1.25 : depth.scale * 1.05) : 0.75;

  return {
    opacity: visible ? depth.opacity : 0,
    transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
    filter: visible
      ? `blur(${depth.blurPx}px) drop-shadow(0 10px 16px rgba(119, 19, 53, 0.4))`
      : "blur(1px)",
  };
}
