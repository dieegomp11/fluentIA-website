"use client";

import { useEffect, useRef, useState } from "react";
import { useT, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ca", label: "CA", flag: "🏴󠁥󠁳󠁣󠁴󠁿" },
];

export default function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const others = LANGS.filter((l) => l.code !== lang);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Active language button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide border border-[#e8edf5] bg-white hover:border-[#d4145a] transition-all shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active.label}`}
      >
        <span className="text-[14px] leading-none">{active.flag}</span>
        <span className="text-[#0f172a]">{active.label}</span>
        <svg
          className={`w-3 h-3 text-[#94a3b8] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-1.5 right-0 bg-white border border-[#e8edf5] rounded-xl shadow-lg shadow-[#1a2b5f]/10 py-1 z-[200] min-w-[90px]"
          role="listbox"
        >
          {others.map(({ code, label, flag }) => (
            <button
              key={code}
              role="option"
              aria-selected={false}
              onClick={() => { setLang(code); setOpen(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-[11px] font-bold text-[#475569] hover:bg-[#f8f9fc] hover:text-[#0f172a] transition-colors"
            >
              <span className="text-[14px] leading-none">{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
