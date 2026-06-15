import { motion } from 'framer-motion'
import type { DataSlide } from '../../data/slides'
import { renderRich } from '../core/rich'
import { CrossoverLines, GrowthLine } from '../charts'

/* Folios 7, 10, 12, 13 — the records. Clean editorial: assertion headline,
   one decluttered chart, a sourced caption. Light chrome, no world overlay. */
export function DataScene({ content }: { content: DataSlide['content'] }) {
  return (
    <div className="scene scene--flow">
      <h2 className="flow-head" style={{ marginBottom: content.headlines ? '2cqh' : '3cqh', maxWidth: '40ch' }}>
        {renderRich(content.assertion)}
      </h2>

      {/* optional proclamation cards — GitHub's two real headlines, accent-mapped
          (2024 → Python teal · 2025 → TypeScript vermilion). */}
      {content.headlines && (
        <div style={{ display: 'flex', gap: '2cqw', marginBottom: '2.4cqh', justifyContent: 'center', flexWrap: 'wrap' }}>
          {content.headlines.map((h, i) => (
            <motion.div
              key={h.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
              style={{
                width: '30cqw',
                background: 'var(--talk-surface)',
                border: '1px solid var(--talk-rule)',
                borderLeft: `3px solid ${i === 0 ? 'var(--talk-accent-2)' : 'var(--talk-accent)'}`,
                padding: '1.1cqw 1.4cqw',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--talk-font-mono)',
                  fontSize: '0.95cqw',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--talk-muted)',
                  marginBottom: '0.4cqw',
                }}
              >
                {h.source}
              </div>
              <div style={{ fontFamily: 'var(--talk-font-display)', fontSize: '1.5cqw', color: 'var(--talk-ink-bright)' }}>
                “{h.text}”
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        style={{ width: content.headlines ? '46cqw' : '54cqw' }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content.chart === 'crossover' && <CrossoverLines />}
        {content.chart === 'growth' && <GrowthLine />}
      </motion.div>

      <div style={{ display: 'flex', gap: '2cqw', marginTop: '2.4cqh', alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: 'var(--talk-font-mono)',
            fontSize: 'var(--fs-kicker)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--talk-muted)',
          }}
        >
          Source · {content.source}
        </span>
      </div>
      {content.footnote && (
        <p className="num muted" style={{ fontSize: 'var(--fs-micro)', marginTop: '0.8cqh', fontStyle: 'italic' }}>
          {content.footnote}
        </p>
      )}
    </div>
  )
}
