import { motion, AnimatePresence } from 'framer-motion'
import { HOUSES, houseColor, type HouseKey } from '../../data/houses'

interface Props {
  holder: HouseKey
  /** wrapper width as a CSS length (defaults to a container-query unit) */
  width?: string
  /** dim the whole throne (e.g. while the seat is contested) */
  hushed?: boolean
}

// a fan of blades across the top of the backrest — the Iron-Throne silhouette
const BLADES = Array.from({ length: 13 }, (_, i) => {
  const offset = i - 6
  return {
    x: 180 + offset * 12.5,
    rot: offset * 6.2,
    len: 150 - Math.abs(offset) * 9,
  }
})

/* The AIron Throne. The throne itself is neutral manuscript ink; the HOLDER's
   house color + draped sigil-banner is what flips JS → Python → TypeScript. */
export function Throne({ holder, width = '34cqw', hushed = false }: Props) {
  const color = houseColor(holder)
  const meta = holder !== 'unknown' ? HOUSES[holder] : null
  const monogram = holder === 'js' ? 'JS' : holder === 'python' ? 'Py' : holder === 'typescript' ? 'TS' : '?'

  return (
    <svg
      width="100%"
      viewBox="0 0 360 390"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', width, height: 'auto', overflow: 'visible', opacity: hushed ? 0.5 : 1, transition: 'opacity 0.5s ease' }}
      aria-hidden
    >
      {/* seat glow in the holder's color */}
      <AnimatePresence mode="wait">
        <motion.ellipse
          key={`glow-${holder}`}
          cx="180"
          cy="250"
          rx="150"
          ry="120"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: holder === 'unknown' ? 0.05 : 0.16 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ filter: 'blur(28px)' }}
        />
      </AnimatePresence>

      {/* blades */}
      <g>
        {BLADES.map((b, i) => (
          <g key={i} transform={`rotate(${b.rot} ${b.x} 175)`}>
            <path
              d={`M${b.x - 5} 175 L${b.x} ${175 - b.len} L${b.x + 5} 175 Z`}
              fill="var(--talk-surface)"
              stroke="var(--talk-rule)"
              strokeWidth="1.5"
            />
            <line
              x1={b.x}
              y1={175 - b.len}
              x2={b.x}
              y2="175"
              stroke="var(--talk-muted)"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
          </g>
        ))}
      </g>

      {/* backrest */}
      <path
        d="M96 175 H264 V250 H96 Z"
        fill="var(--talk-surface)"
        stroke="var(--talk-rule)"
        strokeWidth="2"
      />

      {/* draped sigil-banner over the seat back */}
      <AnimatePresence mode="wait">
        {meta && (
          <motion.g
            key={`banner-${holder}`}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M150 168 H210 V250 L180 236 L150 250 Z"
              fill={color}
              fillOpacity="0.16"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x="180"
              y="214"
              textAnchor="middle"
              fontFamily="var(--talk-font-display)"
              fontWeight="600"
              fontSize="30"
              fill={color}
            >
              {monogram}
            </text>
          </motion.g>
        )}
        {holder === 'unknown' && (
          <motion.text
            key="banner-unknown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            x="180"
            y="222"
            textAnchor="middle"
            fontFamily="var(--talk-font-display)"
            fontWeight="600"
            fontSize="46"
            fill="var(--talk-muted)"
          >
            ?
          </motion.text>
        )}
      </AnimatePresence>

      {/* armrests + seat */}
      <rect x="84" y="248" width="192" height="20" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />
      <rect x="84" y="248" width="20" height="70" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />
      <rect x="256" y="248" width="20" height="70" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />

      {/* dais steps */}
      <rect x="70" y="318" width="220" height="22" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />
      <rect x="46" y="340" width="268" height="24" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />
      <rect x="22" y="364" width="316" height="24" fill="var(--talk-surface)" stroke="var(--talk-rule)" strokeWidth="2" />
    </svg>
  )
}
