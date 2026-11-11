# SEO and GEO strategy

Status: Current operating procedure
Recorded: 2026-11-11, base revision `b169836`
Owner: SEO & GEO Agent (Paperclip project "Hangin Kite Center Website"), reviewed and approved by the site owner
Scope: `chriml/hangin-kite-center` and `https://hanginkitecenter.com`

This document says how SEO and GEO work is done for Hangin and in which order. It does not change site behavior by itself. Any change it leads to still passes the rules in [`AGENTS.md`](../../AGENTS.md), the confirmed facts in [`product.md`](product.md) and, for new capabilities, the gates in the proposed [SEO and content growth brief](../future/seo-content-growth.md).

GEO means being correctly found, cited and described in AI answers. It is not a ranking promise. Neither SEO nor GEO work guarantees rankings, citations, enquiries or bookings.

## Where Hangin's SEO and GEO knowledge lives

| Topic | Authority |
| --- | --- |
| Operating rules, copy, design and privacy limits | [`AGENTS.md`](../../AGENTS.md) |
| Confirmed business facts and public routes | [`product.md`](product.md), `content/site.ts` |
| Current SEO, structured-data and media contracts | [`seo-accessibility-media.md`](seo-accessibility-media.md) |
| Crawler controls, AI reporting distinctions, directory corrections, query protocol | [GEO runbook](../operations/2026-09-13-geo-discovery.md), [query baseline](../operations/geo-query-baseline.json) |
| Markdown twins for `Accept: text/markdown` | [ADR 0005](../decisions/0005-markdown-content-negotiation.md) |
| Content Signals in robots | [Content Signals record](../operations/2026-11-10-content-signals.md) |
| Dated observations, backlog and release results | [SEO and GEO findings](seo-geo-findings.md) |
| Future growth stages and their gates | [SEO and content growth brief](../future/seo-content-growth.md) (Proposed) |
| Measurement and tracking limits | [Analytics and privacy brief](../future/analytics-privacy.md) (Proposed) |

This repository is the authority for Hangin-specific SEO and GEO requirements and findings. Paperclip tasks can hold work in progress and discussion. The reviewed result belongs here, changed on a branch through a pull request. The agent's own knowledge base holds only generic method and must not hold Hangin facts.

## Goal and audience

International visitors planning a Boracay trip, and experienced riders, should find accurate answers about Hangin and kitesurfing at Bulabog Beach. They should be able to start a WhatsApp conversation with their dates and riding level. The site answers the [visitor questions](product.md#visitor-questions) and the owner's most common customer questions (season, wind, cost, things to do, trips, events and where to stay). The customer-question table is being added to the growth brief on `feat/batbatan-safari-dates`.

Report each layer separately and never infer one from another:

1. Crawl and index state
2. Search impressions and clicks
3. AI answer citation and recommendation
4. Contact click (intent only)
5. Enquiry received (an operational count, if the owner provides one)
6. Booking

## Priorities

Work through these in order unless the owner changes it. Record status in the [findings](seo-geo-findings.md).

1. **Measurement access.** The owner confirmed on 2026-11-11 that they own Search Console, Bing Webmaster Tools, Google Business Profile and Bing Places (recorded on `feat/batbatan-safari-dates`). Next the owner verifies `https://hanginkitecenter.com` in Search Console and Bing, submits `https://hanginkitecenter.com/sitemap.xml` and reviews the inherited Google generative AI setting. The owner acts in those accounts; the agent prepares steps and reads exports.
2. **Record reconciliation.** Several older records still name the `www` origin, the 2002 founding year or "deployment pending". Correct current-state documents and data files; leave dated historical records as written and add a superseding note. Repository work only.
3. **Local entity consistency.** Make the website, Google Business Profile, Bing Places and directory listings agree with `product.md`. The GEO runbook's draft directory message uses the old `www` address and must be updated before use. Sending a message or editing a listing needs the owner's authorization each time.
4. **GEO baseline.** Run the ten-question manual baseline in the [query baseline](../operations/geo-query-baseline.json) after updating its canonical origin. No runs have been completed, so AI visibility is unknown, not zero.
5. **Answer the open customer questions with first-party detail.** Wind timing, rental, storage, accommodation, shop and safari prices, room details, Colon and Others trips, and events are unconfirmed. Ask the owner, record answers in `product.md`, then update the page. Never fill a gap with an estimate.
6. **Evidence-led guides.** Only after 8 to 12 weeks of Search Console data and recorded customer questions, under Stage 4 of the growth brief.

Not on the list: `llms.txt` (deliberately absent, returns 404), special AI schema or AI-only pages, FAQ rich results (retired by Google), page count targets, doorway pages for beaches, rider levels or languages, and keyword-template titles.

## 1. Data and diagnosis

- **Inputs:** Search Console and Bing exports for the apex property, the reporting period and a comparable earlier period, the sitemap URL list, and the season (see below). Record time zone, filters and export date.
- **Sources:** first-party Search Console and Bing reports, live HTTP responses and the repository revision. The site has no analytics tag, so there is no visit or conversion data. The [analytics brief](../future/analytics-privacy.md) governs any change to that.
- **Output:** a dated baseline table in the findings with source, property, period, unit, URL or query group, value or `unavailable`, and owner. Keep search clicks, AI citations, AI referrals, contact intent and enquiries in separate rows.
- **Quality check:** separate brand from non-brand queries. Compare canonical URLs only. Never record missing access or a missing report row as zero.
- **Seasonality:** Amihan, roughly November to April, is the main Bulabog season. During Habagat, roughly June to October, Hangin moves sessions to the other side of the island. Compare a period with the same season a year earlier where data exists, not Amihan with Habagat.
- **Approval boundary:** read-only analysis and drafts may run routinely. Connecting an account needs the owner's scoped authorization. Credentials never go into tasks, documents or the repository.

### Owner export path

Until scoped API access is set up as a separate decision, the owner exports reports and attaches them to the private Paperclip task. Use the same completed 28-day window for each source.

- **Search Console:** Search results performance with Pages and Queries tables, plus Page indexing status. Add the Generative AI performance report when it shows data for the property; its impressions are part of web search data and must not be added to web totals.
- **Bing Webmaster Tools:** Search Performance and, if offered, AI Performance. Keep search clicks and AI citations apart.
- **Enquiries:** only if the owner chooses to provide them, as an aggregate monthly count by service. No names, numbers or message content.

## 2. Technical audit

- **Inputs:** revision, fresh `out/`, the live origin, sitemap, robots, redirects and key routes.
- **Repository checks:** `npm run verify` on a clean checkout. `npm test` reads `out/` and can pass against stale files, so always build first.
- **Live checks:** each sitemap URL returns 200 with a self-canonical and one H1. Holding pages return `noindex, follow` and stay out of the sitemap. `www` and `http` redirect permanently to the apex. A missing route returns 404. robots keeps wildcard access, Content Signals and the sitemap line. `Accept: text/markdown` returns the Markdown twin. Structured data matches visible content.
- **Output:** one row per finding in the findings, with URL, status (`done`, `open`, `unverifiable`), dated evidence, effect, proposed change and acceptance check.
- **Quality check:** distinguish source state from deployed state. Validate structured data against the visible page before calling it correct.
- **Approval boundary:** code and content changes go through a pull request. Deployment, DNS, Cloudflare and account settings need the owner's authorization at the point of action.

## 3. Content briefs and claim review

- **Inputs:** a visitor or customer question, the target route from the [route table](product.md#public-routes), and the confirmed facts.
- **Output:** a brief with the direct answer, page role, Hangin-specific detail, internal links, the contact next step and a claim ledger.
- **Claim ledger:** mark each claim `owner-confirmed` (with the dated record in `product.md` or a reference file), `sourced` (external source with access date, such as local operators or official tourism pages) or `unconfirmed`. Unconfirmed claims are left out, and the page asks visitors to message Hangin.
- **Quality check:** apply the public copy rules in `AGENTS.md` and the `no-ai-slop` review. Check page copy, metadata and structured data together. Generated art never stands in for proof of staff, rooms, equipment or trips.
- **Approval boundary:** agent drafts are unpublished. The owner confirms facts; publication follows the release path.

## 4. GEO observation

- **Inputs:** the versioned questions in the [query baseline](../operations/geo-query-baseline.json), product, date, locale and search state.
- **Protocol:** follow the GEO runbook. Use three fresh runs per question and product, and never paste the site or earlier answers into the chat. Record every cited URL and whether Hangin is mentioned, recommended or described incorrectly against `product.md`.
- **Output:** a dated observation entry in the findings with denominators. A citation is not a recommendation, and neither is a visit or an enquiry.
- **Crawler policy:** current access, Content Signals (`ai-train=no, search=yes, ai-input=yes`) and the search/training crawler distinctions in the runbook stay as they are. Changing them needs the owner's decision.
- **Approval boundary:** observations and drafts may be prepared routinely. Public claims about AI visibility and any outreach need the owner's approval.

## Release loop

For each change, record the baseline, hypothesis, revision, target URL, release date and acceptance result in the findings. Repeat the live checks right after deployment. Judge search effects after a full 28-day window at the earliest and against the same season. One AI answer proves nothing; look for repeated patterns across completed runs.
