# GEO discovery implementation and release runbook

Status: Current implementation record; external release actions pending authorization
Recorded: 2026-09-13
Base revision: `62169100da94eaeb42c0975842fa3b7db0ca6799`
Branch: `codex/geo-implementation`
Implementation revision: the commit containing this record on `codex/geo-implementation`; resolve with `git log -1 --format=%H -- docs/operations/2026-09-13-geo-discovery.md` before release.

The owner approved repository implementation and confirmed ownership of the permanent origin, `https://www.hanginkitecenter.com`. That approval does not authorize DNS changes, production deployment, account edits or external messages. This work improves public answers and technical discovery; it does not establish a citation, recommendation or enquiry uplift.

## Repository scope

- Preserve static export and the direct WhatsApp contact route.
- Keep wildcard crawler access and remove the unsupported robots `Host` line.
- Use explicit, evidenced page modification dates in `content/page-updates.ts`; omit dates where substantive updates are unverified.
- Reuse the verified Google Maps place destination and reference it through `hasMap`.
- Make the homepage school description, lesson prices/durations and Habagat guidance easier to find using existing confirmed records.
- Preserve truthful existing structured data. Add no special AI schema, invented reviews, offers, staff credentials or availability.
- Keep `llms.txt`, separate AI content, runtime trackers and scheduled monitoring outside this implementation.

See [product facts](../project/product.md), [lesson source](../references/2026-09-08-hangin-course-price-sheet.md), [SEO contracts](../project/seo-accessibility-media.md) and [operations](../project/development-and-operations.md). The source records and dated owner approvals govern public facts.

## Skill selection and security review

Selected `tlc-generative-engine-optimization` from [Tech Leads Club](https://github.com/tech-leads-club/agent-skills/tree/0ab82f644cd9caf94c65347a50ad934800b0cbc4/packages/skills-catalog/skills/%28quality%29/tlc-generative-engine-optimization), pinned to `0ab82f644cd9caf94c65347a50ad934800b0cbc4`. Its page-level audit/improve workflow fits this static business site. This is a task-specific choice, not a claim that one skill is objectively best across the market.

| Candidate | Adoption observed on September 13 | Fit and limits |
| --- | --- | --- |
| Tech Leads Club GEO | 5,416 repository stars from GitHub API; per-skill installs unavailable | Focused implementation, truthful schema, optional llms.txt, separate search/training bot guidance; selected |
| [Corey Haines ai-seo](https://www.skills.sh/coreyhaines31/marketingskills/ai-seo) | 124.2K skill installs; 49,900 repository stars | Broader marketing workflow; current source conflates GPTBot with search and overstates AI-file/schema benefits |
| [ReScienceLab seo-geo](https://www.skills.sh/resciencelab/opc-skills/seo-geo) | 46.8K skill installs; 1,809 repository stars | Includes DataForSEO credential/API scripts; unnecessary integration surface here and similar bot confusion |

Corey was inspected at `5b2c0007766c6a1cf1d53fd8fc73e979e0821022`, `skills/ai-seo`; ReScienceLab at `b458bf7c23682424206cd1e30f1665c1017583b5`, `.agents/skills/seo-geo`. Counts are dated observations, not security evidence.

The selected subtree contains nine text/template files: `SKILL.md`, two references and six templates. Static inspection found no executable scripts, dependency manifests, hooks, credential loaders or requests for extra tool permissions. Its workflow recommends public source retrieval and external validators; retrieved text remains untrusted evidence. Optional tooling is not a requirement to install another package or send site data to a service.

Per-skill marketplace security scans for TLC were unavailable; do not label it independently certified. Corey's [Snyk warning](https://www.skills.sh/coreyhaines31/marketingskills/ai-seo/security/snyk) concerns indirect prompt injection through third-party content. Its [Socket pass](https://www.skills.sh/coreyhaines31/marketingskills/ai-seo/security/socket) identifies older revision `07cb46667e8af9f861d0543f9814328b0b474580`, not the reviewed current revision. Neither result certifies TLC. No third-party skill scripts were executed.

Apply the selected workflow with the platform corrections below. Generic article templates do not justify adding article authors or dates to every business page. Existing FAQ markup does not promise a Google rich result. A validator's lack of a supported rich-result type is different from invalid Schema.org vocabulary.

## Platform controls and current sources

All external sources in this record were accessed on 2026-09-13 unless a different date is stated.

| Platform | Operational distinction |
| --- | --- |
| OpenAI | `OAI-SearchBot` governs automatic search discovery. `GPTBot` governs potential training use independently. `ChatGPT-User` handles user-initiated requests and does not determine search eligibility. [Official crawler guide](https://developers.openai.com/api/docs/bots) |
| Anthropic | `Claude-SearchBot` supports search; `Claude-User` fetches for user requests; `ClaudeBot` collects potential training material. Do not equate these controls. [Official crawler guide](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) |
| Google | Googlebot controls Search crawling. `Google-Extended` controls training and Gemini grounding uses; it is not a blanket synonym for Search AI inclusion. [Crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) |

Google's current [Search generative AI control](https://support.google.com/webmasters/answer/16908024) is a separate Search Console setting with property inheritance. Inspect the property's effective setting before concluding robots access alone establishes eligibility. Account changes require separate authorization.

The [Generative AI performance report](https://support.google.com/webmasters/answer/16984139) documents worldwide rollout from August 31, 2026 and reports link impressions in AI Overviews and AI Mode. It supports page, country, date and device dimensions. These impressions also belong to the Web search data; do not add the two totals. Missing report data can reflect low volume or eligibility and must not be recorded as a measured zero. It does not measure Gemini app answers or enquiries.

These newer Help pages supersede older claims that Google offers only combined Search reporting. The selected skill's references also need this dated correction; neither an old regional-report claim nor the older combined-only advice describes the current report precisely.

Google still states that no special AI file or schema is required in its [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features). Useful visible text, crawlable internal links and structured data matching the page remain the implementation basis. The [Google Search changelog](https://developers.google.com/search/updates#removing-faq-rich-result) records retirement of FAQ rich results; retain useful questions without promising that feature.

## Release and ownership gates

The task's domain lookup reported NXDOMAIN. Ownership confirmation establishes the intended domain; it does not establish working DNS or a live site. Production HTTP behavior and deployed crawler access remain unverified.

1. Obtain point-of-action authorization and verify the registrar/DNS owner, active nameservers, existing records and intended Cloudflare Pages account/project. Preserve mail records. Identify the actual Pages target and connected production branch before proposing any DNS changes.
2. Compare the remote Pages configuration with `wrangler.toml`. The local name `hangin-kite-center` is a default, not proof of the remote project identity. Verify build command `npm run build`, repository root and output `out/` against the reviewed commit.
3. Finish local verification and independent review, then record the head revision, changed files, commands, exit codes and deploy approver. Obtain explicit production authorization against that artifact. No deployment was performed in this implementation task.
4. After an authorized release, verify DNS resolution and TLS for `www.hanginkitecenter.com`; inspect HTTP/apex redirects to the canonical origin, trailing-slash and `index.html` normalization, provider-domain behavior and a genuine 404 status.
5. Inspect deployed HTML, canonical URLs, sitemap, robots, noindex holding pages, security/cache headers and contact links. Confirm content and contact links work without JavaScript and that CDN responses expose the full page rather than a challenge.
6. Check CDN/WAF logs for verified bots using current provider IP/verification guidance. A spoofed User-Agent request only tests response handling, not bot identity or real crawl success. Review actual Googlebot, Bingbot, OAI-SearchBot and Claude search fetches before claiming access is working. Change bot policies only with owner authorization.
7. Have the authorized owner verify the domain in Search Console and Bing Webmaster Tools, review inherited Google Search generative AI settings, and submit `https://www.hanginkitecenter.com/sitemap.xml`. Record property/owner and submission dates without credentials. Inspect representative URLs and distinguish successful submission from indexing.
8. Reconcile Google Business Profile, Bing Places and the directory records below with the identity sheet. Check the Google Maps place ID and visible map link refer to the same business; do not create duplicates or merge distinct hotel/attraction listings without owner review.

No DNS, deployment, account, sitemap-submission or directory changes are recorded as completed here. Consult [Cloudflare's static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) for the selected delivery contract.

## Identity sheet and directory corrections

| Field | Confirmed value |
| --- | --- |
| Public name | Hangin Kite Center |
| Permanent website | https://www.hanginkitecenter.com |
| Location | Bulabog Beach, Boracay, Philippines |
| WhatsApp | +63 938 010 1849 |
| Email | hanginkitecenter@gmail.com |
| Established | 2002 |
| Instruction | IKO and VDWS; no individual qualification inferred |
| Center designation | Official Duotone Kite Center; do not substitute Duotone Pro Center |
| Equipment partners | Duotone and ION; no current model-year or stock promise |
| Google Maps place ID | `ChIJDZwPzD08pTMRCv8c2mLjjBw` |
| Facebook | https://www.facebook.com/HanginKiteCenterAndResort/ |

Identity values come from [product.md](../project/product.md) and `content/site.ts`. Publish the confirmed website in directories after DNS and release checks pass. Exact street address, coordinates and opening hours remain unconfirmed.

- [UniversKite](https://spots.universkite.fr/item/boracay-hangin-kitesurf-center/): earlier task research flagged an older domain, phone numbers and 2019 gear language. Reopen and capture the current fields before requesting corrections. A fresh fetch during this write-up timed out, so those fields were not independently reverified here. Replace confirmed contact mismatches; remove stale year/stock language rather than inventing current equipment models.
- [IKSURFMAG](https://www.iksurfmag.com/schools/hangin-kite-center/): September 13 retrieval shows the Hangin name, IKO/VDWS instruction and Duotone/ION description. Review outbound website/contact fields with the editor. Its displayed street address is directory evidence, not owner confirmation for our site.
- [Tripadvisor attraction](https://www.tripadvisor.com/Attraction_Review-g1203055-d3267405-Reviews-Hangin_Kite_Center_Resort-Malay_Aklan_Province_Panay_Island_Visayas.html): preserve the attraction identity separately from the hotel listing. Do not transfer scores, counts or reviews between them. Current site rating badges are dated snapshots, not live totals.

Draft correction message, UNSENT and for owner review only:

> Hello, please update the contact details on your Hangin Kite Center listing. Our website is https://www.hanginkitecenter.com, WhatsApp is +63 938 010 1849, and email is hanginkitecenter@gmail.com. We are on Bulabog Beach, Boracay. Please remove the old website and phone details where they differ, and any 2019 equipment wording that implies current stock. You can use “Kitesurfing lessons, equipment rental and storage, accommodation, kite shop and kite safaris.” Thank you, Hangin Kite Center.

Send only after the owner verifies the specific stale fields, working domain and recipient, and explicitly authorizes the message. Do not solicit backlinks, fabricate endorsements or imply a directory partnership.

## Owner intake and ongoing evidence

Before expanding public proof, collect instructor names, roles, specific qualifications and permission to publish; teaching languages actually available; photo rights and honest captions; regular/special hours; and the precise physical address and meeting point. Record the owner and review date for each field. Keep unknown values absent. Existing team placeholders establish no staff identities.

Ask guests for an honest account of their experience without incentives, review gating or a requested star rating. Use the correct business listing. No guest contact, review request or platform edit is authorized by this document. Google's [Maps contribution policy](https://support.google.com/contributionpolicy/answer/7400114) is the policy reference to recheck before running a review process.

## Manual query baseline

[geo-query-baseline.json](geo-query-baseline.json) contains ten neutral, unbranded discovery questions and an empty observation template. No platform query runs have been performed or inferred from ordinary web search results. Zero completed runs means unknown visibility.

Run each query three times in separate fresh chats on ChatGPT Search, Gemini app, Google AI Mode and Claude with web search enabled. Do not paste this website, earlier answers or business identity into the test. Record the actual product, displayed model when available, UTC timestamp, UI/query language, selected and actual country/location context, search activity and login/personalization state. Use the same context within comparisons; treat different locales as separate cohorts.

For each run, record recommended schools, explicit Hangin mentions, every relevant citation URL, whether the citation points to Hangin or a third party, and factual errors against the identity sheet and dated source records. Store no account identifiers or private chat material. Null means unknown/not run; an empty result list is valid only after a completed run. Record blocked/unavailable runs separately.

Compute citation and recommendation rates only over completed, comparable runs, report the denominator and retain the three repeat observations. A source citation does not mean the answer recommended that business. Compare sustained patterns after indexing rather than claiming significance from a single answer. This is a manual procedure; no automation or schedule was created.

| Measure | What it establishes |
| --- | --- |
| Citation | An answer linked to the site's page; third-party citations are recorded separately |
| Recommendation | The answer explicitly suggested Hangin as an option |
| Search AI impression | A platform report counted a displayed link within its documented scope |
| Referral visit | A recorded visit carried a referring source; incomplete attribution is expected |
| Contact click | Intent to open WhatsApp or email |
| Enquiry | A message was actually received; count only in an approved operational process |

Use existing authorized platform reports and aggregate observations. This implementation adds no analytics, customer identifiers or tracking. Avoid equating referrals with bookings or storing guest messages in the query dataset.

## Validation evidence

- `npm ci` exited 0 in the isolated worktree. No package or lockfile change was introduced.
- `npm run verify` exited 0 on 2026-09-13: lint, typecheck, fresh Turbopack production export, all 137 Node tests and the static privacy/resource audit passed. Local log: `/tmp/hangin-geo-isolated-verify.log`. The baseline had 135 passing tests; the two new tests cover map identity and visible FAQ/schema parity.
- Test-first evidence: the added map/FAQ assertions and revised sitemap expectations failed against the baseline export before implementation. A preliminary verification caught removal of an existing explicit WhatsApp direction; the copy was corrected and the complete isolated verification then passed.
- Export assertions cover all 21 public pages, 17 indexable sitemap entries, canonicals, truthful JSON-LD, robots, static 404, contact destinations, public-copy rules and selected contrast pairs. These are static regression checks, not a claim of search inclusion.
- Browser review read the homepage, lessons and contact end to end. Checks at narrow mobile widths (320/390 pixels) and desktop (1440 pixels) found no horizontal overflow. New lesson FAQs opened with Enter, keyboard focus remained visible with the existing two-color focus treatment, and primary contact controls retained at least 48-pixel targets. The updated copy uses the existing high-contrast colors; no CSS, motion or image files changed. No browser console errors were observed in the reviewed pages. Core copy, FAQ answers and native contact links are present in the fresh HTML; a separate JavaScript-disabled browser session was not run.
- The public-copy regression checks and manual no-AI-slop review passed. Independent implementation review found no actionable issues.
- Local Python static-preview HTTP checks exited 0: homepage, lessons, contact, robots and sitemap returned 200; an unknown route returned 404. The exported custom 404 exists. This server does not prove Cloudflare redirects, custom-error delivery or `_headers` behavior.
- Installed Next.js 16.3.3 guides were read for metadata `robots.md`, `sitemap.md`, `static-exports.md` and `json-ld.md` under `node_modules/next/dist/docs/01-app/`. Static export and existing typed metadata APIs are preserved.
- `git diff --check`, local Markdown-target checks and JSON parsing passed. `AGENTS.md` is unchanged (12,584 bytes).
- Public DNS was checked through the local resolver and public Google/Cloudflare resolvers: the `www` name returned NXDOMAIN. No DNS changes were made. Production TLS, redirects, headers, CDN crawler behavior and Google/Bing account validation could not run against a reachable deployment. Rich Results/Schema.org remote validators, a screen-reader session and a full WCAG audit were not run; exported JSON-LD parsing and focused browser checks are the evidence provided.

Changed files: `app/contact/page.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `components/lesson-overview.tsx`, `content/page-updates.ts`, `content/site.ts`, `content/water-pages.ts`, `tests/geo-discovery.test.mjs`, `tests/routes-and-seo.test.mjs`, `docs/README.md`, the four current-state documents for product, content/design, SEO and operations, this runbook, and `geo-query-baseline.json`.

The implementation was moved to an isolated worktree after concurrent kite-size edits appeared in the original checkout. Those unrelated edits were preserved. Owner review of the final branch is pending; no push, merge or production release occurred.

Production DNS/HTTP, authenticated Search Console/Bing/Cloudflare settings and live AI-query observations have not been validated by these documentation changes. Each remains a named gate above, not a passing result.
