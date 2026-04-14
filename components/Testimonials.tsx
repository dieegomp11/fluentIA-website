"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Heartbeat, Rocket, Users } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const valueIcons = [MapPin, Heartbeat, Rocket, Users];
const valueColors = ["#d4145a", "#2563eb", "#7c3aed", "#10b981"];
const valueBgs    = ["bg-pink-50", "bg-blue-50", "bg-violet-50", "bg-emerald-50"];

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t } = useT();
  const tm = t.testimonials;

  return (
    <section id="nosotros" className="py-20 md:py-24 lg:py-32 bg-[#f8f9fc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {tm.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight mb-4"
          >
            {tm.heading[0]}{" "}
            <span className="text-gradient-fuchsia">{tm.heading[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#64748b] leading-relaxed"
          >
            {tm.sub}
          </motion.p>
        </div>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="noise-bg relative bg-[#0e1a3d] rounded-3xl overflow-hidden mb-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4145a] opacity-10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563eb] opacity-10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#7c3aed] opacity-10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 px-10 py-14 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4145a]/20 border border-[#d4145a]/30 mb-6">
                <MapPin size={13} weight="fill" className="text-[#d4145a]" />
                <span className="text-[11px] font-bold text-[#d4145a] uppercase tracking-widest">{tm.locationBadge}</span>
              </div>
              <h3 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                {tm.bannerTitle[0]}<br />
                <span className="text-[#d4145a]">{tm.bannerTitle[1]}</span>
              </h3>
              <p className="text-[#94a3b8] leading-relaxed max-w-lg">
                {tm.bannerDesc}
              </p>
            </div>

            {/* Right: Spain map */}
            <div className="lg:min-w-[320px] flex flex-col items-center gap-3">
              <div className="relative w-full max-w-[320px] bg-white/5 border border-white/10 rounded-2xl p-4">
                <svg viewBox="0 0 300 225" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.7" fill="white" fillOpacity="0.07" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <rect width="300" height="225" fill="url(#dots)" />
                  <path
                    d="M 45,10 L 33,15 L 20,22 L 14,33 L 27,51 L 23,59 C 38,61 52,65 69,72 C 70,78 72,87 73,82 L 73,95 C 67,107 67,112 69,123 C 68,130 65,141 65,141 C 63,155 58,172 56,182 C 67,182 72,188 80,197 L 95,210 L 99,208 C 110,196 122,192 122,192 C 135,196 148,196 163,190 C 175,185 188,178 202,169 L 207,151 L 207,142 L 211,121 C 218,108 230,95 243,80 L 263,72 L 289,46 C 260,38 233,38 233,38 C 220,32 205,24 177,19 L 135,17 L 93,17 L 45,10 Z"
                    fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.30"
                    strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
                  />
                  <circle cx="176" cy="136" r="20" fill="#d4145a" fillOpacity="0.0">
                    <animate attributeName="r" values="6;20;6" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.25;0;0.25" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="176" cy="136" r="12" fill="#d4145a" fillOpacity="0.0">
                    <animate attributeName="r" values="5;12;5" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
                    <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
                  </circle>
                  <circle cx="176" cy="136" r="5" fill="#d4145a" filter="url(#glow)" />
                  <circle cx="176" cy="136" r="2.5" fill="white" />
                  <text x="184" y="132" fontSize="8.5" fill="white" fillOpacity="0.95" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.3">Albacete</text>
                </svg>
              </div>
              <div className="flex gap-3 w-full max-w-[320px]">
                {tm.stats.map(({ num, label }) => (
                  <div key={label} className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 text-center">
                    <p className="text-lg font-extrabold text-white">{num}</p>
                    <p className="text-[10px] text-[#94a3b8] font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tm.values.map(({ title, desc }, i) => {
            const Icon = valueIcons[i];
            const color = valueColors[i];
            const bg = valueBgs[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, boxShadow: `0 20px 48px ${color}18` }}
                className="card-shine group bg-white rounded-2xl border border-[#e8edf5] p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
              >
                <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} weight="duotone" style={{ color }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] mb-1.5">{title}</h4>
                  <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                </div>
                <motion.div
                  className="h-[2px] rounded-full mt-auto"
                  style={{ background: color }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
