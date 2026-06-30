import type { Metadata } from "next";
import UnirmeEquipo from "@/sections/landing/UnirmeEquipo";

export const metadata: Metadata = {
  title: "Conviértete en Xamani — XAMANI",
  description: "Únete a los asesores con propósito de XAMANI.",
};

export default function AgendaAsesoriaPage() {
  return <UnirmeEquipo />;
}
