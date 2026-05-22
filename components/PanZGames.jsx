"use client";

import { useState, useMemo } from "react";

const MODERN_GAMES = [
  { id: 1, title: "Elden Ring", platform: "PC", genre: "RPG", year: 2022, metacritic: 96, rating: 9.4, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 24.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 22.50, color: "#00c2a8", logo: "EN" }, { store: "Kinguin", price: 21.99, color: "#e53935", logo: "KG" }] },
  { id: 2, title: "Cyberpunk 2077", platform: "PC", genre: "RPG", year: 2020, metacritic: 86, rating: 8.9, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 17.50, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 16.90, color: "#00c2a8", logo: "EN" }, { store: "GOG", price: 49.99, color: "#9c27b0", logo: "G" }, { store: "Kinguin", price: 15.99, color: "#e53935", logo: "KG" }] },
  { id: 3, title: "Red Dead Redemption 2", platform: "PC", genre: "Acción", year: 2019, metacritic: 97, rating: 9.7, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 14.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 13.50, color: "#00c2a8", logo: "EN" }, { store: "Kinguin", price: 12.99, color: "#e53935", logo: "KG" }] },
  { id: 4, title: "Baldur's Gate 3", platform: "PC", genre: "RPG", year: 2023, metacritic: 96, rating: 9.6, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 38.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 36.50, color: "#00c2a8", logo: "EN" }] },
  { id: 5, title: "God of War", platform: "PC", genre: "Acción", year: 2022, metacritic: 94, rating: 9.5, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg", prices: [{ store: "Steam", price: 49.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 19.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 18.50, color: "#00c2a8", logo: "EN" }] },
  { id: 6, title: "Helldivers 2", platform: "PC", genre: "Shooter", year: 2024, metacritic: 82, rating: 8.8, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg", prices: [{ store: "Steam", price: 39.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 22.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 21.50, color: "#00c2a8", logo: "EN" }] },
];

const RETRO_GAMES = [
  { id: 101, title: "Golden Sun", platform: "GBA", genre: "RPG", year: 2001, metacritic: 91, rating: 9.1, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg", estimated_price: "25-45€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=golden+sun+gba", wallapop_url: "https://es.wallapop.com/app/search?keywords=golden+sun+gba" },
  { id: 102, title: "Chrono Trigger", platform: "SNES", genre: "RPG", year: 1995, metacritic: 99, rating: 9.9, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Chrono_Trigger.jpg", estimated_price: "80-180€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=chrono+trigger+snes", wallapop_url: "https://es.wallapop.com/app/search?keywords=chrono+trigger+snes" },
  { id: 103, title: "Final Fantasy VII", platform: "PS1", genre: "RPG", year: 1997, metacritic: 92, rating: 9.2, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/c/ce/FF7boxart.jpg", estimated_price: "15-35€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=final+fantasy+vii+ps1", wallapop_url: "https://es.wallapop.com/app/search?keywords=final+fantasy+7+psx" },
  { id: 104, title: "Zelda: Ocarina of Time", platform: "N64", genre: "Aventura", year: 1998, metacritic: 99, rating: 9.9, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_time.jpg", estimated_price: "25-60€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=zelda+ocarina+of+time+n64", wallapop_url: "https://es.wallapop.com/app/search?keywords=zelda+ocarina+n64" },
  { id: 105, title: "Super Metroid", platform: "SNES", genre: "Metroidvania", year: 1994, metacritic: 96, rating: 9.6, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/e/e4/Supermetroid.jpg", estimated_price: "60-130€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=super+metroid+snes", wallapop_url: "https://es.wallapop.com/app/search?keywords=super+metroid+snes" },
  { id: 106, title: "Metal Gear Solid", platform: "PS1", genre: "Sigilo", year: 1998, metacritic: 94, rating: 9.4, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/0/05/Metal_Gear_Solid_cover_art.png", estimated_price: "15-30€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=metal+gear+solid+ps1", wallapop_url: "https://es.wallapop.com/app/search?keywords=metal+gear+solid+psx" },
  { id: 107, title: "Pokémon FireRed", platform: "GBA", genre: "RPG", year: 2004, metacritic: 82, rating: 8.5, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/8/8f/Pokemon_FireRed_box.jpg", estimated_price: "30-60€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=pokemon+firered+gba", wallapop_url: "https://es.wallapop.com/app/search?keywords=pokemon+firered+gba" },
  { id: 108, title: "GoldenEye 007", platform: "N64", genre: "FPS", year: 1997, metacritic: 96, rating: 9.3, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/3/33/GoldenEye007boxart.jpg", estimated_price: "20-50€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=goldeneye+007+n64", wallapop_url: "https://es.wallapop.com/app/search?keywords=goldeneye+n64" },
];

const PLATFORMS = ["Todas", "GBA", "SNES", "PS1", "N64", "Mega Drive", "Game Boy"];
const PLATFORM_COLORS = { GBA: "#8B0000", SNES: "#6B3FA0", PS1: "#003087", N64: "#E60012", "Mega Drive": "#1a1a5e", "Game Boy": "#5c6b3a" };

const GAME_OF_DAY = {
  title: "Golden Sun", platform: "GBA", year: 2001, metacritic: 91,
  cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg",
  ai_description: "Una épica aventura de rol que revolucionó los RPGs en Game Boy Advance con su sistema de magia Psynergy y su profunda narrativa.",
  curiosities: [
    "Creado por el mismo equipo que desarrolló Mario Golf y Mario Tennis para Game Boy Color.",
    "El sistema de Psynergy tiene más de 70 hechizos basados en los 4 elementos clásicos.",
    "Se vendieron más de 2 millones de copias solo en Europa y América del Norte.",
    "La banda sonora fue compuesta por Motoi Sakuraba, conocido también por las sagas Dark Souls y Star Ocean."
  ]
};

const MOCK_COMMENTS = [
  { id: 1, username: "RetroGamer92", avatar: "RG", xp_level: 7, content: "Golden Sun es una OBRA MAESTRA. Lo jugué de pequeño y sigue siendo increíble.", time: "hace 2 horas" },
  { id: 2, username: "PixelKnight", avatar: "PK", xp_level: 3, content: "El sistema de Djinn es de lo más original que he visto en un RPG.", time: "hace 5 horas" },
  { id: 3, username: "NostalgiaGaming", avatar: "NG", xp_level: 12, content: "Lo encontré en eBay por 28€. Vale completamente la pena.", time: "hace 8 horas" },
];

const PERIPHERALS = [
  { name: "Logitech G Pro X Superlight 2", category: "Ratón", price: 149.99, rating: 4.8, tag: "Top Pick", icon: "🖱️", aff: "#" },
  { name: "SteelSeries Apex Pro TKL", category: "Teclado", price: 199.99, rating: 4.7, tag: "Mejor Switch", icon: "⌨️", aff: "#" },
  { name: "HyperX Cloud Alpha", category: "Auriculares", price: 89.99, rating: 4.6, tag: "Mejor Calidad/Precio", icon: "🎧", aff: "#" },
  { name: "LG 27GP850-B 27\"", category: "Monitor", price: 299.99, rating: 4.7, tag: "144Hz IPS", icon: "🖥️", aff: "#" },
];

const PC_BUILDS = [
  { name: "Build Básica", budget: "500€", target: "1080p / 60fps", color: "#00c2a8", parts: [{ p: "CPU", n: "Ryzen 5 5600", v: "119€" }, { p: "GPU", n: "RX 6650 XT", v: "189€" }, { p: "RAM", n: "16GB DDR4", v: "39€" }, { p: "SSD", n: "500GB NVMe", v: "45€" }, { p: "Placa", n: "B550M DS3H", v: "79€" }, { p: "Fuente", n: "650W Bronze", v: "59€" }] },
  { name: "Build Gaming", budget: "900€", target: "1080p / 144fps", color: "#7c3aed", parts: [{ p: "CPU", n: "Ryzen 5 7600X", v: "199€" }, { p: "GPU", n: "RTX 4070", v: "549€" }, { p: "RAM", n: "32GB DDR5", v: "89€" }, { p: "SSD", n: "1TB NVMe Gen4", v: "79€" }, { p: "Placa", n: "B650 Elite", v: "149€" }, { p: "Fuente", n: "750W Gold", v: "89€" }] },
  { name: "Build Ultra", budget: "1800€", target: "4K / 60fps+", color: "#f59e0b", parts: [{ p: "CPU", n: "i7-14700K", v: "329€" }, { p: "GPU", n: "RTX 4080 Super", v: "999€" }, { p: "RAM", n: "32GB DDR5 6000", v: "109€" }, { p: "SSD", n: "2TB NVMe Gen4", v: "139€" }, { p: "Placa", n: "Z790 Hero", v: "279€" }, { p: "Fuente", n: "1000W Platinum", v: "149€" }] },
];

function getBest(prices) { const a = prices.filter(p => p.price != null); return a.length ? Math.min(...a.map(p => p.price)) : null; }
function getSteam(prices) { const s = prices.find(p => p.store === "Steam"); return s?.price ?? null; }
function getDisc(prices) { const b = getBest(prices), s = getSteam(prices); return (b && s && b !== s) ? Math.round(((s - b) / s) * 100) : null; }
function sortedPrices(prices) { return [...prices].sort((a, b) => { if (a.price == null) return 1; if (b.price == null) return -1; return a.price - b.price; }); }

export default function PanZGames() {
  const [tab, setTab] = useState("juegos");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [platform, setPlatform] = useState("Todas");
  const [selGame, setSelGame] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [loggedIn, setLoggedIn] = useState(false);

  const genres = useMemo(() => ["Todos", ...new Set(MODERN_GAMES.map(g => g.genre))], []);
  const filteredModern = useMemo(() => MODERN_GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()) && (genre === "Todos" || g.genre === genre)), [search, genre]);
  const filteredRetro = useMemo(() => RETRO_GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()) && (platform === "Todas" || g.platform === platform)), [search, platform]);

  const handleComment = () => {
    if (!comment.trim()) return;
    if (!loggedIn) { alert("Inicia sesión para comentar"); return; }
    setComments(prev => [{ id: Date.now(), username: "Tú", avatar: "TU", xp_level: 1, content: comment, time: "ahora mismo" }, ...prev]);
    setComment("");
  };

  const today = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo"><div className="dot" />PanZ<em>Games</em></div>
        <div className="nav-links">
          {[["juegos", "🎮 Juegos PC"], ["retro", "🕹️ Retro"], ["perifericos", "🖱️ Periféricos"], ["builds", "🖥️ Builds PC"]].map(([id, label]) => (
            <button key={id} className={`nb${tab === id ? " on" : ""}`} onClick={() => { setTab(id); setSelGame(null); }}>{label}</button>
          ))}
        </div>
        <div className="srch-w">
          <span className="srch-ic">🔍</span>
          <input className="srch" placeholder="Buscar juego..." value={search} onChange={e => { setSearch(e.target.value); setTab(e.target.value ? "juegos" : tab); }} />
        </div>
        <button className="user-btn" onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "👤 Mi Perfil" : "Iniciar Sesión"}</button>
      </nav>

      {tab === "juegos" && (
        <>
          <div className="hero">
            <h1>Compara precios.<br /><em>Ahorra en cada juego.</em></h1>
            <p>Precios actualizados diariamente desde Steam, Instant Gaming, Eneba, GOG y más.</p>
            <div className="stats">
              <div><div className="stat-n">30+</div><div className="stat-l">Tiendas comparadas</div></div>
              <div><div className="stat-n">hasta 80%</div><div className="stat-l">de ahorro</div></div>
              <div><div className="stat-n">10.000+</div><div className="stat-l">Juegos indexados</div></div>
              <div><div className="stat-n">Gratis</div><div className="stat-l">Sin registro obligatorio</div></div>
            </div>
          </div>
          <div className="sec">
            {selGame && (
              <div className="cp">
                <div className="cp-h">
                  <img className="cp-img" src={selGame.cover} alt={selGame.title} style={{ height: 94 }} onError={e => e.target.style.display = "none"} />
                  <div className="cp-m">
                    <div className="cp-t">{selGame.title}</div>
                    <div className="cp-b">
                      <span className="bdg bdg-g">{selGame.genre}</span>
                      <span className="bdg bdg-m">Metacritic: {selGame.metacritic}</span>
                    </div>
                    <div className="cp-sub">
                      Mejor precio: <strong style={{ color: "#00c2a8", fontFamily: "Rajdhani,sans-serif", fontSize: "1.05rem" }}>{getBest(selGame.prices)?.toFixed(2)}€</strong>
                      {getDisc(selGame.prices) && <span style={{ marginLeft: 8, color: "#f59e0b", fontSize: ".8rem" }}>({getDisc(selGame.prices)}% vs Steam)</span>}
                    </div>
                  </div>
                  <button className="cl" onClick={() => setSelGame(null)}>✕</button>
                </div>
                <div className="pl">
                  {sortedPrices(selGame.prices).map((store, i) => {
                    const isBest = store.price === getBest(selGame.prices);
                    const steam = getSteam(selGame.prices);
                    const sav = store.price && steam && store.store !== "Steam" ? Math.round(((steam - store.price) / steam) * 100) : null;
                    return (
                      <div key={i} className={`pr${isBest ? " best" : ""}`}>
                        <div className="sl" style={{ background: store.color }}>{store.logo}</div>
                        <div className="sn">{store.store}{isBest && <span className="bst">MEJOR</span>}</div>
                        {store.price != null ? <span className={`sp${isBest ? " best" : ""}`}>{store.price.toFixed(2)}€</span> : <span className="sun">No disponible</span>}
                        {sav > 0 && <span className="ss">-{sav}%</span>}
                        {store.price != null && <a href="#" className="bb">Comprar →</a>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="sec-h"><div className="sec-t">🔥 Mejores ofertas</div><div className="sec-l" /></div>
            <div className="fb">{genres.map(g => <button key={g} className={`ff${genre === g ? " on" : ""}`} onClick={() => setGenre(g)}>{g}</button>)}</div>
            {filteredModern.length === 0 ? <div className="no-r">Sin resultados</div> : (
              <div className="grid">
                {filteredModern.map(game => {
                  const b = getBest(game.prices), s = getSteam(game.prices), d = getDisc(game.prices);
                  return (
                    <div key={game.id} className={`gc${selGame?.id === game.id ? " sel" : ""}`} onClick={() => setSelGame(selGame?.id === game.id ? null : game)}>
                      <img src={game.cover} alt={game.title} onError={e => { e.target.style.display = "none"; }} />
                      <div className="gi">
                        <div className="gt">{game.title}</div>
                        <div className="gm"><span className="gg">{game.genre}</span><span className="gr">★ {game.rating}</span></div>
                        <div className="gp-row">
                          <div><div className="gbp">{b?.toFixed(2)}€</div>{s && b !== s && <div className="gop">{s.toFixed(2)}€</div>}</div>
                          {d && <span className="gd">-{d}%</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {tab === "retro" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">⭐ Juego del Día</div><div className="sec-l" /></div>
          <div className="god-card">
            <div className="god-banner">
              <span style={{ fontSize: "1rem" }}>🎮</span>
              <span className="god-label">Juego del Día</span>
              <span className="god-date">{today}</span>
            </div>
            <div className="god-body">
              <img className="god-img" src={GAME_OF_DAY.cover} alt={GAME_OF_DAY.title} onError={e => e.target.style.display = "none"} />
              <div className="god-info">
                <div className="god-title">{GAME_OF_DAY.title}</div>
                <div className="god-meta">
                  <span className="bdg bdg-g">{GAME_OF_DAY.platform} · {GAME_OF_DAY.year}</span>
                  <span className="bdg bdg-m">Metacritic: {GAME_OF_DAY.metacritic}</span>
                </div>
                <div className="god-desc">{GAME_OF_DAY.ai_description}</div>
                <div className="cur-list">
                  {GAME_OF_DAY.curiosities.map((c, i) => (
                    <div key={i} className="cur-item"><span className="cur-num">{i + 1}.</span><span>{c}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="god-footer">
              <span className="god-f-txt">¿Lo tienes en tu colección? Comenta abajo 👇</span>
              <div style={{ display: "flex", gap: 6 }}>
                <a href={RETRO_GAMES[0].ebay_url} target="_blank" rel="noopener" className="god-ebay">Ver en eBay →</a>
                <a href={RETRO_GAMES[0].wallapop_url} target="_blank" rel="noopener" className="god-ebay">Ver en Wallapop →</a>
              </div>
            </div>
            <div className="comm-sec">
              <div className="comm-h">💬 Comentarios ({comments.length})</div>
              <div className="comm-list">
                {comments.map(c => (
                  <div key={c.id} className="comm">
                    <div className="av">{c.avatar}</div>
                    <div className="comm-body">
                      <div className="comm-user">{c.username}<span className="lvl">Nv.{c.xp_level}</span></div>
                      <div className="comm-txt">{c.content}</div>
                      <div className="comm-time">{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              {loggedIn ? (
                <div className="comm-input-row">
                  <input className="comm-input" placeholder="Escribe un comentario..." value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && handleComment()} />
                  <button className="comm-send" onClick={handleComment}>Enviar →</button>
                </div>
              ) : (
                <div className="login-hint">
                  <button className="user-btn" onClick={() => setLoggedIn(true)} style={{ margin: "0 auto" }}>Inicia sesión para comentar</button>
                </div>
              )}
            </div>
          </div>
          <div className="sec-h" style={{ marginTop: "1.5rem" }}><div className="sec-t">🕹️ Catálogo Retro</div><div className="sec-l" /></div>
          <div className="fb">
            {PLATFORMS.map(p => (
              <button key={p} className={`ff${platform === p ? " on" : ""}`} onClick={() => setPlatform(p)} style={platform === p && PLATFORM_COLORS[p] ? { background: `${PLATFORM_COLORS[p]}22`, borderColor: `${PLATFORM_COLORS[p]}55`, color: PLATFORM_COLORS[p] } : {}}>
                {p}
              </button>
            ))}
          </div>
          {filteredRetro.length === 0 ? <div className="no-r">Sin resultados</div> : (
            <div className="grid">
              {filteredRetro.map(game => (
                <div key={game.id} className="gc rc">
                  <img src={game.cover} alt={game.title} onError={e => { e.target.style.background = "#1a2030"; e.target.style.display = "none"; }} />
                  <div className="gi">
                    <div className="gt">{game.title}</div>
                    <div className="gm">
                      <span className="retro-plat" style={{ background: `${PLATFORM_COLORS[game.platform] ?? "#333"}33`, color: PLATFORM_COLORS[game.platform] ?? "#aaa", border: `1px solid ${PLATFORM_COLORS[game.platform] ?? "#333"}55` }}>{game.platform}</span>
                      <span className="gr">★ {game.rating}</span>
                    </div>
                    <div className="gp-row" style={{ marginTop: 6 }}>
                      <span className="rc-price">{game.estimated_price}</span>
                      <span style={{ fontSize: ".68rem", color: "#334155" }}>{game.year}</span>
                    </div>
                    <div className="rc-ebay">
                      <a href={game.ebay_url} target="_blank" rel="noopener">eBay →</a>
                      <a href={game.wallapop_url} target="_blank" rel="noopener">Wallapop →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "perifericos" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🖱️ Periféricos Gaming Recomendados</div><div className="sec-l" /></div>
          <div className="pgrid">
            {PERIPHERALS.map((p, i) => (
              <div key={i} className="pc">
                <div className="pc-icon">{p.icon}</div>
                <div className="pc-cat">{p.category}</div>
                <div className="pc-name">{p.name}</div>
                <div className="pc-bot">
                  <div><div className="pc-price">{p.price.toFixed(2)}€</div><div style={{ fontSize: ".7rem", color: "#f59e0b", marginTop: 2 }}>★ {p.rating} / 5</div></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    <span className="pc-tag">{p.tag}</span>
                    <a href={p.aff} className="ab">Amazon →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,.02)", borderRadius: 7, border: "1px solid rgba(255,255,255,.04)", fontSize: ".75rem", color: "#1e293b" }}>
            * Links de afiliado — comprando a través de PanZGames nos apoyas sin coste adicional para ti.
          </div>
        </div>
      )}

      {tab === "builds" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🖥️ Builds PC Gaming Recomendadas</div><div className="sec-l" /></div>
          <div className="bgrid">
            {PC_BUILDS.map((b, i) => (
              <div key={i} className="bc">
                <div className="bc-h">
                  <div className="bc-n" style={{ color: b.color }}>{b.name}</div>
                  <div className="bc-b" style={{ color: b.color }}>{b.budget}</div>
                  <div className="bc-tg">{b.target}</div>
                </div>
                <div className="bc-parts">
                  {b.parts.map((p, j) => <div key={j} className="bc-part"><span className="bc-pl">{p.p}</span><span className="bc-pn">{p.n}</span><span className="bc-pv">{p.v}</span></div>)}
                </div>
                <button className="bc-btn" style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}28` }}>Ver componentes en Amazon →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="foot">
        <strong>PanZGames</strong> · Comparador de precios · Precios actualizados diariamente · Afiliados: Instant Gaming · Eneba · Kinguin · Amazon
      </footer>
    </div>
  );
}
