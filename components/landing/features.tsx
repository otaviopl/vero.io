"use client";

import Link from "next/link";
import { Zap, Shield, Brain, Globe, ChevronRight, Sparkles } from "lucide-react";

function HuntingMockUI() {
  const feed = [
    { nome: "Rafael Costa", cargo: "CTO", empresa: "TOTVS", s: "enriched" },
    { nome: "Ana Lima", cargo: "VP Produtos", empresa: "Stone", s: "captured" },
    { nome: "Bruno Rocha", cargo: "Head Eng.", empresa: "RD Station", s: "processing" },
  ];
  return (
    <div className="bg-[#080A0F] rounded-2xl border border-white/8 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/40 border border-[#EF4444]/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/40 border border-[#F59E0B]/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/40 border border-[#10B981]/20" />
        <span className="text-[10px] text-white/20 ml-2">app.vero.io/hunting</span>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3">Fontes Ativas</p>
        {[["🔷","Rede Profissional",143,"#8A5CF5"],["🟢","Dados Cadastrais",67,"#10B981"],["🟠","Base Empresarial",28,"#F59E0B"]].map(([icon, name, leads, color]) => (
          <div key={String(name)} className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/8 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: String(color), boxShadow: `0 0 6px ${color}` }} />
              <span className="text-[12px] text-white/60">{String(icon).trim()} {String(name)}</span>
            </div>
            <span className="text-[11px] font-mono font-bold" style={{ color: String(color) }}>{String(leads)} leads</span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
          {feed.map(item => (
            <div key={item.nome} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.02]">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.s === "enriched" ? "bg-[#10B981]" : item.s === "captured" ? "bg-[#8A5CF5]" : "bg-[#F59E0B]"}`} />
              <span className="text-[11px] text-white/55 flex-1">{item.nome}</span>
              <span className="text-[9px] text-white/25">{item.empresa}</span>
              <span className={`text-[9px] font-semibold ${item.s === "enriched" ? "text-[#10B981]" : item.s === "captured" ? "text-[#8A5CF5]" : "text-[#F59E0B]"}`}>
                {item.s === "enriched" ? "✦ enriquecido" : item.s === "captured" ? "capturado" : "processando"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataMockUI() {
  return (
    <div className="bg-[#080A0F] rounded-2xl border border-white/8 overflow-hidden font-mono text-[12px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2 h-2 rounded-full bg-[#10B981]/60" />
        <span className="text-[11px] text-white/25">contact.json</span>
        <span className="ml-auto text-[9px] text-white/20 border border-white/8 rounded px-1.5 py-0.5">Apollo enriched</span>
      </div>
      <div className="p-5 leading-7">
        <span className="text-white/20">{"{"}</span><br />
        <span className="pl-4 text-white/30">"nome_original"</span>
        <span className="text-white/20">: </span>
        <span className="text-white/25">"JOAO SILVA"</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-[#10B981]/80">"nome_nutrido"</span>
        <span className="text-white/20">: </span>
        <span className="text-[#10B981]/80">"João Silva"</span>
        <span className="text-[11px] text-[#8A5CF5]/50 ml-2">✦</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-white/30">"cargo_original"</span>
        <span className="text-white/20">: </span>
        <span className="text-white/25">"DIRETOR TI"</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-[#10B981]/80">"cargo_nutrido"</span>
        <span className="text-white/20">: </span>
        <span className="text-[#10B981]/80">"CTO"</span>
        <span className="text-[11px] text-[#8A5CF5]/50 ml-2">✦</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-[#F59E0B]/70">"email_status"</span>
        <span className="text-white/20">: </span>
        <span className="text-[#F59E0B]/70">"valid"</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-[#8A5CF5]/70">"seniority_level"</span>
        <span className="text-white/20">: </span>
        <span className="text-[#8A5CF5]/70">"c-level"</span>
        <span className="text-white/20">,</span><br />
        <span className="pl-4 text-[#C084FC]/70">"tokens_spent"</span>
        <span className="text-white/20">: </span>
        <span className="text-[#C084FC]/70">12</span><br />
        <span className="text-white/20">{"}"}</span>
      </div>
      <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01]">
        <span className="text-[10px] text-white/20">
          <Sparkles className="inline w-2.5 h-2.5 mr-1 text-[#8A5CF5]/50" />
          campos com ✦ enriquecidos via Apollo.io e rastreados por crédito
        </span>
      </div>
    </div>
  );
}

export default function LandingFeatures() {
  return (
    <section id="produto" className="space-y-5 py-6 px-6">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* Spotlight 1 — Hunting */}
        <div className="rounded-3xl border border-white/8 overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0F1118 0%,#0A0C14 100%)" }}>
          <div className="p-10 lg:p-14 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#8A5CF5] uppercase tracking-widest border border-[#8A5CF5]/25 rounded-full px-3 py-1.5 mb-6">
                <Zap className="w-3 h-3" />Hunting Room
              </span>
              <h3 className="text-[32px] font-extrabold text-white leading-tight mb-4">
                Volume com precisão.{" "}
                <span style={{ background: "linear-gradient(135deg,#A78BFA,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Quatro fontes. Uma interface.
                </span>
              </h3>
              <p className="text-[14px] text-white/45 leading-relaxed mb-8">
                Redes profissionais via extensão Chrome, bureaus de dados, geolocalização e bases empresariais em um único pipeline.
                Configure por CNAE, faturamento, cargo e localização. Rode agora ou agende para o horário ideal.
                Sem abrir quatro ferramentas diferentes.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[["4","Fontes simultâneas"],["menos de 2min","Para iniciar um hunt"],["143","Leads por sessão (media)"],["47s","Tempo medio por captura"]].map(([val, label]) => (
                  <div key={String(label)} className="bg-white/[0.04] rounded-xl p-4 border border-white/5">
                    <p className="text-[22px] font-extrabold text-white mb-0.5">{val}</p>
                    <p className="text-[11px] text-white/35">{label}</p>
                  </div>
                ))}
              </div>
              <Link href="/hunting" className="inline-flex items-center gap-2 text-[13px] text-[#8A5CF5] hover:text-[#A78BFA] font-semibold transition-colors">
                Ver Hunting Room <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <HuntingMockUI />
          </div>
        </div>

        {/* Spotlight 2 — Data Layer */}
        <div className="rounded-3xl border border-white/8 overflow-hidden"
          style={{ background: "linear-gradient(135deg,#060810 0%,#0D0F1A 100%)" }}>
          <div className="p-10 lg:p-14 grid lg:grid-cols-2 gap-12 items-center">
            <DataMockUI />
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#10B981] uppercase tracking-widest border border-[#10B981]/25 rounded-full px-3 py-1.5 mb-6">
                <Shield className="w-3 h-3" />Camada de Dado
              </span>
              <h3 className="text-[32px] font-extrabold text-white leading-tight mb-4">
                O dado que o seu time{" "}
                <span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  vai confiar para fechar.
                </span>
              </h3>
              <p className="text-[14px] text-white/45 leading-relaxed mb-6">
                Cada campo tem a versão original e a versão enriquecida pelo Apollo.io.
                O SDR sabe exatamente o que foi capturado e o que foi processado.
                Nenhum dado sobrescrito. Nenhuma surpresa no CRM.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Campo original intacto. Versao enriquecida ao lado, sempre auditavel.",
                  "Email status: valid, risky, unknown. Seu time aborda quem tem dado confiavel.",
                  "Seniority level por Apollo.io. C-level, director, manager. Sem achismo.",
                  "Webhook de telefone assincrono. Numero chega sem reprocessar a lista.",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />{item}
                  </li>
                ))}
              </ul>
              <Link href="/contacts" className="inline-flex items-center gap-2 text-[13px] text-[#10B981] hover:text-[#34D399] font-semibold transition-colors">
                Ver Contact Manager <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Spotlight 3 — Strategic Intelligence */}
        <div className="rounded-3xl border border-[#C084FC]/15 overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(138,92,245,0.06) 0%,rgba(192,132,252,0.04) 100%)" }}>
          <div className="p-10 lg:p-14">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#C084FC] uppercase tracking-widest border border-[#C084FC]/25 rounded-full px-3 py-1.5 mb-6">
                  <Brain className="w-3 h-3" />Inteligência Estrategica
                </span>
                <h3 className="text-[28px] font-extrabold text-white leading-tight mb-4">
                  Da empresa ao tomador de decisao{" "}
                  <span style={{ background: "linear-gradient(135deg,#C084FC,#8A5CF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    em segundos.
                  </span>
                </h3>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  CNAE nao conta a historia da empresa. Brand Sector sim.
                  Seu SDR entra na reuniao sabendo o que a empresa realmente faz, quem decide e qual o momento certo para abordar.
                </p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Brand Sector",
                    value: "O que a empresa realmente faz, alem do codigo CNAE. Contexto real de mercado para o SDR personalizar a abordagem sem improvisar.",
                    color: "#C084FC",
                    icon: Globe,
                  },
                  {
                    label: "Score de Intencao de Compra",
                    value: "Sinais de mudanca de cargo, expansao de time e rodada de investimento processados automaticamente e entregues no perfil.",
                    color: "#8A5CF5",
                    icon: Brain,
                  },
                  {
                    label: "Momento de Abordagem",
                    value: "Assumiu nova lideranca ha 3 meses. Empresa abriu 8 vagas senior. Esses sinais chegam antes do seu concorrente ligar.",
                    color: "#10B981",
                    icon: Zap,
                  },
                  {
                    label: "Org Chart Automatico",
                    value: "C-levels identificados com cargo, tempo de empresa e LinkedIn. Seu time sabe quem e o decisor antes da primeira mensagem.",
                    color: "#F59E0B",
                    icon: Shield,
                  },
                ].map(({ label, value, color, icon: Icon }) => (
                  <div key={label} className="bg-[#080A0F]/60 border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{label}</span>
                    </div>
                    <p className="text-[12px] text-white/55 leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
