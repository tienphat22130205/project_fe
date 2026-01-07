import HeroBanner from '../../../features/HeroBanner';
import SpecialTours from '../../../features/SpecialTours';
import PopularTours from '../../../features/PopularTours';
import PromoBanners from '../../../features/PromoBanners';
import Destinations from '../../../features/Destinations';
import TourCategories from '../../../features/TourCategories';
import ChatWidget from '../../../components/ChatWidget';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TourCategories />
      <SpecialTours />
      <PopularTours />
      <PromoBanners />
      <Destinations />
      <ChatWidget />
    </>
  );
}