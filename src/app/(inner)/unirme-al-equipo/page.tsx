import type { Metadata } from "next";
import AgendaAsesoria from "@/sections/landing/AgendaAsesoria";

export const metadata: Metadata = {
  title: "Descubre tu Energía XAMANI",
  description:
    "Conoce la energía que te impulsa. 20 preguntas, 2-3 minutos y resultado inmediato.",
};

export default function UnirmeEquipoPage() {
  return <AgendaAsesoria />;
}
