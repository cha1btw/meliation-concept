import Image from "next/image";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/*
  A chain of three services with sourcing as the core: the first card is wider
  and carries a black "main service" tag, the other two are add-ons.
*/
export function Services({ services }: { services: Dict["services"] }) {
  return (
    <section id="services" className="sect border-t border-line" aria-labelledby="services-title">
      <div className="wrap">
        <Kicker className="reveal">{services.kicker}</Kicker>
        <h2 id="services-title" className="reveal t-display mt-7 max-w-[22ch]">
          {services.title}
        </h2>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 lg:mt-20 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-x-10">
          {services.items.map((s, i) => {
            const main = i === 0;
            return (
              <li key={s.title} className="flex flex-col">
                <div
                  className="reveal-img relative aspect-[4/5] overflow-hidden bg-bone lg:aspect-auto lg:h-[clamp(380px,34vw,540px)]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Image
                    src={photos[s.photo]}
                    alt={s.alt}
                    fill
                    placeholder="blur"
                    sizes={main ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
                    className="object-cover"
                  />
                  <span
                    className={`kicker absolute left-0 top-0 px-4 py-2.5 ${main ? "bg-ink text-on-ink" : "bg-paper text-ink"}`}
                  >
                    {s.tag}
                  </span>
                </div>
                <div className="reveal mt-7 border-t border-ink pt-6" style={{ "--i": i } as React.CSSProperties}>
                  <p className="kicker tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3
                    className={`mt-4 font-serif font-normal leading-[1.15] text-balance ${
                      main ? "text-[clamp(1.7rem,2.5vw,2.3rem)]" : "text-[clamp(1.4rem,1.8vw,1.7rem)]"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 font-light leading-relaxed text-muted text-pretty">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
