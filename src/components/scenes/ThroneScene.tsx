import { motion, AnimatePresence } from 'framer-motion'
import type { ThroneSlide } from '../../data/slides'
import type { HouseKey } from '../../data/houses'
import { Throne } from '../world/Throne'
import { renderRich } from '../core/rich'

export function ThroneScene({ content, subStep }: { content: ThroneSlide['content']; subStep: number }) {
  const { beats } = content
  const holder = beats[Math.min(subStep, beats.length - 1)].holder
  const active = (i: number) => subStep >= i

  if (content.variant === 'fullbleed') {
    return <CrowningScene content={content} holder={holder} active={active} />
  }
  if (content.variant === 'court') {
    return <CourtScene content={content} holder={holder} />
  }
  if (content.variant === 'challenger') {
    return <ChallengerScene content={content} holder={holder} active={active} />
  }

  // normal + cta: text left, throne right
  const captions = beats.filter((b, i) => active(i) && b.caption)

  return (
    <div className="scene" style={{ flexDirection: 'row', alignItems: 'center', gap: '3cqw' }}>
      <div style={{ flex: '1 1 56%' }}>
        {content.kicker && <div className="kicker kicker--muted" style={{ marginBottom: '1.4cqw' }}>{content.kicker}</div>}
        <h2 className="statement" style={{ fontSize: 'var(--fs-h2)' }}>
          {renderRich(content.assertion)}
        </h2>

        <AnimatePresence>
          {captions.map((b, i) => (
            <motion.p
              key={i}
              className="lead muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: '2cqw', fontStyle: 'italic' }}
            >
              {b.caption}
            </motion.p>
          ))}
        </AnimatePresence>

        {content.cta && (
          <AnimatePresence>
            {active(1) && (
              <motion.p
                className="body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: '2.4cqw', borderLeft: '2px solid var(--talk-accent)', paddingLeft: '1.4cqw' }}
              >
                {content.cta}
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>

      <div style={{ flex: '1 1 44%', display: 'flex', justifyContent: 'center' }}>
        <Throne holder={holder} width="30cqw" hushed={holder === 'unknown'} />
      </div>
    </div>
  )
}

/* Folio 9 — THE CROWNING. Throne center, headlines slam in as royal
   proclamations, the deadpan punch lands last. */
function CrowningScene({
  content,
  holder,
  active,
}: {
  content: ThroneSlide['content']
  holder: import('../../data/houses').HouseKey
  active: (i: number) => boolean
}) {
  const headlines = content.beats
    .map((b, i) => ({ ...b, i }))
    .filter(b => b.headline && active(b.i))
  const punchBeat = content.beats.findIndex(b => b.punch)

  // a beat may carry a caption that replaces the headline as the current "moment"
  // line (slide 3's two-moment split). Without one, the fixed assertion stands.
  const twoMoment = content.beats.some(b => b.caption)
  const captioned = content.beats
    .map((b, i) => ({ b, i }))
    .filter(({ b, i }) => b.caption && active(i))
    .pop()
  const line = captioned ? captioned.b.caption! : content.assertion

  return (
    <div className="scene" style={{ justifyContent: 'flex-start', paddingTop: '13cqh' }}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={line}
          className="h2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: '30ch', minHeight: '13cqh', zIndex: 3 }}
        >
          {renderRich(line)}
        </motion.h2>
      </AnimatePresence>

      {/* throne, centered behind the proclamations */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -46%)',
          zIndex: 0,
        }}
      >
        <Throne holder={holder} width="30cqw" />
      </div>

      {/* royal proclamations slam in. Slide 11 nails two at angles flanking the
          throne; the two-moment slide 3 drops its single headline low-right,
          clear of the moment text up top. */}
      <AnimatePresence>
        {headlines.map((b, idx) => (
          <motion.div
            key={b.i}
            initial={{ opacity: 0, scale: 1.18, rotate: idx === 0 ? -4 : 3 }}
            animate={{ opacity: 1, scale: 1, rotate: twoMoment ? 2.4 : idx === 0 ? -3 : 2.4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: twoMoment ? '50cqh' : idx === 0 ? '34cqh' : '52cqh',
              left: twoMoment ? 'auto' : idx === 0 ? '8cqw' : 'auto',
              right: twoMoment ? '8cqw' : idx === 0 ? 'auto' : '8cqw',
              width: '34cqw',
              background: 'var(--talk-surface)',
              border: '1px solid var(--talk-rule)',
              borderLeft: '3px solid var(--talk-accent)',
              padding: '1.6cqw 2cqw',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--talk-font-mono)',
                fontSize: '1.15cqw',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--talk-muted)',
                marginBottom: '0.5cqw',
              }}
            >
              {b.headline!.source}
            </div>
            <div style={{ fontFamily: 'var(--talk-font-display)', fontSize: '2.6cqw', color: 'var(--talk-ink-bright)' }}>
              “{b.headline!.text}”
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* the deadpan punch */}
      <AnimatePresence>
        {punchBeat >= 0 && active(punchBeat) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', bottom: '9cqh', left: 'var(--margin)', zIndex: 3 }}
          >
            <span className="statement" style={{ fontSize: 'var(--fs-statement)' }}>
              {content.beats[punchBeat].punch}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* A single courtier: a cloaked figure in a deep bow, head dipped to the floor
   toward the throne (the meme homage). Base figure bows to the right; mirror it
   for the courtiers standing on the throne's right. */
function BowingCourtier({ flip }: { flip: boolean }) {
  return (
    <svg
      viewBox="0 0 72 66"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      {/* robe: a kneeling mass puddling to the floor */}
      <path
        d="M6 64 C6 36 18 26 34 26 C52 26 64 40 64 64 Z"
        fill="var(--talk-muted)"
        fillOpacity="0.22"
        stroke="var(--talk-muted)"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      {/* hood seam down the bowed back */}
      <path d="M40 28 C44 42 50 52 56 62" fill="none" stroke="var(--talk-muted)" strokeOpacity="0.45" strokeWidth="1.4" />
      {/* an arm reaching forward to the floor — a deep bow toward the throne */}
      <path d="M50 50 C58 56 64 60 68 63" fill="none" stroke="var(--talk-muted)" strokeOpacity="0.7" strokeWidth="2.4" strokeLinecap="round" />
      {/* head, bowed low and forward toward the throne */}
      <circle cx="52" cy="47" r="8.5" fill="var(--talk-muted)" fillOpacity="0.5" stroke="var(--talk-muted)" strokeOpacity="0.85" strokeWidth="2" />
    </svg>
  )
}

/* Python the AI king — throne centered, every other language kneeling in a bow
   at the foot of the dais (the meme homage, in manuscript ink). */
function CourtScene({
  content,
  holder,
}: {
  content: ThroneSlide['content']
  holder: HouseKey
}) {
  const courtiers = content.courtiers ?? []
  const mid = (courtiers.length - 1) / 2

  return (
    <div className="scene" style={{ justifyContent: 'flex-start', paddingTop: '12cqh' }}>
      <h2 className="h2" style={{ maxWidth: '26ch', zIndex: 3 }}>
        {renderRich(content.assertion)}
      </h2>

      {/* throne, centered */}
      <div style={{ position: 'absolute', top: '43%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <Throne holder={holder} width="24cqw" />
      </div>

      {/* the court, bowing in an arc at the foot of the dais */}
      <div
        style={{
          position: 'absolute',
          bottom: '10cqh',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '2.2cqw',
          zIndex: 2,
        }}
      >
        {courtiers.map((name, i) => {
          const dist = Math.abs(i - mid)
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 * i }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5cqw',
                // outer courtiers sit a touch higher → a shallow fan toward the dais
                transform: `translateY(${-dist * 0.5}cqh)`,
              }}
            >
              <div style={{ width: '4.6cqw', height: '4.2cqw' }}>
                <BowingCourtier flip={i > mid} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--talk-font-mono)',
                  fontSize: '1.25cqw',
                  letterSpacing: '0.06em',
                  color: 'var(--talk-muted)',
                }}
              >
                {name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* The challenger — Python still seated and lit, but a nameless vermilion "?"
   rises at the foot of the dais (moment 1), then resolves into TypeScript
   (moment 2), its glow climbing toward the seat. */
function ChallengerScene({
  content,
  holder,
  active,
}: {
  content: ThroneSlide['content']
  holder: HouseKey
  active: (i: number) => boolean
}) {
  const showTS = active(1)

  return (
    <div className="scene" style={{ justifyContent: 'flex-start', paddingTop: '12cqh' }}>
      <h2 className="h2" style={{ maxWidth: '28ch', zIndex: 3 }}>
        {renderRich(content.assertion)}
      </h2>

      {/* throne, centered, Python lit */}
      <div style={{ position: 'absolute', top: '46%', left: '54%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <Throne holder={holder} width="26cqw" />
      </div>

      {/* the rising challenger: a vermilion glow + a "?" that becomes TypeScript */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '12cqh',
          left: '7cqw',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* the shadow it throws up the steps */}
        <div
          style={{
            position: 'absolute',
            bottom: '1cqh',
            left: '50%',
            width: '20cqw',
            height: '44cqh',
            transform: 'translateX(-50%) skewX(-9deg)',
            background: 'var(--talk-accent)',
            opacity: 0.16,
            filter: 'blur(30px)',
            zIndex: -1,
          }}
        />
        <AnimatePresence mode="wait">
          {showTS ? (
            <motion.div
              key="ts"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <span
                style={{
                  fontFamily: 'var(--talk-font-display)',
                  fontWeight: 600,
                  fontSize: '18cqh',
                  lineHeight: 1,
                  color: 'var(--talk-accent)',
                }}
              >
                TS
              </span>
              <span
                style={{
                  fontFamily: 'var(--talk-font-display)',
                  fontSize: '2.6cqw',
                  letterSpacing: '0.01em',
                  color: 'var(--talk-accent)',
                  marginTop: '0.4cqw',
                }}
              >
                TypeScript
              </span>
            </motion.div>
          ) : (
            <motion.span
              key="q"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: 'var(--talk-font-display)',
                fontWeight: 600,
                fontSize: '20cqh',
                lineHeight: 1,
                color: 'var(--talk-accent)',
              }}
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
