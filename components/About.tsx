import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";

export function About({ about }: { about: Dict["about"] }) {
  return (
    <section id="about" className="sect scroll-mt-20">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        {/*
          Photos: a tall portrait with a smaller frame overlapping its lower corner.
          The pair is one compact block (pb reserves room for the overlap) and stays
          pinned beside the text on desktop instead of stretching to its height.
        */}
        <div className="relative pb-[18%] lg:sticky lg:top-28 lg:col-span-5">
          <div className="reveal-img relative aspect-[4/5] w-[82%] overflow-hidden bg-paper-2">
            <Image
              src={photos.portraitLace}
              alt={about.photoAlt}
              fill
              sizes="(min-width: 1024px) 34vw, 82vw"
              placeholder="blur"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="reveal-img absolute bottom-0 right-0 aspect-[4/5] w-[42%] overflow-hidden bg-paper-2 shadow-[0_30px_60px_-24px_rgba(70,52,30,0.35)] ring-8 ring-paper">
            <Image
              src={photos.showroomChair}
              alt={about.photo2Alt}
              fill
              sizes="(min-width: 1024px) 18vw, 42vw"
              placeholder="blur"
              className="object-cover object-[55%_40%]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <h2 className="reveal t-display max-w-[16ch]">
            {about.title}
          </h2>
          <div className="mt-10 space-y-5 text-[1.075rem] leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="reveal max-w-[60ch] text-pretty">
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <div key={f.title} className="reveal border-t border-line py-7" style={{ "--i": i } as React.CSSProperties}>
                <dt className="font-display text-xl font-normal">{f.title}</dt>
                <dd className="mt-2 max-w-[32ch] text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
