"use client";

import { useState, useMemo, useEffect } from "react";
import DailyRiddle from "./DailyRiddle";
import MiniGame from "./MiniGame";

const MODERN_GAMES = [
  { id: 1, title: "Elden Ring", platform: "PC", genre: "RPG", year: 2022, metacritic: 96, rating: 9.4, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", prices: [
    { store: "Steam", price: 89.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "EB Games", price: 69.95, currency: "A$", color: "#e53935", logo: "EB" },
    { store: "JB Hi-Fi", price: 59.00, currency: "A$", color: "#fdd835", logo: "JB" },
    { store: "Mighty Ape", price: 54.99, currency: "A$", color: "#ff6b00", logo: "MA" },
    { store: "Instant Gaming", price: 24.99, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
  { id: 2, title: "Cyberpunk 2077", platform: "PC", genre: "RPG", year: 2020, metacritic: 86, rating: 8.9, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", prices: [
    { store: "Steam", price: 79.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "EB Games", price: 49.95, currency: "A$", color: "#e53935", logo: "EB" },
    { store: "JB Hi-Fi", price: 45.00, currency: "A$", color: "#fdd835", logo: "JB" },
    { store: "GOG", price: 49.99, currency: "€", color: "#9c27b0", logo: "G" },
    { store: "Instant Gaming", price: 17.50, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
  { id: 3, title: "Red Dead Redemption 2", platform: "PC", genre: "Action", year: 2019, metacritic: 97, rating: 9.7, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", prices: [
    { store: "Steam", price: 79.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "EB Games", price: 49.95, currency: "A$", color: "#e53935", logo: "EB" },
    { store: "JB Hi-Fi", price: 44.00, currency: "A$", color: "#fdd835", logo: "JB" },
    { store: "Instant Gaming", price: 14.99, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
  { id: 4, title: "Baldur's Gate 3", platform: "PC", genre: "RPG", year: 2023, metacritic: 96, rating: 9.6, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", prices: [
    { store: "Steam", price: 89.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "EB Games", price: 79.95, currency: "A$", color: "#e53935", logo: "EB" },
    { store: "Mighty Ape", price: 69.99, currency: "A$", color: "#ff6b00", logo: "MA" },
    { store: "Instant Gaming", price: 38.99, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
  { id: 5, title: "God of War", platform: "PC", genre: "Action", year: 2022, metacritic: 94, rating: 9.5, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg", prices: [
    { store: "Steam", price: 69.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "JB Hi-Fi", price: 49.00, currency: "A$", color: "#fdd835", logo: "JB" },
    { store: "Mighty Ape", price: 44.99, currency: "A$", color: "#ff6b00", logo: "MA" },
    { store: "Instant Gaming", price: 19.99, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
  { id: 6, title: "Helldivers 2", platform: "PC", genre: "Shooter", year: 2024, metacritic: 82, rating: 8.8, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg", prices: [
    { store: "Steam", price: 59.95, currency: "A$", color: "#1b2838", logo: "S" },
    { store: "EB Games", price: 49.95, currency: "A$", color: "#e53935", logo: "EB" },
    { store: "Instant Gaming", price: 22.99, currency: "€", color: "#2d6a4f", logo: "IG" },
  ]},
];

const RETRO_GAMES = [
  { id: 101, title: "Golden Sun", platform: "GBA", genre: "RPG", year: 2001, metacritic: 91, rating: 9.1, cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg", estimated_price: "A$40–80", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=golden+sun+gba", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-golden+sun+gba" },
  { id: 102, title: "Chrono Trigger", platform: "SNES", genre: "RPG", year: 1995, metacritic: 99, rating: 9.9, cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Chrono_Trigger.jpg", estimated_price: "A$150–300", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=chrono+trigger+snes", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-chrono+trigger+snes" },
  { id: 103, title: "Final Fantasy VII", platform: "PS1", genre: "RPG", year: 1997, metacritic: 92, rating: 9.2, cover: "https://upload.wikimedia.org/wikipedia/en/c/ce/FF7boxart.jpg", estimated_price: "A$30–60", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=final+fantasy+vii+ps1", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-final+fantasy+7+ps1" },
  { id: 104, title: "Zelda: Ocarina of Time", platform: "N64", genre: "Adventure", year: 1998, metacritic: 99, rating: 9.9, cover: "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_time.jpg", estimated_price: "A$40–100", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=zelda+ocarina+of+time+n64", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-zelda+ocarina+time+n64" },
  { id: 105, title: "Super Metroid", platform: "SNES", genre: "Metroidvania", year: 1994, metacritic: 96, rating: 9.6, cover: "https://upload.wikimedia.org/wikipedia/en/e/e4/Supermetroid.jpg", estimated_price: "A$100–200", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=super+metroid+snes", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-super+metroid+snes" },
  { id: 106, title: "Metal Gear Solid", platform: "PS1", genre: "Stealth", year: 1998, metacritic: 94, rating: 9.4, cover: "https://upload.wikimedia.org/wikipedia/en/0/05/Metal_Gear_Solid_cover_art.png", estimated_price: "A$25–50", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=metal+gear+solid+ps1", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-metal+gear+solid+ps1" },
  { id: 107, title: "Pokémon FireRed", platform: "GBA", genre: "RPG", year: 2004, metacritic: 82, rating: 8.5, cover: "https://upload.wikimedia.org/wikipedia/en/8/8f/Pokemon_FireRed_box.jpg", estimated_price: "A$50–100", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=pokemon+firered+gba", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-pokemon+firered+gba" },
  { id: 108, title: "GoldenEye 007", platform: "N64", genre: "FPS", year: 1997, metacritic: 96, rating: 9.3, cover: "https://upload.wikimedia.org/wikipedia/en/3/33/GoldenEye007boxart.jpg", estimated_price: "A$35–80", ebay_url: "https://www.ebay.com.au/sch/i.html?_nkw=goldeneye+007+n64", gumtree_url: "https://www.gumtree.com.au/s-video-games-consoles/q-goldeneye+n64" },
];

const PLATFORMS = ["All", "GBA", "SNES", "PS1", "N64", "Mega Drive", "Game Boy"];
const PLATFORM_COLORS = { GBA: "#8B0000", SNES: "#6B3FA0", PS1: "#003087", N64: "#E60012", "Mega Drive": "#1a1a5e", "Game Boy": "#5c6b3a" };

const GAME_OF_DAY = {
  title: "Golden Sun", platform: "GBA", year: 2001, metacritic: 91,
  cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg",
  ai_description: "An epic RPG adventure that revolutionised Game Boy Advance gaming with its Psynergy magic system and deep narrative. Golden Sun proved that handheld consoles could deliver experiences as rich as home consoles.",
  curiosities: [
    "Created by the same team that developed Mario Golf and Mario Tennis for Game Boy Color.",
    "The Psynergy system features over 70 spells based on the 4 classic elements.",
    "Sold over 2 million copies in Europe and North America alone.",
    "The soundtrack was composed by Motoi Sakuraba, also known for the Dark Souls and Star Ocean series."
  ]
};

const MOCK_COMMENTS = [
  { id: 1, username: "RetroGamer92", avatar: "RG", xp_level: 7, content: "Golden Sun is a MASTERPIECE. Played it as a kid and replayed it last year — still incredible. Motoi Sakuraba's music is perfect.", time: "2 hours ago" },
  { id: 2, username: "PixelKnight", avatar: "PK", xp_level: 3, content: "The Djinn system is one of the most original things I've seen in an RPG. Hope they make a remake someday!", time: "5 hours ago" },
  { id: 3, username: "NostalgiaGaming", avatar: "NG", xp_level: 12, content: "Found it on eBay AU for $45. Totally worth it. Cart in perfect condition.", time: "8 hours ago" },
];

const PERIPHERALS = [
  { name: "Logitech G Pro X Superlight 2", category: "Mouse", price: 189.95, currency: "A$", rating: 4.8, tag: "Top Pick", icon: "🖱️", aff: "#" },
  { name: "SteelSeries Apex Pro TKL", category: "Keyboard", price: 249.95, currency: "A$", rating: 4.7, tag: "Best Switch", icon: "⌨️", aff: "#" },
  { name: "HyperX Cloud Alpha", category: "Headset", price: 119.95, currency: "A$", rating: 4.6, tag: "Best Value", icon: "🎧", aff: "#" },
  { name: "LG 27GP850-B 27\"", category: "Monitor", price: 449.00, currency: "A$", rating: 4.7, tag: "144Hz IPS", icon: "🖥️", aff: "#" },
];

const PC_BUILDS = [
  { name: "Budget Build", budget: "A$800", target: "1080p / 60fps", color: "#00c2a8", parts: [{ p: "CPU", n: "Ryzen 5 5600", v: "A$180" }, { p: "GPU", n: "RX 6650 XT", v: "A$290" }, { p: "RAM", n: "16GB DDR4", v: "A$65" }, { p: "SSD", n: "500GB NVMe", v: "A$75" }, { p: "Mobo", n: "B550M DS3H", v: "A$120" }, { p: "PSU", n: "650W Bronze", v: "A$95" }] },
  { name: "Gaming Build", budget: "A$1,400", target: "1080p / 144fps", color: "#7c3aed", parts: [{ p: "CPU", n: "Ryzen 5 7600X", v: "A$310" }, { p: "GPU", n: "RTX 4070", v: "A$849" }, { p: "RAM", n: "32GB DDR5", v: "A$140" }, { p: "SSD", n: "1TB NVMe Gen4", v: "A$125" }, { p: "Mobo", n: "B650 Elite", v: "A$230" }, { p: "PSU", n: "750W Gold", v: "A$140" }] },
  { name: "Ultra Build", budget: "A$2,800", target: "4K / 60fps+", color: "#f59e0b", parts: [{ p: "CPU", n: "i7-14700K", v: "A$520" }, { p: "GPU", n: "RTX 4080 Super", v: "A$1,549" }, { p: "RAM", n: "32GB DDR5 6000", v: "A$175" }, { p: "SSD", n: "2TB NVMe Gen4", v: "A$220" }, { p: "Mobo", n: "Z790 Hero", v: "A$440" }, { p: "PSU", n: "1000W Platinum", v: "A$240" }] },
];

function getBestNum(prices) { const a = prices.filter(p => p.price != null); return a.length ? Math.min(...a.map(p => p.price)) : null; }
function getBest(prices) { return prices.filter(p => p.price != null).reduce((b, p) => (!b || p.price < b.price) ? p : b, null); }
function sortedPrices(prices) { return [...prices].sort((a, b) => { if (a.price == null) return 1; if (b.price == null) return -1; return a.price - b.price; }); }

export default function PanZGames() {
  const [tab, setTab] = useState("games");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [selGame, setSelGame] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [loggedIn, setLoggedIn] = useState(false);

  const genres = useMemo(() => ["All", ...new Set(MODERN_GAMES.map(g => g.genre))], []);
  const filteredModern = useMemo(() => MODERN_GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()) && (genre === "All" || g.genre === genre)), [search, genre]);
  const filteredRetro = useMemo(() => RETRO_GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()) && (platform === "All" || g.platform === platform)), [search, platform]);

  const handleComment = () => {
    if (!comment.trim()) return;
    if (!loggedIn) { alert("Sign in to comment"); return; }
    setComments(prev => [{ id: Date.now(), username: "You", avatar: "YO", xp_level: 1, content: comment, time: "just now" }, ...prev]);
    setComment("");
  };

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("pzg_progress") || "{}");
      if (p.active) document.documentElement.setAttribute("data-skin", p.active);
    } catch {}
  }, []);

  const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
  const best = getBest(selGame?.prices || []);

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo"><div className="dot" />PanZ<em>Games</em></div>
        <div className="nav-links">
          {[["games", "🎮 PC Games"], ["retro", "🕹️ Retro"], ["peripherals", "🖱️ Peripherals"], ["builds", "🖥️ PC Builds"], ["riddle", "🧩 Riddle"], ["play", "🎯 Play"]].map(([id, label]) => (
            <button key={id} className={`nb${tab === id ? " on" : ""}`} onClick={() => { setTab(id); setSelGame(null); }}>{label}</button>
          ))}
        </div>
        <div className="srch-w">
          <span className="srch-ic">🔍</span>
          <input className="srch" placeholder="Search game..." value={search} onChange={e => { setSearch(e.target.value); setTab(e.target.value ? "games" : tab); }} />
        </div>
        <button className="user-btn" onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "👤 My Profile" : "Sign In"}</button>
      </nav>

      {tab === "games" && (
        <>
          <div className="hero">
            <h1>Compare prices.<br /><em>Save on every game.</em></h1>
            <p>Prices updated daily from Steam, EB Games, JB Hi-Fi, Mighty Ape, Instant Gaming and more.</p>
            <div className="stats">
              <div><div className="stat-n">10+</div><div className="stat-l">Stores compared</div></div>
              <div><div className="stat-n">up to 70%</div><div className="stat-l">savings</div></div>
              <div><div className="stat-n">AU &amp; Global</div><div className="stat-l">Stores included</div></div>
              <div><div className="stat-n">Free</div><div className="stat-l">No account required</div></div>
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
                      Best price: <strong style={{ color: "var(--a)", fontFamily: "Rajdhani,sans-serif", fontSize: "1.05rem" }}>{best?.currency}{best?.price?.toFixed(2)}</strong>
                      {best?.store && <span style={{ marginLeft: 8, color: "#94a3b8", fontSize: ".8rem" }}>at {best.store}</span>}
                    </div>
                  </div>
                  <button className="cl" onClick={() => setSelGame(null)}>✕</button>
                </div>
                <div className="pl">
                  {sortedPrices(selGame.prices).map((store, i) => {
                    const bestStore = getBest(selGame.prices);
                    const isBest = store.store === bestStore?.store;
                    return (
                      <div key={i} className={`pr${isBest ? " best" : ""}`}>
                        <div className="sl" style={{ background: store.color }}>{store.logo}</div>
                        <div className="sn">{store.store}{isBest && <span className="bst">BEST</span>}</div>
                        {store.price != null
                          ? <span className={`sp${isBest ? " best" : ""}`}>{store.currency}{store.price.toFixed(2)}</span>
                          : <span className="sun">Unavailable</span>}
                        {store.price != null && <a href="#" className="bb">Buy →</a>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ padding: "8px 12px", fontSize: ".7rem", color: "#334155", borderTop: "1px solid rgba(255,255,255,.05)" }}>
                  Prices in A$ (Australian stores) and € (international stores). Exchange rates vary.
                </div>
              </div>
            )}
            <div className="sec-h"><div className="sec-t">🔥 Best Deals</div><div className="sec-l" /></div>
            <div className="fb">{genres.map(g => <button key={g} className={`ff${genre === g ? " on" : ""}`} onClick={() => setGenre(g)}>{g}</button>)}</div>
            {filteredModern.length === 0 ? <div className="no-r">No results</div> : (
              <div className="grid">
                {filteredModern.map(game => {
                  const b = getBest(game.prices);
                  return (
                    <div key={game.id} className={`gc${selGame?.id === game.id ? " sel" : ""}`} onClick={() => setSelGame(selGame?.id === game.id ? null : game)}>
                      <img src={game.cover} alt={game.title} onError={e => { e.target.style.display = "none"; }} />
                      <div className="gi">
                        <div className="gt">{game.title}</div>
                        <div className="gm"><span className="gg">{game.genre}</span><span className="gr">★ {game.rating}</span></div>
                        <div className="gp-row">
                          <div className="gbp">{b?.currency}{b?.price?.toFixed(2)}</div>
                          <span style={{ fontSize: ".68rem", color: "#475569" }}>{b?.store}</span>
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
          <div className="sec-h"><div className="sec-t">⭐ Game of the Day</div><div className="sec-l" /></div>
          <div className="god-card">
            <div className="god-banner">
              <span style={{ fontSize: "1rem" }}>🎮</span>
              <span className="god-label">Game of the Day</span>
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
              <span className="god-f-txt">Have it in your collection? Comment below 👇</span>
              <div style={{ display: "flex", gap: 6 }}>
                <a href={RETRO_GAMES[0].ebay_url} target="_blank" rel="noopener" className="god-ebay">View on eBay AU →</a>
                <a href={RETRO_GAMES[0].gumtree_url} target="_blank" rel="noopener" className="god-ebay">View on Gumtree →</a>
              </div>
            </div>
            <div className="comm-sec">
              <div className="comm-h">💬 Comments ({comments.length})</div>
              <div className="comm-list">
                {comments.map(c => (
                  <div key={c.id} className="comm">
                    <div className="av">{c.avatar}</div>
                    <div className="comm-body">
                      <div className="comm-user">{c.username}<span className="lvl">Lv.{c.xp_level}</span></div>
                      <div className="comm-txt">{c.content}</div>
                      <div className="comm-time">{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              {loggedIn ? (
                <div className="comm-input-row">
                  <input className="comm-input" placeholder="Write a comment..." value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && handleComment()} />
                  <button className="comm-send" onClick={handleComment}>Send →</button>
                </div>
              ) : (
                <div className="login-hint">
                  <button className="user-btn" onClick={() => setLoggedIn(true)} style={{ margin: "0 auto" }}>Sign in to comment</button>
                </div>
              )}
            </div>
          </div>

          <div className="sec-h" style={{ marginTop: "1.5rem" }}><div className="sec-t">🕹️ Retro Catalogue</div><div className="sec-l" /></div>
          <div className="fb">
            {PLATFORMS.map(p => (
              <button key={p} className={`ff${platform === p ? " on" : ""}`} onClick={() => setPlatform(p)} style={platform === p && PLATFORM_COLORS[p] ? { background: `${PLATFORM_COLORS[p]}22`, borderColor: `${PLATFORM_COLORS[p]}55`, color: PLATFORM_COLORS[p] } : {}}>
                {p}
              </button>
            ))}
          </div>
          {filteredRetro.length === 0 ? <div className="no-r">No results</div> : (
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
                      <a href={game.ebay_url} target="_blank" rel="noopener">eBay AU →</a>
                      <a href={game.gumtree_url} target="_blank" rel="noopener">Gumtree →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "peripherals" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🖱️ Recommended Gaming Peripherals</div><div className="sec-l" /></div>
          <div className="pgrid">
            {PERIPHERALS.map((p, i) => (
              <div key={i} className="pc">
                <div className="pc-icon">{p.icon}</div>
                <div className="pc-cat">{p.category}</div>
                <div className="pc-name">{p.name}</div>
                <div className="pc-bot">
                  <div><div className="pc-price">{p.currency}{p.price.toFixed(2)}</div><div style={{ fontSize: ".7rem", color: "#f59e0b", marginTop: 2 }}>★ {p.rating} / 5</div></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    <span className="pc-tag">{p.tag}</span>
                    <a href={p.aff} className="ab">Amazon AU →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,.02)", borderRadius: 7, border: "1px solid rgba(255,255,255,.04)", fontSize: ".75rem", color: "#1e293b" }}>
            * Affiliate links — buying through PanZGames supports us at no extra cost to you.
          </div>
        </div>
      )}

      {tab === "builds" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🖥️ Recommended PC Gaming Builds</div><div className="sec-l" /></div>
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
                <button className="bc-btn" style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}28` }}>View components on Amazon AU →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "riddle" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🧩 Daily Gaming Riddle</div><div className="sec-l" /></div>
          <p style={{ color: "#475569", fontSize: ".85rem", marginBottom: "1.25rem", fontFamily: "DM Sans,sans-serif" }}>
            A fresh original riddle every day. Solve it to earn 🪙 coins — spend them in the 🎯 Play tab to unlock interface skins.
          </p>
          <DailyRiddle />
        </div>
      )}

      {tab === "play" && (
        <div className="sec" style={{ paddingTop: "1.5rem" }}>
          <div className="sec-h"><div className="sec-t">🎯 Emoji Quiz</div><div className="sec-l" /></div>
          <p style={{ color: "#475569", fontSize: ".85rem", marginBottom: "1.25rem", fontFamily: "DM Sans,sans-serif" }}>
            Guess the game from 4 emoji clues. Earn coins on correct answers and spend them in the Skin Shop to customise the site.
          </p>
          <MiniGame />
        </div>
      )}

      <footer className="foot">
        <strong>PanZGames</strong> · Price comparator · Prices updated daily · AU & Global stores · Affiliates: EB Games · JB Hi-Fi · Mighty Ape · Amazon AU
      </footer>
    </div>
  );
}
