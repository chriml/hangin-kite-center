# Future brief: visual design and UX

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Strengthen the existing Hangin identity and make the most important visitor journeys easier to scan, understand, and use across mobile, desktop, keyboard, zoom, and assistive technology. The result should feel like Bulabog Beach and an experienced kite center, not a generic resort, manufacturer clone, travel blog, or storefront template.

## Current boundary

The implemented site already has a distinctive ocean, lagoon, sand, palm, coral, and ink palette; Barlow Condensed and Manrope; local responsive imagery; semantic server-rendered pages; native menu and FAQ disclosures; visible focus; and reduced-motion handling.

The 2026-08-31 Hangin/Duotone visual-refresh document is still awaiting review and is not fully implemented. Current code retains the earlier desktop navigation, header geometry, boxed lesson paths, four alternating service bands including Shop, two hero kite lines, and no service indices, rider-state labels, compact spot-fact band, dominant 2002 story moment, or compact three-part final contact prompt described by that proposal. Tests also assert parts of the older contract.

These differences are not implementation defects until the owner accepts, revises, or supersedes that design.

## Design principles

- Hangin supplies the voice, color, photography, proof, location, and hierarchy. A reference brand may inform rhythm or restraint but never its logos, typefaces, copy, product assets, or implied affiliation.
- Put the visitor’s answer first: level fit, service scope, Boracay context, what is known, and what happens after contact.
- Prefer editorial bands, strong typography, useful image crops, and generous negative space over repeated rounded cards.
- Use real Hangin/Boracay photography for evidence. Generated art remains clearly supporting atmosphere.
- Motion explains state, focus, navigation, or spatial continuity. It is not decoration and must respect reduced motion.
- Mobile is a deliberate composition, not a collapsed desktop canvas.
- Accessibility is part of the visual system: contrast, text scale, focus, target size, reading order, and error clarity are design decisions.

## Recommended progression

### Stage 1: decide the reference specification

Review the 2026-08-31 proposal against current pages and business goals. Record one of three outcomes: accept it, revise it into a new dated spec, or reject/supersede it. Resolve navigation priorities, homepage section order, Duotone influence, Shop placement, proof hierarchy, photography availability, and the role of the established-2002 story.

No visual implementation plan should mix the current tests with selected fragments of an unapproved proposal.

### Stage 2: accessibility and shell baseline

Before large composition changes, verify the header, menu, skip link, footer, contact controls, breadcrumbs, FAQ disclosures, heading order, visible focus, current navigation state, target sizes, reduced motion, contrast, and 320-pixel reflow.

Adopt design tokens for color roles, typography, spacing, line length, focus, borders, layers, and motion. Tokens should describe purpose rather than a specific component. Retain CSS Modules and server components unless a demonstrated interaction needs client code.

### Stage 3: homepage hierarchy

Implement the accepted homepage story as coherent full-width sections. Make the primary service paths unmistakable, separate utility actions such as Shop when approved, add compact factual proof only when confirmed, and give the final contact prompt a clear next step. Preserve ordinary links and useful content without JavaScript.

Test each section at 320, 390, 430, 768, 1366, and 1536 CSS pixels before moving on. Avoid text baked into images and crops that hide the actual subject.

### Stage 4: supporting-page system

Bring lessons, rentals/storage, safaris, accommodation, shop, Boracay guidance, about, and contact into the same hierarchy without forcing identical layouts. Reuse typography, spacing, media, breadcrumbs, facts, related links, and contact treatment while allowing content-specific composition.

### Stage 5: authentic proof and refinement

Replace supporting generated scenes with properly licensed or commissioned Hangin proof as it becomes available. Record exact provenance and consent. Refine crops, color treatment, and art direction after real assets are known rather than designing around imaginary staff, rooms, gear, or safaris.

## Interaction and responsive contract

- Keep semantic DOM order identical to visual reading order; do not use CSS order to rearrange meaning.
- Use native links, buttons, details/summary, selects, and inputs where they meet the need.
- Primary mobile actions target at least 48 by 48 CSS pixels under the project standard.
- Hover-only treatments apply only on devices that support hover and must have equivalent focus/state cues.
- Sticky elements must not obscure focus or content at zoom.
- No required information appears only through hover, animation, parallax, autoplay, or a background image.
- At 320 CSS pixels and 400 percent zoom, the page must not require two-dimensional scrolling except for content that genuinely needs it.
- Long text, translated content, text-spacing overrides, forced colors, high contrast, reduced motion, and missing images must remain usable.

## Content and media contract

Public UI changes use confirmed copy and the repository writing rules. Do not invent concise labels that change a business claim. A CTA says what happens next, such as “Ask about your dates” or “Check this size with Hangin,” rather than creating urgency.

Proof photography records source, creator, rights, subject, date, crop, alternatives, and attribution. Generated illustrations have a different content type and cannot fill a proof slot. Avoid manufacturer imagery unless Hangin has rights and the page does not imply current stock or affiliation.

## Validation method

Every changed page needs:

- Full-page mobile and desktop rendering in a pinned browser environment.
- Side-by-side comparison to the accepted design artifact, with intentional differences documented.
- Keyboard, visible-focus, skip-link, menu/disclosure, zoom, text-spacing, reduced-motion, forced-color, and screen-reader checks.
- Automated axe regression scanning plus manual WCAG review.
- Contrast verification for actual text sizes and states, including over images.
- No-JavaScript and failed-image checks for core content and contact paths.
- Performance evidence for fonts, CSS, JavaScript, LCP media, layout shift, and animation work.
- End-to-end copy review using the repository’s public-writing rules.

Visual snapshots should cover every public route at mobile and desktop. Keep baselines in one pinned rendering environment; do not accept broad image-diff updates without reviewing the rendered change.

## Failure and rollback

- Unapproved design conflict: stop and request a spec decision.
- Missing real proof asset: retain an honest existing treatment or use clearly decorative illustration; do not simulate evidence.
- Contrast, overflow, focus, or reading-order regression: block merge even if the screenshot looks attractive.
- Animation or script failure: core content, navigation, and contact remain usable.
- Visual baseline changes unexpectedly: inspect the complete page and isolate the cause before updating the baseline.
- Released regression: restore the prior immutable artifact, then fix against a reproducible viewport/browser case.

## Acceptance criteria

- The active visual specification has an explicit status, owner, and relationship to older designs and tests.
- All nine routes share an intentional shell and token system while preserving page-specific hierarchy.
- There is no horizontal overflow at required viewports; content remains usable at text resize and zoom.
- Navigation, disclosures, contact actions, current state, and focus are keyboard and screen-reader understandable.
- Actual palette/state combinations meet the accepted WCAG 2.2 AA target, with no conformance claim based only on automation.
- Core content and contact work without client JavaScript and with images unavailable.
- Generated images never imply real people, premises, inventory, rooms, equipment, lessons, or trips.
- Full-page visual, accessibility, performance, and copy review passes for every affected route.
- The change does not add generic card grids, excessive pills, glass effects, decorative motion, or a vendor-brand imitation.

## Decision gates

The owner must decide the status of the 2026-08-31 proposal, final navigation priorities, accepted level of Duotone reference, homepage sequence, Shop placement, available real photography, image-rights owner, brand/contact reviewers, WCAG/browser support target, and whether measured analytics evidence is needed before restructuring a journey.

## Dependencies

Phase 0 browser testing, performance budgets, media provenance, and accepted status rules come first. Content management provides stable content and media roles. Localization must be tested before designs are considered resilient. Booking and commerce introduce additional interaction states that need separate design review.

## Skills review

Use the installed `frontend-design` skill for implementation and `no-ai-slop` for all visible text. No additional visual skill is needed now. Image-generation skills may create supporting concepts or decorative art, but they cannot manufacture proof and must follow the media contract.

## Primary references

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- WAI page structure: <https://www.w3.org/WAI/tutorials/page-structure/>
- WAI images tutorial: <https://www.w3.org/WAI/tutorials/images/>
- WCAG reflow understanding: <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
- WCAG target size understanding: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- CSSWG Media Queries Level 5 reduced-motion feature: <https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion>

Sources accessed 2026-09-04.
