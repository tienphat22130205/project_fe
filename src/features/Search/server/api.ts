import type { SearchParams, SearchResponse } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

// Search tours with advanced filters
export const searchTours = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    // Text search
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    // Location filters
    if (params.region) {
      queryParams.append('region', params.region);
    }
    if (params.province) {
      queryParams.append('province', params.province);
    }
    if (params.country) {
      queryParams.append('country', params.country);
    }
    
    // Price range
    if (params.minPrice !== undefined) {
      queryParams.append('minPrice', String(params.minPrice));
    }
    if (params.maxPrice !== undefined) {
      queryParams.append('maxPrice', String(params.maxPrice));
    }
    
    // Duration
    if (params.minDuration !== undefined) {
      queryParams.append('minDuration', String(params.minDuration));
    }
    if (params.maxDuration !== undefined) {
      queryParams.append('maxDuration', String(params.maxDuration));
    }
    
    // Rating
    if (params.minRating !== undefined) {
      queryParams.append('minRating', String(params.minRating));
    }
    
    // Type filters
    if (params.isInternational !== undefined) {
      queryParams.append('isInternational', String(params.isInternational));
    }
    if (params.featured !== undefined) {
      queryParams.append('featured', String(params.featured));
    }
    if (params.category) {
      queryParams.append('category', params.category);
    }
    if (params.difficulty) {
      queryParams.append('difficulty', params.difficulty);
    }
    
    // Sorting & Pagination
    if (params.sort) {
      queryParams.append('sort', params.sort);
    }
    if (params.page !== undefined) {
      queryParams.append('page', String(params.page));
    }
    if (params.limit !== undefined) {
      queryParams.append('limit', String(params.limit));
    }
    
    const url = `${API_BASE_URL}/tours${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to search tours');
    }
    
    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching tours:', error);
    throw error;
  }
};

// Helper: Build search URL with params
export const buildSearchUrl = (params: SearchParams): string => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  
  return `/search?${queryParams.toString()}`;
};

// Helper: Format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price).replace('₫', 'VNĐ');
};
