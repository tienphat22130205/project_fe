'use client';

import { useState, useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ToursByCategoryPage = () => {
  const [sortBy, setSortBy] = useState('');
  const [domesticOpen, setDomesticOpen] = useState(false);
  const [internationalOpen, setInternationalOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  
  // Filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priceRange, setPriceRange] = useState([0, 140000000]);

  const allTours = [
    {
      id: 1,
      name: 'TRUNG QUỐC (ĐẠI LÝ - LỆ GIANG) - Ngắm hoa anh đào',
      category: 'Chùm tour theo thể loại, Tour Mùa Hoa Anh Đào',
      continent: 'Châu Á',
      country: 'Trung Quốc',
      departure: 'Hà Nội',
      departureDate: '10/12/2025',
      dateObject: new Date('2025-12-10'),
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Bamboo Airways',
      price: 14800000,
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    },
    {
      id: 2,
      name: 'NHẬT BẢN (TOKYO – NÚI PHÚ SĨ – NAGOYA – KYOTO - OSAKA)...',
      category: 'Chùm tour theo thể loại, Tour định kỳ...',
      continent: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'Đà Nẵng',
      departureDate: '25/02/2026',
      dateObject: new Date('2026-02-25'),
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: '',
      price: 35990000,
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800',
    },
    {
      id: 3,
      name: 'NHẬT BẢN - Thưởng Ngoạn Anh Đào Kawazu (Osaka - Kobe -...',
      category: 'Chùm tour theo thể loại, Tour định kỳ...',
      continent: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'TP Hồ Chí Minh',
      departureDate: '10/03/2026',
      dateObject: new Date('2026-03-10'),
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 44999000,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    },
    {
      id: 4,
      name: 'TRUNG QUỐC (Trùng Khánh - Phượng Hoàng Cổ Trấn - Trương Gia Giới)',
      category: 'Chùm tour theo thể loại, Tour định kỳ...',
      continent: 'Châu Á',
      country: 'Trung Quốc',
      departure: 'TP Hồ Chí Minh',
      departureDate: '18/03/2026',
      dateObject: new Date('2026-03-18'),
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Air China',
      price: 21999000,
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    },
    {
      id: 5,
      name: 'HÀN QUỐC - Thưởng Ngoạn Hoa Anh Đào (Seoul – Jeju - Nami -...',
      category: 'Chùm tour theo thể loại, Tour định kỳ...',
      continent: 'Châu Á',
      country: 'Hàn Quốc',
      departure: 'TP Hồ Chí Minh',
      departureDate: '21/03/2026',
      dateObject: new Date('2026-03-21'),
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 28999000,
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800',
    },
    {
      id: 6,
      name: 'NHẬT BẢN - Khám Phá Mùa Hoa Anh Đào (Osaka - Kyoto - Vườn...',
      category: 'Tour Mùa Hoa Anh Đào',
      continent: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'TP Hồ Chí Minh',
      departureDate: '23/03/2026',
      dateObject: new Date('2026-03-23'),
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 44999000,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    },
  ];

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = [...allTours];

    // Filter by date range
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(tour => tour.dateObject >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      filtered = filtered.filter(tour => tour.dateObject <= end);
    }

    // Filter by price range
    filtered = filtered.filter(tour => 
      tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
    }

    return filtered;
  }, [startDate, endDate, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleSearch = () => {
    // Trigger re-render, filters are already applied via useMemo
    console.log('Searching with filters:', { startDate, endDate, priceRange });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&h=400&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-5xl font-bold text-white">Tour Mùa Hoa Anh Đào</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white space-y-6">
              {/* Tìm theo điểm đến */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setDomesticOpen(!domesticOpen)}
                  className="flex items-center justify-between w-full text-left text-blue-600 font-semibold text-base mb-3"
                >
                  Tìm theo điểm đến
                  <FaChevronDown className={`transform transition-transform ${domesticOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="space-y-2 pl-3">
                  <div>
                    <button
                      onClick={() => setDomesticOpen(!domesticOpen)}
                      className="flex items-center justify-between w-full text-left py-1 hover:text-blue-600"
                    >
                      <span className="text-sm text-gray-700">Trong nước</span>
                      <FaChevronDown className="text-xs text-gray-500" />
                    </button>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setInternationalOpen(!internationalOpen)}
                      className="flex items-center justify-between w-full text-left py-1 hover:text-blue-600"
                    >
                      <span className="text-sm text-gray-700">Nước ngoài</span>
                      <FaChevronDown className="text-xs text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tìm theo phân loại */}
              <div className="pb-4">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center justify-between w-full text-left text-blue-600 font-semibold text-base mb-3"
                >
                  Tìm theo phân loại
                  <FaChevronDown className={`transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {categoryOpen && (
                  <div className="space-y-3 pl-3">
                    <div>
                      <p className="font-normal mb-2 text-gray-800 text-sm">Chùm tour theo thể loại</p>
                      <div className="space-y-1 pl-3">
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour định kỳ (Regular tour)</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour cao cấp (Premium tour)</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour báo hiếu - Người cao tuổi</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour du thuyền</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour lễ hội thế giới</p>
                        <p className="py-1 text-blue-600 cursor-pointer text-sm">Tour Mùa Hoa Anh Đào</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-normal mb-2 text-gray-800 text-sm">Chùm tour sự kiện</p>
                      <div className="space-y-1 pl-3">
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour Tết Âm Lịch 2026</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour Last Minutes</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour Lễ 30/4</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour dành cho Việt Kiều</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour Tết Dương Lịch 2026</p>
                        <p className="py-1 hover:text-blue-600 cursor-pointer text-sm text-gray-700">Tour đồng giá</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Range and Price Filter */}
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-base font-bold mb-4 text-gray-800">Ngày khởi hành</h3>
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-[45%] px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                  <span className="text-gray-500 text-sm">-</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-[45%] px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                {/* Price Range */}
                <div className="mt-6">
                  <h3 className="text-base font-bold mb-4 text-gray-800">Khoảng giá</h3>
                  <div className="flex gap-2 mb-3">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                      VNĐ {Math.round(priceRange[0] / 1000000)}
                    </div>
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                      VNĐ {Math.round(priceRange[1] / 1000000)} 000 000
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="140000000"
                    step="1000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold mt-6 hover:bg-blue-700 transition-colors"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content - Tour List */}
          <div className="lg:w-3/4">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Tìm thấy <span className="font-bold text-blue-600">{filteredAndSortedTours.length}</span> tour
              </p>
              <div className="w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sắp xếp</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="date-asc">Ngày: Sớm nhất</option>
                </select>
              </div>
            </div>

            {/* Tours Grid */}
            {filteredAndSortedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                  >
                    {/* Tour Image */}
                    <div className="relative h-48">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Tour Info */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                        {tour.name}
                      </h3>
                      
                      <div className="text-xs text-gray-600 mb-3 space-y-1">
                        <p className="line-clamp-1">{tour.category}</p>
                        <p>{tour.continent}, {tour.country}</p>
                        <p>Xuất phát: {tour.departure}</p>
                        <p>Ngày khởi hành: {tour.departureDate}</p>
                        <p>Thời gian: {tour.duration}</p>
                        <p>Phương tiện di chuyển: {tour.transport}</p>
                        {tour.airline && <p>Hãng hàng không: {tour.airline}</p>}
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xl font-bold text-orange-600">
                          {formatPrice(tour.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy tour phù hợp với bộ lọc của bạn</p>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedTours.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                  ←
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ToursByCategoryPage;
