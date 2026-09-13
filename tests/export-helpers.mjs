import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseFragment } from "parse5";

export const outDir = path.resolve("out");

export const publicRoutes = [
  "/",
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/kite-safaris/",
  "/kite-safaris/batbatan/",
  "/kite-safaris/colon/",
  "/kite-safaris/others/",
  "/events/",
  "/accommodation/",
  "/shop/",
  "/kitesurfing-boracay/",
  "/kitesurfing-boracay/places-to-be/",
  "/kitesurfing-boracay/things-to-do/",
  "/kitesurfing-boracay/planning-your-days/",
  "/kitesurfing-boracay/practical-questions/",
  "/kite-size-guide/",
  "/about/",
  "/contact/",
  "/legal/",
  "/terms/",
  "/accessibility/",
];

export const pendingSafariRoutes = ["/kite-safaris/batbatan/", "/kite-safaris/colon/", "/kite-safaris/others/"];
export const indexableRoutes = publicRoutes.filter(route => !pendingSafariRoutes.includes(route) && route !== "/events/");

export function routeFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  return path.join(outDir, route.replace(/^\//, ""), "index.html");
}

export function readRoute(route) {
  return readFile(routeFile(route), "utf8");
}

export function attribute(tag, name) {
  const node = parseFragment(tag).childNodes.find(node => node.tagName);
  return node?.attrs.find(attr => attr.name.toLowerCase() === name.toLowerCase())?.value;
}

export function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

export function metaContent(html, key, value) {
  const tag = tags(html, "meta").find((item) => attribute(item, key) === value);
  return tag ? attribute(tag, "content") : undefined;
}

export function linkHref(html, rel) {
  const tag = tags(html, "link").find((item) => attribute(item, "rel") === rel);
  return tag ? attribute(tag, "href") : undefined;
}

export function title(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1];
}

export function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)]
    .map((match) => JSON.parse(match[1]));
}

export function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
