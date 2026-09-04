# Product and business context

Status: Current
Last verified: 2026-09-04

## Product purpose

The site introduces Hangin Kite Center, answers practical questions about kitesurfing on Boracay, and gives visitors a direct way to discuss their trip. It is a public marketing and information site, not a booking, payment, inventory, or customer-account application.

The main audience is international visitors planning a Boracay trip. It also serves experienced riders looking for rental gear, storage, local spot information, accommodation, a kite safari, or the physical shop.

The primary conversion is a WhatsApp conversation. Email is the visible fallback. An outbound contact click shows intent only; it does not prove that an enquiry was sent or a booking was made.

## Confirmed facts

- Business name: Hangin Kite Center
- Location: Bulabog Beach, Boracay, Philippines
- Established: 2002
- Instruction: IKO and VDWS
- Services represented by the current site:
  - Kitesurfing lessons from beginner through advanced
  - Equipment rental
  - Equipment storage
  - Accommodation
  - Kite shop
  - Kite safaris
- Email: `hanginkitecenter@gmail.com`
- WhatsApp display number: `+63 938 010 1849`
- WhatsApp link number: `639380101849`
- Canonical origin: `https://www.hanginkitecenter.com`

Runtime copies of these facts are centralized in `content/site.ts`. If the code and this document disagree, verify the business fact with the owner before changing either.

## Unconfirmed information

The repository does not confirm prices, taxes, deposits, course durations, opening or special hours, live availability, capacity, instructor names, exact credentials by person, room specifications, equipment brands or stock, shipping, pickup, cancellations, refunds, no-wind policy, exact street address, geographic coordinates, ratings, awards, customer reviews, or partnerships.

Do not turn an unconfirmed item into public copy, metadata, structured data, a booking rule, or a commerce offer. A future topic brief may define the field and workflow, but the business owner must provide and maintain its value.

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
| `/accommodation/` | Staying near the kite beach |
| `/shop/` | Asking about current kite gear and beach essentials |
| `/kitesurfing-boracay/` | Spot, season, conditions, and island guidance |
| `/about/` | History, certification, and teaching approach |
| `/contact/` | WhatsApp, email, location, and contact preparation |
| `/terms/` | Website inquiries, service preparation and complaint contacts |
| `/accessibility/` | Website use, access problem reporting and visit preparation |

The exact route list is typed in `content/site.ts` and independently asserted in `tests/export-helpers.mjs`.

## Product boundaries

The current site deliberately has no on-site form, booking page, customer account, live weather feed, CMS, blog, product catalogue, cart, checkout, payment flow, analytics tag, advertising pixel, or runtime API.

Future capability proposals are indexed in [`../future/README.md`](../future/README.md). They preserve an inquiry-first fallback and require explicit commercial, legal, operational, and data decisions before public launch.
