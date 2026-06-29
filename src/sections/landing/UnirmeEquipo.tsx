import ExpertCard from "@/components/cards/ExpertCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_JOIN_URL } from "@/data/contact";
import SectionHeading from "@/sections/landing/shared/SectionHeading";

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
  {
    name: "Sofía Nájera",
    role: "Directora de Talento",
    bio: "Identifica y desarrolla líderes que encarnan la cultura Xamani en cada proyecto.",
  },
  {
    name: "Fernando Ortega",
    role: "Consultor Legal y Compliance",
    bio: "Asegura solidez regulatoria y gobernanza en estrategias de crecimiento.",
  },
];

export default function UnirmeEquipo() {
  return (
    <section
      id="unirme-equipo"
      aria-label="Conviertete en Xamani"
      className="relative w-full bg-xamani-canvas"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading before="Conoce a nuestros " highlight="Expertos" />
            <PillLink
              href={WHATSAPP_JOIN_URL}
              className="shrink-0 self-start sm:self-auto"
            >
              Únete al equipo →
            </PillLink>
          </div>
        </Reveal>

        <RevealStagger
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
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
            <PillLink href={WHATSAPP_JOIN_URL}>
              Enviar mi perfil
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
