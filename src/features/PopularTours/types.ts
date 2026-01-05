// API Response Types
export interface TourLocation {
  type: string;
  coordinates: [number, number];
  address: string;
  description: string;
  day?: number;
  _id?: string;
  id?: string;
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
  startLocation: TourLocation;
  locations: TourLocation[];
  guides: string[];
  rating: number;
  ratingsQuantity: number;
  isActive: boolean;
  featured: boolean;
  category: string;
  isInternational?: boolean;
  includes: string[];
  excludes: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
  __v?: number;
}

export interface ToursResponse {
  status: string;
  data: {
    tours: TourAPI[];
    total: number;
    page: number;
    totalPages: number;
  };
}

// Display Tour Type
export interface TourDisplay {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  transport: string;
  price: string;
  badge?: string;
  specialPrice?: string;
  originalPrice?: string;
  airline?: string;
  viewDetails: string;
  image?: string;
  rating?: number;
  ratingsQuantity?: number;
  category?: string;
}
