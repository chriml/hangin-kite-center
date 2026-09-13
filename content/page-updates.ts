import type { PublicRoute } from "@/content/site";

// Substantive page changes, not build timestamps. Dates are supported by
// docs/project and the GEO implementation record. Omit an unknown date.
// Update the relevant entry when its public content or links change.
export const pageLastModified: Partial<Record<PublicRoute, string>> = {
  "/": "2026-09-13",
  "/kitesurfing-lessons/": "2026-09-13",
  "/rentals-storage/": "2026-09-12",
  "/kite-safaris/": "2026-09-13",
  "/shop/": "2026-09-12",
  "/kitesurfing-boracay/": "2026-09-13",
  "/kitesurfing-boracay/places-to-be/": "2026-09-13",
  "/kitesurfing-boracay/things-to-do/": "2026-09-13",
  "/kitesurfing-boracay/planning-your-days/": "2026-09-13",
  "/kitesurfing-boracay/practical-questions/": "2026-09-13",
  "/kite-size-guide/": "2026-09-13",
  "/about/": "2026-09-13",
  "/contact/": "2026-09-13",
  "/legal/": "2026-09-13",
  "/terms/": "2026-09-13",
  "/accessibility/": "2026-09-13",
};
