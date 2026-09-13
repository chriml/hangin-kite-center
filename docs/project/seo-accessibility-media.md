# Current SEO, accessibility, and media contracts

Status: Current
Last reconciled: 2026-09-13; integration verification is recorded in the [branch integration report](../operations/2026-09-13-branch-integration.md).

## Search baseline

Every current public route exports with:

- One H1 and a logical heading structure.
- A unique title and description.
- A self-referencing canonical at the `www` origin.
- Open Graph and Twitter metadata with local social imagery.
- `index, follow` metadata, except the three unfinished safari detail pages and Events coming-soon page, which use `noindex, follow` and are excluded from the sitemap.
- Internal navigation and visible breadcrumbs on supporting pages.
- Sitemap and robots output.
- JSON-LD built from visible, confirmed information.

Sitewide schema includes `WebSite`, `Organization`, and `SportsActivityLocation`. Service pages use `Service` and breadcrumbs. The current output also includes FAQ markup. Never add ratings, reviews, prices, offers, opening hours, or availability without a visible, current, owned source.

GEO discovery update, 2026-09-13:

- `content/page-updates.ts` owns evidenced substantive modification dates. Sitemap generation omits unknown dates and retains the exact seventeen indexable routes. It no longer emits `priority` or `changeFrequency`, which Google ignores according to [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (accessed 2026-09-13).
- Robots retains wildcard access and the canonical sitemap URL; the unsupported `Host` line has been removed. This preserves search crawler access and the existing Google-Extended policy. CDN behavior still needs production verification.
- The location schema's `hasMap` and visible map links share the documented Google Maps place ID in `siteConfig.mapsUrl`.
- Lesson cost, teaching-hour and seasonal answers use the confirmed course records and owner guidance. Existing FAQ markup matches those visible answers; no special AI schema or AI-only content was added.
- Platform distinctions, skill selection, current Google reporting, directory corrections and release evidence are recorded in the [GEO runbook](../operations/2026-09-13-geo-discovery.md). Website changes do not establish indexing or recommendations.

Remaining review items:
- Google retired FAQ rich results in May 2026 and removed the feature documentation in June ([official changelog](https://developers.google.com/search/updates#removing-faq-rich-result), accessed 2026-09-04). Keep useful visible questions. Existing truthful `FAQPage` markup is not a promise of a Google search feature; do not expand it for that purpose.
- Several supporting pages are short and have few contextual links in their main content. Verified first-party details and useful cross-links are higher priority than new page count.
- Search Console, Bing Webmaster Tools, Google Business Profile, and Bing Places ownership are not recorded in the repository.

## Accessibility baseline

The current static HTML includes English language metadata, a skip link, semantic landmarks, native navigation and FAQ disclosures, visible focus rules, reduced-motion handling, intrinsic image dimensions, and useful or empty alt text according to image role. Primary mobile controls are generally designed around 48-pixel targets.

Automated artifact tests cannot verify computed layout, accessible names in a browser, focus visibility, keyboard order, zoom, screen readers, forced colors, real target sizes, or runtime errors. No Playwright, axe, Lighthouse, or visual-regression suite exists yet.

The current engineering target is WCAG 2.2 AA for every complete public page and revealed interactive state. Automated scans are regression tools only. A conformance claim requires manual keyboard, zoom, reading-order, contrast, content, and assistive-technology review.

## Media baseline

The owner-approved Hangin identity is served as local SVG paths in the header and footer. `content/images.ts` records intrinsic logo dimensions. The header's home link retains its accessible business name, the homepage retains one H1 and visible business identity, and the footer logo has a full text alternative. A traced H supplies the SVG favicon and 180-pixel Apple icon. These assets and their provenance are documented in [`../../public/brand/ATTRIBUTION.md`](../../public/brand/ATTRIBUTION.md). No raster background, runtime image processing, external font or script is required for the logo.

- Local WebP files have full-size candidates and 600- or 900-pixel responsive derivatives.
- Components provide intrinsic width and height, `srcset`, `sizes`, and appropriate eager or lazy loading.
- Proof and generated provenance are tested.
- The exported image corpus was about 2.3 MB on 2026-09-04; the complete `out/` artifact was about 4.6 MB and 127 files.
- High-density desktop screens may select 1600 to 1920-pixel source assets. Add more formats or widths only after measured traces show a bottleneck.

## Quality contracts

The Node test suite verifies routes, exported artifacts, metadata, JSON-LD, links, contact destinations, headings, image records, provenance, selected contrast pairs, and public-copy rules. Tests read `out/`, so a standalone `npm test` can pass stale files. Release evidence must build the export first.

Future browser and performance requirements are specified in [`../future/quality-performance-accessibility.md`](../future/quality-performance-accessibility.md).

## Historical owner media integration, 2026-09-12

Eleven owner-supplied photographs now appear on the homepage, lessons, rentals, shop and about pages. Their responsive WebP pairs total 2,900,172 bytes. The group portrait is displayed without clipping people. Six different course images show equipment, setup and riding. Room/safari illustrations remained in use at that point; the geographic aerial was subsequently replaced as recorded below. These new files do not establish room details, safari routes or inventory.

The owner requested removal of the beach-practice video section on 2026-09-12. No video players now render on the Lessons page. The reusable component, two silent MP4 derivatives (1,779,754 bytes total), posters and provenance remain in the repository. Original audio remains only in the source archive.

`content/images.ts` distinguishes owner-provided photos (`kind: "provided"`) from licensed contextual proof and generated decoration. `content/videos.ts` owns the selected clips. `public/images/ATTRIBUTION.md` records permission and provenance; [owner-media.json](owner-media.json) records the exact selected source hashes, output dimensions and transformations. The source archives are unchanged. Installed Next.js image and video guides were consulted; local static delivery remains unchanged.

### Homepage cinematic photograph, 2026-09-12

The existing owner-provided riding image fills the homepage opening with honest cover crops, useful alternative text and eager/high-priority loading. Its `sizes` hint accounts for the enlarged image plane on portrait viewports. The location link, H1, WhatsApp link, follow-up note and review badges are static HTML over a dark overlay inside the hero. The linked Bulabog Beach label includes a decorative pin icon and a named Google Maps destination. No video or motion is present in the opening. The shared header becomes transparent only when followed by the homepage's `data-cinematic-hero` main element, preserving normal headers elsewhere without a client boundary. The original photograph, attribution and permission record are unchanged.


Photo captions and header decoration, 2026-09-12: all page heroes omit below-image labels. The Bulabog aerial source, creator and license are retained in the shared footer’s keyboard-accessible “Photo credits” disclosure. Decorative curved SVG lines were removed from PageHero. Descriptive alt text, image provenance, static rendering and contact links are preserved.

Kite control card, 2026-09-13: owner photo 131 replaces the repeated smiling-pair portrait only in that course card. Responsive WebP derivatives are 1800×1350 and 900×675, with the exact crop, dimensions, bytes and original hash recorded in owner-media.json. The source archive and existing permission are preserved.

Latest Kite control selection, 2026-09-13: owner photo 29 supersedes photo 131 for this card. Its 1800×1350 and 900×675 derivatives, exact crop and source hash are recorded in owner-media.json. Prior assets and all originals remain preserved.

Footer update, 2026-09-13: the owner requested removal of Photo credits. The final rendered BY-SA aerial on Things to do was replaced with the existing owner-supplied kite-bay image, allowing removal of the shared disclosure. All 14 exported HTML files were checked: no BY-SA photographs remain rendered. Archived files retain their source/license ledger, and tests continue requiring visible credits for any future rendered BY-SA photo. Owner-photo alternatives and responsive delivery remain intact.


### Central asset credits, 2026-09-13

The owner requested that credits be collected away from the main pages where licensing permits. `/legal/` now collects image sources, creators, license links and derivative notices, owner-photo permission context, generated artwork provenance, brand marks, fonts and icons. The shared footer links to it as “Legal information”; no Photo credits disclosure returns. The page includes only confirmed contact information and is not a complete statutory Impressum or privacy policy. Those documents would need verified operator and data-processing details.

[CC BY-SA 4.0 section 3(a)(2)](https://creativecommons.org/licenses/by-sa/4.0/legalcode.en#s3a2) permits reasonable attribution through a link to a resource containing the required information. The [Creative Commons attribution guidance](https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution) supports collecting title, author, source, license and modifications. Accessed 2026-09-13. No BY-SA photograph is currently displayed on the main pages; archived files retain their credits on this page and in the provenance ledger. Reintroducing those photographs still requires checking attribution in context.

The exact SIL OFL notices for [Barlow Condensed](https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt) and [Manrope](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt), retrieved 2026-09-13 from the official Google Fonts repository, are bundled under `public/licenses/`. The existing Tabler MIT notice remains there. The page links to all three files. No new runtime dependency or third-party request is introduced.

### Pending safari detail pages

The owner requested three “Coming soon…” pages under `/kite-safaris/` for Batbatan, Colon and Others. Each has its own canonical, title, description and matching three-level visible/JSON-LD breadcrumbs. These incomplete pages use `noindex, follow` and are absent from the sitemap while remaining crawlable through the listing. The route tests check all public exports and separately assert the exact indexable sitemap set. No trip-specific Service, Offer, price, availability or itinerary data is emitted. Revisit indexing when confirmed trip content replaces the holding message.


Boracay topic pages, 2026-09-13: Places to be, Things to do, Planning your days and Practical questions each have a distinct static URL, self-canonical, title and description, with their matching visible breadcrumb above the shared hero and BreadcrumbList JSON-LD in the page body. Each page contains only its own existing topic content. All are indexable and included in the sitemap. The submenu and spot-guide teaser use page URLs without fragments. The original Things to do URL remains available with activity content. No redirects, FAQ schema or new public business claims were added. Local development and static-preview HTTP checks returned 200 for all four routes and 404 for an unknown Boracay child. Production hosting behavior was not checked because no deployment was requested.

## Branch integration, 2026-09-13

Inquiry/complaint and accessibility guidance are restored from the review branch as `/terms/` and `/accessibility/`, with their own metadata and sitemap entries. The twenty-one public routes include four existing noindex holding pages; the indexable sitemap therefore contains seventeen routes. Current owner photographs, centralized asset credits, pending-page indexing and Boracay subpages are preserved.

The September 4 media/accessibility audits describe their source revision. Their old stock-photo inventory and on-page caption assumptions are superseded by the current owner-media ledger and `/legal/` credits. Older test counts and browser results remain dated evidence; see the [branch integration report](../operations/2026-09-13-branch-integration.md) for checks of the merged site. No production HTTP behavior or legal conclusions were revalidated merely by merging these records.


## Focused investigation, 2026-09-13

Terms and Accessibility now emit the same Home/current-page `BreadcrumbList` pattern as their visible breadcrumbs. All twenty supporting routes are covered by a visible/structured breadcrumb regression check. The seventeen indexable URLs and four noindex holding pages are unchanged.

The practical Boracay questions now expose the existing official tourism sources through the shared Further reading treatment. The About contact paragraph asks for trip dates, riding level and service needs and repeats the owner-confirmed one-day reply commitment. No new business fact, crawler file or schema type was introduced by the GEO content pass.

Five large hero images now have 1200-pixel WebP candidates between their existing mobile and full-size files. Existing originals, desktop files, display crops and alt text are preserved. This addresses measured excess image selection on high-density phones. Performance figures remain local lab evidence, not field Core Web Vitals. See the [combined investigation](../operations/2026-09-13-multi-investigator-review.md) and linked domain reports.
