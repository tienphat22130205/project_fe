export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as HeroBanner } from './HeroBanner';
export { default as SpecialTours } from './SpecialTours';
export { default as PopularTours } from './PopularTours';
export { default as CarRental } from './CarRental';

// DestinationsHome - imported separately to avoid naming conflicts
import DestinationsHomeComponent from './DestinationsHome';
export { DestinationsHomeComponent as Destinations };

// Destination Details
export { default as HaNoiDetail } from './DestinationDetails/Domestic/HaNoi';
export { default as ThaiLanDetail } from './DestinationDetails/International/ThaiLan';

