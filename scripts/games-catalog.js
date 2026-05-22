// =============================================
// PANZGAMES - Catálogo de juegos
// Añade aquí juegos nuevos cuando quieras
// =============================================

export const MODERN_GAMES = [
  { title: "Elden Ring", platform: "PC", year: 2022, genre: "RPG", developer: "FromSoftware", itad_id: "elden_ring", igdb_id: 119133, metacritic: 96 },
  { title: "Cyberpunk 2077", platform: "PC", year: 2020, genre: "RPG", developer: "CD Projekt Red", itad_id: "cyberpunk_2077", igdb_id: 1877, metacritic: 86 },
  { title: "Red Dead Redemption 2", platform: "PC", year: 2019, genre: "Acción", developer: "Rockstar Games", itad_id: "red_dead_redemption_2", igdb_id: 25076, metacritic: 97 },
  { title: "Baldur's Gate 3", platform: "PC", year: 2023, genre: "RPG", developer: "Larian Studios", itad_id: "baldurs_gate_3", igdb_id: 119171, metacritic: 96 },
  { title: "God of War", platform: "PC", year: 2022, genre: "Acción", developer: "Santa Monica Studio", itad_id: "god_of_war", igdb_id: 127526, metacritic: 94 },
  { title: "Helldivers 2", platform: "PC", year: 2024, genre: "Shooter", developer: "Arrowhead", itad_id: "helldivers_2", igdb_id: 126017, metacritic: 82 },
  { title: "Spider-Man Remastered", platform: "PC", year: 2022, genre: "Acción", developer: "Insomniac Games", itad_id: "marvels_spider_man_remastered", igdb_id: 230267, metacritic: 87 },
  { title: "EA Sports FC 25", platform: "PC", year: 2024, genre: "Deportes", developer: "EA Sports", itad_id: "ea_sports_fc_25", igdb_id: 303770, metacritic: 73 },
  { title: "Hogwarts Legacy", platform: "PC", year: 2023, genre: "RPG", developer: "Avalanche Software", itad_id: "hogwarts_legacy", igdb_id: 119834, metacritic: 84 },
  { title: "Alan Wake 2", platform: "PC", year: 2023, genre: "Terror", developer: "Remedy Entertainment", itad_id: "alan_wake_2", igdb_id: 89118, metacritic: 89 },
  { title: "Hades II", platform: "PC", year: 2024, genre: "Roguelike", developer: "Supergiant Games", itad_id: "hades_ii", igdb_id: 289354, metacritic: 93 },
  { title: "Dave the Diver", platform: "PC", year: 2023, genre: "Aventura", developer: "Mintrocket", itad_id: "dave_the_diver", igdb_id: 222337, metacritic: 89 },
];

export const RETRO_GAMES = [
  // ---- GBA ----
  {
    title: "Golden Sun", platform: "GBA", year: 2001, genre: "RPG", developer: "Camelot Software Planning",
    igdb_id: 3250, metacritic: 91,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=golden+sun+gba",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=golden+sun+gba",
    estimated_price: "25-45€",
    curiosities: [
      "Fue desarrollado por el mismo equipo que creó Mario Golf y Mario Tennis",
      "Usa un sistema de Psynergy (magia elemental) con más de 70 hechizos diferentes",
      "Se vendieron más de 2 millones de copias solo en Europa y América",
      "La música fue compuesta por Motoi Sakuraba, conocido también por las sagas Star Ocean y Dark Souls"
    ]
  },
  {
    title: "Pokémon FireRed", platform: "GBA", year: 2004, genre: "RPG", developer: "Game Freak",
    igdb_id: 5413, metacritic: 82,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=pokemon+firered+gba",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=pokemon+firered+gba",
    estimated_price: "30-60€"
  },
  {
    title: "Metroid Fusion", platform: "GBA", year: 2002, genre: "Metroidvania", developer: "Nintendo R&D1",
    igdb_id: 3236, metacritic: 92,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=metroid+fusion+gba",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=metroid+fusion+gba",
    estimated_price: "35-70€"
  },
  {
    title: "Castlevania: Aria of Sorrow", platform: "GBA", year: 2003, genre: "Metroidvania", developer: "Konami",
    igdb_id: 3236, metacritic: 91,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=castlevania+aria+of+sorrow+gba",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=castlevania+aria+sorrow",
    estimated_price: "40-80€"
  },
  // ---- SNES ----
  {
    title: "Chrono Trigger", platform: "SNES", year: 1995, genre: "RPG", developer: "Square",
    igdb_id: 398, metacritic: 99,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=chrono+trigger+snes",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=chrono+trigger+snes",
    estimated_price: "80-180€",
    curiosities: [
      "Fue creado por el 'Dream Team' de Square: Hironobu Sakaguchi (FF), Yuji Horii (Dragon Quest) y Akira Toriyama (Dragon Ball)",
      "Tiene 13 finales diferentes según las decisiones tomadas",
      "La banda sonora tiene más de 60 temas compuestos por Yasunori Mitsuda y Nobuo Uematsu",
      "El juego fue completado en menos de un año, un récord para su época"
    ]
  },
  {
    title: "Super Metroid", platform: "SNES", year: 1994, genre: "Metroidvania", developer: "Nintendo R&D1",
    igdb_id: 1187, metacritic: 96,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=super+metroid+snes",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=super+metroid+snes",
    estimated_price: "60-130€"
  },
  {
    title: "The Legend of Zelda: A Link to the Past", platform: "SNES", year: 1991, genre: "Aventura", developer: "Nintendo",
    igdb_id: 2155, metacritic: 95,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=zelda+link+to+the+past+snes",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=zelda+link+past+snes",
    estimated_price: "50-110€"
  },
  {
    title: "Final Fantasy VI", platform: "SNES", year: 1994, genre: "RPG", developer: "Square",
    igdb_id: 1066, metacritic: 92,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=final+fantasy+vi+snes",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=final+fantasy+6+snes",
    estimated_price: "70-150€"
  },
  // ---- PS1 ----
  {
    title: "Final Fantasy VII", platform: "PS1", year: 1997, genre: "RPG", developer: "Square",
    igdb_id: 1074, metacritic: 92,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=final+fantasy+vii+ps1",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=final+fantasy+7+psx",
    estimated_price: "15-35€",
    curiosities: [
      "El personaje de Aerith fue el primero en la historia de los RPGs en morir permanentemente de forma narrativa",
      "Se vendieron más de 13 millones de copias, siendo el FF más vendido hasta ese momento",
      "El equipo de desarrollo tuvo que aprender programación 3D desde cero para el proyecto"
    ]
  },
  {
    title: "Metal Gear Solid", platform: "PS1", year: 1998, genre: "Sigilo", developer: "Konami",
    igdb_id: 1784, metacritic: 94,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=metal+gear+solid+ps1",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=metal+gear+solid+psx",
    estimated_price: "15-30€"
  },
  {
    title: "Castlevania: Symphony of the Night", platform: "PS1", year: 1997, genre: "Metroidvania", developer: "Konami",
    igdb_id: 1070, metacritic: 93,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=castlevania+symphony+of+the+night+ps1",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=castlevania+symphony+night",
    estimated_price: "30-80€"
  },
  // ---- N64 ----
  {
    title: "The Legend of Zelda: Ocarina of Time", platform: "N64", year: 1998, genre: "Aventura", developer: "Nintendo",
    igdb_id: 1025, metacritic: 99,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=zelda+ocarina+of+time+n64",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=zelda+ocarina+n64",
    estimated_price: "25-60€",
    curiosities: [
      "Fue el primer juego en recibir una puntuación perfecta de Metacritic y Famitsu simultáneamente",
      "Introdujo el sistema Z-targeting (apuntado automático) que se convirtió en estándar de la industria",
      "El sistema de música ocarina tiene 12 canciones aprendibles que afectan al mundo del juego"
    ]
  },
  {
    title: "GoldenEye 007", platform: "N64", year: 1997, genre: "FPS", developer: "Rare",
    igdb_id: 1638, metacritic: 96,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=goldeneye+007+n64",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=goldeneye+n64",
    estimated_price: "20-50€"
  },
  {
    title: "Banjo-Kazooie", platform: "N64", year: 1998, genre: "Plataformas", developer: "Rare",
    igdb_id: 1628, metacritic: 92,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=banjo+kazooie+n64",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=banjo+kazooie+n64",
    estimated_price: "20-55€"
  },
  // ---- Mega Drive ----
  {
    title: "Sonic the Hedgehog 2", platform: "Mega Drive", year: 1992, genre: "Plataformas", developer: "Sega",
    igdb_id: 2605, metacritic: 90,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=sonic+2+mega+drive",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=sonic+2+mega+drive",
    estimated_price: "10-25€"
  },
  {
    title: "Streets of Rage 2", platform: "Mega Drive", year: 1992, genre: "Beat em up", developer: "Sega",
    igdb_id: 2607, metacritic: 89,
    ebay_url: "https://www.ebay.es/sch/i.html?_nkw=streets+of+rage+2+mega+drive",
    wallapop_url: "https://es.wallapop.com/app/search?keywords=streets+rage+2+megadrive",
    estimated_price: "15-35€"
  },
];

// Lista de juegos para el "Juego del Día"
export const GAME_OF_DAY_POOL = [
  ...RETRO_GAMES,
  ...MODERN_GAMES.filter(g => g.metacritic >= 88),
];

// Función que determina el juego del día según la fecha (determinístico)
export function getGameOfDayByDate(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % GAME_OF_DAY_POOL.length;
  return GAME_OF_DAY_POOL[index];
}
