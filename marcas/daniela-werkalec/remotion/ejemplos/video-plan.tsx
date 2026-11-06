// Reel PLAN "Masterclass gratuita: plan de 60 días" — marca daniela-werkalec. Ángulo: PROMPTS / GUÍAS (amarillo #F4C910).
// Invitación en primera persona. El video ya trae música/ambiente, transiciones con destello de luz en cada pausa
// (≈5.7, 12.4, 17.9, 33.4 y 41 s) y texto quemado en 0–12 s ("¿TU INMOBILIARIA EN 2027?" / "MUCHO POR HACER. POCO TIEMPO.").
// Nada de eso se tapa con gráficos: el texto quemado se reemplaza por remates a la altura del pecho.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { C, TITLE, BODY, TRUEFATE, REMARK_SANS, REMARK_SERIF } from "./theme";
import { DURATION } from "./words";
import { Sfx, Sounds, useT, prog, pop } from "./lib";
import { CAM_FULL, CamKeyV, CamV, SubsV, RemarkPhrase, RWord } from "./reel";
import { FullScreen, Kicker, Headline } from "./mg";

export const CTA_SECONDS = 3.4;
const CAM: CamKeyV[] = [{ at: 0, box: CAM_FULL, zoom: 1.0, fy: 40 }];

// Subtítulos a la altura del pecho según el plano
const SUBS_Y: [number, number][] = [[0, 650], [25.86, 780], [33.6, 650], [41.2, 720], [55.9, 860], [58.0, 980]];
const subsAt = (t: number) => {
  let y = SUBS_Y[0][1];
  for (const [a, v] of SUBS_Y) if (t >= a) y = v;
  return y;
};
const KEYWORDS = ["2027", "masterclass", "receta", "plan", "gratuito", "gratis", "plataforma", "inteligencia", "artificial", "herramientas"];

// ventanas (s) — las transiciones con destello del video quedan siempre libres
const HOOK: [number, number] = [0.0, 5.4];
const R_POCO: [number, number] = [7.95, 10.0];
const PILL_1: [number, number] = [13.45, 17.8];
const R_RECETA: [number, number] = [20.1, 25.25];
const G_PASO: [number, number] = [28.85, 31.3];
const G_PREG: [number, number] = [33.75, 40.65];
const PILL_2: [number, number] = [44.5, 48.3];
const CHIPS: [number, number] = [48.5, 55.8];
const R_GRATIS: [number, number] = [58.3, 60.7];
const PILL_3: [number, number] = [61.0, 63.55];
const CTA: [number, number] = [63.65, 65.7];
const BURNED_UNTIL = 12.1; // el texto quemado del video vive en 0–12 s (abajo, y≈1230–1660)

const SFX: Sfx[] = [
  { at: 0.0, f: "whoosh", v: 0.3 }, { at: 1.72, f: "pop", v: 0.35 }, { at: 8.96, f: "boom", v: 0.3 },
  { at: PILL_1[0], f: "pop", v: 0.3 }, { at: 21.18, f: "pop", v: 0.35 },
  { at: G_PASO[0], f: "whoosh", v: 0.4 }, { at: 29.34, f: "click", v: 0.3 }, { at: 30.12, f: "pop", v: 0.35 },
  { at: G_PREG[0], f: "whoosh", v: 0.4 }, { at: 34.0, f: "click", v: 0.3 }, { at: 34.95, f: "click", v: 0.3 }, { at: 36.3, f: "click", v: 0.3 }, { at: 37.7, f: "click", v: 0.3 },
  { at: PILL_2[0], f: "pop", v: 0.3 }, { at: 49.14, f: "click", v: 0.3 }, { at: 51.3, f: "click", v: 0.3 }, { at: 53.56, f: "click", v: 0.3 },
  { at: 58.88, f: "boom", v: 0.35 }, { at: PILL_3[0], f: "pop", v: 0.3 }, { at: CTA[0], f: "pop", v: 0.4 },
  { at: DURATION, f: "whoosh", v: 0.5 }, { at: DURATION + 0.5, f: "ding", v: 0.6 },
];

// ---------- remates (en cascada, a la altura del pecho) ----------
const REMATE_HOOK: RWord[] = [
  { t: "¿Tu inmobiliaria", at: 0.0, font: REMARK_SANS, size: 66, anim: "left" },
  { t: "va a empezar", at: 0.96, font: REMARK_SERIF, italic: true, size: 56, anim: "fade" },
  { t: "el 2027", at: 1.72, big: true, font: TRUEFATE, size: 170, anim: "pop" },
  { t: "haciendo", at: 2.62, font: REMARK_SANS, size: 58, anim: "up" },
  { t: "exactamente lo mismo", at: 3.14, font: REMARK_SERIF, italic: true, size: 70, anim: "up" },
  { t: "que en 2026?", at: 4.4, font: REMARK_SANS, size: 74, anim: "right" },
];
const REMATE_POCO: RWord[] = [
  { t: "mucho por hacer,", at: 7.98, font: REMARK_SANS, size: 70, anim: "left" },
  { t: "poco tiempo", at: 8.96, big: true, font: TRUEFATE, size: 150, anim: "pop" },
];
const REMATE_RECETA: RWord[] = [
  { t: "te voy a mostrar la", at: 20.16, font: REMARK_SANS, size: 54, anim: "left" },
  { t: "receta", at: 21.18, big: true, font: TRUEFATE, size: 200, anim: "pop" },
  { t: "que venimos aplicando", at: 21.52, font: REMARK_SERIF, italic: true, size: 62, anim: "up" },
  { t: "con nuestros clientes", at: 23.06, font: REMARK_SANS, size: 54, anim: "right" },
  { t: "inmobiliarios", at: 24.3, font: REMARK_SANS, size: 80, anim: "pop" },
];
const REMATE_GRATIS: RWord[] = [
  { t: "totalmente", at: 58.34, font: REMARK_SANS, size: 84, anim: "left" },
  { t: "gratis", at: 58.88, big: true, font: TRUEFATE, size: 230, anim: "pop" },
  { t: "por 60 días", at: 59.42, font: REMARK_SERIF, italic: true, size: 96, anim: "up" },
];

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", top: 262, left: 56, fontFamily: BODY, fontWeight: 600, fontSize: 27, letterSpacing: 1.2, color: "rgba(255,255,255,.82)", textShadow: "0 2px 8px rgba(0,0,0,.85)" }}>
    ✦ generado con IA
  </div>
);

// tapa el texto quemado del video (0–12 s: "¿TU INMOBILIARIA EN 2027?" abajo y "MUCHO POR HACER. POCO TIEMPO." más arriba,
// los dos dentro de la zona que tapa Instagram) con un degradé suave a oscuro + desenfoque que crece hacia abajo.
// Los parches rectangulares se leían como barras de censura.
const HideBurned: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 12.0, 0.3);
  if (o <= 0.01) return null;
  const mask = "linear-gradient(180deg, transparent 0%, black 20%, black 100%)";
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1000, bottom: 0, opacity: o, backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(36px)", WebkitMaskImage: mask, maskImage: mask }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1000, bottom: 0, opacity: o, background: "linear-gradient(180deg, rgba(11,10,16,0) 0%, rgba(11,10,16,0.78) 24%, rgba(11,10,16,0.9) 45%, rgba(11,10,16,0.93) 100%)" }} />
    </>
  );
};

// ---------- tarjeta base ----------
const glass: React.CSSProperties = {
  background: "rgba(11,10,16,0.78)",
  border: `2px solid ${C.angle}`,
  borderRadius: 26,
  boxShadow: `0 0 34px ${C.angle}55, 0 20px 50px rgba(0,0,0,.55)`,
  backdropFilter: "blur(6px)",
};


const glassCard: React.CSSProperties = { background: "rgba(11,10,16,0.82)", border: `2px solid ${C.angle}`, borderRadius: 28, boxShadow: `0 0 34px ${C.angle}55, 0 20px 50px rgba(0,0,0,.55)` };
const stroke = { fill: "none", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// íconos line-art (color del ángulo)
const Ico: React.FC<{ kind: "chat" | "persona" | "bolso" | "flow" | "foto" | "tools" | "prompt" | "equipo"; size?: number; color?: string }> = ({ kind, size = 90, color = C.angle }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} stroke={color} style={{ filter: `drop-shadow(0 0 8px ${color}99)` }}>
    {kind === "chat" && <><path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M7 10.5h10M7 13.5h6" /></>}
    {kind === "persona" && <><circle cx="12" cy="8" r="4" /><path d="M4.5 21c0-4.5 3.4-7 7.5-7s7.5 2.5 7.5 7" /></>}
    {kind === "bolso" && <><path d="M5 9h14l1.5 11h-17L5 9Z" /><path d="M8.5 9V7a3.5 3.5 0 0 1 7 0v2" /></>}
    {kind === "flow" && <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M10 9.5l5 2.5-5 2.5v-5Z" /></>}
    {kind === "foto" && <><rect x="3" y="5" width="18" height="14" rx="2.5" /><circle cx="9" cy="10.5" r="1.8" /><path d="M3.5 17l5-4.5 4 3 3-2.5 5 4" /></>}
    {kind === "tools" && <><circle cx="9" cy="9" r="4.5" /><path d="M12.5 12.5L20 20M16 3l5 5-3 1-3-3 1-3Z" /></>}
    {kind === "prompt" && <><path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><circle cx="8" cy="11.5" r="1" fill={color} /><circle cx="12" cy="11.5" r="1" fill={color} /><circle cx="16" cy="11.5" r="1" fill={color} /></>}
    {kind === "equipo" && <><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="8.5" r="2.6" /><path d="M2.5 19c0-3.5 2.4-5.5 5.5-5.5S13.5 15.5 13.5 19M14 14.2c3 0 6.5 1.3 6.5 4.8" /></>}
  </svg>
);

// píldora informativa parcial (no tapa a Daniela)
const InfoPill: React.FC<{ from: number; to: number; top: number; kicker: string; title: string }> = ({ from, to, top, kicker, title }) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45);
  const out = prog(t, to, 0.35);
  return (
    <div style={{ position: "absolute", top, left: 60, right: 140, display: "flex", justifyContent: "center", opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glassCard, padding: "20px 38px", textAlign: "center" }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 27, letterSpacing: 3, color: C.angle }}>● {kicker}</div>
        <div style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 46, color: C.text, marginTop: 6, lineHeight: 1.1 }}>{title}</div>
      </div>
    </div>
  );
};

// ================= 1 · "un paso a paso de 60 días" (28.85–31.3) =================
const MgPaso: React.FC = () => {
  const t = useT();
  const N = 7;
  const nodes = Array.from({ length: N }, (_, i) => i);
  const line = prog(t, 29.2, 1.3);
  return (
    <>
      <Kicker at={28.9} text="PASO A PASO" top={330} />
      <div style={{ position: "absolute", left: 100, right: 180, top: 640, height: 12, borderRadius: 6, background: "rgba(255,255,255,.12)" }}>
        <div style={{ width: `${line * 100}%`, height: 12, borderRadius: 6, background: C.angle, boxShadow: `0 0 18px ${C.angle}` }} />
      </div>
      {nodes.map((i) => {
        const at = 29.2 + (i / (N - 1)) * 1.3;
        const p = pop(t, at, 0.4);
        const x = 100 + (i / (N - 1)) * 760;
        return <div key={i} style={{ position: "absolute", left: x - 22, top: 646 - 22, width: 44, height: 44, borderRadius: 22, background: C.angle, border: "5px solid #0B0A10", boxShadow: `0 0 20px ${C.angle}`, transform: `scale(${p})` }} />;
      })}
      <div style={{ position: "absolute", left: 100, top: 700, fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "rgba(255,255,255,.85)", opacity: prog(t, 29.0, 0.3) }}>DÍA 1</div>
      <div style={{ position: "absolute", left: 100, right: 180, top: 700, textAlign: "right", fontFamily: BODY, fontWeight: 600, fontSize: 32, color: C.angle, opacity: prog(t, 30.5, 0.3) }}>DÍA 60</div>
      <Headline top={860} lines={[[{ t: "un paso a paso", at: 29.12, size: 66 }], [{ t: "de 60 días", at: 29.86, font: TRUEFATE, size: 150, color: C.yellow, big: true }]]} />
    </>
  );
};

// ================= 2 · las preguntas que responde el plan (33.75–40.65) =================
const PREGUNTAS = [
  { at: 33.64, t: "¿Qué mirar primero?" },
  { at: 34.72, t: "¿Qué resolver antes?" },
  { at: 36.04, t: "¿Qué herramientas usar?" },
  { at: 37.52, t: "¿Cómo incorporar IA sin complicarte?" },
];
const MgPreguntas: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kicker at={33.8} text="EL PLAN RESPONDE" top={330} />
      {PREGUNTAS.map((q, i) => {
        if (t < q.at - 0.05) return null;
        const p = pop(t, Math.max(q.at, 33.85), 0.5);
        return (
          <div key={i} style={{ position: "absolute", top: 450 + i * 235, left: 60, right: 140, minHeight: 200, transform: `translateX(${(1 - Math.min(1, p)) * -80}px)`, opacity: Math.min(1, p * 1.5), ...glassCard, display: "flex", alignItems: "center", gap: 30, padding: "0 40px" }}>
            <span style={{ fontFamily: TRUEFATE, fontSize: 130, lineHeight: 1, color: C.yellow, textShadow: `0 0 28px ${C.yellow}, 0 3px 10px rgba(0,0,0,.6)` }}>{i + 1}</span>
            <span style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 52, color: C.text, flex: 1, lineHeight: 1.12 }}>{q.t}</span>
          </div>
        );
      })}
    </>
  );
};

// ================= 3 · tres sellos de las herramientas (48.5–55.8), chips parciales sobre el video =================
const CHIPS_LIST: { at: number; t: string }[] = [
  { at: 49.14, t: "Desarrolladas por nuestro equipo" },
  { at: 51.28, t: "Pensadas para inmobiliarias" },
  { at: 53.56, t: "Del trabajo real con clientes" },
];
const ChipsPartial: React.FC = () => {
  const t = useT();
  const [from, to] = CHIPS;
  if (t < from - 0.05 || t > to + 0.4) return null;
  const out = prog(t, to, 0.35);
  return (
    <div style={{ position: "absolute", top: 900, left: 60, right: 140, display: "flex", flexDirection: "column", gap: 18, opacity: 1 - out }}>
      {CHIPS_LIST.map((c, i) => {
        if (t < c.at - 0.05) return null;
        const p = pop(t, c.at, 0.45);
        return (
          <div key={i} style={{ ...glassCard, padding: "20px 34px", transform: `translateX(${(1 - Math.min(1, p)) * -70}px)`, opacity: Math.min(1, p * 1.5), display: "flex", alignItems: "center", gap: 22 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" style={{ flexShrink: 0, filter: `drop-shadow(0 0 8px ${C.angle})` }}><circle cx="12" cy="12" r="10.5" fill="none" stroke={C.angle} strokeWidth="1.8" /><path d="M7 12.5 L10.5 16 L17.5 8.5" fill="none" stroke={C.angle} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 42, color: C.text }}>{c.t}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- llamado a la acción parcial (no tapa a Daniela): Comentá PLAN ----------
const CtaCard: React.FC = () => {
  const t = useT();
  const [from] = CTA;
  if (t < from - 0.05) return null;
  const p = prog(t, from, 0.4);
  const kp = pop(t, from + 0.25, 0.5);
  const pulse = 1 + 0.03 * Math.sin((t - from) * 6);
  return (
    <div style={{ position: "absolute", top: 930, left: 60, right: 140, display: "flex", justifyContent: "center", opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glassCard, padding: "26px 46px 30px", textAlign: "center" }}>
        <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 64, color: C.text, letterSpacing: -1 }}>Comentá</div>
        <div style={{ margin: "10px auto 0", display: "inline-block", padding: "14px 40px", borderRadius: 26, background: C.angle, color: "#0B0A10", fontFamily: TITLE, fontWeight: 900, fontSize: 84, letterSpacing: 3, transform: `scale(${kp * pulse})`, boxShadow: `0 0 50px ${C.angle}88` }}>PLAN</div>
        <div style={{ marginTop: 14, fontFamily: BODY, fontWeight: 600, fontSize: 38, color: "rgba(255,255,255,.92)", opacity: prog(t, from + 0.5, 0.3) }}>y te envío el enlace</div>
      </div>
    </div>
  );
};

// ---------- placa final motion graphics: oficina de fondo + foto enmarcada + waveform + credenciales ----------
const PER = 2 * (472 + 592);
const WAVE = Array.from({ length: 16 }, (_, i) => i);

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < DURATION - 0.1) return null;
  const tt = t - DURATION;
  const p = interpolate(tt, [0, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const draw = interpolate(tt, [0.2, 1.1], [PER, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 1 + 0.015 * Math.sin(tt * 4);
  const wOp = interpolate(tt, [0.5, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const txOp = interpolate(tt, [0.6, 1.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const evOp = interpolate(tt, [0.85, 1.25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: p }}>
      {/* fondo: SOLO la oficina (ladrillo + cartel, sin figura) + velo + glow celeste */}
      <AbsoluteFill style={{ background: C.bg }} />
      <AbsoluteFill><Img src={staticFile("end-office.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 55% at 50% 30%, ${C.angle}22 0%, rgba(11,10,16,0) 55%)` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,10,16,.3) 0%, rgba(11,10,16,.12) 24%, rgba(11,10,16,.5) 56%, rgba(11,10,16,.82) 100%)" }} />
      {/* foto enmarcada + anillo celeste que se dibuja */}
      <div style={{ position: "absolute", left: 320, top: 280, width: 440, height: 560, transform: `scale(${(0.9 + 0.1 * p) * pulse})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 30, overflow: "hidden", boxShadow: `0 0 60px ${C.angle}55, 0 24px 60px rgba(0,0,0,.6)` }}>
          <Img src={staticFile("end-portrait.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <svg width="480" height="600" viewBox="0 0 480 600" style={{ position: "absolute", left: -20, top: -20, filter: `drop-shadow(0 0 10px ${C.angle})` }}>
          <rect x="4" y="4" width="472" height="592" rx="38" fill="none" stroke={C.angle} strokeWidth="4" strokeDasharray={PER} strokeDashoffset={draw} strokeLinecap="round" />
        </svg>
      </div>
      {/* waveform line-art celeste */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 892, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, opacity: wOp }}>
        {WAVE.map((i) => {
          const h = 14 + 50 * Math.abs(Math.sin(tt * 5 + i * 0.6));
          return <div key={i} style={{ width: 7, height: h, borderRadius: 4, background: C.angle, boxShadow: `0 0 10px ${C.angle}99` }} />;
        })}
      </div>
      {/* nombre + credencial */}
      <div style={{ position: "absolute", top: 990, left: 50, right: 50, textAlign: "center", opacity: txOp, transform: `translateY(${(1 - txOp) * 20}px)` }}>
        <div style={{ fontFamily: TRUEFATE, fontSize: 96, color: C.text, lineHeight: 1, textShadow: "0 3px 14px rgba(0,0,0,.6)" }}>Daniela Werkalec</div>
        <div style={{ marginTop: 20, fontFamily: TITLE, fontWeight: 800, fontSize: 37, color: C.angle, letterSpacing: 0.5 }}>Marketing digital e inteligencia artificial</div>
      </div>
      {/* web (sin "Corredora inmobiliaria", pedido de Daniela) */}
      <div style={{ position: "absolute", top: 1170, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: evOp, transform: `translateY(${(1 - evOp) * 20}px)` }}>
        <div style={{ width: 120, height: 3, borderRadius: 2, background: C.angle, boxShadow: `0 0 12px ${C.angle}` }} />
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 34, color: "rgba(255,255,255,.9)", letterSpacing: 1.5 }}>www.danielawerkalec.com.ar</div>
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <CamV keys={CAM} until={DURATION} />
    <HideBurned />
    <SubsV keywords={KEYWORDS} hide={[HOOK, [R_POCO[0], R_POCO[1]], R_RECETA, G_PASO, G_PREG, R_GRATIS, CTA, [5.4, 6.05], [12.1, 12.7], [17.85, 18.6], [33.25, 33.7], [40.8, 41.2], [DURATION - 0.1, 999]]} yAt={subsAt} />
    <RemarkPhrase words={REMATE_HOOK} to={5.3} top={720} />
    <RemarkPhrase words={REMATE_POCO} to={9.95} top={720} />
    <RemarkPhrase words={REMATE_RECETA} to={25.15} top={700} />
    <RemarkPhrase words={REMATE_GRATIS} to={60.6} top={960} />
    <InfoPill from={PILL_1[0]} to={PILL_1[1]} top={1150} kicker="MASTERCLASS GRATUITA" title="10 de noviembre" />
    <InfoPill from={PILL_2[0]} to={PILL_2[1]} top={1120} kicker="ACCESO GRATIS · 60 DÍAS" title="a nuestra plataforma" />
    <InfoPill from={PILL_3[0]} to={PILL_3[1]} top={1200} kicker="MASTERCLASS GRATUITA" title="10 de noviembre" />
    <ChipsPartial />
    <FullScreen from={G_PASO[0]} to={G_PASO[1]}><div style={{ position: "absolute", inset: 0, transform: "translateY(120px)" }}><MgPaso /></div></FullScreen>
    <FullScreen from={G_PREG[0]} to={G_PREG[1]}><div style={{ position: "absolute", inset: 0, transform: "translateY(40px)" }}><MgPreguntas /></div></FullScreen>
    <CtaCard />
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
