import { useRef, useEffect, useState } from 'react'
import TremWaves from '../svgs/TremWaves'

export default function WaveSection({ flip = false }) {
  const ref = useRef(null)
  const [ty, setTy] = useState(0)

  useEffect(() => {
    let raf
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        // progress: 0 = section just entering bottom of viewport
        //           1 = section top reached viewport top
        const raw = 1 - rect.bottom / (vh + rect.height)
        const clamped = Math.max(0, Math.min(1, raw))
        // Hills sobem 100px conforme a section entra no viewport
        setTy(clamped * -100)
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: 'clamp(260px, 32vw, 420px)',
        overflow: 'hidden',
        background: '#F8F8F4',
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: '-20% -2% -5%',
        transform: `translateY(${ty}px)`,
        willChange: 'transform',
      }}>
        <TremWaves />
      </div>
    </div>
  )
}
