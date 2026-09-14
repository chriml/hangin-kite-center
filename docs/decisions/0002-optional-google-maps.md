# ADR 0002: Optional Google Maps on location pages

Status: Accepted for implementation under the owner's feature request
Date: 2026-09-13
Owner: Hangin project owner

## Context and authorization

The owner requested embedded Google Maps on the pages that explain where to find Hangin. This authorizes a local implementation on Contact and the Boracay spot guide. Production deployment remains a separate action. The existing Google Maps link identifies place ID `ChIJDZwPzD08pTMRCv8c2mLjjBw`.

## Options considered

1. Keep an external link only. This does not provide the requested embedded map.
2. Load the iframe automatically. Simpler, but contacts Google before the visitor chooses to use the map.
3. Load Google's iframe after a visitor action. Selected to preserve initial privacy and static delivery with the existing React dependency.

## Decision

Use Google's own Share → Embed a map output, retrieved from that verified listing on 2026-09-13, in `siteConfig.mapsEmbedUrl`. The shared `LocationMap` client component creates the iframe only after a visitor selects “Load Google Maps.” It has no initial iframe, preconnect, remote preview, storage, analytics or API key. The same button hides the iframe; the choice lives only in component memory and resets when the component unmounts or the document reloads. Google retains control of its map content and attribution. Its address, coordinates, hours and ratings are not imported into Hangin copy or structured data.

The map has an accessible title, fixed responsive space and a persistent keyboard-operable toggle. Static Maps, WhatsApp and email links remain available when JavaScript or Google is unavailable. The existing Habagat meeting-point warning appears beside both maps.

The static host CSP permits only `https://www.google.com/maps/embed` in `frame-src`. All other directives stay unchanged. Google runs its map within a cross-origin frame; no Google script is added to Hangin's document. The map component must pass independent review before its exact source hash enters the reviewed-client-boundary inventory. The audit continues to reject all iframes in initial HTML.

## Privacy boundary and limits

Before activation, Hangin makes no map request. After activation, Google receives the visitor's IP address and request/browser information and may use cookies under its own privacy practices. A visible explanation and Google privacy-policy link precede the map. `referrerPolicy="no-referrer"` omits the Hangin page URL. The component requests no geolocation permission and retains no visitor data. Hiding the map removes its browsing context; it cannot undo requests already made or delete Google cookies. This is an optional content control, not a sitewide consent manager or a claim of legal compliance. Google's retention practices are outside Hangin's control.

## Acceptance and verification

Verify both routes before and after activation, repeated load/hide, keyboard focus, mobile sizing, static contact/directions fallbacks, blocked map behavior and unchanged initial privacy audit. Build before running export tests. Test the host CSP locally and retain negative tests against broader frame sources. Real production headers, geographic variations and a full assistive-technology review remain release checks.

## Sources

- [Google Maps sharing and embedding help](https://support.google.com/maps/answer/11471036?hl=en), accessed 2026-09-13; the embed URL was copied from the listing's visible Share → Embed a map field.
- [Verified Hangin listing](https://www.google.com/maps/search/?api=1&query=Hangin+Kitesurf+Center+%26+Resort&query_place_id=ChIJDZwPzD08pTMRCv8c2mLjjBw), inspected 2026-09-13.
- [Google privacy policy](https://policies.google.com/privacy), accessed 2026-09-13.
- Installed Next.js 16.3.3 guides `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`, read 2026-09-13.
