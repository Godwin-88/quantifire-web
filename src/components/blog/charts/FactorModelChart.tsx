'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading chart…</div>
) })

const FACTORS = ['MKT', 'SMB', 'HML', 'RMW', 'CMA', 'MOM'] as const
const FACTOR_LABELS: Record<string, string> = {
  MKT: 'Market (MKT)',
  SMB: 'Size (SMB)',
  HML: 'Value (HML)',
  RMW: 'Profitability (RMW)',
  CMA: 'Investment (CMA)',
  MOM: 'Momentum (MOM)',
}

function generateFactorReturns(n: number) {
  const factors: Record<string, number[]> = {}
  for (const f of FACTORS) {
    const vol = f === 'MKT' ? 0.01 : 0.005
    const drift = f === 'MKT' ? 0.0003 : 0.0001
    factors[f] = Array.from({ length: n }, () => drift + (Math.random() - 0.5) * vol * 2)
  }
  return factors
}

function generateStrategyReturns(factorReturns: Record<string, number[]>, type: 'beta' | 'alpha') {
  const n = factorReturns.MKT.length
  const returns = []
  
  for (let i = 0; i < n; i++) {
    let r = 0
    if (type === 'beta') {
      // High factor exposure, low alpha
      r = 0.00008 + 1.5 * factorReturns.MKT[i] + 0.3 * factorReturns.SMB[i]
    } else {
      // Market-neutral with genuine alpha
      r = 0.0004 + 0.1 * factorReturns.MKT[i] + 0.5 * factorReturns.HML[i] + 0.4 * factorReturns.MOM[i]
    }
    r += (Math.random() - 0.5) * 0.01  // Idiosyncratic
    returns.push(r)
  }
  return returns
}

function runFactorRegression(strategyReturns: number[], factorReturns: Record<string, number[]>) {
  const n = strategyReturns.length
  const factors = Object.keys(factorReturns)
  const k = factors.length
  
  // Simple OLS using normal equations (simplified for demo)
  // In production, use a proper stats library
  const betas: Record<string, number> = {}
  
  // Compute mean of strategy returns once
  const meanS = strategyReturns.reduce((a, b) => a + b, 0) / n
  
  for (const f of factors) {
    // Compute beta as covariance / variance
    const meanF = factorReturns[f].reduce((a, b) => a + b, 0) / n
    
    let cov = 0, varF = 0
    for (let i = 0; i < n; i++) {
      cov += (strategyReturns[i] - meanS) * (factorReturns[f][i] - meanF)
      varF += (factorReturns[f][i] - meanF) ** 2
    }
    
    betas[f] = cov / varF
  }
  
  // Compute alpha as intercept
  let expectedReturn = 0
  for (const f of factors) {
    expectedReturn += betas[f] * factorReturns[f].reduce((a, b) => a + b, 0) / n
  }
  const alpha = meanS - expectedReturn
  
  // Compute R-squared
  const predicted = strategyReturns.map((_, i) => {
    let pred = alpha
    for (const f of factors) {
      pred += betas[f] * factorReturns[f][i]
    }
    return pred
  })
  
  const ssTot = strategyReturns.reduce((sum, r) => sum + (r - meanS) ** 2, 0)
  const ssRes = strategyReturns.reduce((sum, r, i) => sum + (r - predicted[i]) ** 2, 0)
  const rSquared = 1 - ssRes / ssTot
  
  return { alpha, betas, rSquared }
}

export function FactorModelChart() {
  const [strategyType, setStrategyType] = useState<'beta' | 'alpha'>('beta')
  const [seed, setSeed] = useState(0)
  const [showRolling, setShowRolling] = useState(false)
  
  const { factorReturns, strategyReturns, regression } = useMemo(() => {
    const factors = generateFactorReturns(252 * 3)  // 3 years daily
    const strategy = generateStrategyReturns(factors, strategyType)
    const reg = runFactorRegression(strategy, factors)
    return { factorReturns: factors, strategyReturns: strategy, regression: reg }
  }, [strategyType, seed])

  // Rolling beta calculation (63-day window)
  const rollingBetas = useMemo(() => {
    if (!showRolling) return null
    const window = 63
    const betas = []
    const dates = []
    
    for (let i = window; i < strategyReturns.length; i++) {
      const windowStrategy = strategyReturns.slice(i - window, i)
      const windowFactors: Record<string, number[]> = {}
      for (const f of FACTORS) {
        windowFactors[f] = factorReturns[f].slice(i - window, i)
      }
      const reg = runFactorRegression(windowStrategy, windowFactors)
      betas.push(reg.betas)
      dates.push(Math.floor(i / 252))  // Years
    }
    
    return { dates, betas }
  }, [strategyReturns, factorReturns, showRolling])

  const annAlpha = regression.alpha * 252
  const annReturn = strategyReturns.reduce((a, b) => a + b, 0) / strategyReturns.length * 252

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Strategy:</span>
          <button
            onClick={() => setStrategyType('beta')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              strategyType === 'beta'
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            Beta-Driven
          </button>
          <button
            onClick={() => setStrategyType('alpha')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              strategyType === 'alpha'
                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            Alpha + Factors
          </button>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-slate-400 flex items-center gap-2">
            <input
              type="checkbox"
              checked={showRolling}
              onChange={(e) => setShowRolling(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800"
            />
            Show Rolling Betas
          </label>
          <button
            onClick={() => setSeed(s => s + 1)}
            className="px-3 py-1.5 rounded-md text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            🔄 Regenerate
          </button>
        </div>
      </div>

      {/* Factor exposure bar chart */}
      <Plot
        data={[
          {
            y: FACTORS.map(f => FACTOR_LABELS[f]),
            x: FACTORS.map(f => regression.betas[f]),
            type: 'bar',
            orientation: 'h',
            name: 'Factor Beta',
            marker: {
              color: FACTORS.map(f => {
                const b = regression.betas[f]
                if (Math.abs(b) < 0.15) return '#475569'  // Insignificant
                return b > 0 ? '#3b82f6' : '#e94560'  // Positive / Negative
              }),
            },
            hovertemplate: '%{y}: β = %{x:.3f}<extra></extra>',
          },
          {
            x: [0, 0],
            y: [-0.5, FACTORS.length - 0.5],
            type: 'scatter',
            mode: 'lines',
            name: 'Zero',
            line: { color: '#64748b', dash: 'dot', width: 1 },
            hoverinfo: 'skip',
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Factor Beta (β)', font: { color: '#94a3b8' } },
            gridcolor: '#1e293b',
            zeroline: false,
            tickfont: { color: '#64748b' },
          },
          yaxis: {
            tickfont: { color: '#94a3b8' },
            automargin: true,
          },
          legend: { bgcolor: 'rgba(15,23,42,0.8)', bordercolor: '#334155', borderwidth: 1 },
          margin: { t: 10, b: 40, l: 120, r: 20 },
          showlegend: false,
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '280px' }}
        useResizeHandler
      />

      {/* Rolling betas chart */}
      {showRolling && rollingBetas && (
        <Plot
          data={FACTORS.map((f, i) => ({
            x: rollingBetas.dates,
            y: rollingBetas.betas.map(b => b[f]),
            type: 'scatter',
            mode: 'lines',
            name: FACTOR_LABELS[f],
            line: { color: ['#3b82f6', '#22c55e', '#e94560', '#f59e0b', '#8b5cf6', '#06b6d4'][i], width: 1.5 },
            hovertemplate: `Year %{x}<br>β: %{y:.3f}<extra>${FACTOR_LABELS[f]}</extra>`,
          }))}
          layout={{
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 10 },
            xaxis: {
              title: { text: 'Years', font: { color: '#94a3b8' } },
              gridcolor: '#1e293b',
              tickfont: { color: '#64748b' },
            },
            yaxis: {
              title: { text: 'Rolling Beta (63d)', font: { color: '#94a3b8' } },
              gridcolor: '#1e293b',
              tickfont: { color: '#64748b' },
            },
            legend: {
              bgcolor: 'rgba(15,23,42,0.8)',
              bordercolor: '#334155',
              borderwidth: 1,
              font: { color: '#94a3b8', size: 9 },
              orientation: 'h',
              x: 0.5,
              y: 1.02,
              xanchor: 'center',
            },
            margin: { t: 30, b: 40, l: 50, r: 20 },
          }}
          config={{ displayModeBar: false }}
          style={{ width: '100%', height: '200px' }}
          useResizeHandler
        />
      )}

      {/* Metrics summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Annual Alpha</div>
          <div className={`text-xl font-bold ${
            strategyType === 'alpha' && annAlpha > 0.05 ? 'text-green-400' : 
            strategyType === 'beta' ? 'text-slate-400' : 'text-blue-400'
          }`}>
            {(annAlpha * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {strategyType === 'beta' ? 'Not significant' : 'Significant'}
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">R-Squared</div>
          <div className="text-xl font-bold text-blue-400">
            {(regression.rSquared * 100).toFixed(0)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {regression.rSquared > 0.7 ? 'Factor-driven' : 'Alpha-driven'}
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Annual Return</div>
          <div className={`text-xl font-bold ${annReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(annReturn * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Market Beta</div>
          <div className={`text-xl font-bold ${
            regression.betas.MKT > 1.2 ? 'text-red-400' : 
            regression.betas.MKT < 0.8 ? 'text-blue-400' : 'text-slate-300'
          }`}>
            {regression.betas.MKT.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {regression.betas.MKT > 1.2 ? 'Aggressive' : regression.betas.MKT < 0.8 ? 'Defensive' : 'Neutral'}
          </div>
        </div>
      </div>

      {/* Interpretation box */}
      <div className={`p-3 rounded-md text-xs border ${
        strategyType === 'beta'
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          : 'bg-green-500/10 border-green-500/30 text-green-400'
      }`}>
        {strategyType === 'beta' ? (
          <>
            <strong>⚠️ Beta-Driven Strategy:</strong> R² = {(regression.rSquared * 100).toFixed(0)}% of variance 
            explained by factors. Alpha is not statistically significant. This strategy is essentially 
            leveraged factor exposure, not genuine alpha. Consider whether you're being compensated for 
            skill or just taking uncompensated factor risks.
          </>
        ) : (
          <>
            <strong>✓ Alpha + Factor Strategy:</strong> R² = {(regression.rSquared * 100).toFixed(0)}% 
            — moderate factor exposure with significant alpha. This strategy has genuine skill-based 
            returns beyond factor bets. Monitor rolling betas for style drift over time.
          </>
        )}
      </div>
    </div>
  )
}
