// ───────────────────────────────────────────────────────────────────────────
// KIT DE MOTION · CROCHETES by María  (reutilizable entre reels; no editar por video)
// Gramática del reel de referencia (ver marcas/crochetes/estilo.md → tabla de 15 recursos),
// con la paleta y las fuentes de la web. Canvas 1080x1920.
// ───────────────────────────────────────────────────────────────────────────
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useVideoConfig } from "remotion";
import { C, TITLE, BODY, HAND, SHADOW, MARCA } from "./theme";
import { WORDS } from "./words";
import { useT } from "./lib";

// ---------- tiempo ----------
const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
export const prog = (t: number, a: number, d = 0.35) =>
  interpolate(t, [a, a + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
/** scale-pop 0.6 → 1.05 → 1 (recurso #5) */
export const popScale = (t: number, a: number, d = 0.32) =>
  interpolate(t, [a, a + d * 0.65, a + d], [0.6, 1.06, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
const fadeOut = (t: number, to: number, d = 0.18) => interpolate(t, [to - d, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const vis = (t: number, from: number, to: number) => t >= from && t < to;

// ---------- cámara ----------
export type CamKey = { at: number; zoom: number; fy?: number };
/** Cámara completa. Cambios de zoom = corte seco (disimulan los jump cuts). Audio con fade al final. */
export const Cam: React.FC<{ keys: CamKey[]; until: number }> = ({ keys, until }) => {
  const t = useT();
  const { fps } = useVideoConfig();
  let k = keys[0];
  for (const x of keys) if (x.at <= t) k = x;
  const drift = 1 + 0.01 * Math.sin(t * 0.45);
  const endF = Math.ceil(until * fps);
  return (
    <Sequence durationInFrames={endF}>
      <OffthreadVideo
        src={staticFile("cam.mp4")}
        volume={(f) => interpolate(f, [endF - 4, endF], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        style={{
          position: "absolute", width: 1080, height: 1920, objectFit: "cover",
          transform: `scale(${k.zoom * drift})`, transformOrigin: `50% ${k.fy ?? 22}%`,
        }}
      />
    </Sequence>
  );
};

// ---------- subtítulos karaoke (estilo.md: Work Sans 600, sin caja, sombra grafito, palabra activa azul) ----------
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
export const Karaoke: React.FC<{ hide: [number, number][]; y?: number }> = ({ hide, y = 1480 }) => {
  const t = useT();
  if (hide.some(([a, b]) => t >= a && t < b)) return null;
  const ch = CHUNKS.find((c) => t >= c.s && t < c.e);
  if (!ch) return null;
  const a = prog(t, ch.s, 0.15);
  return (
    <div style={{ position: "absolute", top: y - 50, left: 108, right: 108, display: "flex", justifyContent: "center", opacity: a, transform: `translateY(${(1 - a) * 10}px)` }}>
      <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 58, lineHeight: 1.25, color: C.white, textAlign: "center", textShadow: SHADOW.sub, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px", maxWidth: 864 }}>
        {ch.words.map((w, i) => {
          const on = t >= w.s && t < w.e + 0.04;
          return (
            <span key={i} style={{ color: on ? C.azul : C.white, fontWeight: on ? 700 : 600, display: "inline-block", transform: on ? "scale(1.04)" : "none" }}>
              {w.w.replace(/[.,]$/, "")}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ---------- texto ----------
type Pos = { x?: number; y: number; w?: number; align?: "center" | "left" | "right" };
const box = (p: Pos): React.CSSProperties => ({ position: "absolute", top: p.y, left: p.x ?? 0, width: p.w ?? 1080, textAlign: p.align ?? "center" });

/** #1 · script/manuscrita que se escribe izq→der */
export const ScriptReveal: React.FC<Pos & { from: number; to: number; text: string; dur?: number; size?: number; color?: string; rot?: number }> = ({ from, to, text, dur = 0.5, size = 92, color = C.lino, rot = -4, ...p }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const r = prog(t, from, dur);
  return (
    <div style={{ ...box(p), opacity: fadeOut(t, to) }}>
      <span style={{ display: "inline-block", fontFamily: HAND, fontWeight: 700, fontSize: size, color, textShadow: SHADOW.soft, transform: `rotate(${rot}deg)`, clipPath: `inset(-20% ${100 - r * 100}% -20% -5%)`, lineHeight: 1.05, whiteSpace: "pre" }}>{text}</span>
    </div>
  );
};

/** #5 / #9 · palabra GIGANTE con pop; spin = entra girando con rayos (#9) */
export const BigWord: React.FC<Pos & { from: number; to: number; text: string; size?: number; color?: string; shadow3d?: boolean; spin?: boolean; stagger?: boolean }> = ({ from, to, text, size = 150, color = C.lino, shadow3d = true, spin = false, stagger = false, ...p }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const s = spin ? interpolate(t, [from, from + 0.2, from + 0.3], [0.4, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }) : popScale(t, from);
  const rot = spin ? interpolate(t, [from, from + 0.28], [-90, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }) : 0;
  const letters = text.split("");
  return (
    <div style={{ ...box(p), opacity: fadeOut(t, to) }}>
      <div style={{ display: "inline-block", position: "relative", transform: `scale(${stagger ? 1 : s}) rotate(${rot}deg)` }}>
        {spin && <Rays t={t} at={from + 0.22} />}
        <span style={{ fontFamily: TITLE, fontWeight: 900, fontSize: size, color, letterSpacing: "-0.01em", lineHeight: 0.95, textShadow: shadow3d ? `${SHADOW.pop3d}, 0 10px 30px rgba(0,0,0,.25)` : SHADOW.soft, whiteSpace: "pre" }}>
          {stagger
            ? letters.map((l, i) => {
                const a = prog(t, from + i * 0.045, 0.22);
                return <span key={i} style={{ display: "inline-block", opacity: a, transform: `translateY(${(1 - a) * 60}px)` }}>{l}</span>;
              })
            : text}
        </span>
      </div>
    </div>
  );
};

/** rayitos que salen de una palabra (#9) */
const Rays: React.FC<{ t: number; at: number; color?: string }> = ({ t, at, color = C.azul }) => {
  const r = prog(t, at, 0.35);
  if (t < at || r >= 1) return null;
  return (
    <svg width={900} height={500} viewBox="-450 -250 900 500" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", overflow: "visible" }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r0 = 200 + r * 120, r1 = r0 + 60 * (1 - r);
        return <line key={i} x1={Math.cos(a) * r0 * 1.5} y1={Math.sin(a) * r0 * 0.8} x2={Math.cos(a) * r1 * 1.5} y2={Math.sin(a) * r1 * 0.8} stroke={color} strokeWidth={10} strokeLinecap="round" opacity={1 - r} />;
      })}
    </svg>
  );
};

/** #4 · texto que entra con tracking abierto que se cierra */
export const TrackIn: React.FC<Pos & { from: number; to: number; text: string; size?: number; weight?: number; color?: string; font?: string }> = ({ from, to, text, size = 54, weight = 500, color = C.white, font = BODY, ...p }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const a = prog(t, from, 0.32);
  return (
    <div style={{ ...box(p), opacity: Math.min(a * 1.5, fadeOut(t, to)) }}>
      <span style={{ fontFamily: font, fontWeight: weight, fontSize: size, color, letterSpacing: `${(1 - a) * 0.5}em`, textShadow: SHADOW.soft, whiteSpace: "pre" }}>{text}</span>
    </div>
  );
};

/** #2 · selección de texto estilo UI (caja blanca, tipeo, handles azules) + tachado terracota opcional */
export const SelectBox: React.FC<Pos & { from: number; to: number; text: string; typeDur?: number; strikeAt?: number; selectAt?: number }> = ({ from, to, text, typeDur = 0.7, strikeAt, selectAt, ...p }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const n = Math.round(text.length * prog(t, from, typeDur));
  const sel = selectAt !== undefined ? prog(t, selectAt, 0.25) : 0;
  const st = strikeAt !== undefined ? prog(t, strikeAt, 0.3) : 0;
  const pp = prog(t, from, 0.2);
  return (
    <div style={{ ...box(p), opacity: Math.min(pp, fadeOut(t, to)) }}>
      <div style={{ display: "inline-block", position: "relative", background: C.white, borderRadius: 14, padding: "18px 30px", boxShadow: "0 12px 34px rgba(0,0,0,.22)", transform: `scale(${0.9 + 0.1 * pp})` }}>
        <span style={{ position: "relative", fontFamily: BODY, fontWeight: 500, fontSize: 50, color: C.grafito, whiteSpace: "pre" }}>
          <span style={{ position: "absolute", inset: "-4px -6px", background: `rgba(27,151,200,${0.28 * sel})`, borderRadius: 4 }} />
          {text.slice(0, n)}
          <span style={{ opacity: n < text.length ? 1 : 0, color: C.azul }}>|</span>
          {st > 0 && <span style={{ position: "absolute", left: -8, top: "52%", height: 7, width: `calc(${st * 100}% + 16px)`, background: C.terracota, borderRadius: 4, transform: "rotate(-2deg)" }} />}
        </span>
        {sel > 0 && (
          <>
            <Handle left={20} top={10} o={sel} />
            <Handle right={20} bottom={10} o={sel} flip />
          </>
        )}
      </div>
    </div>
  );
};
const Handle: React.FC<{ left?: number; right?: number; top?: number; bottom?: number; o: number; flip?: boolean }> = ({ o, flip, ...pos }) => (
  <div style={{ position: "absolute", ...pos, width: 4, height: 62, background: C.azul, opacity: o }}>
    <div style={{ position: "absolute", left: -9, [flip ? "bottom" : "top"]: -18, width: 22, height: 22, borderRadius: 11, background: C.azul } as React.CSSProperties} />
  </div>
);

/** #8 · tira blanca con texto que aparece palabra por palabra (words = [texto, segundo]) */
export const Strip: React.FC<Pos & { from: number; to: number; words: [string, number][]; size?: number; tag?: string; tagColor?: string; rot?: number }> = ({ from, to, words, size = 54, tag, tagColor = C.terracota, rot = 0, ...p }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const a = prog(t, from, 0.2);
  return (
    <div style={{ ...box(p), opacity: fadeOut(t, to) }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: C.white, padding: "10px 26px", transform: `scaleX(${a}) rotate(${rot}deg)`, transformOrigin: "left center", boxShadow: "0 8px 22px rgba(0,0,0,.18)" }}>
        {tag && <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: size * 0.62, color: C.white, background: tagColor, padding: "2px 12px", borderRadius: 6 }}>{tag}</span>}
        <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: size, color: C.grafito, whiteSpace: "pre" }}>
          {words.map(([w, s], i) => (
            <span key={i} style={{ opacity: t >= s ? 1 : 0 }}>{(i ? " " : "") + w}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

/** #10 · nota de papel inclinada con manuscrita y resaltador */
export const PaperNote: React.FC<{ from: number; to: number; x: number; y: number; w?: number; lines: [string, number][][]; markAt?: number; markLine?: number; markWord?: string; rot?: number }> = ({ from, to, x, y, w = 520, lines, markAt, markLine = 0, markWord, rot = -7 }) => {
  const t = useT();
  if (!vis(t, from, to)) return null;
  const s = popScale(t, from, 0.3);
  const m = markAt !== undefined ? prog(t, markAt, 0.35) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, opacity: fadeOut(t, to), transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "30% 50%" }}>
      <div style={{ background: C.lino, padding: "26px 30px 22px 46px", borderLeft: `5px solid ${C.terracota}`, boxShadow: "0 14px 30px rgba(0,0,0,.28)", backgroundImage: `repeating-linear-gradient(${C.lino} 0 57px, ${C.arena} 57px 59px)`, backgroundPosition: "0 18px" }}>
        {lines.map((ln, li) => (
          <div key={li} style={{ fontFamily: HAND, fontWeight: 700, fontSize: 54, lineHeight: "58px", color: C.grafito, whiteSpace: "pre" }}>
            {ln.map(([word, at], wi) => {
              const isMark = li === markLine && word === markWord;
              return (
                <span key={wi} style={{ opacity: t >= at ? 1 : 0, position: "relative" }}>
                  {wi ? " " : ""}
                  {isMark && <span style={{ position: "absolute", left: 6, right: -6, top: "38%", height: "48%", background: "rgba(27,151,200,.38)", transform: `scaleX(${m})`, transformOrigin: "left", borderRadius: 4 }} />}
                  <span style={{ position: "relative" }}>{word}</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/** #7 / #12 · chip/etiqueta que salta con rotación */
export const Chip: React.FC<{ at: number; to: number; x: number; y: number; text: string; bg?: string; fg?: string; size?: number; rot?: number; anchor?: "left" | "center" | "right" }> = ({ at, to, x, y, text, bg = C.azul, fg = C.marino, size = 64, rot = -3, anchor = "left" }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const s = popScale(t, at, 0.3);
  const tx = anchor === "center" ? "-50%" : anchor === "right" ? "-100%" : "0";
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: fadeOut(t, to), transform: `translateX(${tx}) rotate(${rot}deg) scale(${s})` }}>
      <span style={{ display: "inline-block", fontFamily: TITLE, fontWeight: 800, fontSize: size, letterSpacing: "0.04em", color: fg, background: bg, padding: "8px 26px 10px", borderRadius: 8, boxShadow: "0 10px 24px rgba(0,0,0,.22)", whiteSpace: "pre" }}>{text}</span>
    </div>
  );
};

// ---------- stickers ----------
const star = (r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) { const a = (Math.PI / 5) * i - Math.PI / 2; const rr = i % 2 ? r * 0.45 : r; pts.push(`${Math.cos(a) * rr},${Math.sin(a) * rr}`); }
  return pts.join(" ");
};
export type StickerT = { kind: "star" | "spark" | "flower" | "yarn" | "heart"; x: number; y: number; at: number; size?: number; color?: string; spin?: boolean };
/** estrellas, destellos ✦, flores, ovillos y corazones con pop escalonado y twinkle */
export const Stickers: React.FC<{ to: number; items: StickerT[] }> = ({ to, items }) => {
  const t = useT();
  return (
    <>
      {items.map((it, i) => {
        if (!vis(t, it.at, to)) return null;
        const s = popScale(t, it.at, 0.28);
        const sz = it.size ?? 60;
        const tw = it.kind === "spark" ? 0.75 + 0.25 * Math.sin((t - it.at) * 9 + i) : 1;
        const rot = it.spin ? (t - it.at) * 90 : 0;
        const col = it.color ?? C.terracota;
        return (
          <svg key={i} width={sz * 2} height={sz * 2} viewBox={`${-sz} ${-sz} ${sz * 2} ${sz * 2}`} style={{ position: "absolute", left: it.x - sz, top: it.y - sz, opacity: fadeOut(t, to), transform: `scale(${s * tw}) rotate(${rot}deg)`, overflow: "visible", filter: "drop-shadow(0 4px 8px rgba(0,0,0,.22))" }}>
            {it.kind === "star" && <polygon points={star(sz * 0.9)} fill={col} stroke={C.white} strokeWidth={3} strokeLinejoin="round" />}
            {it.kind === "spark" && <path d={`M0 ${-sz} Q ${sz * 0.12} ${-sz * 0.12} ${sz} 0 Q ${sz * 0.12} ${sz * 0.12} 0 ${sz} Q ${-sz * 0.12} ${sz * 0.12} ${-sz} 0 Q ${-sz * 0.12} ${-sz * 0.12} 0 ${-sz} Z`} fill={col} />}
            {it.kind === "flower" && (
              <g>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-sz * 0.45} rx={sz * 0.3} ry={sz * 0.45} fill={col} transform={`rotate(${a})`} stroke={C.white} strokeWidth={2} />)}<circle r={sz * 0.25} fill={C.lino} /></g>
            )}
            {it.kind === "heart" && <path d={`M0 ${sz * 0.75} C ${-sz} 0 ${-sz * 0.6} ${-sz * 0.8} 0 ${-sz * 0.3} C ${sz * 0.6} ${-sz * 0.8} ${sz} 0 0 ${sz * 0.75} Z`} fill={col} stroke={C.white} strokeWidth={3} />}
            {it.kind === "yarn" && (
              <g>
                <circle r={sz * 0.8} fill={col} stroke={C.white} strokeWidth={3} />
                {[-0.5, -0.15, 0.2, 0.55].map((k, j) => <path key={j} d={`M ${-sz * 0.75} ${k * sz} Q 0 ${(k - 0.35) * sz} ${sz * 0.75} ${k * sz}`} stroke={C.lino} strokeWidth={4} fill="none" opacity={0.85} />)}
                <path d={`M ${sz * 0.7} ${sz * 0.3} q ${sz * 0.5} ${sz * 0.2} ${sz * 0.3} ${sz * 0.7}`} stroke={col} strokeWidth={5} fill="none" />
              </g>
            )}
          </svg>
        );
      })}
    </>
  );
};

/** #12 · flecha dibujada a mano (stroke-dashoffset) */
export const DrawnArrow: React.FC<{ at: number; to: number; x: number; y: number; w?: number; color?: string; flip?: boolean }> = ({ at, to, x, y, w = 160, color = C.terracota, flip }) => {
  const t = useT();
  if (!vis(t, at, to)) return null;
  const r = prog(t, at, 0.35);
  const L = 400;
  return (
    <svg width={w} height={w} viewBox="0 0 160 160" style={{ position: "absolute", left: x, top: y, opacity: fadeOut(t, to), transform: flip ? "scaleX(-1)" : "none", overflow: "visible" }}>
      <path d="M20 20 C 40 90, 80 120, 130 125" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - r)} />
      <path d="M104 106 L 132 126 L 102 144" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={r > 0.85 ? 1 : 0} />
    </svg>
  );
};

/** #14 · flash lino de 2–3 frames en los cortes de locación */
export const Flash: React.FC<{ at: number[] }> = ({ at }) => {
  const t = useT();
  const o = Math.max(0, ...at.map((a) => interpolate(t, [a - 0.04, a, a + 0.1], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  return o > 0 ? <AbsoluteFill style={{ background: C.lino, opacity: o }} /> : null;
};

/** marca de agua obligatoria con avatar IA */
export const AiMark: React.FC = () => (
  <div style={{ position: "absolute", top: 236, right: 44, fontFamily: BODY, fontWeight: 600, fontSize: 26, color: C.white, textShadow: "0 1px 4px rgba(0,0,0,.55)", letterSpacing: "0.02em" }}>{MARCA.aiWatermark}</div>
);

// ---------- sonido ----------
export type SfxName = "whoosh" | "pop" | "ding" | "click" | "boom" | "tick" | "paper" | "sparkle";
export const Sfx: React.FC<{ list: { at: number; f: SfxName; v?: number }[] }> = ({ list }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {list.map((s, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(s.at * fps))} durationInFrames={fps}>
          <Audio src={staticFile(`sfx/${s.f}.wav`)} volume={(s.v ?? 1) * 0.3} />
        </Sequence>
      ))}
    </>
  );
};

// ---------- placa final ----------
/** Panel lino que sube (#14) con logo, lista con checks y CTA. Fondo = último cuadro desenfocado (no negro). */
export const EndCard: React.FC<{ from: number; kicker: string; title: string; items: string[]; cta: string; url: string }> = ({ from, kicker, title, items, cta, url }) => {
  const t = useT();
  if (t < from) return null;
  const up = prog(t, from, 0.45);
  const lt = t - from;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: C.lino, transform: `translateY(${(1 - up) * 1920}px)` }}>
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.5 }}>
          <path d="M -20 300 Q 270 250 540 300 T 1100 300" stroke={C.arena} strokeWidth={3} fill="none" strokeDasharray="14 12" />
          <path d="M -20 1650 Q 270 1600 540 1650 T 1100 1650" stroke={C.arena} strokeWidth={3} fill="none" strokeDasharray="14 12" />
        </svg>
        <div style={{ position: "absolute", top: 360, width: 1080, textAlign: "center", opacity: prog(t, from + 0.3, 0.3) }}>
          <Img src={staticFile("logos/crochetes-logo-horizontal-color.png")} style={{ width: 420 }} />
        </div>
        <div style={{ position: "absolute", top: 600, width: 1080, textAlign: "center" }}>
          <div style={{ fontFamily: HAND, fontWeight: 700, fontSize: 64, color: C.terracota, opacity: prog(t, from + 0.45, 0.3), transform: "rotate(-3deg)" }}>{kicker}</div>
          <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 92, color: C.grafito, lineHeight: 1, marginTop: 10, transform: `scale(${popScale(t, from + 0.55)})`, opacity: prog(t, from + 0.55, 0.15) }}>{title}</div>
        </div>
        <div style={{ position: "absolute", top: 860, left: 200, width: 700 }}>
          {items.map((it, i) => {
            const a = prog(t, from + 0.85 + i * 0.16, 0.22);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 20, opacity: a, transform: `translateX(${(1 - a) * -40}px)` }}>
                <span style={{ width: 54, height: 54, borderRadius: 27, background: C.azul, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={30} height={30} viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" stroke={C.marino} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 50, color: C.grafito }}>{it}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", top: 1290, width: 1080, textAlign: "center", transform: `scale(${popScale(t, from + 1.8)})`, opacity: prog(t, from + 1.8, 0.12) }}>
          <span style={{ display: "inline-block", background: C.marino, color: C.white, fontFamily: TITLE, fontWeight: 800, fontSize: 50, padding: "18px 40px", borderRadius: 12, letterSpacing: "0.02em" }}>{cta}</span>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40, color: C.chocolate, marginTop: 22 }}>{url}</div>
        </div>
      </AbsoluteFill>
      {lt < 0.6 && <AbsoluteFill style={{ background: C.lino, opacity: interpolate(lt, [0, 0.05, 0.25], [0, 0.6, 0], { extrapolateRight: "clamp" }) }} />}
    </AbsoluteFill>
  );
};
