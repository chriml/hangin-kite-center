# Boracay kite size guide

Status: Current
Last verified: 2026-09-13

## Visitor flow and scope

The owner requested weight, visit timing and riding level inputs returning three possible kite setups on 2026-09-08. `/kite-size-guide/` implements one-, two- and three-kite packing alternatives for adult twin-tip freeride. Weight can be entered in kilograms or pounds; arrival and departure months supply season context, without year fields. Level changes guidance without a numeric power multiplier. Beginners are directed to instructor-selected lesson equipment, and advanced users are told the chart is for general freeride, not specialist disciplines.

The form runs in browser memory. Inputs have no submission names, controls stay disabled until hydration, and entered data is never put in URLs, persistent storage, analytics, logs or requests. Changing any input removes old results. A valid calculation moves keyboard focus to the result heading. A static chart, source explanation and normal WhatsApp/email contact remain available without JavaScript. Contact links do not include entered data.

`content/kite-size-guide.ts` owns the typed table, source record, input/output types, validation, seasons and packing combinations. `components/kite-size-calculator.tsx` is the site's first client boundary. Its route, explanatory copy, metadata, breadcrumbs and contact treatment remain statically rendered. No production dependency or backend was added.

## Sources and editorial decisions

All sources below were accessed 2026-09-08. Sources are evidence, not authorization to change business facts.

- [Airush's practical kite size guide](https://airush.com/blogs/news/what-kite-size-should-you-choose-based-on-the-wind), dated 2026-01-11, supplies the weight × wind lookup for beginner/intermediate twin-tip riders. Only its 14–17, 18–22 and 23–28 knot scenarios are used. The chart is not calibrated to Boracay or to Hangin's equipment stock. The visible page links the source and explains that exact models, boards and conditions change the choice.
- [Isla's wind guide](https://islakitesurfing.com/livewind/) supports seasonal context, alongside the existing [spot sources](boracay-spot-guide-sources.md). The owner-confirmed main Amihan season remains November–April, May is treated as transition, and June–October is Habagat. Trips intersecting multiple categories show a mixed-season note. Dates never manufacture a wind forecast or alter Airush's numerical chart.
- [IKO equipment manual](https://d8.ikointl.com/system/files/ecourses/files/equipment-2018-10-eng_0_0.pdf), page 10, distinguishes early training equipment from riding equipment. Beginners need instructor choice.
- [Duotone's freeride guide](https://www.duotonesports.com/en/kiteboarding/kites/freeride-kites) was reviewed but its broad weight bands were not used: its table does not provide the same wind scenarios for different weights. No manufacturer stock claim follows from using any source.

The following are implementation choices, not manufacturer rules:

- One kite uses the middle scenario; two use the smaller/larger scenarios; three include all three. These are packing ideas and do not promise continuous wind-range overlap or riding time. Every item is a size range from which a rider and the team choose one kite, not an instruction to buy both endpoints.
- Exact 70/80/90kg boundaries use the lighter band because the published bands overlap. Kilogram values normalize to 0.01kg for unit-conversion consistency.
- Automatic output is limited to 60–120kg. The source has no under-60kg row and an open-ended over-90kg row. The upper cutoff is a conservative tool scope, explicitly disclosed. Outside that range, visitors receive the season/level notes and a team-check message instead of extrapolated sizes.
- No forecast API, numerical seasonal scaling, guarantees, availability, prices, Offers, Product schema, analytics or third-party browser scripts are introduced.

## Review and validation

The calculator has focused tests for source ranges, packing counts, weight boundaries, kg/lb equivalence, malformed inputs, same-month trips, New Year wrapping and mixed-season trips and level advice. Export tests cover static content, labels, hydration gating, contact fallback and the homepage entry point. The route participates in the existing metadata, sitemap, link, heading, copy and image checks.

Lint, typecheck, a fresh webpack export and all 52 Node tests passed. Browser checks at 320–1440px found no calculator overflow or axe A/AA violations; keyboard, no-JavaScript and no-data-egress checks passed. The implementation is local and reviewable. Public release and validation against Hangin's exact kite/board models remain the owner's responsibility; no deployment was requested. See the [task plan](../superpowers/plans/2026-09-08-kite-size-guide.md) for execution evidence.


## Travel input follow-up, 2026-09-08 (superseded by the month-only update)

The owner reported that input did not work in the in-app preview. Live checks accepted weight and riding level, but a date-entry attempt left departure empty and the native required-field check blocked calculation. The earlier Chrome-only checks had used programmatic full-date entry. That evidence did not establish that every browser's date control was broken.

At that stage, the form asked for arrival/departure month and four-digit year through ordinary selects/text inputs. Exact days are unnecessary for the seasonal calculation. Each selected month is represented internally by its first day, preserving same-month and cross-year behavior without changing kite sizes. Reversed periods show a visible error explaining the month/year correction. Blank or malformed years use native validation. Keyboard and pointer entry must be verified in the user's in-app browser as well as the static export.

Follow-up verification on 2026-09-08: the updated form was completed and submitted in the actual in-app browser. A December 2026–January 2027 example returned all three setups. Reversed periods showed the correction message; a two-digit year was rejected; correcting it and pressing Enter generated results and focused the result heading. The form was visually checked at 320px and 1440px, with the temporary viewport restored afterward. Independent review found no actionable issue. Lint, typecheck, fresh webpack export and all 52 tests passed again. No additional browser dependency, production change or deployment was introduced.

## Search wording follow-up

The owner requested practical search terms on 2026-09-08. The page title and explanatory H2 now use “What kite size should I bring to Boracay?”; the H1 retains “Boracay kite size guide” and the introduction names the kite size calculator. The description summarizes weight, travel timing, level and packing/rental guidance. Static native disclosures answer related questions about kite size by rider weight, December/January trips, how many kites to bring, and bringing equipment versus renting. Contextual links lead to lessons, the Boracay season guide, and rental/storage information.

Searches for “what kite size should I bring to Boracay” and “Boracay kitesurfing kite sizes weight season packing” informed these editorial choices. A [rider's Boracay packing question](https://www.reddit.com/r/Kiteboarding/comments/1gus7ax/kiteboarding_in_boracy/) confirms the primary phrasing and the weight, winter timing and existing-equipment concerns. Forum answers were not used as sizing or business facts. No search-volume or ranking data was measured. All added advice stays within the source and product boundaries above.

This approach follows [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): descriptive titles, readable content that answers visitor questions, and useful internal links. Both sources were accessed 2026-09-08. No keyword meta tag, hidden keyword list, additional route or FAQ structured data was added.

Verification on 2026-09-08: lint, typecheck, fresh webpack export and all 52 tests passed after the final style change. The exported title is 62 characters including the brand; the description is 154. Browser review covered the full copy, all four expanded answers, native keyboard toggling and visible focus at 320px, 711px and 1440px. Question controls measured at least 49px high on desktop and wrapped within the mobile viewport. Inline guide/contact links are now underlined. The preview was refreshed and its original viewport restored. The no-ai-slop review and independent SEO/copy review found no actionable issues. No production deployment was performed.


## Month-only trip timing, 2026-09-13

The owner requested removal of the arrival year. Both year fields are removed so the form asks only for the first and last month of the trip. The typed input now accepts integer `arrivalMonth` and `departureMonth` values from 1 to 12. Seasonal context traverses every month inclusively, wrapping through January when the departure month is earlier than the arrival month. Equal months describe a stay within that month; the simplified input no longer distinguishes multi-year stays. No clock-dependent defaults or synthetic dates are used. Weight bands, kite choices, level guidance and privacy behavior are unchanged.

The two month selects share an equal-width row and stack below 360 pixels. Required native selects handle missing values; the model rejects invalid or non-integer months. Updated model tests failed before implementation and now cover same-month, New Year, full seasonal cycle and mixed-season trips, as well as unchanged sizing and validation. Export checks require both labelled month selects and the absence of year fields.

Verification: `npm run verify` exited 0 with lint, typecheck, fresh export and all 59 tests; log `/tmp/hangin-month-only-verify.log`. Live browser calculations for December–January, April–June and May–May produced Amihan, mixed and May-transition guidance respectively. Changing a month cleared the previous results; keyboard submission focused the result heading. Desktop and 390-pixel form screenshots were reviewed, with no overflow at 390 or 320 pixels and 50-pixel month controls. Independent review found no code issues. Existing no-JavaScript output, source table, contact links, focus colors and reduced-motion rules remain intact. No full accessibility audit or deployment was performed.

Scope: calculator component, local form grid, typed month input and season traversal, unit/export tests and this record. Existing unrelated documentation edits were preserved. Base/HEAD at the start was `c49ba0c95b1a1f36a538f07915b00fc541ea6845` on `codex/cloudflare-pages-config`; these changes remain uncommitted for owner review.
