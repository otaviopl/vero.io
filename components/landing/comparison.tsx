"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const legacy = [
  "O dado original é sobrescrito no primeiro enriquecimento. O que o SDR capturou, desaparece.",
  "Sem rastreabilidade de consumo por membro do time. O gestor não sabe quem gastou o quê.",
  "Contexto de mercado zerado. CNAE, Serasa e Receita Federal ficam de fora do perfil.",
  "CRM desatualizado porque sincronizar manualmente não escala. Lead chega frio.",
  "SDR aborda sem contexto sobre cargo atual, tempo na empresa ou momento de compra.",
];

const veroWay = [
  "Dado original intacto. A versão enriquecida fica ao lado, rastreável e auditável por usuário.",
  "Cada crédito Apollo registrado por contato e por membro do time. Visibilidade total de custo.",
  "CNAE, Serasa, score e Receita Federal dentro do perfil. Contexto Brasil nativo, sem gambiarra.",
  "Sync automático com HubSpot via batch. Campo enriched=true para rastreabilidade no CRM.",
  "Brand Sector, score de intenção e Org Chart entregues antes da primeira mensagem do SDR.",
];

export default function LandingComparison() {
  return (
    <section id="comparacao" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-[#8A5CF5] uppercase tracking-[0.15em] mb-4">O problema que o mercado ignora</p>
          <h2 className="text-[36px] font-extrabold text-white mb-3 leading-tight">
            Volume sem qualidade não fecha negócio.
          </h2>
          <p className="text-[18px] text-white/40 max-w-xl mx-auto">
            A maioria das ferramentas entrega contato. A Vero entrega contexto para o seu time fechar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Legacy */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-[14px]">📋</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/50">Como o seu time prospecta hoje</p>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mt-0.5">Abordagem convencional</p>
              </div>
            </div>
            <div className="space-y-4">
              {legacy.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#EF444415] border border-[#EF444430] flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[#EF4444] text-[10px] font-bold leading-none">✕</span>
                  </div>
                  <p className="text-[13px] text-white/35 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[11px] text-white/20 font-medium">
              Resultado: ciclo de venda longo, dado desatualizado, SDR sem direção.
            </p>
          </div>

          {/* Vero */}
          <div className="rounded-2xl border border-[#8A5CF5]/25 p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(138,92,245,0.08) 0%,rgba(76,29,149,0.12) 100%)" }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#8A5CF5" }} />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#8A5CF5]/20 border border-[#8A5CF5]/30 flex items-center justify-center">
                <span className="text-[14px]">⚡</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">Com Vero.io</p>
                <p className="text-[10px] text-[#8A5CF5] uppercase tracking-widest mt-0.5">Data Growth Partner</p>
              </div>
            </div>
            <div className="space-y-4">
              {veroWay.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <p className="text-[13px] text-white/75 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[11px] text-[#10B981] font-semibold">
              Resultado: abordagem com contexto, ciclo mais curto, taxa de resposta maior.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/dashboard"
            className="flex items-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white font-semibold text-[14px] px-7 py-3.5 rounded-xl transition-all"
            style={{ boxShadow: "0 0 20px rgba(138,92,245,0.35)" }}>
            Ver como funciona na prática <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
