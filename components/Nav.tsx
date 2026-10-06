"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import logo from "@/public/assets/logo.png";

const NAV_HEIGHT = 68;

export function Nav({ nav }: { nav: Dict["nav"] }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Header is transparent while the hero is under it, solid afterwards.
  useEffect(() => {
    const header = ref.current;
    const hero = document.getElementById("top");
    if (!header || !hero) return;
    let io: IntersectionObserver | null = null;
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

  // Marks the menu link of the section that is crossing the middle of the screen.
  // State changes only when the section changes, not on every scroll frame.
  useEffect(() => {
    const ids = ["about", "services", "process", "faq"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
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
  }, []);

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

  const links = [
    { href: "#about", label: nav.about },
    { href: "#services", label: nav.services },
    { href: "#process", label: nav.process },
    { href: "#faq", label: nav.faq },
  ];
  const close = () => setOpen(false);

  return (
    <>
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
        className="relative z-10 mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-4 px-5 text-ink md:px-10 lg:px-14"
        aria-label="Main"
      >
        <a href="#top" aria-label={nav.home} className="block shrink-0" onClick={close}>
          <Image src={logo} alt="" priority className="h-[18px] w-auto md:h-5" />
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" aria-current={active === l.href.slice(1) ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 md:gap-4">
          <Link
            href={nav.langHref}
            aria-label={nav.langAria}
            hrefLang={nav.langHref === "/" ? "uk" : "en"}
            className="nav-link grid h-11 min-w-11 place-items-center"
          >
            {nav.langLabel}
          </Link>
          <a href="#brief" className="btn hidden min-h-11 px-6 text-[0.72rem] lg:inline-flex">
            {nav.cta}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

      {/*
        Full-screen mobile menu. It lives outside <header> on purpose: the header's
        backdrop-filter would turn it into the containing block and clip a fixed child.
        z-40 keeps it under the header, so the logo and close button stay on top.
      */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-[100px] md:px-10">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li
                key={l.href}
                className="transition-[opacity,transform] duration-500"
                style={{
                  transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                }}
              >
                <a href={l.href} onClick={close} className="block py-3 font-display text-[2.4rem] font-light leading-tight">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <a href="#brief" onClick={close} className="btn w-full">
              {nav.cta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
