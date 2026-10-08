# Meliation: website concept

A redesign concept for [Meliation](https://instagram.com/meliation), a fabric sourcing and apparel production agent in Istanbul who works with Ukrainian fashion brands. Content, name and logo are used with the owner's permission. The site is marked `noindex` so it never competes with the official website in search.

## What's inside

- **Editorial Ink design** in the spirit of NET-A-PORTER / PORTER magazine: white page, black type, 1px hairlines, Noto Serif Display (a Didone) for headlines and Manrope for UI and body. The palette lives in the `:root` block of `app/globals.css`.
- **M monogram.** A large serif M with the wordmark running down beside it sits over the top edge of the hero clip and the closing photo, like PORTER's P (`components/ui/Monogram.tsx`, `.monogram` in CSS).
- **Masthead** with section links and the centred wordmark; a slim bar slides in once it scrolls away. Full-screen menu on phones.
- **Sections:** hero (clip of Melissa in the showroom), founder's letter (portrait, pull quote, two text columns with a drop cap), industry challenges (black hairline grid), the Istanbul advantage (media and text swap sides), lab services (native `<details>`), the method with a photo strip, client reviews slider, brief builder, FAQ, closing spread.
- **Brief builder.** Four choices and an optional note turn into a ready WhatsApp message with a live preview.
- **Reviews.** The partner-logo row stays hidden while `journal.brands` is empty; add brand names there to show it.
- Videos play only while on screen; clips below the fold load nothing until they scroll into view.
- Ukrainian (`/`) and English (`/en`).
- Motion is CSS only (plus the clips). By the owner's choice it also runs for visitors with reduced motion enabled; everything is short, plays once and only moves on load or scroll.

## Stack

Next.js 16 (App Router, static prerender), React 19, TypeScript, Tailwind CSS 4, Noto Serif Display + Manrope, Phosphor icons. No animation libraries.

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
lib/site.ts          Contacts, photo and video maps, WhatsApp link helper
public/assets/       editorial/ photos (WebP), video/ clips and posters, logo
```

## Editing content

All text lives in `content/uk.ts` and `content/en.ts`. Contacts are in `lib/site.ts`.

## Regenerating media

Photos are WebP at quality 80; clips are vertical 720x1280 H.264 without audio.

```bash
cwebp -q 80 -mt source.jpg -o public/assets/editorial/name.webp
ffmpeg -i source.mov -an -vf "scale=720:1280:flags=lanczos,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 25 -profile:v high -movflags +faststart public/assets/video/name.mp4
ffmpeg -i source.mov -vf "scale=720:1280:flags=lanczos" -frames:v 1 -q:v 4 public/assets/video/name.jpg
```
