import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadInstrument } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadRedHat } from "@remotion/google-fonts/RedHatDisplay";
import { loadFont as loadPTSerif } from "@remotion/google-fonts/PTSerif";
import { staticFile, delayRender, continueRender } from "remotion";

export const { fontFamily: TITLE } = loadArchivo("normal", { weights: ["800", "900"], subsets: ["latin"] });
export const { fontFamily: BODY } = loadInstrument("normal", { weights: ["600"], subsets: ["latin"] });

// Subtítulos base: Playfair Display (serif elegante) con karaoke amarillo.
export const { fontFamily: SUBS } = loadPlayfair("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });

// Fuentes para REMARCAR (frases compuestas multi-fuente, distintos pesos):
export const { fontFamily: REMARK_SANS } = loadRedHat("normal", { weights: ["400", "700", "900"], subsets: ["latin"] }); // ≈ Indivisible
export const { fontFamily: REMARK_SERIF } = loadPTSerif("normal", { weights: ["400", "700"], subsets: ["latin"] }); // ≈ SchoolBook
loadPTSerif("italic", { weights: ["400", "700"], subsets: ["latin"] }); // itálica para los toques

// True Fate = Neato Serif (fuente local): la palabra GRANDE en amarillo del remate.
export const TRUEFATE = "Neato Serif";
if (typeof document !== "undefined" && !document.getElementById("local-fonts")) {
  const handle = delayRender("local-fonts");
  const style = document.createElement("style");
  style.id = "local-fonts";
  style.textContent = `@font-face{font-family:"Neato Serif";src:url("${staticFile("fonts/NeatoSerif-Regular.ttf")}") format("truetype");font-weight:400;font-style:normal;font-display:block;}`;
  document.head.appendChild(style);
  (document as any).fonts.load('400 48px "Neato Serif"').then(() => continueRender(handle)).catch(() => continueRender(handle));
}

// Paleta de marca Daniela Werkalec (ver marcas/daniela-werkalec/estilo.md):
export const C = {
  bg: "#0B0A10",
  card: "rgba(21,19,28,0.92)",
  cardSolid: "#15131C",
  line: "rgba(255,255,255,0.09)",
  text: "#FFFFFF",
  muted: "#9C97AB",
  lime: "#38B6FF", // 2do color = color del ÁNGULO. Cambiar acá y en `angle`: celeste #38B6FF vlog · fucsia #CB6CE6 opinión · amarillo #F4C910 guías · verde #2DAF8C apps · rojo #FF3131 noticias
  violet: "#C98A2E", // acento secundario (bronce)
  red: "#FF6B6B",
  yellow: "#FFCC00", // amarillo = color PRINCIPAL: karaoke de subtítulos y palabra grande del remate
  angle: "#38B6FF", // alias explícito del color del ángulo
};

export const MARCA = {
  handle: "@danielawerkalec",
  ctaPalabra: "AGENTE", // reels: "Comenta AGENTE…"
  ctaTexto: "y te envío la guía del agente IA que atiende 24 hs",
};
