import { Hero } from '@/components/landing/Hero'
import { ProductSections } from '@/components/landing/ProductSections'
import { SocialProof } from '@/components/landing/SocialProof'
import { ChannelStrip } from '@/components/landing/ChannelStrip'
import { NewsletterBanner } from '@/components/landing/NewsletterBanner'
import { ContentPreview } from '@/components/landing/ContentPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ProductSections />
      <ContentPreview />
      <ChannelStrip />
      <NewsletterBanner />
    </>
  )
}
