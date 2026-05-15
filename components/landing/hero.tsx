"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const WORDS = ["Em Escala.", "Com Contexto.", "Para Fechar.", "Sem Retrabalho."];
const LOGOS = ["TOTVS", "Stone", "RD Station", "Pipefy", "Conta Azul", "Omie"];

const FEED = [
  { nome: "Rafael Costa", cargo: "CTO", empresa: "TOTVS", status: "enriched" },
  { nome: "Ana Lima", cargo: "VP Produtos", empresa: "Stone", status: "captured" },
  { nome: "Bruno Rocha", cargo: "Head Eng.", empresa: "RD Station", status: "processing" },
  { nome: "Carla Souza", cargo: "Diretora", empresa: "Pipefy", status: "enriched" },
  { nome: "Diego Alves", cargo: "CEO", empresa: "Omie", status: "captured" },
];

const statusColor = (s: string) =>
  s === "enriched" ? "#10B981" : s === "captured" ? "#8A5CF5" : "#F59E0B";
const statusLabel = (s: string) =>
  s === "enriched" ? "✦ enriquecido" : s === "captured" ? "capturado" : "processando";

function CommandCenter() {
  const [captured, setCaptured] = useState(143);
  const [synced, setSynced] = useState(89);
  const [feedIdx, setFeedIdx] = useState(0);
  const [popCapt, setPopCapt] = useState(false);
  const [popSync, setPopSync] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCaptured(n => {
        setPopCapt(true);
        setTimeout(() => setPopCapt(false), 380);
        return n + Math.floor(Math.random() * 2 + 1);
      });
      setFeedIdx(i => (i + 1) % FEED.length);
    }, 2200);
    const s = setInterval(() => {
      setSynced(n => {
        setPopSync(true);
        setTimeout(() => setPopSync(false), 380);
        return n + 1;
      });
    }, 3900);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  const item = FEED[feedIdx];

  return (
    <div className="border-y border-white/[0.06] bg-[#050709]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">

        {/* Col 1: Inteligência Comercial */}
        <div className="p-7 lg:p-9">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8A5CF5] flex items-center gap-2 mb-6">
            <span className="w-1 h-1 bg-[#8A5CF5] rounded-full" />
            Inteligência Comercial
          </p>
          <div>
            {[["Brand Sector", "#A78BFA"], ["Score de Intenção", "#A78BFA"], ["Org Chart", "#A78BFA"]].map(([label, color]) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                <span className="text-[12px] text-white/40">{label}</span>
                <span className="text-[9px] font-mono font-semibold" style={{ color: String(color) }}>ativo</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            {[["4", "fontes ativas"], ["<2min", "p/ iniciar"]].map(([val, label]) => (
              <div key={label} className="rounded-xl border border-white/[0.06] p-3.5">
                <p className="font-mono text-[18px] font-bold text-white leading-none">{val}</p>
                <p className="text-[9px] text-white/25 mt-1.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Origens + live feed */}
        <div className="p-7 lg:p-9 bg-white/[0.012]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#10B981] flex items-center gap-2">
              <span className="glow-pulse w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Origens de Dado
            </p>
            <span key={captured} className={`text-[9px] font-mono text-[#10B981]/50 ${popCapt ? "counter-pop" : ""}`}>
              {captured} capturados
            </span>
          </div>
          <div className="space-y-1.5 mb-5">
            {[
              ["Rede Profissional", 143, "#8A5CF5"],
              ["Dados Cadastrais", 67, "#10B981"],
              ["Base Empresarial", 28, "#F59E0B"],
            ].map(([name, count, color]) => (
              <div key={String(name)} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: String(color) }} />
                  <span className="text-[11px] text-white/45">{String(name)}</span>
                </div>
                <span className="text-[10px] font-mono font-bold" style={{ color: String(color) }}>{count}</span>
              </div>
            ))}
          </div>
          <div
            key={feedIdx}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            style={{ animation: "slide-in-row 0.3s ease-out" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusColor(item.status) }} />
            <span className="text-[10px] text-white/50 flex-1 truncate">{item.nome}</span>
            <span className="text-[9px] text-white/25 shrink-0 hidden sm:block">{item.cargo}</span>
            <span className="text-[9px] font-semibold shrink-0" style={{ color: statusColor(item.status) }}>
              {statusLabel(item.status)}
            </span>
          </div>
        </div>

        {/* Col 3: Sincronização */}
        <div className="p-7 lg:p-9">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#F59E0B]">Sincronização</p>
            <span key={synced} className={`text-[9px] font-mono text-[#F59E0B]/50 ${popSync ? "counter-pop" : ""}`}>
              {synced} sync&rsquo;d
            </span>
          </div>
          <div>
            {[
              ["HubSpot", "89 registros", "#10B981"],
              ["CSV / JSON", "12 exports", "#10B981"],
              ["Webhook", "4 ativos", "#10B981"],
              ["Batch export", "—", "#4A5568"],
            ].map(([name, val, color]) => (
              <div key={String(name)} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                <span className="text-[12px] text-white/38">{String(name)}</span>
                <span className="text-[10px] font-mono font-semibold" style={{ color: String(color) }}>{String(val)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6">
            <span className="glow-pulse w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[9px] text-white/25">Pipeline ativo em tempo real</span>
          </div>
        </div>

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
    <section className="relative overflow-hidden">
      {/* Purple-committed hero: base tinted toward brand hue */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "#0C0916" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 110% 75% at 35% -15%, rgba(138,92,245,0.32) 0%, transparent 62%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(138,92,245,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(138,92,245,0.045) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Hero copy */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div
          className="flex items-center gap-2.5 mb-10"
          style={{ opacity: 0, animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 0ms forwards" }}>
          <span className="glow-pulse w-1.5 h-1.5 rounded-full bg-[#8A5CF5]" />
          <span className="text-[10px] font-semibold text-[#8A5CF5]/75 uppercase tracking-[0.22em]">
            Data Growth Partner · B2B Outbound
          </span>
        </div>

        <h1
          className="text-white mb-10"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2.75rem, 9.5vw, 8.5rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            opacity: 0,
            animation: "hero-in 0.65s cubic-bezier(0.16,1,0.3,1) 100ms forwards",
          }}>
          Prospecção<br />
          B2B<br />
          <span
            className="inline-block"
            style={{
              color: "#A78BFA",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.28s ease-out, transform 0.28s ease-out",
            }}>
            {WORDS[wordIdx]}
          </span>
        </h1>

        <div
          className="flex flex-col lg:flex-row gap-8 lg:items-end"
          style={{ opacity: 0, animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 240ms forwards" }}>
          <p className="text-[15px] text-white/38 leading-relaxed max-w-[480px]">
            Do hunting ao CRM em um ciclo único. Dado original preservado, enriquecido
            e sincronizado para que seu time chegue em cada abordagem com o contexto certo.
          </p>
          <div className="flex items-center gap-3 lg:ml-auto shrink-0">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white font-semibold text-[13px] px-6 py-3.5 rounded-xl transition-all"
              style={{ boxShadow: "0 0 28px rgba(138,92,245,0.5)" }}>
              Começar agora <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#produto"
              className="text-[13px] text-white/40 hover:text-white px-5 py-3.5 border border-white/10 hover:border-white/20 rounded-xl transition-all">
              Ver produto
            </Link>
          </div>
        </div>
      </div>

      <div style={{ opacity: 0, animation: "hero-in 0.65s cubic-bezier(0.16,1,0.3,1) 400ms forwards" }}>
        <CommandCenter />
      </div>

      {/* Logo bar */}
      <div className="relative border-t border-white/[0.04] bg-[#0B0E14] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 flex-wrap">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.22em] shrink-0">Equipes que confiam na Vero</p>
          {LOGOS.map(name => (
            <span key={name} className="text-[12px] font-semibold text-white/20 hover:text-white/40 transition-colors cursor-default">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
