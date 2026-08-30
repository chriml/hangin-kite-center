import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
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

const homepageDescription =
  "Kitesurfing lessons, equipment rental, storage, accommodation, shop and kite safaris with Hangin Kite Center on Bulabog Beach, Boracay.";

const homepageMetadata = buildMetadata({
  title: "Kitesurfing in Boracay",
  description: homepageDescription,
  path: "/",
});

export const metadata: Metadata = {
  ...homepageMetadata,
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: "Kitesurfing in Boracay | Hangin Kite Center",
    template: "%s | Hangin Kite Center",
  },
};

const sitewideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.email,
    },
    {
      "@type": "SportsActivityLocation",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.email,
      sport: "Kitesurfing",
      foundingDate: String(siteConfig.established),
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
