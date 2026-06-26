/**
 * Logotipo tipográfico XAMANI (Ambit)
 * Las «A» se renderizan como chevrones sin travesaño
 */
function ChevronA({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block leading-none ${className}`}
      aria-hidden="true"
    >
      Λ
    </span>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-ambit font-semibold uppercase text-xamani-silver ${className}`}
      aria-label="XAMANI"
    >
      X
      <ChevronA />
      M
      <ChevronA />
      NI
    </span>
  );
}
