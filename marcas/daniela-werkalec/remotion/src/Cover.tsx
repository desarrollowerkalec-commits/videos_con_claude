import React from "react";
import { AbsoluteFill, Img, staticFile, delayRender, continueRender } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadArimo } from "@remotion/google-fonts/Arimo";

const { fontFamily: ANTON } = loadAnton("normal", { weights: ["400"], subsets: ["latin"] });
const { fontFamily: MONT } = loadMontserrat("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: FINE } = loadArimo("normal", { weights: ["400", "700"], subsets: ["latin"] });
const SCRIPT = "Breathing";

if (typeof document !== "undefined" && !document.getElementById("cover-fonts")) {
  const h = delayRender("cover-fonts");
  const s = document.createElement("style");
  s.id = "cover-fonts";
  s.textContent = `@font-face{font-family:"Breathing";src:url("${staticFile("fonts/Breathing.ttf")}") format("truetype");font-weight:400;font-display:block;}`;
  document.head.appendChild(s);
  (document as any).fonts.load('400 60px "Breathing"').then(() => continueRender(h)).catch(() => continueRender(h));
}

const AC = "#38B6FF"; // ángulo: vlog / personal (celeste)
const WH = "#FFFFFF";
const sh = "0 4px 22px rgba(0,0,0,.82)";

const HeartIcon: React.FC<{ c: string }> = ({ c }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 10px ${c}66)` }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const Cover: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Img src={staticFile("cover-bg.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "translateY(-150px) scale(1.1)", transformOrigin: "50% 0%", filter: "brightness(0.78) contrast(1.04)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.38) 0%, rgba(0,0,0,.12) 16%, rgba(0,0,0,.1) 80%, rgba(0,0,0,.42) 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 930, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.82) 17%, rgba(0,0,0,.84) 50%, rgba(0,0,0,.82) 82%, rgba(0,0,0,0) 100%)" }} />

    <div style={{ position: "absolute", left: 0, right: 0, top: 720, textAlign: "center" }}>
      <div style={{ fontFamily: SCRIPT, fontSize: 112, lineHeight: 0.9, textShadow: sh, marginBottom: -8 }}>
        <span style={{ color: AC }}>Este</span> <span style={{ color: WH }}>viernes:</span>
      </div>
      <div style={{ position: "absolute", left: 180, right: 180, top: 104, height: 110, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,.95) 0%, rgba(0,0,0,.45) 52%, rgba(0,0,0,0) 76%)", filter: "blur(12px)", zIndex: 0 }} />
      <div style={{ position: "absolute", left: 180, right: 180, top: 268, height: 110, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,.95) 0%, rgba(0,0,0,.45) 52%, rgba(0,0,0,0) 76%)", filter: "blur(12px)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, fontFamily: ANTON, fontSize: 136, lineHeight: 0.9, letterSpacing: -3, textTransform: "uppercase", whiteSpace: "nowrap", textShadow: `${sh}, 0 -16px 20px rgba(0,0,0,.8), 0 16px 20px rgba(0,0,0,.8)` }}>
        <span style={{ color: AC }}>¿La IA </span><span style={{ color: WH }}>discrimina?</span>
      </div>
      <div style={{ position: "relative", zIndex: 1, fontFamily: MONT, fontWeight: 800, fontSize: 62, lineHeight: 0.95, letterSpacing: -2.5, marginTop: 6, textShadow: sh }}>
        <span style={{ color: WH }}>Congreso Inmobiliario </span><span style={{ color: AC }}>Santa Fe</span>
      </div>
      <div style={{ marginTop: 50 }}>
        <div style={{ display: "inline-block", padding: "11px 26px", border: "1.5px solid rgba(255,255,255,.9)", borderRadius: 4 }}>
          <span style={{ fontFamily: FINE, fontSize: 32, letterSpacing: 1, color: WH }}>Mesa de IA · Vie 23/10 · Puerto Norte</span>
        </div>
      </div>
    </div>

    {/* ícono del ángulo (personal → corazón) — posición fija */}
    <div style={{ position: "absolute", left: 198.8, top: 1289.8, width: 150, height: 134.1 }}>
      <HeartIcon c={AC} />
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, textAlign: "center", fontFamily: FINE, fontWeight: 400, fontSize: 32, letterSpacing: 2, color: WH, textShadow: sh }}>
      www.danielawerkalec.com.ar
    </div>
  </AbsoluteFill>
);
