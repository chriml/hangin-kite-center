# Cinematic video hero

Status: Saved reusable design template
Saved: 2026-09-12 at the owner's request

This is the cinematic video version the owner liked: one full-screen film, an overlay header, the large “If the wind is up, we're out there.” headline, WhatsApp action, and reviews below. The production homepage continues to use the riding photograph.

The template is self-contained and does not depend on `out/`, `.next/`, temporary directories, a Next.js build or an external media player. It is outside `app/` and `public/`, so the website export does not publish it.

## Preview

From the repository root:

```bash
python3 -m http.server 4191 --bind 127.0.0.1 --directory templates/cinematic-video
```

Open [the video template](http://127.0.0.1:4191/). Navigation links lead to the public Hangin website; WhatsApp and review links retain the saved destinations.

## Reuse

- `index.html`: opening content, navigation, review snapshot and template note.
- `styles.css`: cinematic layout, overlays and responsive crops.
- `base.css`: saved brand tokens, controls and review styles.
- `fonts.css` and `assets/fonts/`: bundled font definitions and files.
- `playback.js`: silent playback, pause/play control, reduced-motion and data-saving checks, visibility and offscreen pausing.
- `assets/shoreline-film.mp4` and `assets/shoreline-poster.jpg`: the current demonstration clip and matching poster.

Replace the MP4 and poster with approved landscape footage when it becomes available. Adjust `object-position` in `styles.css` for the new subject, and update the sequence description in `index.html` and provenance below. The current owner-supplied clip is only 394 × 848 pixels, intentionally retained as the original design demonstration. High-resolution landscape footage would improve the finished hero.

The film starts silently where permitted. Reduced-motion and data-saving preferences keep its poster until the visitor requests playback. Without JavaScript the poster and all content/contact links remain available. There is no paid stock clip in this template.

Before adopting it on the website, reconcile the saved navigation and review snapshots with `content/site.ts`, integrate the current shared site components, and run the normal production and responsive checks. Do not publish the internal template note.

## Media and rights

[provenance.json](provenance.json) records the source, transformations and bundled-asset hashes. The film is a silent slowed derivative of source video 8 in [the owner archive](../../images/VIDEO-INDEX.md). Owner permission was supplied on 2026-09-12; the creator was not identified. The source video remains unchanged.

Brand assets retain the permissions and sources in the site's [brand ledger](../../public/brand/ATTRIBUTION.md), [partner ledger](../../public/brand/partners/ATTRIBUTION.md) and [review ledger](../../public/brand/reviews/ATTRIBUTION.md). They are supplied for Hangin's reference, not as a general license for another brand.

Fonts were copied from this project's generated local font assets. Original license notices, retrieved on 2026-09-12 from the official Google Fonts repository, are included: [Barlow Condensed](licenses/barlowcondensed-OFL.txt) ([source](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt)) and [Manrope](licenses/manrope-OFL.txt) ([source](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt)). The WhatsApp icon retains its [Tabler MIT license](licenses/tabler-icons.txt).

## Verification

Saving the template passed `npm run verify` with a fresh production export and all 55 tests on 2026-09-12. Browser checks confirmed local silent video playback, keyboard pause/resume, bundled images and fonts, a 48-pixel playback control and no horizontal overflow at desktop and mobile widths. All local asset references resolve and match the recorded hashes. The production export contains no template directory. The existing reduced-motion/data-saving behavior was retained from the reviewed prototype. Verification log: `/tmp/hangin-video-template-verify.log`.
