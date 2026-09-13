# Cloudflare privacy and security runbook

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Proposed
Scope: Proposed operational/drafting policy; owner adoption unconfirmed
Correction date: 2026-09-04
Original research snapshot: worktree `4ed4`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](../legal/integration-corrections-sources.md).

**Review date:** 4 September 2026
**Scope:** Hangin Kite Center public website and its Cloudflare hosting boundary
**Audience:** owner, data protection officer (DPO), deployment administrator, and legal reviewer
**Status:** Proposed operational policy supported by current internal research; this file is not published by the application. Owner adoption and rehearsal remain unverified.

> **Philippine legal review required.** This runbook is an engineering and operations aid, not legal advice. A Philippine lawyer should confirm the controller identity, lawful bases, NPC registration or exemption path, transfer safeguards, retention schedule, incident decisions, and final public privacy notice before launch.

Do not copy this document into a public privacy notice. It deliberately records missing facts, internal controls, and security procedures.

## Status labels

- **Required now:** a duty or control that applies to the current processing boundary.
- **Decide and record:** the repository cannot establish the business or Cloudflare account fact; the owner and DPO must resolve it.
- **Before enablement:** a release gate for a feature that is not present in the current site.
- **Risk control:** a security measure recommended for this deployment; counsel should decide whether a specific implementation is legally required.

## Executive decisions

The current application is a static Next.js export. It contains no form, first-party API, cookies, analytics tag, advertising pixel, Zaraz tool, Turnstile widget, booking flow, or payment flow. It links visitors to WhatsApp, email, and telephone services outside the site. Cloudflare can still process network and administrator metadata when it serves the site.

The implementation therefore does three things:

1. It configures restrictive browser security headers in `public/_headers` for a future approved deployment. Effective deployed headers remain unverified.
2. It keeps analytics, forms, embeds, Turnstile, booking, and payments disabled until their data flows are reviewed.
3. It withholds a public privacy notice until the owner supplies the facts that the Philippine Data Privacy Act implementing rules require.

The source repository has no Cloudflare account ID, Pages project ID, zone settings, plan level, dashboard export, DNS record, or deployment workflow. On 4 September 2026, a DNS lookup and HTTPS request from the review environment could not resolve `www.hanginkitecenter.com`. That is one observation, not proof of the domain's global or historical state. Recheck from the production network and Cloudflare dashboard before launch.

## Evidence register

| Conclusion used in this runbook | Status | Primary source |
| --- | --- | --- |
| Processing must be transparent, for a declared legitimate purpose, proportionate, accurate, and retained only as long as necessary. | Required now | [Republic Act No. 10173, sections 11 and 13](https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html) |
| The controller must use reasonable organizational, physical, and technical security measures and remains accountable for personal information transferred to a third party in or outside the Philippines. | Required now | [Republic Act No. 10173, sections 20 and 21](https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html) |
| Before collection, or at the next practical opportunity, the data subject must receive the prescribed controller, purpose, basis, recipient, retention, rights, and complaint information. | Required now when personal data is collected | [RA 10173 Implementing Rules and Regulations, rule VIII, section 34](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) |
| A controller must designate an accountable individual or individuals, maintain records of processing, adopt retention and access policies, and bind processors by contract. | Required now | [RA 10173 Implementing Rules and Regulations, sections 26, 43, and 44](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) |
| Current security duties include a processing inventory, privacy impact assessment, privacy management program, training, privacy by design/default, retention, access control, processor contracts, continuity, secure disposal, log policies, threat management, and breach compliance. | Required now in proportion to the processing | [NPC Circular No. 2023-06](https://privacy.gov.ph/wp-content/uploads/2024/03/NPC-Circular-Repeal-16-01-Signed.pdf), effective 30 March 2024 per the [NPC issuance notice](https://privacy.gov.ph/npc-issues-circulars-to-strengthen-personal-data-protection-in-ph/) |
| NPC registration is mandatory when an entity meets an employee, sensitive-data-volume, or risk threshold; automated decision-making or profiling systems must be registered. A covered public-facing web application is registered as a data processing system. | Decide and record | [NPC Circular No. 2022-04, sections 5 and 7](https://privacy.gov.ph/wp-content/uploads/2023/05/Circular-2022-04.pdf) |
| An entity outside mandatory registration that does not voluntarily register files a notarized sworn declaration of exemption; the current NPC FAQ repeats this route. | Decide and record | [NPC Circular No. 2022-04, section 6 and Annex 1](https://privacy.gov.ph/wp-content/uploads/2023/05/Circular-2022-04.pdf), [official Annex 1](https://privacy.gov.ph/wp-content/uploads/2023/05/Circular-2022-04-Annex-1-1.pdf), and [NPC registration FAQ, updated 5 January 2026](https://privacy.gov.ph/pips-and-pics/faqs/) |
| A DPO must be designated. An individual controller or processor is the de facto DPO unless another person is designated. | Required now | [NPC Advisory No. 2017-01](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC-Advisory-2017-01-sgd.pdf) |
| A PIA is a continuing risk-management process. Circular 2023-06 now directs a PIA for every processing system. | Required now | [NPC Advisory No. 2017-03](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC_AdvisoryNo.2017-03.pdf) and [NPC Circular No. 2023-06, section 5](https://privacy.gov.ph/wp-content/uploads/2024/03/NPC-Circular-Repeal-16-01-Signed.pdf) |
| A processor agreement must describe the processing and bind the processor to documented instructions, confidentiality, security, subprocessor controls, assistance, deletion or return, audit information, and notice of unlawful instructions. | Required now | [RA 10173 Implementing Rules and Regulations, sections 43 and 44](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) |
| NPC model contractual clauses are an optional transfer mechanism, not the only permitted framework. | Decide and record | [NPC Advisory No. 2024-01](https://privacy.gov.ph/wp-content/uploads/2024/06/Published-NPC-Advisory-No.-2024-01-Contractual-Clauses-for-Cross-Border-Transfers_30May24.pdf) |
| A qualifying breach must be reported to the NPC and affected subjects within 72 hours. All incidents still require documentation. | Required now | [RA 10173 Implementing Rules and Regulations, sections 38 and 41](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) and [NPC Circular No. 16-03](https://privacy.gov.ph/wp-content/uploads/2022/01/sgd-npc-circular-16-03-personal-data-breach-management.pdf) |
| The NPC's current system receives breach notices and annual security incident reports. The annual reporting window is 1 January through 31 March for the prior calendar year. | Required now | [NPC breach reporting page](https://privacy.gov.ph/pips-and-pics/breach-reporting/) |
| A pending request to delay or omit a breach report is not granted by silence. The 2026 advisory says the full report is due within five days of breach discovery while such a request is pending. | Required now during an incident | [NPC Advisory No. 2026-02, 11 May 2026](https://privacy.gov.ph/wp-content/uploads/2026/05/Advisory-Clarification-on-the-Submission-of-Personal-Data-Breach-Notification-through-DBNMS_11-May-2026.pdf) |
| Cloudflare's current DPA describes the customer as controller and Cloudflare as processor for covered customer personal data; it includes instructions, confidentiality, security, incident, subprocessor, assistance, and deletion terms. | Decide and record against the actual account agreement | [Cloudflare Customer DPA v6.4, effective 3 April 2026](https://www.cloudflare.com/cloudflare-customer-dpa/) |
| Cloudflare may process end-user IP addresses, routing information, system configuration, and traffic information. The customer remains responsible for compliance with applicable law. | Required now for the inventory | [Cloudflare Privacy Policy, effective 4 November 2025](https://www.cloudflare.com/privacypolicy/) |
| Cloudflare maintains a subprocessor list; its DPA describes advance notice and an objection process for changes. | Required now to monitor the processor chain | [Cloudflare subprocessors](https://www.cloudflare.com/gdpr/subprocessors/) and [Cloudflare Customer DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) |
| A Pages `_headers` file applies headers to static responses, but not to Pages Functions responses. | Implemented for the present static export | [Cloudflare Pages headers documentation, updated 25 August 2026](https://developers.cloudflare.com/pages/configuration/headers/) |

### Registration ambiguity to send to counsel

NPC Circular 2023-06 section 4(A) says a personal information controller or processor shall designate and register its DPO, while NPC Circular 2022-04 and the current NPC FAQ preserve mandatory-registration thresholds plus voluntary registration or a sworn exemption declaration. This runbook does not resolve that interaction. The safe operational position is to designate a DPO now, complete the data inventory, and have Philippine counsel or the NPC confirm whether Hangin must register, will register voluntarily, or should file the sworn declaration.

## Current data-flow inventory

| Activity | Data that may be involved | Parties and likely geography | What source proves | Open decision |
| --- | --- | --- | --- | --- |
| Cloudflare serves a page | IP address, request URL, routing data, user agent or other HTTP metadata, security events | Hangin and Cloudflare; Cloudflare describes global services and processing | Cloudflare privacy policy and DPA; the repository proves a static export | Confirm the active Cloudflare products, plan, logs, data locations, and retention shown for the account |
| Cloudflare account administration | Administrator name, email, IP address, authentication, activity and audit records | Hangin and Cloudflare | Cloudflare DPA Annex and account security documentation | Identify members, roles, ownership continuity, token scope, audit-log availability, and leaver process |
| Visitor chooses WhatsApp | Telephone number, profile information, message, timestamp, and any information the visitor enters after leaving the site | Visitor, Hangin, and WhatsApp/Meta under the selected account and terms | Source code proves an outbound WhatsApp link only | Identify the business account owner, devices, access, notices, retention, deletion, processor/controller roles, and international transfer terms |
| Visitor chooses email | Email address, message, headers, and any information the visitor enters after leaving the site | Visitor, Hangin, and the configured mail provider | Source code proves a `mailto:` handoff to the published Gmail address | Identify mailbox owner, administrators, forwarding, retention, deletion, security, and vendor terms |
| Visitor chooses telephone | Telephone number and carrier metadata; call content only if separately recorded | Visitor, Hangin, carriers, and device/account operators | Source code proves a `tel:` handoff | Confirm whether calls are logged or recorded and document the applicable notice and retention |
| Build downloads Google font files | Font files and build-time network metadata | Build operator and Google during compilation | Next.js font configuration and generated local font assets | Pin or cache dependencies through the existing lockfile and confirm the production build process; no browser request to Google was observed in the export |
| Browser loads site images and fonts | Requested local asset path plus the request metadata already visible at the edge | Hangin and Cloudflare | All exported runtime assets are local and covered by the automated export test | Recheck whenever a remote media, font, embed, or CDN URL is introduced |

### Features not present in source on 4 September 2026

- No HTML form or server-side submission endpoint.
- No first-party API route or Pages Function.
- No cookie-setting application code or consent interface.
- No Web Analytics beacon, Google Analytics, Meta Pixel, advertising tag, Zaraz tool, or tag manager.
- No Turnstile widget.
- No booking, checkout, payment, customer account, newsletter, review, or upload flow.
- No third-party iframe or runtime remote font, script, stylesheet, image, audio, or video source.

These statements describe the repository and generated export. They do not establish what has been enabled in the Cloudflare dashboard, injected by a deployment system, or configured at another proxy layer.

## Required-now owner checklist

### 1. Identify the controller and DPO

- [ ] Record the full legal name of the personal information controller, any public trade name, legal form, and Philippine business address.
- [ ] Record who controls the website, WhatsApp account, mailbox, telephone, Cloudflare account, and domain registration. Resolve any split responsibilities in writing.
- [ ] Designate the DPO or confirm the de facto DPO in writing. Give the role sufficient independence, access, and authority.
- [ ] Create a role-based public DPO/privacy address. Do not publish a personal address or private telephone number unless the owner deliberately approves it.
- [ ] Record the controller's registration number and seal only if the NPC registration is current and verified.

### 2. Decide the NPC registration path

- [ ] Count employees and determine whether the entity has at least 250 employees.
- [ ] Count data subjects whose sensitive personal information is processed and determine whether the count reaches 1,000.
- [ ] Assess whether any processing is likely to pose a risk to data-subject rights and freedoms.
- [ ] Confirm whether any system performs automated decision-making or profiling. The present source does not.
- [ ] With Philippine counsel, document one result: mandatory registration, voluntary registration, or notarized sworn declaration of exemption.
- [ ] If registration is mandatory, verify the applicable 20-day inaugural-registration timing and register the DPO and covered systems through the NPC process.
- [ ] If using the exemption declaration, use the NPC's official Annex 1, notarize and submit it as required, and monitor the facts that support the declaration.
- [ ] Calendar registration renewal and change notices if registered. Circular 2022-04 describes a one-year certificate, renewal within 30 days before expiry, and update periods that depend on the change.

### 3. Maintain the privacy management record

- [ ] Give each current data flow an owner, purpose, lawful basis, data-subject category, data category, recipient, country, retention rule, deletion method, access group, and security controls.
- [ ] Complete and approve a PIA for the current website, Cloudflare edge processing, account administration, WhatsApp handoff, email handoff, and telephone handoff.
- [ ] Maintain a record of processing activities and a privacy management program that incorporates the PIA controls.
- [ ] Train every person with access to messages, Cloudflare, the domain, deployment credentials, or incident records. Record completion and refresh dates.
- [ ] Review the inventory and PIA at least when the vendor, data, purpose, route, feature, recipient, country, retention, access group, or threat profile changes.

### 4. Approve retention and disposal

Do not write “we retain only as long as necessary” without an actual operating schedule. For each row below, the owner and DPO must approve a trigger, duration or decision rule, legal justification, system owner, deletion method, exception process, and evidence of disposal.

| Record set | Decision required | Important constraint |
| --- | --- | --- |
| Cloudflare visitor, firewall, security, and request logs | Determine what the active plan creates, where it is visible or exported, and who controls retention | Do not promise a period until the account settings and Cloudflare terms are verified |
| Cloudflare administrator and audit records | Set an access-review and retention rule consistent with security and accountability needs | Cloudflare's DPA describes some provider-controlled logs; distinguish those from customer-configured exports |
| WhatsApp inquiries | Define when an inquiry is closed, when a booking/customer record begins, and how deletion works across linked devices and backups | Preserve records subject to a legal hold or active dispute under an approved exception |
| Email inquiries | Define closure, conversion to customer record, mailbox archive, trash, backup, and forwarding behavior | Apply the rule to every mailbox copy, not only the inbox |
| Telephone logs or recordings | Confirm whether records exist before assigning a rule | A recording feature requires a separate notice, basis, access, and security assessment before activation |
| Incident register and evidence | Retain enough to meet incident documentation, annual reporting, defense, and remediation needs | Restrict access because evidence can contain sensitive security and personal data |
| Future booking and payment accounting records | Set only when the feature exists and the accounting/tax flow is known | Republic Act No. 11976 amended the tax recordkeeping period to five years for covered books and accounting records; have the accountant and lawyer map that rule to actual records ([RA 11976](https://lawphil.net/statutes/repacts/ra2024/ra_11976_2024.html), [BIR Revenue Regulations No. 7-2024](https://bir-cdn.bir.gov.ph/BIR/pdf/RR%20No.%207-%202024.pdf)) |

### 5. Control access and credentials

- [ ] Require phishing-resistant MFA where Cloudflare and other providers support it; otherwise require provider MFA and document the method.
- [ ] Keep at least two current, accountable Cloudflare super-administrators for ownership continuity, but give all other members the least privilege needed.
- [ ] Remove shared administrator accounts. Give each user an individual identity and review members at a defined interval.
- [ ] Use scoped API tokens instead of global API keys. Record owner, purpose, resources, permissions, creation date, review date, and revocation date.
- [ ] Store secrets only in the deployment provider's secret store. Never commit account IDs, keys, recovery codes, or breach evidence to this repository.
- [ ] Define joiner, role-change, leaver, lost-device, and account-recovery procedures for Cloudflare, Git hosting, DNS/domain registrar, WhatsApp, email, and deployment systems.
- [ ] Review audit events and active sessions after personnel changes or suspected compromise. Follow Cloudflare's [account security guidance](https://developers.cloudflare.com/fundamentals/account/account-security/secure-a-compromised-account/) and [security best practices](https://developers.cloudflare.com/fundamentals/reference/best-practices/).

## Cloudflare account and contract review

Complete this checklist in the live account. Store the signed or accepted agreements and dated screenshots in the business compliance system, not in the public site repository.

### Service and deployment facts

- [ ] Record the contracting customer, Cloudflare account, Pages project, production branch, build command, output directory, account plan, and authorized owner.
- [ ] Confirm every custom hostname and DNS record. Verify that the apex and `www` behavior match the canonical origin used by the site.
- [ ] Verify HTTPS from an external network and document the TLS mode, certificate status, minimum TLS policy, redirect behavior, and origin path if a proxied origin exists.
- [ ] Confirm that the deployed `_headers` values appear on representative HTML and asset responses. Pages header rules do not cover a future Pages Function.
- [ ] Inventory every dashboard feature that can observe or transform traffic, including Web Analytics, Zaraz, Turnstile, Bot Management, WAF, firewall rules, Logpush, Workers, Pages Functions, Access, Browser Insights, Network Error Logging, and third-party integrations.
- [ ] Disable or remove any feature that lacks an owner, purpose, lawful basis, PIA entry, notice analysis, recipient/transfer record, retention rule, access group, and tested security configuration.

### DPA and processor-chain review

- [ ] Verify that Cloudflare Customer DPA v6.4, or a later reviewed version, is part of the agreement for the actual customer and services.
- [ ] Map the signed agreement to every item in IRR section 44: subject matter, duration, nature, purpose, data types, data-subject categories, controller rights, documented instructions, confidentiality, security, subprocessor approval and notice, rights assistance, breach/compliance assistance, deletion or return, audit information, and unlawful-instruction notice.
- [ ] Record any term that is outside the linked DPA, depends on the Main Agreement, is plan-specific, or requires a customer configuration. Give each gap an owner and resolution date.
- [ ] Export or snapshot the current [Cloudflare subprocessor list](https://www.cloudflare.com/gdpr/subprocessors/), subscribe to or implement change monitoring, and calendar the DPA objection window. DPA v6.4 describes 30 days' advance list publication and a 10-day objection window; verify later versions before relying on those periods.
- [ ] Document the countries or regions relevant to the enabled services and the transfer safeguard selected under RA 10173 section 21 and the IRR. The Cloudflare DPA's references to other privacy laws do not by themselves decide Philippine-law adequacy.
- [ ] Have Philippine counsel decide whether the Cloudflare agreement supplies the required comparable level of protection, whether NPC model clauses should be added, and whether any local addendum or other reasonable means is needed.
- [ ] Re-review the DPA, Main Agreement, product terms, subprocessor list, and enabled services after a vendor update and before adding a materially different Cloudflare product.

### Logging and monitoring

- [ ] Determine what visitor, security, administrator, build, DNS, and deployment logs actually exist on the plan.
- [ ] Record default retention, configurable retention, export destination, access roles, encryption, deletion, incident alerts, and legal-hold behavior for each log source.
- [ ] If using Logpush, assess the destination as a separate processor and data store. Cloudflare states that Logpush sends logs to a destination rather than providing destination storage; product and plan availability vary ([Logpush documentation](https://developers.cloudflare.com/logs/logpush/)).
- [ ] Do not export full URLs, query strings, IP addresses, headers, or payload fields merely because they are available. Minimize fields to the documented purpose.
- [ ] Do not place personal information, booking references, email addresses, or access tokens in URLs. URLs are likely to appear in browser, network, Cloudflare, and downstream logs.

## Browser security policy

`public/_headers` specifies the following intended boundary for static responses. Verify the effective HTTP headers after an approved deployment; the file alone does not establish enforcement:

- HTTPS persistence for the current host for one year, without `includeSubDomains` or preload because subdomain readiness is unverified.
- Content Security Policy restricted to same-origin resources, with forms, frames, plugins, and external connections blocked.
- Inline script and style allowances required by the generated Next.js document. Do not loosen these to add a vendor without a PIA and release-gate review.
- No outbound referrer, no MIME sniffing, denial of framing, same-origin opener/resource isolation, and denial of unneeded browser capabilities.

Before enabling HSTS on a new hostname, verify stable HTTPS and recovery access. Before adding a Pages Function, implement equivalent response headers in that function and extend the automated tests because `_headers` will not apply to its dynamic responses.

## Public privacy notice release gate

Do not publish a notice until every item below is verified and approved. The notice must describe the real systems and practices in clear visitor language, not this checklist.

- [ ] Controller's full legal and trade names, legal form, business address, and public contact details.
- [ ] DPO/privacy contact channel and the responsible entity for each linked communication channel.
- [ ] Personal-data categories collected directly and automatically.
- [ ] Specific purposes and the lawful basis for each purpose.
- [ ] Collection method, processing scope, automated access, and whether provision is mandatory or optional.
- [ ] Recipient and processor categories, including Cloudflare, communication providers, and relevant countries or regions.
- [ ] Approved retention criteria or periods and disposal methods.
- [ ] Data-subject rights, request/verification process, response channel, and right to complain to the NPC.
- [ ] Cookie, device-storage, analytics, profiling, and advertising facts. State that none are used only after checking the deployed dashboard and response behavior.
- [ ] Current NPC registration facts. If registered, display the valid seal on the main website and link it to or place it on the privacy notice as Circular 2022-04 requires.
- [ ] Effective date, change-notice method, owner approval, DPO approval, and Philippine lawyer approval.

## Incident and breach runbook

Treat every suspected loss, unauthorized access, disclosure, alteration, destruction, account takeover, malicious rule change, exposed token, misdirected message, or processor alert as a security incident until assessed.

### Prepare now

- [ ] Name the incident lead, DPO, technical responder, owner decision-maker, communications contact, Philippine counsel, and Cloudflare support route. Keep current contact details in the restricted incident system.
- [ ] Create a restricted incident register with incident ID, discovery time, reporter, systems, data, subjects, chronology, containment, evidence, risk assessment, notices, decisions, remediation, and closure approval.
- [ ] Enable appropriate provider alerts and ensure that at least two authorized people can reach Cloudflare, the registrar, Git host, deployment provider, WhatsApp, and email during an incident.
- [ ] Test account recovery, token revocation, rollback, static-site replacement, and evidence preservation at a defined interval.

### Respond

1. **Record discovery time immediately.** Start the 72-hour clock from knowledge of a potentially notifiable breach; do not wait for certainty or a vendor's final report.
2. **Contain without destroying evidence.** Revoke exposed tokens, terminate unauthorized sessions, restrict access, preserve relevant logs and configurations, and deploy a safe static replacement if needed.
3. **Notify the internal response team and processor.** Contact the DPO, incident lead, owner, counsel, and Cloudflare through the account's approved route. Record every request and response.
4. **Determine the facts.** Identify the data, number and categories of affected people, systems, recipients, countries, encryption or other protection, likely consequences, and measures taken.
5. **Apply the mandatory-notification test.** Under the IRR and NPC breach guidance, notification is mandatory when all required conditions are present: the compromised data involves sensitive personal information or other information that may enable identity fraud; there is reason to believe unauthorized acquisition occurred; and the controller or NPC believes the breach is likely to create a real risk of serious harm. Counsel and the DPO should document the analysis.
6. **Notify within 72 hours when required.** Submit through the NPC Data Breach Notification Management System and notify affected data subjects using the current NPC requirements. When affected subjects are children, notify both the child and parent or guardian using child-understandable language under NPC Advisory 2024-03 section 4. If complete facts are unavailable, submit the available information and follow the permitted supplemental process; do not delay the initial required notice.
7. **Track the full-report deadline and pending-request email separately.** Circular 16-03 describes the full report within five days after initial notification, unless further time is granted. Under NPC Advisory 2026-02 section 2(C), while a DBNMS request remains unacted upon, submit the full breach report within five days from discovery to `admindbnms@privacy.gov.ph`, using subject `FBR_NameofPIC_NameofDPO`, and make every other required submission. This applies to the requests addressed by the advisory, including postponement, exemption, alternative notification and document-extension requests. Its wording is five days, not five business days; do not extend the deadline by excluding weekends. Record both dates and follow the earlier applicable deadline. Silence is not approval; only an express written NPC decision changes the request status. This step does not postpone the initial 72-hour notification obligation.
8. **Document non-notifiable incidents too.** Record the facts, risk analysis, decision-maker, legal advice, containment, remediation, and reason notification was not required.
9. **Close and learn.** Confirm eradication, credential rotation, configuration repair, data recovery, subject support, control changes, PIA/ROPA updates, contract follow-up, and owner/DPO closure approval.

### Annual security incident report

- [ ] Maintain the incident register throughout the year, including incidents that did not require individual breach notification.
- [ ] Between 1 January and 31 March, submit the NPC annual security incident report for the preceding calendar year through the current DBNMS process. For incidents during 2026, the anticipated window is 1 January to 31 March 2027; recheck the NPC instructions before filing.
- [ ] Record the filing confirmation, scope, preparer, approver, and any NPC correspondence in the restricted compliance system.

## Future feature release gates

Every future feature starts disabled. Before implementation, update the data inventory, ROPA, PIA, privacy management controls, notice analysis, processor/transfer review, retention schedule, access model, incident plan, and CSP. Run the full repository verification after the change.

| Proposed feature | Minimum gate before enablement |
| --- | --- |
| Contact, inquiry, newsletter, or review form | Define fields, necessity, lawful basis, notices at collection, secure server endpoint, validation, spam control, transport/storage, recipients, access, retention, deletion, rights handling, and breach coverage. A static page cannot safely receive submissions by itself. |
| Cloudflare Web Analytics | Verify the exact dashboard mode, beacon, measurements, identifiers, retention, access, and Cloudflare terms. Cloudflare says its product does not collect or use visitor personal data, but Hangin still needs a documented PIA and Philippine-law classification for the actual configuration ([Web Analytics documentation](https://developers.cloudflare.com/web-analytics/about/)). |
| Zaraz or another tag manager | Inventory every tool it loads and every field/event it sends. Treat each destination as its own recipient and potential processor. Configure privacy settings only after the legal design; query-string removal, IP trimming, user-agent reduction, or a CMP does not establish compliance by itself ([Zaraz documentation](https://developers.cloudflare.com/zaraz/), [privacy settings](https://developers.cloudflare.com/zaraz/reference/settings/)). |
| Advertising, remarketing, or cross-site measurement | Obtain counsel's lawful-basis and consent analysis, deploy a tested preference mechanism where required, block tags before the required choice, preserve consent evidence, support withdrawal, and prohibit sensitive audience construction. |
| Turnstile | Decide the purpose and basis; review Cloudflare's processing, analytics, hostname, country, browser, user-agent, operating-system and source-IP visibility; update the notice and CSP. Implement server-side Siteverify validation and key protection. Do not add only the client widget ([Turnstile analytics documentation](https://developers.cloudflare.com/turnstile/turnstile-analytics/)). |
| Booking or payment | Complete e-commerce, consumer, tax/accounting, PCI/payment-provider, cancellation, refund, fraud, identity, receipt, retention, processor, transfer, and breach reviews. The current site does not establish that the Internet Transactions Act applies to its outbound inquiry links. Have counsel assess the actual sales flow against [Republic Act No. 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html) and [DTI Joint Administrative Order No. 24-03](https://ecommerce.dti.gov.ph/wp-content/uploads/2024/06/Joint-Administrative-Order-No.-24-03.pdf). |
| Account, upload, personalization, profiling, or automated decision-making | Stop release until registration implications, sensitive-data scope, data-subject rights, authentication, abuse prevention, encryption, access, export/deletion, model/vendor terms, human review, and DPIA controls are approved. |
| Pages Function, Worker, or first-party API | Define controller and processor roles, secrets, request/body logging, authentication, authorization, rate limits, validation, storage, region, retention, monitoring, error behavior, and equivalent dynamic-response security headers. Extend tests beyond the static `_headers` artifact. |

## Review record

Complete this section in the restricted compliance system, not by adding personal information or signatures to the public repository.

- Owner decision date and record location:
- DPO designation and record location:
- NPC registration/exemption decision and record location:
- PIA and ROPA approval record location:
- Cloudflare DPA and transfer review record location:
- Retention schedule approval record location:
- Incident exercise date and record location:
- Philippine lawyer review date and record location:
- Next review date or triggering change:
