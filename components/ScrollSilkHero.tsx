"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

/*
  Scroll-driven silk, drawn as an image sequence on <canvas> (the technique Apple
  uses): every scroll position maps to an exact frame, with no video seeking, so
  it stays smooth in every browser, including Safari on iPhone.
  Portrait screens use a 9:16 crop and every second frame to save memory.
  Runs for every visitor by the owner's choice (reduced motion included).
*/
const FRAME_COUNT = 160;
const SETS = {
  landscape: { dir: "/assets/silk/d", step: 1 },
  portrait: { dir: "/assets/silk/m", step: 2 },
};
const MAX_PARALLEL = 6;

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
const frameUrl = (dir: string, n: number) => `${dir}/${String(n).padStart(3, "0")}.webp`;

/** Coarse-to-fine order: 0, then every 8th slot, every 4th, every 2nd, then the rest. */
function loadOrder(slots: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const stride of [slots, 8, 4, 2, 1]) {
    for (let i = 0; i < slots; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(slots - 1)) order.splice(1, 0, slots - 1);
  return order;
}

/** Splits text into word and character spans; the threshold makes characters rise in reading order. */
function Chars({ text, spread = 0.45 }: { text: string; spread?: number }) {
  const words = text.split(" ");
  const total = text.replace(/\s/g, "").length || 1;
  let index = 0;
  return (
    <>
      <span className="sr-only-hero">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => {
              const th = (index++ / total) * spread;
              return (
                <span key={ci} className="c" style={{ "--th": th.toFixed(3) } as React.CSSProperties}>
                  {ch}
                </span>
              );
            })}
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

export function ScrollSilkHero({ hero }: { hero: Dict["hero"] }) {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const bandEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-band]"));
    const cache = bandEls.map(() => ({ op: -1, k: -1, live: false }));

    const set = window.matchMedia("(orientation: portrait)").matches ? SETS.portrait : SETS.landscape;
    const slots = Math.ceil(FRAME_COUNT / set.step);
    const images: (HTMLImageElement | null)[] = new Array(slots).fill(null);

    let heroTop = 0;
    let range = 1;
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let heroOnScreen = true;
    let loadK = 0;
    let loadRaf: number | null = null;
    let disposed = false;
    let drawn: HTMLImageElement | null = null;
    let ready = false;

    // ---- geometry (cached, re-measured on resize only) ----
    const measure = () => {
      heroTop = heroEl.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, heroEl.offsetHeight - window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawn = null; // a resized canvas is blank, force a redraw
      }
    };
    const heroProgress = () => clamp((window.scrollY - heroTop) / range, 0, 1);

    // ---- drawing: nearest loaded frame, cover-fit, only when it changes ----
    const nearestLoaded = (slot: number) => {
      for (let d = 0; d < slots; d++) {
        const a = images[slot - d];
        if (a) return a;
        const b = images[slot + d];
        if (b) return b;
      }
      return null;
    };
    const draw = () => {
      const slot = Math.round(shown * (slots - 1));
      const img = nearestLoaded(slot);
      if (!img || img === drawn) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = img;
      if (!ready) {
        ready = true;
        stage.classList.add("canvas-ready");
      }
    };

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

    // ---- smoothed progress, frame-rate independent, rests when converged ----
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.14, dt / 16.667));
      if (Math.abs(target - shown) < 0.0004) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      draw();
      updateCaptions(shown);
    };
    const wake = () => {
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    };

    // Passive listener that only stores a number and wakes the loop; no React state, no layout reads.
    const onScroll = () => {
      target = heroProgress();
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      heroOnScreen = entry.isIntersecting;
      if (heroOnScreen) onScroll();
    });
    io.observe(heroEl);

    const onResize = () => {
      measure();
      draw();
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

    // ---- frame loading: coarse-to-fine with a small parallel pool ----
    const queue = loadOrder(slots);
    const loadSlot = (slot: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = frameUrl(set.dir, slot * set.step);
        img
          .decode()
          .then(() => {
            if (disposed) return;
            images[slot] = img;
            // draw() switches only if this frame is now the closest one to the scroll position.
            if (heroOnScreen) draw();
          })
          .catch(() => {})
          .finally(() => resolve());
      });
    const worker = async () => {
      while (!disposed && queue.length) {
        await loadSlot(queue.shift()!);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    target = shown = heroProgress();
    updateCaptions(shown);
    runLoadRamp();
    // The first frame alone, then the pool, so the first paint never waits on the rest.
    void loadSlot(queue.shift()!).then(() => {
      for (let i = 0; i < MAX_PARALLEL; i++) void worker();
    });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (loadRaf !== null) cancelAnimationFrame(loadRaf);
    };
  }, []);

  const pad = "mx-auto w-full max-w-[1400px] px-5 pb-[12vh] md:px-10 lg:px-14";

  return (
    <section ref={heroRef} id="top" className="hero" aria-label={hero.settle.title}>
      <div ref={stageRef} className="hero-stage">
        <div className="hero-poster" aria-hidden="true" />
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />

        {hero.bands.map((band, i) => (
          <div key={band.title} className="band" data-band={i}>
            <div className={`band-inner ${pad}`}>
              <p className="font-display text-[clamp(3rem,13vw,10rem)] font-light leading-[0.95] tracking-[-0.02em]">
                <Chars text={band.title} />
              </p>
              <p className="fade-k mt-5 max-w-[34ch] text-lg leading-relaxed text-ink/80 md:text-xl">{band.text}</p>
            </div>
          </div>
        ))}

        <div className="band band-settle" data-band={hero.bands.length}>
          <div className={`band-inner ${pad}`}>
            <h1 className="max-w-[14ch] font-display text-[clamp(2.4rem,5.6vw,5.2rem)] font-light leading-[1.02] tracking-[-0.015em] text-balance">
              <Chars text={hero.settle.title} spread={0.35} />
            </h1>
            <p className="fade-k mt-6 max-w-[42ch] text-lg leading-relaxed text-ink/80 md:text-xl">{hero.settle.sub}</p>
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
