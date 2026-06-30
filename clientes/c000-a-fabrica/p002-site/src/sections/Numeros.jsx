import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const nums = [
  { target: 12, suffix: '+', label: 'Anos de experiência' },
  { target: 50, suffix: '+', label: 'Projetos entregues' },
  { target: 100, suffix: '%', label: 'Foco em resultado real' },
  { target: 3, suffix: 'x', label: 'Mais rápido que agência grande' },
]

function CountUp({ target, suffix, triggered }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const start = Date.now()
    const dur = 2000
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, target])

  return <>{val}<span style={{ color: '#CCFF00' }}>{suffix}</span></>
}

export default function Numeros() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} id="numeros" style={{
      background: '#fff',
      borderTop: '1px solid rgba(10,10,10,0.06)',
      borderBottom: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 1, background: 'rgba(10,10,10,0.06)',
      }}>
        {nums.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#fff', padding: 'clamp(44px, 5vw, 64px) clamp(24px, 3vw, 40px)', textAlign: 'center' }}
          >
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(52px, 7vw, 88px)',
              fontWeight: 900, lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#0A0A0A',
            }}>
              <CountUp target={n.target} suffix={n.suffix} triggered={inView} />
            </div>
            <div style={{ fontSize: 13, color: '#888882', marginTop: 14, fontWeight: 500, lineHeight: 1.45 }}>
              {n.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
