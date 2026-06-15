import { HOUSES, houseColor, type HouseKey } from '../../data/houses'

interface Props {
  house: HouseKey
  /** crest width as a CSS length (container-query unit by default) */
  size?: string
  showName?: boolean
  dimmed?: boolean
}

/* Heraldic crest per house — line-art shield + a distinguishing motif.
   The shield outline is manuscript ink (rule); the motif carries the house color. */
export function HouseSigil({ house, size = '8cqw', showName = false, dimmed = false }: Props) {
  const color = houseColor(house)
  const meta = house !== 'unknown' ? HOUSES[house] : null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7cqw',
        opacity: dimmed ? 0.4 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <svg
        width={size}
        viewBox="0 0 100 118"
        style={{ color, overflow: 'visible', display: 'block', height: 'auto' }}
        aria-hidden
      >
        {/* shield */}
        <path
          d="M10 8 H90 V58 C90 88 70 106 50 114 C30 106 10 88 10 58 Z"
          fill="rgba(33,27,21,0.55)"
          stroke="var(--talk-rule)"
          strokeWidth="2"
        />
        {/* inner hairline */}
        <path
          d="M16 14 H84 V57 C84 83 67 99 50 106 C33 99 16 83 16 57 Z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {motif(house)}
      </svg>

      {showName && meta && (
        <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
          <div
            style={{
              fontFamily: 'var(--talk-font-display)',
              fontSize: '1.7cqw',
              color: 'var(--talk-ink-bright)',
            }}
          >
            {meta.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--talk-font-mono)',
              fontSize: '1.1cqw',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color,
            }}
          >
            {meta.word}
          </div>
        </div>
      )}
    </div>
  )
}

function motif(house: HouseKey) {
  switch (house) {
    case 'python':
      // two entwined serpents (the brain that thinks; Python = the snake)
      return (
        <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
          <path d="M38 34 C58 40 42 54 50 62 C58 70 42 84 60 92" />
          <path d="M62 34 C42 40 58 54 50 62 C42 70 58 84 40 92" />
          <circle cx="38" cy="33" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="62" cy="33" r="2.6" fill="currentColor" stroke="none" />
        </g>
      )
    case 'typescript':
      // upward blade / chevron — the riser — behind a TS monogram
      return (
        <g>
          <path
            d="M50 28 L70 78 H30 Z"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="2.4"
          />
          <text
            x="50"
            y="72"
            textAnchor="middle"
            fontFamily="var(--talk-font-display)"
            fontWeight="600"
            fontSize="34"
            fill="currentColor"
          >
            TS
          </text>
        </g>
      )
    case 'js':
      // toppled crown above a faded JS monogram — the deposed king
      return (
        <g>
          <g transform="rotate(-12 50 36)">
            <path
              d="M34 42 L34 30 L42 36 L50 26 L58 36 L66 30 L66 42 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
          </g>
          <text
            x="50"
            y="86"
            textAnchor="middle"
            fontFamily="var(--talk-font-display)"
            fontWeight="600"
            fontSize="30"
            fill="currentColor"
          >
            JS
          </text>
        </g>
      )
    default:
      // unknown contender — a carved question
      return (
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fontFamily="var(--talk-font-display)"
          fontWeight="600"
          fontSize="44"
          fill="currentColor"
        >
          ?
        </text>
      )
  }
}
