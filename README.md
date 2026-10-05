# Meliation: website concept

A redesign concept for [Meliation](https://instagram.com/meliation), a fabric sourcing and apparel production agent in Istanbul who works with Ukrainian fashion brands. Content, name and logo are used with the owner's permission. The site is marked `noindex` so it never competes with the official website in search.

## What's inside

- **Scroll-driven silk hero.** A milky silk clip, drawn as a 160-frame WebP sequence on `<canvas>` (3.9 MB), plays forward and backward with the scroll; three captions (fabrics, factories, collection) hand over to the main headline. Frames load coarse-to-fine, so scrubbing works before everything has arrived. Portrait screens get a 9:16 crop with every second frame (80 frames, 0.8 MB). By the owner's choice the animation also runs for visitors with reduced motion enabled; it only moves when the visitor scrolls.
- **Scroll-driven reveals** for text and photos (pure CSS scroll-driven animation, no JavaScript).
- **Flip cards** for the work gallery, **hang-tag service cards** with native `<details>`, a **stitched process timeline**.
- **Brief builder.** Four choices and an optional note turn into a ready WhatsApp message with a live preview.
- Ukrainian (`/`) and English (`/en`). One light "Milk & Ink" theme in Raleway; the whole palette lives in the `:root` block of `app/globals.css`.
- Full-screen menu on phones.

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
public/assets/       Silk frame sequences (silk/d desktop, silk/m phones), logo, photos
```

## Editing content

All text lives in `content/uk.ts` and `content/en.ts`. Contacts are in `lib/site.ts`.

## Regenerating the silk frames

The grade takes luminance from the red channel of the source silk and maps it to milky cream:

```bash
G="colorchannelmixer=rr=1:rg=0:rb=0:gr=1:gg=0:gb=0:br=1:bg=0:bb=0,curves=all='0/0.42 0.35/0.66 0.7/0.88 1/0.99',colorchannelmixer=rr=1:gg=0.965:bb=0.9,colorbalance=rs=0.035:gs=0.012:bs=-0.035,unsharp=5:5:0.35"
ffmpeg -i raw.mp4 -vf "$G,scale=1920:-2:flags=lanczos" -c:v libwebp -quality 78 -compression_level 6 -start_number 0 public/assets/silk/d/%03d.webp
ffmpeg -i raw.mp4 -vf "$G,crop=608:1080,scale=720:1280:flags=lanczos" -c:v libwebp -quality 72 -compression_level 6 -start_number 0 public/assets/silk/m/%03d.webp
ffmpeg -sseof -0.1 -i raw.mp4 -update 1 -frames:v 1 -vf "$G" -q:v 3 public/assets/hero-ending.jpg
# phones only ever load even frames; drop the odd ones
for f in public/assets/silk/m/*.webp; do n=$(basename $f .webp); [ $((10#$n % 2)) -eq 1 ] && rm $f; done
```

If the frame count changes, update `FRAME_COUNT` in `components/ScrollSilkHero.tsx`.

Hero footage: [Pexels video 7677156](https://www.pexels.com/video/a-red-silk-fabric-7677156/) (Pexels license).
