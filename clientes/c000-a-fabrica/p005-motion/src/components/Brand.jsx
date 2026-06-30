import { interpolate, useCurrentFrame } from 'remotion'

export function GuaruLogo({ startFrame = 0, size = 28 }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Quadrado lime = marca */}
      <div style={{
        width: size,
        height: size,
        background: '#CCFF00',
        borderRadius: 3,
      }} />
      <span style={{
        fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
        fontSize: size * 0.75,
        fontWeight: 600,
        color: '#F0F0EC',
        letterSpacing: '-0.01em',
      }}>
        Guaru Estúdio
      </span>
    </div>
  )
}

export function InstagramHandle({ startFrame = 0 }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{
      opacity,
      fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
      fontSize: 20,
      fontWeight: 400,
      color: 'rgba(240,240,236,0.45)',
      letterSpacing: '0.02em',
    }}>
      @guaruestudio
    </div>
  )
}

export function LimeLine({ startFrame = 0, width = '100%' }) {
  const frame = useCurrentFrame()
  const scaleX = interpolate(frame, [startFrame, startFrame + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{
      width,
      height: 2,
      background: '#CCFF00',
      transformOrigin: 'left center',
      transform: `scaleX(${scaleX})`,
    }} />
  )
}
