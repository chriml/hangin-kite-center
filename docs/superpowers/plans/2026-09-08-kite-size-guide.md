# Boracay kite size guide implementation plan

Status: Current task plan
Date: 2026-09-08
Authority: Owner request in this task to add weight, visit timing and level inputs returning three possible kite setups. Implementation is authorized; public deployment is not.

## Design

Add `/kite-size-guide/` with one browser-only calculator inside a statically exported page. The existing ocean, sand and coral palette, Barlow Condensed display type and Manrope controls remain. An ocean introduction leads straight into a sand input panel and three flat result rows. Large kite sizes are the main visual element. Preserve DOM reading order and 48px controls.

Interpret three setups as one-, two-, and three-kite packing alternatives. Use Airush's published beginner/intermediate twin-tip weight × wind ranges directly, not an invented formula. Label numbers as ranges from which a size must be chosen, not promises of wind coverage. Travel dates produce season context; they do not generate a forecast or change the published wind chart. Level changes guidance without arbitrarily increasing power for advanced riders. Beginners need instructor-selected equipment. Limit automatic suggestions to adults 60–120kg; weights beyond the chart's practical scope receive a direct team-check result. The upper cutoff is a conservative tool scope, not an Airush rule.

Controls: weight in kg/lb, arrival and departure dates, and beginner/intermediate/advanced level. Validate required fields, finite weights, real dates and end ≥ start. All entered values stay in memory; no URL parameters, storage, analytics, request or personalized contact URL. Clear stale results on input changes. Retain static general guidance, source links and the existing generic WhatsApp/email adapter without JavaScript.

## Implementation and verification

- [x] Add failing Node tests for the published ranges, three distinct packing choices, weight boundaries/unit equivalence, cross-year and mixed seasons, levels and invalid input. Use Node's built-in TypeScript support for the self-contained typed calculator record.
- [x] Implement `content/kite-size-guide.ts` with typed input/output, source records, season logic and setup logic. Re-run focused tests.
- [x] Add `components/kite-size-calculator.tsx`, scoped CSS, and `app/kite-size-guide/page.tsx`. Use native validation and React state. Add export tests for labels, static fallback, truthful schema and contextual links.
- [x] Register the route in typed routes, route labels, independent route tests and sitemap date logic. Link from the homepage spot section; the shared footer/mobile navigation follow the route registry. Preserve concurrent/unrelated edits.
- [x] Record source evidence and browser boundary in current documentation. Do not mark unapproved future briefs Accepted.
- [x] Run lint, typecheck, fresh webpack export (baseline Turbopack port-binding failure confirmed), and complete Node tests. Inspect local HTTP, sitemap, robots, canonical and 404 artifacts.
- [x] Use existing temporary Playwright/axe installation to test desktop/mobile, form validation, input changes, three result states, keyboard focus, no-JS fallback, reduced motion, contrast and no data egress. Have an independent agent review this task's changes.

## Evidence baseline

Base revision: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Existing isolated branch: `codex/homepage-hero`; substantial unrelated edits were present and are preserved. Before-images for shared files are in `/tmp/hangin-kite-guide-before/`. No dependencies are added. Baseline lint/typecheck passed; default build failed because Turbopack could not bind an internal worker port (`Operation not permitted`).

Next.js 16.3.3 installed guides read: `01-app/01-getting-started/03-layouts-and-pages.md`, `05-server-and-client-components.md`, `14-metadata-and-og-images.md`, and `01-app/02-guides/static-exports.md` under `node_modules/next/dist/docs/`.


## Final verification

Base/head revision remains `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; changes are uncommitted on `codex/homepage-hero`. The concurrent Boracay island-guide task was coordinated so production exports did not overlap and its changes remain intact.

Task-owned new files: `content/kite-size-guide.ts`, `components/kite-size-calculator.tsx`, `components/kite-size-guide.module.css`, `app/kite-size-guide/page.tsx`, `tests/kite-size-guide.test.mjs`, `tests/kite-size-guide-export.test.mjs`, `docs/project/kite-size-guide.md`, `docs/decisions/0001-local-kite-size-calculator.md`, and this plan. Task-specific shared changes register the route/label/sitemap date, add the homepage spot link, and update current documentation/AGENTS for the client boundary. Other differences in the checkout predate this task or belong to the concurrent island guide.

Commands and outcomes on 2026-09-08:

- `npm run lint`: exit 0.
- `npm run typecheck`: exit 0.
- `npm run build -- --webpack`: exit 0; all 11 public routes exported.
- `npm test` after the final combined export: exit 0, 52/52 passing.
- `git diff --check`: exit 0; repository-relative documentation links resolve. AGENTS.md is approximately 12.5 KB.
- Independent read-only reviewer: no remaining actionable findings; source chart and focused unit tests verified.
- Existing temporary Playwright 1.63/Chrome and axe-core were used for browser review; no dependency was added. QA scripts and screenshots are under `/tmp/hangin-hero-qa/kite-guide-qa.cjs` and `/tmp/hangin-kite-guide-qa/`. Synthetic inputs cover normal/error/team-check states, dates crossing years/seasons, novice/advanced advice, kg/lb conversion at 80kg, stale-result clearing, keyboard submission/focus, no-JavaScript chart/contact, and absence of input storage/data egress.
- Calculator rendered at 320, 390, 768 and 1440px: no overflow, all form controls at least 48px high, zero axe WCAG A/AA findings. Reduced-motion handling and focus outlines checked. Public copy was read in full, including generated result states; no-ai-slop source and rendered-copy checks passed.
- Local HTTP: guide 200, missing route 404, slash normalization 301, robots/sitemap 200. Export inspected for one H1, self-canonical, sitemap membership, source links and custom noindex 404 artifact.

Skipped: production HTTP/header/custom-404 mapping checks, because no deployment or production host configuration was authorized. Python's local static preview verifies routing/status but does not establish production host headers or custom error-page mapping. Screen-reader and real-device assistive-technology conformance testing was not performed; automated checks are not a WCAG conformance claim.

Review corrections: removed the duplicate brand already supplied by the layout metadata template; increased kg/lb display precision after a failing browser regression showed that one-decimal pounds could move an 80kg rider into the next reference band. Both regressions now pass. Owner approval for publication is still pending; no commit, push, merge or deployment was performed.
