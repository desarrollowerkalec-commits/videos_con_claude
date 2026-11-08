// Reel DW — "Tu inmobiliaria no necesita empleados: necesita otro sistema" · ÁNGULO OPINIÓN (fucsia #CB6CE6).
// Avatar IA de Daniela. Video crudo (sin subs): subtítulos karaoke Playfair al pecho + motion graphics line-art
// en el Dock (zona del torso, dentro de la zona segura IG) + 2 remates en cascada + placa final.
// Fuente: 2 silencios de arranque de plano cortados (50.12→51.5 y 60.18→61.72 del original).
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { ANTON, BG, draw, Dock, F, glow, In, MONT, pop, prog, PT, REDHAT, svgGlow, TRUEFATE, useLocalFonts, useT, W, win, Y } from "./kit";
import WORDS from "./words.json";

const PLAYFAIR = loadPlayfair("normal", { weights: ["700", "800"], subsets: ["latin"] }).fontFamily;

export const FPS = 30;
export const SRC_DUR = 67.1;
export const END_DUR = 3.6;
export const TOTAL = SRC_DUR + END_DUR;

// ---------- remates en cascada (los subtítulos se ocultan mientras están) ----------
const R1 = [8.84, 10.28];
const R2 = [48.52, 50.2];

// ---------- subtítulos karaoke (Playfair, 2–4 palabras, al pecho) ----------
type Wd = { w: string; s: number; e: number };
const FIX: Record<string, string> = {
  "trabajas": "trabajás", "necesitas": "necesitás", "imagina": "imaginá", "sabes": "sabés", "Comenta": "Comentá", "plan": "PLAN",
};
const fixW = (w: string) => {
  const core = w.replace(/[¿?¡!,.]/g, "");
  return FIX[core] ? w.replace(core, FIX[core]) : w;
};
const CHUNKS: Wd[][] = (() => {
  const ws = (WORDS as Wd[]).filter((w) => !(w.s >= R1[0] && w.s < R1[1]) && !(w.s >= R2[0] && w.s < R2[1]));
  const out: Wd[][] = [];
  let cur: Wd[] = [];
  ws.forEach((w, i) => {
    const prev = ws[i - 1];
    const brk = (cur.length >= 4 && !(cur.length === 4 && /[,.?!]$/.test(w.w))) || (prev && (/[,.?!]$/.test(prev.w) || w.s - prev.e > 0.4) && cur.length >= 1);
    if (brk && cur.length) { out.push(cur); cur = []; }
    cur.push({ ...w, w: fixW(w.w) });
  });
  if (cur.length) out.push(cur);
  // evitar chunks de 1 palabra suelta pegándolos al anterior si están cerca
  return out;
})();
const Karaoke: React.FC = () => {
  const t = useT();
  const idx = CHUNKS.findIndex((c, i) => t >= c[0].s - 0.05 && t < (CHUNKS[i + 1] ? Math.min(CHUNKS[i + 1][0].s - 0.05, c[c.length - 1].e + 0.6) : c[c.length - 1].e + 0.6));
  if (idx < 0) return null;
  const c = CHUNKS[idx];
  const enter = prog(t, c[0].s - 0.05, 0.18);
  return (
    <div style={{ position: "absolute", left: 60, right: 140, top: 850, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "4px 16px", opacity: enter, transform: `translateY(${(1 - enter) * 14}px)` }}>
      {c.map((w, i) => {
        const on = t >= w.s - 0.03 && (i === c.length - 1 || t < c[i + 1].s - 0.03);
        const said = t >= w.s - 0.03;
        return (
          <span key={i} style={{
            fontFamily: PLAYFAIR, fontWeight: 800, fontSize: 70, lineHeight: 1.1, display: "inline-block",
            transform: on ? "scale(1.14)" : "none", margin: on ? "0 8px" : "0",
            color: on ? Y : W, padding: "0 10px", borderRadius: 14,
            background: on ? "rgba(255,204,0,0.20)" : "transparent",
            WebkitTextStroke: on ? "3px #000" : "0px", paintOrder: "stroke fill",
            textShadow: on ? "0 3px 0 #000, 0 6px 14px rgba(0,0,0,0.6)" : "0 2px 3px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.75)",
            opacity: said ? 1 : 0.92, transition: "none",
          }}>{w.w}</span>
        );
      })}
    </div>
  );
};

// ---------- cámara ----------
const ZK: [number, number][] = [
  [0, 1.0], [4.86, 1.0], [4.98, 1.08], [8.7, 1.08],
  [8.84, 1.0], [8.92, 1.12], [10.2, 1.12], [10.34, 1.0],
  [16.9, 1.0], [17.02, 1.07], [19.9, 1.07], [20.4, 1.0],
  [37.86, 1.0], [37.98, 1.12], [40.0, 1.12], [40.16, 1.0],
  [48.5, 1.0], [48.62, 1.1], [50.1, 1.1], [50.26, 1.0],
  [64.84, 1.0], [64.96, 1.09], [67.1, 1.12],
];
const Cam: React.FC = () => {
  const t = useT();
  const z = interpolate(t, ZK.map((k) => k[0]), ZK.map((k) => k[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 30%" }}>
      <OffthreadVideo src={staticFile("src.mp4")} />
    </AbsoluteFill>
  );
};
const Grade: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: F, mixBlendMode: "soft-light", opacity: 0.12 }} />
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, transparent 55%, rgba(40,6,48,0.5) 100%)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 50%, rgba(11,10,16,0.35) 100%)" }} />
  </>
);
const Flash: React.FC<{ at: number; c?: string; o?: number }> = ({ at, c = F, o = 0.3 }) => {
  const t = useT();
  const v = interpolate(t, [at - 0.02, at + 0.04, at + 0.3], [0, o, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: c, opacity: v, mixBlendMode: "screen" }} />;
};

// ---------- chip de apertura + chips de pasos ----------
const AngleTag: React.FC = () => {
  const t = useT();
  const o = win(t, 0.4, 3.6, 0.4, 0.3);
  if (o <= 0) return null;
  const p = pop(t, 0.4, 0.5);
  return (
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{ transform: `scale(${0.7 + 0.3 * p})`, display: "flex", alignItems: "center", gap: 14, padding: "10px 24px 10px 14px", borderRadius: 999, background: "rgba(11,10,16,0.66)", border: `2px solid ${F}`, boxShadow: glow(F, 0.5) }}>
        <Img src={staticFile("img/voz-fucsia.png")} style={{ height: 44 }} />
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: F }}>OPINIÓN</span>
        <span style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: W }}>· El modelo 2027</span>
      </div>
    </div>
  );
};
const STEPS = [
  { n: "01", label: "El problema", from: 10.34 },
  { n: "02", label: "El sistema", from: 20.4 },
  { n: "03", label: "Lo que ganás", from: 40.16 },
  { n: "04", label: "El plan", from: 58.94 },
];
const StepChips: React.FC = () => {
  const t = useT();
  const o = win(t, 10.1, 64.8, 0.5, 0.4);
  if (o <= 0) return null;
  const active = STEPS.filter((s) => t >= s.from).length - 1;
  return (
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 10, opacity: o }}>
      {STEPS.map((s, i) => {
        const on = i === active;
        const p = pop(t, 10.1 + i * 0.08, 0.4);
        return (
          <div key={s.n} style={{ transform: `scale(${0.6 + 0.4 * p}) scale(${on ? 1.06 : 1})`, opacity: p * (i > active ? 0.55 : 1), padding: "9px 16px", borderRadius: 999, border: `2px solid ${F}`, background: on ? F : "rgba(11,10,16,0.62)", color: on ? BG : W, boxShadow: on ? glow(F, 0.7) : "none", fontFamily: MONT, fontWeight: 800, fontSize: 24, display: "flex", gap: 8, whiteSpace: "nowrap" }}>
            <span style={{ color: on ? BG : F }}>{s.n}</span><span>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- piezas line-art ----------
const center: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" };
const Person: React.FC<{ x: number; y?: number; t: number; at: number; dashed?: boolean; s?: number }> = ({ x, y = 0, t, at, dashed, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={prog(t, at, 0.2)}>
    <circle cx={0} cy={118} r={34} fill="none" stroke={dashed ? W : F} strokeWidth={4} strokeDasharray={dashed ? "8 8" : undefined} {...(dashed ? {} : draw(t, at, 0.5))} />
    <path d="M-62 230 Q-60 168 0 168 Q60 168 62 230" fill="none" stroke={dashed ? W : F} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? "8 8" : undefined} {...(dashed ? {} : draw(t, at + 0.15, 0.5))} />
  </g>
);
const Chip: React.FC<{ at: number; children: React.ReactNode; hot?: boolean; size?: number }> = ({ at, children, hot, size = 36 }) => {
  const t = useT();
  const p = pop(t, at, 0.4);
  return (
    <div style={{ opacity: Math.min(1, p * 1.4), transform: `scale(${0.5 + 0.5 * p})`, padding: "12px 22px", borderRadius: 18, border: `2px solid ${F}${hot ? "" : "99"}`, background: hot ? F : "rgba(203,108,230,0.10)", color: hot ? BG : W, fontFamily: REDHAT, fontWeight: 700, fontSize: size, whiteSpace: "nowrap", boxShadow: hot ? glow(F, 0.6) : "none" }}>{children}</div>
  );
};
const CheckRow: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const t = useT();
  return (
    <In at={at} dx={40} dy={0}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width={44} height={44} viewBox="0 0 44 44" style={{ filter: svgGlow(F, 0.5), flexShrink: 0 }}>
          <circle cx={22} cy={22} r={19} fill="none" stroke={F} strokeWidth={3} {...draw(t, at, 0.4)} />
          <path d="M12 23 L19 30 L32 15" fill="none" stroke={W} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" {...draw(t, at + 0.15, 0.3)} />
        </svg>
        <span style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 38, color: W }}>{children}</span>
      </div>
    </In>
  );
};

// S1 · "trabajás solo y sentís que necesitás clonarte"
const SClon: React.FC = () => {
  const t = useT();
  return (
    <Dock from={2.3} to={4.78} kicker="TRABAJÁS SOLO">
      <svg width={880} height={420} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6), overflow: "visible" }}>
        <Person x={440} y={40} t={t} at={2.42} s={1.15} />
        <Person x={230} y={70} t={t} at={3.4} dashed />
        <Person x={650} y={70} t={t} at={3.55} dashed />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center" }}>
        <In at={3.4}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 44, color: W }}>¿clonarte</span> <span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 44, color: F, textShadow: glow(F, 0.4) }}>para vender más?</span></In>
      </div>
    </Dock>
  );
};

// S2 · "en 2027 no necesitás cinco empleados"
const SEmpleados: React.FC = () => {
  const t = useT();
  const strike = prog(t, 7.82, 0.35);
  return (
    <Dock from={5.9} to={8.8} kicker="2027">
      <svg width={880} height={420} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.5), overflow: "visible" }}>
        {[0, 1, 2, 3, 4].map((i) => <Person key={i} x={120 + i * 160} y={10} t={t} at={7.1 + i * 0.09} s={0.8} />)}
        <line x1={60} y1={145} x2={60 + 760 * strike} y2={145 - 40 * strike} stroke={W} strokeWidth={9} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center" }}>
        <In at={7.56}><span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 54, color: W, textDecoration: strike > 0.9 ? "line-through" : "none", textDecorationColor: F, textDecorationThickness: 6 }}>5 empleados</span></In>
      </div>
    </Dock>
  );
};

// S3 · "hoy sos corredor, community manager, secretario…"
const SRoles: React.FC = () => (
  <Dock from={10.34} to={16.82} kicker="HOY SOS…">
    <div style={{ position: "absolute", left: 40, right: 40, top: 96, display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center" }}>
      <Chip at={10.82}>Corredor</Chip>
      <Chip at={11.72}>Community manager</Chip>
      <Chip at={12.72}>Secretario</Chip>
      <Chip at={13.64}>Atención WhatsApp</Chip>
      <Chip at={14.54}>Publicador</Chip>
      <Chip at={15.54} hot>Perseguidor de clientes</Chip>
    </div>
  </Dock>
);

// S4 · "¿y pretendés tener tiempo para captar exclusivas?"
const STiempo: React.FC = () => {
  const t = useT();
  const segs: [string, number][] = [["WhatsApp", 0.3], ["Publicar", 0.2], ["Seguimiento", 0.28], ["Admin", 0.22]];
  let acc = 0;
  return (
    <Dock from={16.96} to={20.02} kicker="¿Y EL TIEMPO?">
      <div style={{ position: "absolute", left: 50, right: 50, top: 110 }}>
        <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 26, color: `${W}AA`, letterSpacing: 2, marginBottom: 12 }}>TU DÍA</div>
        <div style={{ display: "flex", height: 84, borderRadius: 16, overflow: "hidden", border: `2px solid ${F}` }}>
          {segs.map(([l, w], i) => {
            const at = 17.1 + i * 0.25;
            acc += w;
            return <div key={l} style={{ width: `${w * 100 * prog(t, at, 0.35)}%`, background: i % 2 ? "rgba(203,108,230,0.35)" : "rgba(203,108,230,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONT, fontWeight: 800, fontSize: 22, color: W, whiteSpace: "nowrap", overflow: "hidden" }}>{l}</div>;
          })}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 34 }}>
          <In at={19.0} dx={-30} dy={0}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 46, color: W }}>captar exclusivas:</span></In>
          <In at={19.28}><span style={{ fontFamily: ANTON, fontSize: 92, color: F, textShadow: glow(F, 0.6), lineHeight: 1 }}>0 h</span></In>
        </div>
      </div>
    </Dock>
  );
};

// S5 · "mientras mostrás una propiedad, la IA responde, identifica, registra"
const SMientras: React.FC = () => {
  const t = useT();
  return (
    <Dock from={21.7} to={29.95} kicker="MIENTRAS MOSTRÁS UNA PROPIEDAD">
      <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: "absolute", left: 30, top: 90, filter: svgGlow(F, 0.6) }}>
        <path d="M40 150 L150 60 L260 150 M70 128 V260 H230 V128 M125 260 V195 H175 V260" fill="none" stroke={F} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" {...draw(t, 22.34, 0.7)} />
      </svg>
      <div style={{ position: "absolute", left: 50, top: 352, fontFamily: MONT, fontWeight: 800, fontSize: 24, color: `${W}CC`, letterSpacing: 2, opacity: prog(t, 22.9, 0.3) }}>VOS, EN LA VISITA</div>
      <div style={{ position: "absolute", left: 360, top: 100, display: "flex", flexDirection: "column", gap: 24 }}>
        <In at={23.54}><span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 24, color: F, letterSpacing: 3 }}>✦ LA IA, EN WHATSAPP</span></In>
        <CheckRow at={24.54}>Responde consultas</CheckRow>
        <CheckRow at={25.78}>Detecta oportunidades</CheckRow>
        <CheckRow at={26.86}>Registra cada contacto</CheckRow>
      </div>
    </Dock>
  );
};

// S6 · "seguimiento, recuperar olvidados, detectar propietarios"
const SFlujo: React.FC = () => {
  const t = useT();
  const Node: React.FC<{ x: number; at: number; l1: string; l2: string; hot?: boolean }> = ({ x, at, l1, l2, hot }) => {
    const p = pop(t, at, 0.45);
    return (
      <div style={{ position: "absolute", left: x - 125, top: 120, width: 250, height: 190, borderRadius: 28, border: `3px solid ${F}`, background: hot ? "rgba(203,108,230,0.28)" : "rgba(11,10,16,0.4)", boxShadow: hot ? glow(F, 0.7) : glow(F, 0.25), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: Math.min(1, p * 1.4), transform: `scale(${0.6 + 0.4 * p})`, textAlign: "center" }}>
        <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 38, color: W, lineHeight: 1.05 }}>{l1}</div>
        <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 30, color: hot ? W : F }}>{l2}</div>
      </div>
    );
  };
  return (
    <Dock from={30.58} to={37.6} kicker="Y NO TERMINA AHÍ">
      <svg width={880} height={420} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6) }}>
        <line x1={280} y1={215} x2={315} y2={215} stroke={F} strokeWidth={4} strokeDasharray="8 8" opacity={prog(t, 33.2, 0.3)} />
        <line x1={565} y1={215} x2={600} y2={215} stroke={F} strokeWidth={4} strokeDasharray="8 8" opacity={prog(t, 35.9, 0.3)} />
      </svg>
      <Node x={155} at={32.4} l1="Seguimiento" l2="automático" />
      <Node x={440} at={33.3} l1="Recupera" l2="contactos olvidados" />
      <Node x={725} at={35.96} l1="Detecta" l2="propietarios" hot />
    </Dock>
  );
};

// S7 · "¿Y sabés qué ganás? Tiempo."
const SGanas: React.FC = () => {
  const t = useT();
  const fl = interpolate(t, [41.58, 41.72, 42.3], [0, 1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Dock from={40.16} to={46.3} kicker="LO QUE GANÁS">
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
        <In at={41.58} s0={0.6}><span style={{ fontFamily: ANTON, fontSize: 150, color: W, lineHeight: 1, letterSpacing: 4, textShadow: `0 0 ${14 + 26 * fl}px ${F}, 0 0 ${40 + 40 * fl}px ${F}AA` }}>TIEMPO</span></In>
      </div>
      <div style={{ position: "absolute", left: 30, right: 30, top: 262, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
        <Chip at={42.54} size={32}>para tasar</Chip>
        <Chip at={43.1} size={32}>visitar propietarios</Chip>
        <Chip at={44.18} size={32}>negociar exclusivas</Chip>
        <Chip at={45.2} size={32} hot>construir relaciones</Chip>
      </div>
    </Dock>
  );
};

// S8 · "la tecnología puede hacer el seguimiento"
const STecno: React.FC = () => (
  <Dock from={46.5} to={48.48} kicker="LA TECNOLOGÍA">
    <div style={{ ...center, top: 30, gap: 26 }}>
      <In at={46.9}><span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 70, color: F, textShadow: glow(F, 0.5) }}>✦ IA</span></In>
      <In at={47.3}><span style={{ fontFamily: ANTON, fontSize: 70, color: W }}>→</span></In>
      <In at={47.92}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 62, color: W }}>seguimiento ✓</span></In>
    </div>
  </Dock>
);

// S9 · "esto no es ciencia ficción, es el modelo que implementamos"
const SFiccion: React.FC = () => {
  const t = useT();
  const sk = prog(t, 51.0, 0.35);
  return (
    <Dock from={50.26} to={54.1} kicker="NO ES CIENCIA FICCIÓN">
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center" }}>
        <In at={50.78}>
          <span style={{ position: "relative", display: "inline-block", fontFamily: PT, fontStyle: "italic", fontSize: 58, color: `${W}AA` }}>
            ciencia ficción
            <span style={{ position: "absolute", left: -10, top: "52%", height: 7, width: `calc(${100 * sk}% + 20px)`, background: F, boxShadow: glow(F, 0.5), borderRadius: 4 }} />
          </span>
        </In>
        <In at={51.96}><div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 72, color: W, marginTop: 14 }}>un modelo <span style={{ color: F, textShadow: glow(F, 0.4) }}>real</span></div></In>
        <In at={53.4}><div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: `${W}CC`, marginTop: 8 }}>funcionando con nuestros clientes</div></In>
      </div>
    </Dock>
  );
};

// S10 · "una inmobiliaria chica con procesos inteligentes, sin ser una empresa gigante"
const SChica: React.FC = () => {
  const t = useT();
  const x = prog(t, 58.0, 0.3);
  const spin = (t - 55.9) * 90;
  return (
    <Dock from={54.12} to={58.82} kicker="INMOBILIARIA CHICA">
      <svg width={880} height={420} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6) }}>
        {/* casa chica + engranajes */}
        <path d="M110 300 L200 225 L290 300 M130 282 V380 H270 V282" fill="none" stroke={F} strokeWidth={5} strokeLinejoin="round" {...draw(t, 54.4, 0.6)} />
        {[[330, 220, 34], [385, 270, 24]].map(([cx, cy, r], i) => (
          <g key={i} transform={`rotate(${i ? -spin : spin} ${cx} ${cy})`} opacity={prog(t, 55.94, 0.3)}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={W} strokeWidth={4} />
            {Array.from({ length: 8 }).map((_, k) => { const a = (k / 8) * Math.PI * 2; return <line key={k} x1={cx + Math.cos(a) * r} y1={cy + Math.sin(a) * r} x2={cx + Math.cos(a) * (r + 10)} y2={cy + Math.sin(a) * (r + 10)} stroke={W} strokeWidth={5} />; })}
          </g>
        ))}
        {/* edificio gigante tachado */}
        <g opacity={prog(t, 57.6, 0.3) * (1 - 0.4 * x)}>
          <rect x={590} y={110} width={170} height={270} fill="none" stroke={`${W}AA`} strokeWidth={4} />
          {Array.from({ length: 12 }).map((_, k) => <rect key={k} x={612 + (k % 3) * 50} y={130 + Math.floor(k / 3) * 60} width={26} height={34} fill="none" stroke={`${W}77`} strokeWidth={3} />)}
        </g>
        <line x1={570} y1={390} x2={570 + 210 * x} y2={390 - 290 * x} stroke={F} strokeWidth={9} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", left: 60, top: 92, fontFamily: PT, fontStyle: "italic", fontSize: 34, color: W, opacity: prog(t, 55.94, 0.3) }}>procesos inteligentes</div>
      <div style={{ position: "absolute", left: 560, top: 70, fontFamily: MONT, fontWeight: 800, fontSize: 26, color: `${W}AA`, letterSpacing: 2, opacity: prog(t, 57.6, 0.3) }}>EMPRESA GIGANTE</div>
    </Dock>
  );
};

// S11 · "este martes 10 de noviembre te voy a mostrar el plan paso a paso"
const SMaster: React.FC = () => {
  const t = useT();
  return (
    <Dock from={58.94} to={64.8} kicker="MASTERCLASS EN VIVO">
      <div style={{ position: "absolute", left: 60, top: 100, width: 230, height: 270, borderRadius: 26, border: `3px solid ${F}`, boxShadow: glow(F, 0.5), overflow: "hidden", opacity: prog(t, 59.04, 0.3), transform: `scale(${0.7 + 0.3 * pop(t, 59.04, 0.5)})` }}>
        <div style={{ background: F, color: BG, fontFamily: MONT, fontWeight: 900, fontSize: 34, textAlign: "center", padding: "10px 0", letterSpacing: 3 }}>MARTES</div>
        <div style={{ fontFamily: ANTON, fontSize: 130, color: W, textAlign: "center", lineHeight: 1.15 }}>10</div>
        <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: F, textAlign: "center", letterSpacing: 4 }}>NOV</div>
      </div>
      <div style={{ position: "absolute", left: 340, top: 120, width: 500 }}>
        <In at={60.9} dx={40} dy={0}><div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 64, color: W, lineHeight: 1 }}>El plan</div></In>
        <In at={61.0} dx={40} dy={0}><div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 54, color: F, textShadow: glow(F, 0.4) }}>paso a paso</div></In>
        <In at={62.12} dx={40} dy={0}><div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 30, color: `${W}DD`, marginTop: 18, lineHeight: 1.2 }}>para empezar el 2027<br />con otro sistema</div></In>
      </div>
    </Dock>
  );
};

// S12 · CTA "Comentá PLAN y te mando la invitación privada"
const SCTA: React.FC = () => {
  const t = useT();
  const typed = "PLAN".slice(0, Math.max(0, Math.floor((t - 65.18) * 14)));
  const blink = Math.floor(t * 2.4) % 2 === 0;
  return (
    <Dock from={64.9} to={SRC_DUR + 0.1} kicker="COMENTÁ">
      <div style={{ position: "absolute", left: 60, right: 60, top: 100, height: 130, borderRadius: 65, border: `3px solid ${F}`, boxShadow: glow(F, 0.6), display: "flex", alignItems: "center", padding: "0 40px", gap: 24, opacity: prog(t, 64.95, 0.3) }}>
        <svg width={56} height={56} viewBox="0 0 56 56"><path d="M8 10 H48 V38 H24 L12 48 V38 H8 Z" fill="none" stroke={F} strokeWidth={4} strokeLinejoin="round" /></svg>
        <span style={{ fontFamily: TRUEFATE, fontSize: 96, color: Y, textShadow: `0 0 18px ${Y}, 0 0 40px ${Y}88`, lineHeight: 1 }}>{typed}</span>
        <span style={{ fontFamily: MONT, fontSize: 70, color: W, opacity: blink ? 1 : 0, marginLeft: -12 }}>|</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 268, textAlign: "center" }}>
        <In at={66.1}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 46, color: W }}>y te mando la </span><span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 46, color: F, textShadow: glow(F, 0.4) }}>invitación privada</span></In>
      </div>
    </Dock>
  );
};

// ---------- remates en cascada (sin overlay negro detrás) ----------
const Word: React.FC<{ at: number; from?: "left" | "right" | "up" | "pop"; style: React.CSSProperties; hero?: boolean; children: string }> = ({ at, from = "up", style, hero, children }) => {
  const t = useT();
  const p = from === "pop" ? pop(t, at, 0.5) : prog(t, at, 0.4);
  const tx = from === "left" ? -80 * (1 - p) : from === "right" ? 80 * (1 - p) : 0;
  const ty = from === "up" ? 50 * (1 - p) : 0;
  const sc = from === "pop" ? 0.4 + 0.6 * p : 1;
  const flash = hero ? interpolate(t, [at, at + 0.15, at + 0.6], [0, 1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  return (
    <span style={{ display: "inline-block", opacity: Math.min(1, p * 1.3), transform: `translate(${tx}px, ${ty}px) scale(${sc})`, textShadow: hero ? `0 0 ${14 + 30 * flash}px ${Y}, 0 0 ${40 + 50 * flash}px ${Y}AA, 0 4px 10px rgba(0,0,0,0.5)` : `0 0 14px ${W}55, 0 3px 10px rgba(0,0,0,0.7)`, ...style }}>
      {children}
    </span>
  );
};
const Remate1: React.FC = () => {
  const t = useT();
  const o = win(t, R1[0], R1[1], 0.15, 0.25);
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 960, height: 480, opacity: o }}>
      <div style={{ position: "absolute", left: 120, top: 0 }}><Word at={8.88} from="left" style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 64, color: W }}>necesitás</Word></div>
      <div style={{ position: "absolute", left: 470, top: 50 }}><Word at={9.2} from="right" style={{ fontFamily: PT, fontStyle: "italic", fontSize: 82, color: W }}>otro</Word></div>
      <div style={{ position: "absolute", left: 140, top: 140 }}><Word at={9.42} from="pop" hero style={{ fontFamily: TRUEFATE, fontSize: 190, color: Y, lineHeight: 1 }}>sistema</Word></div>
    </div>
  );
};
const Remate2: React.FC = () => {
  const t = useT();
  const o = win(t, R2[0], R2[1], 0.15, 0.25);
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 940, height: 520, opacity: o }}>
      <div style={{ position: "absolute", left: 110, top: 0, display: "flex", gap: 14, alignItems: "baseline" }}>
        <Word at={48.58} from="up" style={{ fontFamily: MONT, fontWeight: 600, fontSize: 46, color: W }}>pero</Word>
        <Word at={48.74} from="up" style={{ fontFamily: PT, fontStyle: "italic", fontSize: 54, color: W }}>la</Word>
      </div>
      <div style={{ position: "absolute", left: 80, top: 60 }}><Word at={49.0} from="pop" hero style={{ fontFamily: TRUEFATE, fontSize: 170, color: Y, lineHeight: 1 }}>confianza</Word></div>
      <div style={{ position: "absolute", left: 130, top: 270 }}><Word at={49.34} from="left" style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 60, color: W }}>la generás</Word></div>
      <div style={{ position: "absolute", left: 520, top: 220 }}><Word at={49.8} from="pop" hero style={{ fontFamily: TRUEFATE, fontSize: 160, color: Y, lineHeight: 1 }}>vos</Word></div>
    </div>
  );
};

// ---------- placa de cierre ----------
const EndPlate: React.FC = () => {
  const t = useT();
  const s = SRC_DUR;
  if (t < s - 0.2) return null;
  const o = prog(t, s - 0.2, 0.35);
  const ring = prog(t, s + 0.15, 0.9);
  const R = 215;
  return (
    <AbsoluteFill style={{ opacity: o, background: BG }}>
      <AbsoluteFill>
        <Img src={staticFile("img/office.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(9px) brightness(0.55) saturate(1.1)", transform: `scale(${1.08 + 0.03 * prog(t, s, 3.5)})` }} />
      </AbsoluteFill>
      <Img src={staticFile("img/office-sign.jpg")} style={{ position: "absolute", left: 0, top: 150, width: 1080, height: 270, objectFit: "cover", filter: "blur(1.5px) brightness(0.8)", maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)", WebkitMaskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,10,16,0.25) 0%, rgba(11,10,16,0.7) 35%, rgba(11,10,16,0.85) 100%)" }} />
      <AbsoluteFill style={{ background: F, mixBlendMode: "soft-light", opacity: 0.18 }} />
      <div style={{ position: "absolute", left: 540 - R, top: 470, width: R * 2, height: R * 2, transform: `scale(${0.85 + 0.15 * pop(t, s + 0.05, 0.6)})` }}>
        <Img src={staticFile("img/face.jpg")} style={{ position: "absolute", inset: 22, width: R * 2 - 44, height: R * 2 - 44, borderRadius: "50%", objectFit: "cover" }} />
        <svg width={R * 2} height={R * 2} style={{ position: "absolute", inset: 0, overflow: "visible", filter: svgGlow(F, 1) }}>
          <circle cx={R} cy={R} r={R - 6} fill="none" stroke={F} strokeWidth={8} strokeLinecap="round" transform={`rotate(-90 ${R} ${R})`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} />
        </svg>
      </div>
      <svg width={1080} height={140} style={{ position: "absolute", left: 0, top: 960, filter: svgGlow(F, 0.6) }}>
        {Array.from({ length: 31 }).map((_, i) => {
          const env = Math.exp(-Math.pow((i - 15) / 9, 2));
          const h = 10 + 100 * env * Math.abs(Math.sin(i * 0.8 + t * 6)) * prog(t, s + 0.3 + Math.abs(i - 15) * 0.02, 0.3);
          return <rect key={i} x={540 - 15 * 22 + i * 22 - 5} y={70 - h / 2} width={10} height={h} rx={5} fill={F} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1120, textAlign: "center" }}>
        <In at={s + 0.5}><div style={{ fontFamily: TRUEFATE, fontSize: 104, color: W, textShadow: `0 0 18px ${W}55` }}>Daniela Werkalec</div></In>
        <In at={s + 0.75}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 40, letterSpacing: 3, color: F, marginTop: 8 }}>Corredora Inmobiliaria</div></In>
        <In at={s + 0.9}><div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 34, letterSpacing: 0.5, color: W, marginTop: 6 }}><span style={{ color: F }}>+</span> Experta en Tecnología e IA para negocios</div></In>
        <In at={s + 1.05}><div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 36, color: `${W}CC`, marginTop: 26 }}>@danielawerkalec</div></In>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 66, top: 262, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: `${W}C0`, textShadow: "0 2px 8px rgba(0,0,0,0.7)", letterSpacing: 1 }}>
    @danielawerkalec · ✦ generado con IA
  </div>
);

// ---------- sonido ----------
type Sfx = { at: number; f: "whoosh" | "pop" | "ding" | "click" | "boom"; v?: number };
const SFX: Sfx[] = [
  { at: 0.4, f: "pop", v: 0.22 },
  { at: 2.3, f: "whoosh", v: 0.25 }, { at: 3.4, f: "pop", v: 0.22 }, { at: 3.55, f: "pop", v: 0.2 },
  { at: 5.9, f: "whoosh", v: 0.25 }, { at: 7.82, f: "click", v: 0.3 },
  { at: 9.42, f: "boom", v: 0.35 },
  { at: 10.34, f: "whoosh", v: 0.25 }, { at: 10.82, f: "pop", v: 0.2 }, { at: 11.72, f: "pop", v: 0.2 }, { at: 12.72, f: "pop", v: 0.2 }, { at: 13.64, f: "pop", v: 0.2 }, { at: 14.54, f: "pop", v: 0.2 }, { at: 15.54, f: "pop", v: 0.24 },
  { at: 16.96, f: "whoosh", v: 0.22 }, { at: 19.28, f: "boom", v: 0.28 },
  { at: 21.7, f: "whoosh", v: 0.25 }, { at: 24.54, f: "click", v: 0.28 }, { at: 25.78, f: "click", v: 0.28 }, { at: 26.86, f: "click", v: 0.28 },
  { at: 30.58, f: "whoosh", v: 0.25 }, { at: 32.4, f: "pop", v: 0.22 }, { at: 33.3, f: "pop", v: 0.22 }, { at: 35.96, f: "ding", v: 0.28 },
  { at: 40.16, f: "whoosh", v: 0.25 }, { at: 41.58, f: "boom", v: 0.32 }, { at: 42.54, f: "pop", v: 0.18 }, { at: 43.1, f: "pop", v: 0.18 }, { at: 44.18, f: "pop", v: 0.18 }, { at: 45.2, f: "pop", v: 0.22 },
  { at: 46.5, f: "whoosh", v: 0.22 }, { at: 49.0, f: "ding", v: 0.3 }, { at: 49.8, f: "ding", v: 0.25 },
  { at: 50.26, f: "whoosh", v: 0.22 }, { at: 51.0, f: "click", v: 0.28 },
  { at: 54.12, f: "whoosh", v: 0.22 }, { at: 58.0, f: "click", v: 0.3 },
  { at: 58.94, f: "whoosh", v: 0.25 }, { at: 59.04, f: "pop", v: 0.28 },
  { at: 64.9, f: "boom", v: 0.3 }, { at: 65.2, f: "click", v: 0.22 },
  { at: SRC_DUR - 0.15, f: "whoosh", v: 0.35 }, { at: SRC_DUR + 0.5, f: "ding", v: 0.3 },
];
const Sounds: React.FC = () => (
  <>
    {SFX.map((s, i) => (
      <Sequence key={i} from={Math.round(s.at * FPS)} durationInFrames={FPS * 3}>
        <Audio src={staticFile(`sfx/${s.f}.wav`)} volume={s.v ?? 0.3} />
      </Sequence>
    ))}
  </>
);

export const Main: React.FC = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence durationInFrames={Math.round(SRC_DUR * FPS)}>
        <Cam />
        <Grade />
      </Sequence>
      <Flash at={9.42} />
      <Flash at={41.58} o={0.25} />
      <Flash at={49.0} o={0.25} />
      <AngleTag />
      <StepChips />
      <SClon /><SEmpleados /><SRoles /><STiempo /><SMientras /><SFlujo /><SGanas /><STecno /><SFiccion /><SChica /><SMaster /><SCTA />
      <Remate1 /><Remate2 />
      <Karaoke />
      <EndPlate />
      <Watermark />
      <Sounds />
    </AbsoluteFill>
  );
};
