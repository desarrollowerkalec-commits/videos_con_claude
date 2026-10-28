// Motion graphics (estética tech/explainer de la marca): line-art en el color del ángulo con glow,
// fondo oscuro, kicker "● ...", textos que entran palabra por palabra. Ver marcas/daniela-werkalec/estilo.md.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, TITLE, BODY, TRUEFATE, REMARK_SERIF } from "./theme";
import { useT, prog, pop } from "./lib";
import { NeuralBgV } from "./reel";

/** Zona segura de Instagram (estilo.md): contenido entre x 60–940 (centro 500) e y ≤ 1500. */
export const SAFE = { left: 60, right: 940, cx: 500, bottom: 1500 };

const RED = "#FF5A5F";
const glow = (c: string, r = 10) => `drop-shadow(0 0 ${r}px ${c})`;
const dash = (t: number, at: number, dur: number, len: number) => len * (1 - prog(t, at, dur));

// ---------- contenedor a pantalla completa (tapa la cámara, entra con un círculo que se abre) ----------
export const FullScreen: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const t = useT();
  if (t < from - 0.02 || t > to + 0.3) return null;
  const pin = prog(t, from, 0.4);
  const pout = prog(t, to, 0.28);
  const ring = prog(t, from, 0.55);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${pin * 120}% at 50% 46%)`, opacity: 1 - pout, transform: `scale(${1 + 0.05 * pout})` }}>
      <AbsoluteFill style={{ background: C.bg }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 85% 55% at 50% 42%, ${C.angle}24 0%, rgba(11,10,16,0) 62%)` }} />
      <NeuralBgV />
      {children}
      {/* anillo de entrada */}
      {ring < 1 && (
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 2400 * ring, height: 2400 * ring, borderRadius: "50%", border: `6px solid ${C.angle}`, opacity: 1 - ring, boxShadow: `0 0 40px ${C.angle}`, marginTop: -150 }} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const Kicker: React.FC<{ at: number; text: string; top?: number }> = ({ at, text, top = 300 }) => {
  const t = useT();
  const p = prog(t, at, 0.4);
  return (
    <div style={{ position: "absolute", top, left: 60, right: 140, textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
      <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: C.angle, textShadow: `0 0 14px ${C.angle}88` }}>● {text}</span>
    </div>
  );
};

/** Palabra/frase que entra (fade + subida + leve escala). */
type KW = { t: string; at: number; color?: string; font?: string; size?: number; italic?: boolean; weight?: number; big?: boolean };
const KWord: React.FC<{ w: KW }> = ({ w }) => {
  const t = useT();
  const p = w.big ? pop(t, w.at, 0.5) : prog(t, w.at, 0.32);
  const op = Math.min(1, prog(t, w.at, 0.2) * 1.2);
  const color = w.color ?? C.text;
  const shadow = w.big ? `0 0 38px ${color}, 0 0 80px ${color}99, 0 3px 12px rgba(0,0,0,.6)` : "0 3px 12px rgba(0,0,0,.6)";
  return (
    <span style={{ display: "inline-block", opacity: op, transform: `translateY(${(1 - p) * 30}px) scale(${0.85 + 0.15 * p})`, fontFamily: w.font ?? TITLE, fontWeight: w.weight ?? (w.font === TRUEFATE ? 400 : 800), fontStyle: w.italic ? "italic" : "normal", fontSize: w.size ?? 64, color, textShadow: shadow, lineHeight: 1.05 }}>
      {w.t}
    </span>
  );
};
export const Headline: React.FC<{ lines: KW[][]; top: number; gap?: number }> = ({ lines, top, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 60, right: 140, display: "flex", flexDirection: "column", alignItems: "center", gap }}>
    {lines.map((ln, i) => (
      <div key={i} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "baseline", gap: "0 18px", textAlign: "center" }}>
        {ln.map((w, j) => <KWord key={j} w={w} />)}
      </div>
    ))}
  </div>
);

// ---------- piezas line-art ----------
const PropertyCard: React.FC<{ at: number; x: number; y: number; w?: number; label?: string }> = ({ at, x, y, w = 300, label = "Depto 2 amb · Centro" }) => {
  const t = useT();
  if (t < at - 0.05) return null;
  const p = pop(t, at, 0.5);
  const h = w * 0.78;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `scale(${p})`, borderRadius: 22, border: `3px solid ${C.angle}`, background: "rgba(56,182,255,0.07)", boxShadow: `0 0 30px ${C.angle}66`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <svg width={w * 0.38} height={w * 0.32} viewBox="0 0 24 20" style={{ filter: glow(C.angle, 6) }}>
        <path d="M2 10 L12 2 L22 10 M4.5 8.5 V19 H19.5 V8.5 M10 19 V13 H14 V19" fill="none" stroke={C.angle} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: w * 0.085, color: C.text }}>{label}</div>
    </div>
  );
};

/** Persona line-art (cabeza + hombros). state: null | "ok" | "no" */
const Person: React.FC<{ x: number; y: number; at: number; state?: "ok" | "no" | null; stateAt?: number; s?: number }> = ({ x, y, at, state, stateAt = 99, s = 1 }) => {
  const t = useT();
  if (t < at - 0.05) return null;
  const p = pop(t, at, 0.45);
  const q = prog(t, stateAt, 0.3);
  const col = state === "no" && q > 0 ? RED : C.angle;
  const dim = state === "no" ? 1 - 0.45 * q : 1;
  return (
    <div style={{ position: "absolute", left: x - 60 * s, top: y - 60 * s, width: 120 * s, height: 140 * s, transform: `scale(${p})`, opacity: dim }}>
      <svg width={120 * s} height={120 * s} viewBox="0 0 60 60" style={{ filter: glow(col, 7) }}>
        <circle cx="30" cy="20" r="10" fill="none" stroke={col} strokeWidth="2.4" />
        <path d="M10 54 C10 40 18 34 30 34 C42 34 50 40 50 54" fill="none" stroke={col} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {state && q > 0 && (
        <div style={{ position: "absolute", right: -6 * s, top: -4 * s, width: 46 * s, height: 46 * s, borderRadius: "50%", background: state === "ok" ? C.angle : RED, transform: `scale(${pop(t, stateAt, 0.4)})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 18px ${state === "ok" ? C.angle : RED}` }}>
          <svg width={26 * s} height={26 * s} viewBox="0 0 24 24">
            {state === "ok" ? <path d="M5 12.5 L10 17 L19 7" fill="none" stroke="#0B0A10" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M6 6 L18 18 M18 6 L6 18" stroke="#0B0A10" strokeWidth="3.4" strokeLinecap="round" />}
          </svg>
        </div>
      )}
    </div>
  );
};

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; at: number; dur?: number; color?: string; dashed?: boolean }> = ({ x1, y1, x2, y2, at, dur = 0.45, color = C.angle, dashed }) => {
  const t = useT();
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg width="1080" height="1920" style={{ position: "absolute", left: 0, top: 0, filter: glow(color, 6) }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeOpacity="0.85" strokeDasharray={dashed ? "10 12" : `${len}`} strokeDashoffset={dashed ? 0 : dash(t, at, dur, len)} opacity={dashed ? prog(t, at, dur) : 1} />
    </svg>
  );
};

// ================= 0 · GANCHO: ¿a quién le muestra una propiedad? (2.3–4.2) =================
export const MgHook: React.FC = () => {
  const t = useT();
  return (
    <>
      <PropertyCard at={2.35} x={540} y={520} w={330} />
      <Line x1={480} y1={650} x2={300} y2={860} at={2.6} />
      <Line x1={600} y1={650} x2={780} y2={860} at={2.6} color={RED} dashed />
      {/* dos celulares */}
      {[{ x: 300, ok: true }, { x: 780, ok: false }].map((ph, i) => {
        const p = pop(t, 2.55 + i * 0.1, 0.45);
        const r = prog(t, ph.ok ? 3.0 : 3.5, 0.3);
        const col = ph.ok ? C.angle : RED;
        return (
          <div key={i} style={{ position: "absolute", left: ph.x - 105, top: 870, width: 210, height: 380, borderRadius: 34, border: `3px solid ${r > 0 ? col : C.angle}`, boxShadow: `0 0 26px ${(r > 0 ? col : C.angle)}66`, transform: `scale(${p})`, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ opacity: r, transform: `scale(${0.6 + 0.4 * pop(t, ph.ok ? 3.0 : 3.5, 0.4)})` }}>
              {ph.ok ? (
                <svg width="110" height="92" viewBox="0 0 24 20" style={{ filter: glow(C.angle, 6) }}><path d="M2 10 L12 2 L22 10 M4.5 8.5 V19 H19.5 V8.5 M10 19 V13 H14 V19" fill="none" stroke={C.angle} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" /></svg>
              ) : (
                <svg width="100" height="100" viewBox="0 0 24 24" style={{ filter: glow(RED, 6) }}><circle cx="12" cy="12" r="9" fill="none" stroke={RED} strokeWidth="2" /><path d="M5.6 5.6 L18.4 18.4" stroke={RED} strokeWidth="2" /></svg>
              )}
            </div>
          </div>
        );
      })}
      <Headline top={1320} lines={[[{ t: "¿A quién", at: 2.64, size: 70 }, { t: "le muestra", at: 2.9, size: 70 }], [{ t: "una propiedad?", at: 3.24, font: TRUEFATE, size: 110, color: C.yellow, big: true }]]} />
    </>
  );
};

// ================= 1 · ALGORITMO: qué ve cada persona / quién controla los criterios (9.3–14.45) =================
const USERS = [
  { x: 150, s: "ok" as const },
  { x: 345, s: "no" as const },
  { x: 540, s: "ok" as const },
  { x: 735, s: "no" as const },
  { x: 930, s: "ok" as const },
];
export const MgAlgoritmo: React.FC = () => {
  const t = useT();
  const spin = t * 40;
  const nodeP = pop(t, 9.64, 0.5);
  const crit = prog(t, 12.52, 0.4);
  return (
    <>
      <Kicker at={9.34} text="CÓMO DECIDE UN ALGORITMO" />
      <PropertyCard at={9.4} x={540} y={470} w={260} />
      <Line x1={540} y1={575} x2={540} y2={630} at={9.6} dur={0.3} />
      {/* nodo ALGORITMO */}
      <div style={{ position: "absolute", left: 540 - 110, top: 640, width: 220, height: 220, transform: `scale(${nodeP})` }}>
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: "absolute", filter: glow(C.angle, 10) }}>
          <circle cx="110" cy="110" r="100" fill="none" stroke={C.angle} strokeWidth="3" strokeDasharray="14 12" transform={`rotate(${spin} 110 110)`} />
          <circle cx="110" cy="110" r="78" fill="rgba(56,182,255,0.10)" stroke={C.angle} strokeWidth="3" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITLE, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: C.text }}>ALGORITMO</div>
      </div>
      {USERS.map((u, i) => (
        <React.Fragment key={i}>
          <Line x1={540} y1={860} x2={u.x} y2={985} at={10.14 + i * 0.12} dur={0.4} color={u.s === "no" && t > 11.3 ? RED : C.angle} />
          <Person x={u.x} y={1040} at={10.2 + i * 0.12} state={u.s} stateAt={11.22 + i * 0.12} s={0.95} />
        </React.Fragment>
      ))}
      {/* panel de criterios: ¿quién los controla? */}
      {t > 12.45 && (
        <div style={{ position: "absolute", left: 120, right: 120, top: 1170, opacity: crit, transform: `translateY(${(1 - crit) * 30}px)`, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          {["zona", "edad", "ingresos", "historial"].map((c, i) => {
            const on = Math.sin(t * 9 + i * 2.1) > 0;
            return (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 40, border: `2px solid ${C.angle}88`, background: "rgba(11,10,16,.7)", opacity: prog(t, 12.6 + i * 0.12, 0.25) }}>
                <div style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.angle : "rgba(255,255,255,.2)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: 9, background: "#fff" }} />
                </div>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: C.text }}>{c}</span>
              </div>
            );
          })}
        </div>
      )}
      <Headline top={1340} lines={[[{ t: "¿Quién controla", at: 12.52, size: 66 }], [{ t: "los criterios?", at: 13.16, font: TRUEFATE, size: 104, color: C.yellow, big: true }]]} />
    </>
  );
};

// ================= 2 · LA PREGUNTA: rol de colegios e instituciones (48.75–54.6) =================
export const MgColegios: React.FC = () => {
  const t = useT();
  const P = 640;
  return (
    <>
      <Kicker at={48.8} text="UNA PREGUNTA FUNDAMENTAL" />
      <svg width="420" height="320" viewBox="0 0 140 106" style={{ position: "absolute", left: 330, top: 370, filter: glow(C.angle, 8) }}>
        <path d="M6 32 L70 4 L134 32 Z M10 38 H130 M20 44 V88 M46 44 V88 M94 44 V88 M120 44 V88 M8 94 H132 M2 102 H138" fill="none" stroke={C.angle} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={P} strokeDashoffset={dash(t, 48.85, 1.1, P)} />
      </svg>
      <Headline
        top={760}
        gap={14}
        lines={[
          [{ t: "¿Qué rol", at: 48.8, size: 72 }, { t: "tienen que asumir", at: 49.28, size: 72 }],
          [{ t: "nuestros", at: 50.08, font: REMARK_SERIF, italic: true, weight: 400, size: 70 }, { t: "colegios", at: 50.42, font: TRUEFATE, size: 150, color: C.yellow, big: true }],
          [{ t: "e instituciones profesionales", at: 51.04, size: 58 }],
          [{ t: "frente a esta", at: 52.98, font: REMARK_SERIF, italic: true, weight: 400, size: 62, color: C.angle }, { t: "transformación?", at: 53.46, size: 70, color: C.angle }],
        ]}
      />
    </>
  );
};

// ================= 3 · EL DEBATE: puede vs debería, límites, responsabilidad (57.5–68.1) =================
const DEBE = [
  { at: 62.28, pre: "¿Qué", key: "DEBERÍA", post: "hacer?" },
  { at: 63.56, pre: "¿Con qué", key: "LÍMITES", post: "?" },
  { at: 65.06, pre: "¿Quién se hace", key: "RESPONSABLE", post: "?" },
];
export const MgDebate: React.FC = () => {
  const t = useT();
  const strike = prog(t, 61.08, 0.5);
  const a = pop(t, 57.58, 0.5);
  return (
    <>
      <Kicker at={57.55} text="EL DEBATE QUE FALTA" />
      {/* lo que PUEDE hacer → tachado */}
      <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${a})` }}>
        <div style={{ position: "relative", padding: "18px 36px", borderRadius: 22, border: `2px solid rgba(255,255,255,${0.5 - 0.3 * strike})`, opacity: 1 - 0.5 * strike }}>
          <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 56, color: C.text }}>¿Qué <span style={{ color: C.yellow }}>PUEDE</span> hacer la IA?</span>
          <div style={{ position: "absolute", left: 20, top: "52%", height: 6, width: `${strike * 92}%`, background: RED, borderRadius: 3, boxShadow: `0 0 12px ${RED}` }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 520, left: 0, right: 0, textAlign: "center", opacity: prog(t, 61.1, 0.35), fontFamily: BODY, fontWeight: 600, fontSize: 32, color: RED, letterSpacing: 2 }}>ya no alcanza</div>
      {DEBE.map((r, i) => {
        if (t < r.at - 0.05) return null;
        const p = prog(t, r.at, 0.4);
        const ck = 40;
        return (
          <div key={i} style={{ position: "absolute", top: 640 + i * 175, left: 80, right: 80, opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "26px 34px", borderRadius: 24, border: `2px solid ${C.angle}`, background: "rgba(11,10,16,.72)", boxShadow: `0 0 28px ${C.angle}44` }}>
              <svg width="62" height="62" viewBox="0 0 24 24" style={{ flexShrink: 0, filter: glow(C.angle, 6) }}>
                <circle cx="12" cy="12" r="10.5" fill="none" stroke={C.angle} strokeWidth="1.8" />
                <path d="M7 12.5 L10.5 16 L17.5 8.5" fill="none" stroke={C.angle} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={ck} strokeDashoffset={dash(t, r.at + 0.15, 0.35, ck)} />
              </svg>
              <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 50, color: C.text, lineHeight: 1.1 }}>
                {r.pre} <span style={{ color: C.yellow }}>{r.key}</span>{r.post === "?" ? "?" : ` ${r.post}`}
              </span>
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 1180, left: 0, right: 0, textAlign: "center", opacity: prog(t, 66.34, 0.4), fontFamily: REMARK_SERIF, fontStyle: "italic", fontSize: 48, color: "rgba(255,255,255,.85)" }}>…de las decisiones.</div>
    </>
  );
};

// ================= 4 · (parcial, abajo) BALANZA: tecnología sin perder lo valioso (68.05–76.6) =================
export const MgBalanza: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.4) return null;
  const p = prog(t, from, 0.45);
  const out = prog(t, to, 0.35);
  const tilt = interpolate3(t, [70.2, 72.6, 74.98, 75.6], [0, -9, -9, 0]);
  const vals = ["confianza", "criterio", "vínculo"];
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1275, height: 305, opacity: p * (1 - out), transform: `translateY(${(1 - p) * 40}px)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "rgba(11,10,16,.8)", border: `2px solid ${C.angle}66`, boxShadow: `0 0 30px ${C.angle}33` }} />
      {/* fulcro */}
      <svg width="940" height="305" viewBox="0 0 940 305" style={{ position: "absolute", left: 0, top: 0, filter: glow(C.angle, 6) }}>
        <path d="M470 150 L442 228 H498 Z" fill="none" stroke={C.angle} strokeWidth="3" strokeLinejoin="round" />
        <g transform={`rotate(${tilt} 470 150)`}>
          <line x1="130" y1="150" x2="810" y2="150" stroke={C.angle} strokeWidth="4" strokeLinecap="round" />
          <circle cx="470" cy="150" r="9" fill={C.angle} />
        </g>
      </svg>
      {/* platillo izquierdo: tecnología */}
      <div style={{ position: "absolute", left: 60, width: 300, top: 150 + Math.sin((tilt * Math.PI) / 180) * -340 - 112, display: "flex", justifyContent: "center", opacity: prog(t, 71.74, 0.35) }}>
        <div style={{ padding: "14px 26px", borderRadius: 40, background: C.angle, fontFamily: TITLE, fontWeight: 900, fontSize: 38, color: "#0B0A10", boxShadow: `0 0 24px ${C.angle}` }}>✦ IA</div>
      </div>
      {/* platillo derecho: lo más valioso */}
      <div style={{ position: "absolute", right: 30, width: 360, top: 150 + Math.sin((tilt * Math.PI) / 180) * 340 - 128, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
        {vals.map((v, i) => (
          <div key={v} style={{ padding: "8px 18px", borderRadius: 30, border: `2px solid ${C.text}`, fontFamily: BODY, fontWeight: 600, fontSize: 30, color: C.text, opacity: prog(t, 74.4 + i * 0.3, 0.3), transform: `scale(${0.6 + 0.4 * pop(t, 74.4 + i * 0.3, 0.4)})` }}>{v}</div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 16, textAlign: "center", fontFamily: BODY, fontWeight: 600, fontSize: 25, letterSpacing: 4, color: C.angle, opacity: prog(t, 68.3, 0.4) }}>● TECNOLOGÍA SIN PERDER LO VALIOSO</div>
    </div>
  );
};
function interpolate3(t: number, xs: number[], ys: number[]) {
  if (t <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (t <= xs[i]) {
      const q = (t - xs[i - 1]) / (xs[i] - xs[i - 1]);
      const e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
      return ys[i - 1] + (ys[i] - ys[i - 1]) * e;
    }
  }
  return ys[ys.length - 1];
}

// ================= 5 · CONVERSACIONES: no respuestas fáciles (86.8–90.85) =================
const BUBBLES = [
  { at: 88.7, side: "l", text: "¿Quién controla el algoritmo?" },
  { at: 89.0, side: "r", text: "¿Qué límites ponemos?" },
  { at: 89.3, side: "l", text: "¿Y la responsabilidad?" },
  { at: 89.6, side: "r", text: "¿Cómo acompañamos al corredor?" },
];
export const MgConversa: React.FC = () => {
  const t = useT();
  const s = prog(t, 87.76, 0.45);
  const a = pop(t, 86.9, 0.45);
  return (
    <>
      <Kicker at={86.85} text="ABRIR LA CONVERSACIÓN" />
      <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${a * (1 - 0.15 * s)})`, opacity: 1 - 0.55 * s }}>
        <div style={{ position: "relative", padding: "14px 32px", borderRadius: 40, border: "2px solid rgba(255,255,255,.6)" }}>
          <span style={{ fontFamily: TITLE, fontWeight: 800, fontSize: 50, color: C.text }}>respuestas fáciles</span>
          <div style={{ position: "absolute", left: 18, top: "52%", height: 6, width: `${s * 90}%`, background: RED, borderRadius: 3, boxShadow: `0 0 12px ${RED}` }} />
        </div>
      </div>
      {BUBBLES.map((b, i) => {
        if (t < b.at - 0.05) return null;
        const p = pop(t, b.at, 0.45);
        const left = b.side === "l";
        return (
          <div key={i} style={{ position: "absolute", top: 560 + i * 150, left: left ? 80 : undefined, right: left ? undefined : 80, transform: `scale(${p})`, transformOrigin: left ? "0% 100%" : "100% 100%" }}>
            <div style={{ padding: "22px 30px", borderRadius: 30, borderBottomLeftRadius: left ? 6 : 30, borderBottomRightRadius: left ? 30 : 6, background: left ? "rgba(56,182,255,0.14)" : C.angle, border: `2px solid ${C.angle}`, boxShadow: `0 0 22px ${C.angle}55`, fontFamily: BODY, fontWeight: 600, fontSize: 38, color: left ? C.text : "#0B0A10" }}>
              {b.text}
            </div>
          </div>
        );
      })}
      <Headline top={1210} lines={[[{ t: "conversaciones", at: 89.3, size: 70 }], [{ t: "necesarias", at: 89.92, font: TRUEFATE, size: 120, color: C.yellow, big: true }]]} />
    </>
  );
};
