// CROCHETES by María · Reel 01 — "Qué necesitás realmente para empezar crochet"  (v2)
// Tiempos en segundos del reel (words.ts). Cortes de locación: 6.82 (clip 2) y 12.55 (clip 3).
// Mentón de María: clip1 y≈490 · clip2 y≈450 · clip3 y≈360  → TODO gráfico va por debajo (pecho/cintura).
// Cada tramo usa un recurso distinto de la referencia (números = tabla de estilo.md).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "./theme";
import { DURATION } from "./words";
import { useT } from "./lib";
import {
  AiMark, BounceDuo, BubbleSelect, Cam, CloudPop, EndCard, Flash, GhostZoom, Karaoke, LetterDrop, OrbitSpin,
  PaperNote, ScriptWrite, Sfx, SfxItem, StickerArrow, StickerBurstBuild, TypeStrips, TypeTag, WordChips, typeSfx,
} from "./kit";

export const CTA_SECONDS = 3.8;
const CUT2 = 6.82, CUT3 = 12.55;

const CAM = [
  { at: 0, zoom: 1.0 },
  { at: 1.52, zoom: 1.08 }, // jump cut → punch-in
  { at: 5.12, zoom: 1.14 }, // corte sobre el estallido de REALMENTE
  { at: CUT2, zoom: 1.0 },
  { at: 8.7, zoom: 1.06 }, // corte sobre el cambio AGUJA → HILADO
  { at: 10.22, zoom: 1.12 }, // jump cut → punch-in
  { at: CUT3, zoom: 1.0 },
  { at: 14.0, zoom: 1.06 },
  { at: 15.9, zoom: 1.12 },
];

// karaoke solo donde el gráfico no repite la frase (la referencia no usa karaoke: las palabras SON el subtítulo)
const HIDE: [number, number][] = [[0, 1.52], [3.5, CUT2], [CUT2, 10.22], [CUT3, 99]];

const letterTicks = (at: number, n: number, step: number): SfxItem[] => Array.from({ length: n }, (_, i) => ({ at: at + i * step, f: "tick" as const, v: 0.45 }));
const SFX: SfxItem[] = [
  { at: 0.06, f: "sparkle", v: 0.8 },
  { at: 0.98, f: "whoosh", v: 0.45 }, { at: 1.04, f: "pop" },
  { at: 1.58, f: "pop" }, { at: 1.98, f: "pop" }, { at: 2.4, f: "whoosh", v: 0.35 },
  { at: 2.52, f: "click", v: 0.7 }, ...typeSfx(2.58, "un kit enorme", 26), { at: 3.1, f: "tick", v: 0.8 },
  ...typeSfx(3.54, "te voy a contar", 28),
  { at: 4.18, f: "pop", v: 0.8 }, { at: 4.52, f: "pop", v: 0.8 },
  { at: 4.75, f: "whoosh", v: 0.6 }, { at: 5.12, f: "boom", v: 0.35 }, { at: 5.14, f: "sparkle", v: 0.8 },
  { at: 5.6, f: "tick", v: 0.6 },
  { at: CUT2 - 0.04, f: "whoosh", v: 0.7 },
  { at: 6.88, f: "pop" }, ...letterTicks(7.5, 5, 0.075), ...typeSfx(7.86, "CÓMODA", 20),
  { at: 8.55, f: "whoosh", v: 0.4 }, { at: 8.66, f: "pop" }, ...letterTicks(8.75, 6, 0.075), ...typeSfx(9.2, "DE COLOR CLARO", 22),
  { at: 10.28, f: "paper", v: 1 }, ...typeSfx(10.42, "SE VEN MEJOR", 22), { at: 11.75, f: "paper", v: 0.5 }, ...typeSfx(11.88, "LOS PUNTOS", 22),
  { at: CUT3 - 0.04, f: "whoosh", v: 0.7 },
  { at: 12.61, f: "pop", v: 0.8 }, { at: 12.87, f: "sparkle", v: 0.9 }, { at: 12.95, f: "pop", v: 0.6 }, { at: 13.05, f: "pop", v: 0.5 },
  { at: 13.9, f: "whoosh", v: 0.35 }, ...typeSfx(14.0, "+ unas tijeras", 30), ...typeSfx(14.85, "+ una aguja lanera", 30),
  { at: 16.03, f: "pop", v: 0.8 }, { at: 16.25, f: "pop", v: 0.8 }, { at: 16.55, f: "tick", v: 0.6 },
  { at: 16.83, f: "whoosh", v: 0.5 }, { at: 17.0, f: "poof", v: 1.2 },
  { at: DURATION, f: "whoosh", v: 0.6 },
  ...letterTicks(DURATION + 0.55, 10, 0.04),
  ...[0, 1, 2, 3, 4].map((i) => ({ at: DURATION + 1.0 + i * 0.2, f: "type" as const, v: 0.5 })),
  { at: DURATION + 2.2, f: "pop" }, { at: DURATION + 2.25, f: "ding", v: 0.6 },
];

const LastFrame: React.FC = () => {
  const t = useT();
  return t >= DURATION ? <Img src={staticFile("last.jpg")} style={{ position: "absolute", width: 1080, height: 1920, objectFit: "cover", filter: "blur(6px)" }} /> : null;
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.lino }}>
    <Cam keys={CAM} until={DURATION} />
    <LastFrame />

    {/* A · 0–1.5 · script que se escribe con destellos (#1) + CROCHET con eco gigante (#5/#14) */}
    <ScriptWrite from={0.06} to={1.52} text="¿querés aprender" y={680} size={96} />
    <GhostZoom at={1.0} to={1.52} text="CROCHET" y={800} size={168} />

    {/* B · 1.5–2.5 · dos palabras que caen y se balancean, después se desarman (#3/#4) */}
    <BounceDuo to={2.6} y={720} size={86} a={{ text: "ANTES", at: 1.58 }} b={{ text: "DE COMPRAR", at: 1.98 }} />

    {/* C · 2.4–3.5 · globo con texto seleccionado que se tipea y se tacha (#2) */}
    <BubbleSelect from={2.52} to={3.5} text="un kit enorme" y={720} cps={26} strikeAt={3.08} />

    {/* D · 3.5–4.5 · máquina de escribir en tira blanca (#8) */}
    <TypeStrips from={3.5} to={4.16} y={720} lines={[{ text: "te voy a contar", at: 3.54, cps: 28 }]} />

    {/* E · 4.2–6.8 · fichas por palabra (#13) + REALMENTE en órbita que estalla (#9) + script (#15) */}
    <WordChips to={CUT2} y={690} words={[{ text: "QUÉ", at: 4.18 }, { text: "NECESITÁS", at: 4.52 }]} bg={C.azul} fg={C.marino} />
    <OrbitSpin at={4.76} to={CUT2} text="REALMENTE" y={790} size={134} />
    <ScriptWrite from={5.6} to={CUT2} text="para empezar" y={950} size={84} rot={-3} />

    {/* F · clip 2 · sticker manuscrito + flecha (#12) → letras que suben una a una → etiqueta que se tipea → cambio de palabra (#13) */}
    <StickerArrow at={6.88} to={8.62} x={90} y={650} text="empezá con" />
    <LetterDrop at={7.5} to={8.75} exitAt={8.55} text="AGUJA" y={760} size={160} />
    <TypeTag at={7.86} to={8.62} text="CÓMODA" y={935} cps={20} />
    <StickerArrow at={8.66} to={10.24} x={90} y={650} text="y un" bg={C.terracota} fg={C.white} />
    <LetterDrop at={8.75} to={10.24} text="HILADO" y={760} size={160} />
    <TypeTag at={9.2} to={10.24} text="DE COLOR CLARO" y={935} cps={22} bg={C.azul} fg={C.marino} rot={2} />

    {/* G · nota de papel que entra deslizando, marcador tipeado y resaltador que barre (#10) */}
    <PaperNote from={10.26} to={CUT3} x={170} y={790} w={740}
      lines={[{ text: "SE VEN MEJOR", at: 10.42 }, { text: "LOS PUNTOS", at: 11.88 }]}
      mark={{ line: 1, at: 11.75, dur: 0.5 }} />

    {/* H · clip 3 · explosión de stickers + palabra que se arma de derecha a izquierda con arco (#7) */}
    <StickerBurstBuild at={12.87} to={14.05} text="MARCADORES" y={780} size={110} chip={{ text: "SUMÁ", at: 12.61 }} />
    {/* … y máquina de escribir en tiras (#8) */}
    <TypeStrips from={13.98} to={15.9} y={640} size={56} lines={[{ text: "+ unas tijeras", at: 14.0, cps: 30 }, { text: "+ una aguja lanera", at: 14.85, cps: 30 }]} />

    {/* I · fichas (#13) + script (#1) + ESPERAR con eco (#14) que se tapa con NUBES y estalla (#14) */}
    <WordChips to={DURATION} y={560} words={[{ text: "LO", at: 16.03 }, { text: "DEMÁS", at: 16.25 }]} />
    <ScriptWrite from={16.55} to={DURATION} text="puede" y={650} size={84} />
    <GhostZoom at={16.85} to={17.12} text="ESPERAR" y={750} size={150} />

    <Flash at={[CUT2, CUT3]} />
    <Karaoke hide={HIDE} />
    <AiMark />

    {/* placa final */}
    <EndCard from={DURATION} kicker="lo que necesitás para empezar" title="LO ESENCIAL"
      items={["Aguja cómoda", "Hilado claro", "Marcadores", "Tijeras", "Aguja lanera"]}
      cta="Guardalo para tu primera compra" handle="@crochetes_by_maria" />
    {/* las nubes estallan por encima del pase a la placa */}
    <CloudPop at={17.0} y={825} />

    <Sfx list={SFX} />
  </AbsoluteFill>
);
