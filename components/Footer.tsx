"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT();
  const f = t.footer;

  return (
    <footer className="bg-[#222846] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo2.png`}
              alt="fluentIA"
              width={130}
              height={38}
              className="mb-5"
            />
            <p className="text-[#64748b] text-sm leading-relaxed max-w-[220px]">
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
                      className="text-sm text-[#64748b] hover:text-white transition-colors"
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
        <div className="mt-16 pt-8 border-t border-[#1e3575] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#475569]">
            © {new Date().getFullYear()} fluentIA. {f.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#475569] hover:text-white transition-colors">
              {f.privacy}
            </a>
            <a href="#" className="text-xs text-[#475569] hover:text-white transition-colors">
              {f.terms}
            </a>
            <a href="#" className="text-xs text-[#475569] hover:text-white transition-colors">
              {f.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
