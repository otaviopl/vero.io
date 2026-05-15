"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockSavedLists } from "@/lib/mock-data";
import {
  Chrome, FileText, Code2, FolderOpen, Upload, CheckCircle2,
  AlertCircle, Clock, Trash2, Download, RefreshCw, Zap,
  WifiOff, Wifi, Users, Calendar,
} from "lucide-react";

type Tab = "extension" | "text" | "html" | "saved";

const SEPARATORS_GUIDE = [
  { sep: "|", ex: "João Silva | Google | São Paulo" },
  { sep: "Tab", ex: "João Silva\tGoogle\tSão Paulo" },
  { sep: ",", ex: "João Silva, Google, São Paulo" },
  { sep: "·", ex: "João Silva · Google · São Paulo" },
];

const extensionFeed = [
  { nome: "Rafael Costa Mendonça", cargo: "CTO", empresa: "TOTVS", ts: "agora" },
  { nome: "Patrícia Lima Souza", cargo: "VP Marketing", empresa: "AmBev", ts: "3s" },
  { nome: "Bruno Rocha", cargo: "Head Eng.", empresa: "RD Station", ts: "8s" },
  { nome: "Júlia Castro", cargo: "CMO", empresa: "Pipefy", ts: "14s" },
  { nome: "Thiago Rodrigues", cargo: "CTO", empresa: "VTEX", ts: "19s" },
];

export default function ImportPage() {
  const [tab, setTab] = useState<Tab>("extension");
  const [textInput, setTextInput] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [parsedCount, setParsedCount] = useState(0);
  const [extensionConnected] = useState(true);
  const [loadedList, setLoadedList] = useState<string | null>(null);

  const parseText = () => {
    if (!textInput.trim()) return;
    const lines = textInput.trim().split("\n").filter(l => l.trim());
    setParsedCount(lines.length);
  };

  const parseHtml = () => {
    if (!htmlInput.trim()) return;
    const matches = htmlInput.match(/data-anonymize/g) || [];
    setParsedCount(Math.max(matches.length, Math.floor(htmlInput.length / 400)));
  };

  const tabs: { id: Tab; label: string; icon: typeof Chrome }[] = [
    { id: "extension", label: "Extensão Chrome", icon: Chrome },
    { id: "text", label: "Texto / Lista", icon: FileText },
    { id: "html", label: "HTML da Página", icon: Code2 },
    { id: "saved", label: "Listas Salvas", icon: FolderOpen },
  ];

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Importar Perfis" subtitle="4 métodos de captura — extensão Chrome, texto, HTML e listas salvas" />

      <div className="p-6 space-y-4">
        {/* Tab selector */}
        <div className="flex gap-1 bg-vero-card border border-vero-border rounded-xl p-1 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                tab === id ? "bg-vero-accent text-white" : "text-vero-muted hover:text-vero-text"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {id === "extension" && (
                <span className={`w-1.5 h-1.5 rounded-full ${extensionConnected ? "bg-vero-success" : "bg-vero-danger"}`} />
              )}
            </button>
          ))}
        </div>

        {/* ── EXTENSÃO CHROME ── */}
        {tab === "extension" && (
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Status + instructions */}
            <div className="lg:col-span-1 space-y-4">
              <div className={`bg-vero-card border rounded-xl p-5 ${extensionConnected ? "border-vero-success/20" : "border-vero-danger/20"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${extensionConnected ? "bg-vero-success/10 border border-vero-success/20" : "bg-vero-danger/10 border border-vero-danger/20"}`}>
                    {extensionConnected
                      ? <Wifi className="w-5 h-5 text-vero-success" />
                      : <WifiOff className="w-5 h-5 text-vero-danger" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-vero-text">
                      {extensionConnected ? "Extensão conectada" : "Extensão offline"}
                    </p>
                    <p className="text-[10px] text-vero-muted">
                      {extensionConnected ? "POST /api/profiles · ativo" : "Instale a extensão Chrome"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-vero-muted">
                  <p className="font-semibold text-vero-text text-[11px] uppercase tracking-wider">Como usar</p>
                  {[
                    "Abra o LinkedIn Sales Navigator",
                    "Ative a extensão Vero na barra de ferramentas",
                    "Navegue pelas páginas de resultados",
                    "A extensão captura perfis automaticamente",
                    "Clique em Carregar quando terminar",
                  ].map((step, i) => (
                    <div key={step} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-vero-accent/10 border border-vero-accent/20 text-vero-accent text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-vero-card border border-vero-border rounded-xl p-4">
                <p className="text-xs font-semibold text-vero-text mb-3">Sessão atual</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Capturados", value: "5", color: "text-vero-accent" },
                    { label: "Páginas", value: "1", color: "text-vero-muted" },
                    { label: "Deduplicados", value: "0", color: "text-vero-success" },
                    { label: "Limite", value: "50", color: "text-vero-subtle" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-vero-surface rounded-lg p-3 border border-vero-border">
                      <p className={`text-lg font-bold ${color}`}>{value}</p>
                      <p className="text-[10px] text-vero-subtle">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-vero-accent hover:bg-vero-accent-light text-white font-semibold text-sm py-3 rounded-xl transition-all glow-purple-sm">
                <Upload className="w-4 h-4" />
                Carregar {extensionFeed.length} perfis
              </button>
            </div>

            {/* Live feed */}
            <div className="lg:col-span-2 bg-vero-card border border-vero-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-vero-success rounded-full pulse-dot" />
                  <p className="text-sm font-semibold text-vero-text">Live Capture Feed</p>
                </div>
                <button className="text-xs text-vero-muted hover:text-vero-text transition-colors flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Limpar
                </button>
              </div>

              <div className="space-y-2">
                {extensionFeed.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-vero-surface border border-vero-border rounded-lg animate-fade-in-up">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vero-accent/30 to-vero-accent-dim/30 border border-vero-accent/20 flex items-center justify-center text-xs font-bold text-vero-accent shrink-0">
                      {item.nome.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-vero-text truncate">{item.nome}</p>
                      <p className="text-[10px] text-vero-subtle truncate">{item.cargo} · {item.empresa}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] bg-vero-accent/10 text-vero-accent border border-vero-accent/20 rounded-full px-2 py-0.5 font-semibold">capturado</span>
                      <p className="text-[9px] text-vero-subtle mt-0.5">{item.ts}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-vero-border">
                <p className="text-[10px] text-vero-subtle">
                  Deduplicação automática por nome dentro da sessão. Limite: 50 perfis por importação.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── TEXTO / LISTA MANUAL ── */}
        {tab === "text" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <p className="text-sm font-semibold text-vero-text mb-1">Cole sua lista</p>
                <p className="text-xs text-vero-muted mb-4">
                  Separe campos com <code className="bg-vero-surface px-1 py-0.5 rounded text-vero-accent">|</code> ou tab. Cada linha = 1 perfil. Máx: 50 perfis.
                </p>

                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder={"João Silva | Google | São Paulo\nMaria Souza | TOTVS | Recife\n58210934 | Carlos Lima | Itaú | São Paulo"}
                  className="w-full h-52 bg-vero-surface border border-vero-border rounded-xl p-4 text-xs text-vero-text placeholder-vero-subtle outline-none focus:border-vero-accent/40 transition-colors resize-none font-mono"
                />

                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] text-vero-subtle">
                    {textInput.trim() ? `${textInput.trim().split("\n").filter(l => l.trim()).length} linhas detectadas` : "0 linhas"}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => { setTextInput(""); setParsedCount(0); }} className="text-xs text-vero-muted hover:text-vero-text border border-vero-border px-3 py-1.5 rounded-lg transition-all">
                      Limpar
                    </button>
                    <button
                      onClick={parseText}
                      disabled={!textInput.trim()}
                      className="flex items-center gap-1.5 bg-vero-accent hover:bg-vero-accent-light disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" /> Importar
                    </button>
                  </div>
                </div>
              </div>

              {parsedCount > 0 && (
                <div className="bg-vero-success/5 border border-vero-success/20 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-vero-success shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-vero-text">{parsedCount} perfis importados</p>
                    <p className="text-xs text-vero-muted">Prontos para enriquecimento no Contact Manager</p>
                  </div>
                </div>
              )}
            </div>

            {/* Format guide */}
            <div className="space-y-4">
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <p className="text-xs font-semibold text-vero-text mb-3">Formatos aceitos</p>
                <div className="space-y-3">
                  {SEPARATORS_GUIDE.map(({ sep, ex }) => (
                    <div key={sep}>
                      <p className="text-[10px] text-vero-muted mb-1">Separador: <code className="text-vero-accent">{sep}</code></p>
                      <p className="text-[10px] text-vero-subtle font-mono bg-vero-surface border border-vero-border rounded px-2 py-1.5">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <p className="text-xs font-semibold text-vero-text mb-3">Com HubSpot ID</p>
                <p className="text-[10px] text-vero-muted mb-2">Inclua o ID na primeira coluna para sincronização por PATCH:</p>
                <p className="text-[10px] text-vero-accent font-mono bg-vero-surface border border-vero-border rounded px-2 py-2">
                  58210934 | João Silva | Google | SP
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── HTML DA PÁGINA ── */}
        {tab === "html" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <p className="text-sm font-semibold text-vero-text mb-1">Cole o HTML da página</p>
                <p className="text-xs text-vero-muted mb-4">
                  Copie o código-fonte (Ctrl+U) de uma página do Sales Navigator e cole aqui.
                  O sistema extrai perfis via atributos <code className="bg-vero-surface px-1 rounded text-vero-accent">data-anonymize</code>.
                </p>

                <textarea
                  value={htmlInput}
                  onChange={e => setHtmlInput(e.target.value)}
                  placeholder={"<!DOCTYPE html>\n<html>\n  <!-- Cole o HTML completo da página do Sales Navigator -->"}
                  className="w-full h-56 bg-vero-surface border border-vero-border rounded-xl p-4 text-xs text-vero-subtle placeholder-vero-subtle outline-none focus:border-vero-accent/40 transition-colors resize-none font-mono"
                />

                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] text-vero-subtle">
                    {htmlInput.trim() ? `${Math.round(htmlInput.length / 1024)}KB colados` : "0 bytes"}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => { setHtmlInput(""); setParsedCount(0); }} className="text-xs text-vero-muted hover:text-vero-text border border-vero-border px-3 py-1.5 rounded-lg transition-all">
                      Limpar
                    </button>
                    <button
                      onClick={parseHtml}
                      disabled={!htmlInput.trim()}
                      className="flex items-center gap-1.5 bg-vero-accent hover:bg-vero-accent-light disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                    >
                      <Code2 className="w-3.5 h-3.5" /> Extrair Perfis
                    </button>
                  </div>
                </div>
              </div>

              {parsedCount > 0 && (
                <div className="bg-vero-success/5 border border-vero-success/20 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-vero-success shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-vero-text">~{parsedCount} perfis extraídos do HTML</p>
                    <p className="text-xs text-vero-muted">Prontos para enriquecimento via Apollo.io</p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-vero-card border border-vero-border rounded-xl p-5 h-fit">
              <p className="text-xs font-semibold text-vero-text mb-3">Como obter o HTML</p>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Abra o Sales Navigator no Chrome" },
                  { step: "2", text: "Faça sua busca normalmente" },
                  { step: "3", text: 'Clique com botão direito → "Exibir código-fonte da página" (Ctrl+U)' },
                  { step: "4", text: "Selecione todo o conteúdo (Ctrl+A) e copie" },
                  { step: "5", text: "Cole aqui e clique em Extrair Perfis" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-vero-accent/10 border border-vero-accent/20 text-vero-accent text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                    <p className="text-xs text-vero-muted">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-vero-border">
                <p className="text-[10px] text-vero-subtle">
                  Use quando a extensão Chrome não estiver disponível. Funciona com qualquer página de resultados do Sales Navigator.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── LISTAS SALVAS ── */}
        {tab === "saved" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-vero-muted">{mockSavedLists.length} listas salvas</p>
              <div className="flex items-center gap-2 text-[11px] text-vero-subtle">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-vero-accent rounded-sm" /> GCS</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-vero-subtle rounded-sm" /> Local</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockSavedLists.map((list) => {
                const enrichPct = list.total_profiles > 0 ? Math.round((list.enriched_count / list.total_profiles) * 100) : 0;
                const isLoaded = loadedList === list.id;

                return (
                  <div
                    key={list.id}
                    className={`bg-vero-card border rounded-xl p-5 transition-all ${isLoaded ? "border-vero-accent/40 glow-purple-sm" : "border-vero-border hover:border-vero-accent/20"}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-vero-accent/10 border border-vero-accent/20 flex items-center justify-center shrink-0">
                        <FolderOpen className="w-4.5 h-4.5 text-vero-accent" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${list.storage === "gcs" ? "bg-vero-accent/10 text-vero-accent" : "bg-vero-border text-vero-subtle"}`}>
                          {list.storage.toUpperCase()}
                        </span>
                        {isLoaded && <span className="text-[9px] bg-vero-success/10 text-vero-success border border-vero-success/20 rounded px-1.5 py-0.5 font-semibold">Carregada</span>}
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-vero-text mb-1 leading-snug">{list.name}</p>
                    <p className="text-[10px] text-vero-subtle mb-3">{list.username}</p>

                    <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                      <div className="bg-vero-surface rounded-lg p-2 border border-vero-border">
                        <p className="text-sm font-bold text-vero-text">{list.total_profiles}</p>
                        <p className="text-[9px] text-vero-subtle">perfis</p>
                      </div>
                      <div className="bg-vero-surface rounded-lg p-2 border border-vero-border">
                        <p className="text-sm font-bold text-vero-success">{list.valid_emails}</p>
                        <p className="text-[9px] text-vero-subtle">e-mails</p>
                      </div>
                      <div className="bg-vero-surface rounded-lg p-2 border border-vero-border">
                        <p className="text-sm font-bold text-vero-accent">{enrichPct}%</p>
                        <p className="text-[9px] text-vero-subtle">enriq.</p>
                      </div>
                    </div>

                    {/* Enrich bar */}
                    <div className="w-full h-1 bg-vero-border rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-vero-accent rounded-full" style={{ width: `${enrichPct}%` }} />
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] text-vero-subtle mb-4">
                      <Calendar className="w-3 h-3" />
                      {new Date(list.updated_at).toLocaleDateString("pt-BR")}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setLoadedList(isLoaded ? null : list.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${isLoaded ? "bg-vero-success/10 border border-vero-success/20 text-vero-success" : "bg-vero-accent hover:bg-vero-accent-light text-white"}`}
                      >
                        {isLoaded ? <><CheckCircle2 className="w-3 h-3" /> Carregada</> : <><Download className="w-3 h-3" /> Carregar</>}
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center border border-vero-border rounded-lg text-vero-subtle hover:text-vero-danger hover:border-vero-danger/30 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
