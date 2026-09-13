import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/content/site";
import { pageLastModified } from "@/content/page-updates";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: pageLastModified[route],
  }));
}
