import { motion } from 'framer-motion'
import type { AboutSlide } from '../../data/slides'
import { HouseSigil } from '../world/HouseSigil'
import { renderRich } from '../core/rich'

/* "About me" — the one step out of the saga: who's making the claim. A real
   portrait (a personal photo, not AI fill) over the heritage crest (faded JS →
   lit TS), with the org marks (Ratel · AI Socratic) sealed underneath. */
export function AboutScene({ content }: { content: AboutSlide['content'] }) {
  return (
    <div className="scene" style={{ justifyContent: 'center', gap: '3.4cqw' }}>
      <motion.div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4cqw', width: '100%' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ flex: '1 1 62%' }}>
          <div className="kicker kicker--muted">{content.kicker}</div>
          <div className="flourish" style={{ margin: '1.4cqw 0' }} />
          <h1 className="display" style={{ fontSize: 'var(--fs-display)' }}>
            {content.name}
          </h1>
          <p className="lead" style={{ marginTop: '1.4cqw' }}>
            {content.role}
          </p>
          <p className="body" style={{ marginTop: '0.5cqw' }}>
            {content.org}
          </p>
          {content.affiliation && (
            <p className="body muted" style={{ marginTop: '0.9cqw' }}>
              {content.affiliation}
            </p>
          )}
          <p className="body" style={{ marginTop: '1.6cqw' }}>
            {renderRich(content.heritage)}
          </p>
        </div>

        <div style={{ flex: '1 1 38%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.2cqw' }}>
          <img
            src={`${import.meta.env.BASE_URL}roberto.png`}
            alt="Roberto Stagi"
            style={{
              width: '16cqw',
              height: '16cqw',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--talk-rule)',
              boxShadow: '0 14px 44px rgba(0,0,0,0.5)',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.6cqw' }}>
            <HouseSigil house="js" size="5cqw" showName dimmed />
            <span style={{ fontFamily: 'var(--talk-font-display)', fontSize: '2.6cqw', color: 'var(--talk-muted)' }}>→</span>
            <HouseSigil house="typescript" size="6cqw" showName />
          </div>
        </div>
      </motion.div>

      {/* the org marks, sealed underneath — Ratel on parchment, AI Socratic on ink */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '2cqw', alignSelf: 'flex-start' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <LogoChip src={`${import.meta.env.BASE_URL}ratel-logo.png`} alt="Ratel" tone="parchment" />
        <LogoChip src={`${import.meta.env.BASE_URL}ai-socratic-logo.png`} alt="AI Socratic community" tone="ink" />
      </motion.div>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '2cqw', alignSelf: 'flex-start' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="body muted">
          <ContactLink href="https://ratel.sh" label="ratel.sh" />
          <Sep />
          <ContactLink href="https://aisocratic.org" label="aisocratic.org" />
          <Sep />
          <ContactLink href="https://www.linkedin.com/in/rstagi" label="in/rstagi" />
          <Sep />
          <ContactLink href="https://x.com/rstagi_" label="@rstagi_" />
        </p>
      </motion.div>
    </div>
  )
}

/* A small separator dot between contact links. */
function Sep() {
  return <span style={{ margin: '0 1.4cqw' }}>•</span>
}

/* A contact link — opens in a new tab, inherits the muted body tone. */
function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--talk-rule)' }}
    >
      {label}
    </a>
  )
}

/* A logo on a small sealed card. Ratel's mark is dark-green and needs a light
   ground; AI Socratic's wordmark is white and needs a dark ground. */
function LogoChip({ src, alt, tone }: { src: string; alt: string; tone: 'parchment' | 'ink' }) {
  const parchment = tone === 'parchment'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '5.2cqw',
        padding: '0 1.6cqw',
        borderRadius: '6px',
        background: parchment ? 'var(--talk-ink)' : 'var(--talk-surface)',
        border: `1px solid ${parchment ? 'transparent' : 'var(--talk-rule)'}`,
      }}
    >
      <img src={src} alt={alt} style={{ height: '2.9cqw', width: 'auto', display: 'block' }} />
    </div>
  )
}
