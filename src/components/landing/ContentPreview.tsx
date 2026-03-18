import Link from 'next/link'

// Static preview — replaced with real DB data once Supabase is connected
const PREVIEW_POSTS = [
  {
    slug: 'ep11-how-uniswap-works-xy-k-formula',
    title: 'How Uniswap Actually Works: The x·y=k Formula',
    summary: 'Every stock exchange uses order books and human market makers. Uniswap replaced all of that with one equation: x·y=k. Derives the constant product formula and calculates price impact from first principles.',
    tags: ['DeFi', 'AMM', 'Uniswap'],
    seriesName: 'DeFi Mechanics',
    episode: 'EP 11',
    access: 'free',
  },
  {
    slug: 'ep01-why-correlation-matters-more-than-returns',
    title: 'Why Correlation Matters More Than Returns',
    summary: 'Adding a losing asset to your portfolio can make you more money. Derives the portfolio variance formula, builds a correlation matrix from scratch in Python, and shows why diversification fails exactly when you need it most.',
    tags: ['Portfolio Theory', 'Correlation', 'Python'],
    seriesName: 'Classical Quantitative Finance',
    episode: 'EP 01',
    access: 'free',
  },
]

export function ContentPreview() {
  return (
    <section className="py-20 border-t border-slate-800">
      <div className="section">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest from the Blog</h2>
            <p className="mt-1 text-sm text-slate-500">
              Animated videos, deep-dive articles, and executable code — learn quant finance by doing
            </p>
          </div>
          <Link href="/blog" className="btn-ghost text-qf-blue text-sm">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl">
          {PREVIEW_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-hover group block p-5 rounded-xl"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="text-qf-red font-mono">{post.episode}</span>
                <span>·</span>
                <span>{post.seriesName}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-qf-blue transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge bg-slate-800 text-slate-400">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
