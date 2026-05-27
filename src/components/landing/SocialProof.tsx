const STATS = [
  { value: '7', label: 'Systems built across finance, health & enterprise' },
  { value: '1,416', label: 'EA capabilities in AMD knowledge graph' },
  { value: '8', label: 'Autonomous trading sub-agents (GraphAlpha)' },
  { value: '27', label: 'MCP tools across agentic systems' },
]

export function SocialProof() {
  return (
    <section className="border-y border-slate-800 bg-qf-navy/30 py-10">
      <div className="section">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl font-extrabold gradient-text">{stat.value}</span>
              <span className="text-xs text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
