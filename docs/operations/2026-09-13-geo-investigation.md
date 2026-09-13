# GEO content investigation

Status: Current investigation record; local implementation pending final owner review
Recorded: 2026-09-13
Base revision: `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f`
Branch: `codex/site-investigators-2026-09-13`

This focused review follows the existing [GEO discovery runbook](2026-09-13-geo-discovery.md). It checks whether supporting pages answer a visitor's question in readable static HTML and make the basis for factual travel guidance easy to inspect. It does not repeat the completed crawler, sitemap, metadata, structured-data or measurement work, and it makes no claim about rankings, citations or enquiries.

## Outcome

Most reviewed content already met the useful parts of the installed GEO workflow. The Boracay guide has direct answers, specific headings, server-rendered copy, cautious operator guidance and confirmed internal links. The accommodation and shop pages avoid inventing rates, room details, availability or stock. The About page clearly states Hangin's confirmed history, instruction, services and partner relationships.

Two concrete gaps warranted small changes:

1. `/kitesurfing-boracay/practical-questions/` referred to White Beach, D'Mall, Diniwid, Puka, paraw sailing and snorkeling without showing the sources already used by the adjacent guide pages. The page now exposes the relevant Philippine Department of Tourism and Travel Philippines links through its existing “Further reading” treatment.
2. The About contact paragraph opened with a generic promise and did not tell a visitor what information to send. It now asks for Boracay dates, riding level and the needed service, then states the owner-confirmed reply commitment of within one day.

No component, metadata, schema, crawler rule, AI-only file, dependency or runtime integration changed. The guide questions remain ordinary visible content without `FAQPage` markup. The cited sources support the travel claims; Hangin's service and response claims remain governed by the owner-confirmed [product record](../project/product.md).

## Skill search and selection

The required `find-skills`, `tlc-generative-engine-optimization`, `no-ai-slop`, `frontend-design`, test-first and verification workflows were read before implementation. The installed Tech Leads Club skill was retained. Its useful principle for this pass is to treat GEO as documentation quality: direct answers, parseable pages, sources and claims that match visible content. Its generic suggestions for article authors, dates, FAQ schema and `llms.txt` do not establish requirements for this business site. Google's current [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says no special AI file or schema is required.

The review used repository metadata and skill source observed on 2026-09-13. Adoption is a maintenance signal, not proof of safety or correctness.

| Candidate | Adoption observed | Source, execution and risk review | Decision |
| --- | --- | --- | --- |
| [Tech Leads Club GEO](https://github.com/tech-leads-club/agent-skills/tree/0ab82f644cd9caf94c65347a50ad934800b0cbc4/packages/skills-catalog/skills/%28quality%29/tlc-generative-engine-optimization) | 5,538 repository stars, 495 forks; per-skill installs unavailable | Nine text/template files, with no scripts, dependency manifest, hooks, credential loader or permission request. It recommends public retrieval and optional external validators, so fetched text still requires the normal untrusted-content boundary. The repository was active on 2026-09-12. Per-skill marketplace security reports were unavailable. | Retained; best fit for a bounded page-level review. |
| [Corey Haines ai-seo](https://www.skills.sh/coreyhaines31/marketingskills/ai-seo) | About 123,700 skill installs; 49,946 repository stars, 7,586 forks | The reviewed skill subtree contains instructions, references and evaluations, with no runtime package or credential loader. Marketplace Gen and Socket checks passed; Snyk warned about indirect prompt injection from retrieved content. Its wider workflow conflates some training and search crawler controls and gives AI files/schema more weight than current platform guidance supports. | Not installed; broader than this content pass and offers no needed capability over the installed workflow. |
| [ReScienceLab seo-geo](https://www.skills.sh/resciencelab/opc-skills/seo-geo) | About 46,700 skill installs; 1,809 repository stars, 165 forks | Apache-2.0 repository with references plus network scripts that can use DataForSEO credentials and APIs. Marketplace Gen and Socket checks passed; Snyk warned. Those scripts, credentials and external requests are unnecessary for editing two static content records. | Not installed and no scripts executed. |
| [Staksoft web optimization](https://github.com/staksoft/geo-seo-aeo-skill) | 3 repository stars, 2 forks | MIT repository with a standard-library Python URL auditor, tests, templates and no package dependency. Running it would fetch and parse untrusted page content. GitHub reports no security policy and no published advisory; the repository's low adoption gives little independent operational evidence. Its `llms.txt` and broad scoring emphasis do not fill a current gap. | Not installed and no scripts executed. |
| [React SEO Skills](https://github.com/daniel-amekpoagbe/react-seo-skills) | 4 repository stars, no forks | MIT repository distributed through an `npx` installer with a Node package manifest and executable install path. It overlaps the local Next.js and SEO guidance, and its `llms.txt` coverage is not needed. | Not installed and no installer executed. |

Counts came from the GitHub API and skills.sh pages on 2026-09-13. The reviewed repositories were not archived. The root Tech Leads Club repository reported no SPDX license through the API, while the selected skill declares MIT in its own frontmatter; this mismatch is recorded rather than silently resolved. No candidate received filesystem access, credentials or expanded permissions.

## Content evidence

The existing source records were checked against the rendered claims before linking them from the questions page:

- The [Philippine Department of Tourism Australia and New Zealand Boracay guide](https://www.tourismphilippines.com.au/where/boracay) identifies White Beach sunset, D'Mall at Station 2, Puka Beach, paraw sailing and snorkeling or island hopping. It is the public source already used by the places and planning pages.
- The Department of Tourism's [Travel Philippines Diniwid and Puka guide](https://app.philippines.travel/articles/discover-diniwid-and-boracay-s-quiet-getaways) identifies Diniwid beyond White Beach Station 1, back-road tricycle access and Puka Beach. It is the public source already used by the places page.
- `docs/project/product.md` records the maintained owner confirmation that Hangin replies within one day and lists the services named in the About contact answer.

The broader Philippine Department of Tourism activities page timed out during this review, so it was not added to the question page merely to increase the source count. The two linked pages cover the visible travel claims. They are supporting evidence, not endorsements or proof of Hangin's own operations.

## Validation evidence

- Test-first baseline: `node --test tests/geo-content.test.mjs` exited 1 with 0 of 2 tests passing against the fresh pre-change export. The failures showed the missing “Further reading” block and missing direct one-day About answer.
- Source inspection confirms both changes use existing typed records and rendering paths. No new component or runtime path was introduced.
- The public-copy forbidden-term and em-dash scan returned no matches in the changed content or test file. Manual no-AI-slop review found the new sentence direct, specific and supported.
- The parent-owned `npm run verify` exited 0 against the final combined source on 2026-09-13: lint, typecheck, fresh Next.js 16.3.3 static export, all 148 Node tests and the static privacy audit passed. Local log: `/tmp/hangin-investigators-final-verify.log`.
- Focused green check: `node --test tests/geo-content.test.mjs` exited 0 with 2 of 2 tests passing against that fresh export. Local HTTP checks returned 200 for both affected routes and found the new answers in the response HTML.
- Browser review read both updated sections in the accessibility tree and inspected them at the default 1280-pixel viewport and a 390 × 844 mobile viewport. The source labels remain readable and wrap without clipping on mobile; the About answer remains readable above the existing contact controls. No interaction, CSS or layout behavior changed.

Changed files for this GEO pass: `content/boracay-guide.ts`, `content/island-pages.ts`, `tests/geo-content.test.mjs` and this report.

Production DNS still does not resolve for the apex or `www` host, as recorded by the parent investigation. Live HTTP delivery, crawler access, platform indexing, Search Console data and answer-engine citations therefore remain unverified. No DNS, deployment, indexing submission, account action, external message or AI-query visibility run was performed.
