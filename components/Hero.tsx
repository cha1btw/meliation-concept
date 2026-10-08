import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { AutoVideo } from "./ui/AutoVideo";
import { Kicker } from "./ui/Kicker";
import { Monogram } from "./ui/Monogram";

/*
  A magazine cover: a large asymmetric clip on the left with the M monogram
  over its top edge, the headline on the right with plenty of white space.
  Phones: the clip full bleed on top, copy below.
*/
export function Hero({ hero, tagline }: { hero: Dict["hero"]; tagline: string }) {
  return (
    <section id="top" className="border-b border-line" aria-labelledby="hero-title">
      <div className="wrap grid gap-y-10 pb-14 pt-5 lg:grid-cols-12 lg:gap-x-10 lg:pb-16 lg:pt-8">
        <div className="mono-offset relative -mx-5 md:mx-0 lg:col-span-7">
          <Monogram tagline={tagline} className="mono-in left-4 md:left-6 lg:left-8" />
          <div className="hero-media-in relative aspect-[4/5] overflow-hidden bg-bone md:aspect-[5/4] lg:aspect-auto lg:h-[clamp(520px,calc(100svh-19rem),860px)]">
            <AutoVideo
              video="melissaShowroom"
              alt={hero.videoAlt}
              eager
              className="absolute inset-0 h-full w-full object-cover object-[60%_35%]"
            />
          </div>
        </div>

        <div className="self-center lg:col-span-5 lg:pl-4 xl:pl-10">
          <Kicker className="hero-in">{hero.kicker}</Kicker>
          <h1
            id="hero-title"
            className="hero-in mt-7 font-serif text-[clamp(2.1rem,3.4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.012em] text-balance"
            style={{ animationDelay: "0.1s" }}
          >
            {hero.title}
          </h1>
          <p className="hero-in t-lead mt-7" style={{ animationDelay: "0.2s" }}>
            {hero.text}
          </p>
          <div className="hero-in mt-10" style={{ animationDelay: "0.3s" }}>
            <a href="#services" className="btn">
              {hero.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
