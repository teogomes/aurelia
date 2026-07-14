"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { L10n, Locale } from "@/site.config";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Resolve a bilingual string (or pass through a plain one). */
  t: (value: L10n | string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "aurelia.locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("el");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "el" || stored === "en") setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (value: L10n | string) => (typeof value === "string" ? value : value[locale]),
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
