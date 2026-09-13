import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: siteConfig.name,
    template: "%s | Hangin Kite Center",
  },
};

const businessId = `${siteConfig.origin}/#kite-center`;

const sitewideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.origin}/#website`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      publisher: { "@id": businessId },
    },
    {
      "@type": "Organization",
      "@id": businessId,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.email,
    },
    {
      "@type": "SportsActivityLocation",
      "@id": businessId,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsappNumber}`,
      foundingDate: String(siteConfig.established),
      hasMap: siteConfig.mapsUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Boracay",
        addressRegion: "Aklan",
        addressCountry: "PH",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={sitewideJsonLd} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
