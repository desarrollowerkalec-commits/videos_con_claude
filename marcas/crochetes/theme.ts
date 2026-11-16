// ───────────────────────────────────────────────────────────────────────────
// TEMA DE MARCA · CROCHETES by María
// Paleta y tipografías = las de crochetes.com.ar + logo (decisión 16/11/2026).
// Pegá este archivo en remotion/src/theme.ts del proyecto de reel.
// Reglas de uso y contrastes: marcas/crochetes/estilo.md
// ───────────────────────────────────────────────────────────────────────────

import { loadFont as loadWork } from "@remotion/google-fonts/WorkSans";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

export const { fontFamily: TITLE } = loadWork("normal", { weights: ["800", "900"], subsets: ["latin"] });
export const { fontFamily: BODY } = loadWork("normal", { weights: ["500", "600", "700"], subsets: ["latin"] }); // karaoke
export const { fontFamily: HAND } = loadCaveat("normal", { weights: ["400", "700"], subsets: ["latin"] });

export const C = {
  lino: "#F0EFEB",      // fondo de la web
  azul: "#1B97C8",      // acento de la web = aguja del logo
  marino: "#001E42",    // barra y pie de la web
  chocolate: "#47382F", // la "C" del logo
  terracota: "#B3695C", // hoja del logo
  arena: "#AF9373",     // puntadas del logo
  grafito: "#282828",   // títulos de la web
  gris: "#4E4E4E",      // cuerpo de la web
  white: "#FFFFFF",

  // alias por compatibilidad con la skill (lime = acento principal, violet = secundario)
  text: "#FFFFFF",
  lime: "#1B97C8",   // palabra activa del karaoke
  violet: "#B3695C", // segundo acento
  bg: "#F0EFEB",     // placas claras
  muted: "#4E4E4E",
};

// Texto sobre cada fondo (contraste verificado)
export const ON = {
  azul: "#001E42",      // 4,99 (blanco solo en bold grande: 3,33)
  terracota: "#FFFFFF", // 4,12
  marino: "#FFFFFF",    // 16,61
  arena: "#282828",     // 5,09
  lino: "#282828",      // 12,81
};

export const SHADOW = {
  sub: "0 2px 6px rgba(40,40,40,0.55), 0 0 2px rgba(40,40,40,0.6)", // subtítulos
  soft: "0 4px 14px rgba(40,40,40,0.35)",
  pop3d: "6px 7px 0 #001E42", // 1–2 palabras pop por reel
};

export const LOGO = {
  horizontal: "crochetes-logo-horizontal-color.png",
  horizontalNeg: "crochetes-logo-horizontal-negativo.png",
  vertical: "crochetes-logo-vertical-color.png",
  verticalNeg: "crochetes-logo-vertical-negativo.png",
  isotipo: "crochetes-isotipo-color.png",
  isotipoNeg: "crochetes-isotipo-negativo.png",
}; // en editor-video-ia/assets/logos/

export const MARCA = {
  handle: "@crochetes_by_maria",
  sitio: "crochetes.com.ar",
  aiWatermark: "✦ generado con IA", // obligatorio cuando aparece María
};
