# Design QA

Result: passed

Reference: the user's selected white/cobalt floating-paper concept. Final desktop viewport: 1363 × 936. Small-screen viewport: 500 × 834. `design-comparison.jpg` presents the reference and actual desktop screenshot together, each scaled proportionally within the same 900 × 680 comparison bounds. Original aspect ratios are retained; this is a design-intent comparison, not a pixel-difference score.

## Comparison

- Typography: actual SLB Sans webfont loaded (browser font check true). Large two-line opening heading, small tracked chapter date, subordinate body, contributor credit and blue-underlined source retain the reference hierarchy. English subtitle intentionally replaces Chinese. The longer body is an explicit content expansion.
- Layout/spacing: generous white canvas, left narrative and right floating papers, consistent outer margins, fixed header and bottom chronology. No text/art collision at the desktop viewport. At 500px the art follows the narrative in one column; no horizontal page overflow. Small-screen bottom rail scrolls horizontally.
- Color/surfaces: black/gray type, cobalt #0014dc, fine timeline rule, subtle image shadow, no generic marketing cards added to the opening. Demo browser frames distinguish manipulable content from narrative.
- Imagery: generated transparent paper asset preserves the three-document concept, blue connecting lines, accurate proposal title/author/year and open white composition. Explicitly an artistic reconstruction, not a facsimile. Its paper angles intentionally differ from the original generated concept.
- Icons: consistent Phosphor arrows, pause/play, plus/minus, connection and code symbols. Functional controls retain visible labels or accessible names.
- Timeline: expanded from the concept's five points to 13 chapter entries and a full 19-milestone panel as requested. Dates distinguish invention/proposal, implementation, naming and standardization.
- Content: English throughout, 13 substantive chapters, explicit HTML/CSS/JavaScript, named people or collaborative teams and 28 reference links. Technical simulations are labelled; historical proposals are not presented as release dates.

## Interaction evidence

- HTML heading edited to “Hello, open Web”; live rendered heading updated.
- CSS After dark produced rgb(19, 33, 75); content retained.
- JavaScript Share an idea changed counter from 00 to 01.
- Cookie simulation retained cart 01 after returning with the session option enabled.
- DOM heading stayed changed after selecting a different node.
- AJAX preserved “Keep this thought” while updating messages; full-page simulation cleared the input.
- WebAssembly executed 19 + 23 and returned 42.
- WebGPU gracefully reported unavailable in this environment without claiming a computed result.
- Timeline and Sources dialogs opened/closed; Sources contained 28 outbound references.
- Chapter navigation, active chronology marker, small-screen layout and ambient-motion pause checked.
- Self-contained HTML renders in the browser with embedded assets.
- Build succeeds; four existing Sites worker/packaging tests pass.

## Fixes and limits

Fixed mismatched demo CSS selectors, a JSX delimiter, per-node DOM state persistence and manual motion pause for the canvas illustration. Small-screen timeline panel retains contributor names. Visible keyboard focus, labelled native controls, native dialog modality, image alt text and reduced-motion CSS are included.

No unresolved P0/P1/P2 issue observed in checked views. P3 validation limits: tablet-specific hardware not separately exercised; actual GPU success path and audio playback were not verified in the cloud browser. Browser extension metadata errors were observed; these originated in the extension, not website code. The prototype is not deployed.

## Narrative iteration and URL explorer

Final result: passed

Scope: connect the first six technical chapters through one evolving page, add URL anatomy, and regenerate the standalone HTML automatically. Later chapters retain their existing demonstrations. This pass does not claim completion of a broader scroll-animation redesign or deployment.

Visual evidence:
- Source: user-selected `6B8D63BD-69F2-4F9B-9317-10ADB150236F.jpeg`, 1484 × 1060.
- Hero: `/workspace/scratch/web-history-hero-narrative.jpg`, 1348 × 926 screenshot; browser CSS viewport reported 1363 × 936. `design-comparison.jpg` compares source and implementation proportionally within equal 900 × 680 bounds. Aspect/density differences are preserved, not treated as a pixel match.
- Teaching-page detail: `/workspace/scratch/web-history-journey-html.jpg`; shared AJAX state: `/workspace/scratch/web-history-journey-ajax.jpg`; URL panel: `/workspace/scratch/web-history-url-explorer.jpg`. These states are new functionality, not screens supplied by the original visual reference. Full-size screenshots were inspected for readable controls and content; they provide the focused-region review beyond the reduced hero comparison.

Required surfaces:
- Fonts: SLB Sans remains the site typeface; the unstyled teaching document intentionally uses serif type to distinguish structure from presentation. Heading scale, body hierarchy and code typography remain readable.
- Spacing: the hero retains the reference's left narrative/right papers. A new small story-entry link is an intentional content addition. Six-stage progress and next-question transitions replace disconnected demo headings. Denser DOM/AJAX examples use compact spacing; normal document scrolling remains available for longer content.
- Colors: cobalt accents, white canvas, restrained borders and a dark CSS demonstration remain coherent. URL selections expose an underline and selected state in addition to color.
- Images: original generated paper asset retained without replacement or resampling in the product.
- Copy: one named page and shared state make the first six advances continuous. The URL lesson distinguishes scheme, hostname, URL.host, port, path, query, fragment and HTTP(S) origin. Sources increased to 32 chapter references. Modern HTTPS examples are explicitly separated from the 1990 historical milestone.

Verified interactions:
1. Name a page in HTML; carry the title into CGI/cookies and save an idea.
2. Return with a session identifier; saved count remains 1.
3. Choose After dark; carry the theme into JavaScript, DOM and AJAX.
4. Add a like and a draft; edit the heading in DOM and add a paragraph.
5. AJAX shows the revised heading, additional paragraph, saved count, dark style, like and draft. Updating messages preserves draft and like.
6. Whole-page replacement clears draft and likes in the labelled simulation.
7. Reset restores all six shared page titles to the default.
8. URL explorer opens and closes; parts are clickable. HTTPS :443 normalizes out of host/origin. Editing to http://localhost:8080/a?x=1#section updates hostname, host and origin correctly. Invalid input exposes aria-invalid=true. Fragment explanation states it is not sent in the HTTP resource request.
9. The production build generates the self-contained HTML; existing four packaging/worker tests pass. No site-origin console errors were observed.

No actionable P0/P1/P2 visual mismatch found in the compared desktop views. The new URL panel and connected demos have responsive CSS but were not separately re-tested on a physical phone in this iteration. GPU/audio validation limits from the initial pass remain. No external website was deployed.
