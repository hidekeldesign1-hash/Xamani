"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeroMenuIcon } from "@/components/icons/HeroMenuIcons";
import { HERO_MENU_ITEMS, isActiveRoute, type HeroMenuItem } from "@/data/heroMenu";

export type { HeroMenuItem };
export { HERO_MENU_ITEMS };

const accentRing: Record<NonNullable<HeroMenuItem["accent"]>, string> = {
  cyan: "border-xamani-cyan/35 shadow-glow",
  wine: "border-xamani-wine/40 shadow-glow-wine",
  none: "border-xamani-silver/25",
};

const desktopActiveCard: Record<NonNullable<HeroMenuItem["accent"]>, string> = {
  cyan: "border-xamani-cyan/40 bg-xamani-cyan/[0.12] shadow-glow",
  wine: "border-xamani-wine/45 bg-xamani-wine/[0.14] shadow-glow-wine",
  none: "border-white/20 bg-white/[0.08]",
};

const desktopIdleCard =
  "border-white/[0.08] bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/18 hover:bg-white/[0.08] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]";

const desktopEquipoCard =
  "border-xamani-wine/40 bg-xamani-wine/[0.1] shadow-glow-wine hover:border-xamani-wine/55 hover:bg-xamani-wine/[0.14]";

const desktopEquipoRing =
  "border-xamani-wine/50 shadow-[0_0_18px_rgba(119,19,53,0.45)]";

const mobileAccentBar: Record<NonNullable<HeroMenuItem["accent"]>, string> = {
  cyan: "bg-xamani-cyan",
  wine: "bg-xamani-wine",
  none: "bg-xamani-cyan",
};

const mobileActiveBorder: Record<NonNullable<HeroMenuItem["accent"]>, string> = {
  cyan: "border-xamani-cyan/35",
  wine: "border-xamani-wine/40",
  none: "border-xamani-cyan/30",
};

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeroMenuProps {
  className?: string;
}

export default function HeroMenu({ className = "" }: HeroMenuProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className={`w-full ${className}`}>
      {/* Móvil — tarjetas verticales */}
      <ul className="mx-auto flex w-full max-w-sm list-none flex-col gap-2 px-3 md:hidden">
        {HERO_MENU_ITEMS.map((item) => {
          const accent = item.accent ?? "none";
          const isActive = isActiveRoute(pathname, item.href);

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-2xl border bg-xamani-navy-deep/50 px-3.5 py-3 transition-all duration-300 active:scale-[0.98] ${
                  isActive
                    ? `${mobileActiveBorder[accent]} bg-white/[0.06]`
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-xamani-navy/80 text-xamani-silver">
                  <HeroMenuIcon name={item.icon} className="h-4 w-4" />
                </span>

                <span
                  className={`h-9 w-0.5 shrink-0 rounded-full ${mobileAccentBar[accent]}`}
                  aria-hidden="true"
                />

                <span className="min-w-0 flex-1">
                  <span className="block font-ambit text-[0.7rem] uppercase leading-tight tracking-[0.14em] text-xamani-silver">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block font-archia text-[0.65rem] leading-snug text-xamani-silver-muted">
                    {item.subtitle}
                  </span>
                </span>

                <ChevronRight className="shrink-0 text-xamani-silver/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-xamani-silver" />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop + tablet — botones glass independientes */}
      <div className="mx-auto hidden w-full max-w-[82rem] justify-center px-2 sm:px-4 md:flex">
        <ul className="flex list-none flex-wrap items-stretch justify-center gap-3 md:flex-nowrap md:gap-3.5">
          {HERO_MENU_ITEMS.map((item) => {
            const accent = item.accent ?? "none";
            const isActive = isActiveRoute(pathname, item.href);
            const isEquipo = item.id === "equipo";

            const cardClass = isActive
              ? desktopActiveCard[accent]
              : isEquipo
                ? desktopEquipoCard
                : desktopIdleCard;

            const iconRingClass =
              isActive || isEquipo
                ? isEquipo
                  ? desktopEquipoRing
                  : accentRing[accent]
                : "border-white/15";

            return (
              <li key={item.id} className="flex items-stretch">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex min-w-[6.5rem] flex-col items-center justify-center gap-2.5 rounded-xl border px-3.5 py-4 text-center shadow-glass backdrop-blur-glass transition-all duration-300 sm:min-w-[7.25rem] sm:gap-3 sm:px-4 sm:py-4 md:min-w-[8rem] md:gap-3.5 md:px-[1.125rem] md:py-[1.35rem] lg:min-w-[8.75rem] lg:px-5 lg:py-5 ${cardClass}`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-xamani-navy-deep/55 text-xamani-silver backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 md:h-12 md:w-12 ${iconRingClass}`}
                  >
                    <HeroMenuIcon
                      name={item.icon}
                      className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem] md:h-5 md:w-5"
                    />
                  </span>
                  <span className="flex w-full flex-col items-center gap-1">
                    <span className="text-balance font-archia text-[0.52rem] uppercase leading-tight tracking-[0.11em] text-xamani-silver sm:text-[0.56rem] sm:tracking-[0.13em] md:text-[0.6rem] md:tracking-[0.15em] lg:text-[0.64rem] lg:tracking-[0.17em]">
                      {item.label.toUpperCase()}
                    </span>
                    <span className="h-px w-10 origin-center scale-x-60 bg-xamani-silver/35 transition-transform duration-300 group-hover:scale-x-100 md:w-11" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
