// ───────────────────────────────────────────────────────────────────────────
// TEMA DE MARCA · Daniela Werkalec (marca personal)
// Pegá este archivo en remotion/src/theme.ts del proyecto que genera la skill
// (tanto en el proyecto de reels como en el de video largo).
// Acento = DORADO · texto = BLANCO. Fondo oscuro para que el dorado resalte.
// ───────────────────────────────────────────────────────────────────────────

import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";

// Tipografía: Montserrat (geométrica, redondeada, bold) — la más cercana al
// subtítulo de tus reels. Si querés probar otra, Poppins también va bien.
export const { fontFamily: TITLE } = loadMont("normal", { weights: ["800", "900"], subsets: ["latin"] });
export const { fontFamily: BODY } = loadMont("normal", { weights: ["600", "700"], subsets: ["latin"] });

export const C = {
  bg: "#0E0D0B",              // casi negro cálido (fondo de placas)
  card: "rgba(22,20,16,0.92)",
  cardSolid: "#161410",
  line: "rgba(255,255,255,0.10)",
  text: "#FFFFFF",            // blanco puro (subtítulo base)
  muted: "#B8B2A4",           // gris cálido para texto secundario
  lime: "#F2B705",            // ACENTO PRINCIPAL = dorado (palabra activa / highlight)
  violet: "#C98A2E",          // acento secundario = bronce (segundo tono de oro)
  red: "#FF6B6B",             // reservado para "✗" / negativos en listas
};

// ---------- marca ----------
// lime = acento principal (dorado) · violet = secundario (bronce).
// Los nombres "lime/violet" quedan por compatibilidad con la skill.
export const MARCA = {
  handle: "@danielawerkalec",   // marca de agua
  ctaPalabra: "GUIA",           // PROVISORIO — se define por video al analizar el CTA
  ctaTexto: "y te lo envío",    // PROVISORIO — ídem
};
