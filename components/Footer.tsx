import Image from "next/image";
import type { Dict } from "@/content/types";
import { contacts } from "@/lib/site";
import logoWhite from "@/public/assets/logo-white.png";

export function Footer({ footer, nav }: { footer: Dict["footer"]; nav: Dict["nav"] }) {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="wrap py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Image src={logoWhite} alt="Meliation" className="h-6 w-auto" />
            <p className="kicker mt-3 text-[0.62rem] tracking-[0.46em] text-white/60">{nav.tagline}</p>
            <p className="mt-8 max-w-[34ch] font-light leading-relaxed text-white/70">{footer.about}</p>
          </div>

          <nav aria-label={footer.labTitle} className="lg:col-span-2 lg:col-start-5">
            <p className="kicker text-white/50">{footer.labTitle}</p>
            <ul className="mt-5 space-y-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="kicker u-link inline-flex min-h-10 items-center">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="kicker text-white/50">{footer.contactTitle}</p>
            <ul className="mt-5 space-y-1 font-light">
              <li>
                <a href={`tel:${contacts.phone}`} className="u-link inline-flex min-h-10 items-center">
                  <span className="sr-only">{footer.phoneLabel}: </span>
                  {contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="u-link inline-flex min-h-10 items-center">
                  <span className="sr-only">{footer.emailLabel}: </span>
                  {contacts.email}
                </a>
              </li>
              {contacts.instagram.map((ig) => (
                <li key={ig.handle}>
                  <a href={ig.href} target="_blank" rel="noopener noreferrer" className="u-link inline-flex min-h-10 items-center">
                    <span className="sr-only">{footer.instagramLabel}: </span>
                    {ig.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-3">
            {footer.cities.map((c) => (
              <div key={c.city}>
                <p className="font-serif text-xl">{c.city}</p>
                <p className="mt-2 text-sm font-light text-white/60">{c.role}</p>
                <p className="kicker mt-2 text-white/60">{c.tz}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 border-t border-white/20 pt-6">
          <p className="text-sm font-light text-white/60">
            © {new Date().getFullYear()} Meliation. {footer.credit}.
          </p>
          <span aria-hidden="true" className="font-serif text-[4.5rem] leading-[0.74]">
            M
          </span>
        </div>
      </div>
    </footer>
  );
}
