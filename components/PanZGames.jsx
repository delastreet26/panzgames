"use client";

import { useState, useEffect, useMemo } from "react";

// =============================================
// DATOS MOCK (en producción vendrán de Supabase)
// =============================================
const MODERN_GAMES = [
  { id: 1, title: "Elden Ring", platform: "PC", genre: "RPG", year: 2022, metacritic: 96, rating: 9.4, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 24.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 22.50, color: "#00c2a8", logo: "EN" }, { store: "Kinguin", price: 21.99, color: "#e53935", logo: "KG" }] },
  { id: 2, title: "Cyberpunk 2077", platform: "PC", genre: "RPG", year: 2020, metacritic: 86, rating: 8.9, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 17.50, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 16.90, color: "#00c2a8", logo: "EN" }, { store: "GOG", price: 49.99, color: "#9c27b0", logo: "G" }, { store: "Kinguin", price: 15.99, color: "#e53935", logo: "KG" }] },
  { id: 3, title: "Red Dead Redemption 2", platform: "PC", genre: "Acción", year: 2019, metacritic: 97, rating: 9.7, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 14.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 13.50, color: "#00c2a8", logo: "EN" }, { store: "Kinguin", price: 12.99, color: "#e53935", logo: "KG" }] },
  { id: 4, title: "Baldur's Gate 3", platform: "PC", genre: "RPG", year: 2023, metacritic: 96, rating: 9.6, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", prices: [{ store: "Steam", price: 59.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 38.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 36.50, color: "#00c2a8", logo: "EN" }] },
  { id: 5, title: "God of War", platform: "PC", genre: "Acción", year: 2022, metacritic: 94, rating: 9.5, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg", prices: [{ store: "Steam", price: 49.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 19.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 18.50, color: "#00c2a8", logo: "EN" }] },
  { id: 6, title: "Helldivers 2", platform: "PC", genre: "Shooter", year: 2024, metacritic: 82, rating: 8.8, is_retro: false, cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg", prices: [{ store: "Steam", price: 39.99, color: "#1b2838", logo: "S" }, { store: "Instant Gaming", price: 22.99, color: "#ff6b00", logo: "IG" }, { store: "Eneba", price: 21.50, color: "#00c2a8", logo: "EN" }] },
];

const RETRO_GAMES = [
  { id: 101, title: "Golden Sun", platform: "GBA", genre: "RPG", year: 2001, metacritic: 91, rating: 9.1, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg", estimated_price: "25-45€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=golden+sun+gba", wallapop_url: "https://es.wallapop.com/app/search?keywords=golden+sun+gba", curiosities: ["Creado por el mismo equipo que hizo Mario Golf y Mario Tennis en Game Boy.", "Tiene más de 70 hechizos de Psynergy basados en los 4 elementos clásicos.", "Se vendieron más de 2 millones de copias en Europa y América.", "La música fue compuesta por Motoi Sakuraba, también conocido por la saga Dark Souls."] },
  { id: 102, title: "Chrono Trigger", platform: "SNES", genre: "RPG", year: 1995, metacritic: 99, rating: 9.9, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Chrono_Trigger.jpg", estimated_price: "80-180€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=chrono+trigger+snes", wallapop_url: "https://es.wallapop.com/app/search?keywords=chrono+trigger+snes", curiosities: ["Creado por el 'Dream Team': los padres de Final Fantasy, Dragon Quest y Dragon Ball.", "Tiene 13 finales distintos según las decisiones del jugador.", "Fue completado en menos de un año, un récord para su época.", "La banda sonora tiene más de 60 temas originales."] },
  { id: 103, title: "Final Fantasy VII", platform: "PS1", genre: "RPG", year: 1997, metacritic: 92, rating: 9.2, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/c/ce/FF7boxart.jpg", estimated_price: "15-35€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=final+fantasy+vii+ps1", wallapop_url: "https://es.wallapop.com/app/search?keywords=final+fantasy+7+psx", curiosities: ["Aerith fue la primera protagonista de un RPG en morir permanentemente de forma narrativa.", "Se vendieron más de 13 millones de copias, siendo el FF más vendido de su era.", "El equipo tuvo que aprender programación 3D desde cero.", "Ocupa 3 CDs, algo nunca visto hasta entonces en consola."] },
  { id: 104, title: "Zelda: Ocarina of Time", platform: "N64", genre: "Aventura", year: 1998, metacritic: 99, rating: 9.9, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_time.jpg", estimated_price: "25-60€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=zelda+ocarina+of+time+n64", wallapop_url: "https://es.wallapop.com/app/search?keywords=zelda+ocarina+n64", curiosities: ["Primer juego en recibir puntuación perfecta de Metacritic y Famitsu simultáneamente.", "Inventó el sistema Z-targeting que se convirtió en estándar de la industria.", "Tiene 12 canciones aprendibles que afectan al mundo del juego.", "El caballo Epona se puede obtener antes de lo que muchos creen: hay un glitch famoso para ello."] },
  { id: 105, title: "Super Metroid", platform: "SNES", genre: "Metroidvania", year: 1994, metacritic: 96, rating: 9.6, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/e/e4/Supermetroid.jpg", estimated_price: "60-130€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=super+metroid+snes", wallapop_url: "https://es.wallapop.com/app/search?keywords=super+metroid+snes", curiosities: ["Definió el género 'Metroidvania' que hoy siguen millones de juegos.", "Se completó íntegramente en 3 años por un equipo de solo 12 personas.", "El juego tiene un final alternativo que se desbloquea al completarlo en menos de 3 horas.", "Fue candidato a ser adaptado a película en los 90."] },
  { id: 106, title: "Metal Gear Solid", platform: "PS1", genre: "Sigilo", year: 1998, metacritic: 94, rating: 9.4, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/0/05/Metal_Gear_Solid_cover_art.png", estimated_price: "15-30€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=metal+gear+solid+ps1", wallapop_url: "https://es.wallapop.com/app/search?keywords=metal+gear+solid+psx", curiosities: ["El jefe Psycho Mantis puede leer tu tarjeta de memoria y mencionar tus juegos guardados.", "Hideo Kojima quería que el juego tuviera actores reales de Hollywood.", "El director sabía tan poco de stealth que contrató a un consultor del ejército.", "El famoso 'codec' dura más de 30 minutos si lees todos los diálogos opcionales."] },
  { id: 107, title: "Pokémon FireRed", platform: "GBA", genre: "RPG", year: 2004, metacritic: 82, rating: 8.5, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/8/8f/Pokemon_FireRed_box.jpg", estimated_price: "30-60€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=pokemon+firered+gba", wallapop_url: "https://es.wallapop.com/app/search?keywords=pokemon+firered+gba", curiosities: ["Es un remake de los juegos originales de 1996 con gráficos totalmente nuevos.", "Añade el Sevii Islands, una zona completamente nueva no presente en los originales.", "Las versiones originales en perfecto estado pueden valer más de 200€ hoy.", "Fue el juego de GBA más vendido de 2004."] },
  { id: 108, title: "GoldenEye 007", platform: "N64", genre: "FPS", year: 1997, metacritic: 96, rating: 9.3, is_retro: true, cover: "https://upload.wikimedia.org/wikipedia/en/3/33/GoldenEye007boxart.jpg", estimated_price: "20-50€", ebay_url: "https://www.ebay.es/sch/i.html?_nkw=goldeneye+007+n64", wallapop_url: "https://es.wallapop.com/app/search?keywords=goldeneye+n64", curiosities: ["Fue desarrollado por solo 8 personas en Rare, la mayoría sin experiencia previa en juegos.", "El modo multijugador fue añadido en las últimas semanas de desarrollo como extra.", "Vendió más de 8 millones de copias y fue el tercer juego más vendido de N64.", "El prototipo del juego era un shooter en primera persona sin sigilo: el género lo inventaron mientras lo hacían."] },
];

const PLATFORMS = ["Todas", "GBA", "SNES", "PS1", "N64", "Mega Drive", "Game Boy"];
const PLATFORM_COLORS = { GBA: "#8B0000", SNES: "#6B3FA0", PS1: "#003087", N64: "#E60012", "Mega Drive": "#1a1a5e", "Game Boy": "#5c6b3a", "Game Boy Advance": "#8B0000" };

const GAME_OF_DAY = {
  title: "Golden Sun",
  platform: "GBA",
  year: 2001,
  developer: "Camelot Software Planning",
  genre: "RPG",
  metacritic: 91,
  cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/GoldenSunGBA.jpg",
  ai_description: "Una épica aventura de rol que revolucionó los RPGs en Game Boy Advance con su sistema de magia Psynergy y su profunda narrativa. Golden Sun demostró que las consolas portátiles podían ofrecer experiencias tan ricas como las de sobremesa.",
  curiosities: [
    "Fue creado por el mismo equipo que desarrolló Mario Golf y Mario Tennis para Game Boy Color.",
    "El sistema de Psynergy tiene más de 70 hechizos basados en los 4 elementos clásicos: Viento, Tierra, Fuego y Agua.",
    "Se vendieron más de 2 millones de copias solo en Europa y América del Norte.",
    "La banda sonora fue compuesta por Motoi Sakuraba, conocido también por las sagas Dark Souls, Star Ocean y Valkyrie Profile."
  ]
};

const MOCK_COMMENTS = [
  { id: 1, username: "RetroGamer92", avatar: "RG", xp_level: 7, content: "Golden Sun es una OBRA MAESTRA. Lo jugué de pequeño y lo rejugué el año pasado y sigue siendo increíble. La música de Motoi Sakuraba es perfecta.", time: "hace 2 horas" },
  { id: 2, username: "PixelKnight", avatar: "PK", xp_level: 3, content: "¡El sistema de Djinn es de lo más original que he visto en un RPG! Cada elemento tiene su propio set de criaturas. Ojalá hicieran un remake en Switch.", time: "hace 5 horas" },
  { id: 3, username: "NostalgiaGaming", avatar: "NG", xp_level: 12, content: "Lo encontré en eBay por 28€ hace poco. Vale completamente la pena. La caja y el cartucho en perfecto estado. Si podéis, comprarlo físico es otra experiencia.", time: "hace 8 horas" },
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

// =============================================
// UTILS
// =============================================
function getBest(prices) { const a = prices.filter(p => p.price != null); return a.length ? Math.min(...a.map(p => p.price)) : null; }
function getSteam(prices) { const s = prices.find(p => p.store === "Steam"); return s?.price ?? null; }
function getDisc(prices) { const b = getBest(prices), s = getSteam(prices); return (b && s && b !== s) ? Math.round(((s - b) / s) * 100) : null; }
function sortedPrices(prices) { return [...prices].sort((a, b) => { if (a.price == null) return 1; if (b.price == null) return -1; return a.price - b.price; }); }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#080b10}
.app{font-family:'DM Sans',sans-serif;background:#080b10;color:#e2e8f0;min-height:100vh}
.nav{background:rgba(8,11,16,.97);border-bottom:1px solid rgba(0,194,168,.15);padding:0 1.5rem;display:flex;align-items:center;gap:1.5rem;height:60px;position:sticky;top:0;z-index:100}
.logo{font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:6px;text-decoration:none}
.logo em{color:#00c2a8;font-style:normal}
.dot{width:8px;height:8px;background:#00c2a8;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.nav-links{display:flex;gap:2px;flex-wrap:wrap}
.nb{background:none;border:none;color:#64748b;font-size:.82rem;font-weight:500;padding:5px 11px;border-radius:5px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
.nb:hover{color:#e2e8f0;background:rgba(255,255,255,.06)}
.nb.on{color:#00c2a8;background:rgba(0,194,168,.1)}
.srch-w{margin-left:auto;position:relative}
.srch{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:6px 12px 6px 32px;color:#e2e8f0;font-size:.82rem;width:200px;outline:none;font-family:'DM Sans',sans-serif;transition:all .2s}
.srch::placeholder{color:#334155}
.srch:focus{border-color:rgba(0,194,168,.5);width:250px}
.srch-ic{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:#334155;font-size:13px;pointer-events:none}
.user-btn{background:rgba(0,194,168,.1);border:1px solid rgba(0,194,168,.3);color:#00c2a8;font-size:.78rem;padding:5px 13px;border-radius:6px;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap}
.hero{padding:2.5rem 1.5rem 1.5rem;max-width:1280px;margin:0 auto}
.hero h1{font-family:'Rajdhani',sans-serif;font-size:2.6rem;font-weight:700;line-height:1.1;margin-bottom:.5rem}
.hero h1 em{color:#00c2a8;font-style:normal}
.hero p{color:#475569;font-size:.9rem;max-width:480px}
.stats{display:flex;gap:2rem;margin-top:1.25rem;flex-wrap:wrap}
.stat-n{font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;color:#00c2a8}
.stat-l{font-size:.72rem;color:#334155}
.sec{max-width:1280px;margin:0 auto;padding:0 1.5rem 2.5rem}
.sec-h{display:flex;align-items:center;gap:10px;margin-bottom:1rem}
.sec-t{font-family:'Rajdhani',sans-serif;font-size:1.25rem;font-weight:600;color:#f1f5f9;white-space:nowrap}
.sec-l{flex:1;height:1px;background:linear-gradient(to right,rgba(0,194,168,.25),transparent)}
.fb{display:flex;gap:6px;margin-bottom:1rem;flex-wrap:wrap}
.ff{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:#475569;font-size:.75rem;padding:4px 12px;border-radius:18px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
.ff:hover{color:#e2e8f0}
.ff.on{background:rgba(0,194,168,.1);border-color:rgba(0,194,168,.35);color:#00c2a8}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.85rem}
.gc{background:#0f1420;border:1px solid rgba(255,255,255,.06);border-radius:9px;overflow:hidden;cursor:pointer;transition:all .2s}
.gc:hover{border-color:rgba(0,194,168,.3);transform:translateY(-3px)}
.gc.sel{border-color:#00c2a8}
.gc img{width:100%;aspect-ratio:460/215;object-fit:cover;display:block;background:#1a2030}
.gi{padding:9px 11px 11px}
.gt{font-family:'Rajdhani',sans-serif;font-weight:600;font-size:.9rem;color:#f1f5f9;margin-bottom:5px;line-height:1.2}
.gm{display:flex;align-items:center;justify-content:space-between}
.gg{font-size:.68rem;background:rgba(0,194,168,.1);color:#00c2a8;padding:2px 7px;border-radius:9px}
.gr{font-size:.72rem;color:#f59e0b;font-weight:500}
.gp-row{display:flex;align-items:center;justify-content:space-between;margin-top:7px}
.gbp{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;color:#00c2a8}
.gop{font-size:.7rem;color:#334155;text-decoration:line-through}
.gd{font-size:.67rem;background:rgba(245,158,11,.12);color:#f59e0b;padding:2px 5px;border-radius:3px;font-weight:600}
.cp{background:#0d1117;border:1px solid rgba(0,194,168,.2);border-radius:11px;padding:1.25rem;margin-bottom:1.5rem}
.cp-h{display:flex;gap:1rem;margin-bottom:1rem;align-items:flex-start}
.cp-img{width:180px;border-radius:7px;flex-shrink:0;object-fit:cover;background:#1a2030}
.cp-m{flex:1}
.cp-t{font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:4px}
.cp-b{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.bdg{font-size:.7rem;padding:2px 9px;border-radius:9px;font-weight:500}
.bdg-g{background:rgba(0,194,168,.1);color:#00c2a8}
.bdg-m{background:rgba(34,197,94,.1);color:#22c55e}
.cp-sub{color:#475569;font-size:.82rem}
.cl{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#64748b;width:30px;height:30px;border-radius:5px;cursor:pointer;font-size:.9rem;margin-left:auto;flex-shrink:0;transition:all .15s;display:flex;align-items:center;justify-content:center;border:none}
.cl:hover{color:#f1f5f9;background:rgba(255,255,255,.1)}
.pl{display:flex;flex-direction:column;gap:7px}
.pr{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05);border-radius:7px;padding:9px 12px;transition:all .15s}
.pr:hover{border-color:rgba(0,194,168,.2)}
.pr.best{border-color:rgba(0,194,168,.3);background:rgba(0,194,168,.05)}
.sl{width:32px;height:32px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:#fff;flex-shrink:0;font-family:'Rajdhani',sans-serif}
.sn{flex:1;font-size:.85rem;color:#94a3b8}
.sp{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700}
.sp.best{color:#00c2a8}
.ss{font-size:.7rem;background:rgba(245,158,11,.1);color:#f59e0b;padding:2px 7px;border-radius:9px;font-weight:600}
.sun{font-size:.78rem;color:#334155}
.bb{background:rgba(0,194,168,.12);border:1px solid rgba(0,194,168,.25);color:#00c2a8;font-size:.72rem;padding:4px 10px;border-radius:5px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;text-decoration:none;white-space:nowrap;transition:all .15s}
.bb:hover{background:rgba(0,194,168,.22)}
.bst{font-size:.62rem;background:#00c2a8;color:#000;padding:1px 5px;border-radius:3px;font-weight:700;margin-left:4px}
.god-card{background:#0d1117;border:1px solid rgba(0,194,168,.2);border-radius:12px;overflow:hidden;margin-bottom:1.5rem}
.god-banner{padding:.5rem 1rem;background:rgba(0,194,168,.08);border-bottom:1px solid rgba(0,194,168,.15);display:flex;align-items:center;gap:8px}
.god-label{font-family:'Rajdhani',sans-serif;font-size:.8rem;font-weight:600;color:#00c2a8;text-transform:uppercase;letter-spacing:.05em}
.god-date{font-size:.75rem;color:#334155;margin-left:auto}
.god-body{display:grid;grid-template-columns:220px 1fr;gap:0}
.god-img{width:100%;height:180px;object-fit:cover;background:#1a2030;display:block}
.god-info{padding:1.25rem}
.god-title{font-family:'Rajdhani',sans-serif;font-size:1.6rem;font-weight:700;margin-bottom:4px}
.god-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:.75rem}
.god-desc{font-size:.85rem;color:#64748b;line-height:1.6;margin-bottom:1rem}
.cur-list{display:flex;flex-direction:column;gap:6px}
.cur-item{display:flex;gap:8px;align-items:flex-start;font-size:.82rem;color:#94a3b8;line-height:1.5}
.cur-num{font-family:'Rajdhani',sans-serif;font-weight:700;color:#00c2a8;font-size:.9rem;flex-shrink:0;width:18px}
.god-footer{padding:.75rem 1rem;background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.04);display:flex;align-items:center;justify-content:space-between}
.god-f-txt{font-size:.75rem;color:#334155}
.god-ebay{font-size:.75rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#64748b;padding:4px 12px;border-radius:5px;cursor:pointer;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all .15s}
.god-ebay:hover{color:#e2e8f0}
.comm-sec{padding:1rem 1.25rem 1.25rem;border-top:1px solid rgba(255,255,255,.05)}
.comm-h{font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:600;margin-bottom:.85rem;color:#94a3b8}
.comm-list{display:flex;flex-direction:column;gap:.6rem;margin-bottom:.85rem}
.comm{display:flex;gap:10px;align-items:flex-start}
.av{width:34px;height:34px;border-radius:50%;background:rgba(0,194,168,.15);display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:#00c2a8;flex-shrink:0;font-family:'Rajdhani',sans-serif}
.comm-body{flex:1;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05);border-radius:8px;padding:.6rem .9rem}
.comm-user{font-size:.75rem;font-weight:500;color:#94a3b8;margin-bottom:3px;display:flex;gap:6px;align-items:center}
.lvl{font-size:.62rem;background:rgba(245,158,11,.1);color:#f59e0b;padding:1px 6px;border-radius:8px}
.comm-txt{font-size:.82rem;color:#cbd5e1;line-height:1.5}
.comm-time{font-size:.68rem;color:#1e293b;margin-top:3px}
.comm-input-row{display:flex;gap:8px;align-items:center}
.comm-input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:7px;padding:7px 12px;color:#e2e8f0;font-size:.82rem;outline:none;font-family:'DM Sans',sans-serif;transition:border-color .15s}
.comm-input:focus{border-color:rgba(0,194,168,.4)}
.comm-input::placeholder{color:#334155}
.comm-send{background:rgba(0,194,168,.15);border:1px solid rgba(0,194,168,.3);color:#00c2a8;padding:7px 16px;border-radius:7px;cursor:pointer;font-size:.82rem;font-family:'DM Sans',sans-serif;transition:all .15s;white-space:nowrap}
.comm-send:hover{background:rgba(0,194,168,.25)}
.login-hint{font-size:.75rem;color:#334155;text-align:center;padding:.5rem}
.retro-plat{padding:4px 10px;border-radius:12px;font-size:.7rem;font-weight:600;color:#fff}
.rc img{width:100%;aspect-ratio:3/2;object-fit:cover;background:#1a2030;display:block}
.rc-ebay{display:flex;gap:5px;margin-top:8px}
.rc-ebay a{flex:1;font-size:.7rem;text-align:center;padding:4px 6px;border-radius:5px;text-decoration:none;border:1px solid rgba(255,255,255,.08);color:#475569;background:rgba(255,255,255,.03);transition:all .15s}
.rc-ebay a:hover{color:#e2e8f0;background:rgba(255,255,255,.07)}
.rc-price{font-family:'Rajdhani',sans-serif;font-size:.95rem;font-weight:700;color:#f59e0b}
.no-r{padding:3rem;text-align:center;color:#1e293b;font-family:'Rajdhani',sans-serif;font-size:1.3rem}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.85rem}
.pc{background:#0f1420;border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:1rem;transition:all .2s}
.pc:hover{border-color:rgba(124,58,237,.3);transform:translateY(-2px)}
.pc-icon{font-size:1.8rem;margin-bottom:6px}
.pc-cat{font-size:.68rem;color:#7c3aed;background:rgba(124,58,237,.1);padding:2px 8px;border-radius:9px;display:inline-block;margin-bottom:5px}
.pc-name{font-size:.85rem;font-weight:500;color:#e2e8f0;margin-bottom:9px;line-height:1.3}
.pc-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px}
.pc-price{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;color:#f1f5f9}
.pc-tag{font-size:.64rem;background:rgba(245,158,11,.1);color:#f59e0b;padding:2px 7px;border-radius:9px}
.ab{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#64748b;font-size:.72rem;padding:4px 9px;border-radius:4px;cursor:pointer;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all .15s}
.ab:hover{color:#f1f5f9}
.bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.85rem}
.bc{background:#0f1420;border:1px solid rgba(255,255,255,.06);border-radius:9px;overflow:hidden}
.bc-h{padding:.9rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.05)}
.bc-n{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:1px}
.bc-b{font-family:'Rajdhani',sans-serif;font-size:1.7rem;font-weight:700}
.bc-tg{font-size:.72rem;color:#475569;margin-top:1px}
.bc-parts{padding:.9rem 1.1rem}
.bc-part{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.03);font-size:.78rem}
.bc-part:last-child{border:none}
.bc-pl{color:#334155;min-width:45px}
.bc-pn{color:#94a3b8;flex:1;padding:0 7px}
.bc-pv{color:#64748b;font-weight:500}
.bc-btn{margin:0 1.1rem 1.1rem;display:block;text-align:center;padding:7px;border-radius:6px;font-size:.78rem;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.bc-btn:hover{opacity:.8}
.foot{border-top:1px solid rgba(255,255,255,.05);padding:1.25rem 1.5rem;text-align:center;color:#1e293b;font-size:.75rem}
.foot strong{color:#2d3748}
@media(max-width:640px){.god-body{grid-template-columns:1fr}.god-img{height:140px}.cp-h{flex-direction:column}.cp-img{width:100%;height:auto}}
`;

// =============================================
// COMPONENTE PRINCIPAL
// =============================================
export default function PanZGames() {
  const [tab, setTab] = useState("juegos");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [platform, setPlatform] = useState("Todas");
  const [selGame, setSelGame] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const genres = useMemo(() => ["Todos", ...new Set(MODERN_GAMES.map(g => g.genre))], []);

  const filteredModern = useMemo(() =>
    MODERN_GAMES.filter(g =>
      g.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "Todos" || g.genre === genre)
    ), [search, genre]);

  const filteredRetro = useMemo(() =>
    RETRO_GAMES.filter(g =>
      g.title.toLowerCase().includes(search.toLowerCase()) &&
      (platform === "Todas" || g.platform === platform)
    ), [search, platform]);

  const handleComment = () => {
    if (!comment.trim()) return;
    if (!loggedIn) { alert("Inicia sesión para comentar"); return; }
    setComments(prev => [{ id: Date.now(), username: "Tú", avatar: "TU", xp_level: 1, content: comment, time: "ahora mismo" }, ...prev]);
    setComment("");
  };

  const today = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="logo">
          <div className="dot" />
          PanZ<em>Games</em>
        </div>
        <div className="nav-links">
          {[["juegos", "🎮 Juegos PC"], ["retro", "🕹️ Retro"], ["perifericos", "🖱️ Periféricos"], ["builds", "🖥️ Builds PC"]].map(([id, label]) => (
            <button key={id} className={`nb${tab === id ? " on" : ""}`} onClick={() => { setTab(id); setSelGame(null); }}>{label}</button>
          ))}
        </div>
        <div className="srch-w">
          <span className="srch-ic">🔍</span>
          <input className="srch" placeholder="Buscar juego..." value={search} onChange={e => { setSearch(e.target.value); setTab(e.target.value ? "juegos" : tab); }} />
        </div>
        <button className="user-btn" onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? "👤 Mi Perfil" : "Iniciar Sesión"}
        </button>
      </nav>

      {/* JUEGOS PC */}
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
            <div className="fb">
              {genres.map(g => <button key={g} className={`ff${genre === g ? " on" : ""}`} onClick={() => setGenre(g)}>{g}</button>)}
            </div>
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

      {/* RETRO */}
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
                  <span className="bdg" style={{ background: "rgba(245,158,11,.1)", color: "#f59e0b" }}>★ {GAME_OF_DAY.metacritic / 10}</span>
                </div>
                <div className="god-desc">{GAME_OF_DAY.ai_description}</div>
                <div className="cur-list">
                  {GAME_OF_DAY.curiosities.map((c, i) => (
                    <div key={i} className="cur-item">
                      <span className="cur-num">{i + 1}.</span>
                      <span>{c}</span>
                    </div>
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
                      <div className="comm-user">
                        {c.username}
                        <span className="lvl">Nv.{c.xp_level}</span>
                      </div>
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

      {/* PERIFERICOS */}
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

      {/* BUILDS */}
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
