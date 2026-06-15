import { motion } from 'framer-motion'
import type { TitleSlide } from '../../data/slides'
import { Throne } from '../world/Throne'
import { HouseSigil } from '../world/HouseSigil'
import { renderRich } from '../core/rich'

/* Saga title card (folios 1 & 20). Asymmetric: title block hangs off the left
   margin, the throne stands to the right. Ceremonial but not a default title slide. */
export function TitleScene({ content, subStep = 0 }: { content: TitleSlide['content']; subStep?: number }) {
  const holder = content.throneHolder ?? (content.closing ? 'typescript' : 'js')
  const showSigils = !content.closing && holder !== 'unknown'
  // when an overline is present, the title + byline stage in on subStep 1;
  // always mounted (opacity only) so nothing reflows when they appear.
  const titleShown = subStep >= 1 || !content.overline

  return (
    <div className="scene" style={{ flexDirection: 'row', alignItems: 'center', gap: '4cqw' }}>
      <motion.div
        style={{ flex: '1 1 58%' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {content.overline && (
          <h2
            className="display"
            style={{ fontSize: '3.4cqw', lineHeight: 1.1, maxWidth: '24ch', marginBottom: '2cqw', color: 'var(--talk-ink-bright)' }}
          >
            {renderRich(content.overline)}
          </h2>
        )}
        {content.kicker && <div className="kicker">{content.kicker}</div>}
        <div className="flourish" style={{ margin: '1.6cqw 0' }} />
        <motion.h1 className="display" style={{ fontSize: 'var(--fs-display)' }} initial={false} animate={{ opacity: titleShown ? 1 : 0, y: titleShown ? 0 : 10 }} transition={{ duration: 0.5 }}>
          {renderRich(content.title)}
        </motion.h1>
        {content.subtitle && (
          <p
            className="lead"
            style={{ marginTop: '1.6cqw', color: content.closing ? 'var(--talk-ink-bright)' : 'var(--talk-ink)' }}
          >
            {renderRich(content.subtitle)}
          </p>
        )}
        <motion.p className="byline" style={{ marginTop: '2.6cqw' }} initial={false} animate={{ opacity: titleShown ? 1 : 0, y: titleShown ? 0 : 10 }} transition={{ duration: 0.5, delay: 0.08 }}>
          {content.byline}
        </motion.p>
      </motion.div>

      <motion.div
        style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6cqw' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <Throne holder={holder} width="26cqw" hushed={!content.closing} />
        {showSigils && (
          <div style={{ display: 'flex', gap: '2.4cqw', alignItems: 'flex-end' }}>
            <HouseSigil house="js" size="5cqw" />
            <HouseSigil house="python" size="5cqw" />
            <HouseSigil house="typescript" size="5cqw" />
          </div>
        )}
      </motion.div>
    </div>
  )
}
