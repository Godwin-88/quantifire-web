const CHANNELS = [
  { name: 'Blog', icon: '📝', desc: 'Canonical hub', color: 'text-qf-blue', href: '/blog' },
  { name: 'YouTube', icon: '▶', desc: 'Long-form video', color: 'text-red-500', href: '#' },
  { name: 'TikTok', icon: '♪', desc: 'Short clips', color: 'text-pink-400', href: '#' },
  { name: 'Instagram', icon: '◎', desc: 'Reels & carousels', color: 'text-purple-400', href: '#' },
  { name: 'LinkedIn', icon: 'in', desc: 'Professional / B2B', color: 'text-blue-400', href: '#' },
  { name: 'Twitter/X', icon: '𝕏', desc: 'Threads', color: 'text-slate-300', href: '#' },
  { name: 'Discord', icon: '⊕', desc: 'Community', color: 'text-indigo-400', href: '#' },
  { name: 'Reddit', icon: '⊗', desc: 'Cross-posts', color: 'text-orange-400', href: '#' },
  { name: 'WhatsApp', icon: '✆', desc: 'Broadcasts', color: 'text-green-400', href: '#' },
]

export function ChannelStrip() {
  return (
    <section className="py-20 border-t border-slate-800">
      <div className="section">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white">Content on Every Platform</h2>
          <p className="mt-2 text-slate-500 text-sm">
            One blog post → 9 channels, powered by agentic orchestration
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {CHANNELS.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              className="card-hover flex flex-col items-center gap-2 p-4 rounded-xl text-center"
            >
              <span className={`text-2xl font-bold ${ch.color}`}>{ch.icon}</span>
              <span className="text-xs font-semibold text-slate-200">{ch.name}</span>
              <span className="text-[10px] text-slate-500">{ch.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
