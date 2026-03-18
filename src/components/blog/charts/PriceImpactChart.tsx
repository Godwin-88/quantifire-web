'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

export function PriceImpactChart() {
  const [fee, setFee] = useState(0.003) // 0.30% default

  const FEE_OPTIONS = [
    { label: '0.01%', val: 0.0001 },
    { label: '0.05%', val: 0.0005 },
    { label: '0.30%', val: 0.003 },
    { label: '1.00%', val: 0.01 },
  ]

  // x-axis: trade as % of pool reserves (0.1% to 50%)
  const tradePcts = Array.from({ length: 200 }, (_, i) => 0.001 + i * 0.0025)

  // For a pool x*y=k, buying dx units of x:
  // price_impact = dx / (x - dx) — approx
  // more precisely, effective_price vs spot_price:
  // spot = y/x
  // after buying dx: new_x = x - dx, new_y = k / new_x
  // dy (cost) = new_y - y = k/(x-dx) - k/x = k*dx / (x*(x-dx))
  // effective price = dy/dx = k / (x*(x-dx))
  // spot price = k/x^2
  // impact = (k/(x*(x-dx)) - k/x^2) / (k/x^2) = x/(x-dx) - 1 = dx/(x-dx)
  const impactWithFee = tradePcts.map(pct => {
    const dx = pct
    const impact = dx / (1 - dx) // price impact
    const totalCost = impact + fee + fee * impact // add fee
    return totalCost * 100
  })

  const impactNoFee = tradePcts.map(pct => {
    const dx = pct
    const impact = dx / (1 - dx)
    return impact * 100
  })

  const tradePctLabels = tradePcts.map(p => p * 100) // convert to percentage

  // Key reference points
  const refs = [0.01, 0.05, 0.10, 0.20].map(pct => ({
    pct: pct * 100,
    impact: (pct / (1 - pct) + fee) * 100,
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500">Fee tier:</span>
        {FEE_OPTIONS.map(opt => (
          <button
            key={opt.label}
            onClick={() => setFee(opt.val)}
            className={`px-3 py-1 rounded text-xs font-mono font-medium border transition-colors ${
              fee === opt.val
                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Plot
        data={[
          {
            x: tradePctLabels,
            y: impactWithFee,
            type: 'scatter',
            mode: 'lines',
            name: `With fee (${(fee * 100).toFixed(2)}%)`,
            line: { color: '#22c55e', width: 2.5 },
            fill: 'tozeroy',
            fillcolor: 'rgba(34,197,94,0.05)',
            hovertemplate: 'Trade size: %{x:.1f}% of pool<br>Total cost: %{y:.3f}%<extra></extra>',
          },
          {
            x: tradePctLabels,
            y: impactNoFee,
            type: 'scatter',
            mode: 'lines',
            name: 'Price impact only',
            line: { color: '#3b82f6', width: 1.5, dash: 'dash' },
            hovertemplate: 'Trade size: %{x:.1f}% of pool<br>Price impact: %{y:.3f}%<extra></extra>',
          },
          // Mark 1%, 5%, 10% thresholds
          {
            x: refs.map(r => r.pct),
            y: refs.map(r => r.impact),
            type: 'scatter',
            mode: 'markers' as const,
            name: 'Reference points',
            marker: { color: '#f97316', size: 8 },
            hovertemplate: 'Trade: %{x:.0f}% of pool → Cost: %{y:.3f}%<extra></extra>',
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Trade size (% of pool reserves)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b', tickfont: { color: '#64748b' },
            ticksuffix: '%',
            range: [0, 30],
          },
          yaxis: {
            title: { text: 'Total cost (price impact + fee)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b', tickfont: { color: '#64748b' },
            ticksuffix: '%',
            range: [0, Math.max(5, impactWithFee[60])],
          },
          legend: {
            bgcolor: 'rgba(15,23,42,0.8)', bordercolor: '#334155', borderwidth: 1,
            font: { color: '#94a3b8' },
          },
          margin: { t: 20, b: 50, l: 70, r: 20 },
          shapes: [
            { type: 'line', x0: 1, x1: 1, y0: 0, y1: 100, line: { color: '#475569', dash: 'dot', width: 1 } },
            { type: 'line', x0: 5, x1: 5, y0: 0, y1: 100, line: { color: '#475569', dash: 'dot', width: 1 } },
            { type: 'line', x0: 10, x1: 10, y0: 0, y1: 100, line: { color: '#6b7280', dash: 'dot', width: 1 } },
          ],
        }}
        config={{ displayModeBar: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
        style={{ width: '100%', height: '340px' }}
        useResizeHandler
      />

      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-200">Rule of thumb:</strong> Trading 1% of a pool&apos;s reserves costs roughly 1% in price impact.
        At 10%, impact compounds to ~11.1%. The fee is charged on the input amount, making the total cost superlinear as trade size grows.
        This is why large trades are split into smaller tranches or routed across multiple pools.
      </div>
    </div>
  )
}
