'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

export function PortfolioVarianceChart() {
  const [w1, setW1] = useState(0.5) // weight of asset 1
  const sigma1 = 0.20  // 20% vol
  const sigma2 = 0.15  // 15% vol

  // Generate variance curve across correlations -1 to 1
  const rhos = Array.from({ length: 201 }, (_, i) => -1 + i * 0.01)
  const w2 = 1 - w1

  const variances = rhos.map(r =>
    Math.sqrt(w1 ** 2 * sigma1 ** 2 + w2 ** 2 * sigma2 ** 2 + 2 * w1 * w2 * sigma1 * sigma2 * r) * 100
  )

  // Standalone assets for reference
  const standaloneA = sigma1 * 100 * w1 // Not quite right — let's show what the portfolio vol would be if rho=1
  const worstCase = Math.sqrt(w1 ** 2 * sigma1 ** 2 + w2 ** 2 * sigma2 ** 2 + 2 * w1 * w2 * sigma1 * sigma2 * 1) * 100
  const bestCase = Math.sqrt(w1 ** 2 * sigma1 ** 2 + w2 ** 2 * sigma2 ** 2 - 2 * w1 * w2 * sigma1 * sigma2) * 100

  return (
    <div className="space-y-4">
      {/* Weight slider */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Weight of Asset A (σ = {(sigma1 * 100).toFixed(0)}%):{' '}
            <span className="text-white font-bold">{(w1 * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(w1 * 100)}
            onChange={(e) => setW1(Number(e.target.value) / 100)}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="text-xs text-slate-500 shrink-0">
          Asset B: {((1 - w1) * 100).toFixed(0)}% (σ = {(sigma2 * 100).toFixed(0)}%)
        </div>
      </div>

      <Plot
        data={[
          {
            x: rhos,
            y: variances,
            type: 'scatter',
            mode: 'lines',
            name: 'Portfolio Volatility',
            line: { color: '#3b82f6', width: 2.5 },
            hovertemplate: 'ρ = %{x:.2f}<br>σ_p = %{y:.2f}%<extra></extra>',
          },
          {
            x: [-1, 1],
            y: [bestCase, worstCase],
            type: 'scatter',
            mode: 'markers',
            name: 'Best / Worst case',
            marker: { color: ['#22c55e', '#e94560'], size: 10, symbol: 'diamond' },
            hovertemplate: 'ρ = %{x}<br>σ_p = %{y:.2f}%<extra></extra>',
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Correlation (ρ)', font: { color: '#94a3b8' } },
            range: [-1, 1],
            gridcolor: '#1e293b',
            zerolinecolor: '#334155',
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            title: { text: 'Portfolio Volatility (%)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            tickfont: { color: '#64748b' },
            ticksuffix: '%',
          },
          legend: {
            bgcolor: 'rgba(15,23,42,0.8)',
            bordercolor: '#334155',
            borderwidth: 1,
            font: { color: '#94a3b8' },
          },
          margin: { t: 20, b: 50, l: 60, r: 20 },
          shapes: [
            {
              type: 'line',
              x0: 0, x1: 0,
              y0: 0, y1: Math.max(...variances),
              line: { color: '#475569', dash: 'dot', width: 1 },
            },
          ],
          annotations: [
            {
              x: -1,
              y: bestCase,
              text: `Min: ${bestCase.toFixed(1)}%`,
              showarrow: true,
              arrowhead: 2,
              arrowcolor: '#22c55e',
              font: { color: '#22c55e', size: 10 },
              xanchor: 'left',
              ax: 20, ay: -20,
            },
          ],
        }}
        config={{ displayModeBar: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
        style={{ width: '100%', height: '340px' }}
        useResizeHandler
      />

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        {[
          { label: 'ρ = −1 (perfect negative)', val: `${bestCase.toFixed(1)}%`, color: 'text-green-400' },
          { label: 'ρ = 0 (uncorrelated)', val: `${(Math.sqrt(w1 ** 2 * sigma1 ** 2 + w2 ** 2 * sigma2 ** 2) * 100).toFixed(1)}%`, color: 'text-blue-400' },
          { label: 'ρ = +1 (perfect positive)', val: `${worstCase.toFixed(1)}%`, color: 'text-red-400' },
        ].map(item => (
          <div key={item.label} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2">
            <div className={`text-lg font-bold ${item.color}`}>{item.val}</div>
            <div className="text-slate-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
