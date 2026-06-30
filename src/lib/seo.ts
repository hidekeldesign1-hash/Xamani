import type { Metadata } from "next";
import { ROUTES } from "@/data/heroMenu";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TAGLINE,
  SITE_URL,
} from "@/data/site";

const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE} | Asesoría Estratégica`;

export function createSiteMetadata(overrides: Metadata = {}): Metadata {
  const ogImage = new URL(SITE_OG_IMAGE, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "business",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: SITE_URL,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: `${SITE_NAME} — isotipo`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: DEFAULT_TITLE,
      description: SITE_DESCRIPTION,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...overrides,
  };
}

export const SITE_ROUTES = [
  ROUTES.home,
  ROUTES.manifiesto,
  ROUTES.historia,
  ROUTES.equipo,
  ROUTES.modelo,
  ROUTES.asesoria,
] as const;
