import { motion } from 'framer-motion'
import type { RecapSlide } from '../../data/slides'
import { houseColor } from '../../data/houses'
import { renderRich } from '../core/rich'

/* Folio — the recap scoreboard. The app-layer case, counted off; every reason
   lands in the riser accent (all TypeScript), cascading one per beat. Scoped to
   the app layer on purpose — the model stays Python, conceded on the next turn.
   Tighter top padding than the default flow scene so all five reasons fit. */
export function RecapScene({ content }: { content: RecapSlide['content'] }) {
  return (
    <div className="scene scene--flow" style={{ paddingTop: '14cqh' }}>
      {content.kicker && <div className="kicker" style={{ marginBottom: '1.2cqw' }}>{content.kicker}</div>}
      <h2 className="flow-head" style={{ marginBottom: '3cqh', maxWidth: '32ch' }}>
        {renderRich(content.assertion)}
      </h2>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.3cqw', maxWidth: 'none' }}>
        {content.reasons.map((r, i) => {
          const color = houseColor(r.house)
          return (
            <motion.li
              key={r.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.12 }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.4cqw',
                fontFamily: 'var(--talk-font-display)',
                fontSize: '2.6cqw',
                lineHeight: 1.18,
                color: 'var(--talk-ink-bright)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--talk-font-mono)',
                  fontSize: '2cqw',
                  fontVariantNumeric: 'tabular-nums',
                  color,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>{renderRich(r.label)}</span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
