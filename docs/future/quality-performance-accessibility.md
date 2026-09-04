# Future brief: quality, performance, and accessibility

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Make each release reproducible and provide evidence that all public routes work in real browsers, remain fast under the project budgets, and meet the accepted WCAG 2.2 AA target through automated regression checks plus manual review.

## Current boundary

The repository has linting, TypeScript checks, a static production export, and 40 Node tests covering route/artifact contracts, metadata, JSON-LD, links, contact destinations, headings, image records/provenance, selected contrast pairs, and public-writing rules.

Those tests read `out/`. Running `npm test` without a fresh build can pass stale HTML. They parse static artifacts and cannot establish computed layout, browser errors, accessible names, focus visibility, keyboard order, zoom/reflow, target size, screen-reader behavior, animation, or field performance.

There is no CI workflow, Playwright, axe, Lighthouse, visual regression, or deployed smoke suite. On 2026-09-04 lint and typecheck passed, a webpack export succeeded, and 40 tests passed. The default Turbopack build failed only in the restricted agent sandbox because internal worker process/port creation was denied; normal CI must test the default build.

## Quality model

Use layered evidence:

1. Static analysis: dependency install integrity, lint, and type checking.
2. Fresh artifact contracts: one clean production export followed by the existing tests.
3. Browser behavior: navigation, controls, errors, no-JavaScript paths, and accessibility tree.
4. Visual behavior: pinned responsive screenshots and reviewed diffs.
5. Performance: deterministic lab budgets, then field Core Web Vitals when privacy-approved data exists.
6. Manual accessibility: keyboard, zoom, contrast, reading order, content, and representative assistive technology.
7. Deployed HTTP behavior: status, redirects, TLS, headers, caching, metadata, and rollback.

No one layer substitutes for another.

## Deterministic test environment

- Pin Node 24 LTS to an exact patch in CI and record npm, browser, operating system/image, and lockfile revision.
- Use `npm ci` on an ephemeral clean checkout.
- Ensure old `.next` and `out` data cannot satisfy the run.
- Run lint, typecheck, one production build, then all tests against that exact `out/`.
- Package the exact artifact once with commit, manifest, sizes, and digest; reuse it through deployment.
- Use the default Next build. Adopt `--webpack` only if the same Turbopack restriction reproduces on the real runner and is recorded in an ADR.

The CI job must fail when the build did not create the expected artifact or when test inputs predate the source revision.

## Browser test scope

Adopt Playwright against a production-like static server serving the exact export. Run Chromium on every pull request; run Firefox and WebKit on main or nightly until the supported matrix is confirmed.

Required checks:

- Every one of the nine routes and the custom 404 loads without page or console errors.
- Internal links, header/footer navigation, current state, breadcrumbs, skip link, mobile menu, FAQ disclosures, WhatsApp, email, and telephone work.
- Core content and contact paths work with JavaScript disabled.
- Accessible names, roles, expanded/current states, landmarks, headings, and focus order are coherent.
- Focus is visible and never obscured by sticky content.
- There is no horizontal page overflow at 320, 390, 430, 768, 1366, and 1536 CSS pixels.
- Broken images, missing alternatives, inaccessible hidden content, and third-party request regressions fail.
- Route, canonical, sitemap, robots, and JSON-LD assertions run against fresh output.

Use `@axe-core/playwright` to catch deterministic WCAG A/AA regressions. Document excluded rules narrowly and with an owner/review date. Axe cannot prove conformance.

## Manual accessibility matrix

For every public template and complete interactive state, review:

- Keyboard-only use, reverse navigation, focus visibility, skip link, and no keyboard trap.
- 200 percent text resize and 400 percent zoom/reflow.
- WCAG text-spacing overrides without clipping or lost controls.
- Contrast for text, icons, focus, links, controls, disabled states, and content over imagery.
- DOM/visual reading order, headings, landmarks, labels, instructions, errors, and status messages.
- Useful versus decorative alternative text and behavior with images unavailable.
- Reduced motion, forced colors/high contrast, touch target spacing, and orientation.
- VoiceOver/Safari and one additional representative screen-reader/browser combination chosen by the owner.

Accessibility issues are triaged by user impact. A release cannot waive keyboard traps, inaccessible contact/booking/payment controls, missing required labels, invisible focus, unreadable content, or blocked zoom.

## Performance budgets

Initial lab budgets for the homepage are:

| Resource or metric | Target | Hard gate |
| --- | --- | --- |
| Modern JavaScript, compressed | At or below 150 KB | Owner exception above 175 KB |
| CSS, compressed | At or below 15 KB | Owned exception required |
| Preloaded fonts | At or below 80 KB | Owned exception required |
| Selected LCP image | At or below 150 KB | Owned exception required |
| Initial compressed transfer | At or below 400 KB | Owned exception required |
| Runtime third-party scripts | Zero | Accepted purpose/privacy/performance decision |

Measure route-specific budgets when booking, commerce, maps, or media add different costs. Track the full asset manifest and largest regressions rather than a single Lighthouse score.

Once privacy-approved field data exists, target p75 Core Web Vitals for applicable page groups:

- LCP at or below 2.5 seconds.
- INP at or below 200 milliseconds.
- CLS at or below 0.10.

Treat lab and field results separately. Do not claim field performance from a local Lighthouse run.

## Visual regression

Capture all public routes at one mobile and one desktop size in a pinned browser/font environment, plus representative open menu/FAQ/focus states. Store reviewable baselines or CI artifacts according to repository size and privacy policy.

An image-diff threshold detects change; it does not approve it. Review the whole page, exact copy, crop, focus, overflow, loading failure, and nearby unaffected areas before accepting a baseline.

## Failure and exception policy

- Test failure caused by the change: fix the defect; do not weaken the assertion or extend arbitrary timeouts.
- Flaky check: quarantine only with a reproducible issue, owner, narrow scope, and expiry; keep equivalent release coverage.
- Browser/runner outage: do not claim full verification; retry within the defined limit and then report the missing evidence.
- Budget regression: block the release or approve a dated exception naming the user benefit, measured cost, owner, and removal/review date.
- Accessibility conflict with design: accessible behavior wins; revise the design record.
- Production smoke failure: stop rollout and restore the last known-good artifact.

## Acceptance criteria

- A clean CI run installs, lints, typechecks, builds, and runs all artifact tests in order; stale `out/` cannot pass.
- Browser tests cover all routes, 404, navigation, disclosures, contacts, JavaScript-disabled behavior, overflow, console errors, and accessibility-tree contracts.
- Axe A/AA scans have no unreviewed violation; manual WCAG 2.2 AA review has no release blocker.
- Responsive screenshots exist for all routes in a pinned environment and every changed baseline receives human review.
- Performance budgets are measured from the exact release artifact and enforced or covered by a dated owner exception.
- Field metrics are labeled as field data and segmented only in privacy-approved ways.
- Test results record commit, environment, commands, exit codes, artifact digest, failures, retries, exclusions, and skipped checks.
- The deployed artifact passes status, redirect, metadata, asset, header, and contact smoke checks.

## Decision gates

The owner must approve Node 24 LTS, supported browser/OS and assistive-technology matrix, WCAG 2.2 AA target, performance budgets, CI provider, visual-baseline storage, exception owners, field-measurement policy, and release-blocker severity rules.

## Dependencies

This proposed brief covers much of the Phase 0 quality scope and would remain continuous after acceptance and implementation. Deployment provides the production-like server and HTTP checks. Visual, localization, booking, analytics, and commerce topics add their own states to the shared matrix.

## Skills review

Existing test-driven development, systematic debugging, frontend, review, and verification skills cover the workflow. No additional skill is necessary now. Playwright, axe-core, and Lighthouse are established libraries to add through an approved implementation plan, not skills to install during documentation work.

## Primary references

- Node.js release schedule: <https://nodejs.org/en/about/previous-releases>
- Playwright CI: <https://playwright.dev/docs/ci>
- Playwright accessibility testing: <https://playwright.dev/docs/accessibility-testing>
- axe-core: <https://github.com/dequelabs/axe-core>
- Lighthouse CI: <https://github.com/GoogleChrome/lighthouse-ci>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Core Web Vitals: <https://web.dev/articles/vitals>
- WAI evaluating web accessibility: <https://www.w3.org/WAI/test-evaluate/>

Sources accessed 2026-09-04.
