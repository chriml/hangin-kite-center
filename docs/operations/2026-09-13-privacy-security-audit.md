# Privacy and security investigation, 2026-09-13

Status: current investigation record

This audit covers the static website at base revision `a4c20d708c515d28c1b1574bd6ae0a20ba7db88f` on branch `codex/site-investigators-2026-09-13`. It tests the site's accepted tracker-free boundary: local static resources, no cookies or browser storage, and direct outbound contact links. It does not establish legal compliance.

## Result

No third-party request or browser-storage activity was observed in the sampled local browser run. The run loaded all 21 public routes at a 390 by 844 viewport in a fresh Chrome context, then completed the kite-size calculator with a 76 kg rider, December to February, and intermediate experience. The sample recorded no cross-origin requests, cookies, local or session storage keys, IndexedDB databases, Cache Storage entries, service worker registrations, or requests caused by the calculator interaction.

The static and deployed privacy auditors each reported zero findings across all 21 routes. The deployed run inspected 100 responses from the frozen baseline preview at `http://127.0.0.1:4198`. Same-origin Next.js prefetch cancellations appeared in the browser log and did not contact another origin.

The investigation found one audit blind spot. Response headers can configure browser reporting or attribution without adding a script or visible HTML. The deployed auditor checked `Set-Cookie`, `Link`, and `Refresh`, but did not check these headers or CSP reporting directives:

- `Reporting-Endpoints`
- `Report-To`
- `NEL`
- `Attribution-Reporting-Register-Source`
- `Attribution-Reporting-Register-Trigger`
- `report-uri` and `report-to` in enforced or report-only CSP

The privacy auditors now reject those declarations in deployed responses and in the exported Cloudflare `_headers` file. Findings use fixed descriptions and omit header values, queries, fragments, and credentials. Detection covers redirect responses and repeated CSP fields. CSP Level 3 defines a comma-delimited list of policies, with semicolon-delimited directives inside each policy, so both separators are policy boundaries for this check.

The checked-in `public/_headers` file contains none of the reporting or attribution declarations. No header change or consent UI is needed for the current static, tracker-free design.

## Skill search and dependency decision

The repository's `find-skills` workflow was used before implementation. The search included privacy, web security, OWASP, and Playwright audit workflows from public skill listings and their source repositories.

| Candidate | Review | Decision |
| --- | --- | --- |
| OWASP Secure Agent Playbook `web-security-review` | Official OWASP source; 312 listing installs at review time. The workflow covers broad application security and dynamic server concerns beyond this static site's accepted boundary. | Not installed. The project-specific auditors and primary standards cover the concrete header gap with less permission and dependency surface. |
| TestDino Playwright skill | 5.6k listing installs and 362 GitHub stars at review time. The listing reported passing Gen and Snyk checks and a Socket warning. Installing it would add third-party skill code, while the existing bundled Playwright runtime already provides the required browser observation. | Not installed. Existing Playwright was sufficient and required no package, lockfile, account, or permission change. |
| General GDPR and privacy-policy skills | Most candidates had low adoption and focused on legal text or consent systems. They could encourage unsupported legal claims or a banner that the accepted tracker-free design does not need. | Not installed. No policy copy or consent mechanism was produced. |

The candidate review considered source ownership, scripts, dependencies, permissions, network behavior, adoption, and published security signals. No new library is justified for a fixed set of response-header names and CSP directive boundaries.

## Verification

The parent investigation baseline ran `npm run verify` successfully with 140 tests and no privacy findings before these edits.

The focused command `node --test tests/privacy-audit.test.mjs tests/deployed-privacy.test.mjs` passed 65 of 65 tests. New fixtures prove that the auditors catch reporting and attribution headers on redirects, catch a `report-uri` directive in a second comma-combined CSP field, inspect the exported `_headers` file, and never copy a fixture token into the report.

After the edits:

- `node scripts/privacy-audit.mjs` reported zero findings, 21 routes, 705 resources, and 635 framework classifications in the current local export.
- `node scripts/audit-deployed-privacy.mjs http://127.0.0.1:4198` reported zero findings, 21 routes, 100 responses, 657 resources, and 559 framework classifications against the frozen baseline preview.
- The final clean build and full repository verification remain the parent investigator's release checks because other investigators were writing independent files in the same branch.

## Sources and limits

Sources were accessed on 2026-09-13:

- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/) defines the header grammar and reporting directives.
- [MDN Reporting API](https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API), [Reporting-Endpoints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Reporting-Endpoints), [Report-To](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Report-To), and [Network Error Logging](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Network_Error_Logging) describe browser-generated report delivery.
- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/) documents the `_headers` file, static-asset scope, and repeated-header behavior.
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) was used as a secondary header inventory check.
- [OWASP Secure Agent Playbook](https://github.com/OWASP/secure-agent-playbook) and the [public skills listing](https://skills.sh/) were used for skill due diligence.

The Python static preview does not apply Cloudflare's `_headers`, so local browser evidence cannot prove production header behavior. DNS lookup for the apex and `www` hosts failed during this investigation, and no live-origin response was available for comparison. Hosting account settings, historical service-worker state, geographic variants, browser extensions, and future deployment changes were not inspected. The run did not follow WhatsApp or email links, send a message, access an account, change DNS, or deploy the site.
