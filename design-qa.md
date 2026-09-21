# Design QA — Large dates, quiet scrollbars and a woven Web

final result: passed

Reviewed 21 September 2026 against the user's current three refinements and attached People-dialog screenshot, plus the requested spiderweb illustration. This is a scoped update to the established SLB Sans / white-and-cobalt design.

## Visual evidence

- `design-refined-hero.jpg`: desktop opening, with a 177px light-weight 1989 and the original floating-paper artwork. Chapter years and transition years also have a stronger hierarchy. Timeline markers retain true-year positions; their labels and current caption are larger.
- `design-refined-dialog.jpg`: the People directory with a thin, translucent scrollbar inset from the rounded glass shell. The close control remains in the same corner while content scrolls.
- `design-refined-mobile.jpg`: real browser frames at 390 × 844 and 768 × 844. The 1993–94 range fits on one line; historical context sits directly under the chapter title. Mobile People-dialog proportions were separately inspected.
- `design-refined-web.jpg`: the same fixed computers and documents connected by curved strands, with a small hanging eight-legged spider. The faint intermediate silk is explicitly an illustration, not another infrastructure layer.

## Checks and fixes

- All 13 chapters have prominent years and one milestone introduction directly below their title. Removed the 12 duplicated bottom date footnotes. Historical qualifications remain unchanged.
- Fixed a narrow-screen year-range wrap found in the first visual pass by scaling range typography separately and keeping it on one line.
- People dialog: scrolling content moved 598px while the close button remained at y=92.52px. The outer shell hides overflow; the inner scroll area reports `scrollbar-width: thin`. Header, directory and close control fit on the 390px frame.
- URL explorer opens in the same inset scroll shell, retains all six address-part controls, and closes correctly. The existing native dialog supplies focus containment and Escape behavior.
- Before/after comparison confirms all 28 CERN node transforms are identical. The connected state draws 34 document-link paths plus 16 decorative silk segments. Following a cross-system link reaches UNIX from the initial VAX/VMS document and reports success.
- All added weaving/appearance transitions honor the existing motion-off switch and OS reduced-motion rules.
- Production build and all four existing worker/packaging checks pass. Standalone HTML is regenerated from the final source. Inspected browser error entries were extension metadata messages, not application errors.

## Remaining limits

Responsive checks use real browser frames rather than physical devices. Native scrollbar rendering varies across operating systems; a usable native thin scrollbar remains available where WebKit styling is ignored.

---

# Previous review — Calendar and scroll motion revision

final result: passed

Reviewed 21 September 2026. The user's latest direction supersedes the earlier framed rail: an unboxed Star Atlas-inspired chronology, true calendar spacing, and flowing transitions inspired by pear.no. The selected white/cobalt artwork and SLB typography remain the visual foundation.

## Visual review

- `design-motion.jpg`: 1363 × 936 desktop browser capture of the CSS transition and chapter. The left rail has no background, border, blur, rounded container or shadow. Fine annual ticks and cobalt current-year emphasis provide orientation.
- `design-motion-responsive.jpg`: browser frames at 390 × 844 and 768 × 844 CSS pixels. Dense years remain distinct; mobile shows compact year labels with the full current range below. The content is readable in one column.
- The saved Star Atlas reference was inspected. Its live experience requires WebGL in this browser; pear.no failed WebGL initialization. The result follows the requested visual/motion direction, not a verified frame-for-frame recreation.
- Twelve interludes join thirteen chapters. Years pass in opposite vertical directions, technical notation and oversized names drift at different rates, and the following text and experiment enter with different offsets. All motion follows scroll position and reverses when scrolling upward.
- Removed a heading clipping effect after inspecting the mobile transition: titles remain readable when scrolling stops midway. Existing glass header, experimental panels and dialogs are retained.

## Verification

- Browser geometry gives 19.06px for 1994→1995 and 133.42px for 1998→2005, a 7:1 ratio within subpixel rounding. Marker positions use `(year - 1989) / 34` throughout; there are no chapter-spacing corrections. Ranges anchor at their first year, with complete dates in accessible names, tooltips and the current caption.
- Computed rail styling: transparent background, 0px border, no box shadow. Desktop document width 1348px in a 1363px viewport: no horizontal overflow.
- Scroll readback: first transition progress rose from 0.2916 to its later position, then returned to 0.4898 after upward scrolling. All 12 passages are present.
- Manual pause produces `transform: none` on copy and years and removes reveal clipping. CSS also provides OS reduced-motion fallbacks, with static decorative typography and lines.
- Left navigation reaches the correct hash and active year. Changing the shared HTML title to “A connected history” carries into the CSS chapter.
- Production build passes; all four existing worker/packaging checks pass. The standalone HTML is regenerated from current source.
- Inspected console errors were browser-extension metadata messages, not application errors.

## Limits

Narrow layouts were checked in browser frames, not physical touch devices. Browser-native wheel gestures occasionally timed out in the automation transport after scrolling had completed; settled viewport and DOM readbacks were used for verification. No GPU support is required for the new animation.

---

# Previous review — Continuous Web revision

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
