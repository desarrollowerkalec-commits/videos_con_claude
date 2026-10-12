// Reel MDI — "Charla online: WhatsApp + CRM + IA" (Clara, avatar IA). Jueves 15/10, 17 hs.
// Lenguaje visual MDI (reel demo): subtítulos palabra por palabra a la izquierda, b-roll en tarjetas
// inclinadas con borde verde agua, PiP inclinado abajo, captura blanca sobre el pecho, títulos con eco script.
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile } from "remotion";
import { BG, BigTitle, Cap, Captions, MONT, neon, pop, prog, SCRIPT, ShotCard, SOFT, T, TiltCard, TL, useT, W, WordT } from "./kit";
import WORDS from "./words.json";

export const FPS = 30;
export const SRC_DUR = 78.0;
export const END_DUR = 3.5;
export const TOTAL = SRC_DUR + END_DUR;

// ---------- segmentos de b-roll ----------
const FULL = { caos: [1.7, 6.12], bot: [19.44, 25.12], crm: [25.18, 29.52] };
const PIP = { lista: [8.94, 13.9], domingo: [29.58, 33.32], piezas: [46.78, 52.66], caminos: [52.7, 57.6] };
const inSeg = (t: number, s: number[]) => t >= s[0] && t < s[1];

// ---------- subtítulos (texto real; "Workallec" → Werkalec) ----------
const CAPS: Cap[] = [
  { from: 0.0, to: 1.65, text: "¿Tu *WhatsApp*|es un caos?" },
  { from: 1.7, to: 3.2, text: "¿te pasás el día|*contestando*", caps: true },
  { from: 3.24, to: 6.1, text: "*precio,* *info,*|¿sigue disponible?", caps: true },
  { from: 6.18, to: 7.65, text: "Y después|*desaparecen.*" },
  { from: 7.72, to: 8.92, text: "Y lo peor es que," },
  { from: 8.94, to: 10.75, text: "entre tantos|*curiosos,*" },
  { from: 10.8, to: 12.05, text: "puede estar|el *cliente*" },
  { from: 12.08, to: 13.88, text: "que realmente|quiere *comprar.*" },
  { from: 13.94, to: 15.5, text: "¿Cómo lo vas|a *reconocer?*" },
  { from: 15.56, to: 17.02, text: "Bueno, la *tecnología*" },
  { from: 17.06, to: 19.38, text: "puede ayudarte|a *descubrirlo.*" },
  { from: 19.44, to: 21.0, text: "imaginate tener|un *sistema*", caps: true },
  { from: 21.02, to: 23.15, text: "que *responda*|a las consultas,", caps: true },
  { from: 23.2, to: 25.15, text: "haga las *preguntas*|necesarias,", caps: true },
  { from: 25.18, to: 26.8, text: "*identifique* a los|posibles clientes", caps: true },
  { from: 26.84, to: 28.45, text: "y te *avise*|cuándo realmente", caps: true },
  { from: 28.5, to: 29.55, text: "necesitan tu *atención*", caps: true },
  { from: 29.58, to: 31.05, text: "Incluso mientras vos" },
  { from: 31.08, to: 33.35, text: "disfrutás del *domingo*|en familia." },
  { from: 33.42, to: 34.9, text: "este *jueves 15*|de octubre", caps: true },
  { from: 34.92, to: 36.42, text: "a las *17 hs*", caps: true },
  { from: 36.48, to: 38.3, text: "desde Marketing Digital|*Inmobiliario,*" },
  { from: 38.34, to: 39.84, text: "te invitamos a una|*charla online*" },
  { from: 39.86, to: 41.6, text: "y *gratuita*|con Milagros," },
  { from: 41.64, to: 43.25, text: "del equipo|*Werkalec.*" },
  { from: 43.3, to: 45.22, text: "Milagros te va a mostrar|cómo funciona" },
  { from: 45.26, to: 46.74, text: "todo el *sistema.*" },
  { from: 46.78, to: 48.0, text: "*WhatsApp API,*" },
  { from: 48.04, to: 49.92, text: "*CRM,*|automatizaciones" },
  { from: 49.96, to: 52.65, text: "y *agentes* de|inteligencia artificial." },
  { from: 52.7, to: 54.22, text: "Para que entiendas|cómo *implementarlo*" },
  { from: 54.26, to: 55.58, text: "por tu *cuenta,*" },
  { from: 55.62, to: 57.58, text: "o, si preferís que|lo hagan *por vos,*" },
  { from: 57.62, to: 59.65, text: "vas a tener una|*súper oferta*", caps: true },
  { from: 59.68, to: 61.06, text: "del equipo de *Werkalec*" },
  { from: 61.1, to: 62.45, text: "*exclusiva*|para quienes", caps: true },
  { from: 62.48, to: 64.88, text: "estén presentes|*en vivo.*", caps: true },
  { from: 64.92, to: 66.46, text: "Porque la idea|no es que *trabajes más*" },
  { from: 66.5, to: 67.96, text: "para responder|*mensajes,*" },
  { from: 68.0, to: 70.58, text: "es que la|*tecnología*|trabaje por vos", big: true },
  { from: 70.62, to: 71.65, text: "Para que tengas|más *tiempo*" },
  { from: 71.68, to: 72.84, text: "para tus *clientes*" },
  { from: 72.86, to: 74.0, text: "y para tu *vida.*" },
  { from: 74.06, to: 75.68, text: "comentá *WHATSAPP*|y te mandamos", caps: true },
  { from: 75.7, to: 78.0, text: "el enlace para|inscribirte *gratis*", caps: true },
];
const capY = (t: number) => {
  if (inSeg(t, PIP.lista) || inSeg(t, PIP.domingo) || inSeg(t, PIP.piezas) || inSeg(t, PIP.caminos)) return 900;
  if (t >= 33.42 && t < 43.25) return 1190; // debajo de la invitación
  if (t >= 68.0 && t < 70.58) return 960; // remate grande centrado
  if (inSeg(t, FULL.caos) || inSeg(t, FULL.bot) || inSeg(t, FULL.crm)) return 1630; // debajo de la tarjeta inclinada
  return 1150;
};

// ---------- cámara ----------
const ZK: [number, number][] = [
  [0, 1.04], [1.6, 1.0],
  [6.14, 1.0], [6.26, 1.1], [7.0, 1.1], [7.6, 1.0],
  [13.9, 1.0], [14.02, 1.09], [15.0, 1.09], [15.5, 1.0],
  [33.38, 1.0], [33.5, 1.08], [34.6, 1.08], [35.3, 1.0],
  [57.58, 1.0], [57.7, 1.1], [59.0, 1.1], [59.6, 1.0],
  [64.9, 1.0], [70.5, 1.08], [71.0, 1.0],
  [74.02, 1.0], [74.14, 1.1], [78, 1.1],
];
const Cam: React.FC = () => {
  const t = useT();
  const z = interpolate(t, ZK.map((k) => k[0]), ZK.map((k) => k[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 30%" }}>
      <OffthreadVideo src={staticFile("src.mp4")} />
    </AbsoluteFill>
  );
};

// =================== pantallas (b-roll de interfaz) ===================
const WA_GREEN = "#075E54";
const Bubble: React.FC<{ at: number; text: string; me?: boolean; time?: string; seen?: boolean; big?: boolean }> = ({ at, text, me, time = "12:04", seen, big }) => {
  const t = useT();
  const p = pop(t, at, 0.35);
  if (p <= 0) return null;
  return (
    <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", opacity: Math.min(1, p * 1.5), transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: me ? "right center" : "left center" }}>
      <div style={{ maxWidth: "78%", padding: big ? "18px 24px" : "14px 20px", borderRadius: me ? "20px 20px 4px 20px" : "20px 20px 20px 4px", background: me ? "#D9FDD3" : "#fff", boxShadow: "0 2px 3px rgba(0,0,0,0.12)", fontFamily: MONT, fontWeight: 600, fontSize: big ? 38 : 32, color: "#111", lineHeight: 1.25 }}>
        {text}
        <span style={{ fontSize: 20, color: "#888", marginLeft: 12, fontWeight: 500 }}>{time}{me && <span style={{ color: seen ? "#34B7F1" : "#999" }}> ✓✓</span>}</span>
      </div>
    </div>
  );
};
const WAHeader: React.FC<{ name: string; sub: string; badge?: React.ReactNode }> = ({ name, sub, badge }) => (
  <div style={{ background: WA_GREEN, color: "#fff", padding: "54px 30px 22px", display: "flex", alignItems: "center", gap: 20 }}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: "#cfd8dc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONT, fontWeight: 800, fontSize: 30, color: WA_GREEN }}>{name[0]}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 36 }}>{name}</div>
      <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 24, opacity: 0.85 }}>{sub}</div>
    </div>
    {badge}
  </div>
);
const chatBg: React.CSSProperties = { background: "#EFE7DD", position: "absolute", left: 0, right: 0, top: 150, bottom: 0, padding: "26px 26px", display: "flex", flexDirection: "column", gap: 16 };

// F1 · WhatsApp desbordado
const ScrCaos: React.FC = () => {
  const t = useT();
  const n = Math.round(interpolate(t, [1.8, 6.0], [12, 99], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const msgs: [number, string][] = [[1.8, "Hola"], [2.3, "Info"], [2.8, "Hola, ¿precio?"], [3.24, "¿Precio?"], [3.7, "Pasame info del depto"], [4.16, "¿Info?"], [4.6, "Hola!!"], [4.88, "¿Sigue disponible?"], [5.3, "¿Precio?"], [5.6, "¿Sigue disponible?"]];
  const shown = msgs.filter((m) => t >= m[0]);
  return (
    <div style={{ width: 800, height: 1280, position: "relative", background: "#fff" }}>
      <div style={{ background: WA_GREEN, color: "#fff", padding: "54px 30px 26px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 40 }}>WhatsApp</span>
        <span style={{ background: "#25D366", borderRadius: 30, padding: "6px 20px", fontFamily: MONT, fontWeight: 800, fontSize: 30 }}>{n}{n >= 99 ? "+" : ""} sin leer</span>
      </div>
      <div style={{ padding: "6px 0" }}>
        {shown.slice(-9).reverse().map((m, i) => (
          <div key={m[0]} style={{ display: "flex", alignItems: "center", gap: 20, padding: "18px 28px", borderBottom: "1px solid #eee", opacity: prog(t, m[0], 0.25) }}>
            <div style={{ width: 76, height: 76, borderRadius: 38, background: ["#cfd8dc", "#d7ccc8", "#c5cae9", "#b2dfdb"][i % 4] }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: MONT, fontWeight: 700, fontSize: 30, color: "#111" }}>+54 9 341 {(5200000 + Math.round(m[0] * 137731)) % 9000000 + 1000000}</div>
              <div style={{ fontFamily: MONT, fontWeight: 500, fontSize: 28, color: "#555" }}>{m[1]}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#25D366", color: "#fff", fontFamily: MONT, fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{1 + (i % 3)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// F2 · el agente IA conversa y califica
const ScrBot: React.FC = () => (
  <div style={{ width: 800, height: 1280, position: "relative", background: "#EFE7DD" }}>
    <WAHeader name="Asistente IA · Inmobiliaria" sub="en línea" />
    <div style={chatBg}>
      <Bubble at={19.7} text="Hola, ¿precio del depto de Fisherton?" />
      <Bubble at={21.42} me seen text="¡Hola! Está USD 95.000. ¿Lo buscás para vivir o para invertir?" />
      <Bubble at={22.6} text="Para vivir, con crédito hipotecario" />
      <Bubble at={23.58} me seen text="¡Genial! ¿Ya tenés el crédito pre-aprobado?" />
      <Bubble at={24.4} text="Sí, aprobado la semana pasada" />
    </div>
  </div>
);

// F3 · CRM: el lead pasa a "caliente" y te avisa
const LeadCard: React.FC<{ name: string; tag: string; hot?: boolean }> = ({ name, tag, hot }) => (
  <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", boxShadow: hot ? `0 0 0 4px ${T}, 0 0 26px ${T}` : "0 2px 6px rgba(0,0,0,0.12)", marginBottom: 14 }}>
    <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 26, color: "#111" }}>{name}</div>
    <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 20, color: hot ? "#0b7a5f" : "#777", marginTop: 4 }}>{tag}</div>
  </div>
);
const ScrCRM: React.FC = () => {
  const t = useT();
  const move = prog(t, 25.4, 0.9); // Lucía de "Calificados" a "Para atender"
  const notif = pop(t, 27.2, 0.5);
  const cols = ["Nuevas", "Calificadas", "Para atender"];
  return (
    <div style={{ width: 800, height: 1280, position: "relative", background: "#F3F5F7" }}>
      <div style={{ background: "#0F2B2E", color: "#fff", padding: "54px 30px 24px", fontFamily: MONT, fontWeight: 800, fontSize: 38 }}>CRM <span style={{ color: T }}>· Consultas</span></div>
      <div style={{ display: "flex", gap: 14, padding: 18 }}>
        {cols.map((c, i) => (
          <div key={c} style={{ flex: 1, background: i === 2 ? "#E3F8F2" : "#E7EAEE", borderRadius: 16, padding: 12, minHeight: 900 }}>
            <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 22, color: i === 2 ? "#0b7a5f" : "#555", marginBottom: 12, letterSpacing: 1 }}>{c.toUpperCase()}</div>
            {i === 0 && <><LeadCard name="+54 9 341…" tag="¿precio?" /><LeadCard name="Juan P." tag="info" /><LeadCard name="+54 9 11…" tag="¿sigue disponible?" /><LeadCard name="Carla M." tag="curiosa" /></>}
            {i === 1 && <><LeadCard name="Martín R." tag="inversor · USD 80k" />{move < 0.5 && <LeadCard name="Lucía G." tag="vivienda · crédito OK" />}</>}
            {i === 2 && move >= 0.5 && <div style={{ transform: `translateX(${(1 - move) * -200}px)` }}><LeadCard name="Lucía G." tag="crédito aprobado · quiere visitar" hot /></div>}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 30, right: 30, top: 30, opacity: notif, transform: `translateY(${(1 - notif) * -120}px)`, background: "rgba(255,255,255,0.98)", borderRadius: 22, padding: "20px 24px", boxShadow: "0 12px 30px rgba(0,0,0,0.25)", display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: T, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}><svg width="34" height="38" viewBox="0 0 40 44"><path d="M6 32 Q10 28 10 18 Q10 6 20 6 Q30 6 30 18 Q30 28 34 32 Z M15 36 Q20 42 25 36" fill="none" stroke="#061416" strokeWidth={4} strokeLinejoin="round" /></svg></div>
        <div>
          <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 28, color: "#111" }}>Cliente listo para atender</div>
          <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 22, color: "#555" }}>Lucía G. quiere visitar el depto el martes</div>
        </div>
      </div>
    </div>
  );
};

// P1 · lista de chats: entre tantos curiosos, el comprador
const ScrLista: React.FC = () => {
  const t = useT();
  const hot = prog(t, 11.4, 0.4);
  const rows = ["¿precio?", "info", "¿sigue disponible?", "Quiero visitarlo, tengo el crédito aprobado", "hola", "¿acepta permuta?"];
  return (
    <div style={{ width: 840, height: 620, background: "#fff" }}>
      {rows.map((r, i) => {
        const isHot = i === 3;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 24px", borderBottom: "1px solid #eee", background: isHot ? `rgba(106,213,183,${0.35 * hot})` : "#fff", opacity: isHot ? 1 : 1 - 0.45 * hot }}>
            <div style={{ width: 62, height: 62, borderRadius: 31, background: isHot ? T : "#d5d5d5" }} />
            <div style={{ flex: 1, fontFamily: MONT, fontWeight: isHot ? 800 : 600, fontSize: 26, color: "#222" }}>{r}</div>
            {isHot && <div style={{ opacity: hot, fontFamily: MONT, fontWeight: 900, fontSize: 20, color: "#fff", background: "#0b7a5f", padding: "6px 12px", borderRadius: 8 }}>COMPRADOR</div>}
          </div>
        );
      })}
    </div>
  );
};

// P2 · domingo: pantalla de bloqueo con notificación
const ScrDomingo: React.FC = () => {
  const t = useT();
  const n = pop(t, 31.6, 0.5);
  return (
    <div style={{ width: 840, height: 620, background: "linear-gradient(160deg, #F6C66B, #E98E5A 55%, #8C5A86)", position: "relative", fontFamily: MONT }}>
      <div style={{ textAlign: "center", color: "#fff", paddingTop: 40 }}>
        <div style={{ fontWeight: 600, fontSize: 30 }}>domingo 18 de octubre</div>
        <div style={{ fontWeight: 800, fontSize: 130, lineHeight: 1 }}>13:42</div>
      </div>
      <div style={{ position: "absolute", left: 40, right: 40, top: 300, opacity: n, transform: `translateY(${(1 - n) * -60}px)`, background: "rgba(255,255,255,0.92)", borderRadius: 26, padding: "20px 24px", display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 62, height: 62, borderRadius: 14, background: T, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}><svg width="34" height="38" viewBox="0 0 40 44"><path d="M6 32 Q10 28 10 18 Q10 6 20 6 Q30 6 30 18 Q30 28 34 32 Z M15 36 Q20 42 25 36" fill="none" stroke="#061416" strokeWidth={4} strokeLinejoin="round" /></svg></div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 26, color: "#111" }}>Asistente IA · cliente listo</div>
          <div style={{ fontWeight: 600, fontSize: 22, color: "#444" }}>Lucía G. agendó visita: martes 11 hs</div>
        </div>
      </div>
    </div>
  );
};

// P3 · las 4 piezas del sistema
const ScrPiezas: React.FC = () => {
  const t = useT();
  const items: [number, string, string][] = [[46.78, "WhatsApp API", "#25D366"], [48.04, "CRM", "#0F2B2E"], [49.08, "Automatizaciones", "#3B6FD8"], [50.74, "Agentes de IA", "#0b7a5f"]];
  return (
    <div style={{ width: 840, height: 620, background: "#F3F5F7", padding: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, boxSizing: "border-box" }}>
      {items.map(([at, label, col]) => (
        <div key={label} style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: 22, opacity: prog(t, at, 0.3), transform: `scale(${0.7 + 0.3 * pop(t, at, 0.45)})`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: col }} />
          <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: label.length > 12 ? 30 : 38, color: "#111" }}>{label}</div>
          <div style={{ height: 8, borderRadius: 4, background: "#E7EAEE" }}><div style={{ width: `${100 * prog(t, at + 0.2, 1)}%`, height: 8, borderRadius: 4, background: T }} /></div>
        </div>
      ))}
    </div>
  );
};

// P4 · dos caminos
const ScrCaminos: React.FC = () => {
  const t = useT();
  const Opt: React.FC<{ at: number; n: string; title: string; hl?: boolean }> = ({ at, n, title, hl }) => (
    <div style={{ flex: 1, borderRadius: 22, padding: 26, background: hl ? "#E3F8F2" : "#F3F5F7", boxShadow: hl ? `0 0 0 4px ${T}` : "none", opacity: prog(t, at, 0.3), transform: `translateY(${(1 - prog(t, at, 0.4)) * 40}px)` }}>
      <div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 22, color: "#777", letterSpacing: 2 }}>{n}</div>
      <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 40, color: "#111", lineHeight: 1.1, marginTop: 12 }}>{title}</div>
    </div>
  );
  return (
    <div style={{ width: 840, height: 620, background: "#fff", padding: 30, display: "flex", gap: 22, boxSizing: "border-box" }}>
      <Opt at={53.66} n="OPCIÓN 1" title="Lo implementás vos" />
      <Opt at={56.88} n="OPCIÓN 2" title="Lo hace el equipo Werkalec" hl />
    </div>
  );
};

// captura blanca: invitación a la charla
const Invite: React.FC = () => {
  const t = useT();
  const row = (at: number, k: string, v: React.ReactNode) => (
    <div style={{ display: "flex", gap: 16, alignItems: "baseline", opacity: prog(t, at, 0.3), padding: "6px 0" }}>
      <span style={{ fontFamily: MONT, fontWeight: 700, fontSize: 22, color: "#888", width: 120 }}>{k}</span>
      <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: "#111" }}>{v}</span>
    </div>
  );
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 16, background: T }} />
      <div style={{ padding: "22px 28px", flex: 1 }}>
        <div style={{ fontFamily: MONT, fontWeight: 900, fontSize: 34, color: "#111" }}>Charla online gratuita</div>
        <div style={{ fontFamily: MONT, fontWeight: 600, fontSize: 22, color: "#0b7a5f", marginBottom: 8 }}>WhatsApp + CRM + Agentes de IA</div>
        {row(33.56, "Cuándo", <>Jueves 15 de octubre</>)}
        {row(35.14, "Hora", <>17:00 hs</>)}
        {row(40.8, "Con", <>Milagros · equipo Werkalec</>)}
      </div>
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
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, textAlign: "center" }}>
        <In at={s + 0.5}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 48, color: W }}>@mktdginmobiliario</div></In>
        <In at={s + 0.8}><div style={{ fontFamily: SCRIPT, fontSize: 84, color: TL, textShadow: neon(0.5), marginTop: 24 }}>jueves 15 · 17 hs</div></In>
        <In at={s + 1.0}><div style={{ fontFamily: MONT, fontWeight: 800, fontSize: 30, color: W, letterSpacing: 4, marginTop: 6 }}>CHARLA ONLINE GRATUITA</div></In>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 40, bottom: 40, fontFamily: MONT, fontWeight: 600, fontSize: 24, color: "#ffffffc0", textShadow: "0 2px 8px rgba(0,0,0,0.7)", letterSpacing: 1 }}>✦ generado con IA</div>
);

// ---------- sonido ----------
type Sfx = { at: number; f: "whoosh" | "pop" | "ding" | "click" | "boom"; v?: number };
const SFX: Sfx[] = [
  { at: 1.7, f: "whoosh", v: 0.3 }, { at: 3.24, f: "pop", v: 0.22 }, { at: 4.16, f: "pop", v: 0.22 }, { at: 4.88, f: "pop", v: 0.22 },
  { at: 6.1, f: "whoosh", v: 0.25 }, { at: 8.94, f: "whoosh", v: 0.22 }, { at: 11.4, f: "ding", v: 0.3 },
  { at: 19.44, f: "whoosh", v: 0.3 }, { at: 21.42, f: "pop", v: 0.25 }, { at: 23.58, f: "pop", v: 0.25 },
  { at: 25.18, f: "whoosh", v: 0.25 }, { at: 27.2, f: "ding", v: 0.35 },
  { at: 29.58, f: "whoosh", v: 0.22 }, { at: 31.6, f: "ding", v: 0.3 },
  { at: 33.42, f: "pop", v: 0.3 }, { at: 38.34, f: "whoosh", v: 0.25 },
  { at: 46.78, f: "whoosh", v: 0.22 }, { at: 48.04, f: "click", v: 0.3 }, { at: 49.08, f: "click", v: 0.3 }, { at: 50.74, f: "click", v: 0.3 },
  { at: 52.7, f: "whoosh", v: 0.22 }, { at: 56.88, f: "pop", v: 0.28 },
  { at: 57.62, f: "boom", v: 0.35 }, { at: 68.44, f: "ding", v: 0.28 },
  { at: 74.06, f: "boom", v: 0.3 },
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
  const t = useT();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence durationInFrames={Math.round(SRC_DUR * FPS)}>
        <Cam />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 50%, rgba(2,8,9,0.35) 100%)" }} />
      </Sequence>
      {/* PiP abajo (Clara arriba) */}
      <TiltCard from={PIP.lista[0]} to={PIP.lista[1]} mode="pip"><ScrLista /></TiltCard>
      <TiltCard from={PIP.domingo[0]} to={PIP.domingo[1]} mode="pip" swing={-1}><ScrDomingo /></TiltCard>
      <TiltCard from={PIP.piezas[0]} to={PIP.piezas[1]} mode="pip"><ScrPiezas /></TiltCard>
      <TiltCard from={PIP.caminos[0]} to={PIP.caminos[1]} mode="pip" swing={-1}><ScrCaminos /></TiltCard>
      {/* captura blanca sobre el pecho */}
      <ShotCard from={33.42} to={43.25} top={880} width={780}><Invite /></ShotCard>
      {/* títulos con eco script */}
      <BigTitle from={38.34} to={43.25} text="CHARLA ONLINE" echo="gratuita" />
      <BigTitle from={57.62} to={64.88} text="SÚPER OFERTA" echo="en vivo" />
      <BigTitle from={74.06} to={SRC_DUR} text="WHATSAPP" echo="comentá" />
      {/* cortes a b-roll de pantalla completa */}
      <TiltCard from={FULL.caos[0]} to={FULL.caos[1]}><ScrCaos /></TiltCard>
      <TiltCard from={FULL.bot[0]} to={FULL.bot[1]} swing={-1}><ScrBot /></TiltCard>
      <TiltCard from={FULL.crm[0]} to={FULL.crm[1]}><ScrCRM /></TiltCard>
      <Captions list={CAPS} words={WORDS as WordT[]} y={capY} />
      <EndPlate />
      <Watermark />
      <Sounds />
    </AbsoluteFill>
  );
};
