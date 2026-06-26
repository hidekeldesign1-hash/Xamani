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

  return (
    <main className="relative min-h-screen overflow-x-clip bg-xamani-canvas">
      <FloatingNavbar alwaysVisible />
      <div className="relative min-h-screen">
        <LogoPatternLayer className="max-md:hidden" />
        <div className="relative z-[1] pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <div
            className={`overflow-x-clip bg-xamani-canvas ${
              isManifiesto
                ? "max-md:rounded-none"
                : "rounded-t-[4rem] sm:rounded-t-[6rem]"
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
