import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/* Laid out like a Vogue or PORTER page: big portrait, pull quote between rules, two text columns. */
export function FounderLetter({ founder }: { founder: Dict["founder"] }) {
  const [intro, ...body] = founder.paragraphs;
  return (
    <section id="editorial" className="sect border-b border-line" aria-labelledby="founder-title">
      <div className="wrap">
        <Kicker className="reveal">{founder.kicker}</Kicker>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
          <figure className="lg:col-span-5">
            <div className="reveal-img relative aspect-[2/3] overflow-hidden bg-bone">
              <Image
                src={photos.melissaPortrait}
                alt={founder.photoAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 font-serif text-sm italic text-muted">{founder.caption}</figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <h2 id="founder-title" className="reveal t-display">
              {founder.title}
            </h2>

            <blockquote className="reveal mt-10 border-y border-ink py-8 lg:mt-12 lg:py-10">
              <p className="font-serif text-[clamp(1.55rem,2.5vw,2.3rem)] italic leading-[1.25] text-balance">
                {founder.quote}
              </p>
              <footer className="kicker mt-6">— {founder.signature}</footer>
            </blockquote>

            <p className="reveal mt-10 font-serif text-[1.3rem] leading-snug md:text-[1.45rem]">{intro}</p>
            <div className="reveal letter-cols mt-7">
              {body.map((p, i) => (
                <p key={p} className={i === 0 ? "dropcap" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <p className="reveal mt-10 font-serif text-[2rem] italic leading-none">{founder.signature}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
