# Batbatan safari content

Status: Current implementation; awaiting owner review and publication
Date: 2026-11-10

Base and unchanged HEAD: `36ac439e4607293be42b76e82a6c6d2896cfad40`.
Branch: `feat/batbatan-safari-dates`. Changes remain uncommitted.

## Scope and authority

The owner supplied December 4, January 4, February 4 and March 4, other dates upon request for at least 7 kiters, and private trips for smaller groups. The existing Batbatan holding page now shows those details and a custom WhatsApp request. Its listing card shares the same record. No year, recurrence, price, duration, itinerary, availability or inclusion is inferred. Existing noindex and sitemap policies are retained pending schedule-year confirmation and indexing review.

Changed implementation: `app/kite-safaris/page.tsx`, `app/kite-safaris/[slug]/page.tsx`, `app/kite-safaris/safaris.module.css`, `content/safari-trips.ts`, and the safari contact helper in `content/site.ts`. Existing safari/contact tests and current product, architecture and SEO documentation were updated. Pre-existing Instagram, package/build-command and documentation changes were preserved.

## Evidence

- `npm run verify`: exit 0, including lint, typecheck, fresh Turbopack production export, Markdown twins, 170 passing tests and static privacy audit.
- Updated safari tests failed against the previous export because Batbatan still had a holding message and lacked group size in its request; the fresh export passes.
- Playwright rendered both affected pages at 320, 390, 860 and 1280 pixels with no horizontal overflow. Desktop detail and mobile card images were visually reviewed. New copy was read end to end using the no-ai-slop checks.
- Batbatan contact and back buttons measure 50 pixels high. The contact link has visible focus. Keyboard Enter on the listing More link reaches the Batbatan page. Reduced-motion preference was checked; no animation was added.
- Existing palette and button styles are reused. No image or external script was introduced. The exported contact href names Batbatan and asks for dates, level and group size.
- Independent focused reviewer reported no concrete bugs. Browser console showed unused prefetch/preload warnings, with no errors during the initial detail-page check.
- `git diff --check`: exit 0. `AGENTS.md` remains unchanged at 12,841 bytes.

No production deployment or deployed HTTP verification was performed: this task authorizes repository changes, and production publication requires explicit authorization. No WhatsApp message was sent. A full accessibility audit and screen-reader session were not performed.

## Sources

Owner request in this conversation, 2026-11-10. Next.js 16.3.3 installed guides for static exports and generateStaticParams were read on the same date. Existing frontend-design, no-ai-slop, testing and verification skills covered the work; the internet skill search found overlapping Next.js skills without a material need for another installation.

## Follow-up, 2026-11-11

The owner confirmed that the dates repeat every year, owns the Google and Bing search and listing accounts, confirmed the current location details, gave approximate opening hours (sunrise until around midnight) and listed the most common customer questions. Batbatan is now indexable and in the sitemap; Contact shows the hours. `npm run verify` exited 0: lint, typecheck, fresh production build, 170 of 170 tests, zero privacy-audit findings. No push, deployment or external account action was performed.
