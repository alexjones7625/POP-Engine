export interface Tactic {
  id: string;
  name: string;
  domain: string;
  file: string;
  description: string;
  tacticCount: string;
  keyTactics: string[];
}

export const tacticDomains = [
  "Copywriting",
  "Flows",
  "Campaigns",
  "Ecommerce Email",
  "Retention",
  "SMS",
  "Client Acquisition",
  "Social Media",
  "Twitter/X",
  "Newsletter",
  "SEO & Blog",
  "Technical",
] as const;

export type TacticDomain = (typeof tacticDomains)[number];

// Structured data from TACTICS_INDEX.md — in production, parsed from skills/ at build time
export const tactics: Tactic[] = [
  // Copywriting
  {
    id: "copywriting-axioms",
    name: "Copywriting Axioms",
    domain: "Copywriting",
    file: "copywriting/copywriting_axioms.md",
    description: "The 16 Fundamental Laws of Copywriting from Joseph Sugarman",
    tacticCount: "16 axioms",
    keyTactics: [
      "All elements exist to get first sentence read (Axiom 2)",
      "Create slippery slide (Axiom 6)",
      "Emotion then logic (Axiom 10)",
      "Sell cure not prevention (Axiom 14)",
    ],
  },
  {
    id: "psychological-triggers",
    name: "Psychological Triggers Complete",
    domain: "Copywriting",
    file: "copywriting/psychological_triggers_complete.md",
    description: "Life-Force 8 + Sugarman's 24 Triggers — 90+ psychological mechanisms",
    tacticCount: "90+ triggers",
    keyTactics: [
      "Life-Force 8: Primary biological drives",
      "Sugarman's 24 Triggers: Honesty, credibility, authority, proof",
      "Stack Life-Force 8 + 3-5 Sugarman triggers in every email",
    ],
  },
  {
    id: "hooks-master",
    name: "Hooks Master",
    domain: "Copywriting",
    file: "copywriting/hooks_master.md",
    description: "121 Proven Hooks + 12 Core Formulas from Alex Hormozi and others",
    tacticCount: "121 hooks",
    keyTactics: [
      "HOOK-001 to HOOK-012: Core formulas",
      "Callout + Outcome pattern",
      "Secrets/Mistakes pattern",
      "If/Then framework",
    ],
  },
  {
    id: "email-hooks",
    name: "Email Hooks & Subject Lines",
    domain: "Copywriting",
    file: "copywriting/email_hooks.md",
    description: "SUBJ-001 to SUBJ-011: 15 subject line styles with rules per style",
    tacticCount: "15 styles",
    keyTactics: [
      "SUBJ-001: Question hooks",
      "SUBJ-004: Curiosity gaps",
      "SUBJ-007: Pattern interrupts",
      "SUBJ-011: Personalization",
    ],
  },
  {
    id: "email-body-copy",
    name: "Email Body Copy",
    domain: "Copywriting",
    file: "copywriting/email_body_copy.md",
    description: "BODY-001 to BODY-009: Complete body copy system with anti-patterns",
    tacticCount: "9 rules",
    keyTactics: [
      "BODY-001: Hero section rules",
      "BODY-005: Product section structure",
      "BODY-009: Never restate specs in consecutive sections",
    ],
  },
  {
    id: "google-docs-formatting",
    name: "Google Docs Formatting",
    domain: "Copywriting",
    file: "copywriting/google_docs_formatting.md",
    description: "GDOC-001+: Email formatting standards for designer handoff",
    tacticCount: "10+ rules",
    keyTactics: [
      "GDOC-001: Section header formatting",
      "GDOC-003: CTA button formatting",
      "GDOC-005: Image placeholder standards",
    ],
  },
  {
    id: "ctas",
    name: "CTA Optimization",
    domain: "Copywriting",
    file: "copywriting/ctas.md",
    description: "CTA-001+: Call-to-action optimization tactics",
    tacticCount: "15+ tactics",
    keyTactics: [
      "CTA-001: Button above the fold",
      "CTA-003: Action-oriented verbs",
      "CTA-005: Urgency language patterns",
    ],
  },

  // Flows
  {
    id: "flow-architecture",
    name: "Flow Architecture Complete",
    domain: "Flows",
    file: "flows/flow_architecture_complete.md",
    description: "FLOW-ARCH-001 to FLOW-ARCH-019: Complete flow system with 7 flow types",
    tacticCount: "19 tactics",
    keyTactics: [
      "FLOW-ARCH-001: 40/60 revenue split rule",
      "FLOW-ARCH-002: 6 core flows (non-negotiable)",
      "FLOW-ARCH-007: Cart vs checkout abandon split",
      "FLOW-ARCH-013: Test in campaigns, add winners to flows",
    ],
  },
  {
    id: "welcome-flow",
    name: "Welcome Flow Deep-Dive",
    domain: "Flows",
    file: "flows/welcome_flow.md",
    description: "8-email welcome sequence with per-email framework",
    tacticCount: "8 email frameworks",
    keyTactics: [
      "Email 1: Strong Introduction (discount at top)",
      "Email 2: Brand Story (founder photo required)",
      "Email 7: Last Chance (countdown timer)",
      "Email 8: Founder Note (plain text)",
    ],
  },
  {
    id: "abandoned-cart",
    name: "Abandoned Cart Flow",
    domain: "Flows",
    file: "flows/abandoned_cart_flow.md",
    description: "6-8 email cart recovery with customer split logic",
    tacticCount: "8 email frameworks",
    keyTactics: [
      "Email 1: Cart reminder at 30 min",
      "Email 5: Last chance urgency",
      "Split: Previous customers (no discount) vs new (discount)",
    ],
  },

  // Campaigns
  {
    id: "29-frameworks",
    name: "29 Campaign Frameworks",
    domain: "Campaigns",
    file: "campaigns/29_campaign_frameworks.md",
    description: "CAMP-001 to CAMP-031: Complete non-discount campaign framework library",
    tacticCount: "29 frameworks",
    keyTactics: [
      "CAMP-001: 70/30 Rule (non-discount vs promotional)",
      "CAMP-002: One Benefit Deep-Dive",
      "CAMP-011: Us vs Them",
      "CAMP-020: Note from Founder",
    ],
  },

  // Ecommerce Email
  {
    id: "campaign-strategy",
    name: "Campaign Strategy",
    domain: "Ecommerce Email",
    file: "ecommerce_email/campaign_strategy.md",
    description: "MS-CAMP-001 to MS-CAMP-007: Send frequency, content pillars, calendar",
    tacticCount: "7 strategies",
    keyTactics: [
      "MS-CAMP-001: 3-4x/week send frequency",
      "MS-CAMP-002: 5 Content Pillars",
      "MS-CAMP-006: Campaign Calendar Framework",
    ],
  },

  // Retention
  {
    id: "retention-strategies",
    name: "Retention Strategies",
    domain: "Retention",
    file: "retention/retention_strategies.md",
    description: "Customer retention and loyalty tactics",
    tacticCount: "20+ tactics",
    keyTactics: [
      "Winback at 2x avg purchase frequency",
      "Post-purchase upsell within 24 hours",
      "VIP segment management",
    ],
  },

  // SMS
  {
    id: "sms-marketing",
    name: "SMS Marketing",
    domain: "SMS",
    file: "sms/sms_marketing.md",
    description: "SMS copy, compliance, and timing tactics",
    tacticCount: "15+ tactics",
    keyTactics: [
      "160 character message structure",
      "SMS + email coordination timing",
      "Compliance and opt-in best practices",
    ],
  },

  // Social Media
  {
    id: "instagram-carousel",
    name: "Instagram Carousel System",
    domain: "Social Media",
    file: "social_media/instagram_carousel.md",
    description: "Carousel content creation and engagement tactics",
    tacticCount: "12+ tactics",
    keyTactics: [
      "First slide hook formula",
      "8-10 slide optimal length",
      "CTA on final slide",
    ],
  },
];
