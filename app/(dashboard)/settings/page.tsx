"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockTeamMembers } from "@/lib/mock-data";
import type { WorkspaceMember } from "@/lib/types";
import {
  Users, Building2, Coins, Bell, Crown, Eye, ShieldCheck,
  Plus, Trash2, Edit3, CheckCircle2, RefreshCw, Copy,
  ToggleLeft, ToggleRight, Key, AlertTriangle,
} from "lucide-react";

type SettingsTab = "team" | "workspace" | "billing" | "env";

const roleIcons: Record<string, typeof Crown> = { admin: Crown, member: Users, viewer: Eye };
const roleColors: Record<string, string> = { admin: "#8A5CF5", member: "#10B981", viewer: "#6B7280" };

function MemberRow({ member, onToggle }: { member: WorkspaceMember; onToggle: (id: string) => void }) {
  const pct = Math.round((member.tokens_used / member.tokens_quota) * 100);
  const barColor = pct >= 80 ? "#EF4444" : pct >= 50 ? "#F59E0B" : "#10B981";
  const RoleIcon = roleIcons[member.role] || Users;

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-vero-card-hover transition-all">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
        style={{ backgroundColor: member.avatar_color }}>
        {member.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-vero-text truncate">{member.nome}</p>
          {member.status === "invited" && (
            <span className="text-[9px] bg-vero-warning/10 text-vero-warning border border-vero-warning/20 rounded-full px-1.5 py-0.5">Pendente</span>
          )}
          {member.status === "inactive" && (
            <span className="text-[9px] bg-vero-danger/10 text-vero-danger border border-vero-danger/20 rounded-full px-1.5 py-0.5">Inativo</span>
          )}
        </div>
        <p className="text-[10px] text-vero-subtle">@{member.username} · {member.email}</p>
      </div>

      {/* Role */}
      <div className="flex items-center gap-1.5 w-24 shrink-0">
        <RoleIcon className="w-3.5 h-3.5 shrink-0" style={{ color: roleColors[member.role] }} />
        <span className="text-xs capitalize" style={{ color: roleColors[member.role] }}>{member.role}</span>
      </div>

      {/* Token bar */}
      <div className="w-32 shrink-0">
        <div className="flex justify-between text-[9px] mb-1">
          <span className="text-vero-subtle">{member.tokens_used.toLocaleString("pt-BR")}</span>
          <span className="text-vero-subtle">/ {member.tokens_quota.toLocaleString("pt-BR")}</span>
        </div>
        <div className="w-full h-1.5 bg-vero-border rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
        </div>
      </div>

      {/* Last access */}
      <p className="text-[10px] text-vero-muted w-16 text-right shrink-0">{member.ultimo_acesso}</p>

      {/* Since */}
      <p className="text-[10px] text-vero-subtle w-20 shrink-0 text-right">{member.created_at}</p>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggle(member.id)}
          className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all ${member.status === "active" ? "border-vero-border text-vero-muted hover:text-vero-success hover:border-vero-success/30" : "border-vero-border text-vero-subtle hover:text-vero-warning hover:border-vero-warning/30"}`}
          title={member.status === "active" ? "Desativar" : "Ativar"}>
          {member.status === "active" ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-vero-border text-vero-subtle hover:text-vero-accent hover:border-vero-accent/30 transition-all" title="Redefinir senha">
          <Key className="w-3 h-3" />
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-vero-border text-vero-subtle hover:text-vero-danger hover:border-vero-danger/30 transition-all" title="Excluir">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("team");
  const [members, setMembers] = useState(mockTeamMembers);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ nome: "", username: "", email: "", role: "member", quota: 3000 });
  const [copiedEnv, setCopiedEnv] = useState<string | null>(null);

  const toggleMemberStatus = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" as "active" | "inactive" } : m));
  };

  const copyEnv = (key: string, val: string) => {
    navigator.clipboard.writeText(`${key}=${val}`);
    setCopiedEnv(key);
    setTimeout(() => setCopiedEnv(null), 1500);
  };

  const envVars = [
    { key: "APOLLO_API_KEY", val: "pat-xxx-•••••••••", required: true, desc: "Chave da API Apollo.io" },
    { key: "HUBSPOT_API_KEY", val: "pat-yyy-•••••••••", required: false, desc: "Private App Token do HubSpot" },
    { key: "SERPAPI_KEY", val: "•••••••••••••••••••", required: false, desc: "SerpAPI para X-Ray LinkedIn" },
    { key: "PROJECT_ID", val: "gcp-project-vero", required: false, desc: "Google Cloud Project ID" },
    { key: "DATASET_ID", val: "sts_LeadHunter", required: false, desc: "BigQuery Dataset (autenticação)" },
    { key: "GCS_BUCKET_NAME", val: "vero-io-bucket", required: false, desc: "Bucket para listas e webhooks" },
    { key: "ADMIN_USERS", val: "yago,ana", required: false, desc: "Usernames com acesso admin" },
  ];

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Settings" subtitle="Equipe, workspace, billing e variáveis de ambiente" />

      <div className="p-6">
        {/* Tab nav */}
        <div className="flex items-center gap-1 mb-6 border-b border-vero-border">
          {[
            { id: "team" as SettingsTab, label: "Equipe", icon: Users },
            { id: "workspace" as SettingsTab, label: "Workspace", icon: Building2 },
            { id: "billing" as SettingsTab, label: "Créditos & Billing", icon: Coins },
            { id: "env" as SettingsTab, label: "Variáveis de Ambiente", icon: Key },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-all -mb-px ${activeTab === id ? "border-vero-accent text-vero-accent" : "border-transparent text-vero-muted hover:text-vero-text"}`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>

        {/* ── TEAM ── */}
        {activeTab === "team" && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Membros ativos", value: members.filter(m => m.status === "active").length, color: "#8A5CF5" },
                { label: "Convites pendentes", value: members.filter(m => m.status === "invited").length, color: "#F59E0B" },
                { label: "Tokens usados (equipe)", value: members.reduce((s, m) => s + m.tokens_used, 0).toLocaleString("pt-BR"), color: "#C084FC" },
                { label: "Tokens disponíveis", value: (members.reduce((s, m) => s + m.tokens_quota, 0) - members.reduce((s, m) => s + m.tokens_used, 0)).toLocaleString("pt-BR"), color: "#10B981" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-vero-card border border-vero-border rounded-xl p-4">
                  <p className="text-xl font-bold mb-0.5" style={{ color }}>{value}</p>
                  <p className="text-xs text-vero-muted">{label}</p>
                </div>
              ))}
            </div>

            {/* Team table */}
            <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-vero-border bg-vero-surface">
                <p className="text-sm font-semibold text-vero-text">Membros da Equipe</p>
                <button onClick={() => setShowCreateUser(true)}
                  className="flex items-center gap-1.5 bg-vero-accent hover:bg-vero-accent-light text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all">
                  <Plus className="w-3 h-3" />Convidar membro
                </button>
              </div>

              {/* Col headers */}
              <div className="flex items-center gap-4 px-5 py-2 border-b border-vero-border bg-vero-surface/50">
                <div className="w-9 shrink-0" />
                <div className="flex-1 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider">Usuário</div>
                <div className="w-24 shrink-0 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider">Função</div>
                <div className="w-32 shrink-0 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider">Tokens</div>
                <div className="w-16 shrink-0 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider text-right">Acesso</div>
                <div className="w-20 shrink-0 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider text-right">Desde</div>
                <div className="shrink-0 w-24 text-[9px] font-semibold text-vero-subtle uppercase tracking-wider text-right">Ações</div>
              </div>

              <div className="divide-y divide-vero-border">
                {members.map(m => <MemberRow key={m.id} member={m} onToggle={toggleMemberStatus} />)}
              </div>
            </div>

            {/* Create user modal */}
            {showCreateUser && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreateUser(false)}>
                <div className="bg-vero-card border border-vero-border rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                  <h2 className="text-sm font-semibold text-vero-text mb-5">Convidar Novo Membro</h2>
                  <div className="space-y-4">
                    {[
                      { label: "Nome completo", field: "nome", type: "text", placeholder: "João Silva" },
                      { label: "Username", field: "username", type: "text", placeholder: "joao.silva" },
                      { label: "Email", field: "email", type: "email", placeholder: "joao@empresa.com" },
                    ].map(({ label, field, type, placeholder }) => (
                      <div key={field}>
                        <label className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">{label}</label>
                        <input type={type} placeholder={placeholder}
                          value={(newUser as Record<string, string>)[field]}
                          onChange={e => setNewUser(p => ({ ...p, [field]: e.target.value }))}
                          className="w-full bg-vero-surface border border-vero-border rounded-xl px-3 py-2.5 text-sm text-vero-text placeholder-vero-subtle outline-none focus:border-vero-accent/40 transition-colors" />
                      </div>
                    ))}
                    <div>
                      <label className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">Função</label>
                      <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}
                        className="w-full bg-vero-surface border border-vero-border rounded-xl px-3 py-2.5 text-sm text-vero-text outline-none focus:border-vero-accent/40">
                        <option value="member">Membro (member)</option>
                        <option value="viewer">Leitor (viewer)</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">
                        Quota de Tokens: <span className="text-vero-accent">{newUser.quota.toLocaleString("pt-BR")}</span>
                      </label>
                      <input type="range" min={500} max={10000} step={500} value={newUser.quota}
                        onChange={e => setNewUser(p => ({ ...p, quota: parseInt(e.target.value) }))}
                        className="w-full accent-[#8A5CF5] cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setShowCreateUser(false)}
                      className="flex-1 py-2.5 border border-vero-border rounded-xl text-xs text-vero-muted hover:text-vero-text transition-all">Cancelar</button>
                    <button onClick={() => setShowCreateUser(false)}
                      className="flex-1 py-2.5 bg-vero-accent hover:bg-vero-accent-light text-white rounded-xl text-xs font-semibold transition-all">Enviar convite</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── WORKSPACE ── */}
        {activeTab === "workspace" && (
          <div className="max-w-xl space-y-4">
            <div className="bg-vero-card border border-vero-border rounded-xl p-5 space-y-4">
              <p className="text-sm font-semibold text-vero-text">Workspace</p>
              {[
                { label: "Nome", value: "Vero Intelligence", type: "text" },
                { label: "Slug", value: "vero-intelligence", prefix: "app.vero.io/ws/" },
              ].map(({ label, value, type, prefix }) => (
                <div key={label}>
                  <label className="text-[11px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">{label}</label>
                  {prefix ? (
                    <div className="flex">
                      <span className="bg-vero-border px-3 py-2.5 text-[11px] text-vero-subtle rounded-l-xl border border-vero-border border-r-0">{prefix}</span>
                      <input defaultValue={value} className="flex-1 bg-vero-surface border border-vero-border rounded-r-xl px-3 py-2.5 text-sm text-vero-text outline-none focus:border-vero-accent/40" />
                    </div>
                  ) : (
                    <input type={type} defaultValue={value} className="w-full bg-vero-surface border border-vero-border rounded-xl px-3 py-2.5 text-sm text-vero-text outline-none focus:border-vero-accent/40" />
                  )}
                </div>
              ))}
              <button className="w-full py-2.5 bg-vero-accent hover:bg-vero-accent-light text-white rounded-xl text-xs font-semibold transition-all">Salvar</button>
            </div>
            <div className="bg-vero-card border border-vero-danger/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-vero-danger" />
                <p className="text-sm font-semibold text-vero-danger">Zona de Perigo</p>
              </div>
              <p className="text-xs text-vero-muted mb-4">Ações irreversíveis. Confirme antes de prosseguir.</p>
              <button className="flex items-center gap-2 px-4 py-2 border border-vero-danger/30 text-vero-danger rounded-lg text-xs hover:bg-vero-danger/5 transition-all">
                <Trash2 className="w-3.5 h-3.5" />Excluir Workspace
              </button>
            </div>
          </div>
        )}

        {/* ── BILLING ── */}
        {activeTab === "billing" && (
          <div className="space-y-4 max-w-2xl">
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <p className="text-sm font-semibold text-vero-text mb-4">Uso de Tokens — Maio 2026</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold" style={{ background: "linear-gradient(135deg,#A78BFA,#8A5CF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>6.750</span>
                <span className="text-sm text-vero-muted mb-1">de 16.500 tokens</span>
              </div>
              <div className="w-full h-3 bg-vero-border rounded-full overflow-hidden mb-5">
                <div className="h-full rounded-full" style={{ width: "41%", background: "linear-gradient(90deg,#8A5CF5,#C084FC)" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockTeamMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: m.avatar_color }}>
                      {m.nome.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-vero-muted truncate">{m.nome.split(" ")[0]}</span>
                        <span className="text-vero-text font-mono shrink-0 ml-1">{m.tokens_used.toLocaleString("pt-BR")}</span>
                      </div>
                      <div className="w-full h-1 bg-vero-border rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min((m.tokens_used / m.tokens_quota) * 100, 100)}%`, backgroundColor: m.avatar_color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <p className="text-sm font-semibold text-vero-text mb-4">Comprar Tokens Adicionais</p>
              <div className="grid grid-cols-3 gap-3">
                {[{ amount: "5.000", price: "R$ 49" }, { amount: "15.000", price: "R$ 129", bonus: "+2.000" }, { amount: "50.000", price: "R$ 389", bonus: "+10.000" }].map(({ amount, price, bonus }) => (
                  <button key={amount} className="p-4 bg-vero-surface border border-vero-border rounded-xl hover:border-vero-accent/30 transition-all text-left">
                    <p className="text-base font-bold text-vero-text">{amount}</p>
                    <p className="text-xs text-vero-muted mb-1">tokens</p>
                    {bonus && <p className="text-[10px] text-vero-success">{bonus} bônus</p>}
                    <p className="text-sm font-semibold text-vero-accent mt-1">{price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ENV VARS ── */}
        {activeTab === "env" && (
          <div className="max-w-2xl space-y-4">
            <div className="bg-vero-warning/5 border border-vero-warning/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-vero-warning shrink-0" />
              <p className="text-xs text-vero-warning">Valores mascarados por segurança. Configure via arquivo <code className="font-mono">.env</code> ou painel de variáveis do servidor.</p>
            </div>

            <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-vero-border bg-vero-surface">
                <p className="text-sm font-semibold text-vero-text">Variáveis de Ambiente</p>
              </div>
              <div className="divide-y divide-vero-border">
                {envVars.map(({ key, val, required, desc }) => (
                  <div key={key} className="flex items-center gap-4 px-5 py-4 hover:bg-vero-card-hover transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-mono font-semibold text-vero-accent">{key}</p>
                        {required
                          ? <span className="text-[9px] bg-vero-danger/10 text-vero-danger border border-vero-danger/20 rounded-full px-1.5 py-0.5 font-semibold">Obrigatória</span>
                          : <span className="text-[9px] text-vero-subtle border border-vero-border rounded-full px-1.5 py-0.5">Opcional</span>
                        }
                      </div>
                      <p className="text-[10px] text-vero-subtle">{desc}</p>
                    </div>
                    <p className="text-[11px] text-vero-muted font-mono shrink-0">{val}</p>
                    <button onClick={() => copyEnv(key, val)} className="w-7 h-7 flex items-center justify-center border border-vero-border rounded-lg text-vero-subtle hover:text-vero-accent hover:border-vero-accent/30 transition-all shrink-0">
                      {copiedEnv === key ? <CheckCircle2 className="w-3 h-3 text-vero-success" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
