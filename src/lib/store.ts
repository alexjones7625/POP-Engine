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

// ── Default Brands (seeded on first load) ────────────────────────

const DEFAULT_BRANDS: Brand[] = [
  {
    id: "brand-joyful-bath-co",
    name: "Joyful Bath Co",
    website: "https://joyfulbathco.com",
    klaviyoAccount: "JOYFUL_BATH_CO",
    description: "Handcrafted bath and body products — bath bombs, shower steamers, bath salts, bar soap, hemp balm, soy candles. Focused on everyday relaxation and small moments of joy.",
    voiceTone: "Warm and approachable — gentle, calming, joy-focused, emphasizes small everyday rituals over grand transformations, accessible luxury",
    targetAudience: "Women 25-55, moms, self-care focused customers, people seeking everyday relaxation and small moments of joy, gift buyers, value handmade quality and natural ingredients",
    brandPersonality: "We're like your favorite cozy blanket — warm, comforting, never pretentious. We believe the best self-care doesn't have to be complicated. Just run a bath, drop in something handmade, and let the day melt away.",
    usps: [
      "Handmade in small batches with natural ingredients",
      "Mess-free bath experiences (no glitter, no dyes, no residue)",
      "Vegan & cruelty-free with eco-conscious packaging",
      "Multi-sensory aromatherapy experience",
      "Hemp products with CO₂ extracted, third-party tested, US-grown organic hemp (THC-free)",
    ],
    competitors: [],
    products: [
      "Bath Bombs (11 scents)",
      "Shower Steamers (11 scents)",
      "Bath Salts (tubs & packets)",
      "Handmade Bar Soap (hemp, botanical, glycerin)",
      "Hemp Balm (sticks, jars, tins, lip, face, pet)",
      "Hemp Bath Products",
      "Soy Candles (5 scents)",
    ],
    cardinalRules: [
      "No health or medical claims for hemp products",
      "Use vocabulary: handmade, small batches, natural, gentle, relax, moments of joy, self-care",
      "Avoid: revolutionary, miracle, breakthrough, medical claims, cure, treat, diagnose",
      "Free shipping threshold is $75",
    ],
    emailExamples: "",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "brand-switch-research",
    name: "Switch Research",
    website: "https://switchresearch.com",
    klaviyoAccount: "SWITCH_RESEARCH",
    description: "Mental & Emotional Wellness — Therapist-designed guided journals + digital membership ecosystem. Helps women 50-75 gently reconnect with themselves after years of prioritizing others.",
    voiceTone: "Safe, gentle, dignified, reassuring — emphasizes pace, permission, and autonomy. Normalizes setbacks and pauses. Frames tools as support not fixes. Never pressures or implies failure.",
    targetAudience: "Women 50-75, often widows, caretakers, or empty nesters who spent decades prioritizing others. Emotionally cautious, skeptical of therapy but open to guidance. Values dignity, privacy, and self-paced progress.",
    brandPersonality: "We're like a trusted therapist friend — calm, patient, never judgmental. We believe healing happens through gentle structure, not force. We give you permission to go at your own pace and be gentle with yourself.",
    usps: [
      "Therapist-designed journaling frameworks grounded in CBT and emotional regulation",
      "Gentle paced structure — just 10 minutes a day, no blank pages",
      "Designed specifically for women who've never journaled before",
      "Safe emotional entry points — prioritizes not overwhelming users",
      "365-day money-back guarantee",
      "Inner Circle membership provides ongoing support and community",
    ],
    competitors: [],
    products: [
      "Self-Love Journal (13 weeks, $39-$59)",
      "Emotions Journal (9 weeks, $39-$59)",
      "Inner Circle Membership ($19/month)",
    ],
    cardinalRules: [
      "NOT therapy or medical treatment — use 'designed to help,' 'supports,' 'many women report feeling'",
      "Never diagnose, prevent, treat, or cure claims",
      "Never pressure or imply failure",
      "Avoid: hustle, productivity, discipline, aggressive transformation promises",
      "Use: gentle, safe, support, reconnect, process, clarity, calm, self-trust, permission, pace",
    ],
    emailExamples: "",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "brand-cpx",
    name: "CPX",
    website: "https://cpxpickleball.com",
    klaviyoAccount: "CPX",
    description: "Premium pickleball paddles and accessories. Designed and shipped from Chicago, endorsed by professional athletes. From beginners upgrading from Amazon paddles to competitive tournament players.",
    voiceTone: "Luxurious but community-driven, premium. Ultra-tailored and professional.",
    targetAudience: "Ages 25-75, male and female, moderate to high income. Interested in pickleball and outdoor activities. Ranges from beginners upgrading from Amazon paddles to competitive tournament players.",
    brandPersonality: "We're the premium brand that actually cares about the community. Not just selling paddles — we're building the sport. Think Apple meets your local pickleball club. Professional, innovative, but always welcoming.",
    usps: [
      "Designed and shipped from Chicago",
      "Large online pickleball community",
      "Engineered by the best in the space",
      "Best quality materials",
      "Endorsed by professional athletes",
      "90-Day Risk-Free Trial on paddles",
      "Same-day shipping from Chicago",
      "Free returns, no questions asked",
    ],
    competitors: [],
    products: [
      "AIR Series ($99.97) — T700 Carbon Fiber, beginners/recreational",
      "Pro Series (from $119.97) — Raw 3K Carbon Fiber, intermediate/advanced",
      "Elite Series — top-tier competition paddles",
      "Accessories — bags, grips, balls",
    ],
    cardinalRules: [
      "Never use: cheap, budget, low-cost, budget paddle",
      "Use: premium, engineered, professional-grade, community, demo, Chicago-made, top-tier, innovation, risk-free",
      "Orange, black, greyscale color palette",
      "Price framing: best value, worth the upgrade, direct-to-player pricing, no middleman markup",
    ],
    emailExamples: "",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "brand-vapor-fresh",
    name: "Vapor Fresh",
    website: "https://vaporfresh.com",
    klaviyoAccount: "VAPOR_FRESH",
    description: "Sports, Fitness & Facility Cleaning Products. Amazon #1 Best Seller for sports equipment cleaning for 10+ years. Plant-based, essential oil powered, safe for skin and gear.",
    voiceTone: "Practical, athlete-aware, confident but calm, educational without fear. Science-backed but not clinical. Direct and authoritative while remaining approachable.",
    targetAudience: "B2C: Sports moms (30-50), health-conscious families, athletes, yogis. B2B: Gym owners, fitness studios, hockey programs, MMA gyms, medical fitness centers.",
    brandPersonality: "We're the knowledgeable coach who actually cares about what you're putting on your gear and skin. No fear-mongering, just facts. We've been doing this since 2008 and our 5,500+ Amazon reviews speak for themselves.",
    usps: [
      "Amazon #1 Best Seller for 10+ years",
      "5,500+ Amazon reviews",
      "Never uses quats (quaternary ammonium compounds)",
      "Powered by essential oils, plant-based formulas",
      "Safe for repeated skin contact",
      "Filled in the USA",
      "Family-owned since 2008",
      "Won't damage pads, foams, fabrics",
    ],
    competitors: [],
    products: [
      "Sports Cleaner & Deodorizer (spray)",
      "Shoe Odor Eliminator (spray)",
      "Yoga Mat Cleaning Spray",
      "Disinfecting Wipes (EPA registered — ONLY product that can claim germ killing)",
      "Value Wipes (NOT disinfectant)",
      "Gym Equipment Wipes",
      "Laundry Detergent",
    ],
    cardinalRules: [
      "CRITICAL: Only 'Disinfecting Wipes' (EPA registered) can claim kills germs/bacteria/viruses",
      "All other products can ONLY claim: deodorize, clean, freshen, neutralize odors",
      "NEVER use: kills germs, disinfect, sanitize (except EPA wipes)",
      "Use 'Filled in the USA' — never 'Made in' or variants (Stephen's exact wording)",
      "Avoid: greenwashing buzzwords, fear-based language, alarmist tone",
    ],
    emailExamples: "",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "brand-the-dime-lab",
    name: "The Dime Lab",
    website: "https://thedimelab.com",
    klaviyoAccount: "THE_DIME_LAB",
    description: "Premium footballs and football gear. The only footballs crafted by an NFL QB (Kurt Benkert — Falcons, Packers, 49ers). DimeTack Technology for instant game-ready grip.",
    voiceTone: "Confident, fun, grounded. Football-obsessed energy — like talking to a buddy who really knows the game. Performance-first but never stuffy. Authentic — Kurt's real personality comes through.",
    targetAudience: "Men & women 18-55+. Football lovers: backyard players, pickup game regulars, dads/moms playing with kids, flag football players, youth athletes/coaches, former HS/college athletes. Gift buyers. Kurt Benkert YouTube fans (327K+ subs).",
    brandPersonality: "We're Kurt — the NFL QB who got tired of footballs that don't perform right out of the box. We're football-obsessed, zero pretense, and we built the gear we wish existed. If you love throwing a football, you're our people.",
    usps: [
      "The only footballs crafted by an NFL QB (Kurt Benkert)",
      "DimeTack Technology — instant game-ready grip, no mudding or break-in",
      "Weather-resistant composite leather, performs in rain/cold/all conditions",
      "75,000+ footballs sold to 75+ countries",
      "Available at Dick's Sporting Goods (40+ locations) and Scheels",
    ],
    competitors: [],
    products: [
      "DimeTack Footballs ($50, multiple colorways & sizes)",
      "Water Football ($35, woven microfiber with silicone grip)",
      "Flag Football Set ($60, 10-player)",
      "Dri-Grip Towel",
      "Books — 'Football IQ' and 'Football IQ: Smarts Edition'",
    ],
    cardinalRules: [
      "Never use: cheap, budget, low-cost, toy, knockoff",
      "Use: throw dimes, game-ready, grip and go, football-obsessed, DimeTack, zero prep",
      "All DimeTack footballs perform identically — color is the only difference",
      "Water Football is a DIFFERENT product (microfiber) — never conflate with DimeTack",
      "Composite leather = premium polyurethane, not real leather — that's a deliberate feature",
      "If info isn't in brand docs, do not assume or fabricate",
    ],
    emailExamples: "",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
];

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
  if (raw) return JSON.parse(raw);
  // Seed default brands on first load
  localStorage.setItem(BRANDS_KEY, JSON.stringify(DEFAULT_BRANDS));
  if (!getActiveBrandId()) setActiveBrandId(DEFAULT_BRANDS[0].id);
  return DEFAULT_BRANDS;
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
