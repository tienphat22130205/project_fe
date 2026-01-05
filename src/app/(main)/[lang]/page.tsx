import { HeroBanner, SpecialTours, PopularTours, Destinations, TourCategories, PromoBanners } from '@/features';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TourCategories />
      <SpecialTours />
      <PopularTours />
      <PromoBanners />
      <Destinations />
    </>
  );
}
