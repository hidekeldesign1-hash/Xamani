import type { Metadata } from "next";
import ElManifiesto from "@/sections/landing/ElManifiesto";

export const metadata: Metadata = {
  title: "El Manifiesto — XAMANI",
  description:
    "El manifiesto XAMANI: transformación, identidad y propósito con audacia.",
};

export default function ManifiestoPage() {
  return <ElManifiesto />;
}
