import type { Voucher, UserVoucher, ApplyVoucherRequest, ApplyVoucherResponse, ApiResponse } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch user's vouchers
 */
export const fetchMyVouchers = async (token: string): Promise<Voucher[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vouchers/my-vouchers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vouchers');
    }

    const result: ApiResponse<UserVoucher[]> = await response.json();

    if (result.status === 'success' && result.data && Array.isArray(result.data)) {
      // Transform UserVoucher[] to Voucher[] và thêm isUsed từ wrapper
      return result.data.map(item => ({
        ...item.voucher,
        isUsed: item.isUsed,
        name: item.voucher.name || item.voucher.description // Fallback nếu không có name
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    throw error;
  }
};

/**
 * Apply voucher code to get discount
 */
export const applyVoucher = async (
  token: string,
  request: ApplyVoucherRequest
): Promise<ApplyVoucherResponse> => {
  try {
    // Thử nhiều format để tương thích với backend
    const requestBody = {
      voucherCode: request.voucherCode,
      orderAmount: request.orderAmount,
      // Thêm các field thay thế có thể backend cần
      code: request.voucherCode,
      amount: request.orderAmount,
    };
    
    console.log('API applyVoucher called with:', requestBody);
    console.log('Token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}/vouchers/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response text:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      console.error('API error response parsed:', errorData);
      return {
        success: false,
        message: errorData.message || errorData.error || `Server error: ${response.status}`,
      };
    }

    const data = await response.json();
    console.log('API success response:', data);

    if (data.status === 'success' && data.data) {
      // Backend trả về data.data, thêm success: true
      return {
        success: true,
        ...data.data,
      };
    }

    return {
      success: false,
      message: data.message || 'Failed to apply voucher',
    };
  } catch (error) {
    console.error('Error applying voucher:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred while applying voucher',
    };
  }
};
