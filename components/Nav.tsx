"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import logo from "@/public/assets/logo.png";

/*
  Desktop: a magazine masthead in the page flow (section links between hairlines,
  then the centred wordmark), and a slim bar that slides in once the masthead
  has scrolled away. Phones: one sticky row (menu, wordmark, language) and a
  full-screen menu.
*/
export function Nav({ nav }: { nav: Dict["nav"] }) {
  const mastRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // The slim bar shows while the desktop masthead is out of view.
  useEffect(() => {
    const mast = mastRef.current;
    if (!mast) return;
    const io = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    io.observe(mast);
    return () => io.disconnect();
  }, []);

  // Marks the link of the section crossing the middle of the screen.
  useEffect(() => {
    const els = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nav.links]);

  // Mobile menu: lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const sectionLinks = (
    <ul className="flex items-center">
      {nav.links.map((l, i) => (
        <li key={l.href} className="flex items-center">
          {i > 0 ? <span aria-hidden="true" className="mx-3 h-3 w-px bg-line xl:mx-6" /> : null}
          <a href={l.href} className="kicker u-link whitespace-nowrap lg:tracking-[0.14em] xl:tracking-[0.24em]" aria-current={active === l.href.slice(1) ? "true" : undefined}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const langLink = (
    <Link
      href={nav.langHref}
      aria-label={nav.langAria}
      hrefLang={nav.langHref === "/" ? "uk" : "en"}
      className="kicker u-link"
    >
      {nav.langLabel}
    </Link>
  );

  const ctaLink = (
    <a href="#brief" className="kicker u-link inline-flex items-center gap-2 whitespace-nowrap lg:tracking-[0.14em] xl:tracking-[0.24em]">
      {nav.cta}
      <ArrowRight size={13} aria-hidden="true" />
    </a>
  );

  return (
    <>
      <a
        href="#editorial"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      >
        {nav.skip}
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-paper lg:static">
        {/* Desktop masthead */}
        <div ref={mastRef} className="hidden lg:block">
          <div className="wrap grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>{langLink}</div>
            <nav aria-label="Main">{sectionLinks}</nav>
            <div className="justify-self-end">{ctaLink}</div>
          </div>
          <a href="#top" aria-label={nav.home} className="flex flex-col items-center border-t border-line py-7">
            <Image src={logo} alt="" preload className="h-[30px] w-auto" />
            <span className="kicker mt-3 text-[0.62rem] tracking-[0.46em]">{nav.tagline}</span>
          </a>
        </div>

        {/* Phone row */}
        <div className="wrap grid h-14 grid-cols-[3rem_1fr_3rem] items-center lg:hidden">
          <button
            type="button"
            className="-ml-3 grid h-11 w-11 place-items-center"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
          <a href="#top" aria-label={nav.home} onClick={close} className="flex flex-col items-center justify-self-center">
            <Image src={logo} alt="" className="h-[13px] w-auto" />
            <span className="kicker mt-1.5 text-[0.5rem] tracking-[0.36em]">{nav.tagline}</span>
          </a>
          <div className="grid h-11 min-w-11 place-items-center justify-self-end">{langLink}</div>
        </div>
      </header>

      {/* Desktop slim bar, shown after the masthead scrolls away. */}
      <div
        className={`fixed inset-x-0 top-0 z-50 hidden border-b border-line bg-paper/95 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:block ${
          compact ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!compact}
        inert={!compact}
      >
        <div className="wrap grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-6">
          <a href="#top" aria-label={nav.home} className="hidden justify-self-start xl:block">
            <Image src={logo} alt="" className="h-[13px] w-auto max-w-none" />
          </a>
          <nav aria-label="Main, compact" className="col-start-2">{sectionLinks}</nav>
          <div className="col-start-3 flex items-center gap-6 justify-self-end">
            <span className="hidden xl:inline">{langLink}</span>
            {ctaLink}
          </div>
        </div>
      </div>

      {/*
        Full-screen phone menu. It sits under the sticky row (z-40), so the logo
        and close button stay on top.
      */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-24 md:px-10">
          <ul className="border-t border-line">
            {nav.links.map((l, i) => (
              <li
                key={l.href}
                className="border-b border-line transition-[opacity,transform] duration-500"
                style={{
                  transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <a href={l.href} onClick={close} className="flex items-baseline justify-between py-4">
                  <span className="font-serif text-[1.9rem] leading-tight">{l.label}</span>
                  <span className="kicker text-muted">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <a href="#brief" onClick={close} className="btn w-full">
              {nav.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
