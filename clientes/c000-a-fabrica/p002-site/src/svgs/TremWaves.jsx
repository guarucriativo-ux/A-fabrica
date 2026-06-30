import { motion, useTransform, useMotionValue } from 'framer-motion'

function WaveLayer({ d, fill, opacity, progress, speed }) {
  const y = useTransform(progress, [0, 1], [0, speed])
  return <motion.path d={d} fill={fill} opacity={opacity} style={{ y }} />
}

const LAYERS = [
  { d: 'M-100 180 C200 80 500 140 800 90 C1050 50 1300 120 1540 75 L1540 520 L-100 520 Z',    fill: '#C8C8C4', opacity: 0.55, speed: -20  },
  { d: 'M-100 220 C200 120 500 180 800 130 C1050 90 1300 160 1540 115 L1540 520 L-100 520 Z', fill: '#CECECE', opacity: 0.65, speed: -35  },
  { d: 'M-100 265 C200 165 500 222 800 172 C1050 132 1300 202 1540 158 L1540 520 L-100 520 Z',fill: '#D4D4D0', opacity: 0.75, speed: -50  },
  { d: 'M-100 308 C200 208 500 265 800 215 C1050 175 1300 245 1540 200 L1540 520 L-100 520 Z',fill: '#DADAD6', opacity: 0.82, speed: -65  },
  { d: 'M-100 350 C200 250 500 308 800 258 C1050 218 1300 288 1540 243 L1540 520 L-100 520 Z',fill: '#E0E0DC', opacity: 0.88, speed: -80  },
  { d: 'M-100 392 C200 292 500 350 800 300 C1050 260 1300 330 1540 285 L1540 520 L-100 520 Z',fill: '#E8E8E4', opacity: 0.95, speed: -100 },
]

export default function TremWaves({ progress, style = {} }) {
  // Fallback para uso isolado (ex: Storybook, testes)
  const fallback = useMotionValue(0)
  const mv = progress ?? fallback

  return (
    <svg
      viewBox="0 0 1440 520"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    >
      {LAYERS.map((layer, i) => (
        <WaveLayer key={i} {...layer} progress={mv} />
      ))}
    </svg>
  )
}
