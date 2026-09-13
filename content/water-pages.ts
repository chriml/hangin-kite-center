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
  contact?: { eyebrow?: string; heading: string; body: string };
  schema: "service" | "guide" | "about" | "page";
  sections: readonly {
    id?: string;
    heading: string;
    image?: SiteImage;
    link?: { label: string; href: PublicRoute };
    contact?: { label: string; context: ContactContext };
    pricing?:
      | { kind: "course"; price: number; privateHours: number; groupHours: number }
      | { kind: "private"; packages: readonly { hours: number; price: number }[] };
    body: readonly string[];
  }[];
  safety?: { heading: string; body: readonly string[]; contactContext?: ContactContext };
  faq: readonly { question: string; answer: string }[];
};

export const lessonCourses = [
  {
    id: "introductory-course",
    image: siteImages.controlBar,
    heading: "Introductory course",
    suitability: "For beginners who want to try kite control before choosing a longer course.",
    price: 6000,
    privateHours: 1.5,
    groupHours: 2,
    description: "Get a feel for kitesurfing before taking a longer course. Start with basic kite control and the safety system, and practise controlling the kite safely.",
  },
  {
    id: "basic-kite-course",
    image: siteImages.kiteSetup,
    heading: "Basic kite course",
    suitability: "For beginners ready to learn kite setup, safety and their first body drags.",
    price: 12000,
    privateHours: 3,
    groupHours: 4,
    description: "Learn to set up a kite, use its safety system, control it and relaunch it from the water. Then work on your first downwind body drags.",
  },
  {
    id: "kite-control-course",
    image: siteImages.kiteControlRider,
    heading: "Kite control course",
    suitability: "For students continuing from the basic kite course towards their first waterstarts.",
    price: 12000,
    privateHours: 3,
    groupHours: 4,
    description: "Continue from the basic kite course with downwind and upwind body dragging, launching and landing, self-rescue and board recovery. Get to know the board and work towards your first waterstarts and short rides.",
  },
  {
    id: "board-riding-course",
    image: siteImages.boardPractice,
    heading: "Board riding course",
    suitability: "For students continuing from kite control to practise waterstarts and riding.",
    price: 12000,
    privateHours: 3,
    groupHours: 4,
    description: "Continue from the kite control course. Practise waterstarts, riding downwind and working your way upwind, with the session matched to your control of the kite and board.",
  },
  {
    id: "full-course",
    image: siteImages.lagoonRider,
    heading: "Full course",
    suitability: "For beginners who want the basic kite, kite control and board riding stages in one course.",
    price: 36000,
    privateHours: 9,
    groupHours: 12,
    description: "Work through the basic kite, kite control and board riding courses. Build the kite and board skills you need to work towards independent riding. Progress depends on your starting point and the conditions; finishing the hours does not guarantee independent riding.",
  },
] as const;

export const advancedLessonPackages = [
  { hours: 1, price: 4400 },
  { hours: 2, price: 8500 },
  { hours: 4, price: 16000 },
] as const;

export function lessonPrice(price: number) {
  return `PHP ${price.toLocaleString("en-PH")}`;
}

export const waterPages = {
  lessons: {
    path: "/kitesurfing-lessons/",
    title: "Learn to kitesurf in Boracay",
    metaTitle: "Kitesurfing Lessons in Boracay",
    description:
      "Kitesurfing lessons on Bulabog Beach, Boracay, with IKO and VDWS instructors for complete beginners, progressing riders and advanced kiters.",
    eyebrow: "Lessons on Bulabog Beach",
    lead: "Start on the beach, then move into Bulabog's warm shallow lagoon. We teach the part you need next and keep the session matched to the conditions.",
    image: siteImages.lessonPair,
    context: "lessons",
    schema: "service",
    sections: [
      ...lessonCourses.map(({ id, heading, image, price, privateHours, groupHours, description }) => ({
        id,
        heading,
        image,
        pricing: { kind: "course" as const, price, privateHours, groupHours },
        body: [description],
      })),
      {
        id: "advanced-private-coaching",
        image: siteImages.kiteJump,
        heading: "Advanced private coaching",
        pricing: { kind: "private", packages: advancedLessonPackages },
        body: [
          "Your instructor plans the lesson around your level and what you want to work on. Focus on upwind riding, freeride turns and riding toeside, or freestyle skills such as basic jumps, transition jumps, grabs, rotations, unhooking and loops.",
          "Strapless surfboard coaching covers your first rides, turns and jumps. Your instructor chooses exercises that fit your experience and the conditions.",
        ],
      },
      {
        heading: "Sessions follow the conditions",
        body: [
          "Timing depends on safe wind and water conditions. Send your dates and riding level, and we will talk through what fits while you are in Boracay.",
        ],
      },
    ],
    safety: {
      heading: "Before your lesson",
      body: [
        "Kitesurfing involves powered equipment, changing wind and water, falls and collisions. These can cause serious injury. Ask about the conditions, session plan and safety briefing before going on the water.",
        "For a rider under 18, a parent or legal guardian should contact Hangin before arrangements are made. Ask for the participation and intake instructions before sharing health information. Keep health details out of the first WhatsApp message.",
      ],
    },
    faq: [
      {
        question: "How much are kitesurfing lessons at Hangin in Boracay?",
        answer:
          `The introductory course is ${lessonPrice(lessonCourses[0].price)} per person. The full course is ${lessonPrice(lessonCourses[4].price)} per person. These beginner course prices include lesson equipment, applicable taxes and mandatory fees. Private and group courses have the same price per person, with different teaching hours shown above.`,
      },
      {
        question: "Do I need kitesurfing experience?",
        answer:
          "No. Complete beginners start with the kite, its safety systems and control before moving into the lagoon.",
      },
      {
        question: "Is equipment included in the lesson price?",
        answer:
          "Beginner courses include all equipment needed for the lesson. Prices include applicable taxes and mandatory fees. For advanced private coaching, ask us which equipment is included before arranging your session.",
      },
      {
        question: "How many students are in a group lesson?",
        answer:
          "Group lessons have a maximum of two students per instructor, sharing one kite. The listed group hours are the length of the session, with students taking turns on the kite.",
      },
      {
        question: "What can I work on if I already ride?",
        answer:
          "Advanced private coaching can cover upwind riding, freeride, freestyle or strapless surfboard riding. Tell us your level and what you want to improve so your instructor can plan the session.",
      },
      {
        question: "How many days should I allow for a full course?",
        answer:
          `The full course includes ${lessonCourses[4].privateHours} hours of private teaching or ${lessonCourses[4].groupHours} hours of group sessions. These are teaching hours, not a fixed number of days. Wind, water conditions and your progress affect the schedule. Send your Boracay dates before planning around lesson days; finishing the course hours does not guarantee independent riding.`,
      },
      {
        question: "Can I take lessons during Habagat?",
        answer:
          "Hangin moves sessions to the other side of Boracay during Habagat, roughly June to October. The meeting point and whether a lesson can go ahead depend on the conditions. Contact us with your dates before heading to the beach. Amihan, roughly November to April, is the main kite season at Bulabog.",
      },
      {
        question: "When will my session go ahead?",
        answer:
          "Reception and your instructor check the wind and water conditions. We normally confirm lesson times two days in advance. Course hours are teaching time, not a fixed number of days. Send your travel dates so we can discuss how the sessions fit your stay.",
      },
      {
        question: "What happens if there is no wind or a lesson has to stop?",
        answer:
          "If wind or water conditions prevent us from teaching, you can choose to reschedule or receive a refund for the teaching we could not deliver. Your instructor can stop a lesson if conditions become unsafe.",
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
    image: siteImages.rentalBoards,
    context: "rental-storage",
    contact: {
      heading: "Ask about rental, storage or both.",
      body: "Send your dates, riding level and usual sizes. Tell us whether you want to rent a setup, store your own gear or arrange both.",
    },
    schema: "service",
    sections: [
      {
        heading: "Rent a setup for your session",
        contact: { label: "Book rental via WhatsApp", context: "rental" },
        image: siteImages.kiteSetup,
        body: [
          "Full equipment rental is available. Share your riding level and usual sizes so we can check a setup against the current conditions.",
        ],
      },
      {
        heading: "Store your gear by the spot",
        contact: { label: "Book storage via WhatsApp", context: "storage" },
        image: siteImages.shopBoards,
        body: [
          "If you bring your own equipment, Hangin offers storage by the kite spot. Ask about the current arrangement for your dates.",
        ],
      },
      {
        heading: "Tell us how you ride",
        contact: { label: "Plan your setup via WhatsApp", context: "rental-storage" },
        image: siteImages.boardPractice,
        body: [
          "Include your riding level, dates and usual kite and board sizes when you message. If you are bringing part of your own setup, tell us that too.",
        ],
      },
      {
        heading: "Check current gear and conditions",
        contact: { label: "Check availability via WhatsApp", context: "rental" },
        image: siteImages.kiteBay,
        body: [
          "Gear availability and the useful setup change with the forecast. Check with us before you travel or before heading to the beach.",
        ],
      },
    ],
    safety: {
      heading: "Before renting gear",
      contactContext: "rental",
      body: [
        "Ask Hangin about rider requirements, the equipment, its condition and where it can be used before renting. Stop using damaged equipment and contact Hangin.",
        "For a rider under 18, a parent or legal guardian should contact Hangin before arrangements are made. Ask for the participation and intake instructions before sharing health information. Keep health details out of the first WhatsApp message.",
      ],
    },
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
      "Plan a kite safari with Hangin in Boracay. Talk through your riding level, gear and dates, then ask about routes, conditions and current trip details.",
    eyebrow: "Kite trips with Hangin",
    lead: "Fancy a kite trip during your Boracay stay? Tell us when you're here and how you ride. We'll talk through what could work for you when the wind and water conditions line up.",
    image: siteImages.safariArt,
    context: "safari",
    contact: {
      heading: "Ask about your safari dates.",
      body: "Send your dates, riding level, group size and the gear you're bringing. Ask us about the route, cost and what's included before making plans around the trip.",
    },
    schema: "service",
    sections: [],
    safety: {
      heading: "Before a kite safari",
      body: [
        "A kite trip can take you into unfamiliar conditions and farther from the launch. Ask about the route, rider level, communication and return plan before agreeing to join.",
        "For a rider under 18, a parent or legal guardian should contact Hangin before arrangements are made. Ask for the participation and intake instructions before sharing health information. Keep health details out of the first WhatsApp message.",
      ],
    },
    faq: [
      {
        question: "Can I choose a destination in advance?",
        answer:
          "Tell us where you'd like to ride. Hangin can discuss what may work, but the route depends on wind, local water conditions and rider level. Check with the team before arranging the rest of your plans around it.",
      },
      {
        question: "Can I join if I'm still learning?",
        answer:
          "Tell us what you can do comfortably and what you're still learning. The team needs to discuss your level and the conditions before saying whether a safari is suitable. You can also ask about lessons on Bulabog Beach.",
      },
      {
        question: "How much does a kite safari cost?",
        answer:
          "Ask Hangin for the current cost and inclusions for the trip being discussed. Confirm equipment, transport and any other arrangements with the team before agreeing to the trip.",
      },
      {
        question: "What if the wind changes?",
        answer:
          "A safari depends on wind and local water conditions. Ask the team when to check in and what would happen if conditions change, including any rescheduling or cancellation terms.",
      },
    ],
  },
} as const satisfies Record<string, ServicePageContent>;
