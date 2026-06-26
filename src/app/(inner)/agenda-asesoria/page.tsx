import type { Metadata } from "next";
import AgendaAsesoria from "@/sections/landing/AgendaAsesoria";

export const metadata: Metadata = {
  title: "Agenda una Asesoría — XAMANI",
  description: "Agenda una sesión de diagnóstico con los asesores de XAMANI.",
};

export default function AgendaAsesoriaPage() {
  return <AgendaAsesoria />;
}
