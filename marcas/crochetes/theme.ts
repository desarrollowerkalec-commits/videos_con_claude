// ───────────────────────────────────────────────────────────────────────────
// TEMA DE MARCA · CROCHETES by María (Crochet Editorial)
// Pegá este archivo en remotion/src/theme.ts del proyecto de reel.
// Ver marcas/crochetes/estilo.md para reglas de uso y contrastes.
// ───────────────────────────────────────────────────────────────────────────

import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
// PROPUESTAS sin aprobar (script y manuscrita). Cambiar acá si se elige otra.
import { loadFont as loadScript } from "@remotion/google-fonts/Parisienne";
import { loadFont as loadHand } from "@remotion/google-fonts/Caveat";

export const { fontFamily: TITLE } = loadMont("normal", { weights: ["800", "900"], subsets: ["latin"] });
export const { fontFamily: BODY } = loadMont("normal", { weights: ["600", "700"], subsets: ["latin"] }); // karaoke
export const { fontFamily: SERIF } = loadPlayfair("normal", { weights: ["400", "600"], subsets: ["latin"] });
export const { fontFamily: SERIF_IT } = loadPlayfair("italic", { weights: ["400"], subsets: ["latin"] });
export const { fontFamily: TEXT } = loadDM("normal", { weights: ["400", "500"], subsets: ["latin"] });
export const { fontFamily: SCRIPT } = loadScript("normal", { weights: ["400"], subsets: ["latin"] });
export const { fontFamily: HAND } = loadHand("normal", { weights: ["600"], subsets: ["latin"] });

export const C = {
  ivory: "#F7F2EB",
  rose: "#D9A5A0",
  sage: "#A4B6A0",
  cocoa: "#73564A",
  graphite: "#282623",
  white: "#FFFFFF",

  // alias por compatibilidad con la skill (lime = acento principal, violet = secundario)
  text: "#FFFFFF",
  lime: "#D9A5A0",   // palabra activa del karaoke = rosa viejo
  violet: "#A4B6A0", // secundario = salvia
  bg: "#F7F2EB",     // placas CLARAS (nunca negro)
  muted: "#73564A",
};

// Sombras (nunca cajas)
export const SHADOW = {
  sub: "0 2px 6px rgba(40,38,35,0.55), 0 0 2px rgba(40,38,35,0.6)", // subtítulos
  soft: "0 4px 14px rgba(40,38,35,0.35)",                            // titulares sobre video
  pop3d: `6px 7px 0 ${"#73564A"}`,                                    // 1–2 palabras pop por reel
};

export const MARCA = {
  handle: "@crochetes_by_maria",
  sitio: "crochetes.com.ar",
  aiWatermark: "✦ generado con IA", // obligatorio cuando aparece María
};
