"use client";

import { FormEvent, useRef, useState } from "react";
import Isotipo from "@/components/brand/Isotipo";
import {
  countWhatsAppDigitsBefore,
  formatWhatsAppDisplay,
  getWhatsAppCursorPosition,
  saveEnergiaIntake,
  validateEnergiaIntake,
  type EnergiaIntakeErrors,
} from "./energiaIntakeValidation";

const INPUT_CLASS =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 font-archia text-base text-xamani-silver placeholder:text-xamani-silver-muted/45 focus:border-xamani-cyan/45 focus:outline-none focus:ring-1 focus:ring-xamani-cyan/25 md:py-3 md:text-sm";

interface EnergiaIntakeFormProps {
  onContinue?: () => void;
}

function FormDivider() {
  return (
    <div className="relative mx-auto my-5 w-full max-w-[14rem] sm:max-w-[16rem] md:my-4 md:max-w-[24rem]">
      <div
        className="h-px w-full bg-gradient-to-r from-xamani-cyan via-xamani-silver/20 to-xamani-wine"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-xamani-silver/70">
        <Isotipo className="h-full w-full" />
      </div>
    </div>
  );
}

export default function EnergiaIntakeForm({ onContinue }: EnergiaIntakeFormProps) {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<EnergiaIntakeErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const whatsappInputRef = useRef<HTMLInputElement>(null);

  const handleWhatsAppChange = (value: string) => {
    const input = whatsappInputRef.current;
    const cursor = input?.selectionStart ?? value.length;
    const digitsBeforeCursor = countWhatsAppDigitsBefore(value, cursor);
    const formatted = formatWhatsAppDisplay(value);

    setWhatsapp(formatted);

    if (errors.whatsapp) {
      setErrors((current) => ({ ...current, whatsapp: undefined }));
    }

    requestAnimationFrame(() => {
      if (!input) return;
      const nextCursor = getWhatsAppCursorPosition(formatted, digitsBeforeCursor);
      input.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const nextErrors = validateEnergiaIntake({
      nombre,
      whatsapp,
      email,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitting(false);
      return;
    }

    saveEnergiaIntake({ nombre, whatsapp, email });
    setErrors({});
    setSubmitting(false);
    onContinue?.();
  };

  return (
    <>
      <div className="text-center">
        <span className="inline-flex rounded-pill border border-white/20 px-4 py-1.5 font-archia text-[0.58rem] uppercase tracking-[0.28em] text-xamani-silver/85 sm:text-micro">
          Antes de comenzar
        </span>

        <h2 className="mt-5 font-ambit text-[clamp(1.35rem,4.5vw,2rem)] font-light uppercase tracking-[0.12em] text-xamani-silver sm:tracking-[0.16em] md:mt-4">
          Platícanos de ti
        </h2>

        <FormDivider />

        <p className="mx-auto max-w-md font-archia text-sm leading-relaxed text-xamani-silver/80 sm:text-[0.95rem] md:max-w-2xl">
          Queremos conocerte antes de revelar tu experiencia XAMANI.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative mt-7 sm:mt-8 md:mt-6"
        noValidate
      >
        <div className="space-y-5 md:space-y-4">
          <div>
            <label
              htmlFor="energia-nombre"
              className="mb-2 block font-archia text-sm text-xamani-silver/90"
            >
              Nombre
            </label>
            <input
              id="energia-nombre"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
                if (errors.nombre) setErrors((current) => ({ ...current, nombre: undefined }));
              }}
              placeholder="Tu nombre"
              autoComplete="name"
              required
              className={INPUT_CLASS}
              aria-invalid={Boolean(errors.nombre)}
              aria-describedby={errors.nombre ? "energia-nombre-error" : undefined}
            />
            {errors.nombre ? (
              <p id="energia-nombre-error" className="mt-2 font-archia text-xs text-xamani-wine">
                {errors.nombre}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="energia-whatsapp"
              className="mb-2 block font-archia text-sm text-xamani-silver/90"
            >
              WhatsApp
            </label>
            <input
              ref={whatsappInputRef}
              id="energia-whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(event) => handleWhatsAppChange(event.target.value)}
              placeholder="+52 55 0000 0000"
              autoComplete="tel"
              required
              className={INPUT_CLASS}
              aria-invalid={Boolean(errors.whatsapp)}
              aria-describedby={errors.whatsapp ? "energia-whatsapp-error" : undefined}
            />
            {errors.whatsapp ? (
              <p id="energia-whatsapp-error" className="mt-2 font-archia text-xs text-xamani-wine">
                {errors.whatsapp}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="energia-email"
              className="mb-2 block font-archia text-sm text-xamani-silver/90"
            >
              Correo electrónico
            </label>
            <input
              id="energia-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
              placeholder="tu@correo.com"
              autoComplete="email"
              required
              className={INPUT_CLASS}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "energia-email-error" : undefined}
            />
            {errors.email ? (
              <p id="energia-email-error" className="mt-2 font-archia text-xs text-xamani-wine">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="pt-6 md:pt-5">
          <div className="rounded-pill bg-gradient-to-r from-xamani-cyan/80 via-xamani-silver/30 to-xamani-wine p-px">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-3 rounded-pill bg-[#0b1520]/95 px-8 py-3.5 font-ambit text-[0.68rem] uppercase tracking-[0.28em] text-xamani-silver transition-all duration-300 ease-out-expo hover:bg-[#0f1d2c]/95 active:scale-[0.98] disabled:opacity-60 sm:text-xs sm:tracking-[0.32em]"
            >
              Continuar
              <span aria-hidden="true" className="text-base leading-none">
                →
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
