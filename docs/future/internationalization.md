# Future brief: internationalization

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Publish one complete, trustworthy additional language without request-time routing, mixed-language pages, duplicate search signals, or copy that staff cannot support. English remains a first-class source locale and the direct contact fallback remains clear in every published locale.

## Current boundary

The current published routes declared in `publicRoutes` are English, unprefixed, and statically exported. Routes and most content are typed, but shell labels, homepage text, metadata, JSON-LD, image alternatives, and route names are not yet one locale-ready registry. There is no translation memory, glossary, locale reviewer, localized sitemap, or language switcher.

Static export cannot negotiate a locale per request. Every published locale and route must be known at build time.

## Recommended URL and routing model

Keep existing English URLs unprefixed to avoid needless migration. Add each new locale under a stable language prefix, for example `/de/`, `/de/kitesurfing-lessons/`, and matching localized routes. Use language-only BCP 47 tags unless a real regional language/content distinction exists.

The exact slug strategy is an owner decision:

- Translated slugs improve local readability but need a stable route ID and redirect plan when wording changes.
- English-equivalent slugs reduce routing complexity but are less natural for some audiences.

Whichever strategy is chosen, one locale/route registry must derive static parameters, navigation, canonicals, alternates, sitemap entries, breadcrumbs, and switcher destinations. Do not infer alternates by string replacement.

Do not add middleware, browser-language redirects, geolocation, or cookie-dependent routing for the initial static release. The root English page can expose a visible language switcher. An optional one-time client suggestion may be considered later, but it cannot hide content, auto-redirect, or be required for access.

## Content model and translation states

Give each route and translatable unit a stable locale-independent ID. Store:

- Source locale and source revision.
- Target locale and translated value.
- Draft, machine-assisted, human-reviewed, approved, published, stale, or blocked state.
- Translator and domain reviewer.
- Source revision last reviewed against.
- Locale-specific slug, title, description, headings, body, FAQ, contact message, image alternative text, and structured-data text.
- Terms that intentionally stay in English, such as recognized kitesurfing qualifications or equipment terms, with glossary guidance.

A source change marks affected translations stale. Production must fail when required content for a published page is missing or stale beyond the accepted policy. Do not silently fall back to English inside an otherwise translated page. Optional noncritical content may be omitted only when the schema and product decision explicitly allow it.

Keep numbers, units, dates, phone numbers, service names, policy versions, and factual records structured rather than copied into prose where possible. Locale formatting must not change the underlying business fact.

## Tooling direction

Use `next-intl` as the leading implementation candidate for ICU messages, formatting, and server-compatible helpers. Do not adopt its request-time proxy or routing pattern when it conflicts with static export. Hangin’s own route registry should enumerate every locale and route at build time.

The final dependency decision follows a small prototype proving:

- Static generation of every locale/route pair.
- Locale-correct metadata and JSON-LD without a client bundle requirement.
- No mixed-language fallback.
- Stable localized links and switcher destinations.
- Acceptable bundle and build cost.

Avoid building custom pluralization or message-formatting primitives.

## Translation workflow

1. Select one pilot locale from actual visitor/support demand and name a fluent reviewer who understands kite terminology.
2. Build a glossary and style note from approved English copy. Record terms that must not be translated literally.
3. Translate one complete high-value journey: homepage, lessons, Boracay guide, contact, shared shell, metadata, error/404 states, legal/privacy text, and contact messages.
4. Machine translation may create a draft, but it is never published without fluent human review and factual comparison to the source.
5. Render every pilot route and review language quality, line wrapping, navigation, controls, metadata, structured data, and contact handoff.
6. Record support reality. If staff cannot answer in the published language, state which contact languages are available without implying otherwise.

Do not launch a locale consisting of a translated homepage that leads into English supporting pages unless that limited scope is explicitly presented and search indexing is controlled.

## Search and metadata contract

Every indexable localized page needs:

- A self-referencing canonical for that locale URL.
- Reciprocal `hreflang` links to every genuine equivalent plus an `x-default` destination chosen by policy.
- Locale-correct title, description, Open Graph locale, page language, breadcrumbs, visible headings, image alternatives, and JSON-LD text.
- A sitemap entry containing the same reciprocal alternates.
- Ordinary crawlable internal links within the locale.

Equivalent pages must express the same underlying service and facts. If content differs materially by market, model that difference explicitly rather than claiming equivalence. Do not use IP-based cloaking, automatic redirects that prevent crawling, or canonicalize all languages to English.

## Accessibility and UX

- Set the document `lang` to the actual page language and mark meaningful inline language changes.
- Add `dir="rtl"` only for an approved right-to-left locale and audit layout, icons, directional language, and input behavior before launch.
- Give the language selector a visible text label and language names understandable in their own language; do not use flags as languages.
- Keep focus, current selection, keyboard order, touch targets, and no-JavaScript navigation intact.
- Test 200 percent text resize, 400 percent zoom, long translated headings, compound words, date/number formatting, and screen-reader pronunciation.
- Translate validation, error, empty, consent, payment, and provider-handoff states, not just marketing copy.

## Failure and recovery

- Missing or stale required translation: fail the production build for that locale/route.
- Broken reciprocal alternate: fail SEO validation and suppress publication until the set is consistent.
- Reviewer unavailable: keep the locale in preview; do not substitute unreviewed machine text.
- Source fact changes: mark dependent translations stale and show the owner the exact units affected.
- Localized route is retired: return the correct status and redirect only to a genuine successor, not automatically to the English homepage.
- External booking/commerce provider lacks the locale: disclose the handoff language before the visitor leaves and preserve contact fallback.

## Acceptance criteria

- Every published locale/route pair is generated in a clean static export and appears once in the registry and sitemap.
- English routes remain stable unless a separately approved migration says otherwise.
- There is no request-time locale dependency, hidden geolocation redirect, or cookie requirement.
- Build validation rejects missing required messages, duplicate localized slugs, invalid tags, dangling links, stale approved translations, and incomplete alternate sets.
- Every localized page has correct `lang`, self-canonical, reciprocal alternates, `x-default`, metadata, JSON-LD, breadcrumbs, navigation, and contact context.
- A fluent reviewer signs off the complete visitor journey and kite terminology; automated translation alone cannot change publication state to approved.
- Browser checks cover the locale switcher, direct deep links, 404, mobile/desktop wrapping, keyboard use, zoom, screen readers, JavaScript disabled, and external handoffs.
- Search validation confirms that locale pages do not canonicalize to English and that alternates match sitemap output.

## Decision gates

The owner must choose the pilot locale from evidence, the reviewer and supported contact languages, URL prefix policy, translated-slug policy, `x-default` destination, glossary owner, translation budget, source-change SLA, publish completeness threshold, and whether future RTL/non-Latin support is expected.

## Dependencies

The central content/route registry, protected previews, factual ownership, browser suite, and host redirect contract must exist first. Booking, policies, analytics disclosures, and commerce content need their own translated states before those capabilities launch in another locale.

## Skills review

No localization skill should be installed yet. A provider-neutral prototype with the existing planning and testing workflows should validate the architecture. If a translation platform is later selected, review its official integration and any skill for data handling, repository permissions, prompt/content retention, and source-revision behavior.

## Primary references

- W3C choosing a language tag: <https://www.w3.org/International/questions/qa-choosing-language-tags>
- W3C language declarations in HTML: <https://www.w3.org/International/questions/qa-html-language-declarations>
- Google localized-version guidance: <https://developers.google.com/search/docs/specialty/international/localized-versions>
- Google multi-regional and multilingual sites: <https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites>
- WCAG 2.2 language of page: <https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html>
- next-intl documentation: <https://next-intl.dev/docs/getting-started/app-router>

Sources accessed 2026-09-04.
