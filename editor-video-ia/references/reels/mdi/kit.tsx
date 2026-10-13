// Kit MARKETING DIGITAL INMOBILIARIO (MDI) — lenguaje visual del reel demo (ver marcas/marketing-digital-inmobiliario/).
// · Subtítulos palabra por palabra, ALINEADOS A LA IZQUIERDA (Montserrat 800 + Yellowtail verde agua con glow).
// · B-roll: entra a pantalla completa con desenfoque → se achica a TARJETA INCLINADA 3D con borde verde agua
//   sobre fondo negro-verdoso, girando lento. PiP: tarjeta inclinada abajo, Clara arriba.
// · Tarjeta blanca tipo "captura" sobre el pecho. Título grande en caps con eco script contorneado arriba.
// · Transiciones por blur. SIN paneles oscuros line-art (eso es de Daniela Werkalec).
import React from "react";
import { continueRender, delayRender, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";

export const MONT = loadMont("normal", { weights: ["500", "600", "700", "800", "900"], subsets: ["latin"] }).fontFamily;
// Script de marca MDI: Vujahday Script (local, SIL OFL) → palabras en verde agua.
export const SCRIPT = "VujahdayScript";
let fontsReady: Promise<void> | null = null;
export const useLocalFonts = () => {
  const [h] = React.useState(() => delayRender("fuente script MDI"));
  React.useEffect(() => {
    if (!fontsReady) fontsReady = new FontFace(SCRIPT, `url(${staticFile("fonts/VujahdayScript-Regular.ttf")})`).load().then((f) => { document.fonts.add(f); });
    fontsReady.then(() => continueRender(h));
  }, [h]);
};

export const T = "#6AD5B7"; // verde agua MDI
export const TL = "#9FF5E2"; // núcleo claro del neón
export const W = "#FFFFFF";
export const BG = "#061416"; // negro verdoso de las placas del demo
export const neon = (s = 1) => `0 0 ${6 * s}px ${T}, 0 0 ${18 * s}px ${T}CC, 0 0 ${38 * s}px ${T}77`;
export const SOFT = "0 3px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.6)";
const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};
export const prog = (t: number, at: number, dur = 0.4) => interpolate(t, [at, at + dur], [0, 1], { ...C, easing: Easing.out(Easing.cubic) });
export const pop = (t: number, at: number, dur = 0.45) => interpolate(t, [at, at + dur], [0, 1], { ...C, easing: Easing.out(Easing.back(2)) });
export const win = (t: number, from: number, to: number, fi = 0.35, fo = 0.3) => Math.min(prog(t, from, fi), 1 - prog(t, to - fo, fo));

// ---------- subtítulos palabra por palabra ----------
// texto: *script* (Yellowtail verde agua) · | salto de línea. caps: Montserrat 900 mayúsculas, *clave* verde agua.
export type Cap = { from: number; to: number; text: string; caps?: boolean; big?: boolean };
export type WordT = { w: string; s: number };

type Tok = { txt: string; script: boolean; line: number; at: number };
const tokenize = (c: Cap, words: WordT[]): Tok[] => {
  const toks: Tok[] = [];
  c.text.split("|").forEach((ln, li) => {
    const parts = ln.trim().split(/(\*[^*]+\*)/g).filter((x) => x.trim());
    parts.forEach((p) => {
      const sc = p.startsWith("*");
      const body = sc ? p.slice(1, -1) : p;
      if (sc) toks.push({ txt: body, script: true, line: li, at: 0 });
      else body.trim().split(/\s+/).forEach((w) => toks.push({ txt: w, script: false, line: li, at: 0 }));
    });
  });
  // tiempos: palabras reales de words.json dentro de la ventana, en orden
  const real = words.filter((w) => w.s >= c.from - 0.05 && w.s < c.to);
  let ri = 0;
  toks.forEach((tk, i) => {
    const n = tk.txt.split(/\s+/).length;
    tk.at = real[ri] ? real[ri].s : c.from + (i / toks.length) * (c.to - c.from) * 0.8;
    ri += n;
  });
  return toks;
};

export const Captions: React.FC<{ list: Cap[]; words: WordT[]; y: (t: number) => number; align?: "left" | "center" }> = ({ list, words, y, align = "left" }) => {
  const t = useT();
  const c = list.find((x) => t >= x.from && t < x.to);
  if (!c) return null;
  const toks = tokenize(c, words);
  const nLines = Math.max(...toks.map((k) => k.line)) + 1;
  const center = c.big || align === "center";
  return (
    <div style={{ position: "absolute", left: 66, right: 50, top: y(t), display: "flex", flexDirection: "column", alignItems: center ? "center" : "flex-start", gap: c.caps ? 2 : 0 }}>
      {Array.from({ length: nLines }).map((_, li) => (
        <div key={li} style={{ display: "flex", alignItems: "baseline", gap: c.caps ? 16 : 14, flexWrap: "nowrap", whiteSpace: "nowrap" }}>
          {toks.filter((k) => k.line === li).map((k, i) => {
            const p = prog(t, k.at - 0.04, 0.16);
            if (p <= 0) return null;
            const flash = interpolate(t, [k.at, k.at + 0.12, k.at + 0.5], [0, 1.5, 1], C);
            if (k.script && !c.caps)
              return <span key={i} style={{ fontFamily: SCRIPT, fontSize: c.big ? 200 : 118, lineHeight: 0.95, color: TL, textShadow: neon(0.45 + 0.4 * flash), opacity: p, transform: `translateY(${(1 - p) * 10}px)`, display: "inline-block", paddingRight: 6 }}>{k.txt}</span>;
            const key = k.script && c.caps;
            const size = c.big ? 92 : c.caps ? (key ? 70 : 46) : 62;
            return (
              <span key={i} style={{ fontFamily: MONT, fontWeight: c.caps || c.big ? 900 : 800, fontSize: size, letterSpacing: c.caps ? 0.5 : -1.5, color: key ? T : W, textTransform: c.caps || c.big ? "uppercase" : "none", textShadow: key ? `${neon(0.45 + 0.35 * flash)}, ${SOFT}` : SOFT, opacity: p, transform: `translateY(${(1 - p) * 10}px) scale(${0.9 + 0.1 * p})`, display: "inline-block", lineHeight: 1.04 }}>{k.txt}</span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ---------- b-roll: pantalla completa con blur → tarjeta inclinada con borde verde agua ----------
// mode "full": tapa a Clara (corte). mode "pip": tarjeta inclinada en la mitad de abajo, Clara arriba.
export const TiltCard: React.FC<{ from: number; to: number; mode?: "full" | "pip"; children: React.ReactNode; swing?: number }> = ({ from, to, mode = "full", children, swing = 1 }) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.05) return null;
  const inB = 1 - prog(t, from, 0.45); // blur de entrada
  const outB = prog(t, to - 0.35, 0.35); // blur de salida
  const o = Math.min(prog(t, from, 0.25), 1 - prog(t, to - 0.2, 0.2));
  const k = Math.sin((t - from) * 0.9);
  if (mode === "full") {
    const shrink = prog(t, from + 0.2, 0.6); // 0 = pantalla completa · 1 = tarjeta
    const w = interpolate(shrink, [0, 1], [1080, 800]);
    const h = interpolate(shrink, [0, 1], [1920, 1280]);
    return (
      <div style={{ position: "absolute", inset: 0, opacity: o, background: `radial-gradient(ellipse at 50% 45%, #0E3A38 0%, ${BG} 62%, #020707 100%)`, filter: `blur(${(inB + outB) * 18}px)` }}>
        <div style={{ position: "absolute", inset: 0, perspective: 1600 }}>
          <div style={{
            position: "absolute", left: (1080 - w) / 2, top: (1920 - h) / 2 - 60 * shrink, width: w, height: h, overflow: "hidden",
            border: `${3 * shrink}px solid ${T}`, boxShadow: shrink > 0 ? `0 0 ${30 * shrink}px ${T}AA, 0 0 ${90 * shrink}px ${T}44` : "none",
            transform: `rotateY(${shrink * (9 * k) * swing}deg) rotateX(${shrink * 3}deg) rotateZ(${shrink * -2.5 * swing}deg)`,
            background: "#fff",
          }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 800, height: 1280, transform: `scale(${w / 800})`, transformOrigin: "top left" }}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
  // pip
  const e = prog(t, from, 0.5);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1060, height: 860, opacity: o, filter: `blur(${(inB + outB) * 10}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(2,8,9,0.75) 30%, rgba(2,8,9,0.95) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, perspective: 1500 }}>
        <div style={{
          position: "absolute", left: 120, top: 150, width: 840, height: 620, overflow: "hidden", background: "#fff",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          transform: `translateY(${(1 - e) * 120}px) rotateY(${-8 + 5 * k * swing}deg) rotateZ(${-3 * swing}deg) rotateX(6deg)`,
          maskImage: "linear-gradient(180deg, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, black 70%, transparent 100%)",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ---------- tarjeta blanca tipo captura, sobre el pecho ----------
export const ShotCard: React.FC<{ from: number; to: number; top?: number; width?: number; children: React.ReactNode }> = ({ from, to, top = 860, width = 760, children }) => {
  const t = useT();
  const o = win(t, from, to, 0.3, 0.25);
  if (o <= 0) return null;
  const e = pop(t, from, 0.5);
  return (
    <div style={{ position: "absolute", left: (1080 - width) / 2, top, width, opacity: o, transform: `scale(${0.85 + 0.15 * e}) translateY(${(1 - e) * 30}px)`, background: "#fff", borderRadius: 10, boxShadow: "0 20px 50px rgba(0,0,0,0.45)", overflow: "hidden" }}>
      {children}
    </div>
  );
};

// ---------- título grande en caps + eco script contorneado (arriba, con velo oscuro) ----------
export const BigTitle: React.FC<{ from: number; to: number; text: string; echo?: string }> = ({ from, to, text, echo }) => {
  const t = useT();
  const o = win(t, from, to, 0.3, 0.3);
  if (o <= 0) return null;
  const letters = text.split("");
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 620, background: "linear-gradient(180deg, rgba(2,8,9,0.85), rgba(2,8,9,0.45) 55%, transparent)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center" }}>
        <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 98, color: W, letterSpacing: 0, lineHeight: 1, textShadow: SOFT }}>
          {letters.map((ch, i) => {
            const a = from + 0.03 * ((i * 7) % letters.length);
            const flick = t < a + 0.25 ? (Math.floor(t * 30 + i) % 3 === 0 ? 0.2 : 1) : 1;
            return <span key={i} style={{ opacity: prog(t, a, 0.2) * flick, filter: `blur(${(1 - prog(t, a, 0.3)) * 8}px)` }}>{ch}</span>;
          })}
        </div>
        {echo && (
          <div style={{ fontFamily: SCRIPT, fontSize: 112, lineHeight: 0.7, color: "transparent", WebkitTextStroke: `2.5px ${T}`, filter: `drop-shadow(0 0 8px ${T})`, opacity: prog(t, from + 0.35, 0.4), marginTop: -6 }}>{echo}</div>
        )}
      </div>
    </div>
  );
};

// transición global por blur (cuando se necesita sobre Clara)
export const blurAt = (t: number, marks: number[], dur = 0.35) => {
  let b = 0;
  for (const m of marks) b = Math.max(b, 1 - Math.min(1, Math.abs(t - m) / dur));
  return b;
};
