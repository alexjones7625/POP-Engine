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
  return `You are an elite email copywriter for ecommerce brands. You write high-converting email campaigns using proven copywriting frameworks backed by 1,280+ tested tactics.

CORE RULES:
- Write in the brand's voice and tone EXACTLY — match their personality, word choices, energy level
- Follow the specified framework structure precisely
- Each section must ADVANCE the pitch — NEVER restate same product specs in consecutive sections
- Body section = introduce, Product section = sell benefit, Closing = tie together
- Subject lines: 2-5 words, Title Case, create curiosity or urgency without clickbait
- Preview text: 1 sentence, regular capitalization, end with "...", complement (never repeat) subject line
- CTA buttons: first-person ("Get my..." not "Get your..."), action-oriented, above the fold
- Keep body copy concise — every sentence earns its place
- Skimmable formatting: no blocks of text, bold main points, 2-3 sentence paragraphs max
- Customers spend MAX 3-5 seconds per email — deliver value in seconds

SUBJECT LINE STYLES (use the one that fits the campaign):
1. Curiosity: Open a loop ("Myth. Busted.", "They're Finally Here")
2. Benefit: Lead with value ("20% Off Everything", "Free Shipping Today")
3. Urgency: Time/scarcity ("Ends Tonight", "Almost Gone")
4. Question: Engage ("Still Thinking About It?")
5. Personal: Conversational ("You're Going to Love This")

CTA RULES:
- First-person pattern: "Get my [benefit]" not "Get your [benefit]"
- Action verbs: Get, Start, Claim, Discover, Join, Try, Save, Unlock
- Avoid: Submit, Click Here, Buy Now

ANTI-PATTERNS (never do these):
1. Wall-of-text paragraphs
2. Restating same specs in consecutive sections
3. Generic CTAs like "Shop Now" without context
4. ALL CAPS subject lines
5. Fake urgency
6. Emoji overuse
7. Repeating subject line in preview text

${tactics ? `\n\nTACTICS LIBRARY (reference these frameworks):\n${tactics.slice(0, 15000)}` : ""}

OUTPUT FORMAT — Return valid JSON only, no markdown fences:
{
  "subject": "Subject line here (2-5 words, Title Case)",
  "preview": "Preview text here (1 sentence, ends with ...)",
  "body": "Full HTML email body here with <h1>, <h2>, <p>, <ul>, <li>, <a> tags. Use <strong> for emphasis. Structure: headline, hook, body sections, product highlight, CTA."
}`;
}

// ── Brand context builder ───────────────────────────────────────────

interface BrandPayload {
  name?: string;
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
        subject: `[Demo] ${brief?.slice(0, 40) || "Your Campaign"} — Don't Miss This`,
        preview: "See what everyone's been talking about this week...",
        body: generatePlaceholderCopy(brand, framework, brief, style),
        generated: false,
        message:
          "No LLM configured. Add GEMINI_API_KEY (free) or ANTHROPIC_API_KEY to platform/.env.local",
      });
    }

    const tactics = getTactics();
    const systemPrompt = buildSystemPrompt(tactics);
    const brandContext = buildBrandContext(brand);

    const generateOnlyLabel =
      generateOnly === "subject"
        ? "\n\nONLY generate a new subject line. Return JSON with just the 'subject' field."
        : generateOnly === "preview"
          ? "\n\nONLY generate new preview text. Return JSON with just the 'preview' field."
          : "";

    const userPrompt = `Generate email copy for this campaign:

${brandContext}

FRAMEWORK: ${framework || "Auto-select best framework for the brief"}
STYLE: ${style || "designed"}
BRIEF: ${brief}
${generateOnlyLabel}

Generate the email now. Return JSON only.`;

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
    return NextResponse.json({ ...result, generated: true, provider: usedProvider });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// ── Placeholder (no API key) ────────────────────────────────────────

function generatePlaceholderCopy(
  brand: BrandPayload | undefined,
  framework: string | undefined,
  brief: string | undefined,
  style: string | undefined
): string {
  const brandName = brand?.name || "Your Brand";
  return `<h1>${brief?.slice(0, 50) || "Your Headline Here"}</h1>
<p>This is placeholder copy for <strong>${brandName}</strong>.</p>
<p>Framework: ${framework || "Auto"} | Style: ${style || "designed"}</p>
<hr/>
<h2>Why This Matters</h2>
<p>To generate real AI-powered copy, add your API key to <code>platform/.env.local</code>:</p>
<pre>GEMINI_API_KEY=your-key (free tier)
# or
ANTHROPIC_API_KEY=sk-ant-... (paid)</pre>
<p>Once set, restart the dev server and the Generate button will call the AI with your 1,280+ tactics library.</p>
<p><a href="#">SHOP NOW →</a></p>`;
}
