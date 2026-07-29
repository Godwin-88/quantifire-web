import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Quantitative research, web development, process automation, data engineering, and data analytics — full-stack digital engineering for forward-thinking organisations.',
}

export default function ServicesPage() {
  const services = getServices()

  return (
    <div className="section py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-white font-heading">Services</h1>
        <p className="mt-3 text-slate-400">
          Five core service areas designed to take your project from concept to production.
          Every engagement starts with a conversation — <Link href="/contact" className="text-brand-primary hover:underline">book a discovery call</Link>.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-qf-navy/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-400 line-clamp-2">{service.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.techStack?.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-xs font-mono text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                Learn more <span className="text-sm">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}