# The Web — A Living History

**[Open the live experience](https://web-history.onrender.com/)** · [GitHub Pages mirror](https://amory0709.github.io/web-history/)

A scroll-driven, interactive history of the Web: **14 chapters, 24 milestones, hands-on demonstrations, and 42 authoritative references**. Follow the ideas and people who turned linked documents into an application platform.

The experience is written in English and uses SLB Sans, a white-and-cobalt editorial layout, floating-document artwork, and a clickable chronological timeline.

## Experience

- Scroll through the story or jump using the frameless vertical timeline on the left. Positions follow a linear 1989–2023 calendar scale: a seven-year gap is seven times a one-year gap. Date ranges anchor at their first year; the current caption shows the full range.
- Move through 13 large interactive introductions integrated into their chapters. The chapter body gradually emerges as the introduction recedes, without a dividing rule or repeated transition years. Their visuals introduce the next capability: linked documents, request/response, CSS styling, a JavaScript counter, a DOM tree, partial AJAX updates, an I/O queue, responsive reflow, a spatial canvas, an application assembled from components, an installable/offline app, Wasm and GPU work. Scroll or use each miniature’s control. Wheel and touch scrolling remain native.
- Watch three complete, curved paper surfaces fly toward the viewer, growing through perspective and gently drifting outward as you scroll, and return when you scroll back. Their typography, paper grain, blue links and proportions echo the original artwork; the sheets and soft shadows are rendered separately without cutting up the illustration. An enlarged drawing area keeps the approaching sheets intact. The renderer is idle between scroll/resize updates and works without WebGL.
- Explore the CERN diagram: keep the same computers and files in place, weave a spiderweb of document links, and follow a cross-system connection. A small minimalist spider appears beside the web; faint silk is a visual metaphor, not additional infrastructure.
- Open **People** for 25 contributor profiles and 20 verified portraits, with dates and source/credit links. Earlier photographs are preferred where available; Nicola Pellow, Ian Fette, David M. Kristol and the newly added PWA contributors Frances Berriman and Alex Russell retain explicit missing-portrait placeholders. Names in the narrative also link to their profiles.
- Open **Timeline** to see when technologies were proposed, implemented, or standardized.
- Open **Sources** or **The story & sources** for historical context, contributor credits, and original references.
- Follow one page through HTML, CGI/cookies, CSS, JavaScript, DOM and AJAX. Your title, chosen style, reading list, likes and unfinished draft carry forward during your visit. Each stage ends with the next question to solve.
- Open **Read the address** in the HTML chapter to explore scheme, hostname, port, path, query, fragment, and origin. Edit the example or compare default ports; parsing stays local.
- Smooth a noisy signal using a real WebAssembly addition module. Move a highlighted sampling window to see its input values, Wasm sum and JavaScript average. Compare one-at-a-time and eight-together illustrations, then choose **On your GPU** beside them to run a real 64-value calculation in the same grid. Timers retain each completed run and distinguish animation time from end-to-end GPU time.
- Explore **Frameworks (2012–14)**: save one article to update three real React components from shared state, reveal their boundaries, then compare the ideas behind AngularJS/Angular, React and Vue. The chapter distinguishes AngularJS 1.0 (2012), React’s public release (2013), Vue (2014) and the Angular 2 rewrite (2016), with creator profiles and primary sources. The tabs explain the approaches; they do not switch engines or benchmark frameworks.
- Read a continuous, content-height narrative with oversized years and concise historical context directly under each title. Glass dialogs have slim inset scrollbars and a close control that stays visible. There are no page counters or scroll snapping.
- Use **Play story / Pause story** to automatically scroll through the narrative and run the local demonstrations. Resume continues the remaining pause; wheel, touch, a manual interaction, keyboard navigation, or hiding the tab pauses the tour. If you move elsewhere, playback starts from that point. The tour never follows external links or opens audio. Reduced-motion preferences are respected without a separate motion toggle.

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

`npm run build` automatically regenerates the standalone HTML from the current React source and embeds the fonts and artwork. Rebuild after editing; commit the regenerated HTML alongside the source.

### Build and validate

```bash
npm run build
npm run test:sites
npm run preview
```

The build creates the static client in `dist/client/` and the included Sites-compatible worker in `dist/server/`. GitHub Pages automatically publishes the latest successful build from `main` at https://amory0709.github.io/web-history/. The workflow `.github/workflows/pages.yml` builds and tests the source, then publishes the self-contained HTML as `index.html`. Embedded assets make the deployment independent of the repository subpath. Updates appear after the Actions deployment finishes, not while files are still being edited.

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
| 2015 | Service workers & Progressive Web Apps | Deliberate caching and an installable, app-like web experience. |
| 2017 | WebAssembly | More languages could target the browser. |
| 2023 | WebGPU shipping milestone | Modern GPU graphics and compute on supported platforms. |

Dates represent different kinds of milestone; the site explains proposal, implementation, naming, and standardization dates separately. Collaborative standards are credited to their contributors and teams rather than attributed to one inventor.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/history.js` | Narrative, dates, contributors, citations and timeline entries |
| `src/UrlAnatomy.jsx` | Interactive URL anatomy and origin explorer |
| `src/Journey.jsx` | Shared teaching page, state and six connected chapters |
| `src/Demos.jsx` | Later platform demonstrations |
| `src/ComputeLabs.jsx` | Signal smoothing with real Wasm and illustrative/real parallel computation |
| `src/CernNetwork.jsx` | Fixed-node tree-to-network interaction |
| `src/People.jsx`, `src/portraits.js` | Contributor links, portrait gallery and attribution data |
| `src/editorial.css` | Continuous layout, glass surfaces and mobile adaptation |
| `src/Chronology.jsx` | Linear calendar scale and frameless left navigation |
| `src/ScrollStory.jsx`, `src/EraScenes.jsx`, `src/era-scenes.css` | Scroll-driven paper flight, chapter entrances and twelve interactive technology scenes |
| `src/StoryPlayback.jsx` | Guided scrolling, timed demonstration actions, pause/resume and manual takeover |
| `src/motion.css` | Chronology, motion, responsive and reduced-motion styles |
| `src/refinement.css` | Oversized dates, inset dialog scrolling and woven-web details |
| `src/App.jsx` | Chapters, scroll navigation and source/detail dialogs |
| `src/styles.css` | Typography, layout, responsive rules and motion |
| `public/assets/` | Floating-document artwork and attributed portrait photographs |
| `public/fonts/` | SLB Sans webfonts |
| `worker/`, `scripts/`, `tests/` | Build packaging and worker checks |
| `The-Web-A-Living-History.html` | Self-contained, ready-to-open snapshot |

Built with React, Vite, plain CSS, browser APIs, and Phosphor icons. To extend the story, edit `src/history.js`; edit the continuous teaching page in `src/Journey.jsx`, or add later demonstrations in `src/Demos.jsx` and connect them through its exported map.

## What the demonstrations actually do

HTML, CSS, JavaScript, DOM editing, responsive media queries, and the 41-byte WebAssembly module run in the browser. Audio uses the Web Audio API only after a button press.

Cookies, AJAX request timing, asynchronous I/O, messaging, and offline caching are explicitly labelled local simulations. They do not create accounts, make payments, run a messaging server, or change your network connection. The PWA home-screen and standalone-window preview is also a local simulation, not an installation prompt or a registered service worker. The graphics surface contains 5,184 points (72 × 72), projected with Canvas 2D so it also works without WebGL. The signal filter uses the Wasm module for window sums and JavaScript for looping, division and rendering. The 64-cell work-scheduling grid is an intentionally slowed illustration. The optional WebGPU calculation uses a real compute shader when browser, hardware, and context support it; otherwise it reports that no GPU computation occurred. The illustrations deliberately wait 85 ms between updates; their wall-clock timers include that delay. The GPU timer includes adapter/device initialization, shader/pipeline preparation, transfer, execution and readback. These are different measurements, not performance benchmarks.

## Sources and assets

Historical references are attached to each chapter, including the W3C archives and specifications, IETF RFCs, original essays, language histories, and official browser/runtime documentation.

- The floating papers are generated artwork: an artistic reconstruction, not a historical document facsimile.
- SLB Sans Book, Light, Regular, and Medium are included from the public SLB website font endpoints to match the requested design. SLB Sans is a third-party typeface; its inclusion does not grant an open-source font license.
- Icons come from `@phosphor-icons/react`; the chronology uses an inline globe-and-pointer SVG inspired by the requested Web symbol.
- Portrait sources, dates and individual rights are documented in [PORTRAITS.md](PORTRAITS.md). The photographs are not AI-generated or de-aged.

## Validation

The production build and four existing worker/packaging tests pass. Browser checks cover live HTML editing, CSS themes, JavaScript counters, session simulation, persistent DOM edits, AJAX input preservation, Wasm output, unavailable-GPU handling, navigation, dialogs, and reference links. The revised desktop layout and 390px/768px responsive frame views were inspected. New checks cover CERN cross-system navigation, 32-point Wasm smoothing, 64 illustrated tasks, contributor dialogs and left-rail navigation. The GPU success path requires compatible hardware and was not available in the validation browser. The September 2026 motion revision also checks proportional year spacing, reverse scrolling, motion-off styles, and 390px/768px layouts. See `design-qa.md` for the review notes.

## Render and search discovery

The primary address is **https://web-history.onrender.com/**, hosted as a Render **Static Site**. Use `npm run build` with the publish directory `dist/client`. GitHub Pages remains a mirror. Both builds declare the Render URL as canonical.

The build generates a readable initial HTML narrative from the same chapter data used by React. Visitors without JavaScript can read all 14 chapters and the authoritative source links; JavaScript enhances it into the animated experience. This is not crawler-specific content.

Search/share output includes a descriptive title and summary, canonical URL, `robots.txt`, a one-URL `sitemap.xml`, WebSite/WebPage JSON-LD, and Open Graph/Twitter metadata pointing to the 1200 × 630 `social-card.jpg`. The sitemap lists the actual homepage, not section fragments as pretend pages.

After deployment, verify the `https://web-history.onrender.com/` URL-prefix property in Google Search Console, submit `https://web-history.onrender.com/sitemap.xml`, and inspect the homepage. Ownership verification and indexing requests require the owner's account; these have not been submitted automatically. These changes improve crawlability and link previews, but do not guarantee indexing, rankings or traffic.
