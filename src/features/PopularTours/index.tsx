import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import viTexts from '../../assets/locales/vi.json';
import type { TourDisplay } from './types';
import { fetchTours, convertTourToDisplay, filterToursByType } from './api';

const PopularTours: React.FC = () => {
  const navigate = useNavigate();
  const [domesticTours, setDomesticTours] = useState<TourDisplay[]>([]);
  const [internationalTours, setInternationalTours] = useState<TourDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tours từ API
  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchTours({ limit: 20 });
        
        if (response.status === 'success' && response.data.tours) {
          // Filter tours domestic
          const domestic = filterToursByType(response.data.tours, 'domestic');
          const domesticDisplay = domestic.slice(0, 5).map(convertTourToDisplay);
          setDomesticTours(domesticDisplay);
          
          // Filter tours international
          const international = filterToursByType(response.data.tours, 'international');
          const internationalDisplay = international.slice(0, 5).map(convertTourToDisplay);
          setInternationalTours(internationalDisplay);
        }
      } catch (err) {
        console.error('Error loading tours:', err);
        setError('Không thể tải dữ liệu tours. Vui lòng thử lại sau.');
        
        // Fallback về dữ liệu local nếu API lỗi
        const localDomestic = viTexts.popularTours.tours.domestic.slice(0, 5);
        const localInternational = viTexts.popularTours.tours.international.slice(0, 5);
        setDomesticTours(localDomestic as TourDisplay[]);
        setInternationalTours(localInternational as TourDisplay[]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const renderTourCard = (tour: TourDisplay, index: number) => (
    <div 
      key={tour.id || index} 
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
    >
      {/* Image Section */}
      <div className="relative sm:w-[280px] sm:flex-shrink-0">
        <img 
          src={tour.image || `https://via.placeholder.com/400x250/1e88e5/ffffff?text=${encodeURIComponent(tour.title)}`}
          alt={tour.title}
          className="w-full h-48 sm:h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250/1e88e5/ffffff?text=Tour+${index + 1}`;
          }}
        />
        {tour.badge && (
          <div className="absolute bottom-0 left-0 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-1.5 text-xs font-medium rounded-tr-lg">
            {tour.badge === 'HOT' ? 'Khởi hành thứ 7 hàng tuần' : tour.badge}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 line-clamp-2 uppercase">
            {tour.title}
          </h3>
          
          {/* Tour Details */}
          <div className="space-y-1.5 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[100px]">Xuất phát:</span>
              <span className="line-clamp-1">{tour.location}</span>
            </div>
            
            {tour.date && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 min-w-[100px]">Ngày khởi hành:</span>
                <span>{tour.date.split(' - ')[0]}</span>
              </div>
            )}
            
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[100px]">Thời gian:</span>
              <span>{tour.duration}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[100px]">Phương tiện:</span>
              <span>{tour.transport}</span>
            </div>
          </div>
        </div>

        {/* Price and Button Section */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Giá tour:</span>
            <span className="text-2xl font-bold text-red-600">{tour.price}</span>
          </div>
          <button 
            onClick={() => navigate(`/tours/${tour.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );

  // Placeholder card cho tour nước ngoài
  const renderPlaceholderCard = (index: number) => (
    <div 
      key={`placeholder-${index}`}
      className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col sm:flex-row overflow-hidden opacity-60"
    >
      {/* Image Placeholder */}
      <div className="relative sm:w-[280px] sm:flex-shrink-0 bg-gray-200 flex items-center justify-center h-48 sm:h-full">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Đang cập nhật</p>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-400 mb-3 uppercase">
            TOUR NƯỚC NGOÀI - ĐANG CẬP NHẬT
          </h3>
          
          <div className="space-y-1.5 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[100px]">Xuất phát:</span>
              <span>Đang cập nhật</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[100px]">Ngày khởi hành:</span>
              <span>Đang cập nhật</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[100px]">Thời gian:</span>
              <span>Đang cập nhật</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium min-w-[100px]">Phương tiện:</span>
              <span>Đang cập nhật</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Giá tour:</span>
            <span className="text-2xl font-bold text-gray-400">Liên hệ</span>
          </div>
          <button 
            disabled 
            className="bg-gray-300 text-gray-500 px-5 py-2.5 rounded-md font-medium cursor-not-allowed"
          >
            Đang cập nhật
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 uppercase">
          {viTexts.popularTours.title}
        </h2>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-6">
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-1">Đang hiển thị dữ liệu dự phòng</p>
          </div>
        )}

        {/* Two Column Layout */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tour trong nước */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                <span>Tour trong nước</span>
              </h3>
              <div className="space-y-4">
                {domesticTours.length > 0 ? (
                  domesticTours.map((tour, index) => renderTourCard(tour, index))
                ) : (
                  <p className="text-gray-500 text-center py-8">Không có tour nào khả dụng</p>
                )}
              </div>
            </div>

            {/* Tour nước ngoài */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                <span>Tour nước ngoài</span>
              </h3>
              <div className="space-y-4">
                {internationalTours.length > 0 ? (
                  internationalTours.map((tour, index) => renderTourCard(tour, index))
                ) : (
                  // Hiển thị 5 placeholder cards
                  Array.from({ length: 5 }).map((_, index) => renderPlaceholderCard(index))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTours;