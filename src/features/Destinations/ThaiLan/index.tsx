import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaPlane, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ThaiLanDestination: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: 'Thái Lan',
    departureDate: ''
  });

  const featuredTours = [
    {
      id: 101,
      title: 'THÁI LAN (Phuket – Đảo Phi Phi – Vịnh Phang Nga)',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '18/02/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Máy bay',
      airline: 'Vietjet Air',
      price: 21999000,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80'
    },
    {
      id: 102,
      title: 'THÁI LAN (Bangkok - Pattaya - Đảo San Hô Coral - Vườn Nong Nooch - Safari)',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 17999000,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80'
    },
    {
      id: 103,
      title: 'THÁI LAN (Bangkok - Pattaya - Vườn Nong Nooch - Du Thuyền Duck Island)',
      type: 'Tour định kỳ (Regular tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '24/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 15999000,
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&q=80'
    },
    {
      id: 104,
      title: 'THÁI LAN (Bangkok - Pattaya - Nong Nooch - Chợ Nổi - Alcazar Show)',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '20/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 13999000,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80'
    },
    {
      id: 105,
      title: 'THÁI LAN (Bangkok - Pattaya - Cầu Vượt Biển - Thủy Cung - Bảo Tàng Nghệ Thuật)',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'TP Hồ Chí Minh',
      startDate: '22/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 11999000,
      image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=500&q=80'
    },
    {
      id: 106,
      title: 'THÁI LAN (BANGKOK – PATTAYA)',
      type: 'Tour Tết Âm Lịch 2026',
      departure: 'Đà Nẵng',
      startDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Air Asia',
      price: 11490000,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80'
    },
    {
      id: 107,
      title: 'THÁI LAN (Bangkok - Bansaen - Pattaya - Cầu Vượt Biển - Thủy Cung)',
      type: 'Tour định kỳ (Regular tour)',
      departure: 'TP Hồ Chí Minh',
      startDate: '17/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 10999000,
      image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&q=80'
    },
    {
      id: 108,
      title: 'DU THUYỀN 5 SAO OVATION OF THE SEAS: Singapore - Penang - Phuket',
      type: 'Tour du thuyền',
      departure: 'TP Hồ Chí Minh',
      startDate: '12/03/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Máy bay',
      airline: 'Vietnam Airlines',
      price: 36999000,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80'
    }
  ];

  const featuredServices = [
    {
      id: 201,
      title: 'Vé Tham Quan Dream World Bangkok',
      type: 'Vé tham quan',
      location: 'Bangkok, Thái Lan',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500&q=80'
    },
    {
      id: 202,
      title: 'Tour Tham Quan Chùa Vàng Wat Traimit',
      type: 'City tour',
      location: 'Bangkok, Thái Lan',
      price: 380000,
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&q=80'
    },
    {
      id: 203,
      title: 'Dịch Vụ Đưa Đón Sân Bay Suvarnabhumi',
      type: 'Thuê xe',
      location: 'Bangkok, Thái Lan',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80'
    },
    {
      id: 204,
      title: 'Vé Show Alcazar Pattaya',
      type: 'Vé tham quan',
      location: 'Pattaya, Thái Lan',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80'
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&q=80)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 text-left">Thái Lan</h1>
          
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
                    <option value="Thái Lan">Thái Lan</option>
                    <option value="Bangkok">Bangkok</option>
                    <option value="Pattaya">Pattaya</option>
                    <option value="Phuket">Phuket</option>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tour Nổi Bật Tại Thái Lan</h2>
          
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Dịch Vụ Nổi Bật Tại Thái Lan</h2>
          
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

export default ThaiLanDestination;
