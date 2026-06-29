import { MODELO_STEPS } from "./data";

export interface StepDepthStyle {
  scale: number;
  blurPx: number;
  opacity: number;
}

function getStepIndex(stepId: string): number {
  return MODELO_STEPS.findIndex((s) => s.id === stepId);
}

export function getActiveStepIndex(activeStepId: string | null): number {
  if (!activeStepId) return 0;
  const idx = getStepIndex(activeStepId);
  return idx >= 0 ? idx : 0;
}

/** Escala, desenfoque y opacidad según distancia al paso activo (isotipo). */
export function getStepDepthStyle(
  stepId: string,
  activeStepId: string | null,
  visible: boolean
): StepDepthStyle {
  if (!visible) {
    return { scale: 0.95, blurPx: 1, opacity: 0 };
  }

  const stepIndex = getStepIndex(stepId);
  const activeIndex = getActiveStepIndex(activeStepId);
  const distance = Math.abs(stepIndex - activeIndex);

  let focus = Math.max(0, 1 - distance * 0.3);

  const stepY = MODELO_STEPS[stepIndex]?.node.y ?? 0;
  const activeY = MODELO_STEPS[activeIndex]?.node.y ?? 0;
  if (stepY < activeY - 40) {
    focus *= 0.72;
  }

  return {
    scale: 0.95 + focus * 0.05,
    blurPx: (1 - focus) * 1,
    opacity: 0.8 + focus * 0.2,
  };
}
