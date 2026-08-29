import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd data={sitewideJsonLd} />
        {children}
      </body>
    </html>
  );
}
