// ─── Core enums ──────────────────────────────────────────────────────────────

export type ContactStatus = "high_intent" | "medium_intent" | "low_intent" | "unqualified";
export type HuntStatus = "running" | "completed" | "scheduled" | "paused";
export type SourceType = "sales_navigator" | "serasa" | "google_maps" | "crunchbase" | "linkedin" | "xray" | "manual" | "html" | "extension";
export type CRMStatus = "connected" | "disconnected" | "pending";

// Apollo.io enrichment types
export type EmailStatus = "valid" | "risky" | "unknown" | "not_found";
export type SeniorityLevel = "entry" | "senior" | "manager" | "director" | "c-level";
export type PhoneStatus = "received" | "pending" | "not_found";
export type HubSpotAction = "created" | "updated_by_id" | "updated_by_email" | "failed" | "skipped";
export type ImportMethod = "extension" | "text" | "html" | "saved";
export type UserRole = "admin" | "member";
export type UserStatus = "active" | "invited" | "inactive";

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface Contact {
  id: string;

  // Original (LeadHunter: imutável, preservado como capturado)
  nome_original: string;
  empresa_original: string;
  cargo_original: string;
  email_original?: string;
  telefone_original?: string;

  // Nutrido por Apollo.io (campo_nutrido)
  nome_nutrido: string;
  empresa_nutrido: string;
  cargo_nutrido: string;
  email_nutrido?: string;
  telefone_nutrido?: string;

  // Apollo fields
  email_status?: EmailStatus;
  seniority_level?: SeniorityLevel;
  industry?: string;
  apollo_id?: string;
  phone_status?: PhoneStatus;

  // LinkedIn
  linkedin_profile_url?: string;

  // HubSpot
  hubspot_id?: string;
  hubspot_synced?: boolean;
  hubspot_action?: HubSpotAction;

  // Vero metadata
  tempo_no_cargo: string;
  status_contato: ContactStatus;
  tokens_spent: number;
  ultima_atualizacao: string;
  mudanca_recente?: string;
  score: number;
  fonte: SourceType;
  import_method?: ImportMethod;
}

// ─── Apollo Credits ───────────────────────────────────────────────────────────

export interface ApolloCredits {
  export_used: number;
  export_total: number;
  phone_used: number;
  phone_total: number;
}

// ─── HubSpot Sync ─────────────────────────────────────────────────────────────

export interface SyncDecision {
  contact_id: string;
  nome: string;
  email?: string;
  action: HubSpotAction;
  hubspot_id?: string;
  error?: string;
}

export interface HubSpotSyncResult {
  total: number;
  created: number;
  updated: number;
  failed: number;
  skipped: number;
  decisions: SyncDecision[];
  http_status: 200 | 207 | 400 | 500;
}

// ─── Saved List ──────────────────────────────────────────────────────────────

export interface SavedList {
  id: string;
  name: string;
  total_profiles: number;
  enriched_count: number;
  valid_emails: number;
  created_at: string;
  updated_at: string;
  username: string;
  storage: "local" | "gcs";
  sources: SourceType[];
}

// ─── Webhook ─────────────────────────────────────────────────────────────────

export interface WebhookPending {
  apollo_id: string;
  contact_name: string;
  requested_at: string;
  status: "pending" | "received" | "timeout";
}

// ─── Company ─────────────────────────────────────────────────────────────────

export interface Company {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  cnae_principal: string;
  cnae_descricao: string;
  brand_sector: string;
  faturamento_estimado: string;
  valuation: string;
  funcionarios: number;
  cidade: string;
  estado: string;
  website?: string;
  impacto_mercado: string;
  serasa_score: number;
  status_receita: "ativa" | "suspensa" | "inapta";
  data_abertura: string;
  c_levels: CLevelContact[];
}

export interface CLevelContact {
  nome: string;
  cargo: string;
  linkedin?: string;
  tempo_empresa: string;
}

// ─── Hunt ────────────────────────────────────────────────────────────────────

export interface HuntSession {
  id: string;
  nome: string;
  status: HuntStatus;
  fontes: SourceType[];
  contatos_encontrados: number;
  tokens_consumidos: number;
  progresso: number;
  criado_em: string;
  concluido_em?: string;
  filtros: HuntFilters;
}

export interface HuntFilters {
  cargos: string[];
  localizacoes: string[];
  cnaes: string[];
  faturamento_min?: string;
  faturamento_max?: string;
  tecnologias?: string[];
}

// ─── X-Ray Search ────────────────────────────────────────────────────────────

export interface XRayResult {
  id: string;
  nome: string;
  linkedin_url: string;
  titulo: string;
  empresa: string;
  snippet: string;
  tags: string[];
}

// ─── Workspace / Team ─────────────────────────────────────────────────────────

export interface WorkspaceMember {
  id: string;
  nome: string;
  username: string;
  email: string;
  role: UserRole;
  avatar_color: string;
  tokens_quota: number;
  tokens_used: number;
  ultimo_acesso: string;
  status: UserStatus;
  created_at: string;
}

export interface WorkspaceStats {
  total_contacts: number;
  total_companies: number;
  active_hunts: number;
  tokens_used_month: number;
  tokens_quota_month: number;
  enrichment_rate: number;
  sources_active: number;
  emails_found: number;
  emails_valid: number;
  unique_companies: number;
  unique_titles: number;
  hubspot_synced: number;
}
