# Optional location maps verification

Status: Current task evidence
Date: 2026-09-13

The owner requested Google Maps on the location pages. Implemented on `/contact/` and `/kitesurfing-boracay/`, with one shared click-to-load component, Google's copied listing embed URL, static directions/contact links and a narrow host CSP exception. [ADR 0002](../decisions/0002-optional-google-maps.md) records the authorized behavior and sources. No dependencies were added.

Base and HEAD: `a4c20d7` (unchanged; work is uncommitted on `codex/google-maps-embed`). The initial tree was clean. Changes cover the two routes and their local CSS, the shared map component/CSS, `content/site.ts`, `public/_headers`, reviewed client inventory, map/header tests and the linked architecture/design/privacy/audit documentation. Implementation was authorized; owner review of the final diff remains pending. No push, merge, external message or production deployment occurred.

## Automated evidence

- The two new map tests failed against the prior export because the map controls were absent, establishing the regression baseline (`/tmp/hangin-maps-red.log`).
- `npm run lint`, `npm run typecheck`, `npm run build` and `npm test` all exited 0. The fresh Turbopack export passed all 142 tests with zero skips (`/tmp/hangin-maps-tests.log`). This includes public-copy, metadata, sitemap, 404, contacts and the exact CSP allowlist with rejection of broader frame sources.
- `npm run audit:privacy` exited 0 with no findings (`/tmp/hangin-maps-privacy.json`). All initial HTML remains iframe-free; the reviewed client source hash matches the inventory.
- `git diff --check` passed. Independent read-only review found no blocking issues and approved the new client component's source for the inventory. The reviewer ran its focused tests before the fresh export completed, so that intermediate stale-output result is superseded by the fresh suite above.

## Browser review

Read both pages end to end and reviewed the new copy against no-ai-slop. Verified the Contact desktop layout and both 390-pixel layouts, including real Google map tiles, the Hangin pin and Google attribution/directions. The shared map controls reuse existing contrast colors; the keyboard toggle measures 50 pixels high and retains visible focus when loading/hiding. Repeated activation/hiding removes the iframe, and document navigation returns to the unloaded state. Static directions and WhatsApp links remain present with all page scripts blocked; blocked-map testing leaves those links usable and Hide removes the frame. No messages were sent.

The in-app browser created the frame but kept its contents blank, including with a standalone diagnostic iframe without CSP. Its viewport override also left the actual viewport at 1280 pixels. Native Safari successfully rendered the maps. Mobile verification therefore used a temporary local harness with a 390-pixel same-origin frame, applying the same site CSS and enabling ancestor framing only for that test response. Safari upgraded loopback subresources to HTTPS under the production `upgrade-insecure-requests` directive; the HTTP-only harness omitted that directive and used a fresh localhost origin. The production header file was preserved, including HTTPS upgrade and frame-ancestor denial. These were test harness adjustments, not website workarounds.

## Limits and release checks

Production deployment, HTTPS/redirect/404 behavior and deployed headers were not tested because this was a local implementation request. A full screen-reader/axe audit, physical mobile-device test, browser-wide network/storage trace and geographic variants were not performed; available browser APIs provided DOM/screenshot and console review, not complete network instrumentation. The initial privacy result comes from exported-resource checks plus reviewed source; it does not certify Google's post-activation behavior or legal compliance. No new map-specific motion was introduced; existing reduced-motion rules apply. Review the final diff and verify the hosting headers before release.
