import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body?.messages ?? [];
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), { status: 500 });
  }

  const openai = new OpenAI({ apiKey });

  // Make the model call
  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7
  });

  const reply = chat.choices?.[0]?.message?.content ?? "…";
  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" }
  });
}
