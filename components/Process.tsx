import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/* Five steps between hairlines, then a contact sheet of studio details. */
export function Process({ process }: { process: Dict["process"] }) {
  return (
    <section id="process" className="sect" aria-labelledby="process-title">
      <div className="wrap">
        <Kicker className="reveal">{process.kicker}</Kicker>
        <h2 id="process-title" className="reveal t-display mt-7">
          {process.title}
        </h2>

        <ol className="mt-12 grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {process.steps.map((step, i) => (
            <li
              key={step.verb}
              className="reveal border-b border-line py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-9 lg:first:pl-0 lg:last:border-r-0"
              style={{ "--i": i } as React.CSSProperties}
            >
              <p className="kicker tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-serif text-[1.6rem] font-normal leading-none md:text-[1.75rem]">{step.verb}</h3>
              <p className="mt-4 max-w-[30ch] font-light leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-14 grid grid-cols-2 gap-2 md:gap-4 lg:mt-20 lg:grid-cols-4">
          {process.strip.map((s, i) => (
            <li
              key={s.photo}
              className="reveal-img relative aspect-[3/4] overflow-hidden bg-bone"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image
                src={photos[s.photo]}
                alt={s.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
