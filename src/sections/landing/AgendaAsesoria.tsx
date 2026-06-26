import TestimonialCard from "@/components/cards/TestimonialCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import MediaPlaceholder from "@/sections/landing/shared/MediaPlaceholder";

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

        <Reveal>
          <div className="grid items-center gap-10 rounded-card-lg border border-white/10 bg-gradient-to-br from-xamani-navy-light/30 to-xamani-navy-deep p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <h3 className="mb-4 font-ambit text-display-md text-xamani-silver">
                ¿Listo para construir lo que{" "}
                <span className="text-xamani-cyan">trasciende</span>?
              </h3>
              <p className="mb-8 font-archia text-sm leading-relaxed text-xamani-silver-muted sm:text-base">
                Agenda una sesión de diagnóstico sin compromiso. Conversemos sobre
                tus objetivos y diseñemos juntos el primer paso hacia una asesoría
                con propósito.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="contact-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="tu@empresa.com"
                  className="min-w-0 flex-1 rounded-pill border border-white/15 bg-white/5 px-5 py-3.5 font-archia text-sm text-xamani-silver placeholder:text-xamani-silver-muted/50 focus:border-xamani-cyan/50 focus:outline-none focus:ring-1 focus:ring-xamani-cyan/30"
                />
                <PillLink href="mailto:HOLA@XAMANI.COM.MX" className="shrink-0 justify-center">
                  Agendar ahora
                </PillLink>
              </div>
            </div>
            <MediaPlaceholder
              aspect="landscape"
              label="Asesoría personalizada"
              className="lg:mt-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
