export interface Region {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  tourCount: number;
}

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

export interface Country {
  _id: string;
  name: string;
  slug: string;
  continent: string;
  description: string;
  image: string;
  thumbnailImage: string;
  order: number;
  tourCount: number;
}

export interface CountriesResponse {
  status: string;
  data: {
    countries: Country[];
  };
}

export interface Continent {
  name: string;
  countryCount: number;
}

export interface ContinentsResponse {
  status: string;
  data: {
    continents: Continent[];
  };
}

export interface CountryResponse {
  status: string;
  data: {
    country: Country;
  };
}

export interface CountriesByContinentResponse {
  status: string;
  data: {
    countries: Country[];
  };
}

// Tour interface for province tours
export interface Tour {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  price: number;
  duration: number;
  rating: number;
  region?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  province?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    thumbnailImage: string;
  };
  images: string[];
  highlights?: string[];
  departures?: unknown[];
}

export interface ToursResponse {
  status: string;
  data: {
    tours: Tour[];
  };
}
