# Development and operations

Status: Current
Last verified: 2026-09-04

## Local workflow

```bash
npm ci
npm run dev
npm run verify
npm run build
npm run preview
```

Focused checks are `npm run lint`, `npm run typecheck`, and `npm test`. The preview command serves `out/` on port 4173.

`npm run verify` executes lint, type checking, a production build, the Node test suite, and the static privacy/resource audit. Tests inspect the static export and therefore must follow a successful fresh build.

## Historical baseline (before review remediation)

On 2026-09-04:

- Lint passed.
- Type checking passed.
- `next build --webpack` produced all static routes successfully.
- All 40 Node tests passed.
- The working tree was clean before the documentation work began.
- The local `main` branch was 22 commits ahead of `origin/main`.

The default Turbopack build failed in the restricted Codex sandbox because an internal CSS worker attempted to bind a port and received `Operation not permitted`. An unrestricted build reached the same sandbox restriction, while the supported webpack build passed. This is evidence of an environment constraint, not a source defect. Normal CI should try the project default. Use `npm run build -- --webpack` only when that exact runner restriction is confirmed.

## Deployment state

The deployable artifact is `out/`. The repository contains a Cloudflare-compatible `public/_headers` policy and an internal Cloudflare privacy/security runbook. It contains no CI workflow or applied host, CDN, DNS, redirects, cache, preview, provenance, monitoring or rollback configuration. Checked-in headers are not evidence that a production host applies them.

Before launch, the host must independently verify:

- HTTPS and certificate renewal.
- `www.hanginkitecenter.com` as the canonical origin.
- HTTP, apex, provider-domain, non-trailing-slash, and `index.html` normalization.
- A real 404 response using the exported custom page.
- Suitable cache behavior for hashed framework assets, HTML, metadata, and unversioned public images.
- Security and privacy headers.
- Preservation of all email-related DNS records during nameserver changes.

The future provider-neutral delivery contract is in [`../future/deployment-operations.md`](../future/deployment-operations.md).

## Operational ownership not yet recorded

The repository does not identify the production host, registrar, DNS owner, deploy approver, incident contact, recovery objectives, artifact retention, analytics owner, Search Console owner, privacy contact, or maintenance window. Future specs name these as decision gates instead of inventing them.

## Review-remediation verification

Use `npm run verify` for fresh local evidence. The deployed check is `npm run audit:privacy:deployed -- https://host`; it is read-only and requires a matching local export. It checks the response chain and route coverage, not real-browser execution or legal compliance. See [`../../scripts/README.md`](../../scripts/README.md) and [`../operations/review-remediation-2026-09-04.md`](../operations/review-remediation-2026-09-04.md). Local HTTP fixture tests bind loopback ports and need a runner that allows this.
