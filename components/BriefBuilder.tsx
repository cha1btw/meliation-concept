"use client";

import { useId, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { whatsappLink } from "@/lib/site";

type GroupId = Dict["brief"]["groups"][number]["id"];

export function BriefBuilder({ brief }: { brief: Dict["brief"] }) {
  const uid = useId();
  const [picked, setPicked] = useState<Partial<Record<GroupId, string>>>({});
  const [comment, setComment] = useState("");

  const labelFor = (id: GroupId) => {
    const group = brief.groups.find((g) => g.id === id);
    return group?.options.find((o) => o.value === picked[id])?.label;
  };

  const lines = brief.groups.map((g) => ({ id: g.id, label: brief.lineLabels[g.id], value: labelFor(g.id) }));
  const trimmed = comment.trim();

  const body = lines.filter((l) => l.value).map((l) => `${l.label}: ${l.value}`);
  if (trimmed) body.push(`${brief.lineLabels.comment}: ${trimmed}`);
  const message = [brief.greeting, "", ...body].join("\n").trim();

  return (
    <section id="brief" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="brief-title">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        <div className="lg:col-span-7">
          <h2
            id="brief-title"
            className="reveal max-w-[16ch] font-display text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.01em] text-balance"
          >
            {brief.title}
          </h2>
          <p className="reveal mt-6 max-w-[54ch] text-[1.075rem] leading-relaxed text-muted text-pretty">{brief.intro}</p>

          <form className="mt-14 space-y-10" onSubmit={(e) => e.preventDefault()}>
            {brief.groups.map((g) => (
              <fieldset key={g.id}>
                <legend className="mb-4 text-[0.95rem] font-medium">{g.legend}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {g.options.map((o) => {
                    const id = `${uid}-${g.id}-${o.value}`;
                    return (
                      <label
                        key={o.value}
                        htmlFor={id}
                        className="inline-flex min-h-11 cursor-pointer items-center border border-line px-4 text-[0.95rem] transition-colors hover:border-ink has-checked:border-accent-strong has-checked:bg-accent-strong has-checked:text-on-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
                      >
                        <input
                          id={id}
                          type="radio"
                          name={`${uid}-${g.id}`}
                          value={o.value}
                          checked={picked[g.id] === o.value}
                          onChange={() => setPicked((p) => ({ ...p, [g.id]: o.value }))}
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="flex flex-col gap-2">
              <label htmlFor={`${uid}-comment`} className="text-[0.95rem] font-medium">
                {brief.commentLabel}
              </label>
              <textarea
                id={`${uid}-comment`}
                name="idea"
                autoComplete="off"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-describedby={`${uid}-comment-help`}
                className="w-full resize-y border border-line bg-transparent px-4 py-3 text-base leading-relaxed transition-colors focus:border-accent-strong"
              />
              <p id={`${uid}-comment-help`} className="text-sm text-muted">
                {brief.commentHelp}
              </p>
            </div>
          </form>
        </div>

        {/* Live preview of the exact text that will open in WhatsApp. */}
        <aside className="lg:col-span-5" aria-labelledby={`${uid}-preview`}>
          <div className="lg:sticky lg:top-28">
            <p id={`${uid}-preview`} className="text-[0.95rem] font-medium">
              {brief.previewLabel}
            </p>
            <div className="mt-4 border border-line bg-paper-2 p-6 md:p-8" aria-live="polite">
              <p className="font-display text-2xl leading-snug">{brief.greeting}</p>
              <dl className="mt-6 space-y-3 text-[0.98rem]">
                {lines.map((l) => (
                  <div key={l.id} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-muted">{l.label}</dt>
                    <dd className={l.value ? "" : "text-muted/70 italic"}>{l.value ?? brief.notChosen}</dd>
                  </div>
                ))}
                {trimmed ? (
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 text-muted">{brief.lineLabels.comment}</dt>
                    <dd className="min-w-0 break-words">{trimmed}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full sm:w-auto">
              <WhatsappLogo size={20} aria-hidden="true" />
              {brief.submit}
            </a>
            <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-muted">{brief.note}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
