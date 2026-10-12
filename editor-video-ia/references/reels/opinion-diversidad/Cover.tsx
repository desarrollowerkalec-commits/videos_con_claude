// Portada del reel — ángulo OPINIÓN (fucsia). Specs en marcas/daniela-werkalec/estilo.md → Portadas.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ANTON, ARIMO, BREATHING, F, MONT, useLocalFonts, W } from "./kit";

const Neq: React.FC<{ size: number }> = ({ size }) => (
  <svg width="0.5em" height="0.66em" viewBox="0 0 62 80" style={{ display: "inline-block", verticalAlign: "-0.06em", margin: "0 0.12em", overflow: "visible" }}>
    <line x1={4} y1={30} x2={58} y2={30} stroke={F} strokeWidth={10} />
    <line x1={4} y1={52} x2={58} y2={52} stroke={F} strokeWidth={10} />
    <line x1={46} y1={4} x2={16} y2={78} stroke={F} strokeWidth={10} />
  </svg>
);

// Sombra separadora horizontal (vector): banda difusa centrada entre líneas
const Sep: React.FC<{ top: number }> = ({ top }) => (
  <div style={{ width: 1080, height: 70, marginTop: top, marginBottom: top, background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.85), rgba(0,0,0,0.4) 55%, transparent 75%)" }} />
);

const shadow3D = "0 6px 0 rgba(0,0,0,0.35), 0 14px 24px rgba(0,0,0,0.75), 0 -4px 14px rgba(0,0,0,0.4)";

export const Cover: React.FC = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: "#0B0A10", overflow: "hidden" }}>
      {/* foto oscurecida, cara alta (reencuadre hacia arriba) */}
      <Img src={staticFile("img/cover-bg.jpg")} style={{ position: "absolute", left: -40, top: -190, width: 1160, height: 2140, objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "rgba(11,10,16,0.28)" }} />
      {/* banda oscura gruesa detrás del texto, fundida arriba y abajo */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 0%, transparent 28%, rgba(11,10,16,0.88) 37%, rgba(11,10,16,0.93) 72%, rgba(11,10,16,0.55) 84%, transparent 96%)" }} />

      <div style={{ position: "absolute", top: 720, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {/* 1 · Hoy: … (BREATHING) */}
        <div style={{ fontFamily: BREATHING, fontSize: 104, lineHeight: 1.25, color: W, textShadow: shadow3D }}>
          <span style={{ color: F }}>Hoy:</span> diversidad
        </div>
        <Sep top={-10} />
        {/* 2 · Titular ANTON una línea */}
        <div style={{ fontFamily: ANTON, color: W, textShadow: shadow3D, padding: "0 26px", marginTop: 6 }}>
          <div style={{ whiteSpace: "nowrap", fontSize: 133, lineHeight: 1 }}>
            TRADUCIR<Neq size={130} /><span style={{ color: F }}>ENTENDER</span>
          </div>
        </div>
        <Sep top={-14} />
        {/* 3 · Bajada Montserrat 800 */}
        <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 52, letterSpacing: -2, lineHeight: 1.18, color: W, textShadow: shadow3D, marginTop: 6 }}>
          La IA traduce el idioma.<br />
          <span style={{ color: F }}>Entender</span> lo pone la persona.
        </div>
        {/* 4 · Caja Arimo */}
        <div style={{ fontFamily: ARIMO, fontSize: 34, color: W, border: `1.5px solid ${W}`, padding: "12px 28px", marginTop: 34 }}>
          Lo que ninguna app te avisa
        </div>
      </div>

      {/* ícono del ángulo: posición y tamaño fijos */}
      <Img src={staticFile("img/voz-fucsia.png")} style={{ position: "absolute", left: 198.8, top: 1289.8, width: 163.8, height: 134.1, objectFit: "contain" }} />
      {/* URL */}
      <div style={{ position: "absolute", top: 1484, left: 0, right: 0, textAlign: "center", fontFamily: ARIMO, fontWeight: 400, fontSize: 32, color: W, letterSpacing: 1 }}>
        danielawerkalec.com.ar
      </div>
    </AbsoluteFill>
  );
};
