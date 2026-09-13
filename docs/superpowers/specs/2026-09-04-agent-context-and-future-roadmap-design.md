# Agent context and future roadmap design

Status: Proposed
Approval requirement: owner review and an explicit transition to `Accepted` before an implementation plan is written.
Date: 2026-09-04

## Summary

Create a durable context system for people and coding agents, document the website as it exists, and describe future development in independent topic briefs. The documentation must prevent proposed ideas from being mistaken for implemented behavior or confirmed business facts.

The chosen direction keeps the current static Next.js architecture until a capability proves that a separate dynamic boundary is necessary. It makes Phase 0 detailed enough for a later implementation plan and keeps later topics high-level, staged, and decision-gated.

## Problem

The repository had a useful but overloaded root instruction file, two dated design records with different approval states, a small README, typed content spread across several modules, and tests that protect many static contracts. It did not have:

- A clear authority order for user requests, instructions, accepted specs, code, tests, and external evidence.
- An indexed separation between current behavior and future proposals.
- A current product, architecture, content/design, SEO/accessibility/media, and operations reference.
- A common ADR process.
- Topic-specific future briefs for the requested capabilities.
- A documented agent-risk model, provenance trail, and fail-closed behavior.

This gap matters because a coding agent could treat an unapproved visual proposal, stale generated output, or retrieved web text as current authority. It could also introduce a CMS, tracker, booking widget, product offer, or server requirement before Hangin has supplied the business and operational decisions that make the feature truthful.

## Goals

- Give an agent the smallest complete operating context before it changes the repository.
- Keep stable rules in `AGENTS.md` and volatile knowledge in linked topic documents.
- Record confirmed facts and implemented boundaries without inventing missing business data.
- Make every future topic independently reviewable while showing cross-topic dependencies.
- Detail the foundation phase and leave later phases flexible until owner decisions exist.
- Ground recommendations in current repository evidence and primary external sources.
- Record why no additional skill or vendor is selected at the architecture stage.

## Non-goals

This change does not implement public UI, copy, routes, a CMS, localization, browser analytics, booking, payments, commerce, CI, hosting, monitoring, or autonomous maintenance jobs. It does not accept the 2026-08-31 visual refresh, select a provider, publish an unconfirmed fact, or change the current static runtime.

## Documentation architecture

### Root operating contract

`AGENTS.md` contains only durable repository-wide rules:

- Where to start and how authorities are ordered.
- Current static technical constraints and extension boundaries.
- Confirmed-fact and public-media restrictions.
- Required public-copy, design, SEO, accessibility, and privacy rules.
- Development commands and risk-based verification.
- Agent delegation, trust boundaries, risk tiers, and external-action approval.
- The Next.js generated instruction block, preserved verbatim.

The project budgets the common instruction chain below 16 KiB, leaving headroom under Codex’s documented default 32 KiB combined limit. Nested instruction files should be added only for real path-specific deltas.

### Current project documentation

`docs/project/` describes what is implemented and confirmed now:

- [`../../project/product.md`](../../project/product.md): purpose, audiences, conversions, confirmed facts, unknowns, routes, and product boundaries.
- [`../../project/architecture.md`](../../project/architecture.md): static system, modules, data flows, and extension seams.
- [`../../project/content-and-design.md`](../../project/content-and-design.md): content ownership, public voice, visual system, media roles, and implemented/proposed design distinction.
- [`../../project/seo-accessibility-media.md`](../../project/seo-accessibility-media.md): current search, accessibility, media, and artifact-test contracts.
- [`../../project/development-and-operations.md`](../../project/development-and-operations.md): commands, verified baseline, deployment unknowns, and change workflow.

Current documents change with implementation and need a new verification date when materially revised.

### Decisions

[`../../decisions/README.md`](../../decisions/README.md) defines a small ADR template and lifecycle. Significant choices such as host, build-mode exception, CMS, locale URL strategy, analytics collection, or transaction provider receive an ADR. An accepted ADR is not silently rewritten; a later record supersedes it.

### Future development

[`../../future/README.md`](../../future/README.md) gives the dependency order and owner-decision inventory. [`../../future/foundation.md`](../../future/foundation.md) is the detailed first phase. The remaining topics are separate proposed briefs:

- [`../../future/booking-payments.md`](../../future/booking-payments.md)
- [`../../future/content-management.md`](../../future/content-management.md)
- [`../../future/internationalization.md`](../../future/internationalization.md)
- [`../../future/visual-design-ux.md`](../../future/visual-design-ux.md)
- [`../../future/seo-content-growth.md`](../../future/seo-content-growth.md)
- [`../../future/analytics-privacy.md`](../../future/analytics-privacy.md)
- [`../../future/shop-commerce.md`](../../future/shop-commerce.md)
- [`../../future/quality-performance-accessibility.md`](../../future/quality-performance-accessibility.md)
- [`../../future/deployment-operations.md`](../../future/deployment-operations.md)
- [`../../future/agent-maintenance.md`](../../future/agent-maintenance.md)

Each brief uses the same structure: intended outcome, current boundary, recommended stages, requirements, failure/recovery, acceptance criteria, decision gates, dependencies, skill decision, and primary references.

## Architectural direction

### Preserve the static core

At this specification’s September 4 snapshot, the App Router build exported eleven public routes after review remediation and contained no `"use client"` components or runtime third-party integration. The later calculator, Boracay navigation and route additions are recorded in [current architecture](../../project/architecture.md). Content, navigation, metadata, proof media, and direct contact should continue to work as static HTML. Runtime secrets, webhooks, live availability, customer data, and order state belong in a hosted provider or isolated service.

Changing the whole site to a server runtime requires a separate ADR and evidence that a smaller boundary cannot meet the need.

### Centralize records before adding editors or locales

A schema-backed registry should eventually own stable route/page/media/fact/policy IDs and derive navigation, sitemap, metadata, contact context, and lookups. A compatibility adapter preserves current rendered output during migration. Git and pull requests remain the publication boundary; an editor UI is added only when a named workflow cannot operate without it.

Localization depends on this registry so every locale/route pair, alternate URL, translation state, and source revision can be built and checked deterministically.

### Hosted transactions before custom transactions

Booking progresses from human confirmation and unique hosted payment links to one hosted booking pilot. Commerce progresses from the honest current enquiry page to a real enquiry catalogue, then hosted checkout only after inventory, price, policy, legal, accounting, support, and fulfilment ownership exist.

Payment and booking/order state remain separate. Verified, idempotent provider events are authoritative; browser redirects never fulfil a booking or order.

### Measurement starts without a tracker

Search Console, webmaster/profile tools, privacy-reduced host aggregates, and monthly staff counts form the initial baseline. A browser event is considered only for a named unanswered decision and uses a strict field allowlist. Clicks remain distinct from enquiries, bookings, and payments.

### Quality and operations precede expansion

The first implementation phase makes build and test order deterministic, adds browser/accessibility/performance evidence, defines an immutable-artifact release path, verifies production HTTP behavior, records owners, and proves rollback. These controls are prerequisites for dynamic providers and agent maintenance.

### Agent autonomy is evidence-gated

Agents may perform read-only audits and propose reversible repository changes in isolated state. Sensitive work needs independent review and complete relevant evidence. Secrets, DNS, production, billing, destructive changes, external messages, customer data, and permissions always need explicit point-of-action authorization. External content remains untrusted.

## Roadmap order

1. Foundation and launch integrity.
2. Trust and useful first-party depth, including an explicit visual-spec decision.
3. Validated content operations.
4. A narrow booking/payment bridge.
5. One complete human-reviewed locale.
6. A real enquiry catalogue and, only when ready, hosted commerce.
7. Continuous quality, deployment, privacy, security, documentation, and agent evaluation.

This order is dependency-driven rather than calendar-driven. A later capability can advance only when its prerequisites and owner decisions close.

## Alternatives considered

### One large future-development document

Rejected because independent topics have different owners, risks, and acceptance criteria. A single document would encourage partial approval and make context expensive for agents.

### Detailed implementation plans for every topic now

Rejected because provider, policy, owner, locale, host, inventory, and legal decisions are missing. Detailed tasks would create false certainty and stale plans. The common foundation is detailed enough to become an implementation plan only after its named owner decisions close and its status explicitly changes to `Accepted`.

### Select a CMS, booking system, analytics tool, shop platform, or host now

Rejected because the repository does not contain the volume, budget, operational, legal, account, or support inputs needed for a defensible vendor choice. Briefs define ADR criteria and use vendors only as examples.

### Install marketplace skills for each topic

Rejected for this stage. The existing planning, research, writing, frontend, SEO, debugging, review, and verification skills cover documentation. Vendor-specific skills would bias selection; low-adoption or warning-flagged skills would expand supply-chain risk without an implementation need.

### Move immediately to a dynamic Next.js server

Rejected because the public site does not currently need request-time rendering. Hosted services or small isolated boundaries preserve simpler deployment, lower attack surface, and no-JavaScript content/contact behavior.

## Research method

Ten topic agents independently inspected the repository, reviewed current primary sources, evaluated relevant skill candidates, and returned repository facts, staged recommendations, failure cases, acceptance criteria, and owner questions. The primary writer reconciled their outputs against the implemented code and existing design records.

Research preferred official Next.js, OpenAI, W3C, Google Search, GitHub, OWASP, NIST, PCI, Philippine government, and provider documentation. Legal sections identify launch questions for counsel/accounting rather than legal conclusions.

## Acceptance criteria for this documentation change

- Root instructions stay within the project byte budget and retain the generated Next.js block.
- The documentation index distinguishes current, proposed, accepted, superseded, and rejected material.
- Current documents cover product, architecture, content/design, SEO/accessibility/media, and development/operations.
- All ten requested topic briefs exist, contain substantive staged guidance, and link from the roadmap.
- Phase 0 is detailed enough to become an implementation plan after owner decisions.
- Relative repository links resolve and Markdown has no whitespace errors.
- Claims about current implementation match inspected source and fresh verification evidence.
- External recommendations cite primary sources with an access date.
- No provider, skill, legal conclusion, price, availability, or unconfirmed business fact is silently adopted.
- The documentation change is committed separately and awaits owner review before an implementation plan is written.

## Owner review requested

Please review the status and direction, especially:

1. Whether the 2026-08-31 visual proposal should be accepted, revised, or superseded.
2. Whether the phase order matches business priorities.
3. The production host, Git/DNS/release owners, and desired recovery target.
4. Owners for factual review, media rights, publishing, privacy, booking, inventory, payments, refunds, and customer support.
5. The first booking service, first target locale, and whether the Shop should remain enquiry-only during the next phase.

After this written design is approved, create a separate Phase 0 implementation plan with small testable tasks and review checkpoints.

## Core references

- OpenAI Codex AGENTS.md guide: <https://learn.chatgpt.com/docs/agent-configuration/agents-md>
- AGENTS.md open format: <https://agents.md/>
- Diátaxis documentation framework: <https://diataxis.fr/>
- C4 model: <https://c4model.com/>
- AWS ADR process: <https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html>

Sources accessed 2026-09-04. Topic-specific primary sources are listed in each brief.
