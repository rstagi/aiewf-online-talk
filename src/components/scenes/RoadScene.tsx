import { motion } from 'framer-motion'
import type { RoadSlide } from '../../data/slides'
import { renderRich } from '../core/rich'

/* Folio 15 — one type from the model's tool call to the browser. TS road is
   unbroken; Python's road hits the process boundary and the type stops. The
   break IS the proof. */
export function RoadScene({ content }: { content: RoadSlide['content'] }) {
  return (
    <div className="scene scene--flow">
      <h2 className="flow-head" style={{ marginBottom: '5cqh', maxWidth: '40ch' }}>{renderRich(content.assertion)}</h2>

      {/* TS road — unbroken */}
      <Road
        label="House TypeScript"
        sub="one type, model → browser"
        color="var(--talk-accent)"
        delay={0.1}
        nodes={['schema', 'tool', 'stream', '<Component/>']}
        broken={false}
        endNode={{ text: 'the browser', ok: true }}
      />

      <div style={{ height: '5cqh' }} />

      {/* Python road — stops at the boundary */}
      <Road
        label="House Python"
        sub="typed to the boundary"
        color="var(--talk-accent-2)"
        delay={0.35}
        nodes={['schema', 'tool', 'typed server']}
        broken
        endNode={{ text: 'browser JS, untyped', ok: false }}
      />

      <p className="body muted" style={{ marginTop: '5cqh', fontStyle: 'italic', maxWidth: '52ch' }}>
        {content.note}
      </p>
    </div>
  )
}

function Road({
  label,
  sub,
  color,
  nodes,
  broken,
  endNode,
  delay,
}: {
  label: string
  sub: string
  color: string
  nodes: string[]
  broken: boolean
  endNode: { text: string; ok: boolean }
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay }}
    >
      <div
        style={{
          fontFamily: 'var(--talk-font-mono)',
          fontSize: 'var(--fs-kicker)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color,
          marginBottom: '1.4cqw',
        }}
      >
        {label} · <span style={{ color: 'var(--talk-muted)' }}>{sub}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        {nodes.map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <Pill text={n} color={color} />
            {i < nodes.length - 1 && <Connector color={color} />}
          </div>
        ))}

        {broken ? (
          <>
            <Wall />
            <Pill text={endNode.text} color="var(--talk-muted)" dashed />
          </>
        ) : (
          <>
            <Connector color={color} />
            <Pill text={endNode.text} color={color} filled />
          </>
        )}
      </div>
    </motion.div>
  )
}

function Pill({ text, color, dashed, filled }: { text: string; color: string; dashed?: boolean; filled?: boolean }) {
  return (
    <span
      style={{
        fontFamily: 'var(--talk-font-mono)',
        fontSize: '1.7cqw',
        whiteSpace: 'nowrap',
        padding: '0.8cqw 1.3cqw',
        border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
        borderRadius: 4,
        color: filled ? 'var(--talk-bg)' : color,
        background: filled ? color : 'var(--talk-surface)',
      }}
    >
      {text}
    </span>
  )
}

function Connector({ color }: { color: string }) {
  return <span style={{ width: '2.4cqw', height: 2, background: color }} />
}

/* a hatched wall — the process / browser boundary */
function Wall() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 0.6cqw', position: 'relative' }}>
      <svg width="46" height="58" viewBox="0 0 46 58" style={{ color: 'var(--talk-muted)' }} aria-hidden>
        <rect x="14" y="2" width="18" height="54" fill="var(--talk-surface)" stroke="currentColor" strokeWidth="2" />
        {[10, 22, 34, 46].map(y => (
          <line key={y} x1="14" y1={y} x2="32" y2={y - 8} stroke="currentColor" strokeWidth="1.4" />
        ))}
      </svg>
    </span>
  )
}
