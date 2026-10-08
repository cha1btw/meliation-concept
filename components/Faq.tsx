import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { Kicker } from "./ui/Kicker";

export function Faq({ faq }: { faq: Dict["faq"] }) {
  return (
    <section id="faq" className="sect" aria-labelledby="faq-title">
      {/* On desktop the title stays beside the questions. */}
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="self-start lg:sticky lg:top-24 lg:col-span-4">
          <Kicker className="reveal">{faq.kicker}</Kicker>
          <h2 id="faq-title" className="reveal t-display mt-7 max-w-[12ch]">
            {faq.title}
          </h2>
        </div>
        <div className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, i) => (
            <details key={item.q} className="reveal group border-b border-line" style={{ "--i": i } as React.CSSProperties}>
              <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
                <span className="font-serif text-[1.2rem] leading-snug md:text-[1.4rem]">{item.q}</span>
                <Plus size={20} className="rotate-open shrink-0 transition-transform duration-300" aria-hidden="true" />
              </summary>
              <p className="max-w-[62ch] pb-8 pr-10 text-[1.02rem] font-light leading-relaxed text-muted text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
