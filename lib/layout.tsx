import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import type { Dict } from "@/content/types";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f0" },
    { media: "(prefers-color-scheme: dark)", color: "#111113" },
  ],
};

export function buildMetadata(dict: Dict, path: "/" | "/en"): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    // Private concept: keep it out of search so it never competes with the official site.
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: path, languages: { uk: "/", en: "/en" } },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: path,
      siteName: "Meliation",
      locale: dict.lang === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images: [{ url: "/assets/hero-ending.jpg", width: 1920, height: 1080 }],
    },
  };
}

export function RootShell({ lang, children }: { lang: Dict["lang"]; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${cormorant.variable} ${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
