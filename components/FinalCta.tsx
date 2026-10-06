import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import ribbonCta from "@/public/assets/hero/ribbon-cta.jpg";

// Same split as the hero, on the clip's opening frame: the page ends on the rose it began with.
export function FinalCta({ cta }: { cta: Dict["cta"] }) {
  return (
    <section className="split cta-split" aria-labelledby="cta-title">
      <div className="split-media">
        <Image
          src={ribbonCta}
          alt=""
          sizes="(min-width: 768px) 48vw, 100vw"
          placeholder="blur"
          className="object-[50%_80%]"
        />
      </div>
      <div className="split-copy">
        <h2
          id="cta-title"
          className="reveal t-display max-w-[13ch]"
        >
          {cta.title}
        </h2>
        <p className="reveal mt-6 max-w-[38ch] text-lg leading-relaxed md:mt-8 md:text-xl">{cta.text}</p>
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
