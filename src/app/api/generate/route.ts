// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

const endpoint = process.env.AZURE_AI_ENDPOINT!;
const apiKey = process.env.AZURE_AI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { sentence, character } = await req.json();

    if (!sentence || !character) {
      return NextResponse.json(
        { error: "Missing sentence or character" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a master impersonator. Re-write any sentence in the speaking style and tone of the given character, keeping it tweet-friendly (max 280 characters). Read the sentence carefully and make sure to use the character's unique style. Read the sentence and identify the emotion and rewrite with the same emotion and use appropriate emojies`;

    const userPrompt = `Sentence: "${sentence}"\nCharacter: ${character}`;

    const aiRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_AI_API_KEY!,
        "x-ms-model-mesh-model-name": "deepseek-v3",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 200,
        temperature: 0.8,
        top_p: 0.95,
      }),
    });

    const data = await aiRes.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json(
        { error: "No result from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
