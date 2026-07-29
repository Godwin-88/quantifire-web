'use client'

import { motion } from 'framer-motion'

export default function Icosahedron() {
  const vertices = [
    [0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0],
    [0, 1, 0], [0, -1, 0],
  ]
  const edges = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [2, 5], [3, 4], [3, 5],
  ]

  return (
    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        viewBox="-1 -1 2 2"
        className="w-full h-full ico-wireframe"
        style={{ transform: 'rotateX(60deg) rotateY(30deg)' }}
        fill="none"
        stroke="rgba(99,102,241,0.3)"
        strokeWidth="0.003"
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={vertices[a][0]}
            y1={vertices[a][1]}
            x2={vertices[b][0]}
            y2={vertices[b][1]}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  )
}