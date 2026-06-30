import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1520",
    theme_color: "#0b1520",
    icons: [
      {
        src: "/favicon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
