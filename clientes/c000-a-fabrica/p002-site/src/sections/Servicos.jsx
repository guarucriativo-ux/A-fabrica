import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const servicos = [
  { num: '01', name: 'Identidade Visual', desc: 'Logo, paleta, tipografia e manual de marca. Construído pra durar e crescer junto com o negócio.' },
  { num: '02', name: 'Site Profissional', desc: 'Sites que convertem — rápidos, responsivos e com design que posiciona sua marca acima da concorrência.' },
  { num: '03', name: 'Redes Sociais', desc: 'Gestão de feed, stories e reels com estratégia. Conteúdo que engaja e converte.' },
  { num: '04', name: 'Tráfego Pago', desc: 'Campanhas no Meta Ads e Google Ads focadas em resultado real: lead, venda, agendamento.' },
  { num: '05', name: 'Materiais Comerciais', desc: 'Catálogo, proposta, pitch deck — peças que fecham negócio antes mesmo da reunião terminar.' },
  { num: '06', name: 'Presença Digital', desc: 'Google Business, WhatsApp Business e tudo que faz sua empresa aparecer quando pesquisam por você.' },
]

function Item({ s, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        alignItems: 'start',
        gap: 'clamp(16px, 3vw, 48px)',
        padding: 'clamp(28px, 4vw, 44px) 0',
        borderTop: '1px solid rgba(10,10,10,0.08)',
        cursor: 'default',
        transition: 'background 0.3s',
      }}
      whileHover={{ x: 4 }}
    >
      <span style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
        color: '#888882', paddingTop: 5,
      }}>
        {s.num}
      </span>
      <div>
        <h3 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: '#0A0A0A',
          marginBottom: 10,
          lineHeight: 1.2,
        }}>
          {s.name}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.72, color: '#888882', maxWidth: 440 }}>
          {s.desc}
        </p>
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '1px solid rgba(10,10,10,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 4, flexShrink: 0,
        transition: 'border-color 0.25s, background 0.25s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.querySelector('svg').style.stroke = '#F0F0EC' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelector('svg').style.stroke = '#0A0A0A' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'stroke 0.25s' }}>
          <path d="M2 10L10 2M10 2H4M10 2v6" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function Servicos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="servicos" style={{
      background: '#F8F8F4',
      padding: 'clamp(80px, 14vh, 160px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 100px)',
        marginBottom: 'clamp(48px, 8vh, 96px)',
      }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888882', marginBottom: 20 }}>
            O que fazemos
          </p>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#0A0A0A',
          }}>
            Tudo que sua<br />marca precisa<br />pra crescer.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 15, lineHeight: 1.78, color: '#555550', maxWidth: 380, alignSelf: 'end' }}
        >
          Do zero à escala — design estratégico e execução digital integrados. Sem precisar contratar 5 fornecedores diferentes.
        </motion.p>
      </div>

      <div style={{ borderBottom: '1px solid rgba(10,10,10,0.08)' }}>
        {servicos.map((s, i) => <Item key={s.num} s={s} i={i} />)}
      </div>
    </section>
  )
}
