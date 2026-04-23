"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT();
  const f = t.footer;

  return (
    <footer className="relative bg-[#0e1a3d] text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-[#d4145a] opacity-[0.06] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-[#2563eb] opacity-[0.06] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo2.png`}
              alt="fluentIA"
              width={130}
              height={38}
              className="mb-5"
            />
            <p className="text-[#8898b0] text-sm leading-relaxed max-w-[220px]">
              {f.tagline}
            </p>
          </div>

          {/* Nav columns */}
          {f.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8898b0] hover:text-white transition-colors underline-animate"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748b]">
            © {new Date().getFullYear()} fluentIA. {f.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#64748b] hover:text-white transition-colors underline-animate">
              {f.privacy}
            </a>
            <a href="#" className="text-xs text-[#64748b] hover:text-white transition-colors underline-animate">
              {f.terms}
            </a>
            <a href="#" className="text-xs text-[#64748b] hover:text-white transition-colors underline-animate">
              {f.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
