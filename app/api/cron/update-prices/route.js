import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const ITAD_BASE = "https://api.isthereanydeal.com";

const STORE_MAP = {
  steam: "Steam",
  gog: "GOG",
  epicgames: "Epic Games",
  humblestore: "Humble Store",
};

async function getITADPrices(itadId) {
  try {
    const res = await axios.get(`${ITAD_BASE}/game/prices/v2`, {
      params: { key: ITAD_KEY, id: itadId, country: "ES", shops: "steam,gog,epicgames,humblestore" },
    });
    return res.data?.list?.[0]?.deals || [];
  } catch (err) {
    console.error(`  Error obteniendo precios para ${itadId}:`, err.message);
    return [];
  }
}

async function updateGamePrices(game) {
  console.log(`Actualizando: ${game.title}`);

  if (!game.itad_id) return;

  const deals = await getITADPrices(game.itad_id);

  for (const deal of deals) {
    const storeName = STORE_MAP[deal.shop?.id] || deal.shop?.name;
    if (!storeName) continue;

    const priceData = {
      game_id: game.id,
      store_name: storeName,
      store_url: deal.url,
      price: deal.price?.amount,
      original_price: deal.regular?.amount,
      discount_percent: deal.cut,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("game_prices")
      .upsert(priceData, { onConflict: "game_id,store_name" });

    if (error) console.error(`  Error guardando precio ${storeName}:`, error.message);
  }

  if (deals.length > 0) {
    const history = deals.map(deal => ({
      game_id: game.id,
      store_name: STORE_MAP[deal.shop?.id] || deal.shop?.name,
      price: deal.price?.amount,
      recorded_at: new Date().toISOString(),
    })).filter(h => h.store_name && h.price);

    await supabase.from("price_history").insert(history);
  }
}

async function checkWishlistAlerts() {
  const { data: wishlists } = await supabase
    .from("wishlists")
    .select(`*, games(title), user_profiles(id)`)
    .eq("notified", false)
    .not("target_price", "is", null);

  if (!wishlists?.length) return;

  for (const wish of wishlists) {
    const { data: prices } = await supabase
      .from("game_prices")
      .select("price, store_name")
      .eq("game_id", wish.game_id)
      .not("price", "is", null)
      .order("price", { ascending: true })
      .limit(1);

    const bestPrice = prices?.[0]?.price;
    if (bestPrice && bestPrice <= wish.target_price) {
      await supabase.from("wishlists").update({ notified: true }).eq("user_id", wish.user_id).eq("game_id", wish.game_id);
    }
  }
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
  const ITAD_KEY = process.env.ITAD_API_KEY;

  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("id, title, itad_id")
      .eq("platform", "PC")
      .not("itad_id", "is", null);

    if (error) throw error;

    for (let i = 0; i < games.length; i += 5) {
      const batch = games.slice(i, i + 5);
      await Promise.all(batch.map(updateGamePrices));
      if (i + 5 < games.length) await new Promise(r => setTimeout(r, 1000));
    }

    await checkWishlistAlerts();

    return Response.json({ success: true, gamesUpdated: games.length, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("Error crítico:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
