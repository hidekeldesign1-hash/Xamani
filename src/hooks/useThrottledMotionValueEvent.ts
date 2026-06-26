"use client";

import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

/** Agrupa actualizaciones de scroll en un frame para reducir re-renders. */
export function useThrottledMotionValueEvent(
  motionValue: MotionValue<number>,
  handler: (value: number) => void,
  /** Sin throttle: cada tick de scroll actualiza de inmediato (p. ej. hero móvil). */
  immediate = false
) {
  const handlerRef = useRef(handler);
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef(0);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useMotionValueEvent(motionValue, "change", (value) => {
    if (immediate) {
      handlerRef.current(value);
      return;
    }

    latestRef.current = value;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      handlerRef.current(latestRef.current);
    });
  });

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );
}
