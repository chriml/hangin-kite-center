# Website terms and consumer-contract review

Status: Current
Scope: Current internal research; proposed operational decisions remain unaccepted
Correction date: 2026-09-04
Original research snapshot: worktree `3fad`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](integration-corrections-sources.md).

Research date: 4 September 2026
Scope: the public Hangin Kite Center website and the path from a website inquiry to a future confirmed booking or online payment.

> This is an implementation research record, not legal advice. Final legal text and every business-specific conclusion must be reviewed by a Philippine lawyer before publication or before Hangin accepts an online booking or payment.

## Executive finding

The current site markets lessons, rental, storage, accommodation, shop items and kite safaris, then sends visitors to WhatsApp or email. It has no website checkout, booking form or payment flow. That makes a narrow website-use and inquiry page appropriate now. It does not make full booking, cancellation, refund, rental-damage or weather terms safe to publish: the repository does not establish the legal operator, exact address, prices, taxes, fulfilment model, payment process, accreditation status or owner-approved policies needed for those terms.

The safest current compliance assumption is that the site is within the Internet Transactions Act framework. Republic Act No. 11967 defines an internet transaction as an online sale or lease, while its 2024 implementing rules expressly include an online **offer for sale** and define an e-retailer as a person selling or offering goods or services through its own website. A static inquiry site sits near the boundary between those formulations, but relying on the narrower reading would leave material regulator-facing requirements unaddressed.

The integration keeps `/terms/` limited to factual website and inquiry guidance, contact routes and preservation of mandatory consumer rights. The statutory redress analysis below informs the internal handoff; it is not an owner-approved complaint timetable, booking policy or governing-law clause. Check the integrated page and fresh release evidence before describing public implementation.

## Evidence and timing

| Status | Evidence-backed conclusion | Primary official authority |
| --- | --- | --- |
| Current, with a scope ambiguity | The 2024 rules cover a sale **or offer for sale** over the internet and an e-retailer offering services through its own website. Treat the present service-marketing site as covered unless Philippine counsel or DTI confirms otherwise. | [RA 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html), signed 5 December 2023, secs. 3 and 4; [DTI Joint Administrative Order No. 24-03](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf), issued 24 May 2024, rule II and secs. 2, 34. |
| Current | An e-retailer's homepage must disclose its corporate and trade or business name, a physical shop or place-of-business address, and a mobile or landline number and a valid email address. The site has the Hangin name and contact details, but “Bulabog Beach, Boracay” has not been verified as the legally sufficient physical address. | [RA 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html), sec. 23(f)(1); [JAO 24-03](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf), sec. 34.4. |
| Current | Online service listings must show an accurate price and the total price and charges. DTI's e-commerce rules say a price supplied only through a private or direct message violates the Price Tag Law. The repository currently publishes no prices, taxes or charge rules. | [RA 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html), sec. 23(a); [DTI Joint Administrative Order No. 22-01](https://ecommerce.dti.gov.ph/wp-content/uploads/2023/05/JointAdministrativeOrderNo.22-01-1.pdf), issued 4 March 2022, secs. 5 and 8.3; [JAO 24-03](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf), secs. 30 and 34.1. |
| Current | A service provider with a website or online presence must conspicuously display the BIR Registration Seal Badge rather than expose the full certificate of registration. The repository contains no verified badge or BIR registration data. | [BIR Revenue Memorandum Circular No. 38-2026](https://bir-cdn.bir.gov.ph/BIR/pdf/RMC%20NO.%2038-2026.pdf), issued 29 April 2026. |
| Current | Advertising and service descriptions must not misstate characteristics, quality, availability, price advantages, warranties, remedies or material conditions. Statutory remedies for a defective or improperly performed service cannot be reduced by a supplier's standard terms. | [Consumer Act, RA 7394](https://lawphil.net/statutes/repacts/ra1992/ra_7394_1992.html), approved 13 April 1992, arts. 50, 52, 99, 102, 105, 106 and 110; [DTI guidance on “No Return, No Exchange”](https://fairtrade.dti.gov.ph/faq/is-no-return-no-exchange-policy-allowed/). |
| Current | An accessible internal complaint route is required. Under the Internet Transactions Act, the internal mechanism is treated as exhausted when a complaint remains unresolved after seven calendar days. | [RA 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html), secs. 23(i) and 24; [JAO 24-03](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf), secs. 34.8 and 38; [DTI Consumer Care](https://consumercare.dti.gov.ph/). |
| Current when a booking is made electronically | Offers, acceptances and contracts may be electronic. Hangin should retain an accessible, accurate record of the accepted terms, parties, date and time, confirmation and related payment evidence. | [E-Commerce Act, RA 8792](https://lawphil.net/statutes/repacts/ra2000/ra_8792_2000.html), approved 14 June 2000, secs. 6-8, 12, 13 and 16. |
| Current before taking payment | A registered invoice is required for services at the statutory threshold, on request below it, and for every VAT-taxpayer sale. Separately, RA 11967 section 23(h) requires covered e-retailers and online merchants to issue paper or electronic invoices or receipts for all sales. RR 26-2025 gives covered small, medium and large e-commerce taxpayers until 31 December 2026 to comply with electronic-invoice issuance; micro taxpayers are exempt from that e-commerce category, although another covered category may apply. Electronic sales reporting has a separate system-readiness and Revenue Regulations trigger. Confirm Hangin's classification with its accountant and check for later BIR changes before reliance. | [Ease of Paying Taxes Act, RA 11976](https://lawphil.net/statutes/repacts/ra2024/ra_11976_2024.html), approved 5 January 2024, sec. 21 amending NIRC sec. 237; [BIR RMC No. 77-2024](https://bir-cdn.bir.gov.ph/BIR/pdf/RMC%20No.%2077-2024.pdf), issued 11 July 2024; [CREATE MORE Act, RA 12066](https://lawphil.net/statutes/repacts/ra2024/ra_12066_2024.html); [BIR Revenue Regulations No. 26-2025 digest](https://bir-cdn.bir.gov.ph/BIR/pdf/RR%20No.%2026-2025%20Digest.pdf), issued 16 October 2025; [RA 11967, sec. 23(h)](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html). |
| Business classification unresolved | Adventure sports, accommodation, shops and sports or recreation centers are tourism enterprises. DOT accreditation is mandatory for primary tourism enterprises and voluntary for secondary enterprises. The repository does not establish whether Hangin is a secondary adventure-sports operator, a surf camp, an accommodation establishment, or a travel or tour operator for safaris. | [Tourism Act, RA 9593](https://lawphil.net/statutes/repacts/ra2009/ra_9593_2009.html), approved 12 May 2009, secs. 3, 14 and 39; [DOT 2025 Citizen's Charter](https://beta.tourism.gov.ph/wp-content/uploads/2025/04/2025-DOT-Citizens-Charter.pdf), including accreditation services for surf camps, accommodation establishments and travel or tour services. |
| Business classification unresolved | Public-accommodation access and safety criteria must not unlawfully discriminate against a person with a disability. Senior-citizen and PWD discounts and VAT treatment may apply if the business or a service is legally a recreation center or another covered establishment. Confirm the classification and calculation before publishing prices or building checkout. | [Magna Carta for Disabled Persons, RA 7277](https://ncda.gov.ph/disability-laws/republic-acts/republic-act-7277/); [RA 10754](https://lawphil.net/statutes/repacts/ra2016/ra_10754_2016.html); [BIR Revenue Regulations No. 5-2017](https://ncda.gov.ph/disability-laws/implementing-rules-and-regulations-irr/revenue-regulations-no-5-2017-rules-and-regulations-implementing-republic-act-no-10754/); [Expanded Senior Citizens Act, RA 9994](https://lawphil.net/statutes/repacts/ra2010/ra_9994_2010.html?authuser=0). |
| Before forms, analytics, advertising or a customer database | A terms page is not a privacy notice. Before collecting personal data on the site, deploying non-essential tracking, or reusing inquiry details for marketing, document the lawful basis, purposes, recipients, retention, rights and contact route, then publish an appropriate privacy notice and consent mechanism where consent is relied on. Hosting and security logs also require a separate data inventory. | [Data Privacy Act, RA 10173](https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html); [NPC Circular No. 2023-04](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf), issued 7 November 2023; [NPC guidance on the right to be informed](https://privacy.gov.ph/the-right-to-be-informed/). |
| Recommended practice, not binding law by itself | DTI's voluntary national standard recommends complete service, tax, payment, fulfilment and refund information, an after-payment confirmation with billing details, and a clear complaint path. | [DTI-BPS announcement of PNS 2155:2020](https://bps.dti.gov.ph/press-releases/28-2021/259-dti-issues-national-standard-guidelines-for-e-commerce-transactions), published 21 January 2021. |

The eighteen-month transition in RA 11967, section 32, has expired. The Internet Transactions Act requirements should not be treated as future-only.

## Original drafting scope and integration limits

The earlier task proposed the statements below. Integration publishes only factual website inquiry guidance and mandatory-rights preservation; commercial commitments and descriptions of how Hangin contracts require owner confirmation. The list remains an internal drafting checklist:

- the current website supplies information and routes inquiries but does not itself take bookings or payments;
- a WhatsApp message or email inquiry does not reserve a service;
- the particular service, date, total price, payment steps, cancellation and rescheduling terms must be provided and accepted separately before a booking is made;
- electronic messages and confirmations can form part of a contract and should be kept;
- general beach and wind content does not replace current conditions checks, instructor briefings or on-site safety directions;
- third-party providers and their contract terms must be identified before payment;
- mandatory consumer rights, statutory warranties and non-excludable liability remain in place; and
- complaints may be sent to the verified email or WhatsApp contact, with DTI Consumer Care available after the statutory internal-redress point.

The page does not claim acceptance of website terms by passive browsing. It does not create a liability waiver. It does not state a refund, cancellation, rescheduling, weather, rental-deposit, damage, room, safari or payment policy that the owner has not supplied.

## Current-site blockers and owner decisions

These items are needed even if the website remains inquiry-only:

- **Legal operator.** Supply the exact registered sole proprietor, partnership or corporation name; DTI or SEC registration; authorized trade name; and the person authorized to contract and resolve complaints.
- **Physical address.** Confirm the complete physical shop or place-of-business address that should appear on the homepage. “Bulabog Beach, Boracay” is not enough to establish the statutory disclosure.
- **BIR display.** Obtain the active BIR Registration Seal Badge and its approved destination or verification link. Confirm with the accountant that the badge corresponds to the contracting taxpayer. Do not publish a certificate number from an unverified document.
- **Public prices.** Approve a Philippine-peso price list for every service or item offered online. State what is included, all taxes and mandatory charges, unit and duration, variable-price rules, and the date or season to which each price applies. A “message for price” model is not a safe substitute.
- **Regulated claims.** Verify every public statement about instructor certification, services, availability, equipment and facilities against current records. If a regulated profession is involved, determine whether professional membership or accreditation information must be displayed.
- **Complaint operations.** Name the person responsible for the complaint inbox and WhatsApp account; decide how receipt is acknowledged, how the seven-day clock is tracked, how evidence and outcomes are retained, and when a complaint is escalated.
- **Tourism and local permits.** Have Philippine counsel or DOT classify each line of business. Confirm current LGU permits and whether Hangin or a supplier needs DOT accreditation as a surf camp, accommodation establishment, travel or tour operator, or another primary tourism enterprise.
- **Discounts.** Confirm whether Hangin and each service are covered by the senior-citizen and PWD discount and VAT rules, what evidence may lawfully be requested, and how the discount appears on the invoice.
- **Data map.** Identify what WhatsApp, email, hosting, CDN, security logs and any future form, analytics or advertising vendor process. Complete the separate privacy, processor-contract, retention and NPC registration or exemption review.

## Decisions required before booking or payment goes online

### 1. Contract formation and evidence

- Identify the contracting legal entity and customer.
- Decide whether the website display is an invitation to inquire or a firm offer, who accepts, and the exact point when a booking becomes binding.
- Define what a quote contains and how long it is valid.
- Present the booking terms before the final commitment, require an affirmative acceptance, and prevent submission until the customer can review the complete order and total.
- Record the accepted terms version, service schedule, customer acceptance, date and time, quote or order identifier, and confirmation delivery.
- Define the confirmation content: operator identity and contact, customer, service scope, date and place, total and payment status, cancellation and rescheduling rules, third-party provider where applicable, and complaint route.

### 2. Service scope and prerequisites

- For each lesson, rental, storage, stay, shop sale and safari, state the deliverable, duration, participant count, location, included equipment or support, exclusions and prerequisites.
- Define current, evidence-based rider-level, age, health, swimming, guardian and identification requirements. Safety eligibility criteria must be necessary and applied individually, not as a blanket disability exclusion.
- Define attendance and late-arrival rules and the consequences of an incomplete or delayed service.

### 3. Price, taxes, fees and discounts

- Set the complete price in Philippine pesos before commitment, including VAT or other taxes and every mandatory booking, service, card, transfer, deposit, delivery or convenience charge.
- Identify optional charges separately and require the customer to choose them.
- Set the rules for deposits, balances, due dates, foreign-currency displays and exchange-rate risk.
- Implement any required senior-citizen or PWD discount and VAT treatment consistently in the displayed total, payment request and invoice.
- Never hide a mandatory charge until payment or supply prices only by direct message.

### 4. Payment and chargebacks

- Select the merchant of record, payment provider, accepted methods, settlement currency and party bearing payment-processor charges.
- Confirm the provider's security, refund and dispute process and identify when Hangin receives only a payment token rather than card data.
- Define failed, duplicate, partial, reversed and disputed payments; suspected fraud; chargeback evidence; and customer support ownership.
- Do not require a customer to surrender statutory rights or card-scheme dispute rights.

### 5. Invoices, confirmations and records

- Have the accountant configure BIR-registered invoices for the correct taxpayer, invoice threshold, VAT status and transaction type.
- Have the accountant confirm whether Hangin falls within the electronic-invoice categories due by 31 December 2026 under RR 26-2025, including the small/medium/large e-commerce category and any independent category. Record the separate electronic-sales-reporting activation trigger; do not equate it with the invoice deadline.
- Send a durable electronic confirmation and invoice or receipt record to the customer and retain an accessible, accurate business copy under the E-Commerce Act and applicable tax-retention rules.
- Version booking terms and keep the exact version accepted with the transaction record.

### 6. Cancellation, rescheduling and refunds

- Write separate rules for customer cancellation, customer no-show or late arrival, Hangin cancellation, unsafe conditions, supplier cancellation and force-majeure events.
- State notice deadlines, calculation method, non-refundable components that are lawful and justifiable, rescheduling rights, credit validity, refund method and refund timing.
- Define who decides that a lesson or trip cannot safely proceed, what objective information is considered, and what substitute, reschedule, credit or refund follows.
- Do not advertise a universal “no refund” rule or use cancellation terms to displace remedies for a defective, misdescribed or improperly performed service.
- No general Philippine cooling-off right for every scheduled leisure service was identified in the reviewed authorities. Do not promise one or deny one categorically without counsel checking the final sales method and service.

### 7. Wind, weather, water and safety changes

- Separate foreseeable weather or wind variability from a legally exceptional event. A broad “force majeure” label should not decide every conditions-related change.
- Define whether an instructor may change location, time, equipment, group size or lesson plan for safety; the limits of that discretion; and the customer's remedy if the substitute is materially different.
- Set the order of remedies for an operator-led safety change: suitable substitute, reschedule, credit or refund, as approved by the owner and counsel.
- Keep assumption-of-risk wording factual and activity-specific. Do not waive liability for fraud, negligence, a defective service, unsafe equipment, or another responsibility that law does not allow Hangin to exclude.
- Contractual risk allocation remains subject to the Consumer Act and Civil Code limits. See [Civil Code, RA 386](https://www.lawphil.net/statutes/repacts/ra1949/ra_386_1949.html), arts. 1159, 1171, 1173, 1174, 1306, 1308, 1315 and 1318-1319.

### 8. Rental deposits, loss and damage

- Identify the rented kit and its condition at handover and return, using a signed or timestamped checklist and photos where proportionate.
- State the security-deposit amount, custodian, permitted use, refund method and deadline.
- Distinguish ordinary wear, pre-existing damage, accidental damage, negligent or prohibited use, loss and theft.
- Define the evidence and valuation method for repair or replacement, depreciation where appropriate, customer review, partial deductions and the dispute route.
- Never leave the amount payable solely to Hangin's unreviewable discretion or charge a damage deduction without evidence.

### 9. Accommodation, safaris, transport and third parties

- For every component, decide whether Hangin is the principal supplier, disclosed agent, reseller or referral source.
- Identify the actual provider, accreditation or permit status where applicable, service address, inclusions, total price, cancellation rules and complaint owner before payment.
- State who collects money, issues the invoice, changes a date, handles an incident, pays a refund and responds to a card dispute.
- If Hangin combines accommodation, transport or guided travel services, obtain advice on travel or tour operator classification and mandatory DOT accreditation before marketing or taking payment for the package.
- Supply the third party's applicable terms before the customer commits. A generic link after payment is not enough.

### 10. Statutory rights and warranties

- Preserve Consumer Act remedies for a service that is defective, unsafe, misdescribed or improperly performed, including lawful re-performance, refund, price reduction and damages as applicable.
- Do not use disclaimers to reduce the legal guarantee, future-fraud responsibility or non-excludable indemnity obligations.
- Ensure advertising, FAQs, confirmations and customer-support scripts match the contract and actual service.

### 11. Complaints, law and disputes

- Provide an accessible internal route and record the date of receipt, substance, evidence, actions and outcome.
- State Philippine governing law only to the extent lawfully applicable.
- Do not impose an exclusive court, venue, arbitration, class-action waiver or cost allocation until Philippine counsel confirms that it is fair, enforceable and does not obstruct DTI or other mandatory consumer remedies.
- Tell customers about DTI Consumer Care at the appropriate point without suggesting it is their only remedy.

### 12. Privacy and marketing dependencies

- Keep contract acceptance separate from optional marketing consent.
- Give the privacy notice before the relevant collection and use plain, specific choices if relying on consent.
- Minimize booking-form fields; set retention for inquiries, waivers, incident reports, invoices and payment evidence; and document processor and cross-border arrangements.
- Do not deploy analytics, advertising pixels, session replay or non-essential cookies until their data flows and consent requirements have been reviewed.

## Recommended contract architecture

Use a short set of documents with distinct jobs:

1. **Website use and inquiries.** The implemented public page. It governs browsing and clarifies that contact is only an inquiry.
2. **Booking terms.** Versioned terms presented with the complete quote or before the checkout commitment. These contain formation, payment, cancellation, refund, conditions, statutory-rights and complaint provisions.
3. **Service schedule.** A lesson, rental, storage, accommodation, retail or safari-specific description attached to the booking record.
4. **Privacy notice and choices.** Separate from the contract, supplied before personal-data collection.
5. **Confirmation and invoice.** Durable customer records identifying the contract, accepted terms version, payment status, operator and complaint route.

The booking record should make it possible to prove what the customer saw, what they affirmatively accepted, when they accepted it, what was confirmed and what was paid.

## Unresolved legal and factual questions

- The Act's statutory definition focuses on an online sale or lease, while the IRR includes an online offer for sale. Counsel or DTI should confirm how the present inquiry-only site is classified, although compliance planning should use the broader IRR treatment.
- The repository cannot determine whether Hangin is a secondary adventure-sports enterprise, a surf camp or sports and recreation center, an accommodation establishment, or a travel or tour operator. Accreditation and insurance consequences differ.
- The applicability and calculation of PWD and senior-citizen benefits depend on the business and service classification and the customer and transaction facts.
- Current invoice issuance is required. RR 26-2025 fixes 31 December 2026 for the covered electronic-invoice categories; Hangin's taxpayer classification is unresolved. Electronic sales reporting has a distinct activation condition. Obtain an accountant/BIR determination and check for later amendments before reliance.
- The DTI JAO 22-01 landing page describes a 24 March 2022 issuance date, while the signed instrument and DTI's related-law index identify 4 March 2022. The instrument date is used here; this discrepancy does not change the cited rules.
- The reviewed general authorities do not supply one universal customer-cancellation or weather-refund formula for these scheduled services. The owner must set a fair, specific policy, and counsel must test it against the Consumer Act, Civil Code and the exact fulfilment model.
- Current registration, permits, insurance, certifications, contracting-party roles, supplier agreements and operational policies were not present in the repository and were not assumed.

## Implementation boundary

No checkout, payment button, booking form, contract-acceptance control or liability waiver should be added until the blockers above are resolved and Philippine counsel has approved the booking terms and transaction design. Any future implementation should start with tests for price visibility, full pre-commitment disclosure, affirmative acceptance, terms-version retention, confirmation, invoices, complaint access and statutory-rights language.
