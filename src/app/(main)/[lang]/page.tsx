import HeroBanner from '../../../features/HeroBanner';
import SpecialTours from '../../../features/SpecialTours';
import PopularTours from '../../../features/PopularTours';
import PromoBanners from '../../../features/PromoBanners';
import DestinationsHome from '../../../features/DestinationsHome';
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
      <DestinationsHome />
      <ChatWidget />
    </>
  );
}