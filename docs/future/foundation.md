# Phase 0 specification: foundation and launch integrity

Status: Proposed
Approval requirement: close the owner decisions below and explicitly change this document to `Accepted` before implementation.
Research date: 2026-09-04

## Purpose

Create a dependable base for later content, booking, localization, analytics, commerce, and agent-maintenance work. Phase 0 does not add a new visitor-facing business capability. It makes current behavior reproducible, gives every fact and decision an owner, verifies the actual static host, and adds browser-level evidence missing from the current artifact tests.

## Outcomes

At completion:

- Agents and people can distinguish current behavior, accepted requirements, proposals, and historical decisions.
- A clean CI run builds exactly one static artifact and tests that artifact before deployment.
- The public contract covering every route in `publicRoutes`, accessibility baseline, performance baseline, contact fallbacks, and media provenance are tested in a browser.
- Production DNS, TLS, redirects, 404 behavior, headers, and cache rules are known and monitored.
- Search performance and real enquiries can be reviewed without adding browser tracking.
- Business facts, page ownership, media rights, and substantive review dates have named owners.

## Non-goals

Phase 0 does not add a CMS UI, blog, new locale, booking calendar, payment form, customer account, product catalogue, checkout, advertising tag, session replay, runtime database, or custom API. It does not claim that the unapproved 2026-08-31 visual refresh is implemented.

## Current evidence

The [review-remediation report](../operations/review-remediation-2026-09-04.md) and September 5 follow-up supersede the original nine-route/40-test baseline for their dated revisions. Current integration evidence belongs to the [September 13 report](../operations/2026-09-13-branch-integration.md). Future acceptance below means the entire current route set and test suite.

- The site is a Next.js 16.3.3 static export covering the public routes declared in `content/site.ts` with local calculator/navigation client components and no runtime third-party scripts.
- The original pre-integration baseline used a webpack export after a recorded sandbox worker-port failure; keep that historical evidence separate from the later successful default build.
- Tests consume `out/`; they can pass stale output when run without a build.
- No persistent CI/browser regression pipeline or monitoring is checked in. The static header artifact, consolidated local/deployment audit and Cloudflare runbook are present; actual production settings remain unverified.
- Cloudflare Pages is selected with a checked-in static Wrangler configuration. The connected project and actual deployment remain unverified; DNS, Search Console, profile, privacy and operational owners are not recorded.

## Work package 1: context and decision integrity

1. Adopt the root `AGENTS.md` and `docs/` index created with this specification.
2. Mark every active specification `Proposed`, `Accepted`, `Superseded`, or `Rejected` and name its owner.
3. Decide the status of the 2026-08-31 visual refresh. Do not implement it from its current `awaiting review` state.
4. Use ADRs for the production host, build-mode exception, content-management approach, locale URL model, analytics collection, and each booking/commerce provider.
5. Add a documentation check that resolves repository-relative links and keeps the combined root instruction chain below 16 KiB. The Codex default limit remains 32 KiB; the lower project budget leaves room for future nested rules.

## Work package 2: content and fact inventory

Create an inventory for every public route and shared record containing:

- Stable route and content ID.
- Visitor intent and primary contact context.
- Current owner and factual reviewer.
- Confirmed claims and evidence reference.
- Metadata and substantive modification date.
- Proof-media provenance and consent or license.
- Review date and owner-defined review interval.

Design one schema-backed registry for routes, navigation, sitemap input, page lookup, metadata, contact context, and media references. Preserve output through a compatibility adapter before moving inline homepage or shell copy. Zod 4 is the recommended validator because it is maintained, TypeScript-first, and can emit JSON Schema for editor tooling. Dependency adoption occurs in the later implementation plan, not in this documentation change.

Schema validation proves shape and referential integrity, not factual truth. A named reviewer remains responsible for prices, qualifications, conditions, safety, policies, stock, and rights.

## Work package 3: deterministic verification

Add a clean CI pipeline with these required steps:

1. Check out the reviewed revision on an ephemeral runner.
2. Use a pinned Node 24 LTS patch and `npm ci`.
3. Run lint and type checking.
4. Remove or isolate old generated output, run one production export, and fail if the expected artifact is absent.
5. Run the full current test suite and privacy audit only against that fresh export.
6. Package `out/` once with the commit SHA, tool versions, file manifest, and SHA-256 digest.
7. Reuse the same artifact for preview, staging, and production; never rebuild between environments.

Use the default Next build on normal CI. If the port-binding error is reproduced there, record the evidence in an ADR and use the supported `--webpack` mode. Do not make a sandbox workaround the production default without that evidence.

## Work package 4: browser, accessibility, and performance baseline

Adopt Playwright against a static server for the exact exported files. Use Chromium on each pull request and Firefox/WebKit on main or nightly until runtime is known. Add `@axe-core/playwright` as a regression scanner and Lighthouse CI as an initially advisory baseline.

Required browser checks:

- All routes in `publicRoutes` and the custom 404 load with no console or page error.
- Header, footer, internal navigation, WhatsApp, email, mobile disclosure, FAQ states, and skip link work.
- Core content and contact links work with JavaScript disabled.
- Keyboard order, visible focus, accessible names, and expanded states are correct.
- No horizontal overflow at 320, 390, 430, 768, 1366, and 1536 CSS pixels.
- Reduced motion, 200 percent text resize, 400 percent zoom, text-spacing overrides, and forced colors receive manual release review.
- Visual snapshots cover every route at mobile and desktop in one pinned rendering environment.

Initial budgets are guardrails, not claims about field performance:

- Modern homepage JavaScript at or below 150 KB gzip, with a hard exception gate at 175 KB.
- CSS at or below 15 KB gzip.
- Preloaded fonts at or below 80 KB.
- Selected LCP image at or below 150 KB.
- Initial compressed transfer at or below 400 KB, excluding later route prefetches.
- No runtime third-party script without an accepted owner, privacy review, and measured benefit.
- Field targets, once data exists: p75 LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.10.

Target WCAG 2.2 AA but do not claim conformance from automated output. A release needs manual keyboard, zoom, contrast, reading-order, alternative-text, and screen-reader review.

## Work package 5: host and release contract

Select a host that supports atomic versioned static deploys, previews, custom redirects and headers, a real 404, TLS renewal, logs, and rollback. Configure and test:

- Canonical `https://www.hanginkitecenter.com` with one-hop normalization from HTTP, apex, provider domains, non-trailing-slash routes, and `index.html` variants.
- Unknown paths return the exported 404 body with HTTP 404.
- Hashed `/_next/static/` assets receive long immutable caching. HTML, metadata, and unversioned public images revalidate.
- Preview and staging output is noindexed and access-controlled when it contains sensitive drafts.
- Security headers are deployed at the host. CSP begins in report-only mode and is enforced only after the exported framework scripts and outbound connections are verified.
- The previous artifact can be restored without rebuilding.
- Synthetic checks cover homepage, one service route, 404, redirects, certificate, DNS, sitemap, robots, and a hashed asset.

## Work package 6: no-tag measurement baseline

For the first 8 to 12 weeks, use:

- Google Search Console for search impressions, clicks, queries, pages, countries, and devices.
- Bing Webmaster Tools for index and sitemap diagnostics.
- Google Business Profile and Bing Places operational metrics when ownership is confirmed.
- Privacy-reduced host aggregates only after log fields and retention are inventoried.
- Monthly manual counts of enquiries and bookings by service and coarse source, without contact-level analytics joins.

Do not add a browser event collector during Phase 0. Later analytics must answer a named decision, pass privacy/legal review, and keep clicks distinct from enquiries and bookings.

## Failure and rollback

- CI failure blocks artifact creation and produces commands, exit codes, logs, and changed-file context.
- A preview failure does not alter production.
- A production smoke failure freezes further deployment and restores the last known-good artifact by digest.
- DNS and TLS changes use recorded snapshots and named owners.
- Documentation conflicts, unconfirmed public facts, missing rights, stale output, or expanded permissions fail closed and produce a review request.

## Acceptance criteria

- Root instructions and every documentation link resolve, and current versus proposed status is unambiguous.
- A clean checkout runs install, lint, typecheck, build, and the full current test suite and privacy audit in order.
- The resulting artifact is uniquely identified by commit and digest and is reused across environments.
- Browser tests cover all routes, contact fallbacks, native controls, keyboard operation, JavaScript-disabled behavior, overflow, and axe A/AA regressions.
- Manual WCAG 2.2 AA review has no open release blocker.
- Performance and asset baselines are recorded in a pinned environment; thresholds either pass or have a dated, owned exception.
- Production HTTP checks prove canonical redirects, TLS, status codes, headers, caching, sitemap, robots, assets, and rollback.
- Search/profile ownership and the no-tag measurement process are documented, or the absent account owner is recorded as a launch blocker.
- No new visitor data collection, dynamic server, booking, payment, locale, or catalogue is introduced.

## Owner decisions required before the implementation plan

1. Production Git host and plan, static host/CDN, registrar/DNS owner, and whether `www` remains canonical.
2. Release approver, incident responder, recovery targets, artifact retention, and preview-access policy.
3. Node 24 LTS and WCAG 2.2 AA as project baselines.
4. Factual reviewer, content publisher, media-rights reviewer, and privacy contact.
5. Status of the 2026-08-31 visual refresh.
6. Search Console, Bing, Google Business Profile, and Bing Places account owners.

Repository-only documentation and test design can proceed before these answers. Host configuration, profile connection, and owner-specific runbooks cannot be completed without them.

## Primary references

- Next.js 16.3.3 bundled static-export, deployment, accessibility, and production guides under `node_modules/next/dist/docs/`
- Node.js release policy: <https://nodejs.org/en/about/previous-releases>
- Playwright CI and accessibility testing: <https://playwright.dev/docs/ci>, <https://playwright.dev/docs/accessibility-testing>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Core Web Vitals: <https://web.dev/articles/vitals>
- GitHub Actions secure use: <https://docs.github.com/en/actions/reference/security/secure-use>
- GitHub artifact attestations: <https://docs.github.com/en/actions/concepts/security/artifact-attestations>
- Google sitemap guidance: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>

Sources accessed 2026-09-04.
