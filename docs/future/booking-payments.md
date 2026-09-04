# Future brief: booking and payments

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Let a visitor move from a useful service page to a confirmed reservation or payment without publishing false availability, asking staff to maintain two calendars, or placing payment secrets in the static website. WhatsApp and email remain usable fallbacks at every stage.

This brief covers lessons, rentals, storage, accommodation, and safaris. Those services have different capacity, weather, equipment, and confirmation rules. They must not be forced into one generic time-slot model.

## Current boundary

The site creates service-specific WhatsApp messages through the contact adapter in `content/site.ts`. It has no authoritative offer, availability source, booking database, account, payment endpoint, or webhook receiver. A static export cannot safely create privileged checkout sessions, verify payment events, or reserve inventory.

An outbound contact click is intent only. A payment-provider return page is not proof of payment, and a calendar selection is not a confirmed booking until the authoritative booking system says so.

## Recommended progression

### Stage 1: staff-confirmed hosted payment links

Keep the enquiry flow. Staff confirms dates, service, rider details, capacity, price, deposit, currency, and applicable policies, then creates a unique customer/order-specific hosted payment link in an approved provider dashboard.

- Do not publish a reusable generic payment link as a substitute for an offer.
- The link description and amount must identify the confirmed service and reference.
- Staff records who issued it, its expiry, payment state, and the matching reservation.
- The website never collects card data and does not claim live availability.
- Confirmation and refund messages come from an owned operational process, not an inferred browser redirect.

This is the smallest useful step because it removes card handling while preserving human review for weather-sensitive and resource-sensitive services.

### Stage 2: one hosted booking pilot

Pilot a maintained activity-booking service for one service with the clearest capacity rules, likely lessons. Prefer a full-page redirect over an embedded widget unless measured user evidence justifies the embed. A redirect isolates third-party scripts, cookies, accessibility defects, and performance cost from the core site.

The booking service must own sessions, instructor or resource capacity, cut-off times, booking state, customer notifications, changes, cancellations, and provider reconciliation. The Hangin page may explain the service and link to the hosted flow; it must not duplicate volatile availability.

Pilot success means staff uses one operational calendar, visitors understand when a request becomes confirmed, fallback contact still works, and provider outages do not break the public information pages.

### Stage 3: custom transaction boundary only if justified

Build a separate server-side service only when hosted products cannot support a documented requirement. The static site may call that service, but the boundary must own:

- Server-authoritative offers, amounts, taxes, deposits, currency, policy version, and expiration.
- Temporary slot or resource holds with an explicit expiry.
- Checkout-session creation using allowlisted service identifiers rather than browser-supplied prices.
- Signed webhook verification against the raw request body.
- Idempotent processing, replay protection, reconciliation, refunds, and an audit trail.
- Separate booking and payment state machines.
- Redacted logs, data retention, access control, incident response, and provider outage behavior.

Do not replace the static export with a server runtime merely to host one webhook. A small isolated service or provider-owned integration is the preferred boundary.

## State and data contracts

Use separate records because reservation and money can disagree temporarily:

- `Offer`: immutable quote reference, service, included items, amount, currency, tax/deposit treatment, policy version, expiry, and issuer.
- `Booking`: requested, held, confirmed, changed, cancelled, completed, or expired; service-specific schedule and resource references; customer communication state.
- `Payment`: created, pending, paid, failed, expired, partially refunded, refunded, or disputed; provider IDs and event history.
- `Reconciliation`: expected amount and currency versus provider settlement, booking reference, exception owner, and resolution.

A paid transaction does not automatically mean that an operational booking is valid. A confirmed booking can also exist with payment due later. Transitions need explicit rules and human-visible exceptions.

## Business and policy requirements

Before any public booking or price UI, the owner must provide and maintain:

- Which services can be reserved online and which remain enquiry-only.
- Exact inclusions, durations, prerequisites, rider limits, equipment assumptions, and lead times.
- Prices, currency, taxes, deposits, balance timing, and quote expiry.
- Capacity and resource ownership, including instructors, rooms, boards or kites, transport, and storage.
- Weather, no-wind, cancellation, rescheduling, late-arrival, refund, and no-show rules.
- Minimum notice and who can override a rule.
- Customer-support and incident owners, business hours, and response expectations.
- Receipt or invoice process, settlement account, dispute process, and accounting owner.

Do not infer these from competitors or provider defaults. Legal and accounting review must confirm Philippine consumer, e-commerce, tax, privacy, and payment obligations before launch.

## Security, privacy, and accessibility requirements

- Use hosted payment fields or pages that keep card data outside Hangin systems.
- Put secret keys and webhook credentials only in the isolated server/provider configuration.
- Verify event authenticity, deduplicate event IDs, tolerate retries and out-of-order delivery, and reconcile independently of the visitor return page.
- Collect only data required to deliver the selected service. Never place personal data in analytics fields, static output, repository fixtures, or prefilled public URLs.
- Publish the controller/contact, purpose, recipients/processors, cross-border handling, retention, and customer rights after legal review.
- Give every input a visible label, clear error, correction path, and keyboard-operable control. Before payment, show the selected service, dates, people, amount, currency, policies, and how to correct them.
- Test the hosted experience itself. A provider badge does not establish WCAG 2.2 AA conformance.

## Failure and recovery

- Provider unavailable: keep service information and direct contact available; do not present a dead booking control as the only route.
- Price or policy mismatch: stop checkout, suppress the offer, and send the record for staff review.
- Slot race or expired hold: do not charge silently; explain the state and offer a new selection or contact path.
- Duplicate click or webhook: return the existing booking/payment result and create no duplicate charge or reservation.
- Payment succeeds but booking confirmation fails: flag for immediate reconciliation and human follow-up; never lose the paid record.
- Booking is cancelled or changed: preserve the original offer and event history, apply the approved policy version, and record any refund separately.
- Return page is closed or spoofed: the verified provider event and reconciliation process remain authoritative.

## Acceptance criteria

- No browser-controlled amount, service label, availability value, or policy text can change the authoritative transaction.
- No card data reaches Hangin code, logs, analytics, URLs, or repository artifacts.
- Booking and payment states are separate, observable, and recoverable.
- Verified, replay-safe events are the only automated basis for payment state; a redirect never fulfils a booking.
- The same confirmed offer is visible to staff, customer, checkout provider, receipt, and reconciliation process.
- WhatsApp and email remain available when the provider or JavaScript is unavailable.
- Sandbox scenarios cover successful and failed payment, abandonment, cancellation, duplicate submission, expired link, forged/replayed/out-of-order event, provider outage, capacity race, price mismatch, partial/full refund, and notification failure.
- Keyboard, screen-reader, zoom, error-recovery, and mobile checks cover the entire hosted handoff and return flow.
- Staff runbooks cover issuing links, matching payments, exceptions, changes, refunds, disputes, outage fallback, and escalation.

## Decision gates

Implementation cannot start until the owner identifies the first service, offer details, policy owner, operational calendar, capacity owner, payment/booking operator, customer-support owner, legal/accounting reviewer, expected volume, and budget.

Provider selection requires an ADR comparing eligibility in the Philippines, supported currencies and payment methods, fees and settlement, refunds/disputes, export/API access, webhook reliability, accessibility, privacy/subprocessors, data location, uptime/support, migration path, and staff workflow. PayMongo, Stripe, Rezdy, Checkfront, or another provider may be evaluated; none is selected by this brief.

## Dependencies

Phase 0 deployment, ownership, CI, browser testing, privacy inventory, and rollback must be in place. Content management must provide stable service and policy IDs. Analytics may observe the handoff without personal data, but booking/payment systems become the authoritative source for confirmed outcomes.

## Skills review

No booking or payment skill should be installed before a provider is selected. Existing planning, threat-model, testing, accessibility, and verification workflows are sufficient for the specification. Any provider-specific skill must be reviewed at a pinned revision for code, scripts, permissions, network access, secret handling, and maintenance before adoption.

## Primary references

- Next.js static export limitations: <https://nextjs.org/docs/app/guides/static-exports>
- OWASP third-party payment gateway integration: <https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Payment_Gateway_Integration_Cheat_Sheet.html>
- PCI SSC SAQ guidance: <https://www.pcisecuritystandards.org/merchant_resources/>
- Philippine Internet Transactions Act, Republic Act 11967: <https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/96902>
- Philippine Data Privacy Act: <https://privacy.gov.ph/data-privacy-act/>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>

Sources accessed 2026-09-04.
