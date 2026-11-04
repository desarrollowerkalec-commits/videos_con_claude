// Reel PUBLICIDAD "2 fotos + 2 prompts" — marca daniela-werkalec. Ángulo: PROMPTS / GUÍAS (amarillo #F4C910, globo de diálogo).
// El video ya trae música/ambiente, la demo de la publicidad (≈5–15.8 s), una transición en blanco (≈17.8 s) y su propia
// grilla de storyboard (≈31.6–37.1 s): nada de eso se tapa. Zona segura de Instagram: x 60–940, y ≤ 1500.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { C, TITLE, BODY, TRUEFATE, REMARK_SANS, REMARK_SERIF } from "./theme";
import { DURATION } from "./words";
import { Sfx, Sounds, useT, prog, pop } from "./lib";
import { CAM_FULL, CamKeyV, CamV, SubsV, RemarkPhrase, RWord } from "./reel";
import { FullScreen, Kicker, Headline } from "./mg";

export const CTA_SECONDS = 3.4;
const CAM: CamKeyV[] = [{ at: 0, box: CAM_FULL, zoom: 1.0, fy: 40 }];
const RED = "#FF5A5F";

// Subtítulos a la altura del pecho según el plano (parada / media / primer plano)
const SUBS_Y: [number, number][] = [[0, 590], [1.4, 800], [3.2, 1050], [15.6, 1100], [17.9, 660], [23.5, 720], [36.9, 740], [44.9, 900], [50.0, 640], [52.0, 1000]];
const subsAt = (t: number) => {
  let y = SUBS_Y[0][1];
  for (const [a, v] of SUBS_Y) if (t >= a) y = v;
  return y;
};
const KEYWORDS = ["prompts", "publicidad", "chatgpt", "storyboard", "cinematográfico", "google", "flow", "profesional", "equipo"];

// ventanas (s)
const G2: [number, number] = [26.2, 31.35];
const GRID: [number, number] = [31.4, 37.2]; // grilla de storyboard del propio video
const G3: [number, number] = [38.45, 41.1];
const R_RES: [number, number] = [46.4, 49.5];
const G4: [number, number] = [50.05, 53.95];
const CTA: [number, number] = [57.25, 59.6];
const HOOK: [number, number] = [0.0, 5.15];
const FLASH: [number, number] = [17.5, 18.3];

const SFX: Sfx[] = [
  { at: 0.0, f: "whoosh", v: 0.35 }, { at: 1.9, f: "pop", v: 0.35 }, { at: 3.84, f: "pop", v: 0.3 },
  { at: G2[0], f: "whoosh", v: 0.45 }, { at: 27.48, f: "pop", v: 0.35 }, { at: 29.78, f: "click", v: 0.3 },
  { at: G3[0], f: "whoosh", v: 0.45 }, { at: 39.0, f: "pop", v: 0.3 },
  { at: 47.62, f: "boom", v: 0.35 },
  { at: G4[0], f: "whoosh", v: 0.45 }, { at: 51.06, f: "click", v: 0.3 }, { at: 52.18, f: "click", v: 0.3 }, { at: 53.36, f: "click", v: 0.3 },
  { at: CTA[0], f: "pop", v: 0.4 },
  { at: DURATION, f: "whoosh", v: 0.5 }, { at: DURATION + 0.5, f: "ding", v: 0.6 },
];

// ---------- remates ----------
const REMATE_HOOK: RWord[] = [
  { t: "¿Dos fotos", at: 0.0, font: REMARK_SANS, size: 74, anim: "left" },
  { t: "y", at: 1.38, font: REMARK_SERIF, italic: true, size: 60, anim: "fade" },
  { t: "dos prompts", at: 1.62, big: true, font: TRUEFATE, size: 150, anim: "pop" },
  { t: "para crear una", at: 2.36, font: REMARK_SANS, size: 56, anim: "up" },
  { t: "publicidad", at: 3.84, font: REMARK_SERIF, italic: true, size: 96, anim: "up" },
  { t: "como esta?", at: 4.38, font: REMARK_SANS, size: 66, anim: "right" },
];
const REMATE_RES: RWord[] = [
  { t: "mirá el resultado", at: 46.46, font: REMARK_SANS, size: 56, anim: "left" },
  { t: "10 segundos", at: 47.62, big: true, font: TRUEFATE, size: 150, anim: "pop" },
  { t: "de publicidad", at: 48.22, font: REMARK_SERIF, italic: true, size: 78, anim: "up" },
  { t: "profesional", at: 48.94, font: REMARK_SANS, size: 88, anim: "right" },
];

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", top: 262, left: 56, fontFamily: BODY, fontWeight: 600, fontSize: 27, letterSpacing: 1.2, color: "rgba(255,255,255,.82)", textShadow: "0 2px 8px rgba(0,0,0,.85)" }}>
    ✦ generado con IA
  </div>
);

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

// ================= 2 · Storyboard: 1 imagen por cada segundo (26.2–31.35) =================
const MgStoryboard: React.FC = () => {
  const t = useT();
  const cells = Array.from({ length: 10 }, (_, i) => i);
  const chip = (at: number, label: string) => (
    <div style={{ opacity: prog(t, at, 0.3), transform: `scale(${0.7 + 0.3 * pop(t, at, 0.4)})`, padding: "12px 26px", borderRadius: 40, border: `2px solid ${C.angle}`, background: `${C.angle}22`, fontFamily: TITLE, fontWeight: 800, fontSize: 30, color: C.text }}>{label}</div>
  );
  return (
    <>
      <Kicker at={26.25} text="STORYBOARD CINEMATOGRÁFICO" top={330} />
      <div style={{ position: "absolute", left: 60, top: 440, width: 880, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
        {cells.map((i) => {
          const at = 27.2 + i * 0.3;
          const p = pop(t, at, 0.4);
          const cur = t >= at && t < at + 0.3;
          return (
            <div key={i} style={{ height: 230, ...glassCard, borderRadius: 18, opacity: Math.min(1, p * 1.4), transform: `scale(${0.6 + 0.4 * p})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "16px 8px 12px", boxShadow: cur ? `0 0 40px ${C.angle}, 0 0 0 4px ${C.angle}` : glassCard.boxShadow }}>
              <Ico kind="foto" size={70} />
              <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 40, color: C.angle }}>{i + 1}</div>
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,.8)" }}>{i} - {i + 1} s</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 60, right: 140, top: 1000, display: "flex", justifyContent: "center", gap: 16 }}>
        {chip(29.78, "PLANO GENERAL")}{chip(30.2, "MEDIO")}{chip(30.6, "DETALLE")}
      </div>
      <Headline top={1130} lines={[[{ t: "1 imagen", at: 27.18, font: TRUEFATE, size: 130, color: C.yellow, big: true }], [{ t: "por cada segundo", at: 28.12, size: 62 }]]} />
    </>
  );
};

// ================= 3 · PASO 2 — Google Flow (38.45–41.1, corto: el resto se ve en el video) =================
const MgPaso2: React.FC = () => {
  const t = useT();
  const a = pop(t, 38.55, 0.5);
  const arrow = prog(t, 38.8, 0.4);
  const b = pop(t, 39.0, 0.5);
  return (
    <>
      <Kicker at={38.5} text="PASO 2 · GOOGLE FLOW" top={330} />
      <div style={{ position: "absolute", left: 70, top: 440, width: 330, height: 330, transform: `scale(${a})`, ...glassCard, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: 22 }}>
        {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ borderRadius: 8, background: `${C.angle}${i % 2 ? "55" : "99"}` }} />)}
      </div>
      <svg width="1080" height="1920" style={{ position: "absolute", left: 0, top: 0, filter: `drop-shadow(0 0 8px ${C.angle})` }}>
        <line x1="425" y1="605" x2={425 + 130 * arrow} y2="605" stroke={C.angle} strokeWidth="6" strokeLinecap="round" />
        {arrow > 0.9 && <path d="M545 585 L572 605 L545 625" fill="none" stroke={C.angle} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      <div style={{ position: "absolute", left: 600, top: 440, width: 340, height: 330, transform: `scale(${b})`, ...glassCard, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <Ico kind="flow" size={130} />
        <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 48, color: C.text }}>Google Flow</div>
      </div>
    </>
  );
};

// ================= 4 · Dos fotos, dos herramientas, dos prompts… (50.05–56.95) =================
const MgDos: React.FC = () => {
  const t = useT();
  const rows: { at: number; label: string; kind: "foto" | "tools" | "prompt" }[] = [
    { at: 51.06, label: "FOTOS", kind: "foto" },
    { at: 52.02, label: "HERRAMIENTAS", kind: "tools" },
    { at: 53.18, label: "PROMPTS", kind: "prompt" },
  ];
  return (
    <>
      <Kicker at={50.1} text="PARTIENDO DE SOLAMENTE" top={330} />
      {rows.map((r, i) => {
        const p = pop(t, r.at, 0.5);
        return (
          <div key={r.label} style={{ position: "absolute", left: 60, right: 140, top: 430 + i * 215, height: 185, transform: `translateX(${(1 - Math.min(1, p)) * -80}px)`, opacity: Math.min(1, p * 1.5), ...glassCard, display: "flex", alignItems: "center", gap: 30, padding: "0 40px" }}>
            <span style={{ fontFamily: TRUEFATE, fontSize: 150, lineHeight: 1, color: C.yellow, textShadow: `0 0 30px ${C.yellow}, 0 3px 10px rgba(0,0,0,.6)` }}>2</span>
            <span style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 56, color: C.text, flex: 1 }}>{r.label}</span>
            <Ico kind={r.kind} size={90} />
          </div>
        );
      })}
    </>
  );
};

// ---------- llamado a la acción parcial (no tapa a Daniela): Comentá STORYBOARD ----------
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
        <div style={{ margin: "10px auto 0", display: "inline-block", padding: "14px 40px", borderRadius: 26, background: C.angle, color: "#0B0A10", fontFamily: TITLE, fontWeight: 900, fontSize: 84, letterSpacing: 3, transform: `scale(${kp * pulse})`, boxShadow: `0 0 50px ${C.angle}88` }}>STORYBOARD</div>
        <div style={{ marginTop: 14, fontFamily: BODY, fontWeight: 600, fontSize: 38, color: "rgba(255,255,255,.92)", opacity: prog(t, from + 0.5, 0.3) }}>y te comparto los prompts</div>
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
    <SubsV keywords={KEYWORDS} hide={[HOOK, [5.15, 15.7], FLASH, G2, GRID, G3, R_RES, G4, CTA, [DURATION - 0.1, 999]]} yAt={subsAt} />
    <RemarkPhrase words={REMATE_HOOK} to={5.0} top={980} />
    <RemarkPhrase words={REMATE_RES} to={49.3} top={760} />
        <FullScreen from={G2[0]} to={G2[1]}><div style={{ position: "absolute", inset: 0, transform: "translateY(120px)" }}><MgStoryboard /></div></FullScreen>
    <FullScreen from={G3[0]} to={G3[1]}><div style={{ position: "absolute", inset: 0, transform: "translateY(300px)" }}><MgPaso2 /></div></FullScreen>
    <FullScreen from={G4[0]} to={G4[1]}><div style={{ position: "absolute", inset: 0, transform: "translateY(200px)" }}><MgDos /></div></FullScreen>
    <CtaCard />
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
