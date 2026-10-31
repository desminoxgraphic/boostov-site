// Vector illustrations of Boostov products. Always shown with the "Illustration" tag:
// they are drawings, not photos, until the real personalised stand photo exists.

type Tone = "connect" | "grow";

const PALETTE = {
  connect: { face: "#2864f0", face2: "#1d4fd1", ink: "#ffffff", soft: "rgba(255,255,255,.72)", accent: "#ffffff" },
  grow: { face: "#0b1220", face2: "#15243b", ink: "#ffffff", soft: "rgba(255,255,255,.66)", accent: "#8fb0ff" },
} as const;

// Fixed decorative pattern standing in for a QR code (not scannable, purely illustrative).
const QR_BITS = "1110111010110101011100100111011010001110110101101010011101011100110111001011";
function QrMark({ x, y, size, fg = "#0b1220", bg = "#ffffff" }: { x: number; y: number; size: number; fg?: string; bg?: string }) {
  const n = 9, c = size / n;
  const finder = (fx: number, fy: number) => <g key={`${fx}-${fy}`}><rect x={x + fx * c} y={y + fy * c} width={c * 3} height={c * 3} fill={fg} rx={c * .4} /><rect x={x + fx * c + c * .7} y={y + fy * c + c * .7} width={c * 1.6} height={c * 1.6} fill={bg} rx={c * .3} /><rect x={x + fx * c + c * 1.1} y={y + fy * c + c * 1.1} width={c * .8} height={c * .8} fill={fg} /></g>;
  const cells = [];
  for (let i = 0; i < n * n; i++) {
    const cx = i % n, cy = Math.floor(i / n);
    const inFinder = (cx < 3 && cy < 3) || (cx > 5 && cy < 3) || (cx < 3 && cy > 5);
    if (!inFinder && QR_BITS[i % QR_BITS.length] === "1") cells.push(<rect key={i} x={x + cx * c + c * .1} y={y + cy * c + c * .1} width={c * .8} height={c * .8} rx={c * .2} fill={fg} />);
  }
  return <g><rect x={x - c * .6} y={y - c * .6} width={size + c * 1.2} height={size + c * 1.2} rx={c * 1.2} fill={bg} />{finder(0, 0)}{finder(6, 0)}{finder(0, 6)}{cells}</g>;
}

function NfcWaves({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"><path d="M0 -6a8 8 0 0 1 0 12" /><path d="M6 -11a15 15 0 0 1 0 22" /><path d="M12 -16a22 22 0 0 1 0 32" /></g>;
}

function LogoMark({ x, y, size }: { x: number; y: number; size: number }) {
  return <image href="/img/boostov-logo.webp" x={x} y={y} width={size} height={size} />;
}

/** NFC card, credit-card proportions, slightly tilted. */
export function CardArt({ tone = "connect", label }: { tone?: Tone; label?: string }) {
  const p = PALETTE[tone];
  const id = `card-${tone}`;
  return <svg viewBox="0 0 340 220" role="img" aria-label={`Illustration : carte NFC Boostov ${tone === "connect" ? "Connect" : "Grow"}`}>
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p.face} /><stop offset="1" stopColor={p.face2} /></linearGradient>
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".16" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#0b1220" floodOpacity=".28" /></filter>
    </defs>
    <g transform="rotate(-6 170 110)" filter={`url(#${id}-sh)`}>
      <rect x="30" y="28" width="280" height="176" rx="18" fill={`url(#${id}-g)`} />
      <rect x="30" y="28" width="280" height="176" rx="18" fill={`url(#${id}-sheen)`} />
      <rect x="30.5" y="28.5" width="279" height="175" rx="17.5" fill="none" stroke="#fff" strokeOpacity=".18" />
      <LogoMark x={52} y={50} size={34} />
      <text x="94" y="73" fill={p.ink} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="17" letterSpacing="-.3">{label ?? "Votre commerce"}</text>
      <NfcWaves x={276} y={68} color={p.accent} />
      <rect x="52" y="104" width="38" height="28" rx="6" fill="#f5d77a" opacity=".92" />
      <path d="M52 113h38M52 123h38M71 104v28" stroke="#c8a240" strokeWidth="1" />
      <text x="52" y="178" fill={p.soft} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11" letterSpacing="1.6">TAP · NFC · QR</text>
      <QrMark x={238} y={132} size={46} />
    </g>
  </svg>;
}

/** L-shaped counter stand seen at three-quarter view, personalised face. */
export function StandArt({ tone = "connect", label, callouts = false }: { tone?: Tone; label?: string; callouts?: boolean }) {
  const p = PALETTE[tone];
  const id = `stand-${tone}${callouts ? "-c" : ""}`;
  const callout = (x: number, y: number, tx: number, text: string, right: boolean) => <g>
    <line x1={x} y1={y} x2={tx} y2={y} stroke="#2864f0" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx={x} cy={y} r="6" fill="#fff" stroke="#2864f0" strokeWidth="3" />
    <rect x={right ? tx : tx - 124} y={y - 19} width="124" height="38" rx="19" fill="#fff" stroke="#d5e0f4" />
    <text x={right ? tx + 62 : tx - 62} y={y + 6} textAnchor="middle" fill="#0b1220" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16">{text}</text>
  </g>;
  return <svg viewBox={callouts ? "0 0 520 420" : "0 0 300 380"} role="img" aria-label={`Illustration : stand Boostov ${tone === "connect" ? "Connect" : "Grow"} personnalisé${callouts ? " avec logo, couleurs, QR code et texte" : ""}`}>
    <defs>
      <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.face} /><stop offset="1" stopColor={p.face2} /></linearGradient>
      <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f5fb" /><stop offset="1" stopColor="#d9e1ef" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop offset="0" stopColor="#0b1220" stopOpacity=".28" /><stop offset="1" stopColor="#0b1220" stopOpacity="0" /></radialGradient>
    </defs>
    <g transform={callouts ? "translate(110 20)" : "translate(0 0)"}>
      <ellipse cx="150" cy="352" rx="130" ry="18" fill={`url(#${id}-shadow)`} />
      {/* base plate */}
      <path d="M58 318 L232 318 L262 346 L28 346 Z" fill={`url(#${id}-base)`} stroke="#c9d3e6" />
      <path d="M28 346 L262 346 L262 352 L28 352 Z" fill="#c9d3e6" />
      {/* edge thickness of the face */}
      <path d="M234 44 L240 48 L240 322 L234 318 Z" fill="#d5e0f4" />
      {/* face */}
      <rect x="66" y="40" width="168" height="280" rx="14" fill={`url(#${id}-face)`} />
      <rect x="66" y="40" width="168" height="280" rx="14" fill="none" stroke="#fff" strokeOpacity=".2" />
      <path d="M66 54 Q66 40 80 40 L150 40 L96 320 L80 320 Q66 320 66 306 Z" fill="#fff" opacity=".07" />
      <LogoMark x={128} y={66} size={44} />
      <text x="150" y="134" textAnchor="middle" fill={p.ink} fontFamily="Inter, sans-serif" fontWeight="750" fontSize="17" letterSpacing="-.3">{label ?? "Votre commerce"}</text>
      <text x="150" y="154" textAnchor="middle" fill={p.soft} fontFamily="Inter, sans-serif" fontWeight="500" fontSize="11">Tapez ou scannez</text>
      <QrMark x={112} y={174} size={76} />
      <NfcWaves x={140} y={292} s={.9} color={p.accent} />
      <circle cx="132" cy="292" r="5" fill={p.accent} />
    </g>
    {callouts && <>
      {callout(238, 108, 380, "Votre logo", true)}
      {callout(224, 232, 380, "Votre QR code", true)}
      {callout(178, 148, 106, "Votre nom", false)}
      {callout(182, 312, 106, "Puce NFC", false)}
      <g transform="translate(380 300)">
        <rect width="132" height="70" rx="18" fill="#fff" stroke="#d5e0f4" />
        <text x="66" y="26" textAnchor="middle" fill="#0b1220" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16">Vos couleurs</text>
        {["#2864f0", "#0b1220", "#e8553d", "#f5c542", "#16a34a"].map((c, i) => <circle key={c} cx={26 + i * 20} cy="48" r="8" fill={c} stroke="#fff" strokeWidth="2" />)}
      </g>
    </>}
  </svg>;
}

/** The three "how it works" steps. */
export function StepArt({ step }: { step: 1 | 2 | 3 }) {
  const common = { viewBox: "0 0 240 160", role: "img" as const };
  if (step === 1) return <svg {...common} aria-label="Illustration : nous programmons votre carte ou votre stand">
    <rect x="20" y="22" width="150" height="100" rx="10" fill="#0b1220" />
    <rect x="28" y="30" width="134" height="84" rx="5" fill="#15243b" />
    <rect x="38" y="42" width="60" height="8" rx="4" fill="#2864f0" />
    <rect x="38" y="58" width="96" height="6" rx="3" fill="#5f6b7a" />
    <rect x="38" y="70" width="80" height="6" rx="3" fill="#5f6b7a" />
    <rect x="38" y="90" width="44" height="14" rx="7" fill="#2864f0" />
    <path d="M8 126h174l-10 10H18z" fill="#d5e0f4" />
    <g transform="rotate(-10 190 96)"><rect x="150" y="70" width="80" height="52" rx="8" fill="#2864f0" /><NfcWaves x={212} y={86} s={.6} color="#fff" /><rect x="160" y="96" width="14" height="10" rx="2" fill="#f5d77a" /></g>
    <circle cx="200" cy="40" r="14" fill="#eaf1ff" /><path d="M194 40l4 4 8-8" stroke="#2864f0" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
  if (step === 2) return <svg {...common} aria-label="Illustration : le stand posé sur le comptoir">
    <rect x="0" y="112" width="240" height="14" rx="3" fill="#d5e0f4" />
    <rect x="10" y="126" width="220" height="30" fill="#eaf1ff" />
    <rect x="150" y="62" width="70" height="50" rx="6" fill="#15243b" /><rect x="158" y="70" width="54" height="18" rx="3" fill="#2864f0" opacity=".7" /><rect x="158" y="94" width="54" height="10" rx="2" fill="#5f6b7a" />
    <path d="M60 106h56l10 6H50z" fill="#f2f5fb" stroke="#c9d3e6" />
    <rect x="64" y="22" width="48" height="86" rx="6" fill="#2864f0" />
    <image href="/img/boostov-logo.webp" x="78" y="30" width="20" height="20" />
    <QrMark x={74} y={60} size={28} />
    <NfcWaves x={86} y={100} s={.4} color="#fff" />
    <circle cx="30" cy="96" r="10" fill="#f5c542" opacity=".5" /><rect x="22" y="96" width="16" height="16" rx="3" fill="#c9d3e6" />
  </svg>;
  return <svg {...common} aria-label="Illustration : un client tape ou scanne avec son téléphone">
    <rect x="0" y="122" width="240" height="12" rx="3" fill="#d5e0f4" />
    <path d="M40 116h56l10 6H30z" fill="#f2f5fb" stroke="#c9d3e6" />
    <rect x="44" y="30" width="48" height="88" rx="6" fill="#2864f0" />
    <image href="/img/boostov-logo.webp" x="58" y="38" width="20" height="20" />
    <QrMark x={54} y={68} size={28} />
    <g transform="rotate(-14 160 70)"><rect x="128" y="14" width="64" height="116" rx="12" fill="#0b1220" /><rect x="133" y="22" width="54" height="100" rx="8" fill="#ffffff" /><rect x="140" y="32" width="40" height="40" rx="20" fill="#eaf1ff" /><image href="/img/boostov-logo.webp" x="150" y="42" width="20" height="20" /><rect x="140" y="80" width="40" height="6" rx="3" fill="#0b1220" /><rect x="140" y="92" width="40" height="12" rx="6" fill="#2864f0" /></g>
    <NfcWaves x={104} y={70} s={1} color="#2864f0" />
  </svg>;
}
