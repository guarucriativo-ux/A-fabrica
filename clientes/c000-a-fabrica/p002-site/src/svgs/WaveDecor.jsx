import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const DURATION = 2.4
const VIEWPORT = { once: true, margin: '-10% 0px' }

/**
 * WaveDecor — três ondas decorativas que animam com scaleX ao entrar na viewport.
 *
 * Cada wave é envolvida em um <motion.g> com transformOrigin 'left center',
 * fazendo a onda "abrir" da esquerda para a direita.
 * Delays escalonados: wave1=0s, wave2=0.3s, wave3=0.6s.
 */
const WaveDecor = ({ className, style }) => {
  return (
    <svg
      viewBox="0 0 1440 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', width: '100%', ...style }}
      aria-hidden="true"
    >
      {/* Wave 1 — base, mais visível */}
      <motion.g
        style={{ transformOrigin: 'left center' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION, delay: 0, ease: EASE }}
      >
        <path
          id="wave1"
          d="
            M 0 120
            C 120 100, 240 140, 360 115
            C 480 90, 600 130, 720 110
            C 840 90, 960 125, 1080 105
            C 1200 85, 1320 120, 1440 100
            L 1440 200
            L 0 200
            Z
          "
          fill="#E8E8E4"
        />
      </motion.g>

      {/* Wave 2 — intermediário */}
      <motion.g
        style={{ transformOrigin: 'left center' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION, delay: 0.3, ease: EASE }}
      >
        <path
          id="wave2"
          d="
            M 0 140
            C 100 125, 220 155, 360 135
            C 500 115, 620 148, 760 130
            C 900 112, 1020 145, 1160 128
            C 1280 114, 1360 138, 1440 125
            L 1440 200
            L 0 200
            Z
          "
          fill="#ECECEA"
        />
      </motion.g>

      {/* Wave 3 — quase invisível, no topo */}
      <motion.g
        style={{ transformOrigin: 'left center' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION, delay: 0.6, ease: EASE }}
      >
        <path
          id="wave3"
          d="
            M 0 158
            C 90 148, 200 165, 340 152
            C 480 139, 600 160, 740 148
            C 880 136, 1000 158, 1140 146
            C 1280 134, 1380 155, 1440 145
            L 1440 200
            L 0 200
            Z
          "
          fill="#F0F0EC"
        />
      </motion.g>
    </svg>
  )
}

export default WaveDecor
