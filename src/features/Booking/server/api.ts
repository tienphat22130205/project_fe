import type { BookingRequest, PaymentRequest } from './types';

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
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers,
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create booking');
  }
  
  return response.json();
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

// Fetch additional services (optional - if you have an endpoint for this)
export const fetchAdditionalServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};
