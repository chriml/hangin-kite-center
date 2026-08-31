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
  const socialImageUrl = absoluteUrl("/opengraph-image.jpg");
  const socialImageAlt = "Kitesurfers riding over turquoise water in Boracay.";

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
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImageUrl, alt: socialImageAlt }],
    },
  };
}
