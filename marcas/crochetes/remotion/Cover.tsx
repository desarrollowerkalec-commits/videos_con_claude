// PORTADA · CROCHETES by María — sistema de portadas (ver marcas/crochetes/estilo.md → Portadas)
// Se arma con las MISMAS piezas del kit del reel (la portada es el último cuadro de una mini-animación):
// tiras de máquina de escribir (pregunta) + palabra clave con arco y stickers + etiqueta tipeada + logo.
// Foto: cuadro del reel con la boca cerrada, SIN oscurecer (marca clara) y sin sombras negras.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "./theme";
import { AiMark, StickerBurstBuild, TypeStrips, TypeTag } from "./kit";

export const COVER = {
  pregunta: ["¿Qué necesitás", "para empezar"],
  palabra: "CROCHET?",
  etiqueta: "5 cosas · sin gastar de más",
};

export const Cover: React.FC = () => (
  <AbsoluteFill style={{ background: C.lino, overflow: "hidden" }}>
    <Img src={staticFile("img/cover-bg.jpg")} style={{ position: "absolute", width: 1080, height: 1920, objectFit: "cover" }} />
    {/* velo lino muy suave solo en la franja del texto (nada de negro) */}
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(240,239,235,0) 36%, rgba(240,239,235,0.18) 46%, rgba(240,239,235,0.18) 64%, rgba(240,239,235,0) 74%)" }} />
    <StickerBurstBuild at={0.9} to={99} text={COVER.palabra} y={1020} size={164} softShadow={false} />
    {/* la pregunta va por encima del arco */}
    <TypeStrips from={0} to={99} y={790} size={64} gap={8} lines={[{ text: COVER.pregunta[0], at: 0, cps: 40 }, { text: COVER.pregunta[1], at: 0.45, cps: 40 }]} />
    <TypeTag at={1.5} to={99} text={COVER.etiqueta} y={1240} size={50} cps={40} />
    <div style={{ position: "absolute", top: 1545, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ background: C.lino, borderRadius: 60, padding: "12px 34px" }}>
        <Img src={staticFile("logos/crochetes-logo-horizontal-color.png")} style={{ width: 300, display: "block" }} />
      </div>
    </div>
    <AiMark />
  </AbsoluteFill>
);
