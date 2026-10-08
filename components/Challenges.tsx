import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { Kicker } from "./ui/Kicker";

/* A black grid of hairline cards: no icons, only numbers and text. */
export function Challenges({ challenges }: { challenges: Dict["challenges"] }) {
  return (
    <section className="sect bg-ink text-on-ink" aria-labelledby="challenges-title">
      <div className="wrap">
        <Kicker className="reveal text-white/70">{challenges.kicker}</Kicker>
        <h2 id="challenges-title" className="reveal t-display mt-7 max-w-[20ch]">
          {challenges.title}
        </h2>

        <ol className="mt-14 grid grid-cols-1 border-l border-t border-white/25 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {challenges.items.map((item, i) => (
            <li
              key={item.label}
              className="reveal flex min-h-[15rem] flex-col justify-between gap-10 border-b border-r border-white/25 p-7 md:p-9 lg:min-h-[20rem]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <p className="kicker text-white/70">
                {String(i + 1).padStart(2, "0")} / {item.label}
              </p>
              <p className="font-serif text-[1.3rem] leading-[1.4] text-pretty md:text-[1.4rem]">{item.text}</p>
            </li>
          ))}
        </ol>

        <a href="#services" className="kicker u-link u-link-rest mt-10 inline-flex items-center gap-3">
          {challenges.link}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
