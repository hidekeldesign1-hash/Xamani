import type { Metadata } from "next";
import UnirmeEquipo from "@/sections/landing/UnirmeEquipo";

export const metadata: Metadata = {
  title: "Unirme al Equipo — XAMANI",
  description: "Únete al equipo de asesores con propósito de XAMANI.",
};

export default function UnirmeEquipoPage() {
  return <UnirmeEquipo />;
}
