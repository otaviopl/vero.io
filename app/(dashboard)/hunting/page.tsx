"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar";
import { mockHuntSessions, mockXRayResults } from "@/lib/mock-data";
import {
  Crosshair, Play, Pause, Calendar, Settings2, Filter,
  CheckCircle2, Clock, Sparkles, Coins, MapPin, Briefcase,
  Building2, Search, Zap, ExternalLink, ChevronDown, ChevronUp,
  Globe, AlertTriangle, Plus,
} from "lucide-react";

type HuntTab = "sources" | "xray";

const sources = [
  { id: "extension", name: "Extensão Chrome", description: "Sales Navigator — captura em tempo real", icon: "🔷", coverage: "Nacional" },
  { id: "serasa", name: "Serasa Experian", description: "CNPJ, score, faturamento e situação na Receita", icon: "🟢", coverage: "Brasil" },
  { id: "google_maps", name: "Google Maps", description: "Empresas locais, telefone e endereço", icon: "🔴", coverage: "Regional" },
  { id: "crunchbase", name: "Crunchbase", description: "Startups, investimentos e fundadores", icon: "🟠", coverage: "Global" },
];

const cargosPreset = ["CTO", "CEO", "CFO", "CMO", "VP de Tecnologia", "Head de Engenharia", "Diretor de TI", "Diretor Comercial", "Head de Produto", "VP de Produto"];
const localizacoes = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Brasília", "Brasil (Nacional)"];
const cnaes = ["6201-5/01 — Software sob encomenda", "6202-3/00 — Consultoria TI", "6491-3/00 — Fintech", "4711-3/02 — Varejo Supermercados"];

const liveFeed = [
  { id: 1, nome: "Rafael Costa Mendonça", empresa: "TOTVS S.A.", cargo: "CTO", status: "enriched", tokens: 12 },
  { id: 2, nome: "Ana Lima Ferreira", empresa: "Stone Co.", cargo: "VP de Produtos", status: "captured", tokens: 8 },
  { id: 3, nome: "Bruno Henrique Rocha", empresa: "RD Station", cargo: "Head de Engenharia", status: "processing", tokens: 0 },
  { id: 4, nome: "Júlia Mendes Castro", empresa: "Pipefy", cargo: "CMO", status: "enriched", tokens: 15 },
];

export default function HuntingPage() {
  const [tab, setTab] = useState<HuntTab>("sources");
  const [activeSources, setActiveSources] = useState(["extension", "serasa", "crunchbase"]);
  const [selectedCargos, setSelectedCargos] = useState(["CTO", "CEO", "CMO"]);
  const [selectedLocs, setSelectedLocs] = useState(["São Paulo", "Rio de Janeiro"]);
  const [selectedCnaes, setSelectedCnaes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [progress] = useState(47);

  // X-Ray state
  const [xrLocation, setXrLocation] = useState("");
  const [xrCargo, setXrCargo] = useState("");
  const [xrEmpresa, setXrEmpresa] = useState("");
  const [xrMaxResults, setXrMaxResults] = useState(10);
  const [xrMode, setXrMode] = useState<"serpapi" | "direct">("serpapi");
  const [xrSearched, setXrSearched] = useState(false);
  const [xrLoading, setXrLoading] = useState(false);

  const runXRay = async () => {
    if (!xrLocation) return;
    setXrLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setXrLoading(false);
    setXrSearched(true);
  };

  const toggleSource = (id: string) =>
    setActiveSources(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  const toggleCargo = (c: string) =>
    setSelectedCargos(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleLoc = (l: string) =>
    setSelectedLocs(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);

  return (
    <div className="min-h-full bg-vero-bg">
      <Topbar title="Hunting / X-Ray" subtitle="Captura multi-fonte + X-Ray LinkedIn via Google" />

      <div className="p-6 space-y-4">
        {/* Tab selector */}
        <div className="flex gap-1 bg-vero-card border border-vero-border rounded-xl p-1 w-fit">
          <button onClick={() => setTab("sources")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${tab === "sources" ? "bg-vero-accent text-white" : "text-vero-muted hover:text-vero-text"}`}>
            <Crosshair className="w-3.5 h-3.5" />Hunting Multi-Fonte
            <span className="w-1.5 h-1.5 rounded-full bg-vero-warning pulse-dot" />
          </button>
          <button onClick={() => setTab("xray")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${tab === "xray" ? "bg-vero-accent text-white" : "text-vero-muted hover:text-vero-text"}`}>
            <Globe className="w-3.5 h-3.5" />X-Ray LinkedIn
          </button>
        </div>

        {/* ── SOURCES TAB ── */}
        {tab === "sources" && (
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              {/* Source toggles */}
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-vero-text">Fontes de Dados</span>
                  <span className="text-xs text-vero-muted">{activeSources.length} ativas</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sources.map(({ id, name, description, icon, coverage }) => {
                    const active = activeSources.includes(id);
                    return (
                      <button key={id} onClick={() => toggleSource(id)}
                        className={`text-left p-4 rounded-xl border transition-all ${active ? "border-vero-accent/40 bg-vero-accent/5 glow-purple-sm" : "border-vero-border bg-vero-surface hover:border-vero-border/80"}`}>
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-lg">{icon}</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-vero-accent bg-vero-accent" : "border-vero-border"}`}>
                            {active && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                        <p className={`text-xs font-semibold mb-0.5 ${active ? "text-vero-text" : "text-vero-muted"}`}>{name}</p>
                        <p className="text-[10px] text-vero-subtle">{description}</p>
                        <span className={`mt-2 inline-block text-[9px] px-1.5 py-0.5 rounded font-semibold ${active ? "bg-vero-accent/15 text-vero-accent" : "bg-vero-border text-vero-subtle"}`}>{coverage}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filters */}
              <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
                <button onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-vero-card-hover transition-colors">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-vero-accent" />
                    <span className="text-sm font-semibold text-vero-text">Filtros Avançados</span>
                    <span className="text-[10px] bg-vero-accent/10 text-vero-accent border border-vero-accent/20 px-2 py-0.5 rounded-full font-semibold">
                      {selectedCargos.length + selectedLocs.length + selectedCnaes.length} ativos
                    </span>
                  </div>
                  {showFilters ? <ChevronUp className="w-4 h-4 text-vero-muted" /> : <ChevronDown className="w-4 h-4 text-vero-muted" />}
                </button>

                {showFilters && (
                  <div className="px-5 pb-5 space-y-4 border-t border-vero-border pt-4">
                    <div>
                      <label className="text-xs font-semibold text-vero-muted mb-2 block">Cargos-alvo</label>
                      <div className="flex flex-wrap gap-2">
                        {cargosPreset.map(c => (
                          <button key={c} onClick={() => toggleCargo(c)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${selectedCargos.includes(c) ? "border-vero-accent/40 bg-vero-accent/10 text-vero-accent-light" : "border-vero-border text-vero-muted hover:border-vero-accent/20"}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-vero-muted mb-2 block">Localização</label>
                      <div className="flex flex-wrap gap-2">
                        {localizacoes.map(l => (
                          <button key={l} onClick={() => toggleLoc(l)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${selectedLocs.includes(l) ? "border-vero-accent/40 bg-vero-accent/10 text-vero-accent-light" : "border-vero-border text-vero-muted hover:border-vero-accent/20"}`}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-vero-muted mb-2 block">CNAE (Brasil)</label>
                      <div className="space-y-1.5">
                        {cnaes.map(cn => (
                          <label key={cn} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={selectedCnaes.includes(cn)}
                              onChange={() => setSelectedCnaes(p => p.includes(cn) ? p.filter(c => c !== cn) : [...p, cn])}
                              className="accent-[#8A5CF5] w-3.5 h-3.5 cursor-pointer" />
                            <span className="text-xs text-vero-muted">{cn}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-vero-muted mb-1.5 block">Faturamento Mín.</label>
                        <select className="w-full bg-vero-surface border border-vero-border rounded-lg px-3 py-2 text-xs text-vero-text outline-none focus:border-vero-accent/40">
                          <option>Qualquer</option>
                          {["R$ 1M", "R$ 5M", "R$ 10M", "R$ 50M", "R$ 100M"].map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-vero-muted mb-1.5 block">Funcionários</label>
                        <select className="w-full bg-vero-surface border border-vero-border rounded-lg px-3 py-2 text-xs text-vero-text outline-none focus:border-vero-accent/40">
                          <option>Qualquer</option>
                          {["1–50", "51–200", "201–1000", "1000+"].map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${isRunning ? "bg-vero-warning/10 border border-vero-warning/30 text-vero-warning" : "bg-vero-accent hover:bg-vero-accent-light text-white glow-purple"}`}>
                  {isRunning ? <><Pause className="w-4 h-4" />Pausar Hunt</> : <><Play className="w-4 h-4" />Rodar Agora</>}
                </button>
                <button className="flex items-center gap-2 px-4 py-3 border border-vero-border rounded-xl text-sm text-vero-muted hover:text-vero-text transition-all">
                  <Calendar className="w-4 h-4" />Agendar
                </button>
                <button className="flex items-center gap-2 px-4 py-3 border border-vero-border rounded-xl text-sm text-vero-muted hover:text-vero-text transition-all">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Live feed + history */}
            <div className="space-y-4">
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vero-success rounded-full pulse-dot" />
                    <span className="text-sm font-semibold text-vero-text">Live Feed</span>
                  </div>
                  <span className="text-xs font-mono text-vero-accent">67 capturados</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-vero-muted mb-1">
                    <span>Progresso</span><span className="font-mono">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-vero-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#8A5CF5,#C084FC)" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  {liveFeed.map(item => (
                    <div key={item.id} className="flex items-start gap-2 p-2.5 bg-vero-surface rounded-lg border border-vero-border">
                      <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${item.status === "enriched" ? "bg-vero-success" : item.status === "captured" ? "bg-vero-accent" : "bg-vero-warning pulse-dot"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-vero-text truncate flex items-center gap-1">
                          {item.nome}{item.status === "enriched" && <Sparkles className="w-2.5 h-2.5 text-vero-accent" />}
                        </p>
                        <p className="text-[9px] text-vero-subtle truncate">{item.cargo} · {item.empresa}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${item.status === "enriched" ? "bg-vero-success/10 text-vero-success" : item.status === "captured" ? "bg-vero-accent/10 text-vero-accent" : "bg-vero-warning/10 text-vero-warning"}`}>
                          {item.status === "enriched" ? "✦ nutrido" : item.status === "captured" ? "capturado" : "…"}
                        </span>
                        {item.tokens > 0 && <p className="text-[9px] text-vero-subtle mt-0.5 font-mono">{item.tokens}t</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-vero-border grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-sm font-bold text-vero-success">2</p><p className="text-[10px] text-vero-subtle">Nutridos</p></div>
                  <div><p className="text-sm font-bold text-vero-accent">2</p><p className="text-[10px] text-vero-subtle">Capturados</p></div>
                  <div><p className="text-sm font-bold text-vero-text">35<Coins className="inline w-2.5 h-2.5 ml-0.5" /></p><p className="text-[10px] text-vero-subtle">tokens</p></div>
                </div>
              </div>

              {/* Hunt history */}
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <p className="text-sm font-semibold text-vero-text mb-3">Histórico</p>
                <div className="space-y-2">
                  {mockHuntSessions.map(h => (
                    <div key={h.id} className="p-3 bg-vero-surface border border-vero-border rounded-lg hover:border-vero-accent/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        {h.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5 text-vero-success shrink-0" />}
                        {h.status === "running" && <span className="w-2 h-2 bg-vero-warning rounded-full pulse-dot shrink-0" />}
                        {h.status === "scheduled" && <Clock className="w-3.5 h-3.5 text-vero-subtle shrink-0" />}
                        <span className="text-xs font-medium text-vero-text truncate">{h.nome}</span>
                      </div>
                      <p className="text-[10px] text-vero-subtle pl-5">
                        {h.contatos_encontrados > 0 ? `${h.contatos_encontrados} contatos` : "Aguardando"}
                        {h.tokens_consumidos > 0 && ` · ${h.tokens_consumidos} tokens`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── X-RAY TAB ── */}
        {tab === "xray" && (
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Search form */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-vero-card border border-vero-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-vero-accent" />
                  <span className="text-sm font-semibold text-vero-text">X-Ray LinkedIn</span>
                </div>
                <p className="text-[11px] text-vero-muted mb-4 leading-relaxed">
                  Busca profiles do LinkedIn via Google sem precisar do Sales Navigator.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">
                      Localização <span className="text-vero-danger">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-vero-subtle" />
                      <input value={xrLocation} onChange={e => setXrLocation(e.target.value)}
                        placeholder="Ex: São Paulo" className="w-full bg-vero-surface border border-vero-border rounded-lg pl-9 pr-3 py-2.5 text-xs text-vero-text placeholder-vero-subtle outline-none focus:border-vero-accent/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">Cargo</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-vero-subtle" />
                      <input value={xrCargo} onChange={e => setXrCargo(e.target.value)}
                        placeholder="Ex: Diretor de TI" className="w-full bg-vero-surface border border-vero-border rounded-lg pl-9 pr-3 py-2.5 text-xs text-vero-text placeholder-vero-subtle outline-none focus:border-vero-accent/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">Empresa</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-vero-subtle" />
                      <input value={xrEmpresa} onChange={e => setXrEmpresa(e.target.value)}
                        placeholder="Ex: Loggi" className="w-full bg-vero-surface border border-vero-border rounded-lg pl-9 pr-3 py-2.5 text-xs text-vero-text placeholder-vero-subtle outline-none focus:border-vero-accent/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">
                      Máx. Resultados: <span className="text-vero-accent">{xrMaxResults}</span>
                    </label>
                    <input type="range" min={5} max={50} step={5} value={xrMaxResults}
                      onChange={e => setXrMaxResults(parseInt(e.target.value))}
                      className="w-full accent-[#8A5CF5] cursor-pointer" />
                    <div className="flex justify-between text-[9px] text-vero-subtle mt-0.5"><span>5</span><span>50</span></div>
                  </div>

                  {/* Mode selector */}
                  <div>
                    <label className="text-[10px] text-vero-muted font-semibold uppercase tracking-wider mb-1.5 block">Modo de Busca</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["serpapi", "direct"] as const).map(mode => (
                        <button key={mode} onClick={() => setXrMode(mode)}
                          className={`py-2 rounded-lg border text-[11px] font-semibold transition-all ${xrMode === mode ? "border-vero-accent/40 bg-vero-accent/10 text-vero-accent" : "border-vero-border text-vero-muted hover:text-vero-text"}`}>
                          {mode === "serpapi" ? "SerpAPI" : "Direto (fallback)"}
                        </button>
                      ))}
                    </div>
                    <p className="text-[9px] text-vero-subtle mt-1.5">
                      {xrMode === "serpapi" ? "API oficial · resolve CAPTCHA · recomendado" : "Scraping com headers realistas · pode ser bloqueado"}
                    </p>
                  </div>

                  <button onClick={runXRay} disabled={!xrLocation || xrLoading}
                    className="w-full flex items-center justify-center gap-2 bg-vero-accent hover:bg-vero-accent-light disabled:opacity-50 text-white font-semibold text-xs py-3 rounded-xl transition-all glow-purple-sm">
                    {xrLoading
                      ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Buscando…</>
                      : <><Search className="w-3.5 h-3.5" />Buscar LinkedIn</>
                    }
                  </button>
                </div>
              </div>

              {/* CAPTCHA warning */}
              {xrMode === "direct" && (
                <div className="flex items-start gap-2 bg-vero-warning/5 border border-vero-warning/20 rounded-xl px-3 py-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-vero-warning shrink-0 mt-0.5" />
                  <p className="text-[10px] text-vero-warning">Modo direto pode ser bloqueado pelo Google (CAPTCHA). Use SerpAPI para resultados consistentes.</p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {!xrSearched && !xrLoading && (
                <div className="flex flex-col items-center justify-center h-64 bg-vero-card border border-vero-border rounded-xl text-center p-8">
                  <Globe className="w-10 h-10 text-vero-border mb-3" />
                  <p className="text-sm font-semibold text-vero-text mb-1">Nenhuma busca realizada</p>
                  <p className="text-xs text-vero-muted">Preencha a localização e clique em Buscar LinkedIn para iniciar o X-Ray.</p>
                </div>
              )}

              {xrLoading && (
                <div className="flex flex-col items-center justify-center h-64 bg-vero-card border border-vero-border rounded-xl">
                  <div className="w-8 h-8 border-2 border-vero-border border-t-vero-accent rounded-full animate-spin mb-3" />
                  <p className="text-xs text-vero-muted">Buscando profiles do LinkedIn via Google…</p>
                </div>
              )}

              {xrSearched && !xrLoading && (
                <div className="bg-vero-card border border-vero-border rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-vero-border bg-vero-surface">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-vero-accent" />
                      <span className="text-sm font-semibold text-vero-text">{mockXRayResults.length} perfis encontrados</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-vero-accent hover:bg-vero-accent-light text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all">
                      <Plus className="w-3 h-3" />Importar todos
                    </button>
                  </div>

                  <div className="divide-y divide-vero-border">
                    {mockXRayResults.map(result => (
                      <div key={result.id} className="flex items-start gap-4 px-5 py-4 hover:bg-vero-card-hover transition-all">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-vero-accent/20 to-vero-accent-dim/30 border border-vero-accent/20 flex items-center justify-center text-xs font-bold text-vero-accent shrink-0">
                          {result.nome.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-vero-text">{result.nome}</p>
                            <a href="#" className="text-vero-muted hover:text-vero-accent transition-colors">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-xs text-vero-muted mb-1">{result.titulo} · <span className="text-vero-text">{result.empresa}</span></p>
                          <p className="text-[11px] text-vero-subtle leading-relaxed">{result.snippet}</p>
                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {result.tags.map(t => (
                              <span key={t} className="text-[9px] bg-vero-surface border border-vero-border rounded-full px-2 py-0.5 text-vero-subtle">{t}</span>
                            ))}
                          </div>
                        </div>
                        <button className="flex items-center gap-1.5 bg-vero-accent/10 border border-vero-accent/20 hover:bg-vero-accent/20 text-vero-accent text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all shrink-0">
                          <Zap className="w-3 h-3" />Enriquecer
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-3 border-t border-vero-border bg-vero-surface text-[10px] text-vero-subtle">
                    Modo: {xrMode === "serpapi" ? "SerpAPI" : "Direto"} · Localização: {xrLocation || "—"} · {xrCargo && `Cargo: ${xrCargo} ·`} {xrMaxResults} resultados máx.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
