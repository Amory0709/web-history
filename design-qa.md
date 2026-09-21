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

## September 21 — Story playback, technology scenes and compute detail

- Replaced the chronology circles with a globe-and-pointer vector mark based on the user's reference. The rail still uses the exact linear year scale.
- Added 16 verified portraits and original-source/date/credit links. The directory now includes 21 people after adding PWA contributors. Nicola Pellow, Ian Fette, David M. Kristol, Frances Berriman and Alex Russell have explicitly unverified-portrait placeholders. The RFC author is not the similarly named chemist; Alex Russell is not the actor.
- Increased the graphics field from 34 × 34 to 72 × 72 points, while reducing individual dot radius and keeping offscreen rendering idle.
- Wasm: checked the actual five-input sum 578 and average 115.6, and the three-input edge sum 309 and average 103.0. Window guides and input/output markers agree with the selected sample.
- Parallel lab: both illustrations produced all 64 squares. Measured example runs were approximately 5.44 s and 680 ms including deliberate animation delays. The GPU mode shares the grid and reports unavailable support without fabricating results or elapsed time. Real GPU success still requires hardware unavailable in this browser.
- Replaced the ambiguous ambient-motion toggle with Play/Pause/Resume story. Browser validation confirmed automatic CSS theme changes and progression to JavaScript, stationary scrolling while paused, successful resume, and immediate pause on manual wheel input. Tour-generated clicks do not trigger manual takeover.
- The opening artwork now has three separately transformed SVG image planes. At an observed scroll progress of 0.6083, all three had different translation/rotation matrices; the original assembled artwork remains intact at the top.
- All 12 bridges now contain specific technology miniatures with scroll-controlled states and independent manual controls. The old large drifting-word transitions are removed from the rendered tree.
- PWA: added the 2015 naming/adoption milestone, Frances Berriman/Alex Russell credits, three additional authoritative references, and a local installation/standalone-window preview. Installation does not implicitly cache content or install this site.
- Production export deduplicates the four uses of the opening image through one code literal; the self-contained HTML remains approximately 3.5 MB and includes all 16 portraits.
- Final 390px/768px checks confirmed the responsive scene switches between narrow and wide states, the header player fits, the inset dialogs retain their controls, and the tablet Wasm recipe displays 578 → 115.6. Evidence: `web-history-latest-responsive.jpg` and `web-history-latest-transitions.jpg`.

## Whole paper surfaces, integrated chapter flow and Render SEO

- Replaced clipped layers of the original illustration with three complete curved meshes projected through a long-lens camera. Each owns its typographic/grain texture. Shadows and blue links are separate geometry; links fade before departure. No image fragments or baked-in rectangular backgrounds move with the pages.
- Matched the reference composition after feedback: large central proposal, high-left Hypertext sheet, low-right connected-world sheet, gray body rules and cobalt accents. Main proposal bends left toward its lower edge. Scroll reversal restores the composition.
- Native Canvas 2D renders the 3D geometry even when WebGL is unavailable. Rendering is event-driven, capped near 30 fps, skips identical frames and offscreen scenes, and caps pixel density at 2. The original intact image is a static fallback. Reduced motion keeps the scene assembled.
- Moved all 12 enlarged introductions inside their owning chapter. Removed the separator rule, repeated transition years and the date inside the HTML miniature. The illustration remains prominent first, then recedes as the main content becomes visible. Native scrolling and automated story stops remain.
- Visually checked the desktop hero before/after scrolling and the HTML introduction/body handoff; checked the 390px mobile introduction and the 768px tablet paper scene. The mobile document's content and client width both measured 375px (scrollbar excluded), with no horizontal overflow.
- Render's existing response was confirmed as HTTP 200 with a static Vite client. Production now includes readable HTML from the shared history data (13 chapters and 35 authoritative source links), canonical Render URL, crawl rules, a homepage-only sitemap, WebSite/WebPage JSON-LD and a verified 1200x630 JPEG sharing card.
- Search Console ownership verification/indexing submission is not performed; this requires the owner's Google account. Search ranking and indexing are not guaranteed.

## Falling papers and the framework chapter — 21 September 2026

- Paper geometry, materials and resting composition remain intact. Each sheet now follows a staggered downward/outward trajectory with gentle phase-offset sway, reversible scroll compensation and an earlier fade. Inspected resting, mid-scroll and handoff positions; the sheets recede behind the CERN section without covering its controls. Reduced motion leaves progress and compensation at zero.
- Added Frameworks at the 2012–14 release milestones, after the 2011 web-platform anchor and before PWA. The milestone directory separately records AngularJS 1.0 (2012), React (2013), Vue (2014) and Angular 2 (2016). The narrative distinguishes generations, library/framework roles, collective contributions and the limits of the demonstration. Seven primary references were added.
- Implemented real Toolbar, ArticleCard and ReadingList components sharing one saved state. Verified save/remove updates all views, component-boundary visibility, and Angular/React/Vue explanation controls. Added the assembly introduction, onward links and automatic story actions.
- Added four authentic, visually checked public profile photographs and biography links for Miško Hevery, Adam Abrons, Jordan Walke and Evan You. Photo dates are explicitly unknown; no age or historical date is inferred.
- Checked desktop and 390px/768px frames. Document widths were 375/753px respectively (excluding scrollbars), matching their client widths without horizontal overflow. The mobile save action updated all views.
- Production build and all four existing deployment tests pass; git diff --check passes. Initial HTML includes all 14 chapters and 42 references. The standalone export embeds the four new portraits, with no unresolved portrait paths.

## Forward paper flight and HTML connector depth — 21 September 2026

- Changed opening trajectories to positive camera depth: intact curved sheets approach the viewer and enlarge through perspective, with staggered starts and gentle outward drift. Preserved the original resting camera framing while enlarging the drawing area to avoid internal canvas clipping.
- Corrected the HTML introduction’s connector stacking: both transformed glass cards use layer 0; the connecting SVG and its destination dot use layer 1 inside a local stacking context. Verified the complete blue curve and endpoint remain in front of the destination card. Navigation retains its existing foreground layer.
- Checked the desktop opening at rest and mid-scroll, plus 390px and 768px responsive frames with no horizontal overflow (375/375 and 753/753 content/client widths). On narrow screens, reduced scroll carry and an earlier whole-scene fade preserve the following text; the CERN section explicitly stays above the paper artwork.
- Reduced motion keeps progress, translation and handoff fade at zero. The animation remains scroll-driven and reversible. Production build and the four existing deployment checks passed; regenerated the standalone export after final responsive adjustments.

## Start transitions when their artwork is visible

- Changed all 13 chapter introductions to derive progress from the illustration center within the usable viewport below the fixed header. Titles and whitespace entering the viewport no longer start the illustration. Initial CSS progress is zero instead of 0.4; reduced motion still shows the completed composition.
- Verified desktop HTML at an artwork top of 833.7px in a 936px viewport: progress 0; at 383.7px: progress 0.3699. Scrolling backward restored the start state. Checked the same entry and in-view positions in 390px and 768px frames; progress stays zero on arrival and advances once the illustration is in view.
- Production build passes and the standalone export is regenerated. Existing paper-flight and connector-layer fixes remain included.

## Opening paper foreground correction — 21 September 2026

- The paper scene inherited layer 0 from `.hero-art`, so the chapter copy (layer 2) and CERN section (layer 1) covered the enlarging sheets. Raising only the canvas would remain trapped inside that parent stacking context.
- The entire scene now uses layer 3 only while scroll progress is between 0 and 1. At rest, after completion, and with reduced motion it retains the original layer. Fixed navigation remains above it and pointer events still pass through the artwork.
- At desktop scroll 315px (flight progress 0.434), visually verified the central sheet now passes continuously in front of the CERN glass panel and the left sheet covers overlapping body text. The starting composition is unchanged; production build and whitespace validation pass.

## More room for chapter animation — 21 September 2026

- Expanded the desktop HTML introduction from about 586px to 730px, enlarged desktop/tablet artwork modestly, and reserved space below it for a gentle scroll carry. Phones keep their existing illustration width. No scroll locking or chapter pinning is introduced.
- Extended the reveal distance by roughly 20–35% at the tested viewports, with a viewport-aware cap to keep the completed artwork below the header. The carry is capped at 104px and measured against its unshifted parent to avoid progress feedback. Delayed the fade until chapter entry reaches 62% (previously 42%).
- Verified desktop and 390px phone starts remain at progress 0. On completion, the artwork stays fully visible: top/bottom 102/512px in the 780px desktop frame and 191/421px on the phone, at full opacity and progress 1. No horizontal overflow; reverse scrolling returns to the initial state. Production build and whitespace checks pass.

## Mobile six-capability indicator — 21 September 2026

- Replaced the wrapped mobile timeline with a two-column, three-row capability list. Removed its single detached connector and kept every marker inline with its label. The current capability has a pale blue background; completed and upcoming items retain distinct marker states. Desktop remains a single horizontal sequence.
- Verified 360px and 430px phone previews: all six labels fit, the two columns align, and document width does not overflow. Existing aria-current semantics and shared page state are unchanged. Production build and whitespace checks pass.

## Whole-site mobile refinement — 22 September 2026

Scope: the 14 chapter demos, technology introductions, opening/CERN section and timeline, people and URL dialogs. Captured the current UI before editing at 390px and 360px in Chromium frames. This is a responsive layout/interaction check, not physical iOS Safari or screen-reader certification.

| Step | Surface | Findings and outcome |
| --- | --- | --- |
| 1 | HTML, server state, CSS | Six capabilities remain in the corrected two-column grid; readable, no additional demo clipping found. |
| 2 | JavaScript, DOM, AJAX | Shared page and controls fit; increased touch heights and editable text size for phones. |
| 3 | Runtime, responsive layout, frameworks | Runtime fits. Responsive example now opens at 320 CSS px on phones and has room for all three content blocks. Framework cards stack vertically instead of squeezing two columns; saving still updates shared state. |
| 4 | Graphics, offline/PWA, Wasm | Graphics and offline controls fit. Wasm now uses vertical calculation steps and a readable caption outside the scaled SVG. Actual Wasm execution returned 578 / 5 = 115.6 in the selected sample. |
| 5 | WebGPU, CERN, opening | Opening and CERN remain usable at narrow widths. Timing records now use full-width rows; illustrated parallel run completed 64 tasks and displayed its measured time. The graph remains a dense illustration on phones. |
| 6 | Technology introductions | CSS, JavaScript and AJAX browser cards were pushed half off-screen by an important auto margin. Centered using their actual 310px width; all small-screen scenes now fit their available column, with extra room for framework pieces. |
| 7 | Timeline, people, URL dialogs | Existing dialog layouts fit and closing works. Close controls are 44px and URL input text is 16px. |
| 8 | Narrow controls and reflow | Verified the main demo controls stay inside the 360px viewport. Framework save, responsive range to 640px, Wasm execution and the 64-task illustration work after reflow. |

Evidence captured in this audit: mobile-audit-01-foundations.jpg through mobile-audit-08-narrow-interactions.jpg; accepted after views include mobile-audit-after-introductions.jpg, mobile-audit-after-applications.jpg, mobile-audit-after-wasm.jpg and mobile-audit-09-timing-rows.jpg. A transient blank screenshot taken while the preview reloaded was rejected.

Implementation is primarily scoped to `src/mobile.css`; desktop layouts retain their existing presentation. No timing benchmark or GPU availability claim is inferred from the illustration. Production build and whitespace checks pass.

## Layered terrain introduction — 22 September 2026

- Replaced the Web Platform introduction's decorative SVG curves with a procedural 3D height field projected through Canvas 2D. A 24-by-24 mesh rises into two ridges and a valley; two lower surfaces separate as scroll progress advances, while a cobalt scan follows the topography. This is an illustrative terrain, not survey data.
- Retained the existing scroll-visible trigger, longer passage and manual scene override. Verified the flat state and raised state through “Shape the terrain”, along with the desktop composition and 360px mobile view. Desktop pointer movement adds subtle parallax; touch scrolling stays native.
- Rendering responds to visible scene changes and settles rather than running an idle animation loop. Reduced motion bypasses interpolation; an SVG fallback remains if Canvas 2D is unavailable.
- Enlarged the final projection after review. Sampled the projected grid at 21 scroll positions: x=33.6–290.3 and y=15.5–214.8 within its 320-by-220 drawing coordinates. Production build and whitespace checks pass.
