import TestimonialCard from "@/components/cards/TestimonialCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import AgendaCtaBlock from "./AgendaCtaBlock";

const TESTIMONIALS = [
  {
    quote:
      "XAMANI nos ayudó a redefinir nuestra estrategia en un momento crítico. No solo entregaron un plan: nos acompañaron hasta ver resultados tangibles en cultura y rentabilidad.",
    name: "Elena Morales",
    role: "CEO",
    company: "Grupo Horizonte",
  },
  {
    quote:
      "La claridad con la que abordan cada sesión es excepcional. Por primera vez sentimos que nuestras decisiones tienen un norte claro y un propósito que trasciende el trimestre.",
    name: "Javier Ortega",
    role: "Director General",
    company: "Nova Industrias",
  },
];

export default function AgendaAsesoria() {
  return (
    <section
      id="agenda-asesoria"
      aria-label="Agenda una Asesoría"
      className="relative w-full bg-xamani-canvas"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <Reveal className="mb-10 text-center sm:mb-14">
          <p className="mb-3 font-archia text-micro uppercase tracking-[0.35em] text-xamani-cyan">
            Confianza
          </p>
          <h2 className="font-ambit text-display-lg text-xamani-silver">
            Lo que dicen quienes ya{" "}
            <span className="text-xamani-cyan">trascienden</span> con nosotros
          </h2>
        </Reveal>

        <RevealStagger className="mb-16 grid gap-6 md:grid-cols-2 lg:gap-8" stagger={0.12}>
          {TESTIMONIALS.map((item) => (
            <RevealItem key={item.name}>
              <TestimonialCard {...item} />
            </RevealItem>
          ))}
        </RevealStagger>

        <AgendaCtaBlock />
      </div>
    </section>
  );
}
