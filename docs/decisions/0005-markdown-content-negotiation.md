# 0005: Markdown content negotiation for agents

Status: Accepted under the owner's explicit request
Date: 2026-11-10
Owner: Site owner

## Context

Agents that read the site have to parse full HTML pages, including layout markup, navigation and scripts. The owner asked for content negotiation: a request with `Accept: text/markdown` should receive a Markdown representation of the page, while browsers keep receiving HTML by default.

The site is a Next.js static export hosted on Cloudflare Pages. Static files alone cannot vary the response for one URL by request header, so negotiation needs a request-time step at the host. `AGENTS.md` requires an accepted ADR for that.

## Options considered

1. Cloudflare zone setting "Markdown for Agents". Converts HTML at the edge with no repository code. It needs a Pro or higher zone plan and a dashboard or API change. Its default `Content-Signal` is `ai-train=yes`, which conflicts with the site's `ai-train=no` policy unless the origin sets the header. The zone plan is not recorded in the repository.
2. Build-time Markdown files plus a Cloudflare Pages middleware (selected). Works on any Pages plan, is versioned and tested with the site, and keeps the Markdown limited to text already exported in the HTML.
3. Separate `.md` URLs or `llms.txt` only. Does not satisfy negotiation on the canonical URL.

## Decision

- `npm run build` runs `scripts/build-markdown.mjs` after `next build`. It converts the `<main>` and `<footer>` of every exported `index.html` into `out/<route>/index.md`, with YAML frontmatter for title, description, canonical URL and robots. Error pages are skipped. Scripts, hidden elements, form controls, SVG and provider iframes are dropped; links and image sources become absolute URLs. It uses the existing `parse5` development dependency.
- `functions/_middleware.js` is the only Pages Function. For `GET` and `HEAD` on trailing-slash routes it serves the Markdown twin when the `Accept` header ranks `text/markdown` at least as high as `text/html`. It sets `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `x-markdown-tokens` (estimate of characters divided by four), the site's `Content-Signal`, and `X-Robots-Tag: noindex` for routes that are noindex in HTML. All other page responses pass through unchanged apart from `Vary: Accept`. Missing Markdown falls back to the HTML response, including the static 404.
- `public/_routes.json` excludes static asset folders from the Function. `public/_headers` gives direct `.md` URLs a Markdown content type, the site `Content-Signal`, and a `Link` canonical header pointing to the HTML route. Exact asset rules preserve `X-Robots-Tag: noindex` for events and pending safari pages, including direct Markdown requests.

## Consequences

- The site still builds as a static export and works without client JavaScript. The Function reads only the request URL, method and `Accept` header, stores nothing and calls no external service.
- Page requests now count as Pages Functions invocations. Asset folders are excluded to limit this.
- Responses that pass through the middleware are copies of the static asset responses, so headers from `_headers` remain. A local `wrangler pages dev` run confirmed this; production must still be checked after deployment.
- Markdown can only repeat exported visible content, so it cannot add facts, prices or claims that the HTML does not show. Copy changes flow into Markdown automatically on the next build.
- `CONTENT_SIGNAL` in the middleware and the `_headers` rule must match `app/robots.ts`; tests enforce this.
- If the owner later enables the zone-level feature instead, remove the middleware and Markdown rules in a superseding ADR so the two mechanisms do not overlap.

## Verification

- `tests/markdown-negotiation.test.mjs` covers Accept parsing, middleware responses (Markdown, HTML default, HEAD, noindex, fallbacks), converter output, Markdown parity with every exported route, and `_routes.json`.
- `tests/review-remediation.test.mjs` pins the exact Markdown `_headers` rules next to the security policy.
- After an authorized deployment: `curl -H 'Accept: text/markdown' -D - https://hanginkitecenter.com/` must return `text/markdown`, `Vary: Accept` and the security headers; a plain request must return HTML; then run the isitagentready.com scan.

## Sources

Accessed 2026-11-10.

- Cloudflare, Markdown for Agents: <https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/>
- isitagentready.com, Markdown negotiation skill: <https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md>
- Cloudflare Pages headers: <https://developers.cloudflare.com/pages/configuration/headers/>
- Cloudflare Pages Functions routing and `_routes.json`: <https://developers.cloudflare.com/pages/functions/routing/>
