# Current architecture

Status: Current
Last reconciled: 2026-09-13; integration verification is recorded in the [branch integration report](../operations/2026-09-13-branch-integration.md).

## System shape

Hangin is a Next.js 16.3.3 App Router application compiled to a static directory. React renders the public pages at build time. A generic static host serves the contents of `out/`; there is no Next.js server in production.

```text
typed records and local assets
            ↓
server-rendered route components
            ↓
Next.js static export
            ↓
out/ HTML, CSS, JS, fonts, images, metadata
            ↓
static host or CDN
            ↓
visitor follows WhatsApp, email, telephone, or internal links
```

## Runtime and build contract

- Next.js 16.3.3, React 19.2.8, React DOM 19.2.8, TypeScript 5.
- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`.
- Pages and shared components are Server Components, apart from the local kite-size calculator and Boracay shared navigation. The calculator uses browser memory only; the navigation selects the current static child route. Core content and contact paths remain prerendered.
- Native HTML handles the mobile menu and FAQ disclosure behavior.
- Mobile-menu destinations use ordinary document links so the destination loads with its native disclosure closed. Links entering the Boracay guide from the header, footer, homepage, safari page and kite-size guide also use document navigation, which opens the destination at its shared hero. The Boracay submenu retains Next.js navigation with preserved scroll. Other site links retain Next.js navigation. No additional client component is needed.
- Local responsive images and framework-emitted fonts are served from the static artifact.
- The production artifact contains twenty-one public routes, a custom 404, robots, sitemap, manifest, icons, and social imagery.

Static export does not provide request-time cookies, headers, redirects, rewrites, middleware, Server Actions, ISR, authenticated preview, secret-bearing APIs, or webhooks. Host-level redirects and headers are separate deployment responsibilities. Dynamic services must live behind a hosted provider or a separately operated server boundary.

## Primary modules

| Area | Current source |
| --- | --- |
| Business identity, routes, contact behavior | `content/site.ts` |
| Shared service-page shape and water-service copy | `content/water-pages.ts` |
| Island, accommodation, shop, and about copy | `content/island-pages.ts` |
| Boracay places, activities and trip planning | `content/boracay-guide.ts`, `components/boracay-subpage.tsx`, `app/kitesurfing-boracay/*/page.tsx` |
| Image files, dimensions, alt text, responsive candidates, provenance type | `content/images.ts` |
| Image attribution ledger | `public/images/ATTRIBUTION.md` |
| Public asset credits and bundled licenses | `app/legal/page.tsx`, `public/licenses/` |
| Metadata and canonical construction | `lib/seo.ts` |
| Global metadata and sitewide JSON-LD | `app/layout.tsx` |
| Sitemap, robots, manifest | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |
| Shared shell | `components/site-header.tsx`, `components/site-footer.tsx` |
| Shared page rendering | `components/service-page.tsx`, `components/page-hero.tsx` |
| Contact conversion boundary | `components/contact-cta.tsx`, `content/site.ts` |
| Static contract verification | `tests/*.test.mjs` |

## Contact data flow

Pages provide a typed `ContactContext`. `getPrimaryContactAction` resolves that context to a label, new-tab accessible name, prefilled message, destination, and safe external-link attributes. `ContactCta` renders the result. The provider is currently WhatsApp, and email remains visible in the larger contact treatment.

The lesson price comparison uses `getLessonContactAction(course)` to include the selected course and prompts for dates and riding level. Both contact helpers use the same destination builder and external-link attributes in `content/site.ts`. Course enquiries are ordinary exported links; visitors fill in and send the message in WhatsApp.

This boundary can later resolve different hosted booking destinations by service. It must not create a checkout session, publish availability, or carry secrets in the static application.

## Content and SEO data flow

Typed page records feed `ServicePage`, page heroes, FAQ markup, breadcrumbs, and route metadata. Sitewide identity feeds JSON-LD. Public routes feed navigation and sitemap generation, although several route labels and homepage strings remain embedded in components.

The Boracay spot page inserts `BoracayPlaces` through the shared template's optional children slot. Its child guide uses the existing hero, contact and breadcrumb components with a dedicated static editorial layout. `Breadcrumbs` accepts an optional parent for the nested route; the child page uses the same parent record for visible and JSON-LD breadcrumbs. No client component or production dependency was added.

The current model has useful types but is not yet a single validated registry. Routes, navigation, sitemap data, tests, attribution prose, homepage content, and some shell labels duplicate information. The future content-management brief proposes a schema-backed registry and compatibility adapter before any CMS is selected.

## Extension boundaries

- Booking and payments: hosted links first; a separate server-side gateway only if live availability or custom checkout becomes necessary.
- Content management: Git-first, build-validated records; an editor UI is optional.
- Localization: build-time locale and route registries; every published route is known during export.
- Analytics: no browser tracker by default; any collector is external to this static export.
- Commerce: a separate offer, inventory, order, and payment boundary; the contact adapter stays an enquiry boundary.

Each extension requires an accepted topic specification and, when it changes the static-host model, an ADR.

## Local kite sizing

The [kite size guide](kite-size-guide.md) adds a small client component for weight, dates and level. It uses a sourced local lookup, native form controls and React state. No rider input leaves the page or changes its URL. Static export, source guidance, reference chart and contact links remain intact.

### Owner-supplied media

`content/images.ts` supports licensed contextual proof, owner-provided photographs and generated decoration as separate variants. Owner permission and source hashes live in `public/images/ATTRIBUTION.md` and `docs/project/owner-media.json`. `content/videos.ts` and `components/lesson-videos.tsx` retain reusable local silent MP4 playback, but the owner removed that section from the Lessons route on 2026-09-12. The component is no longer imported by the page. Responsive photo derivatives live under `public/images/owner/`; videos and posters live under `public/videos/`. The source `images/` archive is not copied into the static export.

### Safari detail routes

`content/safari-trips.ts` owns the three named trip records. `app/kite-safaris/[slug]/page.tsx` exports only those slugs using `generateStaticParams`, awaited route params and `dynamicParams = false`. The pages remain static Server Components. `content/site.ts` registers all public routes and separately lists the pending safari routes; the pending pages are excluded from shared navigation and the indexable route list used by the sitemap. Cards link directly to them. `getSafariContactAction` uses the existing contact builder for trip-specific enquiries. The shared ServicePage omits its detail-section wrapper when the section record is empty; the safari page supplies its card list through the existing overview slot.


### Boracay shared layout, 2026-09-13

`app/kitesurfing-boracay/layout.tsx` owns the persistent hero, H1 and main landmark for the spot guide and Things to do. Its small `navigation.tsx` client component uses Next.js `useSelectedLayoutSegment` and `Link` to select the active subpage and preserve scroll on internal switches. Safari is a normal link out to its original route. No new routes or indexing behavior are introduced. The shared layout renders one route-aware breadcrumb above the hero, while page-specific breadcrumb JSON-LD remains in the child pages. `ServicePage` accepts an optional `embedded` flag so the spot body can reuse its content, FAQ and contact rendering without duplicating the shared hero or main landmark. All child content and current-page navigation are prerendered in the static export; the rest of the layout remains server-rendered.

The desktop primary-menu Boracay link disables Next.js automatic page scrolling with `scroll={false}`. Because the Boracay hero lives in a shared layout, default navigation otherwise scrolls past it to the child page. Submenu links retain their existing scroll-preserving behavior; native mobile-menu document links remain unchanged.


### Dedicated Boracay subpages, 2026-09-13

The owner's latest clarification replaces the combined island guide and fragment-based submenu with four explicit static child routes: `places-to-be`, `things-to-do`, `planning-your-days` and `practical-questions`. Each page supplies its typed record to `BoracaySubpageContent`, which renders only that topic, its existing sources or questions, breadcrumb JSON-LD and contact section. The shared layout owns the unchanged hero and its kite-size quick link. It passes only menu labels, titles, slugs and paths to the small navigation client component; content stays server-rendered. `useSelectedLayoutSegment` identifies the current page for the menu and top breadcrumb. Hash subscriptions are removed. Next links use `scroll={false}` between Boracay pages, and Safari still opens its existing standalone route. All four routes are registered in the public route list, sitemap and shared mobile/footer navigation. No runtime service or new dependency is involved.

## Review and host support

Contact and the Boracay spot guide share `components/location-map.tsx`. It loads Google's verified listing only after visitor activation, removes the iframe on Hide, and persists no choice. `content/site.ts` owns both the existing directions URL and Google's copied embed URL. [ADR 0002](../decisions/0002-optional-google-maps.md) records the privacy boundary, narrow host CSP exception, source provenance and verification requirements. Static output has no iframe or automatic Google connection; its hash-reviewed client component adds the frame at runtime.

`/terms/` provides website inquiry and complaint guidance; `/accessibility/` provides practical website and reporting guidance. `/legal/` remains the central asset-credit page. These routes do not establish unconfirmed booking policy, a complete privacy notice or an accessibility conformance claim. `public/_headers` supplies a Cloudflare-compatible static header policy alongside the existing `wrangler.toml`; other hosts must configure equivalent responses. This is a host artifact, not a Next runtime header API.

`npm run audit:privacy` parses the fresh static export and compares framework assets with the matching build. The deployed audit compares an explicit origin against the local expected routes and indexable sitemap set, and checks response/redirect evidence. Parser dependencies are development-only. See [the audit documentation](../../scripts/README.md) for scope and limits.

## Earlier optional Windguru forecasts, 2026-09-13

The Boracay spot guide and kite-size guide use the server-rendered `WindForecast` section and optional `WindguruEmbed` client boundary. `content/forecast.ts` owns the official Hangin spot and GFS widget URLs. No frame loads initially; activating it opens Windguru in a sandboxed cross-origin iframe, with no parent vendor script, API, storage or calculator-data transfer. Static provider/contact links remain available. [ADR 0003](../decisions/0003-optional-windguru-forecast.md) records sources, privacy boundaries and the narrow additional CSP frame source.

## Automatic embed revision, 2026-09-13

The owner’s browser comments supersede the earlier optional loading described above. Both map and forecast now render as eager static iframes with no load/hide controls, disclosure bands or embed client boundaries. `LocationMap` and `WindForecast` are Server Components. `scripts/reviewed-embeds.json` pins complete sources, attributes and permitted routes; the privacy audit records these expected third-party frames without auditing their internals. All other external resources remain rejected. The shared Forecast navigation link is an ordinary fragment link to the existing Boracay page. See [ADR 0004](../decisions/0004-automatic-maps-and-forecasts.md).

## Location section moved to About, 2026-09-13

The owner’s next browser comment moves the full “Find Hangin” address and pinned map section from the Boracay guide to About. A subsequent owner comment places it directly below the page hero, before the school story. The Contact map remains. Google’s reviewed route allowlist is now `/about/` and `/contact/`; Boracay retains Windguru only. Styling, confirmed address, automatic loading and provider restrictions are unchanged. This supersedes the earlier placement descriptions above; ADR 0004’s loading policy still applies.
