"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

const VIDEO = "/assets/hero/ribbon.mp4";
const POSTER_START = "/assets/hero/ribbon-start.jpg";
const POSTER_END = "/assets/hero/ribbon-end.jpg";

/*
  One-screen hero: headline on the left, a ribbon clip on the right (on top on phones).
  The clip plays once on load and rests on its last frame, a cream backdrop that
  matches the page. If the browser refuses autoplay (iOS Low Power Mode, data saver),
  the poster switches to that resting frame instead of the first one.
*/
export function HeroRibbon({ hero }: { hero: Dict["hero"] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not put `muted` into the server HTML, and Safari only autoplays muted video.
    video.muted = true;
    video.play().catch(() => {
      video.poster = POSTER_END;
    });
  }, []);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video ref={videoRef} src={VIDEO} poster={POSTER_START} muted playsInline preload="auto" disablePictureInPicture />
      </div>

      <div className="hero-copy">
        <h1
          id="hero-title"
          className="hero-in max-w-[13ch] font-display text-[clamp(2.5rem,5.4vw,5.4rem)] font-light leading-[1.02] tracking-[-0.015em] text-balance"
        >
          {hero.title}
        </h1>
        <p className="hero-in mt-6 max-w-[38ch] text-lg leading-relaxed text-ink/75 md:mt-8 md:text-xl" style={{ animationDelay: "0.15s" }}>
          {hero.sub}
        </p>
        <div className="hero-in mt-9 md:mt-11" style={{ animationDelay: "0.3s" }}>
          <a href="#brief" className="btn">
            {hero.cta}
            <ArrowRight size={18} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
