# Product and business context

Status: Current
Last verified: 2026-09-08

## Product purpose

The site introduces Hangin Kite Center, answers practical questions about kitesurfing on Boracay, and gives visitors a direct way to discuss their trip. It is a public marketing and information site, not a booking, payment, inventory, or customer-account application.

The main audience is international visitors planning a Boracay trip. It also serves experienced riders looking for rental gear, storage, local spot information, accommodation, a kite safari, or the physical shop.

The primary conversion is a WhatsApp conversation. Email is the visible fallback. An outbound contact click shows intent only; it does not prove that an enquiry was sent or a booking was made.

## Confirmed facts

- Business name: Hangin Kite Center
- Location: Bulabog Beach, Boracay, Philippines
- Established: 2002
- Instruction: IKO and VDWS
- Center designation: “Official Duotone Kite Center”, explicitly supplied by the owner on 2026-09-06 for the homepage hero tag; stored in `siteConfig.centerDesignation`. This does not assert the separate “Duotone Pro Center” designation.
- Seasonal operation: Amihan is the main kite season at Bulabog, roughly November to April. The owner confirmed on 2026-09-06 that Hangin moves sessions to the other side of Boracay during Habagat. Habagat is the southwest monsoon, roughly June to October; timing is corroborated by [local operator Isla Kitesurfing](https://islakitesurfing.com/livewind/) (accessed 2026-09-06). No exact alternate meeting point or transfer service is asserted.
- Equipment partners: Duotone and ION. The owner requested these brands in the hero and partner strip on 2026-09-06; the business description on the [Tripadvisor attraction listing](https://www.tripadvisor.ca/Attraction_Review-g1203055-d3267405-Reviews-Hangin_Kite_Center_Resort-Malay_Aklan_Province_Panay_Island_Visayas.html) also names Duotone kiteboarding and ION equipment rentals (accessed 2026-09-06). This does not establish an official Duotone Pro Center designation or current stock.
- Services represented by the current site:
  - Kitesurfing lessons from beginner through advanced
  - Equipment rental
  - Equipment storage
  - Accommodation
  - Kite shop
  - Kite safaris
- Response time: replies within one day, explicitly confirmed by the owner for homepage contact copy on 2026-09-06. The owner maintains this commitment.
- Email: `hanginkitecenter@gmail.com`
- WhatsApp display number: `+63 938 010 1849`
- WhatsApp link number: `639380101849`
- Canonical origin: `https://www.hanginkitecenter.com`

Runtime copies of these facts are centralized in `content/site.ts`. If the code and this document disagree, verify the business fact with the owner before changing either.

## Researched spot context

The owner requested a combined guide based on other Boracay kite schools on 2026-09-08. The guide in `content/island-pages.ts` and homepage spot introduction use local-operator evidence for northeast Amihan wind, reef shelter with variable water conditions, tide-dependent depth and launch space, sea urchins, shared riding areas, and the broad Caticlan/Kalibo arrival options.

The [spot-guide source record](boracay-spot-guide-sources.md) maps each topic to the pages read on 2026-09-08 and records conflicting claims. These are general spot observations, not new Hangin service guarantees or a live conditions report. Exact launch areas, usable depths and equipment choices need an on-the-day check with the team. The existing owner confirmation remains the authority for Hangin moving sessions during Habagat.

## Confirmed lesson price sheet

The owner supplied and approved a Hangin course sheet on 2026-09-08, replacing earlier conversational course prices and durations. The [source record and original image](../references/2026-09-08-hangin-course-price-sheet.md) preserve the evidence, exact figures, source text, superseded decisions and remaining policy dependencies.

- Introductory course: PHP 6,000 per person, 1.5 hours private or 2 hours group.
- Basic kite, kite control and board riding courses: each PHP 12,000 per person, 3 hours private or 4 hours group.
- Full course: PHP 36,000 per person, 9 hours private or 12 hours group.
- Advanced private coaching: PHP 4,400 for 1 hour, PHP 8,500 for 2 hours, PHP 16,000 for 4 hours. Topics include upwind riding, freeride, freestyle and strapless surfboard riding, matched to the student and conditions.

The public lesson record is `content/water-pages.ts`. Prices are maintained by reception through owner-approved dated updates until a future KiteHub integration exists. These are published informational prices, not a live booking service. Course completion does not guarantee independent riding. The sheet does not authorize guaranteed outcomes or fixed calendar schedules.

Earlier owner policy decisions are retained separately in the source record, with calculations and schedule dependencies flagged for reconciliation. They are not live booking rules or part of this public price-sheet update.

## Lesson policies reconciled on 2026-09-12

The owner requested publication of practical lesson answers on 2026-09-12. The original owner discussion and retained operational record confirm that beginner lessons include all necessary lesson equipment, lesson prices include applicable taxes and mandatory fees, and beginner group lessons have at most two students per instructor sharing one kite. Reception and instructors assess conditions; lesson times are normally confirmed two days ahead. When conditions prevent teaching, guests can choose voluntary rescheduling or a refund for the unprovided teaching. Instructors may stop unsafe lessons even after confirmation.

The [policy reconciliation source](../references/2026-09-08-hangin-course-price-sheet.md#practical-policy-reconciliation-2026-09-12) records the original discussion and unresolved boundaries. The new nine-hour private and twelve-hour group full courses do not establish a fixed number of calendar days. Advanced equipment inclusions and numerical allocation of partial-course refunds remain unconfirmed. The lesson FAQ publishes the confirmed principles without inventing those details.

## Unconfirmed information

The repository does not confirm rental, storage, shop or accommodation prices, advanced-course equipment inclusions, opening or special hours, live availability, instructor names, exact credentials by person, room specifications, current equipment stock, shipping, pickup, exact street address, geographic coordinates, live aggregate ratings beyond the documented snapshots below, awards, customer reviews, official Duotone Pro Center designation, or other partnerships. Lesson prices and teaching hours are confirmed above; earlier owner policy decisions and unresolved dependencies are distinguished in the linked source record.

Do not turn an unconfirmed item into public copy, metadata, structured data, a booking rule, or a commerce offer. A future topic brief may define the field and workflow, but the business owner must provide and maintain its value.

## Published rating snapshots

The owner requested Google and Tripadvisor logos with stars instead of the attributed quote on 2026-09-06. The homepage now links two compact badges to the platform listings. `reviewPlatforms` in `content/site.ts` holds scores, logos, destinations and the source-check date. Stars show fractional scores, not a rounded five-star claim. No `Review` or `AggregateRating` structured data is generated.

- Google: 4.1 out of 5, observed in the live public Google Maps place response on 2026-09-06 for [Hangin Kitesurf Center & Resort](https://www.google.com/maps/search/?api=1&query=Hangin+Kitesurf+Center+%26+Resort&query_place_id=ChIJDZwPzD08pTMRCv8c2mLjjBw). Exact place ID matches the business website. Review count was unavailable and is omitted.
- Tripadvisor: 4.9 out of 5 in the latest accessible indexed [attraction listing](https://www.tripadvisor.com/Attraction_Review-g1203055-d3267405-Reviews-Hangin_Kite_Center_Resort-Malay_Aklan_Province_Panay_Island_Visayas.html), retrieved 2026-09-06. The live page returned 403; this is a cached score, not verified as current. Do not confuse it with the separate hotel listing.

These are static snapshots, not a live integration. Tooltip text describes the source-check date, not a rating update date. The owner owns rechecks before publication and future updates; remove a score if its source is withdrawn or corrected. Brand asset provenance is in `public/brand/reviews/ATTRIBUTION.md`.

## Visitor questions

The current site should let a visitor answer:

1. Can I learn here as a complete beginner?
2. Is Bulabog Beach suitable for my level?
3. Can I rent or store equipment?
4. Can I stay close to the kite beach?
5. What other services can I ask about?
6. How do I contact Hangin with my dates and riding level?

## Public routes

| Route | Primary intent |
| --- | --- |
| `/` | Kitesurfing and kite school in Boracay |
| `/kitesurfing-lessons/` | Beginner, progression, and advanced lessons |
| `/rentals-storage/` | Equipment rental and storage |
| `/kite-safaris/` | Guided kite trips and safaris |
| `/events/` | Coming-soon events page; no event details or dates announced |
| `/accommodation/` | Staying near the kite beach |
| `/shop/` | Asking about current kite gear and beach essentials |
| `/kitesurfing-boracay/` | Spot, season, conditions, and island guidance |
| `/kitesurfing-boracay/places-to-be/` | Beaches, places and non-kiter ideas |
| `/kitesurfing-boracay/things-to-do/` | Kitesurfing, sailing, snorkeling and island hopping |
| `/kitesurfing-boracay/planning-your-days/` | Days between sessions, island transport and arrival |
| `/kitesurfing-boracay/practical-questions/` | Practical questions about visiting and arranging activities |
| `/kite-size-guide/` | Weight, dates and level to compare three kite packing options |
| `/about/` | History, certification, and teaching approach |
| `/contact/` | WhatsApp, email, location, and contact preparation |

The exact route list is typed in `content/site.ts` and independently asserted in `tests/export-helpers.mjs`.

The owner requested places and activities content under Boracay on 2026-09-08. The spot page links the topic pages through a “Places to be” section. The owner requested separate submenu pages on 2026-09-13; their existing content is now split across the four routes above. [The island-guide source record](boracay-island-guide-sources.md) supports White Beach, D'Mall, Diniwid, Puka, sailing, snorkeling and general transport context. Suggested days are editorial ideas, not fixed itineraries or Hangin packages. No restaurant endorsement, excursion partnership, transfer service, price or availability claim is established by this guide.

## Product boundaries

The current site deliberately has no enquiry-submission form, booking page, customer account, live weather feed, CMS, blog, product catalogue, cart, checkout, payment flow, analytics tag, advertising pixel, or runtime API.

Future capability proposals are indexed in [`../future/README.md`](../future/README.md). They preserve an inquiry-first fallback and require explicit commercial, legal, operational, and data decisions before public launch.

## Social profiles

The footer's `socialLinks` record currently links [Facebook](https://www.facebook.com/HanginKiteCenterAndResort/). Its destination is corroborated by Hangin's entries in [IKSURFMAG](https://www.iksurfmag.com/schools/hangin-kite-center/) and [UniversKite](https://spots.universkite.fr/item/boracay-hangin-kitesurf-center/) with matching Boracay business identity (accessed 2026-09-06). Direct Facebook profile retrieval is blocked. The owner requested social links on 2026-09-06; Instagram and TikTok destinations remain pending owner input and are not rendered. Do not guess their handles or add social identity structured data from directory evidence alone.

## Kite packing calculator

The owner requested the [kite size guide](kite-size-guide.md) on 2026-09-08. It offers three locally calculated packing alternatives using published reference ranges, with season and rider-level guidance. It is not a live wind report, equipment catalogue or booking tool. Rider inputs stay in browser memory.

## Kite safari page, 2026-09-13

The owner requested a kite safari page on 2026-09-13. The existing `/kite-safaris/` route now gives more detailed rider-level and equipment prompts, practical questions about cost and changing conditions, and contextual links to the spot guide, rental/storage and lessons. It is also linked in desktop primary navigation. The safari contact message asks for dates, riding levels, group size and gear, plus current cost and inclusions. This is an enquiry template, not a form or a booking.

The initial safari-page change did not establish destinations, durations, prices, departures, equipment or transport inclusions, or cancellation policy. The team must confirm those details for the trip being discussed. The existing generated safari artwork remains decorative and does not represent a real trip.


### About-page instructor marks and team placeholders, 2026-09-13

The owner explicitly confirmed permission for Hangin to display both IKO and VDWS logos on the website. The marks accompany the existing instructor statement; they do not establish school membership or individual credentials. The owner requested exactly three team placeholders pending names, roles and photos. The About page therefore shows three “Team member / Profile coming soon” entries with decorative Hangin artwork. No staff identity or biography has been inferred from the group photo.

### Safari trip cards and pending details

The owner subsequently supplied the exact labels **Batbatan**, **Colon** and **Others**, and requested a horizontal card for each. “Colon” is retained as written; no alternate place name or geography is inferred. Each Request action opens a trip-specific WhatsApp enquiry; More opens `/kite-safaris/batbatan/`, `/kite-safaris/colon/` or `/kite-safaris/others/`. Those pages show the selected name and “Coming soon…” as explicitly requested, with breadcrumbs and a link back. The trip names do not establish live departures, prices, duration, transport or equipment inclusions.
