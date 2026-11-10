# Canonical host correction

Date: 2026-11-10
Branch: `fix/canonical-host`
Base: `8789f0bf732d8e99df2690a4652fdf69037b8c18`
Head: the commit containing this report; its parent is the base above.
Approval state: the owner requested the fix after the redirect mismatch was reported. Repository correction is authorized; production deployment and hosting changes are not authorized by this report.

## Problem and correction

Production redirects the HTTPS `www` host to `https://hanginkitecenter.com`. The prior source used `www` in canonicals, sitemap entries, robots' sitemap reference, social metadata and structured-data URLs. These signals disagreed about the preferred host. `content/site.ts` now uses the existing HTTPS apex host. Route paths, trailing slashes, indexability, contact destinations and the Content Signals policy are preserved. No redirect, DNS, hosting setting or dependency is changed.

The shared origin already feeds every affected output. Existing artifact tests now expect the apex host, with additional coverage of Open Graph page URLs and sitewide JSON-LD identifiers and URLs. Privacy and reviewed-embed test fixtures use the same origin, including the fixture that checks URL redaction. Current SEO and operations documentation reflects the correction. Older reports retain their historical observations.

Changed files: `content/site.ts`; `tests/routes-and-seo.test.mjs`, `tests/site-contract.test.mjs`, `tests/safari-trips.test.mjs`, `tests/static-export.test.mjs`, `tests/privacy-audit.test.mjs`, `tests/reviewed-embeds.test.mjs`; `docs/project/seo-accessibility-media.md`, `docs/project/development-and-operations.md`; this report.

## Live evidence before release

An independent read-only check used HTTPS GET requests at 17:23:33–35 UTC on 2026-11-10. Every curl command exited 0. Each `www` URL redirected once with 301 to the identical apex path. The apex responses were:

| Path | Status | Content type | Observation |
| --- | --- | --- | --- |
| `/` | 200 | `text/html` | Canonical still used `www`. |
| `/about/` | 200 | `text/html` | Canonical still used `www`. |
| `/robots.txt` | 200 | `text/plain` | Sitemap reference still used `www`; Content Signals absent. |
| `/sitemap.xml` | 200 | `application/xml` | All seventeen entries still used `www`. |
| `/__canonical-host-check-nonexistent-20261110__/` | 404 | `text/html` | Custom not-found page, `noindex`, no canonical. |

These are observations of the existing deployment, not evidence that this correction is live. The redirect behavior supports following the existing apex host instead of changing production redirect rules. It does not establish search indexing or ranking impact.

A read-only Cloudflare API check confirmed project `hangin-kite-center`, the custom domain `hanginkitecenter.com`, GitHub source `chriml/hangin-kite-center`, production branch `main` and automatic production deployments enabled. The configured build command is `npx next build`, with output `out` and the repository root as build root. Its successful production deployment `df76cbe7-8808-4c70-accb-67d8f040e510` was created on 2026-10-15 from `e992ec285b31f52253c466051246353168ec0dee`, before the cleaned base of this correction. This confirms that a push to production `main` is a deployment action requiring approval. No account or project settings were changed.

## Verification

- `npm ci`: exit 0 in the isolated worktree. The lockfile was unchanged. npm reported twelve existing audit findings (seven moderate, four high, one critical); dependency upgrades and investigation are outside this host correction.
- `npm run build` before the source correction: exit 0, producing fresh baseline output.
- `node --test --test-name-pattern='metadata and shared social|breadcrumb|sitemap|canonical business|JSON-LD contains' tests/routes-and-seo.test.mjs tests/site-contract.test.mjs`: exit 1 against that fresh baseline. Five checks failed because actual URLs still used `www` while the required host was apex.
- After changing the origin, `npm run verify`: exit 0, covering lint, typecheck, fresh Turbopack production export, all 159 tests including public-copy checks, and the static privacy audit with no findings.
- Export inspection: exit 0. All seventeen sitemap entries use HTTPS apex. The 153 exported HTML, XML, TXT, JSON, JS and webmanifest assets were scanned; none contain `https://www.hanginkitecenter.com`. The static 404 remains present. Robots retains `Content-Signal: ai-train=no, search=yes, ai-input=yes` and now declares `Sitemap: https://hanginkitecenter.com/sitemap.xml`.
- `git diff --check`: exit 0. `AGENTS.md` remains unchanged at 12,584 bytes.
- Repository-relative Markdown links in the three changed documents resolve: exit 0.
- Independent read-only code review found no actionable defects. Its focused export suite passed all 36 tests; the reviewer independently confirmed the seventeen apex sitemap URLs, preserved Content Signals, absence of old `www` URLs and clean whitespace checks. A wording clarification about the export-scan file extensions was applied to this report.

Verification logs are local files at `/tmp/hangin-canonical-npm-ci.log`, `/tmp/hangin-canonical-baseline-build.log`, `/tmp/hangin-canonical-red.log` and `/tmp/hangin-canonical-verify.log`. No live browser, visual, keyboard or assistive-technology session was run because this correction changes URL metadata only, with no visible UI or copy changes. Post-deployment HTTP verification and a fresh live Content Signals scan remain pending. The main checkout's concurrent build, Markdown and hosting edits were left untouched; this worktree starts from the stated committed base and does not verify those separate edits.

## Sources

Accessed 2026-11-10:

- [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): align canonical links, redirects and sitemap preferences; use self-referencing absolute canonicals.
- Installed Next.js 16.3.3 guides: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` (`metadataBase`, absolute URLs, `alternates`), `01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`, `01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`, and `01-app/02-guides/static-exports.md`.
- The installed `seo-audit`, `no-ai-slop`, `content-signals`, debugging, testing, isolation and verification skills were consulted. No additional skill or project dependency was needed. The existing Content Signals installation and provenance are recorded in the [earlier report](2026-11-10-content-signals.md).

## Release boundary

The reviewed static artifact is `out/` in this worktree. Publishing it should deliver both the canonical-host correction and the earlier Content Signals change. Before claiming a live fix, obtain explicit production authorization, deploy the reviewed revision, and recheck the final host, page canonicals, sitemap, robots, status codes, response headers and custom 404. No push, merge to the default branch, production deployment, DNS change or history rewrite has been performed as part of this correction.
