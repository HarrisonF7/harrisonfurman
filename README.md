# Courtside

A Knicks-inspired personal website built with React, TypeScript, Vite, and React Three Fiber.

Website: [Harrison Furman — Courtside](https://harrisonf7.github.io/harrisonfurman/)

Repository: [HarrisonF7/harrisonfurman](https://github.com/HarrisonF7/harrisonfurman)

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For production:

```sh
npm run build
npm run preview
```

## GitHub Pages deployment

The site publishes from the **`main` branch, `/docs` folder**. Vite builds the production site into `docs/` with the `/harrisonfurman/` URL prefix. The generated `.nojekyll` file bypasses Jekyll processing.

In the repository’s **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/docs**, then save. This is a one-time setup.

After editing the site, run `npm run build`, commit the source changes and the updated `docs/` folder, and push to `main`. GitHub Pages then publishes that build. Do not edit `docs/` directly; it is generated from `src/` and `public/`.

Preview the production build with `npm run preview` and open the printed URL under `/harrisonfurman/`. No secrets or backend are needed.

## Make it yours

Edit `src/content.ts` to update the name, homepage introduction, biography, hobbies, and Knicks memories. Add an image URL to `portrait` to show a portrait. Add `{ label, href }` entries to `links` for social links; only HTTP(S) destinations are shown. Empty optional fields stay hidden.

Colors, typography, and responsive layouts live in `src/styles.css`. Google Fonts load progressively; system fonts remain available if offline. The basketball texture and seams are generated locally without image or model downloads.

## Interaction and accessibility

- Drag the basketball horizontally to rotate it. Vertical touch gestures remain available for scrolling. Zoom and pan are disabled.
- Pause or resume automatic rotation using the button below the ball.
- Reduced-motion preferences disable automatic rotation, reveals, and smooth scrolling.
- Rendering stops while the scene is offscreen or the document is hidden.
- WebGL failure displays a static SVG basketball instead.
- The mobile navigation supports Escape to close and return focus to the menu button.

## Validation

`npm run check` checks TypeScript. `npm run build` checks TypeScript and creates the production bundle. Manually check mobile and desktop layouts, navigation, dragging, pause/resume, touch scrolling, reduced motion, and the WebGL fallback before publishing.

This is an unofficial personal fan site, with no NBA or New York Knicks affiliation.
