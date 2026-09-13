# Lead capture, WhatsApp and direct marketing

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal evidence record and proposed future contract. Contract version: `hangin-inquiry-v1-draft` (not a live endpoint or accepted service architecture).
Evidence checked: 2026-09-04 against `content/site.ts`, current product/architecture records and the integration baseline `0b5ec7d`.

Philippine-lawyer review is required for final notices, lawful-basis choices and business-specific legal conclusions. This report completes preparation; it does not assert that Hangin's messaging operations comply or that a privacy notice has been delivered.

## Current behavior and obligations

The static site has no first-party form, lead database, submission endpoint, CRM, analytics or marketing opt-in. WhatsApp links use `https://wa.me/639380101849?text=…`, open a new tab and include fixed draft text. Clicking contacts WhatsApp and supplies the draft in the URL. The visitor chooses whether to send a chat message to Hangin. A click does not establish an enquiry, consent, a booking or marketing permission. Email opens the visitor's configured mail application. Once an enquiry reaches a business inbox, off-site personal-data processing occurs even though this repository stores no leads.

| Primary evidence; accessed 2026-09-04 | Applies now | Future trigger |
| --- | --- | --- |
| [Data Privacy Act, §§11–13,16,20–21](https://privacy.gov.ph/data-privacy-act/), RA 10173 (2012) | Identify the controller, necessary data, purpose, lawful basis, recipients, safeguards, retention and rights handling for inbox processing. Contract/pre-contract necessity may fit answering a person's requested service enquiry; the owner must confirm the actual purpose and necessity. | A form, CRM, booking record, upload, profiling or marketing campaign needs a defined processing record before collection. |
| [NPC Circular 2023-04, §3(D)(3)(c), §3(D)(5)](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf), issued 2023-11-07 | Deliver the relevant notice before processing or at the next practical opportunity. Notice is required even when another lawful basis applies; a privacy notice is not a blanket consent request. | If consent is chosen, it must be specific, informed, evidenced and withdrawable, with separate purposes. |
| [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/), live policy | Business messaging requires expected, permitted communications and respect for opt-outs. A service enquiry is not permission to send unrelated offers. Actual account type is unconfirmed. | Business Platform-specific template and 24-hour service-window rules apply if that product is selected; do not describe them as behavior implemented by this site. |

EU/UK territorial and electronic-marketing rules need the separate tourist-privacy scope assessment if those audiences are deliberately targeted or tracked. Nationality alone does not establish GDPR scope. Do not launch marketing based on an unreviewed assumption that Philippine consent alone covers every recipient.

## Channel-wide notice delivery

The contact page alone cannot cover visitors using homepage, footer or service-page links, or people who discover the phone number elsewhere. The owner must confirm which of the following already occurs and supply the exact text/version and delivery evidence:

- A concise first layer alongside shared WhatsApp/email contact paths, linked to a complete published notice once its facts are verified.
- The complete notice or its first layer and accessible link in the first practical WhatsApp/email response to new enquiries, including direct arrivals. A business profile or automated greeting may support delivery but does not prove the person received it; staff need a manual fallback.
- A recorded notice version and date/channel of delivery in the restricted enquiry record. The record should not imply consent merely because a notice was sent.
- A new just-in-time explanation before collecting data for a materially different purpose, such as a complaint, payment, participant safety or discount verification.

Pending owner facts, factual UI wording may say: “WhatsApp opens in a new tab with a draft message. You choose whether to send the chat message to Hangin.” A separate first-contact data-minimisation line may say: “For your first message, share your dates, riding level and the service you need. Leave out passport, payment and medical details.” This is not a complete processing notice. Do not publish claims such as “we never share your data”, “we delete messages after 30 days”, or “nothing is sent until you press send” without supporting facts.

The full notice must identify the legal controller and privacy contact; data categories; each purpose and basis; required/optional fields and consequences; actual staff/vendor recipients and transfers; concrete retention rules; rights and complaint routes; and applicable automated decisions. It must match real inbox, backup and device practices. Until those facts are supplied, notice publication remains blocked and operational notice delivery remains unverified.

## Exact owner intake

| Decision owner | Evidence needed | Gate closed by evidence |
| --- | --- | --- |
| Business owner | Legal controller name/entity, service address, authority for the displayed trade name, privacy contact and person accountable for this process. | Complete controller/contact disclosure. |
| Inbox administrator | WhatsApp product (personal app, Business app or Platform), account owner, any provider/CRM, linked devices, staff access, greeting/profile text and email provider/configuration. | Accurate channel, recipients and notice delivery. |
| Operations owner | Enquiry-to-booking steps, data actually requested, exports/forwarding, third-party transfers, approved retention per enquiries/bookings/complaints and backup deletion limits. | Purpose/basis/retention and operational notice. |
| Privacy lead/counsel | Basis by purpose; sensitive-data workflow; request verification; response procedure; cross-border assessment; breach owner. | Processing and rights procedure. |
| Marketing owner, if marketing is proposed | Message categories, channel/country targeting, opt-in wording, consent evidence, unsubscribe handling, suppression record and campaign access. | Marketing launch only; no current campaign authorized. |

No personal customer records, credentials, message bodies or ID scans belong in Git, exported JSON, test fixtures, analytics or URLs. Store evidence in restricted business systems and reference it by non-sensitive record ID.

## Reusable future enquiry contract v1

This specification is complete enough to review or implement after architecture acceptance. The website remains static now. An actual submission needs an accepted separate backend/hosting decision, selected processor and tested delivery path. Do not add a static form that silently discards messages.

| Field | Contract and purpose |
| --- | --- |
| `contractVersion` | Literal `hangin-inquiry-v1`; server rejects unsupported versions. |
| `service` | Required enum `lessons`, `rental`, `storage`, `safari`, `stay`, `shop`, `general`; no inferred availability. |
| `replyChannel` | Required enum `email`, `whatsapp`; controls the single required address field. |
| `replyAddress` | Required address appropriate to selected channel. Use maintained email/phone validation; reject malformed values without logging them. |
| `name` | Optional, maximum 100 characters. No legal-name or ID requirement for an ordinary enquiry. |
| `arrivalDate`, `departureDate` | Optional ISO dates; departure cannot precede arrival. No hidden timezone conversion. |
| `ridingLevel` | Optional enum `beginner`, `progressing`, `independent`, `advanced`, `unsure`; informational only. |
| `message` | Required plain text, 1–2000 characters; escaped on display. Warn against sensitive data; do not invite uploads. |
| `noticeVersion` | Required identifier for the exact notice presented, validated against deployed versions. This records notice delivery, not consent. |
| `marketingChoices` | Optional list of explicit channel/purpose opt-ins; default empty, no preselected controls. No marketing checkbox is needed to send an enquiry. Omit this field entirely until a marketing purpose is accepted. |

No arbitrary extra keys, file uploads, payment details, diagnosis, passport numbers, date of birth or child account fields. The approved minors/safety workflow must handle participant information separately. Validation runs server-side with a maintained schema library as well as native client constraints; the server assigns receipt time, random record ID and delivery status. It must not trust a client timestamp or client claim that a message was delivered.

Submission uses HTTPS POST with a bounded body, rate limiting, CSRF/origin protection appropriate to the chosen deployment, and an idempotency key scoped to the submission. The backend stores only data needed for the approved workflow. Logs use event IDs/status codes, never payloads. A safe retry with the same key returns the prior result; an incompatible payload with that key is rejected. No payload appears in a query string.

Responses distinguish `accepted` (durably queued), `validation_error` with field errors, `rate_limited` with retry guidance, and `unavailable`. Only confirmed queue/delivery behavior can justify a success message. Preserve entered data accessibly after an error without browser persistence by default. Provide WhatsApp and email fallback when unavailable. Never label enquiry receipt as booking confirmation.

## Marketing operation contract

Maintain a restricted, purpose-specific consent record containing recipient reference, channel, purpose/category, exact consent-text version, notice version, affirmative action, timestamp, source and withdrawal. Check permission and suppression before each campaign. Honour opt-out in WhatsApp, email and any other received channel; disable queued marketing and provider lists as well as local lists. Retain the minimum suppression evidence under an approved basis and period so deletion does not accidentally resubscribe someone. Separate necessary service replies from promotions, and avoid bundling promotions into service templates. This is a proposed future control, not evidence of existing consent.

## Acceptance and verification

Current integration checks must cover all generated WhatsApp URLs, generic-only prefill, no form endpoint, visible new-tab explanation where used, working email fallback and no client tracking. Read every affected page at desktop/mobile and keyboard focus states.

Future implementation must test valid/invalid and oversized input, unsupported versions, extra fields, no-marketing submission, independent opt-ins, withdrawal propagation, duplicate submission, provider failure, delivery status, redacted logs, accessible errors and fallback without JavaScript. Test with synthetic data only. Confirm notices through both website and direct WhatsApp/email arrival. No future-form tests are claimed as run by this report.

## Direct source clarification, 2026-09-05

[NPC Advisory Opinion 2023-016](https://privacy.gov.ph/wp-content/uploads/2023/11/Advisory-Opinion-No.-2023-016.pdf), dated 8 September 2023 and officially rechecked 2026-09-05, rejects silence or failure to opt out as consent in the submitted soft-opt-in scenario. It is a case-specific opinion. Other lawful criteria require their own assessment; this is not permission to switch a withdrawn consent to another basis. Read it with the channel-specific marketing and NTC-SMS discussion in the [master matrix](compliance-matrix.md).

[NPC Advisory 2023-01](https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Advisory-No.-2023-01-Guidelines-on-Deceptive-Design-Patterns_7Nov23.pdf), dated 7 November 2023 and officially rechecked 2026-09-05, addresses deceptive presentation and language. For any later accepted consent interface, test that optional purposes start unselected; declining remains clear and does not block the unrelated enquiry; refusal is not hidden or shamed; repeated prompts do not pressure acceptance; and withdrawal is no harder than granting consent. Explain data, purpose, scope and the controller plainly. These are future acceptance criteria, not an implemented consent UI or an approved campaign.
