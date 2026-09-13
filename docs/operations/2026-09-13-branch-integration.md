# Branch integration, 2026-09-13

Status: Current; verified local branch integration record

The owner requested merging all branches. Work runs on `codex/integrate-all-branches`. The current site and its later owner-approved design, media, lesson prices, routes and Cloudflare Pages configuration are retained while the older review branch contributes its inquiry/accessibility pages, contact and safety guidance, privacy audits, static host headers, tests and dated research records.

## Source revisions

| Source | Revision | Role |
| --- | --- | --- |
| Local `main` and `codex/cloudflare-pages-config` | `7b38703f69dd148b2fb5e5506c90aa7c81799019` | Integration base with current site and static Pages configuration |
| `codex/review-fixes` | `2eb0cd56014f478729bde5fc2c8f27d6873b2765` | Review/remediation branch merged into the integration branch |
| Common ancestor | `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` | Shared base of both histories |
| `codex/events-coming-soon` and its remote-tracking branch | `c49ba0c95b1a1f36a538f07915b00fc541ea6845` | Events work already represented in the base history |

The local about, logo, Boracay submenu, course-price, homepage-hero, image-quality, safari, lesson-header, mobile-menu and own-gear-prompt branches point to the common-ancestor revision at inspection. Their names do not imply additional commits beyond the current main history. A fresh `git fetch origin` succeeded. Before committing, `git rev-list --branches --remotes --not HEAD MERGE_HEAD` returned no commits: the two merge parents cover every fetched local and remote branch tip. The post-merge ancestry check verifies this again against `main`.

Sources were read from local Git references and repository files on 2026-09-13. No external legal source was revalidated as part of documentation conflict resolution. Earlier source-access dates remain attached to the original research.

## Conflict decisions

- Preserve the latest homepage, owner-supplied images, identity and partner marks, centralized `/legal/` credits, lesson pricing, calculator, Boracay topic pages, safari holding pages and Events page. The September 4 homepage layout and older stock-photo/caption assumptions are superseded.
- Add `/terms/` and `/accessibility/` using the current shared site components. Retain practical inquiry, complaint, access and first-contact guidance without adopting unconfirmed booking terms or business policy.
- Preserve all twenty-one public routes and the separate seventeen-route indexable sitemap. The three pending safari pages and Events remain `noindex, follow`.
- Keep the existing static Next.js export and Wrangler Pages setup. Integrate `public/_headers` as a host artifact and development-only privacy parser/audit tooling. Reconcile audit expectations with the current public and indexable route sets.
- Preserve the legal/privacy research, remediation reports and owner-question list as dated historical records. Their original test counts, media inventories, old host uncertainty and open-question status do not overwrite later confirmed project records. Proposed policies remain proposed.

Changed areas include `app/`, shared components, content and routes, `package.json`/lockfile, `public/_headers`, image attribution, audit scripts, regression tests, and current/future/historical documentation. The final merge diff supplies the exact file inventory.

## Uncommitted work outside the merge

The older worktree at `/private/tmp/hangin-review-integration` contains an unpublished expansion of `docs/operations/offene-fragen-und-klaerungen.md`, including owner-answer material beyond the committed branch version. That source is preserved untouched. This branch merge does not silently import those answers or treat them as new authorization. Its draft needs a separate reconciliation against current confirmed facts if the owner requests it. Other pre-existing worktree changes are outside this merge unless explicitly included by the owner.

## Verification and approval record

Required integration checks are lint, typecheck, a fresh production export, the complete Node suite and static privacy audit; conflict-marker and whitespace checks; route/sitemap/404/header checks against the fresh artifact; responsive and keyboard review of changed public pages; and an independent review of sensitive integration changes. Older reports are not substitutes for these runs.

Documentation checks on 2026-09-13: `git diff --check -- docs public/images/ATTRIBUTION.md` exited 0. A local relative-link/conflict-marker check exited 0 across 34 changed/new documents and 176 relative Markdown links, with no missing targets or conflict markers. `AGENTS.md` was not edited by the documentation task and measured 12,584 bytes. Markdown links were checked from their source targets; a rendered Markdown browser review was not performed.

Final integration evidence on 2026-09-13:

- `npm ci --ignore-scripts` exited 0; the reviewed parser development dependencies installed and npm reported zero known vulnerabilities. No application runtime dependency was added.
- `npm run verify` exited 0 with lint, TypeScript, fresh static export, 135 passing Node tests and zero static privacy findings. Log: `/tmp/hangin-all-branches-verify.log`. Earlier integration checks caught the SVG attribute-case mismatch, the safety/FAQ ordering expectation, and concurrent unfinished calculator changes; these were resolved before this successful run.
- `node --test tests/privacy-audit.test.mjs tests/deployed-privacy.test.mjs` exited 0 after the final audit change. New regression fixtures failed before their implementation and pass afterward. They cover literal route spreads and sitemap exclusions, exact reviewed client-source hashes, the non-submitting calculator form, and external form-associated controls. The calculator form cannot have an ID, native submission attributes or named fields. A new or modified client entry still fails review until its source is approved.
- Wrangler 4.131.1 accepted the Pages configuration and its one header rule. The local preview at `http://127.0.0.1:49199` returned 200 for pages/metadata, 308 for `/terms` and `/index.html`, and a real 404 for a missing route. HTML revalidates and 404 uses `no-store`; tested content responses had the expected CSP, referrer and content-type protections and no cookies.
- `node scripts/audit-deployed-privacy.mjs http://127.0.0.1:49199` exited 0: all 21 public routes and 100 responses checked, with no findings. Its sitemap comparison covers 17 indexable routes; all four noindex holding pages remain audited.
- Browser review rendered all 21 pages at 390 pixels and the non-calculator pages at 1280 pixels, with one H1 each, no broken-image reports, and no persistent horizontal overflow after layout settled. Terms, accessibility, contact and lessons also fit 320 pixels; sampled primary controls measured at least 48 pixels. Terms/accessibility copy was read end to end, safety/contact text reviewed, and keyboard skip navigation focused the main landmark. The current cinematic homepage and owner photographs remain intact. No browser console warnings or errors appeared during that pass.
- Independent review found and resolved an accidentally restored global photo-credit paragraph and the external form-association audit bypass. Credits stay on `/legal/`. The reviewer reported no remaining blockers. No full WCAG audit, screen-reader session, or deployed production check was performed.

The authorized `boracay` task made concurrent wind-guide changes while the merge was being prepared. The integration waited for its stable files and focused review: all 144 month pairs are covered by its model tests. The final tree includes its new monthly-wind table component, updated calculator/source records and tests, and `docs/project/kite-size-guide.md` evidence. The calculator entry hash was updated only after its source review. Its author then verified the fresh Pages preview under CSP at 1440, 390 and 320 pixels: December–January aggregation, different April sizes, off-season team-check, input-change reset and Enter-driven result focus passed with no overflow or console errors. The twelve-month disclosure remained readable at 320 pixels; the temporary viewport and tab were restored. The merge commit containing this report records both parent revisions; `git show --stat` supplies the exact committed file inventory.

The owner's request authorizes branch integration. It does not authorize new production credentials, DNS or account changes, publication of unconfirmed facts, or deployment. Production HTTP and provider-account behavior remain unverified unless a separately recorded check establishes them.
