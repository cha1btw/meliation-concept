"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/types";
import logoDark from "@/public/assets/logo-dark.png";
import logoWhite from "@/public/assets/logo-white.png";

const NAV_HEIGHT = 68;

export function Nav({ nav }: { nav: Dict["nav"] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    const hero = document.getElementById("top");
    if (!header || !hero) return;
    let io: IntersectionObserver | null = null;
    // Root is the strip under the nav bar: the hero "is under the nav" while it intersects that strip.
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => header.setAttribute("data-over", entry.isIntersecting ? "true" : "false"),
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - NAV_HEIGHT)}px 0px` },
      );
      io.observe(hero);
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);

  const links = [
    { href: "#about", label: nav.about },
    { href: "#services", label: nav.services },
    { href: "#process", label: nav.process },
    { href: "#faq", label: nav.faq },
  ];

  return (
    <header
      ref={ref}
      data-over="true"
      className="group fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 data-[over=false]:border-line data-[over=false]:bg-paper/85 data-[over=false]:backdrop-blur-md"
    >
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      >
        {nav.skip}
      </a>
      <nav
        className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-4 px-5 text-ink group-data-[over=true]:text-white md:px-10 lg:px-14"
        aria-label="Main"
      >
        <a href="#top" aria-label={nav.home} className="relative block h-7 w-[81px] shrink-0">
          <Image
            src={logoWhite}
            alt=""
            priority
            className="absolute inset-0 h-7 w-auto opacity-100 transition-opacity duration-300 group-data-[over=false]:opacity-0 group-data-[over=false]:dark:opacity-100"
          />
          <Image
            src={logoDark}
            alt=""
            priority
            className="absolute inset-0 h-7 w-auto opacity-0 transition-opacity duration-300 group-data-[over=false]:opacity-100 group-data-[over=false]:dark:opacity-0"
          />
        </a>

        <ul className="hidden items-center gap-8 text-[0.95rem] lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href={nav.langHref}
            aria-label={nav.langAria}
            hrefLang={nav.langHref === "/" ? "uk" : "en"}
            className="grid h-11 min-w-11 place-items-center text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
          >
            {nav.langLabel}
          </Link>
          <a href="#brief" className="btn min-h-10 px-4 text-sm md:min-h-11 md:px-5">
            {nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
