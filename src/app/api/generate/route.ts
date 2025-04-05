// File: src/app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";

// === Rate limiting setup ===
const RATE_LIMIT = 5; // max 5 requests
const WINDOW_MS = 60 * 1000; // per 1 minute
const ipRequestMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // Initialize array if IP not present
    if (!ipRequestMap.has(ip)) ipRequestMap.set(ip, []);

    const timestamps = ipRequestMap.get(ip)!;
    // Filter timestamps within window
    const recentRequests = timestamps.filter((ts) => now - ts < WINDOW_MS);
    ipRequestMap.set(ip, [...recentRequests, now]);

    if (recentRequests.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { sentence, character } = await req.json();
    if (!sentence || !character) {
      return NextResponse.json(
        { error: "Missing sentence or character in request body" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a character transformer. Rewrite the given sentence in the style of a character. Character: ${character}. Keep it fun and limited to 280 characters.`;

    const azureApiKey = process.env.AZURE_AI_API_KEY;
    const azureEndpoint = process.env.AZURE_AI_ENDPOINT;
    const azureModel = process.env.AZURE_MODEL_NAME;

    if (!azureApiKey || !azureEndpoint || !azureModel) {
      return NextResponse.json(
        { error: "Azure configuration missing in environment variables." },
        { status: 500 }
      );
    }

    const azureRes = await fetch(azureEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": azureApiKey,
        "x-ms-model-mesh-model-name": azureModel,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: sentence },
        ],
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    if (!azureRes.ok) {
      const err = await azureRes.text();
      console.error("Azure Error:", err);
      return NextResponse.json(
        { error: "Failed to fetch response from Azure AI." },
        { status: 500 }
      );
    }

    const data = await azureRes.json();
    const tweet = data?.choices?.[0]?.message?.content?.trim();

    console.log(
      `[${new Date().toISOString()}] | IP: ${ip} | Char: ${character} | Input: ${sentence} | Output: ${tweet}`
    );

    return NextResponse.json({ tweet });
  } catch (error: string | unknown) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
