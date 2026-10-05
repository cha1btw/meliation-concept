import type { Dict } from "@/content/types";
import { SwatchCard } from "./SwatchCard";

export function Works({ works }: { works: Dict["works"] }) {
  return (
    <section className="py-24 md:py-32" aria-labelledby="works-title">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14">
        <h2
          id="works-title"
          className="reveal max-w-[18ch] font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.01em] text-balance"
        >
          {works.title}
        </h2>
        <p className="reveal mt-6 max-w-[58ch] text-[1.075rem] leading-relaxed text-muted text-pretty">{works.intro}</p>
      </div>

      {/* Native horizontal scroll with snap: works with wheel, trackpad, touch and keyboard. */}
      <div
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-6 [scrollbar-width:thin] md:scroll-px-10 md:px-10 lg:gap-7 lg:scroll-px-14 lg:px-14 xl:pl-[max(3.5rem,calc((100vw-1400px)/2+3.5rem))]"
        role="list"
        tabIndex={0}
        aria-label={works.title}
      >
        {works.items.map((item) => (
          <div role="listitem" key={item.photo + item.caption}>
            <SwatchCard item={item} hint={works.flipHint} />
          </div>
        ))}
        <div aria-hidden="true" className="w-1 shrink-0" />
      </div>
    </section>
  );
}
