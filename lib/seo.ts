import type { Metadata } from "next";
import { siteConfig, type PublicRoute } from "@/content/site";

export function absoluteUrl(path: PublicRoute | `/${string}`) {
  return new URL(path, `${siteConfig.origin}/`).toString();
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: PublicRoute;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
