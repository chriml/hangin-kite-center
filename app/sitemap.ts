import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => {
    const isHomepage = route === "/";
    const isPrimaryGuide =
      route === "/kitesurfing-lessons/" || route === "/kitesurfing-boracay/";

    return {
      url: absoluteUrl(route),
      lastModified: new Date(route === "/kite-safaris/" || route === "/legal/" || route.startsWith("/kitesurfing-boracay/") ? "2026-09-13" : route === "/kite-size-guide/" ? "2026-09-08" : route === "/terms/" || route === "/accessibility/" ? "2026-09-04" : "2026-08-29"),
      changeFrequency: isHomepage ? "weekly" : "monthly",
      priority: isHomepage ? 1 : isPrimaryGuide ? 0.9 : 0.7,
    };
  });
}
