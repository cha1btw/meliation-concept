import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

export function Faq({ faq }: { faq: Dict["faq"] }) {
  return (
    <section id="faq" className="sect scroll-mt-20" aria-labelledby="faq-title">
      {/* Same container as every other section; on desktop the title stays beside the questions. */}
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        <h2
          id="faq-title"
          className="reveal t-display max-w-[12ch] self-start lg:sticky lg:top-28 lg:col-span-4"
        >
          {faq.title}
        </h2>
        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, i) => (
            <details key={item.q} className="reveal group border-b border-line" style={{ "--i": i } as React.CSSProperties}>
              <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
                <span className="font-display text-[1.2rem] font-normal leading-snug transition-colors group-hover:text-accent md:text-[1.4rem]">
                  {item.q}
                </span>
                <Plus size={22} className="rotate-open shrink-0 text-accent transition-transform duration-300" aria-hidden="true" />
              </summary>
              <p className="max-w-[62ch] pb-8 pr-10 text-[1.05rem] leading-relaxed text-muted text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
