import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticBtn({ children, style, href, onClick }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 })
  }
  const handleLeave = () => setPos({ x: 0, y: 0 })

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      style={{ display: 'inline-block' }}
    >
      <Tag href={href} onClick={onClick} style={style}>
        {children}
      </Tag>
    </motion.div>
  )
}
