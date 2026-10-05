import Header from '../Components/HomePageComponents/Header'
import Footer from '../Components/HomePageComponents/Footer'
import Article from '../Components/HomePageComponents/Article'
import CrisisResources from '../Components/CrisisResources'

export default function ResourcesPage() {
  return (
    <div>
      <Header />
      <main>
        <div className="container mx-auto max-w-3xl px-5 lg:px-10 pt-14 lg:pt-20">
          <h1 className="fontCreateRound text-[32px] lg:text-[40px] text-[#0A1916]">Resources</h1>
          <p className="text-[#747272] fontDMSans text-[18px] mt-2 mb-8">
            Mindora is here to listen, but some moments need a real person. These services are free and confidential.
          </p>
          <CrisisResources />
        </div>
        <Article />
      </main>
      <Footer />
    </div>
  )
}
