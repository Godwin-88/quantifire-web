import Link from 'next/link'

const CHANNELS = [
  { label: 'YouTube', href: 'https://youtube.com/@quantifire', icon: '▶' },
  { label: 'TikTok', href: 'https://tiktok.com/@quantifire', icon: '♪' },
  { label: 'Instagram', href: 'https://instagram.com/quantifire', icon: '◎' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/quantifire', icon: 'in' },
  { label: 'Twitter/X', href: 'https://x.com/quantifire', icon: '𝕏' },
  { label: 'Discord', href: 'https://discord.gg/quantifire', icon: '⊕' },
  { label: 'Reddit', href: 'https://reddit.com/r/quantifire', icon: '⊗' },
]

const FOOTER_LINKS = {
  Projects: [
    { label: 'ClinicalMatch AI', href: '/products/clinicalmatch' },
    { label: 'Afripay', href: '/products/afripay' },
    { label: 'Job Hunter KE', href: '/products/jobhunter' },
    { label: 'GraphAlpha', href: '/products/graphalpha' },
    { label: 'Agentic ERP', href: '/products/agentic-erp' },
    { label: 'AMD EA Optimizer', href: '/products/amd-ea-optimizer' },
    // { label: 'Quantifaya', href: '/products/quantifaya' },           // coming soon
    // { label: 'Yield Agent', href: '/products/yield-agent' },         // coming soon
    // { label: 'Legal Research Agent', href: '/products/legal-research-agent' }, // in development
  ],
  Content: [
    { label: 'Blog', href: '/blog' },
    { label: 'Series', href: '/blog?view=series' },
    // { label: 'Newsletter', href: '/newsletter' },     // page not yet built
    // { label: 'Jupyter Notebooks', href: '/notebooks' }, // page not yet built
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/marketplace' },
    { label: 'Contact', href: '/contact' },
    // { label: 'Consulting', href: '/consulting' }, // page not yet built
  ],
  Legal: [
    // { label: 'Privacy Policy', href: '/privacy' },   // page not yet built
    // { label: 'Terms of Service', href: '/terms' },   // page not yet built
    // { label: 'Cookie Policy', href: '/cookies' },    // page not yet built
    { label: 'Not financial advice', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-qf-navy/40">
      <div className="section py-12">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="text-lg font-bold">
              <span className="gradient-text">Quanti</span>
              <span>🔥</span>
            </Link>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Full-Stack Engineer · AI/ML<br />Quant Finance · Nairobi, Kenya
            </p>
            {/* Social channels */}
            <div className="mt-4 flex flex-wrap gap-2">
              {CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ch.label}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 text-xs text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-colors"
                >
                  {ch.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Quantifaya. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Not financial advice. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
