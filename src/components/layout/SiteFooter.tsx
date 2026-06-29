"use client";

import Logo from "@/components/brand/Logo";
import Isotipo from "@/components/brand/Isotipo";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import SocialFooter from "@/components/navigation/SocialFooter";
import PillLink from "@/components/ui/PillLink";
import { WHATSAPP_ASESORIA_URL } from "@/data/contact";

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`relative mt-8 overflow-hidden rounded-t-[4rem] bg-xamani-wine sm:rounded-t-[6rem] ${className}`}
    >
      <div className="section-padding mx-auto max-w-7xl py-12 sm:py-16">
        <Reveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-4 h-12 w-12 text-xamani-silver sm:h-14 sm:w-14">
              <Isotipo className="h-full w-full" />
            </div>
            <Logo className="text-2xl tracking-[0.3em] text-xamani-silver sm:text-3xl" />
            <p className="mt-3 font-archia text-sm text-xamani-silver/85 sm:text-base">
              Asesores con Propósito
            </p>
          </div>
        </Reveal>

        <RevealStagger
          className="grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:items-start md:gap-8 lg:gap-12"
          stagger={0.08}
        >
          <RevealItem>
            <div className="text-center md:text-left">
              <h3 className="mb-4 font-ambit text-xs uppercase tracking-[0.2em] text-xamani-silver">
                Conecta
              </h3>
              <ul className="space-y-2 font-archia text-sm text-xamani-silver/75">
                <li>
                  <a
                    href="mailto:HOLA@XAMANI.COM.MX"
                    className="transition-colors hover:text-xamani-silver"
                  >
                    HOLA@XAMANI.COM.MX
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+525551406721"
                    className="transition-colors hover:text-xamani-silver"
                  >
                    55 5140 6721
                  </a>
                </li>
              </ul>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="[&_a]:text-xamani-silver/80 [&_a:hover]:text-xamani-silver">
                <SocialFooter variant="icons" />
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="text-center md:text-right">
              <h3 className="mb-4 font-ambit text-xs uppercase tracking-[0.2em] text-xamani-silver">
                Ubicación
              </h3>
              <address className="font-archia text-sm not-italic leading-relaxed text-xamani-silver/75">
                Paseo de la Reforma #144, 3er piso
                <br />
                Col. Juárez, Cuauhtémoc
                <br />
                CDMX, C.P. 06600
              </address>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>

      <Reveal amount={0.5}>
        <div className="border-t border-black/20 bg-xamani-navy-deep px-6 py-4 sm:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-archia text-xs text-xamani-silver-muted">
              © {new Date().getFullYear()} XAMANI. Todos los derechos reservados.
            </p>
            <PillLink
              href={WHATSAPP_ASESORIA_URL}
              className="!bg-xamani-cyan !text-xamani-navy hover:!shadow-glow"
            >
              Agenda una asesoría
            </PillLink>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
