# EU and UK privacy assessment

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal research; proposed operational decisions remain unaccepted
Correction date: 2026-09-04
Original research snapshot: worktree `0f6a`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](../project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](integration-corrections-sources.md).

**Assessment date:** 4 September 2026
**Scope:** The current Hangin Kite Center website and the EU GDPR, EU ePrivacy rules, UK GDPR and PECR
**Status:** Internal working assessment. Recheck whenever the site, deployment, advertising or booking flow changes.

> **Legal review required:** This is an engineering and compliance assessment, not legal advice. A Philippine lawyer with EU and UK privacy experience should review the final notice and business-specific conclusions before publication or before Hangin starts targeting or tracking people in the EEA or UK.

## Outcome

The repository does not establish that EU GDPR or UK GDPR currently applies to Hangin. Hangin has no known EEA or UK establishment. The site describes services delivered in Boracay and does not contain EEA- or UK-specific offers, prices, currencies, testimonials, telephone numbers, travel directions or campaign code. It also has no form, account, checkout, analytics code, advertising pixel or browser-storage code.

Worldwide accessibility and English copy do not decide territorial scope. Article 3(2) requires processing related to an intentional offer to people while they are in the EEA or UK, or monitoring of their behaviour there. The EDPB says website accessibility alone is insufficient and that targeting requires a factual, combined assessment. It also says online collection is not automatically monitoring; the controller's purpose and later behavioural analysis or profiling matter. The ICO uses materially the same tests for the UK.

This conclusion is provisional because the repository cannot show Cloudflare dashboard settings, advertising campaigns, customer origin, booking practices or how WhatsApp and email messages are handled. Those facts can change the result.

## Repository and deployment evidence

| Fact checked on 4 September 2026 | Evidence | Effect on assessment |
| --- | --- | --- |
| Static Next.js 16 export | `next.config.ts` uses `output: "export"` | There is no application server, account or form handler in this repository. |
| No on-site form, account, checkout or payment | Source and exported-page audit | The website does not directly collect booking or payment fields. |
| No analytics, advertising pixel, embedded social widget or client storage | Source and exported-page audit; the original task-specific check (superseded by `scripts/privacy-audit.mjs` in integration) | No repository evidence of behavioural monitoring or non-essential terminal storage. |
| User-initiated contact only | `content/site.ts` builds `mailto:` and `https://wa.me/` links | A visitor leaves the site before sending a message. WhatsApp or the visitor's mail provider then processes the communication. |
| Philippine service location and contact | Site copy names Bulabog Beach, Boracay and uses a `+63` number | The current offer is framed around services in the Philippines. |
| English and `.com` domain | Site copy and `siteConfig.origin` | English is an official language of the Philippines. A neutral domain and English alone are weak targeting evidence. |
| Cloudflare hosting | Supplied project assumption; no Cloudflare configuration is committed | Cloudflare can process end-user IP addresses and customer logs, but the enabled products, cookies, logs, retention, account entity and contract cannot be verified here. |

The audit does not inspect Cloudflare dashboard settings or response transformations at the edge. A deployed-site check remains mandatory.

## Current legal position

### EU GDPR

**Establishment, Article 3(1).** No EEA branch, office, employee, agent or other stable arrangement has been identified. Using an EEA processor would not by itself create an establishment for Hangin. This conclusion must be revisited if the business has any EEA presence not represented in the repository.

**Offering goods or services, Article 3(2)(a).** The site can be visited from the EEA and a visitor can contact Hangin before travelling. Those facts alone do not prove intentional EEA targeting. Relevant EDPB indicators include naming EU countries, EU-focused advertising or search campaigns, an EU domain, EU travel directions, EU customer accounts or testimonials, a language or currency directed to the EU, and EU delivery arrangements. Several factors can combine even when no single factor is decisive.

The business description “worldwide tourist audience” creates ambiguity. A neutral offer visible worldwide is not automatically enough, but actual campaign targeting, regular solicitation of EEA customers, EU-specific testimonials or a booking flow designed for people in the EEA may establish intent. Assess the person's location when the offer or related processing occurs, not citizenship or where the lesson will later take place.

**Monitoring, Article 3(2)(b).** The repository has no tracking technology. Basic delivery and security logs do not automatically amount to behavioural monitoring. Monitoring becomes likely when Hangin or a vendor tracks EEA visitors with a purpose to analyse, profile, predict or act on their behaviour. Advertising pixels, cross-page or cross-site identifiers, geolocation for marketing, session replay and user-level analytics are strong triggers.

**Conclusion.** On repository facts alone, EU GDPR applicability is not established. Record the business and deployment facts before relying on this conclusion.

Sources:

- [Regulation (EU) 2016/679, Articles 3 and 4](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679), adopted 27 April 2016.
- [EDPB Guidelines 3/2018 on territorial scope, version 2.0](https://www.edpb.europa.eu/documents/guideline/guidelines-32018-on-the-territorial-scope-of-the-gdpr-article-3-version-adopted_en), adopted 12 November 2019.

### UK GDPR

The UK tests each processing activity separately. An overseas controller is in scope when processing relates to intentionally offering goods or services to people in the UK or monitoring behaviour taking place there. The ICO says a website being accessible in the UK is insufficient and calls for evidence beyond a neutral world-wide offer, such as UK campaigns, paid UK search traffic, GBP prices, UK testimonials, delivery arrangements or UK contact details.

The current repository contains none of those indicators and no tracking. UK GDPR applicability is therefore not established on repository facts. The ICO also says that a service intended to have a global reach must consider whether that intent includes offering the service to people in the UK. Hangin needs a factual owner decision on target markets rather than a conclusion based only on code.

Sources:

- [ICO, Territorial scope fundamentals](https://ico.org.uk/media2/migrated/4031113/ic-327905-y2y5-knowledge-hub-territorial-scope.pdf), current official guidance accessed 4 September 2026.
- [ICO, overseas online services and storage/access technology](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-pecr-rules/), final guidance updated 29 April 2026.
- [Data Protection, Privacy and Electronic Communications amendments, territorial-scope explanation](https://www.legislation.gov.uk/ukdsi/2019/9780111178300/pdfs/ukdsiem_9780111178300_en.pdf), 2019.

### EU ePrivacy and UK PECR

**Current site.** The repository does not store information on a visitor's device or access information already stored there for Hangin's purposes. It does not load third-party scripts, frames, pixels or remote images. A consent banner would have no choice to manage and is not needed for the code as audited.

Cloudflare may use a security or load-balancing cookie depending on enabled products and threat handling. Strictly necessary storage used only to transmit or provide a service requested by the user is generally exempt from prior consent, but it still needs clear disclosure. Verify the deployed site before making that claim.

**EU.** Article 5(3) of the ePrivacy Directive requires consent for terminal storage or access unless it is solely for transmitting a communication or strictly necessary for the service the user requested. The Directive is implemented through national law, so territorial reach, enforcement and some details must be checked for the relevant Member States before deploying tracking. Do not assume one banner configuration resolves every national rule.

**UK.** PECR does not contain a clear special territorial rule for an overseas service merely accessible in the UK; the ICO flags this expressly. If UK GDPR applies to personal data produced by the technology, transparency and lawful-processing duties apply. The 2025 Data (Use and Access) Act also created narrow UK exceptions, including statistical analytics used only to improve the service. That exception requires clear information, a simple and free objection method, aggregation, short individual-level retention, and no profiling or advertising use. Advertising tracking still requires consent.

Sources:

- [Directive 2002/58/EC, Article 5(3) and Article 13](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:02002L0058-20091219), consolidated 19 December 2009.
- [EDPB Guidelines 2/2023 on Article 5(3)'s technical scope](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en), version 2.0 adopted 16 October 2024.
- [UK Data (Use and Access) Act 2025, sections 112 to 114](https://www.legislation.gov.uk/ukpga/2025/18/contents), enacted 19 June 2025.
- [ICO, storage and access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/), final guidance updated 29 April 2026.

## Cloudflare and international handling

Cloudflare's 3 April 2026 customer DPA describes end users of customer websites as data subjects and lists IP addresses in customer logs. It names Cloudflare, Inc. in the United States as a processor or sub-processor, provides for sub-processors, and includes EU standard contractual clauses and a UK addendum. Cloudflare also states that it relies on the EU-US Data Privacy Framework, its UK extension and SCCs for relevant international transfers.

That vendor language does not prove which Cloudflare service, account entity, DPA version, logging product, retention setting or data-localisation option Hangin uses. It also does not make EU or UK GDPR apply to Hangin by itself. If Hangin becomes subject to either regime for a processing activity, it must verify the current account contract and DPA, processor role, sub-processors, transfer mechanism, security settings and retention before describing them in a notice.

The Philippines is not on the European Commission's adequacy list as of 4 September 2026. A direct disclosure from an individual to Hangin is not automatically a Chapter V “transfer” because there may be no separate exporter subject to GDPR. A disclosure from an EEA processor to Hangin, or from an EEA exporter to a Philippine provider, can be a restricted transfer even when the Philippine recipient is itself subject to Article 3(2). Apply the data-flow test, not a blanket country rule.

Sources:

- [Cloudflare Customer DPA, version 6.4](https://cf-assets.www.cloudflare.com/slt3lc6tev37/1TTgT35GoUNlKZYGuKWBFy/4e7dfc8cf402419a9b1cf624291fc69f/cloudflare_customer_dpa-v6.4_april_3_2026.pdf), effective 3 April 2026.
- [Cloudflare GDPR FAQ](https://www.cloudflare.com/trust-hub/gdpr/), accessed 4 September 2026.
- [European Commission adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en), list current through 23 July 2026.
- [EDPB Guidelines 05/2021 on Article 3 and Chapter V](https://www.edpb.europa.eu/documents/guideline/guidelines-052021-on-the-interplay-between-the-application-of-article-3-and-the_ga), version 2.0 adopted 24 February 2023.

## WhatsApp and Meta

The current site loads no Meta code. A `wa.me` link sends the visitor to WhatsApp only after the visitor activates it; the prefilled message is not sent until the visitor chooses to send it. The website itself therefore does not expose every page visitor to Meta.

Once a message is sent, WhatsApp processes account, device, connection, usage and business-interaction information under the policy applicable to that user. Hangin also receives the phone number or account identifier and the message content. The exact roles and transfer terms depend on whether Hangin uses the consumer app, WhatsApp Business app, Business Platform, a Meta-hosted service or another inbox provider. Those account facts are unresolved.

If EU or UK GDPR applies to the inquiry or booking flow, the notice must identify WhatsApp/Meta or a meaningful recipient category, explain international handling and describe Hangin's own purpose, lawful basis and retention. Do not treat a request for lesson information as consent to future marketing.

Sources:

- [WhatsApp EEA Privacy Policy](https://www.whatsapp.com/legal/privacy-policy-eea), current version accessed 4 September 2026.
- [WhatsApp information shared with Meta companies](https://faq.whatsapp.com/1303762270462331), accessed 4 September 2026.
- [ICO electronic-mail marketing guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/), updated 28 April 2026.

## When EU or UK scope is triggered

If Hangin intentionally targets people in the EEA or UK, monitors their behaviour there, or chooses one global GDPR-level standard, complete these controls before the relevant processing begins:

1. Identify the controller by its correct legal or registered business name, address and privacy contact.
2. Map each processing purpose, data category, source, recipient, location, retention rule and security control.
3. Assign and document an Article 6 lawful basis per purpose. Contract or pre-contract steps may fit genuine booking inquiries. Consent should be reserved for optional uses that can be refused or withdrawn. Legitimate interests require a documented necessity and balancing assessment.
4. Provide the Article 12 to 14 information at collection, including controller and representative details, purposes, lawful bases, legitimate interests where used, recipients, transfers and safeguards, retention, rights, complaints, required fields and automated decisions.
5. Provide workable procedures for access, correction, erasure, restriction, portability, objection, consent withdrawal and complaints. UK and EU response rules must be verified separately.
6. Put Article 28 or UK-equivalent processor terms in place and document controller, processor and any joint-controller roles for Cloudflare, booking, payment, email, analytics, advertising and messaging vendors.
7. Validate international transfer paths. Use adequacy where it actually covers the recipient, or appropriate safeguards and the required transfer assessment. Do not describe SCCs or the Data Privacy Framework unless the applicable contract and recipient are confirmed.
8. Apply data protection by design, access controls, encryption, backups, deletion, incident response and breach assessment.
9. Keep records of processing. The small-organisation records exception is narrow and does not cover regular, risky or special-category processing.
10. Appoint an EEA representative under Article 27 and a separate UK representative when each regime applies, unless counsel confirms the specific processing is occasional, low-risk and within the full exemption. The EDPB says “occasional” means outside regular business activity; routine booking or visitor analytics is unlikely to qualify.
11. Appoint a DPO only if the legal threshold is met, such as large-scale regular and systematic monitoring as a core activity or large-scale special-category processing. The current static site does not show that threshold.
12. For optional analytics, advertising, session replay or social pixels, resolve ePrivacy or PECR consent before loading the technology. A GDPR lawful basis does not replace terminal-storage consent where consent is required.
13. For email, text or WhatsApp marketing, obtain the required prior consent unless a precisely documented national or UK soft opt-in applies. Offer a clear opt-out at collection and in every message. A service reply is not marketing consent.

Primary requirements: [EU GDPR Articles 5, 6, 12 to 22, 27, 28, 30, 32 to 34, 37 and 44 to 49](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679); [Your Europe GDPR business guidance](https://europa.eu/youreurope/business/governance-and-sustainability/digital-and-data-compliance/data-protection-gdpr/index_en.htm), last checked 5 August 2026; [ICO right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/), accessed 4 September 2026.

## Genuine uncertainties requiring owner evidence or legal review

- Whether “worldwide” is a neutral description or a deliberate sales strategy that includes people currently in the EEA or UK.
- Whether any search, social or travel-platform campaign targets EEA or UK locations, languages or audiences.
- Whether regular EEA or UK customers, testimonials, referrals or off-site booking pages show targeting that is absent from this repository.
- Which Cloudflare products, account entity, contract, logs, retention, cookies, analytics and edge injections are active.
- Which WhatsApp product Hangin uses and whether Meta or another provider helps manage messages.
- Who can access messages, where they are copied or backed up, and how long they are kept.
- Whether booking collects health, disability, emergency-contact, passport or child data.
- Which EU Member State ePrivacy and direct-marketing laws would apply to a future campaign.
- Whether the controller chooses one GDPR-level global operating standard even where Article 3 does not require it.

## Philippine-law coordination

This assessment does not replace the Philippine privacy work. The Philippine Data Privacy Act applies independently and already requires transparency, lawful processing, security, accountability for processors and information about the controller, purposes, recipients, retention and rights. The public notice should be one accurate global notice with jurisdiction-specific rights added only where they apply, not separate boilerplate pages that contradict each other.

Sources: [Republic Act No. 10173, sections 12, 14, 16, 20 and 21](https://privacy.gov.ph/data-privacy-act/), approved 15 August 2012; [Implementing Rules and Regulations, sections 18, 25 to 29, 34 and 43 to 45](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/), promulgated 24 August 2016.
