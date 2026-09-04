# Future brief: shop and commerce

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Let visitors discover real gear and, when Hangin is operationally ready, purchase a verified variant without false stock, generic storefront design, unsafe payment handling, or disagreement between the page, structured data, checkout, physical shop, and receipt.

## Current boundary

The current `/shop/` route is an editorial enquiry page. It contains no product, price, variant, stock, cart, checkout, or order data and honestly asks visitors to check what is on the rack. Generated gear artwork is decorative and cannot establish actual inventory.

The typed WhatsApp/email adapter is an enquiry boundary, not an order or payment system. The static export cannot safely own secrets, receive webhooks, lock inventory, or keep build-time stock current.

## Recommended progression

### Stage 0: retain the current enquiry page

Keep the present page until Hangin has real product data, image rights, an inventory owner, and a reliable update process. Do not create a sample catalogue populated with plausible brands, prices, sizes, or stock.

### Stage 1: versioned enquiry catalogue

Publish a small catalogue of real products with stable product and variant IDs, verified descriptive facts, actual product photography, and a product-specific contact action such as “Ask Hangin to check this size.” Include the stable product/variant reference in the WhatsApp message, but no customer personal data in the URL.

An enquiry-only record has no price, `Offer`, stock promise, cart, checkout control, or merchant feed row. Unknown availability is rendered as a request to check, never as `InStock`.

The catalogue remains Git-reviewed until the change frequency proves that an operational inventory system is necessary.

### Stage 2: reservation or quote bridge

When staff can keep inventory authoritative, they may reserve a variant for a defined period and send a customer/order-specific hosted payment link. The reservation, price, policy version, expiry, issuer, and payment state need an owned system and reconciliation process.

### Stage 3: hosted commerce

Adopt a commerce/POS system of record only when Hangin has owners and service levels for products, variants, stock, prices, tax treatment, fulfilment, returns, refunds, receipts, disputes, and support. Use that system’s hosted checkout or hosted payment fields.

Marketing content can remain statically rendered, but offer-bearing pages must update from authoritative commerce events frequently enough to meet the accepted stock/price SLA. If that cannot be guaranteed, suppress purchase controls and return to enquiry mode.

Do not stretch the contact adapter into a commerce abstraction. Add a separate server/provider boundary for offers, cart/checkout sessions, orders, payment events, and reconciliation.

## Data model

- `Product`: stable ID and slug, lifecycle state, verified name, brand/model, category, condition, description, compatibility, specifications, variant references, image references, metadata, and content review.
- `Variant`: stable SKU, genuine size/color/model attributes, GTIN/MPN only when verified, provider variant ID, and lifecycle state.
- `ProductImage`: exact product/variant represented, original and derivatives, dimensions, alt text, source/creator/license or supplier permission, capture date, crop provenance, and documentary role.
- `Offer`: variant, sellable state, integer minor-unit price, verified ISO 4217 currency, tax display, authoritative availability, pickup/shipping eligibility, provider IDs, synchronization time, and applicable policy versions.
- `Order`: immutable line-item snapshot, totals, currency, customer/delivery data, payment and fulfilment states, invoice/receipt reference, returns, and refunds.
- `InventoryEvent`: variant, quantity delta or state transition, source, location, reason, timestamp, actor, and idempotency reference.

Historical orders must not be recomputed from mutable product or offer records.

## Truth invariants

- Enquiry-only products cannot render price, `Offer`, `InStock`, checkout, or Merchant Center data.
- A sellable variant must have current price, currency, stock source, tax treatment, fulfilment/return terms, provider IDs, and a checkout that agrees with the page.
- Page HTML, JSON-LD, merchant feed, checkout, receipt, and staff view derive from the same offer source.
- A stale or conflicting offer is suppressed automatically and sent for review.
- Generated imagery cannot satisfy a product-image requirement. Manufacturer images need documented rights and cannot imply that the pictured item is physically present.
- Order and payment state are separate; fulfilment never starts from a browser return page.

## Product information and search

Use a crawlable hierarchy such as `/shop/`, useful categories when inventory supports them, and `/shop/{product-slug}/`. Ordinary links, unique canonicals, sitemap coverage, breadcrumbs, and controlled retired-product behavior are required. Do not produce indexable faceted/parameter combinations by default.

Merchant-listing markup belongs only on pages where a visitor can actually purchase. Category/enquiry pages may use truthful descriptive markup but no fabricated offer. Use `ProductGroup` only for genuine variants with stable IDs and a deliberate URL model. Never add invented reviews, ratings, identifiers, shipping promises, or availability.

Keep the visual language editorial and rack-like, not a generic rounded-card marketplace. Put condition, fit, compatibility, fulfilment, policy, and next action early. Avoid fake scarcity, countdowns, and “low stock” without a real threshold and source.

## Philippine operational and legal gates

Before public sale, Philippine counsel and accounting must confirm:

- Merchant identity and registration disclosures, current DTI Trustmark requirements, and BIR online-seller badge/registration display.
- Required display/settlement currency, tax/VAT treatment, invoices or receipts, electronic reporting, record retention, and physical POS integration.
- Accurate product, condition, quantity, availability, price, warranty, and fulfilment representations.
- Pickup and shipping scope, courier/rates/timing, order confirmation, complaint/redress path, returns, defective/nonconforming goods, refunds, and chargebacks.
- Privacy controller, processor contracts, cross-border transfers, retention, security, and data-subject requests.

Current DTI material has changed over time. The exact Trustmark and badge obligation is a launch gate for counsel, not a developer inference. Counsel must confirm that any public return or exchange policy preserves every mandatory remedy, including the treatment of defective goods, before publication.

## Security, privacy, and accessibility

- Guest checkout is the default. Accounts need a separate demonstrated benefit and security/privacy design.
- Collect an address only when shipping requires it; keep marketing consent separate from fulfilment.
- Allowlist SKU and quantity; calculate totals and eligibility server-side; use integer minor units.
- Verify signed provider events against raw bodies, deduplicate and replay safely, rate-limit abusive operations, rotate least-privilege keys, redact logs, and store no card data.
- Before financial submission, show a complete order review and correction controls.
- Use native labelled variant controls, linked field errors, an error summary, programmatic cart/stock status, consistent help, visible focus, and non-obscured content at zoom.

## Failure and recovery

- Price, currency, stock, policy, page, feed, or checkout mismatch: suppress purchase and route to staff review.
- Inventory race or sold-out item: do not accept an order for unavailable stock; preserve cart context and offer enquiry/substitute handling.
- Duplicate checkout or event: return the existing order/payment state without duplicate charge or negative inventory.
- Payment succeeds and order update fails: reconcile from verified events and alert the owner immediately.
- Provider outage: catalogue remains readable; sellable controls fall back to an honest contact route.
- Product retired: preserve order history, remove offer/feed state, and redirect only to a genuine successor or useful category.
- Bad release: restore the prior artifact, while the commerce system remains the authoritative order/stock record.

## Acceptance criteria

- Validation rejects duplicate product slugs/SKUs, non-integer money, fake identifiers, missing provenance, and sellable offers missing source/policy fields.
- Product enquiry links carry stable product/variant IDs but no personal data.
- No price, availability, `Offer`, feed row, or checkout exists for enquiry-only inventory.
- Every sellable variant reconciles across page, JSON-LD, provider, feed, checkout, stock, and receipt; mismatch suppresses sale.
- Product/category routes have crawlable links, unique metadata/canonical, sitemap inclusion, one H1, valid breadcrumbs, and controlled variant/facet URLs.
- Real product imagery has rights, subject/variant mapping, dimensions, responsive sources, and useful alternatives; generated imagery cannot pass the field.
- Keyboard/screen-reader tests cover variants, cart, validation, review, hosted checkout return, and status changes.
- Sandbox tests cover success, decline, cancel, abandonment, duplicate action, forged/replayed/out-of-order event, provider outage, inventory race, price mismatch, sell-out, refunds, returns, pickup/shipping, receipt failure, and notification failure.
- No redirect triggers fulfilment and retries cannot create duplicate orders.
- Staff runbooks cover stock correction, reservation expiry, reconciliation, refunds, returns, disputes, receipts, outage, and customer complaints.

## Decision gates

The owner must confirm legal entity/BIR/Trustmark status, offer/display/settlement currency, VAT treatment, product scope, new/used/consignment policy, brands and image rights, identifiers, stock/POS owner and freshness SLA, pickup/shipping geography, courier and rates, reservation period, accepted payments, settlement, returns/refunds/warranty, complaint owner, invoice process, privacy/retention, analytics/marketing consent, and guest versus account policy.

A provider ADR must compare Philippine eligibility, inventory/POS fit, hosted checkout, payment methods, settlement, tax/receipt support, webhook/API quality, accessibility, privacy, export, uptime/support, costs, and vendor exit. No commerce provider is selected here.

## Dependencies

Phase 0, content registry, deployment/service boundary, booking/payment security patterns, analytics/privacy inventory, real product photos, and owned operational policies come first.

## Skills review

No commerce skill should be installed before provider selection. Shopify’s official AI toolkit is a conditional candidate only if Shopify is chosen; any tooling requires pinned source, script, permission, hook, network, and secret-handling review. Existing writing, frontend, SEO, planning, and verification skills cover the present work.

## Primary references

- Google merchant listings: <https://developers.google.com/search/docs/appearance/structured-data/merchant-listing>
- Google product variants: <https://developers.google.com/search/docs/appearance/structured-data/product-variants>
- Google e-commerce site structure: <https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure>
- Republic Act 11967: <https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/96902>
- DTI implementing rules: <https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf>
- Philippine Consumer Act: <https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/3302>
- DTI return/exchange guidance: <https://fairtrade.dti.gov.ph/faq/is-no-return-no-exchange-policy-allowed/>
- BIR RMC 38-2026: <https://bir-cdn.bir.gov.ph/BIR/pdf/RMC%20NO.%2038-2026.pdf>
- Philippine Data Privacy Act: <https://privacy.gov.ph/data-privacy-act/>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>

Sources accessed 2026-09-04.
