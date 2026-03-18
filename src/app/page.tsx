import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Pricing from '@/components/Pricing'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Showcase />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
