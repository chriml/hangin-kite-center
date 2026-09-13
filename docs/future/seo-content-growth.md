# Future brief: SEO and content growth

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Help the right visitors find accurate answers about Hangin, kitesurfing at Bulabog Beach, and the services the team genuinely provides. Growth comes from verified first-party detail, local entity completeness, useful internal paths, and measured visitor questions, not page volume or keyword repetition.

## Current boundary

The site has explicit crawlable routes declared in `publicRoutes`, unique metadata, self-canonicals, local social images, sitemap and robots output, breadcrumbs on supporting pages, semantic headings, and visible content-backed JSON-LD. The canonical origin is `https://www.hanginkitecenter.com`.

Known limitations:

- Sitemap `lastModified` is one hard-coded historical date rather than each page’s substantive update.
- `priority` and `changeFrequency` are emitted although Google ignores them.
- Robots output includes a non-standard `Host` directive.
- General FAQ rich results are no longer a realistic growth feature; visible questions may still help visitors.
- Several supporting pages are short and contain few contextual links in their main content.
- Ownership of Search Console, Bing Webmaster Tools, Google Business Profile, and Bing Places is not recorded.
- Exact address, coordinates, opening hours, prices, reviews, staff profiles, and other local/offer facts are unconfirmed and must not be invented for schema or listings.

## Strategy

Strengthen existing service and location pages before adding a publishing calendar. A page earns its place when it answers a distinct visitor need with verified Hangin knowledge, has an owner and review interval, and connects naturally to a service or contact outcome.

Use one content registry containing URL, route ID, primary visitor intent, supporting questions, owner, factual evidence, contact context, related pages, proof media, title, description, substantive modification date, review-by date, and index state. Page content, metadata, structured data, sitemap, and internal links should derive from that source.

## Staged delivery

### Stage 1: technical and ownership baseline

- Verify ownership and access for Search Console, Bing Webmaster Tools, Google Business Profile, and Bing Places.
- Submit and monitor the canonical sitemap after the production host contract is tested.
- Derive `lastModified` only from substantive page/content changes; remove unsupported priority/frequency hints.
- Remove the non-standard `Host` directive and its brittle test when the robots contract is revised.
- Reassess FAQ structured data. Keep useful visible FAQs, but do not expand markup solely for a rich result that ordinary commercial sites no longer receive.
- Confirm canonical redirects, real 404 status, noindex preview behavior, HTTPS, mobile rendering, and sitemap/route parity on the deployed host.

### Stage 2: local entity completeness

Confirm the exact public name, address/location representation, phone, email, opening hours, categories, map/location details, service area, and profile owners with the business. Make the website and owned profiles consistent without hiding legitimate platform-specific formatting.

Add genuine current photos, business descriptions, services, and update routines to the profiles. Reviews remain on the platforms where customers post them unless Hangin has permission and a maintained on-site review process. Never create review or aggregate-rating schema from unverified testimonials.

### Stage 3: deepen the nine core pages

Use actual customer questions and staff knowledge to improve lessons, rentals/storage, safaris, accommodation, shop, Boracay guidance, about, and contact. Prioritize concrete details such as who a service fits, what the next step is, what staff needs to confirm, how Bulabog conditions affect planning, and how related services connect.

Add contextual links where they help the reader continue, not as a sitewide keyword exercise. Give important pages at least one ordinary crawlable route from relevant main content, not only header/footer navigation.

### Stage 4: evidence-led guide publishing

After 8 to 12 weeks of Search Console and enquiry-question collection, group recurring questions by visitor intent. Publish a guide only when:

- It has a distinct query/decision to answer.
- Hangin can provide first-party detail or a clearly cited authoritative source.
- It does not duplicate or cannibalize a service/core page.
- A named owner can review it as conditions, rules, transport, or services change.
- It has a natural next step and at least two useful internal relationships.

Potential areas may include beginner planning, conditions/season interpretation, what to bring, skill progression, rental readiness, storage planning, or trip logistics. These are research prompts, not authorized page titles or factual claims.

## Page and structured-data rules

- One useful primary purpose and H1 per page; headings describe the actual content.
- Titles and descriptions are unique, readable, and written for the page rather than a fixed keyword template.
- Canonicals reference the preferred final URL after host redirects.
- Structured data matches visible confirmed content. Add the most specific supported type only when all required facts are owned.
- Never fabricate `Review`, `AggregateRating`, `Offer`, price, availability, opening hours, address, coordinates, credential, or event data.
- Do not mark the enquiry-only Shop as an offer-bearing merchant listing.
- Images use honest alternatives and documented rights. Filenames and captions help people first; do not stuff terms.
- Avoid doorway pages for beaches, neighborhoods, rider levels, or languages that repeat the same content with swapped names.
- Do not publish scaled AI-generated guides without first-party review, distinct value, evidence, and an owner.

## Measurement

Use Search Console to review impressions, clicks, queries, pages, countries, devices, indexing, and sitemap issues. Compare query groups and landing pages over a meaningful period rather than reacting to daily noise. Use Bing tools for complementary crawl/index diagnostics.

Keep search visibility separate from business outcomes. A click is not an enquiry; an enquiry is not a booking. Until a booking system exists, use monthly staff counts by service and coarse source without contact-level analytics joins. Document material site, profile, or algorithm-context changes beside the time series.

Success measures can include:

- Valid indexed core pages and no accidental preview/index duplicates.
- Growth in relevant non-brand impressions and clicks to the intended page.
- Better coverage of verified customer questions.
- More qualified service enquiries, measured operationally.
- Fewer unanswered/stale-profile questions and no structured-data policy violations.

Do not set traffic targets until a baseline and seasonality context exist.

## Failure and recovery

- Unconfirmed fact: omit it or state that visitors should ask Hangin; do not infer from a listing or competitor.
- Search decline: verify deployment, indexing, redirects, canonicals, robots, sitemap, page changes, and seasonality before rewriting content.
- Duplicate/cannibalizing page: consolidate into the strongest useful page and redirect only when there is a genuine successor.
- Outdated guide: correct with a substantive modification date, or unpublish/redirect according to its real successor.
- Profile ownership lost: document the account recovery owner and keep website facts authoritative.
- Schema warning: compare markup to visible content and Google eligibility; remove unsupported markup instead of adding filler.

## Acceptance criteria

- Every public URL has an owner, intent, confirmed facts, metadata, contact context, related links, substantive modification date, and review-by date.
- Sitemap exactly matches indexable canonical routes and uses meaningful update dates; robots follows the Robots Exclusion Protocol.
- Production redirects, status codes, canonicals, noindex previews, and 404 behavior pass HTTP checks.
- Search/profile ownership and access-recovery owners are recorded.
- Website and owned local profiles use verified consistent identity/contact/location information.
- Structured data validates, matches visible facts, and contains no invented ratings, offers, availability, hours, coordinates, or reviews.
- Every new page passes distinct-intent, evidence, ownership, internal-link, copy-quality, accessibility, and performance gates.
- Search reporting distinguishes impressions, clicks, contact intent, enquiries, and bookings.
- No doorway, mass-generated, keyword-stuffed, or unsupported location/service page is published.

## Decision gates

The owner must confirm profile/account ownership, exact public location details, opening hours, categories, photo rights, factual reviewers, content owner, review cadence, priority visitor markets, actual customer-question sources, and whether guide publishing has ongoing staff capacity.

## Dependencies

Phase 0 host verification, Search Console access, content ownership, no-tag measurement, and browser checks come first. The content registry supplies update dates and review state. Internationalization defines localized canonical/alternate rules. Booking and commerce supply authoritative offer/outcome data only after their own launch gates.

## Skills review

Use the installed `seo-audit` skill for broad diagnosis and `no-ai-slop` for public copy. No new SEO skill is needed now. Any future content-automation skill must be source-reviewed and cannot publish or invent facts autonomously.

## Primary references

- Google Search Essentials: <https://developers.google.com/search/docs/essentials>
- Google guidance on helpful, reliable, people-first content: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- Google sitemap guidance: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- Google FAQ structured data: <https://developers.google.com/search/docs/appearance/structured-data/faqpage>
- Google local business structured data: <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- Google Business Profile guidelines: <https://support.google.com/business/answer/3038177>
- Robots Exclusion Protocol, RFC 9309: <https://www.rfc-editor.org/rfc/rfc9309>

Sources accessed 2026-09-04.
