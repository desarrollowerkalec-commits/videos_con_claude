// Werkalec · reel 01 (CRM → ARM) — prueba de estilo con b-rolls de motion graphics.
import React from "react";
import {
  AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile,
  useCurrentFrame, useVideoConfig, Easing,
} from "remotion";
import { loadFont as loadCorm } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSansCondensed";
import { WORDS, DURATION } from "./words";

const CORM = loadCorm("normal", { weights: ["600", "700"] }).fontFamily;
const CORM_I = loadCorm("italic", { weights: ["600", "700"] }).fontFamily;
const MONT = loadMont("normal", { weights: ["500", "700", "800"] }).fontFamily;
const PLEX = loadPlex("normal", { weights: ["700"] }).fontFamily;

const C = {
  gold: "#C6A37B", orange: "#FEB050", glow: "#FDB680", red: "#BB0925",
  navy: "#1E2532", gray: "#848484", white: "#FFFFFF",
};
const END = 3.2;
export const TOTAL = DURATION + END;
const FPS = 30;
const f = (s: number) => Math.round(s * FPS);

const useT = () => useCurrentFrame() / FPS;
const ease = Easing.bezier(0.2, 0.8, 0.2, 1);
const inOut = (t: number, a: number, b: number, d = 0.25) =>
  Math.min(interpolate(t, [a, a + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
    interpolate(t, [b - d, b], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
const pop = (frame: number, at: number, fps: number) =>
  spring({ frame: frame - f(at), fps, config: { damping: 13, stiffness: 160, mass: 0.7 } });

// ---------- tramos ----------
const HOOK: [number, number] = [0, 2.3];
const BR_TASKS: [number, number] = [6.4, 11.95];
const BRILLANTE: [number, number] = [14.45, 15.5];
const BR_ARM: [number, number] = [17.0, 22.4];
const BR_CHAT: [number, number] = [29.4, DURATION];
const NO_SUBS: [number, number][] = [HOOK, BRILLANTE, BR_ARM, [DURATION, 999]];
const SUB_Y = (t: number) => (t >= BR_CHAT[0] ? 1455 : t >= BR_TASKS[0] && t < BR_TASKS[1] ? 1350 : 1150);

const KEY = ["crm", "arm", "sistema", "equipo", "tecnología", "agentes", "inteligencia", "artificial", "whatsapp", "oportunidad", "real", "vos?", "vos."];

// ---------- base: Nicolás con grade cálido ----------
const Base: React.FC = () => {
  const t = useT();
  const z = interpolate(t, [0, DURATION], [1.0, 1.06]);
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile("base.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${z})`, filter: "saturate(0.9) contrast(1.05) brightness(0.92) sepia(0.12)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(0,0,0,0) 45%, rgba(10,8,6,0.55) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(30,20,10,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(20,12,6,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------- subtítulos 1–2 palabras ----------
type Chunk = { words: typeof WORDS; s: number; e: number };
const chunks: Chunk[] = (() => {
  const out: Chunk[] = []; let cur: typeof WORDS = [];
  const push = () => { if (cur.length) out.push({ words: cur, s: cur[0].s, e: cur[cur.length - 1].e }); cur = []; };
  for (const w of WORDS) {
    cur.push(w);
    const isKey = KEY.includes(w.w.toLowerCase().replace(/[¿¡,]/g, ""));
    if (cur.length >= 2 || /[.,?!]$/.test(w.w) || isKey) push();
  }
  push();
  for (let i = 0; i < out.length - 1; i++) out[i].e = Math.min(out[i + 1].s, out[i].e + 0.35);
  return out;
})();

const Subs: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  if (NO_SUBS.some(([a, b]) => t >= a && t < b)) return null;
  const c = chunks.find((k) => t >= k.s - 0.04 && t < k.e);
  if (!c) return null;
  const p = pop(frame, c.s - 0.04, fps);
  return (
    <div style={{ position: "absolute", top: SUB_Y(t), left: 90, right: 140, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 22, flexWrap: "wrap", transform: `translateY(-50%) scale(${0.85 + 0.15 * p})`, opacity: p }}>
      {c.words.map((w, i) => {
        const clean = w.w.replace(/[¿¡]/g, "").replace(/[.,]$/, "");
        const key = KEY.includes(w.w.toLowerCase().replace(/[¿¡,]/g, ""));
        return (
          <span key={i} style={{
            fontFamily: MONT, fontWeight: 800, fontSize: key ? 112 : 80, letterSpacing: -2, lineHeight: 1,
            color: key ? C.orange : C.white,
            textShadow: key ? `0 0 28px ${C.glow}99, 0 6px 18px rgba(0,0,0,.6)` : "0 6px 18px rgba(0,0,0,.55), 0 3px 6px rgba(0,0,0,.45)",
          }}>{clean}</span>
        );
      })}
    </div>
  );
};

// ---------- hook apilado ----------
const Hook: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  if (t >= HOOK[1]) return null;
  const out = interpolate(t, [HOOK[1] - 0.25, HOOK[1]], [1, 0], { extrapolateLeft: "clamp" });
  const l = (at: number) => { const p = pop(frame, at, fps); return { opacity: p * out, transform: `translateY(${(1 - p) * 40}px)` }; };
  return (
    <div style={{ position: "absolute", top: 345, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ ...l(0.05), fontFamily: PLEX, fontWeight: 700, fontSize: 112, color: C.white, letterSpacing: 1, lineHeight: 0.95, textShadow: "0 8px 24px rgba(0,0,0,.6)" }}>FELICITACIONES,</div>
      <div style={{ ...l(1.25), fontFamily: CORM_I, fontStyle: "italic", fontWeight: 700, fontSize: 118, color: C.orange, lineHeight: 1, textShadow: `0 0 30px ${C.glow}88, 0 6px 18px rgba(0,0,0,.6)` }}>compraste un CRM</div>
    </div>
  );
};

// ---------- "¡Brillante!" ----------
const Brillante: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  if (t < BRILLANTE[0] || t >= BRILLANTE[1]) return null;
  const p = pop(frame, BRILLANTE[0], fps); const o = inOut(t, BRILLANTE[0], BRILLANTE[1], 0.2);
  return (
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, textAlign: "center", opacity: o, transform: `scale(${0.7 + 0.3 * p}) rotate(${(1 - p) * -6}deg)` }}>
      <span style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 700, fontSize: 190, color: C.orange, textShadow: `0 0 40px ${C.glow}aa, 0 10px 30px rgba(0,0,0,.6)` }}>¡Brillante!</span>
    </div>
  );
};

// ---------- fondo de placa ----------
const NavyBg: React.FC<{ grain?: boolean }> = () => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #2C3548 0%, ${C.navy} 55%, #12161F 100%)` }} />
);

// ---------- B-roll A: tareas que se apilan ----------
const TASKS = [
  { at: 6.5, txt: "Cargar contactos", icon: "👤" },
  { at: 7.76, txt: "Actualizar oportunidades", icon: "📈" },
  { at: 9.4, txt: "Programar seguimientos", icon: "📅" },
  { at: 10.78, txt: "Controlar vendedores", icon: "👥" },
];
const BrollTasks: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const o = inOut(t, BR_TASKS[0], BR_TASKS[1], 0.3);
  const n = TASKS.filter((k) => t >= k.at).length;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <NavyBg />
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 76, color: C.gold }}>
        Tu “sistema” hoy:
      </div>
      {TASKS.map((k, i) => {
        const p = pop(frame, k.at, fps);
        if (t < k.at) return null;
        const rot = [-3, 2.5, -1.5, 3][i];
        return (
          <div key={i} style={{
            position: "absolute", left: 120, right: 120, top: 470 + i * 160, height: 140, borderRadius: 26,
            background: "#F7F4EF", display: "flex", alignItems: "center", gap: 30, padding: "0 36px",
            boxShadow: "0 20px 50px rgba(0,0,0,.45)", opacity: p,
            transform: `translateY(${(1 - p) * -260}px) rotate(${rot * p}deg) scale(${0.9 + 0.1 * p})`,
          }}>
            <div style={{ width: 62, height: 62, borderRadius: 14, border: `5px solid ${C.gray}` }} />
            <div style={{ flex: 1, fontFamily: MONT, fontWeight: 700, fontSize: 50, color: "#111", letterSpacing: -1 }}>{k.txt}</div>
            <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 26, color: C.white, background: C.gray, borderRadius: 30, padding: "8px 18px" }}>PENDIENTE</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 1165, left: 0, right: 0, textAlign: "center", fontFamily: PLEX, fontWeight: 700, fontSize: 64, color: C.white, opacity: n ? 1 : 0, letterSpacing: 2 }}>
        {n} DE {TASKS.length} · TODO A MANO
      </div>
    </AbsoluteFill>
  );
};

// ---------- B-roll B: CRM → ARM ----------
const BrollARM: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const o = inOut(t, BR_ARM[0], BR_ARM[1], 0.3);
  const pC = pop(frame, 17.85, fps);
  const strike = interpolate(t, [19.3, 19.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const pA = pop(frame, 19.42, fps);
  const words = [{ w: "Agentic", at: 20.5 }, { w: "Relationship", at: 21.04 }, { w: "Management", at: 21.64 }];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <NavyBg />
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontFamily: MONT, fontWeight: 700, fontSize: 44, color: C.gray, letterSpacing: 8, opacity: interpolate(t, [17.0, 17.3], [0, 1], { extrapolateRight: "clamp" }) }}>
        ESTAMOS PASANDO DEL
      </div>
      <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", fontFamily: PLEX, fontWeight: 700, fontSize: 250, lineHeight: 1, color: strike > 0 ? "#9AA0AA" : C.white, opacity: pC, transform: `scale(${0.8 + 0.2 * pC})` }}>
          CRM
          <div style={{ position: "absolute", left: -10, top: "52%", height: 16, width: `${strike * 105}%`, background: C.white, borderRadius: 8 }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 660, left: 0, right: 0, textAlign: "center", fontFamily: CORM_I, fontStyle: "italic", fontSize: 80, color: C.gold, opacity: pA }}>al</div>
      <div style={{ position: "absolute", top: 740, left: 0, right: 0, textAlign: "center", fontFamily: PLEX, fontWeight: 700, fontSize: 330, lineHeight: 1, color: C.orange, opacity: pA, transform: `translateY(${(1 - pA) * 80}px) scale(${0.85 + 0.15 * pA})`, textShadow: `0 0 60px ${C.glow}99` }}>
        ARM
      </div>
      <div style={{ position: "absolute", top: 1110, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {words.map((x, i) => {
          const p = pop(frame, x.at, fps);
          return (
            <div key={i} style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 104, lineHeight: 1.0, color: C.white, opacity: p, transform: `translateX(${(1 - p) * (i % 2 ? 60 : -60)}px)` }}>
              <span style={{ color: C.orange, fontWeight: 700 }}>{x.w[0]}</span>{x.w.slice(1)}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- B-roll C: consulta por WhatsApp → agente → CRM ----------
const MSGS = [
  { at: 29.5, me: false, txt: "Hola! Vi el depto de Fisherton, ¿sigue disponible?" },
  { at: 31.2, me: true, txt: "¡Hola! Sí 😊 ¿Lo buscás para vivir o para invertir?" },
  { at: 32.3, me: false, txt: "Para vivir, somos 3" },
  { at: 32.7, me: true, txt: "¿Tenés crédito aprobado o vendés otra propiedad?" },
  { at: 33.5, me: false, txt: "Crédito pre-aprobado 👍" },
];
const Corner: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div style={{ position: "absolute", left: x - 11, top: y - 11, width: 22, height: 22, borderRadius: 6, background: C.orange, boxShadow: `0 0 16px ${C.glow}` }} />
);
const BrollChat: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const o = inOut(t, BR_CHAT[0], BR_CHAT[1] + 0.3, 0.3);
  const enter = pop(frame, BR_CHAT[0], fps);
  const PX = 260, PY = 340, PW = 560, PH = 870;
  const shown = MSGS.filter((m) => t >= m.at);
  const tag = pop(frame, 34.1, fps);
  const crm = pop(frame, 35.2, fps);
  const stage = t >= 35.6;
  const typing = (t > 30.85 && t < 31.2) || (t > 32.45 && t < 32.7);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ background: "rgba(14,12,10,0.72)", backdropFilter: "blur(14px) grayscale(1)" }} />
      <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: PH, transform: `scale(${0.85 + 0.15 * enter}) translateY(${(1 - enter) * 120}px)`, transformOrigin: "50% 60%" }}>
        {/* marco de selección */}
        <div style={{ position: "absolute", inset: -34, border: `3px solid ${C.orange}`, opacity: 0.85 }} />
        <Corner x={-34} y={-34} /><Corner x={PW + 34} y={-34} /><Corner x={-34} y={PH + 34} /><Corner x={PW + 34} y={PH + 34} />
        {/* teléfono */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 64, background: "#0E1116", border: "10px solid #2A2D33", overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,.6)" }}>
          <div style={{ height: 130, background: "#1A1F26", display: "flex", alignItems: "center", gap: 22, padding: "30px 30px 0" }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("werkalec-isotipo.png")} style={{ width: 48, filter: "brightness(0) invert(1)" }} />
            </div>
            <div>
              <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: C.white }}>Agente IA</div>
              <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 24, color: typing ? C.orange : "#8A93A0" }}>{typing ? "escribiendo…" : "Inmobiliaria · en línea"}</div>
            </div>
          </div>
          <div style={{ position: "absolute", top: 140, left: 22, right: 22, bottom: 30, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 16 }}>
            {shown.map((m, i) => {
              const p = pop(frame, m.at, fps);
              return (
                <div key={i} style={{
                  alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "82%", padding: "18px 24px", borderRadius: 26,
                  borderBottomRightRadius: m.me ? 6 : 26, borderBottomLeftRadius: m.me ? 26 : 6,
                  background: m.me ? "#2D3A4F" : "#F3F1EC", color: m.me ? C.white : "#111",
                  fontFamily: MONT, fontWeight: 500, fontSize: 29, lineHeight: 1.25, opacity: p,
                  transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + 0.1 * p})`, transformOrigin: m.me ? "100% 100%" : "0 100%",
                }}>{m.txt}</div>
              );
            })}
            {t >= 34.1 && (
              <div style={{ alignSelf: "center", opacity: tag, transform: `scale(${0.6 + 0.4 * tag})`, background: C.orange, color: "#1A1208", fontFamily: PLEX, fontWeight: 700, fontSize: 40, padding: "10px 26px", borderRadius: 40, boxShadow: `0 0 34px ${C.glow}aa`, marginTop: 6 }}>
                OPORTUNIDAD REAL
              </div>
            )}
          </div>
        </div>
      </div>
      {/* tarjeta CRM */}
      <div style={{ position: "absolute", left: 140, right: 200, top: 1265, opacity: crm, transform: `translateY(${(1 - crm) * 80}px)`, background: "#F7F4EF", borderRadius: 28, padding: "24px 30px", boxShadow: "0 24px 60px rgba(0,0,0,.5)", display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontFamily: PLEX, fontWeight: 700, fontSize: 30, color: C.white, background: C.navy, borderRadius: 12, padding: "8px 14px" }}>CRM</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 32, color: "#111" }}>Lead nuevo · Fisherton</div>
          <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 27, color: "#555" }}>
            Etapa: <span style={{ textDecoration: stage ? "line-through" : "none" }}>Nuevo</span>
            {stage && <b style={{ color: "#B47A1E" }}> → Calificado ✓</b>}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- placa final ----------
const EndCard: React.FC = () => {
  const t = useT(); const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  if (t < DURATION) return null;
  const p = pop(frame, DURATION + 0.1, fps);
  const p2 = pop(frame, DURATION + 0.6, fps);
  return (
    <AbsoluteFill style={{ opacity: interpolate(t, [DURATION, DURATION + 0.3], [0, 1], { extrapolateRight: "clamp" }) }}>
      <NavyBg />
      <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
        <Img src={staticFile("werkalec-logo-oscuro.png")} style={{ width: 720 }} />
      </div>
      <div style={{ position: "absolute", top: 990, left: 0, right: 0, textAlign: "center", opacity: p2 }}>
        <div style={{ width: 140, height: 3, background: C.gold, margin: "0 auto 40px" }} />
        <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 60, color: C.white }}>@werkalec</div>
        <div style={{ fontFamily: CORM_I, fontStyle: "italic", fontWeight: 600, fontSize: 52, color: C.gold, marginTop: 14 }}>werkalec.com.ar</div>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 66, top: 262, fontFamily: MONT, fontWeight: 600, fontSize: 26, color: "rgba(255,255,255,.75)", letterSpacing: 1, textShadow: "0 2px 6px rgba(0,0,0,.5)" }}>✦ generado con IA</div>
);

const SFX: { at: number; f: string; v?: number }[] = [
  { at: 0.05, f: "whoosh", v: 0.5 }, { at: 1.25, f: "pop", v: 0.5 },
  { at: BR_TASKS[0], f: "whoosh", v: 0.5 }, ...TASKS.map((k) => ({ at: k.at, f: "pop", v: 0.45 })),
  { at: BRILLANTE[0], f: "ding", v: 0.35 },
  { at: BR_ARM[0], f: "whoosh", v: 0.5 }, { at: 19.42, f: "boom", v: 0.35 },
  { at: BR_CHAT[0], f: "whoosh", v: 0.5 }, ...MSGS.map((m) => ({ at: m.at, f: "click", v: 0.4 })),
  { at: 34.1, f: "ding", v: 0.35 }, { at: DURATION, f: "whoosh", v: 0.5 },
];

const Win: React.FC<{ a: number; b: number; children: React.ReactNode }> = ({ a, b, children }) => {
  const t = useT();
  return t >= a && t < b ? <>{children}</> : null;
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.navy }}>
    <Base />
    <Win a={BR_TASKS[0]} b={BR_TASKS[1]}><BrollTasks /></Win>
    <Win a={BR_ARM[0]} b={BR_ARM[1]}><BrollARM /></Win>
    <Win a={BR_CHAT[0]} b={BR_CHAT[1] + 0.3}><BrollChat /></Win>
    <Hook />
    <Brillante />
    <Subs />
    <EndCard />
    <Watermark />
    {SFX.map((s, i) => (
      <Sequence key={i} from={f(s.at)}><Audio src={staticFile(`${s.f}.wav`)} volume={s.v ?? 0.5} /></Sequence>
    ))}
  </AbsoluteFill>
);
