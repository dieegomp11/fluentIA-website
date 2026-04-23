"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star, ArrowRight } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const planMeta = [
  { icon: "⭐", badge: "Mejor precio", badgeColor: "#f59e0b", featured: false, extraProfPrice: undefined as number | undefined },
  { icon: "📊", badge: "Innovador",    badgeColor: "#0891b2", featured: false, extraProfPrice: undefined },
  { icon: "🧾", badge: "Más vendido",  badgeColor: "#d4145a", featured: false, extraProfPrice: 4 },
  { icon: "🤖", badge: "Más popular",  badgeColor: "#d4145a", featured: true,  extraProfPrice: 7 },
  { icon: "📅", badge: "Mejor valorado", badgeColor: "#10b981", featured: false, extraProfPrice: 15, contactPrice: true },
  { icon: "🛒", badge: "Todo incluido",  badgeColor: "#2563eb", featured: false, extraProfPrice: undefined, contactPrice: true },
];

const planPrices = [
  { priceMonthly: "12,90", priceAnnual: "9,90" },
  { priceMonthly: "17,90", priceAnnual: "14,90" },
  { priceMonthly: "29,90", priceAnnual: "19,90" },
  { priceMonthly: "49,90", priceAnnual: "39,90" },
  { priceMonthly: "89,90", priceAnnual: "79,90" },
  { priceMonthly: "179,90", priceAnnual: "149,90" },
];

function PricingCard({
  index,
}: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isAnnual, setIsAnnual] = useState(true);
  const { t } = useT();
  const p = t.pricing;
  const pl = t.pricing;

  const meta = planMeta[index];
  const prices = planPrices[index];
  const price = isAnnual ? prices.priceAnnual : prices.priceMonthly;

  // Get plan-specific content from translations
  const plans = [
    {
      title: index === 0 ? "Contestador de reseñas IA" : undefined,
      features: t.solutions.items[index]?.features ?? [],
    }
  ];
  // Use solutions items for features, pricing section for labels
  const sItem = t.solutions.items[index];

  const { icon, badge, badgeColor, featured, extraProfPrice } = meta;
  const contactPrice = (meta as { contactPrice?: boolean }).contactPrice ?? false;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        featured
          ? { y: -6, scale: 1.02 }
          : { y: -8, boxShadow: "0 24px 48px rgba(26,43,95,0.10)" }
      }
      className={`card-shine relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        featured
          ? "featured-glow bg-[#0e1a3d] border-[#d4145a]/40"
          : "bg-white border-[#e8edf5]"
      }`}
    >
      {/* Badge */}
      <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-px">
        <div
          className="flex items-center gap-1.5 px-4 py-1 rounded-b-xl text-[11px] font-bold text-white"
          style={{ backgroundColor: badgeColor }}
        >
          <Star size={10} weight="fill" />
          {badge}
        </div>
      </div>

      <div className="p-5 pt-8 flex flex-col flex-1">
        {/* Icon */}
        <div className="text-2xl mb-3 text-center">{icon}</div>

        {/* Title */}
        <h3 className={`text-base font-bold mb-1.5 leading-snug text-center ${featured ? "text-white" : "text-[#0f172a]"}`}>
          {sItem?.title ?? ""}
        </h3>
        <p className={`text-xs leading-relaxed mb-4 ${featured ? "text-[#94a3b8]" : "text-[#64748b]"}`}>
          {sItem?.desc ?? ""}
        </p>

        {/* Billing toggle — oculto si el precio es por consulta */}
        {!contactPrice && (
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setIsAnnual(true)}
              className={`text-xs font-semibold transition-colors ${
                isAnnual
                  ? featured ? "text-white" : "text-[#0f172a]"
                  : featured ? "text-[#475569]" : "text-[#94a3b8]"
              }`}
            >
              {p.annual}
            </button>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                !isAnnual ? "bg-[#d4145a]" : featured ? "bg-[#1e3575]" : "bg-[#e2e8f0]"
              }`}
              aria-label="Toggle billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  !isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-xs font-semibold transition-colors ${
                !isAnnual
                  ? featured ? "text-white" : "text-[#0f172a]"
                  : featured ? "text-[#475569]" : "text-[#94a3b8]"
              }`}
            >
              {p.monthly}
            </button>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          {contactPrice ? (
            <div className="flex flex-col gap-1">
              <span className={`text-xl font-extrabold tracking-tight ${featured ? "text-white" : "text-[#0f172a]"}`}>
                {p.contactPrice}
              </span>
              <p className={`text-xs ${featured ? "text-[#64748b]" : "text-[#94a3b8]"}`}>
                {p.contactPriceSub}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                key={price}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-baseline gap-1"
              >
                <span className={`text-3xl font-extrabold tracking-tight ${featured ? "text-white" : "text-[#0f172a]"}`}>
                  {price}€
                </span>
                <span className={`text-sm font-medium whitespace-nowrap ${featured ? "text-[#94a3b8]" : "text-[#64748b]"}`}>
                  {p.perMonth}
                </span>
              </motion.div>
              <p className={`text-xs mt-1 ${featured ? "text-[#64748b]" : "text-[#94a3b8]"}`}>
                {isAnnual ? p.billingAnnual : p.billingMonthly}
              </p>
              {extraProfPrice && (
                <p className={`text-xs mt-0.5 ${featured ? "text-[#475569]" : "text-[#94a3b8]"}`}>
                  {p.extraProf}: +{extraProfPrice}€ + IVA / mes
                </p>
              )}
            </>
          )}
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-5 flex-1">
          {(sItem?.features ?? []).map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${featured ? "bg-[#d4145a]" : "bg-[#f8f9fc] border border-[#e8edf5]"}`}>
                <Check size={10} weight="bold" className={featured ? "text-white" : "text-[#2563eb]"} />
              </div>
              <span className={`text-xs leading-snug ${featured ? "text-[#cbd5e1]" : "text-[#475569]"}`}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
            featured
              ? "bg-[#d4145a] text-white shadow-lg shadow-[#d4145a]/30 hover:bg-[#b01049]"
              : "bg-[#f8f9fc] border border-[#e8edf5] text-[#0f172a] hover:border-[#1a2b5f] hover:text-[#1a2b5f]"
          }`}
        >
          {pl.cta}
          <ArrowRight size={14} weight="bold" />
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { t } = useT();
  const p = t.pricing;

  return (
    <section id="precios" className="pt-8 pb-14 md:pb-24 lg:pt-14 lg:pb-32 bg-white scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-[#d4145a] uppercase tracking-widest mb-4"
          >
            {p.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.15] tracking-tight mb-4"
          >
            {p.heading[0]}{" "}
            <span className="text-gradient-fuchsia">{p.heading[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#64748b] leading-relaxed"
          >
            {p.sub}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 items-stretch">
          {planMeta.map((_, i) => (
            <PricingCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
