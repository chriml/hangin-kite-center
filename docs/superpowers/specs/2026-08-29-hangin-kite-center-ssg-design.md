# Hangin Kite Center SSG Redesign

Date: 2026-08-29  
Status: Approved in conversation

## Purpose

Rebuild the existing Next.js starter as a fast static website for Hangin Kite Center on Boracay. The homepage is a calm conversion funnel. Supporting pages give each service enough useful content to rank for its own search intent.

The site must feel like a real kite center on a tropical Asian island: bright water, wind, boards, sand, palm shade, beach life, and competent instructors. It must not look like a generic resort template or read like AI-generated marketing copy.

## Confirmed business information

- Business name: Hangin Kite Center
- Location: Bulabog Beach, Boracay, Philippines
- Established: 2002
- Instruction: IKO and VDWS
- Current services:
  - Kitesurfing lessons from beginner through advanced
  - Equipment rental
  - Equipment storage
  - Accommodation
  - Kite shop
  - Kite safaris
- Email: `hanginkitecenter@gmail.com`
- WhatsApp display number: `+63 938 010 1849`
- WhatsApp link number: `639380101849`
- Canonical website: `https://www.hanginkitecenter.com`

Prices, opening hours, instructor names, room specifications, availability, and exact course durations are not confirmed. They must not be invented.

## Audience and jobs

The main audience is international visitors planning a Boracay trip. The site also serves experienced riders who need gear, storage, local knowledge, or a kite trip.

Visitors should be able to answer these questions quickly:

1. Can I learn here as a complete beginner?
2. Is the spot suitable and safe for my level?
3. Can I rent or store equipment?
4. Can I stay close to the kite beach?
5. How do I contact the center now?

The primary conversion is a WhatsApp conversation. Email is the fallback. A later booking system will replace the destination behind the same calls to action.

## Voice

Write like an experienced member of the beach team answering a guest. The tone is easygoing, useful, and professional.

The project-level rules in `AGENTS.md` are the durable copy standard. Public copy must be edited and reviewed with the installed `no-ai-slop` skill. The review names observable patterns and fixes them; it does not rely on detector scores or guess who wrote the text.

Rules:

- Put facts before adjectives.
- Apply the portability test: if a line could describe any kite school or tropical island, cut it or replace it with a Hangin, Bulabog, service, or conditions detail.
- Keep one clear point per sentence.
- Use rider language only where it is natural and useful.
- Prefer concrete local details about the spot, conditions, gear, teaching, and island.
- Use short paragraphs and descriptive headings.
- Front-load the words people scan for.
- Do not keyword-stuff.
- Do not use empty superlatives, fake urgency, or travel-brochure language.
- Avoid the banned words and patterns in `AGENTS.md`, including `vibrant`, `seamless`, `showcase`, `enhance`, `pivotal`, `testament`, `delve`, empty importance claims, fake insight, dramatic fragments, and recap endings.
- Use no em dashes in short website copy.
- Avoid the construction `not just X, but Y`.
- Do not claim awards, rankings, ratings, guaranteed progress, or exclusivity without evidence.

Example homepage opening:

> Bulabog Beach, Boracay  
> **Kitesurfing here since 2002.**  
> Learn with IKO and VDWS instructors, rent a full setup, store your own gear, or stay close to the kite beach. If the wind is up, we're out there.

Primary button: `See the lessons`  
Secondary button: `Message us on WhatsApp`

The content approach follows Google's people-first guidance, Nielsen Norman Group's guidance on concise and scannable web writing, and Pew Research Center's findings on repetitive AI-style vocabulary.

## Visual direction

Working name: Tropical Ride Culture.

The visual direction uses Boracay as the setting, not as decorative copy. The site should move between the energy of kitesurfing and slower island moments.

### Palette

- Deep ocean ink: `#073642`
- Lagoon turquoise: `#1FB9C1`
- Warm sand: `#F2E5C4`
- Sun white: `#FFFDF6`
- Palm green: `#315F4B`
- Coral signal: `#F06449`
- Dark text: `#102A30`

Turquoise and coral are accents. Large reading areas use sand, white, or deep ocean ink.

### Typography

- Display: Barlow Condensed, bold weights, used for short headlines and numbers
- Body and UI: Manrope, regular through semibold

Headlines can be large and tight but must stay readable on a 13-inch laptop and on mobile. Body copy uses comfortable line lengths and avoids centered paragraphs.

### Composition

- Large landscape photography with visible water, sky, and movement
- Occasional full-bleed sections, not a stack of rounded cards
- Thin curved lines inspired by kite lines and wind paths
- Slight asymmetry and overlapping labels where they do not harm reading
- Small practical details such as wind direction, spot labels, and service markers
- Restrained shadows and radii
- No tropical leaf wallpaper, fake paper scraps, glassmorphism, purple gradients, or generic SaaS layouts

### Motion

Use light CSS motion only: image reveals, line movement, and subtle hover feedback. The site remains fully usable with motion disabled and respects `prefers-reduced-motion`.

## Image policy

Images have two roles and must not be mixed up.

### Proof images

Use authentic images for Boracay, Bulabog Beach, the kite spot, and confirmed Hangin services. Accept an image only when it comes from one of these source classes and its reuse rights can be recorded:

- Hangin-owned images recoverable from the existing or archived website
- Open-license image libraries
- Images whose reuse terms explicitly permit website use

Every downloaded proof image must have its source URL, creator, license, and retrieval date recorded in `public/images/ATTRIBUTION.md`. Images without clear reuse rights are excluded.

### Generated placeholders

Use AI-generated images to fill the remaining visual gaps in this initial version. They can show general tropical water, kite silhouettes, gear details, or abstract island atmosphere. They must not be presented as documentary proof of Hangin's actual staff, rooms, shop, equipment stock, or facilities.

Generated files use descriptive names and are listed as generated placeholders in the attribution file. Components keep image paths centralized so the placeholders can be replaced without layout changes.

All final images are stored locally, sized for their rendered use, converted to an efficient web format, and given useful alt text when informative. Decorative images use empty alt text.

## Information architecture

All public routes are statically generated.

| Route | Primary intent |
| --- | --- |
| `/` | Kitesurfing and kite school in Boracay |
| `/kitesurfing-lessons` | Beginner, progression, and advanced lessons |
| `/rentals-storage` | Kite equipment rental and storage |
| `/kite-safaris` | Guided kite trips and safaris |
| `/accommodation` | Stay near the kite beach |
| `/shop` | Kite equipment and beach essentials |
| `/kitesurfing-boracay` | Spot, season, conditions, and island guidance |
| `/about` | History, certification, and teaching approach |
| `/contact` | WhatsApp, email, location, and practical contact details |

No empty booking page is published. No blog is added until there is a real publishing plan.

## Homepage funnel

### 1. Header

A small wordmark, short navigation, and one `WhatsApp us` action. Mobile navigation remains simple and keyboard accessible.

### 2. Hero

State the location, history, and core offer immediately. Use one authentic Boracay or Hangin image. Show the lesson and WhatsApp actions without a modal, popup, or autoplay video.

### 3. Quick proof

Show factual trust points: established in 2002, IKO and VDWS instruction, Bulabog Beach, and services on site. Do not add star ratings or review counts in this version.

### 4. Lessons and equipment rental

Offer clear paths for first lessons, board starts, progression sessions, and full equipment rental. Each path links to the relevant static page or section.

### 5. Kitesurfing in Boracay

Explain the lagoon, water, wind, season, and suitability in practical language. Link to the full Boracay guide.

### 6. Services around the session

Give storage, shop, accommodation, and safaris real space. Avoid reducing them to a row of generic feature cards.

### 7. Hangin since 2002

Explain the center's history and teaching approach. Use an authentic image if one is available.

### 8. Practical questions

Answer visible questions about ability level, what to bring, safety, equipment, wind, and how to arrange a session. Answers must not include unconfirmed prices or policies.

### 9. Final contact

Use the line `Tell us when you're coming.` Provide WhatsApp and email. There is no countdown, scarcity message, or repeated sales pitch.

### 10. Footer

Include service links, Boracay location, contact details, canonical business name, and essential legal links if analytics or data collection is added.

## Static architecture

- Framework: the repository's installed Next.js 16.3.3 App Router
- Rendering: explicit static export
- Components: server components by default
- Client JavaScript: limited to interactions that cannot be handled with HTML and CSS
- Content: typed local data, with no runtime CMS or database
- Assets: local files under `public/`
- Forms: none in this phase

The implementation must read the matching documentation under `node_modules/next/dist/docs/` before changing Next.js configuration, metadata, images, or route files.

## Component boundaries

- `SiteHeader`: navigation and contact action
- `SiteFooter`: internal links and business information
- `Hero`: page-specific heading, summary, actions, and image
- `ProofStrip`: factual trust points
- `ServicePath`: reusable service entry without nested card layouts
- `SpotGuide`: Boracay conditions summary
- `ContactCta`: the single booking/contact interface
- `Breadcrumbs`: visible navigation plus structured data input
- `JsonLd`: safe JSON-LD serialization
- `siteConfig`: canonical business, navigation, contact, and social data
- `services`: typed content and route definitions
- `images`: centralized image records and attribution references

Components have narrow responsibilities. Page copy remains close to its route or in a typed content module rather than being hidden inside generic presentation components.

## Contact and future booking boundary

The current `ContactCta` reads one typed configuration:

- Primary channel: WhatsApp
- WhatsApp URL: `https://wa.me/639380101849`
- Fallback: `mailto:hanginkitecenter@gmail.com`

The CTA component accepts a small context value such as `lessons`, `rental`, `storage`, `safari`, `stay`, or `shop`. It adds a short, readable prefilled WhatsApp message. It does not collect personal information on the site.

When the booking system arrives, the configuration can switch the primary destination to `/book` or an external provider. The visual components, internal routes, and content pages do not change.

## SEO setup

### Crawl and indexing

- Emit a static `robots.txt` that allows public routes and references the sitemap.
- Emit a static sitemap containing every indexable route.
- Use one canonical hostname and canonical URL per page.
- Return a useful static 404 page.
- Do not publish thin placeholder routes.

### Page metadata

Every route gets:

- A unique title based on the page's real search intent
- A unique description written for people
- Canonical URL
- Open Graph title, description, URL, image, and site name
- Twitter card metadata
- `index, follow` robots directives on every listed public route

Metadata does not depend on the obsolete `keywords` meta tag.

### Structured data

Use JSON-LD only for visible, confirmed information:

- `WebSite`
- `Organization`
- `SportsActivityLocation`
- `Service` for confirmed services
- `BreadcrumbList` on supporting pages
- `FAQPage` only for questions and answers visible on the same page

Do not add fabricated `Review`, `AggregateRating`, `Offer`, prices, opening hours, or availability.

### On-page content

- One descriptive H1 per route
- Logical H2 and H3 hierarchy
- Descriptive internal-link labels
- Visible breadcrumbs on supporting pages
- Useful image alt text
- Natural use of Boracay, Bulabog Beach, kitesurfing, lessons, rental, storage, accommodation, shop, and safaris
- No duplicate page introductions or templated keyword paragraphs

### Performance and accessibility

- Optimize and size images to avoid layout shift
- Self-host or framework-host the two selected fonts
- Keep critical content server-rendered in the exported HTML
- Use semantic landmarks and native controls
- Maintain visible focus styles, usable contrast, and touch targets
- Support keyboard navigation and reduced motion
- Avoid autoplay media and unnecessary third-party scripts

## Error handling and edge cases

- If WhatsApp is unavailable, the email link remains visible.
- WhatsApp opens in a new tab with safe `noopener noreferrer` attributes. Email uses the visitor's configured mail client. Other navigation stays in the same tab.
- Missing optional images fall back to intentional color and type compositions, not broken-image boxes.
- Unknown prices, schedules, availability, weather, and policies are answered with `Message us for current details` rather than guessed values.
- The canonical domain currently fails DNS resolution from the development environment. DNS and redirect behavior must be checked before launch, but this does not block the static build.

## Verification

Implementation is complete only when all of the following pass:

1. Lint and type checks
2. Production static build
3. Inspection of exported HTML for titles, descriptions, canonicals, headings, internal links, and JSON-LD
4. Validation that every sitemap URL maps to an exported page
5. Responsive browser checks at phone, tablet, and laptop widths
6. Keyboard-navigation and reduced-motion checks
7. Broken-link and missing-asset checks
8. Structured-data validation for syntax and content parity
9. Full-page review of visible copy, metadata, alt text, labels, and structured data against `no-ai-slop/eval.md`, including the portability check and a manual scan for repeated section rhythms
10. Review of every proof image's reuse terms and attribution record

## Out of scope

- Live availability or payment
- A booking database or provider integration
- User accounts
- A CMS
- A blog
- Multilingual content
- Live weather or wind widgets
- Fabricated testimonials, ratings, prices, or availability
