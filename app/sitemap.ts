import type { MetadataRoute } from "next";
import { publicRoutes } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const isHomepage = route === "/";
    const isPrimaryGuide =
      route === "/kitesurfing-lessons/" || route === "/kitesurfing-boracay/";

    return {
      url: absoluteUrl(route),
      lastModified: new Date("2026-09-04"),
      changeFrequency: isHomepage ? "weekly" : "monthly",
      priority: isHomepage ? 1 : isPrimaryGuide ? 0.9 : 0.7,
    };
  });
}
