'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ArchitectureLayers — three translucent horizontal planes stacked with
 * slight parallax on scroll: Data Layer → Agent Layer → Interface Layer.
 * Each plane has faint grid lines and small glowing nodes.
 */

function Layer({
  y,
  color,
  wireOpacity,
}: {
  y: number
  color: string
  wireOpacity: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const nodeCount = 10
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2
    const r = 1.6 + (i % 3) * 0.4
    return new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r)
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current && ringRef.current) {
      // gentle bob + rotation
      groupRef.current.position.y = y + Math.sin(t * 0.6 + y) * 0.12
      ringRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, y, 0]}>
      {/* Translucent plane with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={wireOpacity}
          wireframe
          depthWrite={false}
        />
      </mesh>

      {/* Glowing ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.4, 1.5, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Glowing nodes on the plane */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={[pos.x, 0.02, pos.z]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <Layer y={-1.8} color="#f97316" wireOpacity={0.16} />
      <Layer y={0} color="#fbbf24" wireOpacity={0.2} />
      <Layer y={1.8} color="#fdba74" wireOpacity={0.14} />
    </>
  )
}

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArchitectureLayers({ className, style }: Props) {
  return (
    <Canvas
      className={className}
      style={{ background: 'transparent', ...style }}
      camera={{ position: [0, 2.5, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
