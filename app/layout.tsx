import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vero Intelligence — Prospecção B2B com Soberania de Dados",
  description:
    "A camada de inteligência para prospecção B2B. Enriqueça contatos com IA, preserve dados originais e integre com seu CRM.",
  keywords: ["prospecção B2B", "inteligência de dados", "enriquecimento de leads", "CRM", "sales intelligence"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
