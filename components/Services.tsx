"use client";

import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { copy, services, site } from "@/site.config";

/* An intentionally uneven bento: two wide "anchor" tiles carry the
   colour, the rest are quiet bone tiles. 2+1 / 1+2 / 1+1+1.
   Written out in full because Tailwind can't see interpolated names. */
const SPAN = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
];

function tone(i: number) {
  if (i === 0)
    return "bg-teal-500 text-white [--dot:rgba(255,255,255,0.5)] [--hair:rgba(255,255,255,0.28)]";
  if (i === 3)
    return "bg-teal-100 text-teal-900 [--dot:var(--color-teal-600)] [--hair:rgba(30,156,168,0.35)]";
  return "bg-white text-teal-900 ring-1 ring-teal-500/12 [--dot:var(--color-teal-500)] [--hair:rgba(30,156,168,0.25)]";
}

export function Services() {
  const { t } = useLang();
  const title = t(copy.services.title).split("\n");

  return (
    <section id="services" className="relative mx-auto max-w-[var(--shell)] px-6 py-24 md:px-10 md:py-36">
      {/* Section header — copy sits left, lede hangs right */}
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-teal-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
            {t(copy.services.eyebrow)}
          </p>
          <h2 className="mt-5 display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
            {title.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-md text-[0.98rem] leading-relaxed text-teal-900/65 md:pb-3">
            {t(copy.services.lede)}
          </p>
        </Reveal>
      </div>

      <div className="hairline my-14" />

      <ul className="grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal
            as="li"
            key={s.id}
            delay={i * 0.06}
            className={SPAN[i] ?? "md:col-span-1"}
          >
            <article
              className={`group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:p-9 ${tone(i)}`}
            >
              {/* The orbit, again — it swings up out of the corner on hover */}
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 opacity-0 transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:-bottom-10 group-hover:-right-10 group-hover:rotate-[18deg] group-hover:opacity-100"
              >
                <ellipse
                  cx="100"
                  cy="100"
                  rx="88"
                  ry="34"
                  fill="none"
                  stroke="var(--hair)"
                  strokeWidth="1.4"
                  transform="rotate(-20 100 100)"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="62"
                  ry="22"
                  fill="none"
                  stroke="var(--hair)"
                  strokeWidth="1"
                  transform="rotate(-32 100 100)"
                />
              </svg>

              <header className="relative flex items-start justify-between gap-6">
                <h3
                  className={`display leading-[1.08] tracking-[-0.01em] ${
                    i === 0 ? "text-[clamp(1.9rem,3vw,2.9rem)]" : "text-[1.6rem] md:text-[1.85rem]"
                  }`}
                >
                  {t(s.title)}
                </h3>
                <span className="mt-1 shrink-0 font-mono text-[0.65rem] tracking-[0.2em] opacity-45">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </header>

              <p
                className={`relative mt-6 max-w-[38ch] text-[0.9rem] leading-relaxed opacity-70 ${
                  i === 0 ? "md:max-w-[46ch] md:text-[0.98rem]" : ""
                }`}
              >
                {t(s.blurb)}
              </p>

              <span className="relative mt-7 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] opacity-0 transition-opacity duration-500 group-hover:opacity-90">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--dot)]" />
                {t(copy.nav.book)}
              </span>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-dashed border-teal-500/30 px-8 py-10 text-center">
          <p className="max-w-md text-[0.95rem] leading-relaxed text-teal-900/70">
            {t(copy.services.note)}
          </p>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-teal-500 px-7 py-3.5 text-[0.8rem] font-semibold tracking-wide text-white transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_16px_36px_-12px_rgba(30,156,168,0.7)]"
          >
            {t(copy.nav.book)}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
