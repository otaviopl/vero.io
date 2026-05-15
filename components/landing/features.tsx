"use client";

import Link from "next/link";
import { Zap, Shield, Brain, Globe, ChevronRight, Sparkles } from "lucide-react";
import Reveal from "@/components/landing/reveal";

function HuntingMockUI() {
  const feed = [
    { nome: "Rafael Costa", cargo: "CTO", empresa: "TOTVS", s: "enriched" },
    { nome: "Ana Lima", cargo: "VP Produtos", empresa: "Stone", s: "captured" },
    { nome: "Bruno Rocha", cargo: "Head Eng.", empresa: "RD Station", s: "processing" },
  ];
  return (
    <div className="bg-[#040608] rounded-2xl border border-white/[0.07] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.015]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/40 border border-[#EF4444]/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/40 border border-[#F59E0B]/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/40 border border-[#10B981]/20" />
        <span className="text-[10px] text-white/20 ml-2">app.vero.io/hunting</span>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-[9px] text-white/25 uppercase tracking-[0.18em] mb-4">Fontes Ativas</p>
        {[["Rede Profissional", 143, "#8A5CF5"], ["Dados Cadastrais", 67, "#10B981"], ["Base Empresarial", 28, "#F59E0B"]].map(([name, leads, color]) => (
          <div key={String(name)} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: String(color), boxShadow: `0 0 6px ${color}` }} />
              <span className="text-[11px] text-white/55">{String(name)}</span>
            </div>
            <span className="text-[10px] font-mono font-bold" style={{ color: String(color) }}>{leads} leads</span>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-white/[0.04] space-y-1.5">
          {feed.map(item => (
            <div key={item.nome} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.02]">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.s === "enriched" ? "bg-[#10B981]" : item.s === "captured" ? "bg-[#8A5CF5]" : "bg-[#F59E0B]"}`} />
              <span className="text-[11px] text-white/50 flex-1">{item.nome}</span>
              <span className="text-[9px] text-white/25 hidden sm:block">{item.empresa}</span>
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
    <div className="bg-[#040608] rounded-2xl border border-white/[0.07] overflow-hidden font-mono text-[12px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.015]">
        <span className="w-2 h-2 rounded-full bg-[#10B981]/60" />
        <span className="text-[10px] text-white/25">contact.json</span>
        <span className="ml-auto text-[9px] text-white/20 border border-white/[0.08] rounded px-1.5 py-0.5">Apollo enriched</span>
      </div>
      <div className="p-6 leading-[1.9]">
        <span className="text-white/20">{"{"}</span><br />
        <span className="pl-5 text-white/28">&quot;nome_original&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-white/22">&quot;JOAO SILVA&quot;</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-[#10B981]/75">&quot;nome_nutrido&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-[#10B981]/75">&quot;João Silva&quot;</span>
        <span className="text-[10px] text-[#8A5CF5]/45 ml-2">✦</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-white/28">&quot;cargo_original&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-white/22">&quot;DIRETOR TI&quot;</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-[#10B981]/75">&quot;cargo_nutrido&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-[#10B981]/75">&quot;CTO&quot;</span>
        <span className="text-[10px] text-[#8A5CF5]/45 ml-2">✦</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-[#F59E0B]/65">&quot;email_status&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-[#F59E0B]/65">&quot;valid&quot;</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-[#8A5CF5]/65">&quot;seniority_level&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-[#8A5CF5]/65">&quot;c-level&quot;</span>
        <span className="text-white/18">,</span><br />
        <span className="pl-5 text-[#C084FC]/60">&quot;tokens_spent&quot;</span>
        <span className="text-white/18">: </span>
        <span className="text-[#C084FC]/60">12</span><br />
        <span className="text-white/20">{"}"}</span>
      </div>
      <div className="px-6 py-3 border-t border-white/[0.04] bg-white/[0.01]">
        <span className="text-[9px] text-white/20">
          <Sparkles className="inline w-2.5 h-2.5 mr-1 text-[#8A5CF5]/40" />
          campos com ✦ enriquecidos via Apollo.io e rastreados por crédito
        </span>
      </div>
    </div>
  );
}

export default function LandingFeatures() {
  return (
    <div id="produto">

      {/* ── Spotlight 1: Hunting Room ── */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ background: "#070A12" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(138,92,245,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(138,92,245,0.03) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Reveal>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[44%_56%] gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1 h-1 bg-[#8A5CF5] rounded-full" />
              <span className="text-[9px] font-bold text-[#8A5CF5] uppercase tracking-[0.22em]">Hunting Room</span>
            </div>
            <h3
              className="text-white leading-[1.08] mb-5"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.625rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}>
              Volume com precisão.{" "}
              <span className="text-[#A78BFA]">Quatro fontes. Uma interface.</span>
            </h3>
            <p className="text-[14px] text-white/38 leading-relaxed mb-8 max-w-[400px]">
              Redes profissionais via extensão Chrome, bureaus de dados, geolocalização e bases empresariais
              em um único pipeline. Configure por CNAE, faturamento, cargo e localização.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8 max-w-[300px]">
              {[["4", "Fontes simultâneas"], ["<2min", "Para iniciar um hunt"], ["143", "Leads por sessão"], ["47s", "Por captura"]].map(([val, label]) => (
                <div key={String(label)} className="rounded-xl border border-white/[0.06] p-4">
                  <p className="font-mono text-[20px] font-bold text-white leading-none">{val}</p>
                  <p className="text-[10px] text-white/28 mt-1.5">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/hunting" className="inline-flex items-center gap-1.5 text-[12px] text-[#8A5CF5] hover:text-[#A78BFA] font-semibold transition-colors">
              Ver Hunting Room <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="order-first lg:order-last">
            <HuntingMockUI />
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── Spotlight 2: Camada de Dado ── */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ background: "#060D0C" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)" }}
        />
        <Reveal>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[54%_46%] gap-12 lg:gap-20 items-center">
          <div>
            <DataMockUI />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1 h-1 bg-[#10B981] rounded-full" />
              <span className="text-[9px] font-bold text-[#10B981] uppercase tracking-[0.22em]">Camada de Dado</span>
            </div>
            <h3
              className="text-white leading-[1.08] mb-5"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.625rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}>
              O dado que o seu time{" "}
              <span className="text-[#34D399]">vai confiar para fechar.</span>
            </h3>
            <p className="text-[14px] text-white/38 leading-relaxed mb-7 max-w-[400px]">
              Cada campo tem a versão original e a versão enriquecida pelo Apollo.io.
              O SDR sabe exatamente o que foi capturado e o que foi processado.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Campo original intacto. Versão enriquecida ao lado, sempre auditável.",
                "Email status: valid, risky, unknown. Seu time aborda quem tem dado confiável.",
                "Seniority level por Apollo.io. C-level, director, manager. Sem achismo.",
                "Webhook de telefone assíncrono. Número chega sem reprocessar a lista.",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                  <span className="w-1 h-1 rounded-full bg-[#10B981] shrink-0 mt-2" />{item}
                </li>
              ))}
            </ul>
            <Link href="/contacts" className="inline-flex items-center gap-1.5 text-[12px] text-[#10B981] hover:text-[#34D399] font-semibold transition-colors">
              Ver Contact Manager <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── Spotlight 3: Inteligência Estratégica ── */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ background: "#0A0812" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 15% 60%, rgba(192,132,252,0.07) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <Reveal><div className="mb-14 max-w-[680px]">
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1 h-1 bg-[#C084FC] rounded-full" />
              <span className="text-[9px] font-bold text-[#C084FC] uppercase tracking-[0.22em]">Inteligência Estratégica</span>
            </div>
            <h3
              className="text-white leading-[1.08]"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.625rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}>
              Da empresa ao tomador de decisão{" "}
              <span className="text-[#C084FC]">em segundos.</span>
            </h3>
          </div></Reveal>

          {/* Asymmetric grid: wide + narrow on top, full-width on bottom */}
          <Reveal delay={80}><div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-4 mb-4">
            {/* Brand Sector — wide, with example */}
            <div className="rounded-2xl border border-[#C084FC]/15 p-7 bg-[#C084FC]/[0.04]">
              <div className="flex items-center gap-2 mb-5">
                <Globe className="w-3.5 h-3.5 text-[#C084FC]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Brand Sector</span>
              </div>
              <p className="text-[13px] text-white/50 leading-relaxed mb-6">
                O que a empresa realmente faz, além do código CNAE. Contexto real de mercado
                para o SDR personalizar a abordagem sem improvisar.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <span className="text-[10px] text-white/25 w-24 shrink-0">CNAE original</span>
                  <span className="text-[11px] font-mono text-white/30">4752100</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#C084FC]/15 bg-[#C084FC]/[0.05]">
                  <span className="text-[10px] text-[#C084FC]/60 w-24 shrink-0">Brand Sector</span>
                  <span className="text-[11px] font-mono text-[#C084FC]/80">Marketplace B2C</span>
                  <span className="ml-auto text-[9px] text-[#C084FC]/50">✦</span>
                </div>
              </div>
            </div>

            {/* Score de Intenção */}
            <div className="rounded-2xl border border-white/[0.06] p-7 bg-[#8A5CF5]/[0.04]">
              <div className="flex items-center gap-2 mb-5">
                <Brain className="w-3.5 h-3.5 text-[#8A5CF5]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Score de Intenção</span>
              </div>
              <p className="text-[12px] text-white/45 leading-relaxed mb-6">
                Sinais de mudança de cargo, expansão de time e rodada de investimento processados automaticamente.
              </p>
              <div className="space-y-2">
                {[["Alto", "#10B981", 85], ["Médio", "#F59E0B", 50], ["Baixo", "#EF4444", 20]].map(([label, color, pct]) => (
                  <div key={String(label)} className="flex items-center gap-2">
                    <span className="text-[9px] text-white/30 w-10 shrink-0">{String(label)}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: String(color) }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Momento de Abordagem */}
            <div className="rounded-2xl border border-white/[0.06] p-7 bg-[#10B981]/[0.03]">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Momento</span>
              </div>
              <p className="text-[12px] text-white/45 leading-relaxed mb-5">
                Sinais chegam antes do seu concorrente ligar.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Nova liderança há 3 meses",
                  "8 vagas sênior abertas",
                  "Rodada Série A recente",
                ].map(signal => (
                  <li key={signal} className="flex items-center gap-2 text-[11px] text-white/50">
                    <span className="w-1 h-1 rounded-full bg-[#10B981] shrink-0" />{signal}
                  </li>
                ))}
              </ul>
            </div>
          </div></Reveal>

          {/* Org Chart — full width */}
          <Reveal delay={200}><div className="rounded-2xl border border-white/[0.06] p-7 bg-[#F59E0B]/[0.03]">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Org Chart Automático</span>
              <span className="ml-auto text-[11px] text-white/45 leading-relaxed max-w-[480px] hidden md:block">
                C-levels identificados com cargo, tempo de empresa e LinkedIn. Seu time sabe quem decide antes da primeira mensagem.
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["CEO", "Rafael Costa", "8 anos", "#F59E0B"],
                ["CTO", "Bruno Rocha", "4 anos", "#8A5CF5"],
                ["VP Produtos", "Ana Lima", "2 anos", "#10B981"],
                ["Head Eng.", "Carla Souza", "3 anos", "#C084FC"],
              ].map(([role, name, tenure, color]) => (
                <div key={String(name)} className="rounded-xl border border-white/[0.06] p-3.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: String(color) }}>{role}</p>
                  <p className="text-[11px] text-white/65 font-medium">{name}</p>
                  <p className="text-[9px] text-white/25 mt-0.5">{tenure}</p>
                </div>
              ))}
            </div>
          </div></Reveal>

        </div>
      </section>

    </div>
  );
}
