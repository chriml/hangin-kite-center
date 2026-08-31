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
      kind: "generated";
      credit?: never;
      sourceUrl?: never;
      license?: never;
      licenseUrl?: never;
    }
);

export const siteImages = {
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
