import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
