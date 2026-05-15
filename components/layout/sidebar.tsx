"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Crosshair,
  Users,
  Building2,
  Plug,
  Settings,
  Zap,
  ChevronRight,
  Upload,
  Phone,
} from "lucide-react";
import { mockApolloCredits, mockWebhooksPending } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/import", icon: Upload, label: "Importar Perfis" },
  { href: "/hunting", icon: Crosshair, label: "Hunting / X-Ray" },
  { href: "/contacts", icon: Users, label: "Contact Manager" },
  { href: "/companies", icon: Building2, label: "Company Deep Dive" },
  { href: "/integrations", icon: Plug, label: "Integrations" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const apolloExportPct = Math.round((mockApolloCredits.export_used / mockApolloCredits.export_total) * 100);
  const apolloPhonePct = Math.round((mockApolloCredits.phone_used / mockApolloCredits.phone_total) * 100);
  const pendingPhones = mockWebhooksPending.filter(w => w.status === "pending").length;

  const apolloExportColor = apolloExportPct >= 80 ? "#EF4444" : apolloExportPct >= 50 ? "#F59E0B" : "#10B981";
  const apolloPhoneColor = apolloPhonePct >= 80 ? "#EF4444" : apolloPhonePct >= 50 ? "#F59E0B" : "#10B981";

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col bg-vero-surface border-r border-vero-border z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-vero-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-vero-accent flex items-center justify-center glow-purple-sm">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-vero-text font-bold text-lg tracking-tight">
            vero<span className="text-vero-accent">.</span>io
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                ${active
                  ? "bg-vero-accent/10 text-vero-accent-light border border-vero-accent/20"
                  : "text-vero-muted hover:text-vero-text hover:bg-vero-card"
                }
              `}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-vero-accent" : "text-vero-subtle group-hover:text-vero-muted"}`} />
              <span className="flex-1">{label}</span>
              {label === "Hunting / X-Ray" && (
                <span className="w-1.5 h-1.5 rounded-full bg-vero-warning pulse-dot shrink-0" />
              )}
              {label === "Importar Perfis" && pendingPhones > 0 && (
                <span className="text-[9px] bg-vero-accent/20 text-vero-accent rounded-full px-1.5 py-0.5 font-bold shrink-0">{pendingPhones}</span>
              )}
              {active && <ChevronRight className="w-3 h-3 text-vero-accent opacity-60 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Apollo Credits */}
      <div className="px-4 py-3 border-t border-vero-border space-y-2.5">
        <p className="text-[9px] text-vero-subtle uppercase tracking-widest font-semibold">Créditos Apollo.io</p>

        {/* Export credits */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-vero-muted">Export</span>
            <span className="text-[10px] font-mono font-semibold" style={{ color: apolloExportColor }}>
              {mockApolloCredits.export_used}/{mockApolloCredits.export_total}
            </span>
          </div>
          <div className="w-full h-1 bg-vero-border rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${apolloExportPct}%`, backgroundColor: apolloExportColor }} />
          </div>
        </div>

        {/* Phone credits */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-vero-muted">Telefone</span>
            <span className="text-[10px] font-mono font-semibold" style={{ color: apolloPhoneColor }}>
              {mockApolloCredits.phone_used}/{mockApolloCredits.phone_total}
            </span>
          </div>
          <div className="w-full h-1 bg-vero-border rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${apolloPhonePct}%`, backgroundColor: apolloPhoneColor }} />
          </div>
        </div>

        {/* Phone webhook pending */}
        {pendingPhones > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-vero-warning">
            <Phone className="w-3 h-3" />
            <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-vero-warning" />
            Aguardando {pendingPhones} telefone{pendingPhones > 1 ? "s" : ""}…
          </div>
        )}
      </div>

      {/* Vero Tokens */}
      <div className="px-4 py-3 border-t border-vero-border">
        <div className="token-badge rounded-lg px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-vero-muted font-medium">Tokens Vero</span>
            <span className="text-xs text-vero-accent font-mono font-semibold">9.750</span>
          </div>
          <div className="w-full h-1 bg-vero-border rounded-full overflow-hidden">
            <div className="h-full bg-vero-accent rounded-full" style={{ width: "41%" }} />
          </div>
          <p className="text-[10px] text-vero-subtle mt-1">6.750 usados de 16.500</p>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-t border-vero-border">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #8A5CF5, #6D28D9)" }}
          >
            YB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-vero-text truncate">Yago Barbosa</p>
            <p className="text-[10px] text-vero-subtle truncate">Admin · Workspace</p>
          </div>
          <Link href="/settings">
            <Settings className="w-3.5 h-3.5 text-vero-subtle hover:text-vero-muted cursor-pointer transition-colors shrink-0" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
