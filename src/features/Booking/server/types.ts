export interface TourAPI {
  _id: string;
  title: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  maxGroupSize: number;
  difficulty: string;
  images: string[];
  startDates: string[];
  tourCode: string;
  departures: Departure[];
  itinerary: ItineraryItem[];
  locations: Location[];
  guides: unknown[];
  rating: number;
  ratingsQuantity: number;
  isActive: boolean;
  featured: boolean;
  category: string;
  includes: string[];
  excludes: string[];
  policies: Policies;
  startLocation: Location;
}

export interface Departure {
  _id: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  pricing: {
    adult: number;
    child: number;
    infant: number;
  };
}

export interface ItineraryItem {
  _id: string;
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation?: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  address: string;
  description: string;
  day?: number;
}

export interface Policies {
  cancellation: string[];
  payment: string[];
  groupDiscount?: string;
  note: string[];
}

export interface Passenger {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

export interface AdditionalService {
  service: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface AdditionalServiceData {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  maxQuantity?: number;
}

export interface BookingRequest {
  tourId: string;
  startDate: string;
  numberOfPeople: number;
  passengers: Passenger[];
  additionalServices: AdditionalService[];
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };
  paymentType: string;
}

export interface PaymentRequest {
  bookingId: string;
  method: 'momo' | 'atm' | 'credit_card' | 'bank_transfer' | 'cash';
  returnUrl?: string;
  cancelUrl?: string;
}

export interface BookingResponse {
  success: boolean;
  data: {
    booking: {
      _id: string;
      tour: TourAPI;
      user: {
        _id: string;
        email: string;
        fullName: string;
        role: string;
      };
      startDate: string;
      numberOfPeople: number;
      basePrice: number;
      totalPrice: number;
      status: string;
      paymentStatus: string;
      paymentType: string;
      passengers: Passenger[];
      additionalServices: AdditionalService[];
      customerInfo: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        notes: string;
      };
      discountCode: string;
      discountAmount: number;
      surcharge: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface PaymentResponse {
  success: boolean;
  data: {
    _id: string;
    booking: string | {
      _id: string;
      tour: string;
      status: string;
    };
    amount: number;
    method: string;
    status: string;
    paymentUrl?: string;
    paymentId?: string;
    bankInfo?: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      transferContent: string;
      amount: number;
    };
    instructions?: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  };
}
