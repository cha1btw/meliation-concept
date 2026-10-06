import type { Dict } from "@/content/types";

export function Process({ process }: { process: Dict["process"] }) {
  return (
    <section id="process" className="sect scroll-mt-20" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14">
        <h2
          id="process-title"
          className="reveal t-display"
        >
          {process.title}
        </h2>

        <div className="relative mt-16 lg:mt-24">
          {/* The seam: a dashed stitch that sews itself as the section scrolls in. Vertical on mobile. */}
          <div
            aria-hidden="true"
            className="stitch-line absolute left-[7px] top-2 bottom-2 w-0 border-l-2 border-dashed border-accent lg:inset-x-0 lg:top-[7px] lg:bottom-auto lg:h-0 lg:w-auto lg:border-l-0 lg:border-t-2"
          />
          <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
            {process.steps.map((step, i) => (
              <li key={step.verb} className="reveal relative pl-12 lg:pl-0 lg:pt-14" style={{ "--i": i } as React.CSSProperties}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid h-4 w-4 place-items-center bg-paper before:absolute before:h-[2px] before:w-4 before:rotate-45 before:bg-accent after:absolute after:h-[2px] after:w-4 after:-rotate-45 after:bg-accent"
                />
                <h3 className="font-display text-[1.5rem] font-normal leading-none md:text-[1.7rem]">{step.verb}</h3>
                <p className="mt-4 max-w-[28ch] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
