import type { Metadata } from "next";
import ModeloNegocio from "@/sections/landing/ModeloNegocio";

export const metadata: Metadata = {
  title: "El Camino Xamani — XAMANI",
  description: "Recorre el camino integral de asesoría estratégica de XAMANI.",
};

export default function ModeloNegocioPage() {
  return <ModeloNegocio />;
}
