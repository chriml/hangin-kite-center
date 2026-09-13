# Website layout and navigation audit

Status: Current audit record
Date: 2026-09-13

## Scope and revision

The owner requested a whole-site review and fixes for mistakes, navigation interruptions, responsiveness and visual/background breakage, with multiple agents. Three agents handled navigation, shared responsive layouts and content/link integrity. The coordinating agent reviewed all page layouts, integrated fixes and ran fresh production checks. An independent agent reviewed the incremental code changes and found no actionable regressions.

Base and HEAD: `62169100da94eaeb42c0975842fa3b7db0ca6799`.
Working branch: `codex/site-wide-ui-audit`.
Changes remain uncommitted for owner review. No push or deployment was performed.

The checkout already contained edits to the homepage/footer copy, contact guidance, calculator and tests. A copy of the starting diff is at `/tmp/hangin-audit-baseline/user-changes.patch`. Concurrent safety-section work also appeared during this audit. Those changes were preserved and are not claimed as audit fixes. The final verification covers the combined working tree.

## Findings and fixes

| Finding | Evidence | Fix |
| --- | --- | --- |
| Tablet header collision | At 781px the first desktop link overlapped the wordmark by 20px; labels also wrapped | Keep the compact menu through 1023px |
| Boracay arrivals skip the opening | Clicking from the footer landed at scrollY 949, with the H1 and submenu above the viewport | Use native document links for arrivals from outside the guide; preserve submenu transitions |
| Colored reading panels have no visual inset | Shop dark sections and About's first section met the text at the panel edge | Extend the color field to the viewport while retaining reading gutters |
| Desktop reading order differs from the DOM | Homepage alternate service bands and Shop hero use CSS order reversals | Remove the reversals |
| Advanced lesson pricing slightly overflows | 3.375px internal overflow in the 700px comparison grid | Reduce the spacing between price groups |
| Lesson enquiry button contrast fails | Ocean on coral measured 4.10:1 for six buttons | Use the established ink foreground, measuring 4.75:1 |
| Unstyled 404 | H1 computed at 16px with its left edge at 0px | Apply the existing heading scale, centered gutters and vertical padding |
| Rental CTA regression test includes a different flow | Page-wide rental/storage assertion also captured the rental-only safety link | Scope page-wide assertions and separately assert the safety contact |

Audit implementation files: `app/globals.css`, `app/page.module.css`, `app/kite-safaris/page.tsx`, `app/kite-size-guide/page.tsx`, `components/spot-guide.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/site-shell.module.css`, `components/service-page.module.css`, `components/lesson-overview.module.css`, and `tests/routes-and-seo.test.mjs`. Current architecture/design documentation and this report are also updated. Several of these files already contained unrelated edits.

## Verification

- `npm run verify` exited 0 after the final code change: lint, typecheck, fresh Turbopack static export, all 138 Node tests, and the static privacy/resource audit passed. Log: `/tmp/hangin-audit-final-verify.log`.
- The initial fresh baseline had 137 passing tests and one failure from the overly broad rental CTA assertion. Its root cause and focused passing recheck were recorded before the final verification.
- Browser rendering covers all 21 public routes plus the static 404 at 320, 390, 768, 860, 1024, 1440 and 1920 pixels. All 154 checks passed with no document overflow, offscreen content, broken images or runtime errors. Full-page screenshots at 390 and 1440 support visual review of the complete pages. Final evidence is in `/tmp/hangin-audit-final-browser/`.
- Axe checks of all 22 pages at 390 and 1440 produced no WCAG A/AA violations. The final 404 change was separately rechecked at 320 and 1440 with no axe violations. Results: `/tmp/hangin-audit-axe.json` and `/tmp/hangin-audit-extra.log`.
- Twenty-four header scenarios, including the 1023/1024 boundary, passed without control collisions, label wrapping or document overflow. Keyboard menu operation and 844×390 landscape access passed with and without JavaScript.
- All five Boracay submenu topics retain the shared hero, correct active state and scroll behavior. Incoming homepage, footer, safari and calculator links open with the H1 visible at 390 and 1440.
- Calculator input and results, reduced-motion behavior, 404 recovery and visible skip-link focus passed. All 21 routes retain their H1 and WhatsApp links with JavaScript disabled. Contact links were inspected without sending messages.
- Twenty-one focused responsive checks passed against the fresh export for the Shop/About fields and lesson comparison, from 320 to 1920 pixels. Keyboard course jumps focus the correct heading; mobile lesson enquiry controls remain 48px high.
- The 21-route content scan found no broken internal paths/fragments, duplicate IDs, dangling label/ARIA references, unnamed links or missing image alternatives. Six sampled external guide/teaching links returned HTTP 200. Existing course prices matched the owner record; no public factual rewrite was needed.
- Public labels and the changed link contexts were reviewed using no-ai-slop; wording was preserved. `git diff --check` and documentation-link checks passed.

## Sources and limits

The current project documents, typed content, exported HTML and installed Next.js 16.3.3 Link guide were the primary evidence. The installed Link guide explains scrolling to the first Page element, which accounts for the nested-layout arrival defect. The [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) were consulted on 2026-09-13; repository requirements take precedence. Existing Playwright and axe installations were used without adding dependencies.

The production verification used a local static preview at `http://127.0.0.1:4190`. It does not verify live hosting, production status codes, redirects, headers or deployment settings. Safari/WebKit, Firefox, physical devices and screen-reader sessions were not tested. Automated accessibility checks do not establish WCAG conformance. Coming-soon Events and safari pages and About team placeholders remain owner-approved incomplete content; this audit does not invent their details.
