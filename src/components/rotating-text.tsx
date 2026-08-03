'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function RotatingText({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  return (
    <span className="relative inline-block min-w-[12ch] text-left align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block bg-gradient-to-r from-[#9f4f9d] via-[#c06fbe] to-[#9f4f9d] bg-clip-text text-transparent"
          initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
