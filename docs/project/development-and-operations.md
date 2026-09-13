# Development and operations

Status: Current
Last reconciled: 2026-09-13; integration verification is recorded in the [branch integration report](../operations/2026-09-13-branch-integration.md).

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

The deployable artifact is `out/`. The owner connected Cloudflare Pages to GitHub and requested a checked-in Wrangler configuration on 2026-09-13. [`../../wrangler.toml`](../../wrangler.toml) declares the Pages output directory and compatibility date. Its project name defaults to the repository name, `hangin-kite-center`; confirm that this matches the connected Pages project before deployment.

For the Git integration, keep the build command set to `npm run build` and the root directory at the repository root in the Cloudflare dashboard. Wrangler's `pages_build_output_dir = "./out"` selects the artifact to upload; it does not run the build. The deployed revision must also contain `output: "export"` in `next.config.ts`, which makes Next.js create that directory. Files under `public/`, including optimized images, are included in the export. The original `images/` archive is outside the public export.

The configuration is for static Pages hosting with no Functions, Worker entry point, runtime bindings, or Node.js compatibility flag. No Wrangler dependency or deployment script is required for the connected Git build. Local Wrangler state is ignored through `.gitignore`.

Cloudflare's [Pages Wrangler configuration reference](https://developers.cloudflare.com/pages/functions/wrangler-configuration/) and [static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) were consulted on 2026-09-13. For an existing Pages project with runtime bindings or other dashboard configuration, compare or download that configuration before adopting this file. No Cloudflare dashboard settings or production deployment were changed as part of this repository setup.

The repository also includes a Cloudflare-compatible [static header policy](../../public/_headers) and an internal [privacy/security runbook](../operations/cloudflare-privacy-security-runbook.md). Checked-in headers are not evidence that a production host applies them. There is still no CI workflow or checked-in DNS, redirect, cache, artifact-provenance, monitoring or rollback configuration.

### Historical Wrangler setup verification, 2026-09-13

- Base and HEAD: `c49ba0c95b1a1f36a538f07915b00fc541ea6845`, branch `codex/cloudflare-pages-config`; configuration changes remain uncommitted for owner review. Scope: `wrangler.toml`, `.gitignore`, and this document. Concurrent kite-size-guide edits are outside this setup.
- `npm run verify` exited 0: lint, typecheck, fresh Turbopack static export, and all 59 tests passed before the concurrent guide edits. The export contained 236 files; the largest was 1,271,210 bytes.
- Wrangler 4.131.1, run through temporary `npm exec` without changing dependencies, accepted the configuration. Port 4175 was occupied; the local preview started successfully on 49199. It was stopped after verification.
- Local HTTP checks exited 0: `/`, `/about/`, robots, and sitemap returned 200; `/about` redirected to `/about/` and `/index.html` to `/` with 308; a missing route returned 404. HTML headers used revalidation, the 404 used `no-store`, and the homepage retained its production canonical. The initial check script needed an explicit 308 expectation because Python's client did not follow that status automatically.
- Independent review found no actionable issues. `git diff --check` exited 0. Live HTTPS, domain redirects, production headers, dashboard settings, and the connected project name were not verified because no production deployment was requested. No push or deployment was performed.

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

Cloudflare Pages is the selected hosting provider. The exact connected project name and live deployment remain unverified. The owner confirmed control of DNS/hosting for `www.hanginkitecenter.com` on 2026-09-13. The repository does not identify the registrar, account-level DNS configuration, deploy approver, incident contact, recovery objectives, artifact retention, analytics owner, Search Console owner, privacy contact, or maintenance window. Future specs name these as decision gates instead of inventing them.

## Review-remediation verification

Use `npm run verify` for fresh local evidence. The deployed check is `npm run audit:privacy:deployed -- https://host`; it is read-only and requires a matching local export. It checks the response chain and route coverage, not real-browser execution or legal compliance. See [the audit documentation](../../scripts/README.md). Local HTTP fixture tests bind loopback ports and need a runner that allows this.

The [September 4 remediation report](../operations/review-remediation-2026-09-04.md) and [September 5 follow-up](../operations/thread-followup-2026-09-05.md) retain their original branch-specific results. They do not verify the current twenty-one-route site. The [September 13 integration report](../operations/2026-09-13-branch-integration.md) records the branch sources, conflict decisions and new checks. Earlier paragraphs describing uncommitted work are historical task snapshots, not the current Git status.


## GEO implementation, 2026-09-13

The [GEO release runbook](../operations/2026-09-13-geo-discovery.md) records the isolated implementation, crawler and map changes, current platform controls, directory correction draft and pending external actions. The [manual query baseline](../operations/geo-query-baseline.json) contains neutral prompts with no fabricated results. The permanent domain was confirmed by the owner, but DNS resolution and live hosting remain unverified for release. No analytics, account changes, external messages or deployment were added.


## Browser-reporting audit coverage, 2026-09-13

The local and deployed privacy audits now reject unreviewed browser reporting and attribution declarations. They inspect Reporting-Endpoints, Report-To, NEL, Attribution Reporting registration headers, and CSP reporting directives, including comma-combined policies. Local coverage includes the exported Cloudflare `_headers` file; deployed coverage includes redirects and final responses. Reports omit header values and retain sanitized locations. The checked-in header policy itself is unchanged. See [audit tooling](../../scripts/README.md) and the [combined investigation](../operations/2026-09-13-multi-investigator-review.md) for tests and deployment limits.
