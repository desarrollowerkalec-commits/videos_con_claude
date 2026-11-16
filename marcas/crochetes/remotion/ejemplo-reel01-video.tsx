// CROCHETES by María · Reel 01 — "Qué necesitás realmente para empezar crochet"
// Tiempos en segundos del reel (words.ts). Cortes de locación: 6.82 (clip 2) y 12.55 (clip 3).
// Jump cuts internos (pausas eliminadas): 1.52 y 10.22 → disimulados con cambio de zoom.
// Cara de María: y ≈ 150–480 en las 3 tomas → gráficos en y 440–1000, karaoke en y 1480.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "./theme";
import { DURATION } from "./words";
import { useT } from "./lib";
import { AiMark, BigWord, Cam, Chip, EndCard, Flash, Karaoke, PaperNote, ScriptReveal, SelectBox, Sfx, Stickers, Strip, TrackIn } from "./kit";

export const CTA_SECONDS = 3.6;
const CUT2 = 6.82, CUT3 = 12.55;

const CAM = [
  { at: 0, zoom: 1.0 },
  { at: 1.52, zoom: 1.08 }, // jump cut → punch-in
  { at: 5.02, zoom: 1.14 }, // énfasis en "realmente"
  { at: CUT2, zoom: 1.0 },
  { at: 10.22, zoom: 1.1, fy: 25 }, // jump cut → punch-in
  { at: CUT3, zoom: 1.0 },
  { at: 15.9, zoom: 1.08 }, // remate
];

// karaoke oculto cuando el gráfico ya dice esas palabras (regla: no duplicar ni compartir zona)
const HIDE: [number, number][] = [[0, 1.52], [4.45, CUT2], [CUT2, 10.24], [CUT3, 15.9], [15.9, 99]];

const SFX = [
  { at: 0.08, f: "sparkle" as const, v: 0.8 },
  { at: 1.0, f: "pop" as const },
  { at: 2.2, f: "click" as const, v: 0.7 },
  { at: 2.82, f: "tick" as const, v: 0.6 },
  { at: 3.15, f: "tick" as const, v: 0.8 },
  { at: 4.5, f: "whoosh" as const, v: 0.5 },
  { at: 5.02, f: "pop" as const },
  { at: 5.6, f: "sparkle" as const, v: 0.6 },
  { at: CUT2 - 0.05, f: "whoosh" as const, v: 0.7 },
  { at: 7.3, f: "paper" as const, v: 0.8 },
  { at: 8.66, f: "paper" as const, v: 0.8 },
  { at: 10.3, f: "paper" as const, v: 1 },
  { at: 12.15, f: "tick" as const, v: 0.7 },
  { at: CUT3 - 0.05, f: "whoosh" as const, v: 0.7 },
  { at: 12.87, f: "pop" as const },
  { at: 14.11, f: "pop" as const },
  { at: 15.01, f: "pop" as const },
  { at: 16.03, f: "tick" as const, v: 0.6 },
  { at: 16.55, f: "boom" as const, v: 0.35 },
  { at: 16.78, f: "sparkle" as const, v: 0.7 },
  { at: DURATION, f: "whoosh" as const, v: 0.7 },
  ...[0, 1, 2, 3, 4].map((i) => ({ at: DURATION + 0.85 + i * 0.16, f: "tick" as const, v: 0.45 })),
  { at: DURATION + 1.8, f: "ding" as const, v: 0.6 },
];

const LastFrame: React.FC = () => {
  const t = useT();
  return t >= DURATION ? <Img src={staticFile("last.jpg")} style={{ position: "absolute", width: 1080, height: 1920, objectFit: "cover", filter: "blur(6px)" }} /> : null;
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.lino }}>
    <Cam keys={CAM} until={DURATION} />
    <LastFrame />

    {/* 1 · gancho: script que se escribe + CROCHET gigante con destellos (#1 + #5) */}
    <ScriptReveal from={0.06} to={1.52} text="¿querés aprender" y={560} size={96} />
    <BigWord from={1.0} to={1.52} text="CROCHET" y={680} size={176} />
    <Stickers to={1.52} items={[
      { kind: "spark", x: 140, y: 600, at: 0.12, size: 34, color: C.white },
      { kind: "spark", x: 950, y: 560, at: 0.22, size: 26, color: C.white },
      { kind: "spark", x: 920, y: 880, at: 1.05, size: 40, color: C.azul },
      { kind: "spark", x: 170, y: 900, at: 1.12, size: 28, color: C.white },
    ]} />

    {/* 2 · selección estilo UI que se tacha (#2) */}
    <SelectBox from={2.2} to={3.5} text="un kit enorme" typeDur={0.55} selectAt={2.82} strikeAt={3.12} y={640} />

    {/* 3 · jerarquía de 3 niveles con tracking (#4 + #5) */}
    <TrackIn from={4.5} to={CUT2} text="qué necesitás" y={560} size={58} />
    <BigWord from={5.02} to={CUT2} text="REALMENTE" y={640} size={150} />
    <ScriptReveal from={5.6} to={CUT2} text="para empezar" y={800} size={88} rot={-3} />
    <Stickers to={CUT2} items={[
      { kind: "star", x: 110, y: 640, at: 5.08, size: 40, color: C.terracota, spin: true },
      { kind: "spark", x: 975, y: 820, at: 5.18, size: 34, color: C.azul },
    ]} />

    {/* 4 · clip 2: tiras blancas que se apilan con número (#8) */}
    <Chip at={6.88} to={10.24} x={90} y={520} text="EMPEZÁ CON" size={44} rot={-3} />
    <Strip from={7.3} to={10.24} x={90} y={620} align="left" tag="1" words={[["una", 7.34], ["aguja", 7.56], ["cómoda", 7.86]]} />
    <Strip from={8.66} to={10.24} x={90} y={720} align="left" tag="2" words={[["un", 8.7], ["hilado", 8.86], ["de", 9.22], ["color", 9.42], ["claro", 9.66]]} />
    <Stickers to={10.24} items={[
      { kind: "star", x: 965, y: 560, at: 7.6, size: 38, color: C.azul },
      { kind: "yarn", x: 935, y: 860, at: 8.9, size: 52, color: C.terracota },
    ]} />

    {/* 5 · nota de papel con resaltador (#10) */}
    <PaperNote from={10.28} to={CUT3} x={560} y={560} w={440} rot={-7}
      lines={[[["color", 10.3], ["claro", 10.4], ["=", 10.5]], [["ves", 10.86], ["mejor", 11.6]], [["los", 11.88], ["puntos", 12.12]]]}
      markLine={2} markWord="puntos" markAt={12.14} />

    {/* 6 · clip 3: explosión de etiquetas + stickers (#7 + #12) */}
    <ScriptReveal from={12.61} to={15.9} text="sumá:" x={110} w={500} align="left" y={430} size={92} rot={-5} color={C.marino} />
    <Chip at={12.87} to={15.9} x={110} y={560} text="MARCADORES" bg={C.azul} fg={C.marino} rot={-4} />
    <Chip at={14.11} to={15.9} x={970} y={670} text="TIJERAS" bg={C.terracota} fg={C.white} rot={3} anchor="right" />
    <Chip at={15.01} to={15.9} x={140} y={780} text="AGUJA LANERA" bg={C.marino} fg={C.white} rot={-2} />
    <Stickers to={15.9} items={[
      { kind: "flower", x: 950, y: 560, at: 12.92, size: 46, color: C.azul },
      { kind: "star", x: 120, y: 700, at: 14.14, size: 40, color: C.terracota, spin: true },
      { kind: "heart", x: 950, y: 830, at: 15.05, size: 40, color: C.terracota },
      { kind: "spark", x: 640, y: 905, at: 15.1, size: 30, color: C.white },
    ]} />

    {/* 7 · remate: palabra que entra girando y explota (#9) */}
    <ScriptReveal from={16.03} to={DURATION} text="lo demás" y={540} size={86} />
    <BigWord from={16.55} to={DURATION} text={"PUEDE\nESPERAR"} y={640} size={124} spin />

    <Flash at={[CUT2, CUT3]} />
    <Karaoke hide={HIDE} />
    <AiMark />

    {/* 8 · placa final (#14 + #15) */}
    <EndCard from={DURATION} kicker="guardalo para tu primera compra" title="LO ESENCIAL"
      items={["Aguja cómoda", "Hilado claro", "Marcadores", "Tijeras", "Aguja lanera"]}
      cta="Guía completa · link en la bio" url="crochetes.com.ar" />

    <Sfx list={SFX} />
  </AbsoluteFill>
);
