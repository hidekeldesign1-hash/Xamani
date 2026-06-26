"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import SiteFooter from "@/components/layout/SiteFooter";
import LogoPatternLayer from "@/sections/landing/shared/LogoPatternLayer";
import { ROUTES } from "@/data/heroMenu";

interface InnerPageShellProps {
  children: React.ReactNode;
}

export default function InnerPageShell({ children }: InnerPageShellProps) {
  const pathname = usePathname();
  const hideFooter = pathname === ROUTES.manifiesto;
  const isManifiesto = pathname === ROUTES.manifiesto;
  const surfaceBg =
    pathname === ROUTES.manifiesto || pathname === ROUTES.modelo;

  return (
    <main
      className={`relative min-h-screen overflow-x-clip ${
        isManifiesto
          ? "max-md:bg-[#0b1520]"
          : surfaceBg
            ? "bg-xamani-navy-surface"
            : "bg-xamani-navy"
      }`}
    >
      <FloatingNavbar alwaysVisible />
      <div className="relative min-h-screen">
        <LogoPatternLayer className="max-md:hidden" />
        <div className="relative z-[1] pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <div
            className={`overflow-x-clip rounded-t-[4rem] sm:rounded-t-[6rem] ${
              isManifiesto
                ? "max-md:rounded-none max-md:bg-[#0b1520]"
                : surfaceBg
                  ? "bg-xamani-navy-surface"
                  : "bg-xamani-navy-deep"
            }`}
          >
            <div className="pt-20 md:pt-24">{children}</div>
          </div>
          {!hideFooter && <SiteFooter />}
        </div>
      </div>
    </main>
  );
}
