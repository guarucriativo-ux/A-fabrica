import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const dur = 1400
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / dur) * 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 300)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: '#0A0A0A',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <div style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#F0F0EC',
            textTransform: 'uppercase',
          }}>
            GUARU<span style={{ color: '#CCFF00' }}>.</span>
          </div>
          <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
              style={{ height: '100%', background: '#F0F0EC', position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
