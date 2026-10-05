import { useEffect } from 'react'
import Header from '../Components/HomePageComponents/Header'
import HeroSection from '../Components/HomePageComponents/HeroSection'
import About from '../Components/HomePageComponents/About'
import HowItIsWorks from '../Components/HomePageComponents/HowItIsWorks'
import Article from '../Components/HomePageComponents/Article'
import StartChat from '../Components/HomePageComponents/StartChat'
import Footer from '../Components/HomePageComponents/Footer'
import { warmUpServer } from '../API'

export default function HomePage() {
  // Start waking the (free-tier) server while the visitor reads the page.
  useEffect(() => { warmUpServer() }, [])

  return (
    <div>
        <Header />
        <HeroSection />
        <About />
        <HowItIsWorks />
        <Article />
        <StartChat />
        <Footer />
    </div>
  )
}
