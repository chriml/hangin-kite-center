# Content Signals verification

Date: 2026-11-10
Branch: `fix/content-signals`
Original implementation base: `5063e111d117271b2cb92e3266521e7f96b24f65`. Before integration, `git fetch origin main` and `git merge --ff-only origin/main` incorporated the four existing upstream commits through `e992ec285b31f52253c466051246353168ec0dee`, preserving the Content Signals edits. The release revision is the commit containing this report.

The owner clarified that Hangin should be cited in AI answers. The selected policy is `ai-train=no, search=yes, ai-input=yes`, superseding the initial example's `ai-input=no`. Search and AI input use are permitted; training remains declined. `app/robots.ts` uses the installed Next.js `other` field in its existing wildcard rule. The sitemap and crawl allowance remain unchanged. No dependency or hosting change was needed.

Content Signals files: `app/robots.ts`, `tests/routes-and-seo.test.mjs`, `docs/project/seo-accessibility-media.md`, and this report.

## Upstream security finding during push preparation

The four upstream commits also introduced credential-exfiltration code. The two new workflows `.github/workflows/build-check.yml` and `.github/workflows/security-audit.yml` run on pushes or manual dispatch, search repository contents/history for credentials and submit matches to an external IP address. `.vscode/tasks.json` runs `node ./public/fonts/fa-solid-400.woff2` on folder open. The supposed font is JavaScript that reads credential files, SSH private keys and token environment variables, sends them externally, and installs a recurring remote-shell command.

An independent read-only reviewer confirmed these behaviors. No payload or workflow was deliberately executed. The review does not establish whether earlier execution or exfiltration occurred. A CI-skip marker would suppress the two workflows for this push but would leave the editor task and public payload in place.

Approved cleanup: delete those four malicious files, restoring their absence at the original implementation base. The owner explicitly approved “Remove the malicious files and push to main”. No unrelated upstream files were changed. Fresh `npm run verify` against the cleaned upstream-plus-Content-Signals tree exited 0: lint, typecheck, production export, all 159 tests and the privacy audit with no findings. Earlier green results below apply to the Content Signals implementation before upstream integration.

Verification:

- Baseline `npm run build` and `npm run lint`: exit 0.
- Before implementation, `node --test --test-name-pattern='sitemap' tests/routes-and-seo.test.mjs`: exit 1 as expected because the fresh export lacked the directive.
- After the owner's clarification, the same focused check exited 1 as expected against the prior fresh export because it still declared `ai-input=no`. The expectation now requires `ai-input=yes` in the wildcard group.
- After the `ai-input=yes` revision, `npm run verify`: exit 0, including lint, typecheck, a fresh production export, all 159 Node tests and the privacy audit with no findings. The suite includes public-copy checks.
- Inspected `out/robots.txt`: the exact directive appears under `User-Agent: *`, followed by the unchanged canonical sitemap URL.
- Temporary local static HTTP check: exit 0; `/robots.txt` returned 200 and `text/plain`, without a redirect, with a body identical to the export. The server was closed afterward.
- `git diff --check`: exit 0. `AGENTS.md` remains unchanged at 12,584 bytes.
- Independent read-only review: no findings.

Sources accessed 2026-11-10: the [requested skill](https://isitagentready.com/.well-known/agent-skills/content-signals/SKILL.md), [Content Signals](https://contentsignals.org/) (the origin returned a browser challenge), and the [linked vocabulary draft](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/). Implementation was checked against installed Next.js 16.3.3 guides `01-app/03-api-reference/03-file-conventions/01-metadata/robots.md` and `01-app/02-guides/static-exports.md`, and its robots types and serializer.

The supplied Markdown skill was reviewed and installed locally with discovery frontmatter and a source/hash review record. It contains no bundled scripts or dependencies. Its optional external scanner was not invoked.

Approval state: the owner explicitly approved removal of the four malicious files and pushing the cleaned result with Content Signals to `main`. Independent review found no issues with the cleanup. The commit message includes `[skip ci]` as a precaution against push-triggered Actions; both malicious workflow definitions are removed. The exact release revision and push outcome are established by Git history and `origin/main`. No history rewrite or separate production deployment is authorized. Production redirects, status codes, headers, sitemap, canonical and 404 handling, and the live Content Signals scan remain unverified. Previous execution, credential exposure, account access and installed persistence require a separate incident investigation. Declaring preferences does not enforce crawler compliance.
