// app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: { temperature: 0.2, topP: 0.9, maxOutputTokens: 128 },
});

function normalizeSentiment(raw: string): "Positive 🙂" | "Negative 🙁" | "Neutral 😐" {
  const t = raw.toLowerCase();
  if (t.includes("positive")) return "Positive 🙂";
  if (t.includes("negative")) return "Negative 🙁";
  return "Neutral 😐";
}

export async function POST(req: NextRequest) {
  try {
    const { task, input } = await req.json();
    if (!task || !input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "Missing 'task' or 'input'" }, { status: 400 });
    }

    switch (task) {
      case "chat": {
        const prompt = `You are a concise, friendly AI assistant for Hanstrix Technologies (AI/ML consultancy). Keep answers tight and helpful.

User: ${input.trim()}`;
        const r = await model.generateContent(prompt);
        return NextResponse.json({ response: r.response.text() });
      }

      case "sentiment": {
        const prompt = `Analyze the sentiment of this text and respond with ONLY one of:
- Positive 🙂
- Negative 🙁
- Neutral 😐

Text: """${input.trim()}"""`;
        const r = await model.generateContent(prompt);
        const raw = r.response.text().trim();
        return NextResponse.json({ response: normalizeSentiment(raw) });
      }

      default:
        return NextResponse.json({ error: `Unknown task: '${task}'` }, { status: 400 });
    }
  } catch (err) {
    console.error("AI API Error:", err);
    return NextResponse.json({ error: "An error occurred with the AI service." }, { status: 500 });
  }
}
