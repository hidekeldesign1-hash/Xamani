"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Isotipo from "@/components/brand/Isotipo";
import { HeroMenuIcon } from "@/components/icons/HeroMenuIcons";
import { HERO_MENU_ITEMS, isActiveRoute } from "@/data/heroMenu";

const EQUIPO_ITEM = HERO_MENU_ITEMS.find((item) => item.id === "equipo")!;
const MOBILE_MENU_ITEMS = HERO_MENU_ITEMS.filter((item) => item.id !== "equipo");

const desktopNavStyles: Record<
  NonNullable<(typeof HERO_MENU_ITEMS)[number]["accent"]>,
  { idle: string; active: string; ring: string }
> = {
  cyan: {
    idle: "border-white/[0.08] bg-white/[0.04] text-xamani-silver hover:border-xamani-cyan/30 hover:bg-xamani-cyan/[0.08]",
    active: "border-xamani-cyan/40 bg-xamani-cyan/[0.12] text-xamani-silver shadow-glow",
    ring: "border-xamani-cyan/35 shadow-glow",
  },
  wine: {
    idle: "border-white/[0.08] bg-white/[0.04] text-xamani-silver hover:border-xamani-wine/35 hover:bg-xamani-wine/[0.08]",
    active: "border-xamani-wine/45 bg-xamani-wine/[0.14] text-xamani-silver shadow-glow-wine",
    ring: "border-xamani-wine/40 shadow-glow-wine",
  },
  none: {
    idle: "border-white/[0.08] bg-white/[0.04] text-xamani-silver hover:border-white/18 hover:bg-white/[0.08]",
    active: "border-white/20 bg-white/[0.08] text-white",
    ring: "border-xamani-silver/25",
  },
};

const mobileAccentStyles: Record<
  NonNullable<(typeof HERO_MENU_ITEMS)[number]["accent"]>,
  { idle: string; active: string }
> = {
  cyan: {
    idle: "border-xamani-cyan/25 text-xamani-silver hover:border-xamani-cyan/45 hover:text-xamani-cyan",
    active: "border-xamani-cyan/50 bg-xamani-cyan/10 text-xamani-cyan shadow-glow",
  },
  wine: {
    idle: "border-xamani-wine/30 text-xamani-silver hover:border-xamani-wine/50 hover:text-xamani-wine",
    active: "border-xamani-wine/55 bg-xamani-wine/15 text-xamani-silver shadow-glow-wine",
  },
  none: {
    idle: "border-xamani-silver/20 text-xamani-silver hover:border-xamani-silver/35 hover:text-white",
    active: "border-xamani-silver/40 bg-white/10 text-white",
  },
};

function HomeLogoButton({ size = "md" }: { size?: "md" | "lg" }) {
  const shell = size === "lg" ? "h-11 w-11" : "h-10 w-10";
  const logo = size === "lg" ? "h-7 w-7" : "h-6 w-6";

  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className={`flex ${shell} shrink-0 items-center justify-center rounded-full border border-xamani-silver/25 bg-white/5 transition-all duration-300 hover:scale-105 hover:border-xamani-cyan/45 hover:bg-xamani-cyan/10 active:scale-95`}
    >
      <span className={`relative ${logo}`}>
        <Isotipo className="h-full w-full" />
      </span>
    </Link>
  );
}

function NavLink({
  item,
  isActive,
  className = "",
  showLabel = true,
  onNavigate,
}: {
  item: (typeof HERO_MENU_ITEMS)[number];
  isActive: boolean;
  className?: string;
  showLabel?: boolean;
  onNavigate?: () => void;
}) {
  const accent = item.accent ?? "none";
  const styles = desktopNavStyles[accent];

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center justify-center gap-2 rounded-xl border px-2.5 py-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 active:scale-95 lg:gap-2.5 lg:px-3 lg:py-2.5 ${
        isActive ? styles.active : styles.idle
      } ${className}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-xamani-navy-deep/55 backdrop-blur-sm lg:h-8 lg:w-8 ${
          isActive ? styles.ring : "border-white/15"
        }`}
      >
        <HeroMenuIcon name={item.icon} className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
      </span>
      {showLabel && (
        <span className="whitespace-nowrap font-archia text-[0.52rem] uppercase tracking-[0.12em] lg:text-[0.58rem] lg:tracking-[0.16em] xl:text-[0.62rem]">
          {item.label.toUpperCase()}
        </span>
      )}
    </Link>
  );
}

interface FloatingNavbarProps {
  alwaysVisible?: boolean;
}

export default function FloatingNavbar({ alwaysVisible = false }: FloatingNavbarProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [scrollVisible, setScrollVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const visible = alwaysVisible || scrollVisible;
  const equipoActive = isActiveRoute(pathname, EQUIPO_ITEM.href);

  useEffect(() => {
    if (alwaysVisible) return;

    const updateVisibility = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrollVisible(false);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom;
      setScrollVisible(heroBottom <= 72);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [alwaysVisible]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <>
      <motion.div
        role="presentation"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))] md:flex"
        initial={false}
        animate={{
          y: visible ? 0 : -28,
          opacity: visible ? 1 : 0,
        }}
        transition={transition}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <nav
          aria-label="Navegación flotante"
          className="pointer-events-auto w-full max-w-6xl"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-xamani-navy/25 p-1.5 shadow-glass backdrop-blur-glass lg:gap-2.5 lg:p-2">
            <HomeLogoButton />
            <span
              className="h-6 w-px shrink-0 bg-xamani-silver/15"
              aria-hidden="true"
            />
            <ul className="flex min-w-0 flex-1 list-none items-center justify-evenly gap-1 lg:gap-2">
              {HERO_MENU_ITEMS.map((item) => (
                <li key={item.id} className="flex justify-center">
                  <NavLink
                    item={item}
                    isActive={isActiveRoute(pathname, item.href)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </motion.div>

      <motion.div
        ref={navRef}
        role="presentation"
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 md:hidden"
        initial={false}
        animate={{
          y: visible ? 0 : 28,
          opacity: visible ? 1 : 0,
        }}
        transition={transition}
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <nav
          aria-label="Navegación flotante móvil"
          className="pointer-events-auto relative w-full max-w-[min(100%,22rem)]"
        >
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-card border border-white/10 bg-xamani-navy/95 shadow-glass backdrop-blur-glass"
              >
                <ul className="flex list-none flex-col p-2">
                  {MOBILE_MENU_ITEMS.map((item) => {
                    const accent = item.accent ?? "none";
                    const styles = mobileAccentStyles[accent];
                    const isActive = isActiveRoute(pathname, item.href);

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${
                            isActive
                              ? styles.active
                              : "border-transparent text-xamani-silver hover:bg-white/5"
                          }`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-xamani-silver/20 bg-white/5">
                            <HeroMenuIcon name={item.icon} className="h-4 w-4" />
                          </span>
                          <span className="font-archia text-[0.65rem] uppercase tracking-[0.14em]">
                            {item.label.toUpperCase()}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 rounded-pill border border-white/10 bg-xamani-navy/90 p-2 shadow-glass backdrop-blur-glass sm:grid-cols-[3rem_1fr_3rem]">
            <HomeLogoButton size="lg" />
            <Link
              href={EQUIPO_ITEM.href}
              aria-label={EQUIPO_ITEM.label}
              aria-current={equipoActive ? "page" : undefined}
              className={`flex min-w-0 items-center justify-center gap-1.5 rounded-full border px-2 py-2.5 transition-all duration-300 active:scale-95 sm:gap-2 sm:px-3 ${
                equipoActive ? mobileAccentStyles.wine.active : mobileAccentStyles.wine.idle
              }`}
            >
              <HeroMenuIcon name="team" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate font-archia text-[0.5rem] uppercase leading-tight tracking-[0.08em] sm:text-[0.58rem] sm:tracking-[0.1em]">
                {EQUIPO_ITEM.label.toUpperCase()}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 ${
                mobileMenuOpen
                  ? "border-xamani-cyan/50 bg-xamani-cyan/10 text-xamani-cyan"
                  : "border-xamani-silver/25 bg-white/5 text-xamani-silver"
              }`}
            >
              <HeroMenuIcon name="menu" className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
