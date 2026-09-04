# Future brief: deployment and operations

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Build, verify, release, observe, and roll back one immutable static artifact through a provider-neutral process. Production must have known owners for repository, host, DNS, TLS, releases, incidents, and recovery.

## Current boundary

The deployable output is `out/`. The repository contains no checked-in CI workflow, hosting configuration, redirect/header policy, preview setup, environment definition, synthetic monitoring, release record, or incident runbook. The README lists generic build/preview commands, but production host, DNS, TLS, and rollback behavior are not recorded.

The application is a static export. Redirects, response headers, authentication for previews, logs, atomic publishing, and rollback are host responsibilities.

## Release architecture

Use one artifact pipeline:

```text
reviewed commit
      ↓
clean CI install, lint, typecheck, build, tests
      ↓
immutable out/ package + manifest + digest + evidence
      ↓
commit-specific preview
      ↓
staging verification and approval
      ↓
production promotion of the same bytes
      ↓
synthetic smoke checks or restore prior digest
```

Do not rebuild between preview, staging, and production. Promotion changes the environment pointer/deployment version, not application bytes.

## Host requirements

Select a static host/CDN that supports:

- Atomic, versioned deploys from an uploaded artifact.
- Commit-specific previews and a protected staging environment.
- Custom domain, managed TLS renewal, IPv4/IPv6 behavior, and DNS documentation.
- Exact redirects, response headers, cache policies, and custom 404 status/body.
- Immediate rollback to a retained deployment without rebuilding.
- Deployment and access logs with configurable retention/redaction.
- Least-privilege API or OIDC deployment and protected production approvals.
- Status visibility, export/migration path, cost controls, and support appropriate to the business.

Provider selection requires an ADR. GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, object storage plus CDN, or another service may be compared; none is selected here.

## Environments

### Pull-request preview

Built from the reviewed revision, labelled with commit and expiry, noindexed through response headers and metadata, and access-controlled if content is sensitive. Preview never receives production secrets or can mutate production data.

### Staging

Uses the exact release candidate artifact, production-equivalent redirects/headers/caching, test-only provider credentials where integrations exist, and a named approval gate. It must not be indexed.

### Production

Receives the approved artifact digest. Only a dedicated deployment identity and authorized release owner can promote. Production secrets, DNS, billing, and provider controls are not exposed to pull-request jobs or autonomous agents.

## Canonical HTTP contract

The preferred origin is currently `https://www.hanginkitecenter.com`. Confirm that choice, then enforce one-hop permanent normalization from:

- HTTP to HTTPS.
- Apex to `www` or the approved reverse.
- Provider-generated hostnames to the canonical origin where supported.
- Non-trailing-slash route variants to the configured trailing-slash form.
- Public `index.html` variants to the clean route.

Avoid redirect chains and loops. Preserve query strings only when they serve a known safe purpose; do not retain personal data or unbounded campaign parameters by default.

Unknown paths must return the exported 404 content with HTTP 404, not a soft-404 200 or redirect to the homepage.

## Caching and headers

- Framework-hashed `/_next/static/` assets: long-lived public immutable caching.
- HTML, sitemap, robots, manifest, and unversioned public images: revalidate so a promoted artifact becomes visible promptly.
- Do not cache private provider responses or preview authentication as public content.
- Configure baseline security headers at the host, including content-type protection, referrer policy, permissions policy, frame control, and HSTS after HTTPS/domain readiness is proven.
- Develop CSP from observed exported scripts, fonts, images, and outbound contact/provider destinations. Begin report-only; enforce only after tests show no required path is blocked. Do not add broad wildcards or `unsafe-eval` to silence reports.

Record the exact effective headers for HTML, assets, 404, sitemap, robots, preview, and provider handoffs.

## CI and supply-chain controls

- Use a pinned Node 24 LTS patch, committed lockfile, `npm ci`, and an ephemeral runner.
- Give each CI job an explicit least-privilege identity and keep unspecified permissions disabled.
- Pin third-party build steps to immutable versions and review update diffs.
- Keep untrusted pull-request code out of privileged release contexts.
- Protect agent instructions, deployment configuration, workflows, and security/runbooks with the selected Git host's ownership controls.
- Require checks, human review, resolved conversations, and a protected production-environment approval.
- If an ADR selects GitHub Actions, use explicit job-level `permissions`, full commit-SHA action pins, protected CODEOWNERS paths, and no untrusted checkout in privileged `pull_request_target` or downstream `workflow_run` jobs.
- Prefer OIDC short-lived credentials over long-lived deployment tokens when the host supports it.
- Generate an artifact manifest, SHA-256 digest, dependency inventory/SBOM, and release evidence. Artifact attestation is recommended when supported.

Autonomous jobs may create reports or draft pull requests. They cannot approve/merge themselves, access production credentials, change DNS, or deploy production.

## Release procedure

1. Select a reviewed commit and record the release owner.
2. Run the clean quality pipeline and package `out/` once.
3. Verify the commit preview, including all routes, 404, contact paths, responsive/browser/a11y checks, and noindex behavior.
4. Promote the same digest to staging and run production-contract HTTP checks.
5. Record approval, current production digest, prior known-good digest, and change summary.
6. Promote to production during the accepted window.
7. Run synthetic checks for homepage, one service page, contact route, 404, redirect variants, certificate, DNS, sitemap, robots, and hashed asset.
8. If a release blocker appears, restore the prior digest and record the incident.

## Monitoring and incidents

At minimum monitor:

- HTTPS availability and certificate expiry.
- DNS answers and canonical redirect behavior.
- Homepage, representative service, contact route, and real 404 status/body.
- Sitemap, robots, and a hashed asset.
- Release/deployment failure and unexpected artifact digest.
- Provider status for any booking, payment, analytics, or commerce handoff after adoption.

Alerts need a named recipient, severity, acknowledgement target, and escalation path. Avoid collecting full visitor URLs or personal data in monitoring.

Runbooks must cover host outage, bad deploy, redirect loop, TLS/DNS fault, broken contact destination, compromised deployment credential, dependency incident, and third-party-provider outage. Each runbook names safe diagnostics, rollback/containment, communications owner, evidence retention, recovery verification, and post-incident review.

## Backup and recovery

Retain source history, lockfile, release manifests, deployed artifact versions, host/DNS configuration export, and required content/media originals according to an approved policy. Test rollback and account recovery on a schedule.

Define:

- Recovery time objective for a bad release and host outage.
- Recovery point objective for content, configuration, and any later dynamic service.
- Artifact retention count/duration.
- Registrar, DNS, Git, host, and payment/commerce account recovery owners.
- Break-glass access storage, logging, rotation, and review.

## Failure and recovery

- CI or verification failure: create no release artifact.
- Preview/staging failure: production remains unchanged.
- Production smoke failure: freeze promotion and restore the prior known-good digest without rebuilding.
- Host outage: follow the provider escalation and approved alternate-host/DNS plan; do not improvise DNS from an agent task.
- Credential exposure: revoke/rotate, inspect audit logs, contain workflows, and follow the incident plan.
- DNS/TLS change: require explicit authorization, record before/after state, lower TTL only through an approved plan, and verify global behavior.
- Rollback fails: escalate to the incident owner and use the documented recovery artifact/configuration, not an unverified local build.

## Acceptance criteria

- A single commit produces one identified artifact reused byte-for-byte through preview, staging, and production.
- Clean CI cannot pass stale output and records tool versions, commands, tests, manifest, digest, and skipped checks.
- Production host choice, configuration, account ownership, support, cost, export, and rollback are recorded in an ADR.
- Preview/staging are noindexed and protected as required; neither can access production credentials or mutate production.
- HTTP tests prove one-hop canonical redirects, TLS, real 404, effective headers, cache policy, sitemap, robots, and assets.
- Production deployment requires protected human approval; agents and PR jobs cannot self-merge or self-deploy.
- The previous artifact can be restored within the approved recovery objective and rollback is exercised.
- Monitoring reaches a named owner and runbooks cover the defined incidents.
- DNS, registrar, host, repository, release, incident, privacy, and provider ownership are documented without placing secrets in the repository.

## Decision gates

The owner must confirm Git host/plan, static host/CDN, canonical domain, registrar/DNS owner, account administrators, release approver, incident contact, budget, deployment window, preview access, log retention, security-header policy, Node baseline, artifact retention, RTO/RPO, monitoring destination, and acceptable provider lock-in.

## Dependencies

This proposed brief covers Phase 0 deployment and operational work that would be implemented only after acceptance. Analytics, booking, and commerce require host capabilities or isolated services and their own secret/log/incident ownership.

## Skills review

No hosting skill should be installed before a provider is selected. Existing planning, security, testing, debugging, and verification workflows cover provider-neutral design. Provider-specific deployment skills require pinned source and permission/network/secret review after the ADR.

## Primary references

- Next.js static exports: <https://nextjs.org/docs/app/guides/static-exports>
- GitHub Actions secure use: <https://docs.github.com/en/actions/reference/security/secure-use>
- GitHub workflow permissions: <https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax>
- GitHub deployment environments: <https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments>
- GitHub OpenID Connect: <https://docs.github.com/en/actions/concepts/security/openid-connect>
- GitHub artifact attestations: <https://docs.github.com/en/actions/concepts/security/artifact-attestations>
- SLSA 1.2 specification: <https://slsa.dev/spec/v1.2/>
- OWASP HTTP headers: <https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html>

Sources accessed 2026-09-04.
