import type { ToursResponse, TourAPI, TourDisplay } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch tours từ backend
export const fetchTours = async (params?: {
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<ToursResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const url = `${API_BASE_URL}/tours/promotional${queryParams.toString() ? `?${queryParams}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ToursResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};

// Helper: Format giá tiền
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price).replace('₫', 'VNĐ');
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

// Helper: Lấy phương tiện di chuyển từ category
const getTransportFromCategory = (category: string): string => {
  const transports: { [key: string]: string } = {
    'Beach & Islands': 'Máy bay + Xe du lịch',
    'Mountain & Trekking': 'Xe giường nằm',
    'City & Culture': 'Xe du lịch',
    'Nature & Wildlife': 'Xe du lịch + Thuyền',
  };
  return transports[category] || 'Xe du lịch';
};

// Helper: Tạo badge từ tour data
const getBadge = (tour: TourAPI): string | undefined => {
  if (tour.featured) return 'HOT';
  if (tour.rating >= 4.8) return 'VIP';
  if (new Date(tour.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
    return 'MỚI';
  }
  return undefined;
};

// Convert API tour data sang display format
export const convertTourToDisplay = (tour: TourAPI): TourDisplay => {
  const firstStartDate = tour.startDates[0] || new Date().toISOString();
  const lastStartDate = tour.startDates[tour.startDates.length - 1] || firstStartDate;

  return {
    id: tour.id || tour._id,
    title: tour.title,
    location: tour.destination,
    date: `${formatDate(firstStartDate)} - ${formatDate(lastStartDate)}`,
    duration: `${tour.duration} ngày ${tour.duration - 1} đêm`,
    transport: getTransportFromCategory(tour.category),
    price: formatPrice(tour.price),
    badge: getBadge(tour),
    image: tour.images[0],
    viewDetails: 'Xem chi tiết',
    rating: tour.rating,
    ratingsQuantity: tour.ratingsQuantity,
    category: tour.category,
  };
};

// Filter tours theo loại (trong nước / quốc tế)
export const filterToursByType = (
  tours: TourAPI[],
  type: 'domestic' | 'international'
): TourAPI[] => {
  return tours.filter((tour) => {
    if (typeof tour.isInternational === 'boolean') {
      return type === 'domestic' ? !tour.isInternational : tour.isInternational;
    }

    // Fallback: nếu backend không trả isInternational
    const isDomestic = tour.destination.toLowerCase().includes('vietnam');
    return type === 'domestic' ? isDomestic : !isDomestic;
  });
};
