// Portada MARKETING DIGITAL INMOBILIARIO (MDI). Spec: marcas/marketing-digital-inmobiliario/estilo.md → Portada.
// Lato blanco alineado a la izquierda con sombra dura, degradé de la foto a verde agua sólido abajo,
// flecha blanca, línea fina separadora, ícono globo-corazón + bajada.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Lato";

const LATO = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] }).fontFamily;
export const MDI_TEAL = "#69D5BE"; // verde agua de las portadas (≈ #6AD5B7)
const SHADOW = "5px 6px 0 rgba(0,0,0,0.28), 6px 8px 10px rgba(0,0,0,0.25)";

export type CoverMDIProps = {
  bg: string; // foto en public/
  bgTop?: number; // desplazamiento vertical de la foto (cara alta)
  kicker?: string[]; // ej. ["CHARLA", "ONLINE"] (opcional, con flecha diagonal arriba)
  kickerTop?: number;
  kickerLeft?: number;
  title: string[]; // líneas del titular
  titleSize?: number;
  titleTop?: number;
  arrow?: { x: number; y: number; dir: "left" | "downright" };
  sub: string[]; // bajada al lado del ícono
  subSize?: number;
  subLeft?: number;
};

// flecha de bloque blanca
const Arrow: React.FC<{ x: number; y: number; dir: "left" | "downright" }> = ({ x, y, dir }) => (
  <svg width={160} height={130} viewBox="0 0 160 130" style={{ position: "absolute", left: x, top: y, transform: dir === "downright" ? "rotate(-125deg)" : undefined, filter: "drop-shadow(4px 5px 0 rgba(0,0,0,0.2))" }}>
    <path d="M0 65 L62 0 L62 38 L156 38 L156 92 L62 92 L62 130 Z" fill="#fff" />
  </svg>
);

// globo de diálogo con corazón (outline blanco)
const HeartBubble: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 1.08} viewBox="0 0 100 108" style={{ flexShrink: 0 }}>
    <path d="M50 6 C24 6 6 22 6 44 C6 64 22 80 44 82 L46 100 L58 81 C78 77 94 62 94 44 C94 22 76 6 50 6 Z" fill="none" stroke="#fff" strokeWidth={4.5} strokeLinejoin="round" />
    <path d="M50 64 C40 55 32 49 32 40 C32 34 37 30 42 30 C46 30 49 33 50 36 C51 33 54 30 58 30 C63 30 68 34 68 40 C68 49 60 55 50 64 Z" fill="#fff" />
  </svg>
);

export const CoverMDI: React.FC<CoverMDIProps> = ({
  bg, bgTop = 0, kicker, kickerTop, kickerLeft = 316, title, titleSize = 190, titleTop = 800, arrow, sub, subSize = 64, subLeft = 350,
}) => {
  const titleBottom = titleTop + title.length * titleSize * 0.86 + titleSize * 0.14;
  return (
    <AbsoluteFill style={{ background: MDI_TEAL, overflow: "hidden" }}>
      <Img src={staticFile(bg)} style={{ position: "absolute", left: 0, top: bgTop, width: 1080, height: 1920, objectFit: "cover" }} />
      {/* degradé: foto → velo azulado → verde agua sólido */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 0%, transparent 42%, rgba(70,120,150,0.35) 54%, rgba(78,136,157,0.75) 60%, rgba(105,197,191,0.95) 68%, ${MDI_TEAL} 73%, ${MDI_TEAL} 100%)` }} />
      {arrow && <Arrow {...arrow} />}
      {kicker && (
        <div style={{ position: "absolute", left: kickerLeft, top: kickerTop ?? titleTop - 300, fontFamily: LATO, fontWeight: 700, fontSize: 82, lineHeight: 1.08, color: "#fff", textShadow: SHADOW }}>
          {kicker.map((k) => <div key={k}>{k}</div>)}
        </div>
      )}
      <div style={{ position: "absolute", left: 110, right: 60, top: titleTop, fontFamily: LATO, fontWeight: 700, fontSize: titleSize, lineHeight: 0.86, letterSpacing: -2, color: "#fff", textShadow: SHADOW }}>
        {title.map((l, i) => <div key={i} style={{ whiteSpace: "nowrap" }}>{l}</div>)}
      </div>
      <div style={{ position: "absolute", left: 105, width: 690, top: titleBottom + 60, height: 3, background: "#fff" }} />
      <div style={{ position: "absolute", left: subLeft, right: 70, top: titleBottom + 110, display: "flex", gap: 46, alignItems: "flex-start" }}>
        <HeartBubble size={100} />
        <div style={{ fontFamily: LATO, fontWeight: 700, fontSize: subSize, lineHeight: 1.02, color: "#fff" }}>
          {sub.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Portada de este reel
export const CoverMDIEjemplo: React.FC = () => (
  <CoverMDI
    bg="img/cover-bg.jpg"
    bgTop={-230}
    kicker={["CHARLA", "ONLINE"]}
    kickerTop={640}
    kickerLeft={300}
    arrow={{ x: 120, y: 590, dir: "downright" }}
    titleTop={850}
    titleSize={168}
    title={["¿Tu", "WhatsApp", "es un CAOS?"]}
    sub={["Jueves 15/10", "17 hs · gratis"]}
  />
);
