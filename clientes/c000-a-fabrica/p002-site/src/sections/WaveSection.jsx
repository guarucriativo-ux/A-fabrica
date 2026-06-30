import { useRef, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'
import TremWaves from '../svgs/TremWaves'

export default function WaveSection({ flip = false }) {
  const ref = useRef(null)
  const progress = useMotionValue(0)

  useEffect(() => {
    let raf
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const raw = 1 - rect.bottom / (vh + rect.height)
        progress.set(Math.max(0, Math.min(1, raw)))
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [progress])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: 'clamp(280px, 34vw, 460px)',
        overflow: 'hidden',
        background: '#F8F8F4',
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <div style={{ position: 'absolute', inset: '-5% -2% -15%' }}>
        <TremWaves progress={progress} />
      </div>
    </div>
  )
}
