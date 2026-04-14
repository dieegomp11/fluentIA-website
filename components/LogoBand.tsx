"use client";

const companies = [
  "ALSEPER",
  "COPY ATITALA",
  "CLÍNICA SANTACREU",
  "LOGISTICS MARTINEZ",
  "PAPELERÍA GARCÉS",
  "BEAUTY CENTER BCN",
  "AGRO CAMPOS",
  "SOLUCIONES TECH",
];

export default function LogoBand() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-12 border-y border-[#e8edf5] bg-[#f8f9fc] overflow-hidden">
      <p className="text-center text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-8">
        Empresas que confían en fluentIA
      </p>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex items-center gap-12 w-max">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 shrink-0"
            >
              {/* Stylized logo placeholder — dot + name */}
              <span className="w-2 h-2 rounded-full bg-[#d4145a] opacity-60 shrink-0" />
              <span className="text-sm font-bold text-[#64748b] tracking-wide uppercase whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
