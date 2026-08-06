import HeroSection3D from '@/components/home/HeroSection3D'
import { DualPillarSection } from '@/components/home/DualPillarSection'
import { PortfolioSection } from '@/components/home/PortfolioSection'
import { LatestResearchSection } from '@/components/home/LatestResearchSection'
import { CTASection } from '@/components/home/CTASection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection3D />
      <DualPillarSection />
      <PortfolioSection />
      <LatestResearchSection />
      <CTASection />
      <NewsletterSection />
    </>
  )
}