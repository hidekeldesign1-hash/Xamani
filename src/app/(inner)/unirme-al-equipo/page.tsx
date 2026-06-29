import type { Metadata } from "next";
import UnirmeEquipo from "@/sections/landing/UnirmeEquipo";

export const metadata: Metadata = {
  title: "Conviertete en Xamani — XAMANI",
  description: "Únete a los asesores con propósito de XAMANI.",
};

export default function UnirmeEquipoPage() {
  return <UnirmeEquipo />;
}
