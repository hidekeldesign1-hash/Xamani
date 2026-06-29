import { Reveal } from "@/components/motion/Reveal";
import AgendaWhatsAppForm from "./AgendaWhatsAppForm";

interface AgendaCtaBlockProps {
  className?: string;
}

export default function AgendaCtaBlock({ className = "" }: AgendaCtaBlockProps) {
  return (
    <Reveal className={className}>
      <div className="rounded-card-lg border border-white/10 bg-gradient-to-br from-xamani-navy-light/30 to-xamani-navy-deep p-8 sm:p-12">
        <div className="mx-auto max-w-2xl">
          <h3 className="mb-4 text-center font-ambit text-display-md text-xamani-silver sm:text-left">
            ¿Listo para construir lo que{" "}
            <span className="text-xamani-cyan">trasciende</span>?
          </h3>
          <p className="mb-8 text-center font-archia text-sm leading-relaxed text-xamani-silver-muted sm:text-left sm:text-base">
            Agenda una sesión de diagnóstico sin compromiso. Conversemos sobre tus
            objetivos y diseñemos juntos el primer paso hacia una asesoría con
            propósito.
          </p>
          <AgendaWhatsAppForm />
        </div>
      </div>
    </Reveal>
  );
}
