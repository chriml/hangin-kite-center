# SEO and GEO findings

Status: Current log
Owner: SEO & GEO Agent, under the [SEO and GEO strategy](seo-geo-strategy.md)

Dated observations, open items and release results for `https://hanginkitecenter.com`. Add new entries at the top. Do not rewrite an earlier entry; when an item changes, add a dated line that supersedes it. Statuses are `done`, `open` and `unverifiable`.

## 2026-11-11: live baseline after the apex release

Observed 2026-11-11 with plain HTTPS requests against production. Repository `main` at `b169836`. No account, analytics or AI-platform data was used.

### Technical state

| Check | Status | Evidence |
| --- | --- | --- |
| Sitemap URLs | done | 17 URLs, all on the apex origin; 16 carry `lastmod`, matching the rule that unknown dates are omitted |
| Sitemap pages | done | All 17 return 200 with a self-referencing canonical and exactly one H1 |
| Holding pages | done | `/kite-safaris/batbatan/`, `/kite-safaris/colon/`, `/kite-safaris/others/` and `/events/` return 200 with `noindex, follow` and are absent from the sitemap |
| Host redirects | done | `https://www.hanginkitecenter.com/` and `http://hanginkitecenter.com/` return 301 to `https://hanginkitecenter.com/` |
| Trailing slash | done | `/contact` returns 308 to `/contact/` |
| Missing route | done | `/does-not-exist-xyz/` returns 404 |
| robots | done | `User-Agent: *`, `Allow: /`, `Content-Signal: ai-train=no, search=yes, ai-input=yes` and the apex sitemap line |
| Markdown twin | done | `Accept: text/markdown` on `/` returns 200 `text/markdown; charset=utf-8` |
| Homepage `Link` header | done | `</sitemap.xml>; rel="describedby"; type="application/xml"` |
| Homepage structured data | done | `WebSite`, `Organization`, `SportsActivityLocation` with `PostalAddress`; no ratings, offers or opening hours |
| `llms.txt` | done | Returns 404; it is deliberately not published |
| Indexing, crawler logs, field Core Web Vitals | unverifiable | Needs Search Console, Bing and Cloudflare access |

The apex canonical correction recorded as pending in [`product.md`](product.md) and [`seo-accessibility-media.md`](seo-accessibility-media.md) is now live.

### Measurement and visibility

| Item | Status | Note |
| --- | --- | --- |
| Account ownership | done | The owner confirmed on 2026-11-11 that they own Search Console, Bing Webmaster Tools, Google Business Profile and Bing Places. Recorded on `feat/batbatan-safari-dates`, not yet on `main` |
| Search Console and Bing verification, sitemap submission | open | Owner action. Record property, verification date and submission date here, without credentials |
| Search baseline | open | `unavailable` until the first export. Use one completed 28-day window and note the season |
| GEO query baseline | open | 0 of 10 questions run; AI visibility is unknown, not zero |
| Visits and contact clicks | unavailable | The site has no analytics tag by design |

### Records to reconcile

These records disagree with the confirmed facts in `product.md` (apex origin selected 2026-11-10, founding year 2001 corrected 2026-09-14).

| Record | Stale content | Action |
| --- | --- | --- |
| [GEO runbook](../operations/2026-09-13-geo-discovery.md) identity sheet and draft directory message | `www` website, established 2002 | Dated record: leave the text and add a superseding note. Update the draft message before any use |
| [Query baseline](../operations/geo-query-baseline.json) | `canonical_origin` is the `www` URL | Change to `https://hanginkitecenter.com` before the first run |
| [SEO and content growth brief](../future/seo-content-growth.md), Current boundary | `www` origin; `lastModified`, `priority`/`changeFrequency` and `Host` listed as open, although the 2026-09-13 GEO update resolved them | Update when the brief is next revised |
| `product.md` canonical origin and `seo-accessibility-media.md` canonical sections | Apex metadata and sitemap described as pending deployment | Add the 2026-11-11 live result |

The last two files have uncommitted changes on `feat/batbatan-safari-dates`. Reconcile them after that branch merges, to avoid conflicts.

### Pending on `feat/batbatan-safari-dates`

Not yet on `main` or live: the Batbatan page moves to `index, follow` and the sitemap (18 URLs); Contact shows approximate opening hours with no `openingHours` structured data; and a customer-question table is added to the growth brief. Repeat the technical checks above after that release.
