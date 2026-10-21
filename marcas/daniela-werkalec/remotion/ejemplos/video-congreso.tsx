// Reel CONGRESO Inmobiliario Santa Fe (mesa de IA) — marca daniela-werkalec. Ángulo: vlog/personal (celeste).
// El video ya viene montado (avatar IA, transiciones y música propias): acá solo van capas encima.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { C, TITLE, BODY, TRUEFATE, REMARK_SANS, REMARK_SERIF } from "./theme";
import { DURATION } from "./words";
import { Sfx, Sounds, useT, prog } from "./lib";
import { CAM_FULL, CamKeyV, CamV, SubsV, subsY, RemarkPhrase, RWord } from "./reel";
import { FullScreen, MgHook, MgAlgoritmo, MgColegios, MgDebate, MgBalanza, MgConversa } from "./mg";

export const CTA_SECONDS = 3.4;

const CAM: CamKeyV[] = [{ at: 0, box: CAM_FULL, zoom: 1.0, fy: 40 }];

const KEYWORDS = ["discriminando", "incómoda", "algoritmo", "criterios", "colegios", "límites", "responsable", "cocir", "incómodas", "participando", "conversación"];

// ventanas donde los subtítulos se esconden (remates y tarjeta de la mesa)
const R1: [number, number] = [7.55, 9.5];
const R2: [number, number] = [83.55, 86.85];
const PANEL: [number, number] = [23.4, 33.2];
// motion graphics a pantalla completa (tapan la cámara; la voz sigue)
const FS_HOOK: [number, number] = [2.3, 4.2];
const FS_ALGO: [number, number] = [9.3, 14.45];
const FS_COLE: [number, number] = [48.75, 54.6];
const FS_DEBA: [number, number] = [57.5, 68.0];
const FS_CONV: [number, number] = [86.8, 90.85];
const FS = [FS_HOOK, FS_ALGO, FS_COLE, FS_DEBA, FS_CONV];

const SFX: Sfx[] = [
  { at: 7.55, f: "whoosh", v: 0.45 },
  { at: 8.44, f: "pop", v: 0.4 },
  { at: 23.45, f: "whoosh", v: 0.4 },
  { at: 83.55, f: "whoosh", v: 0.45 },
  ...[2.3, 9.3, 48.75, 57.5, 86.8].map((at) => ({ at, f: "whoosh" as const, v: 0.5 })),
  { at: 11.22, f: "click", v: 0.35 },
  { at: 61.08, f: "boom", v: 0.3 },
  { at: 62.28, f: "pop", v: 0.35 },
  { at: 63.56, f: "pop", v: 0.35 },
  { at: 65.06, f: "pop", v: 0.35 },
  { at: 87.76, f: "click", v: 0.35 },
  { at: 84.24, f: "pop", v: 0.45 },
  { at: DURATION, f: "whoosh", v: 0.5 },
  { at: DURATION + 0.5, f: "ding", v: 0.6 },
];

// ---------- remates (cascada multi-fuente; principal en amarillo True Fate) ----------
const REMATE_1: RWord[] = [
  { t: "Porque hay", at: 7.6, font: REMARK_SANS, size: 58, anim: "left" },
  { t: "una", at: 7.92, font: REMARK_SANS, size: 58, anim: "fade" },
  { t: "pregunta", at: 8.18, font: REMARK_SERIF, italic: true, size: 86, anim: "up" },
  { t: "incómoda", at: 8.44, big: true, font: TRUEFATE, size: 170, anim: "pop" },
];
const REMATE_2: RWord[] = [
  { t: "alrededor de", at: 83.6, font: REMARK_SANS, size: 56, anim: "left" },
  { t: "6", at: 84.24, big: true, font: TRUEFATE, size: 230, anim: "pop" },
  { t: "preguntas", at: 84.48, font: REMARK_SERIF, italic: true, size: 84, anim: "up" },
  { t: "profundamente", at: 84.92, font: REMARK_SANS, size: 56, anim: "right" },
  { t: "incómodas", at: 85.72, font: REMARK_SANS, size: 92, color: C.yellow, anim: "pop" },
];

// ---------- marca de agua "generado con IA" (arriba a la izquierda, dentro de zona segura) ----------
const Watermark: React.FC = () => (
  <div style={{ position: "absolute", top: 236, left: 56, fontFamily: BODY, fontWeight: 600, fontSize: 27, letterSpacing: 1.2, color: "rgba(255,255,255,.82)", textShadow: "0 2px 8px rgba(0,0,0,.85)" }}>
    ✦ generado con IA
  </div>
);

// ---------- tarjeta base (vidrio oscuro + borde y glow del color del ángulo) ----------
const glass: React.CSSProperties = {
  background: "rgba(11,10,16,0.78)",
  border: `2px solid ${C.angle}`,
  borderRadius: 26,
  boxShadow: `0 0 34px ${C.angle}55, 0 20px 50px rgba(0,0,0,.55)`,
  backdropFilter: "blur(6px)",
};

/** Píldora del evento (fecha / lugar), entra desde abajo y sale con fade. */
const EventPill: React.FC<{ from: number; to: number; kicker: string; title: string; top?: number }> = ({ from, to, kicker, title, top = 1300 }) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45);
  const out = prog(t, to, 0.35);
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glass, padding: "20px 38px", textAlign: "center" }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 27, letterSpacing: 3, color: C.angle }}>● {kicker}</div>
        <div style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 46, color: C.text, marginTop: 6, lineHeight: 1.1 }}>{title}</div>
      </div>
    </div>
  );
};

/** Mesa de IA: los nombres aparecen a medida que Daniela los dice. */
const PANELISTAS: { at: number; name: string; role?: string; me?: boolean }[] = [
  { at: 23.5, name: "Daniela Werkalec", me: true },
  { at: 26.18, name: "Lucciano Cecchini" },
  { at: 28.06, name: "Yael Muises" },
  { at: 29.28, name: "Guillermo Seifert" },
  { at: 31.98, name: "Mariano Galindez", role: "Modera" },
];
const PanelCard: React.FC = () => {
  const t = useT();
  const [from, to] = PANEL;
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45);
  const out = prog(t, to, 0.35);
  return (
    <div style={{ position: "absolute", top: 1065, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glass, padding: "26px 44px 22px", width: 760 }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 26, letterSpacing: 3, color: C.angle, marginBottom: 10 }}>● MESA DE INTELIGENCIA ARTIFICIAL</div>
        {PANELISTAS.map((n, i) => {
          if (t < n.at - 0.05) return null;
          const q = prog(t, n.at, 0.35);
          return (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "7px 0", borderTop: i ? "1px solid rgba(255,255,255,.1)" : "none", opacity: q, transform: `translateX(${(1 - q) * -40}px)` }}>
              {n.role ? (
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 26, color: C.angle, minWidth: 92 }}>{n.role}</span>
              ) : (
                <span style={{ minWidth: 92, display: "inline-flex", alignItems: "center" }}>
                  {n.me ? (
                    <svg width="34" height="30" viewBox="0 0 24 22" style={{ filter: `drop-shadow(0 0 6px ${C.angle})` }}><path d="M12 21s-7.5-4.6-10-9.3C.3 8.3 2.2 4 6 4c2.4 0 4 1.5 6 3.6C14 5.5 15.6 4 18 4c3.8 0 5.7 4.3 4 7.7C19.5 16.4 12 21 12 21z" fill={C.angle} /></svg>
                  ) : (
                    <span style={{ width: 12, height: 12, borderRadius: 6, background: C.angle, marginLeft: 10 }} />
                  )}
                </span>
              )}
              <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 44, color: n.me ? C.yellow : C.text }}>{n.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Zócalo institucional COCIR (nombre largo, como pidió Daniela). */
const CocirCard: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45);
  const out = prog(t, to, 0.35);
  return (
    <div style={{ position: "absolute", top: 1300, left: 60, right: 60, display: "flex", justifyContent: "center", opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glass, padding: "18px 34px", textAlign: "center" }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 25, letterSpacing: 3, color: C.angle }}>● EQUIPO DE COMUNICACIÓN</div>
        <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 54, color: C.text, marginTop: 4, lineHeight: 1 }}>COCIR</div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: "rgba(255,255,255,.88)", marginTop: 6 }}>Colegio de Corredores Inmobiliarios de Rosario</div>
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
    <SubsV keywords={KEYWORDS} hide={[R1, R2, PANEL, ...FS, [DURATION - 0.1, 999]]} yAt={subsY(CAM)} />
    <RemarkPhrase words={REMATE_1} to={9.28} top={1010} />
    <RemarkPhrase words={REMATE_2} to={86.6} top={990} />
    <EventPill from={16.38} to={21.3} kicker="VIERNES 23 DE OCTUBRE" title="Congreso Inmobiliario de Santa Fe" />
    <PanelCard />
    <CocirCard from={40.36} to={45.4} />
    <EventPill from={100.2} to={104.4} kicker="TENEMOS UNA CITA" title="Vie 23 · Puerto Norte · Rosario" />
    <MgBalanza from={68.05} to={76.5} />
    <FullScreen from={FS_HOOK[0]} to={FS_HOOK[1]}><MgHook /></FullScreen>
    <FullScreen from={FS_ALGO[0]} to={FS_ALGO[1]}><MgAlgoritmo /></FullScreen>
    <FullScreen from={FS_COLE[0]} to={FS_COLE[1]}><MgColegios /></FullScreen>
    <FullScreen from={FS_DEBA[0]} to={FS_DEBA[1]}><MgDebate /></FullScreen>
    <FullScreen from={FS_CONV[0]} to={FS_CONV[1]}><MgConversa /></FullScreen>
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
