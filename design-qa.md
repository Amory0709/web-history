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
