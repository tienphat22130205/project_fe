import type { BookingsResponse, BookingAPI, BookingDisplay } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch user's bookings from backend
export const fetchMyBookings = async (): Promise<BookingsResponse> => {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BookingsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};



// Helper: Format giá tiền
const formatPrice = (price: number): number => {
    return price;
};

// Helper: Format ngày tháng
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

// Helper: Get payment method text
const getPaymentMethodText = (method: string): string => {
    const methods: { [key: string]: string } = {
        'bank_transfer': 'Chuyển khoản',
        'credit_card': 'Thẻ tín dụng',
        'cash': 'Tiền mặt',
    };
    return methods[method] || method;
};

// Helper: Get payment status text
const getPaymentStatusText = (status: string): string => {
    const statuses: { [key: string]: string } = {
        'pending': 'Chờ thanh toán',
        'paid': 'Đã thanh toán',
        'refunded': 'Đã hoàn tiền',
    };
    return statuses[status] || status;
};

// Convert API booking data to display format
export const convertBookingToDisplay = (booking: BookingAPI): BookingDisplay => {
    // Handle case where tour might be null (e.g. tour deleted)
    const tour = booking.tour || {
        title: 'Tour không tồn tại hoặc đã bị xóa',
        destination: 'Unknown',
        duration: 0,
        images: [],
    };

    return {
        id: booking._id,
        tourName: tour.title,
        tourCode: booking.bookingCode,
        date: formatDate(booking.startDate),
        location: tour.destination,
        price: formatPrice(booking.totalPrice),
        status: booking.status,
        image: tour.images?.[0] || '',
        duration: `${tour.duration} ngày ${Math.max(0, tour.duration - 1)} đêm`,
        participants: booking.participants,
        paymentMethod: getPaymentMethodText(booking.paymentMethod),
        paymentStatus: getPaymentStatusText(booking.paymentStatus),
    };
};
