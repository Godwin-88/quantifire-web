'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

const ASSETS = [
  { name: 'SPY', mu: 0.10, vol: 0.18 },
  { name: 'TLT', mu: 0.04, vol: 0.08 },
  { name: 'GLD', mu: 0.06, vol: 0.15 },
  { name: 'VNQ', mu: 0.08, vol: 0.20 },
  { name: 'EEM', mu: 0.09, vol: 0.22 },
]

const CORR = [
  [1.00, -0.35,  0.05,  0.72,  0.65],
  [-0.35,  1.00,  0.28, -0.20, -0.28],
  [ 0.05,  0.28,  1.00,  0.08,  0.10],
  [ 0.72, -0.20,  0.08,  1.00,  0.55],
  [ 0.65, -0.28,  0.10,  0.55,  1.00],
]

function computeCovMatrix() {
  const cov = Array(5).fill(null).map(() => Array(5).fill(0))
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      cov[i][j] = ASSETS[i].vol * ASSETS[j].vol * CORR[i][j]
    }
  }
  return cov
}

function portReturn(weights: number[]) {
  return weights.reduce((sum, w, i) => sum + w * ASSETS[i].mu, 0)
}

function portVolatility(weights: number[], cov: number[][]) {
  let varSum = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      varSum += weights[i] * weights[j] * cov[i][j]
    }
  }
  return Math.sqrt(varSum)
}

function generateRandomPortfolios(n: number) {
  const portfolios = []
  for (let p = 0; p < n; p++) {
    // Generate random weights using Dirichlet-like approach
    const raw = Array(5).fill(0).map(() => Math.random())
    const sum = raw.reduce((a, b) => a + b, 0)
    const weights = raw.map(r => r / sum)
    portfolios.push(weights)
  }
  return portfolios
}

export function EfficientFrontierChart() {
  const [hoveredPoint, setHoveredPoint] = useState<{ vol: number; ret: number; weights: number[] } | null>(null)
  const cov = useMemo(() => computeCovMatrix(), [])

  // Generate random portfolios
  const portfolios = useMemo(() => generateRandomPortfolios(2000), [])
  const portStats = useMemo(() => {
    return portfolios.map(weights => ({
      vol: portVolatility(weights, cov),
      ret: portReturn(weights),
      weights,
    }))
  }, [portfolios, cov])

  // Find efficient frontier (max return for each vol level)
  const frontier = useMemo(() => {
    const volBins = Array.from({ length: 100 }, (_, i) => 0.05 + i * 0.002)
    const frontierPoints = []
    
    for (const volTarget of volBins) {
      let maxRet = -Infinity
      let bestWeights = null
      
      for (const ps of portStats) {
        if (Math.abs(ps.vol - volTarget) < 0.002 && ps.ret > maxRet) {
          maxRet = ps.ret
          bestWeights = ps.weights
        }
      }
      
      if (bestWeights) {
        frontierPoints.push({ vol: volTarget, ret: maxRet, weights: bestWeights })
      }
    }
    
    return frontierPoints
  }, [portStats])

  // Find MVP and Tangency
  const mvp = useMemo(() => {
    return portStats.reduce((min, ps) => ps.vol < min.vol ? ps : min, portStats[0])
  }, [portStats])

  const rf = 0.03
  const tangency = useMemo(() => {
    return portStats.reduce((max, ps) => {
      const sharpe = (ps.ret - rf) / ps.vol
      const maxSharpe = (max.ret - rf) / max.vol
      return sharpe > maxSharpe ? ps : max
    }, portStats[0])
  }, [portStats])

  const displayPoint = hoveredPoint || tangency

  return (
    <div className="space-y-4">
      <Plot
        data={[
          {
            x: portStats.map(p => p.vol * 100),
            y: portStats.map(p => p.ret * 100),
            mode: 'markers',
            type: 'scatter',
            name: 'Random Portfolios',
            marker: { color: '#475569', size: 3, opacity: 0.4 },
            hovertemplate: 'σ: %{x:.1f}%<br>μ: %{y:.1f}%<extra></extra>',
          },
          {
            x: frontier.map(p => p.vol * 100),
            y: frontier.map(p => p.ret * 100),
            mode: 'lines',
            type: 'scatter',
            name: 'Efficient Frontier',
            line: { color: '#3b82f6', width: 3 },
            hovertemplate: 'σ: %{x:.1f}%<br>μ: %{y:.1f}%<extra>Frontier</extra>',
          },
          {
            x: [mvp.vol * 100],
            y: [mvp.ret * 100],
            mode: 'text+markers' as any,
            type: 'scatter',
            name: 'Min Variance',
            marker: { color: '#e94560', size: 12, symbol: 'star' },
            text: ['MVP'],
            textposition: 'top center',
            textfont: { color: '#e94560', size: 11 },
            hovertemplate: 'Min Variance Portfolio<br>σ: %{x:.1f}%<br>μ: %{y:.1f}%<extra></extra>',
          },
          {
            x: [tangency.vol * 100],
            y: [tangency.ret * 100],
            mode: 'text+markers' as any,
            type: 'scatter',
            name: 'Max Sharpe',
            marker: { color: '#22c55e', size: 12, symbol: 'star' },
            text: ['Max Sharpe'],
            textposition: 'top center',
            textfont: { color: '#22c55e', size: 11 },
            hovertemplate: 'Max Sharpe Portfolio<br>σ: %{x:.1f}%<br>μ: %{y:.1f}%<extra></extra>',
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Volatility (Annual, %)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            zerolinecolor: '#334155',
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            title: { text: 'Expected Return (Annual, %)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            tickfont: { color: '#64748b' },
          },
          legend: {
            bgcolor: 'rgba(15,23,42,0.8)',
            bordercolor: '#334155',
            borderwidth: 1,
            font: { color: '#94a3b8' },
            x: 0.02,
            y: 0.98,
          },
          margin: { t: 20, b: 50, l: 70, r: 20 },
        }}
        config={{ displayModeBar: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
        style={{ width: '100%', height: '380px' }}
        useResizeHandler
        onHover={(data: any) => {
          if (data.points && data.points.length > 0) {
            const pt = data.points[0]
            const idx = portStats.findIndex(p => 
              Math.abs(p.vol * 100 - pt.x) < 0.5 && Math.abs(p.ret * 100 - pt.y) < 0.5
            )
            if (idx >= 0) {
              setHoveredPoint(portStats[idx])
            }
          }
        }}
        onUnhover={() => setHoveredPoint(null)}
      />

      {/* Asset weights display */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
        <div className="text-xs text-slate-400 mb-2">
          {hoveredPoint ? 'Hovered Portfolio Weights:' : 'Max Sharpe Portfolio Weights:'}
        </div>
        <div className="space-y-1.5">
          {ASSETS.map((asset, i) => {
            const weight = displayPoint?.weights[i] || 0
            const barWidth = weight * 100
            return (
              <div key={asset.name} className="flex items-center gap-2 text-xs">
                <span className="w-10 text-slate-500">{asset.name}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="w-12 text-right text-slate-300 font-medium">
                  {(weight * 100).toFixed(0)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-slate-500 mb-1">Min Variance Portfolio</div>
          <div className="text-lg font-bold text-red-400">{(mvp.vol * 100).toFixed(1)}% vol</div>
          <div className="text-slate-400">{(mvp.ret * 100).toFixed(1)}% return</div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-slate-500 mb-1">Max Sharpe Portfolio</div>
          <div className="text-lg font-bold text-green-400">{((tangency.ret - rf) / tangency.vol).toFixed(2)} Sharpe</div>
          <div className="text-slate-400">{(tangency.vol * 100).toFixed(1)}% vol / {(tangency.ret * 100).toFixed(1)}% ret</div>
        </div>
      </div>
    </div>
  )
}
