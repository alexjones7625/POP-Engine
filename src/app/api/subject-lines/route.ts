import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { brand, brief, style, currentSubject } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        lines: [
          { text: `${brief?.slice(0, 30) || "Your Subject"} — Demo`, style },
          { text: "Add GEMINI_API_KEY for real generation", style },
        ],
        generated: false,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { temperature: 0.9, maxOutputTokens: 1024 },
    });

    const brandContext = brand
      ? `Brand: ${brand.name}${brand.voiceTone ? ` | Voice: ${brand.voiceTone}` : ""}${brand.targetAudience ? ` | Audience: ${brand.targetAudience}` : ""}`
      : "Brand: Unknown";

    const prompt = `Generate 5 email subject lines for this campaign.

${brandContext}
Brief: ${brief}
${currentSubject ? `Current subject line: "${currentSubject}" (generate alternatives)` : ""}

STYLE: "${style}" — This is the required style. Follow it exactly.

Style definitions:
- Announcement: Straightforward news/update ("Introducing Our New Line")
- Benefit: Lead with value ("20% Off Everything")
- Cliffhanger: Open a loop ("What Happened Next...")
- Controversial: Challenge assumptions ("Stop Buying Protein Powder")
- How-To: Promise knowledge ("How To Wake Up Energized")
- Intrigue: Pure curiosity ("Myth. Busted.")
- Listicle: Number-based ("3 Things You Don't Know")
- Oppositional: Contrast/before-after ("What We Were vs Now")
- Personal: Friend texting ("You're Going to Love This")
- Question: Engaging question ("Still Thinking About It?")
- Short: 2-3 words max ("They're Back")
- Social Proof: Others' actions ("Join 10,000+ Customers")
- Statistic: Surprising number ("87% See Results in 7 Days")
- Unconventional: Break pattern ("re: your cart (it misses you)")
- Urgency: Time/scarcity ("Ends Tonight")

RULES:
- 2-5 words maximum per subject line
- Title Case
- NO emojis unless the brief specifically requests them
- Each line must be unique and different from the others
- Match the brand's voice

Return a JSON array of 5 strings, nothing else:
["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse response", raw: text }, { status: 500 });
    }

    const lines: string[] = JSON.parse(jsonMatch[0]);
    return NextResponse.json({
      lines: lines.map((text) => ({ text, style })),
      generated: true,
    });
  } catch (error) {
    console.error("Subject line error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
