"use client";

import Link from "next/link";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    plan: "Starter",
    price: "R$ 297",
    per: "/mês",
    tokens: "5.000 créditos Apollo",
    users: "2 usuários",
    desc: "Para equipes pequenas estruturando o primeiro ciclo de outbound com dado de qualidade.",
    cta: "Começar agora",
    featured: false,
  },
  {
    plan: "Growth",
    price: "R$ 797",
    per: "/mês",
    tokens: "20.000 créditos Apollo",
    users: "10 usuários",
    desc: "Para times de SDR que precisam de volume, rastreabilidade de custo e sincronizacao com CRM.",
    cta: "Quero o Growth",
    featured: true,
  },
  {
    plan: "Enterprise",
    price: "Sob consulta",
    per: "",
    tokens: "Creditos sob demanda",
    users: "Usuarios ilimitados",
    desc: "Para operacoes de outbound em escala com SLA dedicado, SSO e integracao customizada.",
    cta: "Falar com o time",
    featured: false,
  },
];

const included = [
  "Todas as fontes de prospecção",
  "Enriquecimento Apollo.io completo",
  "Export CSV, JSON e XLSX",
  "Sync HubSpot, Pipedrive e Salesforce",
  "X-Ray LinkedIn via SerpAPI",
  "Painel de crédito por usuário",
];

export default function LandingPricing() {
  return (
    <>
      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["2.3M+", "Empresas indexadas"],
            ["89%", "Taxa de enriquecimento medio"],
            ["4", "Fontes de dado em um unico pipeline"],
            ["0", "Dados originais perdidos ou sobrescritos"],
          ].map(([val, label]) => (
            <div key={String(label)} className="text-center">
              <p className="text-4xl font-extrabold mb-2"
                style={{ background: "linear-gradient(135deg,#A78BFA,#8A5CF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {val}
              </p>
              <p className="text-[12px] text-white/35 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-[#8A5CF5] uppercase tracking-[0.15em] mb-4">Preços transparentes</p>
            <h2 className="text-[36px] font-extrabold text-white mb-4">
              Cada crédito rastreado. Cada centavo justificado.
            </h2>
            <p className="text-[16px] text-white/40 max-w-lg mx-auto">
              Modelo de crédito Apollo por contato enriquecido.
              Seu gestor sabe exatamente quanto custou cada lead e quem consumiu o quê.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {plans.map(({ plan, price, per, tokens, users, desc, cta, featured }) => (
              <div
                key={plan}
                className={`rounded-2xl border p-7 flex flex-col relative overflow-hidden transition-all hover:border-[#8A5CF5]/30 ${
                  featured
                    ? "border-[#8A5CF5]/30 bg-gradient-to-b from-[#8A5CF5]/8 to-[#4C1D95]/8"
                    : "border-white/8 bg-white/[0.02]"
                }`}
                style={featured ? { boxShadow: "0 0 40px rgba(138,92,245,0.15)" } : {}}>
                {featured && (
                  <>
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold bg-[#8A5CF5] text-white px-2.5 py-1 rounded-full">
                        Mais contratado
                      </span>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
                      style={{ background: "#8A5CF5" }} />
                  </>
                )}
                <p className="text-[12px] font-semibold text-white/40 mb-3 uppercase tracking-wider">{plan}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[38px] font-extrabold text-white leading-none">{price}</span>
                  {per && <span className="text-[13px] text-white/35 mb-1.5">{per}</span>}
                </div>
                <p className="text-[12px] text-white/35 leading-relaxed mb-6 mt-3">{desc}</p>
                <div className="space-y-2.5 mb-8 flex-1">
                  {[tokens, users, ...included].map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-white/50 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dashboard"
                  className={`text-center py-3 rounded-xl text-[13px] font-semibold transition-all ${
                    featured
                      ? "bg-[#8A5CF5] hover:bg-[#A78BFA] text-white"
                      : "border border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                  }`}
                  style={featured ? { boxShadow: "0 0 16px rgba(138,92,245,0.35)" } : {}}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[12px] text-white/25">
            Sem taxa de setup. Sem contrato anual obrigatorio. Creditos nao usados nao sao perdidos.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(138,92,245,0.1) 0%,transparent 70%)" }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-7 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#8A5CF5,#6D28D9)", boxShadow: "0 0 32px rgba(138,92,245,0.5)" }}>
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-[38px] font-extrabold text-white leading-tight mb-4">
            Seu time mais produtivo.{" "}
            <span style={{ background: "linear-gradient(135deg,#A78BFA,#8A5CF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Seu dado mais confiavel.
            </span>
          </h2>
          <p className="text-[15px] text-white/40 mb-3 leading-relaxed">
            Vero.io conecta o hunting ao fechamento em um ciclo unico de dado.
            Sem ferramenta avulsa, sem sincronizacao manual, sem retrabalho.
          </p>
          <p className="text-[13px] text-white/25 mb-10">
            Acesso antecipado disponivel para equipes B2B com alto volume de prospecção.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white font-semibold text-[15px] px-8 py-4 rounded-xl transition-all"
              style={{ boxShadow: "0 0 32px rgba(138,92,245,0.45)" }}>
              <Zap className="w-4 h-4" />Solicitar acesso <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">
              Ja tenho conta. Entrar.
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8A5CF5] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-[14px] text-white">
              vero<span className="text-[#8A5CF5]">.</span>io
            </span>
          </div>
          <p className="text-[12px] text-white/20">© 2026 Vero Intelligence. Todos os direitos reservados.</p>
          <div className="flex items-center gap-5 text-[12px] text-white/25">
            <Link href="/login" className="hover:text-white/50 transition-colors">Entrar</Link>
            <a href="#" className="hover:text-white/50 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white/50 transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </>
  );
}
