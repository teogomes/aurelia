"use client";

import { Mark } from "./Mark";
import { useLang } from "@/lib/i18n";
import { site } from "@/site.config";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();

  return (
    <a href="#top" className="group flex items-center gap-3" aria-label={site.name}>
      <Mark className="h-9 w-9 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span className="wordmark text-[1.35rem] leading-none">AURELIA</span>
        {!compact && (
          <span className="mt-[3px] text-[0.5rem] font-medium uppercase tracking-[0.3em] opacity-70">
            {t(site.subname)}
          </span>
        )}
      </span>
    </a>
  );
}
