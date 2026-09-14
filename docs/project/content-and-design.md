# Current content and design system

Status: Current
Last verified: 2026-09-13

## Website layout audit, 2026-09-13

The compact native menu now remains active through 1023 pixels; the desktop links start at 1024 pixels, avoiding tablet collisions with the logo. Links entering the Boracay guide from other pages open at its shared hero and submenu. Switching topics inside the guide still preserves the hero and scroll position.

The Shop's dark reading sections and About's opening color field extend to the viewport edges with the existing text gutters. The homepage service bands and Shop hero follow their DOM order at every width. The advanced lesson comparison has enough space for all three prices at 700 pixels, and lesson enquiry buttons use ink on coral for readable contrast. The static 404 now uses the site heading scale and centered reading gutters. Copy, photographs, business facts and contact destinations are unchanged by these layout fixes.

Verification and the separation from pre-existing and concurrent edits are recorded in the [website audit report](../operations/2026-09-13-website-layout-audit.md).

## Voice

Hangin sounds like an experienced beach team member answering a guest: relaxed, direct, useful, and specific. Copy leads with the visitor's answer and uses real Bulabog, Boracay, lesson, conditions, and equipment details. It does not add generic island marketing language to fill space.

The full durable writing rules and banned vocabulary live in [`../../AGENTS.md`](../../AGENTS.md). Public strings include visible copy, metadata, alternative text, labels, contact-message templates, and structured-data text. Every change to them requires the `no-ai-slop` workflow and a rendered read-through.

Strong existing lines should not be normalized into a repeated template. Examples include `Kitesurfing since 2001.` and `If the wind is up, we're out.`

The owner reinforced the loose, informal voice for kiters on 2026-09-08. The Boracay guide now covers the wind season, lagoon conditions, tides, reef, launch traffic, riding level, Habagat, packing and arrival with gear. It uses original copy synthesized from the [documented school sources](boracay-spot-guide-sources.md). Competitor prices, operating policies, forecasts and promotional claims are not Hangin facts. The homepage spot introduction follows the same voice and links to the full guide.

## Content layout

The Boracay spot guide and Things to do share a hero and compact sand-colored submenu. Spot guide and Things to do switch the content below it through their existing URLs; the active page uses bold text, a bottom underline and `aria-current="page"`. Kite safaris links to its standalone page. Lessons and Rentals were removed from this submenu at the owner's request. The menu wraps on narrow screens with 48-pixel link targets. The opening Amihan photograph reaches the left page edge on desktop and both edges on mobile; its copy retains reading gutters. The remaining spot sections retain their centered content width.

Verification for the owner’s browser comments, 2026-09-13: `npm run verify` exited 0 with lint, typecheck, a fresh Turbopack export and all 59 tests passing. Browser checks at 320, 390, 860, 1280 and 1920 pixels found no horizontal overflow; desktop and phone screenshots confirmed the image edges and menu wrapping. Keyboard focus was visible and the things-to-do link opened its destination. The existing contrast checks passed, the submenu adds no motion, and its native links appear in exported HTML. The new labels passed the no-AI-slop review. Independent incremental code review found no issues. `git diff --check` exited 0. Changes cover the Boracay route and new local stylesheet, shared service renderer and stylesheet, and this document. Base and HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` on `codex/boracay-image-submenu`; pre-existing changes were preserved. Implementation was authorized and remains uncommitted for owner review. No deployment, production HTTP check, screen-reader session or full accessibility audit was performed.

The homepage spot section links directly to the Boracay spot guide and kite-size guide. The owner removed the separate “Bringing your own gear?” prompt on 2026-09-13.

- `content/site.ts` holds identity, contact destinations, route IDs, and prefilled messages.
- `content/water-pages.ts` holds lessons, rental and storage, and safari records.
- `content/island-pages.ts` holds accommodation, shop, Boracay, and about records.
- `content/boracay-guide.ts` holds the nested things-to-do guide, researched places, activities, planning advice, source links and practical questions.
- The homepage, contact page, header, footer, 404, and some metadata still contain inline copy.
- FAQ text and its structured representation share page records on the service templates.

The content schema is intentionally narrow. It favors real sections and questions over arbitrary rich text or editor-selected components.

The lesson detail cards separate pricing from course descriptions. Beginner courses use a sand-colored definition list with a prominent per-person price and separate private/group hours. Advanced coaching lists each private package's hours and total price. Both use the same typed course/package records as the comparison overview, preserving the approved figures. Following the owner’s latest request, lesson details use two cards per row from 700 pixels and one card per row on phones. Photographs fill their cards within the page gutters. Private hours are right-aligned beside Group hours, with a narrow divider between them; the price shares the row on wider cards and sits above the duration pair on smaller cards. The overview retains its WhatsApp Book column. No client JavaScript is added.

Pricing-layout verification, 2026-09-12: `npm run verify` exited 0 with lint, typecheck, a fresh production export and all 56 tests passing, including exact price/duration checks for all six detail sections. Browser review covered 320, 390, 833 and 1440 pixels, with no horizontal overflow, readable pricing, semantic labels and working keyboard course-jump focus. Ocean text on sand exceeds AA contrast; the new pricing has no motion. Independent incremental review found no issues. The six changed files are the water-page record, shared service component and stylesheet, lesson-overview and route tests, and this document. Work remains uncommitted on `codex/image-descriptions-quality-ranks`, base and HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, with pre-existing changes preserved. Implementation was authorized; no deployment, production HTTP review, screen-reader session or full accessibility audit was performed.

The Boracay page includes a sand-colored “Places to be” section linking to `/kitesurfing-boracay/things-to-do/`. The child guide uses the existing palette, fonts and licensed Bulabog photograph, with native jump links and flat text rows that keep headings before their copy in visual and DOM order. It covers five places, kite lessons, sailing, snorkeling, a flexible day plan, transport and arrival. Visible source links support the researched geography and activities. Practical questions use native disclosures without adding FAQ structured data. The guide appears in mobile and footer navigation while desktop “Boracay” continues to lead to the spot page.

## Visual identity

Working direction: Tropical Ride Culture.

| Token | Value | Main use |
| --- | --- | --- |
| Ocean | `#073642` | Primary dark blue: hero, spot, contact and footer; text on lagoon fields |
| Lagoon | `#00A8C4` | Secondary Duotone blue: center story, alternate service panels, rental/shop/Boracay heroes and small highlights |
| Sand | `#F2E5C4` | Secondary warm reading fields and light text on dark blue |
| Sun | `#FFFDF6` | Supporting light neutral and text on dark blue |
| Coral | `#F06449` | Red accent for contact buttons, the Hangin wordmark and small details |
| Ink | `#102A30` | Main dark text |

The owner approved dark blue, Duotone blue, the existing sand and red accents on 2026-09-10. Dark blue leads the layout; blue and sand form the secondary fields. Green is no longer an interface color. Sun and ink support readability rather than adding competing brand colors. Photography and approved artwork keep their original colors.

The blue is taken from the inline `--color-primary: 0, 168, 196` token on [Duotone's official kiteboarding website](https://www.duotonesports.com/en/kiteboarding), accessed 2026-09-10. It replaces the former lagoon `#1FB9C1`; this is a website color reference, not an assertion about Duotone's complete brand guidelines. Blue panels use dark text, including the Boracay photo credit, for at least 4.5:1 contrast.

Display type uses Barlow Condensed. Body and interface text use Manrope. Layout favors large image planes, flat color fields, one-pixel rules, readable left-aligned copy, square or lightly softened controls, and restrained kite-line curves.

The design avoids generic card grids, pills, glass effects, purple gradients, floating blobs, tropical-leaf wallpaper, generic feature icons, heavy shadows, carousels, autoplay, and decorative motion.

WhatsApp CTA buttons share a 20-pixel, current-color Tabler WhatsApp icon beside the existing text label. The inline SVG is decorative for assistive technology and adds no runtime dependency. The header uses the approved coral wordmark at a compact width on mobile, beside the WhatsApp and menu controls; its accessible brand name remains intact. Source: [Tabler brand-whatsapp](https://github.com/tabler/tabler-icons/blob/main/icons/outline/brand-whatsapp.svg), retrieved 2026-09-06; [MIT license](../../public/licenses/tabler-icons.txt).

The mobile navigation uses a 48-pixel hamburger control that switches to a close icon when expanded. It retains native `details`/`summary` keyboard and no-JavaScript behavior, an accessible “Menu” label and visible focus.

Mobile-menu links load the destination document, closing the menu on arrival instead of retaining its open state across Next.js transitions. This fixes the overlay covering the destination page without adding client-side menu code.

## Approved Hangin logo

The owner approved the modern wordmark on 2026-09-08 and authorized its website use and local SVG conversion. The artwork retains the coral lettering and angled accent above the A, with consistent letter height, open counters and a slight forward lean. It was traced from the approved PNG, rather than redrawn from a font. The flat vector files have transparent backgrounds and no font or runtime dependency.

The header uses the compact wordmark. The homepage names Hangin Kite Center above its single H1, “If the wind is up, we're out there.” The footer uses the complete “Kite Center & Resort / Boracay” logo with light supporting lettering on ocean. The favicon and Apple icon use the same traced H. The full ocean-text logo is also available for light surfaces. Asset paths and dimensions live in `brandImages` in `content/images.ts`; provenance is in [`../../public/brand/ATTRIBUTION.md`](../../public/brand/ATTRIBUTION.md).

## Image roles

Proof and illustration are separate data types:

- Proof images may establish Boracay or a confirmed real subject. They retain natural color, honest alternative text, responsive variants, and visible creator/license attribution where required.
- Generated images provide atmosphere only. They use empty alternative text when decorative and cannot prove staff, rooms, facilities, equipment, stock, instruction, or trip routes.

Image paths and dimensions live in `content/images.ts`; legal and provenance detail is recorded in `public/images/ATTRIBUTION.md`.

The Board riding course now uses owner photo 45, showing a red-capped rider and the board beside the palm-lined beach, following the owner's replacement request. It has 1800- and 900-pixel WebP variants, recorded permission and useful alt text, with no visible photo caption. The homepage keeps its orange-sleeved rider image. Course jump links target the headings beneath the photographs so the course title and pricing are visible after a jump.

Full-width photo and caption-removal verification, 2026-09-12: the final `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing. The first board-photo export check caught an abbreviated mobile filename in the attribution ledger; the full path was added and the complete pipeline rerun successfully. Browser checks confirmed zero photo captions on Lessons, all seven lesson photographs spanning the viewport, no horizontal overflow at 390, 833 and 1440 pixels, and keyboard course links focusing their headings with pricing visible. The replacement rider/board crop was visually checked at 390 and 833 pixels. An independent review identified the former article jump targets and undersized portrait derivatives; both were fixed with heading targets and 1800-pixel derivatives from preserved originals. Source hashes, desktop dimensions and bytes are recorded in `owner-media.json`; original media and mobile derivatives are unchanged. No new animation or interactive controls were added.

Work is uncommitted on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, with earlier changes preserved. Scope includes the homepage and shared photo rendering, lesson layout and heading targets, image/course records, five WebP derivatives, the existing lesson tests and image/design documentation. Final log: `/tmp/hangin-board-photo-final-verify.log`. No production deployment, external actions, manual JavaScript-disabled session, screen-reader session or full accessibility audit was performed.

## Implemented versus proposed design

The implemented site has the approved palette, fonts, responsive imagery, semantic shell, native disclosure controls, visible focus, and reduced-motion handling. Following the owner's 2026-09-12 approval of the cinematic concept and choice of the existing photograph, the homepage opens with one full-width owner-supplied riding image behind the headline “If the wind is up, we're out there.” A pin icon and linked “Bulabog Beach, Boracay” label sit above the headline; the established date, lagoon invitation, WhatsApp action and follow-up note follow it. The location uses the existing Maps destination. A dark overlay supports readability while the crop keeps the rider's face above the headline. The header overlays the image on the homepage only, using a CSS sibling `:has()` condition on the main element. It remains in normal flow on supporting pages, including after client navigation.

The opening uses a still photograph, with no video, autoplay or animated image movement. Responsive image selection accounts for the portrait-screen cover crop. The Duotone designation and compact Google and Tripadvisor logo-and-star links sit at the lower edge inside the photograph, using the existing documented snapshots and fractional star fills. The owner requested removal of the repeated Hangin identity, lower services link and standalone Maps pin; the location link above the headline replaces the latter. The follow-up note sits below WhatsApp inside the image, with no separate ocean-colored follow-up band. The owner-provided photograph keeps its useful alternative text and recorded permission; no stock footage or license purchase is involved.

A flat partner strip centers the official Duotone and ION logos as a pair. Its label stays left on desktop and sits above the centered logos on mobile. `content/site.ts` owns the Maps destination, partner links and rating snapshots. Logo provenance is recorded in [`../../public/brand/partners/ATTRIBUTION.md`](../../public/brand/partners/ATTRIBUTION.md). The owner’s feedback on 2026-09-06 authorizes the brand references; no official Duotone Pro Center designation is asserted.

On mobile, the same photograph fills the opening behind the copy, with the rider's face above the text. Image, location link, H1, supporting copy, WhatsApp action, follow-up note and lower-edge badges retain their semantic order. On small phones, the Duotone designation precedes the review links inside the hero. The native mobile menu retains its 48-pixel control and visible focus over the dark image. The Bulabog spot image-and-copy grid spans the viewport width without outer side gutters or blue bands; its text panel retains internal reading space. A single service section follows the partner strip, then Bulabog context, center history, practical questions and a final contact prompt.

The dated [`../superpowers/specs/2026-08-31-hangin-duotone-visual-refresh-design.md`](../superpowers/specs/2026-08-31-hangin-duotone-visual-refresh-design.md) is marked as awaiting review and is not fully implemented. Current code still has the earlier desktop navigation, five service bands, no service indices or rider-state labels, no separate shop utility row, and no compact spot-fact band. Treat these as proposed changes, not defects, until that specification is accepted or superseded.

Future UI work must preserve the Hangin identity. The owner-approved Duotone and ION partner logos identify equipment brands; they do not authorize copying those brands’ site design, typefaces or product copy, or asserting additional affiliations.

### About-page gear partners

The About-page hero places its introduction before an edge-to-edge photograph of the group outside the center, at every screen width. The full photograph retains its natural aspect ratio, with a `100vw` responsive size hint. The Lessons hero also spans the viewport beneath its introduction. Following the owner’s later 2026-09-12 direction, descriptive captions are no longer rendered beneath owner-provided photographs, including the About, Lessons and homepage photographs. The caption records remain available as internal image descriptions. The header, text gutters, source image, useful alt text and permission record are preserved.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing; `git diff --check` passed. Browser review at 390, 833 and 1440 pixels confirmed the image starts at x=0 and matches viewport width, retains its intrinsic aspect ratio, and follows the introduction without horizontal overflow. Caption and full-page accessible content were reviewed. Independent incremental review found no issues. Five files changed: the island-page record, PageHero and ServicePage components, shared service stylesheet and this document. Work is uncommitted on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; prior changes were preserved. No deployment, external actions or full accessibility audit was performed.

Following the owner's 2026-09-10 request, `/about/` includes a sand-colored gear-partners section after its history and service details and before the contact section. It pairs a short introduction with the official Duotone and ION logos, using the existing `sitePartners` assets and external links. Copy lives in `aboutGearPartners` in `content/island-pages.ts`; the page uses the shared `ServicePage` children slot. The layout stacks on narrow screens, preserves reading order and logo proportions, and keeps both brand links at least 48 pixels tall. It adds no stock, model or availability claims.

## Service choices and contact follow-up

The Contact page's “Find us on Bulabog Beach” panel includes an “Open Google Maps” link beneath the location. It uses the existing `siteConfig.mapsUrl` destination, opens in a new tab with safe external-link attributes, and reuses the shared 48-pixel button and focus styles. Added at the owner's request on 2026-09-12.

Map embedding update, 2026-09-13: the owner requested an embedded map. Contact now pairs this location copy with an optional Google map, above the WhatsApp and email panels. The Boracay spot guide includes the same map and meeting-point guidance. Visitors select “Load Google Maps” after a short privacy explanation; “Hide Google Maps” removes the frame. Both maps use the existing ocean, sand and sun palette with stacked mobile layouts. See [ADR 0002](../decisions/0002-optional-google-maps.md) and [verification record](../operations/2026-09-13-google-maps.md).

Historical verification for the September 12 directions-link change: `npm run verify` and `git diff --check` exited 0, with all 54 tests passing. Browser review at 320 and 1280 pixels confirmed the Maps destination, a 50-pixel rendered target, no horizontal overflow and visible keyboard focus. Independent review found no issues. Only the Contact page, its stylesheet and this document changed for this fix; existing work is preserved. The change is uncommitted on `codex/image-descriptions-quality-ranks`, with base and HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Implementation was authorized; no production deployment, live Maps destination revalidation or full accessibility audit was performed.

The homepage combines the former service-choice cards and supporting service bands into one section immediately after the partner strip, before the Bulabog spot guide. It keeps the owner-preferred large image-and-text layout, without an eyebrow label. The heading is “Your Boracay kite experience.” following the owner's 2026-09-10 copy direction. Lessons come first, followed by rental/storage, accommodation, the shop and safaris, with one description and link per service.

The rental/storage heading is “Rent gear or store your own.” following the owner's 2026-09-10 correction, so it addresses visitors bringing equipment as well as those renting it.

Each service has responsive, lazy-loaded imagery: the CC0 Boracay riding photograph for lessons and the existing decorative gear, stay and safari illustrations elsewhere. Illustrations do not claim to show actual facilities, equipment stock or trips. The Bulabog aerial credit stays visible because its BY-SA license requires attribution.

The final homepage contact section invites visitors to ask anything about lessons, gear, stays or Boracay and states the owner-confirmed one-day reply commitment. Non-compact shared contact actions use a 48-pixel envelope link with an accessible email address and tooltip, alongside WhatsApp. Source: [Tabler mail icon](https://github.com/tabler/tabler-icons/blob/main/icons/outline/mail.svg), retrieved 2026-09-06, under the existing [MIT license](../../public/licenses/tabler-icons.txt).

The footer places telephone, email and a WhatsApp CTA under the Hangin identity in the left column, before navigation in DOM order. Mobile layouts stack identity/contact and navigation. A “FAQ” link after Contact points to the homepage's existing `/#questions` section from every page. That section's eyebrow is “FAQ”.

Following the owner's 2026-09-10 direction, the homepage center heading is “Kitesurfing since 2002.” Its paragraph describes looking after a Boracay kite trip through lessons, gear and stays, with the team's goal of giving guests the best experience on and off the water.

Following the owner's 2026-09-12 background request, the homepage center section uses lagoon blue with ocean text, heading, link and photo credit. This separates it from the ocean spot section above and sand FAQ below.

The footer also displays Duotone and ION logos beneath its WhatsApp action, following the owner's 2026-09-10 request. It reuses `sitePartners` and the existing official monochrome SVGs, displayed in white with their proportions preserved. Each logo links to its official brand website and has a named alternative, a 48-pixel-tall target and visible keyboard focus.

The footer telephone link uses a 24-pixel Tabler phone icon in a 48-pixel target, with the phone number retained in its accessible label and tooltip. Source: [Tabler phone icon](https://github.com/tabler/tabler-icons/blob/main/icons/outline/phone.svg), retrieved 2026-09-06, under the existing MIT license.

The footer email link also uses the shared Tabler envelope icon. Phone and email sit side by side below the identity, each with a 48-pixel target, accessible destination label and tooltip.

Email action colors are owned by the shared `.email-action` control: the resting icon inherits its section color, and hover uses an ocean icon on sand. Homepage and service contact sections do not override this control's foreground color, avoiding the former sand-on-sand hover conflict.

Review badges sit directly on the ocean hero with transparent resting and hover backgrounds and no divider above them. Google retains its color wordmark, Tripadvisor renders in white, and rating stars use sand. Hover adds a subtle underline; keyboard focus remains visible.

The homepage hero has a small outlined “Official Duotone Kite Center” tag above HANGIN, using the owner-supplied designation in `siteConfig.centerDesignation`. At the owner's request on 2026-09-08, a small monochrome Duotone symbol precedes the text inside the tag. The symbol comes from the existing official logo, retains its proportions, and is decorative for assistive technology because the adjacent text names Duotone. The tag remains separate from the single H1.

The shared footer places social icons directly beside the phone and email icons, with WhatsApp below the combined row. Each configured profile has a 48-pixel target, a named accessible link and a new-tab destination. Only known URLs render; Instagram/TikTok icons are supported but await owner-provided URLs. Social SVGs come from Tabler's MIT-licensed [Facebook](https://github.com/tabler/tabler-icons/blob/main/icons/outline/brand-facebook.svg), [Instagram](https://github.com/tabler/tabler-icons/blob/main/icons/outline/brand-instagram.svg), and [TikTok](https://github.com/tabler/tabler-icons/blob/main/icons/outline/brand-tiktok.svg) icons (retrieved 2026-09-06). No embeds, trackers or runtime platform scripts are added.

## Kite size guide

The [kite size guide](kite-size-guide.md) uses an ocean introduction, a sand form panel and flat result rows with large Barlow Condensed size ranges. Results start directly with their heading, without an eyebrow label. It adds native weight/unit/month/year/level controls with 48px minimum targets and no decorative motion. On mobile, the form precedes the results. The homepage spot section, shared footer and mobile navigation link to the guide. All size outputs are source-based planning ranges with visible assumptions.

## Lesson course descriptions and prices

Following the owner's 2026-09-12 request, each of the five course comparison rows and the advanced private coaching panel includes an “Ask on WhatsApp” link after the prices. Its prefilled message names the selected course and includes `[dates]` and `[level]` prompts. Accessible link names also identify the course. These native links share the existing contact adapter and have 48-pixel targets and visible focus; opening one does not send a message or confirm a booking.

Enquiry verification on 2026-09-12: lint, typecheck and fresh production export passed. The initial `npm run verify` exited 1 on test expectations; after correcting HTML-entity decoding and allowing the six exact course messages only on the lessons route, `npm test` exited 0 with all 54 tests passing, and the final lint and diff checks exited 0. Browser review at 320, 390 and 1280 pixels confirmed no horizontal overflow, six correctly prefilled destinations and 48-pixel enquiry targets; keyboard checks confirmed visible focus on light and dark panels. Copy and independent code reviews found no issues. This change touches `content/site.ts`, the overview component and stylesheet, the lesson-overview and site-contract tests, and the architecture and content documents. Base and HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` on `codex/image-descriptions-quality-ranks`; changes are uncommitted and other working-tree changes are preserved. The user authorized implementation; production deployment and WhatsApp message sending were not performed. No full accessibility audit or manual JavaScript-disabled browser run was performed; static-link behavior is covered by the exported-HTML tests.

The price comparison includes a short suitability line beneath each beginner-course name, following the owner's 2026-09-12 request. Introductory is for trying kite control before choosing a longer course; Basic starts with setup, safety and body dragging; the two progression courses identify their preceding stage; Full combines the basic kite, kite control and board riding stages. These lines are drawn from the approved descriptions and stored as `suitability` in `lessonCourses`. The existing prices, hours, native course links and mobile labels remain intact.

Verified on 2026-09-12 on `codex/mobile-menu-lesson-faq`: `npm run verify` exited 0 with all 53 tests passing. Browser review at 320, 390 and 1280 pixels found no horizontal overflow; course links retained 48-pixel targets, visible keyboard focus and focusable jump destinations. Independent copy review found no unsupported claims. This bounded update changes the lesson record, overview component, overview stylesheet and this document; pre-existing changes are preserved. No deployment or full accessibility audit was performed.

Following the owner's 2026-09-12 request and reconciliation of the earlier policy discussion, the lesson FAQ explains beginner equipment inclusions, final tax/mandatory-fee-inclusive prices, the two-student/one-kite group arrangement, usual two-day lesson-time confirmation and voluntary rescheduling or refunds for teaching prevented by conditions. It uses the existing native FAQ disclosures and shared visible/JSON-LD content. It does not promise fixed calendar course lengths or advanced equipment inclusions.

On 2026-09-08 the owner supplied a [Hangin course price sheet](../references/2026-09-08-hangin-course-price-sheet.md) and authorized its text and price updates. `content/water-pages.ts` now publishes the introductory, basic kite, kite control, board riding, full and advanced private courses using the existing flat service rows. Each beginner row leads with the per-person PHP price and private/group teaching hours; advanced coaching lists its three private package totals. A sand-colored overview above the descriptions compares the five courses in aligned rows, with private/group hours and per-person prices. On mobile each course keeps its labels beside the figures. A separate ocean panel lists the three advanced private packages. Native links jump to focusable course descriptions. Both the overview and detailed price summaries use `lessonCourses` and `advancedLessonPackages` in the same content file, so prices and hours have one source. The contact path and static delivery remain unchanged.

Copy retains the sheet's teaching topics with corrected grammar and realistic learning outcomes. The original promotional claims remain only in the internal transcription, not in visible copy or JSON-LD. FAQ answers use the same course vocabulary. The approved website logo remains unchanged; the original sheet is stored under `docs/references/`, outside public assets.

Following the owner’s 2026-09-10 image request, the six detailed lesson courses use a two-column grid on mobile and tablet, expanding to three columns at 1000px. Images and headings scale down on phones while the complete course text remains visible. The existing Boracay proof photographs provide riding and beach context, with deduplicated source and license links beneath the grid. Images retain honest alt text, lazy loading, responsive candidates and intrinsic dimensions. The conditions note spans the grid width.

## Owner photography and lesson clips, 2026-09-12

The homepage now uses the owner’s orange-sleeved rider by the palm-lined beach in the hero, a smiling pair with a control bar for lessons, real board details for the rental band and the storefront for the shop band and the group outside Hangin for the center story. Lessons use six distinct photos for control-bar equipment, kite setup, control in the shallows, riding and jumping. The same collection supplies the lessons, rental, shop and about heroes. The wide center group is shown in full.

The owner removed the “Before the board hits the water” video section on 2026-09-12. Lesson details now lead directly to the practical questions. The unused video component, source records and media files remain available for reuse; no players render on Lessons. Existing course information and contact paths are preserved. See [media documentation](seo-accessibility-media.md) and [the selected source manifest](owner-media.json).

Removal verification: `npm run verify` and `git diff --check` exited 0, with a fresh export and all 56 tests passing. The updated route test and browser review confirmed no video players or removed heading, and practical questions immediately following the course-detail headings. The change is limited to the Lessons route, its existing video test and the current design/media/architecture documents. It remains uncommitted on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; prior changes and media files were preserved. No deployment or full accessibility audit was performed.

The homepage shop band uses owner photo 78 following the 2026-09-12 browser comment requesting another image. It shows the actual storefront and beach access road; the shop page retains its board detail photo.

Following the next 2026-09-12 browser comment, the homepage kite-spot section uses owner photo 41 of colorful kites and riders across the bay. Its descriptive caption replaces the aerial photographer credit. Guide pages retain the geographic aerial and its attribution.


### Cinematic photograph verification, 2026-09-12

The user approved the cinematic full-screen composition and selected the current orange-sleeved riding photograph instead of acquiring stock footage. The hero uses the existing `siteImages.boardRiding` asset and existing contact/review records. No source image bytes, public facts, metadata, routes or production dependencies changed. The homepage identity and headline assertions now reflect the approved copy. Verification details are recorded in [cinematic-photo-verification.md](cinematic-photo-verification.md).


### Retained video template, 2026-09-12

The owner requested that the cinematic video concept be kept for reuse while the homepage retains its photograph. The self-contained [video template](../../templates/cinematic-video/README.md) includes the original demonstration MP4, poster, fonts, brand assets, layout and playback behavior. It lives outside the website routes and public assets, so production exports do not include it. The template is a saved reference, not a change to the photograph-based homepage or authorization to publish new footage.


### Photo labels and header lines, 2026-09-12

All page-hero photographs now render without captions below them. The remaining licensed Bulabog aerial credit is in a native “Photo credits” disclosure in the shared footer, naming Patrickroque01 and linking both the source and CC BY-SA 4.0 license. Owner photographs keep their useful alt text and recorded permission. The decorative curved lines were removed from the shared page headers, including About, along with their unused styles. The saved cinematic template is unchanged.

Verification: `npm run verify` passed lint, typecheck, fresh static export and all 56 tests. Browser inspection of all 11 public routes at 833 pixels found zero photo captions, zero shared curved-header decorations and no horizontal overflow. About was visually checked at the photo boundary; the footer disclosure was checked at 390 pixels with keyboard activation, a 48-pixel target and visible 3-pixel focus. Source and license links retain their existing destinations. Changes cover PageHero, the shared footer and their styles, plus design/media/provenance documentation, on `codex/image-descriptions-quality-ranks` at base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Work remains uncommitted and other changes are preserved. No deployment, external action, manual JavaScript-disabled session, screen-reader session or full accessibility audit was performed.

Final cleanup verification encountered the known macOS `.DS_Store` race in `.next/server` (`ENOTEMPTY`). Inspection found only that generated Finder file; an unchanged retry of the full pipeline passed all 56 tests. Final log: `/tmp/hangin-no-labels-lines-final-retry.log`. Independent review found no actionable issues.


### Course contact column, 2026-09-12

The Lessons comparison uses a final column without a visible heading for coral “Book” buttons. Each opens the existing WhatsApp contact with the selected course, dates and riding-level prompts prefilled. These remain contact links, with no booking confirmation or checkout. Course-title jump links remain, without arrows. On narrow screens the button follows the labeled hours and price; advanced coaching uses the same action. Prices and teaching durations are unchanged.

Verification: final `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 56 tests passing (`/tmp/hangin-book-column-final-verify.log`). Responsive browser checks at 320, 390, 700, 833 and 1440 pixels found no horizontal overflow. All six actions retain their course-specific WhatsApp destinations and 48-pixel height; the introductory title still focuses its detail heading. Independent review identified the advanced button’s focus contrast, which was corrected and browser-verified with a sand 3-pixel outline. The only public label added is the owner-requested “Book”; the existing copy checks pass. Files changed for this request: the LessonOverview component and stylesheet, its existing export test and this document. Base/HEAD remains `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` on `codex/image-descriptions-quality-ranks`; changes are uncommitted for owner review. No deployment, outgoing WhatsApp message, full accessibility audit or screen-reader session was performed.


### Course cards restored, 2026-09-12

The latest owner comment supersedes the earlier edge-to-edge course-photo layout. All six detailed courses now sit in the content-width card grid, two across at 700 pixels and above, with one per row below that. Course images have responsive sizes matching those cards, retain their 4:3 crops and have no captions. The conditions note spans both columns. Prices, descriptions, heading jump targets and the full-width Lessons hero are unchanged. Private hours align toward Group hours across a small divider, keeping the two teaching formats together.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh export and all 56 tests passing (`/tmp/hangin-course-cards-verify.log`). Browser review at 320, 390, 700, 1000 and 1190 pixels found no horizontal overflow or clipped course headings/prices. All six images fit their cards; the introductory and advanced jump links still focus their headings, and all approved prices and hours remain covered by existing export tests. Independent review found no actionable issues. Only the shared service component, its stylesheet and this document changed for this request; work remains uncommitted for owner review on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. No public copy, contact behavior, motion or image files changed. No deployment, external action, screen-reader session or full accessibility audit was performed.


Kite control image replacement, 2026-09-13: the Kite control course card now uses owner photo 131, showing a helmeted learner handling the control bar beside another person on the beach. The 4:3 derivative retains the hands, bar and faces. The former smiling-pair photograph remains in the Lessons hero and homepage. Card layout, prices and contact links are unchanged; no image label is rendered.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing (`/tmp/hangin-kite-control-photo-verify.log`). The replacement loaded correctly and retained the hands, bar and faces at 1190 and 390 pixels, without horizontal overflow or a caption. The keyboard course link still focuses the heading. Source hash and derivative provenance are recorded in owner-media.json and the public attribution ledger. Scope: image/course records, two WebP derivatives, provenance and current design/media documentation; existing changes remain preserved on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Uncommitted for owner review; no deployment or full accessibility audit performed.

The subsequent 2026-09-13 image feedback replaces photo 131 in the Kite control card with owner photo 29, rated 9/10 in the source review: a smiling orange-shirted rider with crisp spray and strong light. The 4:3 crop retains the control bar, rider and board. Layout and caption-free presentation are unchanged.

Latest selection verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing (`/tmp/hangin-better-control-photo-verify.log`). The new crop was visually checked in the card at 1151 and 390 pixels; the image loaded, had no caption and preserved the rider, bar and board. No horizontal overflow appeared on mobile. Only image/course records, two derivatives and provenance/design/media documents changed; source originals and earlier work remain preserved. Base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, branch `codex/image-descriptions-quality-ranks`, uncommitted for owner review. No deployment or full accessibility audit performed.

### Kite safari page, 2026-09-13

The existing safari service page now has a dark-blue split hero with the established decorative illustration, a blue strip of native section links, three practical text sections and a blue panel linking to related Boracay services. Four native FAQ disclosures share their visible answers with the existing structured-data renderer. The final contact section uses safari-specific copy and the central WhatsApp adapter. The original plural route, one H1, visible breadcrumbs, email fallback, local responsive art and static delivery remain intact.

Safari hero and section headings now retain the same visual and DOM reading order at desktop widths. The new page-local stylesheet uses the existing Barlow Condensed/Manrope roles and ocean, lagoon, sand and sun tokens. No dependencies, client component or motion were added. Desktop navigation now includes Safaris; mobile and footer links remain present. The sitemap records the substantive safari edit as 2026-09-13.


### Rental hero, 2026-09-13

The rental/storage hero now pairs a dark ocean text panel with an edge-to-edge gear photograph. Its cream headline, blue eyebrow, sand body copy and coral WhatsApp action use the existing palette. Desktop panels share the width equally, with more internal space around the copy; phones show the copy before a wide photo crop. The existing owner board photograph, confirmed copy, H1, breadcrumbs and contact destination are preserved. The rental-specific styles do not change other service heroes. No photo captions, decorative lines or motion are added.

Safari verification: `npm run verify` exited 0 after the final CSS edit, with lint, TypeScript, a fresh Turbopack static export and all 56 Node tests passing. An initial lint run caught an unescaped JSX apostrophe; it was corrected before the successful runs. `git diff --check` exited 0. The existing content-style tests and a rendered read-through covered visible copy, expanded FAQ answers, metadata and contact text against the no-AI-slop rules.

Browser review covered the safari page at 320, 390, 781, 960 and 1440 pixels and the shared desktop navigation on all eleven public routes. No horizontal overflow was observed. New planning links meet 48-pixel mobile targets; section links focus their headings with 32-pixel scroll clearance, native FAQs open with Enter and retain visible focus, and the existing reduced-motion CSS remains in place. The decorative image loads correctly. Contact URLs contain the expected safari message and number; no messages were sent. No browser warnings or errors were reported. Independent incremental review found no actionable defects.

Local HTTP checks returned 200 for the safari page and sitemap and 404 for an unknown route. Canonicals, robots, sitemap parity, JSON-LD and the custom static 404 artifact passed export tests. Deployed HTTP normalization, production headers and production 404 routing were not checked because this task does not deploy the change. No full screen-reader audit or separate automated browser accessibility scan was performed; these checks do not establish WCAG conformance.

Task scope: `app/kite-safaris/page.tsx`, its new `safaris.module.css`, `app/sitemap.ts`, `components/site-header.tsx`, the safari-only rules in `components/service-page.module.css`, `content/water-pages.ts`, `content/site.ts`, the matching assertions in `tests/site-contract.test.mjs` and `tests/routes-and-seo.test.mjs`, and the current product/design documents. Base and HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; work is uncommitted on `codex/kite-safari-page`. Pre-existing changes are preserved. The owner authorized implementation; owner review of this result is pending, and no push, merge or deployment was performed. Sources were the current repository facts and installed Next.js 16.3.3 layouts/pages, static-export and sitemap guides, read on 2026-09-13. No new external business claims or assets were introduced.

Rental hero verification: final `npm run verify` exited 0, including lint, typecheck, fresh static export and all 56 tests (`/tmp/hangin-rental-hero-approved-layout-verify.log`). Browser review covered 320, 390, 860, 1151 and 1440 pixels with no horizontal overflow; phone and desktop crops were visually inspected. The WhatsApp destination is unchanged, its target is 50 pixels high, and keyboard focus has a visible cream 3-pixel outline. Existing page copy and heading order were read through; no copy or motion was added. Independent review found no actionable issues. Scope: rental-specific service styles, the rental image sizes hint and this document. Work is uncommitted for owner review on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`; unrelated work is preserved. No deployment, outgoing message, screen-reader session or full accessibility audit was performed.


### Rental section photography, 2026-09-13

Rental/storage details now use four photo-led sections in a two-column grid from 700 pixels, stacking on phones. Existing owner photographs show kite preparation, board details, a rider and the kite bay. Images fill their cards, without captions; they illustrate the section topics rather than establishing stock or a specific storage arrangement. The owner also requested prices, but the repository has no confirmed rental/storage rates. Those figures are pending the owner's currency, duration and inclusion details; none have been invented.

Photo-layout verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing (`/tmp/hangin-rental-section-images-verify.log`). All four section images loaded at 1151 pixels; the stacked layout was visually checked at 390 pixels, with no horizontal overflow or clipped headings. Existing alt text, provenance and contact links remain intact. Independent review found no actionable issues. Scope: rental section image records, rental-specific section styles, responsive image sizes and this document. Work remains uncommitted on `codex/image-descriptions-quality-ranks`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, with unrelated changes preserved. Pricing remains pending owner input; no numeric rates, new price claims, deployment or full accessibility audit were performed.

### Rental gear partners, 2026-09-13

The rental page now reuses the existing Duotone and ION gear-partner strip between its hero and photo-led details. Logos, accessible names and outbound destinations come from the existing `sitePartners` records; no new equipment stock claims or prices are introduced.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 56 tests passing (`/tmp/hangin-rental-gear-verify.log`). Desktop and 390-pixel browser checks confirmed the placement, loaded logos, visible keyboard focus and no mobile horizontal overflow. Scope is the rental page composition and this document; changes remain uncommitted for owner review, with unrelated edits preserved. No deployment or full accessibility audit was performed. Rental and storage rates remain pending owner input.

### Boracay guide hero, 2026-09-13

The main Boracay guide opens with the existing owner photograph of colorful kites across the lagoon, replacing its aerial photograph. Desktop uses the photo across the hero with cream display type and directional ocean shading to support the unchanged introductory copy and WhatsApp action. Below 860 pixels the text sits on an ocean panel followed by the full 3:2 photograph. No caption, decorative lines, new public claims or motion are added. A route-specific class confines the redesign to the main guide; the Things to do hero retains its previous presentation. Responsive image sizes now declare the full-width image.

Verification: final `npm run verify` exited 0 with lint, typecheck, fresh static export and all 56 tests passing (`/tmp/hangin-boracay-hero-complete-verify.log`). The first build encountered an `ENOTEMPTY` error in `.next/build`; inspection found only a generated Finder `.DS_Store`, and an unchanged retry passed. Visual checks covered 390, 860 and desktop widths; a 320-pixel DOM check found no horizontal overflow. The photograph loaded, the mobile image retained its full composition, and keyboard focus on the contact action was visible. Existing page copy was read end to end. Independent review identified and then verified the correction of a shared-style overlap with the Things to do page. No full accessibility audit or screen-reader session was performed.

Scope: the Boracay image record reference in island-pages, the ServicePage route class and sizes hint, route-scoped hero styles, and this document. Work remains uncommitted for owner review; unrelated changes are preserved. No deployment or outgoing message was performed.

### Boracay guide imagery and contact hierarchy, 2026-09-13

The owner clarified that the Boracay guide can support enquiries but should be less conversion-focused than the homepage. Keep practical spot information first, with restrained contextual links rather than repeated promotional panels or booking buttons.

Three existing owner photographs now accompany the Amihan, lessons and packing sections. The guide uses smaller headings, consistent heading-before-body order and more compact text sections. On desktop the photo sections place imagery alongside the heading and advice; on phones they stack image, heading and body. Photos have no labels or captions. Two underlined links lead to lessons and rental/storage where those topics already appear. Existing safety, weather and travel copy is unchanged; no stock, season or price claims were added.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 56 tests passing (`/tmp/hangin-boracay-guide-final-verify.log`). Browser review at desktop and 390 pixels confirmed the photo crops, readable text, visible keyboard focus and 48-pixel links. No horizontal overflow appeared at 390 or 860 pixels. A first visual pass caught an overly tall portrait image; the final desktop photos use consistent 4:3 crops, with 3:2 crops on phones. Independent code review found no actionable issues. New link labels and existing alt text were checked against the public-copy rules. No motion was added; no full screen-reader or accessibility audit was performed.

Scope: optional section-link typing and rendering in the shared service content/component, three Boracay image references and two contextual links, styles scoped to the main Boracay guide, and this record. Work remains uncommitted for owner review, preserving unrelated edits. No deployment, outgoing message or measured conversion improvement is claimed.

### About hero composition, 2026-09-13

This composition was superseded by the later About browser comments below. It placed the founding headline to the left of the introduction and contact action at desktop widths, above the full photograph.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh static export and all 56 tests passing (`/tmp/hangin-about-hero-verify.log`). Desktop, 860-pixel and 390-pixel visual checks confirmed the composition, readable text and full photo; a 320-pixel check found no horizontal overflow. The contact action retains visible keyboard focus. Existing copy and alt text were read through. Independent review found no actionable issues. No motion was added, and no full accessibility audit or screen-reader session was performed.

Only About-scoped rules in the shared service stylesheet and this document changed for this request. Work remains uncommitted for owner review on the current `codex/kite-safari-page` branch; pre-existing changes are preserved. No deployment or outgoing message was performed.

### Footer photo-credit removal, 2026-09-13

The owner requested removal of the shared Photo credits disclosure. The last rendered BY-SA photograph, on Things to do, now uses the existing owner-supplied kite-bay image instead. The footer block and unused styles are removed across the website. Original external image files and their source/license ledger remain archived; no visible attribution is required for the owner image under the recorded website permission. Tests still require matching creator/license credits whenever a BY-SA image is rendered, without requiring the retired aerial to remain in use.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh static export and all 56 tests passing (`/tmp/hangin-remove-footer-credits-verify.log`). A scan of all 14 exported HTML files found no footer Photo credits control and no rendered BY-SA image. Desktop browser review confirmed the cleaned homepage footer; Things to do was checked on desktop and at 390 pixels with the replacement image loaded and no mobile overflow. Changes remain uncommitted for owner review, with unrelated work preserved. No deployment or full accessibility audit was performed.

### Footer copyright, 2026-09-13

The shared footer now reads “© 2026 Hangin Kite Center” beside the existing establishment year. The copyright year is computed in UTC during the static build and updates on subsequent builds; no client JavaScript or request-time rendering is added.

Copyright verification: `npm run verify` exited 0, including fresh export and all 56 tests (`/tmp/hangin-footer-copyright-verify.log`). Browser checks confirmed the footer text on desktop and at 320 pixels without overflow. All 14 exported HTML files include the copyright year. Only the shared footer text and this document changed; no deployment or full accessibility audit was performed.


### Central legal-information link, 2026-09-13

The shared footer now includes a small “Legal information” link beside copyright and establishment year. `/legal/` collects asset credits, source/license links, modification notes and confirmed contact details in a simple reading layout. Credits no longer appear as a homepage disclosure or image captions. This page is an attribution/contact record, not a complete Impressum or privacy policy. License sources and scope are recorded in [seo-accessibility-media.md](seo-accessibility-media.md#central-asset-credits-2026-09-13).

Verification: final `npm run verify` exited 0 with lint, typecheck, fresh export and all 57 tests passing (`/tmp/hangin-central-credits-verify.log`). Desktop and 390-pixel browser review covered the legal page and homepage footer. Mobile content had no horizontal overflow; the footer and license-file links have 48-pixel targets and visible keyboard focus. Enter on the footer link opened `/legal/`. The page copy was read end to end against the no-AI-slop rules. An initial visual pass caught unstyled breadcrumbs; the final page reuses existing breadcrumb styles. No motion or client boundary was added. Independent review found no actionable issues before that small breadcrumb correction.

Local HTTP checks returned 200 for the page, sitemap and all three license files, and 404 for an unknown path. Route, canonical, sitemap, structured-data and internal-file-link checks passed against fresh output. Production hosting behavior, a full screen-reader session and a separate accessibility scan were not checked; no compliance certification is claimed.

Scope: the new legal route/styles, shared footer link/styles, route registration and navigation filtering, sitemap, bundled font licenses, targeted export tests and current-state documentation. Base/HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` on `codex/kite-safari-page`; unrelated edits are preserved. Implementation was authorized by the owner and remains uncommitted for review. No push, merge, deployment or outgoing message was performed.


### Rental partner label placement, 2026-09-13

The rental page centers “Our gear partners” above the Duotone and ION logos at all viewport widths. A small optional `labelAbove` setting on ProofStrip selects this layout; the homepage retains its existing layout. No copy, logo dimensions, destinations or motion changed.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 57 tests passing (`/tmp/hangin-partner-label-verify.log`). Browser checks at 1242 and 390 pixels confirmed the label above the loaded logos, matching horizontal centers on desktop, no overflow and visible keyboard focus. No full accessibility audit was performed. Scope: ProofStrip, its stacked style, the rental page option and this record. Work remains uncommitted on `codex/kite-safari-page` for owner review; unrelated changes are preserved and no deployment was performed.


### Rental FAQ background, 2026-09-13

The rentals FAQ now uses the existing sand background with ocean text and dividers, separating it from the dark contact section below. Rental-specific dark-background and sand-heading overrides were removed. No copy, layout or disclosure behavior changed.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 57 tests passing (`/tmp/hangin-rental-faq-color-verify.log`). Browser review at 884 and 390 pixels confirmed the colors, readable expanded answer, visible keyboard focus, working Enter activation and no horizontal overflow. The colors reuse the established ocean/sand pair. No full accessibility audit was performed. Scope is the rental FAQ rules in `components/service-page.module.css` and this record; work remains uncommitted for owner review, with unrelated edits preserved and no deployment.


### Rental card enquiry links, 2026-09-13

Each rental/storage card now ends with an underlined WhatsApp icon link. The rental and storage cards read “Book rental via WhatsApp” and “Book storage via WhatsApp”; the supporting cards offer setup planning and availability checks. These start enquiries through the existing primary contact adapter and do not confirm bookings or inventory. Optional typed section contact records keep this behavior confined to the four selected cards. Existing page-level actions continue covering rental and storage together.

Verification: final `npm run verify` exited 0 with lint, typecheck, fresh export and all 57 tests passing (`/tmp/hangin-rental-card-links-verify.log`). Initial tests assumed every rental-page message contained both service intents; they were updated to preserve that requirement for page-level CTAs and assert each card's exact label, phone number, message and external-link attributes separately. The global contact test now explicitly allows rental/storage-specific messages only on this route. Desktop and 390-pixel browser checks confirmed 48-pixel links, visible focus, readable labels and no mobile overflow. The destination URLs were inspected without sending messages. Public labels were checked with the no-AI-slop guidance; no motion or new business claims were added. No full accessibility audit was performed.

Scope: typed rental card contact records, shared optional contact-link rendering/styles, the two contact contract tests and this record. Work remains uncommitted on `codex/kite-safari-page` for owner review, with unrelated changes preserved. No deployment or outgoing message was performed.


### Lesson conditions banner, 2026-09-13

The final Lessons note, “Sessions follow the conditions”, is now a compact sand banner with a blue left border, a 22-pixel heading and 14-pixel body text. The heading and copy sit side by side above 860 pixels and stack on smaller screens. Bottom spacing before the FAQ is reduced. The existing wording and heading semantics are unchanged.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 57 tests passing (`/tmp/hangin-lesson-banner-verify.log`). An initial build failed during `.next/server` cleanup with `ENOTEMPTY`; no Next.js process remained, and a retry passed without source or configuration workarounds. Browser review at 1242 and 390 pixels confirmed a roughly 77-pixel desktop banner, readable mobile wrapping and no overflow. Colors use the existing ocean/sand contrast pair; this static note adds no controls or motion. No full accessibility audit was performed. Scope is the lesson-only banner/spacing CSS and this record. Changes remain uncommitted on `codex/kite-safari-page` for owner review, with unrelated edits preserved and no deployment.


### About teaching logos and team section, 2026-09-13

“How we teach” now includes linked IKO and VDWS marks in a compact ocean strip. Official locally stored SVGs preserve artwork proportions, with white display on the dark panel. Owner permission and sources are recorded in [the teaching-logo ledger](../../public/brand/teaching/ATTRIBUTION.md); public credits remain on `/legal/`. An optional section-extra slot places the strip inside the existing teaching text area without adding logos to other service pages.

A “Meet the team” section follows the About details. It contains the three placeholders explicitly requested by the owner, using decorative Hangin marks and “Profile coming soon” text. The layout has three columns from 700 pixels and one column below that. Names, roles, portraits and biographies remain unconfirmed; no person data or invented staff claims were added.

Verification: final `npm run verify` exited 0 with lint, typecheck, fresh export and all 57 tests passing (`/tmp/hangin-about-team-logos-verify.log`). An initial raster-logo check failed; replacing the VDWS PNG with its official scalable SVG resolved it without a test exemption. Desktop and 390-pixel browser checks confirmed loaded logos, visible keyboard focus, all three placeholders, responsive columns and no overflow. A visual pass reduced duplicate spacing before the team heading. The legal credit was checked in the browser, and public labels were reviewed with no-AI-slop guidance. No motion was introduced. Independent review found no actionable issues in the initial layout/permission implementation. No full screen-reader or accessibility audit was performed.

Scope: About content/layout, teaching organization records, the optional ServicePage section slot, local logo assets/ledger, legal credit and current-state documentation. Installed Next.js 16.3.3 image guidance and official IKO/VDWS sources were read on 2026-09-13. Work remains uncommitted for owner review on `codex/kite-safari-page`, preserving unrelated changes. No deployment or outgoing message was performed.


### Lesson header and course contact buttons, 2026-09-13

The owner requested the existing lesson photograph behind the hero text, removal of the comparison introduction, and a booking CTA on each course card. The Lessons hero now layers light text over the existing owner photograph with a dark ocean overlay on desktop and mobile. The comparison keeps its heading and approved price records; the sentence beginning “Find the course that fits your starting point” is removed. All six priced course cards include “Book via WhatsApp”, using the same course, dates and riding-level message as the overview through `LessonEnquiry`. The conditions note remains a text banner.

Implementation is authorized and remains uncommitted on `codex/lesson-header-and-booking`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, with prior workspace edits preserved. Incremental files are `components/lesson-enquiry.tsx`, `components/lesson-overview.tsx`, `components/lesson-overview.module.css`, `components/service-page.tsx`, `components/service-page.module.css` and this document. The installed Next.js image guide at `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` was read on 2026-09-13; no dependency, image source, public fact, metadata or deployment configuration changed.

Verification: final `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 57 tests passing; log `/tmp/hangin-lesson-verify.log`. An intermediate build exited 1 on `ENOTEMPTY` while cleaning `.next/build`; inspection found only `.DS_Store`, and retrying the unchanged command passed. Browser review covered desktop, 833, 390 and 320 pixels, including loaded photographs, no horizontal overflow, the removed introduction, all six course-specific destinations, 50-pixel card controls, and visible keyboard focus after a course jump. Existing reduced-motion rules cover the reused button. The no-AI-slop review preserved existing course copy and checked the new labels. Independent review prompted accessible names that preserve the visible card label. No production deployment, production HTTP checks, screen-reader session or full accessibility audit was performed; the change concerns local presentation and existing contact links.

### Safari trip cards, 2026-09-13

The owner replaced the safari planning strip and three general text sections with a single-column list of horizontal cards: Batbatan, Colon and Others. Each sand card has a blue left edge, a large trip name, “Details coming soon.” and two actions: Request (WhatsApp, with the selected name) and More (its own detail page). Buttons align on the right on wider screens and stack beneath the name on phones, with heading-first DOM order and 48-pixel targets. Existing palette, typography, hero, FAQ and supporting links are reused. No destination imagery is implied by the cards. The removed general sections and their old image are no longer rendered.

The three detail pages intentionally contain only the trip name, “Coming soon…”, breadcrumbs and a back link within the standard site shell. No new trip facts or dependencies were added. The owner explicitly authorized these holding pages.

Trip-card verification: `npm run verify` exited 0 with lint, typecheck, a fresh Turbopack static export and all 59 tests passing (`/tmp/hangin-trip-cards-verify.log`). The two new trip tests failed against the previous output before implementation, then passed with the new export. They cover the three cards, exact per-trip request message and external-link attributes, each More destination, holding copy, canonicals, noindex and breadcrumb parity. Existing tests still cover all public content, contacts and images; sitemap assertions now distinguish unfinished routes from indexable routes. `git diff --check` exited 0.

Browser review covered the listing at 1280, 390 and 320 pixels, and all three child pages. Cards are horizontal on desktop and stack on phones, with no overflow and 50-pixel action heights. Keyboard activation of each More link opened the matching page; back links returned to the listing and focus styling remained visible. Contact destinations were inspected without sending messages. The wording, metadata and labels were read against the existing no-AI-slop guidance. Existing contrast and reduced-motion rules are retained. Independent incremental review found no actionable issues.

Local HTTP checks returned 200 for the listing and all three child routes, and 404 for an unknown safari slug, on both the static preview (4175) and dev server (3000). Production deployment, host headers/normalization and a full assistive-technology audit were not performed because this is a local implementation. No deployment, messages, push or merge occurred.

Scope: the safari listing and stylesheet, new trip records and static `[slug]` page, removal of old safari section records, the shared empty-section guard, central route/contact lists, header/footer route filtering, sitemap, export-helper/SEO/contact tests, new trip tests and current product/architecture/design/SEO documents. The installed Next.js 16.3.3 static-params, page and metadata guides and current repository facts were read on 2026-09-13. Base/HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. At completion the workspace is on `codex/boracay-image-submenu`; concurrent unrelated edits and the current branch are preserved. These changes remain uncommitted for owner review.


### Events coming-soon page, 2026-09-13

The owner requested `/events/` with a coming-soon message. The static page shows “Events”, “Coming soon” and “Back to home”, with the existing breadcrumbs, dark-blue and sand palette, typography and shared contact links. Events appears in desktop, mobile and footer navigation. No event dates, offers or event structured data are published. It has a self-canonical, unique metadata and breadcrumb JSON-LD; `noindex, follow` and sitemap exclusion match the existing unfinished-page convention.

Work remains uncommitted for owner review on `codex/events-coming-soon`, base/HEAD `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`, preserving previous workspace edits. Incremental files: `app/events/page.tsx`, `app/events/events.module.css`, `content/site.ts`, `components/site-header.tsx`, `tests/export-helpers.mjs`, `tests/routes-and-seo.test.mjs`, and the current architecture, product, SEO and design documents. No dependency was added. Installed Next.js 16.3.3 guides for layouts/pages, metadata and static exports were consulted on 2026-09-13.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh production export and all 59 tests passing; log `/tmp/hangin-events-verify.log`. The first attempt stopped because another build held the lock; after that build finished, the unchanged command passed. Browser checks at 320, 390, 781, 833, 960 and 1440 pixels found no horizontal overflow; the page action is 50 pixels high. Mobile menu keyboard operation, visible focus and Events navigation were checked. The page was read end to end, with no-AI-slop review of its copy; it adds no motion or photography and reuses the tested contrast colors. Independent incremental review found no actionable issues. Local static HTTP returned 200 for `/events/`; exported metadata, sitemap and 404 checks passed. Production HTTP checks were not run because no deployment was requested. A screen-reader session and full accessibility audit were not performed.


### About story, hero and contact update, 2026-09-13

The latest owner browser comments replace the split About introduction with the photo-led service-hero treatment: stacked copy and WhatsApp over the owner photograph on desktop, with a dark copy panel above the complete group photo below 860 pixels. The desktop image uses a cover crop. The new history copy describes teaching at the rider's pace, respect for the shared beach and lagoon, practical trip help, and the already confirmed Official Duotone Kite Center designation and Duotone/ION gear partnerships. It adds no stock, availability or credential claims.

The services section includes a 48-pixel WhatsApp link through the existing contact adapter. The final section uses “Contact”, “Tell us about your stay.” and the owner's invitation to discuss any needs or requests. Its “Let's make it unforgettable” wording expresses the requested welcome; accommodation of requests is framed as best effort. A typed optional contact eyebrow preserves the existing label on other service pages. About headings now remain before their copy in both visual and DOM order.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh Turbopack export and all 59 tests passing. Browser review covered the hero, story, service link and final contact block; responsive checks at 320, 390, 860, 1280 and 1440 pixels found no horizontal overflow. The photo loaded, mobile preserved the full group, and the new CTA retained a 48-pixel target and visible keyboard focus. The rendered copy was read end to end and checked with no-ai-slop; existing contrast tests passed and no motion was added. Independent incremental review found no actionable issues. `git diff --check` passed. No full accessibility audit, screen-reader session, production HTTP check or deployment was performed.

Scope: `content/island-pages.ts`, the optional contact eyebrow in `content/water-pages.ts`, `components/service-page.tsx`, About-scoped rules in `components/service-page.module.css`, and this document. Sources were the current product facts, typed identity and gear-partner records, the owner's six browser comments and installed Next.js 16.3.3 image documentation. Base and HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Work started on `codex/about-story-and-hero` and remains uncommitted in the shared workspace for owner review; concurrent unrelated changes were preserved. No external messages were sent.

### About left alignment, 2026-09-13

The owner requested left alignment for the hero introduction, WhatsApp button and teaching logos. The current hero already places its paragraph and button beneath the left-aligned heading; browser review confirmed that arrangement. The IKO/VDWS strip now sits beneath “How we teach” in the heading column. The optional ServicePage slot is named `sectionHeadingExtras` and groups heading and logos before the body in DOM order, so phones display heading, logos, then text. Other sections retain their existing markup. No public copy, logo asset or contact destination changed.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 59 tests passing (`/tmp/hangin-about-left-verify.log`). Desktop and 390-pixel browser review confirmed left alignment, loaded logos and no horizontal overflow. Both mobile logo links are 56 pixels high; keyboard navigation reaches VDWS after IKO with a visible 3-pixel focus outline. Existing contrast and reduced-motion rules remain in use. Independent incremental review found no actionable issues. No full accessibility audit, screen-reader session or production deployment was performed.

Incremental scope is `app/about/page.tsx`, `components/service-page.tsx` and this record. Work remains uncommitted for owner review in the shared workspace, preserving concurrent changes; base/HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. No external messages were sent.


### Persistent Boracay navigation, 2026-09-13

The owner's follow-up clarifies that the hero and submenu must remain while the content below changes with the URL. A native Next.js nested layout now contains the shared hero, one H1 and main landmark, and the submenu. Spot guide and Things to do retain their existing URLs and full static bodies; their JSON-LD stays with each page, while the latest breadcrumb update places the matching visible trail above the shared hero. Things to do has an H2 introduction beneath the shared H1. No routes, service copies, metadata or indexing policies were added. Safari remains a normal link to `/kite-safaris/`; Lessons and Rentals were removed from this submenu.

The small navigation client component uses `useSelectedLayoutSegment` for the active link and native Next links with `scroll={false}` between the two Boracay pages. The shared layout preserves the hero and navigation during client transitions. The direct static exports include the correct active item, content and contact links without requiring JavaScript. The service renderer's optional `embedded` mode omits its hero and uses a div within the layout's main element; its existing standalone output remains the default.

Verification: the new export test first failed on the previous five-item menu. Initial verification found stale generated production route types after the new layout was added; the documented `npx next typegen` command refreshed them without a source workaround. Final `npm run verify` exited 0 with lint, typecheck, fresh Turbopack export and all 60 tests passing. Keyboard switching preserved the exact hero markup, scroll position (495 pixels) and menu position (328 pixels), while changing the URL, lower content, focus and active state. Back, Forward and direct reload restored the correct active item. Browser review covered desktop, 390 and 320 pixels, with 48-pixel links and no overflow. Safari navigation reached its standalone page. Existing contrast checks passed; no motion was added, and unchanged public copy was reviewed with no-ai-slop. Independent incremental review found no actionable issues. `git diff --check` passed. Production HTTP behavior and a full screen-reader/accessibility audit were not checked; no deployment was requested or performed.

Scope: the new Boracay layout and navigation component, both existing Boracay pages, their local stylesheet, the shared service renderer, Boracay export tests, and architecture/design documentation. Sources: the user's browser comment and clarification, and installed Next.js 16.3.3 layout, Link, selected-layout-segment and typegen guides. Base and HEAD are `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Changes remain uncommitted for owner review in the existing isolated branch/shared workspace, preserving concurrent work. No new dependencies or external actions were introduced.


Boracay active-link refinement, 2026-09-13: the owner requested bold text and an underline instead of a filled square. The submenu now uses weight 800 and a bottom border for the current link, weight 500 for other links, and transparent link backgrounds. Existing keyboard focus and 48-pixel targets remain. Desktop visual review and a 390-pixel overflow check passed; `npm run verify` and `git diff --check` exited 0 with all 60 tests passing. Scope is the local Boracay stylesheet and this document; changes remain uncommitted for owner review, with no deployment.


Boracay menu scroll fix, 2026-09-13: reproduced a jump to scrollY 888 after clicking Boracay from About. The desktop header now disables automatic Next.js page scrolling only for that destination, following the installed Link guide. Browser retests from About, from Things to do and on a repeated Boracay click all stayed at scrollY 0. `npm run verify` passed lint, typecheck, fresh export and all 60 tests; `git diff --check` passed. Scope is `components/site-header.tsx` and current-state documentation. Changes remain uncommitted for owner review, with no deployment or production HTTP checks.


Boracay top breadcrumbs, 2026-09-13: the owner requested removal of the trail below the submenu and inclusion in the top breadcrumb. The shared layout now renders one breadcrumb above the hero, with route-aware labels passed from the existing content records. Spot guide shows Home / Kitesurfing on Boracay; Things to do shows Home / Boracay / Things to do in Boracay. Child pages retain their matching breadcrumb JSON-LD but no duplicate visible trail. The parent link disables automatic scroll to the child body. Other breadcrumb links keep their existing default behavior.

Verification: the added placement assertion failed before implementation; `npm run verify` then passed lint, typecheck, fresh export and all 60 tests, including one breadcrumb before the H1 on both pages and matching child JSON-LD. Browser review confirmed desktop placement, updates when switching subpages, scrollY 0 on parent-link navigation, removal from the lower content and no overflow at 390 pixels. Existing labels, focus styling and contrast are preserved. `git diff --check` passed. Scope: Boracay layout/navigation and Things page, shared breadcrumb and embedded service rendering, export tests, and current architecture/design docs. Work remains uncommitted for owner review; no deployment or full accessibility audit was performed.


Boracay safari-link indicator, 2026-09-13: added a small decorative ↗ after “Kite safaris” to distinguish the separate safari page from the two shared-layout subpages. The link still opens `/kite-safaris/` in the same tab; its accessible name remains “Kite safaris”. Browser checks confirmed the arrow, destination and no overflow at 390 pixels. `npm run verify` passed all checks and 60 tests; `git diff --check` passed. Scope is the Boracay navigation, its local spacing style and this document. Work remains uncommitted for owner review, with no deployment.


Boracay section navigation, 2026-09-13: Places to be, Things to do, Planning your days and Practical questions now form a secondary row inside the top submenu on the Things to do page. The separate bar below the introduction and its unused styles were removed. The row retains native section anchors and 48-pixel targets, wraps on phones, and is absent on the spot guide. Existing page selection styling and Safari behavior are preserved.

Verification: the updated export expectation failed before implementation, then `npm run verify` passed lint, typecheck, fresh export and all 60 tests. Desktop review confirmed the two rows in one menu; a 390-pixel check found no overflow and all seven targets were 48 pixels high. The Planning link reached `#planning` with the section at its 96-pixel scroll offset, and returning to Spot guide removed the section row. `git diff --check` passed. Scope: Boracay navigation and local stylesheet, Things page, obsolete guide-menu CSS, export tests and this record. Existing public labels were retained. Work remains uncommitted for owner review; no deployment or full accessibility audit was performed.


Boracay flat navigation, 2026-09-13: the owner clarified that all entries belong at the same level. This supersedes the secondary-row arrangement above. One list now contains Spot guide, Places to be, Things to do, Planning your days, Practical questions and Kite safaris on both Boracay pages. The four guide entries link to the existing static sections, including from the spot guide, with no duplicate Things to do entry. The current section follows the URL fragment and browser history, using the same bold underline as the current page; Safari retains its separate-page arrow. The existing section content, routes and top breadcrumb remain.

Verification: the revised export assertion failed before implementation. `npm run verify` then passed lint, typecheck, fresh export and all 60 tests (log `/tmp/hangin-flat-boracay-verify.log`). Desktop review confirmed one row. At 390 pixels the single list wraps without overflow and all six targets remain 48 pixels high. Cross-page Places navigation reached its section at the 96-pixel offset; Planning selection and browser Back updated the underline correctly. Keyboard focus remained visible. Existing labels were retained and reviewed with the previously read no-ai-slop guidance. No new motion, dependencies or public facts were introduced. Scope is Boracay navigation, its stylesheet, export assertions and this record. Work remains uncommitted for owner review; no deployment or full accessibility audit was performed.


Boracay hero quick link, 2026-09-13: the shared Boracay hero now includes an underlined “Kite size guide” link to `/kite-size-guide/`, beside WhatsApp on desktop and below it on phones. PageHero accepts an optional typed quick link; other heroes retain their existing contact markup. The link uses the existing label, a decorative right arrow and a 48-pixel target.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh export and all 60 tests (log `/tmp/hangin-hero-kite-link-verify.log`). Browser review covered the desktop spot guide and mobile Things to do hero at 390 pixels, with no overflow. Keyboard activation reached the Boracay kite size guide. Existing labels, focus, colors and motion behavior are preserved. `git diff --check` passed. Scope: Boracay layout, PageHero, its action/link styles and this record. Work remains uncommitted for owner review; no deployment or full accessibility audit was performed.


### Boracay menu pages, 2026-09-13

The owner clarified that every submenu item should open its own page. This supersedes the flat section-anchor implementation above. Spot guide stays at `/kitesurfing-boracay/`; Places to be, Things to do, Planning your days and Practical questions each have a child route with only their relevant content. The hero, quick link and one-level menu stay in place during transitions. Current-page text is bold and underlined, and the top breadcrumb follows the selected page. Safari retains its arrow and standalone destination. Existing paragraphs, sources, questions, contact links and responsive editorial styling were reused; page descriptions and a short questions introduction were adjusted to their topic with no new business claims.

Verification: revised export checks failed against the previous output, then `npm run verify` exited 0 with lint, typecheck, a fresh static export and all 59 tests (log `/tmp/hangin-boracay-pages-verify.log`). The four prior Boracay tests were consolidated into three tests covering all five Boracay routes, exact menu destinations, one active page, isolated content, visible/structured breadcrumb parity and teaser destinations. Existing global tests cover unique metadata, canonicals, internal links, sitemap parity, contact routes and static output.

Desktop navigation preserved the hero markup and scroll position while changing content and breadcrumbs. All four pages were rendered and their text reviewed. At 390 pixels the menu retained six 48-pixel targets with no overflow; FAQ keyboard activation, visible focus, direct reload, browser Back and the standalone Safari transition worked. Independent incremental review found no concrete issues. Local dev (3000) and static preview (4175) returned 200 for all four child pages and 404 for an unknown child. Existing contrast and reduced-motion behavior remain unchanged. No full accessibility audit, screen-reader session or production deployment was performed.

Scope: four route files, shared Boracay layout/navigation and subpage renderer, typed guide records, spot-page teaser links, public routes and labels, sitemap, export tests and current project documentation. Installed Next.js 16.3.3 layout/page, Link and metadata guides were consulted. Changes remain uncommitted for owner review in the shared workspace, preserving unrelated work; base/HEAD remain `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. No external messages, dependencies, push or deployment were introduced.


Boracay submenu icons, 2026-09-13: added 18-pixel outline icons beside all six menu labels: compass, map pin, sailboat, calendar, help and route. The active underline and separate Safari arrow remain. These are local SVG paths from [Tabler Icons](https://github.com/tabler/tabler-icons/tree/55f87a73f45cf1d9eaf16d7da705065483a9e4f9/icons/outline), accessed 2026-09-13, following the existing inline Tabler icon pattern and its already published MIT license. No dependency or runtime request was added. The icons inherit text color and are hidden from assistive technology; labels remain the accessible names. Mobile column gaps are reduced to accommodate the icons.

Verification: `npm run verify` passed lint, typecheck, fresh export and all 59 tests (log `/tmp/hangin-submenu-icons-verify.log`). Desktop and 390-pixel screenshots were reviewed; checks at 390 and 320 pixels found no horizontal overflow. All six links retained 48-pixel targets, and keyboard navigation to Practical questions updated the active state. `git diff --check` passed. Scope: Boracay navigation, local menu-icon component, local menu spacing and this record. Public wording and routes are unchanged. Work remains uncommitted for owner review; no deployment or full accessibility audit was performed.

## Branch integration, 2026-09-13

The review branch's September 4 homepage sequence, generic image captions and old footer credit disclosure are superseded by the owner-approved changes recorded above. Their dated verification paragraphs remain historical evidence, including references to then-uncommitted work. The current Git state and new verification belong to the [branch integration report](../operations/2026-09-13-branch-integration.md).

The integrated additions provide inquiry/complaint guidance on `/terms/`, website access and reporting guidance on `/accessibility/`, clearer WhatsApp draft/new-tab information and first-contact guidance before sharing sensitive information. Water-service records include the earlier activity-risk and guardian-contact guidance alongside the later approved lesson pricing. These additions use the current shared styles and contact path. `/legal/` retains centralized asset credits. Generated illustrations remain identified as illustrations; owner-photo caption removal and current photograph choices are preserved.


### GEO answer improvements, 2026-09-13

The homepage now states the school, location and rider levels directly. Its season answer includes the owner-confirmed Habagat operation. Lessons adds practical cost, teaching-hour and Habagat questions; prices and hours come from the existing typed course records, and the overview repeats the approved beginner-course inclusions. Contact repeats the seasonal meeting-point check and links to the Boracay spot guide. Native FAQ disclosures, the approved hero, existing styling and direct WhatsApp links are preserved. See the [GEO implementation record](../operations/2026-09-13-geo-discovery.md) for verification and external launch gates.

## Homepage and footer copy removal, 2026-09-13

The following verification paragraphs are historical task snapshots. The owner subsequently authorized committing, merging and pushing these changes; see the [UI integration record](../operations/2026-09-13-website-layout-audit.md#integration-and-owner-approval-2026-09-13) for the combined verification.

Safari safety background, 2026-09-13: the owner requested a different background for “Before a kite safari.” The safari-only safety section now uses the existing ocean background and sun text, separating it from the lagoon section above and sand FAQ below. The change is scoped to `.safaris .safetySection`; text, layout and other service pages retain their existing treatment. Desktop and 390-pixel browser review confirmed the colors and no horizontal overflow. Computed foreground/background contrast is 12.77:1. `npm run verify` exited 0 with lint, typecheck, a fresh export, all 138 tests passing and no static privacy findings (log `/tmp/hangin-safari-safety-color-verify.log`). `git diff --check` passed. Work remains uncommitted with unrelated changes preserved; no deployment or full accessibility audit was performed.

Rental safety CTA, 2026-09-13: the owner requested a contact button in “Before renting gear” on `/rentals-storage/`. A compact coral “Ask Hangin on WhatsApp” button follows the guidance and opens the existing rental enquiry draft. The shared safety record supports an optional contact context, enabled only for this rental section. Existing button styling, new-tab accessible name and external-link attributes are reused. Desktop and 390-pixel screenshots confirmed spacing and visible keyboard focus; 390- and 320-pixel checks found no horizontal overflow and a 50-pixel button height. Copy review and independent scoped code review passed. Lint, typecheck and fresh production export passed; after updating the existing CTA test to distinguish this rental-only action from the general rental/storage actions, all 138 tests and the static privacy audit passed. Logs are `/tmp/hangin-rental-safety-cta-{verify,tests,privacy}.log`. The first build attempt overlapped another build and was retried after it finished. Base and HEAD remain `62169100da94eaeb42c0975842fa3b7db0ca6799`; work is uncommitted and unrelated changes are preserved. No deployment or full accessibility audit was performed.

The owner shortened the homepage H1 to “If the wind is up, we’re out.” and removed the shared footer’s WhatsApp draft-message guidance paragraph. Its wrapper, unused styles and all `aria-describedby="message-guidance"` references are removed. WhatsApp links retain their explicit new-tab accessible labels, normal destinations and safe external-link attributes. Contact and safety guidance on the dedicated pages is unchanged. Earlier records quoting the longer headline or global footer guidance describe previous versions.

Verification: `npm run verify` exited 0 with lint, typecheck, a fresh production export, all 138 tests passing and no static privacy-audit findings (log `/tmp/hangin-copy-removal-verify.log`). Desktop and 390-pixel mobile screenshots confirmed both removals; the mobile page had no horizontal overflow and no remaining reference to the removed paragraph. Independent scoped review and `git diff --check` passed. Base and HEAD are `62169100da94eaeb42c0975842fa3b7db0ca6799`; these edits remain uncommitted, with unrelated calculator work preserved. No deployment or full accessibility audit was performed.

## Optional forecast, 2026-09-13

The Boracay spot guide and kite-size guide now include “Windguru forecast for Bulabog,” with a direct provider link, load/hide button and privacy explanation. The full-width forecast uses the existing ocean, sand and sun palette. Windguru retains its own table and attribution inside the frame. Wind and gusts are in knots; the text distinguishes the GFS forecast from live readings and directs visitors to check conditions before choosing equipment. The calculator remains based on Hangin seasonal estimates. [ADR 0003](../decisions/0003-optional-windguru-forecast.md) documents the implementation.

## Browser feedback revision, 2026-09-13

The owner superseded the optional embed layouts above: Maps and Windguru load automatically, without control/disclosure bands. Forecast is linked from the Boracay submenu; its introductory paragraph is removed and its heading, provider link and scrolling note remain. The Boracay location block shows the confirmed Hangin name and address beside the pinned map; its repeated Habagat paragraph and extra Maps button are removed. The lesson chapter “First waterstarts or your next trick” spans the full viewport with lagoon blue behind ocean text and the existing photograph. Content order and lesson copy remain unchanged. [ADR 0004](../decisions/0004-automatic-maps-and-forecasts.md) records the new behavior.

## Location section moved to About, 2026-09-13

The owner’s next browser comment moves the full “Find Hangin” address and pinned map section from the Boracay guide to About. A subsequent owner comment places it directly below the page hero, before the school story. The Contact map remains. Google’s reviewed route allowlist is now `/about/` and `/contact/`; Boracay retains Windguru only. Styling, confirmed address, automatic loading and provider restrictions are unchanged. This supersedes the earlier placement descriptions above; ADR 0004’s loading policy still applies.

The Forecast submenu entry now includes the Tabler wind icon, matching the existing 18-pixel outlined icons. The SVG is decorative and hidden from assistive technology; the link retains its Forecast label and destination. Source: the existing pinned Tabler commit, `icons/outline/wind.svg`, checked 2026-09-13.


## Founding year correction, 2026-09-14

The owner corrected Hangin’s founding year to 2001. The homepage, About copy and metadata, shared footer and organization structured data now use 2001. Earlier dated records quoting 2002 are historical and superseded by this correction. Existing wording and presentation are otherwise preserved.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh static export, all 151 tests passing and no static privacy findings (`/tmp/hangin-since-2001-verify.log`). All 24 exported HTML files were checked for stale founding-year wording and correct organization `foundingDate`. Homepage and About were read in the browser and visually checked at desktop and 390-pixel widths; the About page had no horizontal overflow. Copy review followed no-ai-slop, and `git diff --check` passed. No styles, controls, routes or motion changed, so additional keyboard, reduced-motion and full accessibility checks were not repeated. Production HTTP checks were not run because this is a local correction with no deployment. Independent agent review could not run because the selected model was at capacity; a direct scoped diff review found no missed active references.

Scope: `app/page.tsx`, `content/site.ts`, `content/island-pages.ts`, `tests/routes-and-seo.test.mjs`, `docs/project/product.md` and this record. The owner’s 2026-09-14 message is the source for the correction. Base and HEAD remain `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f` on `codex/google-maps-embed`. Changes remain uncommitted for owner review with pre-existing changes preserved.

## GEO content review, 2026-09-13

The About contact section now asks for Boracay dates, riding level and the service needed, followed by the existing owner-confirmed one-day reply commitment. It replaces a generic invitation without changing the section design or contact destination. The practical Boracay Q&A includes its existing official tourism sources using the same Further reading treatment as the other guide topics. The [combined investigation](../operations/2026-09-13-multi-investigator-review.md) records scope and verification.
