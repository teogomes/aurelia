"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mark } from "./Mark";
import { useLang } from "@/lib/i18n";
import { copy, site } from "@/site.config";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = t(copy.hero.headline).split("\n");

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate overflow-hidden bg-teal-500 text-white"
    >
      {/* ── Depth: a soft radial bloom, then the orbit system ───── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(90% 70% at 8% 95%, rgba(6,39,45,0.35), transparent 60%)",
        }}
      />

      {/* Giant concentric orbits — the logo's ring, blown up to
          architectural scale and drifting behind everything. */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute -right-[22%] top-[6%] -z-10 h-[46rem] w-[46rem] md:-right-[8%] md:h-[54rem] md:w-[54rem]"
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          {[280, 232, 184, 136].map((r, i) => (
            <ellipse
              key={r}
              cx="300"
              cy="300"
              rx={r}
              ry={r * 0.42}
              fill="none"
              stroke="#fff"
              strokeWidth={i === 0 ? 1.4 : 1}
              opacity={0.12 + i * 0.05}
              transform={`rotate(${-20 - i * 6} 300 300)`}
              style={{
                transformOrigin: "300px 300px",
                animation: `orbit-spin ${52 + i * 16}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }}
            />
          ))}
        </svg>
      </motion.div>

      <div className="relative mx-auto grid max-w-[var(--shell)] items-center gap-16 px-6 pb-40 pt-40 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:pb-52 md:pt-48">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <motion.div style={{ y: textY, opacity: fade }}>
          <p className="eyebrow rise flex items-center gap-3 text-white/75" style={{ animationDelay: "0.05s" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            {t(copy.hero.eyebrow)}
          </p>

          <h1 className="mt-7 display text-[clamp(2.9rem,7.4vw,5.6rem)] leading-[0.95]">
            {lines.map((line, i) => (
              <span
                key={i}
                className="rise block"
                style={{ animationDelay: `${0.15 + i * 0.11}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-8 max-w-[34rem] text-[1.02rem] leading-relaxed text-white/80"
            style={{ animationDelay: "0.5s" }}
          >
            {t(copy.hero.sub)}
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-teal-700 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_22px_50px_-16px_rgba(6,39,45,0.6)]"
            >
              <span className="relative z-10">{t(copy.hero.cta)}</span>
              <span className="absolute inset-0 -translate-x-full bg-teal-50 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/35 px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-400 hover:border-white hover:bg-white/10"
            >
              {t(copy.hero.ctaAlt)}
            </a>
          </div>

          {/* Stats — hairline-separated, editorial */}
          <dl
            className="rise mt-14 flex max-w-[32rem] divide-x divide-white/20 border-t border-white/20 pt-6"
            style={{ animationDelay: "0.75s" }}
          >
            {copy.hero.stats.map((s) => (
              <div key={s.value} className="flex-1 px-4 first:pl-0 last:pr-0">
                <dt className="display text-3xl">{s.value}</dt>
                <dd className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/60">
                  {t(s.label)}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ── The mark, held inside a photo placeholder frame ───── */}
        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto hidden w-full max-w-[22rem] md:block"
        >
          {/* An arch, not a rectangle — the shape of a doorway, and a
              quiet echo of the circular stamp on the card. */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] border border-dashed border-white/40 bg-white/[0.07] backdrop-blur-[2px]"
            style={{ animation: "orbit-drift 14s ease-in-out infinite" }}
          >
            {/* ⚠️ PLACEHOLDER — drop the clinic photo in here (next/image,
                object-cover, absolute inset-0) and delete this block. */}
            <div className="absolute inset-0 grid place-items-center pb-8">
              <Mark className="h-32 w-32 text-white/90" spin />
            </div>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.3em] text-white/40">
              photo
            </span>
          </div>

          {/* Practitioner credit, hung off the frame like a museum label */}
          <div className="absolute -left-8 top-16 rounded-full bg-teal-900/45 px-5 py-2.5 backdrop-blur-md">
            <p className="text-[0.6rem] uppercase tracking-[0.24em] text-white/90">
              {site.practitioner}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── The wave — lifted from the bottom of the price list ── */}
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[70px] w-full md:h-[110px]">
          <path
            d="M0,64 C240,120 480,10 720,34 C960,58 1200,120 1440,72 L1440,120 L0,120 Z"
            fill="var(--color-bone)"
          />
        </svg>
      </div>
    </section>
  );
}
