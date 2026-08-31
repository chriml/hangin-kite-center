# Task 8 Report: Static SEO Surface

## Scope

Completed the crawl, social, icon, manifest, and cross-route metadata surface for the nine public routes:

- `/`
- `/kitesurfing-lessons/`
- `/rentals-storage/`
- `/kite-safaris/`
- `/accommodation/`
- `/shop/`
- `/kitesurfing-boracay/`
- `/about/`
- `/contact/`

`app/sitemap.ts` derives this surface from `content/site.ts` and produces the required fixed date, frequency, and priority values. `app/robots.ts` allows the site, publishes the sitemap, and sets the canonical host. `app/manifest.ts` matches the approved identity, colors, and two icons.

## RED evidence

No raw Task 8 RED command output was available when this work was resumed, so no historical failure count is reported. The Task 8 brief and the base-to-working-tree diff establish the intended RED conditions: the previous sitemap listed only the homepage, the old manifest pointed to `favicon.ico`, and the shared social image and icon files were not present. The new cross-route tests specifically cover those conditions.

## GREEN evidence

- Focused command: `npm run build && node --test --test-name-pattern='metadata|sitemap|social' tests/routes-and-seo.test.mjs`
  - Build: passed.
  - Selected tests: 4 passed, 0 failed.
- Full command: `npm run verify`
  - ESLint: passed.
  - TypeScript: passed.
  - Production static build: passed, including `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `icon.svg`, `apple-icon.png`, and `opengraph-image.jpg`.
  - Test suite: 29 passed, 0 failed, 0 skipped.
- `git diff --check` and `git diff --cached --check`: passed.

## Exported crawl and social surface

All nine exported pages have distinct complete titles and descriptions, canonical URLs, `index, follow`, Open Graph image/alt, and Twitter image/alt. Both social channels resolve to the shared site asset and use the specific alt text: “Kitesurfers riding over turquoise water in Boracay.”

The homepage Open Graph URL includes Next's generated cache-busting query string, but its resolved pathname is `/opengraph-image.jpg`; the remaining route exports and every Twitter image use that absolute path directly. This is the framework's static metadata output and the cross-route social test verifies the resolved origin and pathname for every route.

The exported sitemap has exactly the nine public URLs, homepage weekly at priority 1, lessons and the Boracay guide at 0.9, and all remaining routes monthly at 0.7. The export's robots file contains `User-Agent: *`, `Allow: /`, the required host, and the required sitemap URL. The exported manifest exactly matches the approved identity, description, colors, and icon declarations.

## Image and icon QA

- `app/opengraph-image.jpg`: confirmed with `sips` as 1200 × 630.
- `app/apple-icon.png`: confirmed with `sips` as 180 × 180.
- `app/icon.svg`: byte-identical to `public/brand/mark.svg`.
- The controller had already visually reviewed the social crop and icon: turquoise water, multiple kites and riders, intact central subjects, and a legible mark were confirmed. No browser or computer-use tool was used during this completion pass.

## Title ruling

The guide's binding-plan anchor had `Kitesurfing in Boracay`, which generated the same full title as the homepage once the root title template was applied. Task 8 requires unique complete titles. The working tree changes only the guide meta title to `Boracay Kitesurfing Spot Guide`, producing `Boracay Kitesurfing Spot Guide | Hangin Kite Center` while preserving the homepage primary title `Kitesurfing in Boracay | Hangin Kite Center`.

This is a binding-plan contradiction: the older anchor conflicts with the later uniqueness requirement. The unique guide title is retained because it accurately describes the page as a Bulabog Beach trip-planning guide, maintains readable Boracay search language, and prevents two public routes from publishing an identical title.

## Concerns

None remaining within Task 8 scope. Historical RED output was unavailable, so its count is deliberately not inferred.
