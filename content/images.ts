export const brandImages = {
  wordmark: {
    src: "/brand/hangin-wordmark.svg",
    width: 1299,
    height: 358,
    alt: "Hangin",
  },
  logo: {
    src: "/brand/hangin-logo.svg",
    width: 1299,
    height: 528,
    alt: "Hangin Kite Center & Resort, Boracay",
  },
  logoLight: {
    src: "/brand/hangin-logo-light.svg",
    width: 1299,
    height: 528,
    alt: "Hangin Kite Center & Resort, Boracay",
  },
} as const;

type SiteImageBase = {
  src: string;
  width: number;
  height: number;
  mobileSrc: string;
  mobileWidth: number;
  mobileHeight: number;
  alt: string;
};

export type SiteImage = SiteImageBase & (
  | {
      kind: "proof";
      credit: string;
      sourceUrl: string;
      license: string;
      licenseUrl: string;
    }
  | {
      kind: "provided";
      sourceFile: string;
      caption: string;
    }
  | {
      kind: "generated";
      credit?: never;
      sourceUrl?: never;
      license?: never;
      licenseUrl?: never;
    }
);

export const siteImages = {
  kiteBay: {
    src: "/images/owner/colorful-kites-above-bay-and-green-hillside.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/owner/colorful-kites-above-bay-and-green-hillside-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "Colorful kites and riders across the bay beside a green hillside in Boracay",
    kind: "provided",
    sourceFile: "colorful-kites-above-bay-and-green-hillside-quality-8of10.jpg",
    caption: "Kites and riders across the Boracay lagoon.",
  },

  shopFront: {
    src: "/images/owner/hangin-kite-center-storefront-beside-beach-access-road.webp",
    width: 1800,
    height: 1013,
    mobileSrc: "/images/owner/hangin-kite-center-storefront-beside-beach-access-road-900.webp",
    mobileWidth: 900,
    mobileHeight: 507,
    alt: "Hangin Kite Center storefront with clothing racks beside the palm-lined beach access road",
    kind: "provided",
    sourceFile: "hangin-kite-center-storefront-beside-beach-access-road-quality-7of10.jpg",
    caption: "The Hangin storefront beside the beach access road.",
  },

  lagoonRider: {
    src: "/images/owner/smiling-red-helmet-kitesurfer-riding-shallow-water.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/owner/smiling-red-helmet-kitesurfer-riding-shallow-water-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "A smiling rider in a red helmet kitesurfing through shallow water",
    kind: "provided",
    sourceFile: "smiling-red-helmet-kitesurfer-riding-shallow-water-quality-9of10.jpg",
    caption: "Kitesurfing in Boracay.",
  },
  kiteControlRider: {
    src: "/images/owner/orange-shirted-kiteboarder-carving-with-one-hand-raised.webp",
    width: 1800,
    height: 1350,
    mobileSrc: "/images/owner/orange-shirted-kiteboarder-carving-with-one-hand-raised-900.webp",
    mobileWidth: 900,
    mobileHeight: 675,
    alt: "A smiling kiteboarder in an orange top holding the control bar while riding through spray",
    kind: "provided",
    sourceFile: "orange-shirted-kiteboarder-carving-with-one-hand-raised-quality-9of10.jpg",
    caption: "Kiteboarding in shallow water.",
  },
  kiteHandling: {
    src: "/images/owner/helmeted-woman-holding-control-bar-on-beach.webp",
    width: 1800,
    height: 1350,
    mobileSrc: "/images/owner/helmeted-woman-holding-control-bar-on-beach-900.webp",
    mobileWidth: 900,
    mobileHeight: 675,
    alt: "A helmeted learner holding a kite control bar beside another person on the beach",
    kind: "provided",
    sourceFile: "helmeted-woman-holding-control-bar-on-beach-quality-7of10.jpg",
    caption: "Kite control practice on the beach.",
  },
  lessonPair: {
    src: "/images/owner/two-smiling-people-with-kite-control-bar-in-shallows.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/owner/two-smiling-people-with-kite-control-bar-in-shallows-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "Two smiling people holding a kite control bar in the shallows",
    kind: "provided",
    sourceFile: "two-smiling-people-with-kite-control-bar-in-shallows-quality-9of10.jpg",
    caption: "A moment in the shallows with the kite control bar.",
  },
  hanginCenter: {
    src: "/images/owner/group-portrait-outside-hangin-kite-center.webp",
    width: 1800,
    height: 873,
    mobileSrc: "/images/owner/group-portrait-outside-hangin-kite-center-900.webp",
    mobileWidth: 900,
    mobileHeight: 437,
    alt: "Seven people outside Hangin Kite Center beneath the shop sign",
    kind: "provided",
    sourceFile: "group-portrait-outside-hangin-kite-center-quality-8of10.jpg",
    caption: "Outside Hangin Center.",
  },
  rentalBoards: {
    src: "/images/owner/kiteboards-with-footstraps-beside-shaded-beach-seating.webp",
    width: 1000,
    height: 1500,
    mobileSrc: "/images/owner/kiteboards-with-footstraps-beside-shaded-beach-seating-600.webp",
    mobileWidth: 600,
    mobileHeight: 900,
    alt: "Kiteboards with footstraps beside shaded seating on the beach",
    kind: "provided",
    sourceFile: "kiteboards-with-footstraps-beside-shaded-beach-seating-quality-8of10.jpg",
    caption: "Kiteboards beside the beach. Ask us about current rental gear.",
  },
  shopBoards: {
    src: "/images/owner/colorful-kiteboards-with-footstraps-leaning-against-wall.webp",
    width: 1000,
    height: 1500,
    mobileSrc: "/images/owner/colorful-kiteboards-with-footstraps-leaning-against-wall-600.webp",
    mobileWidth: 600,
    mobileHeight: 900,
    alt: "Close view of kiteboards with footstraps and carry handles",
    kind: "provided",
    sourceFile: "colorful-kiteboards-with-footstraps-leaning-against-wall-quality-8of10.jpg",
    caption: "Equipment at the beach. Ask the shop about current stock.",
  },
  controlBar: {
    src: "/images/owner/kite-control-bar-and-wrapped-lines-on-sand.webp",
    width: 1800,
    height: 2700,
    mobileSrc: "/images/owner/kite-control-bar-and-wrapped-lines-on-sand-600.webp",
    mobileWidth: 600,
    mobileHeight: 900,
    alt: "A kite control bar with wrapped lines resting against a kite on the sand",
    kind: "provided",
    sourceFile: "kite-control-bar-and-wrapped-lines-on-sand-quality-9of10.jpg",
    caption: "A kite control bar and its lines.",
  },
  kiteSetup: {
    src: "/images/owner/person-preparing-kite-lines-on-beach.webp",
    width: 1800,
    height: 2700,
    mobileSrc: "/images/owner/person-preparing-kite-lines-on-beach-600.webp",
    mobileWidth: 600,
    mobileHeight: 900,
    alt: "A person sorting kite lines behind a coral and grey kite on the beach",
    kind: "provided",
    sourceFile: "person-preparing-kite-lines-on-beach-quality-9of10.jpg",
    caption: "Preparing kite lines on the beach.",
  },
  boardRiding: {
    src: "/images/owner/orange-sleeved-kiteboarder-carving-past-palm-lined-beach.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/owner/orange-sleeved-kiteboarder-carving-past-palm-lined-beach-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "An orange-sleeved kiteboarder carving through spray by a palm-lined beach",
    kind: "provided",
    sourceFile: "orange-sleeved-kiteboarder-carving-past-palm-lined-beach-quality-9of10.jpg",
    caption: "Riding off the palm-lined beach.",
  },
  boardPractice: {
    src: "/images/owner/red-capped-kiteboarder-riding-past-palm-lined-beach.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/owner/red-capped-kiteboarder-riding-past-palm-lined-beach-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "A red-capped kiteboarder riding through spray beside a palm-lined beach",
    kind: "provided",
    sourceFile: "red-capped-kiteboarder-riding-past-palm-lined-beach-quality-8of10.jpg",
    caption: "Riding beside the palm-lined beach.",
  },
  kiteJump: {
    src: "/images/owner/kiteboarder-tilting-board-during-high-airborne-jump.webp",
    width: 1800,
    height: 2700,
    mobileSrc: "/images/owner/kiteboarder-tilting-board-during-high-airborne-jump-600.webp",
    mobileWidth: 600,
    mobileHeight: 900,
    alt: "A kiteboarder tilting the board during a jump above the sea",
    kind: "provided",
    sourceFile: "kiteboarder-tilting-board-during-high-airborne-jump-quality-9of10.jpg",
    caption: "An airborne kiteboarding trick.",
  },

  school: {
    src: "/images/proof/boracay-kitesurf-school.webp",
    width: 1600,
    height: 1280,
    mobileSrc: "/images/proof/boracay-kitesurf-school-900.webp",
    mobileWidth: 900,
    mobileHeight: 720,
    alt: "Riders kitesurfing together over turquoise Boracay water",
    kind: "proof",
    credit: "Kstranger",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kitesurfers_boracay.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  bulabog: {
    src: "/images/proof/bulabog-beach-aerial.webp",
    width: 1920,
    height: 1440,
    mobileSrc: "/images/proof/bulabog-beach-aerial-900.webp",
    mobileWidth: 900,
    mobileHeight: 675,
    alt: "Bulabog Beach and the east side of Boracay seen from above",
    kind: "proof",
    credit: "Patrickroque01",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Boracay_Bulabog_Beach_top_view_(Malay,_Aklan;_04-06-2024).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  riding: {
    src: "/images/proof/boracay-kitesurfing.webp",
    width: 1800,
    height: 1200,
    mobileSrc: "/images/proof/boracay-kitesurfing-900.webp",
    mobileWidth: 900,
    mobileHeight: 600,
    alt: "Kitesurfers riding off Boracay",
    kind: "proof",
    credit: "Anastasia Zhebyuk",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Boracay_kitesurfing.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  gearArt: {
    src: "/images/generated/kite-gear-sunprint.webp",
    width: 1600,
    height: 1067,
    mobileSrc: "/images/generated/kite-gear-sunprint-900.webp",
    mobileWidth: 900,
    mobileHeight: 601,
    alt: "",
    kind: "generated",
  },
  safariArt: {
    src: "/images/generated/kite-safari-sunprint.webp",
    width: 1600,
    height: 1067,
    mobileSrc: "/images/generated/kite-safari-sunprint-900.webp",
    mobileWidth: 900,
    mobileHeight: 601,
    alt: "",
    kind: "generated",
  },
  stayArt: {
    src: "/images/generated/island-stay-sunprint.webp",
    width: 1600,
    height: 1067,
    mobileSrc: "/images/generated/island-stay-sunprint-900.webp",
    mobileWidth: 900,
    mobileHeight: 601,
    alt: "",
    kind: "generated",
  },
} as const satisfies Record<string, SiteImage>;
