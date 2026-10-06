# Meliation: website concept

A redesign concept for [Meliation](https://instagram.com/meliation), a fabric sourcing and apparel production agent in Istanbul who works with Ukrainian fashion brands. Content, name and logo are used with the owner's permission. The site is marked `noindex` so it never competes with the official website in search.

## What's inside

- **Ribbon hero.** One screen: headline on the left, a 6-second ribbon clip on the right (on top on phones). The clip (H.264 MP4, 0.66 MB) plays once on load and rests on its cream last frame; if the browser blocks autoplay, the poster switches to that resting frame.
- **Scroll-driven reveals** for text and photos (pure CSS scroll-driven animation, no JavaScript).
- **Flip cards** for the work gallery, a **numbered service list** with native `<details>`, a **stitched process timeline**.
- **Closing section** repeats the hero split with the clip's resting frame, so the page ends where it opened.
- **Brief builder.** Four choices and an optional note turn into a ready WhatsApp message with a live preview.
- Ukrainian (`/`) and English (`/en`). One light "Rose & Plum" theme in Raleway: every colour comes from the hero clip (cream, dusty rose, plum ink). The whole palette lives in the `:root` block of `app/globals.css`.
- Full-screen menu on phones; on desktop the menu underlines the section you are in.
- Motion is CSS only and every animation rests in its final state under `prefers-reduced-motion` (the hero clip then shows its last frame instead of playing).

## Stack

Next.js 16 (App Router, static prerender), React 19, TypeScript, Tailwind CSS 4, Raleway, Phosphor icons. No animation libraries.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/(uk)/            Ukrainian root layout and page (lang="uk")
app/(en)/en/         English root layout and page (lang="en")
components/          Page sections; client components only where interaction needs them
content/uk.ts, en.ts All copy, typed by content/types.ts
lib/site.ts          Contacts, photo map, WhatsApp link helper
public/assets/       Hero clip and posters (hero/), logo, photos
```

## Editing content

All text lives in `content/uk.ts` and `content/en.ts`. Contacts are in `lib/site.ts`.

## Regenerating the hero clip

The source clip has a UI slider and black corners baked into its side edges; the crop removes them. Audio is dropped.

```bash
F="crop=764:1008:48:0,unsharp=5:5:0.4"
ffmpeg -i source.mov -an -vf "$F,format=yuv420p" -c:v libx264 -preset veryslow -crf 20 -profile:v high -movflags +faststart public/assets/hero/ribbon.mp4
ffmpeg -i source.mov -vf "$F" -frames:v 1 -q:v 3 public/assets/hero/ribbon-start.jpg
ffmpeg -sseof -0.05 -i source.mov -vf "$F" -update 1 -frames:v 1 -q:v 3 public/assets/hero/ribbon-end.jpg
# closing-section image: wider crop, so no edge artefacts show on the rose background
ffmpeg -i source.mov -vf "crop=716:1008:72:0,unsharp=5:5:0.4" -frames:v 1 -q:v 3 public/assets/hero/ribbon-cta.jpg
# link preview image (1200x630)
ffmpeg -i public/assets/hero/ribbon-end.jpg -vf "crop=764:401:0:282,scale=1200:630:flags=lanczos" -q:v 3 public/assets/og.jpg
```
