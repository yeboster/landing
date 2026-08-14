'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export interface DotGridHandle {
  setPointer: (x: number | null, y: number | null) => void
}

const SPACING = 28
const RADIUS = 140
const DECAY = 0.88

function gridDimensions(width: number, height: number) {
  const cols = Math.floor(width / SPACING) + 1
  const rows = Math.floor(height / SPACING) + 1
  return { cols, rows, total: cols * rows }
}

function baseDotColor(isDark: boolean) {
  return isDark ? 'rgba(159,79,157,0.10)' : 'rgba(159,79,157,0.12)'
}

/**
 * Canvas dot grid, pointer-reactive. Rendered inside a positioned parent
 * (the hero section); the parent forwards pointer coordinates via the
 * imperative `setPointer` handle since the canvas itself is pointer-events-none.
 */
export const DotGrid = forwardRef<DotGridHandle>(function DotGrid(_props, ref) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef({ width: 0, height: 0 })
  const intensitiesRef = useRef<Float32Array>(new Float32Array(0))
  const wakeRef = useRef<(() => void) | null>(null)

  useImperativeHandle(ref, () => ({
    setPointer: (x, y) => {
      pointerRef.current = x === null || y === null ? null : { x, y }
      wakeRef.current?.()
    },
  }), [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function drawStatic() {
      const { width, height } = sizeRef.current
      const isDark = document.documentElement.classList.contains('dark')
      ctx!.clearRect(0, 0, width, height)
      ctx!.fillStyle = baseDotColor(isDark)
      for (let py = 0; py <= height; py += SPACING) {
        for (let px = 0; px <= width; px += SPACING) {
          ctx!.beginPath()
          ctx!.arc(px, py, 1, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
    }

    function resize() {
      const rect = container!.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      canvas!.style.width = `${rect.width}px`
      canvas!.style.height = `${rect.height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { width: rect.width, height: rect.height }
      intensitiesRef.current = new Float32Array(gridDimensions(rect.width, rect.height).total)
      if (reduce) drawStatic()
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    if (reduce) {
      return () => resizeObserver.disconnect()
    }

    function loop() {
      rafRef.current = null
      const { width, height } = sizeRef.current
      const intensities = intensitiesRef.current
      const pointer = pointerRef.current
      const isDark = document.documentElement.classList.contains('dark')
      let anyActive = false

      ctx!.clearRect(0, 0, width, height)

      let idx = 0
      for (let py = 0; py <= height; py += SPACING) {
        for (let px = 0; px <= width; px += SPACING, idx++) {
          let intensity = intensities[idx] ?? 0
          if (pointer) {
            const dx = px - pointer.x
            const dy = py - pointer.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < RADIUS) intensity = Math.max(intensity, 1 - dist / RADIUS)
          }
          intensity *= DECAY
          if (intensity < 0.01) intensity = 0
          intensities[idx] = intensity

          ctx!.beginPath()
          if (intensity > 0) {
            anyActive = true
            ctx!.fillStyle = `rgba(159,79,157,${0.5 * intensity})`
            ctx!.arc(px, py, 1 + 2.2 * intensity, 0, Math.PI * 2)
          } else {
            ctx!.fillStyle = baseDotColor(isDark)
            ctx!.arc(px, py, 1, 0, Math.PI * 2)
          }
          ctx!.fill()
        }
      }

      if (pointer || anyActive) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    let visible = false
    function wake() {
      if (visible && rafRef.current === null) rafRef.current = requestAnimationFrame(loop)
    }
    wakeRef.current = wake

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        wake()
      } else if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    })
    intersectionObserver.observe(container)

    return () => {
      wakeRef.current = null
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [reduce])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
})
