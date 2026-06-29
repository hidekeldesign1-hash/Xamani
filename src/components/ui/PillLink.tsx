import Link from "next/link";
import { isWhatsAppUrl } from "@/data/contact";

interface PillLinkProps {
  href: string;
  filled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const baseClassName =
  "inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-ambit text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-300 ease-out-expo [-webkit-tap-highlight-color:transparent] sm:px-8 sm:text-xs sm:tracking-[0.2em]";

function getVariantClassName(filled: boolean) {
  return filled
    ? "bg-xamani-wine text-xamani-silver hover:shadow-glow-wine"
    : "border border-xamani-silver/30 bg-transparent text-xamani-silver hover:border-xamani-silver/60";
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function PillLink({
  href,
  filled = true,
  className = "",
  children,
}: PillLinkProps) {
  const classNames = `${baseClassName} ${getVariantClassName(filled)} ${className}`;

  if (isExternalHref(href)) {
    const openInNewTab = href.startsWith("http") && !isWhatsAppUrl(href);

    return (
      <a
        href={href}
        className={classNames}
        {...(openInNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : { rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
