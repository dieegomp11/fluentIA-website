"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";
import LangSwitcher from "@/components/LangSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const n = t.nav;

  const links = [
    { label: n.inicio,     href: "#inicio" },
    { label: n.beneficios, href: "#beneficios" },
    { label: n.soluciones, href: "#soluciones" },
    { label: n.precios,    href: "#precios" },
    { label: n.nosotros,   href: "#nosotros" },
    { label: n.contacto,   href: "#contacto" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinkClass =
    "relative px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#1a2b5f] transition-colors group whitespace-nowrap";
  const underlineClass =
    "absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4145a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#e8edf5] shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* ─── Desktop nav (lg+): flex + absolutely-centred logo ─── */}
      <div className="hidden lg:flex relative items-center max-w-7xl mx-auto px-6 lg:px-8 h-24 xl:h-28 w-full">

        {/* Left half: LangSwitcher far-left, links pushed right toward logo */}
        <div className="flex-1 flex items-center">
          <LangSwitcher className="shrink-0 mr-3" />
          <nav className="flex items-center ml-auto pr-20 xl:pr-24">
            {links.slice(0, 3).map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
                <span className={underlineClass} />
              </a>
            ))}
          </nav>
        </div>

        {/* Logo: absolutely centred in the header */}
        <a href="#inicio" className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
              alt="fluentIA"
              width={220}
              height={66}
              priority
              className="h-[76px] xl:h-[88px] w-auto"
            />
          </motion.div>
        </a>

        {/* Right half: links pushed left toward logo, CTA far-right */}
        <div className="flex-1 flex items-center">
          <nav className="flex items-center pl-20 xl:pl-24">
            {links.slice(3).map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
                <span className={underlineClass} />
              </a>
            ))}
          </nav>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="ml-auto px-4 xl:px-5 py-2.5 rounded-full bg-[#d4145a] text-white text-sm font-semibold shadow-md shadow-[#d4145a]/20 hover:bg-[#b01049] transition-colors whitespace-nowrap"
          >
            {n.cta}
          </motion.a>
        </div>
      </div>

      {/* ─── Mobile/tablet bar (below lg): centred logo + hamburger ─── */}
      <div className="lg:hidden relative flex items-center justify-center max-w-7xl mx-auto px-6 h-20 sm:h-24">
        <a href="#inicio" className="flex items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
            alt="fluentIA"
            width={140}
            height={40}
            priority
            className="h-12 sm:h-14 w-auto"
          />
        </a>
        <button
          className="absolute right-6 p-2 rounded-lg text-[#334155] hover:bg-[#f8f9fc] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* ─── Mobile fullscreen menu ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col"
          >
            {/* Menu header */}
            <div className="flex items-center justify-between px-6 h-20 sm:h-24 border-b border-[#e8edf5] shrink-0">
              <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
                  alt="fluentIA"
                  width={140}
                  height={40}
                  className="h-12 sm:h-14 w-auto"
                />
              </a>
              <button
                className="p-2 rounded-lg text-[#334155] hover:bg-[#f8f9fc] transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="px-6 py-6 flex flex-col flex-1 overflow-y-auto">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setOpen(false)}
                  className="py-5 text-xl font-semibold text-[#0f172a] border-b border-[#f1f5f9] last:border-0 hover:text-[#d4145a] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.06 + 0.05 }}
                onClick={() => setOpen(false)}
                className="mt-8 px-5 py-3.5 rounded-full bg-[#d4145a] text-white text-base font-semibold text-center shadow-lg shadow-[#d4145a]/20"
              >
                {n.cta}
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + links.length * 0.06 + 0.15 }}
                className="mt-6 flex justify-center"
              >
                <LangSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
