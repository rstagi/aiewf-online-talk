/* Decluttered, hand-built SVG charts. No gridlines, no legend, no border;
   direct labels; tabular mono numerals; one accent on the named takeaway.
   Colors are meaning-mapped: TS = vermilion accent, Python = teal accent-2. */

const LBL = {
  fontFamily: 'var(--talk-font-mono)',
  fontSize: '22px',
} as const
const TINY = { fontFamily: 'var(--talk-font-mono)', fontSize: '18px' } as const

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

// ── Folio 12 ─ AI SDK 9× growth ────────────────────────────────────────────
export function GrowthLine() {
  const x = (t: number) => 140 + 560 * t
  const y = (v: number) => 380 - (v / 16) * 300
  const d = `M${x(0)} ${y(1.61)} C ${x(0.4)} ${y(3)}, ${x(0.7)} ${y(7.5)}, ${x(1)} ${y(15.1)}`
  return (
    <svg viewBox="0 0 800 420" width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <line x1="140" y1="380" x2="700" y2="380" stroke="var(--talk-rule)" strokeWidth="2" />
      <text x="140" y="406" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Jun ’25</text>
      <text x="700" y="406" textAnchor="middle" fill="var(--talk-muted)" {...TINY}>Jun ’26</text>

      <path d={d} stroke="var(--talk-accent)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx={x(0)} cy={y(1.61)} r="6" fill="var(--talk-muted)" />
      <text x={x(0)} y={y(1.61) + 34} textAnchor="middle" fill="var(--talk-muted)" {...LBL}>1.6M</text>
      <circle cx={x(1)} cy={y(15.1)} r="9" fill="var(--talk-accent)" stroke="var(--talk-bg)" strokeWidth="2" />
      <text x={x(1) - 8} y={y(15.1) + 24} textAnchor="end" fill="var(--talk-accent)" {...LBL}>15.1M / week</text>
      <text x={x(1) - 8} y={y(15.1) + 48} textAnchor="end" fill="var(--talk-muted)" {...TINY}>~9× in a year</text>
    </svg>
  )
}
