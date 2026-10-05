import Image from "next/image";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { photos } from "@/lib/site";

// Asymmetric rhythm: 7+5, 4+8, 6+6 on desktop. Two cells carry photos, one is tinted.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-8", "lg:col-span-6", "lg:col-span-6"];
const TINTED = 4;

export function Services({ services }: { services: Dict["services"] }) {
  return (
    <section id="services" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14">
        <h2
          id="services-title"
          className="reveal font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.01em]"
        >
          {services.title}
        </h2>
        <p className="reveal mt-5 max-w-[48ch] text-[1.075rem] leading-relaxed text-muted">{services.intro}</p>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.items.map((s, i) => {
            const photo = s.photo ? photos[s.photo] : null;
            return (
              <details
                key={s.title}
                className={`reveal group relative overflow-hidden border border-line ${
                  i === TINTED ? "bg-paper-2" : "bg-paper"
                } ${SPANS[i]} ${photo ? "md:col-span-2" : ""}`}
              >
                <summary className={`grid h-full min-h-[18rem] ${photo ? "md:grid-cols-2" : ""}`}>
                  <div className="relative flex flex-col p-7 md:p-9">
                    <span className="tag-hole" aria-hidden="true" />
                    <span className="text-sm text-accent">{s.tag}</span>
                    <h3 className="mt-10 max-w-[16ch] font-display text-[2rem] font-medium leading-[1.05] md:text-[2.4rem]">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-[34ch] text-muted">{s.short}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.95rem] font-medium">
                      <Plus size={16} className="rotate-open transition-transform duration-300" aria-hidden="true" />
                      {services.more}
                    </span>
                  </div>
                  {photo ? (
                    <div className="relative hidden min-h-full md:block">
                      <Image src={photo} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" placeholder="blur" className="object-cover" />
                    </div>
                  ) : null}
                </summary>
                <ul className="grid gap-x-10 gap-y-3 border-t border-line px-7 py-7 text-[0.98rem] leading-snug md:px-9 sm:grid-cols-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
