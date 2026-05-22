import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const CATEGORIES = [
  "classic console games from the 80s and 90s",
  "modern PC and console games",
  "iconic video game characters",
  "game mechanics and genres",
  "gaming history and milestones",
];

async function generateRiddle() {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const category = CATEGORIES[new Date().getDay() % CATEGORIES.length];

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    messages: [{
      role: "user",
      content: `Create an original, creative riddle about video games for an Australian gaming website. Topic: ${category}.

Rules:
- Must be ORIGINAL — not a known or existing riddle
- Single, clear answer (a game title, character name, or well-known gaming term)
- 2–4 sentences, clever but fair for a gaming fan
- Include a short hint that helps without giving it away

Respond ONLY with valid JSON, no markdown, no extra text:
{"riddle": "...", "answer": "...", "hint": "...", "difficulty": "easy|medium|hard", "category": "${category}"}`
    }],
  });

  return JSON.parse(msg.content[0].text.trim());
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("daily_riddles")
    .select("id, riddle, hint, difficulty, category")
    .eq("date", today)
    .single();

  if (data) return Response.json(data);

  // Cron hasn't run yet — generate on the fly
  const generated = await generateRiddle();
  const { data: inserted, error } = await supabase
    .from("daily_riddles")
    .insert({ date: today, ...generated })
    .select("id, riddle, hint, difficulty, category")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(inserted);
}

export async function POST(request) {
  const { riddleId, answer } = await request.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data } = await supabase
    .from("daily_riddles")
    .select("answer")
    .eq("id", riddleId)
    .single();

  if (!data) return Response.json({ error: "Riddle not found" }, { status: 404 });

  const correct = data.answer.toLowerCase().trim() === answer.toLowerCase().trim();
  return Response.json({ correct, answer: correct ? data.answer : null });
}
