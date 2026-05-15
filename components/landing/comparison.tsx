"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/landing/reveal";

const ROWS = [
  {
    before: "Dado original sobrescrito no primeiro enriquecimento. O que o SDR capturou, desaparece.",
    after: "Dado original intacto. A versão enriquecida fica ao lado, rastreável e auditável por usuário.",
  },
  {
    before: "Sem rastreabilidade de consumo por membro do time. O gestor não sabe quem gastou o quê.",
    after: "Cada crédito Apollo registrado por contato e por membro. Visibilidade total de custo.",
  },
  {
    before: "Contexto de mercado zerado. CNAE, Serasa e Receita Federal ficam de fora do perfil.",
    after: "CNAE, Serasa, score e Receita Federal dentro do perfil. Contexto Brasil nativo, sem gambiarra.",
  },
  {
    before: "CRM desatualizado porque sincronizar manualmente não escala. Lead chega frio.",
    after: "Sync automático com HubSpot via batch. Campo enriched=true para rastreabilidade no CRM.",
  },
  {
    before: "SDR aborda sem contexto sobre cargo atual, tempo na empresa ou momento de compra.",
    after: "Brand Sector, score de intenção e Org Chart entregues antes da primeira mensagem do SDR.",
  },
];

export default function LandingComparison() {
  return (
    <section id="comparacao" className="py-28 px-6 bg-[#080B10]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Reveal className="mb-14"><div>
          <p className="text-[9px] font-bold text-[#8A5CF5] uppercase tracking-[0.22em] mb-5">
            O problema que o mercado ignora
          </p>
          <h2
            className="text-white leading-[1.0] mb-5"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}>
            Volume sem qualidade<br />não fecha negócio.
          </h2>
          <p className="text-[15px] text-white/35 max-w-[520px] leading-relaxed">
            A maioria das ferramentas entrega contato. Vero entrega contexto para o seu time fechar.
          </p>
        </div></Reveal>

        {/* Column headers */}
        <div className="hidden md:flex items-center border-b border-white/[0.08] pb-4 mb-0">
          <span className="w-10 shrink-0" />
          <div className="flex-1 grid grid-cols-2 gap-8">
            <span className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.18em]">
              Como funciona hoje
            </span>
            <div className="flex items-center gap-2 pl-8">
              <span className="text-[#10B981]/50 text-[10px]">✦</span>
              <span className="text-[9px] font-semibold text-[#10B981]/50 uppercase tracking-[0.18em]">
                Com Vero.io
              </span>
            </div>
          </div>
        </div>

        {/* Audit rows */}
        {ROWS.map((row, i) => (
          <Reveal key={i} delay={i * 70} className="border-b border-white/[0.04]">
          <div
            className="flex items-start gap-4 py-7 hover:bg-white/[0.012] transition-colors -mx-3 px-3 rounded-lg">
            <span className="font-mono text-[10px] text-white/15 pt-0.5 w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <p className="text-[13px] text-white/25 leading-[1.8] md:pr-4">{row.before}</p>
              <div className="flex items-start gap-2.5 md:pl-8 md:border-l md:border-white/[0.06]">
                <span className="text-[#10B981] shrink-0 text-[11px] mt-0.5">✦</span>
                <p className="text-[13px] text-white/80 leading-[1.8]">{row.after}</p>
              </div>
            </div>
          </div>
          </Reveal>
        ))}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10">
          <p className="text-[11px] text-[#10B981]/65 font-semibold tracking-wide">
            Resultado: abordagem com contexto, ciclo mais curto, taxa de resposta maior.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white font-semibold text-[13px] px-6 py-3.5 rounded-xl transition-all shrink-0"
            style={{ boxShadow: "0 0 20px rgba(138,92,245,0.4)" }}>
            Ver na prática <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
