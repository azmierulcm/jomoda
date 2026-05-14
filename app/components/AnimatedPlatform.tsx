'use client'

import { useState, useEffect } from 'react'

const COLORS     = ['#D70F64', '#000000', '#EE4D2D', '#00B14F']
const INTERVAL_MS = 2400
const STRIKE_MS   = 320
const HOLD_MS     = 180
const FADE_MS     = 180

export default function AnimatedPlatform() {
  const [colorIndex,  setColorIndex]  = useState(0)
  const [strikeWidth, setStrikeWidth] = useState(0)
  const [opacity,     setOpacity]     = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      const start = performance.now()
      let raf: number

      const drawStrike = (now: number) => {
        const progress = Math.min((now - start) / STRIKE_MS, 1)
        setStrikeWidth(progress * 100)

        if (progress < 1) {
          raf = requestAnimationFrame(drawStrike)
        } else {
          setTimeout(() => {
            setOpacity(0)
            setTimeout(() => {
              setColorIndex((i) => (i + 1) % COLORS.length)
              setStrikeWidth(0)
              setOpacity(1)
            }, FADE_MS + 20)
          }, HOLD_MS)
        }
      }

      raf = requestAnimationFrame(drawStrike)
      return () => cancelAnimationFrame(raf)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <span
      className="relative inline-block font-bold whitespace-nowrap"
      style={{
        color:      COLORS[colorIndex],
        opacity,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      greedy 30% platform commissions

      {strikeWidth > 0 && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full pointer-events-none"
          style={{
            width:           `${strikeWidth}%`,
            backgroundColor: COLORS[colorIndex],
          }}
        />
      )}
    </span>
  )
}
