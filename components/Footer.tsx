"use client";

import { Mark } from "./Mark";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { copy, site } from "@/site.config";
import { InstagramIcon, FacebookIcon, ArrowIcon } from "./icons";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative isolate overflow-hidden bg-teal-500 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 80% at 20% 0%, rgba(255,255,255,0.18), transparent 60%)",
        }}
      />

      {/* ── The last, biggest call to action ─────────────────── */}
      <div className="relative mx-auto max-w-[var(--shell)] px-6 pt-24 md:px-10 md:pt-32">
        <Reveal className="flex flex-col items-start justify-between gap-10 border-b border-white/20 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-xl display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05]">
            {t({
              el: "Το πόδι σου δεν χρειάζεται να πονάει.",
              en: "Your foot does not have to hurt.",
            })}
          </h2>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-4 rounded-full bg-white py-4 pl-8 pr-4 text-sm font-semibold tracking-wide text-teal-700 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(6,39,45,0.7)]"
          >
            {t(copy.nav.book)}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-500 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-30deg]">
              <ArrowIcon className="h-4 w-4" />
            </span>
          </a>
        </Reveal>

        {/* ── Columns ────────────────────────────────────────── */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-10 w-10" />
              <div>
                <p className="wordmark text-2xl leading-none">AURELIA</p>
                <p className="mt-1.5 text-[0.55rem] uppercase tracking-[0.3em] text-white/70">
                  {t(site.subname)}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              {t(copy.footer.tagline)}
            </p>
          </div>

          <div>
            <p className="eyebrow text-white/45">{t(copy.about.contactTitle)}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              <li>{site.address.street}</li>
              <li>
                {t(site.address.area)} · {site.address.postal}
              </li>
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:+30${p}`} className="hover:text-white hover:underline underline-offset-4">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-white hover:underline underline-offset-4"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/45">Social</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/25 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-teal-600">
                    <InstagramIcon className="h-4 w-4" />
                  </span>
                  {site.social.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/25 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-teal-600">
                    <FacebookIcon className="h-4 w-4" />
                  </span>
                  {site.social.facebook.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 py-8 text-[0.72rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {t(site.subname)}. {t(copy.footer.rights)}
          </p>
          <p className="tracking-[0.14em] uppercase">{t(site.badge)}</p>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge — the sign
          above the door, seen from below. */}
      <p
        aria-hidden
        className="wordmark pointer-events-none select-none whitespace-nowrap text-center text-[13vw] leading-[0.75] text-white/10"
        style={{ marginBottom: "-0.18em" }}
      >
        AURELIA
      </p>
    </footer>
  );
}
