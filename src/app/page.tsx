import { Hero } from '@/components/landing/Hero'
import { ProductSections } from '@/components/landing/ProductSections'
import { SocialProof } from '@/components/landing/SocialProof'
import { ContentPreview } from '@/components/landing/ContentPreview'
import { ContactCTA } from '@/components/landing/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ProductSections />
      <ContentPreview />
      <ContactCTA />
    </>
  )
}
