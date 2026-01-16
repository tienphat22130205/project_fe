import type { ToursResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:5000/api';

/**
 * Fetch tour search suggestions
 */
export const fetchTourSuggestions = async (keyword: string): Promise<string[]> => {
  try {
    if (keyword.trim().length < 2) {
      return [];
    }

    const response = await fetch(
      `${API_BASE_URL}/tours?search=${encodeURIComponent(keyword)}&limit=5`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }

    const data: ToursResponse = await response.json();
    return data.data.tours.map((tour) => tour.title);
  } catch (error) {
    console.error('Error fetching tour suggestions:', error);
    return [];
  }
};
