import type { Metadata } from "next";
import NuestraHistoria from "@/sections/landing/NuestraHistoria";

export const metadata: Metadata = {
  title: "Nuestra Historia — XAMANI",
  description: "La historia de XAMANI: asesores con propósito desde Ciudad de México.",
};

export default function NuestraHistoriaPage() {
  return <NuestraHistoria />;
}
