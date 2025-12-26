import type { Booking, ApiResponse } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchMyOrders = async (token: string): Promise<Booking[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data: ApiResponse<Booking[]> = await response.json();

        if (data.status === 'success' && data.data && Array.isArray(data.data.bookings)) {
            return data.data.bookings;
        }

        return [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
