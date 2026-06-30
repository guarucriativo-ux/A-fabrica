import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import GeoBg from '../svgs/GeoBg'

const cases = [
  {
    num: '01',
    client: 'Alkimia Produções',
    type: 'Redesign de Site',
    desc: 'De site sem identidade para presença digital que posiciona o produto como herói. Aumento de 3x no tempo de sessão.',
    year: '2024',
  },
  {
    num: '02',
    client: 'Em breve',
    type: 'Identidade Visual',
    desc: 'Novos cases chegando. Acompanhe nosso portfólio completo no Instagram.',
    year: '2025',
  },
]

function CaseItem({ c, i }) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [hovered, setHovered] = useState(false)

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
        gap: 2,
        marginBottom: 2,
        direction: i % 2 !== 0 ? 'rtl' : 'ltr',
      }}
      className="case-grid"
    >
      {/* Bloco visual — GeoBg + número sobreposto */}
      <div ref={imgRef} style={{ overflow: 'hidden', aspectRatio: '4/3', background: '#ECECEA', position: 'relative' }}>
        <motion.div style={{ y: imgY, height: '116%', width: '100%', position: 'absolute', top: '-8%' }}>
          <GeoBg width="100%" height="100%" />
        </motion.div>

        {/* Número grande como overlay tipográfico */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(120px, 18vw, 220px)',
            fontWeight: 700,
            color: 'rgba(10,10,10,0.055)',
            lineHeight: 1,
            userSelect: 'none',
          }}>{c.num}</span>
        </div>

        {/* Hover overlay — lime sutil */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(204,255,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0A0A0A', fontWeight: 500 }}>
            Ver case
          </span>
        </motion.div>
      </div>

      {/* Texto */}
      <div style={{
        direction: 'ltr',
        background: '#F0F0EC',
        padding: 'clamp(36px, 5vw, 72px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888882' }}>
              {c.num}
            </span>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888882' }}>
              {c.year}
            </span>
          </div>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888882', marginBottom: 16 }}>
            {c.type}
          </p>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(24px, 3vw, 38px)',
            fontWeight: 500, letterSpacing: '-0.015em',
            color: '#0A0A0A', lineHeight: 1.2,
            marginBottom: 24,
          }}>
            {c.client}
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#555550' }}>
            {c.desc}
          </p>
        </div>
        <div style={{
          marginTop: 48,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#0A0A0A',
          paddingBottom: 3, borderBottom: '1px solid #CCFF00',
          width: 'fit-content',
        }}>
          Ver projeto
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function Cases() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="cases" style={{ background: '#F8F8F4' }}>
      <div style={{ padding: 'clamp(80px, 14vh, 160px) clamp(24px, 5vw, 80px) clamp(48px, 8vh, 80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
          <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888882', marginBottom: 16 }}>
              Portfólio
            </p>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500, letterSpacing: '-0.02em',
              lineHeight: 1.1, color: '#0A0A0A',
            }}>
              O que já<br />entregamos.
            </h2>
          </motion.div>
          <motion.a
            href="https://instagram.com/guaruestudio" target="_blank" rel="noopener"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{
              fontSize: 12, fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#888882',
              paddingBottom: 3, borderBottom: '1px solid rgba(10,10,10,0.15)',
              transition: 'color 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#CCFF00' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#888882'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.15)' }}
          >
            Ver todos @guaruestudio
          </motion.a>
        </div>
      </div>

      {cases.map((c, i) => <CaseItem key={c.num} c={c} i={i} />)}

      <style>{`
        @media (max-width: 768px) {
          .case-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </section>
  )
}
