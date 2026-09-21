# Prototype Instructions

## Project decisions
- Build an English-only, chronological, interactive history of the Web.
- Selected visual: the user-approved white/cobalt floating-paper concept (documented in `design-comparison.jpg`). White editorial space, fine electric blue connections, floating paper imagery, restrained timeline.
- Use SLB Sans. Original deck references SLB Sans Book, Light and Medium. The official SLB website exposes its Book webfont; include the real font once downloaded and verified.
- HTML, CSS and JavaScript must each receive an explicit substantive chapter and hands-on interaction.
- Include named inventors or properly credited teams and primary/authoritative source links for every chapter. Distinguish proposals, implementations and standardization dates.
- Preserve a continuous scroll-story, with clickable timeline navigation. Respect reduced motion and keep all content usable without WebGL.
- Demonstrations must clearly identify simulations; never invent benchmark numbers or attribute collaborative standards to a single inventor.
- The user requested creating a GitHub repository and uploading the website and source. Website deployment has not been requested.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

- GitHub repository: `Amory0709/web-history`, public, explicitly requested by the user. Keep README in English and update it when functionality or run instructions change.
