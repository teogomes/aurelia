"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { copy, site } from "@/site.config";

const LINKS = [
  { href: "#services", label: copy.nav.services },
  { href: "#about", label: copy.nav.about },
  { href: "#testimonials", label: copy.nav.testimonials },
];

export function Nav() {
  const { t, locale, setLocale } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the teal hero the nav is white; once it lifts off it becomes
  // a bone-coloured glass bar with teal ink.
  const onTeal = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        onTeal
          ? "bg-transparent text-white"
          : "bg-bone/80 text-teal-900 shadow-[0_1px_0_rgba(30,156,168,0.14)] backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[4.75rem] max-w-[var(--shell)] items-center justify-between gap-6 px-6 md:px-10">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.82rem] font-medium tracking-wide"
            >
              {t(l.label)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full" />
            </a>
          ))}

          <LangToggle locale={locale} setLocale={setLocale} onTeal={onTeal} />

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${
              onTeal
                ? "bg-white text-teal-700 hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)]"
                : "bg-teal-500 text-white hover:bg-teal-600 hover:shadow-[0_10px_30px_-8px_rgba(30,156,168,0.6)]"
            }`}
          >
            {t(copy.nav.book)}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle locale={locale} setLocale={setLocale} onTeal={onTeal} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-5 bg-current transition-transform duration-400 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform duration-400 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-bone text-teal-900 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-teal-500/10 py-3.5 text-sm font-medium"
                >
                  {t(l.label)}
                </a>
              ))}
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-full bg-teal-500 py-3.5 text-center text-sm font-semibold text-white"
              >
                {t(copy.nav.book)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangToggle({
  locale,
  setLocale,
  onTeal,
}: {
  locale: "el" | "en";
  setLocale: (l: "el" | "en") => void;
  onTeal: boolean;
}) {
  return (
    <div
      className={`relative flex items-center rounded-full p-0.5 text-[0.68rem] font-semibold tracking-widest ${
        onTeal ? "bg-white/15" : "bg-teal-500/10"
      }`}
    >
      {(["el", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className="relative z-10 px-2.5 py-1 uppercase transition-colors duration-300"
          style={{
            color:
              locale === l
                ? onTeal
                  ? "var(--color-teal-700)"
                  : "#fff"
                : "currentColor",
          }}
        >
          {l}
          {locale === l && (
            <motion.span
              layoutId="lang-pill"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className={`absolute inset-0 -z-10 rounded-full ${onTeal ? "bg-white" : "bg-teal-500"}`}
            />
          )}
        </button>
      ))}
    </div>
  );
}
