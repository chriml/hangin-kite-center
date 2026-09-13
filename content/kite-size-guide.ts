export const kiteGuideSource = {
  title: "Airush kite size chart",
  href: "https://airush.com/blogs/news/what-kite-size-should-you-choose-based-on-the-wind",
  checkedAt: "2026-09-08",
} as const;

export const riderLevels = [
  { value: "beginner", label: "Beginner", detail: "Learning or not yet riding upwind independently" },
  { value: "intermediate", label: "Intermediate", detail: "Riding upwind and controlling your speed" },
  { value: "advanced", label: "Advanced", detail: "Confident rider planning a freeride trip" },
] as const;

export type RiderLevel = (typeof riderLevels)[number]["value"];
export type WeightUnit = "kg" | "lb";
export type KiteGuideInput = {
  weight: number;
  unit: WeightUnit;
  arrivalMonth: number;
  departureMonth: number;
  level: RiderLevel;
};

export const kiteSizeBands = [
  { maxKg: 70, label: "60–70 kg", light: "10–11", medium: "8–9", strong: "6–7" },
  { maxKg: 80, label: "Over 70–80 kg", light: "11–12", medium: "9–10", strong: "7–8" },
  { maxKg: 90, label: "Over 80–90 kg", light: "12–13", medium: "10–11", strong: "8–9" },
  { maxKg: 120, label: "Over 90–120 kg", light: "13–14", medium: "11–12", strong: "9–10" },
] as const;

const seasonNotes = {
  amihan: {
    id: "amihan", title: "Your trip falls in Amihan",
    body: "November to April is the main kite season at Bulabog. Wind varies from day to day, so check the forecast with Hangin before deciding what goes in the bag.",
  },
  habagat: {
    id: "habagat", title: "Your trip falls in Habagat",
    body: "Around June to October, southwest wind brings us to the other side of Boracay. Conditions are less consistent. Check the riding spot and forecast with Hangin before packing.",
  },
  transition: {
    id: "transition", title: "May sits between the seasons",
    body: "The monsoon change does not follow a fixed date. Ask Hangin about the wind direction and riding spot close to your trip.",
  },
  mixed: {
    id: "mixed", title: "Your trip spans different seasons",
    body: "Your dates cross Amihan, the May transition or Habagat. Wind direction and the riding spot may change during your stay. Check both ends of your trip with Hangin.",
  },
} as const;

type Season = (typeof seasonNotes)[keyof typeof seasonNotes];
export type KiteOption = { size: string; wind: string; label: string };
export type KiteSetup = { title: string; description: string; kites: KiteOption[] };
export type KiteGuideResult =
  | { status: "invalid"; message: string }
  | { status: "team-check"; message: string; season: Season; levelNote: string }
  | { status: "ready"; weightKg: number; weightBand: string; season: Season; levelNote: string; setups: KiteSetup[] };

const levelNotes: Record<RiderLevel, string> = {
  beginner: "Still learning? Let your instructor choose your lesson equipment. These packing ranges are for twin-tip riding after lessons, and do not mean stronger wind is suitable for you. Speak to Hangin before buying or bringing a kite.",
  intermediate: "These options assume you ride a twin-tip and can control your speed. Match the exact kite and board to the day's wind and gusts with the beach team.",
  advanced: "These are general freeride ranges on a twin-tip. Foiling, unhooked freestyle and big-air setups need a separate discussion. Experience alone is no reason to take a larger kite.",
};

function isMonth(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 12;
}

function tripSeason(arrivalMonth: number, departureMonth: number): Season {
  const monthCount = (departureMonth - arrivalMonth + 12) % 12;
  const seasons = new Set<"amihan" | "habagat" | "transition">();
  // An earlier departure month rolls into the next year; equal months mean one month.
  for (let offset = 0; offset <= monthCount; offset++) {
    const month = (arrivalMonth - 1 + offset) % 12;
    seasons.add(month === 4 ? "transition" : month >= 5 && month <= 9 ? "habagat" : "amihan");
  }
  return seasons.size === 1 ? seasonNotes[[...seasons][0]] : seasonNotes.mixed;
}

export function getKiteGuide(input: KiteGuideInput): KiteGuideResult {
  if (!Number.isFinite(input.weight) || input.weight <= 0 || !["kg", "lb"].includes(input.unit)
    || !riderLevels.some(level => level.value === input.level)
    || !isMonth(input.arrivalMonth) || !isMonth(input.departureMonth)) {
    return { status: "invalid", message: "Enter your weight and riding level, then choose your arrival and departure months." };
  }

  const weightKg = Math.round((input.unit === "lb" ? input.weight * 0.45359237 : input.weight) * 100) / 100;
  const season = tripSeason(input.arrivalMonth, input.departureMonth);
  const levelNote = levelNotes[input.level];
  if (weightKg < 60 || weightKg > 120) {
    return { status: "team-check", season, levelNote,
      message: "This guide covers adults from 60 to 120 kg (about 132 to 265 lb). Ask Hangin for sizes matched to your weight and board. We won't stretch the chart to guess your setup." };
  }
  const band = kiteSizeBands.find(band => weightKg <= band.maxKg)!;
  const light = { size: band.light, wind: "14–17", label: "Lighter wind reference" };
  const medium = { size: band.medium, wind: "18–22", label: "Medium wind reference" };
  const strong = { size: band.strong, wind: "23–28", label: "Stronger wind reference" };

  return {
    status: "ready", weightKg, weightBand: band.label, season, levelNote,
    setups: [
      { title: "One kite", description: "Less to carry. Start with the middle wind scenario and expect to sit out days that do not suit your kite.", kites: [medium] },
      { title: "Two kites", description: "A smaller and a larger kite. Check their actual wind-range overlap with Hangin; two sizes do not guarantee coverage between them.", kites: [strong, light] },
      { title: "Three kites", description: "A small, middle and larger size to compare against the forecast. More choice in the bag, with more gear to carry.", kites: [strong, medium, light] },
    ],
  };
}
