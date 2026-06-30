import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 38 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 38 })
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 50 })
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 50 })
  const isHover = useRef(false)

  useEffect(() => {
    const move = e => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onEnter = () => { isHover.current = true }
    const onLeave = () => { isHover.current = false }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{
          x: springX, y: springY,
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          border: '1.5px solid #fff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      {/* Dot */}
      <motion.div
        style={{
          x: dotX, y: dotY,
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          background: '#fff',
          mixBlendMode: 'difference',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  )
}
