'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

export function AMMCurveChart() {
  const [ethReserve, setEthReserve] = useState(100)
  const [tradeSize, setTradeSize] = useState(10) // ETH being sold into pool

  const k = ethReserve * 200_000 // initial k = x*y
  const usdcReserve = k / ethReserve

  // Current price
  const currentPrice = usdcReserve / ethReserve

  // After trade: user buys tradeSize ETH (ETH leaves pool, USDC enters)
  // new_x = ethReserve - tradeSize
  // new_y = k / new_x
  // amountIn = new_y - usdcReserve (what user pays)
  const newEthReserve = ethReserve - tradeSize
  const newUsdcReserve = k / newEthReserve
  const usdcSpent = newUsdcReserve - usdcReserve
  const effectivePrice = usdcSpent / tradeSize
  const priceImpactPct = ((effectivePrice - currentPrice) / currentPrice) * 100

  // Generate the curve
  const xVals = Array.from({ length: 300 }, (_, i) => 10 + i * 1.5)
  const yVals = xVals.map(x => k / x)

  // Clamp curve to visible range
  const yMax = 500_000

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            ETH reserve (x): <span className="text-white font-bold">{ethReserve}</span>
          </label>
          <input
            type="range" min={50} max={300} value={ethReserve}
            onChange={(e) => setEthReserve(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Buy ETH (trade size): <span className="text-white font-bold">{tradeSize} ETH</span>
          </label>
          <input
            type="range" min={1} max={Math.floor(ethReserve * 0.4)} value={tradeSize}
            onChange={(e) => setTradeSize(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      <Plot
        data={[
          {
            x: xVals,
            y: yVals,
            type: 'scatter',
            mode: 'lines',
            name: 'x · y = k',
            line: { color: '#22c55e', width: 2.5 },
            hovertemplate: 'ETH: %{x:.0f}<br>USDC: %{y:,.0f}<extra></extra>',
          },
          {
            // Current state
            x: [ethReserve],
            y: [usdcReserve],
            type: 'scatter',
            mode: 'markers',
            name: 'Current state',
            marker: { color: '#3b82f6', size: 12, symbol: 'circle' },
            hovertemplate: `Before: (${ethReserve} ETH, ${usdcReserve.toLocaleString()} USDC)<extra></extra>`,
          },
          {
            // After trade
            x: [newEthReserve],
            y: [newUsdcReserve],
            type: 'scatter',
            mode: 'markers',
            name: 'After trade',
            marker: { color: '#f97316', size: 12, symbol: 'diamond' },
            hovertemplate: `After: (${newEthReserve.toFixed(1)} ETH, ${newUsdcReserve.toLocaleString(undefined, {maximumFractionDigits: 0})} USDC)<extra></extra>`,
          },
          {
            // Trade arrow line
            x: [ethReserve, newEthReserve],
            y: [usdcReserve, newUsdcReserve],
            type: 'scatter',
            mode: 'lines',
            name: 'Trade path',
            line: { color: '#f97316', width: 1.5, dash: 'dot' },
            showlegend: false,
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'ETH reserve (x)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b', tickfont: { color: '#64748b' },
            range: [0, Math.min(450, ethReserve * 3)],
          },
          yaxis: {
            title: { text: 'USDC reserve (y)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b', tickfont: { color: '#64748b' },
            range: [0, Math.min(yMax, usdcReserve * 3)],
            tickformat: ',.0f',
          },
          legend: {
            bgcolor: 'rgba(15,23,42,0.8)', bordercolor: '#334155', borderwidth: 1,
            font: { color: '#94a3b8' },
          },
          margin: { t: 20, b: 50, l: 80, r: 20 },
          annotations: [{
            x: (ethReserve + newEthReserve) / 2,
            y: (usdcReserve + newUsdcReserve) / 2,
            text: `Move along curve`,
            showarrow: false,
            font: { color: '#f97316', size: 10 },
            bgcolor: 'rgba(15,23,42,0.8)',
          }],
        }}
        config={{ displayModeBar: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
        style={{ width: '100%', height: '340px' }}
        useResizeHandler
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
        {[
          { label: 'k (invariant)', val: k.toLocaleString(), color: 'text-green-400' },
          { label: 'Current price', val: `$${currentPrice.toLocaleString(undefined, {maximumFractionDigits: 0})}/ETH`, color: 'text-blue-400' },
          { label: 'Effective price paid', val: `$${effectivePrice.toLocaleString(undefined, {maximumFractionDigits: 0})}/ETH`, color: 'text-orange-400' },
          { label: 'Price impact', val: `${priceImpactPct.toFixed(2)}%`, color: priceImpactPct > 5 ? 'text-red-400' : 'text-slate-300' },
        ].map(item => (
          <div key={item.label} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2">
            <div className={`text-base font-bold ${item.color}`}>{item.val}</div>
            <div className="text-slate-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
