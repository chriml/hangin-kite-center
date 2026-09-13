import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // The wildcard also permits OAI-SearchBot, Claude-SearchBot, Claude-User,
    // Googlebot and Bingbot. Search access is distinct from training policy;
    // Google-Extended also controls Gemini grounding. See the GEO runbook.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.origin}/sitemap.xml`,
  };
}
