import { motion } from 'framer-motion'
import type { QuoteSlide } from '../../data/slides'
import { renderRich } from '../core/rich'

/* The prophecy (folio 18) — Atwood's Law as an ancient inscription. */
export function QuoteScene({ content }: { content: QuoteSlide['content'] }) {
  return (
    <div className="scene">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          aria-hidden
          style={{
            fontFamily: 'var(--talk-font-display)',
            fontWeight: 300,
            fontSize: '7cqw',
            lineHeight: 0.7,
            color: 'var(--talk-accent)',
            marginBottom: '0.8cqw',
          }}
        >
          “
        </div>
        <blockquote
          className="statement"
          style={{ fontStyle: 'italic', fontWeight: 300, maxWidth: '24ch' }}
        >
          {content.quote}
        </blockquote>
        <div className="byline" style={{ marginTop: '2.6cqw' }}>
          {content.attribution}
        </div>
        <p className="body muted" style={{ marginTop: '1.2cqw', fontStyle: 'italic' }}>
          {renderRich(content.note)}
        </p>
      </motion.div>
    </div>
  )
}
