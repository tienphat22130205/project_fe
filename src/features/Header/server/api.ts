import type { RegionsResponse, ProvincesResponse, CountriesResponse, ToursResponse, Province, Country, CountryResponse, ContinentsResponse, CountriesByContinentResponse } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all regions
export const getRegions = async (): Promise<RegionsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/regions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    
    const data: RegionsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

// Get provinces by region slug
export const getProvincesByRegion = async (regionSlug: string): Promise<ProvincesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/regions/${regionSlug}/provinces`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    
    const data: ProvincesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

// Get all countries
export const getAllCountries = async (): Promise<CountriesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data: CountriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Get tours by province slug
export const getToursByProvince = async (provinceSlug: string, limit?: number): Promise<ToursResponse> => {
  try {
    const url = limit 
      ? `${API_BASE_URL}/tours/provinces/${provinceSlug}/tours?limit=${limit}`
      : `${API_BASE_URL}/tours/provinces/${provinceSlug}/tours`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tours by province');
    }
    
    const data: ToursResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tours by province:', error);
    throw error;
  }
};

// Get province details from provinces by region
export const getProvinceDetail = async (provinceSlug: string): Promise<Province | null> => {
  try {
    // We need to search through all regions to find the province
    const regionsResponse = await getRegions();
    
    for (const region of regionsResponse.data.regions) {
      const provincesResponse = await getProvincesByRegion(region.slug);
      const province = provincesResponse.data.provinces.find(p => p.slug === provinceSlug);
      
      if (province) {
        return province;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching province detail:', error);
    throw error;
  }
};

// ==================== COUNTRIES APIs ====================

// Get all continents
export const getContinents = async (): Promise<ContinentsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/continents`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch continents');
    }
    
    const data: ContinentsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching continents:', error);
    throw error;
  }
};

// Get country by slug
export const getCountryBySlug = async (countrySlug: string): Promise<Country | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/${countrySlug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch country');
    }
    
    const data: CountryResponse = await response.json();
    return data.data.country;
  } catch (error) {
    console.error('Error fetching country by slug:', error);
    throw error;
  }
};

// Get tours by country slug
export const getToursByCountry = async (countrySlug: string, limit?: number): Promise<ToursResponse> => {
  try {
    const url = limit 
      ? `${API_BASE_URL}/countries/${countrySlug}/tours?limit=${limit}`
      : `${API_BASE_URL}/countries/${countrySlug}/tours`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tours by country');
    }
    
    const data: ToursResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tours by country:', error);
    throw error;
  }
};

// Get countries by continent
export const getCountriesByContinent = async (continent: string): Promise<CountriesByContinentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/continent/${encodeURIComponent(continent)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries by continent');
    }
    
    const data: CountriesByContinentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries by continent:', error);
    throw error;
  }
};
