"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Play } from "lucide-react";

const WORDS = ["Em Escala.", "Com Contexto.", "Para Fechar.", "Sem Retrabalho."];

const PILLS = [
  "Dado Original Preservado",
  "Enriquecimento Apollo.io",
  "CNAE e Serasa Brasil",
  "Sync HubSpot em Batch",
  "Controle de Crédito por Usuário",
  "X-Ray LinkedIn",
];

const LOGOS = ["TOTVS", "Stone", "RD Station", "Pipefy", "Conta Azul", "Omie"];

const LIVE_FEED = [
  { nome: "Rafael Costa", cargo: "CTO", status: "enriched" },
  { nome: "Ana Lima", cargo: "VP Produtos", status: "captured" },
  { nome: "Bruno Rocha", cargo: "Head Eng.", status: "processing" },
  { nome: "Carla Souza", cargo: "Diretora", status: "enriched" },
  { nome: "Diego Alves", cargo: "CEO", status: "captured" },
];

function LayeredStack() {
  const [captured, setCaptured] = useState(143);
  const [synced, setSynced] = useState(89);
  const [feedIdx, setFeedIdx] = useState(0);
  const [popCapt, setPopCapt] = useState(false);
  const [popSync, setPopSync] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCaptured(n => { setPopCapt(true); setTimeout(() => setPopCapt(false), 350); return n + Math.floor(Math.random() * 2 + 1); });
      setFeedIdx(i => (i + 1) % LIVE_FEED.length);
    }, 2100);
    const s = setInterval(() => {
      setSynced(n => { setPopSync(true); setTimeout(() => setPopSync(false), 350); return n + 1; });
    }, 3800);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const item = LIVE_FEED[feedIdx];

  return (
    <div className="relative w-[420px] h-[390px] select-none">
      {/* ambient glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#8A5CF5 25%,transparent 70%)" }} />

      {/* Layer 1 — Intelligence */}
      <div className="float-a absolute left-8 top-0 w-[370px]">
        <div className="rounded-2xl border border-[#8A5CF5]/30 p-4"
          style={{ background: "linear-gradient(135deg,rgba(138,92,245,0.13),rgba(76,29,149,0.08))", transform: "perspective(600px) rotateX(12deg)", boxShadow: "0 0 30px rgba(138,92,245,0.2)" }}>
          <p className="text-[10px] font-bold text-[#8A5CF5] uppercase tracking-widest mb-3">Inteligência Comercial</p>
          <div className="grid grid-cols-3 gap-2">
            {["Brand Sector", "Score de Intenção", "Org Chart"].map(item => (
              <div key={item} className="bg-[#8A5CF5]/10 border border-[#8A5CF5]/20 rounded-lg px-2 py-2 text-center">
                <p className="text-[10px] text-white/60">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 2 — Sources */}
      <div className="float-b absolute left-4 top-[114px] w-[380px]">
        <div className="rounded-2xl border border-[#10B981]/25 p-4"
          style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.07),rgba(6,78,59,0.06))", transform: "perspective(600px) rotateX(12deg)", boxShadow: "0 0 20px rgba(16,185,129,0.12)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">Origens de Dado</p>
            <span className="flex items-center gap-1.5">
              <span className="glow-pulse w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span key={captured} className={`text-[9px] text-[#10B981]/70 font-mono ${popCapt ? "counter-pop" : ""}`}>{captured} capturados</span>
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[["🔷","Rede Prof."],["🟢","Cadastral"],["🔴","Geoloc."],["🟠","Empresarial"]].map(([icon, name]) => (
              <div key={String(name)} className="bg-white/[0.04] border border-white/6 rounded-lg px-2 py-2 text-center">
                <span className="text-base">{icon}</span>
                <p className="text-[9px] text-white/40 mt-1">{String(name)}</p>
              </div>
            ))}
          </div>
          {/* live feed row */}
          <div key={feedIdx} className="mt-3 flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
            style={{ animation: "slide-in-row 0.3s ease-out" }}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.status === "enriched" ? "bg-[#10B981]" : item.status === "captured" ? "bg-[#8A5CF5]" : "bg-[#F59E0B]"}`} />
            <span className="text-[10px] text-white/50 flex-1">{item.nome}</span>
            <span className="text-[9px] text-white/25">{item.cargo}</span>
            <span className={`text-[9px] font-semibold ${item.status === "enriched" ? "text-[#10B981]" : item.status === "captured" ? "text-[#8A5CF5]" : "text-[#F59E0B]"}`}>
              {item.status === "enriched" ? "✦ enriquecido" : item.status === "captured" ? "capturado" : "processando"}
            </span>
          </div>
        </div>
      </div>

      {/* Layer 3 — Sync */}
      <div className="float-c absolute left-0 top-[248px] w-[390px]">
        <div className="rounded-2xl border border-[#F59E0B]/20 p-4"
          style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.06),rgba(69,38,3,0.05))", transform: "perspective(600px) rotateX(12deg)", boxShadow: "0 0 20px rgba(245,158,11,0.1)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest">Sincronização e Exportação</p>
            <span key={synced} className={`text-[9px] text-[#F59E0B]/60 font-mono ${popSync ? "counter-pop" : ""}`}>{synced} sincronizados</span>
          </div>
          <div className="flex gap-3">
            {["CRM A","CRM B","CRM C","CSV / JSON"].map(item => (
              <div key={item} className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg py-1.5 text-center">
                <p className="text-[10px] text-white/35">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* live status */}
      <div className="absolute right-1 top-[365px] flex items-center gap-1.5">
        <span className="glow-pulse w-2 h-2 bg-[#10B981] rounded-full" style={{ color: "#10B981" }} />
        <span className="text-[11px] text-white/30">Pipeline ativo</span>
      </div>
    </div>
  );
}

export default function LandingHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setVisible(true); }, 280);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex flex-col">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(138,92,245,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(138,92,245,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#8A5CF5 0%,transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full flex-1 relative">
        <div>
          <p className="text-[11px] font-semibold text-[#8A5CF5] uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#8A5CF5] rounded-full inline-block" style={{ boxShadow: "0 0 8px #8A5CF5" }} />
            Data Growth Partner · B2B Outbound
          </p>

          <h1 className="text-[54px] lg:text-[62px] font-extrabold leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Prospecção B2B</span>
            <br />
            <span
              className="inline-block transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                background: "linear-gradient(135deg,#A78BFA 0%,#8A5CF5 50%,#C084FC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              {WORDS[wordIdx]}
            </span>
          </h1>

          <p className="text-[16px] text-white/50 leading-[1.8] mb-8 max-w-[500px]">
            Do hunting ao CRM em um ciclo único. Dado original preservado, enriquecido e sincronizado
            para que seu time de SDR chegue em cada abordagem com o contexto certo, do primeiro contato
            à decisão de compra.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {PILLS.map(f => (
              <span key={f}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[12px] text-white/60 bg-white/[0.03] hover:border-[#8A5CF5]/40 hover:text-white/80 transition-all cursor-default">
                <span className="w-1 h-1 rounded-full bg-[#8A5CF5]" />{f}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard"
              className="flex items-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white font-semibold text-[14px] px-6 py-3.5 rounded-xl transition-all"
              style={{ boxShadow: "0 0 24px rgba(138,92,245,0.45)" }}>
              <Zap className="w-4 h-4" />Começar agora
            </Link>
            <button className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-[14px] px-6 py-3.5 rounded-xl transition-all">
              <Play className="w-3.5 h-3.5" />Ver demonstração
            </button>
          </div>

          <p className="text-[11px] text-white/25 mt-5">
            Sem contrato de longo prazo. Cancele quando quiser.
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <LayeredStack />
        </div>
      </div>

      <div className="border-t border-white/5 bg-white/[0.02] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 justify-center flex-wrap">
          <p className="text-[11px] text-white/25 uppercase tracking-widest shrink-0">Equipes que confiam na Vero</p>
          {LOGOS.map(name => (
            <span key={name} className="text-[13px] font-semibold text-white/20 hover:text-white/40 transition-colors cursor-default">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
