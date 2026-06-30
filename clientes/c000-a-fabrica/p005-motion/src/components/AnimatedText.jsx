import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

// Anima cada palavra individualmente
export function AnimatedWords({ text, startFrame = 0, color = '#F0F0EC', fontSize = 72, delay = 4 }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const words = text.split(' ')

  return (
    <span style={{ display: 'inline' }}>
      {words.map((word, i) => {
        const wordStart = startFrame + i * delay
        const opacity = interpolate(frame, [wordStart, wordStart + 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const y = interpolate(frame, [wordStart, wordStart + 10], [18, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${y}px)`,
              marginRight: '0.28em',
              color,
              fontSize,
              fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {word}
          </span>
        )
      })}
    </span>
  )
}

// Linha inteira que aparece de uma vez (fade + slide up)
export function AnimatedLine({ text, startFrame = 0, color = '#F0F0EC', fontSize = 64, weight = 500 }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const y = interpolate(frame, [startFrame, startFrame + 16], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        color,
        fontSize,
        fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
        fontWeight: weight,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </div>
  )
}

// Linha de destaque — grande, impactante
export function ImpactLine({ text, startFrame = 0, color = '#CCFF00', fontSize = 96 }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  })

  const opacity = interpolate(frame, [startFrame, startFrame + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scale = interpolate(progress, [0, 1], [0.88, 1])

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
        color,
        fontSize,
        fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
        fontWeight: 700,
        lineHeight: 1.0,
        letterSpacing: '-0.04em',
      }}
    >
      {text}
    </div>
  )
}
