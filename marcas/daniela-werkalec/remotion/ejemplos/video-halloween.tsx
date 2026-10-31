// Reel HALLOWEEN "la escoba ya fue" — marca daniela-werkalec. Ángulo: OPINIÓN (fucsia #CB6CE6).
// El video ya viene montado (avatar IA disfrazada de bruja, música/ambiente y transiciones de calabaza propias,
// ≈9.2–11.1 s y ≈19.3–20.6 s): acá van subtítulos, remate, 2 gráficos a pantalla completa fuera de esas
// transiciones y la placa de cierre. Zona segura de Instagram: x 60–940, y ≤ 1500.
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

// Subtítulos a la altura del pecho según el plano: parada (cuerpo entero) → 650 · sentada (plano medio) → 880
const subsAt = (t: number) => (t >= 9.3 && t < 20.6 ? 880 : 650);

const KEYWORDS = ["brujería", "escoba", "agentes", "pócima", "hechizos", "magia", "halloween"];

// ventanas (s)
const G_NIGHT: [number, number] = [2.2, 4.55];
const R_ESCOBA: [number, number] = [6.5, 9.05];
const G_AGENTES: [number, number] = [13.6, 19.25];
const PUMPKIN_2: [number, number] = [19.3, 20.3]; // transición de calabaza propia del video

const SFX: Sfx[] = [
  { at: G_NIGHT[0], f: "whoosh", v: 0.5 },
  { at: 3.3, f: "pop", v: 0.35 },
  { at: 4.04, f: "pop", v: 0.4 },
  { at: 7.76, f: "pop", v: 0.3 },
  { at: 8.32, f: "boom", v: 0.3 },
  { at: G_AGENTES[0], f: "whoosh", v: 0.5 },
  { at: 14.24, f: "click", v: 0.35 },
  { at: 14.86, f: "click", v: 0.35 },
  { at: 16.32, f: "click", v: 0.35 },
  { at: 17.76, f: "pop", v: 0.35 },
  { at: 18.62, f: "boom", v: 0.3 },
  { at: DURATION, f: "whoosh", v: 0.5 },
  { at: DURATION + 0.5, f: "ding", v: 0.6 },
];

// ---------- remate: "la escoba ya fue" ----------
const REMATE: RWord[] = [
  { t: "pero hoy la", at: 6.54, font: REMARK_SANS, size: 58, anim: "left" },
  { t: "escoba", at: 7.76, font: REMARK_SERIF, italic: true, size: 104, anim: "up" },
  { t: "ya fue", at: 8.04, big: true, font: TRUEFATE, size: 200, anim: "pop" },
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

// ================= 1 · WhatsApp de madrugada: atendía clientes mientras dormía (2.2–4.55) =================
const MgNoche: React.FC = () => {
  const t = useT();
  const moon = pop(t, 2.25, 0.5);
  const phone = pop(t, 2.3, 0.45);
  const typing = t > 2.95 && t < 3.3;
  const dots = [0, 1, 2].map((i) => 0.35 + 0.65 * Math.max(0, Math.sin((t - 2.95) * 12 - i * 1.2)));
  const bub = (at: number, side: "l" | "r", text: string) => {
    if (t < at - 0.03) return null;
    const p = pop(t, at, 0.4);
    const left = side === "l";
    return (
      <div style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", transform: `scale(${p})`, transformOrigin: left ? "0% 100%" : "100% 100%" }}>
        <div style={{ maxWidth: 440, padding: "16px 22px", borderRadius: 24, borderBottomLeftRadius: left ? 6 : 24, borderBottomRightRadius: left ? 24 : 6, background: left ? "rgba(255,255,255,.1)" : C.angle, border: `2px solid ${C.angle}`, fontFamily: BODY, fontWeight: 600, fontSize: 32, lineHeight: 1.2, color: left ? C.text : "#0B0A10", boxShadow: `0 0 20px ${C.angle}44` }}>
          {text}
          {!left && <span style={{ marginLeft: 10, fontSize: 24 }}>✓✓</span>}
        </div>
      </div>
    );
  };
  return (
    <>
      <Kicker at={2.25} text="3:12 AM" top={300} />
      {/* luna line-art */}
      <svg width="170" height="170" viewBox="0 0 24 24" style={{ position: "absolute", left: 455 - 85, top: 350, transform: `scale(${moon})`, filter: `drop-shadow(0 0 12px ${C.angle})` }}>
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z" fill="none" stroke={C.angle} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M17 4.5v2M16 5.5h2M21 9v1.4M20.3 9.7h1.4" stroke={C.angle} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {/* teléfono con el chat */}
      <div style={{ position: "absolute", left: 130, top: 560, width: 740, transform: `scale(${phone})`, transformOrigin: "50% 0%", borderRadius: 34, border: `3px solid ${C.angle}`, background: "rgba(11,10,16,.7)", boxShadow: `0 0 34px ${C.angle}55`, padding: "22px 26px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.12)", marginBottom: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, border: `2px solid ${C.angle}` }} />
          <div style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 32, color: C.text }}>Cliente nuevo</div>
          <div style={{ marginLeft: "auto", fontFamily: BODY, fontWeight: 600, fontSize: 24, color: C.angle }}>en línea</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 250 }}>
          {bub(2.4, "l", "Hola, ¿sigue disponible el depto de Pichincha?")}
          {typing && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingRight: 14 }}>
              {dots.map((o, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: C.angle, opacity: o }} />)}
            </div>
          )}
          {bub(3.3, "r", "¡Hola! Sí. ¿Lo ves mañana a las 10?")}
        </div>
      </div>
      <Headline top={1150} lines={[[{ t: "mi WhatsApp", at: 2.22, size: 62 }, { t: "atendía clientes", at: 2.74, size: 62 }], [{ t: "mientras", at: 3.72, font: REMARK_SERIF, italic: true, weight: 400, size: 64 }, { t: "dormía", at: 4.04, font: TRUEFATE, size: 150, color: C.yellow, big: true }]]} />
    </>
  );
};

// ================= 2 · Agentes de IA: responden, califican, hacen seguimiento — sin una gota de pócima (13.6–19.25) =================
const TAREAS = [
  { at: 14.24, t: "Responden" },
  { at: 14.86, t: "Califican clientes" },
  { at: 16.32, t: "Hacen seguimiento" },
];
const MgAgentes: React.FC = () => {
  const t = useT();
  const ck = 40;
  const fl = pop(t, 17.76, 0.5);
  const x = prog(t, 18.62, 0.3);
  const strike = prog(t, 18.95, 0.25);
  return (
    <>
      <Kicker at={13.65} text="AGENTES DE INTELIGENCIA ARTIFICIAL" top={290} />
      {TAREAS.map((r, i) => {
        if (t < r.at - 0.05) return null;
        const p = prog(t, r.at, 0.4);
        return (
          <div key={i} style={{ position: "absolute", top: 400 + i * 165, left: 80, right: 140, opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
            <div style={{ ...glassCard, display: "flex", alignItems: "center", gap: 26, padding: "24px 34px" }}>
              <svg width="62" height="62" viewBox="0 0 24 24" style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${C.angle})` }}>
                <circle cx="12" cy="12" r="10.5" fill="none" stroke={C.angle} strokeWidth="1.8" />
                <path d="M7 12.5 L10.5 16 L17.5 8.5" fill="none" stroke={C.angle} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={ck} strokeDashoffset={ck * (1 - prog(t, r.at + 0.15, 0.35))} />
              </svg>
              <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 54, color: C.text }}>{r.t}</span>
            </div>
          </div>
        );
      })}
      {/* la pócima (frasco line-art) se tacha */}
      <div style={{ position: "absolute", left: 500 - 95, top: 925, width: 190, height: 190, transform: `scale(${fl})` }}>
        <svg width="190" height="190" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 10px ${x > 0 ? RED : C.angle})` }}>
          <path d="M9.5 3h5M10 3v5.2L5 17.2A2.6 2.6 0 0 0 7.3 21h9.4a2.6 2.6 0 0 0 2.3-3.8L14 8.2V3" fill="none" stroke={x > 0 ? RED : C.angle} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M7.2 15.5h9.6" stroke={x > 0 ? RED : C.angle} strokeWidth="1.1" strokeDasharray="1.6 1.6" />
        </svg>
        {x > 0 && (
          <svg width="190" height="190" viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0, transform: `scale(${pop(t, 18.62, 0.35)})` }}>
            <path d="M3.5 3.5L20.5 20.5M20.5 3.5L3.5 20.5" stroke={RED} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <Headline top={1160} lines={[[{ t: "sin una gota de", at: 17.76, size: 56 }], [{ t: "pócima", at: 18.62, font: TRUEFATE, size: 130, color: C.yellow, big: true }]]} />
      {/* tachado sobre "pócima" */}
      <div style={{ position: "absolute", top: 1275, left: 500 - 190, width: 380 * strike, height: 8, borderRadius: 4, background: RED, boxShadow: `0 0 14px ${RED}` }} />
    </>
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
        <div style={{ marginTop: 18, fontFamily: TITLE, fontWeight: 800, fontSize: 46, color: C.angle, letterSpacing: 1 }}>Corredora inmobiliaria</div>
      </div>
      {/* segunda credencial + web (sin datos del congreso) */}
      <div style={{ position: "absolute", top: 1200, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: evOp, transform: `translateY(${(1 - evOp) * 20}px)` }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40, color: C.text, textAlign: "center", lineHeight: 1.25, textShadow: "0 2px 10px rgba(0,0,0,.7)" }}>Marketing digital e inteligencia artificial</div>
        <div style={{ width: 120, height: 3, borderRadius: 2, background: C.angle, boxShadow: `0 0 12px ${C.angle}` }} />
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "rgba(255,255,255,.85)", letterSpacing: 1.5 }}>www.danielawerkalec.com.ar</div>
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <CamV keys={CAM} until={DURATION} />
    <SubsV keywords={KEYWORDS} hide={[G_NIGHT, R_ESCOBA, G_AGENTES, PUMPKIN_2, [DURATION - 0.1, 999]]} yAt={subsAt} />
    <RemarkPhrase words={REMATE} to={9.0} top={760} />
    <FullScreen from={G_NIGHT[0]} to={G_NIGHT[1]}><MgNoche /></FullScreen>
    <FullScreen from={G_AGENTES[0]} to={G_AGENTES[1]}><MgAgentes /></FullScreen>
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
