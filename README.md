# Hangin Kite Center website

Static Next.js website for Hangin Kite Center on Bulabog Beach, Boracay.

## Local workflow

```bash
npm ci
npm run dev
npm run verify
npm run build
```

`npm run verify` runs lint, type checking, a production build and the Node test suite. Run `npm run build` when only a fresh static export is needed. The deployable site is written to `out/`; upload that directory to the static host. `npm run preview` serves the export on port 4173.

## Site records

- Edit the WhatsApp number, email address, public origin and route list in `content/site.ts`.
- Keep image dimensions, alt text and source details in `content/images.ts`.
- Record proof-photo attribution and generated-image provenance in `public/images/ATTRIBUTION.md`.
- If online booking replaces WhatsApp, switch the links in `ContactCta` and the message URLs produced by `getWhatsAppUrl`.

Before launch, confirm the `www.hanginkitecenter.com` DNS records point to the production static host and that HTTPS resolves on the `www` hostname.
