import HeroBanner from '../../../features/HeroBanner';
import SpecialTours from '../../../features/SpecialTours';
import PopularTours from '../../../features/PopularTours';
import Destinations from '../../../features/Destinations';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SpecialTours />
      <PopularTours />
      <Destinations />
    </>
  );
}
