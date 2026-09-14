import type { PublicRoute } from "@/content/site";

type GuideEntry = {
  id: string;
  heading: string;
  location?: string;
  body: readonly string[];
  link?: { href: PublicRoute; label: string };
};

export const guideSources = {
  activities: { label: "Philippine Department of Tourism", href: "https://www.tourism.gov.ph/destination/western-visayas/boracay/" },
  whiteBeach: { label: "DOT Boracay island guide", href: "https://www.tourismphilippines.com.au/where/boracay" },
  beaches: { label: "Travel Philippines beach guide", href: "https://app.philippines.travel/articles/discover-diniwid-and-boracay-s-quiet-getaways" },
  transport: { label: "Shangri-La Boracay transport guide", href: "https://www.shangri-la.com/boracay/boracayresort/about/local-guide/explore-boracay/transportation/" },
} as const;

export const boracayPlaces: readonly GuideEntry[] = [
  {
    id: "bulabog-beach",
    heading: "Bulabog Beach",
    location: "East coast · The kite beach",
    body: [
      "This is where you'll find Hangin. During Amihan, Bulabog is the place to spend time around the kite and windsurf scene, watch a session or start lessons yourself.",
      "If you're watching from the beach, keep clear of laid-out lines and leave the launch space open. For wind, tides and riding conditions, use our spot guide before heading out.",
    ],
    link: { href: "/kitesurfing-boracay/", label: "Read the Bulabog spot guide" },
  },
  {
    id: "white-beach",
    heading: "White Beach",
    location: "West coast · Beach walks and sunset",
    body: [
      "Head to White Beach for a walk along the sand and a west-facing sunset. Stations 1, 2 and 3 are useful landmarks along the same stretch of beach, so choose a meeting point before your group splits up.",
      "Willy's Rock is near Station 1. Around Station 2, you can combine the beach with D'Mall, then find somewhere to eat. Leave the evening loose if you're coming straight from a kite session.",
    ],
  },
  {
    id: "d-mall",
    heading: "D'Mall and dinner around Station 2",
    location: "Central White Beach · Food and shops",
    body: [
      "D'Mall is an open-air shopping area at Station 2 with places to eat, beachwear and souvenirs. It's a useful stop when one person wants food and another needs a few things for the beach.",
      "Walk around and check the menus before sitting down. For a particular restaurant, dietary need or late dinner, check directly with the venue; opening hours and menus can change.",
    ],
  },
  {
    id: "diniwid-beach",
    heading: "Diniwid Beach",
    location: "Beyond Station 1 · A smaller beach stop",
    body: [
      "Diniwid sits beyond the northern end of White Beach. Make it a separate beach stop if you feel like going farther than the main stations.",
      "You can reach it by tricycle through the back road. Check local access before setting off on the coastal footpath, especially if you need a step-free route or are travelling with children.",
    ],
  },
  {
    id: "puka-beach",
    heading: "Puka Beach",
    location: "North of the island · A change of shore",
    body: [
      "Puka Beach takes its name from the shells in its coarser sand. Go for a beach walk and a look at another part of Boracay; don't expect the same powdery sand as White Beach.",
      "A tricycle gets you there by road. Sort out the return ride and bring water and sun protection. Check the sea when you arrive and ask locally before swimming; a beach visit doesn't have to mean getting in.",
    ],
  },
];

export const boracayActivities: readonly GuideEntry[] = [
  {
    id: "learn-to-kite",
    heading: "Try kitesurfing with Hangin",
    body: [
      "You can start as a complete beginner. Lessons begin with wind, safety systems and kite control, then move towards the water as your skills and the conditions allow. Tell us your dates before building the rest of the day around a lesson.",
    ],
    link: { href: "/kitesurfing-lessons/", label: "View kitesurfing lessons" },
  },
  {
    id: "sunset-sailing",
    heading: "Go for a sunset sail",
    body: [
      "Paraw sailing is one way to see Boracay from the water around sunset. If you've spent the day riding, it gives your legs a break while you're still out on the sea.",
      "Ask a sailing operator about the departure beach, weather, lifejackets, trip length and what's included before agreeing to a trip. Sailing depends on suitable conditions.",
    ],
  },
  {
    id: "snorkeling",
    heading: "Snorkeling and island hopping",
    body: [
      "Boat tours around Boracay can include nearby islands, coves and snorkeling stops. Ask the operator which stops are possible that day, how much time is spent in the water and whether equipment is included.",
      "Tell the crew about your swimming experience and anyone in the group who plans to stay aboard. A day with no kite wind can still have unsuitable sea conditions for a boat trip.",
    ],
  },
];

export const boracayPlanning: readonly GuideEntry[] = [
  {
    id: "day-off",
    heading: "A day between kite sessions",
    body: [
      "One easy plan is Diniwid or Puka earlier in the day, then White Beach and dinner around Station 2. Pick one northern beach if you want less time moving around. Treat this as a loose plan and check the forecast before committing to time away from Bulabog.",
      "If your group mixes kiters and non-kiters, agree a place on White Beach to meet later. Keep the lesson or riding plan flexible, and let everyone choose how much beach time they want.",
    ],
  },
  {
    id: "getting-around",
    heading: "Getting around Boracay",
    body: [
      "Walk between the White Beach stations when that suits your group. Tricycles are an option for places farther away, including Diniwid and Puka. Confirm the destination, fare and whether you're sharing the ride before getting in.",
      "Travelling with a board bag changes the plan. Check that your transport can carry it, and save your accommodation's location before arriving. Staying near Bulabog can make Amihan kite days easier.",
    ],
    link: { href: "/accommodation/", label: "Ask about staying near the kite beach" },
  },
  {
    id: "arrival",
    heading: "Arriving with a board bag",
    body: [
      "Caticlan is the closer airport. Kalibo adds a longer road transfer before the boat to Boracay. Check sports-baggage rules on every flight and leave room in your plans for the transfers.",
      "If you'd like to leave your gear at home, ask us about rental for your dates and riding level. We also offer storage if you're bringing your own setup.",
    ],
    link: { href: "/rentals-storage/", label: "View rental and storage options" },
  },
];

export const boracayQuestions = [
  { question: "What can I do in Boracay if I don't kitesurf?", answer: "Walk White Beach, browse D'Mall, visit Diniwid or Puka, or ask a local operator about sailing and snorkeling. You can meet your riding friends later without spending the whole day at Bulabog." },
  { question: "Where should I go for sunset?", answer: "White Beach faces west and is a straightforward place to start. You can stay on the sand or check whether a paraw sailing trip is running. Clouds and weather decide the view." },
  { question: "Does Hangin arrange the activities in this guide?", answer: "Contact Hangin for kitesurfing lessons, rental, storage, accommodation and kite safaris. For paraw sailing, snorkeling and island-hopping tours, check the details directly with the operator offering the trip." },
] as const;


export const boracayGuideParent = { label: "Boracay", href: "/kitesurfing-boracay/" } as const;

type BoracaySubpage = {
  slug: string;
  label: string;
  path: PublicRoute;
  title: string;
  description: string;
  lead: string;
  sectionId: string;
  entries: readonly GuideEntry[];
  sources: readonly { label: string; href: string }[];
  questions: readonly { question: string; answer: string }[];
};

export const boracaySubpages = {
  places: {
    slug: "places-to-be",
    label: "Places to be",
    path: "/kitesurfing-boracay/places-to-be/",
    title: "Places to be in Boracay",
    description: "Explore Bulabog, White Beach, D'Mall, Diniwid and Puka Beach, with practical tips for beach visits and time away from your kite sessions.",
    lead: "Start with the two sides of the island: Bulabog for the kite scene, White Beach for a walk and sunset. Diniwid and Puka give you a reason to head farther north.",
    sectionId: "places",
    entries: boracayPlaces,
    sources: [guideSources.whiteBeach, guideSources.beaches],
    questions: [],
  },
  activities: {
    slug: "things-to-do",
    label: "Things to do",
    path: "/kitesurfing-boracay/things-to-do/",
    title: "Things to do in Boracay",
    description: "Try kitesurfing with Hangin or plan sunset sailing, snorkeling and island hopping in Boracay. Find out what to check with local operators before a trip.",
    lead: "Make time for a lesson, a sail or a snorkeling trip. Hangin handles the kite sessions; check sailing and boat trips with the operators running them.",
    sectionId: "activities",
    entries: boracayActivities,
    sources: [guideSources.activities],
    questions: [],
  },
  planning: {
    slug: "planning-your-days",
    label: "Planning your days",
    path: "/kitesurfing-boracay/planning-your-days/",
    title: "Planning your days in Boracay",
    description: "Plan days between kite sessions, getting around Boracay and arriving with a board bag. Practical pointers for beach visits, transport and your gear.",
    lead: "Arrange your kite days with the team, then fit the rest around them. Leave room to change your plans when the wind turns up.",
    sectionId: "planning",
    entries: boracayPlanning,
    sources: [guideSources.transport, guideSources.whiteBeach],
    questions: [],
  },
  questions: {
    slug: "practical-questions",
    label: "Practical questions",
    path: "/kitesurfing-boracay/practical-questions/",
    title: "Practical questions about Boracay",
    description: "Find answers about visiting Boracay without kitesurfing, where to go for sunset and which activities to arrange with Hangin or local operators.",
    lead: "Before you head out, check where to go and who to contact for the activities you have in mind.",
    sectionId: "questions",
    entries: [],
    sources: [guideSources.whiteBeach, guideSources.beaches],
    questions: boracayQuestions,
  },
} as const satisfies Record<string, BoracaySubpage>;

export type { BoracaySubpage };
