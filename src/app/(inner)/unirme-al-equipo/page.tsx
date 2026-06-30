import type { Metadata } from "next";
import AgendaAsesoria from "@/sections/landing/AgendaAsesoria";

export const metadata: Metadata = {
  title: "Conviértete en Xamani — XAMANI",
  description: "Únete a los asesores con propósito de XAMANI.",
};

export default function UnirmeEquipoPage() {
  return <AgendaAsesoria />;
}
