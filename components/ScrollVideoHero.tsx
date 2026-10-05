"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

/*
  The scrub runs on every device by request (including reduced-motion visitors).
  Portrait screens get a lighter 9:16 crop: 2.2 MB instead of 5.8 MB.
  The file is chosen once on load; object-fit: cover handles later rotation.
*/
const SOURCES = {
  landscape: { video: "/assets/hero-scrub.mp4", poster: "/assets/hero-poster.jpg" },
  portrait: { video: "/assets/hero-scrub-portrait.mp4", poster: "/assets/hero-poster-mobile.jpg" },
};

// Scroll progress band of each caption: [start, end] in 0..1 of the pinned hero.
const BANDS: [number, number][] = [
  [0, 0.24],
  [0.26, 0.5],
  [0.52, 0.74],
  [0.76, 1],
];
// Hero is 600vh, so the scroll range is 500vh and 0.01 of progress is 5vh.
const EDGE = 0.04; // opacity ramp, about 20vh
const K_RAMP = 0.04; // text assembly settles about 20vh into a band

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smoothstep = (p: number, e0: number, e1: number) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Splits text into word and character spans; the threshold makes characters rise in reading order. */
function Chars({ text, spread = 0.45 }: { text: string; spread?: number }) {
  const total = text.replace(/\s/g, "").length || 1;
  let index = 0;
  return (
    <>
      <span className="sr-only-hero">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => {
              const th = (index++ / total) * spread;
              return (
                <span key={ci} className="c" style={{ "--th": th.toFixed(3) } as React.CSSProperties}>
                  {ch}
                </span>
              );
            })}
            {wi < text.split(" ").length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

export function ScrollVideoHero({ hero }: { hero: Dict["hero"] }) {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current!;
    const stage = stageRef.current!;
    const video = videoRef.current!;
    const poster = posterRef.current!;
    const bandEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-band]"));
    const cache = bandEls.map(() => ({ op: -1, k: -1, live: false }));

    let heroTop = 0;
    let range = 1;
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let heroOnScreen = true;
    let objectUrl: string | null = null;
    let loadK = 0;
    let loadRaf: number | null = null;
    const abort = new AbortController();
    let disposed = false;

    // ---- geometry (cached, re-measured on resize only) ----
    const measure = () => {
      heroTop = heroEl.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, heroEl.offsetHeight - window.innerHeight);
    };
    const heroProgress = () => clamp((window.scrollY - heroTop) / range, 0, 1);

    // ---- gated seeks: never write currentTime while a seek is in flight ----
    let seekBusy = false;
    let pendingTime: number | null = null;
    const requestSeek = (t: number) => {
      if (!video.duration) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };
    const onVideoError = () => {
      seekBusy = false;
      pendingTime = null;
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onVideoError);

    // ---- captions: delta-gated DOM writes ----
    const updateCaptions = (p: number) => {
      BANDS.forEach(([a, b], i) => {
        const first = i === 0;
        const last = i === BANDS.length - 1;
        const fadeIn = first ? 1 : smoothstep(p, a, a + EDGE);
        const fadeOut = last ? 0 : smoothstep(p, b - EDGE, b);
        const op = Math.round(fadeIn * (1 - fadeOut) * 1000) / 1000;
        let k = clamp((p - a) / K_RAMP, 0, 1);
        if (first) k = Math.max(k, loadK);
        const el = bandEls[i];
        const c = cache[i];
        if (Math.abs(op - c.op) > 0.001) {
          c.op = op;
          el.style.opacity = String(op);
        }
        if (Math.abs(k - c.k) > 0.008 || (k === 1 && c.k !== 1) || (k === 0 && c.k !== 0)) {
          c.k = k;
          el.style.setProperty("--k", k.toFixed(3));
        }
        const live = op > 0.5;
        if (live !== c.live) {
          c.live = live;
          el.classList.toggle("is-live", live);
        }
      });
    };

    // ---- smoothed time, frame-rate independent, rests when converged ----
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const kSmooth = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - kSmooth, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      requestSeek(shown * video.duration);
      updateCaptions(shown);
    };

    // Passive listener that only stores a number and wakes the loop; no React state, no layout reads.
    const onScroll = () => {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      heroOnScreen = entry.isIntersecting;
      if (heroOnScreen) onScroll();
    });
    io.observe(heroEl);

    const onResize = () => {
      measure();
      onScroll();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(heroEl);
    window.addEventListener("resize", onResize);

    // ---- first band assembles on load, then scroll takes over ----
    const runLoadRamp = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = clamp((now - start) / 1400, 0, 1);
        loadK = 1 - Math.pow(1 - t, 3);
        updateCaptions(shown);
        loadRaf = t < 1 ? requestAnimationFrame(step) : null;
      };
      loadRaf = requestAnimationFrame(step);
    };

    // ---- the video: poster first, then the whole file as a Blob (works on hosts without Range) ----
    const src = window.matchMedia("(orientation: portrait)").matches ? SOURCES.portrait : SOURCES.landscape;
    const failVideo = () => stage.classList.add("video-failed");
    const loadVideo = async () => {
      const watchdog = setTimeout(() => abort.abort(), 20000);
      try {
        const res = await fetch(src.video, { signal: abort.signal, priority: "low" } as RequestInit);
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        clearTimeout(watchdog);
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
        video.addEventListener(
          "canplay",
          () => {
            // iOS Safari only paints seeked frames after the element has played once.
            video
              .play()
              .then(() => video.pause())
              .catch(() => {})
              .finally(() => {
                requestSeek(heroProgress() * video.duration);
                stage.classList.add("video-ready");
              });
          },
          { once: true },
        );
      } catch {
        clearTimeout(watchdog);
        // An abort from unmount is not a failure; an abort from the watchdog is.
        if (!disposed) failVideo();
      }
    };

    // Poster first, then the video, so the first paint never waits on 6 MB.
    poster.style.backgroundImage = `url('${src.poster}')`;
    let started = false;
    const start = () => {
      if (started || disposed) return;
      started = true;
      void loadVideo();
    };
    const img = new Image();
    img.onload = start;
    img.onerror = start;
    img.src = src.poster;
    const startTimer = setTimeout(start, 4000);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    target = shown = heroProgress();
    updateCaptions(shown);
    runLoadRamp();

    return () => {
      disposed = true;
      clearTimeout(startTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onVideoError);
      io.disconnect();
      ro.disconnect();
      abort.abort();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (loadRaf !== null) cancelAnimationFrame(loadRaf);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const pad = "mx-auto w-full max-w-[1400px] px-5 pb-[12vh] md:px-10 lg:px-14";

  return (
    <section ref={heroRef} id="top" className="hero" aria-label={hero.settle.title}>
      <div ref={stageRef} className="hero-stage">
        <div ref={posterRef} className="hero-poster" aria-hidden="true" />
        <video
          ref={videoRef}
          className="hero-video"
          preload="none"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-scrim" aria-hidden="true" />

        {hero.bands.map((band, i) => (
          <div key={band.title} className="band" data-band={i}>
            <div className={`band-inner ${pad}`}>
              <p className="font-display text-[clamp(3.4rem,17vw,13rem)] font-medium leading-[0.95] tracking-[-0.02em]">
                <Chars text={band.title} />
              </p>
              <p className="fade-k mt-5 max-w-[34ch] text-lg leading-relaxed text-ink/85 md:text-xl">{band.text}</p>
            </div>
          </div>
        ))}

        <div className="band band-settle" data-band={hero.bands.length}>
          <div className={`band-inner ${pad}`}>
            <h1 className="max-w-[14ch] font-display text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[1] tracking-[-0.015em] text-balance">
              <Chars text={hero.settle.title} spread={0.35} />
            </h1>
            <p className="fade-k mt-6 max-w-[42ch] text-lg leading-relaxed text-ink/85 md:text-xl">{hero.settle.sub}</p>
            <div className="fade-k mt-9">
              <a href="#brief" className="btn">
                {hero.settle.cta}
                <ArrowRight size={18} weight="regular" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
