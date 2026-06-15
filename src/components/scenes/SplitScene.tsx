import { motion } from 'framer-motion'
import type { SplitSlide } from '../../data/slides'
import { houseColor } from '../../data/houses'
import { renderRich } from '../core/rich'

/* Folio 8 — the honest division: Python owns the brain, TS owns the app.
   Two columns, color follows the concept (Python = teal, TS = vermilion). */
export function SplitScene({ content }: { content: SplitSlide['content'] }) {
  const cols = [content.left, content.right]
  const compact = content.compact
  const itemFs = compact ? '2.3cqw' : 'var(--fs-lead)'

  return (
    <div className="scene scene--flow">
      <h2 className="flow-head" style={{ marginBottom: compact ? '3.5cqh' : '5cqh', maxWidth: '38ch' }}>{renderRich(content.assertion)}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '3cqw', alignItems: 'start' }}>
        {[cols[0], 'divider', cols[1]].map((c, i) => {
          if (c === 'divider') {
            return <div key="div" style={{ width: 1, height: '24cqh', background: 'var(--talk-rule)', justifySelf: 'center' }} />
          }
          const col = c as SplitSlide['content']['left']
          const color = houseColor(col.house)
          return (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i === 0 ? 0.05 : 0.18 }}
            >
              <div
                style={{
                  fontFamily: 'var(--talk-font-mono)',
                  fontSize: 'var(--fs-kicker)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color,
                  marginBottom: '0.4cqw',
                }}
              >
                {col.house === 'python' ? 'House Python' : 'House TypeScript'}
              </div>
              <div className="lead" style={{ marginBottom: compact ? '1.5cqw' : '2.2cqw', fontSize: compact ? '2.5cqw' : undefined }}>{col.label}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: compact ? '0.9cqw' : '1.2cqw' }}>
                {col.items.map(item => (
                  <li
                    key={item}
                    className="body"
                    style={{ fontSize: itemFs, display: 'flex', alignItems: 'center', gap: '1.2cqw' }}
                  >
                    <span style={{ width: '2cqw', height: 2, background: color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {content.note && (
        <p className="body muted" style={{ marginTop: compact ? '2cqh' : '3cqh', fontSize: compact ? '1.9cqw' : undefined, fontStyle: 'italic', maxWidth: '64ch' }}>
          {renderRich(content.note)}
        </p>
      )}
    </div>
  )
}
