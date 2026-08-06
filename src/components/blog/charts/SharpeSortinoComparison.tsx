'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

const RF_RATE = 0.03
const PERIODS = 252

function generateReturns(type: 'symmetric' | 'posSkew' | 'negSkew', n: number) {
  const returns = []
  
  if (type === 'symmetric') {
    // Normal distribution
    for (let i = 0; i < n; i++) {
      const u1 = Math.random()
      const u2 = Math.random()
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
      returns.push(0.0004 + z * 0.012)
    }
  } else if (type === 'posSkew') {
    // Small losses, occasional big wins
    for (let i = 0; i < n; i++) {
      let r = -0.0002 + (Math.random() - 0.5) * 0.016
      if (Math.random() < 0.06) {
        r += 0.04 + Math.random() * 0.04  // 6% chance of big gain
      }
      returns.push(r)
    }
  } else {
    // Small gains, occasional big losses (selling tail risk)
    for (let i = 0; i < n; i++) {
      let r = 0.0006 + (Math.random() - 0.5) * 0.01
      if (Math.random() < 0.02) {
        r -= 0.08 + Math.random() * 0.07  // 2% chance of big loss
      }
      returns.push(r)
    }
  }
  
  return returns
}

function sharpeRatio(returns: number[]) {
  const excess = returns.map(r => r - RF_RATE / PERIODS)
  const mean = excess.reduce((a, b) => a + b, 0) / excess.length
  const variance = excess.reduce((sum, r) => sum + (r - mean) ** 2, 0) / excess.length
  const std = Math.sqrt(variance)
  return Math.sqrt(PERIODS) * mean / std
}

function sortinoRatio(returns: number[]) {
  const excess = returns.map(r => r - RF_RATE / PERIODS)
  const mean = excess.reduce((a, b) => a + b, 0) / excess.length
  const downside = excess.filter(r => r < 0)
  if (downside.length === 0) return Infinity
  const downsideVar = downside.reduce((sum, r) => sum + r ** 2, 0) / downside.length
  const downsideDev = Math.sqrt(downsideVar)
  return Math.sqrt(PERIODS) * mean / downsideDev
}

function annualReturn(returns: number[]) {
  const cumulative = returns.reduce((prod, r) => prod * (1 + r), 1)
  const years = returns.length / PERIODS
  return cumulative ** (1 / years) - 1
}

function maxDrawdown(returns: number[]) {
  let peak = 1
  let maxDD = 0
  let cumulative = 1
  for (const r of returns) {
    cumulative *= (1 + r)
    if (cumulative > peak) peak = cumulative
    const dd = (peak - cumulative) / peak
    if (dd > maxDD) maxDD = dd
  }
  return maxDD
}

export function SharpeSortinoComparison() {
  const [selectedType, setSelectedType] = useState<'symmetric' | 'posSkew' | 'negSkew'>('posSkew')
  const [seed, setSeed] = useState(0)
  
  const returns = useMemo(() => {
    // Use seed to regenerate with same parameters
    const baseReturns = generateReturns(selectedType, PERIODS * 3)
    return baseReturns
  }, [selectedType, seed])

  const metrics = useMemo(() => {
    const sharpe = sharpeRatio(returns)
    const sortino = sortinoRatio(returns)
    const annRet = annualReturn(returns)
    const dd = maxDrawdown(returns)
    const skew = returns.reduce((sum, r) => sum + ((r - returns.reduce((a, b) => a + b, 0) / returns.length) ** 3), 0) / returns.length / (returns.reduce((sum, r) => sum + (r - returns.reduce((a, b) => a + b, 0) / returns.length) ** 2, 0) / returns.length) ** 1.5
    
    return { sharpe, sortino, annRet, dd, skew, ratio: sortino / sharpe }
  }, [returns])

  // Generate cumulative return curve
  const cumulativeData = useMemo(() => {
    const cum = [1]
    for (const r of returns) {
      cum.push(cum[cum.length - 1] * (1 + r))
    }
    return cum
  }, [returns])

  const days = Array.from({ length: cumulativeData.length }, (_, i) => i)

  return (
    <div className="space-y-4">
      {/* Strategy type selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'symmetric', label: 'Symmetric (Normal)', desc: 'Balanced upside/downside' },
          { key: 'posSkew', label: 'Positive Skew', desc: 'Small losses, big wins' },
          { key: 'negSkew', label: 'Negative Skew', desc: 'Small gains, big losses' },
        ].map(opt => (
          <button
            key={opt.key}
            onClick={() => setSelectedType(opt.key as 'symmetric' | 'posSkew' | 'negSkew')}
            className={`px-3 py-2 rounded-md text-xs transition-colors border text-left ${
              selectedType === opt.key
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="font-medium">{opt.label}</div>
            <div className="text-slate-500 text-[10px] mt-0.5">{opt.desc}</div>
          </button>
        ))}
        <button
          onClick={() => setSeed(s => s + 1)}
          className="px-3 py-2 rounded-md text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          🔄 Regenerate
        </button>
      </div>

      {/* Cumulative return chart */}
      <Plot
        data={[{
          x: days.map(d => Math.floor(d / PERIODS)),
          y: cumulativeData,
          type: 'scatter',
          mode: 'lines',
          name: 'Cumulative Return',
          line: { 
            color: selectedType === 'negSkew' ? '#e94560' : selectedType === 'posSkew' ? '#22c55e' : '#3b82f6',
            width: 2,
          },
          fill: 'tozeroy',
          fillcolor: selectedType === 'negSkew' ? 'rgba(233,69,96,0.1)' : selectedType === 'posSkew' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)',
          hovertemplate: 'Year %{x}<br>Value: $%{y:.2f}<extra></extra>',
        }]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Years', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            title: { text: 'Portfolio Value ($)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            tickfont: { color: '#64748b' },
            tickprefix: '$',
          },
          legend: { bgcolor: 'rgba(15,23,42,0.8)', bordercolor: '#334155', borderwidth: 1 },
          margin: { t: 10, b: 40, l: 60, r: 20 },
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '220px' }}
        useResizeHandler
      />

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Annual Return</div>
          <div className={`text-xl font-bold ${metrics.annRet >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(metrics.annRet * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Sharpe Ratio</div>
          <div className="text-xl font-bold text-blue-400">{metrics.sharpe.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Sortino Ratio</div>
          <div className="text-xl font-bold text-purple-400">{metrics.sortino === Infinity ? '∞' : metrics.sortino.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Max Drawdown</div>
          <div className="text-xl font-bold text-red-400">-{(metrics.dd * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* Sortino/Sharpe comparison bar */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <div className="text-sm font-medium text-slate-300 mb-3">
          Sortino vs Sharpe: {metrics.ratio.toFixed(2)}×
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blue-400">Sharpe Ratio</span>
              <span className="text-slate-400">{metrics.sharpe.toFixed(2)}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(metrics.sharpe / 3 * 100, 100)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-purple-400">Sortino Ratio</span>
              <span className="text-slate-400">{metrics.sortino === Infinity ? '∞' : metrics.sortino.toFixed(2)}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${Math.min((metrics.sortino === Infinity ? 3 : metrics.sortino) / 3 * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`mt-4 p-3 rounded-md text-xs ${
          metrics.ratio > 1.5 
            ? 'bg-green-500/10 border border-green-500/30 text-green-400'
            : metrics.ratio < 0.8
            ? 'bg-red-500/10 border border-red-500/30 text-red-400'
            : 'bg-slate-800 border border-slate-700 text-slate-400'
        }`}>
          {metrics.ratio > 1.5 
            ? '✓ Positive skew detected — upside volatility dominates. Sortino correctly shows lower risk than Sharpe.'
            : metrics.ratio < 0.8
            ? '⚠ Negative skew warning — downside volatility dominates. This strategy has hidden tail risk.'
            : 'Balanced skew — upside and downside volatility are similar. Sharpe and Sortino agree.'}
        </div>
      </div>
    </div>
  )
}
