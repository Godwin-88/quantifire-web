'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * KnowledgeGraph — a live, slowly rotating force-directed graph.
 * Amber/orange nodes pulse, thin white edges light up in sequence.
 * Used as a low-opacity fullscreen background in the hero.
 *
 * Maps directly to the graph-intelligence work (GraphAlpha, Lex Kenya, ClinicalMatch).
 */

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const NODE_COUNT = 110
const EDGE_BATCHES = 4

function GraphScene() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const lineRefs = useRef<(THREE.LineSegments | null)[]>([])
  const hubRefs = useRef<(THREE.Mesh | null)[]>([])

  const { nodePositions, edgeBatches, hubs } = useMemo(() => {
    const rand = mulberry32(1337)
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 4.5 + rand() * 5.5
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      )
    }

    const pairs: [THREE.Vector3, THREE.Vector3][] = []
    const seen = new Set<string>()
    for (let i = 0; i < NODE_COUNT; i++) {
      const nearest = nodes
        .map((p, j) => ({ j, d: p.distanceToSquared(nodes[i]) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
      for (const { j } of nearest) {
        const key = i < j ? `${i}:${j}` : `${j}:${i}`
        if (!seen.has(key)) {
          seen.add(key)
          pairs.push([nodes[i], nodes[j]])
        }
      }
    }

    const batches: number[][] = Array.from({ length: EDGE_BATCHES }, () => [])
    pairs.forEach(([a, b], i) => {
      const batch = batches[i % EDGE_BATCHES]
      batch.push(a.x, a.y, a.z, b.x, b.y, b.z)
    })

    const hubIndices = [0, 23, 47, 61, 79, 95]
    const hubPositions = hubIndices.map((i) => nodes[i])

    return {
      nodePositions: nodes.flatMap((v) => [v.x, v.y, v.z]),
      edgeBatches: batches,
      hubs: hubPositions,
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.045
      groupRef.current.rotation.x = Math.sin(t * 0.09) * 0.14
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.size = 2.1 + Math.sin(t * 1.8) * 0.35
      mat.opacity = 0.7 + Math.sin(t * 1.1) * 0.18
    }
    lineRefs.current.forEach((line, i) => {
      if (!line) return
      const mat = line.material as THREE.LineBasicMaterial
      const phase = (t * 1.4 + (i / EDGE_BATCHES) * Math.PI * 2) % (Math.PI * 2)
      mat.opacity = 0.05 + Math.max(0, Math.sin(phase)) * 0.16
    })
    hubRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const s = 1 + Math.sin(t * 1.6 + i * 1.1) * 0.35
      mesh.scale.setScalar(s)
    })
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(nodePositions), 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00BFEA"
          size={2.4}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>

      {edgeBatches.map((positions, i) => (
        <lineSegments key={i} ref={(el) => { lineRefs.current[i] = el }}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00D4FF" transparent opacity={0.18} depthWrite={false} />
        </lineSegments>
      ))}

      {hubs.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => { hubRefs.current[i] = el }}>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshBasicMaterial color="#00D4FF" />
        </mesh>
      ))}
    </group>
  )
}

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function KnowledgeGraph({ className, style }: Props) {
  return (
    <Canvas
      className={className}
      style={{ background: 'transparent', ...style }}
      camera={{ position: [0, 0, 20], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <GraphScene />
    </Canvas>
  )
}