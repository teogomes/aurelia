"use client";

import { Reveal } from "./Reveal";
import { Mark } from "./Mark";
import { useLang } from "@/lib/i18n";
import { copy, site } from "@/site.config";
import { InstagramIcon, FacebookIcon, PinIcon, PhoneIcon, MailIcon } from "./icons";

const q = encodeURIComponent(site.address.mapQuery);
const MAP_EMBED = `https://www.google.com/maps?q=${q}&hl=el&z=16&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="grain relative isolate overflow-hidden bg-teal-900 text-white">
      {/* Bone wave in, so the section is cut out of the page rather
          than stacked on top of it. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]">
          <path d="M0,0 L1440,0 L1440,26 C1160,86 900,6 640,40 C420,68 200,24 0,52 Z" fill="var(--color-bone)" />
        </svg>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 85% 30%, rgba(30,156,168,0.45), transparent 60%), radial-gradient(60% 50% at 5% 90%, rgba(30,156,168,0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--shell)] px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
        <div className="grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          {/* ── Left: the words ──────────────────────────────── */}
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-teal-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
                {t(copy.about.eyebrow)}
              </p>
              <h2 className="mt-5 display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05]">
                {t(copy.about.title)}
              </h2>
              <p className="mt-7 max-w-[38rem] text-[0.98rem] leading-relaxed text-white/70">
                {t(copy.about.body)}
              </p>
            </Reveal>

            {/* Address / hours / contact — three hairline blocks */}
            <div className="mt-12 space-y-px overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
              <Reveal delay={0.05}>
                <div className="flex gap-4 border-b border-white/10 p-6">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
                      {site.name} · {t(site.badge)}
                    </p>
                    <p className="mt-2 text-xl font-light tracking-tight">
                      {site.address.street}
                    </p>
                    <p className="text-sm text-white/60">
                      {t(site.address.area)} · {site.address.postal}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border-b border-white/10 p-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
                    {t(copy.about.hoursTitle)}
                  </p>
                  <dl className="mt-3 space-y-2">
                    {site.hours.map((h, i) => (
                      <div key={i} className="flex items-baseline gap-3">
                        <dt className="text-sm text-white/70">{t(h.day)}</dt>
                        <span className="h-px flex-1 bg-white/12" />
                        <dd className="font-mono text-xs tracking-wide text-white/85">
                          {typeof h.time === "string" ? h.time : t(h.time)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="p-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
                    {t(copy.about.contactTitle)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {site.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:+30${p}`}
                        className="group flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                      >
                        <PhoneIcon className="h-3.5 w-3.5 text-teal-300" />
                        <span className="border-b border-transparent pb-px transition-colors group-hover:border-teal-300">
                          {p}
                        </span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                    >
                      <MailIcon className="h-3.5 w-3.5 text-teal-300" />
                      <span className="border-b border-transparent pb-px transition-colors group-hover:border-teal-300">
                        {site.email}
                      </span>
                    </a>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Social href={site.social.instagram.url} label={site.social.instagram.handle}>
                      <InstagramIcon className="h-4 w-4" />
                    </Social>
                    <Social href={site.social.facebook.url} label={site.social.facebook.handle}>
                      <FacebookIcon className="h-4 w-4" />
                    </Social>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Right: the map, tinted into the palette ───────── */}
          <Reveal delay={0.1} className="relative">
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] ring-1 ring-white/15">
              <iframe
                title="Aurelia — Κολοκοτρώνη 26, Περισσός"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full transition-[filter] duration-[1200ms] ease-[var(--ease-out-expo)]"
                style={{
                  border: 0,
                  // Pull Google's default map into the brand palette.
                  // Hover releases it back to full colour (see CSS below).
                  filter:
                    "grayscale(1) contrast(0.92) sepia(0.55) hue-rotate(140deg) saturate(2.6) brightness(0.82)",
                }}
              />
              {/* Teal veil that lifts on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-teal-900/35 opacity-100 transition-opacity duration-700 group-hover:opacity-0"
              />

              {/* Floating pin card */}
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-teal-900/75 px-4 py-3 backdrop-blur-md">
                <Mark className="h-7 w-7 text-teal-200" />
                <div>
                  <p className="wordmark text-sm leading-none">AURELIA</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/55">
                    {site.address.street}
                  </p>
                </div>
              </div>

              {/* ── The CTA that matters ────────────────────── */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-6 py-4 text-sm font-semibold tracking-wide text-teal-800 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
                >
                  <span className="relative z-10">{t(copy.nav.book)}</span>
                  <span
                    aria-hidden
                    className="relative z-10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1"
                  >
                    →
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-teal-100 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0" />
                </a>
                <a
                  href={MAP_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-2xl bg-teal-900/70 px-6 py-4 text-sm font-medium text-white/90 backdrop-blur-md transition-colors duration-400 hover:bg-teal-900"
                >
                  {t(copy.about.directions)}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2.5 text-xs text-white/85 ring-1 ring-white/10 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-white hover:text-teal-800"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
