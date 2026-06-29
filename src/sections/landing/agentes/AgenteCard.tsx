"use client";

import { SocialIcon } from "@/components/icons/SocialIcons";
import { motion, useReducedMotion } from "framer-motion";
import type { Agente } from "./data";
import { buildAgentInstagramUrl, buildAgentWhatsAppUrl } from "./data";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const INSTANT = { duration: 0.01 };

interface AgenteCardProps {
  agente: Agente;
  isActive: boolean;
  onActivate: () => void;
}

function stopCardToggle(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export default function AgenteCard({
  agente,
  isActive,
  onActivate,
}: AgenteCardProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const transition = prefersReducedMotion ? INSTANT : SPRING;

  const whatsappUrl = buildAgentWhatsAppUrl(agente.whatsapp);
  const instagramUrl = buildAgentInstagramUrl(agente.instagram);
  const hasSocialLinks = Boolean(whatsappUrl || instagramUrl || agente.web);

  return (
    <motion.article
      layout
      data-agente-card
      aria-expanded={isActive}
      onTap={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      tabIndex={0}
      className="glass-panel relative flex h-full w-full touch-manipulation flex-col overflow-hidden rounded-card"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className={
          isActive
            ? "relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden p-5 sm:p-6"
            : "relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-4 pt-[4.75rem] sm:px-6 sm:pb-5 sm:pt-[5rem]"
        }
      >
        <h3 className="font-ambit text-base leading-snug text-xamani-silver sm:text-lg">
          {agente.nombre}
        </h3>
        <p className="mt-1 font-archia text-[0.65rem] uppercase tracking-[0.22em] text-xamani-cyan sm:text-xs">
          {agente.marca}
        </p>

        <p className="mt-2 line-clamp-2 font-archia text-xs italic leading-relaxed text-xamani-silver/90 sm:text-sm">
          {agente.lema}
        </p>

        <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-none">
          <p className="font-archia text-xs leading-relaxed text-xamani-silver-muted sm:text-sm">
            {agente.descripcion}
          </p>
        </div>
      </div>

      <motion.div
        layout
        aria-hidden
        transition={transition}
        className={`agente-card-photo pointer-events-none absolute overflow-hidden border border-xamani-cyan/30 bg-xamani-navy-light/80 ${
          isActive ? "will-change-[transform,width,height]" : ""
        } ${
          isActive
            ? "inset-0 z-20 h-full w-full rounded-card"
            : "top-5 left-5 z-10 h-12 w-12 rounded-full sm:top-6 sm:left-6"
        }`}
      >
        {/* Al agregar agente.foto: <img src={...} alt="" className="h-full w-full object-cover" /> */}
      </motion.div>

      {hasSocialLinks && (
        <motion.div
          layout
          transition={transition}
          className={
            isActive
              ? "agente-card-footer-blur relative z-30 shrink-0 px-5 pb-5 sm:px-6 sm:pb-6"
              : "relative z-10 shrink-0 px-5 pb-4 sm:px-6 sm:pb-5"
          }
        >
          <div
            className={`flex flex-wrap items-center justify-center ${
              isActive ? "gap-3 px-2 pt-4 sm:gap-4" : "gap-2 border-t border-white/10 pt-3"
            }`}
          >
            {whatsappUrl && (
              <motion.div layout transition={transition} className="shrink-0">
                <motion.a
                  layout
                  href={whatsappUrl}
                  rel="noopener noreferrer"
                  transition={transition}
                  onPointerDown={stopCardToggle}
                  onClick={stopCardToggle}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-xamani-wine/40 bg-xamani-wine/15 font-archia text-xamani-silver transition-colors hover:border-xamani-wine/70 hover:bg-xamani-wine/25 ${
                    isActive
                      ? "px-4 py-2 text-xs shadow-[0_0_20px_rgba(119,19,53,0.6)] sm:px-5 sm:py-2.5 sm:text-sm"
                      : "px-3.5 py-1.5 text-[0.65rem] sm:text-xs"
                  }`}
                >
                  <SocialIcon
                    name="whatsapp"
                    className={
                      isActive
                        ? "h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
                        : "h-3.5 w-3.5 sm:h-4 sm:w-4"
                    }
                  />
                  WhatsApp
                </motion.a>
              </motion.div>
            )}
            {instagramUrl && (
              <motion.div layout transition={transition} className="shrink-0">
                <motion.a
                  layout
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  transition={transition}
                  onPointerDown={stopCardToggle}
                  onClick={stopCardToggle}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-white/15 font-archia text-xamani-silver/85 transition-colors hover:border-xamani-cyan/40 hover:text-xamani-cyan ${
                    isActive
                      ? "px-4 py-2 text-xs shadow-[0_0_20px_rgba(186,186,185,0.45)] sm:px-5 sm:py-2.5 sm:text-sm"
                      : "px-3.5 py-1.5 text-[0.65rem] sm:text-xs"
                  }`}
                >
                  <SocialIcon
                    name="instagram"
                    className={
                      isActive
                        ? "h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
                        : "h-3.5 w-3.5 sm:h-4 sm:w-4"
                    }
                  />
                  Instagram
                </motion.a>
              </motion.div>
            )}
            {agente.web && (
              <motion.div layout transition={transition} className="shrink-0">
                <motion.a
                  layout
                  href={agente.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  transition={transition}
                  onPointerDown={stopCardToggle}
                  onClick={stopCardToggle}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-white/15 font-archia text-xamani-silver/85 transition-colors hover:border-xamani-cyan/40 hover:text-xamani-cyan ${
                    isActive
                      ? "px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
                      : "px-3.5 py-1.5 text-[0.65rem] sm:text-xs"
                  }`}
                >
                  Web
                </motion.a>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
