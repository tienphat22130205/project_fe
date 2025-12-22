export interface TourLocation {
  type: string;
  coordinates: [number, number];
  address: string;
  description: string;
  day?: number;
}

export interface TourDeparture {
  _id: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  pricing: {
    adult: number;
    child: number;
    infant: number;
  };
}

export interface TourItinerary {
  _id: string;
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation?: string;
}

export interface TourPolicies {
  cancellation: string[];
  payment: string[];
  groupDiscount: string;
  note: string[];
}

export interface TourAPI {
  _id: string;
  title: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  maxGroupSize: number;
  difficulty: string;
  images: string[];
  startDates: string[];
  tourCode: string;
  departures: TourDeparture[];
  itinerary: TourItinerary[];
  locations: TourLocation[];
  startLocation: TourLocation;
  guides: unknown[];
  rating: number;
  ratingsQuantity: number;
  isActive: boolean;
  featured: boolean;
  category: string;
  includes: string[];
  excludes: string[];
  policies: TourPolicies;
  createdAt: string;
  updatedAt: string;
}

export interface TourDetailResponse {
  status: string;
  data: {
    tour: TourAPI;
  };
}

export interface RelatedToursResponse {
  status: string;
  data: {
    tours: TourAPI[];
  };
}
