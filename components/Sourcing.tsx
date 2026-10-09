import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/* Three procurement directions, laid out like category tiles on a fashion retailer. */
export function Sourcing({ sourcing }: { sourcing: Dict["sourcing"] }) {
  return (
    <section id="sourcing" className="sect border-b border-line bg-bone" aria-labelledby="sourcing-title">
      <div className="wrap">
        <Kicker className="reveal">{sourcing.kicker}</Kicker>
        <h2 id="sourcing-title" className="reveal t-display mt-7 max-w-[14ch]">
          {sourcing.title}
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3 lg:mt-20 lg:gap-x-10">
          {sourcing.items.map((item, i) => (
            <li key={item.label}>
              <div
                className="reveal-img relative aspect-[3/4] overflow-hidden bg-paper"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Image
                  src={photos[item.photo]}
                  alt={item.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="reveal mt-7" style={{ "--i": i } as React.CSSProperties}>
                <p className="font-serif text-[1.5rem] italic leading-none text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-serif text-[clamp(1.45rem,2vw,1.85rem)] font-normal leading-[1.15] text-balance">
                  {item.label}
                </h3>
                <p className="mt-4 font-light leading-relaxed text-muted text-pretty">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
