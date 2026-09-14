# Static privacy and resource regression audit

Status: Current tooling, integrated 13 September 2026

Run `npm run audit:privacy` after a fresh production build. It requires `out/`, the matching `.next/static/` files, and the typed origin/public routes in `content/site.ts`. `npm run verify` runs this audit after its build and tests. Running the audit alone does not establish build freshness.

Run `npm run audit:privacy:deployed -- https://preview.example` to compare a host with that local export. The local audit must pass first. The remote sitemap must contain exactly the typed indexable routes at the canonical origin, even when the audited host is a preview. A missing or incomplete sitemap fails; known routes are still inspected. Unexpected cross-origin redirects are reported without following them.

Both commands print JSON evidence and exit nonzero for findings or incomplete coverage. They perform no writes to a deployment, send no contact messages, and require no credentials. The deployment command makes unauthenticated GET requests only to the supplied origin and its declared same-origin resources. Review the complete report before treating the result as release evidence.

## Scope

- Parse exported and authored public HTML/SVG and CSS, including standalone files. Inspect exact HTML attributes, responsive image candidates, CSS imports/URLs/image-set strings, SVG `feImage` sources, legacy HTML background images, protocol-relative URLs, anchor pings and inline event handlers. Ordinary outbound navigation is distinct from resource loading. Absolute resources at the same origin are permitted.
- Reject authored public/exported JavaScript files and unclassified executable script declarations. Reject new or changed `use client` boundaries in `app/`, `components/`, `content/` and `lib/`. The reviewed calculator and Boracay navigation entry files are recorded with exact SHA-256 hashes and review references in `reviewed-client-boundaries.json`. A source change requires review before updating its hash. This records reviewed entry files only; it does not audit the behavior of their transitive dependencies. The TypeScript parser reads source directives and site constants without executing application modules.
- Classify exported `/_next/static/` JavaScript only when its bytes equal the corresponding `.next/static/` file. Record SHA-256 evidence. Classify inline Next Flight scripts only when their AST is the supported literal bootstrap or string-data call shape from the installed Next implementation. An arbitrary `_next` path, prefix match or appended executable expression is insufficient.
- Compare all expected exported HTML paths and the separately declared indexable sitemap coverage. `readSiteContract` resolves only literal arrays and their named spreads, including `noindexRoutes`; it never executes site code. Holding pages remain subject to export and remote-resource checks even though they are excluded from the sitemap. Inspect the exported Cloudflare `_headers` file for browser reporting and attribution declarations. On a supplied host, inspect every expected public route, explicitly follow same-origin redirects, check each response for `Set-Cookie`, and record the final response. Follow declared same-origin resources and recursive stylesheet imports; compare requested script bytes with the local build. Unreviewed HTTP `Link`, `Refresh`, `Reporting-Endpoints`, `Report-To`, `NEL`, Attribution Reporting registration headers, or CSP `report-uri`/`report-to` directives fail closed. Header and cookie values are not included in the report. All report URLs retain only origin and pathname: userinfo, queries and fragments are omitted by the shared URL sanitizer, including resource origins, framework entries, response entries and finding locations. Full request URLs remain only in internal callback/queue state, preserving exact query-specific checks. Credential-bearing resources are rejected without requests. Error reports use fixed descriptions instead of copying remote parser/request error text; response media types are normalized categories without arbitrary header text.
- Reject unsupported or unparsed resource-bearing syntax for review. CSSTree can retain modern `@supports` conditions as raw syntax; those conditions and selectors do not fetch resources, while declarations inside their blocks remain inspected. Escaped import syntax that cannot be parsed is rejected. Srcset uses its parser's strict mode, so unsupported candidate syntax fails for review.

## Limits

Google Maps and Windguru now load automatically as static iframes under [ADR 0004](../docs/decisions/0004-automatic-maps-and-forecasts.md), superseding the earlier optional loading in ADRs 0002 and 0003. `reviewed-embeds.json` pins each complete source URL, allowed routes and exact iframe attributes. The audit records only those combinations as `reviewed-third-party-frame` and does not crawl provider internals. Unexpected URLs, parameters, routes, attributes, authored handlers, other embeds and non-frame external resources still fail. A pass therefore permits these initial third-party requests; it does not prove privacy after page load. Verify real iframe rendering separately in a browser.

The accepted kite calculator is the only allowed form: it must remain on `/kite-size-guide/`, labelled by `trip-heading`, have no form ID for external control association, and contain no named submission fields or native submission attributes. Its reviewed client source prevents native submission, and the CSP keeps `form-action 'none'`. Other forms still fail the audit. Focused fixtures prove that adding an action, a field name, or a button submission override fails.

This is static regression evidence. A pass does **not** prove tracking is absent, guarantee CSP compatibility, certify privacy compliance, or verify hosting policy.

The local build and its dependency tree are trusted inputs. A matching framework bundle is not a statement that its execution is harmless. Flight string data is classified as framework transport; its semantics are not audited. Dynamic imports, computed network calls, runtime storage, dependencies' client behavior and browser-selected responses need browser observation and review. The `_headers` check covers browser reporting and attribution declarations; it does not validate the complete security policy or prove that a host applies the file. Non-HTML/CSS resource formats, service-worker history, account settings, geographic variants, other security-header behavior, 404 behavior and redirects from other hostnames require separate checks. The deployed audit has a 15-second per-request timeout, a redirect bound and a resource-count bound; exceeding a bound fails as incomplete.

The response report covers the sampled GETs. It does not exercise a contact action, submit data, inspect a Cloudflare account, or verify production settings. Ordinary WhatsApp links remain navigation and are not followed.

## Parser ownership and dependency review

All additions are pinned **dev dependencies**, absent from application runtime imports. Reviewed 4 September 2026 against primary maintainer documentation, npm package metadata and installed entry points:

| Package | Version | Purpose and ownership |
| --- | --- | --- |
| [parse5](https://parse5.js.org/) | 8.0.1 | Browser-compatible HTML parsing; Ivan Nikulin and contributors including the established HTML tooling maintainers listed in its package metadata. Used by jsdom and other HTML tooling. Depends on `entities`. |
| [CSSTree](https://github.com/csstree/csstree) | 3.2.1 | CSS AST, escape decoding and resource-bearing values; Roman Dvornov / csstree project. Used by Svelte, SVGO and CSSO. Depends on `mdn-data` and the already-used `source-map-js`. |
| [srcset](https://github.com/sindresorhus/srcset) | 5.0.3 | Responsive candidate parsing in strict mode; Sindre Sorhus. No runtime dependencies. |
| [Acorn](https://github.com/acornjs/acorn) | 8.18.0 | Narrow inline JavaScript AST classification; Acorn maintainers. Already present at this version in the baseline lockfile; now direct. No runtime dependencies. |
| [saxes](https://github.com/lddubeau/saxes) | 6.0.0 | Strict sitemap XML parsing, with DTDs rejected; Louis-Dominique Dubeau. Established XML tooling with a slower release cadence; depends on `xmlchars`. |

PostCSS already exists in the build tree. CSSTree was selected for detailed values and escape handling instead of adding a separate PostCSS value parser. Native URL, JSON and crypto APIs handle URL normalization, structured data and byte hashes. The existing TypeScript parser reads the typed site contract.

Package entry points and dependency metadata were inspected for install hooks, network/process execution and ownership. Installation used `--ignore-scripts`; no parser install hooks are required. Parser entry points perform local parsing; only the explicit deployment audit makes network requests. The final installation reported zero npm audit vulnerabilities across the then-installed 367 packages. That snapshot is neither a security guarantee nor a substitute for future lockfile/advisory review. Next and React versions were unchanged.

## Focused tests

`node --test tests/privacy-audit.test.mjs tests/deployed-privacy.test.mjs`

Fixtures use temporary directories and local HTTP servers; they do not call production. The sandbox may reject loopback binding with `listen EPERM`. Run those tests with approved localhost execution when that exact error occurs; do not skip them or replace failures with a passing result. The integration workflow still requires fresh build, lint, typecheck and the full test suite.
