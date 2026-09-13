# Cinematic homepage photograph verification

Status: Current
Verified: 2026-09-12

## Scope and authority

The owner approved the cinematic full-screen hero preview, requested better video, then chose the existing photograph. The homepage now uses `siteImages.boardRiding` behind the approved headline, with a transparent homepage header, a linked Bulabog Beach location label, WhatsApp action and follow-up note, plus the Duotone designation and reviews inside the lower edge of the hero. No video or animated photo movement is used. Source files and permission records are unchanged.

Branch: `codex/image-descriptions-quality-ranks`.
Base and HEAD: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`.
Changes are uncommitted. Existing unrelated work was preserved. The incremental comparison snapshot is `/tmp/hangin-cinematic-photo-before`.

Files changed for this request:

- `app/page.tsx`
- `app/page.module.css`
- `components/site-shell.module.css`
- `tests/routes-and-seo.test.mjs`
- `docs/project/content-and-design.md`
- `docs/project/seo-accessibility-media.md`
- This verification record

## Evidence

- `npm run verify`: exit 0 after the final source change, including lint, typecheck, a fresh default production build/static export and all 55 Node tests. No tests skipped. Log: `/tmp/hangin-cinematic-photo-verify.log`.
- `git diff --check`: exit 0.
- Browser review of the fresh static preview at `http://127.0.0.1:4187/`: homepage checked at 320, 390, 833 and 1440 pixels wide; no horizontal overflow. The rider's face remains above the headline. The hero can grow on short/narrow screens rather than clipping copy.
- Homepage image uses the existing 1800-pixel responsive candidate for large cover crops and has eager/high-priority loading, meaningful alt text and intrinsic dimensions. The opening contains no video; its image has no CSS animation.
- Hero WhatsApp target is 52 pixels high; Maps and desktop services link are 48 pixels high. Mobile header controls are 48 pixels high.
- Native mobile menu opened by keyboard; its focus outline measured 3 pixels. Following its Lessons link loaded the destination with the menu closed and the normal header restored.
- All ten supporting pages rendered with their normal relative-positioned, sun-colored headers and no horizontal overflow at 1440 pixels. Client navigation from Home to About and back switched the header between normal and overlay styling correctly.
- Homepage visible content and accessible structure were read through. Existing public-copy tests pass, along with route, metadata, image provenance, contact, static HTML and contrast-token checks.
- Independent read-only review of the incremental source diff returned no actionable findings.

## Sources and limits

Installed Next.js 16.3.3 guides consulted on 2026-09-12: `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and `11-css.md`. Existing frontend-design, no-ai-slop and verification workflows were applied. The user-approved prototype supplies the design direction; owner-provided media provenance remains in `public/images/ATTRIBUTION.md` and `owner-media.json`.

Static/no-JavaScript content was verified through the freshly exported HTML tests and code review; browser JavaScript was not disabled for this check. Reduced-motion compatibility follows from the absence of hero motion, supported by computed image animation state. Readability and crops received visual review, not an exhaustive pixel contrast or assistive-technology audit. No stock purchase, external publication, production deployment, commit or push occurred. Owner visual review of the local result remains available.


## Owner annotation update, 2026-09-12

The owner requested removal of the repeated Hangin identity, the lower “Get to know Hangin” link and the standalone Maps button. “Bulabog Beach, Boracay” now links to the existing Maps destination with the existing decorative pin icon. The follow-up note sits below WhatsApp and the review badges sit alongside the Duotone designation inside the photograph. They stack on screens below 600 pixels. The saved cinematic video template is unchanged.

This incremental update touches `app/page.tsx`, `app/page.module.css`, the existing homepage identity assertion in `tests/routes-and-seo.test.mjs`, the content/design and media documents, and this record. Baseline snapshot: `/tmp/hangin-hero-comments-before`; branch and HEAD remain as above. Implementation authorized; no commit, push or deployment.

- Initial `npm run verify` passed lint/typecheck but stopped while cleaning `.next/server` with `ENOTEMPTY`; inspection found only a macOS `.DS_Store` in that generated directory. An unchanged retry passed the full pipeline and all 56 tests, with none skipped. Final log: `/tmp/hangin-hero-comments-verify-retry.log`.
- Browser review at 320, 390, 833 and 1440 pixels found no horizontal overflow. The five requested edits are present, with all text and ratings inside the image. The location has a 48-pixel target, correct Maps URL and visible 3-pixel keyboard focus; review links are 80 pixels high. Existing image motion remains `none`.
- The full homepage copy/structure was inspected; the edited opening and lower edge were visually checked on phone, tablet and desktop. The existing overlay supports the new text and review placement. Independent incremental review found no actionable findings; `git diff --check` passed.
- Static exported content and contact paths passed the existing suite. No external Maps navigation, screen-reader session, manual JavaScript-disabled browser run, exhaustive image-pixel contrast audit or production HTTP review was performed.
