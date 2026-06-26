import Manifiesto from "@/sections/landing/Manifiesto";
import ModeloNegocio from "@/sections/landing/ModeloNegocio";
import UnirmeEquipo from "@/sections/landing/UnirmeEquipo";
import AgendaAsesoria from "@/sections/landing/AgendaAsesoria";
import NuestraHistoria from "@/sections/landing/NuestraHistoria";
import LogoPatternLayer from "@/sections/landing/shared/LogoPatternLayer";

/**
 * Bloque 3 — Landing Estructural
 * Contenedor secuencial de las 5 secciones del menú hero
 */
export default function LandingEstructural() {
  return (
    <div id="landing" className="relative z-10 w-full overflow-hidden bg-xamani-navy">
      <LogoPatternLayer />
      <div className="relative z-[1]">
        <Manifiesto />
        <ModeloNegocio />
        <UnirmeEquipo />
        <AgendaAsesoria />
        <NuestraHistoria />
      </div>
    </div>
  );
}
