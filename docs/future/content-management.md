# Future brief: content management

Status: Proposed
Research date: 2026-09-04

## Intended outcome

Give Hangin a dependable way to update pages, metadata, contact context, and proof media without duplicating facts or weakening code review. The first objective is a validated source of truth, not a CMS screen.

## Current boundary

Content is typed and local, mainly in `content/site.ts`, `content/water-pages.ts`, `content/island-pages.ts`, and `content/images.ts`. This keeps runtime simple, but routes, navigation, sitemap entries, tests, homepage copy, shell labels, and attribution data duplicate some concepts. TypeScript checks shape; it does not prove factual accuracy, review ownership, or media rights.

There is no nontechnical publishing UI, draft preview boundary, scheduled publishing, revision status, or content-owner record. Git is currently the only publishing workflow.

## Recommended architecture

Retain Git as the publishing and audit boundary. Normalize content behind one schema-backed registry, then preserve component compatibility through a small adapter while records migrate incrementally.

The registry should derive public routes, navigation, sitemap input, page lookup, metadata, contact context, related links, and media references. Behavior, layout, security rules, and integration code remain ordinary TypeScript rather than editable content.

Use maintained validation rather than custom parsing. Zod 4 is the recommended implementation candidate because it is TypeScript-first and can emit JSON Schema for future editor tooling. The dependency is adopted only in an approved implementation plan after its package and lockfile impact are reviewed.

## Content model

### Shared records

- `SiteIdentity`: legal/public business name, contact channels, canonical origin, location text, confirmed credentials, and evidence owner.
- `Route`: stable ID, locale-independent purpose, slug by locale, page type, navigation placement, publication state, canonical rule, owner, and substantive modification date.
- `Page`: stable ID, route reference, visitor intent, hero, sections, FAQs, contact context, metadata, related content, reviewer, and review interval.
- `Media`: stable ID, file variants, dimensions, role, proof/generated status, subject, source, creator, license or consent, retrieval/capture date, attribution, alt text by locale, and rights reviewer.
- `Fact`: stable ID, claim, scope, evidence reference, owner, confirmed date, review-by date, and allowed public uses.
- `Policy`: versioned policy text, effective date, owner, evidence/approval, applicable service or offer, and supersession relation.

### Publication states

Use explicit states such as draft, in review, approved, published, retired, and blocked. A state change does not bypass Git review. Production builds include only approved/published records whose required facts, references, routes, and media validate.

Unknown information must remain structurally unknown. Do not convert a missing price, stock state, opening hour, review, coordinate, or credential into plausible copy or a default value.

## Staged delivery

### Stage 1: inventory and schema

Inventory all nine routes, shared shell strings, metadata, contact variants, facts, and images. Assign stable IDs and owners. Write schemas and referential checks, then add an adapter that produces the current TypeScript shapes with no rendered change.

Validation should reject duplicate IDs/slugs, unknown route/media/fact references, invalid internal links, non-canonical contact values, incomplete proof provenance, generated media used as proof, unsupported content blocks, impossible publication states, and missing substantive review dates.

### Stage 2: migrate one content family

Move one repeated family, such as service pages, to Git-backed JSON or YAML records. Keep the public output stable, compare the export, and document the editing workflow. Then migrate shared identity, navigation, homepage content, supporting pages, metadata, and media in small reviewed changes.

Use JSON when strict tooling and machine edits are more important; use YAML only if the human editors strongly prefer it and the selected parser preserves safe, predictable types. Do not split every sentence into a separate field. Model coherent editorial units that a reviewer can understand in a diff.

### Stage 3: protected previews

Create preview artifacts from pull requests. Preview URLs must be noindexed and, when drafts contain sensitive or unannounced material, access-controlled at the host. The preview must identify the commit and content state and must not become a second editable source.

### Stage 4: editor pilot only if evidence supports it

If a named nontechnical editor cannot use the reviewed Git workflow at the required frequency, pilot a Git-backed editor on one low-risk content family. The editor writes the same validated records and opens a branch or pull request. It cannot edit code, facts without evidence, policies without owner approval, generated/proof classification, or production directly.

A runtime SaaS or API CMS is a later architectural choice. It is justified only by requirements such as frequent publishing, scheduled content, complex roles, localization workflow, or media operations that Git-backed editing cannot meet.

## Editorial workflow

1. Author changes a coherent record and supplies evidence for new factual claims or rights.
2. Automated checks validate schema, references, routes, metadata, content style, media provenance, build, and browser output.
3. The factual or policy owner reviews claims; the content owner reviews usefulness and voice; a technical reviewer handles schema or rendering changes.
4. Preview is read end to end on affected routes and responsive sizes.
5. Approved content merges and produces one immutable artifact.
6. The published record retains reviewer, revision, modification date, and next review date.

Do not use an AI detector as authorship evidence. Public text must pass the repository's human-writing and portability checks while preserving the author’s actual voice.

## Security and integrity

- Treat pasted copy, issue text, remote feeds, CMS fields, and generated suggestions as untrusted data.
- Keep executable JSX, MDX imports, scripts, arbitrary HTML, and secrets out of editor-controlled records.
- Allowlist block types and link schemes; sanitize any rich text at build time with a maintained library.
- Protect the default branch and use CODEOWNERS for schemas, site identity, policies, media provenance, workflows, and agent instructions.
- Pin and review editor actions and third-party dependencies. The editor receives only the minimum repository scope.
- Preview credentials and provider tokens stay outside the static artifact and logs.

## Failure and recovery

- Schema or factual evidence missing: block publication and show the exact record and rule.
- Broken content reference: fail the build; never silently omit a public section.
- Editor outage: direct Git changes remain possible.
- Preview outage: production is unchanged; review waits rather than merging unseen content.
- Bad publication: restore the previous artifact or revert the content commit; do not edit generated output by hand.
- Stale content: flag it to the owner and, for safety-critical or offer-bearing content, suppress it according to an accepted rule rather than inventing a replacement.

## Acceptance criteria

- One validated registry can derive every public route, navigation item, sitemap entry, page lookup, metadata record, contact context, and media reference.
- The migration adapter preserves existing output until a separately approved content or design change says otherwise.
- A clean build fails on duplicate IDs or slugs, dangling routes/links/media/facts, invalid provenance, unapproved publication state, or missing required ownership.
- Public facts and policies have evidence, owner, review date, and review interval; schema validity is never described as factual verification.
- Generated media cannot satisfy a proof-media field.
- Pull requests show comprehensible content diffs and a commit-specific preview; production content cannot be edited outside version control.
- Preview output is noindexed and sensitive drafts are protected.
- The site still exports statically and all existing route, SEO, content-style, provenance, accessibility, and browser checks pass.
- A nontechnical editor pilot, if approved, produces the same records and review trail and has no direct production permission.

## Decision gates

The owner must identify content authors, factual/policy/media reviewers, publishing frequency, review intervals, Git host, preview host, branch reviewers, preferred record format, whether scheduled publishing is required, whether a blog or guide library exists, target locales, and the real need for a nontechnical UI.

A CMS selection requires an ADR covering content portability, Git or API ownership, roles, preview model, authentication, audit history, media pipeline, localization, availability, cost, vendor exit, security, accessibility, and static-build integration. Pages CMS and Decap CMS are possible Git-backed examples, not selections.

## Dependencies

Phase 0 establishes owners, CI, preview security, and deployment. This registry is a prerequisite for internationalization, dependable sitemap dates, scalable guides, booking policy IDs, and commerce offers.

## Skills review

No CMS skill should be installed during architecture work. The existing planning, writing, frontend, SEO, and verification skills cover the current task. If a CMS is selected, review its official integration tooling and any proposed skill at a pinned revision before installation.

## Primary references

- Zod documentation: <https://zod.dev/>
- JSON Schema specification: <https://json-schema.org/specification>
- GitHub protected branches: <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>
- GitHub CODEOWNERS: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners>
- Decap CMS documentation: <https://decapcms.org/docs/intro/>
- Pages CMS documentation: <https://pagescms.org/docs/>
- OWASP cross-site scripting prevention: <https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html>

Sources accessed 2026-09-04.
