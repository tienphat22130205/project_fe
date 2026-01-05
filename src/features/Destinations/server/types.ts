// Region với đầy đủ thông tin
export interface Region {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  tourCount: number;
}

// Province với đầy đủ thông tin và ảnh
export interface Province {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  thumbnailImage: string;
  order: number;
  tourCount: number;
}

// Tour detail
export interface Tour {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  price: number;
  duration: number;
  rating: number;
  ratingsQuantity?: number;
  region: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  province: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    thumbnailImage: string;
  };
  images: string[];
  highlights: string[];
  departures?: Array<{
    date: string;
    availableSeats: number;
  }>;
  description?: string;
  maxGroupSize?: number;
  difficulty?: string;
}

export interface RegionsResponse {
  status: string;
  data: {
    regions: Region[];
  };
}

export interface ProvincesResponse {
  status: string;
  data: {
    provinces: Province[];
  };
}

export interface ToursResponse {
  status: string;
  data: {
    tours: Tour[];
  };
}

// Country với đầy đủ thông tin (International)
export interface Country {
  _id: string;
  name: string;
  slug: string;
  continent: string;
  description: string;
  image: string;
  thumbnailImage: string;
  visa: string;
  currency: string;
  language: string;
  bestTime: string;
  order: number;
  tourCount: number;
}

export interface CountriesResponse {
  status: string;
  data: {
    countries: Country[];
  };
}

export interface CountryDetailResponse {
  status: string;
  data: {
    country: Country;
  };
}
