"use client";

const ITEMS = [
  "● Pipeline ativo",
  "143 capturados hoje",
  "Rafael Costa → enriched ✦",
  "89 sync'd HubSpot",
  "Apollo: 12 créditos",
  "Ana Lima → enriched ✦",
  "Score de intenção: alto",
  "Bruno Rocha → processando",
  "Batch export OK",
  "Org Chart atualizado",
  "Dado original preservado",
  "CRM sync: enriched=true",
];

export default function DataStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative h-9 overflow-hidden border-y border-white/[0.04] bg-[#040608] flex items-center select-none">
      <div
        className="flex items-center whitespace-nowrap"
        style={{ animation: "ticker 40s linear infinite", willChange: "transform" }}>
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[9px] text-white/[0.18] px-5 shrink-0 tracking-wide">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
