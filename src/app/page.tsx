// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [character, setCharacter] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateTweet() {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence, character }),
    });

    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold">AI Tweet Generator 🐦✨</h1>

      <input
        type="text"
        className="w-full max-w-xl p-2 border rounded"
        placeholder="Enter your sentence"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />

      <input
        type="text"
        className="w-full max-w-xl p-2 border rounded"
        placeholder="Enter a character (e.g., Pirate)"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
      />

      <button
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={generateTweet}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Tweet"}
      </button>

      {output && (
        <div className="w-full max-w-xl p-4 mt-4 text-white bg-black rounded">
          <strong>Result:</strong>
          <p className="mt-2">{output}</p>
        </div>
      )}
    </main>
  );
}
