import HeroSection3D from '@/components/home/HeroSection3D'
import SocialProofBar from '@/components/home/SocialProofBar'
import { PortfolioSection } from '@/components/home/PortfolioSection'
import { NotebooksSection } from '@/components/home/NotebooksSection'
import ServicesSection from '@/components/home/ServicesSection'
import { ServiceDetailSection } from '@/components/home/ServiceDetailSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { CTASection } from '@/components/home/CTASection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection3D />
      <SocialProofBar />
      <PortfolioSection />
      <NotebooksSection />
      <ServicesSection />
      <ServiceDetailSection />
      <ProcessSection />
      <CTASection />
      <NewsletterSection />
    </>
  )
}