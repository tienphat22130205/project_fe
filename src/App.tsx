import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import SpecialTours from './components/SpecialTours'
import PopularTours from './components/PopularTours'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
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
