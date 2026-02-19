import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: "Add GEMINI_API_KEY to enable brand research",
        generated: false,
      });
    }

    // Fetch the website content
    let pageContent: string;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(10000),
      });
      const html = await response.text();
      // Strip HTML tags, scripts, styles for a text-only version
      pageContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 8000);
    } catch {
      pageContent = `Could not fetch ${url}. Analyze based on the URL alone.`;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
    });

    const prompt = `Analyze this brand's website and extract a comprehensive brand profile. Return JSON only.

URL: ${url}

WEBSITE CONTENT:
${pageContent}

Extract and return this exact JSON structure:
{
  "name": "Brand name",
  "description": "2-3 sentence brand description — what they sell, who they serve",
  "voiceTone": "Describe the brand's voice in 3-5 adjectives (e.g. 'Witty, casual, confident')",
  "targetAudience": "Who is their ideal customer? Age, interests, demographics",
  "brandPersonality": "If this brand was a person, how would they talk? 1-2 sentences",
  "usps": ["USP 1", "USP 2", "USP 3"],
  "products": ["Product 1", "Product 2", "Product 3"],
  "competitors": ["Competitor 1", "Competitor 2"]
}

Be specific and useful. Don't be generic. Pull actual product names from the site.
Return JSON only, no markdown fences.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse brand research", raw: text },
        { status: 500 }
      );
    }

    const profile = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ ...profile, generated: true, url });
  } catch (error) {
    console.error("Brand research error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
