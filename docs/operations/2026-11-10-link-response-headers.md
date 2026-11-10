# Homepage Link response header

Status: Current live Cloudflare configuration
Verified: 2026-11-10

The owner requested live homepage Link headers and validation through IsItAgentReady. This request authorized the scoped production Transform Rule. No origin, DNS, redirect, application, dependency, or public business-content changes were made.

## Configuration and rollback

Cloudflare zone `hanginkitecenter.com` has a zone ruleset named `Hangin response header transforms` in phase `http_response_headers_transform`.

- Zone ID: `1ac14c0e410f016d29b1ccdac3f26483`
- Ruleset ID: `2cd4a42201de4c1cadfd6f548ac8cc89`, version `1`
- Rule ID: `806c74ca2ede4007b6f194e16f60dc1c`, version `1`
- Created: `2026-11-10T17:24:22.35356Z`

The rule appends this value while preserving existing preload links:

```http
Link: </sitemap.xml>; rel="describedby"; type="application/xml"
```

The sitemap is an existing machine-readable description of the site's URLs. The registered `describedby` relation permits information about its context without constraining resource format. The site has no public API catalog; advertising one would be inaccurate. This meets the requested registered-relation discovery check, without asserting an API implementation or full RFC 9727 API-catalog support.

Rule definition:

```json
{
  "ref": "hangin_homepage_agent_discovery",
  "description": "Homepage machine-readable sitemap discovery",
  "expression": "(http.host in {\"hanginkitecenter.com\" \"www.hanginkitecenter.com\"} and http.request.uri.path eq \"/\" and http.request.method in {\"GET\" \"HEAD\"})",
  "action": "rewrite",
  "enabled": true,
  "action_parameters": {
    "headers": {
      "link": {
        "operation": "add",
        "value": "</sitemap.xml>; rel=\"describedby\"; type=\"application/xml\""
      }
    }
  }
}
```

Before this change, the zone had no response-header transform ruleset. Other rulesets were left unchanged. For rollback, disable only rule `806c74ca2ede4007b6f194e16f60dc1c` in the response-header Transform Rules dashboard. Confirm that the added `describedby` link disappears and existing image preload links remain. Do not delete a whole ruleset if other rules have subsequently been added.

## Verification evidence

- Baseline `POST https://isitagentready.com/api/scan` with `{"url":"https://hanginkitecenter.com"}` returned `checks.discoverability.linkHeaders.status = "fail"`: existing image preload links had no recognized discovery relation.
- The identical POST after the rule returned `status = "pass"`, message `Found agent-useful Link relations: describedby`, and three parsed links. HTTP status was 200; scan evidence Ray ID was `a586c054196ce1cc-MRS`.
- Live curl GET and HEAD to the apex homepage returned 200 with the new link and both original preload links. A homepage query string also matched.
- Following the existing www homepage redirect ended at a 200 response with the new link. The redirect policy was not changed.
- `/about/` returned 200 without the added link; a missing supporting path returned 404 without it. `/sitemap.xml` returned 200 `application/xml`, parsed as XML, and had no added link.
- Cloudflare API readback confirmed the enabled rule and exact expression after creation.
- Verification curl/Python commands exited 0. The baseline scan command exited 0 while reporting the expected failed check. The post-change scan assertion exited 0.

## Repository record and limits

Original task base: `8789f0bf732d8e99df2690a4652fdf69037b8c18`. Before push, the documentation commit was rebased onto the intervening canonical-host fix on `origin/main` (`1332054`). Documentation was prepared on branch `docs/link-response-headers`, under `/tmp/hangin-link-headers-20261110`. The owner subsequently requested committing and pushing this documentation to `main`. Changed files are this report, the documentation index, and the current development/operations document. Main-checkout changes to Markdown negotiation and its tests belong to another task and were not touched. The push is limited to these three documentation files; its commit identifies the resulting repository revision.

An independent read-only reviewer checked the live sitemap, registered relation meaning, lack of an API catalog, and preservation of preload links before application. The independent documentation review found no material issues. The owner explicitly authorized the subsequent push to `main`; live application was explicitly requested in the original task.

Lint, typecheck, application build, Node tests, and browser/UI checks were not run: only an external header Transform Rule and repository documentation changed. Validation used live HTTP responses, XML parsing, API readback, and the requested external scanner instead. No claim is made about other scanner checks. Existing sitemap canonical-host values were not changed as part of this header task.

Installed deployment and verification skills plus current Cloudflare docs covered this change. The official Cloudflare skill source was also reviewed; no additional skill or package was installed because its broad product-selection guidance added no specialized requirement for this single rule.

## Sources

Accessed 2026-11-10:

- [RFC 8288, Link serialization](https://www.rfc-editor.org/rfc/rfc8288#section-3)
- [RFC 9727, API catalog relation](https://www.rfc-editor.org/rfc/rfc9727#section-3)
- [IANA Link Relation Types](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
- [RFC 6892, describedby relation](https://www.rfc-editor.org/rfc/rfc6892#section-2)
- [Cloudflare response-header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/)
- [Cloudflare API rule creation](https://developers.cloudflare.com/rules/transform/response-header-modification/create-api/)
- [Official Cloudflare skill source](https://github.com/cloudflare/skills/blob/main/skills/cloudflare/SKILL.md)
