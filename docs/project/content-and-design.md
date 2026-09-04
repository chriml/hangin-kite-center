# Current content and design system

Status: Current
Last verified: 2026-09-04

## Voice

Hangin sounds like an experienced beach team member answering a guest: relaxed, direct, useful, and specific. Copy leads with the visitor's answer and uses real Bulabog, Boracay, lesson, conditions, and equipment details. It does not add generic island marketing language to fill space.

The full durable writing rules and banned vocabulary live in [`../../AGENTS.md`](../../AGENTS.md). Public strings include visible copy, metadata, alternative text, labels, contact-message templates, and structured-data text. Every change to them requires the `no-ai-slop` workflow and a rendered read-through.

Strong existing lines should not be normalized into a repeated template. Examples include `Kitesurfing here since 2002.`, `Leave the board bag at home.`, and `If the wind is up, we're out there.`

## Content layout

- `content/site.ts` holds identity, contact destinations, route IDs, and prefilled messages.
- `content/water-pages.ts` holds lessons, rental and storage, and safari records.
- `content/island-pages.ts` holds accommodation, shop, Boracay, and about records.
- The homepage, contact page, header, footer, 404, and some metadata still contain inline copy.
- FAQ text and its structured representation share page records on the service templates.

The content schema is intentionally narrow. It favors real sections and questions over arbitrary rich text or editor-selected components.

## Visual identity

Working direction: Tropical Ride Culture.

| Token | Value | Main use |
| --- | --- | --- |
| Ocean | `#073642` | Dark fields, technical and action areas |
| Lagoon | `#1FB9C1` | Water and location accents |
| Sand | `#F2E5C4` | Warm reading fields |
| Sun | `#FFFDF6` | Light backgrounds |
| Palm | `#315F4B` | Center story and grounded accents |
| Coral | `#F06449` | Primary action and small signal details |
| Ink | `#102A30` | Main dark text |

Display type uses Barlow Condensed. Body and interface text use Manrope. Layout favors large image planes, flat color fields, one-pixel rules, readable left-aligned copy, square or lightly softened controls, and restrained kite-line curves.

The design avoids generic card grids, pills, glass effects, purple gradients, floating blobs, tropical-leaf wallpaper, generic feature icons, heavy shadows, carousels, autoplay, and decorative motion.

## Image roles

Proof and illustration are separate data types:

- Proof images may establish Boracay or a confirmed real subject. They retain natural color, honest alternative text, responsive variants, and visible creator/license attribution where required.
- Generated images provide atmosphere only. They use empty alternative text when decorative and cannot prove staff, rooms, facilities, equipment, stock, instruction, or trip routes.

Image paths and dimensions live in `content/images.ts`; legal and provenance detail is recorded in `public/images/ATTRIBUTION.md`.

## Implemented versus proposed design

The implemented site has the approved palette, fonts, responsive imagery, semantic shell, calm homepage sequence, native disclosure controls, visible focus, and reduced-motion handling.

The dated [`../superpowers/specs/2026-08-31-hangin-duotone-visual-refresh-design.md`](../superpowers/specs/2026-08-31-hangin-duotone-visual-refresh-design.md) is marked as awaiting review and is not fully implemented. Current code still has the earlier desktop navigation, boxed lesson paths, four alternating service bands, two hero kite lines, no service indices or rider-state labels, no separate shop utility row, and no compact spot-fact band. Treat these as proposed changes, not defects, until that specification is accepted or superseded.

Any future UI work must preserve the Hangin identity and use Duotone only as a structural reference. It must not copy branding, typefaces, product language, proprietary assets, or imply an affiliation.
