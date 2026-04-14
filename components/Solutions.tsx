"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  Receipt,
  CalendarCheck,
  Robot,
  ArrowRight,
  Star,
  ChartBar,
} from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const icons = [Star, ChartBar, Receipt, Robot, CalendarCheck, ShoppingCart];
const colors = ["#f59e0b", "#0891b2", "#d4145a", "#7c3aed", "#10b981", "#2563eb"];
const gradients: [string, string][] = [
  ["#f59e0b", "#fbbf24"],
  ["#0891b2", "#22d3ee"],
  ["#d4145a", "#ff6b9d"],
  ["#7c3aed", "#a855f7"],
  ["#10b981", "#34d399"],
  ["#2563eb", "#60a5fa"],
];

export default function Solutions() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t } = useT();
  const s = t.solutions;

  return (
    <section id="soluciones" className="py-20 md:py-24 lg:py-32 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {s.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
          >
            {s.heading[0]}{" "}
            <span className="text-gradient-fuchsia">{s.heading[1]}</span>{" "}
            {s.heading[2]}
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];
            const [gradFrom, gradTo] = gradients[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300"
                style={{ boxShadow: `0 4px 24px ${color}18` }}
              >
                {/* Gradient header block */}
                <div
                  className="relative px-7 pt-8 pb-10"
                  style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                >
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20" style={{ background: "white" }} />
                  <div className="absolute bottom-0 left-1/2 w-20 h-20 rounded-full opacity-10 blur-xl" style={{ background: "white" }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} weight="duotone" className="text-white" />
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug tracking-tight uppercase">{item.title}</h3>
                  </div>
                </div>

                {/* White body */}
                <div className="flex flex-col flex-1 bg-white px-7 pt-6 pb-7">
                  <p className="text-sm text-[#64748b] leading-relaxed mb-5">{item.desc}</p>
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-[#475569]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-black"
                          style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-5 border-t border-[#f1f5f9]">
                    <span className="text-sm font-extrabold" style={{ color }}>{item.price}</span>
                    <motion.a
                      href="#precios"
                      whileHover={{ x: 3 }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all"
                      style={{ background: `${color}12`, color }}
                    >
                      {s.viewSolution}
                      <ArrowRight size={13} weight="bold" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
