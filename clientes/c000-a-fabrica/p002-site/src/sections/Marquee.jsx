import { motion } from 'framer-motion'

const clients = ['Alkimia Produções', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5', 'Cliente 6', 'Cliente 7']
const doubled = [...clients, ...clients]

export default function Marquee() {
  return (
    <div style={{
      background: '#0A0A0A',
      padding: '22px 0',
      overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {doubled.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', paddingRight: 56 }}>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(240,240,236,0.3)',
              whiteSpace: 'nowrap',
            }}>{c}</span>
            <span style={{ color: '#CCFF00', marginLeft: 56, fontSize: 8, opacity: 0.5 }}>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
