import type { Metadata } from "next";
import AgendaAsesoria from "@/sections/landing/AgendaAsesoria";

export const metadata: Metadata = {
  title: "Asesoría Xamani — XAMANI",
  description: "Agenda una sesión de diagnóstico con los asesores de XAMANI.",
};

export default function UnirmeEquipoPage() {
  return <AgendaAsesoria />;
}
