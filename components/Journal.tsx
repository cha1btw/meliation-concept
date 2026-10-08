"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/*
  Reviews styled as magazine interviews: a campaign-style photo on the left,
  the quote on the right. All slides share one grid cell, so the block keeps
  the height of the longest quote and nothing jumps when slides change.
  Arrows, keyboard focus and a horizontal swipe on phones.
*/
export function Journal({ journal }: { journal: Dict["journal"] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = journal.reviews.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="journal" className="sect border-t border-line" aria-labelledby="journal-title">
      <div className="wrap">
        <Kicker className="reveal">{journal.kicker}</Kicker>
        <h2 id="journal-title" className="reveal t-display mt-7">
          {journal.title}
        </h2>

        {journal.brands.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
            {journal.brands.map((b) => (
              <li
                key={b}
                className="grid min-h-28 place-items-center border-b border-r border-line px-4 text-center font-serif text-xl uppercase tracking-[0.12em] text-ink/80"
              >
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="kicker mt-14 text-muted lg:mt-20">{journal.subtitle}</h3>

        <div
          className="mt-8 grid touch-pan-y items-center gap-10 lg:grid-cols-12 lg:gap-x-10"
          onPointerCancel={() => {
            startX.current = null;
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") startX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="grid lg:col-span-5">
            {journal.reviews.map((r, i) => (
              <div
                key={r.name}
                aria-hidden={i !== index}
                className={`relative aspect-[4/5] overflow-hidden bg-bone transition-opacity duration-700 [grid-area:1/1] ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={photos[r.photo]}
                  alt={r.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid" aria-live="polite">
              {journal.reviews.map((r, i) => (
                <figure
                  key={r.name}
                  aria-hidden={i !== index}
                  inert={i !== index}
                  className={`[grid-area:1/1] ${i === index ? "slide-in visible" : "invisible"}`}
                >
                  <p className="kicker text-muted">{r.focus}</p>
                  <blockquote className="mt-6 font-serif text-[clamp(1.3rem,1.9vw,1.75rem)] leading-[1.45] text-pretty">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-[1.5rem] italic">{r.name}</span>
                    <span className="kicker text-muted">{r.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
              <p className="kicker tabular-nums">
                {pad(index + 1)} <span className="text-muted">/ {pad(count)}</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={journal.prev}
                  className="grid h-12 w-12 place-items-center border border-ink transition-colors hover:bg-ink hover:text-on-ink"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={journal.next}
                  className="grid h-12 w-12 place-items-center border border-ink transition-colors hover:bg-ink hover:text-on-ink"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
