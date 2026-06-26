import Image from "next/image";

/**
 * Isotipo XAMANI — asset PNG oficial
 */
export default function Isotipo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/isotipo.png"
      alt=""
      width={128}
      height={128}
      priority
      className={`h-full w-full object-contain ${className}`}
      aria-hidden="true"
    />
  );
}
