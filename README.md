# Meliation: website concept

A redesign concept for [Meliation](https://instagram.com/meliation), a fabric sourcing and apparel production agent in Istanbul who works with Ukrainian fashion brands. Content, name and logo are used with the owner's permission. The site is marked `noindex` so it never competes with the official website in search.

## What's inside

- **Scroll-scrubbed video hero.** A champagne-graded silk clip plays forward and backward with the scroll; three captions (fabrics, factories, collection) hand over to the main headline. Runs on every device: portrait screens load a lighter 9:16 crop (2.2 MB vs 5.8 MB). By the owner's choice the animation also runs for visitors with reduced motion enabled; the video only moves when the visitor scrolls, it never autoplays.
- **Scroll-driven reveals** for text and photos (pure CSS scroll-driven animation, no JavaScript).
- **Flip cards** for the work gallery, **hang-tag service cards** with native `<details>`, a **stitched process timeline**.
- **Brief builder.** Four choices and an optional note turn into a ready WhatsApp message with a live preview.
- Ukrainian (`/`) and English (`/en`). One dark "Noir & Champagne" theme; the whole palette lives in the `:root` block of `app/globals.css`.

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

The video must have a keyframe every 8 frames, otherwise scrubbing stutters. The grade takes luminance from the red channel of the source silk and tints it champagne:

```bash
G="colorchannelmixer=rr=1:rg=0:rb=0:gr=1:gg=0:gb=0:br=1:bg=0:bb=0,curves=all='0/0 0.32/0.06 0.6/0.34 0.85/0.7 1/0.9',colorchannelmixer=rr=1.0:gg=0.86:bb=0.66"
ffmpeg -i raw.mp4 -vf "$G" -c:v libx264 -crf 22 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an public/assets/hero-scrub.mp4
ffmpeg -i raw.mp4 -vf "$G,crop=608:1080,scale=720:1280:flags=lanczos" -c:v libx264 -crf 24 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an public/assets/hero-scrub-portrait.mp4
ffmpeg -i public/assets/hero-scrub.mp4 -frames:v 1 -q:v 3 public/assets/hero-poster.jpg
ffmpeg -i public/assets/hero-scrub-portrait.mp4 -frames:v 1 -q:v 4 public/assets/hero-poster-mobile.jpg
ffmpeg -sseof -0.1 -i public/assets/hero-scrub.mp4 -update 1 -frames:v 1 -q:v 3 public/assets/hero-ending.jpg
```

Hero footage: [Pexels video 7677156](https://www.pexels.com/video/a-red-silk-fabric-7677156/) (Pexels license).
