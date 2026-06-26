"use client";

import { motion } from "framer-motion";
import PillLink from "@/components/ui/PillLink";
import { ROUTES } from "@/data/heroMenu";
import { MODELO_CTA_COPY } from "./data";

interface ModeloRoadmapCtaProps {
  visible: boolean;
}

export default function ModeloRoadmapCta({ visible }: ModeloRoadmapCtaProps) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center px-6"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <motion.div
        className="absolute inset-0 bg-xamani-navy-surface/80 backdrop-blur-[14px]"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <motion.aside
        className="relative z-10 mx-auto w-full max-w-md text-center"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 24,
          scale: visible ? 1 : 0.97,
        }}
        transition={{ duration: 0.5, delay: visible ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Acciones del modelo de negocio"
      >
        <p className="mb-8 font-archia text-sm leading-relaxed text-xamani-silver/90 sm:text-base sm:leading-[1.75]">
          {MODELO_CTA_COPY}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <PillLink href={ROUTES.equipo} filled={false} className="min-w-[14rem] justify-center">
            Conoce al equipo
          </PillLink>
          <PillLink href={ROUTES.asesoria} className="min-w-[14rem] justify-center">
            Agenda una asesoría
          </PillLink>
        </div>
      </motion.aside>
    </motion.div>
  );
}
