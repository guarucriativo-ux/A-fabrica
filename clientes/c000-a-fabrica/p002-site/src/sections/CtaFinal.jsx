import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WaveDecor from '../svgs/WaveDecor'

export default function CtaFinal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="cta" style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(100px, 18vh, 200px) clamp(24px, 5vw, 80px)',
      background: '#060a08',
    }}>
      {/* WaveDecor invertido no topo como decoração */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: 'rotate(180deg)', opacity: 0.12, zIndex: 0 }}>
        <WaveDecor />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(240,240,236,0.35)',
          marginBottom: 32,
        }}>
          Vamos começar
        </p>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(40px, 7vw, 96px)',
          fontWeight: 500, letterSpacing: '-0.025em',
          lineHeight: 1.0, color: '#F0F0EC',
          marginBottom: 48,
        }}>
          Sua marca<br />
          merece mais<br />
          do que isso.
        </h2>
        <p style={{
          fontSize: 16, lineHeight: 1.78,
          color: 'rgba(240,240,236,0.5)',
          maxWidth: 440, marginBottom: 56,
        }}>
          Veja o que uma equipe dedicada pode fazer pela sua empresa. Primeira conversa é sem compromisso.
        </p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="https://wa.me/5511999999999?text=Oi%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais"
            target="_blank" rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#F0F0EC',
              color: '#0A0A0A',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: '-0.01em',
              padding: '16px 32px',
              borderRadius: 2,
              transition: 'background 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#CCFF00'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F0F0EC'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Falar no WhatsApp
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="mailto:oi@guaruestudio.com.br" style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
            color: 'rgba(240,240,236,0.4)',
            paddingBottom: 2, borderBottom: '1px solid rgba(240,240,236,0.15)',
            transition: 'color 0.25s, border-color 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#F0F0EC'; e.currentTarget.style.borderColor = 'rgba(240,240,236,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,240,236,0.4)'; e.currentTarget.style.borderColor = 'rgba(240,240,236,0.15)' }}
          >
            oi@guaruestudio.com.br
          </a>
        </div>
      </motion.div>
    </section>
  )
}
