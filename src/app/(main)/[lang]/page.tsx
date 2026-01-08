import HeroBanner from '../../../features/HeroBanner';
import SpecialTours from '../../../features/SpecialTours';
import PopularTours from '../../../features/PopularTours';
import PromoBanners from '../../../features/PromoBanners';
import Destinations from '../../../features/Destinations';
import ChatWidget from '../../../features/Chat/chat/ChatWidget';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SpecialTours />
      <PopularTours />
      <PromoBanners />
      <Destinations />
      <ChatWidget />
    </>
  );
}
