import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaPlane, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HaNoiDestination: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: 'Hà Nội',
    departureDate: ''
  });

  const featuredTours = [
    {
      id: 1,
      title: 'HÀ NỘI – NINH BÌNH – TRÀNG AN – HẠ LONG – SAPA – FANSIPAN – LÀO CAI',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '17/02/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 17279000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80'
    },
    {
      id: 2,
      title: 'HÀ NỘI – HẠ LONG – NINH BÌNH - SAPA',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'Cần Thơ',
      startDate: '17/02/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 16990000,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80'
    },
    {
      id: 3,
      title: 'HÀ NỘI - SAPA - FANSIPAN - LÀO CAI - HẠ LONG',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 15579000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80'
    },
    {
      id: 4,
      title: 'HẠ LONG – VỊNH LAN HẠ – DU THUYỀN CAO CẤP – CÁT BÀ',
      type: 'Tour cao cấp (Premium tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '15/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 14040000,
      oldPrice: 14779000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80'
    },
    {
      id: 5,
      title: 'HÀ NỘI - YÊN TỬ - DU THUYỀN CAO CẤP HẠ LONG - QUẢNG YÊN',
      type: 'Tour định kỳ (Regular tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '24/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 13379000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80'
    },
    {
      id: 6,
      title: 'HÀ NỘI - HẠ LONG - NINH BÌNH',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'Cần Thơ',
      startDate: '18/02/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Máy bay',
      price: 12990000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&q=80'
    },
    {
      id: 7,
      title: 'HÀ NỘI – NINH BÌNH – TRÀNG AN – MỘC CHÂU – TÂY YÊN TỬ – HẠ LONG',
      type: 'Tour định kỳ (Regular tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 12679000,
      image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=500&q=80'
    },
    {
      id: 8,
      title: 'HÀ NỘI - SAPA - LAI CHÂU - LÀO CAI',
      type: 'Tour định kỳ (Regular tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '22/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 9779000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80'
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Dịch Vụ Đưa Đón Sân Bay Nội Bài & Cát Bi – Xe 16 Chỗ',
      type: 'Thuê xe',
      location: 'Hạ Long, Hà Nội, Hải Phòng',
      price: 2400000,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80'
    },
    {
      id: 2,
      title: 'Tour Trải Nghiệm Đêm Ở Văn Miếu Quốc Tử Giám – Chủ Đề "Tinh Hoa Đạo Học"',
      type: 'Vé tham quan, City tour',
      location: 'Hà Nội',
      price: 199000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80'
    },
    {
      id: 3,
      title: 'Vé Vinwonders Wave Park & Water Park Hà Nội',
      type: 'Vé tham quan',
      location: 'Hà Nội',
      price: 100000,
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=500&q=80'
    },
    {
      id: 4,
      title: 'Dịch Vụ Fast Track Tại Sân Bay Quốc Tế Nội Bài',
      type: 'Free & Easy',
      location: 'Hà Nội',
      price: 730000,
      image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=500&q=80'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section 
        className="relative text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 text-left">Hà Nội</h1>
          
          {/* Search Form */}
          <div className="max-w-6xl bg-white rounded-lg shadow-xl p-6">
            <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Bạn muốn đi đâu <span className="text-red-500">(*)</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hạ Long">Hạ Long</option>
                    <option value="Sapa">Sapa</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Ngày khởi hành
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.departureDate}
                    onChange={(e) => setSearchData({ ...searchData, departureDate: e.target.value })}
                    placeholder="mm/dd/yyyy"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
              </div>

              <div className="min-w-[200px]">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tour Nổi Bật Tại Hà Nội</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {tour.type}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 h-10 overflow-hidden" 
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {tour.title}
                  </h3>
                  
                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                      <span>Xuất phát: {tour.departure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600 flex-shrink-0" />
                      <span>Ngày khởi hành: {tour.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-600 flex-shrink-0" />
                      <span>Thời gian: {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPlane className="text-blue-600 flex-shrink-0" />
                      <span>
                        {tour.transport}
                        {tour.airline && ` - ${tour.airline}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 flex items-center justify-between">
                    <div>
                      {tour.oldPrice && (
                        <div className="text-gray-400 line-through text-xs">
                          {tour.oldPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                      <div className="text-red-600 font-bold text-lg">
                        {tour.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                    <Link
                      to={`/tours/${tour.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Dịch Vụ Nổi Bật Tại Hà Nội</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2 h-10 overflow-hidden"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {service.title}
                  </h3>
                  
                  <div className="text-xs text-gray-600 mb-3">
                    <div className="mb-1">{service.type}</div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-600" />
                      {service.location}
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 flex items-center justify-between">
                    <div className="text-red-600 font-bold text-lg">
                      {service.price.toLocaleString('vi-VN')}đ
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HaNoiDestination;
