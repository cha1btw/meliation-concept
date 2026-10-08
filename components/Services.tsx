import Image from "next/image";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";
import { Kicker } from "./ui/Kicker";

/*
  Title and a photo on the left, a numbered list on the right. Each row opens
  (native <details>) to the full scope of the service.
*/
export function Services({ services }: { services: Dict["services"] }) {
  return (
    <section id="services" className="sect bg-bone" aria-labelledby="services-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Kicker className="reveal">{services.kicker}</Kicker>
          <h2 id="services-title" className="reveal t-display mt-7 max-w-[14ch]">
            {services.title}
          </h2>
          <p className="reveal t-lead mt-6">{services.intro}</p>
          <div className="reveal-img relative mt-10 aspect-[4/3] overflow-hidden bg-paper lg:mt-14 lg:aspect-[4/5]">
            <Image
              src={photos.fabricHands}
              alt={services.photoAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="border-t border-ink lg:col-span-7 lg:self-start">
          {services.items.map((s, i) => (
            <details key={s.title} className="reveal group border-b border-line" style={{ "--i": i } as React.CSSProperties}>
              <summary className="grid grid-cols-[2.5rem_1fr_auto] gap-x-3 py-7 md:py-9">
                <span className="kicker col-start-1 row-start-1 pt-[0.55em] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-start-2 row-start-1 font-serif text-[1.45rem] font-normal leading-[1.2] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-1.5 md:text-[1.75rem]">
                  {s.title}
                </h3>
                <span className="col-start-2 row-start-2 mt-2 block max-w-[44ch] font-light text-muted">{s.short}</span>
                <span className="col-start-3 row-start-1 inline-flex items-start gap-2 pt-[0.5em]">
                  <span className="kicker sr-only md:not-sr-only">{services.more}</span>
                  <Plus size={18} className="rotate-open shrink-0 transition-transform duration-300" aria-hidden="true" />
                </span>
              </summary>
              <ul className="grid gap-x-10 gap-y-3 pb-9 pl-[calc(2.5rem+0.75rem)] text-[0.98rem] font-light leading-snug sm:grid-cols-2">
                {s.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[0.65em] h-px w-3 shrink-0 bg-ink" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
