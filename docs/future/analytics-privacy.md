# Future brief: analytics and privacy

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Answer a small set of product and marketing questions with the least visitor data possible. Measurement must distinguish page/search activity, contact intent, actual enquiries, and confirmed bookings. The default remains no browser tracker.

This is a technical and product direction, not legal advice. Counsel or the appointed privacy owner must determine obligations for the Philippines and every visitor jurisdiction in scope, including EU/EEA and UK rules when applicable.

## Current boundary

The static site has no analytics script, tag manager, cookie banner, advertising pixel, session replay, account, form, or runtime collector. The main conversion leaves the site for WhatsApp; email and telephone are alternatives. The repository cannot observe whether a contact click becomes a sent message, enquiry, booking, or payment.

That privacy-preserving limitation must be described honestly. A click metric cannot be relabeled as a lead or booking.

## Measurement questions

Before collecting anything, write the decision that the measurement will change. Initial questions should be limited to:

1. Which search queries and landing pages bring relevant visitors?
2. Which services generate actual enquiries and bookings?
3. Which pages or devices show a clear usability failure that existing browser tests and support feedback cannot answer?
4. If a new booking or commerce handoff launches, where do anonymous aggregates show a material technical drop-off?

A metric without a named decision, owner, review date, and deletion rule should not be collected.

## Recommended progression

### Stage 1: zero-browser-tracking baseline

Run for 8 to 12 weeks using:

- Google Search Console for search impressions, clicks, queries, landing pages, countries, devices, indexing, and sitemap diagnostics.
- Bing Webmaster Tools for complementary search/index information.
- Google Business Profile and Bing Places aggregate interaction data after account ownership is confirmed.
- Privacy-reduced host/CDN aggregates only after the exact log fields, IP handling, query-string handling, access, location, and retention are documented.
- A monthly staff tally of enquiries and confirmed bookings by service and coarse source such as search, profile, referral, walk-in, or unknown.

The operational tally should contain counts, not exported contact lists or message contents. Do not join site activity to named customers.

### Stage 2: one narrow browser event only if needed

If the baseline leaves a documented decision unanswered, consider a minimal first-party or privacy-focused collector. Start with one event such as `contact_click` and a strict allowlist:

- Route ID.
- Service ID or general contact context.
- Placement ID from a fixed code list.
- Channel: WhatsApp, email, or telephone.
- Optional coarse campaign bucket from a controlled map.

Do not send names, phone numbers, email addresses, message text, provider booking IDs, full/referring URLs, query strings, free-text labels, precise location, fingerprint components, persistent customer IDs, or advertising identifiers. Never derive a fingerprint.

Host the smallest possible script, load it without blocking core content, and make all contact actions work when it is blocked or declined. Do not introduce a general tag manager for one event.

### Stage 3: authoritative operational outcomes

When booking or commerce systems exist, those systems own enquiry/booking/order/payment outcomes. Import only the aggregates needed for decisions. Do not try to reconstruct revenue or conversion by matching anonymous browser records to personal customer data unless a separately approved, legally reviewed purpose requires it.

## Consent and lawful-basis direction

“Cookie-free” does not automatically mean “consent-free” or outside privacy law. Before any browser collection, the privacy owner must document data categories, purpose, controller and processors, legal basis, jurisdictions, transfers, recipients, retention, user rights, consent requirements, and withdrawal behavior.

If consent is legally required:

- Basic mode sends no nonessential request before affirmative consent.
- Refusal is as easy and prominent as acceptance.
- Categories and vendors are accurately named; no preselected nonessential choice.
- Withdrawal takes effect and prevents later requests.
- The site remains fully usable without consent.
- Consent state is scoped, accessible, expires according to policy, and does not become cross-site tracking.

If legal review determines consent is not required for a narrowly configured measurement, document that decision and configuration. Do not add a decorative banner with no technical effect.

## Data inventory and controls

Maintain one inventory for browser events, host logs, search/profile tools, operational counts, booking/commerce providers, support channels, and backups. For each dataset record:

- Purpose and decision owner.
- Fields and whether any field can identify a person.
- Source, processor/subprocessor, storage region, and transfer mechanism.
- Access roles, authentication, export, and deletion process.
- Collection start, retention, aggregation, and deletion schedule.
- Legal review and consent/basis decision.
- Incident contact and breach-response path.

Minimize at collection rather than promising to filter later. Strip query strings and IP addresses before storage where feasible. Redact logs, separate production and test data, use least-privilege access and multifactor authentication, and prohibit analytics export into public repositories or agent prompts.

## UX and accessibility

Privacy information must be direct and specific. Explain what is collected, why, for how long, and who receives it. Do not use manipulative color, repeated prompts, hidden refusal, or claims that tracking is required when core service works without it.

Consent and privacy controls need visible labels, keyboard operation, focus management, adequate target sizes and contrast, screen-reader status, zoom/reflow support, and translated versions for every locale in which they are shown.

## Failure and recovery

- Collector unavailable or blocked: site and contact links work; no user-facing error is required.
- Event payload fails allowlist: discard it and alert the technical owner without logging the rejected personal value.
- Consent state unknown where consent is required: fail closed and send no nonessential request.
- Vendor or purpose changes: pause collection until inventory, notice, legal basis, consent behavior, and contracts are reviewed.
- Data breach or accidental personal-data collection: stop the affected flow, preserve limited incident evidence securely, follow the approved response process, and delete unlawful/excess data when authorized.
- Metric loses an owner or decision: stop collecting and delete according to policy.

## Acceptance criteria

- A written measurement plan maps every metric to a named decision and owner.
- Search/profile and operational aggregates run before browser tracking is considered.
- The data inventory names all fields, processors, locations, access, retention, deletion, transfers, and legal review.
- Automated tests prove zero analytics requests in the default no-tracker state and, if consent applies, before refusal/acceptance is resolved.
- Event schema rejects personal/free-text/full-URL/query/referrer/fingerprint/customer identifiers.
- Contact links and core pages work with JavaScript disabled, tracking blocked, consent refused, or collector unavailable.
- Reports label contact clicks as intent and keep enquiries, bookings, orders, and payments separate.
- Privacy/consent UI passes keyboard, screen-reader, focus, contrast, zoom, mobile, and locale review.
- Vendor configuration and data deletion are tested, not assumed from marketing claims.
- No advertising pixel, session replay, broad tag manager, or cross-site identifier launches under this brief.

## Decision gates

The owner must appoint metric, privacy, technical, and operational owners; identify applicable jurisdictions and counsel; confirm search/profile/host access; choose business questions and review cadence; define retention and deletion; approve allowed host-log fields; decide whether browser measurement is needed; and set acceptable vendor cost, data location, and support requirements.

A collector selection needs an ADR covering data flow, cookies/storage, identifiers, fingerprinting, consent mode, processor terms, transfers, retention, deletion, opt-out, accessibility, script weight, CSP, uptime, exportability, cost, and exit.

## Dependencies

Phase 0 owner inventory, production host contract, privacy-reduced log decision, browser tests, CSP, and no-tag baseline come first. Internationalization applies to notices and controls. Booking and commerce provide authoritative outcomes after their own privacy reviews.

## Skills review

No analytics or consent skill should be installed before the measurement purpose and jurisdictional decision exist. Existing planning, testing, accessibility, security, and documentation workflows are sufficient. A vendor-specific skill would add unnecessary permissions and bias before provider selection.

## Primary references

- Google Search Console performance reports: <https://support.google.com/webmasters/answer/7576553>
- Philippine Data Privacy Act: <https://privacy.gov.ph/data-privacy-act/>
- Philippine National Privacy Commission privacy principles: <https://privacy.gov.ph/the-data-privacy-act-and-its-irr/>
- European Data Protection Board guidelines: <https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en>
- UK ICO guidance on cookies and similar technologies: <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/online/cookies-and-similar-technologies/>
- W3C accessibility principles: <https://www.w3.org/WAI/fundamentals/accessibility-principles/>

Sources accessed 2026-09-04.
