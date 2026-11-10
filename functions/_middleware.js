// Cloudflare Pages middleware: Markdown content negotiation (ADR 0005).
//
// A page request whose Accept header prefers text/markdown receives the
// build-time Markdown twin (out/<route>/index.md, written by
// scripts/build-markdown.mjs). Every other request gets the static HTML
// unchanged apart from `Vary: Accept`. No request data is stored or forwarded.

// Keep in sync with app/robots.ts; tests check parity.
export const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=yes";

/** Returns true when the Accept header ranks text/markdown at least as high as text/html. */
export function prefersMarkdown(accept) {
  if (!accept) return false;
  let markdown = 0;
  let html = 0;
  for (const range of accept.split(",")) {
    const [type, ...params] = range.split(";").map((part) => part.trim().toLowerCase());
    let quality = 1;
    for (const param of params) {
      const match = /^q=([0-9.]+)$/.exec(param);
      if (match) quality = Number(match[1]);
    }
    if (!Number.isFinite(quality) || quality < 0) quality = 0;
    if (type === "text/markdown") markdown = Math.max(markdown, quality);
    else if (type === "text/html") html = Math.max(html, quality);
  }
  return markdown > 0 && markdown >= html;
}

/** Rough token estimate (about four characters per token) for x-markdown-tokens. */
export function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function addVaryAccept(headers) {
  const vary = headers.get("Vary");
  if (!vary) headers.set("Vary", "Accept");
  else if (!vary.split(",").some((value) => ["accept", "*"].includes(value.trim().toLowerCase()))) {
    headers.set("Vary", `${vary}, Accept`);
  }
}

// Copying an asset response keeps the headers Pages applied from _headers.
function withVary(response) {
  const copy = new Response(response.body, response);
  addVaryAccept(copy.headers);
  return copy;
}

async function markdownResponse(asset, method) {
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Content-Signal", CONTENT_SIGNAL);
  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  addVaryAccept(headers);
  if (asset.status === 304) return new Response(null, { status: 304, headers });

  const text = await asset.text();
  headers.set("x-markdown-tokens", String(estimateTokens(text)));
  // Pages marked noindex in HTML stay noindex in their Markdown form.
  const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1] ?? "";
  if (/^robots:.*noindex/im.test(frontmatter)) headers.set("X-Robots-Tag", "noindex");
  return new Response(method === "HEAD" ? null : text, { status: 200, headers });
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  // Only exported pages (trailing-slash routes) have a Markdown form. Paths
  // without a slash fall through to the static host's redirect.
  if (!["GET", "HEAD"].includes(request.method) || !url.pathname.endsWith("/")) return next();
  if (!prefersMarkdown(request.headers.get("Accept"))) return withVary(await next());

  const assetUrl = new URL(`${url.pathname}index.md`, url.origin);
  const assetHeaders = new Headers(request.headers);
  assetHeaders.set("Accept", "text/markdown");
  const asset = await env.ASSETS.fetch(new Request(assetUrl, { method: "GET", headers: assetHeaders }));
  if (asset.status !== 200 && asset.status !== 304) return withVary(await next());
  return markdownResponse(asset, request.method);
}
