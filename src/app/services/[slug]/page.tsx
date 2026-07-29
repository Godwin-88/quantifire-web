import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getService, getServices } from '@/lib/services'
import { DualFunnelTabs } from '@/components/shared/DualFunnelTabs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.name,
    description: service.tagline,
    openGraph: { title: service.name, description: service.tagline },
  }
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <div>
      {/* Hero */}
      <div className="section py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300 mb-4">
            <span className="text-base">{service.icon}</span>
            {service.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading leading-tight">
            {service.tagline}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">{service.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Suspense fallback={null}>
        <DualFunnelTabs data={service} funnel="services" />
      </Suspense>
    </div>
  )
}