import type { Metadata } from "next";
import UnirmeEquipo from "@/sections/landing/UnirmeEquipo";

export const metadata: Metadata = {
  title: "Asesoría Xamani — XAMANI",
  description: "Conoce a los asesores de XAMANI y agenda una sesión de diagnóstico.",
};

export default function AgendaAsesoriaPage() {
  return <UnirmeEquipo />;
}
