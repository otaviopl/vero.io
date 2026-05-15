"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockCompany } from "@/lib/mock-data";
import {
  Building2,
  Brain,
  TrendingUp,
  Users,
  MapPin,
  Globe,
  Calendar,
  BarChart3,
  Linkedin,
  ExternalLink,
  Star,
  Shield,
  Zap,
  ChevronRight,
  Sparkles,
  Copy,
  CheckCircle2,
} from "lucide-react";

const mockCompanies = [
  { id: "co-001", nome: "VTEX", setor: "Commerce SaaS", faturamento: "R$ 1.2B+", funcionarios: 1800, score: 820, status: "ativa" },
  { id: "co-002", nome: "TOTVS", setor: "ERP Enterprise", faturamento: "R$ 4.5B+", funcionarios: 15000, score: 880, status: "ativa" },
  { id: "co-003", nome: "Stone Co.", setor: "Fintech / Pagamentos", faturamento: "R$ 8.2B+", funcionarios: 20000, score: 790, status: "ativa" },
  { id: "co-004", nome: "RD Station", setor: "Marketing SaaS", faturamento: "R$ 250M+", funcionarios: 1200, score: 760, status: "ativa" },
];

export default function CompaniesPage() {
  const [selected, setSelected] = useState(mockCompany);
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const serasaColor = selected.serasa_score >= 700 ? "#10B981" : selected.serasa_score >= 500 ? "#F59E0B" : "#EF4444";

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar
        title="Company Deep Dive"
        subtitle={`${mockCompanies.length} empresas indexadas · Análise completa com IA`}
      />

      <div className="p-6 grid lg:grid-cols-4 gap-5">
        {/* Left: Company List */}
        <div className="lg:col-span-1">
          <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-vero-border bg-vero-surface flex items-center justify-between">
              <span className="text-xs font-semibold text-vero-text">Empresas</span>
              <span className="text-[10px] text-vero-muted">{mockCompanies.length}</span>
            </div>
            <div className="divide-y divide-vero-border">
              {mockCompanies.map((co) => (
                <button
                  key={co.id}
                  onClick={() => {}}
                  className={`w-full text-left px-4 py-3.5 hover:bg-vero-card-hover transition-all ${
                    co.id === "co-001" ? "bg-vero-accent/5 border-l-2 border-l-vero-accent" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-vero-text">{co.nome}</span>
                    <span className="text-[10px] font-mono text-vero-success">{co.score}</span>
                  </div>
                  <p className="text-[10px] text-vero-muted">{co.setor}</p>
                  <p className="text-[10px] text-vero-subtle">{co.faturamento} · {co.funcionarios.toLocaleString("pt-BR")} func.</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Company Detail */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header Card */}
          <div className="bg-vero-card border border-vero-border rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-vero-accent/20 to-vero-accent-dim/40 border border-vero-accent/20 flex items-center justify-center text-xl font-bold text-vero-accent shrink-0">
                {selected.nome_fantasia.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-bold text-vero-text">{selected.nome_fantasia}</h1>
                    <p className="text-xs text-vero-muted mt-0.5">{selected.razao_social}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-vero-success/10 text-vero-success border border-vero-success/20 px-2 py-0.5 rounded-full font-semibold">
                        Receita {selected.status_receita}
                      </span>
                      <span className="text-[10px] bg-vero-surface border border-vero-border text-vero-muted px-2 py-0.5 rounded-full">
                        Desde {selected.data_abertura.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <Shield className="w-3.5 h-3.5" style={{ color: serasaColor }} />
                      <span className="text-xs font-bold" style={{ color: serasaColor }}>
                        {selected.serasa_score}
                      </span>
                    </div>
                    <p className="text-[10px] text-vero-subtle">Serasa Score</p>
                    <div className="w-16 h-1.5 bg-vero-border rounded-full overflow-hidden mt-1 ml-auto">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(selected.serasa_score / 1000) * 100}%`, backgroundColor: serasaColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-vero-border">
              {[
                { label: "Faturamento Est.", value: selected.faturamento_estimado, icon: BarChart3, color: "#8A5CF5" },
                { label: "Valuation", value: selected.valuation.split("(")[0].trim(), icon: TrendingUp, color: "#10B981" },
                { label: "Funcionários", value: selected.funcionarios.toLocaleString("pt-BR"), icon: Users, color: "#F59E0B" },
                { label: "Localização", value: `${selected.cidade}, ${selected.estado}`, icon: MapPin, color: "#C084FC" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3 h-3" style={{ color }} />
                    <p className="text-[10px] text-vero-subtle">{label}</p>
                  </div>
                  <p className="text-xs font-semibold text-vero-text">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* IA Brand Sector */}
            <div className="bg-vero-card border border-vero-accent/20 rounded-xl p-5 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "#8A5CF5" }}
              />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-vero-accent/10 border border-vero-accent/20 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-vero-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-vero-text">Brand Sector</p>
                  <p className="text-[10px] text-vero-accent flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Gerado por IA
                  </p>
                </div>
              </div>
              <p className="text-xs text-vero-muted leading-relaxed">
                {selected.brand_sector}
              </p>
            </div>

            {/* Market Impact */}
            <div className="bg-vero-card border border-vero-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-vero-warning/10 border border-vero-warning/20 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-vero-warning" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-vero-text">Impacto de Mercado</p>
                  <p className="text-[10px] text-vero-accent flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Gerado por IA
                  </p>
                </div>
              </div>
              <p className="text-xs text-vero-muted leading-relaxed">
                {selected.impacto_mercado}
              </p>
            </div>
          </div>

          {/* CNAE + Data */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-vero-card border border-vero-border rounded-xl p-4">
              <p className="text-[10px] text-vero-subtle font-semibold uppercase tracking-wider mb-3">Dados Oficiais</p>
              <div className="space-y-2.5">
                {[
                  { label: "CNPJ", value: selected.cnpj },
                  { label: "CNAE", value: selected.cnae_principal },
                  { label: "Atividade", value: selected.cnae_descricao },
                  { label: "Website", value: selected.website || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-2">
                    <span className="text-[10px] text-vero-subtle shrink-0">{label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-vero-text font-mono text-right">{value}</span>
                      {(label === "CNPJ" || label === "Website") && (
                        <button
                          onClick={() => copyText(value, label)}
                          className="text-vero-subtle hover:text-vero-accent transition-colors"
                        >
                          {copied === label ? (
                            <CheckCircle2 className="w-3 h-3 text-vero-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Org Chart */}
            <div className="md:col-span-2 bg-vero-card border border-vero-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-3.5 h-3.5 text-vero-success" />
                <p className="text-xs font-semibold text-vero-text">Org Chart — C-Levels</p>
                <span className="text-[10px] text-vero-accent flex items-center gap-1 ml-auto">
                  <Sparkles className="w-2.5 h-2.5" /> Identificado por IA
                </span>
              </div>

              <div className="space-y-2">
                {selected.c_levels.map((person) => (
                  <div
                    key={person.nome}
                    className="flex items-center gap-3 p-2.5 bg-vero-surface border border-vero-border rounded-lg hover:border-vero-accent/20 transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, #4B5563, #374151)" }}
                    >
                      {person.nome.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-vero-text truncate">{person.nome}</p>
                      <p className="text-[10px] text-vero-muted">{person.cargo} · {person.tempo_empresa}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {person.linkedin && (
                        <a
                          href="#"
                          className="w-6 h-6 rounded flex items-center justify-center bg-vero-card border border-vero-border hover:border-vero-accent/30 transition-all"
                        >
                          <Linkedin className="w-3 h-3 text-vero-muted" />
                        </a>
                      )}
                      <button className="w-6 h-6 rounded flex items-center justify-center bg-vero-accent/10 border border-vero-accent/20 hover:bg-vero-accent/20 transition-all">
                        <Zap className="w-3 h-3 text-vero-accent" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-vero-border rounded-lg text-xs text-vero-muted hover:text-vero-accent hover:border-vero-accent/30 transition-all">
                <Zap className="w-3 h-3" />
                Enriquecer todos os C-Levels
                <span className="text-[10px] text-vero-subtle">· ~{selected.c_levels.length * 12} tokens</span>
              </button>
            </div>
          </div>

          {/* Actions bar */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-vero-accent hover:bg-vero-accent-light text-white rounded-xl text-xs font-semibold transition-all glow-purple-sm">
              <Zap className="w-3.5 h-3.5" />
              Enriquecer Empresa
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-vero-border rounded-xl text-xs text-vero-muted hover:text-vero-text hover:border-vero-accent/20 transition-all">
              <Globe className="w-3.5 h-3.5" />
              Site da Empresa
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-vero-border rounded-xl text-xs text-vero-muted hover:text-vero-text hover:border-vero-accent/20 transition-all">
              <Star className="w-3.5 h-3.5" />
              Salvar no CRM
            </button>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-vero-subtle">
              <Sparkles className="w-3 h-3 text-vero-accent" />
              Dados enriquecidos por IA · 42 tokens gastos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
