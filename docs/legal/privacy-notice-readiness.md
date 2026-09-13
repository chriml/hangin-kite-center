# Privacy notice publication gate

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal research; proposed operational decisions remain unaccepted
Correction date: 2026-09-04
Original research snapshot: worktree `c077`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](integration-corrections-sources.md).

**Status on 4 September 2026: blocked from publication.**

This is an internal implementation record and drafting brief. It is not the website's privacy notice and is not legal advice. Do not publish it or link it from the footer. A public notice without the controller, DPO and retention facts below would leave out information required by the Philippine Data Privacy Act of 2012 and NPC guidance.

## Decision

Keep the current site on its narrow static boundary while the owner and Philippine counsel confirm the missing facts. Do not deploy the site or make the configured origin reachable without the completed notice. Do not add `/privacy` or a footer link yet. Publish a stand-alone notice and short point-of-collection messages in the same release once the facts in this document are resolved.

The source tree currently contains:

- a static Next.js export with no request-time application code;
- no on-site form, account, checkout, payment or booking system;
- no first-party analytics, advertising tag, cookie API, browser storage, iframe or third-party browser script;
- links that hand the visitor to WhatsApp or their email client;
- a configured public origin at `https://www.hanginkitecenter.com`, which did not resolve in DNS during the review on 4 September 2026; and
- no Cloudflare account settings that establish what the hosting platform injects, logs, retains or exports. The integrated static `_headers` file is a local configuration artifact, not evidence of effective deployed settings.

The repository check does not prove the deployed Cloudflare configuration. Cloudflare can collect network and log data while delivering a site, and some Cloudflare products can add browser measurement at the edge. Confirm the account configuration before launch.

## Current data map

| Activity | Data that may be involved | Purpose | Proposed lawful-basis analysis | Recipients and locations | Retention status |
| --- | --- | --- | --- | --- | --- |
| Static page request through Cloudflare | IP address, request URL, time, headers, referrer, device or network details, and security events | Deliver the requested page, operate the network and protect the site | Legitimate interest may be available for necessary delivery and security logs, but Hangin must document the purpose, necessity and balancing tests before relying on it | Hangin and Cloudflare or its subprocessors, subject to the actual account and contract | **Blocked:** confirm which Cloudflare logs and products are active, access, storage locations and exact deletion periods |
| WhatsApp inquiry | WhatsApp profile and phone details made available to the recipient, message text and any attachment the person sends | Reply to an inquiry and take steps requested by the person about a service | Contract or steps before a contract may cover information necessary to answer the person's request; confirm the workflow and do not reuse it for unrelated marketing | Hangin personnel with access, WhatsApp or Meta entities and their subprocessors, subject to the product and settings used | **Blocked:** confirm product, account access, backups, exports and exact deletion periods |
| Email inquiry | Sender address, display name and message header data, message text and any attachment | Reply to an inquiry and take steps requested by the person about a service | Contract or steps before a contract may cover information necessary to answer the person's request; confirm the workflow and do not reuse it for unrelated marketing | Hangin personnel with access, Google or Gmail and the sender's email provider, subject to the accounts and settings used | **Blocked:** confirm account type, access, backups, exports and exact deletion periods |
| Inquiry notes outside the website | Any copied contact details, service preferences, dates or correspondence | Follow up and arrange the requested service | Depends on the actual record and purpose. Minimize the record and assign a documented basis before keeping it | **Blocked:** identify every spreadsheet, address book, device, inbox and staff member or contractor with access | **Blocked:** define exact deletion periods and a repeatable deletion process |

There is no evidence in this repository of marketing lists, advertising, profiling or automated decisions. That finding is limited to the code. The owner must confirm off-site practices before the notice says they do not occur.

## Owner and counsel inputs required before publication

### Controller and DPO

- Exact natural person or juridical entity that determines why and how the data is processed.
- Legal form and the relationship between that entity and the public name `Hangin Kite Center`.
- Complete business or registered postal address. `Bulabog Beach, Boracay, Philippines` is not enough for a rights request or formal notice.
- DPO designation. NPC Advisory 2017-01 expects every personal information controller or processor to designate a DPO; an individual controller acts as the de facto DPO.
- DPO or data protection contact details for publication: title or designation, postal address, dedicated telephone number and dedicated email address. The person's name does not have to be published, but it must be supplied on a data subject's request.
- NPC registration or exemption status. Confirm the current threshold rules and whether a sworn declaration and undertaking is required. Do not display an NPC seal or registration number without the issued record.

### Systems and people

- Cloudflare product and plan: DNS-only or proxied, Pages or another host, Web Analytics, Browser Insights or RUM, edge analytics, Logpush, Workers, Turnstile, Zaraz, firewall and bot tools.
- Cloudflare account region, log access, exports, deletion controls, DPA and subprocessors.
- WhatsApp Business App or WhatsApp Business Platform, linked devices, cloud backups, exports and account administrators.
- Consumer Gmail or Google Workspace, linked clients, forwarding, recovery accounts, backups and account administrators.
- Every person, contractor and system that can see, copy or receive inquiries.
- Any paper record, phone contact, CRM, spreadsheet, calendar or booking record created after an inquiry leaves the website.
- Actual cross-border storage and access locations and the contractual or other safeguards used for each transfer.

### Purpose, basis and retention

- A specific purpose for each data category. Do not use a broad purpose such as improving services.
- The lawful basis chosen before collection. Consent is not a default and a privacy notice is not consent. If legitimate interest is used, complete and keep a legitimate-interest assessment covering purpose, necessity and balancing. If legal obligation is used, identify the actual law and record it with counsel.
- Exact retention periods or objective criteria for Cloudflare logs, WhatsApp messages, email, attachments, inquiry notes, backups and legal records.
- A secure deletion routine, including deletion from copied records and treatment of backups.
- Security controls, breach response, access review, staff instructions and the process for verifying and answering data-subject requests.

### Registration point for counsel

NPC Circular 2022-04 states registration thresholds using employee count, large-scale sensitive personal information processing and likely risk. Current NPC public materials are not fully consistent in how the 1,000-person threshold and effective date are described. Smaller controllers may also need to submit a notarized sworn declaration and undertaking for exemption. Confirm the current position with the NPC or Philippine counsel against Hangin's employee count, number and kind of records, processing risk and any data-protection registration already held.

## Public notice drafting specification

After the blockers are resolved, publish a stand-alone `/privacy` page linked from every page footer. Keep the first screen short, with links to the detailed sections below it. Give the same information before or at the point personal data is collected.

### Layer 1: quick read

Use verified plain-language statements covering:

- who the controller is and how to contact its DPO;
- what technical data the host receives when a page is requested;
- what Hangin receives when a visitor sends a WhatsApp or email inquiry;
- why each category is used and its lawful basis;
- who receives it and whether it is accessed or stored outside the Philippines;
- how long each category is kept; and
- how to exercise rights or complain to the NPC.

Do not say the site uses no analytics until the production Cloudflare settings are checked. Do not call the notice a consent form or make access to basic site information depend on accepting it.

### Layer 2: required detail

The full page must contain these sections with the confirmed values, not blanks or generic promises:

1. **Who handles your data:** controller's exact legal identity, trading name relationship, full postal address, and DPO contact details.
2. **What we receive:** separate categories for page delivery and security, WhatsApp inquiries, email inquiries, records made from inquiries, and any future booking, payment or analytics tool.
3. **Why we use it and the legal basis:** one specific purpose and basis for each category. Identify the legitimate interest where used and explain the right to object.
4. **Who receives it:** internal roles, processors and other recipients. Name Cloudflare, the relevant WhatsApp or Meta entity, Google or Gmail, and any later provider once contracts and product choices are confirmed.
5. **International access and transfers:** destination countries or practical location information, the reason for the transfer and the safeguard or contract relied on.
6. **How long it is kept:** exact periods or clear criteria by category, plus what happens in backups and when a legal hold applies.
7. **Your rights:** the rights to be informed, object, access, correct, erase or block data when the legal conditions apply, data portability where applicable, damages, and complaint to the NPC. Explain identity verification and the request channel. NPC Advisory 2021-01 generally requires action within 30 working days after the request and required documents are complete, with a possible 15-working-day extension for complexity or volume after notice to the requester.
8. **Automated decisions and profiling:** describe them, their logic and likely effects if any exist. If none exist across the real workflow, say so plainly.
9. **Security:** describe the practical safeguards at a level that informs the visitor without publishing details that would weaken them.
10. **Changes:** show the effective date and explain how material changes will be communicated through an available and appropriate channel. Do not promise individual email notice unless Hangin can reliably provide it.
11. **Complaints:** provide the DPO route and link to the NPC complaint page. Distinguish contacting the NPC from having a formal complaint given due course. Rule II, section 2 ordinarily requires written notice to the respondent and failure to take appropriate action or respond within 15 calendar days. The NPC may waive the prerequisites for good cause or qualifying serious violations. Do not describe the ordinary route as an absolute bar to contacting the regulator. See the [2021 NPC Rules of Procedure, as amended](https://privacy.gov.ph/wp-content/uploads/2024/03/2021-Rules-of-Procedure-of-the-NPC-As-Amended.pdf), Rule II, section 2, pages 4–5; checked 4 September 2026.

### Point-of-collection copy

Place a short notice next to each handoff once the full notice is published. Suitable copy for the current code, after the facts and link are complete:

> WhatsApp opens another service. If you send the message, Hangin receives the details available in your WhatsApp profile and anything you include. Read how Hangin handles inquiries.

> Email opens your mail app. If you send the message, Hangin receives your email address and anything you include. Read how Hangin handles inquiries.

Link `Read how Hangin handles inquiries` to the detailed notice. If a form, booking tool, payment tool or marketing signup is added later, write a separate just-in-time notice beside that control before it ships.

## Change control

The integrated safeguard uses `scripts/privacy-audit.mjs` for source/export regression checks and `scripts/audit-deployed-privacy.mjs` for deployed HTTP checks. Confirm their package wiring and actual test coverage in the current operations record before relying on a run.

These checks report known patterns; they do not prove that all tracking or personal-data processing is absent. Static analysis can miss computed or obfuscated code, dynamic resource creation and unmodelled browser APIs. HTTP inspection does not execute JavaScript or reproduce every challenge, region or account rule. Review clean-browser network and storage activity, actual vendor settings and off-site inquiry practices as separate evidence. A pass means only that the inspected inputs did not trigger the implemented rules.

## Source register

Research was checked against these primary sources on 4 September 2026:

| Source | Date | Rule used in this brief |
| --- | --- | --- |
| [Republic Act No. 10173](https://privacy.gov.ph/data-privacy-act/) | 15 August 2012 | Transparency, legitimate purpose, proportionality, lawful bases, notice contents, rights, security and controller accountability |
| [Implementing Rules and Regulations](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) | 24 August 2016 | Necessity, retention, lawful bases, security, DPO and accountability requirements |
| [NPC Advisory 2021-01](https://privacy.gov.ph/wp-content/uploads/2026/05/SGD-Advisory-DS-Rights-29-Jan-2021.pdf) | 29 January 2021 | Clear rights mechanisms, request handling time, layered notices and notice content |
| [NPC right to be informed](https://privacy.gov.ph/the-right-to-be-informed/) | Current page checked 4 September 2026 | Information that must be given before processing and distinction between notice and consent |
| [NPC Circular 2023-04](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf) | 7 November 2023 | Consent requirements, layered and just-in-time notices, and the rule that a privacy notice is not consent |
| [NPC Circular 2023-07](https://privacy.gov.ph/wp-content/uploads/2024/01/NPC-Circular-No.-2023-07_Guidelines-on-Legitimate-Interest_13-December-2023.pdf) | 13 December 2023 | Purpose, necessity and balancing tests and the requirement to document a legitimate-interest assessment |
| [NPC Advisory 2017-01](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC-Advisory-2017-01-sgd.pdf) | 14 March 2017 | DPO designation and publication of dedicated DPO contact channels |
| [NPC Circular 2023-06 in the 2023 compendium](https://privacy.gov.ph/wp-content/uploads/2024/05/2023-compendium-2.pdf) | 1 December 2023 | Privacy-management duties, privacy by default and retention controls |
| [NPC Privacy Toolkit](https://privacy.gov.ph/wp-content/uploads/2022/01/3rdToolkit_0618.pdf) | Current official download checked 4 September 2026 | Website notices for forms, cookies, beacons and covert collection, with a clear stand-alone page link |
| [NPC Circular 2022-04](https://www.privacy.gov.ph/wp-content/uploads/2023/05/Circular-2022-04.pdf), [registration FAQ](https://privacy.gov.ph/pips-and-pics/faqs/) and [exemption page](https://privacy.gov.ph/pips-and-pics/exemption/) | Circular dated 5 December 2022; pages checked 4 September 2026 | Registration thresholds and the exemption filing route that counsel must confirm against Hangin's facts |
| [NPC complaint page](https://privacy.gov.ph/file-a-complaint-2/) | Current page checked 4 September 2026 | Current regulator complaint route |
| [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) | Current page checked 4 September 2026 | Network, log and end-user data Cloudflare may process |
| [Cloudflare Web Analytics data collection](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/), [RUM beacon](https://developers.cloudflare.com/speed/observatory/rum-beacon/) and [Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/) | Current docs checked 4 September 2026 | Edge analytics, browser-beacon behavior and retention that must be checked in the actual account |
| [Cloudflare Customer DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) | Version 6.4, effective 3 April 2026 | Current processor terms to confirm for the account |
| [WhatsApp Business Data Processing Terms](https://www.whatsapp.com/legal/business-data-processing-terms) and [Business App Privacy Policy](https://www.whatsapp.com/legal/business-app-privacy-policy) | Terms updated 22 August 2025; policy effective 14 July 2025 | Controller and processor roles, data categories and transfers that depend on the WhatsApp product used |
| [Google Privacy Policy](https://policies.google.com/privacy?hl=en) | Effective 26 May 2026 | Email content, sender and recipient details, retention and controls that apply if the mailbox is consumer Gmail |
