import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { AutoVideo } from "./ui/AutoVideo";
import { Kicker } from "./ui/Kicker";

/* Like a luxury catalogue: large media and text blocks swap sides row by row. */
export function Istanbul({ istanbul }: { istanbul: Dict["istanbul"] }) {
  return (
    <section id="istanbul" className="sect" aria-labelledby="istanbul-title">
      <div className="wrap">
        <Kicker className="reveal">{istanbul.kicker}</Kicker>
        <h2 id="istanbul-title" className="reveal t-display mt-7 max-w-[18ch]">
          {istanbul.title}
        </h2>

        <div className="mt-14 space-y-20 lg:mt-24 lg:space-y-32">
          {istanbul.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={item.label} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
                <div
                  className={`reveal-img relative aspect-[4/5] overflow-hidden bg-bone lg:col-span-6 lg:row-start-1 ${
                    flip ? "lg:col-start-7" : "lg:col-start-1"
                  }`}
                >
                  {item.media.kind === "video" ? (
                    <AutoVideo video={item.media.video} alt={item.media.alt} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <Image
                      src={photos[item.media.photo]}
                      alt={item.media.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className={`reveal lg:col-span-4 lg:row-start-1 ${flip ? "lg:col-start-2" : "lg:col-start-8"}`}>
                  <p className="font-serif text-[1.6rem] italic leading-none text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <p className="kicker mt-6">{item.label}</p>
                  <h3 className="mt-4 font-serif text-[clamp(1.75rem,2.6vw,2.4rem)] font-normal leading-[1.15]">{item.title}</h3>
                  <p className="t-lead mt-5">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
