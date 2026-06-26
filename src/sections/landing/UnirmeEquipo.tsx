import ExpertCard from "@/components/cards/ExpertCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import SectionHeading from "@/sections/landing/shared/SectionHeading";
import { ROUTES } from "@/data/heroMenu";

const TEAM = [
  {
    name: "Mariana Solís",
    role: "Directora de Estrategia",
    bio: "Especialista en transformación organizacional y diseño de modelos de valor sostenibles.",
  },
  {
    name: "Ricardo Mendoza",
    role: "Asesor Financiero Senior",
    bio: "Más de 12 años estructurando planes de crecimiento para empresas familiares y scale-ups.",
  },
  {
    name: "Laura Varela",
    role: "Consultora de Cultura",
    bio: "Integra propósito, liderazgo y equipos de alto rendimiento en procesos de cambio.",
  },
  {
    name: "Andrés Delgado",
    role: "Estratega de Operaciones",
    bio: "Optimiza procesos y cadena de valor con enfoque en eficiencia y trascendencia.",
  },
  {
    name: "Valentina Ríos",
    role: "Asesora de Innovación",
    bio: "Impulsa nuevos modelos de negocio y digitalización con visión de largo plazo.",
  },
  {
    name: "Carlos Ibarra",
    role: "Mentor Ejecutivo",
    bio: "Acompaña a directivos en decisiones críticas con metodología y empatía.",
  },
];

export default function UnirmeEquipo() {
  return (
    <section
      id="unirme-equipo"
      aria-label="Unirme al Equipo"
      className="relative w-full"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading before="Conoce a nuestros " highlight="Expertos" />
            <PillLink
              href="mailto:HOLA@XAMANI.COM.MX?subject=Unirme al equipo"
              className="shrink-0 self-start sm:self-auto"
            >
              Únete al equipo →
            </PillLink>
          </div>
        </Reveal>

        <RevealStagger
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {TEAM.map((member) => (
            <RevealItem key={member.name}>
              <ExpertCard {...member} />
            </RevealItem>
          ))}
        </RevealStagger>

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
            <PillLink href="mailto:HOLA@XAMANI.COM.MX?subject=Unirme al equipo">
              Enviar mi perfil
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
