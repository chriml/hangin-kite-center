# Video quality index

Reviewed 2026-09-12. All **nine MP4 videos** in this folder have descriptive filenames and visual-quality scores out of 10. Total duration: **73.91 seconds**. Higher is better.

All clips are vertical **394 × 848** videos at approximately **30 fps**. The scores consider the source resolution, composition, lighting, color, visible detail, motion blur and framing changes. They describe the footage as supplied, and assess the video rather than the people pictured.

The review covered **307 chronological samples** about a quarter-second apart, including the first and last frame of every video, plus eight full-size frame checks. This was a dense frame-sequence review, not real-time playback; audio quality was not rated. A complete FFmpeg decode of all 2,216 video frames and the audio streams passed for all nine files.

Only filenames changed. The original video, audio, embedded metadata, resolution and duration are preserved byte-for-byte. The [machine-readable index](video-index.json) records old and new filenames, scores, reasons, sequence descriptions, sample timestamps, technical details and original SHA-256 checksums.

| Score | Meaning | Videos |
| --- | --- | ---: |
| 7/10 | Good, with minor limitations | 1 |
| 6/10 | Usable, with noticeable limitations | 6 |
| 5/10 | Weak | 2 |

## Ranked videos

Equal scores are ties. Click a description to open the original clip.

| Quality | Video | Duration | Reason |
| --- | --- | ---: | --- |
| 7/10 | [two people demonstrating movements beside kiteboard under palms](two-people-demonstrating-movements-beside-kiteboard-under-palms-quality-7of10.mp4) | 4.64s | Clear full-body gestures, bright color and mostly consistent framing make the exchange easy to follow despite limited fine detail. |
| 6/10 | [beach walk past kite control practice and yellow kite](beach-walk-past-kite-control-practice-and-yellow-kite-quality-6of10.mp4) | 27.03s | The clip clearly follows several gear demonstrations, but pale contrast, soft detail and long stretches of empty sand reduce its visual impact. |
| 6/10 | [helmeted woman sorting kite lines on sandy beach](helmeted-woman-sorting-kite-lines-on-sandy-beach-quality-6of10.mp4) | 4.43s | The full-body action and blue-green bay are clear, though low-resolution softness and shadowed clothing limit equipment detail. |
| 6/10 | [man checking harness connection with two helmeted women](man-checking-harness-connection-with-two-helmeted-women-quality-6of10.mp4) | 4.33s | The close equipment interaction is legible in good daylight, but soft detail, drifting framing and a large camera shadow reduce the finish. |
| 6/10 | [man handling lines beside orange kite on beach](man-handling-lines-beside-orange-kite-on-beach-quality-6of10.mp4) | 4.43s | The orange kite and moving offshore kites provide clear color and context, but the small shadowed person and broad empty sand reduce impact. |
| 6/10 | [people raising red and black kite on beach](people-raising-red-and-black-kite-on-beach-quality-6of10.mp4) | 6.50s | The vivid red kite and visible lifting action provide a clear subject, but its canopy hides people and the narrow low-resolution framing clips its edges. |
| 6/10 | [two people handling kite control bar on beach](two-people-handling-kite-control-bar-on-beach-quality-6of10.mp4) | 11.35s | Bright sea colors and a clearly visible equipment interaction make this usable, but low resolution, shadowed faces and drifting handheld framing limit polish. |
| 5/10 | [helmeted woman handling lines beside turquoise kite](helmeted-woman-handling-lines-beside-turquoise-kite-quality-5of10.mp4) | 6.29s | The activity remains recognizable, but small subjects, subdued exposure and limited detail make this a visually weak wide shot. |
| 5/10 | [two men walking toward camera along kite beach](two-men-walking-toward-camera-along-kite-beach-quality-5of10.mp4) | 4.90s | The walking sequence remains understandable, but dark faces, soft distant figures and loose framing weaken visual clarity. |

## Verification scope

The rename verification passed all nine original-to-new mappings, unchanged SHA-256 checksums and file sizes, unique filenames, matching score suffixes, full-duration sample coverage, all 148 links across the photo and video indexes, and unchanged checksums for all 135 photo files. No application references used the original video filenames.

Application lint, typecheck, production export, Node tests and browser checks are not applicable to this source-archive rename: no application code, served media or site behavior changed. Nothing was committed, pushed or published.

Base and head revision: `0b5ec7d3f7917d36e1ac707dd79002ade1893bbc`. Review branch: `codex/image-descriptions-quality-ranks`. The user authorized video review and ranking as a continuation of the photo renames. This index is the result for owner review.

See also the [photo quality index](IMAGE-INDEX.md).

Validation commands: `python3 /tmp/hangin-video-review/verify-renames.py` exited 0; `git diff --check` exited 0. The baseline comparison detected concurrent edits outside `images/`; those were left alone. This follow-up wrote only the nine video renames, two video indexes and cross-references in the existing photo indexes.
