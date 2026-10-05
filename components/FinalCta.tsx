import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import heroEnding from "@/public/assets/hero-ending.jpg";

// Reuses the hero's resting frame, so the page ends on the same silk it opened with.
export function FinalCta({ cta }: { cta: Dict["cta"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0a09] text-ink" aria-labelledby="cta-title">
      <Image src={heroEnding} alt="" fill sizes="100vw" placeholder="blur" className="-z-10 object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_25%_60%,rgba(8,6,10,0.72)_0%,rgba(8,6,10,0.35)_60%,rgba(8,6,10,0.15)_100%)]"
      />
      <div className="mx-auto flex min-h-[80svh] w-full max-w-[1400px] flex-col justify-center px-5 py-28 md:px-10 lg:px-14">
        <h2
          id="cta-title"
          className="reveal max-w-[13ch] font-display text-[clamp(3rem,7.5vw,7rem)] font-medium leading-[1] tracking-[-0.015em] text-balance [text-shadow:var(--tshadow)]"
        >
          {cta.title}
        </h2>
        <p className="reveal mt-7 max-w-[40ch] text-lg leading-relaxed text-ink/85 md:text-xl [text-shadow:var(--tshadow)]">
          {cta.text}
        </p>
        <div className="reveal mt-10">
          <a href="#brief" className="btn">
            {cta.button}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
