# SEO and GEO findings

Status: Current log
Owner: SEO & GEO Agent, under the [SEO and GEO strategy](seo-geo-strategy.md)

Dated observations, open items and release results for `https://hanginkitecenter.com`. Add new entries at the top. Do not rewrite an earlier entry; when an item changes, add a dated line that supersedes it. Statuses are `done`, `open` and `unverifiable`.

## 2026-11-12: release of PR #4 and account setup

Done by the agent in the owner's signed-in browser session, at the owner's request. No credentials or personal account details are recorded here.

### Release

| Item | Status | Evidence |
| --- | --- | --- |
| PR #4 (kite school and Duotone terms) | done | Squash-merged to `main` as `6477e65`; Cloudflare Pages deployed it. Live `/` returns the title `Kite School in Boracay \| Hangin Kite Center` and the new description |

### Search Console and Bing

This supersedes the "Search Console and Bing verification, sitemap submission" row of 2026-11-11.

| Item | Status | Evidence |
| --- | --- | --- |
| Search Console property | done | Domain property `sc-domain:hanginkitecenter.com` already existed and is verified through the existing `google-site-verification` DNS TXT record |
| Search Console sitemap | done | `https://hanginkitecenter.com/sitemap.xml` submitted 2026-11-12, read the same day, status "Erfolgreich" (success), 18 pages discovered |
| Old `www` sitemap | open | `https://www.hanginkitecenter.com/sitemap.xml` (submitted 2023-03-30, last read 2025-03-22, 0 pages) is still listed. Owner may remove it |
| Homepage indexing | done | URL inspection of `https://hanginkitecenter.com/` reported "URL is on Google"; indexing re-requested on 2026-11-12 so the new title is crawled |
| Bing site | done | `hanginkitecenter.com` already existed in Bing Webmaster Tools with no sitemap |
| Bing sitemap | done | `https://hanginkitecenter.com/sitemap.xml` submitted 2026-11-12; Bing confirmed it was accepted for processing. URL count pending Bing's crawl |
| Search baseline | open | First 28-day export due after 2026-12-10, Amihan season |

### Google Business Profile

Profile "Hangin Kitesurf Center & Resort", verified, managed from Hangin's business Google account. Edits saved on 2026-11-12; Google showed most of them as pending review (usually up to 10 minutes).

| Field | Before | After |
| --- | --- | --- |
| Website | `https://www.hanginkitecenter.com/` | `https://hanginkitecenter.com/` |
| Phone | none | +63 938 010 1849 (the confirmed WhatsApp number) |
| Opening date | January 2002 | January 2001 (year confirmed 2026-09-14; the month is the existing profile value) |
| Description | Said "since 2002", "the only kite center approved by IKO in the region", "oldest kitesurfing structure" and "2019 Duotone kites" | Says 2001, Official Duotone Kite Center, IKO and VDWS certified instructors, Duotone and ION as gear partners, the services and the owner's existing language line. Unconfirmed claims removed at the owner's request |
| Primary category | Surf school | Unchanged. The category list has no kitesurfing or kiteboarding school; the closest results were Kite shop, Windsurfing Shop and Water sports equipment rental service. Additional categories stay Kite shop and Surf shop |

The description's language line ("English, German, French and Russian") comes from the owner's existing profile text and is not recorded in `product.md`.

### Still open

| Action | Owner |
| --- | --- |
| Ask Duotone for a center-finder listing linking to the site | Owner |
| Ask IKO, VDWS, Kayak, Agoda and Tripadvisor to correct year, location, phone and website | Owner |
| Optional: add "Water sports equipment rental service" as an additional Business Profile category | Owner decision |
| Recheck the three target terms after the first 28-day Search Console window | SEO & GEO Agent |

## 2026-11-11: target terms "kite school boracay", "kite center boracay", "duotone boracay"

The owner asked for Hangin to rank first for these three terms. Rankings cannot be promised; this entry records the baseline, the on-page change and the off-site actions.

### Baseline

A US web search on 2026-11-11 for each term returned no `hanginkitecenter.com` result in the top results. Hangin appeared only through third-party pages (IKO listing, Kayak, Agoda, Greenyard). Those pages carry stale facts: IKO says "since 2002" and two locations (White Beach and Bulabog); Kayak shows an older phone number. "duotone boracay" returned gear guides and unrelated pages, with no Boracay center listed. This is a single unpersonalized check, not a Search Console baseline.

### On-page change (branch `seo/kite-school-duotone-terms`)

| Item | Before | After |
| --- | --- | --- |
| Homepage title | Kitesurfing in Boracay \| Hangin Kite Center | Kite School in Boracay \| Hangin Kite Center |
| Homepage description | Service list | Kite school and Official Duotone Kite Center on Bulabog Beach since 2001, with IKO and VDWS instructors and the service list. The instructor marks stay tied to instructors, not school membership |
| Homepage story copy | "a kitesurfing school" | "a kite school"; the Duotone designation stays in the hero tag |
| `SportsActivityLocation` | no `description` | `description` matching the visible story line |
| Shop description | "Check current kite gear" | "Ask about Duotone and ION kite gear" (partners confirmed; no stock claim) |

All claims are owner-confirmed in `product.md`. The H1 slogan is unchanged. No Duotone landing page was added: it would duplicate the homepage and About page.

### Open off-site actions (owner)

| Action | Why |
| --- | --- |
| Verify the apex in Search Console and Bing, submit the sitemap, request indexing of `/` | The site does not yet show for these terms; nothing else matters until it is indexed |
| Google Business Profile: primary category "Kitesurfing school", website `https://hanginkitecenter.com/` | Local pack results lead "kite school boracay" searches |
| Ask Duotone to list Hangin in its center finder with a link to the site | The strongest available signal for "duotone boracay" |
| Ask IKO and VDWS to correct the listing (2001, Bulabog Beach, current phone, website link) | Entity consistency and authoritative backlinks |
| Correct Kayak, Agoda, Tripadvisor website and phone fields | Same |

Recheck the three terms after a full 28-day window in Search Console, Amihan season.

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
