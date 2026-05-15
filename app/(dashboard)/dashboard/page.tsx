"use client";

import Topbar from "@/components/layout/topbar";
import { mockWorkspaceStats, mockHuntSessions, mockContacts, mockApolloCredits, mockWebhooksPending } from "@/lib/mock-data";
import {
  Users, Building2, Crosshair, Coins, TrendingUp, ArrowRight,
  Sparkles, CheckCircle2, Clock, Mail, Briefcase, BarChart3,
  Zap, Phone, Upload,
} from "lucide-react";
import Link from "next/link";

const apolloExportPct = Math.round((mockApolloCredits.export_used / mockApolloCredits.export_total) * 100);
const apolloPhonePct = Math.round((mockApolloCredits.phone_used / mockApolloCredits.phone_total) * 100);
const getApolloColor = (pct: number) => pct >= 80 ? "#EF4444" : pct >= 50 ? "#F59E0B" : "#10B981";

export default function DashboardPage() {
  const stats = mockWorkspaceStats;
  const pendingPhones = mockWebhooksPending.filter(w => w.status === "pending").length;

  const topStats = [
    { label: "Total Leads", value: stats.total_contacts.toLocaleString("pt-BR"), change: "+143 esta semana", icon: Users, color: "#8A5CF5", trend: true },
    { label: "Emails Encontrados", value: stats.emails_found.toLocaleString("pt-BR"), change: `${Math.round(stats.emails_found / stats.total_contacts * 100)}% de cobertura`, icon: Mail, color: "#10B981", trend: true },
    { label: "Emails Válidos", value: stats.emails_valid.toLocaleString("pt-BR"), change: `${Math.round(stats.emails_valid / stats.emails_found * 100)}% dos encontrados`, icon: CheckCircle2, color: "#10B981", trend: false },
    { label: "Empresas Únicas", value: stats.unique_companies.toLocaleString("pt-BR"), change: "+28 esta semana", icon: Building2, color: "#C084FC", trend: true },
    { label: "Cargos Únicos", value: stats.unique_titles.toLocaleString("pt-BR"), change: "Mapeados via Apollo", icon: Briefcase, color: "#F59E0B", trend: false },
    { label: "HubSpot Sync'd", value: stats.hubspot_synced.toLocaleString("pt-BR"), change: "enriched=true ✓", icon: Zap, color: "#10B981", trend: false },
  ];

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Dashboard" subtitle={`Workspace · ${new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}`} />

      <div className="p-6 space-y-5">
        {/* ── Webhook pending banner ── */}
        {pendingPhones > 0 && (
          <div className="flex items-center gap-3 bg-vero-warning/5 border border-vero-warning/20 rounded-xl px-4 py-3">
            <Phone className="w-4 h-4 text-vero-warning shrink-0 pulse-dot" />
            <p className="text-xs text-vero-warning">
              <strong>{pendingPhones} webhook{pendingPhones > 1 ? "s" : ""} de telefone aguardando</strong> do Apollo.io — {mockWebhooksPending.map(w => w.contact_name).join(", ")}
            </p>
            <Link href="/contacts" className="ml-auto text-[11px] text-vero-warning underline shrink-0">Ver contatos</Link>
          </div>
        )}

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
          {topStats.map(({ label, value, change, icon: Icon, color, trend }) => (
            <div key={label} className="bg-vero-card border border-vero-border rounded-xl p-4 hover:border-vero-accent/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                {trend && <TrendingUp className="w-3 h-3 text-vero-success" />}
              </div>
              <p className="text-xl font-bold text-vero-text mb-0.5">{value}</p>
              <p className="text-[10px] text-vero-muted">{label}</p>
              <p className="text-[9px] text-vero-subtle mt-0.5">{change}</p>
            </div>
          ))}
        </div>

        {/* ── Middle row ── */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Enrichment rate */}
          <div className="bg-vero-card border border-vero-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-vero-accent" />
              <span className="text-sm font-semibold text-vero-text">Taxa de Enriquecimento</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-bold" style={{ background: "linear-gradient(135deg,#A78BFA,#8A5CF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {stats.enrichment_rate}%
              </span>
              <span className="text-xs text-vero-success mb-1.5">▲ 2.1% vs mês anterior</span>
            </div>
            <div className="w-full h-2 bg-vero-border rounded-full overflow-hidden mb-4">
              <div className="h-full rounded-full" style={{ width: `${stats.enrichment_rate}%`, background: "linear-gradient(90deg,#8A5CF5,#C084FC)" }} />
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-vero-muted">Contatos enriquecidos</span><span className="font-mono text-vero-text">{(stats.total_contacts * 0.893).toFixed(0)}/{stats.total_contacts}</span></div>
              <div className="flex justify-between"><span className="text-vero-muted">Via Apollo.io</span><span className="font-mono text-vero-text">100%</span></div>
            </div>
          </div>

          {/* Apollo credits */}
          <div className="bg-vero-card border border-vero-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-vero-success" />
              <span className="text-sm font-semibold text-vero-text">Créditos Apollo.io</span>
            </div>
            <div className="space-y-4">
              {[
                { label: "Export", used: mockApolloCredits.export_used, total: mockApolloCredits.export_total, pct: apolloExportPct },
                { label: "Telefone", used: mockApolloCredits.phone_used, total: mockApolloCredits.phone_total, pct: apolloPhonePct },
              ].map(({ label, used, total, pct }) => {
                const color = getApolloColor(pct);
                return (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-vero-muted">{label}</span>
                      <span className="font-mono font-semibold" style={{ color }}>{used.toLocaleString("pt-BR")} / {total.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="w-full h-2 bg-vero-border rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                    <p className="text-[10px] mt-1" style={{ color }}>{pct >= 80 ? "⚠ Crítico" : pct >= 50 ? "Atenção" : "OK"} · {pct}% usado</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Hunt */}
          <div className="bg-vero-card border border-vero-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-vero-warning" />
                <span className="text-sm font-semibold text-vero-text">Hunt Ativo</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] bg-vero-warning/10 text-vero-warning border border-vero-warning/20 rounded-full px-2 py-0.5">
                <span className="w-1 h-1 bg-vero-warning rounded-full pulse-dot" />Running
              </span>
            </div>
            {(() => {
              const active = mockHuntSessions.find(h => h.status === "running");
              if (!active) return <p className="text-xs text-vero-muted">Nenhum hunt ativo.</p>;
              return (
                <>
                  <p className="text-sm font-semibold text-vero-text mb-1 truncate">{active.nome}</p>
                  <p className="text-xs text-vero-muted mb-4">{active.fontes.join(", ")} · {active.contatos_encontrados} capturados</p>
                  <div className="w-full h-1.5 bg-vero-border rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full" style={{ width: `${active.progresso}%`, background: "linear-gradient(90deg,#F59E0B,#FBBF24)" }} />
                  </div>
                  <div className="flex justify-between text-xs text-vero-muted">
                    <span>{active.progresso}% concluído</span>
                    <span className="font-mono">{active.tokens_consumidos} tokens</span>
                  </div>
                </>
              );
            })()}
            <Link href="/hunting" className="mt-4 flex items-center gap-1.5 text-xs text-vero-accent hover:text-vero-accent-light transition-colors">
              Ir para Hunting Room <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Recent contacts */}
          <div className="bg-vero-card border border-vero-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-vero-text">Últimos Contatos Enriquecidos</span>
              <Link href="/contacts" className="text-xs text-vero-accent hover:text-vero-accent-light flex items-center gap-1">Ver todos <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {mockContacts.slice(0, 5).map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-vero-surface border border-vero-border rounded-lg hover:border-vero-accent/20 transition-all">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c.status_contato === "high_intent" ? "#8A5CF5,#6D28D9" : "#F59E0B,#D97706"})` }}>
                    {c.nome_nutrido.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-vero-text flex items-center gap-1 truncate">
                      {c.nome_nutrido}<Sparkles className="w-2.5 h-2.5 text-vero-accent shrink-0" />
                    </p>
                    <p className="text-[10px] text-vero-subtle truncate">{c.cargo_nutrido} · {c.empresa_nutrido}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-0.5">
                    {c.email_status === "valid" && <span className="text-[9px] block text-vero-success font-semibold">✓ valid</span>}
                    {c.hubspot_synced && <span className="text-[9px] block text-vero-accent">HubSpot</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-vero-text">Ações Rápidas</p>
            {[
              { label: "Importar Perfis", sub: "Chrome ext · Texto · HTML · Listas", icon: Upload, href: "/import", color: "#8A5CF5" },
              { label: "Hunting / X-Ray LinkedIn", sub: "Multi-fonte · SerpAPI · Sales Nav", icon: Crosshair, href: "/hunting", color: "#F59E0B" },
              { label: "Enriquecer via Apollo", sub: `${mockApolloCredits.export_used} créditos usados`, icon: Zap, href: "/integrations", color: "#10B981" },
              { label: "Sincronizar HubSpot", sub: `${stats.hubspot_synced.toLocaleString("pt-BR")} contatos sync'd`, icon: BarChart3, href: "/integrations", color: "#C084FC" },
            ].map(({ label, sub, icon: Icon, href, color }) => (
              <Link key={label} href={href}
                className="flex items-center gap-3 p-3.5 bg-vero-card border border-vero-border rounded-xl hover:border-vero-accent/30 hover:bg-vero-card-hover transition-all">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-vero-text">{label}</p>
                  <p className="text-[10px] text-vero-subtle">{sub}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-vero-subtle shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
