# Accessibility, PWD and senior rights

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal legal-scope and source-review record. Browser results must be supplied by the integration verification report.
Evidence checked: 2026-09-04. Repository baseline: `0b5ec7d` and the current product, design and accessibility documents.

Philippine-lawyer review is required for final legal text, statutory scope and each service's discount treatment. This report does not certify WCAG conformance, legal compliance, accessible premises or suitability for any participant.

## Scope and evidence

| Primary source; accessed 2026-09-04 | Current meaning | Limit or future trigger |
| --- | --- | --- |
| [DICT MC 2017-004, §§2–3](https://ncda.gov.ph/memorandum-circular-no-2017-004-prescribing-the-philippine-web-accessibility-policy-and-adopting-for-this-purpose-iso-iec-405002012-information-technology-w3c-web-content-accessibility-gu/), 2017 | The circular addresses government websites and participating private web-service providers. | It does not by itself establish that this independent private business website has a statutory WCAG 2.2 AA duty. Verify any government-provider relationship separately. |
| [RA 7277, §§35–36](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/3140), enacted 1992-03-24 | Equal enjoyment and non-discrimination requirements concern covered public accommodations, including relevant lodging, sales/rental and recreation establishments. | Legal review must assess Hangin's actual services, exceptions and reasonable modifications. Do not infer a physical-access claim from website checks. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/), W3C Recommendation | WCAG 2.2 AA is the project's engineering target for complete pages and interactive states. | Automated checks alone cannot establish conformance. New forms, booking and checkout add error, status, authentication and transaction-review requirements. |
| [RA 10754](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/11/66527), enacted 2016-03-23, and [IRR §§5.9,5.12,6.1,6.3](https://ncda.gov.ph/disability-laws/implementing-rules-and-regulations-irr/irr-of-ra-10754-an-act-expanding-the-benefits-and-privileges-of-persons-with-disability-pwd/) | Statutory PWD benefits cover specified lodging and recreation services, with the IRR addressing recreation facilities/equipment rental. | Confirm business classification, eligible service, exclusive use, evidence and tax treatment before publishing a Hangin-specific calculation. |
| [RA 9994](https://elibrary.judiciary.gov.ph//thebookshelf//showdocs/2/17035), enacted 2010-02-15, and [IRR, Rule IV recreation-centre provisions](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/56201), 2010 | Senior benefits cover specified services; the IRR includes sports-facility/equipment fees and rental. Statutory eligibility is not every tourist aged 60 or older. | Owner/accountant confirms eligible customers, service classification, VAT status, mixed groups, promotions and invoice treatment. |
| [DSWD explanation of JMC 1 s.2022](https://dswd.gov.ph/guidelines-on-discount-for-online-purchases-of-seniors-persons-with-disabilities-signed-dswd/), published 2022-05-31 | Covered statutory benefits extend to online/telephone/SMS purchases. A WhatsApp transaction is not safely treated as outside scope merely because it bypasses checkout. | The original [BIR-hosted JMC annex](https://bir-cdn.bir.gov.ph/local/pdf/RMC%20No.%2071-2022%20Annex%20A.pdf) initially failed to load; the 2026-09-05 source check below retrieved and inspected the original. Service classification and privacy-safe implementation remain owner decisions. Do not reuse the old commodity spending cap from the 2022 news article. |

This is a targeted review, not an exhaustive inventory of later local or sector-specific measures. Broader EU/UK applicability belongs in the separate territorial-scope review; do not infer it from a visitor's passport.

## Service-specific assessment

These are classification questions for existing off-site transactions as well as future website sales. Missing website prices do not remove an underlying business obligation.

| Service | Evidence-backed concern | Exact fact required |
| --- | --- | --- |
| Accommodation | Lodging is expressly covered subject to statutory/IRR definitions and exclusions. | Does Hangin operate the rooms, act as agent or only refer guests? Supply lodging type, contracting party, charges and any homestay facts. |
| Equipment rental | Recreation/sports equipment rental is specifically relevant under the cited IRRs. | Rental operator, place and use, standalone or bundled charge, classification and whether equipment is for the eligible person's use. |
| Lessons | Possible recreation-service coverage; no automatic finding that a kite lesson is an accredited educational tuition benefit. | Legal activity classification, lesson/instructor operator and separate versus bundled equipment/facility charges. |
| Storage | A storage fee is not established as covered by the sources read. | Standalone storage versus an inseparable part of covered recreation or lodging, and how it is invoiced. |
| Kite safaris | A package can include differently treated recreation, transport, accommodation and third-party services. | Itemised inclusions, each supplier/contracting party, transport type, beneficiary and invoice allocation. |
| Shop goods | No general 20% statutory discount on all retail merchandise follows from these sources. | Actual product categories and whether any item falls in a covered category or separate necessities/prime-commodities regime. |

PWD eligibility, prescribed proof and the no-double-discount rule are addressed in the [RA 10754 IRR §§11–12](https://ncda.gov.ph/disability-laws/implementing-rules-and-regulations-irr/irr-of-ra-10754-an-act-expanding-the-benefits-and-privileges-of-persons-with-disability-pwd/). Senior age/residency/citizenship criteria are in RA 9994 and its IRR. Never promise eligibility to every foreign visitor or combine statutory benefits without a reviewed calculation. Do not invent a blanket exclusion either.

## Current website evidence and browser handoff

Source documentation records an English page language, skip link, semantic landmarks, native navigation/FAQ disclosures, image alternatives, focus rules and reduced-motion CSS. It describes a 48px primary mobile target design rule. These are source-level controls, not measured browser results. The 48px project rule is distinct from WCAG 2.2's AA target-size criterion and its exceptions.

The earlier task contains palette calculations and source inspection only. No screen-reader session, keyboard traversal, zoom/reflow run or rendered-page audit is claimed here. The integration owner must attach actual dated results for every affected page and shared component:

| Check | Required evidence |
| --- | --- |
| Full keyboard path | Skip link reaches main; every header/footer/contact/FAQ control reachable and operable; visible focus and no traps; mobile disclosure open/closed states; no visual/DOM order conflict. |
| Reflow and zoom | 320 CSS-pixel width and 200% text resize; appropriate 400% browser zoom; no lost content, overlap or two-axis reading for ordinary text. Record browser, viewport and any exception. |
| Names and reading order | Main/landmarks, one useful H1, headings, meaningful link names, text for icons, generated art empty alt and informative photo alt. Confirm with an assistive-technology reading, not DOM assertions alone. |
| Contrast and focus | Computed text and non-text/control/focus colours on real backgrounds, including images; hover/focus/expanded states. Palette ratios alone are insufficient. |
| Motion and input | Reduced-motion setting, native disclosures, actual mobile target dimensions, orientation and no reliance on hover. |
| Contact and resilience | WhatsApp external/new-tab behavior explained accurately, email fallback, core information/contact paths usable without JavaScript. Do not send a message during testing. |
| Automated support | Fresh export plus maintained accessibility scanner where available; preserve violations and review results. No zero-issue score proves conformance. |

A new-tab announcement is a useful usability improvement, not by itself proof that its earlier absence failed WCAG AA. Historical pre-integration recommendation: a separate public accessibility page was optional until accepted. The owner subsequently authorized remediation and `/accessibility/` is implemented; see the integrated evidence below. Proposed wording: “Need help using this website? Email hanginkitecenter@gmail.com and tell us which page or step is difficult.” For physical access: “For access questions at Bulabog Beach, contact Hangin before your visit.” Neither line promises ramps, adapted gear, trained assistance or an accessible room.

## Owner intake and operating controls

The business owner appoints one person and backup for access requests and discount questions, confirms the existing email is monitored for these purposes, and supplies the actual assistance process. The operations owner records measured access facts: approach surface, steps, doorway/room/toilet constraints, transport access, available assistance and limits. Publish only verified facts and a last-review date. Participant suitability decisions need the separate safety/insurer procedure; do not screen out people by diagnosis or promise universal participation.

The accountant/counsel supplies a service-by-service benefit matrix, legal basis, rates/tax treatment, promotion/mixed-group rules, authorised proof types and invoice record requirements. The inbox/privacy owner then defines when evidence is needed, a suitable private collection method, staff access, retention and deletion. First-contact links must not request PWD/senior ID scans, diagnoses, passport details or payment information. Disability and health details can be sensitive personal information under [RA 10173, §§3,13](https://privacy.gov.ph/data-privacy-act/); a casual chat request is not a complete collection workflow.

Future ordering/booking must expose an accessible way to request applicable benefits before payment, without requiring marketing consent or a disability diagnosis in public fields. Test eligible/ineligible and mixed-party scenarios, corrected evidence, calculation errors, refunds, provider failure and a human fallback. No checkout, upload or discount promise is authorized or implemented by this report.

## Completion boundary

This report delivers the dated evidence table, current/future scope, service matrix, precise intake and browser acceptance checklist. Public discount terms, physical access claims and ID collection remain blocked on owner/legal evidence. The integrated browser/implementation evidence is linked below. Its unperformed screen-reader, actual zoom/device and production checks remain distinct verification work and do not become missing business facts.

## Integrated browser evidence

The authorized remediation added the public accessibility page and completed the bounded browser checks and fixes recorded in [the dated integration report](../operations/review-remediation-2026-09-04.md). That report supersedes the earlier task’s missing-browser-evidence status while explicitly recording screen-reader, real zoom/device, OS emulation and production checks that were not performed. It does not certify WCAG conformance.

## Original JMC source retrieved, 2026-09-05

The official NCDA landing page loaded, but its linked Drive file returned 404. The [BIR-hosted original through its indexed URL](https://bir-cdn.bir.gov.ph/local/pdf/RMC%20No.%2071-2022%20Annex%20A.pdf?external_url=https%3A%2F%2Fbir-cdn.bir.gov.ph%2Flocal%2Fpdf%2FRMC+No.+71-2022+Annex+A.pdf&label=DTI-DSWD-NCSC-NCDA-DOH-BIR-DILG+JMC+01-2022&type=EXTERNAL+LINK) was retrieved: 13 pages, SHA-256 `ea1f2f38db73c483d94d2d9281f2e4a135a418bd83b827ecea69e34d55d069d9`. Original pages 7–10 were rendered and visually checked.

Section 6.5 places status declaration before ordering and an ID image at order confirmation. Sections 6.6–6.7 address originals at delivery/performance; 6.8–6.12 cover phone orders; 6.13–6.16 cover representatives; §7 provides a manual fallback when the online system is unavailable. This closes the original-source retrieval gap. It does not justify ID collection in a general first enquiry or establish Hangin-specific eligibility, tax calculation or retention. Keep the service-classification and approved evidence-handling gates; review later amendments before implementation.
