import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchTours, convertTourToDisplay } from '../PopularTours/api';
import type { TourDisplay } from '../PopularTours/types';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [allTours, setAllTours] = useState<TourDisplay[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('default');

  const keyword = searchParams.get('keyword') || '';
  const departDate = searchParams.get('depart') || '';
  const returnDate = searchParams.get('return') || '';
  const adults = searchParams.get('adults') || '1';
  const children = searchParams.get('children') || '0';

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        const response = await fetchTours({ limit: 100 });
        console.log('API Response:', response);
        
        if (!response || !response.data || !response.data.tours) {
          console.error('Invalid response structure:', response);
          setFilteredTours([]);
          return;
        }
        
        const displayTours = response.data.tours.map(convertTourToDisplay);
        console.log('Display Tours:', displayTours);
        
        // Filter tours theo keyword
        if (keyword) {
          const filtered = displayTours.filter((tour: TourDisplay) => 
            tour.title.toLowerCase().includes(keyword.toLowerCase()) ||
            tour.location.toLowerCase().includes(keyword.toLowerCase())
          );
          console.log('Filtered Tours:', filtered);
          setFilteredTours(filtered);
        } else {
          setFilteredTours(displayTours);
        }
      } catch (error) {
        console.error('Error loading tours:', error);
        setFilteredTours([]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [keyword]);

  // Sort tours - FIX: Don't include filteredTours in dependency
  useEffect(() => {
    if (sortBy === 'default') return;
    
    setFilteredTours(prevTours => {
      const sorted = [...prevTours];
      
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/\D/g, ''));
            const priceB = parseInt(b.price.replace(/\D/g, ''));
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          sorted.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/\D/g, ''));
            const priceB = parseInt(b.price.replace(/\D/g, ''));
            return priceB - priceA;
          });
          break;
        case 'date-asc':
          sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'date-desc':
          sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
      }
      
      return sorted;
    });
  }, [sortBy]);

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Tìm kiếm</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {keyword ? `Kết quả tìm kiếm với từ khóa "${keyword}"` : 'Tất cả tours'}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-blue-600">{filteredTours.length}</span> tours
            </p>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Sắp xếp</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="date-asc">Ngày: Sớm nhất</option>
                <option value="date-desc">Ngày: Mới nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            TOURS LIÊN QUAN
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Không tìm thấy tour phù hợp</p>
              <p className="text-gray-500 mt-2">Vui lòng thử lại với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge */}
                    {tour.badge && (
                      <div className="absolute top-3 left-0 bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                        {tour.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors min-h-[56px]">
                      {tour.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <p>
                        <span className="font-medium">Miền:</span> {tour.location}
                      </p>
                      <p>
                        <span className="font-medium">Thời gian:</span> {tour.duration}
                      </p>
                      <p>
                        <span className="font-medium">Phương tiện:</span> {tour.transport}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-2xl font-bold text-red-600">
                        {tour.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Params Info */}
        {(departDate || returnDate || adults !== '1' || children !== '0') && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Thông tin tìm kiếm:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              {departDate && (
                <div>
                  <span className="font-medium">Ngày đi:</span> {new Date(departDate).toLocaleDateString('vi-VN')}
                </div>
              )}
              {returnDate && (
                <div>
                  <span className="font-medium">Ngày về:</span> {new Date(returnDate).toLocaleDateString('vi-VN')}
                </div>
              )}
              <div>
                <span className="font-medium">Người lớn:</span> {adults}
              </div>
              <div>
                <span className="font-medium">Trẻ em:</span> {children}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
