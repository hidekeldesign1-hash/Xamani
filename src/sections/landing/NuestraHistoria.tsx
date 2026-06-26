"use client";

import Image from "next/image";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

interface HistoriaImageFrameProps {
  alt: string;
  caption: string;
  src?: string;
  className?: string;
}

function HistoriaImageFrame({
  alt,
  caption,
  src,
  className = "",
}: HistoriaImageFrameProps) {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-xamani-silver/15 bg-[#113345] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center grayscale contrast-[1.05] brightness-[0.92]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-xamani-silver/[0.06] via-[#113345] to-xamani-navy-deep"
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-xamani-navy-deep/70 via-transparent to-transparent" />
      <span className="absolute bottom-5 left-5 font-archia text-[0.55rem] uppercase tracking-[0.28em] text-xamani-silver/45">
        {caption}
      </span>
    </div>
  );
}

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-archia text-micro uppercase tracking-[0.35em] text-xamani-cyan">
      {children}
    </p>
  );
}

function BodyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-archia text-sm leading-[1.85] text-xamani-silver-muted sm:text-base">
      {children}
    </p>
  );
}

export default function NuestraHistoria() {
  return (
    <section
      id="nuestra-historia"
      aria-label="Nuestra Historia"
      className="relative w-full"
    >
      {/* Título de sección */}
      <div className="section-padding mx-auto max-w-7xl pb-10 pt-6 text-center lg:pb-16 lg:pt-10">
        <Reveal>
          <h1 className="font-ambit text-display-xl text-xamani-silver">
            Nuestra Historia
          </h1>
          <div
            className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-xamani-cyan via-xamani-silver/50 to-xamani-wine"
            aria-hidden="true"
          />
        </Reveal>
      </div>

      {/* ─── CAPÍTULO 1: EL ORIGEN ─── */}
      <article
        aria-labelledby="capitulo-origen"
        className="border-t border-white/[0.06]"
      >
        <div className="section-padding mx-auto max-w-7xl py-24 lg:py-32">
          <Reveal className="mb-12 text-center lg:mb-16">
            <ChapterLabel>El Origen</ChapterLabel>
            <p className="font-archia text-xs uppercase tracking-[0.2em] text-xamani-silver-muted">
              Amado Ugarte Loyola
            </p>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <Reveal delay={0.08} className="lg:sticky lg:top-28">
              <HistoriaImageFrame
                alt="Amado Ugarte Loyola — retrato histórico"
                caption="Amado Ugarte Loyola"
              />
            </Reveal>

            <div>
              <Reveal delay={0.12}>
                <h3
                  id="capitulo-origen"
                  className="mb-8 text-balance font-ambit text-display-md font-bold text-xamani-wine sm:text-[1.65rem] lg:text-display-md"
                >
                  Donde otros veían incertidumbre, él vio posibilidad
                </h3>
              </Reveal>

              <RevealStagger className="space-y-6" stagger={0.1}>
                <RevealItem>
                  <BodyParagraph>
                    En la década de los 60,{" "}
                    <span className="font-ambit font-semibold text-xamani-silver">
                      Amado Ugarte Loyola
                    </span>{" "}
                    decidió emprender un camino que pocos se atrevían a recorrer.
                    Lo hizo con más dudas que certezas, con la incertidumbre natural
                    de quien inicia algo grande, pero con una convicción profunda:{" "}
                    <span className="font-ambit font-semibold text-xamani-silver">
                      Transformar la vida de otras personas mientras construía
                      también la suya propia.
                    </span>{" "}
                    Aquella decisión no solo marcó su destino, sentó las bases de un
                    legado que trascendería generaciones.
                  </BodyParagraph>
                </RevealItem>

                <RevealItem>
                  <BodyParagraph>
                    Durante más de 25 años, Amado construyó una trayectoria
                    extraordinaria dentro del sector asegurador. Formó una de las
                    gerencias de zona -y posteriormente dirección de agencia- más
                    exitosas de su tiempo consolidando una estructura basada en
                    liderazgo, disciplina, visión y desarrollo humano.
                  </BodyParagraph>
                </RevealItem>

                <RevealItem>
                  <BodyParagraph>
                    Su mayor logro nunca fueron únicamente los números. Su verdadera
                    grandeza estuvo en las personas que formó. A lo largo de su
                    carrera acompañó a numerosos agentes y líderes en su desarrollo
                    profesional y personal fungiendo como mentor, guía y referente
                    para quienes confiaron en él. Su impacto se reflejó tanto en
                    resultados comerciales como en vidas transformadas.
                  </BodyParagraph>
                </RevealItem>
              </RevealStagger>
            </div>
          </div>

          <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl lg:mt-20">
            <div className="relative overflow-hidden rounded-card-lg border border-xamani-wine/25 bg-xamani-wine/10 p-6 sm:p-8">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-xamani-wine"
                aria-hidden="true"
              />
              <p className="pl-4 text-center font-archia text-sm leading-[1.85] text-xamani-silver/90 sm:text-base">
                <span className="mb-3 block font-ambit text-xs font-bold uppercase tracking-[0.18em] text-xamani-wine">
                  Salón de la Fama GNP
                </span>
                Su excelencia lo llevó a obtener múltiples campeonatos de
                ventas y reconocimientos de alto nivel dentro de Grupo Nacional
                Provincial (GNP) hasta convertirse en miembro del Salón de la
                Fama de GNP, una distinción reservada para un grupo muy reducido
                de líderes que han dejado una huella excepcional en la
                institución. Este reconocimiento honra más de 15 años liderando
                el sector, atrayendo a grandes talentos y manteniéndose en la
                cima de la industria en múltiples ocasiones.
              </p>
            </div>
          </Reveal>
        </div>
      </article>

      {/* ─── CAPÍTULO 2: LA CONTINUIDAD ─── */}
      <article
        aria-labelledby="capitulo-continuidad"
        className="border-t border-white/[0.06] bg-xamani-navy-deep/20"
      >
        <div className="section-padding mx-auto max-w-7xl py-24 lg:py-32">
          <Reveal className="mb-12 text-center lg:mb-16">
            <ChapterLabel>La Continuidad</ChapterLabel>
            <p className="font-archia text-xs uppercase tracking-[0.2em] text-xamani-silver-muted">
              Marilupe Ugarte de la Vega
            </p>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="order-2 lg:order-1">
              <Reveal delay={0.12}>
                <h3
                  id="capitulo-continuidad"
                  className="mb-8 text-balance font-ambit text-display-md font-bold text-xamani-silver sm:text-[1.65rem] lg:text-display-md"
                >
                  El legado continúa
                </h3>
              </Reveal>

              <RevealStagger className="space-y-6" stagger={0.1}>
                <RevealItem>
                  <BodyParagraph>
                    Tras la extraordinaria trayectoria de Amado Ugarte Loyola el
                    legado encontró continuidad en{" "}
                    <span className="font-ambit font-semibold text-xamani-silver">
                      Marilupe Ugarte de la Vega
                    </span>{" "}
                    y aunque en un inicio esta carrera no representaba
                    necesariamente su mayor convicción personal, decidió asumir el
                    reto con valentía, responsabilidad y una profunda lealtad hacia
                    la estructura y los valores que se habían construido durante
                    décadas. Con el paso del tiempo, esa responsabilidad se
                    transformó en liderazgo.
                  </BodyParagraph>
                </RevealItem>

                <RevealItem>
                  <BodyParagraph>
                    A través de su carácter, su pasión por el desarrollo del
                    negocio y, sobre todo, su enorme compromiso, Marilupe no solo
                    dio continuidad al proyecto:{" "}
                    <span className="font-ambit font-semibold text-xamani-silver">
                      Lo fortaleció.
                    </span>
                  </BodyParagraph>
                </RevealItem>

                <RevealItem>
                  <BodyParagraph>
                    Como en toda gran historia empresarial, el camino no estuvo
                    exento de desafíos: Hubo cambios, momentos de incertidumbre,
                    obstáculos y también retos propios de una industria en constante
                    evolución. Sin embargo, incluso en medio de la complejidad, su
                    liderazgo y talento permitió mantener una estructura sólida,
                    sana y estable.
                  </BodyParagraph>
                </RevealItem>

                <RevealItem>
                  <BodyParagraph>
                    Durante más de 25 años consolidó la empresa como un referente
                    dentro del sector asegurador preservando la esencia del legado
                    mientras aseguraba su permanencia y fortaleza hacia el futuro.
                  </BodyParagraph>
                </RevealItem>
              </RevealStagger>
            </div>

            <Reveal delay={0.08} className="order-1 lg:order-2 lg:sticky lg:top-28">
              <HistoriaImageFrame
                alt="Marilupe Ugarte de la Vega — retrato histórico"
                caption="Marilupe Ugarte de la Vega"
              />
            </Reveal>
          </div>
        </div>
      </article>

      {/* ─── CAPÍTULO 3: LA EVOLUCIÓN ─── */}
      <article
        aria-labelledby="capitulo-evolucion"
        className="border-t border-white/[0.06]"
      >
        <div className="section-padding mx-auto max-w-4xl py-24 text-center lg:py-32">
          <Reveal>
            <ChapterLabel>La Evolución</ChapterLabel>
            <p className="mb-10 font-archia text-xs uppercase tracking-[0.2em] text-xamani-silver-muted">
              XAMANI
            </p>
          </Reveal>

          <RevealStagger className="space-y-8" stagger={0.12}>
            <RevealItem>
              <p
                id="capitulo-evolucion"
                className="font-archia text-base leading-[1.9] text-xamani-silver-muted sm:text-lg"
              >
                Durante más de medio siglo dos generaciones sostuvieron y
                desarrollaron esta organización convirtiéndola en un referente de
                liderazgo, formación y excelencia dentro de la industria.
              </p>
            </RevealItem>

            <RevealItem>
              <p className="font-archia text-base leading-[1.9] text-xamani-silver-muted sm:text-lg">
                Hoy, ese legado entra en una nueva etapa. Una etapa de evolución,
                transformación y visión renovada. Ese nuevo capítulo se llama{" "}
                <span className="font-ambit text-xl font-bold tracking-[0.2em] text-xamani-silver sm:text-2xl">
                  XAMANI
                </span>
                .
              </p>
            </RevealItem>
          </RevealStagger>

          <Reveal delay={0.2} className="mt-14">
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-xamani-cyan via-xamani-silver/50 to-xamani-wine" />
          </Reveal>
        </div>
      </article>
    </section>
  );
}
