// Reel "Día de la diversidad cultural" — ÁNGULO OPINIÓN (fucsia #CB6CE6).
// El video ya trae subtítulos y música quemados: acá solo sumamos motion graphics por encima,
// en la zona libre de abajo (torso) y arriba (chips de pasos). La cara y los subs no se tapan.
import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, Easing } from "remotion";
import {
  ANTON, BG, draw, Dock, F, glow, In, Kicker, MONT, pop, prog, PT, REDHAT, svgGlow, TRUEFATE, useLocalFonts, useT, W, win, Y,
} from "./kit";

export const FPS = 30;
export const SRC_DUR = 43.43; // duración del video original
export const END_DUR = 3.6; // placa de cierre
export const TOTAL = SRC_DUR + END_DUR;

// ---------- cámara: punch-ins para simular cambios de ángulo ----------
const ZK: [number, number][] = [
  [0, 1], [10.0, 1], [10.14, 1.13], [10.6, 1.13], [11.3, 1], // "No."
  [23.82, 1], [23.96, 1.11], [25.0, 1.11], [25.6, 1], // "Eso democratiza"
  [33.92, 1], [34.06, 1.1], [35.0, 1.1], [35.7, 1], // "Ninguna app te avisa eso"
  [39.2, 1], [41.7, 1.07], [44, 1.07], // empuje lento en el remate
];
const zoomWithSnap = (t: number) =>
  interpolate(t, ZK.map((k) => k[0]), ZK.map((k) => k[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

const Cam: React.FC = () => {
  const t = useT();
  const z = zoomWithSnap(t);
  return (
    <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 38%" }}>
      <OffthreadVideo src={staticFile("src.mp4")} />
    </AbsoluteFill>
  );
};

// ---------- color base del ángulo ----------
const Grade: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: F, mixBlendMode: "soft-light", opacity: 0.16 }} />
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, transparent 55%, rgba(40,6,48,0.55) 100%)` }} />
  </>
);

const Flash: React.FC<{ at: number; c?: string; o?: number }> = ({ at, c = F, o = 0.35 }) => {
  const t = useT();
  const v = interpolate(t, [at - 0.02, at + 0.04, at + 0.3], [0, o, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: c, opacity: v, mixBlendMode: "screen" }} />;
};

// ---------- chips de pasos arriba ----------
const STEPS: { n: string; label: string; from: number }[] = [
  { n: "01", label: "El mito", from: 3.78 },
  { n: "02", label: "Antes y hoy", from: 13.78 },
  { n: "03", label: "El atajo", from: 25.88 },
  { n: "04", label: "La clave", from: 36.04 },
];
const StepChips: React.FC = () => {
  const t = useT();
  const o = win(t, 3.4, 41.7, 0.5, 0.4);
  if (o <= 0) return null;
  const active = STEPS.filter((s) => t >= s.from).length - 1;
  return (
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 12, opacity: o }}>
      {STEPS.map((s, i) => {
        const on = i === active;
        const p = pop(t, 3.4 + i * 0.08, 0.4);
        return (
          <div
            key={s.n}
            style={{
              transform: `scale(${0.6 + 0.4 * p}) scale(${on ? 1.06 : 1})`, opacity: p * (i > active ? 0.55 : 1),
              padding: "10px 18px", borderRadius: 999, border: `2px solid ${F}`,
              background: on ? F : "rgba(11,10,16,0.62)", color: on ? BG : W,
              boxShadow: on ? glow(F, 0.7) : "none", fontFamily: MONT, fontWeight: 800, fontSize: 26, letterSpacing: 1,
              display: "flex", gap: 8, whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: on ? BG : F }}>{s.n}</span>
            <span>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// Chip de apertura: ícono del ángulo + OPINIÓN
const AngleTag: React.FC = () => {
  const t = useT();
  const o = win(t, 0.5, 3.35, 0.4, 0.3);
  if (o <= 0) return null;
  const p = pop(t, 0.5, 0.5);
  return (
    <div style={{ position: "absolute", top: 66, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{ transform: `scale(${0.7 + 0.3 * p})`, display: "flex", alignItems: "center", gap: 14, padding: "10px 24px 10px 14px", borderRadius: 999, background: "rgba(11,10,16,0.66)", border: `2px solid ${F}`, boxShadow: glow(F, 0.5) }}>
        <Img src={staticFile("img/voz-fucsia.png")} style={{ height: 44 }} />
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: F }}>OPINIÓN</span>
        <span style={{ fontFamily: MONT, fontWeight: 600, fontSize: 24, color: W }}>· Día de la diversidad cultural</span>
      </div>
    </div>
  );
};

// ---------- escenas de la zona inferior ----------
const center: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" };

// 1 · "la tecnología nos vende una idea equivocada"
const SMito: React.FC = () => {
  const t = useT();
  const st = pop(t, 5.34, 0.35);
  return (
    <Dock from={3.9} to={6.75} kicker="LO QUE NOS VENDEN">
      <div style={{ ...center, top: 10 }}>
        <In at={4.4}>
          <div style={{ border: `2px dashed ${W}88`, borderRadius: 26, padding: "34px 56px", textAlign: "center" }}>
            <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: `${W}AA` }}>✦ PROMESA TECH</div>
            <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 60, color: W, marginTop: 6 }}>Un solo idioma</div>
            <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 44, color: W }}>para todos</div>
          </div>
        </In>
      </div>
      <div style={{ ...center, top: 40, opacity: st > 0 ? 1 : 0 }}>
        <div style={{ transform: `rotate(-9deg) scale(${2.2 - 1.2 * st})`, opacity: Math.min(1, st * 1.5), border: `6px solid ${F}`, borderRadius: 14, padding: "6px 26px", fontFamily: REDHAT, fontWeight: 900, fontSize: 68, letterSpacing: 4, color: F, textShadow: glow(F, 0.7), boxShadow: glow(F, 0.5), background: "rgba(11,10,16,0.55)", marginLeft: 320, marginTop: 235 }}>
          EQUIVOCADA
        </div>
      </div>
    </Dock>
  );
};

// Globo de diálogo line-art
const Bubble: React.FC<{ x: number; y: number; label: string; fill?: boolean; t: number; at: number; w?: number; strike?: number }> = ({ x, y, label, fill, t, at, w = 230, strike }) => {
  const p = pop(t, at, 0.4);
  const sk = strike !== undefined ? prog(t, strike, 0.3) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - 60, width: w, height: 120, opacity: Math.min(1, p * 1.4), transform: `scale(${0.5 + 0.5 * p})` }}>
      <svg width={w} height={150} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", filter: svgGlow(F, 0.6) }}>
        <path d={`M24 2 H${w - 24} Q${w - 2} 2 ${w - 2} 24 V96 Q${w - 2} 118 ${w - 24} 118 H70 L40 146 L46 118 H24 Q2 118 2 96 V24 Q2 2 24 2 Z`} fill={fill ? F : "rgba(11,10,16,0.5)"} stroke={F} strokeWidth={4} />
        {sk > 0 && <line x1={-10} y1={60 + 50} x2={-10 + (w + 20) * sk} y2={60 - 50 * (2 * sk - 1)} stroke={W} strokeWidth={8} strokeLinecap="round" />}
      </svg>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: REDHAT, fontWeight: 900, fontSize: 48, color: fill ? BG : W }}>
        {label}
      </div>
    </div>
  );
};

// 2 · "dicen que ahora todos podemos hablar el mismo idioma"
const SDicen: React.FC = () => {
  const t = useT();
  const m = prog(t, 8.56, 0.45); // se juntan
  const one = t >= 8.9;
  const xs = [190, 480, 770];
  return (
    <Dock from={7.04} to={9.95} kicker="DICEN QUE…">
      {!one &&
        ["Hola", "Hello", "Olá"].map((l, i) => (
          <div key={l} style={{ position: "absolute", left: (480 - xs[i]) * m, top: 0, width: 960, height: 450, opacity: 1 - m * 0.6 }}>
            <Bubble x={xs[i]} y={250} label={l} t={t} at={7.3 + i * 0.3} />
          </div>
        ))}
      {one && <Bubble x={480} y={250} label="1 idioma" fill t={t} at={8.9} w={340} />}
    </Dock>
  );
};

// 3 · "No. Ahora podemos entendernos sin hablar el mismo"
const SNo: React.FC = () => {
  const t = useT();
  const line = prog(t, 10.9, 0.5);
  const dots = [0, 0.33, 0.66].map((o) => ((t * 0.9 + o) % 1));
  return (
    <Dock from={10.04} to={13.6} kicker="NO. AHORA…">
      <Bubble x={190} y={215} label="ES" t={t} at={10.3} w={190} />
      <Bubble x={770} y={215} label="EN" t={t} at={10.5} w={190} />
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.7) }}>
        <line x1={300} y1={215} x2={300 + 360 * line} y2={215} stroke={F} strokeWidth={4} strokeDasharray="10 12" />
        {line >= 1 && dots.map((d, i) => <circle key={i} cx={300 + 360 * d} cy={215} r={9} fill={W} />)}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center" }}>
        <In at={11.4}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 60, color: W, textShadow: glow(F, 0.4) }}>entendernos</span></In>
        <In at={12.48}><span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 32, letterSpacing: 2, color: F }}>sin hablar el mismo idioma</span></In>
      </div>
    </Dock>
  );
};

const BookIcon = ({ t, at }: { t: number; at: number }) => (
  <svg width={70} height={70} viewBox="0 0 70 70" style={{ filter: svgGlow(F, 0.5) }}>
    <path d="M6 14 Q20 8 35 16 Q50 8 64 14 V58 Q50 52 35 60 Q20 52 6 58 Z M35 16 V60" fill="none" stroke={F} strokeWidth={4} strokeLinejoin="round" {...draw(t, at, 0.6)} />
  </svg>
);
const CoinIcon = ({ t, at }: { t: number; at: number }) => (
  <svg width={70} height={70} viewBox="0 0 70 70" style={{ filter: svgGlow(F, 0.5) }}>
    <circle cx={35} cy={35} r={27} fill="none" stroke={F} strokeWidth={4} {...draw(t, at, 0.6)} />
    <path d="M43 25 Q35 19 28 24 Q22 30 32 34 Q46 38 40 46 Q33 51 26 45 M35 15 V55" fill="none" stroke={F} strokeWidth={4} strokeLinecap="round" {...draw(t, at + 0.15, 0.6)} />
  </svg>
);
const RowItem: React.FC<{ at: number; n: string; icon: React.ReactNode; text: string }> = ({ at, n, icon, text }) => (
  <In at={at} dx={-60} dy={0}>
    <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "14px 22px", borderRadius: 20, border: `2px solid ${F}66`, background: "rgba(203,108,230,0.08)" }}>
      <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 30, color: F }}>{n}</span>
      {icon}
      <span style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 46, color: W }}>{text}</span>
    </div>
  </In>
);

// 4 · "Antes, para trabajar con alguien de otro país…"
const SAntes: React.FC = () => {
  const t = useT();
  return (
    <Dock from={13.85} to={19.75} kicker="ANTES">
      <div style={{ position: "absolute", left: 40, right: 40, top: 82 }}>
        <In at={14.4}>
          <div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 42, color: W, marginBottom: 22 }}>
            para trabajar con <span style={{ color: F }}>otro país</span>…
          </div>
        </In>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <RowItem at={16.68} n="01" icon={<BookIcon t={t} at={16.75} />} text="Aprender su idioma" />
          <RowItem at={18.08} n="02" icon={<CoinIcon t={t} at={18.15} />} text="Pagar un intérprete" />
        </div>
      </div>
    </Dock>
  );
};

const Person = ({ x, t, at }: { x: number; t: number; at: number }) => (
  <g transform={`translate(${x},0)`}>
    <circle cx={0} cy={118} r={34} fill="none" stroke={F} strokeWidth={4} {...draw(t, at, 0.5)} />
    <path d="M-62 210 Q-60 160 0 160 Q60 160 62 210" fill="none" stroke={F} strokeWidth={4} strokeLinecap="round" {...draw(t, at + 0.15, 0.5)} />
  </g>
);
const typed = (s: string, t: number, at: number, cps = 26) => s.slice(0, Math.max(0, Math.floor((t - at) * cps)));

// 5 · "Hoy abrís una videollamada y los subtítulos traducen en el momento"
const SVideollamada: React.FC = () => {
  const t = useT();
  const rec = Math.floor(t * 2) % 2 === 0;
  return (
    <Dock from={20.16} to={23.7} kicker="HOY">
      <div style={{ position: "absolute", right: 40, top: 28, display: "flex", alignItems: "center", gap: 10, fontFamily: MONT, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: W }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, background: F, opacity: rec ? 1 : 0.25, boxShadow: glow(F, 0.5) }} />
        EN VIVO
      </div>
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.5) }}>
        <rect x={40} y={80} width={880} height={250} rx={22} fill="none" stroke={F} strokeWidth={3} {...draw(t, 20.3, 0.6)} />
        <line x1={480} y1={92} x2={480} y2={318} stroke={F} strokeWidth={2} opacity={0.6} {...draw(t, 20.5, 0.4)} />
        <Person x={260} t={t} at={20.55} />
        <Person x={700} t={t} at={20.7} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={430 + i * 50} cy={385} r={14} fill="none" stroke={W} strokeWidth={3} opacity={prog(t, 20.8 + i * 0.08, 0.3)} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 70, right: 70, top: 240, padding: "10px 20px", borderRadius: 14, background: "rgba(0,0,0,0.72)", opacity: prog(t, 21.6, 0.3), textAlign: "center" }}>
        <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 28, color: `${W}BB` }}>{typed("“Nice to meet you!”", t, 21.7)}</div>
        <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 32, color: F }}>{t > 22.3 ? "→ " + typed("¡Un gusto conocerte!", t, 22.35) : ""}</div>
      </div>
    </Dock>
  );
};

// 6 · "Eso democratiza" — globo terráqueo con conexiones
const NODES: [number, number][] = [[-120, -40], [90, -95], [140, 50], [-60, 105], [20, 10], [-150, 60]];
const SDemocratiza: React.FC = () => {
  const t = useT();
  const rot = t * 18;
  return (
    <Dock from={23.86} to={25.75} kicker="DEMOCRATIZA">
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.7) }}>
        <g transform="translate(300,250)">
          <circle r={150} fill="none" stroke={F} strokeWidth={3} {...draw(t, 23.95, 0.5)} />
          {[-1, -0.5, 0, 0.5, 1].map((k, i) => (
            <ellipse key={i} rx={Math.abs(150 * Math.cos(((rot + k * 45) * Math.PI) / 180))} ry={150} fill="none" stroke={F} strokeWidth={1.5} opacity={0.6} />
          ))}
          {[-75, 0, 75].map((y, i) => (
            <line key={i} x1={-Math.sqrt(150 * 150 - y * y)} y1={y} x2={Math.sqrt(150 * 150 - y * y)} y2={y} stroke={F} strokeWidth={1.5} opacity={0.6} />
          ))}
          {NODES.map(([x, y], i) => {
            const p = pop(t, 24.1 + i * 0.1, 0.3);
            const [nx, ny] = NODES[(i + 2) % NODES.length];
            return (
              <g key={i}>
                <line x1={x} y1={y} x2={x + (nx - x) * prog(t, 24.2 + i * 0.1, 0.4)} y2={y + (ny - y) * prog(t, 24.2 + i * 0.1, 0.4)} stroke={W} strokeWidth={2.5} />
                <circle cx={x} cy={y} r={10 * p} fill={W} />
              </g>
            );
          })}
        </g>
      </svg>
      <div style={{ position: "absolute", left: 500, top: 150, width: 420 }}>
        <In at={24.15}><div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 64, color: W, lineHeight: 1 }}>Acceso</div></In>
        <In at={24.35}><div style={{ fontFamily: PT, fontStyle: "italic", fontSize: 54, color: F, textShadow: glow(F, 0.4) }}>para todos</div></In>
      </div>
    </Dock>
  );
};

// 7 · "Pero ojo con el atajo. Traducir palabras no es entender a la persona."
const SAtajo: React.FC = () => {
  const t = useT();
  return (
    <Dock from={25.88} to={29.8} kicker="⚠ OJO CON EL ATAJO">
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <In at={27.02} dx={-50} dy={0}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 76, color: W, lineHeight: 1 }}>Traducir</div>
            <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: `${W}AA`, marginTop: 10 }}>palabras</div>
          </div>
        </In>
        <svg width={120} height={120} viewBox="0 0 120 120" style={{ filter: svgGlow(F, 1), transform: `scale(${0.6 + 0.4 * pop(t, 28.1, 0.4)})` }}>
          <line x1={14} y1={44} x2={106} y2={44} stroke={F} strokeWidth={10} strokeLinecap="round" {...draw(t, 28.1, 0.25)} />
          <line x1={14} y1={78} x2={106} y2={78} stroke={F} strokeWidth={10} strokeLinecap="round" {...draw(t, 28.2, 0.25)} />
          <line x1={84} y1={10} x2={36} y2={112} stroke={F} strokeWidth={10} strokeLinecap="round" {...draw(t, 28.3, 0.25)} />
        </svg>
        <In at={28.52} dx={50} dy={0}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: PT, fontStyle: "italic", fontWeight: 700, fontSize: 76, color: W, lineHeight: 1 }}>Entender</div>
            <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: F, marginTop: 10 }}>a la persona</div>
          </div>
        </In>
      </div>
    </Dock>
  );
};

// 8 · "Ahorita en México puede ser en cinco minutos o en tres días" — medidor
const SAhorita: React.FC = () => {
  const t = useT();
  // aguja: arranca al centro, va a "5 min", salta a "3 días", queda dudando
  let ang = interpolate(t, [30.3, 31.64, 31.9, 32.74, 33.0], [0, 0, -72, -72, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  if (t > 33.0) ang = 72 - 40 * Math.abs(Math.sin((t - 33.0) * 6)) * Math.exp(-(t - 33) * 1.5) - 0;
  const cx = 480, cy = 360, r = 210;
  return (
    <Dock from={29.98} to={33.75} kicker="“AHORITA” EN MÉXICO">
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6) }}>
        <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={F} strokeWidth={5} {...draw(t, 30.1, 0.6)} />
        {Array.from({ length: 11 }).map((_, i) => {
          const a = Math.PI - (i / 10) * Math.PI;
          const o = prog(t, 30.2 + i * 0.03, 0.2);
          return <line key={i} x1={cx + Math.cos(a) * (r - 8)} y1={cy - Math.sin(a) * (r - 8)} x2={cx + Math.cos(a) * (r - 30)} y2={cy - Math.sin(a) * (r - 30)} stroke={W} strokeWidth={3} opacity={o * 0.8} />;
        })}
        <g transform={`rotate(${ang} ${cx} ${cy})`} opacity={prog(t, 30.4, 0.3)}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + 40} stroke={W} strokeWidth={7} strokeLinecap="round" />
        </g>
        <circle cx={cx} cy={cy} r={16} fill={F} opacity={prog(t, 30.4, 0.3)} />
      </svg>
      <div style={{ position: "absolute", left: 40, top: 380, fontFamily: REDHAT, fontWeight: 900, fontSize: 42, color: t > 31.64 && t < 32.74 ? F : W, opacity: prog(t, 31.64, 0.3) }}>5 min</div>
      <div style={{ position: "absolute", right: 40, top: 380, fontFamily: REDHAT, fontWeight: 900, fontSize: 42, color: t > 32.74 ? F : W, opacity: prog(t, 32.74, 0.3) }}>3 días</div>
    </Dock>
  );
};

// 9 · "Ninguna app te avisa eso"
const SNinguna: React.FC = () => {
  const t = useT();
  const shake = t > 34.2 && t < 34.7 ? Math.sin(t * 60) * 6 : 0;
  return (
    <Dock from={33.96} to={35.75} kicker="NINGUNA APP TE AVISA">
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6) }}>
        <rect x={110} y={80} width={190} height={340} rx={30} fill="none" stroke={F} strokeWidth={4} {...draw(t, 34.0, 0.5)} />
        <line x1={175} y1={100} x2={235} y2={100} stroke={F} strokeWidth={4} strokeLinecap="round" opacity={prog(t, 34.3, 0.2)} />
        <g transform={`translate(${205 + shake},245)`}>
          <path d="M-36 22 Q-30 16 -30 -6 Q-30 -40 0 -42 Q30 -40 30 -6 Q30 16 36 22 Z M-10 30 Q0 42 10 30" fill="none" stroke={W} strokeWidth={4} strokeLinejoin="round" {...draw(t, 34.15, 0.4)} />
          <line x1={-48} y1={48} x2={48} y2={-56} stroke={F} strokeWidth={7} strokeLinecap="round" {...draw(t, 34.46, 0.2)} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 360, top: 140, width: 560 }}>
        <In at={34.2} dx={40} dy={0}>
          <div style={{ fontFamily: ANTON, fontSize: 130, color: F, lineHeight: 1, textShadow: glow(F, 0.5) }}>0</div>
        </In>
        <In at={34.46} dx={40} dy={0}>
          <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 38, color: W, lineHeight: 1.15 }}>alertas de<br />contexto cultural</div>
        </In>
      </div>
    </Dock>
  );
};

// 10 · "La IA traduce el idioma."
const SIA: React.FC = () => {
  const t = useT();
  return (
    <Dock from={36.04} to={38.75} kicker="LA IA">
      <svg width={960} height={450} style={{ position: "absolute", inset: 0, filter: svgGlow(F, 0.6) }}>
        {Array.from({ length: 34 }).map((_, i) => {
          const h = 16 + 70 * Math.abs(Math.sin(i * 0.55 + t * 7)) * Math.abs(Math.sin(i * 0.21 + t * 2.3)) * prog(t, 36.2 + i * 0.012, 0.3);
          return <rect key={i} x={70 + i * 24.5} y={330 - h / 2} width={11} height={h} rx={5} fill={i % 5 === 0 ? W : F} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 100, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 22 }}>
        <In at={36.16}><span style={{ fontFamily: REDHAT, fontWeight: 900, fontSize: 82, color: F, textShadow: glow(F, 0.5) }}>✦ IA</span></In>
        <In at={36.58}><span style={{ fontFamily: PT, fontStyle: "italic", fontSize: 64, color: W }}>traduce</span></In>
        <In at={37.2}><span style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 64, color: W }}>el idioma ✓</span></In>
      </div>
    </Dock>
  );
};

// 11 · REMATE en cascada: "Entender al otro lo pone la persona"
const Word: React.FC<{ at: number; from?: "left" | "right" | "up" | "pop"; style: React.CSSProperties; hero?: boolean; children: string }> = ({ at, from = "up", style, hero, children }) => {
  const t = useT();
  const p = from === "pop" ? pop(t, at, 0.5) : prog(t, at, 0.4);
  const tx = from === "left" ? -80 * (1 - p) : from === "right" ? 80 * (1 - p) : 0;
  const ty = from === "up" ? 50 * (1 - p) : 0;
  const sc = from === "pop" ? 0.4 + 0.6 * p : 1;
  const flash = hero ? interpolate(t, [at, at + 0.15, at + 0.6], [0, 1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  return (
    <span style={{ display: "inline-block", opacity: Math.min(1, p * 1.3), transform: `translate(${tx}px, ${ty}px) scale(${sc})`, textShadow: hero ? `0 0 ${14 + 30 * flash}px ${Y}, 0 0 ${40 + 50 * flash}px ${Y}AA, 0 6px 16px rgba(0,0,0,0.6)` : `0 0 14px ${W}55, 0 4px 14px rgba(0,0,0,0.7)`, ...style }}>
      {children}
    </span>
  );
};
const SRemate: React.FC = () => {
  const t = useT();
  const o = win(t, 39.2, 41.75, 0.2, 0.3);
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1290, height: 500, opacity: o }}>
      {/* sin sombra/overlay negro detrás del remate (decisión de marca) */}
      <div style={{ position: "absolute", left: 90, top: 30 }}>
        <Word at={39.28} from="pop" hero style={{ fontFamily: TRUEFATE, fontSize: 150, color: Y, lineHeight: 1 }}>Entender</Word>
      </div>
      <div style={{ position: "absolute", left: 640, top: 175 }}>
        <Word at={39.62} from="right" style={{ fontFamily: PT, fontStyle: "italic", fontSize: 64, color: W }}>al otro</Word>
      </div>
      <div style={{ position: "absolute", left: 80, top: 300, display: "flex", gap: 16, alignItems: "baseline" }}>
        <Word at={40.02} from="left" style={{ fontFamily: REDHAT, fontWeight: 700, fontSize: 52, color: W }}>lo pone</Word>
        <Word at={40.38} from="up" style={{ fontFamily: MONT, fontWeight: 600, fontSize: 44, color: W }}>la</Word>
      </div>
      <div style={{ position: "absolute", left: 405, top: 245 }}>
        <Word at={40.68} from="pop" hero style={{ fontFamily: TRUEFATE, fontSize: 140, color: Y, lineHeight: 1 }}>persona</Word>
      </div>
    </div>
  );
};

// 12 · "Feliz día de la diversidad" — saludos en varios idiomas
const HELLOS = ["Hola", "Hello", "Olá", "Ciao", "Bonjour", "Hallo", "Salut", "Merhaba", "Hej", "Jambo"];
const SFeliz: React.FC = () => {
  const t = useT();
  const o = win(t, 41.82, SRC_DUR + 0.1, 0.3, 0.25);
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1380, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 28px", opacity: o }}>
      {HELLOS.map((h, i) => {
        const p = pop(t, 41.85 + i * 0.07, 0.4);
        return (
          <span key={h} style={{ opacity: p, transform: `scale(${0.5 + 0.5 * p})`, fontFamily: i % 2 ? PT : REDHAT, fontStyle: i % 2 ? "italic" : "normal", fontWeight: i % 2 ? 400 : 900, fontSize: 58, color: i % 3 === 0 ? F : W, textShadow: i % 3 === 0 ? glow(F, 0.5) : "0 4px 14px rgba(0,0,0,0.8)" }}>
            {h}
          </span>
        );
      })}
    </div>
  );
};

// ---------- placa de cierre (motion graphics sobre la oficina, sin la figura de Daniela) ----------
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
        <Img src={staticFile("img/office-shelf.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(9px) brightness(0.55) saturate(1.1)", transform: `scale(${1.08 + 0.03 * prog(t, s, 3.5)})` }} />
      </AbsoluteFill>
      <Img src={staticFile("img/office-sign.jpg")} style={{ position: "absolute", left: 0, top: 120, width: 1080, height: 270, objectFit: "cover", filter: "blur(1.5px) brightness(0.8)", maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)", WebkitMaskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,10,16,0.25) 0%, rgba(11,10,16,0.7) 35%, rgba(11,10,16,0.85) 100%)" }} />
      <AbsoluteFill style={{ background: F, mixBlendMode: "soft-light", opacity: 0.18 }} />
      {/* foto + anillo */}
      <div style={{ position: "absolute", left: 540 - R, top: 470, width: R * 2, height: R * 2, transform: `scale(${0.85 + 0.15 * pop(t, s + 0.05, 0.6)})` }}>
        <Img src={staticFile("img/face.jpg")} style={{ position: "absolute", inset: 22, width: R * 2 - 44, height: R * 2 - 44, borderRadius: "50%", objectFit: "cover" }} />
        <svg width={R * 2} height={R * 2} style={{ position: "absolute", inset: 0, overflow: "visible", filter: svgGlow(F, 1) }}>
          <circle cx={R} cy={R} r={R - 6} fill="none" stroke={F} strokeWidth={8} strokeLinecap="round" transform={`rotate(-90 ${R} ${R})`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} />
        </svg>
      </div>
      {/* waveform */}
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
  <div style={{ position: "absolute", left: 40, bottom: 44, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: `${W}C0`, textShadow: "0 2px 8px rgba(0,0,0,0.7)", letterSpacing: 1 }}>
    ✦ generado con IA
  </div>
);

// ---------- sonido: SFX suaves (el video ya trae música) + cola musical en la placa ----------
type Sfx = { at: number; f: "whoosh" | "pop" | "ding" | "click" | "boom"; v?: number };
const SFX: Sfx[] = [
  { at: 0.5, f: "pop", v: 0.25 },
  { at: 3.9, f: "whoosh", v: 0.3 }, { at: 5.34, f: "boom", v: 0.35 },
  { at: 7.04, f: "whoosh", v: 0.25 }, { at: 8.9, f: "pop", v: 0.3 },
  { at: 10.04, f: "boom", v: 0.4 },
  { at: 13.85, f: "whoosh", v: 0.25 }, { at: 16.68, f: "click", v: 0.35 }, { at: 18.08, f: "click", v: 0.35 },
  { at: 20.16, f: "whoosh", v: 0.25 }, { at: 22.3, f: "pop", v: 0.25 },
  { at: 23.86, f: "boom", v: 0.3 },
  { at: 25.88, f: "whoosh", v: 0.25 }, { at: 28.1, f: "pop", v: 0.3 },
  { at: 29.98, f: "whoosh", v: 0.25 }, { at: 31.9, f: "click", v: 0.3 }, { at: 32.74, f: "click", v: 0.35 },
  { at: 33.96, f: "boom", v: 0.3 },
  { at: 36.04, f: "whoosh", v: 0.25 },
  { at: 39.28, f: "ding", v: 0.3 }, { at: 40.68, f: "ding", v: 0.25 },
  { at: SRC_DUR - 0.15, f: "whoosh", v: 0.35 }, { at: SRC_DUR + 0.5, f: "ding", v: 0.3 },
];
const Sounds: React.FC = () => (
  <>
    {SFX.map((s, i) => (
      <Sequence key={i} from={Math.round(s.at * FPS)} durationInFrames={FPS * 3}>
        <Audio src={staticFile(`sfx/${s.f}.wav`)} volume={s.v ?? 0.3} />
      </Sequence>
    ))}
    <Sequence from={Math.round((SRC_DUR - 0.3) * FPS)}>
      <Audio
        src={staticFile("forward-momentum.mp3")}
        startFrom={Math.round(10 * FPS)}
        volume={(f) => interpolate(f, [0, 12, END_DUR * FPS - 30, END_DUR * FPS], [0, 0.35, 0.35, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </Sequence>
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
      <Flash at={10.04} />
      <Flash at={23.86} o={0.25} />
      <Flash at={33.96} o={0.25} />
      <AngleTag />
      <StepChips />
      <SMito />
      <SDicen />
      <SNo />
      <SAntes />
      <SVideollamada />
      <SDemocratiza />
      <SAtajo />
      <SAhorita />
      <SNinguna />
      <SIA />
      <SRemate />
      <SFeliz />
      <EndPlate />
      <Watermark />
      <Sounds />
    </AbsoluteFill>
  );
};
