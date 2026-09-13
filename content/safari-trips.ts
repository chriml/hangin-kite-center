import type { PublicRoute } from "@/content/site";

// Names supplied by the owner. Trip details have not been supplied yet.
export const safariTrips = [
  { slug: "batbatan", name: "Batbatan", path: "/kite-safaris/batbatan/" },
  { slug: "colon", name: "Colon", path: "/kite-safaris/colon/" },
  { slug: "others", name: "Others", path: "/kite-safaris/others/" },
] as const satisfies readonly { slug: string; name: string; path: PublicRoute }[];
