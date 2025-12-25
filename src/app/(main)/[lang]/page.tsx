import { HeroBanner, SpecialTours, PopularTours, Destinations, TourCategories } from '@/features';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TourCategories />
      <SpecialTours />
      <PopularTours />
      <Destinations />
    </>
  );
}
