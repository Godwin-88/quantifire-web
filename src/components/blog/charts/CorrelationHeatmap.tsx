'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

const SCENARIOS = {
  normal: {
    label: 'Normal Market',
    assets: ['SPY', 'TLT', 'GLD', 'VNQ', 'EEM'],
    matrix: [
      [1.00,  -0.35,  0.05, 0.72,  0.65],
      [-0.35,  1.00,  0.28, -0.20, -0.28],
      [0.05,   0.28,  1.00, 0.08,   0.10],
      [0.72,  -0.20,  0.08, 1.00,   0.55],
      [0.65,  -0.28,  0.10, 0.55,   1.00],
    ],
    description: 'Typical correlation structure in calm markets. Equities & bonds are negatively correlated — bonds act as a hedge.',
  },
  crisis: {
    label: 'Crisis (2008 / Mar 2020)',
    assets: ['SPY', 'TLT', 'GLD', 'VNQ', 'EEM'],
    matrix: [
      [1.00,  -0.10,  0.30, 0.92,  0.94],
      [-0.10,  1.00,  0.15, -0.08, -0.12],
      [0.30,   0.15,  1.00, 0.28,   0.35],
      [0.92,  -0.08,  0.28, 1.00,   0.88],
      [0.94,  -0.12,  0.35, 0.88,   1.00],
    ],
    description: 'In crisis, correlations spike. Equities, real estate, and EM all collapse together — diversification fails when you need it most.',
  },
}

export function CorrelationHeatmap() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>('normal')
  const data = SCENARIOS[scenario]

  // Build annotation text
  const annotations = data.assets.flatMap((rowAsset, i) =>
    data.assets.map((colAsset, j) => ({
      x: colAsset,
      y: rowAsset,
      text: data.matrix[i][j].toFixed(2),
      font: { color: Math.abs(data.matrix[i][j]) > 0.5 ? '#fff' : '#94a3b8', size: 11 },
      showarrow: false,
    }))
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              scenario === key
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">{data.description}</p>

      <Plot
        data={[{
          z: data.matrix,
          x: data.assets,
          y: data.assets,
          type: 'heatmap',
          colorscale: [
            [0,    '#dc2626'],   // -1 = strong negative → red
            [0.5,  '#0f172a'],   // 0 = uncorrelated → dark
            [1,    '#2563eb'],   // +1 = strong positive → blue
          ],
          zmin: -1,
          zmax: 1,
          showscale: true,
          colorbar: {
            title: { text: 'ρ', font: { color: '#94a3b8' } },
            tickfont: { color: '#94a3b8' },
            thickness: 12,
          },
          hovertemplate: '%{y} vs %{x}: ρ = %{z:.2f}<extra></extra>',
        }]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 12 },
          xaxis: { tickfont: { color: '#94a3b8' }, side: 'bottom' },
          yaxis: { tickfont: { color: '#94a3b8' }, autorange: 'reversed' },
          annotations,
          margin: { t: 10, b: 40, l: 60, r: 60 },
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '320px' }}
        useResizeHandler
      />
    </div>
  )
}
