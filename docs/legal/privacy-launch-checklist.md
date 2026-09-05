# Privacy launch checklist

Status: Proposed
Scope: Proposed operational/drafting policy; owner adoption unconfirmed
Correction date: 2026-09-04
Original research snapshot: worktree `0f6a`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](integration-corrections-sources.md).

**Owner:** Assign before use
**Last reviewed:** 4 September 2026
**Rule:** Re-run this checklist before adding a form, analytics, advertising, booking, payment or marketing automation.

> **Do not publish the draft notice or enable new data collection until every required fact is confirmed. Final legal text and business-specific conclusions require review by a Philippine lawyer.**

## Blockers for a complete public notice

- [ ] Confirm the registered owner or legal entity operating Hangin Kite Center. Record the exact legal name, any registered trade name, business type and service address.
- [ ] Name the Philippine personal information controller and the person or role handling privacy requests. Record the actual Philippine DPO designation, or the individual controller acting as de facto DPO. This Philippine designation is separate from the EU/UK DPO applicability assessment below; do not invent a person or title.
- [ ] Provide the DPO title/designation, postal address, dedicated telephone number and dedicated monitored email address. Confirm confidential access and the actual role; do not substitute an ordinary sales inbox without review. See [NPC Advisory 2017-01, pp. 4–5 and 8–9](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC-Advisory-2017-01-sgd.pdf), rechecked 2026-09-05.
- [ ] Inventory every place visitor or customer data is held: Cloudflare, email, WhatsApp, phones, laptops, shared drives, calendars, paper notes, accounting, booking, payment and accommodation systems.
- [ ] Set a defensible retention rule for each data type. Include inquiries that do not book, customer and booking records, payment records, waivers, incident records, marketing consent and suppression lists.
- [ ] Confirm the lawful purpose and Philippine legal basis for each use. If EU or UK scope is triggered, document an Article 6 or UK GDPR lawful basis separately.
- [ ] Confirm every recipient and processor, the relevant contracting entity, processing location, sub-processors, contract and security terms.
- [ ] Decide whether Hangin will use a Philippine-law notice only where legally sufficient or voluntarily adopt one GDPR-level global standard.

## Current deployment check

- [ ] Run a fresh `npm run verify` with the integrated `scripts/privacy-audit.mjs` regression check. Record the revision, inputs, command and result; a pass is not proof that tracking is absent. After an approved deployment, run `scripts/audit-deployed-privacy.mjs` using its documented CLI and record HTTP/redirect scope separately from browser execution.
- [ ] Inspect the deployed HTML and network traffic, not only the repository build.
- [ ] Check Cloudflare for Web Analytics, Browser Insights, Zaraz, Apps, Turnstile, bot products, challenge pages, cache rules, Workers, Pages Functions and automatic script injection.
- [ ] Record every Cloudflare cookie and its purpose, duration and triggering condition. Confirm whether each is strictly necessary.
- [ ] Record the Cloudflare account entity, plan, current DPA, enabled logs, log access, log retention and sub-processor list.
- [ ] Confirm TLS mode, access controls, administrator MFA, least-privilege accounts and alerting.
- [ ] Confirm the site still loads no third-party script, frame, font, remote image, pixel or other active content.
- [ ] Confirm that WhatsApp and email open only after a visitor chooses the link and that no Meta SDK or tracking parameter is added.

## EU and UK territorial-scope facts

- [ ] List every country intentionally targeted by paid search, social advertising, travel marketplaces, affiliates and offline campaigns.
- [ ] Record any EU- or UK-specific domain, landing page, language, currency, telephone number, travel instruction, delivery term, customer story or testimonial.
- [ ] Record whether Hangin regularly accepts or solicits bookings from people while they are in the EEA or UK.
- [ ] Record whether any technology analyses or profiles the behaviour of visitors located in the EEA or UK.
- [ ] Ask counsel to apply Article 3 separately to website delivery, inquiries, bookings, marketing, analytics and advertising.
- [ ] If either regime applies, decide whether an EEA representative, UK representative or both are required. Do not assume regular booking or analytics activity is “occasional.”
- [ ] Record the DPO analysis. The current repository does not show large-scale regular monitoring or large-scale special-category processing.

## Before adding a contact or booking form

- [ ] Collect only fields needed for the stated next step.
- [ ] Put the short collection notice beside the form and link the complete notice before submission.
- [ ] Separate required booking data from optional marketing consent.
- [ ] Define server-side validation, spam protection, access controls, encryption, deletion and incident handling.
- [ ] Verify where submissions and backups are stored and which provider staff or sub-processors can access them.
- [ ] Avoid free-text requests for health, disability, passport or emergency information unless the purpose, legal basis and safeguards are approved.
- [ ] Add a tested export, correction and deletion workflow before launch.

## Before adding analytics

- [ ] Write down the questions the analytics must answer. Reject data that does not serve those questions.
- [ ] Decide whether aggregate, cookieless server statistics are sufficient.
- [ ] Test whether the product uses cookies, local storage, identifiers, fingerprinting, link decoration, pixels, IP addresses or user-level event histories.
- [ ] Decide whether the processing monitors EEA or UK behaviour under Article 3.
- [ ] For the EEA, check the ePrivacy implementation in each intentionally targeted Member State.
- [ ] For the UK statistical-purpose exception, confirm sole-purpose service improvement, clear information, a simple free objection, aggregation, minimal individual-level retention, no profiling and no advertising reuse.
- [ ] If consent is required, block the technology until opt-in, make reject as easy as accept, record the choice, allow withdrawal and keep the site usable after refusal.
- [ ] Sign the processor terms and validate international transfer safeguards before sending production data.

## Before adding advertising or social pixels

- [ ] Treat behavioural advertising, retargeting, conversion pixels, custom audiences and session replay as tracking until counsel documents otherwise.
- [ ] Do not load non-essential advertising technology before valid consent where EU or UK rules apply.
- [ ] Document controller, joint-controller and processor roles with the platform.
- [ ] Check whether location targeting itself establishes an intentional EEA or UK offer.
- [ ] Explain the platform recipients, purposes, profiling, retention, transfers and withdrawal controls in the notice.
- [ ] Keep proof of campaign geography, consent configuration and platform contract version.

## Before adding payment or online booking

- [ ] Confirm prices, currencies, cancellation and refund rules with the owner before publishing them.
- [ ] Confirm which business contracts with the customer and which provider handles booking and payment.
- [ ] Use hosted payment fields where practical so Hangin does not receive card data.
- [ ] Map the booking provider, payment provider, fraud provider, email provider and their sub-processors and transfer routes.
- [ ] Use contract or pre-contract processing only for data genuinely needed to arrange or perform the booking.
- [ ] Keep marketing optional and separate.
- [ ] Define retention for abandoned bookings, successful bookings, invoices, disputes and refunds.
- [ ] Check consumer, tax, tourism and payment requirements with Philippine counsel in addition to privacy rules.

## Before direct marketing

- [ ] Distinguish service replies from promotions.
- [ ] Record the source, wording, date, channel and scope of each marketing consent.
- [ ] Do not add an inquiry to a marketing list without a valid basis.
- [ ] If relying on a soft opt-in, document every condition and the jurisdictions where it is valid.
- [ ] Provide a simple opt-out when details are collected and in every marketing email, text or WhatsApp message.
- [ ] Keep a minimal suppression list so an opt-out is respected.

## Recommended operating controls

- [ ] Maintain a short processing register even if a small-business exemption might apply.
- [ ] Review administrator access every quarter and remove old accounts promptly.
- [ ] Require device encryption, screen locks, MFA and secure backups for any device holding customer messages.
- [ ] Write a rights-request procedure with identity checks, search locations, response ownership and deadlines.
- [ ] Write an incident procedure covering containment, evidence, processor notifications and regulator or individual notification assessment. For a qualifying breach affecting children, cover both child and parent/guardian notices in child-understandable language. Include the pending-request full-report email procedure in the Cloudflare runbook.
- [ ] Recheck this assessment every six months and whenever a vendor, purpose, target market or data field changes.

## Sign-off record

Record the date, release or campaign, owner, legal reviewer, technical reviewer, applicable jurisdictions, approved vendors, notice version and any accepted risk. Keep the evidence with the release record.
