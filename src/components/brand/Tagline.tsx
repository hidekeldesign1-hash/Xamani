/**
 * Tagline "ASESORES CON PROPÓSITO" con líneas decorativas azul/vino
 */
export default function Tagline({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px w-8 bg-xamani-cyan" aria-hidden="true" />
      <p className="font-archia text-micro uppercase text-xamani-silver-muted">
        Asesores con Propósito
      </p>
      <span className="h-px w-8 bg-xamani-wine" aria-hidden="true" />
    </div>
  );
}
