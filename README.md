# The Web — A Living History

A scroll-driven, interactive history of the Web: **13 chapters, 19 milestones, 12 hands-on demonstrations, and 28 authoritative references**. Follow the ideas and people who turned linked documents into an application platform.

The experience is written in English and uses SLB Sans, a white-and-cobalt editorial layout, floating-document artwork, and a clickable chronological timeline.

## Experience

- Scroll through the story or jump between chapters using the bottom timeline.
- Open **Timeline** to see when technologies were proposed, implemented, or standardized.
- Open **Sources** or **The story & sources** for historical context, contributor credits, and original references.
- Try editing HTML, switching CSS styles, running JavaScript, changing DOM nodes, comparing AJAX updates, and executing a real WebAssembly module.
- Pause ambient motion using the header control. The layout adapts to smaller screens and respects reduced-motion preferences.

## Run locally

Use a current Node.js LTS release and npm.

```bash
git clone https://github.com/Amory0709/web-history.git
cd web-history
npm ci
npm run dev
```

Open the local address printed by Vite.

### Open without installing anything

Download the repository, then open **`The-Web-A-Living-History.html`** in a modern browser. This self-contained snapshot embeds the scripts, styles, fonts, and artwork. The main experience works without network access; external source links require an Internet connection.

The standalone HTML is a snapshot of this version. Changes to the React source need a new build and standalone export to appear in that file.

### Build and validate

```bash
npm run build
npm run test:sites
npm run preview
```

The build creates the static client in `dist/client/` and the included Sites-compatible worker in `dist/server/`. No hosted website or GitHub Pages deployment is configured by this repository.

## Chapters

| Milestone | Chapter | What changed |
| --- | --- | --- |
| 1989 | The Web proposal | Documents could connect across computers. |
| 1990 | HTML, URL and HTTP | Shared structure, addresses and retrieval. |
| 1993–94 | CGI and cookies | Pages could respond and sessions could persist. |
| 1994 | CSS | Presentation became separate from content. |
| 1995 | JavaScript | Pages could run logic and respond to events. |
| 1998 | DOM Level 1 | A standard interface to the live document tree. |
| 2005 | AJAX | Update part of a page without replacing everything. |
| 2008–09 | V8 and Node.js | Faster execution and a wider JavaScript ecosystem. |
| 2010 | Responsive design | One document could adapt to different screens. |
| 2011–14 | Web platform | Real-time connections, graphics and native media. |
| Mid-2010s | Service workers | Deliberately cached resources could work offline. |
| 2017 | WebAssembly | More languages could target the browser. |
| 2023 | WebGPU shipping milestone | Modern GPU graphics and compute on supported platforms. |

Dates represent different kinds of milestone; the site explains proposal, implementation, naming, and standardization dates separately. Collaborative standards are credited to their contributors and teams rather than attributed to one inventor.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/history.js` | Narrative, dates, contributors, citations and timeline entries |
| `src/Demos.jsx` | Interactive demonstrations |
| `src/App.jsx` | Chapters, scroll navigation and source/detail dialogs |
| `src/styles.css` | Typography, layout, responsive rules and motion |
| `public/assets/` | Floating-document artwork |
| `public/fonts/` | SLB Sans webfonts |
| `worker/`, `scripts/`, `tests/` | Build packaging and worker checks |
| `The-Web-A-Living-History.html` | Self-contained, ready-to-open snapshot |

Built with React, Vite, plain CSS, browser APIs, and Phosphor icons. To extend the story, edit `src/history.js`; add demonstrations in `src/Demos.jsx` and connect them through its exported map.

## What the demonstrations actually do

HTML, CSS, JavaScript, DOM editing, responsive media queries, and the 41-byte WebAssembly module run in the browser. Audio uses the Web Audio API only after a button press.

Cookies, AJAX request timing, asynchronous I/O, messaging, and offline caching are explicitly labelled local simulations. They do not create accounts, make payments, run a messaging server, or change your network connection. The graphics surface is a Canvas 2D projection so it also works without WebGL. The optional WebGPU calculation uses a real compute shader when browser, hardware, and context support it; otherwise it reports that no GPU computation occurred. The illustrations are not performance benchmarks.

## Sources and assets

Historical references are attached to each chapter, including the W3C archives and specifications, IETF RFCs, original essays, language histories, and official browser/runtime documentation.

- The floating papers are generated artwork: an artistic reconstruction, not a historical document facsimile.
- SLB Sans Book, Light, Regular, and Medium are included from the public SLB website font endpoints to match the requested design. SLB Sans is a third-party typeface; its inclusion does not grant an open-source font license.
- Icons come from `@phosphor-icons/react`.

## Validation

The production build and four existing worker/packaging tests pass. Browser checks cover live HTML editing, CSS themes, JavaScript counters, session simulation, persistent DOM edits, AJAX input preservation, Wasm output, unavailable-GPU handling, navigation, dialogs, and reference links. Desktop and 500px layouts were inspected. The GPU success path requires compatible hardware and was not available in the validation browser. See `design-qa.md` for the review notes.
