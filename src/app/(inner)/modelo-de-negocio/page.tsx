import type { Metadata } from "next";
import ModeloNegocio from "@/sections/landing/ModeloNegocio";

export const metadata: Metadata = {
  title: "Modelo de Negocio — XAMANI",
  description: "Conoce el modelo integral de asesoría estratégica de XAMANI.",
};

export default function ModeloNegocioPage() {
  return <ModeloNegocio />;
}
