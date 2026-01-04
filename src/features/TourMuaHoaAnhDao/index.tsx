import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlane, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Tour {
  _id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  images: string[];
  rating?: number;
  ratingsQuantity?: number;
  departure?: string;
  airline?: string;
  category?: string;
}

const TourMuaHoaAnhDao: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200000000]);
  const [sortBy, setSortBy] = useState('default');
  const [expandedSections, setExpandedSections] = useState({
    destination: true,
    category: true,
    price: false
  });

  // Dữ liệu tĩnh cho tours
  const allTours: Tour[] = [
    {
      _id: '1',
      title: 'NHẬT BẢN (TOKYO – NÚI PHÚ SĨ – NAGOYA – KYOTO - OSAKA) "NGẮM HOA ANH ĐÀO NỞ SỚM"',
      destination: 'Nhật Bản',
      duration: '5 ngày 4 đêm',
      price: 35990000,
      images: ['https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500&q=80'],
      departure: '25/02/2026',
      airline: 'Vietnam Airlines',
      category: 'Tour định kỳ'
    },
    {
      _id: '2',
      title: 'NHẬT BẢN - Thưởng Ngoạn Anh Đào Kawazu (Osaka - Kobe - Kyoto - Núi Phú Sỹ - Tokyo)',
      destination: 'Nhật Bản',
      duration: '6 ngày 5 đêm',
      price: 44999000,
      images: ['https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=500&q=80'],
      departure: '10/03/2026',
      airline: 'Vietnam Airlines',
      category: 'Tour định kỳ'
    },
    {
      _id: '3',
      title: 'HÀN QUỐC - Thưởng Ngoạn Hoa Anh Đào (Seoul – Jeju - Nami - Morning Calm)',
      destination: 'Hàn Quốc',
      duration: '6 ngày 5 đêm',
      price: 28999000,
      images: ['https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=500&q=80'],
      departure: '21/03/2026',
      airline: 'Vietnam Airlines',
      category: 'Tour định kỳ'
    },
    {
      _id: '4',
      title: 'CANADA - Thưởng Ngoạn Hoa Anh Đào (Vancouver - Victoria - Whistler Village)',
      destination: 'Canada',
      duration: '7 ngày 6 đêm',
      price: 99999000,
      images: ['https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&q=80'],
      departure: '28/03/2026',
      airline: 'EVA Air',
      category: 'Tour cao cấp'
    }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter và sort tours
  const filteredTours = allTours
    .filter(tour => {
      if (selectedDestination !== 'all' && tour.destination !== selectedDestination) return false;
      if (selectedCategory !== 'all' && tour.category !== selectedCategory) return false;
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false;
      if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleTourClick = (tourId: string) => {
    navigate(`/tours/${tourId}`);
  };

  const handleSearch = () => {
    // Search sẽ filter trong danh sách hiện tại
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative text-white py-16 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1600&q=80)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-purple-900/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            TOUR MÙA HOA ANH ĐÀO
          </h1>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-3">
              <FaSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Tìm theo điểm đến hoạt động"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                
                {/* Tìm theo điểm đến */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('destination')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                  >
                    <span>Tìm theo điểm đến</span>
                    {expandedSections.destination ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.destination && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="destination"
                          checked={selectedDestination === 'all'}
                          onChange={() => setSelectedDestination('all')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Tất cả</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="destination"
                          checked={selectedDestination === 'Nhật Bản'}
                          onChange={() => setSelectedDestination('Nhật Bản')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Nhật Bản</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="destination"
                          checked={selectedDestination === 'Hàn Quốc'}
                          onChange={() => setSelectedDestination('Hàn Quốc')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Hàn Quốc</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="destination"
                          checked={selectedDestination === 'Canada'}
                          onChange={() => setSelectedDestination('Canada')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Canada</span>
                      </label>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                {/* Tìm theo phân loại */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                  >
                    <span>Tìm theo phân loại</span>
                    {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.category && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === 'all'}
                          onChange={() => setSelectedCategory('all')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Tất cả</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === 'Tour định kỳ'}
                          onChange={() => setSelectedCategory('Tour định kỳ')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Tour định kỳ</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === 'Tour cao cấp'}
                          onChange={() => setSelectedCategory('Tour cao cấp')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Tour cao cấp</span>
                      </label>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                {/* Khoảng giá */}
                <div>
                  <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left font-bold text-gray-900 mb-3"
                  >
                    <span>Khoảng giá</span>
                    {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.price && (
                    <div className="space-y-3">
                      <div className="flex gap-2 items-center text-sm">
                        <span>VNĐ {priceRange[0].toLocaleString('vi-VN')}</span>
                        <span>-</span>
                        <span>VNĐ {priceRange[1].toLocaleString('vi-VN')}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200000000"
                        step="5000000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tours List */}
            <div className="flex-1">
              {/* Sort và Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Tìm thấy <span className="font-semibold">{filteredTours.length}</span> tour
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="default">Sắp xếp</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name">Tên A-Z</option>
                </select>
              </div>

              {/* Tours Grid */}
              <div className="space-y-6">
                {filteredTours.map((tour) => (
                  <div
                    key={tour._id}
                    onClick={() => handleTourClick(tour._id)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-80 h-56 flex-shrink-0 overflow-hidden">
                      <img
                        src={tour.images[0] || 'https://via.placeholder.com/320x224'}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1490761668535-35497054764d?w=320&q=80';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase leading-snug">
                          {tour.title}
                        </h3>

                        <div className="space-y-2 text-[15px]">
                          <div className="flex">
                            <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Xuất phát:</span>
                            <span className="text-gray-700">TP Hồ Chí Minh</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Ngày khởi hành:</span>
                            <span className="text-gray-700">{tour.departure}</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Thời gian:</span>
                            <span className="text-gray-700">{tour.duration}</span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Phương tiện:</span>
                            <span className="text-gray-700 flex items-center gap-2">
                              <FaPlane className="text-gray-900" />
                              Đường Hàng Không
                            </span>
                          </div>
                          {tour.airline && (
                            <div className="flex">
                              <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Hãng hàng không:</span>
                              <span className="text-gray-700">{tour.airline}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price and Button */}
                      <div className="mt-auto px-5 py-4 bg-gray-50 flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600 mb-0.5">Giá tour:</div>
                          <div className="text-2xl font-bold text-red-600">
                            {tour.price.toLocaleString('vi-VN')} đ
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredTours.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-xl text-gray-600">Không tìm thấy tour phù hợp</p>
                  <p className="text-gray-500 mt-2">Vui lòng thử lại với bộ lọc khác</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourMuaHoaAnhDao;