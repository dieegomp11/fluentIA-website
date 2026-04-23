"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  CurrencyEur,
  ChartLine,
  Smiley,
  ShieldCheck,
  Rocket,
  Users,
} from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const icons = [Clock, CurrencyEur, ChartLine, Smiley, ShieldCheck, Rocket];
const colors = ["#d4145a", "#2563eb", "#10b981", "#f59e0b", "#6366f1", "#d4145a"];
const bgs    = ["bg-pink-50", "bg-blue-50", "bg-emerald-50", "bg-amber-50", "bg-indigo-50", "bg-pink-50"];

export default function Benefits() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t } = useT();
  const b = t.benefits;

  return (
    <section id="beneficios" className="relative py-20 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#fce7f3] to-transparent opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#e0ecff] to-transparent opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {b.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
          >
            {b.heading[0]}{" "}
            <span className="text-[#94a3b8]">{b.heading[1]}</span>{" "}
            <span className="text-gradient-fuchsia">{b.heading[2]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-[#475569] leading-relaxed"
          >
            {b.sub}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {b.items.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];
            const bg = bgs[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, boxShadow: `0 20px 48px ${color}18`, borderColor: color + "40" }}
                className="card-shine group relative bg-white rounded-2xl border border-[#e8edf5] p-7 cursor-default transition-all duration-300"
              >
                <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} weight="duotone" style={{ color }} />
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{item.desc}</p>
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
                  style={{ background: color }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mission banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="noise-bg relative mt-16 bg-[#0e1a3d] rounded-3xl p-10 lg:p-14 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4145a] opacity-10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-[#2563eb] opacity-10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="floating w-16 h-16 rounded-2xl bg-[#d4145a]/20 flex items-center justify-center shrink-0">
              <Users size={32} weight="duotone" className="text-[#d4145a]" />
            </div>
            <div className="flex-1">
              <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wide">
                {b.missionLabel}
              </p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
                {b.missionTitle}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed max-w-xl">
                {b.missionDesc}
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:min-w-[260px]">
              {b.missionItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#94a3b8] leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4145a] mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
