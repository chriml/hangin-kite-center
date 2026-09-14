# Performance investigation, 2026-09-13

Status: Current investigation and implementation record

## Outcome

High-density phones were downloading the full hero image on five image-led routes because the static `srcset` jumped directly from a 600px or 900px candidate to a 1000px, 1600px or 1800px source. The 1000px sources remain appropriate because they are already close to the required size. Five larger hero sources now have a 1200px WebP candidate. The existing eager loading, high fetch priority, intrinsic dimensions, static export and local delivery remain unchanged.

On the two routes where the hero was the Largest Contentful Paint element in the measured profile, median image LCP improved by 1.14 seconds on Lessons and 2.08 seconds on the Boracay guide. Cumulative Layout Shift remained 0 in every sampled run.

| Route | Selected image before | Selected image after | Image bytes before | Image bytes after | Reduction |
| --- | --- | --- | ---: | ---: | ---: |
| Lessons | full 1800px owner photo | 1200px candidate | 107,988 | 56,310 | 47.9% |
| Kite safaris | full 1600px illustration | 1200px candidate | 413,004 | 186,600 | 54.8% |
| Accommodation | full 1600px illustration | 1200px candidate | 544,694 | 238,592 | 56.2% |
| Boracay guide and its child routes | full 1800px owner photo | 1200px candidate | 200,802 | 93,700 | 53.3% |
| About | full 1800px owner photo | 1200px candidate | 360,340 | 174,984 | 51.4% |

The homepage keeps its full 1800px hero. Its tall cover crop needs substantially more source width than the element's 390px CSS width, and Chrome continued to choose the full source when a 1200px experiment was present. That unused candidate was removed. The homepage LCP remained the H1: 2.152 seconds median before and 2.164 seconds in the after-change regression sample.

## Measurement method and limits

The baseline was the fresh static export at revision `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f`, served at `http://127.0.0.1:4198`. The after export was served at `http://127.0.0.1:4199`. Both used the repository's Python static preview behavior. Measurements used Playwright with local Google Chrome 152.0.7977.83, a new browser context and disabled cache for each run, a 390×844 viewport at device pixel ratio 3, 4× CPU slowdown, 150ms request latency, 1.6Mbps download and 0.75Mbps upload. A buffered `PerformanceObserver` captured LCP and layout shifts. Resource Timing identified the selected image and encoded body bytes.

| Image-LCP route | Baseline runs | After runs | Median before | Median after | Change | CLS |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Lessons | 3.372s, 3.372s, 3.104s | 2.236s, 2.408s, 2.216s | 3.372s | 2.236s | -1.136s (-33.7%) | 0 |
| Boracay guide | 5.288s, 5.340s, 5.284s | 2.696s, 3.224s, 3.208s | 5.288s | 3.208s | -2.080s (-39.3%) | 0 |

These are controlled local lab results, not field Core Web Vitals. The preview server sends HTML, CSS and JavaScript without HTTP compression, so its pagewide transfer totals do not represent CDN delivery. WebP image comparisons remain useful because the images are already compressed and were served identically before and after. The public `www` and apex hostnames did not resolve from this environment, so production CDN behavior, real latency, cache headers and field data were not measured. The after export contained contemporaneous repository work from other investigators; the comparison therefore uses the directly attributable selected hero resource and image LCP rather than claiming a pagewide transfer delta.

## Evidence and decisions

The cold homepage trace transferred about 1.26MiB by load in the uncompressed preview and produced a text LCP around 2.15 seconds. Six framework JavaScript resources accounted for about 460KiB uncompressed, or about 137KiB when locally gzipped. Four preloaded WOFF2 files accounted for 69,072 bytes. These were not changed: the site already has narrow client boundaries, no third-party runtime and framework-emitted self-hosted fonts. A separate variable-font experiment could test whether the three Barlow Condensed weight files can be consolidated without visual or layout changes, but the current image-LCP defect had stronger measured evidence.

Native lazy-loaded images immediately below the viewport began around DOMContentLoaded. Chrome assigned them Low priority, while the hero remained High. No redundant `fetchPriority="low"` override or JavaScript lazy-loading boundary was added.

Next.js 16.3.3's installed Image documentation says intrinsic dimensions avoid layout shift, `sizes` controls responsive candidate selection and `loading="eager"` or `fetchPriority="high"` is normally preferable to preload for an LCP image. The implementation preserves those contracts and adds only the missing width. Sources reviewed 2026-09-13:

- Installed guide: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`; public counterpart: [Next.js Image documentation](https://nextjs.org/docs/app/api-reference/components/image).
- Installed guide: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`; public counterpart: [Next.js Font documentation](https://nextjs.org/docs/app/api-reference/components/font).
- [Vercel React Best Practices skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) and [Vercel agent-skills documentation](https://vercel.com/docs/agent-resources/skills).

## Skill selection and security review

The required `find-skills` workflow searched the skills.sh leaderboard and `npx skills find "react nextjs performance"`, then compared the available community results with Vercel's official skill. The search ranked `affaan-m/ecc@react-performance` first with 4.7k installs; it was not installed because Vercel publishes a purpose-built React and Next.js performance skill from a more established first-party source.

`vercel-labs/agent-skills@vercel-react-best-practices` was reviewed before installation. At review time the source repository had 31,160 stars and 2,749 forks. The selected skill contains Markdown guidance and rule files, no executable scripts, runtime dependencies, secrets, credentials, external service calls or permission changes. Its skill metadata declares MIT, while the GitHub repository API returned no root license identifier and the repository has an open license-file issue; the guidance was therefore treated as reviewed advice rather than executable authority. The installer reported Gen Safe, zero Socket alerts and Snyk Low Risk. The global copy installed successfully at `~/.agents/skills/vercel-react-best-practices`; an unrelated PromptScript adapter reported that it does not support global skill installation. No production dependency was added to this project.

The applied workflow also used systematic debugging to trace browser candidate selection, test-driven development for the exported `srcset` contract, and verification-before-completion for fresh evidence.

## Implementation record

Performance-owned changes:

- `components/responsive-image.tsx`: emits the optional intermediate candidate.
- `content/images.ts`: records the five measured 1200px candidates and keeps image metadata typed.
- `public/images/generated/*-1200.webp` and `public/images/owner/*-1200.webp`: quality-80 Sharp derivatives with source metadata omitted and source aspect ratio preserved.
- `docs/project/owner-media.json` and `public/images/ATTRIBUTION.md`: dimensions, bytes, transformations and provenance.
- `tests/performance-contract.test.mjs`: checks the exported high-priority hero `srcset`, static artifact, byte reduction and attribution.

Authorization: the user requested each investigator to apply bounded fixes directly. No commit, push, merge, deployment, production action, dependency change or public fact change was performed.

Verification evidence:

- Baseline `npm run verify`: exit 0, 140/140 tests, reported by the parent investigator before edits.
- Red test: `node --test tests/performance-contract.test.mjs` failed on the missing homepage candidate as expected before implementation.
- Focused `npm run typecheck`: exit 0.
- Focused ESLint for the component, content and performance test: exit 0.
- Round-two fresh build completed. The suite reached 145/146 passes; its only failure was the new test detecting that two generated-art attribution entries used paths relative to `public/images` instead of exact public URLs.
- After correcting those two ledger paths, `node --test tests/performance-contract.test.mjs`: 1/1 pass.
- All five retained derivatives were visually inspected at their native 1200px output. Subjects, source aspect ratios and generated-art composition remain intact.
- Final coordinated `npm run verify`: exit 0, 148/148 tests, fresh static export and no privacy findings (`/tmp/hangin-investigators-final-verify.log`).

The final verification includes the other investigators' integrated changes. The focused test and resource traces above isolate the performance-owned responsive-image behavior.
