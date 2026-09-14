# Website investigation and repairs, 2026-09-13

Status: Current implementation and verification record

## Scope and authorization

The owner requested domain investigators to review performance, SEO, GEO and privacy, search for the best suitable skills, and directly implement focused fixes. Three subagents handled performance, technical SEO followed by GEO, and privacy/security. The coordinator reviewed their changes, updated shared project documentation and ran the combined verification.

Base revision: `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f`.
Branch: `codex/site-investigators-2026-09-13`.
Worktree: `/Users/saltychris/.codex/worktrees/hangin-investigators-2026-09-13`.

The original checkout was being changed by a separate `codex/google-maps-embed` task. This investigation moved to an isolated worktree before its agents edited files. Those concurrent map changes are excluded from this report and remain untouched. The audited preview is the static export of this branch, not the other task's development server.

## Implemented changes

| Area | Finding and repair | Skill decision | Detailed evidence |
| --- | --- | --- | --- |
| Performance | High-density phones selected oversized hero images. Five local 1200px WebP candidates fill the gap between mobile and full-size files. Existing originals, crops, priority and local delivery remain intact. | Searched and installed the reviewed official Vercel React Best Practices skill. No project dependency changed. | [Performance investigation](2026-09-13-performance-investigation.md) |
| SEO | Terms and Accessibility had visible breadcrumbs without matching structured data. Added the existing BreadcrumbList pattern and a cross-route parity test. | Searched alternatives and retained the installed SEO audit workflow. | [SEO investigation](2026-09-13-seo-investigation.md) |
| GEO | Practical Boracay answers lacked visible source links; About's contact paragraph was generic. Added the existing tourism sources and direct trip/contact guidance using the confirmed one-day reply commitment. | Searched alternatives and retained the installed TLC GEO workflow, with no-ai-slop for public copy. | [GEO investigation](2026-09-13-geo-investigation.md) |
| Privacy/security | No third-party requests or storage were observed, but the auditors missed browser reporting/attribution headers. Added static and deployed checks, redacted findings and focused fixtures. | Reviewed privacy/security skill candidates; existing project auditors, Playwright and primary standards were a better fit. | [Privacy/security investigation](2026-09-13-privacy-security-audit.md) |

Local mobile lab medians improved from 3.372s to 2.236s for the Lessons image LCP and from 5.288s to 3.208s for Boracay. Selected image bytes fell by 47.9% and 53.3%, respectively. The other three retained candidates reduced selected image bytes by 51.4–56.2%. The homepage remained effectively unchanged and its unused experimental candidate was removed. These are lab observations with an uncompressed preview server, not field Core Web Vitals or CDN transfer claims.

The existing seventeen indexable URLs, four noindex holding pages, metadata/canonicals, direct WhatsApp contact path and static export architecture remain intact. No new business fact, tracking system, runtime third-party code, CMS or server capability was introduced.

## Verification

- Initial and isolated baseline `npm run verify`: exit 0, 140 tests, no static privacy findings.
- SEO round `npm run verify`: exit 0, 141 tests, no static privacy findings.
- The image round built successfully but its new test caught two shortened attribution paths. The ledger was corrected to use the exact public URLs. Assertions were preserved.
- Final combined `npm run verify`: exit 0, lint, typecheck, fresh Turbopack production export, all 148 Node tests, and static privacy audit with no findings. Log: `/tmp/hangin-investigators-final-verify.log`.
- Independent review found no code blockers in responsive image handling, derivative dimensions/provenance, SEO breadcrumbs or GEO content. The coordinator reviewed the privacy changes and requested a repeated-CSP-header regression; the final detector handles comma-separated policy lists and semicolon-separated directives.

- All 66 page/viewport checks passed across 21 public routes plus the 404 at 320, 390 and 1440 pixels: no document overflow, offscreen content, broken images or runtime errors. Screenshots/results: `/tmp/hangin-investigators-browser/`. Representative changed content and image layouts were visually reviewed.
- All 44 axe checks at 390 and 1440 pixels reported no WCAG A/AA violations. Results: `/tmp/hangin-investigators-axe.json`.
- Boracay arrivals from the homepage, footer, safari and calculator, calculator results, reduced motion, and no-JavaScript menu/contact navigation passed. Flow command exited 0; log: `/tmp/hangin-investigators-flows.log`.
- The deployed audit against the final local preview exited 0 with no findings. Evidence: `/tmp/hangin-investigators-deployed-preview.json`. This does not verify live hosting headers.
- Documentation target checks and `git diff --check` passed. `AGENTS.md`, production dependencies and lockfile are unchanged.

## Sources and limits

Domain reports record dated skill source/adoption/security reviews, official references, commands and measurements. The actual environment is Node 26.3.0, npm 11.18.0 and macOS 26.5.1; Chrome performance measurements used version 152.0.7977.83. No proposed CI or performance-budget brief was silently accepted.

Both public hostnames failed DNS resolution from this environment. Live HTTPS, CDN caching/compression, redirects, response headers, real 404 delivery, crawler access and field performance remain unverified. Python preview does not apply Cloudflare's `_headers`. No DNS, hosting, account, indexing-submission or production deployment action was performed. Firefox, WebKit, physical-device and screen-reader testing are outside this run. Automated accessibility evidence does not establish conformance.

Repository changes are authorized by the owner's direct repair request. This work is kept on the investigation branch for integration with the separate map task; it is not merged into or pushed to GitHub main by this investigation.


## Changed files

- `app/accessibility/page.tsx`
- `app/terms/page.tsx`
- `components/responsive-image.tsx`
- `content/boracay-guide.ts`
- `content/images.ts`
- `content/island-pages.ts`
- `docs/README.md`
- `docs/operations/2026-09-13-geo-investigation.md`
- `docs/operations/2026-09-13-multi-investigator-review.md`
- `docs/operations/2026-09-13-performance-investigation.md`
- `docs/operations/2026-09-13-privacy-security-audit.md`
- `docs/operations/2026-09-13-seo-investigation.md`
- `docs/project/architecture.md`
- `docs/project/content-and-design.md`
- `docs/project/development-and-operations.md`
- `docs/project/owner-media.json`
- `docs/project/seo-accessibility-media.md`
- `public/images/ATTRIBUTION.md`
- `public/images/generated/island-stay-sunprint-1200.webp`
- `public/images/generated/kite-safari-sunprint-1200.webp`
- `public/images/owner/colorful-kites-above-bay-and-green-hillside-1200.webp`
- `public/images/owner/group-portrait-outside-hangin-kite-center-1200.webp`
- `public/images/owner/two-smiling-people-with-kite-control-bar-in-shallows-1200.webp`
- `scripts/README.md`
- `scripts/audit-deployed-privacy.mjs`
- `scripts/privacy-audit.mjs`
- `tests/deployed-privacy.test.mjs`
- `tests/geo-content.test.mjs`
- `tests/performance-contract.test.mjs`
- `tests/privacy-audit.test.mjs`
- `tests/routes-and-seo.test.mjs`
