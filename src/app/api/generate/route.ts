import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// ── Tactics loader ──────────────────────────────────────────────────

function loadTacticsContent(): string {
  const skillsDir = path.resolve(process.cwd(), "skills", "copywriting");
  const files = [
    "email_body_copy.md",
    "subject_lines.md",
    "email_hooks.md",
    "ctas.md",
    "email_structure.md",
    "emotional_triggers.md",
    "google_docs_formatting.md",
  ];

  const sections: string[] = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(skillsDir, file), "utf-8");
      sections.push(content);
    } catch {
      // File not found, skip
    }
  }
  return sections.join("\n\n---\n\n");
}

let cachedTactics: string | null = null;
function getTactics(): string {
  if (!cachedTactics) {
    cachedTactics = loadTacticsContent();
  }
  return cachedTactics;
}

// ── System prompt builder ───────────────────────────────────────────

function buildSystemPrompt(tactics: string): string {
  return `You are an elite email copywriter for ecommerce brands. You write high-converting email campaigns using proven frameworks backed by 1,280+ tested tactics.

You output email copy in a STRUCTURED 5-SECTION FORMAT. Each section is a separate field in your JSON output. This is how we format every email — it maps to a 1-column x 5-row table in Google Docs that designers use to build the final email.

═══════════════════════════════════════════════════
SECTION 1: HERO (headline + subheadline + first CTA)
═══════════════════════════════════════════════════
- "headline": 4-8 words. Benefit-driven or curiosity-driven. Will be bolded by designer. Write plain text (no **bold** markdown).
- "subheadline": 1-2 sentences. Supports the headline. Regular weight text.
- "first_cta": UPPERCASE, 2-4 words, benefit-driven. Format: "DISCOVER THE JOURNAL" not "Shop Now". Action verbs: Get, Start, Claim, Discover, Join, Try, Save, Unlock.

═══════════════════════════════════════════════════
SECTION 2: BODY COPY
═══════════════════════════════════════════════════
- "body_copy": 2-4 sentences MAX. This is the emotional/educational core.
- Connects hero to product. Tells a micro-story, educates, or builds desire.
- Short paragraphs (2-3 sentences max). Use \\n\\n for paragraph breaks.
- Must trigger dopamine: humor, surprise, useful facts, or emotional connection.
- One takeaway per email. If you try to communicate 5 things, they remember none.

═══════════════════════════════════════════════════
SECTION 3: BRIDGE (visual guidance for designer)
═══════════════════════════════════════════════════
- "bridge_section": Visual guidance wrapped in {curly braces} + optional supporting copy.
- Use {curly braces} ONLY for design/visual instructions (infographics, images, comparisons).
- Include ALL copy and data that should appear in the visual (headlines, stats, labels).
- Any copy OUTSIDE curly braces is regular email text.
- Example: "{Visual: Side-by-side comparison showing Standard vs Premium}\\n\\nSmall adjustments make massive differences."

9 TYPES OF VISUALS TO USE:
1. Checklists — showing benefits creatively
2. Icon Graphics — visual benefits, easy skim
3. Feature Diagrams — point to product features
4. Timelines — customer journey, results timing
5. Numbered Lists — "3 Reasons Why..."
6. Comparison Charts — Us vs Them, product tiers
7. Tables — spread info into sections
8. Flowcharts — decision trees, use cases
9. Graphs — visualize statistics

═══════════════════════════════════════════════════
SECTION 4: PRODUCT SECTION
═══════════════════════════════════════════════════
- "product_section": Product highlight with design instructions and benefit bullets.
- Start with {design instruction} in curly braces for layout guidance.
- Then product hierarchy: Name → Benefit description → [CTA]
- Each product gets: Name on its own line, benefit on next line, [CTA LINK] on next line.
- Trust elements clearly marked: "{Trust Badge Bar: Centered}\\n90-Day Risk-Free Trial | Free Returns"
- MUST advance the pitch — never repeat what body_copy already said.
- If body says "silicone grip strips" then product section says "the grip that makes every throw feel like game day"

═══════════════════════════════════════════════════
SECTION 5: CLOSING (subhead + body + final CTA)
═══════════════════════════════════════════════════
- "closing_subhead": Reinforces key benefit. 4-8 words.
- "closing_body": 1-2 sentences that tie everything together emotionally.
- "final_cta": UPPERCASE, 2-4 words, action-oriented.
- NEVER end with back-to-back CTAs. Always include closing copy between product CTA and final CTA.

═══════════════════════════════════════════════════
WRITING RULES (NON-NEGOTIABLE)
═══════════════════════════════════════════════════

SUBJECT LINE RULES:
- 2-5 words maximum, Title Case
- Create curiosity or state benefit — never clickbait
- Styles: Curiosity ("Myth. Busted."), Benefit ("20% Off Everything"), Urgency ("Ends Tonight"), Question ("Still Thinking?"), Personal ("You'll Love This")

PREVIEW TEXT RULES:
- 1 sentence, regular capitalization (not Title Case), ends with "..."
- MUST complement the subject line — never repeat it

CTA RULES:
- UPPERCASE text: "DISCOVER THE JOURNAL" not "discover the journal"
- First-person when possible: "GET MY DISCOUNT" not "GET YOUR DISCOUNT"
- Action verbs: Get, Start, Claim, Discover, Join, Try, Save, Unlock
- NEVER use: Submit, Click Here, Buy Now, Shop Now (too generic)
- 2-3 CTAs total per email (first_cta in hero, optional in product, final_cta in closing)

COPY STYLE RULES:
- NO em dashes (—) or dash separators " - " as clause connectors (reads as AI-generated)
- NO oxford commas. Write: "hockey, boxing and football" NOT "hockey, boxing, and football"
- NO **bold** markdown syntax anywhere. Write plain text. Designer handles formatting.
- NO blocks of text. Short paragraphs, 2-3 sentences max.
- NO repeating features across sections. Each section ADVANCES the pitch.
- NO unnecessary pleasantries ("We hope this email finds you well")
- NO filler words ("really", "very", "just", "actually")
- Write punchy: short sentences, dense information, zero fluff.

${tactics ? `\n\nTACTICS LIBRARY (reference these frameworks):\n${tactics.slice(0, 12000)}` : ""}

═══════════════════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════════════════

Return valid JSON only, no markdown fences. Every field is REQUIRED:

{
  "subject_line": "2-5 Words Title Case",
  "preview_text": "One sentence expanding on subject, ends with...",
  "headline": "Benefit Driven Headline Here",
  "subheadline": "One to two sentences supporting the headline.",
  "first_cta": "BENEFIT DRIVEN CTA",
  "body_copy": "2-4 sentences. Emotional or educational core.\\n\\nSecond paragraph if needed.",
  "bridge_section": "{Visual: Description with all copy/data for designer}\\n\\nOptional supporting text outside braces.",
  "product_section": "{Product Grid: 2-column layout}\\n\\nProduct Name\\nBenefit-focused description\\n[CTA TEXT]",
  "closing_subhead": "Reinforces Key Benefit",
  "closing_body": "1-2 sentences tying everything together.",
  "final_cta": "FINAL ACTION CTA"
}`;
}

// ── Brand context builder ───────────────────────────────────────────

interface BrandPayload {
  name?: string;
  website?: string;
  description?: string;
  voiceTone?: string;
  targetAudience?: string;
  brandPersonality?: string;
  usps?: string[];
  competitors?: string[];
  products?: string[];
  cardinalRules?: string[];
  emailExamples?: string;
}

function buildBrandContext(brand: BrandPayload | undefined): string {
  if (!brand) return "BRAND: Unknown Brand";
  return [
    `BRAND: ${brand.name || "Unknown Brand"}`,
    brand.description ? `DESCRIPTION: ${brand.description}` : "",
    brand.voiceTone ? `VOICE & TONE: ${brand.voiceTone}` : "",
    brand.targetAudience ? `TARGET AUDIENCE: ${brand.targetAudience}` : "",
    brand.brandPersonality ? `BRAND PERSONALITY: ${brand.brandPersonality}` : "",
    brand.usps?.length ? `USPs:\n${brand.usps.map((u) => `- ${u}`).join("\n")}` : "",
    brand.competitors?.length ? `COMPETITORS (never mention): ${brand.competitors.join(", ")}` : "",
    brand.products?.length ? `PRODUCTS: ${brand.products.join(", ")}` : "",
    brand.cardinalRules?.length
      ? `CARDINAL RULES (MUST follow):\n${brand.cardinalRules.map((r) => `- ${r}`).join("\n")}`
      : "",
    brand.emailExamples
      ? `EXAMPLE EMAILS IN BRAND VOICE:\n${brand.emailExamples.slice(0, 2000)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ── Convert structured sections to email-preview HTML for TipTap ────

function sectionsToHtml(result: Record<string, string>, brandWebsite?: string): string {
  const c = (tag: string, content: string, extra = "") =>
    `<${tag} style="text-align: center"${extra}>${content}</${tag}>`;
  const cp = (content: string) => c("p", content);

  const formatCta = (cta: string) => {
    const text = cta.replace(/^\[/, "").replace(/\]$/, "").toUpperCase();
    const url = brandWebsite || "#";
    return cp(`<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`);
  };

  const formatLine = (line: string): string => {
    // {curly brace} design notes → italic
    if (line.startsWith("{") && line.includes("}")) {
      return cp(`<em>${escapeHtml(line)}</em>`);
    }
    // [BRACKET CTA] → linked CTA
    if (/^\[.+\]$/.test(line.trim())) {
      return formatCta(line.trim());
    }
    return cp(escapeHtml(line));
  };

  const formatBlock = (text: string): string => {
    return text
      .split(/\n\n+/)
      .filter(Boolean)
      .map((chunk) => {
        const sublines = chunk.split("\n").filter(Boolean);
        return sublines.map(formatLine).join("\n");
      })
      .join("\n");
  };

  const sections: string[] = [];

  // [LOGO] placeholder
  sections.push(cp("[LOGO]"));
  sections.push("<hr>");

  // Section 1: Hero
  if (result.headline || result.subheadline) {
    if (result.headline) sections.push(c("h1", escapeHtml(result.headline)));
    if (result.subheadline) sections.push(cp(escapeHtml(result.subheadline)));
    if (result.first_cta) sections.push(formatCta(result.first_cta));
    sections.push("<hr>");
  }

  // Section 2: Body Copy
  if (result.body_copy) {
    sections.push(formatBlock(result.body_copy));
    sections.push("<hr>");
  }

  // Section 3: Bridge
  if (result.bridge_section) {
    sections.push(formatBlock(result.bridge_section));
    sections.push("<hr>");
  }

  // Section 4: Product Section
  if (result.product_section) {
    sections.push(formatBlock(result.product_section));
    sections.push("<hr>");
  }

  // Section 5: Closing
  if (result.closing_subhead || result.closing_body) {
    if (result.closing_subhead) sections.push(c("h2", escapeHtml(result.closing_subhead)));
    if (result.closing_body) sections.push(cp(escapeHtml(result.closing_body)));
    if (result.final_cta) sections.push(formatCta(result.final_cta));
  }

  return sections.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Provider: Gemini (FREE) ─────────────────────────────────────────

async function generateWithGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const result = await model.generateContent(userPrompt);
  return result.response.text();
}

// ── Provider: Anthropic (PAID) ──────────────────────────────────────

async function generateWithAnthropic(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: 4096,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

// ── Main handler ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { brand, framework, brief, style, generateOnly } = await req.json();

    // Determine provider
    const provider = process.env.LLM_PROVIDER || "gemini";
    const hasGemini = !!process.env.GEMINI_API_KEY;
    const hasAnthropic =
      !!process.env.ANTHROPIC_API_KEY &&
      process.env.ANTHROPIC_API_KEY !== "your_anthropic_api_key_here" &&
      process.env.ANTHROPIC_API_KEY !== "your-anthropic-key";

    if (!hasGemini && !hasAnthropic) {
      return NextResponse.json({
        subject_line: `[Demo] ${brief?.slice(0, 40) || "Your Campaign"}`,
        preview_text: "See what everyone's been talking about this week...",
        headline: brief?.slice(0, 50) || "Your Headline Here",
        subheadline: `Placeholder copy for ${brand?.name || "Your Brand"}.`,
        first_cta: "SHOP NOW",
        body_copy: "Add GEMINI_API_KEY (free) or ANTHROPIC_API_KEY to enable AI generation.",
        bridge_section: "{Visual: Add API key to generate real copy}",
        product_section: "Configure your API key in Vercel environment variables.",
        closing_subhead: "Get Started",
        closing_body: "Once your API key is set, the Generate button will create copy using your 1,280+ tactics library.",
        final_cta: "GET STARTED",
        body: generatePlaceholderHtml(brand),
        generated: false,
        message: "No LLM configured. Add GEMINI_API_KEY (free) or ANTHROPIC_API_KEY.",
      });
    }

    const tactics = getTactics();
    const systemPrompt = buildSystemPrompt(tactics);
    const brandContext = buildBrandContext(brand);

    const generateOnlyLabel =
      generateOnly === "subject"
        ? "\n\nONLY generate a new subject line. Return JSON with just the 'subject_line' field."
        : generateOnly === "preview"
          ? "\n\nONLY generate new preview text. Return JSON with just the 'preview_text' field."
          : "";

    const userPrompt = `Generate email copy for this campaign:

${brandContext}

FRAMEWORK: ${framework || "Auto-select best framework for the brief"}
STYLE: ${style || "designed"}
BRIEF: ${brief}
${generateOnlyLabel}

Generate the email now. Return the structured JSON with all 11 fields.`;

    // Call the selected provider
    let text: string;
    let usedProvider: string;

    if (provider === "anthropic" && hasAnthropic) {
      text = await generateWithAnthropic(systemPrompt, userPrompt);
      usedProvider = "anthropic";
    } else if (hasGemini) {
      text = await generateWithGemini(systemPrompt, userPrompt);
      usedProvider = "gemini";
    } else if (hasAnthropic) {
      text = await generateWithAnthropic(systemPrompt, userPrompt);
      usedProvider = "anthropic";
    } else {
      throw new Error("No LLM provider available");
    }

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: text },
        { status: 500 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);

    // Build composed HTML body from structured sections for TipTap
    const body = sectionsToHtml(result, brand?.website);

    // Return both structured fields AND composed body for backward compat
    return NextResponse.json({
      ...result,
      // Backward-compatible fields
      subject: result.subject_line,
      preview: result.preview_text,
      body,
      generated: true,
      provider: usedProvider,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// ── Placeholder (no API key) ────────────────────────────────────────

function generatePlaceholderHtml(brand: BrandPayload | undefined): string {
  const brandName = brand?.name || "Your Brand";
  return `<h1>Your Headline Here</h1>
<p>Placeholder copy for <strong>${brandName}</strong>.</p>
<hr/>
<p>Add your API key to enable AI-powered copy generation.</p>
<hr/>
<p><strong>[SHOP NOW]</strong></p>`;
}
