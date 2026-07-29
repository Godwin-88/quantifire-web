'use client'

import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CounterAnimation({
  value, suffix = '', duration = 1.5, className
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (displayRef.current) {
          displayRef.current.textContent = Math.floor(v).toLocaleString() + suffix
        }
      }
    })
    return () => controls.stop()
  }, [isInView, value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </span>
  )
}