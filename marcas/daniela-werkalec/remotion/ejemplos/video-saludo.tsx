// Reel SALUDO Día del Martillero — marca daniela-werkalec. Ángulo: saludo/personal (celeste).
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { C, TITLE, BODY, TRUEFATE } from "./theme";
import { DURATION } from "./words";
import { Background, Sfx, Sounds } from "./lib";
import { CAM_FULL, CamKeyV, CamV, NeuralBgV, SubsV, subsY } from "./reel";

export const CTA_SECONDS = 3.2;

const CAM: CamKeyV[] = [
  { at: 0, box: CAM_FULL, zoom: 1.0, fy: 40 },
  { at: 2.6, box: CAM_FULL, zoom: 1.08, fy: 40 },
];

const KEYWORDS = ["martillero", "especial", "excelente"];

const SFX: Sfx[] = [
  { at: 0.1, f: "whoosh", v: 0.5 },
  { at: DURATION, f: "whoosh" }, { at: DURATION + 0.4, f: "ding" },
];

// marca de agua "generado con IA" (persistente, discreta)
const Watermark: React.FC = () => (
  <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 28, letterSpacing: 1.5, color: "rgba(255,255,255,.7)", textShadow: "0 2px 8px rgba(0,0,0,.75)" }}>
    ✦ generado con IA
  </div>
);

// placa final motion-graphics: foto enmarcada con anillo celeste + waveform + nombre
const PER = 2 * (472 + 592); // perímetro aprox del anillo
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
  return (
    <AbsoluteFill style={{ opacity: p }}>
      {/* backdrop: SOLO la oficina (bokeh cálido, sin figura) + velo oscuro + glow celeste de marca */}
      <AbsoluteFill style={{ background: C.bg }} />
      <AbsoluteFill><Img src={staticFile("end-office.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 55% at 50% 30%, ${C.angle}22 0%, rgba(11,10,16,0) 55%)` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,10,16,.28) 0%, rgba(11,10,16,.08) 26%, rgba(11,10,16,.4) 66%, rgba(11,10,16,.72) 100%)" }} />
      {/* foto enmarcada + anillo celeste que se dibuja */}
      <div style={{ position: "absolute", left: 320, top: 300, width: 440, height: 560, transform: `scale(${(0.9 + 0.1 * p) * pulse})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 30, overflow: "hidden", boxShadow: `0 0 60px ${C.angle}55, 0 24px 60px rgba(0,0,0,.6)` }}>
          <Img src={staticFile("end-portrait.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <svg width="480" height="600" viewBox="0 0 480 600" style={{ position: "absolute", left: -20, top: -20, filter: `drop-shadow(0 0 10px ${C.angle})` }}>
          <rect x="4" y="4" width="472" height="592" rx="38" fill="none" stroke={C.angle} strokeWidth="4" strokeDasharray={PER} strokeDashoffset={draw} strokeLinecap="round" />
        </svg>
      </div>
      {/* waveform line-art celeste */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 918, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, opacity: wOp }}>
        {WAVE.map((i) => {
          const h = 14 + 54 * Math.abs(Math.sin(tt * 5 + i * 0.6));
          return <div key={i} style={{ width: 7, height: h, borderRadius: 4, background: C.angle, boxShadow: `0 0 10px ${C.angle}99` }} />;
        })}
      </div>
      {/* nombre + credenciales */}
      <div style={{ position: "absolute", top: 1030, left: 50, right: 50, textAlign: "center", opacity: txOp, transform: `translateY(${(1 - txOp) * 20}px)` }}>
        <div style={{ fontFamily: TRUEFATE, fontSize: 98, color: C.text, lineHeight: 1, textShadow: "0 3px 14px rgba(0,0,0,.6)" }}>Daniela Werkalec</div>
        <div style={{ marginTop: 22, fontFamily: TITLE, fontWeight: 800, fontSize: 48, color: C.angle, letterSpacing: 1 }}>Corredora inmobiliaria</div>
        <div style={{ marginTop: 30, fontFamily: TITLE, fontWeight: 800, fontSize: 42, color: C.text }}>@danielawerkalec</div>
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Background />
    <NeuralBgV />
    <CamV keys={CAM} until={DURATION} />
    <SubsV keywords={KEYWORDS} hide={[[DURATION, 999]]} yAt={subsY(CAM)} />
    <Watermark />
    <EndCard />
    <Sounds list={SFX} />
  </AbsoluteFill>
);
