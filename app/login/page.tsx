"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError("Preencha usuário e senha."); return; }
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4"
      style={{
        backgroundImage: "linear-gradient(rgba(138,92,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138,92,245,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #8A5CF5 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#8A5CF5] flex items-center justify-center shadow-[0_0_20px_rgba(138,92,245,0.5)]">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              vero<span className="text-[#8A5CF5]">.</span>io
            </span>
          </Link>
          <p className="text-[13px] text-white/35 mt-3">Intelligence Layer · B2B Outbound</p>
        </div>

        {/* Card */}
        <div className="bg-[#0F1218] border border-white/8 rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(138,92,245,0.06)" }}
        >
          <h1 className="text-[18px] font-bold text-white mb-1">Entrar na plataforma</h1>
          <p className="text-[12px] text-white/35 mb-6">Acesso restrito a membros do workspace.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="seu.usuario"
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#8A5CF5]/50 transition-colors"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl pl-10 pr-10 py-3 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#8A5CF5]/50 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[12px] text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#8A5CF5] hover:bg-[#A78BFA] disabled:opacity-60 text-white font-semibold text-[14px] py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(138,92,245,0.35)] mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Autenticando…
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/25">
              Sem acesso?{" "}
              <span className="text-[#8A5CF5] cursor-pointer hover:text-[#A78BFA] transition-colors">
                Fale com o admin do workspace
              </span>
            </p>
          </div>
        </div>

        {/* Back to landing */}
        <p className="text-center mt-5 text-[11px] text-white/20">
          <Link href="/" className="hover:text-white/40 transition-colors">← Voltar para o site</Link>
        </p>
      </div>
    </div>
  );
}
