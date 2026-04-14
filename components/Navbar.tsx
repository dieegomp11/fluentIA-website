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

      {/* Mobile: logo centrado + toggle derecha */}
      <div className="lg:hidden relative flex items-center justify-center max-w-7xl mx-auto px-6 h-28">
        <a href="#inicio" className="flex items-center">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`} alt="fluentIA" width={140} height={40} priority />
        </a>
        <button
          className="absolute right-6 p-2 rounded-lg text-[#334155] hover:bg-[#f8f9fc] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile menu — pantalla completa, desliza desde la derecha */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col"
          >
            {/* Cabecera del menú fullscreen */}
            <div className="flex items-center justify-between px-6 h-28 border-b border-[#e8edf5] shrink-0">
              <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`} alt="fluentIA" width={140} height={40} priority={false} />
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
                Solicitar demo
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
