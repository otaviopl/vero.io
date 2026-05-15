# vero.io — Data Growth Partner

> Operating System para Prospecção B2B. Do hunting ao CRM em um ciclo único de dado.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Visão geral

**Vero.io** é uma plataforma de inteligência comercial B2B que unifica captura de leads, enriquecimento de dados, rastreabilidade de crédito e sincronização com CRM em um único pipeline. Substitui o fluxo fragmentado de ferramentas avulsas (extensão + planilha + CRM manual) por um ambiente operacional coeso onde cada dado tem origem rastreada, versão enriquecida preservada e custo registrado por usuário.

### O problema que resolve

| Abordagem convencional | Com Vero.io |
|---|---|
| Dado original sobrescrito no enriquecimento | Campo original intacto, versão enriquecida ao lado |
| Sem rastreabilidade de crédito por usuário | Cada crédito Apollo registrado por contato e por membro |
| CRM desatualizado por sync manual | Sync automático com HubSpot via batch (`enriched=true`) |
| SDR sem contexto de cargo, empresa ou momento | Brand Sector, Score de Intenção e Org Chart no perfil |

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Runtime | Node.js 24 |
| UI | React 19, Tailwind CSS v4, lucide-react |
| Linguagem | TypeScript 5 (strict mode) |
| Ícones | lucide-react 0.460 |
| Linting | ESLint (Next.js flat config) |

---

## Funcionalidades

### Landing Page
- Headline com rotação animada de palavras-chave
- Visual de pipeline em camadas com animação parallax e live feed
- Seção de comparação (abordagem convencional vs Vero)
- Spotlight de features: Hunting Room, Camada de Dado, Inteligência Estratégica
- Pricing com modelo de crédito Apollo (Starter · Growth · Enterprise)

### Dashboard
- Métricas de workspace: leads, e-mails encontrados/válidos, empresas únicas, cargos únicos
- Monitor de créditos Apollo (export + phone) com alertas visuais
- Painel de webhooks pendentes de telefone (Apollo async)
- Ações rápidas: importar, hunting, enriquecer, sincronizar HubSpot

### Hunting Room
- Multi-fonte: Redes Profissionais, Dados Cadastrais, Geolocalização, Base Empresarial
- Feed ao vivo de captura com status por contato
- **X-Ray LinkedIn**: busca via SerpAPI ou modo direto, por localização/cargo/empresa

### Contact Manager
- Tabela com filtros por `email_status` (valid · risky · unknown · not_found) e `seniority_level`
- Modelo de dado dual: `campo_original` + `campo_nutrido` (Apollo ✦)
- Indicadores HubSpot: `created` · `updated_by_id` · `updated_by_email` · `failed` · `skipped`
- Webhook de telefone assíncrono com polling a cada 10s (até 5 min)
- Export: CSV (UTF-8-SIG, QUOTE_ALL) · JSON · XLSX

### Importação de Perfis
- **Extensão Chrome**: recebe via `POST /api/profiles`, exibe feed ao vivo
- **Texto / Lista**: separadores pipe, tab, vírgula, ponto — incluindo `hubspot_id`
- **HTML da Página**: extração via atributos `data-anonymize`
- **Listas Salvas**: grid com metadados (GCS ou local)

### Company Deep Dive
- Enriquecimento por CNPJ/domínio
- Brand Sector, Score de Intenção, Org Chart automático
- Sinais de momento de abordagem (mudança de liderança, abertura de vagas, rodada)

### Integrações
- **Apollo.io**: monitor de créditos, configuração de campos enriquecidos, webhook de telefone
- **HubSpot CRM**: lógica de sync inteligente (PATCH por ID → busca por e-mail → POST), HTTP 200/207/400/500
- **Export**: CSV · JSON · XLSX com tabs por `email_status`
- **Webhooks**: endpoint `POST /api/webhook/apollo/phone`, persistência em GCS

### Settings
- Gestão de equipe: criar usuário, ativar/desativar, reset de senha, cota de tokens
- Workspace: nome, fuso, idioma
- Créditos & Billing: histórico de consumo por usuário
- Variáveis de ambiente: APOLLO_API_KEY, HUBSPOT_API_KEY, SERPAPI_KEY, PROJECT_ID, GCS_BUCKET_NAME, ADMIN_USERS

---

## Estrutura do projeto

```
vero-io/
├── app/
│   ├── (dashboard)/
│   │   ├── companies/        # Company Deep Dive
│   │   ├── contacts/         # Contact Manager
│   │   ├── dashboard/        # Overview & métricas
│   │   ├── hunting/          # Hunting Room + X-Ray LinkedIn
│   │   ├── import/           # 4 métodos de importação
│   │   ├── integrations/     # Apollo · HubSpot · Export · Webhooks
│   │   ├── settings/         # Equipe · Workspace · Billing · Env vars
│   │   └── layout.tsx        # Sidebar + main wrapper
│   ├── login/                # Autenticação standalone
│   ├── globals.css           # Tailwind v4 @theme + keyframes
│   ├── layout.tsx            # Root layout (Inter, pt-BR)
│   └── page.tsx              # Landing page (orquestrador)
├── components/
│   ├── landing/
│   │   ├── navbar.tsx        # Barra de anúncio + nav sticky
│   │   ├── hero.tsx          # Headline animada + LayeredStack
│   │   ├── comparison.tsx    # Tabela antes/depois
│   │   ├── features.tsx      # Spotlights de produto
│   │   └── pricing.tsx       # Planos + stats + footer
│   └── layout/
│       ├── sidebar.tsx       # Navegação + créditos Apollo
│       └── topbar.tsx        # Cabeçalho do dashboard
├── lib/
│   ├── types.ts              # EmailStatus, SeniorityLevel, HubSpotAction, etc.
│   └── mock-data.ts          # Dados de demonstração (contatos, listas, webhooks)
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Instalação

> Requer **Node.js 24**. Em ambientes Windows com certificados corporativos, use `NODE_OPTIONS=--use-system-ca`.

```bash
# Clonar o repositório
git clone git@github.com:otaviopl/vero.io.git
cd vero.io

# Instalar dependências
npm install
# Se houver erro de binding nativo do Tailwind no Windows:
# npm install   # (rodar duas vezes resolve o optional dep do @tailwindcss/oxide)

# Rodar em desenvolvimento (Turbopack)
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz (nunca commitado — já no `.gitignore`):

```env
# Apollo.io
APOLLO_API_KEY=sua_chave_aqui

# HubSpot CRM
HUBSPOT_API_KEY=sua_chave_aqui

# SerpAPI (X-Ray LinkedIn)
SERPAPI_KEY=sua_chave_aqui

# Google Cloud (BigQuery + GCS)
PROJECT_ID=seu_project_id
DATASET_ID=seu_dataset_id
GCS_BUCKET_NAME=seu_bucket

# Admins (separados por vírgula)
ADMIN_USERS=usuario1,usuario2
```

Um arquivo `.env.example` com as chaves (sem valores) está incluído no repositório.

---

## Modelo de dado

Cada contato carrega campos na forma dual para preservar auditabilidade:

```json
{
  "nome_original": "JOAO SILVA",
  "nome_nutrido": "João Silva",
  "cargo_original": "DIRETOR TI",
  "cargo_nutrido": "CTO",
  "email_status": "valid",
  "seniority_level": "c-level",
  "phone_status": "pending",
  "tokens_spent": 12,
  "hubspot_id": "12345",
  "hubspot_action": "updated_by_id",
  "enriched": true
}
```

Campos com `✦` foram enriquecidos via Apollo.io e têm crédito rastreado por usuário.

---

## Lógica de sync HubSpot

```
Para cada contato:
  SE hubspot_id existe → PATCH /contacts/{id}         → 200 updated_by_id
  SENÃO busca por email:
    SE encontrado      → PATCH /contacts/{id}         → 207 updated_by_email
    SENÃO              → POST /contacts               → 200 created
  SE erro             → 400/500 failed
  SE já está em dia   → skipped
```

---

## Roadmap

- [ ] Backend: Next.js API Routes com Apollo.io real
- [ ] Integração HubSpot (OAuth + PATCH/POST real)
- [ ] Chrome Extension (Manifest V3)
- [ ] Webhook Apollo phone (endpoint + polling + GCS)
- [ ] Autenticação (NextAuth ou Clerk)
- [ ] Multi-tenant por workspace
- [ ] Relatórios de consumo de crédito por período

---

## Licença

MIT © 2026 Vero Intelligence
