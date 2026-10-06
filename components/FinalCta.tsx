import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import ribbonEnd from "@/public/assets/hero/ribbon-end.jpg";

// Same split as the hero and the hero clip's resting frame, so the page ends where it opened.
export function FinalCta({ cta }: { cta: Dict["cta"] }) {
  return (
    <section className="split cta-split border-t border-line" aria-labelledby="cta-title">
      <div className="split-media">
        <Image
          src={ribbonEnd}
          alt=""
          sizes="(min-width: 768px) 48vw, 100vw"
          placeholder="blur"
          className="object-[50%_48%]"
        />
      </div>
      <div className="split-copy">
        <h2
          id="cta-title"
          className="reveal max-w-[13ch] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.015em] text-balance"
        >
          {cta.title}
        </h2>
        <p className="reveal mt-6 max-w-[38ch] text-lg leading-relaxed text-ink/75 md:mt-8 md:text-xl">{cta.text}</p>
        <div className="reveal mt-9 md:mt-11">
          <a href="#brief" className="btn">
            {cta.button}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
