// Piezas base del reel "diversidad" — ángulo OPINIÓN (fucsia).
import React, { useEffect, useState } from "react";
import { continueRender, delayRender, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadRedHat } from "@remotion/google-fonts/RedHatDisplay";
import { loadFont as loadPT } from "@remotion/google-fonts/PTSerif";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadArimo } from "@remotion/google-fonts/Arimo";

export const MONT = loadMont("normal", { weights: ["600", "700", "800", "900"], subsets: ["latin"] }).fontFamily;
export const REDHAT = loadRedHat("normal", { weights: ["400", "700", "900"], subsets: ["latin"] }).fontFamily;
export const PT = loadPT("italic", { weights: ["400", "700"], subsets: ["latin"] }).fontFamily;
loadPT("normal", { weights: ["400", "700"], subsets: ["latin"] });
export const ANTON = loadAnton("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const ARIMO = loadArimo("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const TRUEFATE = "TrueFate";
export const BREATHING = "Breathing";

// Fuentes locales (True Fate = Neato Serif, BREATHING)
const LOCAL: [string, string][] = [
  [TRUEFATE, "fonts/NeatoSerif-Regular.ttf"],
  [BREATHING, "fonts/Breathing.ttf"],
];
export const useLocalFonts = () => {
  const [h] = useState(() => delayRender("fuentes locales"));
  useEffect(() => {
    Promise.all(
      LOCAL.map(([n, f]) => {
        const ff = new FontFace(n, `url(${staticFile(f)})`);
        return ff.load().then((x) => document.fonts.add(x));
      }),
    ).then(() => continueRender(h));
  }, [h]);
};

export const F = "#CB6CE6"; // fucsia = ángulo opinión
export const Y = "#FFCC00"; // amarillo principal
export const W = "#FFFFFF";
export const BG = "#0B0A10";
export const glow = (c: string, s = 1) => `0 0 ${10 * s}px ${c}, 0 0 ${26 * s}px ${c}AA`;
export const svgGlow = (c: string, s = 1) => `drop-shadow(0 0 ${6 * s}px ${c}) drop-shadow(0 0 ${16 * s}px ${c}99)`;

export const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};
const OUT = Easing.out(Easing.cubic);
export const prog = (t: number, at: number, dur = 0.4) =>
  interpolate(t, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: OUT });
export const pop = (t: number, at: number, dur = 0.45) =>
  interpolate(t, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2.2)) });
export const win = (t: number, from: number, to: number, fi = 0.35, fo = 0.3) =>
  Math.min(prog(t, from, fi), 1 - prog(t, to - fo, fo));

// Entrada genérica de un elemento: fade + subida + leve escala
export const In: React.FC<{ at: number; dy?: number; dx?: number; s0?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at, dy = 26, dx = 0, s0 = 0.92, style, children,
}) => {
  const t = useT();
  const p = prog(t, at, 0.42);
  return (
    <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${s0 + (1 - s0) * p})`, ...style }}>
      {children}
    </div>
  );
};

// Zona inferior (debajo de los subtítulos quemados, sobre el torso): tarjeta de vidrio oscuro
export const DOCK = { left: 60, top: 1080, width: 880, height: 420 }; // dentro de la zona segura IG (≤ y 1500, ≤ x 940)
export const Dock: React.FC<{ from: number; to: number; kicker?: string; bare?: boolean; children: React.ReactNode }> = ({
  from, to, kicker, bare, children,
}) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.05) return null;
  const o = win(t, from, to);
  const enter = prog(t, from, 0.45);
  return (
    <div
      style={{
        position: "absolute", ...DOCK, opacity: o,
        transform: `translateY(${(1 - enter) * 60}px) scale(${0.96 + 0.04 * enter})`,
        borderRadius: 38,
        background: bare ? "transparent" : "linear-gradient(180deg, rgba(11,10,16,0.80), rgba(11,10,16,0.90))",
        border: bare ? "none" : `2px solid ${F}B0`,
        boxShadow: bare ? "none" : `0 0 30px ${F}55, inset 0 0 40px ${F}18, 0 30px 60px rgba(0,0,0,0.5)`,
        backdropFilter: bare ? undefined : "blur(8px)",
        overflow: "hidden",
      }}
    >
      {!bare && <GridLines />}
      {kicker && <Kicker t={t} at={from + 0.1}>{kicker}</Kicker>}
      {children}
    </div>
  );
};

const GridLines = () => (
  <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
    {Array.from({ length: 13 }).map((_, i) => (
      <line key={"v" + i} x1={i * 80} y1={0} x2={i * 80} y2={450} stroke={F} strokeWidth={1} />
    ))}
    {Array.from({ length: 7 }).map((_, i) => (
      <line key={"h" + i} x1={0} y1={i * 80} x2={960} y2={i * 80} stroke={F} strokeWidth={1} />
    ))}
  </svg>
);

// "● QUÉ HACE" con cursor parpadeante
export const Kicker: React.FC<{ t: number; at: number; children: string }> = ({ t, at, children }) => {
  const n = Math.floor(interpolate(t, [at, at + 0.45], [0, children.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const blink = Math.floor(t * 2.4) % 2 === 0;
  return (
    <div style={{ position: "absolute", left: 40, top: 30, fontFamily: MONT, fontWeight: 800, fontSize: 25, letterSpacing: 4, color: F, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, background: F, boxShadow: glow(F, 0.6) }} />
      <span>{children.slice(0, n)}</span>
      <span style={{ opacity: blink ? 1 : 0, color: W, fontWeight: 400 }}>|</span>
    </div>
  );
};

// Trazo SVG que se dibuja (pathLength normalizado)
export const draw = (t: number, at: number, dur = 0.6) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - prog(t, at, dur),
});
