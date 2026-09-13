export const siteConfig = {
  name: "Hangin Kite Center",
  shortName: "Hangin",
  centerDesignation: "Official Duotone Kite Center",
  origin: "https://www.hanginkitecenter.com",
  email: "hanginkitecenter@gmail.com",
  whatsappDisplay: "+63 938 010 1849",
  whatsappNumber: "639380101849",
  location: "Bulabog Beach, Boracay, Philippines",
  established: 2002,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Hangin+Kite+Center+Bulabog+Beach+Boracay",
} as const;

export const sitePartners = [
  { name: "Duotone", href: "https://www.duotonesports.com/en/kiteboarding", logo: "/brand/partners/duotone.svg", width: 202, height: 40 },
  { name: "ION", href: "https://www.ion-products.com/en", logo: "/brand/partners/ion.svg", width: 103, height: 32 },
] as const;

export type SocialPlatform = "facebook" | "instagram" | "tiktok";

export const socialLinks: ReadonlyArray<{
  platform: SocialPlatform;
  label: string;
  href: string;
}> = [
  {
    platform: "facebook",
    label: "Hangin on Facebook",
    href: "https://www.facebook.com/HanginKiteCenterAndResort/",
  },
];

export const reviewPlatforms = [
  {
    name: "Google",
    cached: false,
    rating: 4.1,
    logo: "/brand/reviews/google.svg",
    width: 74,
    height: 24,
    href: "https://www.google.com/maps/search/?api=1&query=Hangin+Kitesurf+Center+%26+Resort&query_place_id=ChIJDZwPzD08pTMRCv8c2mLjjBw",
    checkedAt: "2026-09-06",
  },
  {
    name: "Tripadvisor",
    cached: true,
    rating: 4.9,
    logo: "/brand/reviews/tripadvisor.svg",
    width: 157,
    height: 24,
    href: "https://www.tripadvisor.com/Attraction_Review-g1203055-d3267405-Reviews-Hangin_Kite_Center_Resort-Malay_Aklan_Province_Panay_Island_Visayas.html",
    checkedAt: "2026-09-06",
  },
] as const;

export const pendingSafariRoutes = [
  "/kite-safaris/batbatan/",
  "/kite-safaris/colon/",
  "/kite-safaris/others/",
] as const;

export const publicRoutes = [
  "/",
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/kite-safaris/",
  ...pendingSafariRoutes,
  "/events/",
  "/accommodation/",
  "/shop/",
  "/kitesurfing-boracay/",
  "/kitesurfing-boracay/places-to-be/",
  "/kitesurfing-boracay/things-to-do/",
  "/kitesurfing-boracay/planning-your-days/",
  "/kitesurfing-boracay/practical-questions/",
  "/kite-size-guide/",
  "/about/",
  "/contact/",
  "/legal/",
] as const;

// Coming-soon trip pages are reached through the safari cards.
export const navigationRoutes = publicRoutes.filter(route => !pendingSafariRoutes.some(pending => pending === route));
export const indexableRoutes = navigationRoutes.filter(route => route !== "/events/");

export type PublicRoute = (typeof publicRoutes)[number];
export type ContactContext =
  | "general"
  | "lessons"
  | "rental"
  | "rental-storage"
  | "storage"
  | "safari"
  | "stay"
  | "shop";

export type PrimaryContactLabel = "message" | "ask" | "direct";

type PrimaryContactConfig = Readonly<{
  provider: "whatsapp" | "booking";
  channelLabel: string;
  destination: string;
  displayDestination: string;
  labels: Readonly<Record<PrimaryContactLabel, string>>;
  external: boolean;
  buildHref: (destination: string, message: string) => string;
}>;

export type PrimaryContactAction = Readonly<{
  provider: PrimaryContactConfig["provider"];
  channelLabel: string;
  displayDestination: string;
  label: string;
  href: string;
  target: "_blank" | undefined;
  rel: "noopener noreferrer" | undefined;
}>;

const contactMessages: Record<ContactContext, string> = {
  general:
    "Hi Hangin, I'm planning a Boracay trip. My dates are [dates], my riding level is [level], and I need help with [service].",
  lessons: "Hi Hangin, I'd like to arrange kitesurfing lessons in Boracay.",
  rental:
    "Hi Hangin, I'd like to check kite rental availability for my Boracay trip.",
  "rental-storage":
    "Hi Hangin, I'd like to ask about kite rental or gear storage for my Boracay trip. My dates are [dates], my riding level is [level], and my usual sizes are [sizes].",
  storage: "Hi Hangin, I'd like to ask about kite storage on Bulabog Beach.",
  safari: "Hi Hangin, I'd like to ask about a kite safari from Boracay. My dates are [dates], our riding levels are [levels], our group size is [number], and we're bringing [gear]. What could work, what does it cost, and what's included?",
  stay: "Hi Hangin, I'd like to check accommodation availability near the kite beach.",
  shop: "Hi Hangin, I'd like to check what kite gear is currently in the shop.",
};

export const primaryContactConfig = {
  provider: "whatsapp",
  channelLabel: "WhatsApp",
  destination: siteConfig.whatsappNumber,
  displayDestination: siteConfig.whatsappDisplay,
  labels: {
    message: "Message us on WhatsApp",
    ask: "Ask Hangin on WhatsApp",
    direct: "WhatsApp us",
  },
  external: true,
  buildHref: (destination, message) =>
    `https://wa.me/${destination}?text=${encodeURIComponent(message)}`,
} as const satisfies PrimaryContactConfig;

export function getPrimaryContactAction(
  context: ContactContext = "general",
  label: PrimaryContactLabel = "message",
): PrimaryContactAction {
  return buildContactAction(contactMessages[context], label);
}

export function getLessonContactAction(course: string): PrimaryContactAction {
  return buildContactAction(
    `Hi Hangin, I'd like to ask about ${course} in Boracay. My dates are [dates] and my riding level is [level].`,
    "ask",
  );
}

export function getSafariContactAction(trip: string): PrimaryContactAction {
  return buildContactAction(
    `Hi Hangin, I'd like to request information about the ${trip} kite safari. My dates are [dates] and my riding level is [level].`,
    "ask",
  );
}

function buildContactAction(message: string, label: PrimaryContactLabel): PrimaryContactAction {
  return {
    provider: primaryContactConfig.provider,
    channelLabel: primaryContactConfig.channelLabel,
    displayDestination: primaryContactConfig.displayDestination,
    label: primaryContactConfig.labels[label],
    href: primaryContactConfig.buildHref(
      primaryContactConfig.destination,
      message,
    ),
    target: primaryContactConfig.external ? "_blank" : undefined,
    rel: primaryContactConfig.external ? "noopener noreferrer" : undefined,
  };
}
