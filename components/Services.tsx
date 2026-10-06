import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

/*
  A numbered list: each row shows the service and one line about it, and opens
  (native <details>) to the full scope. Desktop columns: number, title, line, toggle.
*/
export function Services({ services }: { services: Dict["services"] }) {
  return (
    <section id="services" className="sect scroll-mt-20" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14">
        <h2
          id="services-title"
          className="reveal t-display"
        >
          {services.title}
        </h2>
        <p className="reveal t-lead mt-6">{services.intro}</p>

        <div className="mt-14 border-t border-line md:mt-16">
          {services.items.map((s, i) => (
            <details key={s.title} className="reveal group border-b border-line" style={{ "--i": i } as React.CSSProperties}>
              <summary className="grid grid-cols-[2.25rem_1fr_auto] gap-x-3 py-8 md:py-11 lg:grid-cols-12 lg:gap-x-10">
                <span className="col-start-1 row-start-1 pt-[0.45em] text-sm tabular-nums text-accent lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-start-2 row-start-1 font-display text-[1.45rem] font-light leading-[1.2] transition-[color,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-2 group-hover:text-accent md:text-[1.8rem] lg:col-span-5">
                  {s.title}
                </h3>
                <p className="col-start-2 row-start-2 mt-2 max-w-[40ch] text-muted lg:col-span-4 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:pt-[0.4em]">
                  {s.short}
                </p>
                <span className="col-start-3 row-start-1 inline-flex items-start gap-2 pt-[0.35em] text-[0.95rem] font-medium lg:col-span-2 lg:col-start-11 lg:justify-self-end">
                  <span className="sr-only lg:not-sr-only">{services.more}</span>
                  <Plus size={20} className="rotate-open mt-px shrink-0 text-accent transition-transform duration-300" aria-hidden="true" />
                </span>
              </summary>
              <div className="pb-9 pl-[calc(2.25rem+0.75rem)] lg:grid lg:grid-cols-12 lg:gap-x-10 lg:pl-0">
                <ul className="grid gap-x-10 gap-y-3 text-[0.98rem] leading-snug sm:grid-cols-2 lg:col-span-10 lg:col-start-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
