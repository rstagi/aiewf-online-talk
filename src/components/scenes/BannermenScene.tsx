import { motion, AnimatePresence } from 'framer-motion'
import type { BannermenSlide } from '../../data/slides'

/* Folio 14 — the bannermen. The tools that have "declared for House TypeScript",
   as an asymmetric wordmark wall (hand-built type, not sourced logos). */
export function BannermenScene({ content, subStep }: { content: BannermenSlide['content']; subStep: number }) {
  return (
    <div className="scene scene--flow">
      <h2 className="flow-head" style={{ marginBottom: '5cqh', maxWidth: '34ch' }}>{content.assertion}</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '1.4cqw 3cqw',
          maxWidth: '82cqw',
        }}
      >
        {content.houses.map((h, i) => (
          <motion.span
            key={h.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            style={{
              fontFamily: 'var(--talk-font-display)',
              fontWeight: 500,
              fontSize: `calc(var(--fs-lead) * ${h.scale})`,
              lineHeight: 1,
              color: 'var(--talk-ink-bright)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6cqw',
            }}
          >
            <span style={{ color: 'var(--talk-accent)', fontSize: '0.6em' }}>▸</span>
            {h.name}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {subStep >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="body"
            style={{ marginTop: '5cqh', maxWidth: '60ch', borderLeft: '2px solid var(--talk-accent)', paddingLeft: '1.4cqw' }}
          >
            MCP servers ship <span className="ts">~2.5× more on npm</span> than PyPI · schema authored TypeScript-first.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
