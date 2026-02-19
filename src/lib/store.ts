"use client";

// Simple localStorage-backed store for brands, campaigns, and flows
// Replaced by Supabase in production

export interface Brand {
  id: string;
  name: string;
  website: string;
  klaviyoAccount: string;
  description: string;
  // Voice & Personality
  voiceTone: string; // e.g. "Witty, casual, confident"
  targetAudience: string; // e.g. "Health-conscious millennials, 25-40"
  brandPersonality: string; // e.g. "We're the friend who knows everything about supplements"
  usps: string[]; // Unique selling propositions
  competitors: string[]; // Competitor names
  // Products & Rules
  products: string[];
  cardinalRules: string[];
  // Examples
  emailExamples: string; // Paste of example emails in their voice
  createdAt: string;
}

export interface Campaign {
  id: string;
  brandId: string;
  title: string;
  framework: string;
  style: string;
  brief: string;
  subject: string;
  preview: string;
  body: string;
  validationScore: number | null;
  status: "draft" | "designed" | "reviewed" | "approved";
  createdAt: string;
}

export interface FlowState {
  id: string;
  templateId: string;
  name: string;
  brandId: string;
  nodes: string; // JSON stringified React Flow nodes
  edges: string; // JSON stringified React Flow edges
  updatedAt: string;
}

const BRANDS_KEY = "pop-platform-brands";
const CAMPAIGNS_KEY = "pop-platform-campaigns";
const FLOWS_KEY = "pop-platform-flows";
const ACTIVE_BRAND_KEY = "pop-platform-active-brand";

// ── Active Brand ───────────────────────────────────────────────────

export function getActiveBrandId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_BRAND_KEY);
}

export function setActiveBrandId(id: string): void {
  localStorage.setItem(ACTIVE_BRAND_KEY, id);
}

export function getActiveBrand(): Brand | undefined {
  const id = getActiveBrandId();
  if (!id) return undefined;
  return getBrand(id);
}

// ── Brands ─────────────────────────────────────────────────────────

export function getBrands(): Brand[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(BRANDS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveBrand(brand: Brand): void {
  const brands = getBrands();
  const existing = brands.findIndex((b) => b.id === brand.id);
  if (existing >= 0) {
    brands[existing] = brand;
  } else {
    brands.push(brand);
  }
  localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  // Auto-set as active if it's the first brand
  if (brands.length === 1 || !getActiveBrandId()) {
    setActiveBrandId(brand.id);
  }
}

export function deleteBrand(id: string): void {
  const brands = getBrands().filter((b) => b.id !== id);
  localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  if (getActiveBrandId() === id) {
    localStorage.setItem(ACTIVE_BRAND_KEY, brands[0]?.id || "");
  }
}

export function getBrand(id: string): Brand | undefined {
  return getBrands().find((b) => b.id === id);
}

// ── Campaigns ──────────────────────────────────────────────────────

export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CAMPAIGNS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCampaign(campaign: Campaign): void {
  const campaigns = getCampaigns();
  const existing = campaigns.findIndex((c) => c.id === campaign.id);
  if (existing >= 0) {
    campaigns[existing] = campaign;
  } else {
    campaigns.push(campaign);
  }
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

export function getCampaign(id: string): Campaign | undefined {
  return getCampaigns().find((c) => c.id === id);
}

// ── Flows ──────────────────────────────────────────────────────────

export function getFlows(): FlowState[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(FLOWS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveFlow(flow: FlowState): void {
  const flows = getFlows();
  const existing = flows.findIndex((f) => f.id === flow.id);
  if (existing >= 0) {
    flows[existing] = flow;
  } else {
    flows.push(flow);
  }
  localStorage.setItem(FLOWS_KEY, JSON.stringify(flows));
}

export function getFlow(id: string): FlowState | undefined {
  return getFlows().find((f) => f.id === id);
}

export function generateId(): string {
  return crypto.randomUUID();
}
