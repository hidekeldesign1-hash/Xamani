import { Reveal } from "@/components/motion/Reveal";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_JOIN_URL } from "@/data/contact";

interface ConvierteteCtaBlockProps {
  className?: string;
}

export default function ConvierteteCtaBlock({ className = "" }: ConvierteteCtaBlockProps) {
  return (
    <Reveal className={className} delay={0.1}>
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
        <PillLink
          href={WHATSAPP_JOIN_URL}
          className="normal-case !px-5 !py-3.5 !text-sm !leading-snug !tracking-normal sm:!px-7 sm:!text-base"
        >
          ¿Listo para construir lo que trasciende?
        </PillLink>
      </div>
    </Reveal>
  );
}
