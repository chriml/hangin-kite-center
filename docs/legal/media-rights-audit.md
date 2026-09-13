# Media rights, photographs and testimonials

> Historical source record, imported on 2026-09-13. Repository facts, open-question status and verification below apply to the dated source revision. Newer project records supersede old route counts, media inventories, pricing and deployment assumptions. Research and proposed policies are not newly approved by this merge. See [the branch integration record](../operations/2026-09-13-branch-integration.md).

Status: Superseded as a current-state inventory; retained as dated evidence
Scope: Current internal evidence record; proposed release controls are identified below.
Evidence checked: 2026-09-04. Repository baseline: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc` plus the integration task's working changes.

Philippine-lawyer review is required for final legal wording and business-specific rights conclusions. This record does not certify ownership, releases, trademark clearance or compliance.

## Findings and current scope

The site uses three third-party Boracay context photographs, three generated illustrations, a social-image crop, and a kite mark with icon variants. No customer testimonials, ratings, review widgets or upload features are confirmed. Sources are `content/images.ts`, `public/images/ATTRIBUTION.md`, the asset files, and the approved 2026-08-29 implementation plan. The three 900px photographs were visually inspected on 2026-09-04: distant riders, kite graphics and coastal buildings are visible; this inspection cannot identify people or establish releases. None is evidence of Hangin staff, customers, rooms, stock or an actual Hangin safari.

The owner's future intention to own replacement photographs is not evidence of present copyright ownership. The approved public sentence is “Images are owned by or licensed for use by Hangin Kite Center.” It describes the intended rights position; it must not be read as proof that the unresolved generated-art and mark evidence below has been supplied. Keep specific creator and licence credits alongside it. The current confirmed facts remain established in 2002 and IKO/VDWS instruction; the media proposal's blanket removal of those facts conflicts with `docs/project/product.md`. Preserve general confirmed facts while separately obtaining current instructor and trademark evidence before adding names, credentials or affiliation claims.

## Evidence and obligations

All linked primary sources below were accessed on 2026-09-04. Local retrieval/generation dates are separately recorded as 2026-08-29.

| Evidence | Current obligation or limit | Future trigger |
| --- | --- | --- |
| [IPOPHL Copyright FAQ](https://www.ipophil.gov.ph/help-and-support/copyright/) and [IP Code, §178.4](https://ilaw.ipophil.gov.ph/pluginfile.php/146/mod_resource/content/2/Philippine%20IP%20Code.pdf), RA 8293 (1997) | Photograph copyright generally starts with the author. Paying a commissioned photographer does not itself establish transfer; record written rights terms. Credit alone is not permission. | First-party shoot, staff image, guest image, bought stock or commissioned logo. |
| [CC BY-SA 4.0 legal code, §§2–3](https://creativecommons.org/licenses/by-sa/4.0/legalcode.en), version 4.0 | Preserve creator, source and licence information; indicate changes. Use the selected licence for any qualifying adaptation and avoid added restrictions. The licence does not establish third-party likeness rights or endorsement. | New crop, montage, filter, redistribution or download. |
| [CC BY-SA 3.0 legal code, §4](https://creativecommons.org/licenses/by-sa/3.0/legalcode), version 3.0 | Keep required credits and licence link; identify adaptations and apply the permitted ShareAlike terms. Credit the riding image separately from site ownership. | New transformations or promotional reuse. |
| [CC0 1.0, limitations §4](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en), version 1.0 | The contributor's waiver/public licence supports reuse; it supplies no warranty and does not clear other people's rights or trademark rights. | Close-up promotional use or claimed endorsement. |
| [Data Privacy Act, §§11–13](https://privacy.gov.ph/data-privacy-act/), RA 10173 (2012) | Assess a lawful basis and proportionality for identifiable people. A photo copyright licence and a person's data-processing basis are different records. | Identifiable guests/staff, testimonials, or real likenesses in generated art. |

ShareAlike applies to the licensed/adapted material as specified by the licence, not automatically to unrelated website code. Resizing or format conversion alone may be a technical modification rather than a copyright adaptation; record all modifications anyway and retain source licence notices on these derivatives.

## Rights ledger

Each pair names the full and responsive file under `public/images/`. The hash inventory below binds this review to exact bytes.

| Local assets | Source, creator and selected rights | Recorded modification and unresolved evidence |
| --- | --- | --- |
| `proof/boracay-kitesurf-school.webp`; `proof/boracay-kitesurf-school-900.webp`; `app/opengraph-image.jpg` | [Kitesurfers boracay](https://commons.wikimedia.org/wiki/File:Kitesurfers_boracay.jpg), Kstranger, CC0 1.0. Commons lists creation 2026-03-31 and upload 2026-04-02. | WebPs resized/converted; social image center-cropped and converted to 1200×630 JPEG. No model releases supplied. Distant riders and kite graphics; no Hangin affiliation established. |
| `proof/bulabog-beach-aerial.webp`; `proof/bulabog-beach-aerial-900.webp` | [Bulabog Beach top view](https://commons.wikimedia.org/wiki/File:Boracay_Bulabog_Beach_top_view_(Malay,_Aklan;_04-06-2024).jpg), Patrickroque01, selected CC BY-SA 4.0. Commons also offers GFDL; this site selects CC. Capture metadata 2024-04-06. | Resized and WebP converted. Wide beach/building context; no building ownership, property release or Hangin premises identification established. |
| `proof/boracay-kitesurfing.webp`; `proof/boracay-kitesurfing-900.webp` | [Boracay kitesurfing](https://commons.wikimedia.org/wiki/File:Boracay_kitesurfing.jpg), Anastasia Zhebyuk, CC BY-SA 3.0, creation 2011-03-13. | Resized and WebP converted. Distant riders; no likeness releases or Hangin customer attribution established. |
| `generated/kite-gear-sunprint.webp`; `generated/kite-gear-sunprint-900.webp` | Repository attribution says OpenAI ImageGen, generated 2026-08-29. | Resized/converted. Supporting art only; not current stock. Generation record, account owner, input rights and applicable terms snapshot absent. |
| `generated/kite-safari-sunprint.webp`; `generated/kite-safari-sunprint-900.webp` | Same recorded generator/date. | Resized/converted. Supporting art only; not an actual safari. Same generation evidence gaps. |
| `generated/island-stay-sunprint.webp`; `generated/island-stay-sunprint-900.webp` | Same recorded generator/date. | Resized/converted. Supporting art only; not a Hangin room. Same generation evidence gaps. |
| `public/brand/mark.svg`; `app/icon.svg`; `app/apple-icon.png` | Approved implementation plan calls for a code-created kite mark and icon derivatives. The two SVGs match. | The plan records PNG conversion; assignment, contributor record and trademark search are absent. Do not add a registered-mark symbol or claim registration. |
| `public/file.svg`; `public/globe.svg`; `public/next.svg`; `public/vercel.svg`; `public/window.svg` | Starter assets present in the reviewed baseline. No app/component usage found by source search. | Not in the original provenance ledger; generator/version/licence evidence not established here. Removed on 2026-09-05 after checking app, component, content and test references. Historical hashes are retained below. |

## Authorized editorial fixes and publication gates

Implemented: factual documentary alt text, visible creator/source/licence credits with “Resized and converted to WebP”, and decorative artwork with empty alt text. Generated artwork has the visible label “Illustration” on the homepage and “Supporting illustration.” on service heroes. Earlier longer caption proposals are superseded by these rendered labels. See the [integration verification](../operations/review-remediation-2026-09-04.md). The 2026-09-05 follow-up corrects the attribution introduction to describe use without asserting that unidentified photographed people or premises cannot belong to Hangin, removes five unused starter SVGs, and adds an export regression check for illustration labels and empty alternatives.

Before new promotional media is published, the business owner supplies: original file and checksum; creator and contact; source and acquisition date; signed licence/assignment with media, territory, duration, edits and sublicensing terms; credit wording; evidence for identifiable people's processing basis; consent/withdrawal procedure if consent is used; guardian authority where relevant; and permission for any claimed endorsement. Keep signed releases and identity evidence in restricted business storage, with reference IDs in the ledger, never in Git.

For generated art, the account owner supplies generation date, generation record/reference, model/tool, input-source rights, applicable terms at generation, and confirmation that no real person's likeness or third-party protected mark was intentionally copied. A generic label “OpenAI Terms of Use” is not the missing record. For the kite mark, obtain creator/assignment evidence and decide whether trademark clearance or registration will be sought. For IKO/VDWS detail, obtain current instructors, exact credential scope, expiry dates and permitted wording; this does not erase the confirmed general instruction fact.

For testimonials, retain the original dated statement, permission for exact excerpt/name/photo/channels, incentive disclosure, editing approval and withdrawal route. Do not invent quotes, ratings or review counts; do not publish `Review`/`AggregateRating` structured data without a separately accepted and evidenced design.

## Takedown and correction procedure

1. Receive reports through the existing `hanginkitecenter@gmail.com` address. Record the affected URL/file and allegation in restricted storage, with only necessary contact details.
2. The business owner triages rights, likeness, misleading caption and safety issues; preserve limited evidence. Do not demand a full identity document routinely.
3. The maintainer removes or corrects credible disputed content in an isolated change, checks every derivative and social image, builds and tests the export, and requests explicit production deployment authorization.
4. After approved deployment, verify affected URLs, caches and social previews. Record removed hashes, replacement source, decision, approvals and deployment date. Do not promise to erase third-party reposts or caches outside Hangin's control.
5. Retain dispute evidence only for the approved legal/operational period. Re-publication requires documented clearance, not silence from the reporter.

## Verification boundary

Completed here: source/ledger inspection, exact asset inventory and SHA-256 hashes, three-photo visual inspection, primary-source checks and editorial review. No release documents, accounts, production pages or physical premises were inspected. Fresh export, rendered page captions, route coverage and deployment checks belong in the integration verification report.

## SHA-256 inventory

Captured 2026-09-04 before integration cleanup. Removed files remain historical inventory entries.

| File | SHA-256 |
| --- | --- |
| `app/apple-icon.png` | `29af5170d2117ec541d42247d54539df6c0e5eb91dd313a320413ebea7933dbf` |
| `app/icon.svg` | `4c34cd91ab8ca94d3ac054e6a6bc2cd0fe2d66dc58b24c7516bb9b87f84811b1` |
| `app/opengraph-image.jpg` | `c8dc09834b26f53cbab47452878d291d994d4df95d7d9e070ee57f3f0d73426a` |
| `public/brand/mark.svg` | `4c34cd91ab8ca94d3ac054e6a6bc2cd0fe2d66dc58b24c7516bb9b87f84811b1` |
| `public/file.svg` | `2b67812c325c199a02536cdbeea0c593a72f707d323b72ee3e08dbab06753bd4` |
| `public/globe.svg` | `b614b9bf183925957661ac851498fe1d8029fd43a62fbfed86f9e2624a57e7cf` |
| `public/images/generated/island-stay-sunprint-900.webp` | `0ec49b59b89a4c13873a5f91694d748bd526b9960b81ead1476c85f425e8502c` |
| `public/images/generated/island-stay-sunprint.webp` | `cef900d3009a10e2fc3ef65b4c9126d7c267c66ecf01d47ee0fdddda23ae64ef` |
| `public/images/generated/kite-gear-sunprint-900.webp` | `c4db4cbe05eaaf787f68b04a6922d2092eb0cc17c74d46540fff7e70677ce9cc` |
| `public/images/generated/kite-gear-sunprint.webp` | `c07772436c463cc1063fc94430eab4b927efe4d81cdbc2486dc1348818772eda` |
| `public/images/generated/kite-safari-sunprint-900.webp` | `687a1222b8b0f3d783f6c2878876005907173604cd2c35d4b27fda54187ffa35` |
| `public/images/generated/kite-safari-sunprint.webp` | `6a314ace32883b5aef7054e13d981f914bf55416f53b5fbc55fdc208ba77f34a` |
| `public/images/proof/boracay-kitesurf-school-900.webp` | `32b6c66ab1a0a630a4c5bc147d0239e67113abf2516ee1854891437133aff8a0` |
| `public/images/proof/boracay-kitesurf-school.webp` | `b366c747b8f0ef6e0c12bd2ad724cac6b9f46e2622fdcdc1e52bcc7b4560adf2` |
| `public/images/proof/boracay-kitesurfing-900.webp` | `9671d8641ab886a1c4a42de791ecad7248f7f3f92fa9927488541611cf09ea52` |
| `public/images/proof/boracay-kitesurfing.webp` | `90c8058452becc8ce0b73b08e92ea7caa9ac59a68fe804b74f0f4ae7293ef3f6` |
| `public/images/proof/bulabog-beach-aerial-900.webp` | `0fe611e34169cca05b8bc7dba2108893dd782113baa9e6baa7fbd718136f4092` |
| `public/images/proof/bulabog-beach-aerial.webp` | `957f9028115901a203225e4c256988d010bc9cc98c90e0699a609031fd4364a4` |
| `public/next.svg` | `55995dfad6ecb4945a1e856ddca03c5e16aa5bf13fd21b4df6a74ae79357bcfc` |
| `public/vercel.svg` | `f081337b2fee635b455b63275406a3e7f39d6a014e25ad90dab5a67e62a12ac4` |
| `public/window.svg` | `644768c4aaeb4767bce293344eeb0c125fb804a94d801440424072202d85e3a1` |
