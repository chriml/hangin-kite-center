# Technical SEO investigation, 2026-09-13

Status: Current investigation record; production validation pending a reachable origin

Base revision: `a4c20d7`

Branch: `codex/site-investigators-2026-09-13`

## Scope and outcome

This review covered the twenty-one static public routes, generated metadata files, canonical URLs, index controls, the sitemap, visible and structured breadcrumbs, JSON-LD syntax, social metadata, heading counts and local internal links. It did not assess rankings, search demand or authenticated Search Console data.

The baseline export contained seventeen indexable routes and four unfinished routes with `noindex, follow`: Events and the Batbatan, Colon and Others safari detail pages. All indexable routes were present in the sitemap, and no noindex route was present. Every route had one H1, a unique title and description, a self-canonical URL, Open Graph and Twitter metadata, and parseable JSON-LD. The local link crawl found no missing exported target.

Two supporting pages had visible breadcrumbs without the matching `BreadcrumbList` data used by every other supporting route. `/terms/` and `/accessibility/` now publish a two-item Home and current-page breadcrumb. The names and URLs match the visible trails. This closes an internal consistency gap without adding public claims or changing copy. Google documents that breadcrumb markup can categorize a page in search results, while its [general structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) makes clear that correct markup does not guarantee a search feature.

No change was made to robots, sitemap generation, canonical construction, social-image metadata or substantive page dates. The current output for those areas matched the repository contract and the current [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [robots meta guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [title guidance](https://developers.google.com/search/docs/appearance/title-link) and [breadcrumb specification](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## Skill selection and security review

The installed `seo-audit` skill is the current `2.0.1` workflow from [Corey Haines' marketingskills](https://www.skills.sh/coreyhaines31/marketingskills/seo-audit). The installed subtree has `SKILL.md`, two text references and an evaluation file. It has no scripts, package manifest, hooks, credential loader or permission request. Its workflow reads public pages and recommends optional public validators. Retrieved pages were treated as untrusted evidence.

The skill had about 205,400 recorded installs on skills.sh, and its source repository had 49,945 GitHub stars when checked. Gen Agent Trust Hub and Socket reported passes. Snyk reported a warning, and Runlayer reported no issue. The warning is retained as a caution because marketplace scans are evidence, not certification. The reviewed upstream revision was `5b2c0007766c6a1cf1d53fd8fc73e979e0821022`, and the repository was active and MIT licensed.

Other credible candidates were reviewed before deciding whether to install anything:

| Candidate | Adoption observed | Source, dependency and permission review | Decision |
| --- | --- | --- | --- |
| [sickn33 SEO audit](https://www.skills.sh/sickn33/agentic-awesome-skills/seo-audit) | About 1,000 installs; 46,358 repository stars | One instruction file, no local scripts or declared dependencies; all three listed security scans passed | Lower per-skill adoption and no material advantage over the installed workflow |
| [SEOmator SEO audit](https://www.skills.sh/seo-skills/seo-audit-skill/seo-audit) | 988 installs; 425 repository stars | Installs and runs an npm crawler; repository includes a package lock, browser-based CLI, Electron code, MCP configuration and scripts; Socket and Snyk showed warnings | Unnecessary executable and network surface for a complete local static export |
| [OpenSEO audit](https://www.skills.sh/every-app/open-seo/seo-audit) | About 2,600 installs; 18,593 repository stars | Requires OpenSEO project tools and a project identifier; Snyk showed a warning | Built for an external report workflow, not this source-level repair |
| [iannuttall SEO](https://www.skills.sh/iannuttall/seo/seo) | About 443 installs; 508 repository stars | Directs the agent to install a global npm CLI and crawl a live origin; Socket and Snyk showed warnings | The live origin is unreachable and the extra executable is not needed for this audit |

No new skill was installed, no candidate script was executed, and no external SEO account was connected. The installed text-only workflow had the strongest adoption, the smallest permission surface and enough coverage for this task.

## Evidence and verification

The parent baseline ran `npm run verify` from the isolated worktree before edits and exited 0 with 140 tests passing. A crawl of that fresh export found:

- 21 public HTML routes, including 17 indexable routes and 4 noindex holding pages.
- 21 self-referencing canonicals and 21 unique titles and descriptions.
- 21 pages with exactly one H1.
- No missing local target from the internal links found in the HTML.
- A 1200 by 630 local social image whose description matches the visible kitesurfers over turquoise water.
- Successful local baseline responses for the homepage, robots, sitemap, manifest, lessons and a noindex safari page; an unknown route returned 404.

The regression test was added before the implementation and failed against the baseline at `/terms/ BreadcrumbList structured data`, which confirmed that it detects the gap. After the implementation, the parent-owned round-one `npm run verify` completed with exit code 0: lint, typecheck, a fresh production export, 141 tests and the privacy audit passed with no privacy findings. The focused breadcrumb test also passed against that fresh export.

## Production limits

Public DNS lookups for both `www.hanginkitecenter.com` and the apex domain failed during this investigation. Production HTTP status codes, redirect normalization, TLS, response headers, CDN behavior, robots delivery and the real 404 response therefore remain unverified. Search Console, Bing Webmaster Tools, sitemap submission, URL Inspection and live structured-data validation also remain unverified. No deployment, DNS change, indexing request or external account action was performed.

Sources were accessed on 2026-09-13. Install and star counts are dated observations and may change.

## Changed files

- `app/terms/page.tsx`
- `app/accessibility/page.tsx`
- `tests/routes-and-seo.test.mjs`
- `docs/operations/2026-09-13-seo-investigation.md`
