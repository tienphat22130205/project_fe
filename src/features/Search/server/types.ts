// Search Parameters
export interface SearchParams {
  // Text search
  search?: string;
  
  // Location filters
  region?: string;
  province?: string;
  country?: string;
  
  // Price range
  minPrice?: number;
  maxPrice?: number;
  
  // Duration
  minDuration?: number;
  maxDuration?: number;
  
  // Rating
  minRating?: number;
  
  // Type filters
  isInternational?: boolean;
  featured?: boolean;
  category?: string;
  difficulty?: string;
  
  // Sorting & Pagination
  sort?: string; // 'price', '-price', 'rating', '-rating', 'duration', '-createdAt'
  page?: number;
  limit?: number;
}

// Tour (same structure as other features)
export interface Tour {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  price: number;
  duration: number;
  rating: number;
  ratingsQuantity?: number;
  category: string;
  difficulty: string;
  isInternational: boolean;
  featured: boolean;
  region?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  province?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    thumbnailImage?: string;
  };
  country?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    thumbnailImage?: string;
  };
  images: string[];
  highlights: string[];
  departures?: Array<{
    date: string;
    availableSeats: number;
  }>;
  description?: string;
  maxGroupSize?: number;
}

export interface SearchResponse {
  status: string;
  data: {
    tours: Tour[];
    total: number;
    page: number;
    totalPages: number;
  };
}
