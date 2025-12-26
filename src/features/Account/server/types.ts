export interface Booking {
    _id: string;
    tour: {
        _id: string;
        title: string;
        destination: string;
        images: string[];
        tourCode?: string;
    };
    startDate: string;
    totalPrice: number;
    status: string;
    paymentStatus: string;
    additionalServices: Array<{
        service: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    paymentMethod: string;
}

export interface ApiResponse<T> {
    status: string;
    data: {
        bookings: T;
    };
}
