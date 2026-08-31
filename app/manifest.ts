import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hangin Kite Center",
    short_name: "Hangin",
    description:
      "Kitesurfing lessons, rental, storage, accommodation, shop and kite safaris on Boracay.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf6",
    theme_color: "#073642",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
