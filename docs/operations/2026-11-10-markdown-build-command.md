# Markdown build command and release gate

Status: Current; owner-authorized production correction deployed and verified
Date: 2026-11-10

## Finding

Read-only Cloudflare API inspection confirmed that project `hangin-kite-center` serves production deployment `921b6d45-7f4a-4441-a860-fcd4213847bc`, created at 17:32:43 UTC from `36ac439e4607293be42b76e82a6c6d2896cfad40`. It includes Functions and completed successfully, but both its build command and the current project setting are `npx next build`, output `out`, repository root. That command skips the Markdown generator required by [ADR 0005](../decisions/0005-markdown-content-negotiation.md).

At 17:44 UTC, `GET https://hanginkitecenter.com/` with `Accept: text/markdown` returned HTTP 200 and `Content-Type: text/html; charset=utf-8`, with `Vary: Accept`. `HEAD /index.md` returned 404. These observations and the recorded build configuration explain the middleware's HTML fallback: no Markdown twin was deployed.

## Repository correction

Base and HEAD: `36ac439e4607293be42b76e82a6c6d2896cfad40`. Branch: `fix/markdown-build-lifecycle`. Changes remain uncommitted for review: `package.json`, `docs/README.md`, `docs/project/development-and-operations.md`, and this record.

An independent read-only review found that the combined build command forwarded `--webpack` to the converter instead of Next. The documented fallback was reproduced with `npm run build -- --webpack`: exit 1, converter ENOENT for a directory named `--webpack`. `package.json` now uses `build: next build` and `postbuild: node scripts/build-markdown.mjs`. npm runs the generator after a successful Next build, and arguments reach Next. No dependency, Next configuration, route, public copy or host setting changed.

## Verification

Before the lifecycle correction, `npm run verify` exited 0: lint, typecheck, fresh default production build, 21 Markdown pages, all 170 tests and privacy audit with zero findings. Logs: `/tmp/hangin-markdown-verify.log`.

The failing fallback reproduction exited 1 and is recorded at `/tmp/hangin-markdown-webpack-before.log`. After the correction, `npm run build -- --webpack` exited 0, explicitly used Next's webpack build, and generated all 21 Markdown pages through `postbuild` (`/tmp/hangin-markdown-webpack-after.log`). Final `npm run verify` exited 0 with lint, typecheck, fresh default production build, all 170 tests passing, and zero privacy-audit findings (`/tmp/hangin-markdown-final-verify.log`). `git diff --check` passed. `AGENTS.md` was unchanged at 12,841 bytes; new relative documentation links were checked. The installed Next.js CLI guide confirms npm flag forwarding and the webpack option at `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md`.

The supplied Markdown negotiation skill was reviewed and installed locally. It contains guidance and links, with no scripts or dependencies. Its scan was initially deferred until release authorization; the successful post-deployment scan is recorded below. No browser accessibility review was run because the correction changes build orchestration only.

## Approved release action

The approved action was to change only the Cloudflare Pages build command from `npx next build` to `npm run build`, preserve output `out`, and rebuild production. Retrying the already-deployed revision fixes the live missing-Markdown defect; the local lifecycle correction remains available for separate review and release.

The initial investigation performed no production writes. The owner subsequently answered “yes” to changing Cloudflare's build command and rebuilding production. Under that explicit authorization, the project build command was changed to `npm run build`; output `out` and the empty repository-root setting were confirmed unchanged. Production deployment `e49111a5-246a-4d51-b691-9b19ab6f8323` retries the already-deployed commit `36ac439e4607293be42b76e82a6c6d2896cfad40`. This does not publish the local lifecycle correction. No push or merge was performed.

Rollback, if core HTML or contact routes regress: use Cloudflare's deployment rollback to restore `921b6d45-7f4a-4441-a860-fcd4213847bc`; restore build command `npx next build` only if reverting this configuration is necessary. That prior artifact retains the original missing-Markdown defect. No rollback was needed.

## Production verification

Cloudflare finished production deployment `e49111a5-246a-4d51-b691-9b19ab6f8323` successfully at 17:50:21 UTC. The project API confirmed it as the canonical deployment. Build logs explicitly recorded `Executing user command: npm run build`, successful compilation, and `Wrote 21 Markdown pages` at 17:50:10 UTC.

Live checks at approximately 17:51 UTC exited 0:

- All 21 public routes returned HTTP 200 with `text/markdown; charset=utf-8` for `Accept: text/markdown`, and HTTP 200 HTML for default requests. Both variants included `Vary: Accept`.
- Markdown had frontmatter, one H1, absolute WhatsApp links, positive `x-markdown-tokens`, the existing Content Signal policy, and preserved CSP, HSTS, referrer and content-type security headers. No script, style, div or iframe markup remained.
- Events and all three pending safari pages retained noindex headers; other routes did not gain noindex.
- Markdown HEAD requests to `/` and `/events/` returned no body. A missing page retained HTTP 404 HTML. Direct Markdown assets worked, including Events' noindex rule. Robots and sitemap returned HTTP 200.
- `/about` retained its HTTP 308 redirect to `/about/`. The www route retained HTTP 301 to the apex, preserving path and query.
- `POST https://isitagentready.com/api/scan` with the public site URL returned `checks.contentAccessibility.markdownNegotiation.status = "pass"`, message `Site supports Markdown for Agents`, and evidence of HTTP 200 with `text/markdown; charset=utf-8`.

Evidence: `/tmp/hangin-markdown-live-check.py`, `/tmp/hangin-markdown-live-check.json`, `/tmp/hangin-postdeploy-md.headers`, `/tmp/hangin-postdeploy.md`, and `/tmp/hangin-markdown-agent-scan.json`. The first verification attempt using Python urllib received HTTP 403; the same checks using curl passed, as did the independent hosted scan. No firewall or access policy was changed. These checks establish the requested negotiation behavior, not universal crawler access or overall agent-readiness compliance.

## Sources

Accessed 2026-11-10:

- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
- [Supplied Markdown negotiation skill](https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md)
- Cloudflare Pages project API, read-only; live HTTP checks described above.
