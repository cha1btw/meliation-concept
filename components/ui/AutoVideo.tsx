"use client";

import { useEffect, useRef } from "react";
import type { VideoKey } from "@/content/types";
import { videos } from "@/lib/site";

/*
  A silent looping clip that plays only while it is on screen, so off-screen
  videos don't burn battery or data. Below the fold it loads nothing until it
  scrolls into view (preload="none" + poster).
*/
export function AutoVideo({
  video,
  alt,
  eager = false,
  className = "",
}: {
  video: VideoKey;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React does not put `muted` into the server HTML, and Safari only autoplays muted video.
    el.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { src, poster } = videos[video];
  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
        disablePictureInPicture
        aria-hidden="true"
        className={className}
      />
      <span className="sr-only">{alt}</span>
    </>
  );
}
