import { Reveal } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_JOIN_URL } from "@/data/contact";
import AgentesCarousel from "@/sections/landing/agentes/AgentesCarousel";
import SectionHeading from "@/sections/landing/shared/SectionHeading";

export default function UnirmeEquipo() {
  return (
    <section
      id="unirme-equipo"
      aria-label="Conviertete en Xamani"
      className="relative w-full overflow-hidden bg-xamani-canvas"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading before="Conoce a nuestros " highlight="Expertos" />
            <PillLink
              href={WHATSAPP_JOIN_URL}
              className="shrink-0 self-start sm:self-auto"
            >
              Conviértete en Xamani
            </PillLink>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <AgentesCarousel />
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" delay={0.1}>
          <div className="rounded-card-lg border border-xamani-wine/20 bg-xamani-wine/5 p-8 text-center sm:p-10">
            <h3 className="mb-3 font-ambit text-display-md text-xamani-silver">
              ¿Quieres ser parte de XAMANI?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl font-archia text-sm leading-relaxed text-xamani-silver-muted sm:text-base">
              Buscamos profesionales que compartan nuestra convicción: asesorar con
              propósito, actuar con excelencia y construir lo que trasciende. Si
              tienes experiencia en consultoría, estrategia o liderazgo, queremos
              conocerte.
            </p>
            <PillLink href={WHATSAPP_JOIN_URL}>
              Conviértete en Xamani
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
