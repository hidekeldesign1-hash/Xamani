import type { Metadata } from "next";
import IntroHeroExperience from "@/sections/IntroHeroExperience";
import { createSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createSiteMetadata({
  alternates: {
    canonical: "/",
  },
});

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-xamani-canvas">
      <IntroHeroExperience />
    </main>
  );
}
