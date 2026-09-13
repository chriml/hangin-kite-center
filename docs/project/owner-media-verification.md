# Owner media integration verification

Date: 2026-09-12. Status: implemented locally; not deployed.

Base and head revision: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` on `codex/image-descriptions-quality-ranks`. Changes remain uncommitted alongside the pre-existing workspace changes. The owner explicitly authorized using the supplied photos and videos on the website. No production action was requested or taken.

## Scope

Nine photographs supply the homepage, lesson courses, rentals, shop and about pages. Two silent beach-practice clips appear on lessons. Originals stay in the source archive. [Selected sources, hashes and transformations](owner-media.json) and [permission and attribution](../../public/images/ATTRIBUTION.md) identify the exact files.

Changed implementation: `app/page.tsx`, `app/page.module.css`, `app/kitesurfing-lessons/page.tsx`, `components/page-hero.tsx`, `components/service-page.tsx`, `components/service-page.module.css`, the new `components/lesson-videos.tsx` and stylesheet, `content/images.ts`, `content/water-pages.ts`, `content/island-pages.ts`, and the new `content/videos.ts`. Added 18 responsive WebP files under `public/images/owner/` and two MP4s with two posters under `public/videos/`. Media/export tests and current media, architecture and design documentation were updated.

## Evidence

- Final `npm run verify`: exit 0. ESLint, TypeScript, a fresh default Turbopack static export and all 55 Node tests passed. A separate copy of the current workspace also passed the complete command. An earlier build encountered an `ENOTEMPTY` build-directory conflict while a development server was active; the later complete runs succeeded without changing Next.js configuration or stopping that server.
- `git diff --check`: exit 0. `AGENTS.md` was not edited by this media integration.
- SHA-256 comparison: all 135 photos and nine source videos still match their archive indexes. The selected source manifest matches those indexes.
- Sharp metadata inspection: all 18 new WebP dimensions match the typed records; source EXIF/XMP/IPTC metadata is absent.
- FFprobe and full FFmpeg decoding: both MP4s are H.264/yuv420p at 394×848, contain no audio streams or source capture metadata, retain 340 and 139 video frames respectively and decode without errors. Encoder/container identification remains.
- Chrome browser review at 1440 and 390 CSS pixels: all five affected pages rendered, every content image loaded, no horizontal overflow and no page JavaScript errors. Heroes, the course grid, service bands, center group and video section were visually reviewed. Portrait gear photos no longer stretch homepage rows; the center group retains every person.
- With JavaScript disabled and reduced motion enabled, both native players started and paused using the Space key, advanced their timelines, displayed the expected resolution and retained visible keyboard focus. No MP4 request occurred before playback. Posters loaded independently.
- New caption colors were checked against their backgrounds. Rental/shop captions use solid ocean on lagoon, approximately 4.58:1. New video text and focus use sun/sand on ocean. Existing contact destination and contrast checks passed.
- New public captions, alternative text and video descriptions were checked against the no-ai-slop evaluation. Existing page copy was read in the rendered output; course and business facts were preserved.
- Independent read-only review found no implementation defect. Its requested extension of the existing media existence/provenance checks to owner photos was included and passed.

The installed Next.js guides `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and `node_modules/next/dist/docs/01-app/02-guides/videos.md` were consulted on 2026-09-12. Browser automation used the bundled Playwright runtime and installed Chrome; no production dependency was added.

## Limits

The source videos are low-resolution portrait footage, so playback stays at or below 320 CSS pixels wide. Their original audio was not assessed for publication and is absent from the website copies. Photographer/videographer names and capture dates were not supplied. Accommodation and safari illustrations remain because the supplied media does not establish those facilities or trips. Production HTTP/deployment checks and a full assistive-technology conformance audit were outside this local media update.

## Homepage shop replacement

Following the 2026-09-12 browser comment, the homepage shop band now uses photo 78 of the Hangin storefront. The shop-page hero is unchanged. Two responsive derivatives and their provenance were added; the collection now contains ten photographs. `npm run verify` exited 0 with all 55 tests passing after a fresh build. Chrome review at 390, 833 and 1440 CSS pixels confirmed that the storefront image loads, the sign remains visible and the page has no horizontal overflow. `git diff --check` passed.

## Homepage hero replacement

Following the next 2026-09-12 browser comment, the homepage hero uses the existing owner photo 37 of an orange-sleeved rider by the palm-lined beach. The red-helmet photo remains in the lesson course grid. No new assets or dependencies were needed. `npm run verify` exited 0 with all 55 tests passing after a fresh build. Chrome checks at 390, 833 and 1440 CSS pixels confirmed the new image loaded without horizontal overflow; desktop and mobile crops were visually reviewed.

## Homepage kite-spot replacement

Following the next 2026-09-12 browser comment, the homepage spot section uses owner photo 41 of kites and riders across the bay. Two responsive WebP derivatives and provenance were added. The former aerial credit was replaced with the new photo’s descriptive caption; licensed aerial usage on guide pages remains unchanged. `npm run verify` exited 0 with all 55 tests passing after a fresh build. Chrome checks at 390, 833 and 1440 CSS pixels confirmed that the replacement loads without horizontal overflow; desktop and mobile framing was visually reviewed. `git diff --check` passed.
