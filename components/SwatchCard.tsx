"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";

type Item = Dict["works"]["items"][number];

export function SwatchCard({ item, hint }: { item: Item; hint: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <figure className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[380px]">
      <button
        type="button"
        className="flip block w-full text-left"
        data-flipped={flipped}
        aria-pressed={flipped}
        aria-label={`${item.caption}. ${hint}`}
        onClick={() => setFlipped((v) => !v)}
      >
        <div className="flip-inner aspect-[4/5]">
          <div className="flip-face absolute inset-0 overflow-hidden bg-paper-2">
            <Image
              src={photos[item.photo]}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 78vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flip-face flip-back flex flex-col justify-end bg-accent-strong p-7 text-on-accent">
            <p className="font-display text-2xl font-normal leading-tight">{item.backTitle}</p>
            <ul className="mt-6 space-y-3 border-t border-on-accent/20 pt-6 text-[0.98rem] leading-snug text-on-accent/80">
              {item.backLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>
      <figcaption className="mt-4 text-[0.95rem] text-muted">{item.caption}</figcaption>
    </figure>
  );
}
