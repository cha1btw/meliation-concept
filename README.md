# Meliation: website concept

A redesign concept for [Meliation](https://instagram.com/meliation), a fabric sourcing and apparel production agent in Istanbul who works with Ukrainian fashion brands. Content, name and logo are used with the owner's permission. The site is marked `noindex` so it never competes with the official website in search.

## What's inside

- **Scroll-scrubbed video hero.** A silk clip plays forward and backward with the scroll; three captions (fabrics, factories, collection) hand over to the main headline. Phones, portrait tablets and reduced-motion visitors get a static poster and never download the video.
- **Scroll-drawn thread.** A single crimson line runs down the page and draws itself as you scroll (pure CSS scroll-driven animation, no JavaScript).
- **Flip cards** for the work gallery, **hang-tag service cards** with native `<details>`, a **stitched process timeline**.
- **Brief builder.** Four choices and an optional note turn into a ready WhatsApp message with a live preview.
- Ukrainian (`/`) and English (`/en`), light and dark themes following the system setting.

## Stack

Next.js 16 (App Router, static prerender), React 19, TypeScript, Tailwind CSS 4, Phosphor icons. No animation libraries.

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
public/assets/       Hero video (scrub-encoded), posters, logo, photos
```

## Editing content

All text lives in `content/uk.ts` and `content/en.ts`. Contacts are in `lib/site.ts`.

## Re-encoding the hero video

The video must have a keyframe every 8 frames, otherwise scrubbing stutters:

```bash
ffmpeg -i raw.mp4 -c:v libx264 -crf 22 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an public/assets/hero-scrub.mp4
ffmpeg -i public/assets/hero-scrub.mp4 -frames:v 1 -q:v 3 public/assets/hero-poster.jpg
ffmpeg -sseof -0.1 -i public/assets/hero-scrub.mp4 -update 1 -frames:v 1 -q:v 3 public/assets/hero-ending.jpg
```

Hero footage: [Pexels video 7677156](https://www.pexels.com/video/a-red-silk-fabric-7677156/) (Pexels license).
