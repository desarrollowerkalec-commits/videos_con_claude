// Reel "Instagram prueba videos de 90 minutos" — marca daniela-werkalec. Ángulo: NOTICIAS / novedades (rojo #FF3131).
// El video ya viene montado (avatar IA, música y motions propios): acá van subtítulos, remate, gráficos a
// pantalla completa SOLO en los huecos sin gráficos propios, encuesta final y placa de cierre. Zona segura: x 60–940, y ≤ 1500.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { C, TITLE, BODY, TRUEFATE, REMARK_SANS, REMARK_SERIF } from "./theme";
import { DURATION } from "./words";
import { Sfx, Sounds, useT, prog, pop } from "./lib";
import { CAM_FULL, CamKeyV, CamV, SubsV, RemarkPhrase, RWord } from "./reel";
import { FullScreen, Kicker, Headline } from "./mg";

export const CTA_SECONDS = 3.4;
const CAM: CamKeyV[] = [{ at: 0, box: CAM_FULL, zoom: 1.0, fy: 40 }];
const subsAt = () => 1235; // un poco más abajo que 1180: los motions propios del video viven en y≈840–1100

const KEYWORDS = ["youtube", "horizontales", "90", "atención", "tiempo", "viral", "referente", "confianza", "oportunidad", "visualización"];

// ventanas (s) — elegidas donde el video NO tiene gráficos propios
const FS_ROTA: [number, number] = [7.55, 12.0];
const FS_EMBU: [number, number] = [65.3, 70.6];
const FS_YTUB: [number, number] = [79.3, 86.6];
const R_VIRAL: [number, number] = [55.35, 61.4];
const POLL: [number, number] = [116.2, 122.25];

const SFX: Sfx[] = [
  ...[FS_ROTA[0], FS_EMBU[0], FS_YTUB[0]].map((at) => ({ at, f: "whoosh" as const, v: 0.5 })),
  { at: 7.66, f: "click", v: 0.35 },
  { at: 8.88, f: "pop", v: 0.4 },
  { at: 56.06, f: "pop", v: 0.35 },
  { at: 60.58, f: "pop", v: 0.45 },
  { at: 67.34, f: "pop", v: 0.35 },
  { at: 69.98, f: "pop", v: 0.35 },
  { at: 81.78, f: "click", v: 0.3 },
  { at: 82.62, f: "click", v: 0.3 },
  { at: 83.62, f: "click", v: 0.3 },
  { at: 84.8, f: "boom", v: 0.25 },
  { at: 116.26, f: "whoosh", v: 0.4 },
  { at: DURATION, f: "whoosh", v: 0.5 },
  { at: DURATION + 0.5, f: "ding", v: 0.6 },
];

// ---------- remate: viral → referente ----------
const REMATE: RWord[] = [
  { t: "Un reel", at: 55.42, font: REMARK_SANS, size: 58, anim: "left" },
  { t: "viral", at: 56.06, font: REMARK_SERIF, italic: true, size: 96, anim: "up" },
  { t: "pero una clase", at: 56.82, font: REMARK_SANS, size: 54, anim: "right" },
  { t: "te convierte en", at: 59.44, font: REMARK_SANS, size: 50, anim: "fade" },
  { t: "referente", at: 60.58, big: true, font: TRUEFATE, size: 150, anim: "pop" },
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

// ================= 1 · el celular gira: de vertical a HORIZONTAL, hasta 90 minutos (7.55–12.0) =================
const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
const MgRota: React.FC = () => {
  const t = useT();
  const rot = prog(t, 7.66, 0.8);
  const secs = interpolate(t, [7.9, 9.36], [15, 5400], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => x * x });
  const bar = interpolate(t, [7.9, 9.36], [0.03, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ph = pop(t, 7.6, 0.45);
  const W = 300, H = 540, cx = 500, cy = 740;
  return (
    <>
      <Kicker at={7.6} text="INSTAGRAM ESTÁ PROBANDO" />
      <div style={{ position: "absolute", left: cx - W / 2, top: cy - H / 2, width: W, height: H, transform: `scale(${ph * (1 + 0.12 * rot)}) rotate(${-90 * rot}deg)`, borderRadius: 40, border: `4px solid ${C.angle}`, boxShadow: `0 0 34px ${C.angle}77`, background: "rgba(255,255,255,0.03)" }}>
        <div style={{ position: "absolute", left: W / 2 - 18, top: 14, width: 36, height: 8, borderRadius: 4, background: `${C.angle}99` }} />
        {/* contenido: antes de girar, un reel (play); después, video horizontal con contador hasta 90:00 */}
        <div style={{ position: "absolute", left: (W - H) / 2, top: (H - W) / 2, width: H, height: W, transform: `rotate(${90 * rot}deg)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <svg width="90" height="90" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 8px ${C.angle})` }}>
            <circle cx="12" cy="12" r="10.5" fill="none" stroke={C.angle} strokeWidth="1.6" />
            <path d="M10 8 L16 12 L10 16 Z" fill={C.angle} />
          </svg>
          <div style={{ width: 420, height: 8, borderRadius: 4, background: "rgba(255,255,255,.15)", opacity: rot }}>
            <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 4, background: C.angle, boxShadow: `0 0 10px ${C.angle}` }} />
          </div>
          <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 54, color: C.text, opacity: rot, letterSpacing: 1 }}>{fmt(secs)}</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1030, left: 60, right: 140, textAlign: "center", opacity: prog(t, 8.0, 0.35) }}>
        <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 34, color: C.text, padding: "8px 22px", borderRadius: 30, border: `2px solid ${C.angle}88` }}>9:16 → 16:9</span>
      </div>
      <Headline top={1150} lines={[[{ t: "videos horizontales", at: 7.66, size: 62 }], [{ t: "de hasta", at: 8.66, font: REMARK_SERIF, italic: true, weight: 400, size: 58 }, { t: "90 minutos", at: 8.88, font: TRUEFATE, size: 118, color: C.yellow, big: true }]]} />
    </>
  );
};

// ================= 2 · embudo: cortos para atraer, largos para mostrar lo que sabés (65.3–70.6) =================
const MgEmbudo: React.FC = () => {
  const t = useT();
  const d1 = prog(t, 65.4, 0.6), d2 = prog(t, 65.7, 0.6);
  const st = (at: number) => ({ opacity: prog(t, at, 0.35), transform: `translateY(${(1 - prog(t, at, 0.35)) * 20}px)` });
  const dots = Array.from({ length: 9 }, (_, i) => i);
  return (
    <>
      <Kicker at={65.3} text="LA ESTRATEGIA" />
      <svg width="1080" height="1920" style={{ position: "absolute", left: 0, top: 0, filter: `drop-shadow(0 0 9px ${C.angle})` }}>
        <path d="M110 430 H890 L790 650 H210 Z" fill={`${C.angle}14`} stroke={C.angle} strokeWidth="4" strokeLinejoin="round" strokeDasharray="2000" strokeDashoffset={2000 * (1 - d1)} />
        <path d="M230 690 H770 L670 930 H330 Z" fill={`${C.angle}22`} stroke={C.angle} strokeWidth="4" strokeLinejoin="round" strokeDasharray="1800" strokeDashoffset={1800 * (1 - d2)} />
        {/* personas (puntos) que bajan por el embudo */}
        {dots.map((i) => {
          const q = ((t * 0.45 + i / dots.length) % 1 + 1) % 1;
          const y = 400 + q * 600;
          const spread = interpolate(y, [400, 1000], [330, 60]);
          const x = 500 + Math.sin(i * 2.3) * spread;
          return <circle key={i} cx={x} cy={y} r={7} fill={C.text} opacity={0.6 * Math.sin(q * Math.PI) * d1} />;
        })}
      </svg>
      <div style={{ position: "absolute", top: 470, left: 60, right: 140, textAlign: "center", ...st(67.34) }}>
        <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 58, color: C.text, letterSpacing: 1 }}>VIDEOS CORTOS</div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 38, color: "rgba(255,255,255,.92)", marginTop: 4 }}><span style={{ color: C.angle }}>→</span> atraer personas</div>
      </div>
      <div style={{ position: "absolute", top: 730, left: 60, right: 140, textAlign: "center", ...st(69.74) }}>
        <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 52, color: C.text, letterSpacing: 1 }}>VIDEOS LARGOS</div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 36, color: "rgba(255,255,255,.92)", marginTop: 4 }}><span style={{ color: C.angle }}>→</span> mostrar lo que sabés</div>
      </div>
    </>
  );
};

// ================= 3 · hasta ahora: mandarla a YouTube = otro canal, otros seguidores… (79.3–86.6) =================
const COSTOS = [
  { at: 81.78, t: "otro canal" },
  { at: 82.62, t: "otros seguidores" },
  { at: 83.62, t: "otro algoritmo" },
  { at: 84.8, t: "otra plataforma para alimentar" },
];
const MgYoutube: React.FC = () => {
  const t = useT();
  const ig = pop(t, 79.4, 0.45), yt = pop(t, 79.7, 0.45);
  const arrow = prog(t, 80.46, 0.5);
  const shake = t > 84.8 && t < 85.4 ? Math.sin(t * 60) * 4 : 0;
  return (
    <>
      <Kicker at={79.3} text="HASTA AHORA" />
      {/* Instagram */}
      <div style={{ position: "absolute", left: 160, top: 430, width: 190, height: 190, transform: `scale(${ig})` }}>
        <svg width="190" height="190" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 10px ${C.angle})` }}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke={C.angle} strokeWidth="1.4" />
          <circle cx="12" cy="12" r="4.4" fill="none" stroke={C.angle} strokeWidth="1.4" />
          <circle cx="17.4" cy="6.6" r="1" fill={C.angle} />
        </svg>
        <div style={{ textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 32, color: C.text, marginTop: 6 }}>Instagram</div>
      </div>
      {/* flecha con la audiencia yéndose */}
      <svg width="1080" height="1920" style={{ position: "absolute", left: 0, top: 0, filter: `drop-shadow(0 0 6px ${C.angle})` }}>
        <line x1="380" y1="525" x2={380 + 230 * arrow} y2="525" stroke={C.angle} strokeWidth="4" strokeDasharray="14 10" strokeDashoffset={-t * 60} />
        {arrow > 0.95 && <path d="M600 510 L624 525 L600 540" fill="none" stroke={C.angle} strokeWidth="4" strokeLinecap="round" />}
        {[0, 1, 2].map((i) => {
          const q = ((t * 0.9 + i / 3) % 1 + 1) % 1;
          return arrow > 0.5 ? <circle key={i} cx={390 + q * 220} cy={500} r={8} fill={C.text} opacity={Math.sin(q * Math.PI)} /> : null;
        })}
      </svg>
      {/* YouTube */}
      <div style={{ position: "absolute", left: 650, top: 430, width: 190, height: 190, transform: `scale(${yt})` }}>
        <svg width="190" height="190" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 10px ${C.angle})` }}>
          <rect x="1.5" y="5" width="21" height="14" rx="4" fill="none" stroke={C.angle} strokeWidth="1.4" />
          <path d="M10 9 L15.5 12 L10 15 Z" fill={C.angle} />
        </svg>
        <div style={{ textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 32, color: C.text, marginTop: 6 }}>YouTube</div>
      </div>
      {/* lo que cuesta: se apila */}
      <div style={{ position: "absolute", top: 720, left: 60, right: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, transform: `translateX(${shake}px)` }}>
        {COSTOS.map((c, i) => {
          if (t < c.at - 0.05) return null;
          const p = pop(t, c.at, 0.4);
          return (
            <div key={i} style={{ transform: `scale(${p})`, padding: "14px 30px", borderRadius: 40, background: `${C.angle}26`, border: `2px solid ${C.angle}`, boxShadow: `0 0 18px ${C.angle}55`, fontFamily: TITLE, fontWeight: 800, fontSize: 42, color: C.text }}>
              <span style={{ color: C.angle }}>+ </span>{c.t}
            </div>
          );
        })}
      </div>
    </>
  );
};

// ================= 4 · (parcial) encuesta final: ¿mirarías una hora dentro de Instagram? (116.2–122.25) =================
const glassCard: React.CSSProperties = { background: "rgba(11,10,16,0.82)", border: `2px solid ${C.angle}`, borderRadius: 28, boxShadow: `0 0 34px ${C.angle}55, 0 20px 50px rgba(0,0,0,.55)` };
const Poll: React.FC = () => {
  const t = useT();
  const [from, to] = POLL;
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45), out = prog(t, to, 0.35);
  const btn = (at: number, label: string, solid: boolean) => {
    const q = pop(t, at, 0.4);
    const pulse = 1 + 0.03 * Math.sin((t - at) * 6);
    return (
      <div style={{ transform: `scale(${q * pulse})`, padding: "16px 28px", borderRadius: 40, background: solid ? C.angle : "transparent", border: `3px solid ${C.angle}`, fontFamily: TITLE, fontWeight: 900, fontSize: 38, color: solid ? "#0B0A10" : C.text, boxShadow: solid ? `0 0 22px ${C.angle}` : "none" }}>{label}</div>
    );
  };
  return (
    <div style={{ position: "absolute", top: 1070, left: 60, right: 140, opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ ...glassCard, padding: "26px 30px 28px", textAlign: "center" }}>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 26, letterSpacing: 3, color: C.angle }}>● QUIERO SABER QUÉ PENSÁS</div>
        <div style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 44, color: C.text, lineHeight: 1.15, marginTop: 12, opacity: prog(t, 118.78, 0.35) }}>¿Mirarías una conferencia de 1 hora dentro de Instagram?</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 22 }}>
          {btn(120.2, "SÍ", true)}
          {btn(120.5, "NO, sigo scrolleando", false)}
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: "rgba(255,255,255,.85)", marginTop: 18, opacity: prog(t, 121.0, 0.35) }}>Contestame en comentarios ↓</div>
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
    <SubsV keywords={KEYWORDS} hide={[FS_ROTA, FS_EMBU, FS_YTUB, R_VIRAL, POLL, [DURATION - 0.1, 999]]} yAt={subsAt} />
    <RemarkPhrase words={REMATE} to={61.15} top={1000} />
    <Poll />
    <FullScreen from={FS_ROTA[0]} to={FS_ROTA[1]}><MgRota /></FullScreen>
    <FullScreen from={FS_EMBU[0]} to={FS_EMBU[1]}><MgEmbudo /></FullScreen>
    <FullScreen from={FS_YTUB[0]} to={FS_YTUB[1]}><MgYoutube /></FullScreen>
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
