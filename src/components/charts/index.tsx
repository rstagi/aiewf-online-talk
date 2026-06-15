/* Decluttered, hand-built SVG charts. No gridlines, no legend, no border;
   direct labels; tabular mono numerals; one accent on the named takeaway.
   Colors are meaning-mapped: TS = vermilion accent, Python = teal accent-2. */

const LBL = {
  fontFamily: 'var(--talk-font-mono)',
  fontSize: '22px',
} as const
const TINY = { fontFamily: 'var(--talk-font-mono)', fontSize: '18px' } as const

// ── Folio 7 ─ Python rising (the concession) ──────────────────────────────
export function PythonRisingBars() {
  const yOf = (v: number) => 360 - (v / 60) * 290
  return (
    <svg viewBox="0 0 760 420" width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <line x1="120" y1="360" x2="640" y2="360" stroke="var(--talk-rule)" strokeWidth="2" />

      {/* 2024 — non-focal */}
      <rect x="190" y={yOf(51)} width="130" height={360 - yOf(51)} fill="var(--talk-muted)" opacity="0.55" />
      <text x="255" y={yOf(51) - 14} textAnchor="middle" fill="var(--talk-muted)" {...LBL}>51%</text>
      <text x="255" y="392" textAnchor="middle" fill="var(--talk-muted)" {...LBL}>2024</text>

      {/* 2025 — takeaway, Python's color */}
      <rect x="430" y={yOf(57.9)} width="130" height={360 - yOf(57.9)} fill="var(--talk-accent-2)" />
      <text x="495" y={yOf(57.9) - 42} textAnchor="middle" fill="var(--talk-accent-2)" {...TINY}>+7 pts ↑</text>
      <text x="495" y={yOf(57.9) - 14} textAnchor="middle" fill="var(--talk-accent-2)" {...LBL}>58%</text>
      <text x="495" y="392" textAnchor="middle" fill="var(--talk-ink)" {...LBL}>2025</text>

      <text x="360" y="16" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>
        stated usage · the survey’s biggest single-year jump
      </text>
    </svg>
  )
}

// ── Folio 10 ─ the crossover ───────────────────────────────────────────────
export function CrossoverLines() {
  const x = (t: number) => 140 + 560 * t
  const y = (v: number) => 380 - ((v - 1.4) / 1.4) * 310
  const line = (a: number, b: number) => `M${x(0)} ${y(a)} L${x(1)} ${y(b)}`
  const cross = { x: 567, y: 161 }
  return (
    <svg viewBox="0 0 820 440" width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <line x1="140" y1="400" x2="700" y2="400" stroke="var(--talk-rule)" strokeWidth="2" />
      <text x="140" y="426" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Aug ’24</text>
      <text x="700" y="426" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Aug ’25</text>

      {/* JS — backdrop */}
      <path d={line(1.74, 2.17)} stroke="var(--talk-muted)" strokeWidth="3" fill="none" opacity="0.6" />
      <text x="712" y={y(2.17) + 6} fill="var(--talk-muted)" {...LBL}>JS 2.17M</text>

      {/* Python — incumbent */}
      <path d={line(1.74, 2.59)} stroke="var(--talk-accent-2)" strokeWidth="4" fill="none" />
      <text x="712" y={y(2.59) + 18} fill="var(--talk-accent-2)" {...LBL}>Python 2.59M</text>

      {/* TypeScript — the riser */}
      <path d={line(1.58, 2.64)} stroke="var(--talk-accent)" strokeWidth="5" fill="none" />
      <text x="712" y={y(2.64) + 2} fill="var(--talk-accent)" {...LBL}>TS 2.64M</text>

      {/* crossover marker + margin callout — shown together with the chart */}
      <g>
        <line x1={cross.x} y1={cross.y} x2={cross.x} y2="400" stroke="var(--talk-accent)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7" />
        <circle cx={cross.x} cy={cross.y} r="8" fill="var(--talk-accent)" stroke="var(--talk-bg)" strokeWidth="2" />
      </g>
      <g>
        <text x={cross.x - 14} y={cross.y - 54} textAnchor="end" fill="var(--talk-ink-bright)" {...LBL}>~42k ahead</text>
        <text x={cross.x - 14} y={cross.y - 30} textAnchor="end" fill="var(--talk-muted)" {...TINY}>≈ 1.6%</text>
      </g>
    </svg>
  )
}

// ── Folio 12 ─ AI SDK 7× growth ────────────────────────────────────────────
export function GrowthLine() {
  const x = (t: number) => 140 + 560 * t
  const y = (v: number) => 380 - (v / 3.4) * 300
  const d = `M${x(0)} ${y(0.446)} C ${x(0.4)} ${y(0.7)}, ${x(0.7)} ${y(1.7)}, ${x(1)} ${y(3.2)}`
  return (
    <svg viewBox="0 0 800 420" width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <line x1="140" y1="380" x2="700" y2="380" stroke="var(--talk-rule)" strokeWidth="2" />
      <text x="140" y="406" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Oct ’24</text>
      <text x="700" y="406" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Sep ’25</text>

      <path d={d} stroke="var(--talk-accent)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx={x(0)} cy={y(0.446)} r="6" fill="var(--talk-muted)" />
      <text x={x(0)} y={y(0.446) + 34} textAnchor="middle" fill="var(--talk-muted)" {...LBL}>446K</text>
      <circle cx={x(1)} cy={y(3.2)} r="9" fill="var(--talk-accent)" stroke="var(--talk-bg)" strokeWidth="2" />
      <text x={x(1) - 8} y={y(3.2) - 18} textAnchor="end" fill="var(--talk-accent)" {...LBL}>3.2M / week</text>
      <text x={x(1) - 8} y={y(3.2) + 6} textAnchor="end" fill="var(--talk-muted)" {...TINY}>~7× in a year</text>
    </svg>
  )
}
