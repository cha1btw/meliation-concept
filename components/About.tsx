import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";

export function About({ about }: { about: Dict["about"] }) {
  return (
    <section id="about" className="scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        {/* Photos: a tall portrait with a smaller frame overlapping its edge. Single column below lg. */}
        <div className="relative lg:col-span-5">
          <div className="reveal relative aspect-[4/5] w-[86%] overflow-hidden bg-paper-2">
            <Image
              src={photos.portraitLace}
              alt={about.photoAlt}
              fill
              sizes="(min-width: 1024px) 36vw, 86vw"
              placeholder="blur"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="reveal absolute -bottom-10 right-0 aspect-square w-[44%] overflow-hidden border-[6px] border-paper bg-paper-2">
            <Image
              src={photos.showroomChair}
              alt={about.photo2Alt}
              fill
              sizes="(min-width: 1024px) 18vw, 44vw"
              placeholder="blur"
              className="object-cover object-[60%_40%]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <h2 className="reveal max-w-[16ch] font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.01em] text-balance">
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
            {about.facts.map((f) => (
              <div key={f.title} className="reveal border-t border-line py-6">
                <dt className="font-display text-2xl font-medium">{f.title}</dt>
                <dd className="mt-2 max-w-[32ch] text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
