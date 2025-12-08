import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import SpecialTours from './components/SpecialTours'
import PopularTours from './components/PopularTours'
import Destinations from './components/Destinations'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <SpecialTours />
      <PopularTours />
      <Destinations />
      <Footer />
    </div>
  )
}

export default App
