# Future development roadmap

Status: Proposed
Research date: 2026-09-04
Owner approval required before implementation

## Direction

Grow the site without weakening the small static core. Business facts, content, media, routes, and policies become validated records with named owners. Visitor-facing integrations use hosted services before custom servers. Every dynamic capability keeps WhatsApp or email as a working fallback and passes explicit security, privacy, accessibility, and operational gates.

The roadmap is provider-neutral. A product brief may name a provider as an example, but selection requires an ADR covering eligibility, cost, exportability, data terms, accessibility, operational ownership, and failure behavior.

## Sequencing

| Phase | Outcome | Detailed now? |
| --- | --- | --- |
| 0. Foundation and launch integrity | Reliable context, content ownership, deterministic CI, browser-quality baseline, host contract, and no-tag measurement baseline | Yes, in [`foundation.md`](foundation.md) |
| 1. Trust and useful depth | Approved visual direction, accessible shell, verified service detail, authentic Hangin proof, local entity completeness, and contextual linking | High-level topic briefs |
| 2. Content operations | One validated content registry, Git review/publishing, and an editor pilot only if needed | High-level topic brief |
| 3. Booking bridge | Staff-confirmed hosted payment links, then one hosted booking pilot if live availability is justified | High-level topic brief |
| 4. Localization pilot | One complete, human-reviewed locale with static URLs and correct SEO/accessibility metadata | High-level topic brief |
| 5. Commerce pilot | Real enquiry catalogue, followed by hosted checkout only after inventory, policy, and legal readiness | High-level topic brief |
| Continuous | Performance, accessibility, testing, deployment, security, documentation, and agent evaluation | High-level topic briefs |

This is a dependency order, not a promised schedule. A later phase can move earlier only when all of its prerequisites and owner decisions are closed.

## Topic briefs

| Topic | Brief | Main prerequisite |
| --- | --- | --- |
| Booking and payments | [`booking-payments.md`](booking-payments.md) | Offers, availability rules, policies, operator, provider decision |
| Content management | [`content-management.md`](content-management.md) | Content inventory, schema, owners, Git workflow |
| Internationalization | [`internationalization.md`](internationalization.md) | Central content/route registry, target locale, human reviewer |
| Visual design and UX | [`visual-design-ux.md`](visual-design-ux.md) | Decision on the 2026-08-31 refresh and real asset availability |
| SEO and content growth | [`seo-content-growth.md`](seo-content-growth.md) | Launch integrity, first-party facts, profile ownership, baseline data |
| Analytics and privacy | [`analytics-privacy.md`](analytics-privacy.md) | Named measurement decisions, host/data inventory, legal review |
| Shop and commerce | [`shop-commerce.md`](shop-commerce.md) | Real products/images, inventory owner, policies, legal/accounting review |
| Quality, performance, accessibility | [`quality-performance-accessibility.md`](quality-performance-accessibility.md) | Deterministic build and pinned browser environment |
| Deployment and operations | [`deployment-operations.md`](deployment-operations.md) | Host, repository plan, DNS access, owners, recovery targets |
| Agent-driven maintenance | [`agent-maintenance.md`](agent-maintenance.md) | Accepted specs, deterministic CI, branch protection, eval baseline |

## Cross-topic dependencies

- Content management precedes localization because locale paths, messages, metadata, and translation status need stable IDs and schemas.
- Deployment precedes analytics, booking, and commerce because static redirects, headers, secrets, webhooks, logs, previews, and rollback live outside the exported app.
- Analytics starts without browser tracking. Booking and commerce systems later become the authoritative source for confirmed outcomes.
- Booking and commerce share payment/security principles but have different operational models. Lessons, rentals, stays, safaris, and products must not be forced into one generic transaction type.
- Visual, accessibility, performance, SEO, privacy, and agent safeguards are release requirements across every phase.
- A switch from static export to a server runtime affects every topic and requires an ADR before implementation.

## Decisions that need owner input

The repository cannot decide:

1. The production host, registrar/DNS owners, release approver, and incident contact.
2. Who owns factual review, media rights, privacy, publishing, inventory, bookings, refunds, and customer support.
3. Whether the 2026-08-31 visual refresh is accepted, revised, or superseded.
4. Exact products, services, prices, taxes, deposits, capacity, lead times, cancellation/no-wind/refund rules, and opening hours.
5. Target languages, staff support languages, translation reviewers, and locale order.
6. Whether current aggregate measurement is sufficient and which jurisdictions and lawful bases apply.
7. Product catalogue scope, stock source, fulfilment geography, invoice process, and return/warranty rules.
8. Acceptable recovery time, retention, maintenance window, automation cost, and autonomy limits.

Every topic brief identifies the smallest useful work that can proceed before those choices and the exact gate that blocks public launch.

## Research and skill policy

Ten independent topic reviews checked the repository, current primary documentation, and the public skill ecosystem. No additional skill was installed. Existing `superpowers`, `openai-docs`, `no-ai-slop`, `frontend-design`, and `seo-audit` workflows cover the planning stage. Strong optional candidates are recorded in the relevant briefs, but vendor-specific, low-adoption, or warning-flagged skills must wait for a real implementation need and manual source review.

Core documentation references include:

- OpenAI Codex `AGENTS.md`: <https://learn.chatgpt.com/docs/agent-configuration/agents-md>
- AGENTS.md open format: <https://agents.md/>
- Diátaxis documentation structure: <https://diataxis.fr/>
- C4 architecture model: <https://c4model.com/>
- AWS ADR process: <https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html>

All were accessed on 2026-09-04.
