export const siteConfig = {
  name: "Hangin Kite Center",
  shortName: "Hangin",
  origin: "https://www.hanginkitecenter.com",
  email: "hanginkitecenter@gmail.com",
  whatsappDisplay: "+63 938 010 1849",
  whatsappNumber: "639380101849",
  location: "Bulabog Beach, Boracay, Philippines",
  established: 2002,
} as const;

export const publicRoutes = [
  "/",
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/kite-safaris/",
  "/accommodation/",
  "/shop/",
  "/kitesurfing-boracay/",
  "/about/",
  "/contact/",
] as const;

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
  safari: "Hi Hangin, I'd like to know about kite safari options during my trip.",
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
  return {
    provider: primaryContactConfig.provider,
    channelLabel: primaryContactConfig.channelLabel,
    displayDestination: primaryContactConfig.displayDestination,
    label: primaryContactConfig.labels[label],
    href: primaryContactConfig.buildHref(
      primaryContactConfig.destination,
      contactMessages[context],
    ),
    target: primaryContactConfig.external ? "_blank" : undefined,
    rel: primaryContactConfig.external ? "noopener noreferrer" : undefined,
  };
}
