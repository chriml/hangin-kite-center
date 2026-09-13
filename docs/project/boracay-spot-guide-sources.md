# Boracay spot guide sources

Status: Current research record
Accessed: 2026-09-08

## Scope and authority

The owner requested research across other kite schools and an informal guide for kiters. Public pages from five local operators were read and compared. The resulting text is original synthesis, not a compilation of their copy. No competitor photos, lesson packages or booking policies were reused.

The public copy lives in `content/island-pages.ts` under `boracay` and the homepage introduction in `components/spot-guide.tsx`. Existing business facts in [product.md](product.md) remain the authority for Hangin services, location and seasonal operation. Source access dates are research dates, not proof that a school has recently updated a page.

## Sources and use

| Source | Relevant evidence | Use in the guide |
| --- | --- | --- |
| [Isla, live wind and forecast](https://islakitesurfing.com/livewind/) | Northeast, side-onshore Amihan; variable season edges; southwest Habagat with less consistent wind and rain. | Broad seasonal pattern. No live reading, numerical wind range or forecast promise. |
| [Freestyle Academy, weather](https://freestyle-boracay.com/weather/) | November–April northeast season; June–October wind on the White Beach side. | Independent seasonal cross-check. |
| [Greenyard, wind check](https://www.gy-kite.com/wind-check) | November–April northeast monsoon; stronger mid-season wind. | Compass-direction and season cross-check. |
| [Habagat, Bulabog Beach](https://www.kiteboracay.com/bulabog-beach/) | Outer reef shelters the lagoon from swell. | Reef shelter, qualified by variable water conditions. |
| [Funboard Center, Bulabog Beach](https://www.windsurfasia.com/en/bulabog-beach) | Shallow areas, sea urchins, reef exposed at low water, chop inside and breaking waves on the reef. | Water conditions and bottom hazards. No directions through or across the reef. |
| [Funboard Center, reasons to kite there](https://www.windsurfasia.com/en/3-reasons-kitesurf-us-boracay) | Peak kite traffic; high water reduces room to rig, launch and land along parts of the beach. | Check launch space as well as depth; give other riders and lessons room. |
| [Habagat, homepage](https://www.kiteboracay.com/) | Seasonal move towards White Beach during southwest winds. | Corroborates the change of coast. Hangin's own movement is already owner-confirmed. |
| [Isla, Boracay information](https://islakitesurfing.com/boracay/) | Bulabog on the east side, White Beach on the west; Caticlan and Kalibo access via the mainland and boat. | Geographic orientation and broad arrival options only. |
| [Freestyle Academy, location](https://freestyle-boracay.com/location-on-boracay/) | Caticlan is closer to the jetty; Kalibo requires a longer road leg. | Arrival cross-check. No copied transfer durations, providers or prices. |
| [Isla, rental and equipment information](https://islakitesurfing.com/storage-rental-shop/) and [Freestyle Academy, FAQ](https://freestyle-boracay.com/frequently-asked-questions/) | Sun protection and rash clothing; warmer layers for people who feel cold. | General packing advice. Equipment inclusions and rental rules are specific to each school and were not reused. |

## Disagreements and excluded claims

- School wind ranges and peak-month descriptions differ. No average knots, probability of wind, fixed kite-size chart or daily-wind promise is published.
- Isla and Freestyle consistently identify Amihan as northeast. Habagat's homepage and Funboard's beach page label it northwest; that wording is rejected.
- Some pages describe permanently flat, waist-deep or universally safe water. Funboard also describes chop and tide limits. The guide explains variation instead of repeating those absolutes.
- Claims about a particular school's sandbank, quiet frontage, all-tide launch, rescue support, facilities or equipment do not describe Hangin.
- School pages place the season edges at different times. The guide retains Hangin's approximate November–April and June–October wording. It gives no fixed start date, alternate meeting point or unrestricted White Beach access claim.
- Reef observations support checking local depth and the bottom. Advice to leave launch space, give lessons room and check with the team is editorial guidance derived from these conditions, not a quoted local regulation or complete spot-safety briefing.
- Arrival advice omits timetables, fares, airline recommendations, luggage limits and immigration requirements. Visitors are directed to the airline for current baggage terms.
- [Ocean Republic's former domain](https://www.ocean-republic.com/) redirected to a domain-sale destination during research. It was not used as a spot source.
- Freestyle's newer Amihan article returned a verification screen. Its accessible weather, location and FAQ pages were used instead.

## Editorial and publication checks

Read the changed copy against the `no-ai-slop` evaluation: use riding vocabulary where useful, retain natural contractions, remove generic travel language, and avoid repetitive contact prompts or unsupported promises. The guide uses the existing typed page record and static rendering. No runtime scraping, feed, integration or dependency was added.

Recheck these sources and the local operating details before production publication. The owner owns final public-fact review; this change does not authorize deployment.

## Verification record, 2026-09-08

- Base and head revision: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, on the existing `codex/homepage-hero` branch. This task is uncommitted. The checkout already contained owner changes; task-only baseline copies and a diff were saved under `/private/tmp/hangin-spot-guide-20260908/` for review.
- Task files: `content/island-pages.ts`, `components/spot-guide.tsx`, `tests/routes-and-seo.test.mjs`, `docs/README.md`, `docs/project/product.md`, `docs/project/content-and-design.md`, and this source record. No styles, framework configuration, dependencies, other service records or image assets were changed by this task.
- The installed Next.js 16.3.3 guides `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` and `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` were read before editing. The existing static metadata adapter and export contract were retained.
- `npm run build` initially stalled and was stopped (exit 130). An early webpack attempt encountered that build's lock (exit 1). A later default build with escalation returned a fresh Turbopack CSS-worker error: creating a process required binding a port, denied with `Operation not permitted` (exit 1). The old panic log from September 5 was excluded as evidence for this run. Project build defaults were not changed.
- Final `npm run build -- --webpack`, `npm test`, `npm run lint`, `npm run typecheck`, and `git diff --check` all exited 0. All 41 tests passed against the fresh export. An initial test failure expected the removed generic guide sentence; the assertion now checks the researched lagoon-shelter fact, while retaining its title, H1 and breadcrumb checks.
- Chrome checks on `/` and `/kitesurfing-boracay/` passed at 320, 390, 860 and 1440 pixels. Both routes returned local HTTP 200; there was no horizontal overflow or broken loaded image, and primary contact targets met 48 pixels. Core content and contact anchors worked with JavaScript disabled. Skip-link focus, native FAQ keyboard activation and visible focus were checked with reduced-motion preference enabled.
- Axe checks for WCAG A/AA tags reported zero violations on the two affected pages; the browser reported no page errors. Screenshots and rendered main text were inspected, and the changed copy was read against the `no-ai-slop` evaluation. These checks are not a WCAG conformance claim. Browser evidence is in `/private/tmp/hangin-spot-guide-20260908/browser-report.json` and adjacent screenshots.
- Independent review found no important factual or traceability issue. Two repeated contact prompts were removed after review. Relative Markdown links resolve and the unchanged `AGENTS.md` is 12,481 bytes.
- Production HTTP behavior was not checked: this task made no deployment, and the local source changes are not on a production target. Owner review remains required before publication. No push, merge, production action or external message was performed.

## Separate kite size tool

The owner subsequently requested a weight/date/level calculator on 2026-09-08. The [kite size guide source record](kite-size-guide.md) documents the manufacturer chart used by that separate tool. The earlier exclusion of fixed size charts applies to the narrative spot guide; it does not treat the new calculator as a forecast or an on-the-day equipment decision.
