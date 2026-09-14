import { siteImages } from "@/content/images";
import { siteConfig } from "@/content/site";
import type { ServicePageContent } from "@/content/water-pages";

export const aboutGearPartners = {
  heading: "Our gear partners",
  body: "Duotone and ION are our gear partners on Bulabog Beach. Ask us about equipment for lessons, rental or your own setup.",
} as const;

export const teachingOrganizations = [
  { name: "IKO", href: "https://www.ikointl.com/", logo: "/brand/teaching/iko.svg", width: 2667, height: 800 },
  { name: "VDWS", href: "https://www.vdws.de/en/", logo: "/brand/teaching/vdws.svg", width: 934, height: 375 },
] as const;

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
    image: siteImages.shopBoards,
    context: "shop",
    contact: {
      heading: "Ask what is on the rack today.",
      body: "Send the product name, size and model when you can. A photo also helps us check the shop before you cross the island.",
    },
    schema: "page",
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
      "Coming to kite in Boracay? Get to know Bulabog Beach, the Amihan wind, tides, reef, launch spots and what to pack before your first session.",
    eyebrow: "Bulabog Beach guide",
    lead: "Bulabog is our home spot on Boracay's east coast. Warm water, a reef-sheltered lagoon and northeast wind through Amihan. Check the tide before you rig; it changes the session here.",
    image: siteImages.kiteBay,
    context: "general",
    contact: {
      heading: "Coming over for a kite?",
      body: "Send us your dates, riding level and whether you're bringing gear. We can talk through the season, rental or storage, and where we're riding when you arrive.",
    },
    schema: "guide",
    sections: [
      {
        heading: "Amihan is the main season",
        image: siteImages.boardPractice,
        body: [
          "Aim for roughly November to April for Bulabog. That's Amihan, when the northeast wind blows towards the beach at an angle, usually side-onshore. The season can start early or finish late, and you still get days off the water.",
          "Check the forecast as your trip gets closer, then check the beach on the day. A season chart won't tell you what to rig for your next session.",
        ],
      },
      {
        heading: "Flat patches, chop and reef",
        body: [
          "The reef shelters Bulabog's lagoon from the open-water swell. Inside, you'll find flatter patches and chop, depending on the wind and tide. Water depth changes across the bay, so don't expect it to be waist-deep everywhere.",
          "Waves break on the outer reef. That's a different session from riding inside the lagoon, with reef hazards and less shelter. Get local advice before heading out there.",
        ],
      },
      {
        heading: "Keep an eye on the tide",
        body: [
          "At low tide, parts of the lagoon get too shallow to ride and the reef can be exposed. There are sea urchins too. Ask about the bottom and the way in before walking out; booties don't make the reef safe to walk on.",
          "High tide brings more water but takes away beach space. Some stretches get tight for rigging, launching and landing. Check where there's room before laying out your lines, and leave space to come back in.",
        ],
      },
      {
        heading: "Share the lagoon",
        body: [
          "Bulabog gets busy when the wind is on. You're sharing the water with lessons, other kiters and windsurfers. Give learners room, keep the launch clear and check your space downwind before a jump or a turn.",
          "New to the spot? Come by before your first session and ask where to rig, launch and ride that day. If you can't hold your ground upwind yet, say so when arranging a lesson.",
        ],
      },
      {
        id: "learn-at-hangin",
        heading: "First waterstarts or your next trick",
        image: siteImages.lessonPair,
        link: { label: "Explore the lessons", href: "/kitesurfing-lessons/" },
        body: [
          "The shallow parts of the lagoon help with body dragging and waterstarts when there's enough water and space. If you're starting from scratch, lessons begin with the wind, safety systems and kite control before you get on a board.",
          "Already riding? Tell us what you're working on, whether that's staying upwind, cleaner transitions or jumps. We'll match a lesson to your level and the conditions.",
        ],
      },
      {
        heading: "Habagat takes us to the other side",
        body: [
          "Around June to October, the southwest monsoon turns the wind towards White Beach. Habagat tends to bring more rain and less consistent wind than Amihan.",
          "We move our sessions to the other side of Boracay during Habagat. Message us about where to meet and what's working for your level.",
        ],
      },
      {
        heading: "Packing the board bag",
        image: siteImages.controlBar,
        link: { label: "See rental and storage options", href: "/rentals-storage/" },
        body: [
          "Bring sun protection and a rash vest for long sessions. If you get cold easily, pack a thin layer for the water too. Ask us about footwear for the spot before you travel.",
          "Kite sizes depend on your weight, board, riding style and the forecast. Send us those details and what you already ride. If you'd rather travel light, ask about rental; if you're bringing your own setup, ask about storage.",
        ],
      },
      {
        heading: "Getting here with your gear",
        body: [
          "Caticlan is the closer airport to Boracay. Kalibo means a longer road transfer before the boat across. Check your airline's current sports-baggage allowance for every leg before booking a flight with a board bag.",
          "During Amihan, staying near Bulabog keeps you close to the kite beach. White Beach is on the west side of the island for food, a walk and sunset after your session. Check the actual location of your stay so you know how far you'll be carrying your gear.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I kite here during Habagat?",
        answer:
          "We move to the other side of Boracay during Habagat, roughly June to October. The wind is less consistent, so message us about your dates and where to meet.",
      },
      {
        question: "Is low tide the best time to ride?",
        answer:
          "It depends how low. Parts of the lagoon can be too shallow, while high tide can leave little beach for launching. Check the tide, water depth and launch space with the team before rigging.",
      },
      {
        question: "What size kite should I bring?",
        answer:
          "Send your dates, weight, board and usual kite sizes. We'll talk through what you're bringing against the forecast closer to your trip.",
      },
    ],
  },
  about: {
    path: "/about/",
    title: "On the beach since 2001",
    metaTitle: "About Hangin on Bulabog Beach",
    description:
      "Hangin Kite Center has taught kitesurfing on Bulabog Beach, Boracay, since 2001 and offers lessons, gear, storage, stays and safaris.",
    eyebrow: "Hangin Kite Center",
    lead: "Come down to Bulabog and meet the people behind Hangin. We've been teaching here since 2001, helping first-time kiters and experienced riders find their next step on the water.",
    image: { ...siteImages.hanginCenter, caption: "Outside the center." },
    context: "general",
    contact: {
      eyebrow: "Contact",
      heading: "Tell us about your stay.",
      body: "Send your Boracay dates, riding level and what you need, such as lessons, rental, storage, accommodation, shop gear or a kite safari. We'll reply within one day with the current details.",
    },
    schema: "about",
    sections: [
      {
        heading: "Hangin began as a kite school",
        body: [
          "Hangin began as a kite school on Bulabog Beach in 2001. Teaching is still at the heart of what we do, whether you're holding a kite for the first time, finding your feet on the board or working on a move you've been chasing for a while.",
          "For us, a good session starts with listening. Tell us where you're at and what you'd like to learn. We work from there, with patient instruction and a plan that fits your level and the conditions. Some days that means taking the next step; on others, it means giving the basics more time.",
          "Respect for the beach and the people sharing it matters just as much. Bulabog is a working kite spot, with learners, independent riders and windsurfers using the same lagoon. Looking at the tide, leaving room for others and knowing when to wait are all part of learning to ride here.",
          `We're an ${siteConfig.centerDesignation}, with Duotone and ION as our gear partners. That connection is part of life at Hangin, from talking through lesson equipment to helping you ask the right questions about rental gear or your own setup. Tell us what you ride and what you need, and we'll discuss the options with you.`,
          "You can come to us for the parts around the session too: somewhere to store your gear, a stay near the kite beach or a kite trip to ask about. Bring your questions, even if you're still figuring out what your Boracay days might look like. We'll help you make a plan.",
        ],
      },
      {
        heading: "How we teach",
        id: "how-we-teach",
        body: [
          "Hangin teaches with IKO and VDWS instructors. Complete beginners start with wind, safety systems and kite control. Progressing and advanced riders can work on the next step when conditions allow.",
        ],
      },
      {
        heading: "Lessons, gear, storage, stays and trips",
        contact: { label: "Message Hangin on WhatsApp", context: "general" },
        body: [
          "Hangin offers kitesurfing lessons from beginner through advanced, equipment rental, equipment storage, accommodation, a kite shop and kite safaris.",
        ],
      },
    ],
    faq: [],
  },
} as const satisfies Record<string, ServicePageContent>;
