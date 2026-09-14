# Embed browser feedback, 2026-09-13

Status: Implemented locally and verified; not deployed

The owner requested eight visual/behavior changes on the Boracay guide. The lesson chapter now spans the viewport in lagoon blue; Forecast appears in the shared submenu; the forecast introduction and load/privacy controls are removed; Windguru loads automatically; the Boracay location block removes its repeated Habagat paragraph and Maps button, shows the confirmed name/address and loads the pinned map automatically. Shared embed behavior also applies on Contact and the kite-size guide. [ADR 0004](../decisions/0004-automatic-maps-and-forecasts.md) supersedes the earlier optional-loading decisions.

## Change and review record

Branch: `codex/google-maps-embed`. Base and current HEAD: `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f`. Earlier map and Windguru edits were preserved. Work remains uncommitted for owner review. No push, merge, production deployment, secret, DNS or dependency change occurred.

This revision touches the Boracay page/navigation/navigation styles, island content record, shared service-page styles, map and forecast components/styles, iframe audit and inventory, reviewed client inventory, three export-test files and new reviewed-frame regression tests, plus current documentation. `windguru-embed.tsx` was removed; the two embeds no longer require client state. Only confirmed business name/location fields are shown; the map vendor independently displays its own listing details.

An independent read-only reviewer approved the exact frame exception and navigation source (`3287fcd06295460953570a02f4a52949615d25ab7bb397062e4f5143bad2f703`) before inventory update. It found no blocking issues. The manifest pins full URLs, exact iframe attributes and routes. Other active content and extra permissions, parameters, handlers and resource attributes still fail the audit.

## Verification

- Focused tests failed before implementation for the requested missing static embeds. New audit acceptance tests also failed before the exact exception was added.
- `npm run lint`, `npm run typecheck` and `npm run build` exited 0. Build log: `/tmp/hangin-embed-feedback-build.log`.
- The first full test run found the existing submenu test's old link list. It was updated to include the specifically requested Forecast anchor. No unrelated assertion was removed.
- Final `npm test` exited 0: 150 passed, zero failed/skipped. Log: `/tmp/hangin-embed-feedback-tests.log`. Output was freshly built before these export tests.
- `npm run audit:privacy` exited 0 with zero findings and explicit `reviewed-third-party-frame` entries. Log: `/tmp/hangin-embed-feedback-privacy.log`. This result permits automatic provider requests and does not audit their internals.
- Browser rendering confirmed the lesson band spans exactly 1280 pixels on desktop and 320 pixels in a narrow viewport, with no page overflow. Ocean text on lagoon blue has a calculated contrast ratio of 4.58:1. Existing focus and reduced-motion styles remain; no new motion or images were introduced.
- Keyboard activation of Forecast from a child page navigated to the main guide and focused `windguru-heading`. The static menu contract tests cover all five Boracay guide routes. Contact and kite-size pages rendered their respective eager frames with no page overflow.
- Native Safari loaded both external frames without a click, including the real Windguru table and the Google pin for Hangin. The in-app browser rendered the parent pages but showed blank external frames, so provider rendering was verified in Safari. A temporary localhost export server applied the repository headers except HTTPS-upgrade behavior on plain HTTP; its responsive wrapper alone permitted same-origin framing. Production files retain their exact header policy.
- Changed-document relative links and `git diff --check` passed. Public labels/address were reviewed against confirmed content and the no-AI-slop rules.

## Limits and local preview

No physical-phone, full screen-reader, automated accessibility scan, complete provider network/storage trace or deployed-header check was performed. These local checks do not claim full accessibility or privacy compliance. The existing Next.js dev server on port 3000 belongs to this checkout and was left running, fulfilling the local preview request. No second dev server was started.

## Follow-up: location section moved to About

The owner's next browser comment moved the address/map section to About after gear partners. Its CSS moved to `app/about/location.module.css`; the old Boracay location stylesheet and section were removed. Contact retains its map; Boracay retains Windguru. Google's exact route inventory now accepts About/Contact and explicitly rejects the previous Boracay placement. Current topic documents record this supersession.

Independent review found no issues. `npm run verify` exited 0 with lint, typecheck, fresh export, 151 passing tests, no skipped tests and zero audit findings (`/tmp/hangin-about-location-verify.log`). Browser review confirmed desktop placement on About, absence on Boracay and a 390-pixel mobile layout without overflow (map width 358 pixels). The unchanged provider iframe renders blank in the in-app browser; its source/pin had been verified in native Safari in the preceding revision. No new full provider, screen-reader, network/storage or deployed-header audit was run for this placement-only change. Copy, colors, focus styles and reduced-motion behavior are unchanged. `git diff --check` passed. Work remains local and uncommitted on the same branch; the dev server remains on port 3000.

## Follow-up: Forecast wind icon

Added the official Tabler wind paths from the existing pinned icon revision to `menu-icon.tsx` and used that decorative 18-pixel SVG beside Forecast. An independent reviewer approved navigation hash `b0a0e6a6cea85e99ca59e7bf008aa9f2b198da7bc0d7e2e0d7e49b416adc679d` before updating its inventory. Lint, typecheck, fresh build, 151 tests, privacy audit and diff check passed; logs use `/tmp/hangin-forecast-icon-*`. Desktop browser inspection confirmed matching alignment and the unchanged accessible Forecast label. No new responsive, screen-reader or provider audit was needed for the unchanged shared icon sizing and behavior; these were not rerun. Work remains local on the same branch.

## Follow-up: location directly below About hero

The owner moved Find Hangin upward. The unchanged section now uses ServicePage's existing `overview` slot, immediately after the page hero and before the school story, in both DOM and visual order. No CSS reordering, styling, copy, iframe-policy or dependency change was needed. Browser inspection confirmed the hero/location transition and a single location section. `npm run verify` passed with 151 tests and zero audit findings (`/tmp/hangin-about-map-order-verify.log`); `git diff --check` passed. The preceding responsive/provider checks apply to the unchanged section; no new physical-device, screen-reader or provider trace was performed. Current topic documents record the new order. Work remains uncommitted on the same local branch.
