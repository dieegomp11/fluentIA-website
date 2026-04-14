"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Precios", href: "#precios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
      {/* Desktop: 3-col grid so logo always sits centered between equal-width link groups */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center max-w-7xl mx-auto px-6 lg:px-8 h-28">

        {/* Left nav links — pushed right against the logo */}
        <nav className="flex items-center gap-1 justify-end pr-8">
          {links.slice(0, 3).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-[#334155] hover:text-[#1a2b5f] transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#d4145a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* Logo — center column */}
        <a href="#inicio" className="flex items-center justify-center">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
              alt="fluentIA"
              width={240}
              height={72}
              priority
              className="h-[90px] w-auto"
            />
          </motion.div>
        </a>

        {/* Right nav links — pulled left against the logo, CTA at far right */}
        <div className="flex items-center gap-1 pl-8">
          {links.slice(3).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-[#334155] hover:text-[#1a2b5f] transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#d4145a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </a>
          ))}
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="ml-auto px-5 py-2.5 rounded-full bg-[#d4145a] text-white text-sm font-semibold shadow-md shadow-[#d4145a]/20 hover:bg-[#b01049] transition-colors"
          >
            Solicitar demo
          </motion.a>
        </div>
      </div>

      {/* Mobile: logo left + toggle */}
      <div className="lg:hidden flex items-center justify-between max-w-7xl mx-auto px-6 h-28">
        <a href="#inicio" className="flex items-center shrink-0">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`} alt="fluentIA" width={140} height={40} priority />
        </a>
        <button
          className="p-2 rounded-lg text-[#334155] hover:bg-[#f8f9fc] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-[#e8edf5] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-[#334155] border-b border-[#f1f5f9] last:border-0 hover:text-[#d4145a] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 px-5 py-2.5 rounded-full bg-[#d4145a] text-white text-sm font-semibold text-center"
              >
                Solicitar demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
