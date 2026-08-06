'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * YieldCurve — a 3D ribbon that morphs between shapes over time:
 *   flat line → efficient frontier curve → volatility surface (3D mesh).
 * Native to the quant brand; serves as a visual hook for the blog series.
 */

const SEGMENTS = 40
const WIDTH_SEGMENTS = 8

function buildShape(progress: number, out: Float32Array) {
  for (let i = 0; i <= SEGMENTS; i++) {
    const u = i / SEGMENTS
    const uu = u * 4 - 2 // -2..2
    for (let j = 0; j <= WIDTH_SEGMENTS; j++) {
      const v = j / WIDTH_SEGMENTS
      const vv = v * 2 - 1 // -1..1
      const c = (i * (WIDTH_SEGMENTS + 1) + j) * 3

      // Flat line (progress 0)
      const flatY = 0
      const flatZ = vv * 0.3

      // Efficient frontier curve (progress 0.5)
      const effY = Math.max(0.2, 1 - uu * uu * 0.28) * 1.1

      // Volatility surface (progress 1)
      const volY = 1.2 * Math.exp(-uu * uu * 0.55) * Math.cos(vv * 1.8) + 0.6
      const volZ = vv * 1.4

      let y: number
      if (progress < 0.5) {
        const t = progress / 0.5
        y = flatY + (effY - flatY) * t
      } else {
        const t = (progress - 0.5) / 0.5
        y = effY + (volY - effY) * t
      }
      const z = flatZ + (volZ - flatZ) * progress

      out[c] = uu
      out[c + 1] = y
      out[c + 2] = z
    }
  }
  return out
}

function Ribbon() {
  const geomRef = useRef<THREE.BufferGeometry>(null)
  const progressRef = useRef(0)

  const basePositions = useMemo(() => {
    const arr = new Float32Array((SEGMENTS + 1) * (WIDTH_SEGMENTS + 1) * 3)
    buildShape(0, arr)
    return arr
  }, [])

  const targetPositions = useMemo(() => {
    const arr = new Float32Array((SEGMENTS + 1) * (WIDTH_SEGMENTS + 1) * 3)
    buildShape(1, arr)
    return arr
  }, [])

  useFrame((state, delta) => {
    const target = Math.min(1, state.clock.elapsedTime * 0.045)
    progressRef.current += (target - progressRef.current) * Math.min(1, delta * 1.2)
    const geom = geomRef.current
    if (!geom) return
    const pos = geom.attributes.position as THREE.BufferAttribute
    const p = progressRef.current
    for (let i = 0; i < pos.count; i++) {
      const o = i * 3
      pos.setXYZ(
        i,
        THREE.MathUtils.lerp(basePositions[o], targetPositions[o], p),
        THREE.MathUtils.lerp(basePositions[o + 1], targetPositions[o + 1], p),
        THREE.MathUtils.lerp(basePositions[o + 2], targetPositions[o + 2], p)
      )
    }
    pos.needsUpdate = true
    geom.computeVertexNormals()
  })

  return (
    <mesh>
      <planeGeometry args={[4, 1, SEGMENTS, WIDTH_SEGMENTS]} ref={geomRef} />
      <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  )
}

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function YieldCurve({ className, style }: Props) {
  return (
    <Canvas
      className={className}
      style={{ background: 'transparent', ...style }}
      camera={{ position: [0, 4.5, 6.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Ribbon />
    </Canvas>
  )
}
