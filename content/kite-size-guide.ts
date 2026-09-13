export const kiteGuideSource = {
  title: "Airush kite size chart",
  href: "https://airush.com/blogs/news/what-kite-size-should-you-choose-based-on-the-wind",
  checkedAt: "2026-09-13",
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
  { maxKg: 70, label: "60–70 kg", veryLight: "12–14", light: "10–11", medium: "8–9", strong: "6–7" },
  { maxKg: 80, label: "Over 70–80 kg", veryLight: "13–15", light: "11–12", medium: "9–10", strong: "7–8" },
  { maxKg: 90, label: "Over 80–90 kg", veryLight: "14–17", light: "12–13", medium: "10–11", strong: "8–9" },
  { maxKg: 120, label: "Over 90–120 kg", veryLight: "15–17", light: "13–14", medium: "11–12", strong: "9–10" },
] as const;

export type WindMonth = {
  month: number;
  label: string;
  minKnots: number | null;
  maxKnots: number | null;
  note: string;
  estimated?: boolean;
  occasionalKnots?: number;
};

// Owner's rough seasonal account, 2026-09-13. These are not measured averages.
// December and March interpolate adjacent months, rounded outward to 5-knot bands.
export const hanginWindMonths: readonly WindMonth[] = [
  { month: 1, label: "January", minKnots: 20, maxKnots: 30, occasionalKnots: 35, note: "Stronger days or week-long spells; occasionally 35 knots." },
  { month: 2, label: "February", minKnots: 15, maxKnots: 20, note: "Wind starts to ease." },
  { month: 3, label: "March", minKnots: 10, maxKnots: 20, estimated: true, note: "Planning estimate as wind eases toward April." },
  { month: 4, label: "April", minKnots: 10, maxKnots: 15, note: "Lighter wind near the end of the season." },
  ...["May", "June", "July", "August", "September"].map((label, index) => ({
    month: index + 5, label, minKnots: null, maxKnots: null,
    note: "Wind is rare in the off-season and comes from the other side. Check with Hangin.",
  })),
  { month: 10, label: "October", minKnots: 10, maxKnots: 15, note: "The season may start in October or November." },
  { month: 11, label: "November", minKnots: 10, maxKnots: 15, note: "Early-season wind, building toward January." },
  { month: 12, label: "December", minKnots: 15, maxKnots: 25, estimated: true, note: "Planning estimate as wind builds toward January." },
];

export type TripWind = {
  months: readonly WindMonth[];
  minKnots: number | null;
  maxKnots: number | null;
  occasionalKnots: number | null;
  includesOffSeason: boolean;
};

function tripMonths(arrivalMonth: number, departureMonth: number): WindMonth[] {
  const count = (departureMonth - arrivalMonth + 12) % 12 + 1;
  return Array.from({ length: count }, (_, offset) => hanginWindMonths[(arrivalMonth - 1 + offset) % 12]);
}

function tripWind(months: readonly WindMonth[]): TripWind {
  const known = months.filter(month => month.minKnots !== null && month.maxKnots !== null);
  const occasional = months.flatMap(month => month.occasionalKnots === undefined ? [] : [month.occasionalKnots]);
  return {
    months,
    minKnots: known.length ? Math.min(...known.map(month => month.minKnots!)) : null,
    maxKnots: known.length ? Math.max(...known.map(month => month.maxKnots!)) : null,
    occasionalKnots: occasional.length ? Math.max(...occasional) : null,
    includesOffSeason: known.length !== months.length,
  };
}

const windScenarios = [
  { key: "veryLight", min: 10, max: 13, label: "Lightest wind reference" },
  { key: "light", min: 14, max: 17, label: "Lighter wind reference" },
  { key: "medium", min: 18, max: 22, label: "Medium wind reference" },
  { key: "strong", min: 23, max: 28, label: "Stronger wind reference" },
] as const;

const seasonNotes = {
  amihan: {
    id: "amihan", title: "Your trip falls in Amihan",
    body: "November to April is the main kite season at Bulabog. Wind varies from day to day, so check the forecast with Hangin before deciding what goes in the bag.",
  },
  habagat: {
    id: "habagat", title: "Your trip falls in Habagat",
    body: "In the off-season, wind is rare and comes from the other side of Boracay. Ask Hangin about the riding spot and current conditions before bringing gear.",
  },
  transition: {
    id: "transition", title: "Around the change of season",
    body: "May and October sit around the season changes. The season can start in October or November. Check the wind direction and riding spot close to your trip.",
  },
  mixed: {
    id: "mixed", title: "Your trip spans different seasons",
    body: "Your dates cross seasonal changes around Amihan and Habagat. Wind direction and the riding spot may change during your stay. Check both ends of your trip with Hangin.",
  },
} as const;

type Season = (typeof seasonNotes)[keyof typeof seasonNotes];
export type KiteOption = { size: string; wind: string; label: string };
export type KiteSetup = { title: string; description: string; kites: KiteOption[] };
export type KiteGuideResult =
  | { status: "invalid"; message: string }
  | { status: "team-check"; message: string; season: Season; wind: TripWind; levelNote: string }
  | { status: "ready"; weightKg: number; weightBand: string; season: Season; wind: TripWind; levelNote: string; setups: KiteSetup[] };

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
    seasons.add(month === 4 || month === 9 ? "transition" : month >= 5 && month <= 8 ? "habagat" : "amihan");
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
  const wind = tripWind(tripMonths(input.arrivalMonth, input.departureMonth));
  if (weightKg < 60 || weightKg > 120) {
    return { status: "team-check", season, wind, levelNote,
      message: "This guide covers adults from 60 to 120 kg (about 132 to 265 lb). Ask Hangin for sizes matched to your weight and board. We won't stretch the chart to guess your setup." };
  }
  if (wind.includesOffSeason || wind.minKnots === null || wind.maxKnots === null) {
    return { status: "team-check", season, wind, levelNote,
      message: "Your trip includes off-season months without a usable wind range. Ask Hangin about conditions and gear before choosing a packing setup." };
  }

  const band = kiteSizeBands.find(band => weightKg <= band.maxKg)!;
  const scenarios = windScenarios.filter(scenario => scenario.max >= wind.minKnots! && scenario.min <= wind.maxKnots!);
  const midpoint = Math.round((wind.minKnots + wind.maxKnots) / 2);
  const primary = scenarios.find(scenario => midpoint >= scenario.min && midpoint <= scenario.max) ?? scenarios[scenarios.length - 1];
  const option = (scenario: typeof windScenarios[number]): KiteOption => ({
    size: band[scenario.key], wind: `${scenario.min}–${scenario.max}`, label: scenario.label,
  });
  const outer = [scenarios[scenarios.length - 1], scenarios[0]];
  const middle = scenarios.slice(1, -1).find(scenario => scenario === primary) ?? scenarios[1];
  const three = scenarios.length >= 3 ? [outer[0], middle, outer[1]].map(option) : [];

  return {
    status: "ready", weightKg, weightBand: band.label, season, wind, levelNote,
    setups: [
      { title: "One kite", description: "A reference near the middle of your months' combined wind range. It will not suit every day; check the forecast before choosing your one kite.", kites: [option(primary)] },
      { title: "Two kites", description: "Compare the smaller and larger sizes for the chart bands that overlap your months. Ask Hangin to check the wind-range overlap for your exact models.", kites: outer.map(option) },
      { title: "Three kites", description: three.length
        ? "Add a middle size for more choice across your months' wind range. These options do not cover every possible wind strength."
        : "Only two chart bands overlap your months' rough wind range. A third kite needs a check with Hangin; no extra size is suggested here.", kites: three },
    ],
  };
}
