import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Monogram } from "./ui/Monogram";

/* Closing spread: copy on bone, the studio photo with the monogram over its top edge. */
export function FinalCta({ cta, tagline }: { cta: Dict["cta"]; tagline: string }) {
  return (
    <section className="grid border-t border-line bg-bone md:grid-cols-2" aria-labelledby="cta-title">
      <div className="mono-offset relative md:order-2">
        <Monogram tagline={tagline} className="left-4 md:left-8" />
        <div className="reveal-img relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full md:min-h-[78svh]">
          <Image
            src={photos.rollsLight}
            alt={cta.photoAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[50%_70%]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center px-5 py-16 md:px-10 lg:pl-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))] lg:pr-16">
        <h2 id="cta-title" className="reveal t-display max-w-[13ch]">
          {cta.title}
        </h2>
        <p className="reveal t-lead mt-6">{cta.text}</p>
        <a href="#brief" className="reveal btn mt-10 self-start">
          {cta.button}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
