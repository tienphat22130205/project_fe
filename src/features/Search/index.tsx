import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaMap, FaCity, FaGlobeAmericas, FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { searchTours, formatPrice } from './server/api';
import type { Tour, SearchParams } from './server/types';

type SearchPageProps = {
  forcedIsInternational?: boolean;
  bannerTitle?: string;
  defaultHeading?: string;
};

const SearchPage: React.FC<SearchPageProps> = ({
  forcedIsInternational,
  bannerTitle,
  defaultHeading,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>('default');
  const [error, setError] = useState<string | null>(null);

  // Get search parameters from URL
  const keyword = searchParams.get('keyword') || searchParams.get('search') || '';
  const region = searchParams.get('region') || '';
  const province = searchParams.get('province') || '';
  const country = searchParams.get('country') || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minDuration = searchParams.get('minDuration');
  const maxDuration = searchParams.get('maxDuration');
  const minRating = searchParams.get('minRating');
  const category = searchParams.get('category') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const isInternational = searchParams.get('isInternational');
  const featured = searchParams.get('featured');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load tours based on search parameters
  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build search params
        const params: SearchParams = {
          limit: 12,
          page: currentPage,
        };
        
        // Add search text
        if (keyword) {
          params.search = keyword;
        }
        
        // Add location filters
        if (region) params.region = region;
        if (province) params.province = province;
        if (country) params.country = country;
        
        // Add price filters
        if (minPrice) params.minPrice = Number(minPrice);
        if (maxPrice) params.maxPrice = Number(maxPrice);
        
        // Add duration filters
        if (minDuration) params.minDuration = Number(minDuration);
        if (maxDuration) params.maxDuration = Number(maxDuration);
        
        // Add rating filter
        if (minRating) params.minRating = Number(minRating);
        
        // Add type filters
        if (category) params.category = category;
        if (difficulty) params.difficulty = difficulty;
        if (typeof forcedIsInternational === 'boolean') {
          params.isInternational = forcedIsInternational;
        } else if (isInternational !== null) {
          params.isInternational = isInternational === 'true';
        }
        if (featured !== null) params.featured = featured === 'true';
        
        // Add sorting
        if (sortBy !== 'default') {
          params.sort = sortBy;
        }
        
        console.log('Search params:', params);
        const response = await searchTours(params);
        console.log('Search response:', response);
        
        const nextTours =
          typeof forcedIsInternational === 'boolean'
            ? response.data.tours.filter((tour) => tour.isInternational === forcedIsInternational)
            : response.data.tours;

        setTours(nextTours);
        setTotalResults(response.data.total);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error loading tours:', error);
        setError('Không thể tải danh sách tours. Vui lòng thử lại.');
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [
    keyword,
    region,
    province,
    country,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minRating,
    category,
    difficulty,
    isInternational,
    featured,
    sortBy,
    currentPage,
    forcedIsInternational,
  ]);

  const computedHeading =
    keyword
      ? `Kết quả tìm kiếm với từ khóa "${keyword}"`
      : region
        ? `Tours tại ${region}`
        : province
          ? `Tours tại ${province}`
          : country
            ? `Tours ${country}`
            : defaultHeading || 'Tất cả tours';

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
            <h1 className="text-5xl font-bold text-white">{bannerTitle || 'Tìm kiếm'}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {computedHeading}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold text-blue-600">{totalResults}</span> tours
              {currentPage > 1 && ` - Trang ${currentPage}/${totalPages}`}
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
                <option value="price">Giá: Thấp đến cao</option>
                <option value="-price">Giá: Cao đến thấp</option>
                <option value="-rating">Rating: Cao nhất</option>
                <option value="duration">Thời gian: Ngắn nhất</option>
                <option value="-createdAt">Mới nhất</option>
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
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          ) : tours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Không tìm thấy tour phù hợp</p>
              <p className="text-gray-500 mt-2">Vui lòng thử lại với từ khóa khác hoặc bỏ bớt bộ lọc</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tours.map((tour) => (
                  <div
                    key={tour._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/tours/${tour._id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.images[0] || 'https://via.placeholder.com/300x200'}
                        alt={tour.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/1e88e5/ffffff?text=Tour';
                        }}
                      />
                      {/* Badges */}
                      {tour.featured && (
                        <div className="absolute top-3 left-0 bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                          NỔI BẬT
                        </div>
                      )}
                      {tour.isInternational && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded">
                          Quốc tế
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
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="flex-shrink-0" />
                          <span className="font-medium">Điểm đến:</span> {tour.destination}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaClock className="flex-shrink-0" />
                          <span className="font-medium">Thời gian:</span> {tour.duration} ngày
                        </p>
                        {tour.region && (
                          <p className="flex items-center gap-2">
                            <FaMap className="flex-shrink-0" />
                            <span className="font-medium">Miền:</span> {tour.region.name}
                          </p>
                        )}
                        {tour.province && (
                          <p className="flex items-center gap-2">
                            <FaCity className="flex-shrink-0" />
                            <span className="font-medium">Tỉnh:</span> {tour.province.name}
                          </p>
                        )}
                        {tour.country && (
                          <p className="flex items-center gap-2">
                            <FaGlobeAmericas className="flex-shrink-0" />
                            <span className="font-medium">Quốc gia:</span> {tour.country.name}
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <FaStar className="flex-shrink-0" />
                          <span className="font-medium">Đánh giá:</span> {tour.rating}/5 
                          {tour.ratingsQuantity && ` (${tour.ratingsQuantity} đánh giá)`}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-2xl font-bold text-red-600">
                          {formatPrice(tour.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    ← Trước
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white' 
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Active Filters Display */}
        {(keyword || region || province || country || minPrice || maxPrice || category || difficulty) && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaFilter />
              Bộ lọc đang áp dụng:
            </h3>
            <div className="flex flex-wrap gap-2">
              {keyword && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaSearch className="text-xs" /> {keyword}
                </span>
              )}
              {region && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaMap className="text-xs" /> {region}
                </span>
              )}
              {province && (
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaCity className="text-xs" /> {province}
                </span>
              )}
              {country && (
                <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaGlobeAmericas className="text-xs" /> {country}
                </span>
              )}
              {category && (
                <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaMapMarkerAlt className="text-xs" /> {category}
                </span>
              )}
              {difficulty && (
                <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm flex items-center gap-1">
                  <FaStar className="text-xs" /> {difficulty}
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1">
                  <MdAttachMoney className="text-xs" /> {minPrice ? `${Number(minPrice).toLocaleString()}` : '0'} - {maxPrice ? `${Number(maxPrice).toLocaleString()}` : '∞'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
