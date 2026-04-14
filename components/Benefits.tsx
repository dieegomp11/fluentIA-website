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

const benefits = [
  {
    icon: Clock,
    color: "#d4145a",
    bg: "bg-pink-50",
    title: "Ahorra tiempo",
    desc: "Automatiza tareas repetitivas y enfócate en lo que realmente importa: hacer crecer tu negocio.",
  },
  {
    icon: CurrencyEur,
    color: "#2563eb",
    bg: "bg-blue-50",
    title: "Reduce costes",
    desc: "Menos errores, menos retrabajos y procesos más eficientes que se traducen en ahorro directo.",
  },
  {
    icon: ChartLine,
    color: "#10b981",
    bg: "bg-emerald-50",
    title: "Toma mejores decisiones",
    desc: "Accede a información clara y actualizada para decidir con seguridad y agilidad.",
  },
  {
    icon: Smiley,
    color: "#f59e0b",
    bg: "bg-amber-50",
    title: "Mejora la experiencia de tus clientes",
    desc: "Atención más rápida, personalizada y disponible 24/7 gracias a la automatización y la IA.",
  },
  {
    icon: ShieldCheck,
    color: "#6366f1",
    bg: "bg-indigo-50",
    title: "Cumple con la normativa",
    desc: "Soluciones adaptadas a la legislación vigente para que tu empresa esté siempre protegida.",
  },
  {
    icon: Rocket,
    color: "#d4145a",
    bg: "bg-pink-50",
    title: "Escala sin límites",
    desc: "Nuestras soluciones crecen contigo. Desde pequeñas empresas hasta grandes organizaciones.",
  },
];

function BenefitCard({
  icon: Icon,
  color,
  bg,
  title,
  desc,
  index,
}: (typeof benefits)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 48px ${color}18`,
        borderColor: color + "40",
      }}
      className="card-shine group relative bg-white rounded-2xl border border-[#e8edf5] p-7 cursor-default transition-all duration-300"
    >
      {/* Icon */}
      <div
        className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={24} weight="duotone" style={{ color }} />
      </div>

      {/* Content */}
      <h3 className="text-base font-bold text-[#0f172a] mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

export default function Benefits() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="beneficios" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            Beneficios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
          >
            Más eficiencia.{" "}
            <span className="text-[#94a3b8]">Menos complicaciones.</span>{" "}
            <span className="text-gradient-fuchsia">Más crecimiento.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-[#475569] leading-relaxed"
          >
            Pensadas para autónomos y empresas que quieren crecer sin perder tiempo en tareas repetitivas.
          </motion.p>
        </div>

        {/* Cards grid — asymmetric layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>

        {/* Mission banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="noise-bg relative mt-16 bg-[#0e1a3d] rounded-3xl p-10 lg:p-14 overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4145a] opacity-10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-[#2563eb] opacity-10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-[#d4145a]/20 flex items-center justify-center shrink-0">
              <Users size={32} weight="duotone" className="text-[#d4145a]" />
            </div>
            <div className="flex-1">
              <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wide">
                Nuestro objetivo
              </p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
                Democratizar la tecnología
              </h3>
              <p className="text-[#94a3b8] leading-relaxed max-w-xl">
                Hacemos que la inteligencia artificial y la automatización sean accesibles, útiles y
                rentables para cualquier empresa.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:min-w-[260px]">
              {[
                "Tecnología avanzada al alcance de todos",
                "Soluciones asequibles y sin complicaciones",
                "Implementación rápida y acompañamiento cercano",
                "Resultados reales desde el primer día",
              ].map((item) => (
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
