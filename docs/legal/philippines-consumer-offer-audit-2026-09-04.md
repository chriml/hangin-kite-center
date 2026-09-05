# Philippine consumer-offer audit

Status: Current
Scope: Current internal research; proposed operational decisions remain unaccepted
Correction date: 2026-09-04
Original research snapshot: worktree `8a45`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](integration-corrections-sources.md).

Date checked: 4 September 2026

> **Legal review required before launch:** A Philippine lawyer should confirm the site's classification, the operator's registrations and permits, the offer and pricing model, and every customer-facing term. This repository review is not legal advice.

## Scope and present state

This review covers the exported public pages for lessons, rentals and storage, accommodation, kite trips, and the shop. It also covers contact links, imagery, testimonials, prices, tax wording, and structured data.

The repository currently exports a static Next.js site. It has no form, account, checkout, payment integration, analytics script, advertising pixel, review widget, price, promotion, or online acceptance step. The public contact routes are WhatsApp and email. Hosting is configured for Cloudflare, but the deployed Cloudflare settings and logs are outside this repository and were not verified.

The boundary added to commercial pages says that messages are enquiries, not reservations, and that nothing is booked or paid for on the website. That is a useful factual boundary, but it does not settle the legal classification. The Internet Transactions Act IRR and JAO 22-01 use language broad enough to cover an online offer or an order initiated online even when payment or delivery happens offline.

## Short evidence table

| Rule | What the official source says | Effect on the current site | Before online ordering, booking, or payment |
| --- | --- | --- | --- |
| Consumer Act, RA 7394, Arts. 50 and 108-115 | Deceptive acts and misleading advertisements are prohibited. Material omissions and unsubstantiated special claims can mislead. | Keep credentials, availability, affiliations, reviews, and service claims factual and supported. | Substantiate every material claim and disclose material conditions before acceptance. |
| Consumer Act, RA 7394, Arts. 81-83 and 111 | Retail consumer products generally need public peso price tags; price comparisons have specific bases. | The current site publishes no product price or comparison. Do not replace a required public price with “message for price.” | Publish current PHP prices and a lawful comparison basis where applicable. |
| Internet Transactions Act, RA 11967, sec. 23, and its IRR, secs. 30 and 34 | Online merchants and e-retailers must provide identity and contact information, protect personal data, honor advertised services, issue invoices, and provide redress. The IRR defines e-retailing to include offering through one's own website. | The owner/entity, complete address, registration details, and complaint process are not known. Keep the site enquiry-only pending advice and facts; that does not by itself exempt it from applicable current disclosure obligations. | Publish the verified legal/trade identity, physical shop/place-of-business address, mobile or landline number and valid email on the homepage under section 23(f)(1), plus applicable privacy information, all-sales invoice/receipt process under section 23(h), and redress route under section 23(i). |
| JAO 22-01, secs. 5, 7, 8.3, and 10 | Online offers must be truthful; total prices, taxes, fees, payment, delivery, cancellation, return, and refund information must be clear. Privacy duties apply when personal data is processed. | A service-specific WhatsApp link may still fall within the order/offer rules. Public “ask for rates” copy was removed. | Publish the complete current price and material terms before an order can be placed or accepted. |
| Tourism Act, RA 9593, sec. 39 | Primary tourism enterprises must obtain periodic DOT accreditation; secondary enterprises may obtain voluntary accreditation. | The operator/referral role for stays and trips, and the relevant DOT/LGU classification, are unknown. | Verify who operates each service and the required DOT accreditation and LGU permits before claiming or selling it. |
| BIR RR 7-2024 and RMC 77-2024 | Service invoices must identify the registered seller and contain prescribed transaction details; VAT and non-VAT invoice duties differ. | No transaction occurs in the repository. The BIR status and registered invoice identity are unknown. | Configure invoicing and tax-inclusive totals against the verified BIR registration and tax status. |

## Repository claim audit and correction decisions

| Area | Finding | Repository action | Evidence still needed |
| --- | --- | --- | --- |
| Lessons | IKO and VDWS instruction is owner-confirmed in the accepted original design and current product record. Individual current credentials are not established. | Preserve the confirmed general instruction fact; reverse the old blanket removal and do not prohibit the names in tests. Keep level and condition-based lesson descriptions. | Current instructor names, credential numbers, issuer verification, scope, and expiry dates. |
| Rental and storage | Copy stated that complete rentals and storage were available. No inventory, dates, condition, or operating terms were supplied. | Recast as an enquiry about whether an arrangement is possible. | Current inventory and sizing, condition records, deposits, damage rules, eligibility, supervision, storage responsibility, and prices. |
| Accommodation | Copy could read as though Hangin directly operates accommodation. No property or operator facts were supplied. | Keep the confirmed accommodation service and enquiry route; do not imply property ownership or a live offer. General truthful `Service` markup may remain. | Operator and referral role, property identity and address, permits/accreditation, room facts, rates, taxes, availability, cancellation, and refund terms. |
| Kite trips | “Guided” and safari wording could imply a defined operated product. Routes, transport, operator, and permits were not supplied. | Recast descriptive copy as an enquiry about kite trips dependent on conditions. | Operator, itinerary, inclusions, equipment, transport, guides, safety plan, permits, weather policy, cancellation, and price. |
| Shop | Copy stated that Hangin has stock in a shop, without a verified catalogue. | Changed the copy to ask whether a named item can be checked. | SKU list, brand/model/size, stock date, condition, warranties, return/exchange terms, price, tax treatment, and invoice process. |
| Reviews and ratings | No review or rating is present. | Tests prevent review/rating schema from appearing without a deliberate change. | Source, permission, date, exact scope, moderation policy, and any incentive. |
| Prices and tax | The site has no prices, price comparisons, discounts, or fee disclosures. | The earlier branch proposed a blanket rates-message filter; it was not integrated. Current tests inspect structured commercial fields, while the accommodation page still directs visitors to ask for current rates/details. Legal treatment depends on the actual sales flow. | A signed-off PHP price matrix with tax status, mandatory fees, inclusions, exclusions, and validity dates. |
| Structured data | The founding year and service categories are owner-confirmed. They do not establish live inventory, prices or detailed supplier relationships. | Retain truthful general `Service` descriptions and the confirmed founding year where they match visible content. Inspect schema types/properties separately from ordinary words such as “review”; reject fabricated ratings, reviews, offers, hours, prices or availability. | Evidence and an update process for any more specific commercial claim. |
| Images | Generated illustrations are already labelled in the image registry and are not presented as documentary photos. Third-party location photos have source and licence credits. | Integrated rendering uses empty alt text for decorative generated art and visible illustration labels. General dimension/alt and caption checks exist; no separate generated-empty-alt test is claimed. | Written permission/provenance for any future staff, facility, room, gear, or trip proof image. |

The established year 2002 and IKO/VDWS instruction are confirmed by the accepted 2026-08-29 design and [current product record](../project/product.md). The old audit overlooked those sources. Preserve the confirmed facts while requesting documentary substantiation; missing certificates by person do not invalidate the general instruction fact. Lessons, rental, storage, accommodation, kite shop and safaris are likewise confirmed service categories. Current inventory, prices, ownership and individual credentials remain separate unknowns.

## Integration clarification, 2026-09-05

Statements above about removed price-enquiry wording describe the earlier branch, not the integrated public copy. `content/island-pages.ts` retains the accommodation rates/current-details enquiry. This follow-up corrects the evidence description; it does not invent prices, remove confirmed service facts or decide the legal treatment of the real sales flow.

## Current obligations and release blockers

Even for an enquiry-only site, the public copy must stay truthful, current, and non-misleading. Safety-relevant limits, operator identity, affiliations, and service availability should not be implied without evidence. Cloudflare's deployed collection, security, retention, and sharing settings must be inspected before concluding that the site collects no personal data.

The site should not accept or confirm a booking, order, rental, room, trip, or payment online until the owner supplies and counsel approves all applicable items below:

- Exact legal owner or entity name, trade-name linkage, registration record, BIR Certificate of Registration and tax status.
- Retain the confirmed 2002 founding-year record and collect dated documentary substantiation for the evidence file; do not label the year wholly unverified.
- Complete physical business address, current phone/email contacts, and the person responsible for complaints and privacy. Identify a DPO only if the organization has appointed one or the law requires it.
- Current PHP price matrix for each service and product, including VAT/tax treatment, mandatory fees, deposits, inclusions, exclusions, validity dates, and who may approve changes.
- Lesson duration and scope, safety prerequisites, rescheduling and cancellation rules, certificate inclusion or fees, and evidence for each named instructor credential.
- Rental inventory, sizes, condition checks, rider eligibility, supervision limits, deposit, loss/damage rules, return timing, and refund/cancellation rules.
- Storage location and access terms, security, prohibited items, responsibility for loss or damage, duration, and price.
- Accommodation operator/referral role, property name and address, DOT/LGU records, room facts, occupancy, availability source, total price, taxes/fees, cancellation, refund, and complaint route.
- Kite-trip operator/referral role, route and transport facts, inclusions, equipment, guide qualifications, risk and emergency plan, weather decision process, permits, total price, cancellation, and refund terms.
- Shop catalogue with SKU/brand/model/size, stock timestamp, new/used condition, warranties, returns/exchanges, total PHP price, and invoice process.
- Review source, permission, date, service context, incentive disclosure, moderation rules, and evidence that no review was fabricated or selectively altered.
- Customer review-and-correct step before confirmation, durable order record, acknowledgement, cancellation/refund process, complaint/redress route, and BIR-compliant invoice workflow.
- Counsel's decision on senior-citizen and PWD discount/VAT-exemption duties for every applicable lodging, recreation, or other service, with an accessible verification process before payment.
- Cloudflare account audit covering access logs, Web Analytics, Zaraz, Turnstile, cookies, retention, subprocessors, cross-border transfers, security controls, and an incident contact.

## Changes that trigger more work

### Before forms, analytics, cookies, or advertising pixels

Map every data field and recipient. Establish the lawful basis, purpose, notice, retention period, security controls, rights-request channel, processor terms, and cross-border transfer position. Give the notice at or before collection. Do not assume a cookie banner alone makes tracking lawful. Recheck Cloudflare features at deployment because repository inspection cannot prove account-level collection is disabled.

### Before ads, promotions, discounts, comparisons, or testimonials

Keep a dated substantiation file for each objective or special claim. State the complete promotion mechanics, duration, eligibility, inventory limits, price basis, and permit number when a permit is required. Do not fabricate, suppress, or misrepresent consumer reviews. Verify whether DTI sales-promotion approval is required before publishing.

### Before booking, ordering, or payment

Publish verified seller identity and address, total PHP prices, tax and fee treatment, service/product descriptions, availability basis, payment and fulfilment terms, cancellation/refund rules, complaint handling, privacy notice, and invoice details. Let the customer review and correct the order before confirmation. Add security and incident procedures for the payment and booking vendors. Confirm the accommodation, adventure-sport, transport, and local-permit classifications with DOT, DTI, the LGU, BIR, and counsel.

## Recommended controls

Maintain a claim register that links each public statement to an owner, source, review date, and expiry date. Keep dated inventory and price exports. Require a second-person check for schema, promotions, reviews, and generated imagery. Re-run the content and export tests after every copy or integration change, and schedule a quarterly owner review of availability, prices, credentials, permits, terms, and Cloudflare settings.

## Open legal questions

- **Website classification:** RA 11967 uses transaction language, while the IRR and JAO 22-01 expressly cover an online offer and orders initiated online. Counsel should decide whether the current pages and prefilled WhatsApp links are already an e-retail offer, even with the enquiry boundary.
- **E-Commerce Philippine Trustmark:** DTI's 2025 release described registration as mandatory, while the current official Trustmark FAQ and guideline contain voluntary language and the FAQ is internally inconsistent. Obtain a written current position from the DTI E-Commerce Bureau or counsel before making a Trustmark claim or treating it as a release requirement.
- **Tourism classification:** Confirm which services Hangin operates, brokers, or merely refers, and whether each is a primary or secondary tourism enterprise requiring DOT accreditation or other permits.

## Primary official sources

- [Republic Act No. 7394, Consumer Act of the Philippines](https://lawphil.net/statutes/repacts/ra1992/ra_7394_1992.html)
- [Republic Act No. 11967, Internet Transactions Act of 2023](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html)
- [Joint Administrative Order No. 24-03, IRR of RA 11967](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf)
- [Joint Administrative Order No. 22-01, Guidelines for Online Businesses Reiterating the Laws and Regulations Applicable to Online Businesses and Consumers](https://ecommerce.dti.gov.ph/wp-content/uploads/2023/05/JointAdministrativeOrderNo.22-01-1.pdf)
- [DTI release on JAO 22-01 and private-message pricing](https://www.dti.gov.ph/dti-news-archived/dti-joint-administrative-order-on-online-business-released)
- [Republic Act No. 9593, Tourism Act of 2009](https://lawphil.net/statutes/repacts/ra2009/ra_9593_2009.html)
- [DOT 2025 Citizen's Charter](https://beta.tourism.gov.ph/wp-content/uploads/2025/04/2025-DOT-Citizens-Charter.pdf)
- [BIR Revenue Regulations No. 7-2024](https://bir-cdn.bir.gov.ph/BIR/pdf/RR%20No.%207-%202024.pdf)
- [BIR Revenue Memorandum Circular No. 77-2024 digest](https://bir-cdn.bir.gov.ph/BIR/pdf/RMC%20No.%2077-2024%20Digest.pdf)
- [National Privacy Commission, right to be informed](https://privacy.gov.ph/the-right-to-be-informed/)
- [NPC Circular No. 2023-04, consent guidelines](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf)
- [NPC Advisory Opinion No. 2017-047, cookies](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC_AdvisoryOpinionNo._2017-047.pdf)
- [DTI E-Commerce Philippine Trustmark FAQ](https://trustmark.dti.gov.ph/faqs)
- [DTI E-Commerce Philippine Trustmark guideline](https://trustmark.dti.gov.ph/guideline)
- [DTI 2025 Trustmark deadline release](https://www.dti.gov.ph/dti-latest-news/dti-sets-sept-30-deadline-mandatory-trustmark-registration)
- [NCDA Joint Memorandum Circular No. 01, series of 2022, senior/PWD online-purchase benefits](https://ncda.gov.ph/disability-laws/joint-circulars/jmc-no-01-s-2022-guidelines-on-the-provision-of-the-mandatory-statutory-benefits-and-privileges-of-the-senior-citizens-and-persons-with-disabilities-on-their-purchases-through-online-e-commerce-a/)
- [Republic Act No. 9994, Expanded Senior Citizens Act of 2010](https://lawphil.net/statutes/repacts/ra2010/ra_9994_2010.html)
