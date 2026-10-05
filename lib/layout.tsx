import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import type { Dict } from "@/content/types";

// One family for the whole site; the serif lives only in the logo.
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: "#f6f2eb",
  colorScheme: "light",
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
    <html lang={lang} className={`${raleway.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
