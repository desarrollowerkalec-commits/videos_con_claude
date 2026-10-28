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

const AC = "#FF3131"; // ángulo: NOTICIAS / novedades (rojo)
const WH = "#FFFFFF";
const shadow3D = "0 6px 0 rgba(0,0,0,0.35), 0 14px 24px rgba(0,0,0,0.75), 0 -4px 14px rgba(0,0,0,0.4)";
// sombra del titular: fuerte arriba y abajo, cae sobre la línea de arriba y la de abajo (efecto 3D)
const ANTON_SHADOW = "0 -14px 26px rgba(0,0,0,0.9), 0 16px 28px rgba(0,0,0,0.95), 0 6px 0 rgba(0,0,0,0.35)";

// ícono del ángulo noticias: estrella (contorno, color del ángulo, fondo transparente)
const StarIcon: React.FC<{ c: string }> = ({ c }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style={{ filter: `drop-shadow(0 0 10px ${c}88)` }}>
    <path d="M12 2.6 L14.8 8.6 L21.3 9.3 L16.4 13.7 L17.8 20.1 L12 16.8 L6.2 20.1 L7.6 13.7 L2.7 9.3 L9.2 8.6 Z" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Cover: React.FC = () => (
  <AbsoluteFill style={{ background: "#0B0A10", overflow: "hidden" }}>
    {/* foto con la exposición BAJADA (no solo overlay) y la cara alta */}
    <Img src={staticFile("cover-bg.jpg")} style={{ position: "absolute", left: -30, top: -110, width: 1140, height: 2080, objectFit: "cover", filter: "brightness(0.68) contrast(1.05)" }} />
    <AbsoluteFill style={{ background: "rgba(11,10,16,0.12)" }} />
    {/* banda oscura suave detrás del texto, fundida arriba y abajo */}
    <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 0%, transparent 30%, rgba(11,10,16,0.62) 38%, rgba(11,10,16,0.72) 50%, rgba(11,10,16,0.72) 66%, rgba(11,10,16,0.4) 80%, transparent 94%)" }} />

    <div style={{ position: "absolute", top: 730, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      {/* 1 · script (BREATHING) */}
      <div style={{ fontFamily: SCRIPT, fontSize: 100, lineHeight: 1, color: WH, textShadow: shadow3D, position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>
        <span style={{ color: AC }}>Novedad</span> de hoy:
      </div>
      {/* 2 · titular ANTON, una línea borde a borde, pegado a las vecinas */}
      <div style={{ fontFamily: ANTON, color: WH, textShadow: ANTON_SHADOW, marginTop: -22, position: "relative", zIndex: 2, whiteSpace: "nowrap", fontSize: 121, lineHeight: 0.98, letterSpacing: -1 }}>
        VIDEOS DE <span style={{ color: AC }}>90 MINUTOS</span>
      </div>
      {/* 3 · bajada: una línea, 52 px, minúscula, sin punto final */}
      <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 52, letterSpacing: -2, lineHeight: 1.05, whiteSpace: "nowrap", color: WH, textShadow: shadow3D, marginTop: 2, position: "relative", zIndex: 1 }}>
        instagram quiere tu <span style={{ color: AC }}>tiempo</span>
      </div>
      {/* 4 · caja Arimo */}
      <div style={{ fontFamily: FINE, fontSize: 34, color: WH, border: `1.5px solid ${WH}`, padding: "12px 28px", marginTop: 30 }}>
        ¿Qué cambia para tu marca?
      </div>
    </div>

    {/* ícono del ángulo — posición y tamaño fijos */}
    <div style={{ position: "absolute", left: 198.8, top: 1289.8, width: 163.8, height: 134.1 }}>
      <StarIcon c={AC} />
    </div>
    <div style={{ position: "absolute", top: 1484, left: 0, right: 0, textAlign: "center", fontFamily: FINE, fontWeight: 400, fontSize: 32, letterSpacing: 1, color: WH }}>
      danielawerkalec.com.ar
    </div>
  </AbsoluteFill>
);
