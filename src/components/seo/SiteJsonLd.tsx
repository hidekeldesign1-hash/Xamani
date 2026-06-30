import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/data/site";

export default function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon/icon-512x512.png`,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    email: "hola@xamani.com.mx",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Paseo de la Reforma #144, 3er piso",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      postalCode: "06600",
      addressCountry: "MX",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "es-MX",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
