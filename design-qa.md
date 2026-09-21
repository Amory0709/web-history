# Design QA — Continuous Web revision

final result: passed

## Visual truth and comparison

Source visual: the user's selected white/cobalt floating-document concept, preserved in the left panel of `design-comparison.jpg`. The latest explicit user instructions supersede its bottom timeline, wide tracking and slide-like spacing: use a left vertical timeline, natural content-height scrolling, restrained frosted glass and normal label spacing.

Implementation: `/workspace/scratch/web-history-continuous-hero.jpg` (1363 × 936 browser screenshot; CSS viewport 1363 × 936, density 1). The source in the comparison is a 900 × 644 proportional copy of the original 1484 × 1060 concept. The implementation is proportionally reduced to 900 × 618 inside equal comparison bounds. `design-comparison.jpg` (1840 × 740) was opened as a combined comparison, not judged from separate file names. Both show the opening in the default light theme; this is design-intent comparison with intentional layout changes, not pixel equivalence.

Additional browser evidence:
- `design-responsive.jpg`: 1363 × 936 capture containing real browser frames of 390 × 844 and 768 × 844 CSS pixels. These exercise CSS breakpoints, not physical-device touch emulation.
- `/workspace/scratch/web-history-people-revision.jpg`: open contributor directory and glass modal.
- `/workspace/scratch/web-history-cern-revision.jpg`: linked network and a successful cross-system navigation result.
- `/workspace/scratch/web-history-wasm-revision.jpg`: 32-point signal with real Wasm-derived smoothing.
- `/workspace/scratch/web-history-frame-fit.jpg`: full responsive example fitted within its host column.

Full-size hero, modal, interaction and responsive screenshots were inspected. Date-label typography and mobile date wrapping are directly readable in these focused captures; a separate magnified typography collage was unnecessary.

## Required fidelity surfaces

- **Fonts/typography:** SLB Sans is loaded (`document.fonts.check` true). Display headings retain the selected restrained light hierarchy. The year/kicker uses normal letter spacing and natural case. Wide tracked contributor labels and numbered demonstration headings are removed. Mobile dates wrap at a range separator without clipping.
- **Spacing/layout:** sections use content height, with no viewport-height spacer or sticky copy. The left rail is fixed; desktop bounds x=24, width=142, top=108. Natural scroll, hash navigation, and a compact mobile rail preserve orientation. Desktop document has no horizontal overflow. Mobile/tablet content remains in a single reading column.
- **Colors/tokens:** cobalt #0014dc remains the interactive accent; pale neutral background and white translucent surfaces add depth. Header, rail, graph panel and dialogs use backdrop blur. Body text stays opaque and readable.
- **Image quality:** existing generated floating-paper artwork is retained, sharp, and successfully loaded (natural width 1254). Phosphor icons remain consistent. CERN and signal visuals are functional data diagrams, not replacement illustration assets. No fabricated portraits are used.
- **Copy/content:** English throughout; 13 historical sections and 19 milestone entries. Named people link to profiles; the People directory contains 19 contributors with profile/work and photograph-search links. Existing primary technology references remain separate. Search availability is disclosed for photograph links. All technical simulations are labelled; actual Wasm/GPU execution is distinguished from illustrations.

## Comparison history and fixes

1. Earlier desktop rail active highlight only covered its text. Changed the vertical navigation alignment to stretch links across the rail. Post-fix hero capture shows full-width active targets.
2. [P2, fixed] Mobile date ranges clipped after an attempted single-line label. Restored controlled wrapping and increased mobile rail width/label font. Final `design-responsive.jpg` shows complete 1993–94, 2008–09 and 2011–14 labels on two lines.
3. [P2, fixed] A 640px responsive demo could require horizontal scrolling inside a narrower column. Added ResizeObserver-based visual scaling while keeping the iframe's true CSS viewport. Browser readback confirms 557.47px rendered frame inside a 567.47px container; full example visible in the focused screenshot.
4. Corrected the IETF contributor profile URLs using the actual RFC author links instead of guessed profile paths. Ethan Marcotte links to his publisher's illustrated interview.

## Interaction verification

- CERN: adding the Web reveals cross-tree edges. Following the selected document link changes the inspector from VAX/VMS to UNIX, with the successful link explanation. Node coordinates remain fixed by the diagram data. The controls can return to the unlinked state.
- Shared narrative: changed HTML title to “An open laboratory”; CSS retained it and applied the `night` theme. URL explorer opens and closes correctly.
- Signal lab: “Smooth with WebAssembly” produced 32 filtered points and successful actual-module status.
- Parallel lab: completed 64 tasks; final output is 4096. The optional real GPU path honestly reported unavailable in the validation browser. Hardware success remains unverified here.
- People: dialog opens with 19 cards; profile and photo-search URLs are present. Timeline has 19 entries and linked contributor names outside navigation buttons. Dialog close and header navigation work.
- Computed styles confirm relative (not sticky) copy, a fixed left rail, normal kicker letter spacing and no page-counter labels.
- Console review: returned error entries originate from the browser's own extension; no application error appeared in the inspected entries.
- Production build succeeds; all four existing worker/packaging checks pass. The self-contained export is regenerated from source.

## Remaining limits / P3

- Photo searches depend on external catalog coverage; profiles for standards authors may focus on publications rather than biography.
- GPU success needs a compatible browser/device; the unavailable branch was verified.
- Narrow viewport checks use browser frames; physical-device touch and Safari rendering have not been tested.

## Implementation checklist

- [x] Continuous layout; no page counters or bottom rail.
- [x] Frosted surfaces and natural label spacing.
- [x] Contributor profiles, photographs and historical sources.
- [x] CERN tree-to-network interaction.
- [x] Later-stage experiment prompts, real Wasm signal demo and parallel-work demo.
- [x] Responsive review and meaningful interaction checks.
- [x] Rebuild standalone artifact before publishing.
