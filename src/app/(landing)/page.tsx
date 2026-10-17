import Hero from "./_components/hero"
import ProductPreview from "./_components/product-preview"
import Features from "./_components/features"
import HowItWorks from "./_components/how-it-works"
import Payments from "./_components/payments"
import Audience from "./_components/audience"
import Pricing from "./_components/pricing"
import Faq from "./_components/faq"
import CtaBand from "./_components/cta-band"
import LandingFooter from "./_components/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <Payments />
      <Audience />
      <Pricing />
      <Faq />
      <CtaBand />
      <LandingFooter />
    </>
  )
}
