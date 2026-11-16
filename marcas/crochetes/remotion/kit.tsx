// ───────────────────────────────────────────────────────────────────────────
// KIT DE MOTION · CROCHETES by María  — v2 (reconstruido cuadro a cuadro desde la referencia a 30 fps)
// Cada componente = un recurso del reel de referencia (ver marcas/crochetes/estilo.md).
// Paleta y fuentes de la web. Canvas 1080x1920. Tiempos en segundos.
// ───────────────────────────────────────────────────────────────────────────
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useVideoConfig } from "remotion";
import { C, TITLE, BODY, HAND, SHADOW, MARCA } from "./theme";
import { WORDS } from "./words";
import { useT } from "./lib";

// ───────── tiempo ─────────
const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const BACK = Easing.out(Easing.back(2.2));
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const prog = (t: number, a: number, d = 0.3, e = OUT) => interpolate(t, [a, a + d], [0, 1], { ...cl, easing: e });
const fadeOut = (t: number, to: number, d = 0.12) => interpolate(t, [to - d, to], [1, 0], cl);
const vis = (t: number, from: number, to: number) => t >= from && t < to;
/** caracteres tipeados (máquina de escribir) */
const typed = (t: number, at: number, n: number, cps: number) => Math.max(0, Math.min(n, Math.floor((t - at) * cps)));
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// ───────── cámara ─────────
export type CamKey = { at: number; zoom: number; fy?: number };
export const Cam: React.FC<{ keys: CamKey[]; until: number }> = ({ keys, until }) => {
  const t = useT();
  const { fps } = useVideoConfig();
  let k = keys[0];
  for (const x of keys) if (x.at <= t) k = x;
  const drift = 1 + 0.01 * Math.sin(t * 0.45);
  const endF = Math.ceil(until * fps);
  return (
    <Sequence durationInFrames={endF}>
      <OffthreadVideo src={staticFile("cam.mp4")} volume={(f) => interpolate(f, [endF - 4, endF], [1, 0], cl)}
        style={{ position: "absolute", width: 1080, height: 1920, objectFit: "cover", transform: `scale(${k.zoom * drift})`, transformOrigin: `50% ${k.fy ?? 18}%` }} />
    </Sequence>
  );
};

// ───────── karaoke (estilo.md) ─────────
type W = { w: string; s: number; e: number };
const buildChunks = (words: W[], max = 4) => {
  const out: { s: number; e: number; words: W[] }[] = [];
  let cur: W[] = [];
  words.forEach((w, i) => {
    const prev = words[i - 1];
    if (cur.length && (cur.length >= max || (prev && w.s - prev.e > 0.3))) { out.push({ s: cur[0].s, e: 0, words: cur }); cur = []; }
    cur.push(w);
    if (/[.?!,]$/.test(w.w)) { out.push({ s: cur[0].s, e: 0, words: cur }); cur = []; }
  });
  if (cur.length) out.push({ s: cur[0].s, e: 0, words: cur });
  out.forEach((c, i) => { const last = c.words[c.words.length - 1]; c.e = out[i + 1] ? Math.min(out[i + 1].s, last.e + 0.45) : last.e + 0.3; });
  return out;
};
const CHUNKS = buildChunks(WORDS);
export const Karaoke: React.FC<{ hide: [number, number][]; y?: number }> = ({ hide, y = 1490 }) => {
  const t = useT();
  if (hide.some(([a, b]) => t >= a && t < b)) return null;
  const ch = CHUNKS.find((c) => t >= c.s && t < c.e);
  if (!ch) return null;
  const a = prog(t, ch.s, 0.12);
  return (
    <div style={{ position: "absolute", top: y - 45, left: 108, right: 108, display: "flex", justifyContent: "center", opacity: a, transform: `translateY(${(1 - a) * 10}px)` }}>
      <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 54, lineHeight: 1.25, color: C.white, textAlign: "center", textShadow: SHADOW.sub, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 14px", maxWidth: 864 }}>
        {ch.words.map((w, i) => {
          const on = t >= w.s && t < w.e + 0.04;
          return <span key={i} style={{ color: on ? C.azul : C.white, fontWeight: on ? 700 : 600 }}>{w.w.replace(/[.,]$/, "")}</span>;
        })}
      </div>
    </div>
  );
};

// ───────── piezas de apoyo ─────────
const Center: React.FC<{ y: number; x?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ y, x = 540, children, style }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, 0)", whiteSpace: "pre", ...style }}>{children}</div>
);
/** destello ✦ de 4 puntas */
const Spark: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({ size, color = C.white, style }) => (
  <svg width={size * 2} height={size * 2} viewBox="-1 -1 2 2" style={{ position: "absolute", overflow: "visible", ...style }}>
    <path d="M0 -1 Q .12 -.12 1 0 Q .12 .12 0 1 Q -.12 .12 -1 0 Q -.12 -.12 0 -1Z" fill={color} />
  </svg>
);
const starPts = (r: number) => Array.from({ length: 10 }, (_, i) => { const a = (Math.PI / 5) * i - Math.PI / 2; const rr = i % 2 ? r * 0.45 : r; return `${Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(" ");
type StickerKind = "star" | "spark" | "flower" | "heart" | "yarn";
const StickerSvg: React.FC<{ kind: StickerKind; size: number; color: string }> = ({ kind, size: s, color }) => (
  <svg width={s * 2} height={s * 2} viewBox={`${-s} ${-s} ${s * 2} ${s * 2}`} style={{ overflow: "visible", filter: "drop-shadow(0 3px 6px rgba(0,0,0,.25))" }}>
    {kind === "star" && <polygon points={starPts(s * 0.95)} fill={color} stroke={C.white} strokeWidth={3} strokeLinejoin="round" />}
    {kind === "spark" && <path d={`M0 ${-s} Q ${s * .12} ${-s * .12} ${s} 0 Q ${s * .12} ${s * .12} 0 ${s} Q ${-s * .12} ${s * .12} ${-s} 0 Q ${-s * .12} ${-s * .12} 0 ${-s}Z`} fill={color} />}
    {kind === "flower" && <g>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cy={-s * .45} rx={s * .32} ry={s * .48} fill={color} stroke={C.white} strokeWidth={2.5} transform={`rotate(${a})`} />)}<circle r={s * .26} fill={C.lino} /></g>}
    {kind === "heart" && <path d={`M0 ${s * .8} C ${-s} 0 ${-s * .6} ${-s * .85} 0 ${-s * .3} C ${s * .6} ${-s * .85} ${s} 0 0 ${s * .8}Z`} fill={color} stroke={C.white} strokeWidth={3} />}
    {kind === "yarn" && <g><circle r={s * .8} fill={color} stroke={C.white} strokeWidth={3} />{[-.5, -.15, .2, .55].map((k, j) => <path key={j} d={`M ${-s * .75} ${k * s} Q 0 ${(k - .35) * s} ${s * .75} ${k * s}`} stroke={C.lino} strokeWidth={4} fill="none" />)}</g>}
  </svg>
);

// ═════════ RECURSO 1 · script que se escribe + destellos que titilan ═════════
export const ScriptWrite: React.FC<{ from: number; to: number; text: string; y: number; x?: number; size?: number; color?: string; rot?: number; dur?: number; sparks?: boolean; shadow?: boolean }> = ({ from, to, text, y, x = 540, size = 96, color = C.lino, rot = -4, dur = 0.5, sparks = true, shadow = true }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const r = prog(t, from, dur, Easing.inOut(Easing.quad));
  const w = text.length * size * 0.4;
  const sp = [[-w / 2 - 40, -10, 22], [w / 2 + 30, -30, 16], [-w / 2 + 30, size * .95, 14], [w / 2 - 10, size * .85, 24], [w * .1, -45, 12]];
  return (
    <Center y={y} x={x} style={{ opacity: fadeOut(t, to) }}>
      <span style={{ display: "inline-block", fontFamily: HAND, fontWeight: 700, fontSize: size, color, lineHeight: 1.05, textShadow: shadow ? SHADOW.soft : "none", transform: `rotate(${rot}deg)`, clipPath: `inset(-30% ${100 - r * 100}% -30% -5%)` }}>{text}</span>
      {sparks && sp.map(([dx, dy, s], i) => {
        const a = prog(t, from + 0.06 * i, 0.2, BACK);
        const tw = 0.6 + 0.4 * Math.abs(Math.sin((t - from) * 7 + i * 1.7));
        return <Spark key={i} size={s} style={{ left: `calc(50% + ${dx}px)`, top: dy, transform: `translate(-50%,-50%) scale(${a * tw})` }} />;
      })}
    </Center>
  );
};

// ═════════ RECURSO 5/14 · palabra con ECO gigante que se cierra sobre ella ═════════
export const GhostZoom: React.FC<{ at: number; to: number; text: string; y: number; size?: number; color?: string; shadow3d?: boolean }> = ({ at, to, text, y, size = 160, color = C.lino, shadow3d = true }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const g = prog(t, at, 0.2, Easing.out(Easing.cubic));
  const s = interpolate(t, [at, at + 0.12, at + 0.24], [0.8, 1.06, 1], cl);
  const style: React.CSSProperties = { fontFamily: TITLE, fontWeight: 900, fontSize: size, lineHeight: 0.95, letterSpacing: "-0.01em" };
  return (
    <Center y={y} style={{ opacity: fadeOut(t, to) }}>
      {g < 1 && <span style={{ ...style, position: "absolute", left: 0, top: 0, color, opacity: 0.45 * (1 - g), transform: `scale(${2.6 - 1.6 * g})`, transformOrigin: "50% 0%" }}>{text}</span>}
      <span style={{ ...style, display: "inline-block", color, opacity: prog(t, at, 0.06), transform: `scale(${s})`, textShadow: shadow3d ? `${SHADOW.pop3d}, 0 10px 30px rgba(0,0,0,.25)` : SHADOW.soft }}>{text}</span>
    </Center>
  );
};

// ═════════ RECURSO 3 · dos palabras que caen desde lados distintos y se balancean (subibaja) + se desarman ═════════
export const BounceDuo: React.FC<{ to: number; y: number; a: { text: string; at: number }; b: { text: string; at: number }; size?: number }> = ({ to, y, a, b, size = 112 }) => {
  const t = useT();
  if (!vis(t, a.at, to)) return null;
  const word = (w: { text: string; at: number }, from: [number, number], phase: number, idx: number) => {
    if (t < w.at) return <span key={idx} style={{ opacity: 0 }}>{w.text}</span>;
    const p = prog(t, w.at, 0.28, BACK);
    const lt = t - w.at;
    const bob = 16 * Math.sin(lt * 13 + phase) * Math.exp(-lt * 2.6);
    const dis = prog(t, to - 0.22, 0.2);
    return (
      <span key={idx} style={{ display: "inline-block", transform: `translate(${from[0] * (1 - p)}px, ${from[1] * (1 - p) + bob}px) rotate(${(1 - p) * from[0] * 0.05}deg)` }}>
        {w.text.split("").map((ch, i) => (
          <span key={i} style={{ display: "inline-block", opacity: 1 - dis * (0.6 + 0.4 * rnd(i + idx * 9)), transform: `translate(${(rnd(i + 3) - 0.5) * 90 * dis}px, ${(rnd(i + 7) - 0.5) * 70 * dis}px) scale(${1 - 0.4 * dis})`, filter: `blur(${dis * 6}px)` }}>{ch}</span>
        ))}
      </span>
    );
  };
  return (
    <Center y={y}>
      <div style={{ fontFamily: TITLE, fontWeight: 800, fontSize: size, color: C.white, textShadow: SHADOW.soft, display: "flex", gap: 26, lineHeight: 1 }}>
        {word(a, [-300, 200], 0, 0)}
        {word(b, [300, 240], Math.PI, 1)}
      </div>
    </Center>
  );
};

// ═════════ RECURSO 2 · globo de diálogo con texto SELECCIONADO que se tipea ═════════
export const BubbleSelect: React.FC<{ from: number; to: number; text: string; y: number; cps?: number; strikeAt?: number; size?: number }> = ({ from, to, text, y, cps = 26, strikeAt, size = 54 }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const n = typed(t, from + 0.06, text.length, cps);
  const pp = prog(t, from, 0.18, BACK);
  const st = strikeAt !== undefined ? prog(t, strikeAt, 0.22) : 0;
  return (
    <Center y={y} style={{ opacity: fadeOut(t, to), transform: `translate(-50%,0) scale(${pp})`, transformOrigin: "15% 100%" }}>
      <div style={{ position: "relative", background: C.white, borderRadius: 18, padding: "16px 26px", boxShadow: "0 12px 30px rgba(0,0,0,.22)" }}>
        <div style={{ position: "absolute", left: 38, bottom: -20, width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderTop: `22px solid ${C.white}` }} />
        <span style={{ position: "relative", fontFamily: BODY, fontWeight: 500, fontSize: size, color: C.grafito }}>
          <span style={{ position: "absolute", inset: "-2px -6px", background: "rgba(27,151,200,.25)", borderRadius: 3 }} />
          <span style={{ position: "relative" }}>{text.slice(0, n)}</span>
          <span style={{ visibility: "hidden" }}>{text.slice(n)}</span>
          {/* handles */}
          <span style={{ position: "absolute", left: -8, top: -6, width: 4, height: size * 1.25, background: C.azul }}><span style={{ position: "absolute", left: -8, top: -16, width: 20, height: 20, borderRadius: 10, background: C.azul }} /></span>
          <span style={{ position: "absolute", right: -8, top: -6, width: 4, height: size * 1.25, background: C.azul }}><span style={{ position: "absolute", left: -8, bottom: -16, width: 20, height: 20, borderRadius: 10, background: C.azul }} /></span>
          {st > 0 && (
            <svg style={{ position: "absolute", left: -14, top: "18%", overflow: "visible" }} width="100%" height={size * 0.7} viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 12 Q 25 4 50 11 T 100 8" stroke={C.terracota} strokeWidth={4} fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" strokeDasharray={120} strokeDashoffset={120 * (1 - st)} style={{ strokeWidth: 9 }} />
            </svg>
          )}
        </span>
      </div>
    </Center>
  );
};

// ═════════ RECURSO 8 · MÁQUINA DE ESCRIBIR en tiras blancas (cada renglón su tira, crece con el texto) ═════════
export type TypeLine = { text: string; at: number; cps?: number };
export const TypeStrips: React.FC<{ from: number; to: number; y: number; lines: TypeLine[]; size?: number; gap?: number }> = ({ from, to, y, lines, size = 50, gap = 10 }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", flexDirection: "column", alignItems: "center", gap, opacity: fadeOut(t, to) }}>
      {lines.map((l, i) => {
        const n = typed(t, l.at, l.text.length, l.cps ?? 30);
        return (
          // la caja final ocupa su lugar (renglones centrados); la tira blanca crece desde la izquierda
          <div key={i} style={{ position: "relative", fontFamily: BODY, fontWeight: 500, fontSize: size, lineHeight: 1.18, whiteSpace: "pre" }}>
            <span style={{ visibility: "hidden", padding: "0 14px" }}>{l.text}</span>
            {n > 0 && (
              <span style={{ position: "absolute", left: 0, top: 0, background: C.white, color: C.grafito, padding: "0 14px", boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>{l.text.slice(0, n)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ═════════ RECURSO 9 · palabra que llega GIRANDO en órbita (anillo + papelitos) y estalla en fuegos artificiales ═════════
export const OrbitSpin: React.FC<{ at: number; to: number; text: string; y: number; size?: number; color?: string }> = ({ at, to, text, y, size = 140, color = C.lino }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const D = 0.36;
  const p = prog(t, at, D, Easing.inOut(Easing.cubic));
  const settle = at + D;
  const x = 140 * (1 - p) * (1 - p) + 60 * Math.sin(p * Math.PI) * (1 - p);
  const yy = 190 * (1 - p) * (1 - p);
  const rot = 72 * (1 - p);
  const sc = 0.32 + 0.68 * p + (t > settle ? 0.06 * Math.exp(-(t - settle) * 14) * Math.sin((t - settle) * 40) : 0);
  const ring = t < settle + 0.05;
  const burst = prog(t, settle + 0.02, 0.42, Easing.out(Easing.quad));
  return (
    <Center y={y} style={{ opacity: fadeOut(t, to) }}>
      <div style={{ position: "relative", transform: `translate(${x}px, ${yy}px) rotate(${rot}deg) scale(${sc})` }}>
        {ring && (
          <svg width={600} height={600} viewBox="-300 -300 600 600" style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${(t - at) * 900}deg)`, overflow: "visible" }}>
            <circle r={190 - 60 * p} fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" strokeDasharray={`${(190 - 60 * p) * 4} 2000`} opacity={1 - prog(t, settle - 0.05, 0.1)} />
          </svg>
        )}
        <span style={{ fontFamily: TITLE, fontWeight: 900, fontSize: size, color, lineHeight: 0.95, textShadow: `${SHADOW.pop3d}, 0 10px 30px rgba(0,0,0,.25)` }}>{text}</span>
      </div>
      {/* papelitos durante el viaje */}
      {t < settle + 0.25 && Array.from({ length: 9 }).map((_, i) => {
        const a = rnd(i) * Math.PI * 2, d = 120 + 260 * prog(t, at + 0.03 * i, 0.5);
        const col = [C.azul, C.arena, C.terracota][i % 3];
        return <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 18, height: 10, background: col, opacity: 1 - prog(t, settle, 0.25), transform: `translate(${Math.cos(a) * d}px, ${Math.abs(Math.sin(a)) * d * 0.45 + 40}px) rotate(${(t - at) * 600 + i * 40}deg)` }} />;
      })}
      {/* fuegos artificiales al asentarse */}
      {t > settle && burst < 1 && (
        <svg width={1000} height={600} viewBox="-500 -300 1000 600" style={{ position: "absolute", left: "50%", top: size * 0.45, transform: "translate(-50%,-50%)", overflow: "visible" }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2 + 0.2;
            const r0 = 130 + 260 * burst, r1 = r0 + (i % 2 ? 90 : 50) * (1 - burst);
            const fy = Math.sin(a) < 0 ? 0.28 : 0.7;
            return <line key={i} x1={Math.cos(a) * r0 * 1.5} y1={Math.sin(a) * r0 * fy} x2={Math.cos(a) * r1 * 1.5} y2={Math.sin(a) * r1 * fy} stroke={i % 2 ? C.white : C.azul} strokeWidth={i % 2 ? 4 : 11} strokeLinecap="round" opacity={1 - burst} />;
          })}
          {Array.from({ length: 10 }).map((_, i) => { const a = rnd(i + 20) * Math.PI * 2, r = 180 + 300 * burst; return <circle key={"d" + i} cx={Math.cos(a) * r} cy={Math.sin(a) * r * (Math.sin(a) < 0 ? 0.25 : 0.6)} r={6} fill={C.white} opacity={1 - burst} />; })}
        </svg>
      )}
    </Center>
  );
};

// ═════════ RECURSO 12 · sticker manuscrito con rayitos + flecha que se dibuja ═════════
export const StickerArrow: React.FC<{ at: number; to: number; x: number; y: number; text: string; bg?: string; fg?: string; arrow?: boolean }> = ({ at, to, x, y, text, bg = C.azul, fg = C.marino, arrow = true }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const s = prog(t, at, 0.22, BACK);
  const ln = prog(t, at + 0.08, 0.15);
  const ar = prog(t, at + 0.14, 0.3);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: fadeOut(t, to) }}>
      <div style={{ transform: `rotate(-6deg) scale(${s})`, transformOrigin: "0 100%", display: "inline-block", position: "relative" }}>
        <span style={{ fontFamily: HAND, fontWeight: 700, fontSize: 66, color: fg, background: bg, padding: "0 20px 4px", borderRadius: 10, display: "inline-block", boxShadow: "0 8px 20px rgba(0,0,0,.2)" }}>{text}</span>
        <svg width={60} height={60} viewBox="0 0 60 60" style={{ position: "absolute", right: -46, top: -40, overflow: "visible" }}>
          {[[10, 40, 18, 18], [28, 36, 44, 16], [36, 50, 56, 44]].map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * ln} y2={y1 + (y2 - y1) * ln} stroke={C.terracota} strokeWidth={6} strokeLinecap="round" />)}
        </svg>
      </div>
      {arrow && (
        <svg width={120} height={150} viewBox="0 0 120 150" style={{ position: "absolute", left: 18, top: 84, overflow: "visible" }}>
          <path d="M20 0 C 0 50, 10 100, 70 120" stroke={C.terracota} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - ar)} />
          {ar > 0.9 && <path d="M50 100 L 72 121 L 46 136" stroke={C.terracota} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      )}
    </div>
  );
};

// ═════════ RECURSO 12 · palabra gigante que se arma LETRA POR LETRA desde abajo con rebote (+ salida en caída) ═════════
export const LetterDrop: React.FC<{ at: number; to: number; text: string; y: number; x?: number; size?: number; step?: number; color?: string; exitAt?: number; shadow?: boolean }> = ({ at, to, text, y, x = 540, size = 160, step = 0.075, color = C.lino, exitAt, shadow = true }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const letters = text.split("");
  return (
    <Center y={y} x={x}>
      <span style={{ fontFamily: TITLE, fontWeight: 900, fontSize: size, color, lineHeight: 0.95, textShadow: shadow ? `${SHADOW.pop3d}, 0 10px 26px rgba(0,0,0,.22)` : "none" }}>
        {letters.map((l, i) => {
          const a = at + i * step;
          const sc = interpolate(t, [a, a + 0.1, a + 0.2], [0.3, 1.12, 1], cl);
          const dy = interpolate(t, [a, a + 0.14], [90, 0], { ...cl, easing: OUT });
          const ex = exitAt !== undefined ? prog(t, exitAt + i * 0.025, 0.14, Easing.in(Easing.quad)) : 0;
          return <span key={i} style={{ display: "inline-block", opacity: (t >= a ? Math.min(1, (t - a) * 14) : 0) * (1 - ex), transform: `translateY(${dy + ex * 160}px) scale(${sc}) rotate(${ex * (i % 2 ? 20 : -20)}deg)`, transformOrigin: "50% 100%" }}>{l === " " ? " " : l}</span>;
        })}
      </span>
    </Center>
  );
};

// ═════════ etiqueta que se TIPEA (ME DEBE DINERO) ═════════
export const TypeTag: React.FC<{ at: number; to: number; text: string; y: number; x?: number; cps?: number; bg?: string; fg?: string; size?: number; rot?: number }> = ({ at, to, text, y, x = 540, cps = 24, bg = C.terracota, fg = C.white, size = 54, rot = -2 }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const n = typed(t, at, text.length, cps);
  if (n === 0) return null;
  return (
    <Center y={y} x={x} style={{ opacity: fadeOut(t, to), transform: `translate(-50%,0) rotate(${rot}deg)` }}>
      <span style={{ position: "relative", fontFamily: TITLE, fontWeight: 800, fontSize: size, letterSpacing: "0.03em" }}>
        <span style={{ visibility: "hidden", padding: "4px 20px" }}>{text}</span>
        <span style={{ position: "absolute", left: 0, top: 0, background: bg, color: fg, padding: "4px 20px", borderRadius: 8, boxShadow: "0 8px 18px rgba(0,0,0,.2)" }}>{text.slice(0, n)}</span>
      </span>
    </Center>
  );
};

// ═════════ RECURSO 10 · nota de papel: entra deslizando, marcador que se tipea, resaltador que barre por delante ═════════
export type NoteLine = { text: string; at: number; cps?: number };
export const PaperNote: React.FC<{ from: number; to: number; x: number; y: number; w: number; lines: NoteLine[]; mark?: { line: number; at: number; dur?: number } }> = ({ from, to, x, y, w, lines, mark }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const sIn = prog(t, from, 0.22, BACK);
  const rot = -6 + 2 * prog(t, from, to - from, Easing.linear);
  const drift = 14 * prog(t, from, to - from, Easing.linear);
  const m = mark ? prog(t, mark.at, mark.dur ?? 0.4, Easing.inOut(Easing.quad)) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, opacity: fadeOut(t, to), transform: `translate(${(1 - sIn) * 500 + drift}px, ${-drift * 0.5}px) rotate(${rot}deg)`, transformOrigin: "20% 50%" }}>
      <div style={{ position: "relative", background: C.white, padding: "28px 34px 30px 58px", boxShadow: "0 16px 34px rgba(0,0,0,.28)", backgroundImage: `repeating-linear-gradient(${C.white} 0 62px, rgba(27,151,200,.35) 62px 64px)`, backgroundPosition: "0 22px" }}>
        <div style={{ position: "absolute", left: 38, top: 0, bottom: 0, width: 3, background: C.terracota, opacity: 0.8 }} />
        {lines.map((l, i) => {
          const n = typed(t, l.at, l.text.length, l.cps ?? 22);
          return (
            <div key={i} style={{ position: "relative", fontFamily: HAND, fontWeight: 700, fontSize: 62, lineHeight: "64px", color: C.grafito, letterSpacing: "0.04em", whiteSpace: "pre" }}>
              {mark && mark.line === i && <span style={{ position: "absolute", left: -6, top: 26, height: 30, width: "96%", background: "rgba(27,151,200,.42)", transform: `scaleX(${m}) rotate(-1deg)`, transformOrigin: "left", borderRadius: 6 }} />}
              <span style={{ position: "relative" }}>{l.text.slice(0, n)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═════════ RECURSO 7 · explosión de stickers + palabra que se arma de DERECHA A IZQUIERDA con estrella-cursor + arco que crece ═════════
export const StickerBurstBuild: React.FC<{ at: number; to: number; text: string; y: number; size?: number; chip?: { text: string; at: number }; color?: string; softShadow?: boolean }> = ({ at, to, text, y, size = 120, chip, color = C.lino, softShadow = true }) => {
  const t = useT();
  if (!vis(t, chip ? Math.min(chip.at, at) : at, to)) return null;
  const letters = text.split("");
  const step = 0.045;
  const nVis = Math.max(0, Math.min(letters.length, Math.floor((t - at) / step) + 1));
  const building = t >= at && nVis < letters.length;
  const exit = prog(t, to - 0.16, 0.16, Easing.in(Easing.quad));
  const arc = prog(t, at - 0.05, 0.55, Easing.inOut(Easing.quad));
  const W = letters.length * size * 0.72;
  const Wk = Math.min(W, 800); // stickers siempre dentro del cuadro
  const stickers: { k: StickerKind; dx: number; dy: number; s: number; c: string; d: number; spin?: boolean }[] = [
    { k: "spark", dx: -Wk / 2 - 60, dy: 30, s: 46, c: C.azul, d: 0.0, spin: true },
    { k: "flower", dx: -Wk / 2 + 20, dy: -110, s: 34, c: C.azul, d: 0.08 },
    { k: "heart", dx: Wk / 2 + 40, dy: -60, s: 32, c: C.terracota, d: 0.12 },
    { k: "star", dx: Wk / 2 + 70, dy: 70, s: 40, c: C.terracota, d: 0.05, spin: true },
    { k: "spark", dx: Wk / 2 - 40, dy: 160, s: 30, c: C.white, d: 0.18 },
    { k: "yarn", dx: -Wk / 2 - 20, dy: 170, s: 30, c: C.arena, d: 0.22 },
    { k: "spark", dx: 0, dy: -150, s: 20, c: C.white, d: 0.26 },
  ];
  return (
    <Center y={y} style={{ transform: `translate(-50%,0) scale(${1 - exit})`, opacity: 1 - exit }}>
      {chip && t >= chip.at && (
        <div style={{ position: "absolute", left: "50%", top: -size * 0.62, transform: `translateX(-50%) scale(${prog(t, chip.at, 0.2, BACK)})` }}>
          <span style={{ fontFamily: TITLE, fontWeight: 700, fontSize: 46, color: C.white, background: C.terracota, padding: "2px 16px 4px", borderRadius: 6 }}>{chip.text}</span>
        </div>
      )}
      {/* arco de 3 bandas (versión de marca del arcoíris) */}
      <svg width={W + 200} height={300} viewBox={`${-(W + 200) / 2} -260 ${W + 200} 300`} style={{ position: "absolute", left: "50%", top: -size * 0.15, transform: "translate(-50%,-100%)", overflow: "visible", opacity: t >= at - 0.05 ? 1 : 0 }}>
        {[C.azul, C.lino, C.terracota].map((c, i) => {
          const r = W / 2 + 40 - i * 22;
          const L = Math.PI * r * 0.75;
          return <path key={i} d={`M ${-r} 20 A ${r} ${r * 0.34} 0 0 1 ${r} 20`} stroke={c} strokeWidth={20} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - arc)} opacity={0.92} />;
        })}
      </svg>
      <span style={{ position: "relative", fontFamily: TITLE, fontWeight: 900, fontSize: size, color, lineHeight: 0.95, textShadow: softShadow ? `${SHADOW.pop3d}, 0 10px 26px rgba(0,0,0,.22)` : SHADOW.pop3d }}>
        {letters.map((l, i) => {
          const order = letters.length - 1 - i; // derecha → izquierda
          const shown = t >= at && order < nVis;
          const a = at + order * step;
          return <span key={i} style={{ display: "inline-block", opacity: shown ? 1 : 0, transform: `scale(${interpolate(t, [a, a + 0.08, a + 0.16], [1.6, 0.94, 1], cl)})` }}>{l}</span>;
        })}
        {building && (
          <span style={{ position: "absolute", top: "10%", left: `${((letters.length - nVis) / letters.length) * 100}%`, transform: `translate(-50%,0) rotate(${(t - at) * 720}deg)` }}>
            <StickerSvg kind="star" size={36} color={C.arena} />
          </span>
        )}
      </span>
      {stickers.map((st, i) => {
        const p = prog(t, at + st.d, 0.24, BACK);
        const tw = st.k === "spark" ? 0.8 + 0.2 * Math.sin((t - at) * 10 + i) : 1 + 0.05 * Math.sin((t - at) * 6 + i);
        return <div key={i} style={{ position: "absolute", left: `calc(50% + ${st.dx}px)`, top: size * 0.45 + st.dy, transform: `translate(-50%,-50%) scale(${p * tw}) rotate(${st.spin ? (t - at) * 120 : 0}deg)` }}><StickerSvg kind={st.k} size={st.s} color={st.c} /></div>;
      })}
    </Center>
  );
};

// ═════════ RECURSO 13 · fichas por palabra (PERO · LA) con estrellas que giran ═════════
export const WordChips: React.FC<{ to: number; y: number; words: { text: string; at: number }[]; bg?: string; fg?: string; size?: number; stars?: boolean }> = ({ to, y, words, bg = C.terracota, fg = C.white, size = 52, stars = true }) => {
  const t = useT();
  if (!vis(t, words[0].at, to)) return null;
  return (
    <Center y={y} style={{ opacity: fadeOut(t, to), display: "flex", gap: 10, alignItems: "center" }}>
      {stars && <span style={{ display: "inline-block", transform: `scale(${prog(t, words[0].at, 0.2, BACK)}) rotate(${(t - words[0].at) * 140}deg)`, marginRight: 6 }}><StickerSvg kind="star" size={30} color={C.arena} /></span>}
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", fontFamily: TITLE, fontWeight: 800, fontSize: size, color: fg, background: bg, padding: "2px 16px 4px", borderRadius: 6, transform: `scale(${prog(t, w.at, 0.2, BACK)})`, opacity: t >= w.at ? 1 : 0 }}>{w.text}</span>
      ))}
    </Center>
  );
};

// ═════════ RECURSO 14 · NUBE: puf que nace, crece hasta tapar la palabra y estalla en nubes de contorno ═════════
const CLOUD = "M14 58 C2 58 0 44 10 40 C6 26 22 18 32 24 C36 8 58 4 66 18 C76 8 96 14 94 30 C108 30 110 50 98 56 C96 62 20 62 14 58 Z";
export const CloudPop: React.FC<{ at: number; y: number; w?: number }> = ({ at, y, w = 820 }) => {
  const t = useT();
  if (t < at || t > at + 0.95) return null;
  const p1 = prog(t, at, 0.12, BACK); // puf central
  const p2 = prog(t, at + 0.1, 0.18, OUT); // cúmulo que tapa
  const p3 = prog(t, at + 0.28, 0.6, Easing.out(Easing.quad)); // estallido a contorno
  const puffs = [[0, 0, 1.25], [-0.32, 0.08, 1], [0.32, 0.06, 1.05], [-0.18, -0.2, 0.85], [0.2, -0.18, 0.9], [-0.42, -0.06, 0.7], [0.44, -0.08, 0.75]];
  return (
    <div style={{ position: "absolute", left: 540, top: y, width: 0, height: 0 }}>
      {puffs.map(([dx, dy, s], i) => {
        const grow = i === 0 ? p1 : p2;
        const filled = 1 - p3;
        const side = dx === 0 ? (i % 2 ? 1 : -1) : Math.sign(dx);
        const out = p3 * (260 + 120 * Math.abs(dx));
        const size = 230 * s * (0.4 + 0.6 * grow) * (1 + 0.25 * p3);
        return (
          <svg key={i} width={size} height={size * 0.6} viewBox="0 0 110 64" style={{ position: "absolute", left: dx * w * (0.5 + 0.5 * grow) + side * out - size / 2, top: dy * 260 - size * 0.3 - p3 * 30, overflow: "visible", opacity: grow * (1 - p3 * 0.95) }}>
            <path d={CLOUD} fill={C.white} opacity={filled} />
            <path d={CLOUD} fill="none" stroke={C.white} strokeWidth={3.2} opacity={p3 > 0 ? 1 : 0} />
          </svg>
        );
      })}
    </div>
  );
};

// ───────── flash / marca de agua ─────────
export const Flash: React.FC<{ at: number[] }> = ({ at }) => {
  const t = useT();
  const o = Math.max(0, ...at.map((a) => interpolate(t, [a - 0.03, a, a + 0.1], [0, 0.85, 0], cl)));
  return o > 0 ? <AbsoluteFill style={{ background: C.lino, opacity: o }} /> : null;
};
export const AiMark: React.FC = () => (
  <div style={{ position: "absolute", top: 236, right: 44, fontFamily: BODY, fontWeight: 600, fontSize: 26, color: C.white, textShadow: "0 1px 4px rgba(0,0,0,.55)" }}>{MARCA.aiWatermark}</div>
);

// ───────── sonido ─────────
export type SfxName = "whoosh" | "pop" | "ding" | "click" | "boom" | "tick" | "paper" | "sparkle" | "type" | "poof";
export type SfxItem = { at: number; f: SfxName; v?: number };
export const Sfx: React.FC<{ list: SfxItem[] }> = ({ list }) => {
  const { fps } = useVideoConfig();
  return <>{list.map((s, i) => <Sequence key={i} from={Math.max(0, Math.round(s.at * fps))} durationInFrames={fps}><Audio src={staticFile(`sfx/${s.f}.wav`)} volume={(s.v ?? 1) * 0.3} /></Sequence>)}</>;
};
/** tecleo sincronizado con un texto tipeado (1 golpe cada 2 caracteres) */
export const typeSfx = (at: number, text: string, cps = 30, v = 0.5): SfxItem[] =>
  Array.from({ length: Math.ceil(text.replace(/ /g, "").length / 2) }, (_, i) => ({ at: at + (i * 2) / cps, f: "type" as const, v }));

// ───────── placa final ─────────
export const EndCard: React.FC<{ from: number; kicker: string; title: string; items: string[]; cta: string; handle: string }> = ({ from, kicker, title, items, cta, handle }) => {
  const t = useT();
  if (t < from) return null;
  const up = prog(t, from, 0.32);
  return (
    <AbsoluteFill style={{ transform: `translateY(${(1 - up) * 1920}px)` }}>
      <AbsoluteFill style={{ background: C.lino }}>
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.55 }}>
          <path d="M -20 300 Q 270 250 540 300 T 1100 300" stroke={C.arena} strokeWidth={3} fill="none" strokeDasharray="14 12" />
          <path d="M -20 1650 Q 270 1600 540 1650 T 1100 1650" stroke={C.arena} strokeWidth={3} fill="none" strokeDasharray="14 12" />
        </svg>
        <div style={{ position: "absolute", top: 360, width: 1080, textAlign: "center", transform: `scale(${prog(t, from + 0.25, 0.25, BACK)})` }}>
          <Img src={staticFile("logos/crochetes-logo-horizontal-color.png")} style={{ width: 420 }} />
        </div>
      </AbsoluteFill>
      <ScriptWrite from={from + 0.4} to={99} text={kicker} y={590} size={64} color={C.terracota} rot={-3} sparks={false} shadow={false} />
      <LetterDrop at={from + 0.55} to={99} text={title} y={680} size={96} color={C.grafito} step={0.04} shadow={false} />
      <div style={{ position: "absolute", top: 860, left: 210, width: 700 }}>
        {items.map((it, i) => {
          const at = from + 1.0 + i * 0.2;
          const n = typed(t, at, it.length, 40);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 18, height: 64 }}>
              <span style={{ width: 54, height: 54, borderRadius: 27, background: C.azul, display: "inline-flex", alignItems: "center", justifyContent: "center", transform: `scale(${prog(t, at, 0.18, BACK)})` }}>
                <svg width={30} height={30} viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" stroke={C.marino} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - prog(t, at + 0.08, 0.15))} /></svg>
              </span>
              {n > 0 && <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 50, color: C.grafito, background: C.white, padding: "0 12px" }}>{it.slice(0, n)}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1300, width: 1080, textAlign: "center" }}>
        <div style={{ display: "inline-block", transform: `scale(${prog(t, from + 2.2, 0.25, BACK)})` }}>
          <span style={{ display: "inline-block", background: C.marino, color: C.white, fontFamily: TITLE, fontWeight: 800, fontSize: 50, padding: "18px 40px", borderRadius: 12 }}>{cta}</span>
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40, color: C.chocolate, marginTop: 22, opacity: prog(t, from + 2.4, 0.2) }}>{handle}</div>
      </div>
    </AbsoluteFill>
  );
};
