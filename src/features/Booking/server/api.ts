import type { BookingRequest, PaymentRequest, AdditionalServiceData } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch tour details
export const fetchTourDetail = async (tourId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${tourId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tour details');
    }
    const data = await response.json();
    console.log('Tour API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching tour:', error);
    throw error;
  }
};

// Create booking
export const createBooking = async (bookingData: BookingRequest, token?: string) => {
  const accessToken = token || localStorage.getItem('accessToken');
  
  console.log('=== CREATE BOOKING ===');
  console.log('API URL:', `${API_BASE_URL}/bookings`);
  console.log('Booking data:', JSON.stringify(bookingData, null, 2));
  console.log('Token:', accessToken ? 'Present' : 'Missing');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(bookingData),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Initiate payment
export const initiatePayment = async (paymentData: PaymentRequest, token?: string) => {
  const accessToken = token || localStorage.getItem('accessToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to initiate payment');
  }
  
  return response.json();
};

// Check payment status
export const checkPaymentStatus = async (paymentId: string, token?: string) => {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to check payment status');
  }
  
  return response.json();
};

// Fetch additional services for a tour
export const fetchAdditionalServices = async (tourId: string) => {
  try {
    console.log('Fetching additional services for tour:', tourId);
    const response = await fetch(`${API_BASE_URL}/tours/${tourId}/additional-services`);
    
    console.log('Additional services response status:', response.status);
    
    if (!response.ok) {
      // If endpoint doesn't exist or returns error, return empty services
      console.warn('Additional services endpoint returned error:', response.status);
      return { success: true, data: [] };
    }
    
    const data = await response.json();
    console.log('Additional services response:', data);
    
    // Validate that services have valid IDs
    if (data.data && Array.isArray(data.data)) {
      const validServices = data.data.filter((s: AdditionalServiceData) => s._id && s._id !== 'undefined');
      console.log('Valid services after filter:', validServices);
      return { ...data, data: validServices };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching additional services:', error);
    // Return empty array instead of throwing to prevent blocking the booking page
    return { success: true, data: [] };
  }
};
