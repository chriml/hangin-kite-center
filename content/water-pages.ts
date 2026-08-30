import { siteImages, type SiteImage } from "@/content/images";
import type { ContactContext, PublicRoute } from "@/content/site";

export type ServicePageContent = {
  path: PublicRoute;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  image: SiteImage;
  context: ContactContext;
  contact?: { heading: string; body: string };
  schema: "service" | "guide" | "about";
  sections: readonly { heading: string; body: readonly string[] }[];
  faq: readonly { question: string; answer: string }[];
};

export const waterPages = {
  lessons: {
    path: "/kitesurfing-lessons/",
    title: "Learn to kitesurf in Boracay",
    metaTitle: "Kitesurfing Lessons in Boracay",
    description:
      "Kitesurfing lessons on Bulabog Beach, Boracay, with IKO and VDWS instructors for complete beginners, progressing riders and advanced kiters.",
    eyebrow: "Lessons on Bulabog Beach",
    lead: "Start on the beach, then move into Bulabog's warm shallow lagoon. We teach the part you need next and keep the session matched to the conditions.",
    image: siteImages.school,
    context: "lessons",
    schema: "service",
    sections: [
      {
        heading: "Your first lesson starts on the beach",
        body: [
          "Complete beginners start with the wind, the kite's safety systems and basic kite control. You get time to understand each step before moving into the lagoon.",
        ],
      },
      {
        heading: "Get onto the board",
        body: [
          "Body dragging comes before board starts. From there, the session can move into getting up on the board and riding with control.",
        ],
      },
      {
        heading: "Already riding",
        body: [
          "Tell us what you are working on. A session can cover upwind riding, transitions or jumps when your level and the conditions allow it.",
        ],
      },
      {
        heading: "Sessions follow the conditions",
        body: [
          "Timing depends on safe wind and water conditions. Send your dates and riding level, and we will talk through what fits while you are in Boracay.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need kitesurfing experience?",
        answer:
          "No. Complete beginners start with the kite, its safety systems and control before moving into the lagoon.",
      },
      {
        question: "What can I work on if I already ride?",
        answer:
          "Tell us your level and what you want to improve. Depending on the conditions, a session can cover upwind riding, transitions or jumps.",
      },
      {
        question: "When will my session go ahead?",
        answer:
          "Session timing follows safe wind and water conditions. Message us with your dates so we can discuss the conditions during your stay.",
      },
    ],
  },
  rentals: {
    path: "/rentals-storage/",
    title: "Rent kite gear on Bulabog Beach",
    metaTitle: "Kite Rental & Storage in Boracay",
    description:
      "Rent kitesurfing equipment or store your own gear close to Bulabog Beach with Hangin Kite Center in Boracay.",
    eyebrow: "Rental and storage",
    lead: "Tell us your level, dates and usual sizes. We'll check what fits the forecast and what is available, so you can leave the board bag at home.",
    image: siteImages.gearArt,
    context: "rental-storage",
    contact: {
      heading: "Ask about rental, storage or both.",
      body: "Send your dates, riding level and usual sizes. Tell us whether you want to rent a setup, store your own gear or arrange both.",
    },
    schema: "service",
    sections: [
      {
        heading: "Rent a setup for your session",
        body: [
          "Full equipment rental is available. Share your riding level and usual sizes so we can check a setup against the current conditions.",
        ],
      },
      {
        heading: "Store your gear by the spot",
        body: [
          "If you bring your own equipment, Hangin offers storage by the kite spot. Ask about the current arrangement for your dates.",
        ],
      },
      {
        heading: "Tell us how you ride",
        body: [
          "Include your riding level, dates and usual kite and board sizes when you message. If you are bringing part of your own setup, tell us that too.",
        ],
      },
      {
        heading: "Check current gear and conditions",
        body: [
          "Gear availability and the useful setup change with the forecast. Check with us before you travel or before heading to the beach.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I rent a complete kite setup?",
        answer:
          "Yes. Hangin rents complete kite setups. Message us on WhatsApp with your dates, riding level and usual sizes so we can check the current gear.",
      },
      {
        question: "Can I store my own kite gear?",
        answer:
          "Yes. Hangin offers equipment storage by the kite spot. Ask about the current arrangement for your dates.",
      },
      {
        question: "What details should I send?",
        answer:
          "Send your dates, riding level and usual kite and board sizes. We use those details to check gear against the forecast and current availability.",
      },
    ],
  },
  safaris: {
    path: "/kite-safaris/",
    title: "Kite safaris from Boracay",
    metaTitle: "Kite Safaris from Boracay",
    description:
      "Ask Hangin Kite Center about guided kite safaris from Boracay, planned around rider level, wind and local water conditions.",
    eyebrow: "Kite trips",
    lead: "When the conditions line up, routes follow the wind, rider level and local water conditions. Ask us what is possible during your stay.",
    image: siteImages.safariArt,
    context: "safari",
    schema: "service",
    sections: [
      {
        heading: "Routes follow the wind",
        body: [
          "There is no fixed route to promise before the day. Wind, local water conditions and the riders in the group shape what is possible.",
        ],
      },
      {
        heading: "Who the trip suits",
        body: [
          "Tell us your riding level and the conditions you are comfortable in. We can then say whether a trip fits you and the conditions during your stay.",
        ],
      },
      {
        heading: "What to bring",
        body: [
          "Let us know what equipment you are travelling with when you ask about a safari. We will tell you what you need for the route being considered.",
        ],
      },
      {
        heading: "Ask before you plan around it",
        body: [
          "A kite safari depends on the wind and local water conditions. Message us with your dates and level before making it a fixed part of your Boracay plans.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a kite safari confirmed before my trip?",
        answer:
          "No fixed route is promised in advance. A safari depends on wind, rider level and local water conditions during your stay.",
      },
      {
        question: "How do I know if a safari suits my level?",
        answer:
          "Send your riding level and the conditions you are comfortable in. Hangin can then discuss what may fit you during your stay.",
      },
      {
        question: "What equipment should I bring?",
        answer:
          "Tell us what equipment you are travelling with. We will explain what you need for any route being considered.",
      },
    ],
  },
} as const satisfies Record<string, ServicePageContent>;
