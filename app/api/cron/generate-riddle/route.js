import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const CATEGORIES = [
  "classic console games from the 80s and 90s",
  "modern PC and console games",
  "iconic video game characters",
  "game mechanics and genres",
  "gaming history and milestones",
];

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const today = new Date().toISOString().split("T")[0];

  const { data: existing } = await supabase
    .from("daily_riddles")
    .select("id")
    .eq("date", today)
    .single();

  if (existing) {
    return Response.json({ success: true, message: "Already generated", date: today });
  }

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

  const generated = JSON.parse(msg.content[0].text.trim());
  const { error } = await supabase.from("daily_riddles").insert({ date: today, ...generated });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true, date: today, preview: generated.riddle.substring(0, 60) + "..." });
}
