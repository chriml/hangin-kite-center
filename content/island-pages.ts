import { siteImages } from "@/content/images";
import type { ServicePageContent } from "@/content/water-pages";

export const islandPages = {
  accommodation: {
    path: "/accommodation/",
    title: "Stay close to Boracay's kite beach",
    metaTitle: "Accommodation Near Bulabog Beach",
    description:
      "Ask about accommodation near Bulabog Beach and stay close to Hangin Kite Center and Boracay's main kitesurfing spot.",
    eyebrow: "Accommodation near Bulabog",
    lead: "Wake up, check the water and carry less. Ask us what is available for your dates near Bulabog Beach.",
    image: siteImages.stayArt,
    context: "stay",
    contact: {
      heading: "Ask what is available for your dates.",
      body: "Send your arrival and departure dates, the number of guests and any lesson or gear plans. We'll reply with the current accommodation details.",
    },
    schema: "service",
    sections: [
      {
        heading: "Stay near Bulabog Beach",
        body: [
          "Hangin offers accommodation near Boracay's kite beach. Ask us what is available for your dates before making plans around a room.",
        ],
      },
      {
        heading: "Add lessons or gear to your stay",
        body: [
          "If lessons, rental, storage or the shop are part of the trip, include them when you ask about a stay. Tell us what else you have planned on Boracay too.",
        ],
      },
      {
        heading: "Room details for your dates",
        body: [
          "Room type, rates and availability depend on your dates. Message us for the current details before you plan around a room.",
        ],
      },
      {
        heading: "Send dates, guest count and kite plans",
        body: [
          "Send your arrival and departure dates, the number of guests and whether you are booking lessons or bringing gear. We'll tell you what accommodation details are current for the trip.",
        ],
      },
    ],
    faq: [],
  },
  shop: {
    path: "/shop/",
    title: "Kite gear and beach essentials in Boracay",
    metaTitle: "Kite Shop in Boracay",
    description:
      "Check current kite gear, accessories and beach essentials at Hangin Kite Center on Bulabog Beach, Boracay.",
    eyebrow: "Hangin kite shop",
    lead: "For a spare part, replacement piece or something you left at home, ask what is on the rack today.",
    image: siteImages.gearArt,
    context: "shop",
    contact: {
      heading: "Ask what is on the rack today.",
      body: "Send the product name, size and model when you can. A photo also helps us check the shop before you cross the island.",
    },
    schema: "service",
    sections: [
      {
        heading: "Gear for the current season",
        body: [
          "Hangin has a kite shop on Bulabog Beach. Ask about the kite gear, accessories and beach essentials currently in stock.",
        ],
      },
      {
        heading: "The bits that save a session",
        body: [
          "A small missing part can end a session early. Tell us the exact part, brand and size you need so we can check the rack.",
        ],
      },
      {
        heading: "Stock changes",
        body: [
          "Stock changes through the season. Message us first if you need something specific, and we'll check what is in the shop that day.",
        ],
      },
      {
        heading: "Message before crossing the island",
        body: [
          "Send a photo or the full product name, size and model when you can. We can check before you come over to Bulabog Beach.",
        ],
      },
    ],
    faq: [],
  },
  boracay: {
    path: "/kitesurfing-boracay/",
    title: "Kitesurfing on Boracay",
    metaTitle: "Boracay Kitesurfing Spot Guide",
    description:
      "Plan a Boracay kitesurfing trip with practical information about Bulabog Beach, Amihan season, the lagoon and lessons.",
    eyebrow: "Bulabog Beach guide",
    lead: "Bulabog Beach is the wind-facing side of the island. Warm water, a shallow lagoon and the Amihan season make it the place Boracay riders come to kite.",
    image: siteImages.bulabog,
    context: "general",
    contact: {
      heading: "Check the conditions for your dates.",
      body: "Send your Boracay dates, riding level and what you want to arrange. We'll reply with the current conditions and the Hangin services that fit your trip.",
    },
    schema: "guide",
    sections: [
      {
        heading: "The kite side of Boracay",
        body: [
          "Bulabog Beach runs along Boracay's east side. The kite side of the island is where riders use the shallow lagoon during the Amihan season.",
        ],
      },
      {
        heading: "When to come",
        body: [
          "The Amihan kite season is roughly November to April. Wind changes from day to day, and there is no wind guarantee. Check current conditions with Hangin before making plans around a session.",
        ],
      },
      {
        heading: "Learning in the lagoon",
        body: [
          "Complete beginners start on the beach with the wind, safety systems and kite control. Lessons move into Bulabog's warm shallow lagoon when the conditions allow.",
        ],
      },
      {
        heading: "White Beach and the rest of the island",
        body: [
          "Bulabog Beach is where the kite plans happen. White Beach is on the other side of Boracay, so plan time for both sides of the island.",
        ],
      },
    ],
    faq: [
      {
        question: "When is the Boracay kite season?",
        answer:
          "The Amihan season is roughly November to April. These dates are a guide, so check current conditions with Hangin for your trip.",
      },
      {
        question: "Is Bulabog suitable for beginners?",
        answer:
          "Complete beginners start on the beach with kite safety systems and control. Teaching moves into Bulabog's shallow lagoon when the conditions allow.",
      },
      {
        question: "Is the wind guaranteed?",
        answer:
          "No. Wind changes, and visitors should check current conditions with the center before making plans around a session.",
      },
    ],
  },
  about: {
    path: "/about/",
    title: "On the beach since 2002",
    metaTitle: "About Hangin Kite Center",
    description:
      "Hangin Kite Center has taught kitesurfing on Bulabog Beach, Boracay, since 2002 and offers lessons, gear, storage, stays and safaris.",
    eyebrow: "Hangin Kite Center",
    lead: "Hangin started as a kite school on Bulabog Beach in 2002 and grew around the people who came to learn, ride, stay and return.",
    image: siteImages.riding,
    context: "general",
    contact: {
      heading: "Come by when you reach Bulabog.",
      body: "Find Hangin on Bulabog Beach, Boracay. Send your dates and riding level first if you want to arrange lessons, gear, storage, a stay or a kite safari.",
    },
    schema: "about",
    sections: [
      {
        heading: "Hangin began as a kite school",
        body: [
          "Hangin began as a kite school on Bulabog Beach in 2002. Today, Hangin teaches beginners, progressing riders and advanced kiters.",
        ],
      },
      {
        heading: "How we teach",
        body: [
          "Hangin teaches with IKO and VDWS instructors. Complete beginners start with wind, safety systems and kite control. Progressing and advanced riders can work on the next step when conditions allow.",
        ],
      },
      {
        heading: "Lessons, gear, storage, stays and trips",
        body: [
          "Hangin offers kitesurfing lessons from beginner through advanced, equipment rental, equipment storage, accommodation, a kite shop and kite safaris.",
        ],
      },
      {
        heading: "Come by when you reach Bulabog",
        body: [
          "Find Hangin on Bulabog Beach, Boracay. For lessons, gear, storage, a stay or a kite safari, send your dates and riding level so we can answer for the current conditions.",
        ],
      },
    ],
    faq: [],
  },
} as const satisfies Record<string, ServicePageContent>;
