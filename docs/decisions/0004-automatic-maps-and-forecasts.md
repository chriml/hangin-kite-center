# ADR 0004: Automatically rendered maps and forecasts

Status: Accepted under the owner's explicit browser comments
Date: 2026-09-13
Supersedes: the activation controls and initial iframe restrictions in ADRs 0002 and 0003

## Decision and authorization

The owner explicitly requested always-loaded Windguru forecasts and the Google map with Hangin's pin, removing the load/hide controls and disclosure bands. Render both providers as eager static iframes. This replaces the earlier click-to-load design; it does not require a new server or a parent third-party script. The shared components apply the behavior consistently on Contact and the Boracay guide for Maps, and the Boracay and kite-size guides for Windguru.

Both embed components are now Server Components with no React state or client boundary. Windguru retains its sandbox (`allow-scripts allow-same-origin`); both frames retain `no-referrer`, accessible titles and responsive dimensions. The exact provider source URLs and host CSP endpoints are unchanged. No forecast values are copied into the calculator or structured data. The ordinary Open Windguru link remains available. Per the owner's targeted comments, the Boracay location block removes the extra Maps button and repeated Habagat meeting-point paragraph; that guidance remains in the main spot article and Contact page.

The confirmed address is displayed as Hangin Kite Center, Bulabog Beach, Boracay, Philippines. No street, barangay, postcode or coordinates are inferred. The verified Google listing supplies its own map pin. Forecast is an ordinary anchor in the shared Boracay submenu, usable from child routes without a new indexable page. The lesson chapter is full width with the existing lagoon blue and ocean text; its image, copy and DOM order remain unchanged.

## Privacy and audit contract

Google and Windguru receive requests automatically when these pages load, including IP address and browser/request information, and may use cookies under their own practices. This is an intentional change from the initial no-third-party boundary. It is not an assertion about legal compliance or vendor retention. The owner requested removal of the in-section disclosure controls; their removal does not make the provider requests local or tracking-free.

`scripts/reviewed-embeds.json` pins complete source URLs, route allowlists and every permitted iframe attribute. The audit accepts only those exact combinations and records each as `reviewed-third-party-frame`; it does not crawl or audit provider internals. Unknown URLs, additional query data, other routes, altered permissions, removed restrictions, `srcdoc`, authored handlers, tracking attributes, and other active embeds remain rejected. Tests exercise both accepted and rejected cases. Existing host CSP, permissions policy and all non-frame resource restrictions remain intact.

This decision authorizes the local implementation and its focused audit update. Production deployment is a separate action. Source provenance remains in [ADR 0002](0002-optional-google-maps.md) and [ADR 0003](0003-optional-windguru-forecast.md). The earlier operations reports describe their earlier implementation, not the current loading policy.
