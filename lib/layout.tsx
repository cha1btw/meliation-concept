import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Serif_Display } from "next/font/google";
import type { Dict } from "@/content/types";

// Editorial pairing: a Didone serif (razor-thin hairlines, heavy stems, like the PORTER masthead letter)
// for headlines and the monogram, a geometric sans for UI and body. Both cover Ukrainian.
const serif = Noto_Serif_Display({
  variable: "--font-didone",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export function RootShell({ lang, children }: { lang: Dict["lang"]; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
