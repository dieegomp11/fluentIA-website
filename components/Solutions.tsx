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

const solutions = [
  {
    icon: Star,
    color: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#fbbf24",
    badge: "Reseñas",
    title: "Contestador de reseñas IA",
    desc: "Lee y responde automáticamente las reseñas de tu negocio. Las positivas las agradece al instante; las negativas te avisa y te ayuda a construir la mejor respuesta.",
    features: ["Respuesta automática a reseñas 4-5 ★", "Alerta al propietario ante reseñas negativas", "Asistente para redactar respuestas difíciles", "Hoteles, restaurantes, clínicas y comercios"],
    price: "Desde 9,90€",
    href: "#precios",
  },
  {
    icon: ChartBar,
    color: "#0891b2",
    gradientFrom: "#0891b2",
    gradientTo: "#22d3ee",
    badge: "Análisis",
    title: "Comparador de reseñas",
    desc: "Analiza las reseñas de tu competencia más cercana y te da un informe claro de dónde estás mejor y dónde puedes mejorar para ganarles clientes.",
    features: ["Monitorización de competidores cercanos", "Informe comparativo automático semanal", "Detecta puntos fuertes y débiles del sector", "Ideal para hoteles, restaurantes y servicios"],
    price: "Desde 14,90€",
    href: "#precios",
  },
  {
    icon: Receipt,
    color: "#d4145a",
    gradientFrom: "#d4145a",
    gradientTo: "#ff6b9d",
    badge: "Finanzas",
    title: "Facturación y deducciones automáticas",
    desc: "Ideal para autónomos, freelances y pequeñas empresas que dedican demasiado tiempo a la gestión administrativa y fiscal.",
    features: ["Electricistas y fontaneros", "Viajantes y comerciales", "Pequeños comercios y tiendas", "Estudios y despachos profesionales"],
    price: "Desde 19,90€",
    href: "#precios",
  },
  {
    icon: Robot,
    color: "#7c3aed",
    gradientFrom: "#7c3aed",
    gradientTo: "#a855f7",
    badge: "IA · Nuevo",
    title: "Nova IA — La IA de tu empresa",
    desc: "Para negocios con mucha documentación interna: procedimientos, presupuestos, licitaciones e historiales que nadie tiene tiempo de consultar.",
    features: ["Constructoras y empresas de obra", "Asesorías y gestorías", "Despachos jurídicos y notarías", "Pymes con equipos y procesos complejos"],
    price: "Desde 39,90€",
    href: "#precios",
  },
  {
    icon: CalendarCheck,
    color: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#34d399",
    badge: "Agenda",
    title: "Agenda inteligente con chatbot",
    desc: "Pensada para negocios donde la gestión de citas y la atención al cliente consumen horas de trabajo cada día.",
    features: ["Clínicas, dentistas y centros de salud", "Peluquerías y centros de estética", "Academias y centros formativos", "Talleres mecánicos y servicios técnicos"],
    price: "Desde 124,90€",
    href: "#precios",
  },
  {
    icon: ShoppingCart,
    color: "#2563eb",
    gradientFrom: "#2563eb",
    gradientTo: "#60a5fa",
    badge: "Ventas",
    title: "Sistema IA de pedidos",
    desc: "Para negocios con alto volumen de pedidos o ventas donde los errores manuales y la falta de control generan pérdidas.",
    features: ["Restaurantes y bares con carta digital", "Distribuidoras y mayoristas", "E-commerce y tiendas online", "Empresas de logística y reparto"],
    price: "Desde 149,90€",
    href: "#precios",
  },
];

function SolutionCard({
  icon: Icon,
  color,
  gradientFrom,
  gradientTo,
  badge,
  title,
  desc,
  features,
  price,
  href,
  index,
}: (typeof solutions)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300"
      style={{ boxShadow: `0 4px 24px ${color}18` }}
    >
      {/* Gradient header block */}
      <div
        className="relative px-7 pt-8 pb-10"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-20 h-20 rounded-full opacity-10 blur-xl"
          style={{ background: "white" }}
        />

        {/* Icon + Title */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} weight="duotone" className="text-white" />
          </div>
          <h3 className="text-lg font-black text-white leading-snug tracking-tight uppercase">{title}</h3>
        </div>
      </div>

      {/* White body */}
      <div className="flex flex-col flex-1 bg-white px-7 pt-6 pb-7">
        <p className="text-sm text-[#64748b] leading-relaxed mb-5">{desc}</p>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-xs text-[#475569]">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-black"
                style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-[#f1f5f9]">
          <span className="text-sm font-extrabold" style={{ color }}>{price}</span>
          <motion.a
            href={href}
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all"
            style={{ background: `${color}12`, color }}
          >
            Ver solución
            <ArrowRight size={13} weight="bold" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="soluciones" className="py-24 lg:py-32 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            Soluciones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
          >
            Soluciones{" "}
            <span className="text-gradient-fuchsia">inteligentes</span>{" "}
            para cada área de tu negocio
          </motion.h2>
        </div>

        {/* Cards — 2x3 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <SolutionCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
