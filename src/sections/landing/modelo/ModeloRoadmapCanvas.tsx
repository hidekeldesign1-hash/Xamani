"use client";

import type { ReactNode } from "react";
import { ROADMAP_ASPECT_RATIO } from "./data";

interface ModeloRoadmapCanvasProps {
  children: ReactNode;
}

/** Columna central del mapa — capa inferior en móvil (líneas debajo de las tarjetas) */
export default function ModeloRoadmapCanvas({ children }: ModeloRoadmapCanvasProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      <div
        className="relative h-full max-h-full w-auto max-w-[min(100%,26rem)] lg:max-w-[min(100%,30rem)]"
        style={{ aspectRatio: ROADMAP_ASPECT_RATIO }}
      >
        {children}
      </div>
    </div>
  );
}
