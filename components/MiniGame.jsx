"use client";
import { useState, useEffect } from "react";

const QUIZ_QUESTIONS = [
  { emojis: "🕷️🦸‍♂️🌆🕸️", answer: "Spider-Man", options: ["Batman", "Spider-Man", "Daredevil", "Venom"] },
  { emojis: "🧙‍♂️🐉⚔️🎲", answer: "Baldur's Gate 3", options: ["Dragon Age: Origins", "Baldur's Gate 3", "Neverwinter Nights", "Divinity: Original Sin"] },
  { emojis: "🍄⭐🔴👨", answer: "Super Mario Bros", options: ["Kirby", "Super Mario Bros", "Donkey Kong", "Wario Land"] },
  { emojis: "🌊🐟🤿🔱", answer: "Dave the Diver", options: ["Subnautica", "Dave the Diver", "Abzû", "Sea of Thieves"] },
  { emojis: "🐮🤠🌵🔫", answer: "Red Dead Redemption 2", options: ["Call of Juarez", "Red Dead Redemption 2", "Gun", "Outlaws of the Old West"] },
  { emojis: "🤖🪲💥🌍", answer: "Helldivers 2", options: ["Starship Troopers", "Helldivers 2", "Earth Defense Force", "Destiny 2"] },
  { emojis: "🎩🍸🔫🕵️", answer: "GoldenEye 007", options: ["Hitman", "GoldenEye 007", "Spy Hunter", "Splinter Cell"] },
  { emojis: "🕰️⏰🔄🗡️", answer: "Chrono Trigger", options: ["Chrono Trigger", "Final Fantasy VI", "Earthbound", "Secret of Mana"] },
  { emojis: "🦅❄️🏔️🐉", answer: "Skyrim", options: ["Skyrim", "Dragon Age: Inquisition", "Kingdom Come: Deliverance", "Gothic"] },
  { emojis: "🐻🎵🗝️🥚", answer: "Banjo-Kazooie", options: ["Crash Bandicoot", "Banjo-Kazooie", "Spyro the Dragon", "Conker's Bad Fur Day"] },
  { emojis: "🦸‍♀️🔫👽🌌", answer: "Metroid", options: ["Halo", "Metroid", "Doom", "Alien: Isolation"] },
  { emojis: "⚙️🌃🦾💊", answer: "Cyberpunk 2077", options: ["Deus Ex", "Cyberpunk 2077", "Observer", "Ghostrunner"] },
  { emojis: "😤💀🔥👊", answer: "Hades II", options: ["Hades II", "Dead Cells", "Rogue Legacy 2", "Returnal"] },
  { emojis: "🦇🧛🏰🕯️", answer: "Castlevania: SOTN", options: ["Bloodborne", "Castlevania: SOTN", "Hollow Knight", "Blasphemous"] },
  { emojis: "🌿🔮⚡🌀", answer: "Golden Sun", options: ["Final Fantasy", "Golden Sun", "Fire Emblem", "Tactics Ogre"] },
  { emojis: "🏰📚🦉🪄", answer: "Hogwarts Legacy", options: ["Hogwarts Legacy", "The Witcher 3", "Dragon Age: Origins", "Fable"] },
  { emojis: "💡🔦✍️😱", answer: "Alan Wake 2", options: ["Control", "Alan Wake 2", "Silent Hill 2", "Outlast"] },
  { emojis: "🌙⛩️🗡️🩸", answer: "Elden Ring", options: ["Dark Souls 3", "Elden Ring", "Sekiro", "Bloodborne"] },
  { emojis: "🐍🚬📦🔕", answer: "Metal Gear Solid", options: ["Splinter Cell", "Metal Gear Solid", "Hitman", "Deus Ex"] },
  { emojis: "⚡🪓🌊🔱", answer: "God of War", options: ["Hades", "God of War", "Titan Quest", "Assassin's Creed Odyssey"] },
  { emojis: "🎸🤘🎵🎤", answer: "Guitar Hero", options: ["Rock Band", "Guitar Hero", "Amplitude", "Dance Dance Revolution"] },
  { emojis: "🧟💊🚗🌆", answer: "Resident Evil 2", options: ["The Last of Us", "Resident Evil 2", "Dead Island", "Days Gone"] },
  { emojis: "🏎️💨🛞🏁", answer: "Mario Kart", options: ["F-Zero", "Mario Kart", "Crash Team Racing", "Burnout"] },
  { emojis: "🚀👾🪐💾", answer: "Star Fox 64", options: ["Star Fox 64", "Metroid Prime", "Rogue Squadron", "R-Type Final"] },
  { emojis: "🧩🍬🔵🟡", answer: "Pac-Man", options: ["Bubble Bobble", "Pac-Man", "Frogger", "Space Invaders"] },
];

const SKINS = [
  { id: "default", name: "Deep Space", cost: 0,   accent: "#00c2a8", preview: "🌌" },
  { id: "neon",    name: "Neon Arcade", cost: 50,  accent: "#ff0080", preview: "🌸" },
  { id: "retro",   name: "CRT Green",   cost: 100, accent: "#00ff41", preview: "💚" },
  { id: "ocean",   name: "Ocean Deep",  cost: 150, accent: "#38bdf8", preview: "🌊" },
  { id: "gold",    name: "Gold Rush",   cost: 200, accent: "#f59e0b", preview: "🌟" },
  { id: "violet",  name: "Cyber Violet",cost: 250, accent: "#a855f7", preview: "💜" },
];

function getProgress() {
  if (typeof window === "undefined") return { coins: 0, skins: ["default"], active: "default" };
  try { return JSON.parse(localStorage.getItem("pzg_progress")) || { coins: 0, skins: ["default"], active: "default" }; }
  catch { return { coins: 0, skins: ["default"], active: "default" }; }
}
function saveProgress(p) {
  localStorage.setItem("pzg_progress", JSON.stringify(p));
  document.documentElement.setAttribute("data-skin", p.active);
}
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function MiniGame() {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 10));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("playing"); // playing | shop | done
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [progress, setProgress] = useState({ coins: 0, skins: ["default"], active: "default" });

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    document.documentElement.setAttribute("data-skin", p.active);
  }, []);

  const handleAnswer = (option) => {
    if (selected !== null) return;
    setSelected(option);

    const isCorrect = option === questions[current].answer;
    const newStreak = isCorrect ? streak + 1 : 0;
    const earned = isCorrect ? (10 + (newStreak >= 3 ? 5 : 0)) : 0;
    const newSessionCoins = sessionCoins + earned;

    setStreak(newStreak);
    if (isCorrect) setCorrect(c => c + 1);
    setSessionCoins(newSessionCoins);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        const p = getProgress();
        p.coins = (p.coins || 0) + newSessionCoins;
        saveProgress(p);
        setProgress({ ...p });
        setPhase("done");
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 1200);
  };

  const handleBuySkin = (skin) => {
    const p = getProgress();
    if ((p.coins || 0) < skin.cost) return;
    p.coins -= skin.cost;
    if (!p.skins) p.skins = ["default"];
    if (!p.skins.includes(skin.id)) p.skins.push(skin.id);
    saveProgress(p);
    setProgress({ ...p });
  };

  const handleEquipSkin = (skin) => {
    const p = getProgress();
    p.active = skin.id;
    saveProgress(p);
    setProgress({ ...p });
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setPhase("playing");
    setCorrect(0);
    setStreak(0);
    setSessionCoins(0);
  };

  // ---- SHOP ----
  if (phase === "shop") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ background: "#0d1117", border: "1px solid rgba(var(--ar),.2)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: ".65rem 1rem", background: "rgba(var(--ar),.08)", borderBottom: "1px solid rgba(var(--ar),.15)", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🎨</span>
            <span style={{ fontFamily: "Rajdhani,sans-serif", fontSize: ".85rem", fontWeight: 600, color: "var(--a)", textTransform: "uppercase", letterSpacing: ".05em" }}>Skin Shop</span>
            <span style={{ marginLeft: "auto", fontFamily: "Rajdhani,sans-serif", fontWeight: 700, color: "#f59e0b", fontSize: ".95rem" }}>🪙 {progress.coins}</span>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: ".75rem" }}>
              {SKINS.map(skin => {
                const owned = (progress.skins || ["default"]).includes(skin.id);
                const active = progress.active === skin.id;
                const canAfford = (progress.coins || 0) >= skin.cost;
                return (
                  <div key={skin.id} style={{ background: "#0f1420", border: `1px solid ${active ? skin.accent : "rgba(255,255,255,.06)"}`, borderRadius: 10, padding: "1rem", textAlign: "center", transition: "all .2s" }}>
                    <div style={{ fontSize: "2rem", marginBottom: 6 }}>{skin.preview}</div>
                    <div style={{ width: 28, height: 4, background: skin.accent, borderRadius: 2, margin: "0 auto 8px" }} />
                    <div style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 600, color: active ? skin.accent : "#f1f5f9", fontSize: ".88rem", marginBottom: 10 }}>{skin.name}</div>
                    {skin.cost === 0 || owned ? (
                      <button onClick={() => handleEquipSkin(skin)}
                        style={{ width: "100%", background: active ? `${skin.accent}22` : "rgba(255,255,255,.04)", border: `1px solid ${active ? skin.accent : "rgba(255,255,255,.08)"}`, color: active ? skin.accent : "#64748b", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: ".75rem", fontFamily: "DM Sans,sans-serif" }}>
                        {active ? "✓ Active" : "Equip"}
                      </button>
                    ) : (
                      <button onClick={() => handleBuySkin(skin)} disabled={!canAfford}
                        style={{ width: "100%", background: canAfford ? "rgba(245,158,11,.1)" : "rgba(255,255,255,.03)", border: `1px solid ${canAfford ? "rgba(245,158,11,.3)" : "rgba(255,255,255,.05)"}`, color: canAfford ? "#f59e0b" : "#334155", padding: "5px 10px", borderRadius: 6, cursor: canAfford ? "pointer" : "not-allowed", fontSize: ".75rem", fontFamily: "DM Sans,sans-serif" }}>
                        🪙 {skin.cost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "1rem", fontSize: ".75rem", color: "#1e293b", fontFamily: "DM Sans,sans-serif", textAlign: "center" }}>
              Earn coins by playing the Emoji Quiz and solving the 🧩 Daily Riddle
            </div>
          </div>
          <div style={{ padding: ".75rem 1rem", borderTop: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
            <button onClick={() => setPhase(correct < questions.length ? "playing" : "done")}
              style={{ background: "none", border: "1px solid rgba(255,255,255,.08)", color: "#475569", padding: "6px 20px", borderRadius: 6, cursor: "pointer", fontSize: ".8rem", fontFamily: "DM Sans,sans-serif" }}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- DONE ----
  if (phase === "done") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ background: "#0d1117", border: "1px solid rgba(var(--ar),.2)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: ".75rem" }}>
              {correct === questions.length ? "🏆" : correct >= 7 ? "🥈" : correct >= 5 ? "🥉" : "🎮"}
            </div>
            <div style={{ fontFamily: "Rajdhani,sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>
              Round Complete!
            </div>
            <div style={{ color: "#475569", fontSize: ".9rem", marginBottom: "1.5rem", fontFamily: "DM Sans,sans-serif" }}>
              {correct} / {questions.length} correct &nbsp;·&nbsp;
              <span style={{ color: "#f59e0b" }}>+{sessionCoins} 🪙 earned</span>
            </div>
            <div style={{ fontFamily: "Rajdhani,sans-serif", fontSize: "1.25rem", color: "var(--a)", marginBottom: "1.5rem" }}>
              Total coins: {progress.coins}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleRestart}
                style={{ background: "rgba(var(--ar),.15)", border: "1px solid rgba(var(--ar),.3)", color: "var(--a)", padding: "9px 24px", borderRadius: 7, cursor: "pointer", fontFamily: "DM Sans,sans-serif", fontSize: ".9rem" }}>
                Play Again
              </button>
              <button onClick={() => setPhase("shop")}
                style={{ background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.25)", color: "#f59e0b", padding: "9px 24px", borderRadius: 7, cursor: "pointer", fontFamily: "DM Sans,sans-serif", fontSize: ".9rem" }}>
                🎨 Skin Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- PLAYING ----
  const q = questions[current];
  const isCorrectAnswer = selected === q?.answer;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ background: "#0d1117", border: "1px solid rgba(var(--ar),.2)", borderRadius: 12, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: ".65rem 1rem", background: "rgba(var(--ar),.08)", borderBottom: "1px solid rgba(var(--ar),.15)", display: "flex", alignItems: "center", gap: 8 }}>
          <span>🎯</span>
          <span style={{ fontFamily: "Rajdhani,sans-serif", fontSize: ".85rem", fontWeight: 600, color: "var(--a)", textTransform: "uppercase", letterSpacing: ".05em" }}>Emoji Quiz</span>
          <span style={{ fontSize: ".78rem", color: "#475569", fontFamily: "DM Sans,sans-serif" }}>{current + 1}/{questions.length}</span>
          <span style={{ marginLeft: "auto", fontFamily: "Rajdhani,sans-serif", fontWeight: 700, color: "#f59e0b", fontSize: ".9rem" }}>🪙 {progress.coins + sessionCoins}</span>
          <button onClick={() => setPhase("shop")}
            style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)", color: "#f59e0b", padding: "3px 10px", borderRadius: 5, cursor: "pointer", fontSize: ".72rem", fontFamily: "DM Sans,sans-serif" }}>
            Shop
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,.04)" }}>
          <div style={{ height: "100%", background: "var(--a)", width: `${(current / questions.length) * 100}%`, transition: "width .3s" }} />
        </div>

        {/* Streak banner */}
        {streak >= 2 && (
          <div style={{ padding: "4px 1rem", background: "rgba(245,158,11,.06)", borderBottom: "1px solid rgba(245,158,11,.1)", fontSize: ".75rem", color: "#f59e0b", textAlign: "center", fontFamily: "DM Sans,sans-serif" }}>
            🔥 {streak} in a row!{streak >= 3 ? " · +5 streak bonus" : ""}
          </div>
        )}

        {/* Question */}
        <div style={{ padding: "2rem 1.5rem 1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.8rem", letterSpacing: ".15em", marginBottom: "1.25rem" }}>{q.emojis}</div>
          <div style={{ color: "#475569", fontSize: ".78rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "DM Sans,sans-serif" }}>
            Which game do these emojis represent?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
            {q.options.map(option => {
              let bg = "rgba(255,255,255,.03)";
              let border = "rgba(255,255,255,.08)";
              let color = "#94a3b8";
              if (selected !== null) {
                if (option === q.answer) { bg = "rgba(34,197,94,.1)"; border = "rgba(34,197,94,.35)"; color = "#22c55e"; }
                else if (option === selected) { bg = "rgba(239,68,68,.08)"; border = "rgba(239,68,68,.3)"; color = "#ef4444"; }
              }
              return (
                <button key={option} onClick={() => handleAnswer(option)} disabled={selected !== null}
                  style={{ background: bg, border: `1px solid ${border}`, color, padding: ".7rem .6rem", borderRadius: 8, cursor: selected !== null ? "default" : "pointer", fontSize: ".82rem", fontFamily: "DM Sans,sans-serif", textAlign: "left", transition: "all .2s", lineHeight: 1.3 }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer feedback */}
        {selected !== null && (
          <div style={{ padding: ".75rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.04)", background: isCorrectAnswer ? "rgba(34,197,94,.04)" : "rgba(239,68,68,.04)" }}>
            <span style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "1rem", color: isCorrectAnswer ? "#22c55e" : "#ef4444" }}>
              {isCorrectAnswer
                ? `✓ Correct! +${10 + (streak >= 3 ? 5 : 0)} coins`
                : `✗ It was "${q.answer}"`}
            </span>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: ".75rem 1rem", borderTop: "1px solid rgba(255,255,255,.04)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,.2)" }}>
          <span style={{ fontSize: ".75rem", color: "#334155", fontFamily: "DM Sans,sans-serif" }}>Score: {correct}/{current + (selected !== null ? 1 : 0)}</span>
          <span style={{ fontSize: ".72rem", color: "#1e293b", fontFamily: "DM Sans,sans-serif" }}>10 coins · +5 on 3+ streak</span>
        </div>
      </div>
    </div>
  );
}
