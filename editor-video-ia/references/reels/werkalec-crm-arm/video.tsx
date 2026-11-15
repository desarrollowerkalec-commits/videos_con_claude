// Werkalec · reel 01 v2 (CRM → ARM) — lenguaje del video de referencia de Daniela:
// zooms de cámara en cada corte, recorte de Nicolás con texto DETRÁS, glitch wireframe, light leaks,
// primer plano editorial con líneas, mosaico rojo + polaroid, íconos 3D, palabras dispersas con fondo
// desaturado, collage giratorio, bokeh cinematográfico con serif itálica, subs que entran desenfocados.
import React from "react";
import {
  AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile,
  useCurrentFrame, Easing,
} from "remotion";
import { loadFont as loadCorm } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSansCondensed";
import { siWhatsapp, siGooglecalendar, siGmail } from "simple-icons";
import { WORDS, DURATION, CUTS } from "./words";

const CORM_I = loadCorm("italic", { weights: ["500", "600", "700"] }).fontFamily;
const CORM = loadCorm("normal", { weights: ["600", "700"] }).fontFamily;
const MONT = loadMont("normal", { weights: ["500", "600", "700", "800"] }).fontFamily;
const PLEX = loadPlex("normal", { weights: ["700"] }).fontFamily;
void CORM;

const C = { gold: "#C6A37B", orange: "#FEB050", glow: "#FDB680", red: "#BB0925", navy: "#1E2532", gray: "#848484", white: "#FFFFFF" };
const END = 3.3;
export const TOTAL = DURATION + END;
const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;
const ease = Easing.bezier(0.2, 0.8, 0.2, 1);
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ramp = (t: number, a: number, b: number) => interpolate(t, [a, b], [0, 1], { ...cl, easing: ease });
const win = (t: number, a: number, b: number, d = 0.2) => Math.min(ramp(t, a, a + d), 1 - ramp(t, b - d, b));
const spr = (t: number, at: number, damping = 13) =>
  t < at ? 0 : spring({ frame: (t - at) * FPS, fps: FPS, config: { damping, stiffness: 170, mass: 0.7 } });
const inW = (t: number, [a, b]: [number, number]) => t >= a && t < b;

// ---------------- ventanas ----------------
const W = {
  hook: [0, 2.3] as [number, number],
  tasks: [6.4, 11.95] as [number, number],
  ecu: [12.28, 14.32] as [number, number],
  wire: [14.32, 14.5] as [number, number],
  brill: [14.5, 15.55] as [number, number],
  lens1: [15.6, 16.9] as [number, number],
  arm: [16.95, 22.38] as [number, number],
  dif: [22.38, 23.18] as [number, number],
  polar: [23.18, 25.15] as [number, number],
  icons: [25.2, 29.2] as [number, number],
  phone: [29.25, 36.3] as [number, number],
  collage: [36.4, 40.65] as [number, number],
  handoff: [44.0, 48.95] as [number, number],
  bokeh: [49.0, 51.6] as [number, number],
  guarda: [51.62, 57.75] as [number, number],
  logo: [57.85, 62.6] as [number, number],
  era: [63.6, 65.85] as [number, number],
  anot: [65.95, 69.6] as [number, number],
};
const CUT_T0 = { arm: 16.8, guarda: 51.5, anot: 63.5 };
const NO_SUBS: [number, number][] = [[60.3, 62.6], W.hook, W.tasks, W.ecu, W.wire, W.brill, W.lens1, W.arm, W.dif, W.polar, W.phone, W.bokeh, W.guarda, W.era, W.anot, [DURATION, 999]];
const SUB_Y = (t: number) => (inW(t, W.collage) ? 1430 : inW(t, W.handoff) ? 1250 : 1160);
const KEY = ["crm", "arm", "sistema", "equipo", "agentes", "inteligencia", "artificial", "whatsapp", "reuniones", "seguimiento", "reglas", "persona", "deriva", "werkalec", "relaciones", "seguinos"];
const isKey = (w: string) => KEY.includes(w.toLowerCase().replace(/[¿¡,.?!]/g, ""));

// ---------------- cámara: zoom distinto en cada corte + golpes ----------------
const ZPAT = [1.0, 1.28, 1.12, 1.45, 1.0, 1.2];
const IMPACT: { at: number; z: number; d: number }[] = [
  { at: 1.3, z: 1.32, d: 0.95 }, { at: 3.04, z: 1.2, d: 1.2 }, { at: 28.84, z: 1.55, d: 0.5 },
  { at: 41.94, z: 1.35, d: 0.95 }, { at: 58.36, z: 1.25, d: 1.2 }, { at: 69.9, z: 1.3, d: 2.1 },
];
const cam = (t: number) => {
  let k = 0; for (let i = 0; i < CUTS.length; i++) if (t >= CUTS[i]) k = i;
  const z0 = ZPAT[(k + 5) % ZPAT.length], z1 = ZPAT[k % ZPAT.length];
  let z = interpolate(t, [CUTS[k], CUTS[k] + 0.14], [z0, z1], { ...cl, easing: ease });
  z *= interpolate(t, [CUTS[k], (CUTS[k + 1] ?? DURATION)], [1, 1.04], cl); // deriva lenta
  for (const im of IMPACT) if (t >= im.at && t < im.at + im.d) {
    z *= interpolate(t, [im.at, im.at + 0.12, im.at + im.d - 0.12, im.at + im.d], [1, im.z, im.z, 1], cl);
  }
  const shake = interpolate(t - CUTS[k], [0, 0.18], [1, 0], cl);
  const sx = Math.sin(t * 90) * 9 * shake, sy = Math.cos(t * 70) * 7 * shake;
  const blur = interpolate(t - CUTS[k], [0, 0.09], [8, 0], cl) * (k ? 1 : 0);
  return { transform: `translate(${sx}px,${sy}px) scale(${z})`, transformOrigin: "50% 20%", blur };
};

// ---------------- base ----------------
const GRADE = "saturate(0.92) contrast(1.08) brightness(0.9) sepia(0.14)";
const Base: React.FC = () => {
  const t = useT(); const c = cam(t);
  const desat = inW(t, W.tasks) || inW(t, W.phone) ? 1 : 0;
  const filt = `${GRADE} blur(${c.blur}px)${desat ? " grayscale(1) brightness(0.62)" : ""}`;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <OffthreadVideo src={staticFile("base.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: c.transform, transformOrigin: c.transformOrigin, filter: filt }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(0,0,0,0) 42%, rgba(12,8,4,0.6) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(30,18,8,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 58%, rgba(22,12,5,0.6) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------------- subtítulos: 1–2 palabras, entran desenfocados ----------------
type Chunk = { words: typeof WORDS; s: number; e: number };
const chunks: Chunk[] = (() => {
  const out: Chunk[] = []; let cur: typeof WORDS = [];
  const push = () => { if (cur.length) out.push({ words: cur, s: cur[0].s, e: cur[cur.length - 1].e }); cur = []; };
  for (const w of WORDS) { cur.push(w); if (cur.length >= 2 || /[.,?!]$/.test(w.w) || isKey(w.w)) push(); }
  push();
  for (let i = 0; i < out.length - 1; i++) out[i].e = Math.min(out[i + 1].s, out[i].e + 0.3);
  return out;
})();
const Subs: React.FC = () => {
  const t = useT();
  if (NO_SUBS.some((w) => inW(t, w))) return null;
  const c = chunks.find((k) => t >= k.s - 0.05 && t < k.e);
  if (!c) return null;
  const p = ramp(t, c.s - 0.05, c.s + 0.12);
  const big = c.words.some((w) => isKey(w.w));
  return (
    <div style={{ position: "absolute", top: SUB_Y(t), left: 80, right: 150, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 20, flexWrap: "wrap", transform: `translateY(-50%) scale(${1.25 - 0.25 * p})`, filter: `blur(${(1 - p) * 14}px)`, opacity: p }}>
      {c.words.map((w, i) => {
        const k = isKey(w.w);
        return (
          <span key={i} style={{
            fontFamily: MONT, fontWeight: 800, fontSize: k ? 118 : big ? 64 : 82, letterSpacing: -2.5, lineHeight: 1,
            color: k ? C.orange : C.white,
            textShadow: k ? `0 0 30px ${C.glow}aa, 0 6px 18px rgba(0,0,0,.6)` : "0 6px 18px rgba(0,0,0,.6), 0 2px 5px rgba(0,0,0,.5)",
          }}>{w.w.replace(/[¿¡]/g, "").replace(/[.,]$/, "")}</span>
        );
      })}
    </div>
  );
};

// ---------------- light leak (transición) ----------------
const LEAKS = [0.0, 14.5, 36.4, 57.85, 63.6];
const LightLeak: React.FC = () => {
  const t = useT();
  const at = LEAKS.find((a) => t >= a && t < a + 0.7);
  if (at === undefined) return null;
  const p = (t - at) / 0.7; const o = Math.sin(p * Math.PI);
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity: o, pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${20 + p * 70}% ${70 - p * 40}%, rgba(255,240,215,1) 0%, rgba(254,176,80,.9) 18%, rgba(187,9,37,.45) 42%, rgba(0,0,0,0) 70%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(${110 + p * 40}deg, rgba(0,0,0,0) 30%, rgba(255,214,160,.7) 50%, rgba(0,0,0,0) 70%)` }} />
    </AbsoluteFill>
  );
};
const Flash: React.FC<{ at: number; d?: number; color?: string }> = ({ at, d = 0.22, color = "#fff" }) => {
  const t = useT(); if (t < at || t > at + d) return null;
  return <AbsoluteFill style={{ background: color, opacity: 1 - (t - at) / d }} />;
};

// ---------------- 1. hook apilado ----------------
const Hook: React.FC = () => {
  const t = useT(); if (!inW(t, W.hook)) return null;
  const out = 1 - ramp(t, W.hook[1] - 0.2, W.hook[1]);
  const l = (at: number, dx = 0) => { const p = spr(t, at); return { opacity: p * out, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * 50}px)`, filter: `blur(${(1 - p) * 10}px)` }; };
  return (
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ ...l(0.05, -80), fontFamily: PLEX, fontWeight: 700, fontSize: 120, color: C.white, lineHeight: 0.92, textShadow: "0 8px 26px rgba(0,0,0,.6)" }}>FELICITACIONES,</div>
      <div style={{ ...l(1.25, 80), fontFamily: CORM_I, fontStyle: "italic", fontWeight: 700, fontSize: 112, color: C.orange, lineHeight: 1.1, textShadow: `0 0 30px ${C.glow}88, 0 6px 18px rgba(0,0,0,.6)` }}>compraste un</div>
      <div style={{ ...l(1.74), fontFamily: PLEX, fontWeight: 700, fontSize: 210, color: C.white, lineHeight: 0.9, letterSpacing: 4, textShadow: "0 10px 30px rgba(0,0,0,.6)" }}>CRM</div>
    </div>
  );
};

// ---------------- 2. palabras dispersas + marco de selección (fondo desaturado) ----------------
const Bracket: React.FC<{ x: number; y: number; w: number; h: number; o: number; color?: string }> = ({ x, y, w, h, o, color = C.orange }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity: o }}>
    <div style={{ position: "absolute", inset: 0, border: `2.5px solid ${color}`, opacity: 0.9 }} />
    {[[0, 0], [w, 0], [0, h], [w, h]].map(([a, b], i) => (
      <div key={i} style={{ position: "absolute", left: a - 10, top: b - 10, width: 20, height: 20, borderRadius: 5, background: color, boxShadow: `0 0 14px ${C.glow}` }} />
    ))}
  </div>
);
type Scat = { at: number; txt: string; x: number; y: number; font: "plex" | "corm" | "mont"; size: number; color?: string; outline?: boolean };
const ScatterWord: React.FC<{ s: Scat }> = ({ s }) => {
  const t = useT(); const p = spr(t, s.at, 14);
  if (t < s.at) return null;
  const fam = s.font === "plex" ? PLEX : s.font === "corm" ? CORM_I : MONT;
  return (
    <div style={{
      position: "absolute", left: s.x, top: s.y, fontFamily: fam, fontStyle: s.font === "corm" ? "italic" : "normal",
      fontWeight: s.font === "mont" ? 700 : 700, fontSize: s.size, lineHeight: 0.95, whiteSpace: "nowrap",
      color: s.outline ? "transparent" : s.color ?? C.white, WebkitTextStroke: s.outline ? `3px ${s.color ?? C.orange}` : undefined,
      textShadow: s.outline ? undefined : s.color === C.orange ? `0 0 26px ${C.glow}99` : "0 4px 14px rgba(0,0,0,.6)",
      opacity: p, transform: `scale(${1.3 - 0.3 * p})`, filter: `blur(${(1 - p) * 10}px)`, transformOrigin: "0 50%",
    }}>{s.txt}</div>
  );
};
const TASK_WORDS: Scat[] = [
  { at: 6.48, txt: "cargar", x: 90, y: 330, font: "mont", size: 46 },
  { at: 6.72, txt: "CONTACTOS", x: 90, y: 380, font: "plex", size: 120, color: C.white },
  { at: 7.76, txt: "actualizar", x: 560, y: 560, font: "corm", size: 78, color: C.gold },
  { at: 8.14, txt: "oportunidades", x: 470, y: 630, font: "mont", size: 52 },
  { at: 9.4, txt: "programar", x: 90, y: 1180, font: "mont", size: 46 },
  { at: 9.72, txt: "SEGUIMIENTOS", x: 90, y: 1230, font: "plex", size: 116, color: C.orange },
  { at: 10.78, txt: "controlar", x: 520, y: 1380, font: "corm", size: 76, color: C.white },
  { at: 10.98, txt: "VENDEDORES", x: 420, y: 1440, font: "plex", size: 64, color: C.orange, outline: true },
];
const Tasks: React.FC = () => {
  const t = useT(); if (!inW(t, W.tasks)) return null;
  const o = win(t, W.tasks[0], W.tasks[1], 0.15);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Bracket x={300} y={500} w={480} h={1000} o={spr(t, 6.5)} />
      <div style={{ position: "absolute", left: 300, top: 1510, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: C.orange, letterSpacing: 2 }}>TU EQUIPO · A MANO</div>
      {TASK_WORDS.map((s, i) => <ScatterWord key={i} s={s} />)}
    </AbsoluteFill>
  );
};

// ---------------- 3. primer plano editorial con líneas ----------------
const Ecu: React.FC = () => {
  const t = useT(); if (!inW(t, W.ecu)) return null;
  const line = ramp(t, W.ecu[0], W.ecu[0] + 0.35);
  const w = (at: number) => { const p = spr(t, at); return { opacity: p, transform: `translateX(${(1 - p) * -40}px)`, filter: `blur(${(1 - p) * 8}px)` }; };
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 300, top: 0, width: 3, height: 1300 * line, background: "rgba(255,255,255,.85)" }} />
      <div style={{ position: "absolute", left: 60, top: 780, width: 540 * line, height: 3, background: "rgba(255,255,255,.85)" }} />
      <div style={{ position: "absolute", left: 90, top: 700, ...w(12.36), fontFamily: MONT, fontWeight: 600, fontSize: 36, color: C.white }}>¿compraste</div>
      <div style={{ position: "absolute", left: 320, top: 610, ...w(12.56), fontFamily: PLEX, fontWeight: 700, fontSize: 132, color: C.white, lineHeight: 1 }}>tecnología</div>
      <div style={{ position: "absolute", left: 90, top: 800, ...w(13.06), fontFamily: MONT, fontWeight: 600, fontSize: 34, color: C.white, lineHeight: 1.15 }}>para seguir<br />haciendo</div>
      <div style={{ position: "absolute", left: 320, top: 800, ...w(13.72), fontFamily: PLEX, fontWeight: 700, fontSize: 250, color: C.orange, lineHeight: 0.9, textShadow: `0 0 40px ${C.glow}88` }}>TODO</div>
      <div style={{ position: "absolute", left: 330, top: 1030, ...w(13.94), fontFamily: CORM_I, fontStyle: "italic", fontWeight: 700, fontSize: 120, color: C.white }}>vos?</div>
    </AbsoluteFill>
  );
};
// primerísimo plano: recorte fuerte de la cara, desaturado y oscuro, desplazado a la derecha
const EcuVideo: React.FC = () => {
  const t = useT();
  const z = interpolate(t, [W.ecu[0], W.ecu[1]], [2.6, 2.8]);
  const whip = interpolate(t, [W.ecu[0], W.ecu[0] + 0.12], [1, 0], cl);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <OffthreadVideo src={staticFile("base.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateX(${330 - whip * 600}px) scale(${z})`, transformOrigin: "50% 13%", filter: `grayscale(0.75) brightness(0.55) contrast(1.15) blur(${whip * 14}px)` }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(10,10,12,.85) 0%, rgba(10,10,12,.35) 55%, rgba(0,0,0,0) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------------- 4. glitch wireframe + ¡Brillante! ----------------
const Wire: React.FC = () => {
  const t = useT(); if (!inW(t, [14.3, 14.5])) return null;
  const neg = Math.floor((t - 14.3) * FPS) % 2 === 1;
  return (
    <AbsoluteFill>
      <Sequence from={f(14.3)} layout="none"><OffthreadVideo src={staticFile("wire.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: neg ? "invert(1) sepia(1) saturate(4) hue-rotate(-20deg)" : "none" }} /></Sequence>
    </AbsoluteFill>
  );
};
const Brillante: React.FC = () => {
  const t = useT(); if (!inW(t, W.brill)) return null;
  const p = spr(t, W.brill[0], 11); const o = win(t, W.brill[0], W.brill[1], 0.15);
  return (
    <div style={{ position: "absolute", top: 1020, left: 0, right: 0, textAlign: "center", opacity: o, transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * -8}deg)`, filter: `blur(${(1 - p) * 12}px)` }}>
      <span style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 700, fontSize: 200, color: C.orange, textShadow: `0 0 50px ${C.glow}aa, 0 10px 30px rgba(0,0,0,.6)` }}>¡Brillante!</span>
    </div>
  );
};

// ---------------- 5. lente: viñeta circular desenfocada + cascada serif ----------------
const Cascade: React.FC<{ lines: { at: number; txt: string; size: number; dx?: number }[]; top: number; color?: string }> = ({ lines, top, color = C.white }) => {
  const t = useT();
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {lines.map((l, i) => {
        const p = spr(t, l.at, 16);
        return (
          <div key={i} style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 500, fontSize: l.size, lineHeight: 0.86, color, letterSpacing: -1, opacity: p * 0.95, transform: `translate(${l.dx ?? 0}px, ${(1 - p) * 30}px) scaleY(1.08)`, filter: `blur(${(1 - p) * 10}px)`, textShadow: "0 6px 24px rgba(0,0,0,.55)" }}>{l.txt}</div>
        );
      })}
    </div>
  );
};
const LensVignette: React.FC<{ w: [number, number] }> = ({ w }) => {
  const t = useT(); if (!inW(t, w)) return null; const o = win(t, w[0], w[1], 0.15);
  return (
    <AbsoluteFill style={{ opacity: o, backdropFilter: "blur(16px)", WebkitMaskImage: "radial-gradient(ellipse 46% 36% at 50% 42%, transparent 60%, black 100%)", maskImage: "radial-gradient(ellipse 46% 36% at 50% 42%, transparent 60%, black 100%)" }} />
  );
};
const Lens1: React.FC = () => {
  const t = useT(); if (!inW(t, W.lens1)) return null;
  return (
    <AbsoluteFill style={{ opacity: win(t, W.lens1[0], W.lens1[1], 0.15) }}>
      <Cascade top={1020} lines={[{ at: 15.66, txt: "Pero eso", size: 120, dx: -60 }, { at: 16.0, txt: "está", size: 120, dx: 80 }, { at: 16.18, txt: "cambiando.", size: 150 }]} />
    </AbsoluteFill>
  );
};

// ---------------- 6. recorte de Nicolás con texto DETRÁS ----------------
const Cutout: React.FC<{ w: [number, number]; t0: number; file: string; glow?: string; still?: boolean; shrink?: number }> = ({ w, t0, file, glow = C.orange, still, shrink }) => {
  const t = useT(); const c = shrink ? { transform: `scale(${shrink * interpolate(t, w, [1.0, 1.06])})`, transformOrigin: "50% 100%" } : still ? { transform: `scale(${interpolate(t, w, [1.0, 1.08])})`, transformOrigin: "50% 20%" } : cam(t);
  return (
    <Sequence from={f(w[0])} durationInFrames={f(w[1] - w[0])} layout="none">
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo transparent src={staticFile(file)} startFrom={f(w[0] - t0)} style={{
          width: "100%", height: "100%", objectFit: "cover", transform: c.transform, transformOrigin: c.transformOrigin,
          filter: `${GRADE} drop-shadow(0 0 2px rgba(255,255,255,.55)) drop-shadow(0 0 22px ${glow}66)`,
        }} />
      </AbsoluteFill>
    </Sequence>
  );
};
const ArmBehind: React.FC = () => {
  const t = useT();
  const pC = spr(t, 17.88), strike = ramp(t, 18.86, 19.15), pA = spr(t, 19.42, 11);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #1a0b0e 0%, #070506 60%, #000 100%)" }} />
      <div style={{ position: "absolute", top: 240, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 40, letterSpacing: 10, color: C.gray, opacity: ramp(t, 17.0, 17.3) }}>ESTAMOS PASANDO DEL</div>
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, textAlign: "center", opacity: pC * (1 - ramp(t, 19.3, 19.5)) }}>
        <span style={{ position: "relative", fontFamily: PLEX, fontWeight: 700, fontSize: 400, lineHeight: 1, color: C.red, textShadow: `0 0 50px ${C.red}cc, 0 0 120px ${C.red}88` }}>
          CRM
          <span style={{ position: "absolute", left: -20, top: "50%", height: 22, width: `${strike * 110}%`, background: C.white, boxShadow: "0 0 20px #fff" }} />
        </span>
      </div>
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, textAlign: "center", opacity: pA, transform: `scale(${1.25 - 0.25 * pA})`, filter: `blur(${(1 - pA) * 16}px)` }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 470, lineHeight: 1, color: C.orange, textShadow: `0 0 60px ${C.glow}cc, 0 0 140px ${C.orange}77` }}>ARM</span>
      </div>
    </AbsoluteFill>
  );
};
const ArmFront: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Cascade top={1150} color={C.white} lines={[
        { at: 20.5, txt: "agentic", size: 128, dx: -120 }, { at: 21.04, txt: "relationship", size: 128, dx: 40 }, { at: 21.64, txt: "management", size: 128, dx: 110 },
      ]} />
      <div style={{ position: "absolute", top: 1560, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 600, fontSize: 26, letterSpacing: 6, color: C.gold, opacity: ramp(t, 21.7, 22.0) }}>A · R · M</div>
    </AbsoluteFill>
  );
};

// ---------------- "¿La diferencia?" ----------------
const Dif: React.FC = () => {
  const t = useT(); if (!inW(t, W.dif)) return null;
  return (
    <AbsoluteFill style={{ backdropFilter: "blur(18px) brightness(0.7)", opacity: win(t, W.dif[0], W.dif[1], 0.08) }}>
      <Cascade top={760} lines={[{ at: 22.44, txt: "¿La", size: 150, dx: -140 }, { at: 22.58, txt: "diferencia?", size: 200 }]} />
    </AbsoluteFill>
  );
};

// ---------------- 7. mosaico rojo + polaroid ----------------
const Polaroid: React.FC = () => {
  const t = useT(); if (!inW(t, W.polar)) return null;
  const o = win(t, W.polar[0], W.polar[1], 0.12);
  const cells: React.ReactNode[] = [];
  const cols = 6, rows = 4, cw = 1080 / cols, ch = 150;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const seed = Math.abs(Math.sin(r * 7.1 + c * 3.7) * 1000) % 1;
    const at = W.polar[0] + seed * 0.45; const show = t >= at;
    if (!show || seed > 0.72) continue;
    const tone = ["#BB0925", "#8E061C", "#D21733", "#5E0412"][Math.floor(seed * 40) % 4];
    cells.push(<div key={`${r}${c}`} style={{ position: "absolute", left: c * cw, top: 240 + r * ch, width: cw - 4, height: ch - 4, background: tone, opacity: 0.88 * (1 - (r / rows) * 0.5) }} />);
  }
  const pp = spr(t, 23.3, 12); const pt = spr(t, 23.46); const pd = spr(t, 23.92);
  const items = ["Llamar a Gómez", "Actualizar etapa", "Seguimiento visita", "Cargar 14 leads"];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      {cells}
      <div style={{ position: "absolute", left: 70, top: 300, width: 330, padding: "18px 18px 50px", background: "#F4F1EA", boxShadow: "0 24px 50px rgba(0,0,0,.55)", transform: `rotate(${-6 * pp}deg) scale(${0.5 + 0.5 * pp})`, opacity: pp }}>
        <div style={{ background: "#151a22", height: 300, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 20, color: C.gray, letterSpacing: 2 }}>TAREAS · HOY</div>
          {items.map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: C.red }} />
              <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 21, color: "#eee" }}>{x}</div>
            </div>
          ))}
          <div style={{ marginTop: "auto", fontFamily: PLEX, fontWeight: 700, fontSize: 30, color: C.red }}>4 VENCIDAS</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 450, top: 330, fontFamily: PLEX, fontWeight: 700, fontSize: 132, color: C.white, opacity: pt, transform: `translateX(${(1 - pt) * 60}px)`, textShadow: "0 6px 20px rgba(0,0,0,.5)" }}>EL CRM,</div>
      <div style={{ position: "absolute", left: 470, top: 470, fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 92, color: C.white, opacity: pd, lineHeight: 0.9 }}>te dice qué<br />tenés que hacer</div>
    </AbsoluteFill>
  );
};

// ---------------- 8. íconos 3D junto a la mano ----------------
const ICONS = [
  { at: 26.44, icon: siWhatsapp, bg: "#25D366", x: 690, y: 820, r: 8 },
  { at: 27.02, icon: siGooglecalendar, bg: "#ffffff", x: 140, y: 900, r: -10, fg: "#4285F4" },
  { at: 27.52, icon: siGmail, bg: "#ffffff", x: 760, y: 1290, r: -6, fg: "#EA4335" },
];
const Icons: React.FC = () => {
  const t = useT(); if (!inW(t, W.icons)) return null;
  const out = 1 - ramp(t, W.icons[1] - 0.2, W.icons[1]);
  return (
    <AbsoluteFill style={{ perspective: 900 }}>
      {ICONS.map((k, i) => {
        const p = spr(t, k.at, 9); if (t < k.at) return null;
        const wob = Math.sin((t - k.at) * 3 + i) * 12;
        return (
          <div key={i} style={{
            position: "absolute", left: k.x, top: k.y, width: 170, height: 170, borderRadius: 42, background: k.bg,
            display: "flex", alignItems: "center", justifyContent: "center", opacity: p * out,
            transform: `scale(${p}) rotateY(${wob + (1 - p) * 90}deg) rotateZ(${k.r}deg) translateZ(40px)`,
            boxShadow: `0 30px 50px rgba(0,0,0,.5), inset 0 -8px 0 rgba(0,0,0,.15), 0 0 40px ${C.glow}55`,
          }}>
            <svg viewBox="0 0 24 24" width={100} height={100}><path d={k.icon.path} fill={k.fg ?? "#fff"} /></svg>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 120, top: 330, fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 86, color: C.white, opacity: spr(t, 26.44) * out, textShadow: "0 6px 20px rgba(0,0,0,.6)" }}>agentes de IA</div>
      <div style={{ position: "absolute", left: 120, top: 420, fontFamily: PLEX, fontWeight: 700, fontSize: 120, color: C.orange, opacity: spr(t, 28.52) * out, textShadow: `0 0 34px ${C.glow}aa` }}>POR VOS.</div>
    </AbsoluteFill>
  );
};

// ---------------- 9. teléfono 3D + palabras dispersas (fondo desaturado) ----------------
const MSGS = [
  { at: 29.9, me: false, txt: "Hola! Vi el depto de Fisherton, ¿sigue disponible?" },
  { at: 31.66, me: true, txt: "¡Hola! Sí 😊 ¿Para vivir o para invertir?" },
  { at: 32.4, me: false, txt: "Para vivir, somos 3" },
  { at: 32.9, me: true, txt: "¿Tenés crédito aprobado?" },
  { at: 33.5, me: false, txt: "Pre-aprobado 👍" },
];
const PHONE_WORDS: Scat[] = [
  { at: 29.28, txt: "entra una", x: 80, y: 300, font: "mont", size: 40 },
  { at: 30.08, txt: "CONSULTA", x: 80, y: 345, font: "plex", size: 128, color: C.white },
  { at: 31.66, txt: "responde,", x: 80, y: 520, font: "corm", size: 84, color: C.gold },
  { at: 32.58, txt: "PREGUNTA,", x: 80, y: 610, font: "plex", size: 92, color: C.orange },
  { at: 33.56, txt: "identifica", x: 80, y: 1260, font: "corm", size: 84, color: C.white },
  { at: 35.34, txt: "Y ACTUALIZA", x: 80, y: 1350, font: "plex", size: 78, color: C.orange, outline: true },
];
const Phone: React.FC = () => {
  const t = useT(); if (!inW(t, W.phone)) return null;
  const o = win(t, W.phone[0], W.phone[1], 0.15);
  const enter = spr(t, 29.4, 14);
  const PX = 540, PY = 560, PW = 420, PH = 760;
  const shown = MSGS.filter((m) => t >= m.at);
  const tag = spr(t, 34.18), crm = spr(t, 35.34), stage = t >= 35.7;
  const typing = (t > 31.2 && t < 31.66) || (t > 32.6 && t < 32.9);
  return (
    <AbsoluteFill style={{ opacity: o, perspective: 1400 }}>
      <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: PH, transformStyle: "preserve-3d", transform: `translateY(${(1 - enter) * 500}px) rotateY(${-18 + Math.sin(t * 0.8) * 3}deg) rotateX(6deg) rotateZ(${4 - enter * 1}deg)` }}>
        <Bracket x={-26} y={-26} w={PW + 52} h={PH + 52} o={enter} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 54, background: "#0E1116", border: "9px solid #2A2D33", overflow: "hidden", boxShadow: `0 50px 90px rgba(0,0,0,.7), 0 0 60px ${C.glow}33` }}>
          <div style={{ height: 110, background: "#1A1F26", display: "flex", alignItems: "center", gap: 16, padding: "26px 22px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("werkalec-isotipo.png")} style={{ width: 38, filter: "brightness(0) invert(1)" }} />
            </div>
            <div>
              <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 26, color: C.white }}>Agente IA</div>
              <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 20, color: typing ? C.orange : "#8A93A0" }}>{typing ? "escribiendo…" : "en línea"}</div>
            </div>
          </div>
          <div style={{ position: "absolute", top: 120, left: 16, right: 16, bottom: 22, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
            {shown.map((m, i) => {
              const p = spr(t, m.at);
              return (
                <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "84%", padding: "14px 18px", borderRadius: 22, borderBottomRightRadius: m.me ? 5 : 22, borderBottomLeftRadius: m.me ? 22 : 5, background: m.me ? "#2D3A4F" : "#F3F1EC", color: m.me ? C.white : "#111", fontFamily: MONT, fontWeight: 500, fontSize: 24, lineHeight: 1.25, opacity: p, transform: `translateY(${(1 - p) * 26}px)` }}>{m.txt}</div>
              );
            })}
            {t >= 34.18 && <div style={{ alignSelf: "center", opacity: tag, transform: `scale(${0.6 + 0.4 * tag})`, background: C.orange, color: "#1A1208", fontFamily: PLEX, fontWeight: 700, fontSize: 32, padding: "8px 20px", borderRadius: 30, boxShadow: `0 0 30px ${C.glow}aa` }}>OPORTUNIDAD REAL</div>}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 520, top: 1420, width: 470, opacity: crm, transform: `translateY(${(1 - crm) * 60}px) rotate(-2deg)`, background: "#F7F4EF", borderRadius: 22, padding: "16px 20px", boxShadow: "0 20px 50px rgba(0,0,0,.55)", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 24, color: C.white, background: C.navy, borderRadius: 10, padding: "6px 10px" }}>CRM</div>
        <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 22, color: "#333" }}>Etapa: <s>Nuevo</s>{stage && <b style={{ color: "#B47A1E" }}> → Calificado ✓</b>}</div>
      </div>
      {PHONE_WORDS.map((s, i) => <ScatterWord key={i} s={s} />)}
    </AbsoluteFill>
  );
};

// ---------------- 10. collage giratorio de tarjetas ----------------
const CARDS = [
  { h: "📅  Reunión agendada", s: "Jueves 11:00 · Visita Fisherton", c: C.orange },
  { h: "✓  Seguimiento enviado", s: "“¿Pudiste ver las fotos del depto?”", c: C.gold },
  { h: "⚙  Regla activa", s: "Leads de +USD 150k → Martín", c: C.white },
  { h: "🔔  Recordatorio", s: "Llamar a la familia Pérez 18 h", c: C.orange },
  { h: "✓  Visita confirmada", s: "Sábado 10:30 · 3 amb.", c: C.gold },
  { h: "⚙  Regla activa", s: "No responder después de 21 h", c: C.white },
  { h: "📅  Reunión agendada", s: "Lunes 9:30 · Tasación", c: C.orange },
  { h: "✓  CRM actualizado", s: "14 contactos · 0 a mano", c: C.gold },
];
const Collage: React.FC = () => {
  const t = useT(); if (!inW(t, W.collage)) return null;
  const o = win(t, W.collage[0], W.collage[1], 0.2);
  const lt = t - W.collage[0];
  return (
    <AbsoluteFill style={{ opacity: o, perspective: 1200, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #2C3548 0%, ${C.navy} 55%, #0d1018 100%)` }} />
      {CARDS.map((k, i) => {
        const at = i * 0.32; const p = interpolate(lt, [at, at + 0.55], [0, 1], { ...cl, easing: ease });
        if (lt < at) return null;
        const ang = (i / CARDS.length) * Math.PI * 2 + lt * 0.35;
        const rad = 330 + (i % 3) * 60;
        const x = 540 + Math.cos(ang) * rad * 0.9 - 260, y = 860 + Math.sin(ang) * rad - 90;
        const spin = (1 - p) * 220;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y, width: 520, padding: "22px 26px", borderRadius: 22, background: "#11151d",
            border: `2px solid ${k.c}66`, boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            transform: `rotateY(${spin}deg) rotateZ(${(i % 2 ? 1 : -1) * (6 + i)}deg) scale(${0.6 + 0.4 * p})`,
            filter: `blur(${(1 - p) * 12}px)`, opacity: p,
          }}>
            <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: k.c }}>{k.h}</div>
            <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 25, color: "#C9CED6", marginTop: 6 }}>{k.s}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, textAlign: "center", fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 88, color: C.white, opacity: ramp(lt, 1.6, 2.0), textShadow: "0 6px 24px rgba(0,0,0,.6)" }}>
        dentro de <span style={{ color: C.orange }}>tus reglas</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- derivación a una persona ----------------
const Handoff: React.FC = () => {
  const t = useT(); if (!inW(t, W.handoff)) return null;
  const o = win(t, W.handoff[0], W.handoff[1], 0.2);
  const p = spr(t, 45.54, 14);
  const lines = [{ at: 46.52, txt: "Busca 3 ambientes · Fisherton" }, { at: 47.16, txt: "Crédito pre-aprobado" }, { at: 47.58, txt: "Quiere visitar el sábado" }];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 300, transform: `translateY(${(1 - p) * -220}px)`, opacity: p, background: "rgba(247,244,239,.97)", borderRadius: 30, padding: "26px 30px", boxShadow: "0 30px 70px rgba(0,0,0,.55)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("werkalec-isotipo.png")} style={{ width: 44 }} />
          </div>
          <div>
            <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 34, color: "#111" }}>Derivado a Martín</div>
            <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 24, color: C.gray }}>con todo el contexto</div>
          </div>
        </div>
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ fontFamily: MONT, fontWeight: 600, fontSize: 28, color: "#222", opacity: spr(t, l.at), transform: `translateX(${(1 - spr(t, l.at)) * 30}px)` }}>
              <span style={{ color: "#B47A1E" }}>▸ </span>{l.txt}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- 11. bokeh cinematográfico + cascada serif ----------------
const Bokeh: React.FC = () => {
  const t = useT(); if (!inW(t, W.bokeh)) return null;
  const o = win(t, W.bokeh[0], W.bokeh[1], 0.12); const lt = t - W.bokeh[0];
  const dots = Array.from({ length: 22 }, (_, i) => {
    const s = (n: number) => Math.abs(Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
    return { x: s(1) * 1080, y: s(2) * 1920, r: 40 + s(3) * 150, c: [C.orange, C.gold, "#ffd9a0", "#6fd3e0", C.red][Math.floor(s(4) * 5)], v: 20 + s(5) * 60, b: 10 + s(6) * 30 };
  });
  return (
    <AbsoluteFill style={{ opacity: o, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "#07060a" }} />
      {dots.map((d, i) => (
        <div key={i} style={{ position: "absolute", left: d.x - d.r, top: d.y - d.r - lt * d.v, width: d.r * 2, height: d.r * 2, borderRadius: "50%", background: `radial-gradient(circle, ${d.c}cc 0%, ${d.c}55 55%, transparent 72%)`, filter: `blur(${d.b}px)`, transform: `scale(${1 + lt * 0.08})` }} />
      ))}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,.75) 100%)" }} />
      <Cascade top={760} lines={[{ at: 49.16, txt: "sin perder", size: 120, dx: -70 }, { at: 49.94, txt: "el contexto", size: 150, dx: 40 }, { at: 50.32, txt: "ni empezar", size: 110, dx: -40 }, { at: 51.12, txt: "de cero,", size: 140, dx: 90 }]} />
    </AbsoluteFill>
  );
};

// ---------------- 12. GUARDA / TRABAJA detrás de Nicolás ----------------
const GuardaBehind: React.FC = () => {
  const t = useT(); const c = cam(t);
  const pG = spr(t, 53.52), pT = spr(t, 56.6, 11), swap = ramp(t, 54.5, 54.8);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo src={staticFile("base.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: c.transform, transformOrigin: c.transformOrigin, filter: "grayscale(1) brightness(0.28) blur(14px)" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 305, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 38, letterSpacing: 8, color: C.gray, opacity: ramp(t, 52.3, 52.6) * (1 - swap) }}>UN SISTEMA QUE</div>
      <div style={{ position: "absolute", top: 355, left: 0, right: 0, textAlign: "center", opacity: pG * (1 - ramp(t, 56.4, 56.6)), filter: `blur(${(1 - pG) * 14}px)` }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 215, lineHeight: 1, color: "#9AA0AA", letterSpacing: 4 }}>GUARDA</span>
      </div>
      <div style={{ position: "absolute", top: 305, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 38, letterSpacing: 8, color: C.gold, opacity: ramp(t, 55.8, 56.1) }}>Y OTRO QUE</div>
      <div style={{ position: "absolute", top: 350, left: 0, right: 0, textAlign: "center", opacity: pT, transform: `scale(${1.25 - 0.25 * pT})`, filter: `blur(${(1 - pT) * 16}px)` }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 215, lineHeight: 1, color: C.orange, letterSpacing: 4, textShadow: `0 0 60px ${C.glow}cc` }}>TRABAJA</span>
      </div>
    </AbsoluteFill>
  );
};
const GuardaFront: React.FC = () => {
  const t = useT();
  return (
    <div style={{ position: "absolute", top: 1330, left: 0, right: 0, textAlign: "center", fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 96, color: C.white, textShadow: "0 6px 24px rgba(0,0,0,.6)" }}>
      <span style={{ opacity: spr(t, 53.76) * (1 - ramp(t, 55.8, 56.0)) }}>información.</span>
      <span style={{ position: "absolute", left: 0, right: 0, opacity: spr(t, 57.2) }}>con esa información.</span>
    </div>
  );
};

// ---------------- logo 3D ----------------
const Logo3D: React.FC = () => {
  const t = useT(); if (!inW(t, W.logo)) return null;
  const p = spr(t, 58.36, 10); const out = 1 - ramp(t, W.logo[1] - 0.2, W.logo[1]);
  const wob = Math.sin((t - 58.36) * 2.4) * 16;
  return (
    <AbsoluteFill style={{ perspective: 1000 }}>
      <div style={{ position: "absolute", left: 600, top: 820, width: 320, opacity: p * out, transform: `scale(${p}) rotateY(${wob + (1 - p) * 120}deg) rotateZ(6deg)`, filter: `drop-shadow(0 20px 30px rgba(0,0,0,.6)) drop-shadow(0 0 30px ${C.gold}88)` }}>
        <Img src={staticFile("werkalec-isotipo.png")} style={{ width: "100%" }} />
      </div>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,8,6,.75) 0%, rgba(10,8,6,.45) 35%, rgba(0,0,0,0) 55%)", opacity: spr(t, 60.38) * out }} />
      <div style={{ position: "absolute", left: 90, top: 330, opacity: spr(t, 60.38) * out }}>
        <div style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 84, color: C.white, textShadow: "0 6px 20px rgba(0,0,0,.6)" }}>una nueva forma de</div>
        <div style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 104, color: C.orange, lineHeight: 0.95, textShadow: `0 0 30px ${C.glow}aa`, opacity: spr(t, 61.42) }}>GESTIONAR<br />RELACIONES</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- la era del ARM ----------------
const Era: React.FC = () => {
  const t = useT(); if (!inW(t, W.era)) return null;
  const pA = spr(t, 65.4, 10);
  return (
    <AbsoluteFill style={{ opacity: win(t, W.era[0], W.era[1], 0.15) }}>
      <Cascade top={820} lines={[{ at: 63.76, txt: "Bienvenidos", size: 130, dx: -40 }, { at: 64.72, txt: "a la era del", size: 110, dx: 60 }]} />
      <div style={{ position: "absolute", top: 1040, left: 0, right: 0, textAlign: "center", opacity: pA, transform: `scale(${1.4 - 0.4 * pA})`, filter: `blur(${(1 - pA) * 14}px)` }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 330, color: C.orange, lineHeight: 1, textShadow: `0 0 70px ${C.glow}cc` }}>ARM</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- 13. "COSTOSO ANOTADOR" rojo neón detrás ----------------
const AnotBehind: React.FC = () => {
  const t = useT();
  const p1 = spr(t, 68.02), p2 = spr(t, 68.46);
  const flick = (at: number) => (t - at < 0.25 ? (Math.floor((t - at) * 30) % 2 ? 0.35 : 1) : 1);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000" }} />
      <div style={{ position: "absolute", top: 305, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 36, letterSpacing: 6, color: C.gray, opacity: ramp(t, 66.14, 66.4) }}>TU CRM PUEDE DEJAR DE SER UN</div>
      <div style={{ position: "absolute", top: 360, left: 0, right: 0, textAlign: "center", opacity: p1 * flick(68.02) }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 205, lineHeight: 1, color: C.red, textShadow: `0 0 40px ${C.red}, 0 0 110px ${C.red}aa` }}>COSTOSO</span>
      </div>
      <div style={{ position: "absolute", top: 575, left: 0, right: 0, textAlign: "center", opacity: p2 * flick(68.46) }}>
        <span style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 165, lineHeight: 1, color: "transparent", WebkitTextStroke: `4px ${C.red}`, filter: `drop-shadow(0 0 18px ${C.red})` }}>ANOTADOR</span>
      </div>
    </AbsoluteFill>
  );
};
const AnotFront: React.FC = () => {
  const t = useT();
  return <div style={{ position: "absolute", top: 1380, left: 0, right: 0, textAlign: "center", fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 96, color: C.white, opacity: spr(t, 68.94), textShadow: "0 6px 24px rgba(0,0,0,.7)" }}>de contactos.</div>;
};

// ---------------- CTA + placa final ----------------
const CTA: React.FC = () => {
  const t = useT(); if (!inW(t, [69.9, DURATION])) return null;
  const p = spr(t, 69.9, 11);
  return (
    <div style={{ position: "absolute", top: 380, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}>
      <div style={{ background: C.orange, color: "#1A1208", fontFamily: MONT, fontWeight: 800, fontSize: 64, padding: "18px 44px", borderRadius: 60, boxShadow: `0 0 50px ${C.glow}aa` }}>Seguí a @werkalec</div>
    </div>
  );
};
const EndCard: React.FC = () => {
  const t = useT(); if (t < DURATION) return null;
  const p = spr(t, DURATION + 0.1), p2 = spr(t, DURATION + 0.6);
  return (
    <AbsoluteFill style={{ opacity: ramp(t, DURATION, DURATION + 0.3) }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #2C3548 0%, ${C.navy} 55%, #10141c 100%)` }} />
      <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
        <Img src={staticFile("werkalec-logo-oscuro.png")} style={{ width: 760 }} />
      </div>
      <div style={{ position: "absolute", top: 1000, left: 0, right: 0, textAlign: "center", opacity: p2 }}>
        <div style={{ width: 140, height: 3, background: C.gold, margin: "0 auto 40px" }} />
        <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 60, color: C.white }}>@werkalec</div>
        <div style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 54, color: C.gold, marginTop: 14 }}>werkalec.com.ar</div>
      </div>
    </AbsoluteFill>
  );
};
const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 66, top: 262, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: "rgba(255,255,255,.72)", letterSpacing: 1, textShadow: "0 2px 6px rgba(0,0,0,.6)" }}>✦ generado con IA</div>
);

const Win: React.FC<{ w: [number, number]; children: React.ReactNode }> = ({ w, children }) => {
  const t = useT(); return inW(t, w) ? <>{children}</> : null;
};

const SFX: { at: number; f: string; v?: number }[] = [
  { at: 0.02, f: "whoosh", v: 0.5 }, { at: 1.74, f: "boom", v: 0.35 },
  ...CUTS.slice(1).map((c) => ({ at: c, f: "whoosh", v: 0.18 })),
  ...TASK_WORDS.filter((_, i) => i % 2).map((s) => ({ at: s.at, f: "pop", v: 0.4 })),
  { at: W.ecu[0], f: "whoosh", v: 0.5 }, { at: 13.72, f: "boom", v: 0.3 },
  { at: 14.32, f: "click", v: 0.6 }, { at: W.brill[0], f: "ding", v: 0.35 },
  { at: 17.88, f: "boom", v: 0.35 }, { at: 18.86, f: "whoosh", v: 0.4 }, { at: 19.42, f: "boom", v: 0.45 },
  { at: W.dif[0], f: "whoosh", v: 0.4 }, { at: 23.3, f: "pop", v: 0.5 },
  ...ICONS.map((k) => ({ at: k.at, f: "pop", v: 0.5 })),
  { at: 29.4, f: "whoosh", v: 0.45 }, ...MSGS.map((m) => ({ at: m.at, f: "click", v: 0.35 })), { at: 34.18, f: "ding", v: 0.35 },
  { at: W.collage[0], f: "whoosh", v: 0.5 }, { at: 45.54, f: "ding", v: 0.35 },
  { at: W.bokeh[0], f: "whoosh", v: 0.4 }, { at: 53.52, f: "boom", v: 0.3 }, { at: 56.6, f: "boom", v: 0.45 },
  { at: 58.36, f: "pop", v: 0.5 }, { at: 65.4, f: "boom", v: 0.45 }, { at: 68.02, f: "click", v: 0.6 }, { at: 68.46, f: "click", v: 0.6 },
  { at: 69.9, f: "pop", v: 0.5 }, { at: DURATION, f: "whoosh", v: 0.5 },
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Base />
    <Win w={W.ecu}><EcuVideo /></Win>
    <Wire />
    <Win w={W.arm}><ArmBehind /></Win>
    <Cutout w={W.arm} t0={CUT_T0.arm} file="cut_arm.webm" />
    <Win w={W.arm}><ArmFront /></Win>
    <Win w={W.guarda}><GuardaBehind /></Win>
    <Cutout w={W.guarda} t0={CUT_T0.guarda} file="cut_guarda.webm" glow={C.gold} shrink={0.84} />
    <Win w={W.guarda}><GuardaFront /></Win>
    <Win w={W.anot}><AnotBehind /></Win>
    <Cutout w={W.anot} t0={CUT_T0.anot} file="cut_anotador.webm" glow={C.red} shrink={0.72} />
    <Win w={W.anot}><AnotFront /></Win>
    <LensVignette w={W.lens1} />
    <LensVignette w={W.era} />
    <Tasks />
    <Ecu />
    <Brillante />
    <Lens1 />
    <Dif />
    <Polaroid />
    <Icons />
    <Phone />
    <Collage />
    <Handoff />
    <Bokeh />
    <Logo3D />
    <Era />
    <Hook />
    <Subs />
    <CTA />
    <LightLeak />
    <Flash at={W.dif[0]} d={0.15} />
    <Flash at={W.collage[0]} d={0.25} />
    <EndCard />
    <Watermark />
    {SFX.map((s, i) => (
      <Sequence key={i} from={f(s.at)} layout="none"><Audio src={staticFile(`${s.f}.wav`)} volume={s.v ?? 0.5} /></Sequence>
    ))}
  </AbsoluteFill>
);
