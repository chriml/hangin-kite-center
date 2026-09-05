# Merchant identity, permits and registration badges

Status: Current
Scope: Current internal evidence record; publication procedure proposed for owner adoption.
Evidence checked: 2026-09-04. Baseline: `0b5ec7d` and current `content/site.ts` / `docs/project/product.md`.

Philippine-lawyer and accountant review is required for business-specific applicability, final legal disclosures and registration decisions. No registration, permit, tax status, accreditation or Trustmark has been verified for Hangin in this audit.

## Current facts and scope

Hangin Kite Center, Bulabog Beach, Boracay, the established year 2002, published phone/email, service categories and IKO/VDWS instruction are confirmed project facts. Legal entity/proprietor, exact service address, registration identifiers, permits, tax status and current individual credentials are absent. The website is a static introduction with WhatsApp/email contact; no checkout exists. This does not establish that the business makes no internet transactions: the owner must describe quoting, acceptance, deposits and sales through WhatsApp, email and other channels.

## Evidence table

All sources were accessed on 2026-09-04; issue dates are shown separately.

| Source | Present implication | Trigger or unresolved application |
| --- | --- | --- |
| [DTI BNRS FAQ](https://bnrs.dti.gov.ph/faq), undated live guidance | Business-name registration establishes identity but does not replace the Business/Mayor's Permit. | Owner supplies entity type; use DTI/SEC/CDA evidence appropriate to it. Do not request DTI registration for every legal form indiscriminately. |
| [RA 11967, §23(f)(1)](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html), enacted 2023-12-05 | Covered e-retailers publish corporate/trade name, physical business address, phone and email on the homepage, with regulated-profession membership detail where relevant. | Determine actual internet-selling behavior. A static front end alone is not an exemption. Supporting identity documents submitted to an authority are not automatically documents to publish publicly. |
| [RA 11967, §§23(h)–(i),24](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html) | Covered sales require invoices/receipts and an accessible complaints mechanism. Internal redress is deemed exhausted after seven calendar days unresolved. | Website/off-site sales and later commerce need coordinated commercial terms and complaint records. This is not a guarantee that every complaint will be resolved in seven days. |
| [BIR RMC 38-2026, pp.1–3, items 4–6](https://bir-cdn.bir.gov.ph/BIR/pdf/RMC%20NO.%2038-2026.pdf), issued 2026-04-29 | Online-presence/service-provider wording is broad. Covered taxpayers must secure the BIR Registration Seal Badge. Item 6.1 specifies posting only the seal; 6.2 allows extracting it instead of uploading the registration document. | Owner/accountant confirms coverage and obtains the authentic seal. Do not publish a full COR/eCOR as an interchangeable alternative or invent a badge. |
| [DTI Trustmark FAQ](https://trustmark.dti.gov.ph/faqs), undated live guidance | The first answer says e-commerce participants must register, while “Is the Trustmark mandatory” says application is voluntary. Record this unresolved contradiction; do not select a categorical answer from one paragraph. | Owner/counsel obtains current written clarification from DTI and determines Hangin's transaction scope. No application, payment or agency contact is authorized by this report. |

The BIR circular's item 5 permits a website page/link such as About or Business Permits. Item 6.3 requires a readable, unaltered seal preserving design elements. Verify the supplied QR destination against the official BIR verification domain, including `verify.bir.gov.ph`, before trusting it. Do not crop off parts of the seal or recreate it in brand colours. These details were checked against the retrieved circular and its locally rendered pages 1–3.

## Exact owner intake

Provide evidence through restricted business storage, not this repository. Record reference IDs and approved public values here when available.

| Responsible role | Required facts/evidence | Publication decision |
| --- | --- | --- |
| Business owner | Legal entity/proprietor and entity type; registered and trade names; exact physical place of business and service address; authority to publish each contact detail. | Populate precise homepage identity only after verification. Do not substitute “Bulabog Beach” for an unconfirmed complete legal address. |
| Business owner / corporate administrator | Current DTI business-name, SEC or CDA registration as applicable; document validity and scope; relationship between the registered entity and Hangin trade name. | Publish only required, approved fields, not ID scans or full source files. |
| Local operations owner | Current Malay LGU Business/Mayor's Permit, branch/site scope and activity classification; any applicable premises, fire, sanitary, marine, tour or activity permissions. | Ask the issuing authority/counsel which permits apply to the actual premises and services. This list is an intake, not a finding that every listed permit applies. |
| Tax representative | BIR registration status, activity classifications, VAT/non-VAT treatment, actual online channels, authentic BIR Registration Seal Badge and verified QR/link. | Post authentic seal only when supplied and reviewed. Keep the full COR/eCOR and tax identifiers out of Git unless a specific lawful publication requirement is established. |
| Accommodation / safari operator | Who contracts with the guest; accommodation ownership/operation versus referral; safari transport and guide operators; relevant tourism classification/accreditation evidence. | Do not claim DOT accreditation or operator partnerships before evidence. Determine required accreditation with the competent authority. |
| Trustmark owner | Current issued badge, certificate reference, 14-digit verification number, official verification URL/QR, issue/expiry dates, scope/channels, current suspension/revocation state and renewal owner. | Publish only an issued, verified badge within scope. No “DTI approved quality” or business endorsement claim. |
| School manager | Current instructor credentials, scope, expiry and approved IKO/VDWS wording when detail is proposed. | Preserve confirmed general instruction; do not infer individual status, school affiliation or permissions for logos. |
| Site maintainer | Named publication approver, renewal backup, scheduled review/removal dates and deployment/cache access. | Close static expiry control before any expiring credential is published. |

## Minimal publication scaffold

The completed scaffold is this intake and procedure. An empty identity registry or speculative badge component provides no visitor benefit. Continue using confirmed identity/contact facts; add verified fields and one plainly labelled link/image only when evidence arrives. Do not render “pending permit”, blank badge placeholders or false registration claims. Any authority submission or production publication requires the separate explicit authorization already required by the repository.

A credential record needs only the verified public label, issuing authority, public verification URL, approved local badge path if applicable, issue/expiry date when the credential has one, private evidence reference, verifier/date, scope, renewal owner and publication approval. Do not force an invented expiry onto BIR or another credential that does not specify one.

## Static publication, renewal and removal

A build-time date check cannot remove content after deployment. The approved process must name a human owner and backup before publishing an expiring badge. Record the exact public URL, issue/expiry time and applicable timezone, renewal review date, removal deadline, deployment owner and cache verification step. No scheduled job or production change is created by this document.

For a Trustmark, the current FAQ describes one-year validity and renewal filing between three months and 30 calendar days before expiry. Start the internal review early enough to meet that window. Record a removal deployment before expiry if renewed evidence is unavailable. A pending renewal is not evidence of continued validity. Suspension or revocation requires prompt removal under the FAQ; record the owner's notification route to the maintainer.

The maintainer prepares the replacement/removal on an isolated branch, builds fresh output and checks homepage/footer/credential URLs and QR readability. The owner authorizes production deployment. Verify the live HTML, original badge URLs, hosting caches and any other controlled published copies after deployment. Record who verified removal and when. If the team cannot guarantee this operational process, do not make an automated-expiry promise or publish an expiring optional badge.

## Verification and open gates

Completed: current facts read, source evidence table, BIR page inspection, Trustmark contradiction record, exact intake and static lifecycle design. No owner documents, authority accounts, permit databases or deployed badges were inspected. No tax or permit application was filed. Business coverage and public credential values remain blocked on the named evidence. Future UI implementation needs fresh export tests, readable badge/QR review, accessible link text, absence of full registration documents in `out/`, and authorized deployment verification.

## Related evidence

See the [written-resolution record for the Trustmark conflict](compliance-matrix.md#trustmark-conflict-requiring-written-resolution), the DOT/LGU entries in the [master compliance matrix](compliance-matrix.md), and the [source corrections and retrieval limits](integration-corrections-sources.md). These supplement this intake without adopting a business-specific registration conclusion.
