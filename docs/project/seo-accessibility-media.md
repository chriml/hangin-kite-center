# Current SEO, accessibility, and media contracts

Status: Current
Last verified: 2026-09-04

## Search baseline

Every current public route exports with:

- One H1 and a logical heading structure.
- A unique title and description.
- A self-referencing canonical at the `www` origin.
- Open Graph and Twitter metadata with local social imagery.
- `index, follow` metadata.
- Internal navigation and visible breadcrumbs on supporting pages.
- Sitemap and robots output.
- JSON-LD built from visible, confirmed information.

Sitewide schema includes `WebSite`, `Organization`, and `SportsActivityLocation`. Service pages use `Service` and breadcrumbs. The current output also includes FAQ markup. Never add ratings, reviews, prices, offers, opening hours, or availability without a visible, current, owned source.

Known future review items:

- `app/sitemap.ts` uses one historical `lastModified` date for all routes. Future content records should own substantive modification dates.
- Sitemap `priority` and `changeFrequency` do not drive Google crawling and can be removed when the sitemap is revised, according to [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (accessed 2026-09-04).
- `app/robots.ts` emits a `Host` line that is not defined by the [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309) (accessed 2026-09-04). The future SEO brief recommends removing it with its brittle assertion.
- Google's [FAQ structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/faqpage) limits FAQ rich results to well-known authoritative government and health sites (accessed 2026-09-04). Keep useful visible questions, but re-evaluate the value of `FAQPage` markup before expanding it.
- Several supporting pages are short and have few contextual links in their main content. Verified first-party details and useful cross-links are higher priority than new page count.
- Search Console, Bing Webmaster Tools, Google Business Profile, and Bing Places ownership are not recorded in the repository.

## Accessibility baseline

The current static HTML includes English language metadata, a skip link, semantic landmarks, native navigation and FAQ disclosures, visible focus rules, reduced-motion handling, intrinsic image dimensions, and useful or empty alt text according to image role. Primary mobile controls are generally designed around 48-pixel targets.

Automated artifact tests cannot verify computed layout, accessible names in a browser, focus visibility, keyboard order, zoom, screen readers, forced colors, real target sizes, or runtime errors. No Playwright, axe, Lighthouse, or visual-regression suite exists yet.

The future target is WCAG 2.2 AA for every complete public page and revealed interactive state. Automated scans are regression tools only. A conformance claim requires manual keyboard, zoom, reading-order, contrast, content, and assistive-technology review.

## Media baseline

- Local WebP files have full and 900-pixel candidates.
- Components provide intrinsic width and height, `srcset`, `sizes`, and appropriate eager or lazy loading.
- Proof and generated provenance are tested.
- The exported image corpus was about 2.3 MB on 2026-09-04; the complete `out/` artifact was about 4.6 MB and 127 files.
- High-density desktop screens may select 1600 to 1920-pixel source assets. Add more formats or widths only after measured traces show a bottleneck.

## Quality contracts

The Node test suite verifies routes, exported artifacts, metadata, JSON-LD, links, contact destinations, headings, image records, provenance, selected contrast pairs, and public-copy rules. Tests read `out/`, so a standalone `npm test` can pass stale files. Release evidence must build the export first.

Future browser and performance requirements are specified in [`../future/quality-performance-accessibility.md`](../future/quality-performance-accessibility.md).
