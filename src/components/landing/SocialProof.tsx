const STATS = [
  { value: '6', label: 'Shipped systems in production' },
  { value: '9,100+', label: 'Knowledge graph edges (ClinicalMatch)' },
  { value: '8', label: 'Autonomous trading sub-agents' },
  { value: '27', label: 'MCP tools across projects' },
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
