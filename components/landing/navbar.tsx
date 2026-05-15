"use client";

import Link from "next/link";
import { Zap, Star, ArrowRight } from "lucide-react";

export default function LandingNavbar() {
  return (
    <>
      <div className="w-full py-2.5 text-center" style={{ background: "linear-gradient(90deg,#4C1D95,#8A5CF5,#4C1D95)" }}>
        <p className="text-[12px] font-medium text-white/90 flex items-center justify-center gap-2">
          <Star className="w-3.5 h-3.5 text-yellow-300" />
          Acesso antecipado disponível para equipes com alto volume de prospecção B2B.
          <a href="#" className="underline underline-offset-2 hover:text-white transition-colors flex items-center gap-1">
            Solicite sua vaga <ArrowRight className="w-3 h-3 inline" />
          </a>
        </p>
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#080A0F]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#8A5CF5] flex items-center justify-center shadow-[0_0_12px_rgba(138,92,245,0.6)]">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-[15px] tracking-tight text-white">
                vero<span className="text-[#8A5CF5]">.</span>io
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-[13px] text-white/50">
              <a href="#produto" className="hover:text-white/90 transition-colors">Produto</a>
              <a href="#comparacao" className="hover:text-white/90 transition-colors">Por que Vero</a>
              <a href="#pricing" className="hover:text-white/90 transition-colors">Preços</a>
              <Link href="/login" className="hover:text-white/90 transition-colors">Docs</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] text-white/50 hover:text-white px-3 py-1.5 transition-colors">
              Entrar
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-1.5 bg-[#8A5CF5] hover:bg-[#A78BFA] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_0_16px_rgba(138,92,245,0.4)]">
              Acessar plataforma <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
