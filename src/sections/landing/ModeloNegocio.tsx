"use client";

import ValuesRibbon from "@/sections/landing/shared/ValuesRibbon";
import ModeloRoadmapExperience from "@/sections/landing/modelo/ModeloRoadmapExperience";

export default function ModeloNegocio() {
  return (
    <section
      id="modelo-negocio"
      aria-label="Modelo de Negocio"
      className="relative w-full bg-xamani-canvas"
    >
      <ModeloRoadmapExperience />
      <ValuesRibbon />
    </section>
  );
}
