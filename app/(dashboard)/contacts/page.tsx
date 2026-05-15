"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockContacts, mockWebhooksPending, mockWorkspaceStats } from "@/lib/mock-data";
import type { Contact, EmailStatus, SeniorityLevel, ContactStatus } from "@/lib/types";
import {
  Search, Download, Sparkles, ChevronUp, ChevronDown,
  ExternalLink, Mail, Phone, Linkedin, CheckCircle2, TrendingUp,
  SlidersHorizontal, UserPlus, Building2, Briefcase, AlertCircle,
  Clock, HelpCircle, XCircle, Zap,
} from "lucide-react";

// ─── Config maps ──────────────────────────────────────────────────────────────

const emailStatusConfig: Record<EmailStatus, { label: string; color: string; bg: string; border: string; icon: typeof CheckCircle2 }> = {
  valid:     { label: "Valid",     color: "#10B981", bg: "#064E3B20", border: "#10B98130", icon: CheckCircle2 },
  risky:     { label: "Risky",     color: "#F59E0B", bg: "#45260A20", border: "#F59E0B30", icon: AlertCircle },
  unknown:   { label: "Unknown",   color: "#6B7280", bg: "#11182720", border: "#37415130", icon: HelpCircle },
  not_found: { label: "Not Found", color: "#EF4444", bg: "#45060620", border: "#EF444430", icon: XCircle },
};

const seniorityConfig: Record<SeniorityLevel, { label: string; color: string; bg: string }> = {
  "c-level": { label: "C-Level",   color: "#8A5CF5", bg: "#4C1D9520" },
  "director":{ label: "Director",  color: "#C084FC", bg: "#6B21A820" },
  "manager": { label: "Manager",   color: "#10B981", bg: "#064E3B20" },
  "senior":  { label: "Senior",    color: "#F59E0B", bg: "#45260A20" },
  "entry":   { label: "Entry",     color: "#6B7280", bg: "#11182720" },
};

const contactStatusConfig: Record<ContactStatus, { label: string; color: string; bg: string; border: string }> = {
  high_intent:   { label: "High Intent", color: "#10B981", bg: "#064E3B20", border: "#10B98130" },
  medium_intent: { label: "Medium",      color: "#F59E0B", bg: "#45260A20", border: "#F59E0B30" },
  low_intent:    { label: "Low",         color: "#6B7280", bg: "#11182720", border: "#374151" },
  unqualified:   { label: "Unqualified", color: "#EF4444", bg: "#45060620", border: "#EF444430" },
};

// ─── Badges ───────────────────────────────────────────────────────────────────

function EmailBadge({ status }: { status?: EmailStatus }) {
  if (!status) return <span className="text-[10px] text-vero-subtle">—</span>;
  const c = emailStatusConfig[status];
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold border"
      style={{ color: c.color, background: c.bg, borderColor: c.border }}>
      <Icon className="w-2.5 h-2.5" />{c.label}
    </span>
  );
}

function SeniorityBadge({ level }: { level?: SeniorityLevel }) {
  if (!level) return <span className="text-[10px] text-vero-subtle">—</span>;
  const c = seniorityConfig[level];
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
      style={{ color: c.color, background: c.bg }}>{c.label}</span>
  );
}

function PhoneBadge({ status, phone }: { status?: string; phone?: string }) {
  if (!status || status === "not_found") return <span className="text-[10px] text-vero-subtle">—</span>;
  if (status === "pending") return (
    <span className="inline-flex items-center gap-1 text-[10px] text-vero-warning">
      <Clock className="w-3 h-3 pulse-dot" />aguardando
    </span>
  );
  return <span className="text-[10px] text-vero-text font-mono">{phone}</span>;
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function ContactRow({ contact, expanded, onToggle }: { contact: Contact; expanded: boolean; onToggle: () => void }) {
  const es = contact.email_status ? emailStatusConfig[contact.email_status] : null;
  const cs = contactStatusConfig[contact.status_contato];

  return (
    <>
      <tr className="border-b border-vero-border hover:bg-vero-card-hover transition-colors cursor-pointer" onClick={onToggle}>
        {/* Contato */}
        <td className="py-3 px-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${contact.status_contato === "high_intent" ? "#8A5CF5, #6D28D9" : contact.status_contato === "medium_intent" ? "#F59E0B, #D97706" : "#4B5563, #374151"})` }}>
              {contact.nome_nutrido.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-vero-text flex items-center gap-1 truncate">
                {contact.nome_nutrido}
                {contact.nome_original !== contact.nome_nutrido && <Sparkles className="w-2.5 h-2.5 text-vero-accent shrink-0" />}
              </p>
              {contact.hubspot_synced && (
                <span className="text-[9px] text-vero-success">● HubSpot</span>
              )}
            </div>
          </div>
        </td>

        {/* Email + status */}
        <td className="py-3 px-3">
          <p className="text-[11px] text-vero-text flex items-center gap-1 mb-0.5">
            {contact.email_nutrido || contact.email_original || "—"}
            {contact.email_nutrido && <Sparkles className="w-2 h-2 text-vero-accent shrink-0" />}
          </p>
          <EmailBadge status={contact.email_status} />
        </td>

        {/* Telefone */}
        <td className="py-3 px-3">
          <PhoneBadge status={contact.phone_status} phone={contact.telefone_nutrido} />
        </td>

        {/* Cargo */}
        <td className="py-3 px-3">
          <p className="text-[11px] text-vero-accent-light flex items-center gap-1">
            <Sparkles className="w-2 h-2 text-vero-accent shrink-0" />{contact.cargo_nutrido}
          </p>
          <p className="text-[9px] text-vero-subtle font-mono">{contact.cargo_original}</p>
        </td>

        {/* Seniority */}
        <td className="py-3 px-3"><SeniorityBadge level={contact.seniority_level} /></td>

        {/* Empresa */}
        <td className="py-3 px-3">
          <p className="text-[11px] text-vero-text">{contact.empresa_nutrido}</p>
          <p className="text-[9px] text-vero-subtle">{contact.industry || "—"}</p>
        </td>

        {/* Status */}
        <td className="py-3 px-3">
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold border"
            style={{ color: cs.color, background: cs.bg, borderColor: cs.border }}>
            {cs.label}
          </span>
        </td>

        {/* Tokens */}
        <td className="py-3 px-3 text-center">
          <span className="text-[11px] font-mono text-vero-muted">{contact.tokens_spent}</span>
        </td>

        {/* Expand */}
        <td className="py-3 px-3">
          {expanded ? <ChevronUp className="w-3.5 h-3.5 text-vero-subtle" /> : <ChevronDown className="w-3.5 h-3.5 text-vero-subtle" />}
        </td>
      </tr>

      {/* Expanded detail */}
      {expanded && (
        <tr className="border-b border-vero-border bg-vero-surface/40">
          <td colSpan={9} className="px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Contact info */}
              <div>
                <p className="text-[9px] text-vero-subtle font-semibold uppercase tracking-wider mb-2">Contato</p>
                <div className="space-y-1.5">
                  {contact.email_nutrido && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-vero-accent shrink-0" />
                      <span className="text-[11px] text-vero-text">{contact.email_nutrido}</span>
                      <Sparkles className="w-2 h-2 text-vero-accent" />
                    </div>
                  )}
                  {contact.telefone_nutrido && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-vero-accent shrink-0" />
                      <span className="text-[11px] text-vero-text">{contact.telefone_nutrido}</span>
                      <Sparkles className="w-2 h-2 text-vero-accent" />
                    </div>
                  )}
                  {contact.telefone_original && !contact.telefone_nutrido && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-vero-subtle shrink-0" />
                      <span className="text-[11px] text-vero-subtle font-mono">{contact.telefone_original}</span>
                    </div>
                  )}
                  {contact.linkedin_profile_url && (
                    <div className="flex items-center gap-1.5">
                      <Linkedin className="w-3 h-3 text-vero-muted shrink-0" />
                      <a href="#" className="text-[11px] text-vero-accent hover:underline truncate">{contact.linkedin_profile_url}</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Apollo */}
              <div>
                <p className="text-[9px] text-vero-subtle font-semibold uppercase tracking-wider mb-2">Apollo.io</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">Apollo ID</span>
                    <span className="text-vero-text font-mono text-[10px]">{contact.apollo_id || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">Indústria</span>
                    <span className="text-vero-text text-right">{contact.industry || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">Seniority</span>
                    <SeniorityBadge level={contact.seniority_level} />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">Telefone</span>
                    <span className={`text-[10px] font-semibold ${contact.phone_status === "received" ? "text-vero-success" : contact.phone_status === "pending" ? "text-vero-warning" : "text-vero-subtle"}`}>
                      {contact.phone_status === "received" ? "Recebido" : contact.phone_status === "pending" ? "Aguardando webhook" : "Não encontrado"}
                    </span>
                  </div>
                </div>
              </div>

              {/* HubSpot */}
              <div>
                <p className="text-[9px] text-vero-subtle font-semibold uppercase tracking-wider mb-2">HubSpot</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">ID</span>
                    <span className="text-vero-text font-mono text-[10px]">{contact.hubspot_id || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">Ação</span>
                    <span className={`text-[10px] font-semibold ${
                      contact.hubspot_action === "created" ? "text-vero-success" :
                      contact.hubspot_action?.startsWith("updated") ? "text-vero-accent" :
                      "text-vero-subtle"
                    }`}>
                      {contact.hubspot_action === "created" ? "Criado" :
                       contact.hubspot_action === "updated_by_id" ? "Atualizado por ID" :
                       contact.hubspot_action === "updated_by_email" ? "Atualizado por email" :
                       "Não sincronizado"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vero-subtle">enriched</span>
                    <span className={`text-[10px] ${contact.hubspot_synced ? "text-vero-success" : "text-vero-subtle"}`}>
                      {contact.hubspot_synced ? "✓ true" : "false"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <p className="text-[9px] text-vero-subtle font-semibold uppercase tracking-wider mb-2">Ações</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-vero-card border border-vero-border rounded-lg text-[11px] text-vero-muted hover:text-vero-text hover:border-vero-accent/20 transition-all">
                    <Zap className="w-3 h-3" /> Enriquecer novamente
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-vero-card border border-vero-border rounded-lg text-[11px] text-vero-muted hover:text-vero-text hover:border-vero-accent/20 transition-all">
                    <ExternalLink className="w-3 h-3" /> Ver no HubSpot
                  </button>
                  {contact.mudanca_recente && (
                    <div className="flex items-start gap-1.5 px-3 py-2 bg-vero-warning/5 border border-vero-warning/20 rounded-lg">
                      <TrendingUp className="w-3 h-3 text-vero-warning shrink-0 mt-0.5" />
                      <p className="text-[10px] text-vero-warning">{contact.mudanca_recente}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [emailFilter, setEmailFilter] = useState<EmailStatus | "all">("all");
  const [seniorityFilter, setSeniorityFilter] = useState<SeniorityLevel | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const stats = mockWorkspaceStats;
  const pendingPhones = mockWebhooksPending.filter(w => w.status === "pending").length;

  const filtered = mockContacts.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || c.nome_nutrido.toLowerCase().includes(q) || c.empresa_nutrido.toLowerCase().includes(q) || (c.email_nutrido || "").toLowerCase().includes(q);
    const matchEmail = emailFilter === "all" || c.email_status === emailFilter;
    const matchSeniority = seniorityFilter === "all" || c.seniority_level === seniorityFilter;
    return matchSearch && matchEmail && matchSeniority;
  });

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Contact Manager" subtitle={`${mockContacts.length} contatos · Apollo.io enriched`} />

      <div className="p-6 space-y-4">
        {/* ── Stats bar ── */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: "Total Leads", value: stats.total_contacts.toLocaleString("pt-BR"), icon: UserPlus, color: "#8A5CF5" },
            { label: "Emails Encontrados", value: stats.emails_found.toLocaleString("pt-BR"), icon: Mail, color: "#10B981" },
            { label: "Emails Válidos", value: stats.emails_valid.toLocaleString("pt-BR"), icon: CheckCircle2, color: "#10B981" },
            { label: "Empresas Únicas", value: stats.unique_companies.toLocaleString("pt-BR"), icon: Building2, color: "#C084FC" },
            { label: "Cargos Únicos", value: stats.unique_titles.toLocaleString("pt-BR"), icon: Briefcase, color: "#F59E0B" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-vero-card border border-vero-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                <p className="text-[10px] text-vero-muted">{label}</p>
              </div>
              <p className="text-xl font-bold text-vero-text">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Webhook pending banner ── */}
        {pendingPhones > 0 && (
          <div className="flex items-center gap-3 bg-vero-warning/5 border border-vero-warning/20 rounded-xl px-4 py-3">
            <Clock className="w-4 h-4 text-vero-warning shrink-0 pulse-dot" />
            <p className="text-xs text-vero-warning">
              <strong>{pendingPhones} telefone{pendingPhones > 1 ? "s" : ""} aguardando webhook</strong> do Apollo.io — polling ativo a cada 10s por até 5 minutos.
            </p>
            {mockWebhooksPending.filter(w => w.status === "pending").map(w => (
              <span key={w.apollo_id} className="text-[10px] text-vero-warning/70">{w.contact_name}</span>
            ))}
          </div>
        )}

        {/* ── Filters + search ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-vero-card border border-vero-border rounded-lg px-3 py-2 flex-1 min-w-52">
            <Search className="w-3.5 h-3.5 text-vero-subtle shrink-0" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, email ou empresa..." className="bg-transparent text-xs text-vero-text placeholder-vero-subtle outline-none flex-1" />
          </div>

          {/* Email status filter */}
          <div className="flex items-center gap-1">
            {(["all", "valid", "risky", "unknown", "not_found"] as const).map(s => {
              const conf = s !== "all" ? emailStatusConfig[s] : null;
              return (
                <button key={s} onClick={() => setEmailFilter(s)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all font-semibold ${emailFilter === s ? "bg-vero-accent/10 border-vero-accent/30 text-vero-accent-light" : "border-vero-border text-vero-muted hover:text-vero-text"}`}
                  style={emailFilter === s && conf ? { borderColor: conf.border, color: conf.color, background: conf.bg } : {}}>
                  {s === "all" ? "Todos emails" : emailStatusConfig[s].label}
                </button>
              );
            })}
          </div>

          {/* Seniority filter */}
          <select value={seniorityFilter} onChange={e => setSeniorityFilter(e.target.value as SeniorityLevel | "all")}
            className="bg-vero-card border border-vero-border rounded-lg px-3 py-2 text-xs text-vero-muted outline-none focus:border-vero-accent/40 transition-colors">
            <option value="all">Todos os níveis</option>
            {(["c-level", "director", "manager", "senior", "entry"] as SeniorityLevel[]).map(l => (
              <option key={l} value={l}>{seniorityConfig[l].label}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-vero-accent/10 border border-vero-accent/20 rounded-lg text-xs text-vero-accent hover:bg-vero-accent/15 transition-all">
              <Download className="w-3.5 h-3.5" />Exportar
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-vero-accent hover:bg-vero-accent-light text-white rounded-lg text-xs font-semibold transition-all">
              <Zap className="w-3.5 h-3.5" />Enriquecer todos
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] text-vero-subtle">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-vero-accent" />Campo nutrido por Apollo.io</span>
          <span className="flex items-center gap-1"><span className="text-vero-subtle font-mono">ORIGINAL</span>Dado original preservado</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-vero-success" />Sincronizado no HubSpot</span>
        </div>

        {/* ── Table ── */}
        <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-vero-border bg-vero-surface">
                  {["Contato", "Email ✦ + Status", "Telefone ✦", "Cargo ✦ nutrido", "Seniority", "Empresa / Indústria", "Intent", "Tokens", ""].map((h, i) => (
                    <th key={i} className="text-left py-3 px-3 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider whitespace-nowrap">
                      {h.includes("✦") ? (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-vero-accent" />
                          {h.replace(" ✦ nutrido", "").replace(" ✦ + Status", "").replace(" ✦", "")}
                        </span>
                      ) : h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-xs text-vero-muted">Nenhum contato encontrado.</td></tr>
                ) : (
                  filtered.map(c => (
                    <ContactRow key={c.id} contact={c} expanded={expanded === c.id}
                      onToggle={() => setExpanded(expanded === c.id ? null : c.id)} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-vero-border bg-vero-surface text-xs text-vero-muted">
            <span>Mostrando <strong className="text-vero-text">{filtered.length}</strong> de <strong className="text-vero-text">{mockContacts.length}</strong> contatos</span>
            <span>{mockContacts.filter(c => c.hubspot_synced).length} sincronizados no HubSpot · {mockContacts.filter(c => c.email_status === "valid").length} emails válidos</span>
          </div>
        </div>
      </div>

      {/* ── Export Modal ── */}
      {showExport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-vero-card border border-vero-border rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-sm font-semibold text-vero-text mb-1">Exportar Contatos</h2>
            <p className="text-xs text-vero-muted mb-5">{filtered.length} contatos · inclui campos original + nutrido</p>
            <div className="space-y-2">
              {[
                { f: "CSV", desc: "UTF-8-SIG · compatível Excel · leadhunter_leads_YYYYMMDD.csv" },
                { f: "JSON", desc: "Payload completo — original + Apollo fields + HubSpot IDs" },
                { f: "XLSX", desc: "Excel formatado com abas separadas por status de email" },
              ].map(({ f, desc }) => (
                <button key={f} onClick={() => setShowExport(false)}
                  className="w-full text-left flex items-center gap-3 p-3.5 bg-vero-surface border border-vero-border rounded-xl hover:border-vero-accent/30 transition-all">
                  <Download className="w-4 h-4 text-vero-accent shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-vero-text">.{f}</p>
                    <p className="text-[10px] text-vero-muted">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
