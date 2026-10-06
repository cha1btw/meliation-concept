import { HandTap } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { SwatchCard } from "./SwatchCard";

export function Works({ works }: { works: Dict["works"] }) {
  return (
    <section className="sect tone-sand" aria-labelledby="works-title">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14">
        <h2
          id="works-title"
          className="reveal t-display max-w-[18ch]"
        >
          {works.title}
        </h2>
        <p className="reveal t-lead mt-7">{works.intro}</p>
        {/* Visible hint: without it nobody knows the cards have a back side. */}
        <p className="reveal mt-6 inline-flex items-center gap-2 text-sm text-accent" aria-hidden="true">
          <HandTap size={18} />
          {works.flipHint}
        </p>
      </div>

      {/* Native horizontal scroll with snap: works with wheel, trackpad, touch and keyboard. */}
      <div
        className="mt-14 md:mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-6 [scrollbar-width:thin] md:scroll-px-10 md:px-10 lg:gap-7 lg:scroll-px-14 lg:px-14 xl:pl-[max(3.5rem,calc((100vw-1400px)/2+3.5rem))]"
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
