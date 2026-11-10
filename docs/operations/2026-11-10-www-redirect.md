# WWW alias and canonical redirect

Status: Current; host configuration implemented and verified
Date: 2026-11-10

## Authorized outcome

The owner requested a working `www.hanginkitecenter.com` address with consistent SEO and AI-discovery behavior. The previously selected primary address remains `https://hanginkitecenter.com`. Both HTTP and HTTPS requests to the exact `www` hostname should permanently redirect to the same HTTPS apex path and query string. No separate indexed copy or language/region redirect is introduced.

This request authorizes the focused Cloudflare DNS and redirect setup. It does not authorize application deployment, unrelated DNS changes, nameserver changes, billing, crawler-policy changes or additional tracking.

## Preflight evidence

The authenticated Cloudflare API identified the active full zone `hanginkitecenter.com` on the Free Website plan. The apex is a proxied CNAME to `hangin-kite-center.pages.dev`. Its only other DNS record is an apex TXT record. There is no `www` record, no Page Rule and no existing zone Single Redirect entrypoint. Active Universal SSL covers both the apex and `*.hanginkitecenter.com`.

The Pages project `hangin-kite-center` has the apex attached and uses `main` as its production branch. No Pages project update is needed for a redirect-only hostname handled at Cloudflare's edge.

## Implemented host configuration

1. Create a new zone entrypoint ruleset in `http_request_dynamic_redirect` with one enabled rule matching only `http.host eq "www.hanginkitecenter.com"`.
2. Return HTTP 301 with target expression `concat("https://hanginkitecenter.com", http.request.uri.path)` and `preserve_query_string: true`.
3. Create a proxied `A` record for `www.hanginkitecenter.com` with placeholder `192.0.2.1` and automatic TTL. Cloudflare's redirect responds before any origin fetch.

The rule was created before DNS. Its exact configuration was read back before enabling DNS, and the absence of a concurrent `www` record was checked again. Existing DNS records and managed rulesets were preserved.

Created resource identifiers:

- Zone: `1ac14c0e410f016d29b1ccdac3f26483`
- Single Redirect ruleset: `0cb6556ebcc04988af1ffc5817f38064`
- Rule: `5e5e5a9708e545929561d5b869821858`, stable reference `www_to_apex`
- DNS record: `a712036c68ded86b3a017326270448f2`
- Ruleset created at `2026-11-10T16:52:17.230209Z`; DNS record created at `2026-11-10T16:52:32.471701Z`.

Rollback must target only those newly created resources after confirming they have not been changed by someone else. Remove the new DNS record first and retain the redirect until cached DNS has expired where practical, then remove this task's ruleset. No rollback was needed.

## Sources

Accessed on 2026-11-10:

- [Cloudflare www-to-apex guide](https://developers.cloudflare.com/pages/how-to/www-redirect/), including its documented proxied placeholder DNS record.
- [Single Redirect API setup](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/). A zone-level Single Redirect is sufficient for this one exact-host redirect; an account-wide Bulk Redirect list is unnecessary.
- [Google redirects guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects). A permanent server-side redirect signals the preferred URL; the source and destination should not compete as separately indexed copies.
- The connected Cloudflare OpenAPI schemas for DNS creation, ruleset creation, certificate packs and Pages project listing.

## Verification and release boundary

Independent preflight review approved the exact host configuration with no blocking issues. Its recommendations were included in the live checks.

- All 24 direct GET/HEAD checks passed across HTTP and HTTPS: root, lesson path, contact query, escaped path, robots and sitemap. Every response was 301 with the expected HTTPS apex `Location`.
- All 12 follow-through GET checks passed across HTTP and HTTPS. Existing root/lesson/contact/metadata paths returned 200 after exactly one redirect. A deliberately missing path returned 404 after exactly one redirect, rather than redirecting to the homepage.
- Queries retained repeated keys, encoded values and empty values. Tested paths retained spaces (`%20`), an encoded slash (`%2F`) and a Unicode escape (`%E2%9C%93`). These tests do not promise byte-identical handling for every possible URI: Cloudflare's existing URL normalization may normalize equivalent path encodings. No normalization setting was changed.
- HTTPS checks used normal certificate validation, without insecure flags or DNS overrides. All follow-through TLS verification results were zero (success), and ordinary DNS resolution worked for `www`.
- The existing apex CNAME and TXT record IDs and modification timestamps matched preflight exactly. The DNS inventory grew from two to three records solely because of the new `www` record.
- Live apex responses still expose the earlier `www` canonical and sitemap URLs. The source correction is ready locally but has not been released; do not label that part of SEO alignment complete.

The two HTTP check scripts exited 0. Local raw evidence is saved in `/tmp/hangin-www-redirect-http.json` and `/tmp/hangin-www-redirect-follow.json`. Cloudflare create/readback calls succeeded. A Pages discovery request initially used an unsupported `per_page=100` and returned 400; the corrected read-only request with `per_page=10` succeeded. It made no changes.

Only documentation changed in this repository during the host setup. Base/HEAD remains `5063e111d117271b2cb92e3266521e7f96b24f65`, branch `fix/apex-canonical-origin`; source changes from the preceding task remain uncommitted. No push, merge or application deployment occurred. The preceding source task's 159-test fresh verification is recorded separately; it was not rerun for these documentation-only updates. `git diff --check`, local Markdown-target checks and instruction-file size checks passed. No runtime script, tracking or Next.js configuration was added.

The [apex canonical source correction](2026-11-10-apex-canonical-origin.md) passed local verification and independent review in this branch, but has not been deployed. Host redirects alone do not update the live canonical tags, social metadata, structured data, sitemap or robots sitemap reference. Those require the separately reviewed application release.
