# Hangin and Duotone Visual Refresh

Date: 2026-08-31

Status: Direction approved in conversation; specification awaiting review

## Purpose

Refresh the current Hangin Kite Center website by keeping its existing Tropical Ride Culture design as the foundation and adding selected visual ideas from Duotone Kiteboarding and Duotone Pro Center.

The result should still look and sound like Hangin on Bulabog Beach. Duotone is a reference for confidence, image scale, typography hierarchy, flat editorial layouts, and technical clarity. It is not a second brand and must not override Hangin's palette, voice, services, or local character.

This specification extends the approved SSG design in `2026-08-29-hangin-kite-center-ssg-design.md`. All confirmed facts, image rules, SEO requirements, static architecture, and booking boundaries in that specification remain binding.

## Decision

Use a 70 percent Hangin, 30 percent Duotone direction.

This ratio describes visual influence, not a literal pixel count:

- Hangin owns the identity: logo, colors, typography families, copy, imagery policy, services, location, and contact flow.
- Duotone influences roughly one third of the major presentation moves: photo-forward heroes, tracked location labels, open spacing, flat section rules, indexed service rows, and decisive rectangular actions.
- No page receives a Duotone logo, custom font, cyan-dominant palette, product naming, partnership language, or copied composition.

The existing site is the baseline from this point forward. The unavailable legacy website is no longer needed as a design dependency.

## Approaches considered

### 1. Current Hangin system with selective Duotone structure

This is the chosen approach. It preserves the site visitors already recognize while improving visual confidence and scanability. It is also the lowest-risk option for static output, responsive behavior, accessibility, and SEO.

### 2. Full Duotone-style transplant

This would use a mostly white, graphite, and cyan identity with burger-first navigation, oversized empty space, and product-led layouts. It would feel too close to a manufacturer and too far from an independent Boracay kite center.

### 3. Duotone as an image filter only

This would apply two-color filters or overlays to photography without changing hierarchy or layout. It would be superficial, could weaken proof photography, and would add rendering cost without improving the funnel.

## Design principles

### Hangin remains visible first

Keep the current ocean, lagoon, sand, sun, palm, and coral palette. Keep Barlow Condensed for display type and Manrope for body and interface text. Keep the current mark, kite-line motif, direct copy, and practical WhatsApp path.

### Use Duotone's discipline, not its branding

Borrow large image planes, strong type contrast, wide-tracked location labels, one-pixel rules, flat rectangular controls, and clear technical information. Avoid imitating proprietary typography, logos, cyan brand ownership, equipment advertising, center ratings, or prestige language.

### Let proof photography stay photographic

The three licensed Boracay photographs remain in natural color with only normal crop, contrast, and sizing adjustments. Do not apply global duotone filters, blend modes, or opaque color washes to proof images. Captions, creator links, license links, and honest alt text remain visible.

Generated screen-print images carry the stronger two-color treatment because they are supporting art, not evidence of Hangin's facilities, staff, rooms, or stock.

### Keep the funnel calm

The homepage keeps this explicit funnel order: location and core offer; proof; lessons and rental; Boracay conditions; rental, stay, safari, and shop support; center history; practical questions; contact. WhatsApp remains the primary action, but it is not repeated as a pushy sales device. There are no countdowns, popups, carousels, fake scarcity messages, or autoplay media.

## Visual system

### Color

No core color changes:

- Ocean: `#073642`
- Lagoon: `#1FB9C1`
- Sand: `#F2E5C4`
- Sun: `#FFFDF6`
- Palm: `#315F4B`
- Coral: `#F06449`
- Ink: `#102A30`

Duotone influence comes from deliberate two-color section pairings, not a new palette. Ocean and sun handle technical or action-oriented sections. Lagoon and ocean handle the spot. Sand and ocean handle lessons. Palm and sand handle the center story. Coral remains a signal color for the primary contact action and small line details.

Each section or self-contained composition uses one dominant high-contrast color pairing. Adjacent sections can use different pairs where they meet within the same viewport.

### Typography

Keep Barlow Condensed and Manrope. Refine their use as follows:

- Display headlines use a larger desktop scale, tight line-height, and negative tracking.
- Hero headlines stay within three lines at every supported width.
- Location and utility labels use Manrope in uppercase with wide tracking, such as `BULABOG / BORACAY`.
- Body paragraphs remain sentence case, left aligned, and limited to a readable line length.
- Uppercase is reserved for navigation, factual labels, section indices, and location markers. It is not used for paragraph copy.

### Geometry and surfaces

- Use square or lightly softened corners. No pill-shaped controls.
- Replace generic card separation with spacing, full-width color planes, and one-pixel rules.
- Keep the existing thin kite lines, but limit them to heroes and selected section transitions.
- Use full-bleed image or color bands for important changes of topic.
- Increase vertical breathing room around major headings while keeping practical rows compact.
- Keep shadows rare and tinted to the ocean palette.

### Motion

Use CSS only:

- Small image-scale changes on hover where the image is linked
- Underline or color movement on navigation and text links
- Button, link, and image transitions limited to roughly 160 to 240 milliseconds

Do not add entrance animations, a client animation library, scroll-linked filters, canvas, WebGL, parallax, smooth-scroll replacement, or pinned sections. Every hover transition must become effectively static under `prefers-reduced-motion`.

## Site shell

### Header

Keep the Hangin mark, visible desktop navigation, WhatsApp action, and native mobile details menu.

Refine the header toward Duotone Pro Center's visual restraint:

- Reduce the desktop bar from the current 5.25rem toward 4.75rem and the mobile bar from 4.5rem toward 4.25rem, provided 48-pixel targets remain intact.
- Let the one-pixel bottom rule define the bar instead of adding shadow or extra decoration.
- Give desktop navigation more measured spacing and tracked labels.
- As an explicit funnel-priority decision, replace `About` in the primary desktop navigation with `Safaris`. About remains available in the footer and mobile menu. This keeps the desktop header at five links while placing a bookable service ahead of a background page.
- Keep the WhatsApp action rectangular and clearly separate from navigation.
- Do not switch desktop navigation to a burger menu.
- Preserve 48-pixel mobile targets, visible focus, and native keyboard behavior.

### Footer

Keep the current dark-ocean footer, business identity, route links, phone, email, and established year. Tighten the grid and rules so it reads like a practical center directory rather than a large link farm. No new legal links are required until the site adds analytics, forms, or other data collection.

## Homepage composition

### 1. Hero

Keep the current message, proof image, two actions, and sand background. Shift the composition toward a more image-led editorial split:

- Below 860 pixels, the hero stacks copy above media.
- From 860 to 1099 pixels, the hero uses a 46/54 copy-to-image split inside the existing shell.
- At 1100 pixels and above, the hero uses a 38/62 copy-to-image split inside the existing shell.
- The image ends at the shell's right edge, not the viewport edge, and has no card chrome.
- The copy remains on a clean sand field with a maximum readable width.
- `BULABOG / BORACAY` becomes the tracked location label.
- The H1 remains `Kitesurfing here since 2002.`
- Reduce the hero's two kite lines to one. It remains secondary and must not cross body copy, actions, or the photo credit.
- On mobile, copy comes first, followed by the full-width image and visible attribution.

### 2. Proof strip

Keep four confirmed facts and tighten their labels to `Since 2002`, `IKO + VDWS`, `Lessons · rental · storage`, and `Bulabog Beach`. Present them as a compact, ruled information band with more technical spacing. Do not add ratings, review counts, awards, wind scores, or unconfirmed claims.

### 3. Lessons and rental navigator

Replace the current four-box card impression with a flatter indexed navigator. Each entry contains an index, heading, short explanation, and arrow. Desktop uses four full-width rows with index, heading, description, and arrow aligned in columns. Mobile stacks the same fields inside one vertical list. Color changes on hover must not hide the description or focus ring.

Add one short rider-state label to each row: `Starting out`, `Board starts`, `Already riding`, and `Need gear`. These labels support scanning and do not replace the current descriptive headings.

The homepage indices use the same decorative-index contract as supporting pages: real `<span aria-hidden="true">` elements, never pseudo-element content.

The four existing paths remain:

1. Your first kite lesson
2. Board starts and first rides
3. Progression sessions
4. Full equipment rental

### 4. Boracay spot band

Keep the full-color aerial proof image and current factual copy. Increase the image share and use an ocean text plane with a lagoon outer field. This is the strongest Duotone Pro Center reference on the homepage: location first, large image, concise conditions, and one direct guide link.

Below the copy, add three compact ruled facts using only existing confirmed language: `Season · roughly November to April`, `Water · warm shallow lagoon`, and `Orientation · east side of Boracay`.

Do not replace written facts with rating bars or condition scores.

### 5. Services around the session

Turn rental and storage, accommodation, and safaris into one gapless three-panel image rail. Each panel contains its existing generated image, service label, heading, short copy, and link. At 960 pixels and above, show three equal-width panels. From 780 to 959 pixels, show two columns with the safari panel spanning both columns. Below 780 pixels, stack all three. Use consistent image ratios, flat dividers, and no card chrome.

Move Shop beneath the rail as a full-width utility row without an image. This removes the repeated gear artwork and keeps the shop honest until distinct imagery and real inventory exist.

Do not turn the shop into a product grid until real inventory, prices, and availability exist.

### 6. Center story

Keep the palm and sand treatment, proof image, `since 2002` fact, and About link. Give the proof image more space, make `2002` the strongest typographic detail, and keep the text short. Rely on the existing top proof strip for IKO and VDWS rather than duplicating the credential beside the story. This section should feel local and established, not corporate.

### 7. Practical questions

Keep native `details` and `summary`. Use flat rules, strong question labels, and comfortable answer spacing. Do not replace the list with scripted accordions or cards.

### 8. Contact

Keep the ocean field, coral WhatsApp action, email fallback, and current copy. Add a compact three-part prompt above the action: `Your dates`, `Your riding level`, and `What you need`. Increase visual focus through scale and spacing, not urgency. The contact adapter remains the only primary conversion boundary.

## Supporting-page system

All seven shared content pages keep the current `ServicePage` and `PageHero` architecture. The refresh is primarily CSS-driven.

### Shared hero

- Use a photo-forward or artwork-forward split with a larger media plane.
- Keep eyebrow, one H1, lead, and contact action in the current DOM order.
- Keep proof photographs in natural color with visible attribution.
- Let generated artwork use stronger ocean, lagoon, sand, or palm framing.
- Keep headings within three lines and avoid text overlays on busy photos.

### Indexed detail rows

The four content sections become a consistent editorial information list. Each row shows a visible `01` through `04` index, heading, and body separated by one-pixel rules. About has three rows and stops at `03`.

These indices are visual wayfinding, not steps or semantic ranking. Render each as a real `<span aria-hidden="true">` in the DOM. Do not create them with pseudo-elements and do not announce them to assistive technology. The existing article order and headings carry the meaning.

Desktop uses a heading and body grid. Mobile keeps the same reading order in one column. Visual alternation must use CSS layout only and must not reverse the DOM reading order.

### FAQ and contact bands

Keep the current native FAQ and central contact components. Align their rules, spacing, and heading scale with the homepage. Route-specific color pairs remain inside the Hangin palette.

## Route treatment matrix

| Route | Hero pair and media | Detail treatment | Closing pair |
| --- | --- | --- | --- |
| `/kitesurfing-lessons/` | Sand and ocean; full-color school proof photo | Sun field with indexed ocean rules | Ocean and sand |
| `/rentals-storage/` | Light lagoon and ocean; generated gear art | Sun with one sand emphasis row | Ocean and sand |
| `/kite-safaris/` | Ocean and sun; generated safari art | Sun with palm heading accents | Palm and sand |
| `/accommodation/` | Sand and palm; generated stay art | Sun with one sand emphasis row | Palm and sand |
| `/shop/` | Lagoon and ocean; generated gear art | Sun and selected ocean rows; no product cards | Ocean and sand |
| `/kitesurfing-boracay/` | Lagoon and ocean; full-color aerial proof photo | Sun with palm heading accents | Palm and sand |
| `/about/` | Palm and sand; full-color riding proof photo | Sun and light lagoon; three indexed rows | Ocean and sand |
| `/contact/` | Ocean and sand; no decorative photo | Ruled request list and flat contact channels | Existing ocean footer |

The route classes already centralized in `service-page.tsx` remain the source for these variations. Do not scatter path checks across new components.

## Component and file boundaries

Expected implementation surfaces:

- `app/globals.css`: shared spacing, controls, focus, typography refinements, and motion limits
- `components/site-shell.module.css`: header, mobile menu, and footer refinement
- `components/proof-strip.tsx` and `components/spot-guide.tsx`: concise proof labels and confirmed spot facts
- `app/page.tsx` and `app/page.module.css`: homepage hierarchy, indexed lesson navigator, three-panel service rail, and shop utility row
- `components/service-path.tsx`: visible service indices while retaining semantic links
- `components/page-hero.tsx` and `components/service-page.module.css`: shared supporting-page hero and detail-row treatment
- `components/service-page.tsx`: visible section indices in the existing article markup
- `app/contact/contact.module.css`: visual alignment with the refreshed system
- `tests/routes-and-seo.test.mjs`: retain route, heading, metadata, and crawl contracts after markup changes
- `tests/site-contract.test.mjs`: assert the five-link desktop navigation, revised proof labels, visible decorative indices, three-panel service rail, and separate shop row
- `tests/content-style.test.mjs`: review every changed public label against the project copy rules

Do not change route files, typed content, metadata helpers, sitemap, robots, JSON-LD, contact configuration, or image records unless a specific visual change requires it. Do not add a UI framework or animation dependency.

## Copy policy

The existing public copy is the baseline. This is not a general rewrite.

Only change a label or line when the new hierarchy needs it. Every changed public string must follow `AGENTS.md` and the installed `no-ai-slop` skill:

- Keep facts first and language specific to Hangin, Bulabog, or the actual service.
- Do not invent prices, schedules, availability, staff, rooms, gear stock, reviews, ratings, or wind promises.
- Do not add generic lifestyle copy to make a section look fuller.
- Keep SEO terms natural and useful.

## Static, SEO, and accessibility contracts

The redesign must preserve:

- Next.js static export and trailing slashes
- All nine public routes and the custom 404
- One H1 per page and logical heading order
- Unique metadata, canonicals, Open Graph data, sitemap, robots, manifest, and JSON-LD
- Visible breadcrumbs on supporting pages
- Responsive image candidates, intrinsic dimensions, accurate `sizes`, eager hero media, and lazy below-fold media
- Direct creator and license links for proof photography
- Pixel-honest alt text and decorative empty alt text
- Native mobile-menu and FAQ controls
- Skip link, visible focus, keyboard traversal, contrast, and 48-pixel mobile targets
- The centralized WhatsApp and future-booking adapter

No meaningful label can exist only in a pseudo-element. No visual reordering can create a different screen-reader reading order.

## Responsive behavior

Keep the established breakpoint family around 430, 640, 780, 860, and 960 pixels rather than introducing a second competing system.

Required behavior:

- At 390 and 430 pixels, hero copy remains within three lines, actions remain reachable, and media follows copy.
- At tablet widths, two-column compositions collapse before either column becomes cramped.
- At desktop widths, image planes grow without stretching body text beyond readable line length.
- Proof-image crops retain the subject and attribution.
- Use `object-fit: contain` for generated artwork when cropping would remove the useful composition.
- Hide decorative kite lines below 640 pixels. Apply image-hover movement only on devices that report hover capability, and remove it under reduced motion.
- No horizontal overflow is permitted at any tested width.

## Performance

- No new client component is required for the visual refresh.
- No new runtime dependency is required.
- Avoid global filters, large blend layers, or fixed full-screen textures.
- Preserve local WebP assets and existing responsive candidates.
- If an image crop or asset changes, create both the full and 900-pixel candidates, update dimensions and provenance, and extend the media tests.

## Verification

Implementation is complete only when:

1. `npm run verify` passes.
2. Static export still emits every expected route and artifact.
3. The nine-route matrix is checked at 390 by 844, 430 by 932, 768 by 1024, 1366 by 768, and 1536 by 960.
4. No page has horizontal overflow or a hero headline longer than three lines.
5. Proof-photo crops, captions, links, and responsive candidates are correct.
6. Every new color pair passes contrast checks, including hover and focus states.
7. Mobile targets remain at least 48 pixels and native details controls remain keyboard usable.
8. Reduced-motion mode removes nonessential movement without hiding content.
9. The rendered site is read end to end against the copy rules in `AGENTS.md` and the repository content-style tests.
10. The homepage funnel still reaches WhatsApp and email without a modal or dead end.

## Out of scope

- Copying Duotone branding, fonts, logos, product names, or proprietary assets
- Claiming a Duotone relationship or Pro Center status
- A product catalog or live shop inventory
- A booking provider, availability calendar, payment, database, or user account
- A CMS, blog, multilingual setup, wind widget, or weather feed
- New testimonials, ratings, prices, opening hours, or unconfirmed business facts
- Replacing proof photography with generated images
