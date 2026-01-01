import type { RegionsResponse, ProvincesResponse, ToursResponse, CountriesResponse, CountryDetailResponse } from './types';

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

// Get tours by region slug
export const getToursByRegion = async (regionSlug: string, limit?: number): Promise<ToursResponse> => {
  try {
    const url = limit 
      ? `${API_BASE_URL}/tours/regions/${regionSlug}/tours?limit=${limit}`
      : `${API_BASE_URL}/tours/regions/${regionSlug}/tours`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tours by region');
    }
    
    const data: ToursResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tours by region:', error);
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

// ==================== INTERNATIONAL TOURS ====================

// Get all countries
export const getCountries = async (): Promise<CountriesResponse> => {
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

// Get country by slug
export const getCountryBySlug = async (countrySlug: string): Promise<CountryDetailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/${countrySlug}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch country details');
    }
    
    const data: CountryDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching country details:', error);
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
export const getCountriesByContinent = async (continent: string): Promise<CountriesResponse> => {
  try {
    const encodedContinent = encodeURIComponent(continent);
    const response = await fetch(`${API_BASE_URL}/countries/continent/${encodedContinent}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries by continent');
    }
    
    const data: CountriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries by continent:', error);
    throw error;
  }
};
