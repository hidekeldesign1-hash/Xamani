import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ambit = localFont({
  src: [
    {
      path: "../../public/fonts/Ambit Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ambit Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ambit SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ambit Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ambit",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const archia = localFont({
  src: "../../public/fonts/Archia-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-archia",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "XAMANI — Asesores con Propósito",
  description:
    "Elegimos construir lo que trasciende. Asesoría estratégica con propósito.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/icon-192x192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1520",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ambit.variable} ${archia.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-xamani-canvas font-archia text-xamani-silver">
        {children}
      </body>
    </html>
  );
}
