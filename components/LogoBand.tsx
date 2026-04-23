"use client";

const companiesRow1 = [
  "ALSEPER",
  "COPY ATITALA",
  "CLÍNICA SANTACREU",
  "LOGISTICS MARTINEZ",
  "PAPELERÍA GARCÉS",
  "BEAUTY CENTER BCN",
  "AGRO CAMPOS",
  "SOLUCIONES TECH",
];

const companiesRow2 = [
  "GESTORÍA RUIZ",
  "INMOBILIARIA PALMA",
  "TALLERES MORENO",
  "ESTUDIO CRÉA",
  "CLÍNICA DENTAL VERA",
  "ASESORÍA DIGITAL",
  "TRANSPORTE LORCA",
  "FOTÓGRAFA SANTOS",
];

function LogoItem({ name, dot }: { name: string; dot?: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: dot ?? "var(--fuchsia)", opacity: 0.55 }}
      />
      <span className="text-sm font-bold text-[#64748b] tracking-wide uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoBand() {
  const doubled1 = [...companiesRow1, ...companiesRow1];
  const doubled2 = [...companiesRow2, ...companiesRow2];

  return (
    <section className="py-10 border-y border-[#e8edf5] bg-[#f8f9fc] overflow-hidden">
      <p className="text-center text-[11px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-7">
        Empresas que confían en fluentIA
      </p>

      {/* Row 1 — left to right */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track flex items-center gap-10 w-max">
          {doubled1.map((name, i) => (
            <LogoItem key={`r1-${name}-${i}`} name={name} dot="var(--fuchsia)" />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track-reverse flex items-center gap-10 w-max">
          {doubled2.map((name, i) => (
            <LogoItem key={`r2-${name}-${i}`} name={name} dot="var(--blue)" />
          ))}
        </div>
      </div>
    </section>
  );
}
