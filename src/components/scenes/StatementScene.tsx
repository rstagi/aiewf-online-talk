import { motion } from 'framer-motion'
import type { StatementSlide } from '../../data/slides'
import { renderRich } from '../core/rich'
import { Raven } from '../world/Raven'

/* Editorial statement beat. Left-aligned, the spine lines that have to land.
   subStep 1 reveals the trailing clause; an optional muted anchor lands after. */
export function StatementScene({ content, subStep }: { content: StatementSlide['content']; subStep: number }) {
  return (
    <div className="scene">
      {content.raven && (
        <div style={{ position: 'absolute', top: '14cqh', right: '9cqw', opacity: 0.9 }}>
          <Raven width="16cqw" />
        </div>
      )}

      {content.kicker && <div className="kicker" style={{ marginBottom: '1.4cqw' }}>{content.kicker}</div>}

      <h2 className="statement" style={content.compact ? { fontSize: '4.4cqw', maxWidth: '24ch' } : undefined}>
        {renderRich(content.main)}
        {content.reveal && (
          <motion.span
            // always mounted so it reserves its space from step 0 — only opacity
            // animates in, so the lines above never reflow when it appears
            initial={false}
            animate={{ opacity: subStep >= 1 || content.revealAsSubhead ? 1 : 0, y: subStep >= 1 || content.revealAsSubhead ? 0 : 8 }}
            transition={{ duration: 0.45, delay: content.revealAsSubhead ? 0.12 : 0 }}
            style={
              content.revealAsSubhead
                ? { display: 'block', marginTop: '0.5em', fontSize: '2.6cqw', lineHeight: 1.18, color: 'var(--talk-muted)' }
                : { display: content.revealBlock ? 'block' : 'inline', marginTop: content.revealBlock ? '0.4em' : 0 }
            }
          >
            {!content.revealBlock && !content.revealAsSubhead && ' '}
            {renderRich(content.reveal)}
          </motion.span>
        )}
      </h2>

      {content.anchor && (
        <motion.p
          className="num muted"
          // always mounted; space reserved up front, fades in on its step
          initial={false}
          animate={{ opacity: subStep >= 1 || !content.reveal ? 1 : 0, y: subStep >= 1 || !content.reveal ? 0 : 8 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{ fontSize: content.compact ? '1.8cqw' : 'var(--fs-num)', marginTop: content.compact ? '2cqw' : '3cqw', letterSpacing: '0.02em' }}
        >
          {renderRich(content.anchor)}
        </motion.p>
      )}

      {content.coda && (
        <motion.p
          className="num muted"
          // staged aside below the anchor; matches the anchor's mono style.
          // always mounted so nothing reflows
          initial={false}
          animate={{ opacity: subStep >= 1 ? 1 : 0, y: subStep >= 1 ? 0 : 8 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          style={{ fontSize: content.compact ? '1.8cqw' : 'var(--fs-num)', marginTop: '1.4cqw', letterSpacing: '0.02em' }}
        >
          {renderRich(content.coda)}
        </motion.p>
      )}

      {/* optional receipt — a real screenshot rendered under the line (the Bun
          acquisition headline). Light card pops against the dark realm. */}
      {content.image && (
        <motion.img
          src={content.image}
          alt={content.imageAlt ?? ''}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'block',
            marginTop: '3.4cqw',
            width: '46cqw',
            borderRadius: '8px',
            border: '1px solid var(--talk-rule)',
            boxShadow: '0 12px 44px rgba(0,0,0,0.45)',
          }}
        />
      )}

      {/* optional receipts row — two real GitHub Octoverse screenshots pinned
          side by side (the overtake evidence). Scaled to a common height so the
          wide 2024 banner and the taller 2025 block read as two clippings;
          accent-mapped (2024 → Python teal, 2025 → TypeScript vermilion). */}
      {content.receipts && (
        <div style={{ display: 'flex', gap: '2.4cqw', alignItems: 'flex-start', marginTop: '3cqw', flexWrap: 'wrap', justifyContent: 'center' }}>
          {content.receipts.map((r, i) => (
            <motion.figure
              key={r.src}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.18 }}
              style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7cqw', maxWidth: '44cqw' }}
            >
              <figcaption
                style={{
                  fontFamily: 'var(--talk-font-mono)',
                  fontSize: '1cqw',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: r.accent === 'ts' ? 'var(--talk-accent)' : 'var(--talk-accent-2)',
                }}
              >
                {r.label}
              </figcaption>
              <img
                src={r.src}
                alt={r.alt}
                style={{
                  display: 'block',
                  width: 'auto',
                  height: 'auto',
                  // bound BOTH dimensions so the wide 2024 banner and the taller
                  // 2025 block read as two clippings of near-equal visual weight,
                  // rather than equal-height (which shrank 2025 to ~1/3 scale).
                  maxWidth: '42cqw',
                  maxHeight: '34cqh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid var(--talk-rule)',
                  borderLeft: `3px solid ${r.accent === 'ts' ? 'var(--talk-accent)' : 'var(--talk-accent-2)'}`,
                  boxShadow: '0 12px 44px rgba(0,0,0,0.45)',
                }}
              />
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  )
}
