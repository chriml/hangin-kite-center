# Apex canonical origin

Status: Current; verified locally, pending owner review and production release
Date: 2026-11-10

## Owner decision and scope

The owner selected `https://hanginkitecenter.com` as the primary website address on 2026-11-10. This supersedes the earlier `www` choice. The change updates the existing origin in `content/site.ts`, consumer-output test expectations, the saved cinematic template's outbound links and current documentation. Historical reports and accepted ADRs retain their original observations.

Base and HEAD before implementation: `5063e111d117271b2cb92e3266521e7f96b24f65`. Branch: `fix/apex-canonical-origin`. Changes remain uncommitted for owner review. At isolation time, the separate `fix/content-signals` checkout had uncommitted source, tests and documentation. Those changes are outside this fix and were not copied into this branch.

`siteConfig.origin` already supplies the canonical tags, metadata base, social URLs, structured-data identifiers, sitemap entries and robots sitemap URL. No new dependency, route, runtime integration or redirect implementation is needed for the source correction. The existing static-export configuration, seventeen indexable routes, four noindex holding pages, contact destinations and visible page copy remain as before.

## Sources and observed production state

Accessed on 2026-11-10:

- Installed Next.js 16.3.3 guides: `generate-metadata.md` (metadataBase and alternates), metadata `robots.md` and `sitemap.md`, and `static-exports.md` under `node_modules/next/dist/docs/01-app/`. The same locked-version guides in the original checkout were read while isolated dependencies installed.
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): canonical annotations, sitemap URLs and links should agree on the preferred URL; permanent redirects are a separate host signal.

Read-only HTTP checks before release found:

- Apex HTTPS homepage: 200, served by Cloudflare, with a `www` canonical.
- Apex HTTP homepage: 301 to apex HTTPS.
- `www` HTTPS: curl exit 6, hostname did not resolve in this environment.
- Apex robots and sitemap: 200; robots references the `www` sitemap, and all seventeen sitemap entries use `www`.
- An unknown apex route: real 404 with `noindex`.

These are pre-release observations, not validation of the changed artifact in production. Raw local evidence: `/tmp/hangin-apex-live-before.json`.

## Verification

All results below were obtained in this isolated worktree on 2026-11-10:

| Command or check | Exit | Result |
| --- | --- | --- |
| `npm ci` | 0 | Locked dependencies installed; package manifest and lockfile unchanged |
| `npm run build` before the origin fix | 0 | Fresh baseline static export |
| `node --test tests/routes-and-seo.test.mjs` before the origin fix | 1, expected | Three failures show old-origin canonical, breadcrumb and sitemap output; twenty-two other checks passed |
| `npm run verify` after the origin fix | 0 | Lint, typecheck, fresh Turbopack export, all 159 tests and static privacy/resource audit passed; privacy findings empty |
| One-off exported-artifact inspection | 0 | All 21 public pages have apex canonical and Open Graph URLs, apex social images and static WhatsApp links; 49 JSON-LD blocks parse; 17 sitemap entries; correct robots sitemap; static 404 is noindex without a homepage canonical |
| Full export old-origin scan | 0 | No `www.hanginkitecenter.com` occurrence in any of the 247 exported files |
| Local Markdown-target check | 0 | All 80 relative targets in the changed Markdown files resolve |
| `git diff --check` | 0 | No whitespace errors |

An independent read-only reviewer found no actionable findings. Review confirmed the origin's existing consumers, maintained test assertions, saved template links and current documentation. No extra build ran during that review. `AGENTS.md` remains unchanged at 12,584 bytes.

Local logs: `/tmp/hangin-apex-baseline-build.log`, `/tmp/hangin-apex-red-tests.log` and `/tmp/hangin-apex-verify.log`.

Changed files: `content/site.ts`, `README.md`, `docs/README.md`, `docs/project/product.md`, `docs/project/seo-accessibility-media.md`, `docs/project/development-and-operations.md`, this report, `templates/cinematic-video/index.html`, and the existing `routes-and-seo`, `site-contract`, `safari-trips`, `static-export`, `reviewed-embeds` and `privacy-audit` test files. No change to `app/robots.ts`, the package manifest, lockfile, Next.js configuration or instruction file is included.

`npm ci` exited 0 without changing dependencies or the lockfile. Its existing dependency audit reported twelve vulnerabilities (seven moderate, four high, one critical), an ESLint deprecation and an unapproved `unrs-resolver` install-script warning. No dependency upgrade or script approval was performed; this origin-only change does not resolve or assess those dependency findings.

## Production boundary

At completion of the canonical source task, the owner had approved the primary address only. No push, merge, deployment, DNS change, hostname attachment, certificate change, Cloudflare rule or Search Console action was authorized or performed in that task. The owner subsequently authorized the separately documented [WWW host setup](2026-11-10-www-redirect.md), which is now live and verified; application deployment remains pending.

After owner review and separate release authorization, deploy the checked artifact and recheck canonical tags, social metadata, structured-data URLs, sitemap and robots at the apex. The subsequent host task configured and verified the permanent `www` redirect with paths and query strings preserved. Recheck it after the application release; the earlier unresolved-`www` observation above is historical.

Browser visual, keyboard and screen-reader checks are outside this metadata-only change; public UI and visible copy were not edited. Cloudflare's public Agent Readiness scanner previously rejected the automated client with HTTP 403 / error 1010. It was not retried, and no official readiness score is claimed.
