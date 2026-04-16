'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

const RF_RATE = 0.03
const PERIODS = 252

function generateFatTailedReturns(n: number, df: number) {
  // Generate t-distributed returns using Box-Muller + t-transformation
  const returns = []
  for (let i = 0; i < n; i++) {
    // Generate normal
    const u1 = Math.random()
    const u2 = Math.random()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    
    // Generate chi-squared for t-distribution
    let chiSq = 0
    for (let j = 0; j < df; j++) {
      const u3 = Math.random()
      const u4 = Math.random()
      const g = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4)
      chiSq += g * g
    }
    
    // t-distributed value
    const t = z / Math.sqrt(chiSq / df)
    returns.push(0.0003 + t * 0.012)  // Daily drift + scaled t-return
  }
  return returns
}

function percentile(arr: number[], p: number) {
  const sorted = [...arr].sort((a, b) => a - b)
  const idx = Math.floor((p / 100) * sorted.length)
  return sorted[Math.max(0, Math.min(idx, sorted.length - 1))]
}

function calculateVar(returns: number[], alpha: number, method: 'historical' | 'normal' | 'student-t') {
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / returns.length
  const std = Math.sqrt(variance)
  
  if (method === 'historical') {
    return -percentile(returns, alpha * 100)
  } else if (method === 'normal') {
    // z-score for normal distribution
    const zScores: { [key: number]: number } = { 0.05: 1.645, 0.01: 2.326, 0.10: 1.282 }
    const z = zScores[alpha] || 1.645
    return -(mean - z * std)
  } else {
    // Student-t VaR (approximate using fitted df)
    const tQuantiles: { [key: number]: number } = { 0.05: 2.015, 0.01: 3.365, 0.10: 1.833 }  // df=5
    const t = tQuantiles[alpha] || 2.015
    return -(mean - t * std)
  }
}

function calculateES(returns: number[], alpha: number) {
  const varThreshold = calculateVar(returns, alpha, 'historical')
  const tailLosses = returns.filter(r => r < -varThreshold)
  if (tailLosses.length === 0) return varThreshold
  return -tailLosses.reduce((a, b) => a + b, 0) / tailLosses.length
}

export function VaRComparisonChart() {
  const [confidence, setConfidence] = useState<0.05 | 0.01>(0.05)
  const [portfolioValue, setPortfolioValue] = useState(1000000)
  const [seed, setSeed] = useState(0)
  
  const returns = useMemo(() => generateFatTailedReturns(500, 5), [seed])
  
  const varValues = useMemo(() => ({
    historical: calculateVar(returns, confidence, 'historical'),
    normal: calculateVar(returns, confidence, 'normal'),
    studentT: calculateVar(returns, confidence, 'student-t'),
    es: calculateES(returns, confidence),
  }), [returns, confidence])

  // Distribution histogram
  const histogramData = useMemo(() => {
    const bins = 40
    const min = Math.min(...returns)
    const max = Math.max(...returns)
    const binWidth = (max - min) / bins
    const binCounts = Array(bins).fill(0)
    const binCenters = []
    
    for (let i = 0; i < bins; i++) {
      binCenters.push(min + (i + 0.5) * binWidth)
    }
    
    for (const r of returns) {
      const binIdx = Math.min(Math.floor((r - min) / binWidth), bins - 1)
      binCounts[binIdx]++
    }
    
    return { centers: binCenters, counts: binCounts, binWidth }
  }, [returns])

  // Normal distribution overlay
  const normalOverlay = useMemo(() => {
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length
    const std = Math.sqrt(returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / returns.length)
    
    const xValues = histogramData.centers
    const yValues = xValues.map(x => {
      const z = (x - mean) / std
      const pdf = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) / std
      return pdf * returns.length * histogramData.binWidth
    })
    
    return { x: xValues, y: yValues }
  }, [returns, histogramData])

  const confLabel = confidence === 0.05 ? '95%' : '99%'

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Confidence:</span>
          <button
            onClick={() => setConfidence(0.05)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              confidence === 0.05
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            95%
          </button>
          <button
            onClick={() => setConfidence(0.01)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              confidence === 0.01
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            99%
          </button>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-slate-400">Portfolio:</span>
          <select
            value={portfolioValue}
            onChange={(e) => setPortfolioValue(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-300"
          >
            <option value={100000}>$100K</option>
            <option value={500000}>$500K</option>
            <option value={1000000}>$1M</option>
            <option value={5000000}>$5M</option>
            <option value={10000000}>$10M</option>
          </select>
          <button
            onClick={() => setSeed(s => s + 1)}
            className="px-3 py-1.5 rounded-md text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            🔄 Regenerate
          </button>
        </div>
      </div>

      {/* Distribution chart with VaR lines */}
      <Plot
        data={[
          {
            x: histogramData.centers.map(x => x * 100),
            y: histogramData.counts,
            type: 'bar',
            name: 'Return Distribution',
            marker: { color: '#334155', line: { color: '#475569', width: 0.5 } },
            opacity: 0.7,
            hovertemplate: 'Return: %{x:.2f}%<br>Frequency: %{y}<extra></extra>',
          },
          {
            x: normalOverlay.x.map(x => x * 100),
            y: normalOverlay.y,
            type: 'scatter',
            mode: 'lines',
            name: 'Normal Fit',
            line: { color: '#3b82f6', width: 2, dash: 'dash' },
            hovertemplate: 'Return: %{x:.2f}%<br>Density: %{y:.1f}<extra></extra>',
          },
          {
            x: [-varValues.historical * 100, -varValues.historical * 100],
            y: [0, Math.max(...histogramData.counts)],
            type: 'scatter',
            mode: 'lines',
            name: `Historical VaR (${confLabel})`,
            line: { color: '#22c55e', width: 2.5 },
            hovertemplate: `Historical VaR: ${(-varValues.historical * 100).toFixed(2)}%<extra></extra>`,
          },
          {
            x: [-varValues.normal * 100, -varValues.normal * 100],
            y: [0, Math.max(...histogramData.counts) * 0.9],
            type: 'scatter',
            mode: 'lines',
            name: `Normal VaR (${confLabel})`,
            line: { color: '#e94560', width: 2.5 },
            hovertemplate: `Normal VaR: ${(-varValues.normal * 100).toFixed(2)}%<extra></extra>`,
          },
          {
            x: [-varValues.studentT * 100, -varValues.studentT * 100],
            y: [0, Math.max(...histogramData.counts) * 0.8],
            type: 'scatter',
            mode: 'lines',
            name: `Student-t VaR (${confLabel})`,
            line: { color: '#f59e0b', width: 2.5 },
            hovertemplate: `Student-t VaR: ${(-varValues.studentT * 100).toFixed(2)}%<extra></extra>`,
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Daily Return (%)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            zerolinecolor: '#334155',
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            title: { text: 'Frequency', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            tickfont: { color: '#64748b' },
          },
          legend: {
            bgcolor: 'rgba(15,23,42,0.8)',
            bordercolor: '#334155',
            borderwidth: 1,
            font: { color: '#94a3b8' },
            x: 0.98,
            y: 0.98,
            xanchor: 'right',
          },
          margin: { t: 10, b: 50, l: 60, r: 20 },
          showlegend: true,
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '280px' }}
        useResizeHandler
      />

      {/* VaR values in dollars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-xs text-slate-500 mb-1">Historical VaR</div>
          <div className="text-lg font-bold text-green-400">
            ${(varValues.historical * portfolioValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500">
            ({(varValues.historical * 100).toFixed(2)}%)
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-xs text-slate-500 mb-1">Normal VaR</div>
          <div className="text-lg font-bold text-red-400">
            ${(varValues.normal * portfolioValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500">
            ({(varValues.normal * 100).toFixed(2)}%)
            {varValues.normal < varValues.historical * 0.9 && ' ⚠️ Underestimates'}
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-xs text-slate-500 mb-1">Student-t VaR</div>
          <div className="text-lg font-bold text-amber-400">
            ${(varValues.studentT * portfolioValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500">
            ({(varValues.studentT * 100).toFixed(2)}%)
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="text-xs text-slate-500 mb-1">Expected Shortfall</div>
          <div className="text-lg font-bold text-purple-400">
            ${(varValues.es * portfolioValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500">
            ({(varValues.es * 100).toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* Warning box */}
      <div className={`p-3 rounded-md text-xs border ${
        varValues.normal < varValues.historical * 0.85
          ? 'bg-red-500/10 border-red-500/30 text-red-400'
          : 'bg-slate-800 border-slate-700 text-slate-400'
      }`}>
        {varValues.normal < varValues.historical * 0.85 ? (
          <strong>⚠️ Warning:</strong>
        ) : (
          <strong>ℹ️ Note:</strong>
        )}
        {' '}Normal VaR underestimates tail risk by {((varValues.historical / varValues.normal - 1) * 100).toFixed(0)}% 
        compared to Historical VaR. This is due to fat tails in the return distribution. 
        Use Student-t or Historical VaR for more accurate risk estimates.
      </div>
    </div>
  )
}
