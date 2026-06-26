"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Restaura scroll al inicio al cambiar de ruta (p. ej. salir del hero con scroll bloqueado). */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
