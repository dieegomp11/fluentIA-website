"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  WhatsappLogo,
  Phone,
  Question,
  Warning,
} from "@phosphor-icons/react";
import { useRef, useState, useEffect } from "react";

// — Chat sequences: 3 preguntas + 3 respuestas por conversación
const sequences = [
  [
    { type: "user", text: "Hola, ¿me podéis explicar qué incluye el plan de agenda?" },
    { type: "bot",  text: "¡Claro! Incluye gestión automática de citas, recordatorios y atención 24/7." },
    { type: "user", text: "¿Y puedo hablar con alguien del equipo?" },
    { type: "bot",  text: "Por supuesto. ¿Te agendo una llamada para hoy o mañana?" },
    { type: "user", text: "Mañana a las 11 h me va bien." },
    { type: "bot",  text: "✓ Llamada confirmada para mañana a las 11:00 h. ¡Hasta entonces!" },
  ],
  [
    { type: "user", text: "¿Cuánto cuesta el contestador de reseñas?" },
    { type: "bot",  text: "Desde 9,90 €/mes en plan anual o 12,90 €/mes sin permanencia." },
    { type: "user", text: "¿Funciona con Google Maps?" },
    { type: "bot",  text: "Sí, se integra directamente con Google y tus reseñas en Maps." },
    { type: "user", text: "¿Hay disponibilidad para empezar esta semana?" },
    { type: "bot",  text: "✓ Sí, podemos tenerte operativo en menos de 24 horas." },
  ],
  [
    { type: "user", text: "Soy cliente, quiero reportar una incidencia." },
    { type: "bot",  text: "Entendido. ¿Me indicas tu empresa y describes brevemente el problema?" },
    { type: "user", text: "Somos Clínica Sur, la agenda no sincroniza desde ayer." },
    { type: "bot",  text: "✓ Incidencia registrada. El equipo técnico te contactará en menos de 2 h." },
    { type: "user", text: "Gracias, ¿puedo seguir el estado del ticket?" },
    { type: "bot",  text: "Sí, te envío ahora mismo el enlace de seguimiento por este chat." },
  ],
  [
    { type: "user", text: "Quiero contratar el plan de facturación automática." },
    { type: "bot",  text: "¡Perfecto! Desde 19,90 €/mes. Te activo el alta ahora mismo." },
    { type: "user", text: "¿Hay algo más que me recomiendas para mi negocio?" },
    { type: "bot",  text: "Sí, muchos clientes combinan facturación con el contestador de reseñas IA." },
    { type: "user", text: "Interesante, ¿qué precio tiene?" },
    { type: "bot",  text: "✓ Desde 9,90 €/mes. Te incluyo los dos en el alta si quieres." },
  ],
];

const chips = [
  { Icon: WhatsappLogo, label: "Bot IA por WhatsApp" },
  { Icon: Phone,        label: "Agenda una llamada" },
  { Icon: Question,     label: "Precios y disponibilidad" },
  { Icon: Warning,      label: "Incidencias y gestiones" },
];

// Delay between messages in a sequence (ms)
const MSG_DELAY_MS = 900;
// How long to pause after the last message before cycling (ms)
const CYCLE_PAUSE_MS = 2800;

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] block"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, delay: i * 0.18, duration: 0.65 }}
        />
      ))}
    </div>
  );
}

// Tiempo que tarda el grupo saliente en hacer fade-out (debe coincidir con exit duration)
const EXIT_MS = 350;

function AIChatMockup() {
  const [seqIdx, setSeqIdx] = useState(0);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    setShownCount(0);
    const msgs = sequences[seqIdx];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Los mensajes empiezan a aparecer después del fade-out del grupo anterior
    msgs.forEach((_, i) => {
      timers.push(
        setTimeout(() => setShownCount(i + 1), EXIT_MS + (i + 1) * MSG_DELAY_MS)
      );
    });

    const totalMs = EXIT_MS + msgs.length * MSG_DELAY_MS + CYCLE_PAUSE_MS;
    timers.push(
      setTimeout(() => setSeqIdx((prev) => (prev + 1) % sequences.length), totalMs)
    );

    return () => timers.forEach(clearTimeout);
  }, [seqIdx]);

  const msgs = sequences[seqIdx];
  const showTyping =
    shownCount > 0 && shownCount < msgs.length && msgs[shownCount]?.type === "bot";

  return (
    <div className="w-full max-w-[480px] ml-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: -6 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-[#e8edf5] shadow-2xl shadow-[#1a2b5f]/10 overflow-hidden flex flex-col"
        style={{ minHeight: 520 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f1f5f9] bg-[#f8f9fc]">
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm border border-[#e8edf5] shrink-0">
            <Image src="/logo3.png" alt="fluentIA" width={110} height={28} className="h-7 w-auto" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-light text-[#64748b] tracking-widest text-[11px]">assistant</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] text-[#94a3b8] font-medium tracking-wide">En línea · IA activa</span>
            </div>
          </div>
        </div>

        {/* Chat area — flex-1 para ocupar el espacio del card de altura fija */}
        <div className="px-5 py-4 flex flex-col gap-2.5 flex-1 overflow-hidden">
          {/* Envolvemos el grupo en AnimatePresence mode="wait" para que
              el antiguo haga fade-out ANTES de que aparezca el nuevo.
              Así nunca hay un flash de blank: el card siempre tiene contenido. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={seqIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: EXIT_MS / 1000 }}
              className="flex flex-col gap-2.5"
            >
              {msgs.slice(0, shownCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, x: msg.type === "user" ? 12 : -12 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12px] font-medium leading-snug ${
                      msg.type === "user"
                        ? "bg-[#1a2b5f] text-white rounded-tr-sm"
                        : "bg-[#f8f9fc] text-[#334155] border border-[#e8edf5] rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </span>
                </motion.div>
              ))}

              {showTyping && (
                <motion.div
                  key={`typing-${shownCount}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#f8f9fc] border border-[#e8edf5] rounded-2xl rounded-tl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Automation chips */}
        <div className="px-5 pb-5 flex flex-wrap gap-2">
          {chips.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9fc] border border-[#e8edf5] rounded-full"
            >
              <Icon size={12} weight="duotone" className="text-[#d4145a]" />
              <span className="text-[10px] font-semibold text-[#475569]">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center pt-28 overflow-hidden bg-white"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 20);
        mouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 20);
      }}
    >
      {/* Background blobs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-10 right-0 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#f0f7ff] to-[#e8f0fe] opacity-60 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -bottom-20 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#fdf2f8] to-[#fce7f3] opacity-50 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-8 pb-20 lg:pt-12 lg:pb-28">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

          {/* Left — text */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3.6rem] sm:text-[4.6rem] lg:text-[6.2rem] font-extrabold text-[#0f172a] leading-[1.04] tracking-tight mb-6"
            >
              Al alcance de{" "}
              <span className="text-gradient-fuchsia">todas</span>{" "}
              las empresas.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[1.1rem] text-[#475569] leading-relaxed mb-10"
            >
              En fluentIA creamos soluciones que automatizan, simplifican y se
              adaptan a la medida de tu empresa. Empieza hoy, crece sin límites.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4145a] text-white font-semibold text-sm shadow-lg shadow-[#d4145a]/30 hover:bg-[#b01049] transition-colors"
              >
                Solicitar demo gratis
                <ArrowRight size={16} weight="bold" />
              </motion.a>
              <motion.a
                href="#soluciones"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#e8edf5] text-[#334155] font-semibold text-sm hover:border-[#1a2b5f] hover:text-[#1a2b5f] transition-colors bg-white"
              >
                Conocer soluciones
              </motion.a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {["Ahorra tiempo", "Reduce costes", "Toma mejores decisiones"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] px-3 py-1.5 rounded-full bg-[#f8f9fc] border border-[#e8edf5]"
                >
                  <CheckCircle size={12} weight="fill" className="text-[#d4145a]" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — AI chat */}
          <AIChatMockup />
        </div>
      </div>
    </section>
  );
}
