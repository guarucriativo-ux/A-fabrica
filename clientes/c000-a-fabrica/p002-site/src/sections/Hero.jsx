import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)

  // RAF scroll tracking — garante funcionamento com Lenis (lê getBoundingClientRect, não window.scrollY)
  const scrollProgress = useMotionValue(0)
  useEffect(() => {
    let raf
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, -rect.top / rect.height))
        scrollProgress.set(p)
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [scrollProgress])

  const textY = useTransform(scrollProgress, [0, 1], ['0%', '22%'])
  const mountainScale = useTransform(scrollProgress, [0, 1], [1, 1.30])
  const mountainY = useTransform(scrollProgress, [0, 1], ['0%', '14%'])
  const textOpacity = useTransform(scrollProgress, [0, 0.45], [1, 0])

  return (
    <section ref={ref} id="hero" style={{
      height: '100vh', minHeight: 640,
      position: 'relative', overflow: 'hidden',
      background: '#F8F8F4',
    }}>
      {/* Névoa atmosférica — inspirada no WebGL do Tresmares */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 55% at 50% 80%, rgba(215,213,207,0.6) 0%, rgba(248,248,244,0) 65%)',
      }} />

      {/* Montanha vetorizada com parallax zoom — zoom in conforme rola */}
      <motion.div
        style={{
          position: 'absolute', bottom: '-8%', left: '-5%',
          width: '110%', zIndex: 0, pointerEvents: 'none',
          scale: mountainScale, y: mountainY,
          transformOrigin: 'center bottom',
        }}
      >
        <img
          src="/A-fabrica/img/mountains.svg"
          alt=""
          style={{
            width: '100%', height: 'auto', display: 'block',
            filter: 'brightness(2.8) saturate(0) contrast(0.75)',
            opacity: 0.42,
          }}
        />
      </motion.div>

      {/* Conteúdo textual */}
      <motion.div style={{ y: textY, opacity: textOpacity, position: 'relative', zIndex: 2, height: '100%' }}>
        <div style={{
          height: '100%',
          padding: 'clamp(120px, 16vh, 200px) clamp(24px, 5vw, 80px) 80px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          maxWidth: 1200,
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)',
              marginBottom: 28,
            }}
          >
            Guaru Estúdio — Agência de Design
          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 1.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(48px, 8vw, 116px)',
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: '#0A0A0A',
                maxWidth: 820,
                marginBottom: 48,
              }}
            >
              Design que<br />
              constrói marcas<br />
              que crescem.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: 40 }}
          >
            <a href="#servicos" style={{
              fontSize: 13, fontWeight: 500,
              color: '#0A0A0A',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              paddingBottom: 3,
              borderBottom: '1px solid rgba(10,10,10,0.2)',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#CCFF00'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(10,10,10,0.2)'}
            >
              Ver serviços
            </a>
            <a href="#cta" style={{
              fontSize: 13, fontWeight: 500,
              color: 'rgba(10,10,10,0.45)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'color 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.45)'}
            >
              Solicitar proposta
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        style={{
          position: 'absolute', bottom: 40, right: 'clamp(24px, 5vw, 80px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 3,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.3)', writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', transformOrigin: 'top' }}
          style={{ width: 1, height: 48, background: 'rgba(10,10,10,0.2)' }}
        />
      </motion.div>
    </section>
  )
}
