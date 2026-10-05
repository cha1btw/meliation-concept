import Image from "next/image";
import { EnvelopeSimple, InstagramLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { contacts } from "@/lib/site";
import logoWhite from "@/public/assets/logo-white.png";

export function Footer({ footer }: { footer: Dict["footer"] }) {
  return (
    <footer className="border-t border-line py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 md:grid-cols-2 md:px-10 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-4">
          <Image src={logoWhite} alt="Meliation" className="h-9 w-auto" />
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-4">
          {footer.cities.map((c) => (
            <div key={c.city}>
              <p className="font-display text-2xl font-medium">{c.city}</p>
              <p className="mt-2 text-sm text-muted">{c.role}</p>
              <p className="mt-1 text-sm text-muted">{c.tz}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-3 text-[0.98rem] md:col-span-2 lg:col-span-4">
          <li>
            <a href={`tel:${contacts.phone}`} className="inline-flex min-h-11 items-center gap-3 hover:text-accent">
              <Phone size={18} aria-hidden="true" />
              <span className="sr-only">{footer.phoneLabel}: </span>
              {contacts.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${contacts.email}`} className="inline-flex min-h-11 items-center gap-3 hover:text-accent">
              <EnvelopeSimple size={18} aria-hidden="true" />
              <span className="sr-only">{footer.emailLabel}: </span>
              {contacts.email}
            </a>
          </li>
          {contacts.instagram.map((ig) => (
            <li key={ig.handle}>
              <a
                href={ig.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 hover:text-accent"
              >
                <InstagramLogo size={18} aria-hidden="true" />
                <span className="sr-only">{footer.instagramLabel}: </span>
                {ig.handle}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-14 w-full max-w-[1400px] px-5 text-sm text-muted md:px-10 lg:px-14">
        <p>
          © {new Date().getFullYear()} Meliation. {footer.credit}.
        </p>
      </div>
    </footer>
  );
}
