# Boracay places and activities sources

Status: Current
Accessed: 2026-09-08

## Scope and ownership

The owner requested places to visit, things to do and useful search-oriented content under the Boracay page on 2026-09-08. This task adds a summary section to the existing spot page and a child at `/kitesurfing-boracay/things-to-do/`. It does not accept or implement the broader proposed SEO roadmap.

`content/boracay-guide.ts` owns the original public copy. The guide covers island geography and activity categories, not current excursions or stock. Hangin business facts remain owned by [product.md](product.md). No additional Hangin service or partnership is inferred from external evidence.

## Fact map

| Source | Facts used | Limits |
| --- | --- | --- |
| [Philippine Department of Tourism, Boracay](https://www.tourism.gov.ph/destination/western-visayas/boracay/) | White Beach walks, sunset paraw sailing, island tours and snorkeling | No current departure, price, itinerary or operator endorsement |
| [DOT Australia and New Zealand, Boracay](https://www.tourismphilippines.com.au/where/boracay) | D'Mall at Station 2 in central White Beach, shops and food, Willy's Rock near Station 1, airport and boat transfer geography | Published fares, transfer times, entry rules and awards are omitted; they are not maintained here |
| [Travel Philippines, Diniwid and quieter beaches](https://app.philippines.travel/articles/discover-diniwid-and-boracay-s-quiet-getaways) | Diniwid beyond Station 1, back-road/tricycle access, Puka shells and coarser sand, tricycle access | Article dated 2020. No guarantee of quiet, safe swimming or current coastal-path accessibility |
| [Shangri-La Boracay, transport](https://www.shangri-la.com/boracay/boracayresort/about/local-guide/explore-boracay/transportation/) | Tricycles as common island transport and paraw sailboats | Resort shuttle and fare information do not apply to Hangin |
| [TPB Boracay brochure](https://www.tpb.gov.ph/wp-content/uploads/2023/10/Boracay-Information.pdf) and [tourist map](https://www.tpb.gov.ph/wp-content/uploads/2023/10/Boracay-Map.pdf) | White Beach station orientation and Puka in the north | Research agent retrieved indexed text; direct PDF opens failed. Map dated April 2020. Stable geography only |
| [Existing spot-guide sources](boracay-spot-guide-sources.md) and [confirmed product facts](product.md) | Bulabog, Hangin lessons, Amihan, airport choices, rental and storage | No duplicated wind forecast or new service promise |

The Philippine Airlines guide was also found by research, but direct retrieval returned a JavaScript shell. The live-readable DOT page and existing spot-guide sources support the limited airport comparison used in copy instead.

Day plans, meeting-point suggestions, checking a fare, leaving transfer time and asking operators about equipment are editorial planning advice. They are not researched package itineraries. The copy tells visitors to confirm current conditions and service details with the relevant operator.

Public source links sit with the relevant guide sections. No external images were imported; the existing licensed Bulabog proof image retains its honest alt text and attribution. Source prose was paraphrased into original copy, with short factual use from each page.

## Implementation and review scope

- Existing feature branch: `codex/homepage-hero`. Base/head revision: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; task changes are uncommitted.
- The checkout already had owner changes. Baseline copies, initial status and task-only review evidence are under `/private/tmp/hangin-things-to-do-20260908/`.
- New route, typed content, editorial CSS, places section and focused guide-contract tests; small additions to shared breadcrumbs/template, navigation labels, route list and sitemap dates. Current documentation updated.
- No production dependency, runtime script, CMS or deployment configuration added. Existing static export and contact adapter retained.
- Installed Next.js 16.3.3 docs read: `01-app/01-getting-started/03-layouts-and-pages.md`, `14-metadata-and-og-images.md`, `01-app/02-guides/static-exports.md`, and `01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` under `node_modules/next/dist/docs/`.
- User request authorizes the local addition; owner review remains pending. No push, merge or production deployment is part of this task.

## Verification, 2026-09-08

- `npm run lint` and `npm run typecheck`: exit 0. Final `npm run build -- --webpack`: exit 0, fresh static export including both the island guide and the concurrent kite-size-guide task. `npm test`: exit 0, 52/52 tests pass. The three new guide checks first failed for the absent places section and route, then passed against the fresh export.
- Default `npm run build` stalled after a confirmed Turbopack panic reporting a CSS worker creating a process, binding a port and receiving `Operation not permitted (os error 1)`. Interrupted with exit 130; supported webpack diagnostic path used without changing the project default.
- During integration, one webpack attempt exited 1 because the concurrent kite-size page was not yet in `PublicRoute`; a later test run exited 1 on its duplicate brand title. The owning task finished registration and corrected the title. The final combined build and tests above include those fixes.
- Independent read-only review found no actionable issues, including a follow-up on the photo-credit correction. No new skill or dependency installation was necessary.
- Visual inspection caught an existing mobile hero defect: a 100%-height image filled the overflow-hidden figure and clipped its caption. `.boracay .heroImage { height: auto; }` corrects the two Boracay pages. The installed Next.js `01-app/01-getting-started/12-images.md` guide was also consulted; no image source or provenance changed.
- Public copy was read end to end against the no-ai-slop evaluation. Final edits removed a filler sentence, a rhetorical question and unnecessary introductory wording. The exported copy scan passes.
- Final Chrome QA: exit 0, 24 responsive render checks across the ten pages in this task's surface. Both Boracay pages were checked at 320, 390, 860 and 1440 pixels with JavaScript disabled and reduced motion enabled. Local HTTP 200, one H1, no horizontal overflow or broken loaded images, 48-pixel primary targets, fully visible photo credits, jump navigation, skip focus, visible focus, native FAQs and mobile navigation passed. Axe A/AA scans reported zero violations on both Boracay routes; no browser page errors were reported. Screenshots and rendered text were inspected. This is not a WCAG conformance claim. Evidence: `/private/tmp/hangin-things-to-do-20260908/browser-report.json` and adjacent PNG/text files. Local preview and Chrome required sandbox escalation; both were permitted.
- Shared-file edits from the concurrent kite-size task were preserved. That task owns the new calculator client boundary and route; this task adds no client boundary. The combined site now has eleven public routes. Initial baseline snapshots and `task.diff` remain in the temporary evidence directory; final Boracay-only changes are recorded separately there.
- Production HTTP redirects, security/cache headers and custom-404 serving were not checked: this task does not deploy and no production host configuration is owned by the repository. Exported canonicals, sitemap, robots, 404 metadata and local link targets passed the artifact suite.
