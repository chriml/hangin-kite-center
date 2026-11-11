import type { PublicRoute } from "@/content/site";

// Owner-supplied dates and group options, 2026-11-10. The owner confirmed on
// 2026-11-11 that these dates repeat every year.
export const batbatanSafari = {
  dates: ["December 4", "January 4", "February 4", "March 4"],
  recurrence: "These dates repeat every year.",
  otherDates: "Other dates upon request, with a minimum of 7 kiters.",
  privateTrip: "Fewer than 7 kiters? Ask about a private trip.",
  description: "Batbatan kite safari every year on December 4, January 4, February 4 and March 4. Ask about other dates for 7 or more kiters, or a private trip.",
} as const;

// Other trip details have not been supplied yet.
export const safariTrips = [
  { slug: "batbatan", name: "Batbatan", path: "/kite-safaris/batbatan/" },
  { slug: "colon", name: "Colon", path: "/kite-safaris/colon/" },
  { slug: "others", name: "Others", path: "/kite-safaris/others/" },
] as const satisfies readonly { slug: string; name: string; path: PublicRoute }[];
