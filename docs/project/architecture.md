# Current architecture

Status: Current
Last verified: 2026-09-04

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
- Pages and shared components are Server Components. The repository contains no `"use client"` boundary.
- Native HTML handles the mobile menu and FAQ disclosure behavior.
- Local responsive images and framework-emitted fonts are served from the static artifact.
- The production artifact contains nine public routes, a custom 404, robots, sitemap, manifest, icons, and social imagery.

Static export does not provide request-time cookies, headers, redirects, rewrites, middleware, Server Actions, ISR, authenticated preview, secret-bearing APIs, or webhooks. Host-level redirects and headers are separate deployment responsibilities. Dynamic services must live behind a hosted provider or a separately operated server boundary.

## Primary modules

| Area | Current source |
| --- | --- |
| Business identity, routes, contact behavior | `content/site.ts` |
| Shared service-page shape and water-service copy | `content/water-pages.ts` |
| Island, accommodation, shop, and about copy | `content/island-pages.ts` |
| Image files, dimensions, alt text, responsive candidates, provenance type | `content/images.ts` |
| Image attribution ledger | `public/images/ATTRIBUTION.md` |
| Metadata and canonical construction | `lib/seo.ts` |
| Global metadata and sitewide JSON-LD | `app/layout.tsx` |
| Sitemap, robots, manifest | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |
| Shared shell | `components/site-header.tsx`, `components/site-footer.tsx` |
| Shared page rendering | `components/service-page.tsx`, `components/page-hero.tsx` |
| Contact conversion boundary | `components/contact-cta.tsx`, `content/site.ts` |
| Static contract verification | `tests/*.test.mjs` |

## Contact data flow

Pages provide a typed `ContactContext`. `getPrimaryContactAction` resolves that context to a label, prefilled message, destination, and safe external-link attributes. `ContactCta` renders the result. The provider is currently WhatsApp, and email remains visible in the larger contact treatment.

This boundary can later resolve different hosted booking destinations by service. It must not create a checkout session, publish availability, or carry secrets in the static application.

## Content and SEO data flow

Typed page records feed `ServicePage`, page heroes, FAQ markup, breadcrumbs, and route metadata. Sitewide identity feeds JSON-LD. Public routes feed navigation and sitemap generation, although several route labels and homepage strings remain embedded in components.

The current model has useful types but is not yet a single validated registry. Routes, navigation, sitemap data, tests, attribution prose, homepage content, and some shell labels duplicate information. The future content-management brief proposes a schema-backed registry and compatibility adapter before any CMS is selected.

## Extension boundaries

- Booking and payments: hosted links first; a separate server-side gateway only if live availability or custom checkout becomes necessary.
- Content management: Git-first, build-validated records; an editor UI is optional.
- Localization: build-time locale and route registries; every published route is known during export.
- Analytics: no browser tracker by default; any collector is external to this static export.
- Commerce: a separate offer, inventory, order, and payment boundary; the contact adapter stays an enquiry boundary.

Each extension requires an accepted topic specification and, when it changes the static-host model, an ADR.
