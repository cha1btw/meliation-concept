"use client";

import { useEffect, useRef, useState } from "react";

const MAX_WIDTH = 1400;
const GUTTER_CENTER = 28; // px from the container edge, inside the lg side padding
const AMPLITUDE = 14;
const PERIOD = 760; // vertical px per full wave

/**
 * A single crimson thread running down the left gutter (desktop only).
 * The path is built in real pixels, so pathLength="1" dashing stays exact;
 * drawing is driven purely by CSS (see .thread-path in globals.css).
 */
export function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string } | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const build = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      const x = Math.max(0, (w - MAX_WIDTH) / 2) + GUTTER_CENTER;
      let d = `M ${x} 0`;
      const half = PERIOD / 2;
      for (let y = 0, dir = 1; y < h; y += half, dir *= -1) {
        const y1 = Math.min(h, y + half);
        const cx = x + AMPLITUDE * dir;
        d += ` C ${cx} ${y + half * 0.33}, ${cx} ${y + half * 0.66}, ${x} ${y1}`;
      }
      setGeo((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h, d }));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      preserveAspectRatio="none"
    >
      {geo ? (
        <path
          className="thread-path"
          d={geo.d}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}
