"use client";
import { useState, useEffect } from "react";

function getProgress() {
  if (typeof window === "undefined") return { coins: 0, skins: ["default"], active: "default" };
  try { return JSON.parse(localStorage.getItem("pzg_progress")) || { coins: 0, skins: ["default"], active: "default" }; }
  catch { return { coins: 0, skins: ["default"], active: "default" }; }
}
function saveProgress(p) { localStorage.setItem("pzg_progress", JSON.stringify(p)); }

const DIFF_COLOR = { easy: "#22c55e", medium: "#f59e0b", hard: "#ef4444" };

export default function DailyRiddle() {
  const [riddle, setRiddle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [phase, setPhase] = useState("input"); // input | correct | wrong | already
  const [showHint, setShowHint] = useState(false);
  const [totalCoins, setTotalCoins] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setTotalCoins(getProgress().coins);
    if (localStorage.getItem("pzg_riddle_" + today)) setPhase("already");

    fetch("/api/riddle")
      .then(r => r.json())
      .then(d => { setRiddle(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim() || !riddle || phase === "correct") return;

    const res = await fetch("/api/riddle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ riddleId: riddle.id, answer: answer.trim() }),
    });
    const data = await res.json();

    if (data.correct) {
      setPhase("correct");
      localStorage.setItem("pzg_riddle_" + today, "1");
      const p = getProgress();
      p.coins = (p.coins || 0) + 20;
      saveProgress(p);
      setTotalCoins(p.coins);
    } else {
      setPhase("wrong");
      setTimeout(() => setPhase("input"), 1500);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "3rem", textAlign: "center", color: "#334155", fontFamily: "DM Sans,sans-serif" }}>
        Loading today's riddle...
      </div>
    );
  }

  if (!riddle) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "3rem", textAlign: "center", color: "#334155", fontFamily: "DM Sans,sans-serif" }}>
        Could not load riddle — try again later.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ background: "#0d1117", border: "1px solid rgba(var(--ar),.2)", borderRadius: 12, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: ".6rem 1rem", background: "rgba(var(--ar),.08)", borderBottom: "1px solid rgba(var(--ar),.15)", display: "flex", alignItems: "center", gap: 8 }}>
          <span>🧩</span>
          <span style={{ fontFamily: "Rajdhani,sans-serif", fontSize: ".85rem", fontWeight: 600, color: "var(--a)", textTransform: "uppercase", letterSpacing: ".05em" }}>
            Daily Riddle
          </span>
          {riddle.difficulty && (
            <span style={{ marginLeft: "auto", fontSize: ".72rem", color: DIFF_COLOR[riddle.difficulty] || "#f59e0b", background: `${DIFF_COLOR[riddle.difficulty] || "#f59e0b"}18`, padding: "2px 8px", borderRadius: 9, fontFamily: "DM Sans,sans-serif" }}>
              {riddle.difficulty}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem 1.25rem" }}>
          <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.75, marginBottom: "1.25rem", fontStyle: "italic", fontFamily: "DM Sans,sans-serif" }}>
            "{riddle.riddle}"
          </p>

          {phase === "already" && (
            <div style={{ background: "rgba(var(--ar),.06)", border: "1px solid rgba(var(--ar),.2)", borderRadius: 9, padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>✅</div>
              <div style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--a)" }}>Already solved today!</div>
              <div style={{ color: "#475569", fontSize: ".82rem", marginTop: 4, fontFamily: "DM Sans,sans-serif" }}>Come back tomorrow for a new riddle.</div>
            </div>
          )}

          {phase !== "already" && (
            <>
              {showHint && (
                <div style={{ background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.2)", borderRadius: 8, padding: ".75rem 1rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: ".72rem", color: "#f59e0b", fontWeight: 600, marginRight: 8, fontFamily: "Rajdhani,sans-serif" }}>HINT</span>
                  <span style={{ color: "#94a3b8", fontSize: ".85rem", fontFamily: "DM Sans,sans-serif" }}>{riddle.hint}</span>
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Your answer..."
                  disabled={phase === "correct"}
                  style={{ flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${phase === "wrong" ? "rgba(239,68,68,.5)" : "rgba(255,255,255,.08)"}`, borderRadius: 7, padding: "8px 12px", color: "#e2e8f0", fontSize: ".9rem", outline: "none", fontFamily: "DM Sans,sans-serif", transition: "border-color .15s" }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={phase === "correct" || !answer.trim()}
                  style={{ background: "rgba(var(--ar),.15)", border: "1px solid rgba(var(--ar),.3)", color: "var(--a)", padding: "8px 20px", borderRadius: 7, cursor: phase === "correct" || !answer.trim() ? "default" : "pointer", fontFamily: "DM Sans,sans-serif", fontWeight: 500, whiteSpace: "nowrap", opacity: (!answer.trim() || phase === "correct") ? .5 : 1 }}
                >
                  Submit →
                </button>
              </div>

              {!showHint && phase !== "correct" && (
                <button
                  onClick={() => setShowHint(true)}
                  style={{ background: "none", border: "none", color: "#334155", fontSize: ".78rem", cursor: "pointer", padding: "4px 0", fontFamily: "DM Sans,sans-serif" }}
                >
                  💡 Show hint
                </button>
              )}

              {phase === "correct" && (
                <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)", borderRadius: 9, padding: "1rem", textAlign: "center", marginTop: 12 }}>
                  <div style={{ fontSize: "2rem", marginBottom: ".25rem" }}>🎉</div>
                  <div style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#22c55e" }}>Correct! +20 coins</div>
                  <div style={{ color: "#475569", fontSize: ".82rem", marginTop: 4, fontFamily: "DM Sans,sans-serif" }}>See you tomorrow for a new riddle!</div>
                </div>
              )}

              {phase === "wrong" && (
                <div style={{ color: "#ef4444", fontSize: ".82rem", marginTop: 8, fontFamily: "DM Sans,sans-serif" }}>❌ Not quite — try again!</div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: ".75rem 1.25rem", borderTop: "1px solid rgba(255,255,255,.04)", display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,.2)" }}>
          <span style={{ fontSize: ".75rem", color: "#334155", fontFamily: "DM Sans,sans-serif" }}>Solve to earn</span>
          <span style={{ fontFamily: "Rajdhani,sans-serif", color: "#f59e0b", fontWeight: 700, fontSize: ".9rem" }}>🪙 20 coins</span>
          <span style={{ marginLeft: "auto", fontSize: ".75rem", color: "#475569", fontFamily: "DM Sans,sans-serif" }}>
            Your coins: <strong style={{ color: "#f59e0b" }}>{totalCoins}</strong>
          </span>
        </div>
      </div>

      <div style={{ marginTop: "1rem", padding: ".75rem 1rem", background: "rgba(255,255,255,.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,.04)", fontSize: ".75rem", color: "#1e293b", fontFamily: "DM Sans,sans-serif" }}>
        Coins earned here and in the Emoji Quiz can be spent in the 🎯 Play tab to unlock interface skins.
      </div>
    </div>
  );
}
