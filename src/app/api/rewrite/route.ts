import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { selectedText, instruction, brand, fullContext } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        rewritten: selectedText,
        generated: false,
        message: "Add GEMINI_API_KEY for AI rewriting",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    });

    const brandContext = brand
      ? [
          `Brand: ${brand.name}`,
          brand.voiceTone ? `Voice: ${brand.voiceTone}` : "",
          brand.brandPersonality ? `Personality: ${brand.brandPersonality}` : "",
          brand.cardinalRules?.length
            ? `Rules: ${brand.cardinalRules.join("; ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

    const prompt = `You are an elite email copywriter. Rewrite the selected text based on the instruction.

${brandContext ? `BRAND CONTEXT:\n${brandContext}\n` : ""}
${fullContext ? `FULL EMAIL CONTEXT (for reference, do NOT rewrite this):\n${fullContext.slice(0, 2000)}\n` : ""}
SELECTED TEXT TO REWRITE:
"""
${selectedText}
"""

INSTRUCTION: ${instruction}

RULES:
- Only rewrite the selected text
- Keep the same general meaning unless the instruction says otherwise
- Match the brand's voice and tone
- Keep it concise — every word earns its place
- Return ONLY the rewritten text, no explanations or quotes`;

    const result = await model.generateContent(prompt);
    const rewritten = result.response.text().trim();

    return NextResponse.json({ rewritten, generated: true });
  } catch (error) {
    console.error("Rewrite error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
