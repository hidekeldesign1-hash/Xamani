import type { HeroMenuIconName } from "@/components/icons/HeroMenuIcons";

export const ROUTES = {
  home: "/",
  manifiesto: "/manifiesto",
  modelo: "/modelo-de-negocio",
  equipo: "/unirme-al-equipo",
  asesoria: "/agenda-asesoria",
  historia: "/nuestra-historia",
} as const;

export interface HeroMenuItem {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  icon: HeroMenuIconName;
  accent?: "cyan" | "wine" | "none";
}

export const HERO_MENU_ITEMS: HeroMenuItem[] = [
  {
    id: "manifiesto",
    label: "Manifiesto",
    subtitle: "Nuestros principios, nuestra causa.",
    href: ROUTES.manifiesto,
    icon: "column",
    accent: "cyan",
  },
  {
    id: "historia",
    label: "Nuestra Historia",
    subtitle: "El camino que nos trajo aquí.",
    href: ROUTES.historia,
    icon: "compass",
    accent: "none",
  },
  {
    id: "equipo",
    label: "Conviértete en Xamani",
    subtitle: "Sé parte de algo grande.",
    href: ROUTES.equipo,
    icon: "team",
    accent: "wine",
  },
  {
    id: "modelo",
    label: "El Camino Xamani",
    subtitle: "Cómo generamos valor.",
    href: ROUTES.modelo,
    icon: "chart",
    accent: "none",
  },
  {
    id: "asesoria",
    label: "Asesoría Xamani",
    subtitle: "Hablemos de tu visión.",
    href: ROUTES.asesoria,
    icon: "calendar",
    accent: "cyan",
  },
];

export function isActiveRoute(pathname: string, href: string) {
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
