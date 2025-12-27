// API Response Types
export interface BookingLocation {
    type: string;
    coordinates: [number, number];
    address: string;
    description: string;
}

export interface BookingTour {
    _id: string;
    title: string;
    destination: string;
    duration: number;
    price: number;
    images: string[];
    startLocation: BookingLocation;
}

export interface BookingAPI {
    _id: string;
    tour: BookingTour;
    user: string;
    price: number;
    createdAt: string;
    paid: boolean;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    startDate: string;
    participants: number;
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
    bookingCode: string;
    __v?: number;
}

export interface BookingsResponse {
    status: string;
    results: number;
    data: {
        bookings: BookingAPI[];
    };
}

// Display Booking Type for UI
export interface BookingDisplay {
    id: string;
    tourName: string;
    tourCode: string;
    date: string;
    location: string;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    image: string;
    duration: string;
    participants: number;
    paymentMethod: string;
    paymentStatus: string;
}
