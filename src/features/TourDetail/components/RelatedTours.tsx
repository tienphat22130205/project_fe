import React, { useState, useEffect } from 'react';
import { fetchRelatedTours } from '../server/api';
import type { TourAPI } from '../server/types';

interface RelatedToursProps {
  currentTourId: string;
}

const RelatedTours: React.FC<RelatedToursProps> = ({ currentTourId }) => {
  const [relatedTours, setRelatedTours] = useState<TourAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedTours = async () => {
      try {
        setLoading(true);
        const response = await fetchRelatedTours(currentTourId, 3);
        setRelatedTours(response.data.tours);
      } catch (error) {
        console.error('Error loading related tours:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentTourId) {
      loadRelatedTours();
    }
  }, [currentTourId]);

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
          Tour liên quan
        </h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải tour liên quan...</p>
        </div>
      </div>
    );
  }

  if (relatedTours.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const relatedToursData = relatedTours.slice(0, 3).map(tour => ({
      id: tour._id,
      image: tour.images[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
      badge: tour.featured ? 'NỔI BẬT' : tour.category.toUpperCase(),
      title: tour.title,
      description: tour.description,
      departure: tour.startLocation.address,
      startDate: tour.departures[0] ? formatDate(tour.departures[0].startDate) : 'Liên hệ',
      duration: `${tour.duration} ngày`,
      transport: tour.destination,
      price: tour.price,
    }));

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
        Tour liên quan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedToursData.map((tour) => (
          <div
            key={tour.id}
            onClick={() => window.location.href = `/tours/${tour.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              {/* Badge */}
              <div className="absolute top-3 left-0 bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                {tour.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors">
                {tour.title}
              </h3>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p>
                  <span className="font-medium">Xuất phát:</span> {tour.departure}
                </p>
                <p>
                  <span className="font-medium">Ngày khởi hành:</span> {tour.startDate}
                </p>
                <p>
                  <span className="font-medium">Thời gian:</span> {tour.duration}
                </p>
              </div>

              {/* Price */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-2xl font-bold text-red-600">
                  {tour.price.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
