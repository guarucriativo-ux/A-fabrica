import { motion } from 'framer-motion'

/**
 * GuarujaSilhouette — silhueta urbana + morros de Guarujá.
 * Faz fade-in com motion.svg ao entrar na viewport (once).
 */
const GuarujaSilhouette = ({ opacity = 0.55 }) => {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%' }}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
    >
      {/* Silhueta urbana — prédios lado esquerdo x=0 a x=500 */}
      <path
        d="
          M 0 320
          L 0 198
          L 18 198
          L 18 180
          L 36 180
          L 36 165
          L 54 165
          L 54 155
          L 72 155
          L 72 170
          L 90 170
          L 90 148
          L 108 148
          L 108 160
          L 126 160
          L 126 142
          L 144 142
          L 144 158
          L 162 158
          L 162 140
          L 180 140
          L 180 152
          L 198 152
          L 198 144
          L 210 144
          L 210 160
          L 228 160
          L 228 146
          L 246 146
          L 246 162
          L 264 162
          L 264 150
          L 282 150
          L 282 168
          L 300 168
          L 300 155
          L 318 155
          L 318 145
          L 336 145
          L 336 158
          L 354 158
          L 354 143
          L 372 143
          L 372 160
          L 390 160
          L 390 150
          L 408 150
          L 408 165
          L 426 165
          L 426 148
          L 444 148
          L 444 162
          L 462 162
          L 462 155
          L 480 155
          L 480 170
          L 500 170
          L 500 200
          L 0 200
          Z
        "
        fill="#D0D0CA"
      />

      {/* Perfil dos morros — picos suaves lado direito x=580 a x=1440 */}
      <path
        d="
          M 580 200
          C 620 200, 650 160, 690 120
          C 730 80, 760 65, 800 72
          C 840 78, 870 110, 910 130
          C 950 148, 970 100, 1010 68
          C 1050 38, 1090 60, 1130 90
          C 1170 118, 1200 140, 1250 150
          C 1300 160, 1360 155, 1440 160
          L 1440 200
          L 580 200
          Z
        "
        fill="#D0D0CA"
      />

      {/* Curva da orla — conecta cidade e morros na base y≈210 */}
      <path
        d="
          M 0 210
          C 120 208, 260 212, 400 210
          C 500 209, 540 211, 600 210
          C 700 209, 800 212, 900 210
          C 1000 208, 1100 211, 1200 210
          C 1300 209, 1370 211, 1440 210
        "
        fill="none"
        stroke="#D0D0CA"
        strokeWidth="1"
      />

      {/* Linha do horizonte do mar y≈220 */}
      <line
        x1="0"
        y1="222"
        x2="1440"
        y2="222"
        stroke="#D0D0CA"
        strokeWidth="0.8"
      />
    </motion.svg>
  )
}

export default GuarujaSilhouette
