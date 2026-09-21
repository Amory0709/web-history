# Prototype Instructions

## Project decisions
- Build an English-only, chronological, interactive history of the Web.
- Selected visual: the user-approved white/cobalt floating-paper concept (documented in `design-comparison.jpg`). White editorial space, fine electric blue connections, floating paper imagery, restrained timeline.
- Use SLB Sans. Original deck references SLB Sans Book, Light and Medium. The official SLB website exposes its Book webfont; include the real font once downloaded and verified.
- HTML, CSS and JavaScript must each receive an explicit substantive chapter and hands-on interaction.
- Include named inventors or properly credited teams and primary/authoritative source links for every chapter. Distinguish proposals, implementations and standardization dates.
- Preserve a continuous scroll-story, with clickable timeline navigation. Respect reduced motion and keep all content usable without WebGL.
- Demonstrations must clearly identify simulations; never invent benchmark numbers or attribute collaborative standards to a single inventor.
- The user requested creating a GitHub repository and uploading the website and source. The user explicitly requested GitHub Pages deployment.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

- GitHub repository: `Amory0709/web-history`, public, explicitly requested by the user. Keep README in English and update it when functionality or run instructions change.

- Narrative iteration: the first six technical chapters share one teaching page and session-local state. Preserve its title, style, reading list, likes and draft between stages; identify simulations. Every stage poses a next question. `npm run build` must regenerate the standalone HTML automatically.
- Include interactive URL anatomy in the HTML chapter: scheme, hostname/host, port, path, query, fragment, and HTTP(S) origin, with authoritative sources.

- GitHub Pages publishes the freshly built standalone HTML at `https://amory0709.github.io/web-history/` on pushes to main. Keep the deployment workflow and README current.

- Treat this as a continuous website, not a slide deck: no page numbers or numbered chapter counters. Preserve meaningful historical years and named timeline navigation.

- Design revision: natural content-height scrolling, never one-screen-per-chapter or slide counters. A fixed vertical timeline belongs on the LEFT, including a compact mobile rail; no bottom timeline. Use restrained frosted-glass navigation, panels and dialogs. Every named contributor needs a profile link and access to photograph resources.
- Extend the opening with a stable-node CERN tree-to-network interactive diagram, and connect later demos with explicit problems, discoveries and onward questions.
- Typography: normal, tight letter spacing for year/section labels (e.g. “1989 · The proposal”). Avoid widely tracked all-caps labels throughout the experience.

- Timeline revision: use an unboxed, transparent Star Atlas-inspired vertical chronology. Marker positions must be linear in actual year, not equal chapter spacing; range chapters anchor to their first year and retain full date labels in accessible names and the current caption.
- Use reversible, scroll-driven transitions between EVERY historical section: era-specific interactive miniature scenes and differential text/demo movement. Retain natural wheel/touch scrolling, readable content and reduced-motion fallback. No snapping or full-screen chapter pinning.

- Give historical years a strong oversized presence in chapter headings and transitions. Move milestone/date context directly below each title as a concise introduction; remove duplicate bottom footnotes. Keep all historical qualifications.
- Dialogs use a slim inset scrollbar inside the rounded glass shell, with a fixed visible close control.
- The CERN Add the Web state should weave into a spiderweb-like network with a small, friendly minimalist spider beside it. Keep every computer/document node fixed and distinguish the illustrative silk from navigable cross-system links.

- Timeline markers use a globe with a mouse pointer, matching the user’s September 21 icon reference; active cobalt, inactive muted gray. Preserve the true year spacing and frameless rail.
- People should display authentic portraits, prioritizing clear earlier photographs; preserve source/credit links and known photo dates. Never substitute a namesake or generate a historical portrait.
- Graphics uses a denser 72 × 72 point surface. Its explicit animation control remains independent of the global page-motion toggle.
- Wasm smoothing must show a movable, shaded sampling window, input guides and the exact input → Wasm sum → JS average decomposition, including smaller edge windows.
- Parallel illustrations and real GPU execution share one output grid; place the GPU mode immediately after Eight together. Retain measured run times and clearly distinguish intentionally slowed illustration time from GPU initialization/compute/readback time.
- The user replaced the ambient Motion on/off control with Play story / Pause story: automatically scroll, allow reading pauses and run demo interactions. Pause cancels scrolling and upcoming actions immediately; resume preserves the current stop. Wheel, touch, keyboard navigation, manual interaction and tab hiding pause playback. Keep source links and audio manual.
- The three opening paper planes fly apart independently with scrolling and return when scrolling reverses.
- Replace generic oversized-word transitions with technology-specific interactive scenes; each should teach the next capability while the user scrolls.
- The 2015 chapter includes service workers AND Progressive Web Apps, with the naming credited to Frances Berriman and Alex Russell. Explain manifests, deliberate caching, installation and their separate responsibilities. PWA is an application model, not one new API. The installation preview is simulated.

- Render Static Site at `https://web-history.onrender.com/` is the primary address; keep GitHub Pages as a mirror and use one canonical URL. Preserve readable initial HTML and share metadata in production builds.
- Never animate polygon crops of the floating-paper illustration. The user rejected visible cut edges. Use complete independently curved paper surfaces, matching the original central proposal, high-left and low-right sheets, gray text rules, cobalt accents, subtle shadows and scroll-driven lift. Preserve the original image as an intact static fallback.
- Era introductions must feel like part of the following chapter: larger animation, no dividing rule, no repeated introduction years. Let the chapter content gradually emerge behind the receding illustration as the user scrolls. Keep native scrolling and meaningful dates in the main heading and factual historical context.
