// Reel MDI — "Masterclass online gratuita: El Sistema Inmobiliario 2026 en 60 días" (Clara, avatar IA).
// Martes 10 de noviembre, 19 hs. Daniela Werkalec da la masterclass.
// Lenguaje visual MDI (ver marcas/marketing-digital-inmobiliario/estilo.md): subtítulos palabra por palabra a la
// izquierda (Aktiv Grotesk Ex + Vujahday Script verde agua con glow), b-roll en tarjetas inclinadas con borde verde agua,
// PiP abajo, captura blanca sobre el pecho, títulos con eco script. SIN paneles oscuros line-art (eso es de Daniela).
// El video de origen trae subtítulos quemados (con errores) en y≈1540–1620: se tapan con un difuminado.
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile } from "remotion";
import { useLocalFonts, BG, BigTitle, Cap, Captions, MONT, neon, pop, prog, SCRIPT, ShotCard, SOFT, T, TiltCard, TL, useT, W, WordT } from "./kit";
import WORDS from "./words.json";

export const FPS = 30;
export const SRC_DUR = 59.44;
export const END_DUR = 3.5;
export const TOTAL = SRC_DUR + END_DUR;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- ventanas de b-roll (s) ----------
const FULL = { dias: [1.45, 4.95], mapa: [21.45, 27.1], plataforma: [34.9, 42.66] };
const PIP = { orden: [5.2, 9.2], plan: [27.14, 31.7], sin: [31.78, 34.74], herr1: [42.8, 47.0], herr2: [47.8, 52.8] };
const INVITE: [number, number] = [10.9, 21.3];
const inSeg = (t: number, s: number[]) => t >= s[0] && t < s[1];

// ---------- subtítulos (texto real corregido; los tiempos salen de words.json) ----------
const CAPS: Cap[] = [
  { from: 0.0, to: 1.27, text: "Si en *2027*" },
  { from: 1.28, to: 2.73, text: "querés *vender*|distinto," },
  { from: 2.74, to: 3.79, text: "los próximos|*60 días*" },
  { from: 3.8, to: 5.1, text: "van a ser *clave.*" },
  { from: 5.16, to: 6.46, text: "*Orden,*|*contenido*" },
  { from: 6.46, to: 7.38, text: "y un *sistema*" },
  { from: 7.4, to: 8.64, text: "que no dependa|de estar todo el día" },
  { from: 8.64, to: 9.7, text: "*conectado.*" },
  { from: 9.72, to: 11.1, text: "Soy *Clara,*|directora" },
  { from: 11.12, to: 12.2, text: "de *MDI,*" },
  { from: 12.26, to: 14.3, text: "*10 de noviembre*|a las *19 hs*", caps: true },
  { from: 14.32, to: 15.06, text: "*Daniela Werkalec*" },
  { from: 15.08, to: 16.26, text: "va a dar una|*masterclass*" },
  { from: 16.28, to: 17.34, text: "*online gratuita*" },
  { from: 17.36, to: 18.48, text: "para *ordenar*|y *vender más*" },
  { from: 18.5, to: 20.14, text: "el sistema|*inmobiliario 2026*" },
  { from: 20.16, to: 21.34, text: "en *60 días*" },
  { from: 21.36, to: 22.12, text: "En esta clase," },
  { from: 22.14, to: 22.98, text: "*Daniela* te va a|mostrar el" },
  { from: 23.0, to: 24.02, text: "*mapa completo,*" },
  { from: 24.04, to: 25.02, text: "*simple* y|*aplicable.*" },
  { from: 25.04, to: 26.54, text: "*Web,* más *redes,*|más *IA,*", caps: true },
  { from: 26.56, to: 27.08, text: "más *leads.*", caps: true },
  { from: 27.1, to: 28.34, text: "te vas a llevar|el *plan*" },
  { from: 28.36, to: 29.2, text: "*60 días*" },
  { from: 29.22, to: 30.12, text: "para *implementarlo*" },
  { from: 30.14, to: 31.76, text: "con *prioridades*|*claras,*" },
  { from: 31.78, to: 32.98, text: "sin volverte|*técnico*" },
  { from: 33.0, to: 33.88, text: "y sin *depender*" },
  { from: 33.9, to: 34.74, text: "de una *agencia.*" },
  { from: 34.76, to: 35.72, text: "Y por *registrarte,*" },
  { from: 35.74, to: 36.72, text: "además te vamos|a dar la" },
  { from: 36.74, to: 37.9, text: "*plataforma* de|*implementación*" },
  { from: 37.92, to: 39.54, text: "*gratis* por|*60 días*", caps: true },
  { from: 39.56, to: 41.24, text: "con *apps* y|*GPTs* entrenadas" },
  { from: 41.26, to: 42.72, text: "para el mercado|*inmobiliario*" },
  { from: 42.74, to: 43.48, text: "para que puedas" },
  { from: 43.5, to: 45.04, text: "*analizar* tu|*Instagram,*" },
  { from: 45.06, to: 46.3, text: "*generar* carruseles|completos" },
  { from: 46.32, to: 47.8, text: "con *imágenes* y *copy,*" },
  { from: 47.82, to: 49.7, text: "y hacer *home staging*|con *IA,*" },
  { from: 49.72, to: 51.04, text: "incluso *humanizar*|*imágenes*" },
  { from: 51.06, to: 52.9, text: "en un nivel|más *avanzado.*" },
  { from: 52.94, to: 54.78, text: "*reservá* tu lugar|*gratis* ahora", caps: true },
  { from: 54.8, to: 56.54, text: "El *acceso* te lo" },
  { from: 56.56, to: 57.64, text: "vamos a *mandar*" },
  { from: 57.66, to: 59.5, text: "por *WhatsApp*|después de registrarte." },
];
const capY = (t: number) => {
  if (inSeg(t, PIP.orden) || inSeg(t, PIP.plan) || inSeg(t, PIP.sin) || inSeg(t, PIP.herr1) || inSeg(t, PIP.herr2)) return 850;
  if ((t >= INVITE[0] && t < INVITE[1]) || t >= 56.4) return 1200; // debajo de la captura blanca
  if (inSeg(t, FULL.dias) || inSeg(t, FULL.mapa) || inSeg(t, FULL.plataforma)) return 1290; // sobre la base de la tarjeta (zona segura: nada debajo de y≈1500)
  return 1150;
};

// ---------- cámara con punch-in ----------
const ZK: [number, number][] = [
  [0, 1.04], [1.4, 1.0],
  [5.14, 1.0], [5.26, 1.09], [6.6, 1.09], [7.3, 1.0],
  [9.7, 1.0], [9.82, 1.08], [10.9, 1.08], [11.5, 1.0],
  [34.72, 1.0], [34.84, 1.09], [36.0, 1.09], [36.7, 1.0],
  [52.92, 1.0], [53.04, 1.1], [59.5, 1.1],
];
const Cam: React.FC = () => {
  const t = useT();
  const z = interpolate(t, ZK.map((k) => k[0]), ZK.map((k) => k[1]), { ...CL, easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 30%" }}>
      <OffthreadVideo src={staticFile("cam.mp4")} />
    </AbsoluteFill>
  );
};
// tapa los subtítulos quemados del video de origen (y≈1540–1620, con errores y dentro de la zona que tapa Instagram)
const HideBurned: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1330, bottom: 0, backdropFilter: "blur(26px)", WebkitBackdropFilter: "blur(26px)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 30%)", maskImage: "linear-gradient(180deg, transparent 0%, black 30%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1300, bottom: 0, background: "linear-gradient(180deg, rgba(2,8,9,0) 0%, rgba(2,8,9,0.5) 22%, rgba(2,8,9,0.9) 42%, rgba(2,8,9,0.96) 100%)" }} />
  </>
);

// =================== pantallas (b-roll de interfaz) ===================
const ink = "#111";
const DARK = "#0F2B2E";

// F1 · "60 días": la grilla se va llenando
const ScrDias: React.FC = () => {
  const t = useT();
  const fill = Math.round(interpolate(t, [3.26, 4.4], [0, 60], CL));
  const hot = prog(t, 4.26, 0.4);
  return (
    <div style={{ width: 800, height: 1280, position: "relative", background: "#fff" }}>
      <div style={{ background: DARK, color: "#fff", padding: "54px 34px 26px", display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 64, color: T, opacity: prog(t, 0.6, 0.3) }}>2027</span>
        <span style={{ fontFamily: MONT, fontWeight: 600, fontSize: 28, opacity: prog(t, 1.3, 0.3) }}>querés vender distinto</span>
      </div>
      <div style={{ textAlign: "center", paddingTop: 36, opacity: prog(t, 2.8, 0.3) }}>
        <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 230, lineHeight: 1, color: ink }}>60</span>
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 70, color: "#0b7a5f", marginLeft: 14 }}>días</span>
      </div>
      <div style={{ position: "absolute", left: 63, top: 400, width: 674, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, transform: `scale(${1 + 0.02 * hot})`, transformOrigin: "50% 0%" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{ height: 70, borderRadius: 10, background: i < fill ? T : "#E7EAEE", boxShadow: i < fill && hot > 0 ? `0 0 ${14 * hot}px ${T}` : "none" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, textAlign: "center", opacity: hot, fontFamily: MONT, fontWeight: 900, fontSize: 56, color: "#0b7a5f", letterSpacing: 2 }}>CLAVE</div>
    </div>
  );
};

// P1 · Orden · Contenido · Sistema (que no dependa de estar conectado)
const ScrOrden: React.FC = () => {
  const t = useT();
  const rows: [number, string][] = [[5.18, "Orden"], [5.84, "Contenido"], [6.7, "Sistema"]];
  const off = prog(t, 8.66, 0.4);
  return (
    <div style={{ width: 840, height: 620, background: "#F3F5F7", padding: 28, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map(([at, label]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 22, background: "#fff", borderRadius: 16, padding: "14px 24px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)", opacity: prog(t, at, 0.3), transform: `translateX(${(1 - prog(t, at, 0.35)) * -60}px)` }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: T, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 12.5 L10 17 L19 7" fill="none" stroke="#061416" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 42, color: ink }}>{label}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 22, background: "#fff", borderRadius: 16, padding: "14px 24px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)", opacity: prog(t, 7.4, 0.3) }}>
        <div style={{ width: 96, height: 50, borderRadius: 25, background: off > 0.5 ? "#C9CED6" : T, position: "relative", transition: "none" }}>
          <div style={{ position: "absolute", top: 5, left: 5 + 46 * (1 - off), width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.25)" }} />
        </div>
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 32, color: ink, flex: 1 }}>Conectado todo el día</span>
        <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 26, color: off > 0.5 ? "#8A919C" : "#0b7a5f" }}>{off > 0.5 ? "NO" : "SÍ"}</span>
      </div>
    </div>
  );
};

// invitación (captura blanca sobre el pecho)
const Invite: React.FC = () => {
  const t = useT();
  const row = (at: number, k: string, v: React.ReactNode) => (
    <div style={{ display: "flex", gap: 16, alignItems: "baseline", opacity: prog(t, at, 0.3), padding: "5px 0" }}>
      <span style={{ fontFamily: MONT, fontWeight: 700, fontSize: 22, color: "#888", width: 120 }}>{k}</span>
      <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: ink }}>{v}</span>
    </div>
  );
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 16, background: T }} />
      <div style={{ padding: "20px 28px", flex: 1 }}>
        <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 34, color: ink, opacity: prog(t, 11.0, 0.3) }}>Masterclass online gratuita</div>
        <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 22, color: "#0b7a5f", marginBottom: 8, opacity: prog(t, 11.3, 0.3) }}>El Sistema Inmobiliario 2026 en 60 días</div>
        {row(12.28, "Cuándo", <>10 de noviembre</>)}
        {row(13.5, "Hora", <>19 hs</>)}
        {row(14.32, "Con", <>Daniela Werkalec</>)}
      </div>
    </div>
  );
};

// F2 · el mapa completo: Web · Redes · IA · Leads
const NodeIcon: React.FC<{ kind: "web" | "redes" | "ia" | "leads" }> = ({ kind }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#061416" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {kind === "web" && <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>}
    {kind === "redes" && <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 3.6 4 7 4c2 0 3.8 1.3 5 3 1.2-1.7 3-3 5-3 3.4 0 5.4 3.4 4 6.8C19 15.6 12 20 12 20Z" />}
    {kind === "ia" && <path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3Z" />}
    {kind === "leads" && <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="#061416" /></>}
  </svg>
);
const MAP_NODES: { at: number; x: number; y: number; label: string; kind: "web" | "redes" | "ia" | "leads" }[] = [
  { at: 25.04, x: 200, y: 250, label: "Web", kind: "web" },
  { at: 25.6, x: 600, y: 250, label: "Redes", kind: "redes" },
  { at: 26.18, x: 200, y: 870, label: "IA", kind: "ia" },
  { at: 26.76, x: 600, y: 870, label: "Leads", kind: "leads" },
];
const ScrMapa: React.FC = () => {
  const t = useT();
  const c = pop(t, 22.9, 0.55);
  return (
    <div style={{ width: 800, height: 1280, position: "relative", background: "#F3F5F7" }}>
      <svg width="800" height="1280" style={{ position: "absolute", left: 0, top: 0 }}>
        {MAP_NODES.map((n) => {
          const len = Math.hypot(n.x - 400, n.y - 560);
          return <line key={n.label} x1="400" y1="560" x2={n.x} y2={n.y} stroke={T} strokeWidth="6" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - prog(t, n.at, 0.5))} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 400 - 170, top: 560 - 100, width: 340, height: 200, transform: `scale(${c})`, borderRadius: 28, background: DARK, boxShadow: `0 0 0 5px ${T}, 0 0 40px ${T}88`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 46, color: "#fff", lineHeight: 1.05 }}>MAPA<br /><span style={{ color: T }}>COMPLETO</span></div>
      </div>
      {MAP_NODES.map((n) => {
        const p = pop(t, n.at, 0.5);
        return (
          <div key={n.label} style={{ position: "absolute", left: n.x - 130, top: n.y - 105, width: 260, height: 210, transform: `scale(${p})`, borderRadius: 26, background: "#fff", boxShadow: "0 8px 22px rgba(0,0,0,0.16)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 96, height: 96, borderRadius: 24, background: T, display: "flex", alignItems: "center", justifyContent: "center" }}><NodeIcon kind={n.kind} /></div>
            <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 44, color: ink }}>{n.label}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, display: "flex", justifyContent: "center", gap: 22, opacity: prog(t, 24.04, 0.3) }}>
        {["simple", "aplicable"].map((w, i) => (
          <div key={w} style={{ fontFamily: MONT, fontWeight: 800, fontSize: 34, color: "#0b7a5f", border: `3px solid ${T}`, borderRadius: 40, padding: "8px 26px", transform: `scale(${0.7 + 0.3 * pop(t, 24.04 + i * 0.28, 0.4)})` }}>{w}</div>
        ))}
      </div>
    </div>
  );
};

// P2 · plan 60 días con prioridades claras
const ScrPlan: React.FC = () => {
  const t = useT();
  const bars: [number, string, number][] = [[30.38, "Prioridad 1", 0.9], [30.6, "Prioridad 2", 0.65], [30.82, "Prioridad 3", 0.4]];
  return (
    <div style={{ width: 840, height: 620, background: "#fff", padding: 28, boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, opacity: prog(t, 27.98, 0.3) }}>
        <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 46, color: ink }}>Plan</span>
        <span style={{ fontFamily: MONT, fontWeight: 900, fontSize: 70, color: "#0b7a5f", opacity: prog(t, 28.36, 0.3) }}>60 días</span>
      </div>
      <div style={{ marginTop: 14, opacity: prog(t, 28.4, 0.3) }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONT, fontWeight: 800, fontSize: 24, color: "#666", marginBottom: 6 }}><span>Día 1</span><span>Día 60</span></div>
        <div style={{ height: 22, borderRadius: 11, background: "#E7EAEE" }}><div style={{ width: `${100 * interpolate(t, [28.5, 30.3], [0.02, 1], CL)}%`, height: 22, borderRadius: 11, background: `linear-gradient(90deg, ${T}, #0b7a5f)` }} /></div>
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {bars.map(([at, label, v]) => (
          <div key={label} style={{ opacity: prog(t, at, 0.3) }}>
            <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 28, color: "#444", marginBottom: 6 }}>{label}</div>
            <div style={{ height: 26, borderRadius: 13, background: "#E7EAEE" }}><div style={{ width: `${100 * v * prog(t, at + 0.15, 0.8)}%`, height: 26, borderRadius: 13, background: T }} /></div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 38, top: 36, opacity: prog(t, 30.94, 0.3), fontFamily: MONT, fontWeight: 900, fontSize: 24, color: "#fff", background: "#0b7a5f", padding: "8px 16px", borderRadius: 10 }}>CLARAS</div>
    </div>
  );
};

// P3 · sin volverte técnico, sin depender de una agencia
const ScrSin: React.FC = () => {
  const t = useT();
  const Row: React.FC<{ at: number; label: string }> = ({ at, label }) => {
    const x = prog(t, at + 0.45, 0.3);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 22, background: "#fff", borderRadius: 16, padding: "20px 26px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)", opacity: prog(t, at, 0.3), transform: `translateX(${(1 - prog(t, at, 0.35)) * 60}px)` }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: x > 0.5 ? "#E5484D" : "#D5D9DF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" /></svg>
        </div>
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 38, color: "#222", textDecoration: x > 0.5 ? "line-through" : "none", textDecorationThickness: 4, textDecorationColor: "#E5484D" }}>{label}</span>
      </div>
    );
  };
  return (
    <div style={{ width: 840, height: 620, background: "#F3F5F7", padding: 28, boxSizing: "border-box" }}>
      <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 30, letterSpacing: 3, color: "#0b7a5f", marginBottom: 20, opacity: prog(t, 31.8, 0.3) }}>NO NECESITÁS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Row at={31.92} label="Volverte técnico" />
        <Row at={33.3} label="Depender de una agencia" />
      </div>
    </div>
  );
};

// F3 · plataforma de implementación gratis por 60 días
const ScrPlataforma: React.FC = () => {
  const t = useT();
  const b = pop(t, 37.92, 0.5);
  const tiles = Array.from({ length: 9 });
  return (
    <div style={{ width: 800, height: 1280, position: "relative", background: "#F3F5F7" }}>
      <div style={{ background: DARK, color: "#fff", padding: "54px 30px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: prog(t, 36.74, 0.3) }}>
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>Plataforma de<br /><span style={{ color: T }}>implementación</span></span>
        <span style={{ transform: `scale(${b})`, background: T, color: "#061416", fontFamily: MONT, fontWeight: 900, fontSize: 28, padding: "10px 20px", borderRadius: 40, textAlign: "center", lineHeight: 1.05 }}>GRATIS<br />60 días</span>
      </div>
      <div style={{ padding: "34px 30px 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {tiles.map((_, i) => {
          const at = 37.0 + i * 0.12;
          const gpt = i % 3 === 1;
          return (
            <div key={i} style={{ height: 250, borderRadius: 22, background: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.12)", padding: 20, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: prog(t, at, 0.3), transform: `scale(${0.7 + 0.3 * pop(t, at, 0.45)})` }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: gpt ? DARK : T, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {gpt ? <svg width="34" height="34" viewBox="0 0 24 24"><path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3Z" fill={T} /></svg> : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#061416" strokeWidth="2.2" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>}
              </div>
              <div><div style={{ height: 12, borderRadius: 6, background: "#E7EAEE", marginBottom: 8 }} /><div style={{ height: 12, width: "60%", borderRadius: 6, background: "#E7EAEE" }} /></div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 30, right: 30, bottom: 60, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 14 }}>
          {[[39.68, "APPS", T, "#061416"], [40.14, "GPTs", DARK, T]].map(([at, l, bg, fg]) => (
            <div key={String(l)} style={{ transform: `scale(${pop(t, at as number, 0.4)})`, background: bg as string, color: fg as string, fontFamily: MONT, fontWeight: 900, fontSize: 38, padding: "10px 30px", borderRadius: 40 }}>{l as string}</div>
          ))}
        </div>
        <div style={{ opacity: prog(t, 41.26, 0.3), fontFamily: MONT, fontWeight: 800, fontSize: 32, color: "#0b7a5f" }}>entrenadas para el mercado inmobiliario</div>
      </div>
    </div>
  );
};

// P4/P5 · las herramientas de la plataforma (2 tarjetas por pantalla)
const Tool: React.FC<{ at: number; label: string; children: React.ReactNode }> = ({ at, label, children }) => {
  const t = useT();
  return (
    <div style={{ flex: 1, background: "#fff", borderRadius: 22, boxShadow: "0 4px 14px rgba(0,0,0,0.12)", padding: 20, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: prog(t, at, 0.3), transform: `scale(${0.7 + 0.3 * pop(t, at, 0.45)})` }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
      <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 30, color: ink, lineHeight: 1.1, textAlign: "center" }}>{label}</div>
    </div>
  );
};
const ScrHerr1: React.FC = () => {
  const t = useT();
  const g = prog(t, 43.6, 1.0);
  return (
    <div style={{ width: 840, height: 620, background: "#F3F5F7", padding: 28, boxSizing: "border-box", display: "flex", gap: 22 }}>
      <Tool at={43.5} label="Analizá tu Instagram">
        <svg width="250" height="200" viewBox="0 0 250 200"><g fill={T}>{[0.35, 0.55, 0.45, 0.8, 1].map((h, i) => <rect key={i} x={14 + i * 46} y={190 - 170 * h * g} width="32" height={170 * h * g} rx="6" />)}</g><path d="M14 150 L70 110 L116 125 L160 70 L236 24" fill="none" stroke="#0F2B2E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="320" strokeDashoffset={320 * (1 - g)} /></svg>
      </Tool>
      <Tool at={45.06} label="Carruseles completos">
        <div style={{ position: "relative", width: 250, height: 200 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 10 + i * 56 * prog(t, 45.3 + i * 0.2, 0.4), top: 20 + i * 6, width: 130, height: 170, borderRadius: 14, background: i === 2 ? T : "#E7EAEE", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", padding: 12, boxSizing: "border-box" }}>
              <div style={{ height: 70, borderRadius: 8, background: i === 2 ? "#0F2B2E" : "#C9CED6" }} /><div style={{ height: 10, borderRadius: 5, background: "rgba(0,0,0,0.18)", marginTop: 12 }} /><div style={{ height: 10, width: "60%", borderRadius: 5, background: "rgba(0,0,0,0.18)", marginTop: 8 }} />
            </div>
          ))}
        </div>
      </Tool>
    </div>
  );
};
const ScrHerr2: React.FC = () => {
  const t = useT();
  const s = prog(t, 48.3, 0.9);
  const h = prog(t, 50.0, 0.8);
  return (
    <div style={{ width: 840, height: 620, background: "#F3F5F7", padding: 28, boxSizing: "border-box", display: "flex", gap: 22 }}>
      <Tool at={47.96} label="Home staging con IA">
        <svg width="250" height="200" viewBox="0 0 250 200">
          <rect x="6" y="14" width="238" height="176" rx="10" fill="#E7EAEE" />
          <rect x="125" y="14" width="119" height="176" rx="10" fill="#fff" />
          <g opacity={s}><rect x="140" y="110" width="90" height="42" rx="8" fill={T} /><rect x="146" y="92" width="78" height="26" rx="8" fill="#0F2B2E" /><rect x="150" y="152" width="8" height="18" fill="#0F2B2E" /><rect x="212" y="152" width="8" height="18" fill="#0F2B2E" /><circle cx="205" cy="54" r="16" fill="#C9CED6" /></g>
          <line x1="125" y1="14" x2="125" y2="190" stroke="#0F2B2E" strokeWidth="5" /><circle cx="125" cy="102" r="14" fill="#fff" stroke="#0F2B2E" strokeWidth="5" />
        </svg>
      </Tool>
      <Tool at={49.72} label="Imágenes más humanas">
        <svg width="250" height="200" viewBox="0 0 250 200">
          <circle cx="125" cy="92" r="62" fill="#E7EAEE" />
          <path d="M125 30 A62 62 0 0 0 125 154 Z" fill="none" stroke="#0F2B2E" strokeWidth="4" strokeDasharray="8 8" />
          <circle cx="102" cy="82" r="7" fill="#0F2B2E" /><circle cx="148" cy="82" r="7" fill="#0F2B2E" />
          <path d={`M100 ${112 - 8 * h} Q125 ${112 + 30 * h} 150 ${112 - 8 * h}`} fill="none" stroke="#0F2B2E" strokeWidth="6" strokeLinecap="round" />
          <circle cx="86" cy="104" r="10" fill={T} opacity={0.7 * h} /><circle cx="164" cy="104" r="10" fill={T} opacity={0.7 * h} />
          <path d="M60 190 Q125 130 190 190" fill="#0F2B2E" opacity="0.9" />
        </svg>
      </Tool>
    </div>
  );
};

// captura blanca final: el acceso llega por WhatsApp
const WaShot: React.FC = () => {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 26px" }}>
      <div style={{ width: 78, height: 78, borderRadius: 20, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(t, 56.5, 0.45)})` }}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.3-1.6-2.2-1.1-.9.7a4.4 4.4 0 0 1-2-2l.7-.9-1.1-2.2L9 8.5Z" fill="#fff" stroke="none" /></svg>
      </div>
      <div style={{ opacity: prog(t, 56.7, 0.3) }}>
        <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 32, color: ink }}>WhatsApp</div>
        <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 26, color: "#0b7a5f" }}>Tu acceso a la masterclass</div>
      </div>
      <div style={{ marginLeft: "auto", fontFamily: MONT, fontWeight: 700, fontSize: 22, color: "#999" }}>ahora</div>
    </div>
  );
};

// ---------- placa final: logo MDI + cuenta ----------
const In: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const t = useT();
  const p = prog(t, at, 0.4);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 24}px)` }}>{children}</div>;
};
const EndPlate: React.FC = () => {
  const t = useT();
  const s = SRC_DUR;
  if (t < s - 0.3) return null;
  const o = prog(t, s - 0.3, 0.35);
  return (
    <AbsoluteFill style={{ opacity: o, background: `radial-gradient(ellipse at 50% 40%, #0E3A38 0%, ${BG} 60%, #020707 100%)`, filter: `blur(${(1 - o) * 14}px)` }}>
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <Img src={staticFile("img/office-left.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(14px) brightness(0.5)", mixBlendMode: "luminosity" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, display: "flex", justifyContent: "center", transform: `scale(${0.8 + 0.2 * pop(t, s + 0.05, 0.6)})`, opacity: prog(t, s + 0.05, 0.4) }}>
        <Img src={staticFile("img/mdi-logo-oscuro.png")} style={{ width: 560, filter: `drop-shadow(0 0 18px ${T}66)` }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center" }}>
        <In at={s + 0.5}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 48, color: W }}>@mktdginmobiliario</div></In>
        <In at={s + 0.8}><div style={{ fontFamily: SCRIPT, fontSize: 84, color: TL, textShadow: neon(0.5), marginTop: 24 }}>10 de noviembre · 19 hs</div></In>
        <In at={s + 1.0}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: W, letterSpacing: 4, marginTop: 6 }}>MASTERCLASS ONLINE GRATUITA</div></In>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 66, top: 262, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: "#ffffffc0", textShadow: "0 2px 8px rgba(0,0,0,0.7)", letterSpacing: 1 }}>✦ generado con IA</div>
);

// ---------- sonido ----------
type Sfx = { at: number; f: "whoosh" | "pop" | "ding" | "click" | "boom"; v?: number };
const SFX: Sfx[] = [
  { at: 1.45, f: "whoosh", v: 0.3 }, { at: 3.3, f: "pop", v: 0.22 }, { at: 4.3, f: "ding", v: 0.28 },
  { at: 5.2, f: "whoosh", v: 0.22 }, { at: 5.84, f: "click", v: 0.28 }, { at: 6.7, f: "click", v: 0.28 }, { at: 8.66, f: "click", v: 0.3 },
  { at: 10.9, f: "pop", v: 0.3 }, { at: 12.28, f: "click", v: 0.25 }, { at: 13.5, f: "click", v: 0.25 }, { at: 14.3, f: "whoosh", v: 0.25 },
  { at: 21.45, f: "whoosh", v: 0.3 }, { at: 22.9, f: "pop", v: 0.28 }, { at: 25.04, f: "pop", v: 0.22 }, { at: 25.6, f: "pop", v: 0.22 }, { at: 26.18, f: "pop", v: 0.22 }, { at: 26.76, f: "pop", v: 0.22 },
  { at: 27.14, f: "whoosh", v: 0.22 }, { at: 30.38, f: "click", v: 0.25 }, { at: 31.78, f: "whoosh", v: 0.22 }, { at: 32.4, f: "pop", v: 0.25 }, { at: 33.75, f: "pop", v: 0.25 },
  { at: 34.9, f: "whoosh", v: 0.3 }, { at: 37.92, f: "ding", v: 0.32 }, { at: 39.68, f: "pop", v: 0.22 }, { at: 40.14, f: "pop", v: 0.22 },
  { at: 42.8, f: "whoosh", v: 0.22 }, { at: 43.5, f: "pop", v: 0.22 }, { at: 45.06, f: "pop", v: 0.22 }, { at: 47.8, f: "whoosh", v: 0.22 }, { at: 47.96, f: "pop", v: 0.22 }, { at: 49.72, f: "pop", v: 0.22 },
  { at: 52.94, f: "boom", v: 0.32 }, { at: 56.5, f: "ding", v: 0.3 },
  { at: SRC_DUR - 0.25, f: "whoosh", v: 0.35 }, { at: SRC_DUR + 0.5, f: "ding", v: 0.3 },
];
const Sounds: React.FC = () => (
  <>
    {SFX.map((s, i) => (
      <Sequence key={i} from={Math.round(s.at * FPS)} durationInFrames={FPS * 3}>
        <Audio src={staticFile(`sfx/${s.f}.wav`)} volume={s.v ?? 0.3} />
      </Sequence>
    ))}
  </>
);

export const Main: React.FC = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence durationInFrames={Math.round(SRC_DUR * FPS)}>
        <Cam />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 50%, rgba(2,8,9,0.35) 100%)" }} />
        <HideBurned />
      </Sequence>
      {/* PiP abajo (Clara arriba) */}
      <TiltCard from={PIP.orden[0]} to={PIP.orden[1]} mode="pip"><ScrOrden /></TiltCard>
      <TiltCard from={PIP.plan[0]} to={PIP.plan[1]} mode="pip" swing={-1}><ScrPlan /></TiltCard>
      <TiltCard from={PIP.sin[0]} to={PIP.sin[1]} mode="pip"><ScrSin /></TiltCard>
      <TiltCard from={PIP.herr1[0]} to={PIP.herr1[1]} mode="pip" swing={-1}><ScrHerr1 /></TiltCard>
      <TiltCard from={PIP.herr2[0]} to={PIP.herr2[1]} mode="pip"><ScrHerr2 /></TiltCard>
      {/* captura blanca sobre el pecho + título con eco script */}
      <ShotCard from={INVITE[0]} to={INVITE[1]} top={880} width={780}><Invite /></ShotCard>
      <BigTitle from={14.3} to={INVITE[1]} text="MASTERCLASS" echo="online gratuita" />
      <ShotCard from={56.4} to={SRC_DUR} top={900} width={780}><WaShot /></ShotCard>
      <BigTitle from={52.94} to={SRC_DUR} text="10 DE NOVIEMBRE" echo="19 hs" />
      {/* cortes a b-roll de pantalla completa */}
      <TiltCard from={FULL.dias[0]} to={FULL.dias[1]}><ScrDias /></TiltCard>
      <TiltCard from={FULL.mapa[0]} to={FULL.mapa[1]} swing={-1}><ScrMapa /></TiltCard>
      <TiltCard from={FULL.plataforma[0]} to={FULL.plataforma[1]}><ScrPlataforma /></TiltCard>
      <Captions list={CAPS} words={WORDS as WordT[]} y={capY} />
      <EndPlate />
      <Watermark />
      <Sounds />
    </AbsoluteFill>
  );
};
