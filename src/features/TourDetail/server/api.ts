import type { TourDetailResponse, RelatedToursResponse } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTourDetail = async (tourId: string): Promise<TourDetailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${tourId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tour details');
    }
    
    const data: TourDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tour details:', error);
    throw error;
  }
};

export const fetchRelatedTours = async (tourId: string, limit: number = 4): Promise<RelatedToursResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${tourId}/related?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch related tours');
    }
    
    const data: RelatedToursResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching related tours:', error);
    throw error;
  }
};
