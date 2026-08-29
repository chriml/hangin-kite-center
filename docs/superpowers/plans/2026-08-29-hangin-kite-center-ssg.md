# Hangin Kite Center SSG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a tropical, conversion-aware, fully static Hangin Kite Center website with page-level SEO, authentic Boracay proof images, generated supporting art, and a clean future-booking boundary.

**Architecture:** Next.js 16.3.3 App Router renders every route at build time using `output: "export"` and `trailingSlash: true`. Typed local content feeds focused Server Components, shared metadata helpers, visible breadcrumbs, JSON-LD, and one contact adapter that currently targets WhatsApp and email. All images are local and manually optimized because the default Next.js image optimizer is unavailable in static-export mode.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 5, Tailwind CSS 4 foundation with authored CSS, `next/font`, `next/image` with global `unoptimized: true`, Node's built-in test runner, `cwebp`, and static HTML inspection.

**Spec:** `docs/superpowers/specs/2026-08-29-hangin-kite-center-ssg-design.md`

## Global Constraints

- Read the relevant files under `node_modules/next/dist/docs/` before changing Next.js behavior. The required static-export, image, font, metadata, JSON-LD, robots, sitemap, manifest, and 404 guides were identified during planning.
- Keep `next`, `react`, and `react-dom` at the repository's installed versions.
- Emit only static files. Do not add request-time APIs, Server Actions, runtime route handlers, cookies, rewrites, redirects, or the default Next.js image optimizer.
- Use Server Components by default. The planned interface requires no Client Components.
- Canonical origin: `https://www.hanginkitecenter.com`.
- Public language: English.
- Primary contact: `https://wa.me/639380101849`; fallback: `mailto:hanginkitecenter@gmail.com`.
- Do not invent prices, opening hours, availability, instructor names, room details, course durations, awards, ratings, or guarantees.
- Follow the durable anti-slop copy and UI rules in `AGENTS.md`. Before writing or reviewing public copy, read and apply the installed `no-ai-slop` skill at `/Users/saltychris/.agents/skills/no-ai-slop/SKILL.md` and its `eval.md`. Ban the listed vocabulary, the phrase `not just`, em dashes, fake urgency, and named structural patterns from public copy.
- Use authentic, reuse-cleared web images for Boracay proof. Use generated images only as clearly illustrative supporting art.
- Before implementation code, invoke `superpowers:test-driven-development`. Before Task 4, read and apply the installed `frontend-design` skill at `/Users/saltychris/.agents/skills/frontend-design/SKILL.md`.
- Preserve all unrelated user changes. Each task commits only its own files.

## File Map

### Configuration and verification

- `next.config.ts`: static-export, trailing-slash, and unoptimized-image contract.
- `package.json`: `typecheck`, `test`, and `verify` scripts.
- `tests/export-helpers.mjs`: reads and inspects generated HTML without adding a parser dependency.
- `tests/static-export.test.mjs`: export structure and technical-file contract.
- `tests/site-contract.test.mjs`: canonical business identity and contact links.
- `tests/routes-and-seo.test.mjs`: route, metadata, heading, JSON-LD, sitemap, and link contract.
- `tests/media.test.mjs`: local media and attribution contract.
- `tests/content-style.test.mjs`: banned-phrase checks across visible copy, metadata, alt text, and structured data.

### Content and helpers

- `content/site.ts`: canonical origin, contact data, navigation, route list, and business facts.
- `content/images.ts`: local image records, dimensions, roles, alt text, and provenance class.
- `content/water-pages.ts`: lessons, rentals and storage, and safaris copy.
- `content/island-pages.ts`: accommodation, shop, Boracay, about, and contact copy.
- `lib/seo.ts`: typed metadata and absolute-URL helpers.
- `components/json-ld.tsx`: sanitized native JSON-LD script output.

### Shared UI

- `components/site-header.tsx`: skip link, desktop navigation, native mobile menu, and contact action.
- `components/site-footer.tsx`: route links, location, WhatsApp, and email.
- `components/contact-cta.tsx`: context-aware WhatsApp/email boundary.
- `components/breadcrumbs.tsx`: visible breadcrumbs and breadcrumb data.
- `components/page-hero.tsx`: reusable supporting-page introduction.
- `components/service-page.tsx`: supporting-page structure and service schema composition.
- `components/proof-strip.tsx`: factual homepage proof points.
- `components/service-path.tsx`: homepage service links.
- `components/spot-guide.tsx`: homepage Boracay conditions summary.
- `components/site-shell.module.css`: shared shell, navigation, CTA, hero, and footer styling.
- `components/service-page.module.css`: supporting-page layouts.

### Routes and assets

- `app/layout.tsx`: fonts, root metadata, shell, and sitewide JSON-LD.
- `app/page.tsx` and `app/page.module.css`: homepage funnel.
- `app/not-found.tsx`: exported 404 UI.
- `app/{kitesurfing-lessons,rentals-storage,kite-safaris,accommodation,shop,kitesurfing-boracay,about,contact}/page.tsx`: explicit static routes.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`: static SEO files.
- `app/opengraph-image.jpg`: static 1200×630 social image.
- `app/icon.svg` and `app/apple-icon.png`: brand icons.
- `public/images/proof/`: licensed Boracay photography.
- `public/images/generated/`: generated illustrative art.
- `public/images/ATTRIBUTION.md`: source, author, license, modifications, and generation record.
- `public/brand/mark.svg`: code-native kite-line mark.

---

### Task 1: Lock the static-export contract

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`
- Create: `tests/export-helpers.mjs`
- Create: `tests/static-export.test.mjs`
- Create: `app/not-found.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: current App Router pages and existing metadata routes.
- Produces: `out/<route>/index.html`, `out/404.html`, `readRoute(route)`, `routeFile(route)`, and test scripts used by all later tasks.

- [ ] **Step 1: Add the export test helper and failing static contract**

Create `tests/export-helpers.mjs`:

```js
import { readFile } from "node:fs/promises";
import path from "node:path";

export const outDir = path.resolve("out");

export function routeFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  return path.join(outDir, route.replace(/^\//, ""), "index.html");
}

export function readRoute(route) {
  return readFile(routeFile(route), "utf8");
}

export function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1];
}

export function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

export function metaContent(html, key, value) {
  const tag = tags(html, "meta").find((item) => attribute(item, key) === value);
  return tag ? attribute(tag, "content") : undefined;
}

export function linkHref(html, rel) {
  const tag = tags(html, "link").find((item) => attribute(item, "rel") === rel);
  return tag ? attribute(tag, "href") : undefined;
}

export function title(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1];
}

export function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)]
    .map((match) => JSON.parse(match[1]));
}

export function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
```

Create `tests/static-export.test.mjs`:

```js
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { outDir, readRoute } from "./export-helpers.mjs";

test("build emits a static homepage, 404, and metadata files", async () => {
  await Promise.all([
    access(path.join(outDir, "index.html")),
    access(path.join(outDir, "404.html")),
    access(path.join(outDir, "robots.txt")),
    access(path.join(outDir, "sitemap.xml")),
    access(path.join(outDir, "manifest.webmanifest")),
  ]);
});

test("the exported 404 is useful and not indexable", async () => {
  const html = await readFile(path.join(outDir, "404.html"), "utf8");
  assert.match(html, /We couldn't find that page/i);
  assert.match(html, /name="robots" content="noindex"/i);
});

test("homepage content is present in exported HTML", async () => {
  const html = await readRoute("/");
  assert.match(html, /<main\b/i);
  assert.match(html, /Hangin Kite Center/i);
});
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "python3 -m http.server 4173 -d out",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "test": "node --test tests/*.test.mjs",
    "verify": "npm run lint && npm run typecheck && npm run build && npm test"
  }
}
```

- [ ] **Step 2: Run the test and confirm it fails before static export exists**

Run: `node --test --test-name-pattern="build emits" tests/static-export.test.mjs`

Expected: FAIL with `ENOENT` for `out/index.html` or another required export file.

- [ ] **Step 3: Enable the documented Next.js 16.3.3 export configuration**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <p className="eyebrow">404 · Boracay</p>
      <h1>We couldn't find that page.</h1>
      <p>Hangin is still on Bulabog Beach.</p>
      <Link className="button button--dark" href="/">
        Back to Hangin
      </Link>
    </main>
  );
}
```

Update the README build description to state that `npm run build` writes the deployable site to `out/` and `npm run preview` serves that directory on port `4173`.

- [ ] **Step 4: Build and run the static contract**

Run: `npm run build && node --test tests/static-export.test.mjs`

Expected: PASS. Confirm `out/index.html`, `out/404.html`, `out/robots.txt`, `out/sitemap.xml`, and `out/manifest.webmanifest` exist.

- [ ] **Step 5: Commit the export foundation**

```bash
git add next.config.ts package.json README.md app/not-found.tsx tests/export-helpers.mjs tests/static-export.test.mjs
git commit -m "build: enable static site export"
```

---

### Task 2: Add the business, contact, metadata, and JSON-LD primitives

**Files:**
- Create: `content/site.ts`
- Create: `lib/seo.ts`
- Create: `components/json-ld.tsx`
- Create: `components/contact-cta.tsx`
- Create: `tests/site-contract.test.mjs`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: exported HTML reader from Task 1.
- Produces: `siteConfig`, `publicRoutes`, `ContactContext`, `getWhatsAppUrl(context)`, `buildMetadata(input)`, `absoluteUrl(path)`, `JsonLd`, and `ContactCta`.

- [ ] **Step 1: Write the failing site contract**

Create `tests/site-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { jsonLdBlocks, linkHref, metaContent, readRoute, title } from "./export-helpers.mjs";

test("homepage exports the canonical business identity", async () => {
  const html = await readRoute("/");
  assert.equal(title(html), "Kitesurfing in Boracay | Hangin Kite Center");
  assert.equal(linkHref(html, "canonical"), "https://www.hanginkitecenter.com/");
  assert.match(metaContent(html, "name", "description") ?? "", /Bulabog Beach/i);
});

test("homepage exposes WhatsApp and email without a form", async () => {
  const html = await readRoute("/");
  assert.match(html, /https:\/\/wa\.me\/639380101849\?text=/);
  assert.match(html, /mailto:hanginkitecenter@gmail\.com/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("homepage JSON-LD contains only confirmed business types", async () => {
  const html = await readRoute("/");
  const blocks = jsonLdBlocks(html);
  const serialized = JSON.stringify(blocks);
  assert.match(serialized, /SportsActivityLocation/);
  assert.match(serialized, /Organization/);
  assert.match(serialized, /WebSite/);
  assert.doesNotMatch(serialized, /AggregateRating|Review|price|openingHours/);
});
```

- [ ] **Step 2: Verify the current page fails the new contract**

Run: `npm run build && node --test tests/site-contract.test.mjs`

Expected: FAIL on the title, canonical trailing slash, contact links, and complete JSON-LD graph.

- [ ] **Step 3: Implement the typed business and contact configuration**

Create `content/site.ts` with these exact exports:

```ts
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
  | "storage"
  | "safari"
  | "stay"
  | "shop";

const contactMessages: Record<ContactContext, string> = {
  general: "Hi Hangin, I'm planning a Boracay trip. My dates are [dates], my riding level is [level], and I need help with [service].",
  lessons: "Hi Hangin, I'd like to arrange kitesurfing lessons in Boracay.",
  rental: "Hi Hangin, I'd like to check kite rental availability for my Boracay trip.",
  storage: "Hi Hangin, I'd like to ask about kite storage on Bulabog Beach.",
  safari: "Hi Hangin, I'd like to know about kite safari options during my trip.",
  stay: "Hi Hangin, I'd like to check accommodation availability near the kite beach.",
  shop: "Hi Hangin, I'd like to check what kite gear is currently in the shop.",
};

export function getWhatsAppUrl(context: ContactContext = "general") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(contactMessages[context])}`;
}
```

Create `lib/seo.ts`:

```ts
import type { Metadata } from "next";
import { siteConfig, type PublicRoute } from "@/content/site";

export function absoluteUrl(path: PublicRoute | `/${string}`) {
  return new URL(path, `${siteConfig.origin}/`).toString();
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: PublicRoute;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.jpg"],
    },
  };
}
```

- [ ] **Step 4: Implement safe JSON-LD and the contact boundary**

Create `components/json-ld.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

Create `components/contact-cta.tsx`:

```tsx
import { getWhatsAppUrl, siteConfig, type ContactContext } from "@/content/site";

export function ContactCta({
  context = "general",
  label = "Message us on WhatsApp",
  compact = false,
}: {
  context?: ContactContext;
  label?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "contact-actions contact-actions--compact" : "contact-actions"}>
      <a
        className="button button--coral"
        href={getWhatsAppUrl(context)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
      {!compact && <a href={`mailto:${siteConfig.email}`}>Email {siteConfig.email}</a>}
    </div>
  );
}
```

Update `app/layout.tsx` to set `metadataBase`, the title template, root description, canonical homepage metadata through `buildMetadata`, and a sitewide `@graph` containing `WebSite`, `Organization`, and `SportsActivityLocation`. Use only confirmed values from `siteConfig`; the address object contains `addressLocality: "Boracay"`, `addressRegion: "Aklan"`, and `addressCountry: "PH"`, with no unconfirmed street or postal code.

Use the root default title `Kitesurfing in Boracay | Hangin Kite Center`, title template `%s | Hangin Kite Center`, and description `Kitesurfing lessons, equipment rental, storage, accommodation, shop and kite safaris with Hangin Kite Center on Bulabog Beach, Boracay.`

Update the temporary homepage to render `ContactCta`, the email fallback, and the sitewide JSON-LD through the layout. Do not build the final funnel yet.

- [ ] **Step 5: Rebuild and pass the site contract**

Run: `npm run build && node --test tests/site-contract.test.mjs`

Expected: 3 PASS. Inspect the exported JSON-LD and confirm `<` is serialized as `\u003c` if introduced by future content.

- [ ] **Step 6: Commit the site primitives**

```bash
git add content/site.ts lib/seo.ts components/json-ld.tsx components/contact-cta.tsx app/layout.tsx app/page.tsx tests/site-contract.test.mjs
git commit -m "feat: add static site and contact contracts"
```

---

### Task 3: Build the licensed and generated image set

**Files:**
- Create: `public/images/proof/boracay-kitesurf-school.webp`
- Create: `public/images/proof/bulabog-beach-aerial.webp`
- Create: `public/images/proof/boracay-kitesurfing.webp`
- Create: `public/images/generated/kite-gear-sunprint.webp`
- Create: `public/images/generated/kite-safari-sunprint.webp`
- Create: `public/images/generated/island-stay-sunprint.webp`
- Create: `public/images/ATTRIBUTION.md`
- Create: `content/images.ts`
- Create: `tests/media.test.mjs`

**Interfaces:**
- Consumes: approved image policy and the local `cwebp` binary.
- Produces: `siteImages` records used by homepage and supporting-page components.

- [ ] **Step 1: Write the failing media inventory test**

Create `tests/media.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const files = [
  "proof/boracay-kitesurf-school.webp",
  "proof/bulabog-beach-aerial.webp",
  "proof/boracay-kitesurfing.webp",
  "generated/kite-gear-sunprint.webp",
  "generated/kite-safari-sunprint.webp",
  "generated/island-stay-sunprint.webp",
];

test("all planned local media exists and is non-empty", async () => {
  for (const file of files) {
    const info = await stat(path.join("public/images", file));
    assert.ok(info.size > 10_000, `${file} is unexpectedly small`);
    assert.ok(info.size < 900_000, `${file} needs more compression`);
  }
});

test("every image has a provenance entry", async () => {
  const attribution = await readFile("public/images/ATTRIBUTION.md", "utf8");
  for (const file of files) assert.match(attribution, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(attribution, /CC0 1\.0/);
  assert.match(attribution, /CC BY-SA 4\.0/);
  assert.match(attribution, /CC BY-SA 3\.0/);
  assert.match(attribution, /OpenAI ImageGen/);
});
```

- [ ] **Step 2: Confirm the inventory test fails**

Run: `node --test tests/media.test.mjs`

Expected: FAIL with `ENOENT` for the first planned image.

- [ ] **Step 3: Download and optimize the three proof images**

Use a task-specific temporary directory and these exact Wikimedia file pages:

1. `Kitesurfers boracay.jpg`, Kstranger, CC0 1.0.
2. `Boracay Bulabog Beach top view (Malay, Aklan; 04-06-2024).jpg`, Patrickroque01, CC BY-SA 4.0.
3. `Boracay kitesurfing.jpg`, Anastasia Zhebyuk, CC BY-SA 3.0.

Run:

```bash
media_tmp="$(mktemp -d)"
curl -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kitesurfers%20boracay.jpg' -o "$media_tmp/school.jpg"
curl -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Boracay%20Bulabog%20Beach%20top%20view%20%28Malay%2C%20Aklan%3B%2004-06-2024%29.jpg' -o "$media_tmp/aerial.jpg"
curl -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Boracay%20kitesurfing.jpg' -o "$media_tmp/kitesurfing.jpg"
mkdir -p public/images/proof public/images/generated
cwebp -quiet -q 82 -resize 1600 0 "$media_tmp/school.jpg" -o public/images/proof/boracay-kitesurf-school.webp
cwebp -quiet -q 80 -resize 1920 0 "$media_tmp/aerial.jpg" -o public/images/proof/bulabog-beach-aerial.webp
cwebp -quiet -q 82 -resize 1800 0 "$media_tmp/kitesurfing.jpg" -o public/images/proof/boracay-kitesurfing.webp
```

Print and retain the exact temporary-directory path for Step 4. Task 8 creates the OG image from the optimized WebP and does not need the source JPEGs. Do not commit the source JPEG files.

- [ ] **Step 4: Generate the three clearly illustrative supporting images**

Read `/Users/saltychris/.codex/skills/.system/imagegen/SKILL.md` completely and announce that the skill is being used for the user-requested generated art. Then use the `imagegen` skill and save one result per prompt. The images must look like editorial screen prints rather than documentary photography.

Prompt for `kite-gear-sunprint`:

```text
Wide 3:2 editorial screen-print illustration for a Boracay kitesurf website. Top-down kite gear on warm sand: twin-tip board edge, control bar and clean lines, harness, pump and small repair kit. Tropical midday shadows, lagoon turquoise, coral red, palm green and deep ocean ink, sun-faded halftone texture, confident sparse composition, no people, no text, no logos, clearly illustrative rather than photorealistic.
```

Prompt for `kite-safari-sunprint`:

```text
Wide 3:2 editorial screen-print illustration for a Boracay kite safari page. A small Philippine outrigger boat crossing clear tropical water with two distant kites in the sky, low island horizon, warm sun, wind lines sweeping through the composition. Lagoon turquoise, coral red, palm green, sand and deep ocean ink, sun-faded halftone texture, no text, no logos, clearly illustrative rather than documentary.
```

Prompt for `island-stay-sunprint`:

```text
Wide 3:2 editorial screen-print illustration for accommodation near a tropical kite beach. Open wooden shutters, moving curtain, palm shade, a board leaning outside and one kite visible far over turquoise water. Quiet early-morning Boracay mood, sand, palm green, lagoon turquoise and coral accents, sun-faded halftone texture, no people, no text, no logos, clearly illustrative rather than a real room photograph.
```

Save the generated PNGs in the same task-specific temporary directory, inspect each with `view_image`, reject anatomy, gear, line, or text artifacts, then convert:

```bash
cwebp -quiet -q 84 -resize 1600 0 "$media_tmp/kite-gear-sunprint.png" -o public/images/generated/kite-gear-sunprint.webp
cwebp -quiet -q 84 -resize 1600 0 "$media_tmp/kite-safari-sunprint.png" -o public/images/generated/kite-safari-sunprint.webp
cwebp -quiet -q 84 -resize 1600 0 "$media_tmp/island-stay-sunprint.png" -o public/images/generated/island-stay-sunprint.webp
```

- [ ] **Step 5: Record provenance and centralize image use**

Create `public/images/ATTRIBUTION.md` with one row per file containing filename, role, source page or `OpenAI ImageGen`, creator, exact license, retrieval/generation date `2026-08-29`, and the modification `resized and WebP converted`. Include direct source-page links:

- `https://commons.wikimedia.org/wiki/File:Kitesurfers_boracay.jpg`
- `https://commons.wikimedia.org/wiki/File:Boracay_Bulabog_Beach_top_view_(Malay,_Aklan;_04-06-2024).jpg`
- `https://commons.wikimedia.org/wiki/File:Boracay_kitesurfing.jpg`

Create `content/images.ts`:

```ts
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: "proof" | "generated";
  credit?: string;
  sourceUrl?: string;
  license?: string;
};

export const siteImages = {
  school: {
    src: "/images/proof/boracay-kitesurf-school.webp",
    width: 1600,
    height: 1280,
    alt: "Kites and riders gathered at a kitesurfing school in Boracay",
    kind: "proof",
    credit: "Kstranger",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kitesurfers_boracay.jpg",
    license: "CC0 1.0",
  },
  bulabog: {
    src: "/images/proof/bulabog-beach-aerial.webp",
    width: 1920,
    height: 1440,
    alt: "Bulabog Beach and the east side of Boracay seen from above",
    kind: "proof",
    credit: "Patrickroque01",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Boracay_Bulabog_Beach_top_view_(Malay,_Aklan;_04-06-2024).jpg",
    license: "CC BY-SA 4.0",
  },
  riding: {
    src: "/images/proof/boracay-kitesurfing.webp",
    width: 1800,
    height: 1200,
    alt: "Kitesurfers riding off Boracay",
    kind: "proof",
    credit: "Anastasia Zhebyuk",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Boracay_kitesurfing.jpg",
    license: "CC BY-SA 3.0",
  },
  gearArt: {
    src: "/images/generated/kite-gear-sunprint.webp",
    width: 1600,
    height: 1067,
    alt: "",
    kind: "generated",
  },
  safariArt: {
    src: "/images/generated/kite-safari-sunprint.webp",
    width: 1600,
    height: 1067,
    alt: "",
    kind: "generated",
  },
  stayArt: {
    src: "/images/generated/island-stay-sunprint.webp",
    width: 1600,
    height: 1067,
    alt: "",
    kind: "generated",
  },
} as const satisfies Record<string, SiteImage>;
```

Confirm the actual generated aspect ratios and update only the recorded `height` values if ImageGen returns a different ratio.

- [ ] **Step 6: Pass the media tests and inspect every image**

Run: `node --test tests/media.test.mjs`

Expected: 2 PASS. Then inspect all six final WebP files with `view_image` at original detail.

- [ ] **Step 7: Commit the media set**

```bash
git add public/images content/images.ts tests/media.test.mjs
git commit -m "assets: add Boracay proof and supporting art"
```

---

### Task 4: Build the tropical site shell and design tokens

**Files:**
- Create: `public/brand/mark.svg`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/site-shell.module.css`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-contract.test.mjs`

**Interfaces:**
- Consumes: `siteConfig`, `publicRoutes`, `ContactCta`, root metadata, and sitewide JSON-LD.
- Produces: global shell, `--font-display`, `--font-body`, skip-link target `#main-content`, navigation, and reusable global button/eyebrow/shell classes.

- [ ] **Step 1: Apply the installed frontend design skill**

Read `/Users/saltychris/.agents/skills/frontend-design/SKILL.md` completely. Record its preflight decisions in the task notes: purpose, tropical surf direction, selected palette and type pair from the approved spec, signature kite-line motif, responsive constraints, and reduced-motion rule. If it conflicts with approved project copy or scope, the project spec wins.

- [ ] **Step 2: Extend the site contract with shell assertions**

Add this test to `tests/site-contract.test.mjs`:

```js
test("homepage shell is semantic and usable without client JavaScript", async () => {
  const html = await readRoute("/");
  assert.match(html, /href="#main-content"[^>]*>Skip to content/i);
  assert.match(html, /<main[^>]+id="main-content"/i);
  assert.match(html, /<header\b/i);
  assert.match(html, /<nav[^>]+aria-label="Primary"/i);
  assert.match(html, /<footer\b/i);
  assert.match(html, /<details\b/i);
  assert.doesNotMatch(html, /data-next-hide-fouc|aria-label="Open menu"/i);
});
```

- [ ] **Step 3: Rebuild and confirm the shell test fails**

Run: `npm run build && node --test --test-name-pattern="shell" tests/site-contract.test.mjs`

Expected: FAIL because the temporary page has no full site shell.

- [ ] **Step 4: Create the mark, header, footer, and root fonts**

Create a simple code-native SVG mark using one coral kite canopy, two lagoon kite lines, and no text. The viewBox is `0 0 64 64`, the kite canopy fits inside `8 8 48 30`, and the lines finish at `32 58`.

Use this exact SVG structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Hangin Kite Center">
  <path fill="#f06449" d="M8 28 32 8l24 20-24 9L8 28Z"/>
  <path fill="none" stroke="#1fb9c1" stroke-width="2.5" stroke-linecap="round" d="M8 28c12 8 18 18 24 30M56 28C44 36 38 46 32 58"/>
  <circle cx="32" cy="58" r="2.5" fill="#073642"/>
</svg>
```

Implement `SiteHeader` with:

- A skip link to `#main-content`.
- A linked mark and `HANGIN` wordmark.
- Desktop links: `Lessons`, `Rentals & storage`, `Stay`, `Boracay`, `About`.
- A compact `WhatsApp us` contact action.
- A native `<details>` mobile menu containing the same routes plus `Safaris`, `Shop`, and `Contact`.

Implement `SiteFooter` with all nine public routes, `Bulabog Beach, Boracay`, the display WhatsApp number, and email address.

Whenever a proof image is rendered, wrap it in `<figure>` and show a small `<figcaption>` with the image record's linked `credit` and `license`. Generated art has empty alt text and no factual caption.

Update `app/layout.tsx` to use:

```tsx
import { Barlow_Condensed, Manrope } from "next/font/google";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

Apply both variables to `<html lang="en">`, put `SiteHeader` and `SiteFooter` around `children`, and keep all JSON-LD in a native script through `JsonLd`.

- [ ] **Step 5: Implement the visual tokens and shell CSS**

Replace the generic dark-mode CSS with this fixed palette and typography contract:

```css
:root {
  --ocean: #073642;
  --lagoon: #1fb9c1;
  --sand: #f2e5c4;
  --sun: #fffdf6;
  --palm: #315f4b;
  --coral: #f06449;
  --ink: #102a30;
  --line: color-mix(in srgb, var(--ocean) 22%, transparent);
  --shadow: 0 24px 70px rgb(7 54 66 / 0.14);
  --content: min(1180px, calc(100vw - 2rem));
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--sun);
  color: var(--ink);
  font-family: var(--font-body), sans-serif;
}
h1, h2, h3 { font-family: var(--font-display), sans-serif; text-wrap: balance; }
p { text-wrap: pretty; }
a { color: inherit; }
*:focus-visible { outline: 3px solid var(--coral); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

Add exact shared styles for `.shell`, `.eyebrow`, `.button`, `.button--coral`, `.button--dark`, `.contact-actions`, `.skip-link`, and `.not-found`. Use square or lightly rounded corners (`0` to `0.5rem`), no pill-shaped content cards, and no gradients.

Use these base declarations:

```css
.shell { width: var(--content); margin-inline: auto; }
.eyebrow { margin: 0 0 0.75rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; }
.button { display: inline-flex; min-height: 3rem; align-items: center; justify-content: center; padding: 0.75rem 1.1rem; border: 1px solid currentColor; border-radius: 0.25rem; font-weight: 800; text-decoration: none; transition: transform 160ms ease, background-color 160ms ease; }
.button:hover { transform: translateY(-2px); }
.button--coral { border-color: var(--coral); background: var(--coral); color: var(--ocean); }
.button--dark { border-color: var(--ocean); background: var(--ocean); color: var(--sun); }
.contact-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
.contact-actions--compact { gap: 0.5rem; }
.skip-link { position: fixed; z-index: 100; inset: 0 auto auto 1rem; transform: translateY(-140%); background: var(--sun); padding: 0.75rem 1rem; }
.skip-link:focus { transform: translateY(0.75rem); }
.not-found { width: var(--content); min-height: 70vh; display: grid; align-content: center; justify-items: start; gap: 1rem; }
```

Use `components/site-shell.module.css` for header/footer layout, full-width rules, the desktop/mobile break at `780px`, and a native mobile-menu panel. Keep headline line lengths below 12 words where possible.

- [ ] **Step 6: Pass shell, lint, and type checks**

Run: `npm run lint && npm run typecheck && npm run build && node --test tests/site-contract.test.mjs`

Expected: PASS with no Client Component boundary added.

- [ ] **Step 7: Commit the visual shell**

```bash
git add public/brand/mark.svg components/site-header.tsx components/site-footer.tsx components/site-shell.module.css app/layout.tsx app/globals.css tests/site-contract.test.mjs
git commit -m "feat: build tropical site shell"
```

---

### Task 5: Build the homepage funnel

**Files:**
- Create: `components/proof-strip.tsx`
- Create: `components/service-path.tsx`
- Create: `components/spot-guide.tsx`
- Modify: `app/page.tsx`
- Create: `app/page.module.css`
- Create: `tests/routes-and-seo.test.mjs`

**Interfaces:**
- Consumes: shell, contact CTA, site images, site config, and root JSON-LD.
- Produces: complete homepage funnel with section IDs `start`, `lessons`, `boracay`, `services`, `story`, `questions`, and `contact`.

- [ ] **Step 1: Write the failing homepage funnel test**

Create `tests/routes-and-seo.test.mjs` with:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { readRoute, visibleText } from "./export-helpers.mjs";

test("homepage follows the approved calm funnel", async () => {
  const html = await readRoute("/");
  const text = visibleText(html);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  for (const id of ["start", "lessons", "boracay", "services", "story", "questions", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(text, /Kitesurfing here since 2002\./);
  assert.match(text, /Your first kite lesson/);
  assert.match(text, /Leave the board bag at home\./);
  assert.match(text, /Tell us when you're coming\./);
  assert.doesNotMatch(text, /book now|limited|don't miss|once-in-a-lifetime/i);
});
```

- [ ] **Step 2: Confirm the temporary homepage fails**

Run: `npm run build && node --test --test-name-pattern="homepage" tests/routes-and-seo.test.mjs`

Expected: FAIL on the missing section IDs and approved copy.

- [ ] **Step 3: Implement the funnel in this exact order**

Build `app/page.tsx` as a Server Component whose outer element is `<main id="main-content">`, with:

1. `#start`: eyebrow `Bulabog Beach, Boracay`; H1 `Kitesurfing here since 2002.`; lead `Learn with IKO and VDWS instructors, rent a full setup, store your own gear, or stay close to the kite beach. If the wind is up, we're out there.`; links `See the lessons` and `Message us on WhatsApp`; authentic school image.
2. `ProofStrip`: `On the beach since 2002`, `IKO & VDWS instruction`, `Lessons · rental · storage`, `Stay close to the spot`.
3. `#lessons`: heading `Lessons and rental.`; four `ServicePath` links with headings `Your first kite lesson`, `Board starts and first rides`, `Progression sessions`, and `Full equipment rental`; each description is one or two factual sentences.
4. `#boracay`: heading `The windward side of Boracay.`; copy explaining Bulabog's warm shallow lagoon and Amihan season without promising daily wind; authentic aerial image; link `Read the Boracay spot guide`.
5. `#services`: heading `Leave the board bag at home.`; large alternating rows for rental and storage, accommodation, shop, and safaris; use gear, stay, and safari generated art only as illustration.
6. `#story`: heading `On Bulabog Beach since 2002.`; copy `Hangin has taught on Bulabog Beach since 2002. Today the center covers lessons, rental, storage, stays, the shop and kite trips.`; authentic riding image; link `About Hangin`.
7. `#questions`: heading `Before you hit the water.`; six visible `<details>` questions: `Do I need experience?`, `When is the kite season?`, `What should I bring?`, `Can I rent equipment?`, `Can I store my own gear?`, and `How do I arrange a session?`. Answers stay within confirmed facts and point uncertain details to WhatsApp.
8. `#contact`: heading `Tell us when you're coming.`; copy `Send your dates, riding level and what you need. We'll tell you what works with the current conditions.`; full `ContactCta` and email.

Use `<Image>` with the exact local `siteImages` records and `sizes` values that match the rendered layout. Use `preload={true}` only for the single above-fold hero image on each route; do not preload below-fold images. Next.js 16 deprecates the older `priority` prop.

- [ ] **Step 4: Implement the homepage composition**

Create `app/page.module.css` with:

- Hero: two-column editorial grid at `min-width: 860px`; content remains visible within a 768px-high laptop viewport.
- Mobile: image below copy, H1 between `3.5rem` and `5.5rem` through `clamp()`.
- Proof: full-width rule with four compact facts, not four floating cards.
- Service paths: gapless bordered grid with alternating sand, sun, and lagoon-tint cells.
- Boracay/story: asymmetric image and copy layouts.
- Service rows: large horizontal bands with one image and one text block; alternate order.
- FAQ: one-column list with visible borders and native disclosure markers.
- Contact close: deep ocean background, sand text, coral action.

Do not add testimonial sliders, stats with invented values, animations requiring JavaScript, or nested card layouts.

- [ ] **Step 5: Pass the homepage funnel contract**

Run: `npm run build && node --test --test-name-pattern="homepage" tests/routes-and-seo.test.mjs`

Expected: PASS. Inspect the homepage at 390px and 1366px before committing; the hero heading, both actions, and first proof row must appear without horizontal scrolling.

- [ ] **Step 6: Commit the homepage**

```bash
git add app/page.tsx app/page.module.css components/proof-strip.tsx components/service-path.tsx components/spot-guide.tsx tests/routes-and-seo.test.mjs
git commit -m "feat: build Boracay landing funnel"
```

---

### Task 6: Add lessons, rentals and storage, and kite safari pages

**Files:**
- Create: `content/water-pages.ts`
- Create: `components/breadcrumbs.tsx`
- Create: `components/page-hero.tsx`
- Create: `components/service-page.tsx`
- Create: `components/service-page.module.css`
- Create: `app/kitesurfing-lessons/page.tsx`
- Create: `app/rentals-storage/page.tsx`
- Create: `app/kite-safaris/page.tsx`
- Modify: `tests/routes-and-seo.test.mjs`

**Interfaces:**
- Consumes: `buildMetadata`, `JsonLd`, `ContactCta`, `siteImages`, and site shell.
- Produces: `ServicePageContent`, `waterPages`, visible breadcrumbs, service JSON-LD, breadcrumb JSON-LD, and FAQ JSON-LD.

- [ ] **Step 1: Add failing tests for the three water-service routes**

Add:

```js
const waterRoutes = [
  ["/kitesurfing-lessons/", /Learn to kitesurf in Boracay/, /Your first lesson starts on the beach/],
  ["/rentals-storage/", /Rent kite gear on Bulabog Beach/, /Store your gear by the spot/],
  ["/kite-safaris/", /Kite safaris from Boracay/, /Routes follow the wind/],
];

for (const [route, heading, proof] of waterRoutes) {
  test(`${route} exports useful service content`, async () => {
    const html = await readRoute(route);
    const text = visibleText(html);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
    assert.match(text, heading);
    assert.match(text, proof);
    assert.match(html, /aria-label="Breadcrumb"/i);
    assert.match(JSON.stringify(jsonLdBlocks(html)), /Service/);
    assert.match(JSON.stringify(jsonLdBlocks(html)), /BreadcrumbList/);
  });
}
```

Import `jsonLdBlocks` at the top of the test file.

- [ ] **Step 2: Build and confirm all three route tests fail**

Run: `npm run build && node --test --test-name-pattern="service content" tests/routes-and-seo.test.mjs`

Expected: FAIL with `ENOENT` for the first missing route.

- [ ] **Step 3: Create the typed supporting-page contract and exact page copy**

Define:

```ts
export type ServicePageContent = {
  path: PublicRoute;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  image: SiteImage;
  context: ContactContext;
  schema: "service" | "guide" | "about";
  sections: readonly { heading: string; body: readonly string[] }[];
  faq: readonly { question: string; answer: string }[];
};
```

Populate `waterPages` with these fixed content anchors:

| Page | H1 | Lead | Required sections |
| --- | --- | --- | --- |
| Lessons | `Learn to kitesurf in Boracay` | `Start on the beach, then move into Bulabog's warm shallow lagoon. We teach the part you need next and keep the session matched to the conditions.` | `Your first lesson starts on the beach` explains wind, safety systems and kite control; `Get onto the board` covers body dragging, board starts and controlled riding; `Already riding` covers upwind riding, transitions and jumps without promising results; `Sessions follow the conditions` explains that timing follows safe wind and water conditions. |
| Rentals & storage | `Rent kite gear on Bulabog Beach` | `Tell us your level, dates and usual sizes. We'll check what fits the forecast and what is available, so you can leave the board bag at home.` | `Rent a setup for your session`; `Store your gear by the spot`; `Tell us how you ride`; `Check current gear and conditions`. |
| Safaris | `Kite safaris from Boracay` | `When the conditions line up, routes follow the wind, rider level and local water conditions. Ask us what is possible during your stay.` | `Routes follow the wind`; `Who the trip suits`; `What to bring`; `Ask before you plan around it`. |

Use these metadata descriptions:

- Lessons: `Kitesurfing lessons on Bulabog Beach, Boracay, with IKO and VDWS instructors for complete beginners, progressing riders and advanced kiters.`
- Rentals: `Rent kitesurfing equipment or store your own gear close to Bulabog Beach with Hangin Kite Center in Boracay.`
- Safaris: `Ask Hangin Kite Center about guided kite safaris from Boracay, planned around rider level, wind and local water conditions.`

Use these `metaTitle` values: `Kitesurfing Lessons in Boracay`, `Kite Rental & Storage in Boracay`, and `Kite Safaris from Boracay`.

Each page has three visible FAQs. Answers do not state prices, durations, guaranteed wind, named destinations, or availability.

Set `schema: "service"` on all three entries.

- [ ] **Step 4: Implement shared pages, breadcrumbs, and structured data**

`ServicePage` renders an outer `<main id="main-content">` containing:

- Visible breadcrumb `Home / Current page`.
- `PageHero` with eyebrow, H1, lead, contact CTA, and image.
- Each content section in source order.
- Visible FAQ disclosures.
- Final contact block with context-specific WhatsApp message.
- `Service` JSON-LD only when `content.schema === "service"`; its `provider` points to `${siteConfig.origin}/#kite-center`.
- `BreadcrumbList` JSON-LD.
- `FAQPage` JSON-LD only when the FAQ array is non-empty, matching the visible questions and answers byte-for-byte.

Every route file exports static metadata and renders its matching entry. For example, `app/kitesurfing-lessons/page.tsx` is:

```tsx
import { ServicePage } from "@/components/service-page";
import { waterPages } from "@/content/water-pages";
import { buildMetadata } from "@/lib/seo";

const content = waterPages.lessons;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function KitesurfingLessonsPage() {
  return <ServicePage content={content} />;
}
```

The rentals route binds `waterPages.rentals`; the safari route binds `waterPages.safaris`. No route file uses request data or `generateMetadata`.

- [ ] **Step 5: Pass the water-page tests**

Run: `npm run lint && npm run typecheck && npm run build && node --test --test-name-pattern="service content" tests/routes-and-seo.test.mjs`

Expected: 3 PASS.

- [ ] **Step 6: Commit the water-service pages**

```bash
git add content/water-pages.ts components/breadcrumbs.tsx components/page-hero.tsx components/service-page.tsx components/service-page.module.css app/kitesurfing-lessons app/rentals-storage app/kite-safaris tests/routes-and-seo.test.mjs
git commit -m "feat: add kitesurf service pages"
```

---

### Task 7: Add accommodation, shop, Boracay, about, and contact pages

**Files:**
- Create: `content/island-pages.ts`
- Create: `app/accommodation/page.tsx`
- Create: `app/shop/page.tsx`
- Create: `app/kitesurfing-boracay/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Modify: `tests/routes-and-seo.test.mjs`

**Interfaces:**
- Consumes: `ServicePage`, `ServicePageContent`, shared metadata, and contact primitives.
- Produces: the remaining five public content routes.

- [ ] **Step 1: Add failing tests for the island and business routes**

Add:

```js
const islandRoutes = [
  ["/accommodation/", /Stay close to Boracay's kite beach/, /Wake up, check the water/],
  ["/shop/", /Kite gear and beach essentials in Boracay/, /Ask what is on the rack today/],
  ["/kitesurfing-boracay/", /Kitesurfing on Boracay/, /The kite side of the island/],
  ["/about/", /On the beach since 2002/, /Hangin began as a kite school/],
  ["/contact/", /Tell us when you're coming/, /Your dates and riding level/],
];

for (const [route, heading, proof] of islandRoutes) {
  test(`${route} exports specific local content`, async () => {
    const html = await readRoute(route);
    const text = visibleText(html);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
    assert.match(text, heading);
    assert.match(text, proof);
    assert.match(html, /aria-label="Breadcrumb"/i);
  });
}
```

- [ ] **Step 2: Build and confirm the route tests fail**

Run: `npm run build && node --test --test-name-pattern="specific local content" tests/routes-and-seo.test.mjs`

Expected: FAIL with `ENOENT` for `/accommodation/index.html`.

- [ ] **Step 3: Add exact content anchors and metadata**

Populate `content/island-pages.ts`:

| Page | H1 | Lead | Required sections |
| --- | --- | --- | --- |
| Accommodation | `Stay close to Boracay's kite beach` | `Wake up, check the water and carry less. Ask us what is available for your dates near Bulabog Beach.` | `Stay near Bulabog Beach`; `A base for the whole trip`; `Room details for your dates`; `Plan the stay around your trip`. |
| Shop | `Kite gear and beach essentials in Boracay` | `For a spare part, replacement piece or something you left at home, ask what is on the rack today.` | `Gear for the current season`; `The bits that save a session`; `Stock changes`; `Message before crossing the island`. |
| Boracay | `Kitesurfing on Boracay` | `Bulabog Beach is the wind-facing side of the island. Warm water, a shallow lagoon and the Amihan season make it the place Boracay riders come to kite.` | `The kite side of Boracay`; `When to come` states roughly November to April and no wind guarantee; `Learning in the lagoon`; `White Beach and the rest of the island`. |
| About | `On the beach since 2002` | `Hangin started as a kite school and grew around the people who came to learn, ride, stay and return.` | `Hangin began as a kite school`; `How we teach`; `Lessons, gear, storage, stays and trips` lists confirmed services; `Come by when you reach Bulabog`. |
| Contact | `Tell us when you're coming` | `Send your dates, riding level and what you need. We'll reply with what makes sense for the current conditions.` | `Your dates and riding level`; `Find us on Bulabog Beach`; `WhatsApp`; `Email`. No form. |

Metadata descriptions:

- Accommodation: `Ask about accommodation near Bulabog Beach and stay close to Hangin Kite Center and Boracay's main kitesurfing spot.`
- Shop: `Check current kite gear, accessories and beach essentials at Hangin Kite Center on Bulabog Beach, Boracay.`
- Boracay: `Plan a Boracay kitesurfing trip with practical information about Bulabog Beach, Amihan season, the lagoon and lessons.`
- About: `Hangin Kite Center has taught kitesurfing on Bulabog Beach, Boracay, since 2002 and offers lessons, gear, storage, stays and safaris.`
- Contact: `Contact Hangin Kite Center on WhatsApp or email about lessons, rental, storage, accommodation, the shop or kite safaris in Boracay.`

Use these `metaTitle` values in route order: `Accommodation Near Bulabog Beach`, `Kite Shop in Boracay`, `Kitesurfing in Boracay`, `About Hangin Kite Center`, and `Contact Hangin Kite Center`.

Set `schema: "service"` for accommodation and shop, `schema: "guide"` for Boracay, and `schema: "about"` for about. Accommodation, shop, and about use empty FAQ arrays. Boracay uses these three visible questions: `When is the Boracay kite season?`, `Is Bulabog suitable for beginners?`, and `Is the wind guaranteed?`; the final answer states that wind changes and visitors should check current conditions with the center.

- [ ] **Step 4: Implement the five routes**

Use `ServicePage` for accommodation, shop, Boracay, and about. Use a dedicated `<main id="main-content">` contact layout that keeps WhatsApp and email visible as real anchor elements and lists what information to send. The contact route must not add a form, map embed, opening hours, or address detail beyond Bulabog Beach, Boracay, Philippines.

Use generated stay art for accommodation, generated gear art for shop, authentic aerial proof for Boracay, authentic riding proof for about, and a type-led composition without a decorative image for contact.

- [ ] **Step 5: Pass all route content tests**

Run: `npm run lint && npm run typecheck && npm run build && node --test tests/routes-and-seo.test.mjs`

Expected: all homepage, water-route, and island-route tests PASS.

- [ ] **Step 6: Commit the island and business routes**

```bash
git add content/island-pages.ts app/accommodation app/shop app/kitesurfing-boracay app/about app/contact tests/routes-and-seo.test.mjs
git commit -m "feat: add Boracay and visitor pages"
```

---

### Task 8: Complete the crawl, social, icon, and structured-data surface

**Files:**
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/manifest.ts`
- Delete: `app/favicon.ico`
- Modify: `public/brand/mark.svg`
- Create: `app/icon.svg`
- Create: `app/apple-icon.png`
- Create: `app/opengraph-image.jpg`
- Modify: `tests/routes-and-seo.test.mjs`

**Interfaces:**
- Consumes: `publicRoutes`, `absoluteUrl`, the proof-image inventory, and all built pages.
- Produces: complete crawl files, static icons, shared OG image, and cross-route SEO guarantees.

- [ ] **Step 1: Add failing cross-route SEO tests**

Add these checks:

```js
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { linkHref, metaContent, outDir, publicRoutes, title } from "./export-helpers.mjs";

test("every public route has unique complete metadata", async () => {
  const seenTitles = new Set();
  const seenDescriptions = new Set();
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const pageTitle = title(html);
    const description = metaContent(html, "name", "description");
    assert.ok(pageTitle && pageTitle.length >= 25 && pageTitle.length <= 65, `${route} title`);
    assert.ok(description && description.length >= 100 && description.length <= 165, `${route} description`);
    assert.ok(!seenTitles.has(pageTitle), `${route} duplicate title`);
    assert.ok(!seenDescriptions.has(description), `${route} duplicate description`);
    seenTitles.add(pageTitle);
    seenDescriptions.add(description);
    assert.equal(linkHref(html, "canonical"), new URL(route, "https://www.hanginkitecenter.com").toString());
    assert.equal(metaContent(html, "name", "robots"), "index, follow");
  }
});

test("sitemap and robots cover the exact public surface", async () => {
  const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8");
  const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
  for (const route of publicRoutes) {
    assert.match(sitemap, new RegExp(new URL(route, "https://www.hanginkitecenter.com").toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(robots, /User-Agent: \*\s+Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/www\.hanginkitecenter\.com\/sitemap\.xml/i);
});

test("social and icon assets are exported", async () => {
  await Promise.all([
    access(path.join(outDir, "opengraph-image.jpg")),
    access(path.join(outDir, "icon.svg")),
    access(path.join(outDir, "apple-icon.png")),
  ]);
});
```

Export `publicRoutes` from `tests/export-helpers.mjs` with the same nine values as `content/site.ts`. Keeping a test-local route list ensures a missing application route cannot hide itself by disappearing from both the sitemap and the test data.

- [ ] **Step 2: Build and verify the SEO suite fails**

Run: `npm run build && node --test --test-name-pattern="metadata|sitemap|social" tests/routes-and-seo.test.mjs`

Expected: FAIL because the sitemap still contains only the homepage and social/icon files are incomplete.

- [ ] **Step 3: Generate the static social image and icons**

Create `public/brand/mark.svg` if Task 4 used a co-located draft, then copy the final mark to `app/icon.svg`. Generate a 180×180 apple icon from the SVG with:

```bash
sips -s format png -z 180 180 public/brand/mark.svg --out app/apple-icon.png
```

Create the OG image from the authentic CC0 school proof image:

```bash
sips -s format jpeg -c 630 1200 public/images/proof/boracay-kitesurf-school.webp --out app/opengraph-image.jpg
```

Inspect both generated files. The OG crop must contain water, kites, and people without cutting the central subject at the edges. If the centered crop fails that visual check, use `sips --cropOffset` with measured pixel offsets and rerun until it passes.

Remove the old default `app/favicon.ico` only after `app/icon.svg` and `app/apple-icon.png` are present and verified.

- [ ] **Step 4: Finalize robots, sitemap, and manifest**

`app/robots.ts` returns:

```ts
{
  rules: { userAgent: "*", allow: "/" },
  sitemap: "https://www.hanginkitecenter.com/sitemap.xml",
  host: "https://www.hanginkitecenter.com",
}
```

`app/sitemap.ts` maps the nine fixed `publicRoutes` to absolute URLs, uses `lastModified: new Date("2026-08-29")`, assigns priority `1` to `/`, `0.9` to lessons and Boracay, and `0.7` to the remaining routes. Use `monthly` change frequency for content pages and `weekly` for the homepage.

`app/manifest.ts` uses the approved colors and exact fields:

```ts
{
  name: "Hangin Kite Center",
  short_name: "Hangin",
  description: "Kitesurfing lessons, rental, storage, accommodation, shop and kite safaris on Boracay.",
  start_url: "/",
  display: "standalone",
  background_color: "#fffdf6",
  theme_color: "#073642",
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  ],
}
```

- [ ] **Step 5: Pass the full SEO suite**

Run: `npm run build && node --test tests/routes-and-seo.test.mjs`

Expected: all route, metadata, sitemap, robots, social asset, H1, breadcrumb, and JSON-LD tests PASS.

- [ ] **Step 6: Commit the technical SEO surface**

```bash
git add app/robots.ts app/sitemap.ts app/manifest.ts app/icon.svg app/apple-icon.png app/opengraph-image.jpg public/brand/mark.svg tests/export-helpers.mjs tests/routes-and-seo.test.mjs
git add -u app/favicon.ico
git commit -m "feat: complete static SEO surface"
```

---

### Task 9: Run the anti-slop, accessibility, link, and visual quality gate

**Files:**
- Create: `tests/content-style.test.mjs`
- Modify: any page, content, component, or CSS file that fails the checks
- Modify: `README.md`

**Interfaces:**
- Consumes: complete static export.
- Produces: verified final site and documented local verification workflow.

- [ ] **Step 1: Add the failing-or-passing copy and link quality tests**

Before changing public copy, read `/Users/saltychris/.agents/skills/no-ai-slop/SKILL.md` and `/Users/saltychris/.agents/skills/no-ai-slop/eval.md` completely. Audit the rendered text by named pattern, preserve strong Hangin-specific lines, and make only the edits that solve a real problem. The automated list below catches repeat offenders; it does not replace the human read.

Create `tests/content-style.test.mjs`:

```js
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { attribute, jsonLdBlocks, outDir, publicRoutes, readRoute, tags, visibleText } from "./export-helpers.mjs";

const banned = [
  /\bvibrant\b/i,
  /\bseamless\b/i,
  /\bshowcase\b/i,
  /\benhance\b/i,
  /\bpivotal\b/i,
  /\btestament\b/i,
  /\bdelve\b/i,
  /\bfoster\b/i,
  /\bleverage\b/i,
  /\butilize\b/i,
  /\bfacilitate\b/i,
  /\bempower\b/i,
  /\bstreamline\b/i,
  /\brobust\b/i,
  /\bcutting[- ]edge\b/i,
  /\bgame[- ]changer\b/i,
  /\btapestry\b/i,
  /\brealm\b/i,
  /\bbeacon\b/i,
  /\bmultifaceted\b/i,
  /\bmeticulous\b/i,
  /\bintricate\b/i,
  /\bparamount\b/i,
  /\btransformative\b/i,
  /\belevate\b/i,
  /\bembark\b/i,
  /\bsupercharge\b/i,
  /\bever[- ]evolving\b/i,
  /\bharness (?:the (?:power|potential)|your potential)\b/i,
  /\bnot just\b/i,
  /\bit(?:'|’)s (?:worth|important) to note\b/i,
  /\b(?:let(?:'|’)s dive in|at the end of the day)\b/i,
  /\b(?:stands as a testament|marks a pivotal moment|plays a vital role)\b/i,
  /—/,
  /\bbook now\b/i,
  /\blimited spots?\b/i,
];

test("public copy follows the Hangin voice", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const metadata = tags(html, "meta").map((tag) => attribute(tag, "content")).filter(Boolean);
    const altText = tags(html, "img").map((tag) => attribute(tag, "alt")).filter(Boolean);
    const copy = [visibleText(html), ...metadata, ...altText, JSON.stringify(jsonLdBlocks(html))].join(" ");
    for (const pattern of banned) assert.doesNotMatch(copy, pattern, `${route}: ${pattern}`);
  }
});

test("every local link resolves in the static export", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const hrefs = tags(html, "a").map((tag) => attribute(tag, "href")).filter(Boolean);
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/#")) continue;
      const clean = href.split("#")[0].split("?")[0];
      const target = clean === "/" ? path.join(outDir, "index.html") : path.join(outDir, clean.replace(/^\//, ""), "index.html");
      await access(target);
    }
  }
});

test("images have explicit dimensions and alt attributes", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    for (const image of tags(html, "img")) {
      assert.ok(attribute(image, "src"), `${route} image src`);
      assert.ok(attribute(image, "width"), `${route} image width`);
      assert.ok(attribute(image, "height"), `${route} image height`);
      assert.notEqual(attribute(image, "alt"), undefined, `${route} image alt`);
    }
  }
});
```

- [ ] **Step 2: Run the complete automated gate and fix real failures**

Run: `npm run verify`

Expected: lint PASS, typecheck PASS, static build PASS, all Node tests PASS. If a failure appears, change the smallest responsible file and rerun the failing command before rerunning `npm run verify`.

- [ ] **Step 3: Run the full-page anti-slop review**

Read each exported page as one complete draft, including its title, description, alt text, labels, and JSON-LD. Apply `/Users/saltychris/.agents/skills/no-ai-slop/eval.md` directly. Name each failing pattern and make the minimum effective edit. In particular, reject copy that could move unchanged to another kite school, repeated question-answer hooks, stacked fragments, robotic section symmetry, fake importance, vague attribution, and recap endings. Preserve specific Hangin lines and real kitesurfing terms such as `harness`.

- [ ] **Step 4: Serve the actual export and inspect responsive layouts**

Run `npm run preview` in a unified terminal session and keep its session ID for the browser checks.

Before browser QA, read `/Users/saltychris/.codex/plugins/cache/openai-bundled/browser/26.825.31414/skills/control-in-app-browser/SKILL.md` completely and announce that it is being used for local responsive verification. Use the in-app browser at these viewport widths:

- 390×844: mobile navigation, hero, service rows, FAQ disclosures, and footer.
- 768×1024: tablet wrapping and image crops.
- 1366×768: laptop hero visibility and headline line length.
- 1536×960: wide-screen content width and negative space.

At every width, verify no horizontal scrolling, no text-image collision, readable navigation, visible focus states, and no more than three headline lines in the hero. Reject generic card walls, pill-shaped content UI, repeated section templates, centered paragraph walls, decorative motion, or pressure-based calls to action. Use screenshots for side-by-side review.

- [ ] **Step 5: Run keyboard and reduced-motion checks**

With the browser:

1. Tab from the address bar and confirm the skip link becomes visible.
2. Activate the skip link and confirm focus reaches `#main-content`.
3. Open and close the native mobile menu using only the keyboard.
4. Traverse every header, service, FAQ, WhatsApp, email, and footer control in a logical order.
5. Emulate `prefers-reduced-motion: reduce` and confirm all content remains available without transition dependence.

- [ ] **Step 6: Inspect exported SEO and static behavior manually**

Run:

```bash
rg -n '<title>|name="description"|rel="canonical"|application/ld\+json' out/index.html out/*/index.html
rg -n 'cookies\(|headers\(|searchParams|use client|Server Action' app components content lib
find out -type f | sort
```

Expected:

- Every public page has a unique title, description, canonical, and JSON-LD where planned.
- No request-time API or Client Component appears.
- The export includes exactly the nine public pages plus technical assets and 404.

- [ ] **Step 7: Document final operation and image replacement**

Update `README.md` with:

- `npm ci`
- `npm run dev`
- `npm run verify`
- `npm run build` and the `out/` deployment directory
- Current WhatsApp/email configuration location: `content/site.ts`
- Image record location: `content/images.ts`
- Attribution record: `public/images/ATTRIBUTION.md`
- Future booking switch point: `ContactCta` plus `getWhatsAppUrl`
- DNS pre-launch check for `www.hanginkitecenter.com`

- [ ] **Step 8: Run final verification from a clean build**

Run: `npm run verify && git diff --check && git status --short`

Expected: all checks PASS; `git diff --check` prints nothing; status contains only the intentional Task 9 files.

- [ ] **Step 9: Commit the verified site**

```bash
git add tests/content-style.test.mjs README.md
git commit -m "test: verify static site quality"
```

After the commit, invoke `superpowers:verification-before-completion`, then `superpowers:requesting-code-review`. Do not report completion until both workflows pass and the final `npm run verify` output is current.
