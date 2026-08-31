import { readFile } from "node:fs/promises";
import path from "node:path";

export const outDir = path.resolve("out");

export const publicRoutes = [
  "/",
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/kite-safaris/",
  "/accommodation/",
  "/shop/",
  "/kitesurfing-boracay/",
  "/about/",
  "/contact/",
];

export function routeFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  return path.join(outDir, route.replace(/^\//, ""), "index.html");
}

export function readRoute(route) {
  return readFile(routeFile(route), "utf8");
}

export function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1];
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
