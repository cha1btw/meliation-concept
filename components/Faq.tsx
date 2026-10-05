import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";

export function Faq({ faq }: { faq: Dict["faq"] }) {
  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <h2
          id="faq-title"
          className="reveal font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.01em]"
        >
          {faq.title}
        </h2>
        <div className="mt-14 border-t border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="reveal group border-b border-line">
              <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
                <span className="font-display text-[1.6rem] font-medium leading-tight md:text-[1.9rem]">{item.q}</span>
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
