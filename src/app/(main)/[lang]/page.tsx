import { HeroBanner, SpecialTours, PopularTours, Destinations } from '@/features';

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
