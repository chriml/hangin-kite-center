# ADR 0003: Optional Windguru forecasts

Status: Accepted for implementation under the owner's feature request
Date: 2026-09-13
Owner: Hangin project owner

## Context and decision

After requesting optional Google Maps, the owner requested embedded Windguru forecasts wherever useful. Add the same load/hide pattern to the Boracay spot guide and kite-size guide. Keep the forecast separate from the calculator's seasonal estimates and inputs. Contact and unrelated pages do not need a forecast table.

Use Windguru's own forecast widget for spot `1280920`, labelled “KWind Hangin Kite Center Boracay, Bulabog Beach Boracay,” and basic GFS 13 km model `3`. The official generator and loader provide the iframe endpoint and parameters stored in `content/forecast.ts`: 72 hours, three-hour intervals, wind/gusts in knots, direction, Celsius temperature and precipitation. Preserve Windguru's table and attribution. Its widget CSS hides the model-init timestamp, so the visible note directs visitors to Open Windguru for the update time. Do not copy or cache forecast values, call a forecast API, infer station ownership or publish measurements as Hangin facts.

Alternatives were an external link alone, an automatically loaded vendor script, and an optional iframe. Select the optional iframe to fulfill the embed request while preserving initial privacy. Use the existing React dependency and a small `WindguruEmbed` client component. The section heading, explanatory copy and direct Windguru link remain server-rendered. No additional library, account or API key is needed.

## Runtime and privacy boundary

The initial document has no iframe or remote resource hint. A visitor selects Load to create the frame and Hide to remove it. Selection stays in component memory and is not persisted. No calculator input, contact information or local storage is read or passed to Windguru. The visible disclosure links to Windguru's privacy policy and explains IP-address and possible cookie handling. Hiding cannot undo earlier requests or remove vendor cookies; this is an optional content control, not a general consent system or a legal-compliance claim.

The frame uses `referrerPolicy="no-referrer"` and `sandbox="allow-scripts allow-same-origin"`. It cannot navigate the Hangin top-level page or open popups. The static Open Windguru link is the route to the full provider site, including model details. Add only `https://www.windguru.cz/widget-fcst-iframe.php` to the host CSP's `frame-src`, alongside the previously accepted Google endpoint. Keep parent `script-src`, `connect-src` and other directives unchanged. Scripts within Windguru's separate origin remain controlled by that provider, whose privacy policy covers its own retention and processing.

The direct iframe endpoint is derived from Windguru's official loader, rather than an independently documented iframe API. Omitting its parent loader avoids sending the parent hostname/full URL and running third-party JavaScript in Hangin's document. It also omits automatic resizing: use a responsive frame with explicit height and retain Windguru's native table scrolling/dragging and the external link. Review this integration if Windguru changes its widget format.

## Verification and limits

Review the client source independently before recording its hash. Build before export tests; require no initial iframe, static fallback and contact links, exact frame sources and negative CSP tests. Render both routes, load/hide with keyboard, inspect mobile sizing and provider attribution, and test blocked external frames. The existing privacy audit continues to reject initial third-party loads. Production deployment is not authorized by this implementation request. Full assistive-technology and deployed-header checks remain separate release evidence.

## Sources

Accessed 2026-09-13:

- [Hangin forecast spot](https://www.windguru.cz/1280920), verified by its displayed location name.
- [Official widget generator](https://www.windguru.cz/forms/forecast_widget.php?id_spot=1280920&id_model=3) and [generated loader](https://www.windguru.cz/js/widget.php?s=1280920&m=3&uid=wg_hangin), which constructs `widget-fcst-iframe.php`.
- [Windguru forecast distribution](https://www.windguru.cz/help.php?sec=distr): offers widgets, at most 20 forecasts per domain; custom spots support basic models. This site uses two instances of the same basic forecast.
- [Windguru terms](https://www.windguru.cz/help.php?sec=terms) and [privacy policy](https://www.windguru.cz/help.php?sec=privacy). Keep the offered widget presentation and attribution instead of scraping/reformatting data.
- Installed Next.js 16.3.3 guides `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.
