"use client";

import { FormEvent, useState } from "react";
import { buildAsesoriaWhatsAppUrl, openWhatsAppUrl } from "@/data/contact";

export default function AgendaWhatsAppForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsAppUrl(buildAsesoriaWhatsAppUrl(name));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="contact-name" className="sr-only">
        Nombre completo
      </label>
      <input
        id="contact-name"
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Tu nombre completo"
        autoComplete="name"
        enterKeyHint="go"
        required
        className="min-w-0 flex-1 rounded-pill border border-white/15 bg-white/5 px-5 py-3.5 font-archia text-sm text-xamani-silver placeholder:text-xamani-silver-muted/50 focus:border-xamani-cyan/50 focus:outline-none focus:ring-1 focus:ring-xamani-cyan/30"
      />
      <button
        type="submit"
        className="inline-flex min-h-[44px] shrink-0 touch-manipulation items-center justify-center gap-2 rounded-pill bg-xamani-wine px-6 py-3.5 font-ambit text-[0.65rem] uppercase tracking-[0.18em] text-xamani-silver transition-all duration-300 ease-out-expo [-webkit-tap-highlight-color:transparent] hover:shadow-glow-wine sm:px-8 sm:text-xs sm:tracking-[0.2em]"
      >
        Agendar ahora
      </button>
    </form>
  );
}
