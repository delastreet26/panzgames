import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import Anthropic from "@anthropic-ai/sdk";
import { getGameOfDayByDate } from "@/scripts/games-catalog.js";

let igdbToken = null;
async function getIGDBToken() {
  if (igdbToken) return igdbToken;
  const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: process.env.IGDB_CLIENT_ID,
      client_secret: process.env.IGDB_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  });
  igdbToken = res.data.access_token;
  return igdbToken;
}

async function fetchIGDBData(igdbId) {
  if (!igdbId) return null;
  try {
    const token = await getIGDBToken();
    const res = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields name,summary,rating,first_release_date,genres.name,involved_companies.company.name,cover.url,screenshots.url;
       where id = ${igdbId};`,
      {
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      }
    );
    return res.data?.[0] || null;
  } catch (err) {
    console.error("Error IGDB:", err.message);
    return null;
  }
}

async function generateCuriosities(game, igdbData) {
  try {
    const prompt = `Eres un experto en videojuegos escribiendo para una web española de gaming llamada PanZGames.

Genera 4 curiosidades interesantes, sorprendentes o poco conocidas sobre el videojuego "${game.title}" (${game.platform}, ${game.year}).
${igdbData?.summary ? `Descripción oficial: ${igdbData.summary}` : ""}
${game.developer ? `Desarrollador: ${game.developer}` : ""}

Requisitos:
- Cada curiosidad debe ser un hecho REAL y verificable
- Máximo 2 frases por curiosidad
- Tono dinámico y emocionante, como si hablaras con un amigo gamer
- En español
- Variedad: desarrollo del juego, records, datos de ventas, mecánicas únicas, anécdotas de creación

Responde SOLO con un JSON válido así (sin markdown, sin texto extra):
{"curiosities": ["curiosidad 1", "curiosidad 2", "curiosidad 3", "curiosidad 4"], "short_description": "descripción de 2-3 frases del juego en español"}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error generando curiosidades:", err.message);
    return {
      curiosities: game.curiosities || ["Información no disponible temporalmente."],
      short_description: igdbData?.summary || "Un clásico que merece estar en tu colección.",
    };
  }
}

async function upsertGameToDB(game) {
  const slug = game.title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  const { data, error } = await supabase
    .from("games")
    .upsert({
      title: game.title,
      slug,
      platform: game.platform,
      year: game.year,
      genre: game.genre,
      developer: game.developer,
      is_retro: game.platform !== "PC",
      itad_id: game.itad_id || null,
      igdb_id: game.igdb_id || null,
      metacritic_score: game.metacritic || null,
      ebay_search_url: game.ebay_url || null,
      wallapop_search_url: game.wallapop_url || null,
    }, { onConflict: "slug" })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  try {
    const { data: existing } = await supabase
      .from("game_of_day")
      .select("id")
      .eq("date", todayStr)
      .single();

    if (existing) {
      return Response.json({ success: true, message: "Ya actualizado", date: todayStr });
    }

    const selectedGame = getGameOfDayByDate(today);
    const igdbData = await fetchIGDBData(selectedGame.igdb_id);
    const aiContent = await generateCuriosities(selectedGame, igdbData);
    const gameId = await upsertGameToDB(selectedGame);

    if (igdbData?.cover?.url) {
      const coverUrl = igdbData.cover.url.replace("t_thumb", "t_cover_big");
      await supabase.from("games").update({ cover_url: `https:${coverUrl}` }).eq("id", gameId);
    }

    const { error: insertError } = await supabase.from("game_of_day").insert({
      game_id: gameId,
      date: todayStr,
      ai_description: aiContent.short_description,
      curiosities: aiContent.curiosities,
    });

    if (insertError) throw insertError;

    return Response.json({
      success: true,
      game: selectedGame.title,
      platform: selectedGame.platform,
      curiosities: aiContent.curiosities.length,
      date: todayStr,
    });
  } catch (err) {
    console.error("Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
