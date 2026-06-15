import { houseColor, type HouseKey } from '../../data/houses'
import type { Chapter } from '../../data/chapters'

interface Props {
  chapter: Chapter
  holder: HouseKey
  index: number // 0-based
  total: number
  visible: boolean
}

/* Persistent realm chrome: the current Book (top-left), who holds the throne
   (top-right), the folio counter + a thin war-for-the-throne rule (bottom). */
export function RealmChrome({ chapter, holder, index, total, visible }: Props) {
  const color = houseColor(holder)
  const progress = (index + 1) / total

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* top-left — current book */}
      <div style={{ position: 'absolute', top: '5cqh', left: 'var(--margin)' }}>
        <div
          style={{
            fontFamily: 'var(--talk-font-mono)',
            fontSize: 'var(--fs-kicker)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--talk-muted)',
          }}
        >
          Book {chapter.roman}
        </div>
        <div className="eyebrow-row" style={{ marginTop: '0.4cqw' }}>
          <span style={{ width: '2.6cqw', height: 1, background: 'var(--talk-rule)' }} />
          <span
            style={{
              fontFamily: 'var(--talk-font-display)',
              fontSize: '1.9cqw',
              fontStyle: 'italic',
              color: 'var(--talk-ink)',
            }}
          >
            {chapter.title}
          </span>
        </div>
      </div>

      {/* bottom-left — folio */}
      <div
        style={{
          position: 'absolute',
          bottom: '5cqh',
          left: 'var(--margin)',
          fontFamily: 'var(--talk-font-mono)',
          fontSize: 'var(--fs-kicker)',
          letterSpacing: '0.18em',
          color: 'var(--talk-muted)',
        }}
      >
        FOLIO {String(index + 1).padStart(2, '0')} / {total}
      </div>

      {/* bottom-right — nav hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '5cqh',
          right: 'var(--margin)',
          fontFamily: 'var(--talk-font-mono)',
          fontSize: 'var(--fs-kicker)',
          letterSpacing: '0.14em',
          color: 'var(--talk-rule)',
        }}
      >
        ← →
      </div>

      {/* war-for-the-throne rule along the very bottom */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--talk-rule)' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: color,
            opacity: 0.8,
            transition: 'width 0.5s ease, background 0.6s ease',
          }}
        />
      </div>
    </div>
  )
}
