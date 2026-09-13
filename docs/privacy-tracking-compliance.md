# Privacy and tracking compliance record

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal research; proposed operational decisions remain unaccepted
Correction date: 2026-09-04
Original research snapshot: worktree `34dc`, base `b638b06`.

This record preserves the original research; its build counts, DNS observations, removed-copy descriptions and repository inventories describe that earlier snapshot unless expressly corrected below. They are superseded as current-state evidence by [the project documentation](project/product.md) and fresh integration verification. The integration baseline adds `/terms/` and `/accessibility/` to the nine service routes; there is no public `/privacy/` page. Local header configuration does not establish deployed Cloudflare behavior.

The established year 2002, IKO and VDWS instruction and service categories remain owner-confirmed. More specific credentials, inventory, prices and supplier roles require their own evidence. Research recommendations and workflow templates in this record do not establish accepted business policy. Targeted source rechecks and remaining limits are recorded in [the correction source register](legal/integration-corrections-sources.md).

**Audit date:** 4 September 2026
**Scope:** Hangin Kite Center public website source, static export, and the deployment controls that can alter either response after build.

> This is an engineering and operating record, not legal advice. Final legal text and business-specific conclusions must be reviewed by a Philippine lawyer before publication or before enabling tracking, forms, booking, or payment collection.

## Decision

Keep the site free of client-side analytics, advertising pixels, tag managers, and non-essential browser storage. The consolidated source/export and deployed HTTP checks are `scripts/privacy-audit.mjs` and `scripts/audit-deployed-privacy.mjs`; their reports are limited regression evidence, supplemented by browser network/storage and vendor-account inspection. Do not show a consent banner while there is nothing non-essential to accept or reject. Do not publish a privacy notice until the owner confirms the controller identity and the processing facts listed below; an incomplete notice would be misleading.

Before the public launch, confirm Cloudflare's actual products, request logging, cookies, retention, processor terms, and international-transfer safeguards. The live `www.hanginkitecenter.com` hostname did not resolve from the audit environment on 4 September 2026, so the deployed response could not be independently inspected.

## Evidence table

| Area | Finding on 4 September 2026 | Classification | Required response |
| --- | --- | --- | --- |
| Application source and export | No form, analytics SDK, tag manager, advertising pixel, third-party embed, service worker, cookie access, or local/session storage was found. Same-origin Next.js runtime files and non-executable JSON-LD are present. | Current fact | Keep `scripts/privacy-audit.mjs` wired into fresh export verification. It checks known patterns and cannot prove that all tracking is absent. |
| Contact paths | Email and WhatsApp are ordinary links initiated by the visitor. The page-specific WhatsApp text supplies lead context without a visitor identifier. The destination provider processes data after the click. | Current fact | Explain these recipients and purposes in the eventual notice. Keep this as the default attribution method. |
| Fonts and proof images | `next/font` produces local font assets; the audited export does not contact Google Fonts. Site images are local. | Current fact | No separate third-party request disclosure is needed for these assets. |
| Cloudflare edge service | Cloudflare necessarily receives network request data when it proxies or hosts a visit. The repository does not reveal the account products, logs, security cookies, retention, or Data Processing Addendum status. | Required before public launch | Complete the Cloudflare checklist below, document the lawful basis and retention, and publish an accurate privacy notice. |
| Cloudflare Web Analytics | No beacon is present in source or the local export. Cloudflare can inject it after deployment; proxied-zone automatic setup may be enabled by default, and Pages can inject it on the next deployment. | Deployment status unconfirmed | Keep it disabled until the owner selects a lawful regional configuration and publishes the necessary notice and controls. |
| Cloudflare Zaraz | No Zaraz loader is present in source or the local export. Dashboard configuration can inject `/cdn-cgi/zaraz/i.js` outside the repository. | Deployment status unconfirmed | Keep Zaraz and every Zaraz tool disabled. If later used, assign every tool a reviewed purpose; Cloudflare warns that an unassigned tool skips its consent check by default. |
| Cloudflare security cookies | None were found locally. Cloudflare may set cookies such as `__cf_bm` or `cf_clearance` when corresponding bot/challenge products are active. | Deployment status unconfirmed | Enable only products that are needed, record each cookie and duration, and disclose it as appropriate. Do not call a cookie essential merely because the vendor does. |
| Cloudflare Turnstile and `/cdn-cgi/` scripts | No Turnstile, challenge-platform, Rocket Loader, Cloudflare Apps, or email-obfuscation script was found in source or the local export. These can be host-injected or appear only during a challenge. | Deployment status unconfirmed | Review the exact production configuration and clean-browser responses. The gate reports these paths for classification; a finding is not by itself proof of tracking. |
| Google, Meta, TikTok, Hotjar, Microsoft Clarity | No implementation was found. | Current fact | Treat any addition as a new processing system. It must fail the gate until classified and, where required, consent-gated. |
| Production response | Not inspected because the production hostname failed DNS resolution from the audit environment. | Open operational check | Run the deployment audit and browser inspection after DNS and HTTPS work. |

## Legal position by trigger

### Required now or before public launch

The Philippine Data Privacy Act applies to the processing of personal information. Its general principles require transparency, a legitimate purpose, and proportionality, and its lawful bases are not limited to consent. It also requires reasonable organizational, physical, and technical security measures. See the [Data Privacy Act of 2012](https://privacy.gov.ph/data-privacy-act/) (15 August 2012), especially sections 11, 12, 16, and 20, and the [Implementing Rules and Regulations](https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/) (24 August 2016), especially sections 18, 19, and 50.

Even a tracker-free public site processes network data through its host or proxy. Before launch, Hangin should therefore:

1. identify the Philippine personal information controller and the accountable privacy contact;
2. map the request data processed by Cloudflare, its purpose, lawful basis, recipients, locations, access, security, and retention;
3. review and retain Cloudflare's applicable processing and cross-border-transfer terms;
4. document any reliance on legitimate interest using the purpose, necessity, and balancing tests, and provide an objection route; and
5. publish a readable privacy notice containing the controller identity and contact, data, purpose, basis, recipients, automated access, retention, and data-subject rights.

The notice is required regardless of whether consent or another lawful basis is used. Consent must be separate from the notice and must remain freely given, specific, informed, evidenced, and withdrawable. See [NPC Circular 2023-04, Guidelines on Consent](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf) (7 November 2023) and the NPC's [Right to be Informed](https://privacy.gov.ph/the-right-to-be-informed/) guidance. If legitimate interest is selected, [NPC Circular 2023-07](https://privacy.gov.ph/wp-content/uploads/2024/05/2023-compendium-2.pdf) (13 December 2023) requires a documented legitimate-interest assessment and disclosure of the interest.

Philippine law does not prescribe a cookie pop-up as the format for a privacy notice. The NPC has said a privacy policy is necessary but a pop-up is not itself mandatory; the notice must be accessible and comprehensible. See [NPC Advisory Opinion 2017-047](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC_AdvisoryOpinionNo._2017-047.pdf) (29 August 2017). That does not remove consent requirements under other applicable laws.

The owner must also decide whether the controller or processing system must be registered with the NPC. The thresholds and higher-risk cases are in [NPC Circular 2022-04](https://privacy.gov.ph/wp-content/uploads/2023/05/Circular-2022-04.pdf) (5 December 2022). The NPC's current [registration-exemption page](https://privacy.gov.ph/pips-and-pics/exemption/) says an exempt controller that does not register voluntarily must submit a sworn declaration and undertaking. Headcount, data volumes, sensitive-data processing, profiling, and other risk facts are not established by the repository.

### Before forms, booking, or payment

Treat each new form or service integration as a new processing system. Before collection, complete a privacy impact assessment, collect only necessary fields, state the purpose and basis at the point of collection, set a justified retention/deletion rule, define access, sign processor terms, and test data-subject request and breach procedures. [NPC Advisory 2017-03](https://privacy.gov.ph/wp-content/uploads/2022/01/NPC_AdvisoryNo.2017-03.pdf) (31 July 2017) calls for a privacy impact assessment for new and existing processing systems; [NPC Advisory 2025-02](https://privacy.gov.ph/wp-content/uploads/2025/12/NPC_Advisory2025-02.pdf) (27 August 2025) places privacy engineering throughout the system lifecycle.

If the website later concludes a sale, booking, or payment online, assess the [Internet Transactions Act, Republic Act 11967](https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html) (5 December 2023) and its [DTI implementation materials](https://ecommerce.dti.gov.ph/ra11967/). Its e-retailer disclosures, transaction records, invoice, redress and privacy duties must be assessed before that change. Assess current coverage too: the IRR includes online offers and an enquiry-only label does not establish exemption. See the internal terms review for the current classification question.

### Before analytics, advertising, or retargeting

Do not enable a tool simply because it is described as cookie-free. Cloudflare Web Analytics sends browser-generated performance data and request context to `/cdn-cgi/rum`. Cloudflare says the source IP is received in the normal HTTP request and then discarded rather than stored in its core logs; it also says the beacon uses no cookies or browser storage. Unsampled beacon data is retained for seven days before longer-term aggregation, and dashboard data is available for six months. See Cloudflare's [Web Analytics data collection](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/), [RUM beacon](https://developers.cloudflare.com/speed/observatory/rum-beacon/), and [Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/) (pages current in April-July 2026).

For visitors in the EU/EEA, Article 5(3) of the [ePrivacy Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219) applies to storing information in, or gaining access to information from, a device; it is not limited to cookies or personal data. The EDPB says JavaScript that instructs a browser to send locally generated or browser-API information can be in scope, as can tracking pixels and URL/IP-based tracking. See [EDPB Guidelines 2/2023, version 2](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf) (adopted 7 October 2024). Whether a narrowly configured analytics service qualifies for an exemption depends on the applicable member-state law and facts. The conservative configuration is to disable it for the EU/EEA unless counsel confirms an exemption, or obtain valid consent before any beacon loads.

GDPR territorial reach is not decided by worldwide site availability alone. It may apply where a non-EU controller offers goods or services to people in the EU or monitors their behaviour. Language, currency, advertising, customer targeting, and other facts matter. See GDPR [Article 3](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679) and [EDPB Guidelines 3/2018](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf) (12 November 2019). Hangin's intended markets and campaigns need an owner and lawyer decision.

The United Kingdom now has a specific statistical-purposes exception. The ICO says consent may be unnecessary only when the sole purpose is aggregate service-improvement statistics, outputs are not personal, no individual decision or profiling occurs, retention ends when aggregation is complete, any third party acts only as processor, clear information is given, and a simple free objection is available. Advertising measurement and partner-linked conversions are excluded. See the ICO's [storage and access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/) (updated 29 April 2026). Cloudflare Web Analytics should not be treated as automatically exempt: Hangin currently has neither the required notice nor objection control, and the contract, purpose, and retention facts still need review.

### Recommended controls

- Keep lead-source context inside page-specific WhatsApp text. If campaign attribution is needed, use a short non-unique campaign label, not a visitor ID, fingerprint, or cross-site pixel.
- Run `npm run verify` before every deployment and the live audit after deployment. Repeat it whenever Cloudflare settings or third-party integrations change.
- Review the browser Network, Application/Storage, and Sources panels from a clean profile in each served region. Code and HTML scans cannot prove that dynamically loaded code is harmless.
- Maintain a processing inventory, privacy impact assessments, legitimate-interest assessments, vendor terms, retention decisions, access reviews, and deletion evidence in one owner-controlled location.
- Minimize Cloudflare products and log retention. Cloudflare documents that HTTP Logpull retention is disabled by default, but that does not establish the settings or retention of every product. See [Cloudflare log retention](https://developers.cloudflare.com/logs/logpull/enabling-log-retention/) (updated 23 April 2026).

## Consent design if a future tool needs it

Only build this control when a reviewed tool actually requires consent. Essential delivery/security must remain available without a toggle. Analytics and advertising must be separate optional categories, both denied by default. No optional resource may load, preconnect, transmit, or create storage before its category is accepted.

The first layer should state the concrete purposes and provide equally prominent **Reject optional** and **Accept selected** actions. A second layer should name each vendor, data, purpose, retention, international transfer, and category. Withdrawal must be available from every page, be as easy as acceptance, immediately stop future loads, and remove non-essential first-party storage where technically possible. A policy or vendor change requires a new choice.

Record at least the policy version, categories, decision, timestamp, mechanism version, and expiry. Avoid adding a visitor identifier merely to prove consent; select a consent-management system and evidence model with counsel. As an operating default, review the choice after six months and sooner after a material change. Six months is an ICO guideline, not a universal statutory duration. See the ICO's [consent-management guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/) (updated 29 April 2026).

If Zaraz is later selected, configure and test its purpose assignments and withdrawal behaviour rather than relying on defaults. Cloudflare's [Zaraz consent documentation](https://developers.cloudflare.com/zaraz/consent-management/) (updated 16 April 2026) says all tools can be managed by its consent system, but an unassigned tool skips consent by default and the operator remains responsible.

## Cloudflare and deployment checklist

1. In the exact production zone or Pages project, verify Web Analytics automatic setup is off. Cloudflare documents both proxied-zone automatic setup and Pages injection in its [setup guide](https://developers.cloudflare.com/web-analytics/get-started/) (updated 17 April 2026).
2. Verify Zaraz is disabled and contains no enabled tools or triggers. Check the served source for `/cdn-cgi/zaraz/i.js`.
3. Inventory Bot Management, Bot Fight Mode, WAF challenges, Rate Limiting, Turnstile, Waiting Room, load balancing, Access, Rocket Loader, Email Address Obfuscation, and Cloudflare Apps. Record injected `/cdn-cgi/` scripts and the cookies actually observed, then compare the cookies with [Cloudflare's cookie reference](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/) (updated 5 May 2026).
4. Record the Cloudflare account owner, plan, hosting/proxy mode, enabled logs/analytics, data locations, retention, users with access, and deletion/export procedures.
5. Review the applicable [Cloudflare Customer DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) (version 6.4, effective 3 April 2026), including controller/processor roles and international-transfer terms.
6. Deploy, then run `scripts/audit-deployed-privacy.mjs` with the approved deployment origin using its documented CLI.
7. From a clean browser profile, inspect every public route for external requests, storage, cookies, service workers, injected scripts, and delayed requests after interaction. Repeat from the Philippines and any intentionally targeted EU/EEA or UK region.
8. Save dated screenshots or exports of the settings and browser results with this record.

## Owner decisions blocking a truthful public notice

- Legal controller's registered name, trading name, physical address, country, and any registration details that counsel says must be shown.
- Privacy contact and the designated data protection officer or accountable person's contact route.
- Employee count, data-subject volumes, sensitive-data volumes, profiling, vulnerable-subject, and risk facts for the NPC registration or exemption decision.
- Cloudflare zone/project, plan, enabled products, cookies, log datasets, retention, access, subprocessor and international-transfer configuration, and DPA acceptance.
- How Hangin staff access, retain, search, export, and delete email and WhatsApp enquiries, and the roles of the email and messaging providers.
- Countries deliberately targeted through advertising, language, currency, agents, packages, or campaigns, including any EU/EEA or UK targeting.
- The exact future attribution question, allowed campaign labels, and who may see the result.
- Any future form, booking, CRM, payment, newsletter, review, map, video, chat, fraud, or advertising vendor; its fields, purpose, basis, recipients, retention, and contract.
- The lawyer-approved publication text, lawful-basis decisions, retention periods, consent model, and response procedure.

Until those facts are confirmed, the current tracker-free implementation is the least-data option, but it does not replace the privacy notice and operational work required before a real public launch.
