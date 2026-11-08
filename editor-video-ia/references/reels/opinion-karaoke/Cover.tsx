// Portada — ángulo OPINIÓN (fucsia). Specs en marcas/daniela-werkalec/estilo.md → Portadas.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ANTON, ARIMO, BREATHING, F, MONT, useLocalFonts, W } from "./kit";

const ANTON_SHADOW = "0 -14px 26px rgba(0,0,0,0.9), 0 16px 28px rgba(0,0,0,0.95), 0 6px 0 rgba(0,0,0,0.35)";
const shadow3D = "0 6px 0 rgba(0,0,0,0.35), 0 14px 24px rgba(0,0,0,0.75), 0 -4px 14px rgba(0,0,0,0.4)";

export const Cover: React.FC = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: "#0B0A10", overflow: "hidden" }}>
      <Img src={staticFile("img/cover-bg.jpg")} style={{ position: "absolute", left: -60, top: -260, width: 1200, height: 2260, objectFit: "cover", filter: "brightness(0.66) contrast(1.05)" }} />
      <AbsoluteFill style={{ background: "rgba(11,10,16,0.12)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 0%, transparent 30%, rgba(11,10,16,0.62) 38%, rgba(11,10,16,0.72) 50%, rgba(11,10,16,0.72) 66%, rgba(11,10,16,0.4) 80%, transparent 94%)" }} />
      <div style={{ position: "absolute", top: 730, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontFamily: BREATHING, fontSize: 104, lineHeight: 1, color: W, textShadow: shadow3D, position: "relative", zIndex: 1 }}>
          <span style={{ color: F }}>Hoy:</span> modelo 2027
        </div>
        <div style={{ fontFamily: ANTON, color: W, textShadow: ANTON_SHADOW, marginTop: -22, position: "relative", zIndex: 2 }}>
          <div style={{ whiteSpace: "nowrap", fontSize: 157, lineHeight: 0.98 }}>
            <span style={{ color: F }}>TU</span> INMOBILIARIA
          </div>
        </div>
        <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 52, letterSpacing: -2, lineHeight: 1.05, whiteSpace: "nowrap", color: W, textShadow: shadow3D, marginTop: 2, position: "relative", zIndex: 1 }}>
          no necesita <span style={{ color: F }}>empleados</span>
        </div>
        <div style={{ fontFamily: ARIMO, fontSize: 34, color: W, border: `1.5px solid ${W}`, padding: "12px 28px", marginTop: 30 }}>
          Necesitás otro sistema
        </div>
      </div>
      <Img src={staticFile("img/voz-fucsia.png")} style={{ position: "absolute", left: 198.8, top: 1289.8, width: 163.8, height: 134.1, objectFit: "contain" }} />
      <div style={{ position: "absolute", top: 1484, left: 0, right: 0, textAlign: "center", fontFamily: ARIMO, fontWeight: 400, fontSize: 32, color: W, letterSpacing: 1 }}>
        danielawerkalec.com.ar
      </div>
    </AbsoluteFill>
  );
};
