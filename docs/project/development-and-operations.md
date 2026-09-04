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

`npm run verify` executes lint, type checking, a production build, and the Node test suite. Tests inspect the static export and therefore must follow a successful fresh build.

## Verified baseline

On 2026-09-04:

- Lint passed.
- Type checking passed.
- `next build --webpack` produced all static routes successfully.
- All 40 Node tests passed.
- The working tree was clean before the documentation work began.
- The local `main` branch was 22 commits ahead of `origin/main`.

The default Turbopack build failed in the restricted Codex sandbox because an internal CSS worker attempted to bind a port and received `Operation not permitted`. An unrestricted build reached the same sandbox restriction, while the supported webpack build passed. This is evidence of an environment constraint, not a source defect. Normal CI should try the project default. Use `npm run build -- --webpack` only when that exact runner restriction is confirmed.

## Deployment state

The deployable artifact is `out/`. The repository currently contains no CI workflow and no checked-in configuration for a hosting provider, CDN, DNS, redirects, security headers, cache policy, previews, artifact provenance, monitoring, or rollback.

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
