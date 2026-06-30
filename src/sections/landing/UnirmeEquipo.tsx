import { Reveal } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_JOIN_URL } from "@/data/contact";
import AgendaCtaBlock from "@/sections/landing/AgendaCtaBlock";
import AgentesCarousel from "@/sections/landing/agentes/AgentesCarousel";
import SectionHeading from "@/sections/landing/shared/SectionHeading";

export default function UnirmeEquipo() {
  return (
    <section
      id="unirme-equipo"
      aria-label="Asesoría Xamani"
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

        <AgendaCtaBlock className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
