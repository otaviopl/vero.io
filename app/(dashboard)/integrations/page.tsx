"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockApolloCredits, mockHubSpotSyncResult } from "@/lib/mock-data";
import {
  Zap, Link2, CheckCircle2, RefreshCw, Download, Settings,
  Plus, AlertCircle, ArrowRight, Database, Globe, Phone,
  BarChart3, Activity,
} from "lucide-react";

type Tab = "apollo" | "hubspot" | "export" | "webhook";

const apolloExportPct = Math.round((mockApolloCredits.export_used / mockApolloCredits.export_total) * 100);
const apolloPhonePct = Math.round((mockApolloCredits.phone_used / mockApolloCredits.phone_total) * 100);
const getColor = (pct: number) => pct >= 80 ? "#EF4444" : pct >= 50 ? "#F59E0B" : "#10B981";

const actionLabels: Record<string, { label: string; color: string }> = {
  created:           { label: "Criado",            color: "#10B981" },
  updated_by_id:     { label: "Atualizado por ID",  color: "#8A5CF5" },
  updated_by_email:  { label: "Atualizado p/ email", color: "#C084FC" },
  failed:            { label: "Falhou",             color: "#EF4444" },
  skipped:           { label: "Ignorado",           color: "#6B7280" },
};

export default function IntegrationsPage() {
  const [tab, setTab] = useState<Tab>("apollo");
  const [showSyncResult, setShowSyncResult] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const runSync = async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1800));
    setSyncing(false);
    setShowSyncResult(true);
  };

  const tabs = [
    { id: "apollo" as Tab, label: "Apollo.io", dot: true, dotColor: "#10B981" },
    { id: "hubspot" as Tab, label: "HubSpot CRM", dot: true, dotColor: "#10B981" },
    { id: "export" as Tab, label: "Export", dot: false, dotColor: "" },
    { id: "webhook" as Tab, label: "Webhooks", dot: false, dotColor: "" },
  ];

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Integrations" subtitle="Apollo.io · HubSpot · Export · Webhooks" />

      <div className="p-6 space-y-5">
        {/* Tab nav */}
        <div className="flex gap-1 bg-vero-card border border-vero-border rounded-xl p-1 w-fit">
          {tabs.map(({ id, label, dot, dotColor }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${tab === id ? "bg-vero-accent text-white" : "text-vero-muted hover:text-vero-text"}`}>
              {label}
              {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />}
            </button>
          ))}
        </div>

        {/* ── APOLLO.IO ── */}
        {tab === "apollo" && (
          <div className="space-y-4">
            {/* Header card */}
            <div className="bg-vero-card border border-vero-accent/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#8A5CF5" }} />
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-vero-accent/10 border border-vero-accent/20 flex items-center justify-center text-xl">⚡</div>
                  <div>
                    <p className="text-base font-bold text-vero-text">Apollo.io</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-vero-success" />
                      <span className="text-[11px] text-vero-success font-semibold">Conectado</span>
                      <span className="text-[10px] text-vero-muted">· X-Api-Key via .env</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 border border-vero-border rounded-lg px-3 py-1.5 text-xs text-vero-muted hover:text-vero-text transition-all">
                  <Settings className="w-3.5 h-3.5" />Configurar
                </button>
              </div>

              {/* Credits */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Créditos de Exportação",
                    used: mockApolloCredits.export_used,
                    total: mockApolloCredits.export_total,
                    pct: apolloExportPct,
                    color: getColor(apolloExportPct),
                    icon: Database,
                    desc: "Emails, cargo, indústria, seniority",
                  },
                  {
                    label: "Créditos de Telefone",
                    used: mockApolloCredits.phone_used,
                    total: mockApolloCredits.phone_total,
                    pct: apolloPhonePct,
                    color: getColor(apolloPhonePct),
                    icon: Phone,
                    desc: "Via webhook assíncrono — polling 10s",
                  },
                ].map(({ label, used, total, pct, color, icon: Icon, desc }) => (
                  <div key={label} className="bg-vero-surface border border-vero-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                      <span className="text-xs font-semibold text-vero-text">{label}</span>
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-2xl font-bold" style={{ color }}>{used.toLocaleString("pt-BR")}</span>
                      <span className="text-xs text-vero-muted mb-1">/ {total.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="w-full h-2 bg-vero-border rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                    <p className="text-[10px] text-vero-subtle">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrichment config */}
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <p className="text-sm font-semibold text-vero-text mb-4">Configuração de Enriquecimento</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <p className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider">Campos enriquecidos</p>
                  {[
                    { field: "email", desc: "Email profissional via Apollo" },
                    { field: "email_status", desc: "valid / risky / unknown / not_found" },
                    { field: "job_title", desc: "Cargo atual" },
                    { field: "company_name", desc: "Empresa atual" },
                    { field: "seniority_level", desc: "entry / senior / manager / director / c-level" },
                    { field: "industry", desc: "Setor da empresa" },
                    { field: "linkedin_profile_url", desc: "URL confirmada" },
                  ].map(({ field, desc }) => (
                    <div key={field} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-vero-success mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] text-vero-text font-mono">{field}</p>
                        <p className="text-[10px] text-vero-subtle">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider">Comportamento</p>
                  {[
                    "Matching por LinkedIn URL (mais preciso) ou Nome + Empresa",
                    "Retry automático: 3 tentativas com backoff exponencial",
                    "Rate limit: 1 req/segundo",
                    "Perfis não encontrados mantêm dados originais",
                    "Telefones via webhook assíncrono — polling por até 5 min",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-vero-accent mt-1.5 shrink-0" />
                      <p className="text-[11px] text-vero-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HUBSPOT ── */}
        {tab === "hubspot" && (
          <div className="space-y-4">
            {/* Connection card */}
            <div className="bg-vero-card border border-vero-success/20 rounded-xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FF7A5920] border border-[#FF7A5930] flex items-center justify-center text-xl">🟠</div>
                  <div>
                    <p className="text-base font-bold text-vero-text">HubSpot CRM</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-vero-success" />
                      <span className="text-[11px] text-vero-success font-semibold">Conectado</span>
                      <span className="text-[10px] text-vero-muted">· Bearer Token (Private App)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 border border-vero-border rounded-lg px-3 py-1.5 text-xs text-vero-muted hover:text-vero-text transition-all">
                    <RefreshCw className="w-3.5 h-3.5" />Testar conexão
                  </button>
                  <button className="border border-vero-border rounded-lg p-1.5 text-vero-muted hover:text-vero-text transition-all">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Sincronizados", value: "1.284", color: "#10B981" },
                  { label: "Última sync", value: "12 min", color: "#8A5CF5" },
                  { label: "Criados", value: "847", color: "#10B981" },
                  { label: "Atualizados", value: "437", color: "#C084FC" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-vero-surface border border-vero-border rounded-xl p-4 text-center">
                    <p className="text-xl font-bold mb-0.5" style={{ color }}>{value}</p>
                    <p className="text-[10px] text-vero-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sync logic diagram */}
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <p className="text-sm font-semibold text-vero-text mb-4">Lógica de Sincronização por Perfil</p>
              <div className="font-mono text-[12px] space-y-1 bg-vero-surface border border-vero-border rounded-xl p-4">
                <p className="text-vero-muted">Perfil tem <span className="text-vero-accent">hubspot_id</span>?</p>
                <p className="pl-4 text-vero-text">→ <span className="text-vero-success">SIM</span>  →  <span className="text-vero-accent">PATCH</span> <span className="text-vero-muted">(atualiza pelo ID)</span></p>
                <p className="pl-4 text-vero-text">→ <span className="text-vero-warning">NÃO</span>  →  Busca pelo <span className="text-vero-accent">email</span> no HubSpot</p>
                <p className="pl-14 text-vero-text">Achou? → <span className="text-vero-success">SIM</span> → <span className="text-vero-accent">PATCH</span> <span className="text-vero-muted">(atualiza)</span></p>
                <p className="pl-22 text-vero-text">→ <span className="text-vero-warning">NÃO</span> → <span className="text-vero-success">POST</span>  <span className="text-vero-muted">(cria novo contato)</span></p>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] text-vero-muted font-semibold mb-2">Campos enviados</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["email", "firstname", "lastname", "company", "jobtitle", "phone", "linkedin_url", "enriched=true", "seniority", "industry", "apollo_id"].map(f => (
                      <span key={f} className="text-[10px] bg-vero-surface border border-vero-border rounded px-1.5 py-0.5 font-mono text-vero-muted">{f}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-vero-muted font-semibold mb-2">HTTP Responses</p>
                  <div className="space-y-1">
                    {[["200", "Sucesso total", "#10B981"], ["207", "Sucesso parcial", "#F59E0B"], ["400", "Erro de validação", "#EF4444"], ["500", "Falha total", "#EF4444"]].map(([code, desc, color]) => (
                      <div key={code} className="flex items-center gap-2 text-[11px]">
                        <span className="font-mono font-bold w-8" style={{ color }}>{code}</span>
                        <span className="text-vero-muted">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sync button */}
            <div className="flex items-center gap-3">
              <button
                onClick={runSync}
                disabled={syncing}
                className="flex items-center gap-2 bg-vero-accent hover:bg-vero-accent-light disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all glow-purple-sm"
              >
                {syncing
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sincronizando batch de 100…</>
                  : <><RefreshCw className="w-4 h-4" />Sincronizar com HubSpot</>
                }
              </button>
              <p className="text-xs text-vero-muted">Batch de até 100 perfis · Falha individual não quebra o lote</p>
            </div>

            {/* Sync result */}
            {showSyncResult && (
              <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-vero-border bg-vero-surface">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-vero-accent" />
                    <p className="text-sm font-semibold text-vero-text">Resultado da Sincronização</p>
                    <span className="text-[10px] bg-vero-warning/10 text-vero-warning border border-vero-warning/20 rounded-full px-2 py-0.5 font-semibold">
                      HTTP {mockHubSpotSyncResult.http_status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-vero-muted">
                    <span className="text-vero-success font-semibold">✓ {mockHubSpotSyncResult.created} criados</span>
                    <span className="text-vero-accent font-semibold">↻ {mockHubSpotSyncResult.updated} atualizados</span>
                    <span className="text-vero-danger font-semibold">✕ {mockHubSpotSyncResult.failed} falhos</span>
                    <span className="text-vero-subtle font-semibold">— {mockHubSpotSyncResult.skipped} ignorados</span>
                  </div>
                </div>
                <div className="divide-y divide-vero-border">
                  {mockHubSpotSyncResult.decisions.map(d => {
                    const a = actionLabels[d.action];
                    return (
                      <div key={d.contact_id} className="flex items-center gap-4 px-5 py-3 hover:bg-vero-card-hover transition-all">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: a.color, background: `${a.color}15` }}>{a.label}</span>
                        <span className="text-xs text-vero-text flex-1">{d.nome}</span>
                        <span className="text-[10px] text-vero-subtle">{d.email || "sem email"}</span>
                        {d.hubspot_id && <span className="text-[10px] text-vero-muted font-mono">ID: {d.hubspot_id}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── EXPORT ── */}
        {tab === "export" && (
          <div className="space-y-4">
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <p className="text-sm font-semibold text-vero-text mb-4">Exportar Contatos</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { format: "CSV", desc: "UTF-8-SIG · QUOTE_ALL · compatível Excel", icon: Globe, detail: "leadhunter_leads_YYYYMMDD_HHMMSS.csv" },
                  { format: "JSON", desc: "Exportação completa — original + Apollo + HubSpot", icon: Database, detail: "Payload completo por perfil" },
                  { format: "XLSX", desc: "Excel formatado com abas por email_status", icon: Download, detail: "Abas: Valid · Risky · Unknown" },
                ].map(({ format, desc, icon: Icon, detail }) => (
                  <button key={format} className="text-left p-5 bg-vero-surface border border-vero-border rounded-xl hover:border-vero-accent/30 hover:bg-vero-card transition-all">
                    <Icon className="w-5 h-5 text-vero-accent mb-3" />
                    <p className="text-sm font-bold text-vero-text mb-1">.{format}</p>
                    <p className="text-xs text-vero-muted mb-2">{desc}</p>
                    <p className="text-[10px] text-vero-subtle">{detail}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── WEBHOOKS ── */}
        {tab === "webhook" && (
          <div className="space-y-4">
            <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-vero-border bg-vero-surface">
                <p className="text-sm font-semibold text-vero-text">Webhooks de Telefone — Apollo.io</p>
                <span className="text-[10px] text-vero-muted">Polling a cada 10s · timeout 5min</span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-vero-muted leading-relaxed">
                  Ao enriquecer com opção de telefone, Apollo registra uma <code className="bg-vero-surface px-1 rounded text-vero-accent">webhook_url</code> e envia o número para{" "}
                  <code className="bg-vero-surface px-1 rounded text-vero-accent">POST /api/webhook/apollo/phone</code> quando disponível.
                </p>
                <div className="bg-vero-surface border border-vero-border rounded-xl p-4 font-mono text-xs">
                  <p className="text-vero-subtle mb-1">Endpoint:</p>
                  <p className="text-vero-accent">POST /api/webhook/apollo/phone</p>
                  <p className="text-vero-subtle mt-2 mb-1">Persistência:</p>
                  <p className="text-vero-muted">GCS: <span className="text-vero-text">webhooks/{"{"}apollo_id{"}"}.json</span></p>
                </div>
                <div className="flex items-center gap-2 text-xs text-vero-muted">
                  <Plus className="w-3.5 h-3.5 text-vero-accent" />
                  <span>Adicionar webhook personalizado (Zapier, n8n, Make…)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
