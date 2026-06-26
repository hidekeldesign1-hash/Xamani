"use client";

import LogoPatternLayer from "@/sections/landing/shared/LogoPatternLayer";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";

const VALUES = ["Propósito", "Excelencia", "Trascendencia"];

export default function ValuesRibbon() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-xamani-navy-deep/60 py-6 sm:py-8">
      <LogoPatternLayer opacity={0.035} tileSize={64} />
      <RevealStagger
        className="relative z-[1] flex animate-none flex-wrap items-center justify-center gap-4 px-4 sm:gap-8 md:gap-12"
        stagger={0.12}
        amount={0.4}
      >
        {VALUES.map((value, index) => (
          <RevealItem key={value} className="flex items-center gap-4 sm:gap-8">
            {index > 0 && (
              <span className="text-xamani-cyan" aria-hidden="true">
                ✦
              </span>
            )}
            <span className="font-ambit text-lg uppercase tracking-[0.12em] text-xamani-silver sm:text-xl md:text-2xl md:tracking-[0.18em]">
              {value}
            </span>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}
