"use client";

import { Bell, Search, Coins, ChevronDown } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-14 border-b border-vero-border bg-vero-surface/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-vero-text truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-vero-muted truncate">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-vero-card border border-vero-border rounded-lg px-3 py-1.5 w-52">
        <Search className="w-3.5 h-3.5 text-vero-subtle shrink-0" />
        <input
          type="text"
          placeholder="Buscar contatos, empresas..."
          className="bg-transparent text-xs text-vero-muted placeholder-vero-subtle outline-none w-full"
        />
        <kbd className="text-[9px] text-vero-subtle border border-vero-border rounded px-1 py-0.5 font-mono">⌘K</kbd>
      </div>

      {/* Credits pill */}
      <div className="token-badge flex items-center gap-1.5 rounded-full px-3 py-1.5">
        <Coins className="w-3.5 h-3.5 text-vero-accent" />
        <span className="text-xs font-semibold text-vero-accent font-mono">9.750</span>
        <span className="text-[10px] text-vero-muted">tokens</span>
      </div>

      {/* Notification */}
      <button className="relative p-2 rounded-lg hover:bg-vero-card transition-colors">
        <Bell className="w-4 h-4 text-vero-muted" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-vero-accent rounded-full" />
      </button>

      {/* User */}
      <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-vero-card transition-colors">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #8A5CF5, #6D28D9)" }}
        >
          YB
        </div>
        <ChevronDown className="w-3 h-3 text-vero-subtle" />
      </button>
    </header>
  );
}
