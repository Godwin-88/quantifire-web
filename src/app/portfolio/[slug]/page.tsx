import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getPortfolioItem, getPortfolio } from '@/lib/portfolio'
import { DualFunnelTabs } from '@/components/shared/DualFunnelTabs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getPortfolioItem(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { title: project.name, description: project.tagline },
  }
}

export function generateStaticParams() {
  return getPortfolio().map((p) => ({ slug: p.slug }))
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params
  const project = getPortfolioItem(slug)
  if (!project) notFound()

  return (
    <div>
      {/* Hero */}
      <div className="section py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{project.icon}</span>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
              }}
            >
              {project.status === 'live' ? 'Live in Production' : 'In Development'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading leading-tight">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">{project.tagline}</p>
        </div>
      </div>

      {/* Tabs */}
      <Suspense fallback={null}>
        <DualFunnelTabs data={project} funnel="services" />
      </Suspense>
    </div>
  )
}