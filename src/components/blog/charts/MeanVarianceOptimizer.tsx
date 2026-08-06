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

const RF = 0.03

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

function seededRandom(seed: number) {
  let s = seed
  return function () {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateRandomPortfolios(n: number) {
  const rng = seededRandom(42)
  const portfolios = []
  for (let p = 0; p < n; p++) {
    const raw = Array(5).fill(0).map(() => rng())
    const sum = raw.reduce((a, b) => a + b, 0)
    const weights = raw.map(r => r / sum)
    portfolios.push(weights)
  }
  return portfolios
}

// Simple constrained optimization using penalty method
function optimizeForTargetVol(targetVol: number, cov: number[][], maxIter = 500) {
  const rng = seededRandom(137)
  let bestWeights = Array(5).fill(0.2)
  let bestReturn = -Infinity
  
  for (let iter = 0; iter < maxIter; iter++) {
    const raw = Array(5).fill(0).map(() => rng() + 0.1)
    const sum = raw.reduce((a, b) => a + b, 0)
    let weights = raw.map(r => r / sum)
    
    const currentVol = portVolatility(weights, cov)
    if (currentVol > 0.001) {
      const scale = targetVol / currentVol
      weights = weights.map((w, i) => w * 0.7 + (weights[i] * scale / weights.reduce((a, b) => a + b, 0)) * 0.3)
      const wSum = weights.reduce((a, b) => a + b, 0)
      weights = weights.map(w => w / wSum)
    }
    
    const vol = portVolatility(weights, cov)
    const ret = portReturn(weights)
    
    const volPenalty = Math.abs(vol - targetVol) > 0.01 ? -10 : 0
    const score = ret + volPenalty
    
    if (score > bestReturn && Math.abs(vol - targetVol) < 0.015) {
      bestReturn = score
      bestWeights = weights
    }
  }
  
  const finalVol = portVolatility(bestWeights, cov)
  const finalRet = portReturn(bestWeights)
  
  return { weights: bestWeights, vol: finalVol, ret: finalRet }
}

export function MeanVarianceOptimizer() {
  const [targetVol, setTargetVol] = useState(0.10)
  const [showConstraints, setShowConstraints] = useState(true)
  const cov = useMemo(() => computeCovMatrix(), [])
  
  // Generate efficient frontier data
  const { frontier, mvp, tangency, allPortfolios } = useMemo(() => {
    const portfolios = generateRandomPortfolios(1500)
    const portStats = portfolios.map(weights => ({
      vol: portVolatility(weights, cov),
      ret: portReturn(weights),
      weights,
    }))
    
    // Find MVP
    const mvp = portStats.reduce((min, ps) => ps.vol < min.vol ? ps : min, portStats[0])
    
    // Find tangency
    const tangency = portStats.reduce((max, ps) => {
      const sharpe = (ps.ret - RF) / ps.vol
      const maxSharpe = (max.ret - RF) / max.vol
      return sharpe > maxSharpe ? ps : max
    }, portStats[0])
    
    // Build frontier
    const volRange = []
    for (let v = mvp.vol; v < 0.25; v += 0.002) {
      volRange.push(v)
    }
    
    const frontier = volRange.map(targetVol => {
      let maxRet = -Infinity
      let bestWeights = null
      for (const ps of portStats) {
        if (Math.abs(ps.vol - targetVol) < 0.003 && ps.ret > maxRet) {
          maxRet = ps.ret
          bestWeights = ps.weights
        }
      }
      return { vol: targetVol, ret: maxRet, weights: bestWeights }
    }).filter(f => f.weights !== null)
    
    return { frontier, mvp, tangency, allPortfolios: portStats }
  }, [cov])
  
  // Optimize for current target volatility
  const optimalPortfolio = useMemo(() => {
    return optimizeForTargetVol(targetVol, cov)
  }, [targetVol, cov])
  
  // Find where current portfolio sits on frontier

  const sharpe = (optimalPortfolio.ret - RF) / optimalPortfolio.vol

  return (
    <div className="space-y-4">
      {/* Target volatility slider */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-300">
            Target Portfolio Volatility (σ)
          </label>
          <span className="text-lg font-bold text-blue-400">
            {(targetVol * 100).toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min={Math.round(mvp.vol * 100)}
          max={22}
          value={Math.round(targetVol * 100)}
          onChange={(e) => setTargetVol(Number(e.target.value) / 100)}
          className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>Min: {(mvp.vol * 100).toFixed(1)}%</span>
          <span>Max: 22%</span>
        </div>
        
        {/* Constraint toggles */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              checked={showConstraints}
              onChange={(e) => setShowConstraints(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800"
            />
            Long-only (w_i ≥ 0)
          </label>
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              checked={true}
              disabled
              className="rounded border-slate-700 bg-slate-800"
            />
            Weights sum to 1 (Σw_i = 1)
          </label>
        </div>
      </div>

      {/* Optimization result */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Expected Return</div>
          <div className="text-lg font-bold text-green-400">
            {(optimalPortfolio.ret * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Portfolio Volatility</div>
          <div className="text-lg font-bold text-blue-400">
            {(optimalPortfolio.vol * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Sharpe Ratio</div>
          <div className="text-lg font-bold text-purple-400">
            {sharpe.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Efficient Frontier chart with current position */}
      <Plot
        data={[
          {
            x: allPortfolios.map(p => p.vol * 100),
            y: allPortfolios.map(p => p.ret * 100),
            mode: 'markers',
            type: 'scatter',
            name: 'Feasible Portfolios',
            marker: { color: '#475569', size: 3, opacity: 0.3 },
            hoverinfo: 'skip',
          },
          {
            x: frontier.map(p => p.vol * 100),
            y: frontier.map(p => p.ret * 100),
            mode: 'lines',
            type: 'scatter',
            name: 'Efficient Frontier',
            line: { color: '#3b82f6', width: 3 },
            hoverinfo: 'skip',
          },
          {
            x: [optimalPortfolio.vol * 100],
            y: [optimalPortfolio.ret * 100],
            mode: 'text+markers' as const,
            type: 'scatter',
            name: 'Selected Portfolio',
            marker: { color: '#e94560', size: 14, symbol: 'star' },
            text: ['You are here'],
            textposition: 'top center',
            textfont: { color: '#e94560', size: 11 },
            hovertemplate: `Target: ${(targetVol * 100).toFixed(1)}% vol<br>Return: ${(optimalPortfolio.ret * 100).toFixed(1)}%<extra></extra>`,
          },
          {
            x: [mvp.vol * 100],
            y: [mvp.ret * 100],
            mode: 'markers',
            type: 'scatter',
            name: 'Min Variance',
            marker: { color: '#22c55e', size: 10, symbol: 'diamond' },
            hovertemplate: `MVP: ${(mvp.vol * 100).toFixed(1)}% vol<br>Return: ${(mvp.ret * 100).toFixed(1)}%<extra></extra>`,
          },
          {
            x: [tangency.vol * 100],
            y: [tangency.ret * 100],
            mode: 'markers',
            type: 'scatter',
            name: 'Max Sharpe',
            marker: { color: '#f59e0b', size: 10, symbol: 'diamond' },
            hovertemplate: `Max Sharpe: ${(tangency.vol * 100).toFixed(1)}% vol<br>Return: ${(tangency.ret * 100).toFixed(1)}%<extra></extra>`,
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Volatility (σ, %)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            zerolinecolor: '#334155',
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            title: { text: 'Expected Return (μ, %)', font: { color: '#94a3b8' } },
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
          margin: { t: 10, b: 40, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '280px' }}
        useResizeHandler
      />

      {/* Portfolio weights */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <div className="text-sm font-medium text-slate-300 mb-3">
          Optimal Portfolio Weights
        </div>
        <div className="space-y-2">
          {ASSETS.map((asset, i) => {
            const weight = optimalPortfolio.weights[i] || 0
            const barWidth = weight * 100
            const isZero = weight < 0.02
            return (
              <div key={asset.name} className="flex items-center gap-3">
                <div className="w-24 text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{asset.name}</span>
                  <span className="text-slate-500 ml-1">(μ={(asset.mu * 100).toFixed(0)}%, σ={(asset.vol * 100).toFixed(0)}%)</span>
                </div>
                <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      isZero ? 'bg-slate-700' : 'bg-gradient-to-r from-blue-500 to-blue-400'
                    }`}
                    style={{ width: `${Math.max(barWidth, 2)}%` }}
                  />
                </div>
                <div className="w-14 text-right text-xs font-medium text-slate-300">
                  {isZero ? '<2%' : `${barWidth.toFixed(0)}%`}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Optimization formula display */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-xs">
        <div className="text-slate-400 mb-2 font-medium">Optimization Problem Being Solved:</div>
        <div className="font-mono text-slate-300 space-y-1">
          <div>max<sub>w</sub> w<sup>⊤</sup>μ</div>
          <div className="text-slate-500">subject to:</div>
          <div className="pl-4">
            <span className="text-blue-400">w<sup>⊤</sup>Σw</span> ≤ {(targetVol * 100).toFixed(1)}%²
            <span className="text-slate-500 ml-2">(variance constraint)</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-400">Σw<sub>i</sub></span> = 1
            <span className="text-slate-500 ml-2">(weights sum to 100%)</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-400">w<sub>i</sub></span> ≥ 0
            <span className="text-slate-500 ml-2">(long-only, {showConstraints ? 'enabled' : 'disabled'})</span>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className={`p-3 rounded-md text-xs border ${
        targetVol < 0.08 
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : targetVol > 0.18
          ? 'bg-red-500/10 border-red-500/30 text-red-400'
          : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
      }`}>
        {targetVol < 0.08 
          ? '✓ Conservative portfolio: Low volatility, dominated by bonds (TLT) and gold (GLD). Suitable for risk-averse investors.'
          : targetVol > 0.18
          ? '⚠ Aggressive portfolio: High volatility, heavy equity exposure (SPY, EEM, VNQ). Higher return potential but significant drawdown risk.'
          : '✓ Balanced portfolio: Moderate risk with diversified exposure across asset classes. Near the maximum Sharpe ratio region.'}
      </div>
    </div>
  )
}
