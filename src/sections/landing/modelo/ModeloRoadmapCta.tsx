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
      className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden px-6"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <motion.div
        className="cta-backdrop-blur absolute -inset-3 sm:-inset-4"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <motion.aside
        className="relative z-10 mx-auto w-full max-w-xl text-center"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 24,
          scale: visible ? 1 : 0.97,
        }}
        transition={{ duration: 0.5, delay: visible ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Acciones de El Camino Xamani"
      >
        <p className="mb-10 font-archia text-lg leading-relaxed text-xamani-silver/90 sm:text-xl sm:leading-[1.65] md:text-2xl md:leading-[1.55]">
          {MODELO_CTA_COPY}
        </p>
        <div className="flex justify-center">
          <PillLink href={ROUTES.equipo} className="min-w-[16rem] justify-center">
            Conviertete en Xamani
          </PillLink>
        </div>
      </motion.aside>
    </motion.div>
  );
}
