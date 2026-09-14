# Main integration, 2026-09-14

Status: Verified integration; owner authorized merging everything into local main.

## Sources and scope

Base main and fetched origin/main: `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f`. The pending checkout changes were committed as `4bea6dc` (maps, forecasts, related layout changes and founding-year correction). The remaining unmerged named branch is `codex/site-investigators-2026-09-13` at `22248d4bca47b29bf596591db3430f2b519b2ca8`, contributing intermediate image candidates, search/content improvements and reporting-header audit checks. The merge commit records both parents; its diff against the base supplies the complete changed-file inventory.

Four documentation conflicts in the documentation index and current architecture, design and SEO/media records were resolved by retaining both independent additions. Code merged without conflicts. The approved automatic embeds, their exact allowlist and the corrected 2001 year remain alongside the investigation improvements. The source documents and Git references were inspected on 2026-09-14; no new external facts were researched.

Independent scope review confirmed the September 4 detached dirty worktrees are historical snapshots already consolidated by earlier remediation and integration. Their superseded scanners, tests, designs and research renders were not reapplied; those worktrees remain untouched. The previously excluded owner-answer draft described in the September 13 integration record is not imported. Its old worktree registration is stale and does not establish that the draft still exists.

## Evidence

- Pre-integration `npm run verify`: exit 0, 151 passing tests, log `/tmp/hangin-merge-main-verify.log`.
- Combined `npm run verify`: exit 0, lint, typecheck, fresh production static export, 159 passing tests and no static privacy findings; log `/tmp/hangin-merged-all-verify.log`.
- `node scripts/audit-deployed-privacy.mjs http://127.0.0.1:4189`: exit 0, all 21 public routes checked with no findings; report `/tmp/hangin-merged-preview-audit.json`. This target serves the combined fresh export locally.
- Independent code review of both change sets found no actionable important defects. Exact reviewed iframe checks and reporting-header detection coexist in the merged audit.
- Static browser preview confirmed the About heading uses 2001, retains the Google map and includes the revised contact copy. About and Boracay were visually checked at 390 pixels with no horizontal overflow; Boracay retains its Windguru frame. Existing feature-specific browser evidence remains in the linked source reports.
- Working and staged `git diff --check` passed. The four conflict resolutions only combine documentation additions.

## Limits and approval

The user's explicit request authorizes committing and merging locally. No push, production deployment, DNS, account, permission or dependency changes are part of this integration. The Python preview does not apply Cloudflare headers or production redirect/custom-404 behavior. Production HTTP, provider internals, full accessibility and cross-browser checks were not repeated for this merge; no production conformance claim is made. Prior uncommitted-status paragraphs are historical snapshots superseded by this integration.
