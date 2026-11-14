// VSL Día 1 — "TALLER IA Inmobiliaria" (16:9) · estilo Daniela Werkalec · ángulo herramientas (verde #2DAF8C)
// Daniela recortada con IA (fg.webm con alfa, piel suavizada) sobre un estudio cálido con ventana al jardín.
// Todos los tiempos de este archivo están en segundos del video ORIGINAL (S = t + OFF).
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, staticFile } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { BG, draw, F, glow, MONT, pop, prog, PT, REDHAT, svgGlow, TRUEFATE, useLocalFonts, useT, W, win, Y } from "./kit";
import plan from "./plan.json";

const PLAY = loadPlayfair("normal", { weights: ["600", "700", "800"], subsets: ["latin"] }).fontFamily;

export const FPS = 30;
const OFF = 0.45; // arranque (se saltea el silencio inicial)
const SPEECH_END = 81.35;
const END_DUR = 6.0; // placa final
export const TOTAL = SPEECH_END - OFF + END_DUR;
const END_AT = SPEECH_END; // en tiempo original

const useS = () => useT() + OFF;
const IO = Easing.inOut(Easing.cubic);

// ---------- cámara: posición de Daniela (dx en px, escala; origen arriba al centro para no cortar la cabeza) ----------
// [t, dx, s]
const POSE: [number, number, number][] = [
  [0, 0, 1], [5.75, 0, 1.0], [6.2, 380, 1.04],
  [24.3, 380, 1.04], [24.7, 330, 1.15], [28.9, 330, 1.16], [29.35, 400, 1.05],
  [42.1, 400, 1.05], [42.5, 330, 1.1], [51.5, 330, 1.17], [51.95, 380, 1.04],
  [63.3, 380, 1.04], [63.75, 420, 1.05], [79.4, 420, 1.06], [81.4, 420, 1.08],
];
const pose = (s: number) => {
  const ts = POSE.map((p) => p[0]);
  const o = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const, easing: IO };
  return { dx: interpolate(s, ts, POSE.map((p) => p[1]), o), sc: interpolate(s, ts, POSE.map((p) => p[2]), o) };
};
const FACE_X = 1065; // centro de la cara en el cuadro original

const Fondo: React.FC = () => {
  const s = useS();
  const { dx, sc } = pose(s);
  // paralaje: el fondo se mueve poquito al revés que ella
  return (
    <AbsoluteFill style={{ transform: `translateX(${-dx * 0.08}px) scale(${1.07 + (sc - 1) * 0.3})` }}>
      <Img src={staticFile("img/fondo.png")} style={{ width: 1920, height: 1080 }} />
    </AbsoluteFill>
  );
};

const Daniela: React.FC = () => {
  const s = useS();
  const { dx, sc } = pose(s);
  return (
    <AbsoluteFill style={{ transform: `translateX(${dx}px) scale(${sc})`, transformOrigin: "50% 0%" }}>
      {/* sombra de contacto suave para despegarla del fondo */}
      <AbsoluteFill style={{ filter: "blur(28px) brightness(0)", opacity: 0.28, transform: "translate(18px, 14px)" }}>
        <OffthreadVideo src={staticFile("fg.webm")} transparent muted startFrom={Math.round(OFF * FPS)} />
      </AbsoluteFill>
      <OffthreadVideo src={staticFile("fg.webm")} transparent muted startFrom={Math.round(OFF * FPS)} />
    </AbsoluteFill>
  );
};

const Grade: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: "#FFB566", mixBlendMode: "soft-light", opacity: 0.12 }} />
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 60% 40%, transparent 55%, rgba(10,8,6,0.42) 100%)" }} />
  </>
);

// ---------- subtítulos karaoke (Playfair, 2–4 palabras, palabra hablada amarilla con cajita) ----------
type Wd = { w: string; s: number; e: number };
const WORDS = (plan as { words: Wd[] }).words;
const PHRASES: Wd[][] = (() => {
  const out: Wd[][] = [];
  let cur: Wd[] = [];
  WORDS.forEach((w, i) => {
    cur.push(w);
    const next = WORDS[i + 1];
    const punct = /[.,?!:]$/.test(w.w);
    const gap = next ? next.s - w.e : 9;
    if (cur.length >= 4 || (punct && cur.length >= 2) || gap > 0.35 || (cur.length >= 3 && w.w.length > 9) || !next) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
})();
const clean = (w: string) => w.replace(/[.,]$/, "");

const Captions: React.FC = () => {
  const s = useS();
  if (s > SPEECH_END + 0.1) return null;
  const ph = PHRASES.find((p, i) => s >= p[0].s - 0.05 && s < (PHRASES[i + 1] ? PHRASES[i + 1][0].s - 0.05 : p[p.length - 1].e + 0.4));
  if (!ph) return null;
  const { dx, sc } = pose(s);
  const cx = Math.min(1920 - 470, 960 + (FACE_X - 960) * sc + dx);
  const enter = prog(s, ph[0].s - 0.05, 0.18);
  return (
    <div style={{ position: "absolute", left: cx - 420, width: 840, top: 868, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px", opacity: enter, transform: `translateY(${(1 - enter) * 14}px)` }}>
      {ph.map((w, i) => {
        const on = s >= w.s && s < (ph[i + 1] ? ph[i + 1].s : w.e + 0.4);
        const p = pop(s, w.s, 0.22);
        return (
          <span
            key={i}
            style={{
              fontFamily: PLAY, fontWeight: 800, fontSize: on ? 66 : 56, lineHeight: 1.15,
              color: on ? Y : W, padding: "0 10px", borderRadius: 12,
              background: on ? `rgba(255,204,0,${0.22 * p})` : "transparent",
              WebkitTextStroke: "2.5px #000", paintOrder: "stroke fill",
              textShadow: "0 3px 10px rgba(0,0,0,0.55)",
              transform: on ? `scale(${0.92 + 0.08 * p})` : undefined, display: "inline-block",
            }}
          >
            {clean(w.w)}
          </span>
        );
      })}
    </div>
  );
};

// ---------- piezas de motion graphics ----------
const PANEL = { left: 70, top: 120, width: 770, height: 690 };

const KickerLine: React.FC<{ s: number; at: number; text: string; color?: string }> = ({ s, at, text, color = F }) => {
  const n = Math.floor(interpolate(s, [at, at + 0.45], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const blink = Math.floor(s * 2.4) % 2 === 0;
  return (
    <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 24, letterSpacing: 4, color, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 13, height: 13, borderRadius: 7, background: color, boxShadow: glow(color, 0.6) }} />
      <span>{text.slice(0, n)}</span>
      <span style={{ opacity: blink ? 1 : 0, color: W, fontWeight: 400 }}>|</span>
    </div>
  );
};

const Panel: React.FC<{ from: number; to: number; kicker: string; children: React.ReactNode; h?: number }> = ({ from, to, kicker, children, h }) => {
  const s = useS();
  if (s < from - 0.05 || s > to + 0.05) return null;
  const o = win(s, from, to, 0.4, 0.3);
  const e = prog(s, from, 0.5);
  return (
    <div
      style={{
        position: "absolute", ...PANEL, height: h ?? PANEL.height, opacity: o,
        transform: `translateX(${(1 - e) * -70}px) scale(${0.97 + 0.03 * e})`,
        borderRadius: 36, background: "linear-gradient(160deg, rgba(11,10,16,0.80), rgba(11,10,16,0.90))",
        border: `2px solid ${F}B0`, boxShadow: `0 0 30px ${F}50, inset 0 0 40px ${F}18, 0 30px 70px rgba(0,0,0,0.45)`,
        backdropFilter: "blur(10px)", overflow: "hidden", padding: "34px 44px", boxSizing: "border-box",
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        {Array.from({ length: 11 }).map((_, i) => <line key={"v" + i} x1={i * 80} y1={0} x2={i * 80} y2={800} stroke={F} strokeWidth={1} />)}
        {Array.from({ length: 10 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * 80} x2={800} y2={i * 80} stroke={F} strokeWidth={1} />)}
      </svg>
      <div style={{ position: "relative" }}>
        <KickerLine s={s} at={from + 0.1} text={kicker} />
        {children}
      </div>
    </div>
  );
};

const In: React.FC<{ at: number; dx?: number; dy?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, dx = 0, dy = 24, style, children }) => {
  const s = useS();
  const p = prog(s, at, 0.42);
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${0.94 + 0.06 * p})`, ...style }}>{children}</div>;
};

// Remate en cascada (palabras de distinta fuente, entran de a una, salen juntas, SIN overlay negro)
type RW = { t: string; at: number; x: number; y: number; font: "hero" | "sansB" | "sansL" | "serifI" | "mont"; size: number; hero?: boolean; from?: "l" | "u" | "f" | "p" };
const Cascade: React.FC<{ words: RW[]; out: number }> = ({ words, out }) => {
  const s = useS();
  if (s < words[0].at - 0.1 || s > out + 0.4) return null;
  const o = 1 - prog(s, out, 0.35);
  return (
    <AbsoluteFill style={{ opacity: o, transform: `scale(${1 + 0.04 * prog(s, out, 0.35)})` }}>
      {words.map((w, i) => {
        const p = w.from === "p" ? pop(s, w.at, 0.45) : prog(s, w.at, 0.4);
        const tr = w.from === "l" ? `translateX(${(1 - p) * -80}px)` : w.from === "u" ? `translateY(${(1 - p) * 50}px)` : w.from === "p" ? `scale(${0.4 + 0.6 * p})` : `scale(${0.9 + 0.1 * p})`;
        const flash = w.hero ? interpolate(s, [w.at, w.at + 0.12, w.at + 0.6], [0, 1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
        const ff =
          w.font === "hero" ? { fontFamily: TRUEFATE } :
          w.font === "sansB" ? { fontFamily: REDHAT, fontWeight: 900 } :
          w.font === "sansL" ? { fontFamily: REDHAT, fontWeight: 400 } :
          w.font === "serifI" ? { fontFamily: PT, fontStyle: "italic" as const } : { fontFamily: MONT, fontWeight: 800 };
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: w.x, top: w.y, opacity: Math.min(1, p * 1.3), transform: tr, transformOrigin: "left center",
              fontSize: w.size, lineHeight: 1, whiteSpace: "nowrap", color: w.hero ? Y : W, ...ff,
              textShadow: w.hero
                ? `0 0 ${14 + 30 * flash}px ${Y}, 0 0 ${34 + 50 * flash}px ${Y}AA, 0 2px 4px rgba(0,0,0,0.5)`
                : `0 0 16px rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.6)`,
            }}
          >
            {w.t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Chip de apertura (arriba a la izquierda)
const OpenChip: React.FC = () => {
  const s = useS();
  const o = win(s, 0.75, 5.7, 0.4, 0.3);
  if (o <= 0) return null;
  const p = pop(s, 0.75, 0.5);
  return (
    <div style={{ position: "absolute", left: 70, top: 64, opacity: o, transform: `scale(${0.7 + 0.3 * p})`, transformOrigin: "left center", display: "flex", alignItems: "center", gap: 14, padding: "12px 26px 12px 18px", borderRadius: 999, background: "rgba(11,10,16,0.70)", border: `2px solid ${F}`, boxShadow: glow(F, 0.5) }}>
      <GridIcon size={34} />
      <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 25, letterSpacing: 3, color: F }}>TALLER IA INMOBILIARIA</span>
      <span style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: W }}>· 17, 18 y 19 de noviembre</span>
    </div>
  );
};

const GridIcon: React.FC<{ size: number; c?: string }> = ({ size, c = F }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ filter: svgGlow(c, 0.4) }}>
    {[[3, 3], [22, 3], [3, 22], [22, 22]].map(([x, y], i) => <rect key={i} x={x} y={y} width={15} height={15} rx={4} fill="none" stroke={c} strokeWidth={3.5} />)}
  </svg>
);

// Remate 1 · "el último taller del año" (sobre el gancho, a la izquierda de la cara)
const R_Ultimo = () => (
  <Cascade
    out={5.55}
    words={[
      { t: "el", at: 2.5, x: 110, y: 300, font: "serifI", size: 70, from: "f" },
      { t: "último", at: 2.94, x: 150, y: 335, font: "hero", size: 176, hero: true, from: "p" },
      { t: "taller", at: 3.38, x: 120, y: 540, font: "sansB", size: 96, from: "l" },
      { t: "del año", at: 5.0, x: 400, y: 560, font: "serifI", size: 78, from: "u" },
    ]}
  />
);

// Panel · 3 días, 1 caso práctico por día
const P_TresDias: React.FC = () => {
  const s = useS();
  return (
    <Panel from={6.0} to={10.9} kicker="CÓMO ES EL TALLER" h={560}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 26, marginTop: 40 }}>
        <In at={6.6}><div style={{ fontFamily: TRUEFATE, fontSize: 250, lineHeight: 0.8, color: Y, textShadow: glow(Y, 0.8) }}>3</div></In>
        <In at={6.95} dx={-30} dy={0}><div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 92, color: W, lineHeight: 0.9 }}>días</div><div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 46, color: W, marginTop: 8 }}>en vivo por Zoom</div></In>
      </div>
      <In at={8.7} style={{ marginTop: 46 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 24px", borderRadius: 22, border: `2px solid ${F}`, background: `${F}22` }}>
          <svg width={60} height={60} viewBox="0 0 60 60" style={{ filter: svgGlow(F, 0.5) }}>
            <circle cx={30} cy={30} r={25} fill="none" stroke={F} strokeWidth={4} {...draw(s, 8.8, 0.5)} />
            <path d="M18 31 L27 40 L43 21" fill="none" stroke={W} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" {...draw(s, 9.2, 0.35)} />
          </svg>
          <div>
            <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 38, color: W }}>1 caso práctico por día</div>
            <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 26, color: `${W}BB`, marginTop: 4 }}>3 encuentros de 2 horas</div>
          </div>
        </div>
      </In>
    </Panel>
  );
};

// Panel · IA aplicada en tu inmobiliaria (de preguntar a aplicar)
const ToolPill: React.FC<{ at: number; name: string }> = ({ at, name }) => (
  <In at={at} dy={0} dx={-30}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: `2px solid ${W}55` }}>
      <span style={{ fontSize: 26, color: F }}>✦</span>
      <span style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 36, color: W }}>{name}</span>
    </div>
  </In>
);
const P_Aplicar: React.FC = () => {
  const s = useS();
  const strike = prog(s, 16.0, 0.35);
  return (
    <Panel from={11.0} to={19.2} kicker="IA EN TU INMOBILIARIA" h={560}>
      <In at={11.9} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 64, color: W, lineHeight: 1.05 }}>Inteligencia Artificial</div>
        <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 50, color: F, marginTop: 4 }}>aplicada a tu inmobiliaria</div>
      </In>
      <div style={{ position: "relative", marginTop: 44, display: "inline-block" }}>
        <In at={15.3}>
          <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 40, color: `${W}CC` }}>“hacerle preguntitas”</div>
        </In>
        <div style={{ position: "absolute", left: -8, top: 26, height: 6, width: `${strike * 104}%`, background: "#FF5A5A", borderRadius: 3, boxShadow: "0 0 12px #FF5A5A" }} />
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
        <ToolPill at={18.2} name="ChatGPT" />
        <ToolPill at={18.75} name="Claude" />
      </div>
    </Panel>
  );
};

// Panel · los 3 días (datos de la página)
const DAYS = [
  { n: "DÍA 1", t: "Analizar el mercado", d: "informes de apoyo a la tasación", at: 20.4 },
  { n: "DÍA 2", t: "Videos con IA", d: "recorridos solo con fotos + avatar", at: 20.86 },
  { n: "DÍA 3", t: "Carteles que captan", d: "QR + WhatsApp + CRM", at: 21.82 },
];
const DayRow: React.FC<{ d: (typeof DAYS)[0]; on: boolean; dim: boolean }> = ({ d, on, dim }) => (
  <In at={d.at} dx={-60} dy={0}>
    <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "16px 22px", borderRadius: 22, border: `2px solid ${on ? F : F + "55"}`, background: on ? `${F}30` : "rgba(255,255,255,0.04)", boxShadow: on ? glow(F, 0.5) : "none", opacity: dim ? 0.45 : 1, transform: on ? "scale(1.03)" : undefined }}>
      <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 26, color: on ? BG : F, background: on ? F : "transparent", border: `2px solid ${F}`, borderRadius: 12, padding: "6px 12px", whiteSpace: "nowrap" }}>{d.n}</span>
      <div>
        <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 40, color: W }}>{d.t}</div>
        <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: `${W}AA`, marginTop: 2 }}>{d.d}</div>
      </div>
    </div>
  </In>
);
const P_Dias: React.FC = () => {
  const s = useS();
  const focus = s >= 23.9;
  return (
    <Panel from={19.4} to={24.35} kicker="3 CASOS PRÁCTICOS" h={540}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 34 }}>
        {DAYS.map((d, i) => <DayRow key={i} d={d} on={focus && i === 0} dim={focus && i > 0} />)}
      </div>
    </Panel>
  );
};

// Remate 2 · "captar más exclusivas"
const R_Exclusivas = () => (
  <Cascade
    out={28.85}
    words={[
      { t: "DÍA 1", at: 24.5, x: 110, y: 240, font: "mont", size: 46, from: "l" },
      { t: "cómo", at: 25.34, x: 110, y: 330, font: "serifI", size: 72, from: "f" },
      { t: "captar", at: 25.6, x: 300, y: 320, font: "sansB", size: 110, from: "u" },
      { t: "más", at: 26.14, x: 115, y: 460, font: "sansL", size: 80, from: "l" },
      { t: "exclusivas", at: 26.34, x: 95, y: 545, font: "hero", size: 152, hero: true, from: "p" },
    ]}
  />
);

// Panel · antes → después (de la hoja A4 / WhatsApp al informe)
const SheetIcon: React.FC<{ s: number; at: number }> = ({ s, at }) => (
  <svg width={120} height={150} viewBox="0 0 120 150" style={{ filter: svgGlow(W, 0.2) }}>
    <path d="M10 6 H80 L110 36 V144 H10 Z M80 6 V36 H110" fill="none" stroke={`${W}CC`} strokeWidth={4} strokeLinejoin="round" {...draw(s, at, 0.5)} />
    {[60, 80, 100, 120].map((y, i) => <line key={i} x1={26} y1={y} x2={94 - (i % 2) * 20} y2={y} stroke={`${W}88`} strokeWidth={4} strokeLinecap="round" {...draw(s, at + 0.2 + i * 0.06, 0.3)} />)}
    <text x={26} y={40} fill={`${W}BB`} fontFamily={MONT} fontWeight={800} fontSize={22}>A4</text>
  </svg>
);
const ChatIcon: React.FC<{ s: number; at: number }> = ({ s, at }) => (
  <svg width={130} height={130} viewBox="0 0 130 130" style={{ filter: svgGlow(W, 0.2) }}>
    <path d="M20 14 H110 Q122 14 122 26 V78 Q122 90 110 90 H52 L28 114 L32 90 H20 Q8 90 8 78 V26 Q8 14 20 14 Z" fill="none" stroke={`${W}CC`} strokeWidth={4} strokeLinejoin="round" {...draw(s, at, 0.5)} />
    {[40, 62].map((y, i) => <line key={i} x1={28} y1={y} x2={100 - i * 26} y2={y} stroke={`${W}88`} strokeWidth={4} strokeLinecap="round" {...draw(s, at + 0.25 + i * 0.08, 0.3)} />)}
  </svg>
);
const ReportIcon: React.FC<{ s: number; at: number }> = ({ s, at }) => (
  <svg width={210} height={250} viewBox="0 0 210 250" style={{ filter: svgGlow(F, 0.7) }}>
    <rect x={8} y={8} width={194} height={234} rx={18} fill="rgba(45,175,140,0.10)" stroke={F} strokeWidth={4} {...draw(s, at, 0.55)} />
    <line x1={30} y1={44} x2={150} y2={44} stroke={W} strokeWidth={6} strokeLinecap="round" {...draw(s, at + 0.3, 0.3)} />
    <line x1={30} y1={66} x2={110} y2={66} stroke={`${W}88`} strokeWidth={4} strokeLinecap="round" {...draw(s, at + 0.4, 0.3)} />
    {[50, 86, 70, 118, 100].map((h, i) => (
      <rect key={i} x={34 + i * 30} y={210 - h * prog(s, at + 0.5 + i * 0.07, 0.4)} width={20} height={h * prog(s, at + 0.5 + i * 0.07, 0.4)} rx={4} fill={i === 3 ? Y : F} />
    ))}
    <path d="M36 150 L72 128 L104 138 L140 100 L176 92" fill="none" stroke={Y} strokeWidth={4} strokeLinecap="round" {...draw(s, at + 0.9, 0.6)} />
  </svg>
);
const Check: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const s = useS();
  return (
    <In at={at} dx={-30} dy={0}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
        <svg width={40} height={40} viewBox="0 0 40 40" style={{ filter: svgGlow(F, 0.5) }}>
          <circle cx={20} cy={20} r={17} fill={F} opacity={0.25} />
          <path d="M11 21 L18 28 L30 13" fill="none" stroke={F} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" {...draw(s, at + 0.05, 0.3)} />
        </svg>
        <span style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 36, color: W }}>{text}</span>
      </div>
    </In>
  );
};
const P_AntesDespues: React.FC = () => {
  const s = useS();
  const x = prog(s, 34.2, 0.35); // tachado de "antes"
  const arrow = prog(s, 36.9, 0.4);
  return (
    <Panel from={29.4} to={42.2} kicker="DE ESTO… A ESTO" h={720}>
      <div style={{ display: "flex", alignItems: "center", marginTop: 26, gap: 10 }}>
        <div style={{ position: "relative", width: 300, height: 300, opacity: 1 - 0.45 * x }}>
          <In at={29.9} style={{ position: "absolute", left: 10, top: 10 }}><SheetIcon s={s} at={30.0} /></In>
          <In at={32.7} style={{ position: "absolute", left: 140, top: 120 }}><ChatIcon s={s} at={32.8} /></In>
          <div style={{ position: "absolute", left: 20, top: 262, fontFamily: MONT, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: `${W}AA` }}>HOY</div>
          <svg width={300} height={300} style={{ position: "absolute", inset: 0 }}>
            <line x1={20} y1={20} x2={20 + 260 * x} y2={20 + 240 * x} stroke="#FF5A5A" strokeWidth={7} strokeLinecap="round" />
          </svg>
        </div>
        <svg width={110} height={60} viewBox="0 0 110 60" style={{ filter: svgGlow(Y, 0.6), opacity: arrow }}>
          <path d="M6 30 H96 M76 10 L98 30 L76 50" fill="none" stroke={Y} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" {...draw(s, 36.9, 0.4)} />
        </svg>
        <In at={37.3}><ReportIcon s={s} at={37.35} /></In>
      </div>
      <In at={37.4} style={{ marginTop: 6 }}><div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 46, color: W }}>un <span style={{ color: Y, textShadow: glow(Y, 0.5) }}>informe</span> profesional</div></In>
      <Check at={39.8} text="Comparables" />
      <Check at={41.2} text="Análisis de mercado" />
    </Panel>
  );
};

// Remate 3 · "no dude en contratarte"
const R_Contratarte = () => (
  <Cascade
    out={51.5}
    words={[
      { t: "el propietario", at: 46.4, x: 110, y: 250, font: "serifI", size: 64, from: "f" },
      { t: "no duda", at: 47.74, x: 110, y: 340, font: "sansB", size: 104, from: "l" },
      { t: "en", at: 48.2, x: 540, y: 372, font: "sansL", size: 70, from: "u" },
      { t: "contratarte", at: 48.72, x: 90, y: 475, font: "hero", size: 140, hero: true, from: "p" },
      { t: "y darte la exclusiva", at: 50.0, x: 115, y: 650, font: "mont", size: 46, from: "u" },
    ]}
  />
);

// Panel · de preguntitas a herramienta → DÍA 1
const P_Herramienta: React.FC = () => {
  const s = useS();
  const strike = prog(s, 55.8, 0.3);
  return (
    <Panel from={52.1} to={63.2} kicker="EL CAMBIO" h={560}>
      <div style={{ position: "relative", marginTop: 40, display: "inline-block" }}>
        <In at={53.4}><div style={{ fontFamily: REDHAT, fontWeight: 400, fontSize: 54, color: `${W}BB` }}>preguntitas sueltas</div></In>
        <div style={{ position: "absolute", left: -8, top: 34, height: 6, width: `${strike * 104}%`, background: "#FF5A5A", borderRadius: 3, boxShadow: "0 0 12px #FF5A5A" }} />
      </div>
      <In at={56.9} style={{ marginTop: 20 }}>
        <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 50, color: W }}>una herramienta para</div>
        <div style={{ fontFamily: TRUEFATE, fontSize: 110, color: Y, lineHeight: 1.1, textShadow: glow(Y, 0.8) }}>captar exclusivas</div>
      </In>
      <In at={60.9} style={{ marginTop: 34 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "14px 28px", borderRadius: 999, background: F, boxShadow: glow(F, 0.7) }}>
          <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 34, color: BG }}>DÍA 1</span>
          <span style={{ fontFamily: MONT, fontWeight: 700, fontSize: 30, color: BG }}>· martes 17 de noviembre</span>
        </div>
      </In>
    </Panel>
  );
};

// Panel · datos del taller ("Acá te dejo todos los datos")
const DataRow: React.FC<{ at: number; k: string; v: string; sub?: string }> = ({ at, k, v, sub }) => (
  <In at={at} dx={-40} dy={0}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "14px 0", borderBottom: `1px solid ${F}44` }}>
      <span style={{ width: 200, flexShrink: 0, fontFamily: MONT, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: F }}>{k}</span>
      <div>
        <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 40, color: W }}>{v}</div>
        {sub && <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: `${W}AA`, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  </In>
);
const P_Datos: React.FC = () => (
  <Panel from={63.5} to={74.6} kicker="TODOS LOS DATOS" h={600}>
    <In at={63.9} style={{ marginTop: 22 }}>
      <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 52, color: W, lineHeight: 1 }}>TALLER IA Inmobiliaria</div>
      <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 34, color: `${W}CC`, marginTop: 6 }}>3 días, 3 aplicaciones reales de IA</div>
    </In>
    <div style={{ marginTop: 14 }}>
      <DataRow at={64.4} k="CUÁNDO" v="17, 18 y 19 de noviembre" sub="18 h ARG · 17 h CHI · 16 h COL" />
      <DataRow at={64.8} k="DÓNDE" v="Online, vía Zoom" sub="3 encuentros de 2 horas" />
      <DataRow at={69.66} k="GRABACIÓN" v="Disponible por 6 meses" sub="para vos y todo tu equipo" />
    </div>
  </Panel>
);

// Remate 4 · precio "USD 97"
const P_Precio: React.FC = () => {
  const s = useS();
  if (s < 74.75 || s > 79.75) return null;
  const o = win(s, 74.8, 79.7, 0.3, 0.3);
  const p = pop(s, 75.42, 0.55);
  const flash = interpolate(s, [75.42, 75.55, 76.2], [0, 1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 110, top: 250, opacity: o }}>
      <In at={74.85}><div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 64, color: W, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>tu inversión</div></In>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginTop: 30, transform: `scale(${0.5 + 0.5 * p})`, transformOrigin: "left bottom", opacity: Math.min(1, p * 1.4) }}>
        <span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 90, color: W, marginBottom: 34, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>USD</span>
        <span style={{ fontFamily: TRUEFATE, fontSize: 300, lineHeight: 0.85, color: Y, textShadow: `0 0 ${16 + 34 * flash}px ${Y}, 0 0 ${40 + 60 * flash}px ${Y}AA` }}>97</span>
      </div>
      <In at={77.74}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 40, color: W, marginTop: 18, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>antes de <span style={{ color: Y }}>terminar el año</span></div></In>
    </div>
  );
};

// CTA · botón "Reservá tu lugar" ("Por acá tenés para poder inscribirte")
const P_Boton: React.FC = () => {
  const s = useS();
  if (s < 79.6 || s > END_AT + 0.2) return null;
  const o = win(s, 79.65, END_AT + 0.15, 0.3, 0.25);
  const p = pop(s, 79.7, 0.5);
  const pulse = 1 + 0.035 * Math.sin((s - 79.7) * 7);
  const bob = Math.sin((s - 79.7) * 6) * 10;
  return (
    <div style={{ position: "absolute", left: 110, top: 330, opacity: o, transform: `scale(${(0.6 + 0.4 * p) * pulse})`, transformOrigin: "left center" }}>
      <div style={{ padding: "30px 56px", borderRadius: 999, background: Y, boxShadow: `${glow(Y, 1.1)}, 0 20px 50px rgba(0,0,0,0.4)`, fontFamily: MONT, fontWeight: 900, fontSize: 58, color: BG, letterSpacing: 1 }}>
        RESERVÁ TU LUGAR
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 26, transform: `translateY(${bob}px)` }}>
        <svg width={90} height={110} viewBox="0 0 90 110" style={{ filter: svgGlow(W, 0.5) }}>
          <path d="M45 6 V96 M14 66 L45 100 L76 66" fill="none" stroke={W} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 30, color: W, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>acá abajo, en esta página</div>
    </div>
  );
};

// Logo DW chiquito arriba a la derecha
const Brand: React.FC = () => {
  const s = useS();
  if (s > END_AT) return null;
  return <Img src={staticFile("img/daniela-werkalec-logo-blanco.png")} style={{ position: "absolute", right: 56, top: 48, height: 64, opacity: 0.85 * prog(s, 0.6, 0.6), filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))" }} />;
};

// ---------- placa final (fondo de estudio SIN Daniela + foto enmarcada + anillo + waveform + CTA) ----------
const EndPlate: React.FC = () => {
  const s = useS();
  if (s < END_AT - 0.4) return null;
  const T = s - END_AT;
  const o = prog(s, END_AT - 0.35, 0.45);
  const ring = prog(s, END_AT + 0.2, 0.9);
  const R = 220;
  const C = 2 * Math.PI * (R + 16);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ transform: `scale(${1.12 + 0.03 * T / END_DUR})` }}>
        <Img src={staticFile("img/fondo.png")} style={{ width: 1920, height: 1080, filter: "blur(10px)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(11,10,16,0.55), rgba(11,10,16,0.82))" }} />
      {/* foto + anillo */}
      <div style={{ position: "absolute", left: 470 - R, top: 470 - R, width: R * 2, height: R * 2, borderRadius: "50%", overflow: "hidden", transform: `scale(${0.85 + 0.15 * pop(s, END_AT, 0.6)})`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
        <Img src={staticFile("img/face.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 1) }}>
        <circle cx={470} cy={470} r={R + 16} fill="none" stroke={F} strokeWidth={8} strokeDasharray={C} strokeDashoffset={C * (1 - ring)} transform="rotate(-90 470 470)" strokeLinecap="round" />
        {/* waveform */}
        {Array.from({ length: 23 }).map((_, i) => {
          const h = 14 + 46 * Math.abs(Math.sin(T * 5 + i * 0.75)) * (1 - Math.abs(i - 11) / 14) * prog(s, END_AT + 0.5, 0.5);
          return <rect key={i} x={470 - 23 * 9 + i * 18} y={790 - h / 2} width={9} height={h} rx={4.5} fill={F} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, width: 940, top: 840, textAlign: "center" }}>
        <In at={END_AT + 0.4}><div style={{ fontFamily: TRUEFATE, fontSize: 76, color: W, lineHeight: 1 }}>Daniela Werkalec</div></In>
        <In at={END_AT + 0.6}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: F, marginTop: 10 }}>Corredora Inmobiliaria</div></In>
        <In at={END_AT + 0.75}><div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 28, color: W, marginTop: 4 }}><span style={{ color: F }}>+</span> Experta en Tecnología e IA para negocios</div></In>
        <In at={END_AT + 0.9}><div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: `${W}AA`, marginTop: 8 }}>@danielawerkalec</div></In>
      </div>
      {/* columna CTA */}
      <div style={{ position: "absolute", left: 990, top: 170, width: 840 }}>
        <In at={END_AT + 0.3}><KickerLine s={s} at={END_AT + 0.3} text="TALLER IA INMOBILIARIA" /></In>
        <In at={END_AT + 0.5} style={{ marginTop: 22 }}>
          <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 92, color: W, lineHeight: 0.95 }}>Reservá</div>
          <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 76, color: W, lineHeight: 1.05 }}>tu lugar</div>
        </In>
        <In at={END_AT + 0.9} style={{ marginTop: 44 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 60, color: W, marginBottom: 22 }}>USD</span>
            <span style={{ fontFamily: TRUEFATE, fontSize: 200, lineHeight: 0.85, color: Y, textShadow: glow(Y, 1) }}>97</span>
          </div>
        </In>
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["▶", "Grabación disponible por 6 meses"],
            ["◷", "17, 18 y 19 de noviembre · 18 h ARG"],
            ["✦", "Online, vía Zoom · 3 encuentros de 2 h"],
          ].map(([ic, tx], i) => (
            <In key={i} at={END_AT + 1.3 + i * 0.2} dx={-30} dy={0}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: MONT, fontWeight: 700, fontSize: 32, color: W }}>
                <span style={{ width: 46, height: 46, borderRadius: 23, border: `2px solid ${F}`, color: F, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{ic}</span>
                {tx}
              </div>
            </In>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Fondo />
      <Daniela />
      <Grade />
      <OpenChip />
      <R_Ultimo />
      <P_TresDias />
      <P_Aplicar />
      <P_Dias />
      <R_Exclusivas />
      <P_AntesDespues />
      <R_Contratarte />
      <P_Herramienta />
      <P_Datos />
      <P_Precio />
      <P_Boton />
      <Captions />
      <Brand />
      <EndPlate />
      <Audio src={staticFile("voz.wav")} startFrom={Math.round(OFF * FPS)} />
    </AbsoluteFill>
  );
};
