'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaStar, FaMapMarkerAlt, FaClock, FaPlane, FaPercent, FaGift } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

interface Tour {
  id: number;
  title: string;
  code: string;
  region: string;
  departure: string;
  departureDate: string;
  duration: string;
  transport: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

interface Service {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  image: string;
}

const HaLongDetail = () => {
  const [searchDestination, setSearchDestination] = useState('Hạ Long');
  const [searchDate, setSearchDate] = useState('');

  // Tours đặc trưng của Hạ Long
  const tours: Tour[] = [
    {
      id: 1,
      title: 'HẠ LONG – VỊNH LAN HẠ – DU THUYỀN CAO CẤP – CÁT BÀ',
      code: 'STN084-2026-00138',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Hải Phòng',
      departure: 'TP Hồ Chí Minh',
      departureDate: '15/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 14779000,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=300&fit=crop',
      category: 'Tour cao cấp (Premium tour), Tour du thuyền'
    },
    {
      id: 2,
      title: 'HÀ NỘI - YÊN TỬ - DU THUYỀN CAO CẤP HẠ LONG - QUẢNG YÊN',
      code: 'STN084-2026-00142',
      region: 'Miền Bắc, Hà Nội, Hạ Long',
      departure: 'TP Hồ Chí Minh',
      departureDate: '03/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 13379000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 3,
      title: 'TẾT BÍNH NGỌ 2026: HÀ NỘI – NINH BÌNH – TRÀNG AN – HẠ LONG – SAPA',
      code: 'STN084-2026-01010',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Sa Pa, Ninh Bình',
      departure: 'TP Hồ Chí Minh',
      departureDate: '17/02/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 17279000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop',
      category: 'Chùm tour sự kiện, Tour Tết Âm Lịch 2026'
    },
    {
      id: 4,
      title: 'HẠ LONG - VỊNH BÁI TỬ LONG - DU THUYỀN PARADISE LUXURY',
      code: 'STN084-2026-00145',
      region: 'Miền Bắc, Hạ Long',
      departure: 'TP Hồ Chí Minh',
      departureDate: '20/01/2026',
      duration: '3 ngày 2 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 9879000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop',
      category: 'Tour du thuyền'
    },
    {
      id: 5,
      title: 'HẠ LONG - YÊN TỬ - CHÙA BA VÀNG - THIỀN VIỆN TRÚC LÂM',
      code: 'STN084-2026-00150',
      region: 'Miền Bắc, Hạ Long, Quảng Ninh',
      departure: 'TP Hồ Chí Minh',
      departureDate: '12/01/2026',
      duration: '3 ngày 2 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 8579000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 6,
      title: 'HẠ LONG - BÁI TỬ LONG - CÁT BÀ - VỊNH LAN HẠ - CÔNG VIÊN QUỐC GIA',
      code: 'STN084-2026-00155',
      region: 'Miền Bắc, Hạ Long, Hải Phòng',
      departure: 'TP Hồ Chí Minh',
      departureDate: '25/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 11290000,
      oldPrice: 12990000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    }
  ];

  // Dịch vụ đặc trưng của Hạ Long
  const services: Service[] = [
    {
      id: 1,
      title: 'Dịch Vụ Đưa Đón Sân Bay Vân Đồn - Hạ Long',
      category: 'Thuê xe',
      location: 'Hạ Long, Quảng Ninh',
      price: 800000,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Vé Du Thuyền 5 Sao Hạ Long - 2 Ngày 1 Đêm (Bao Gồm Bữa Ăn)',
      category: 'Vé tham quan, Du thuyền',
      location: 'Hạ Long',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Tour Tham Quan Động Thiên Cung - Đảo Titop - Làng Chài Cửa Vạn',
      category: 'Vé tham quan',
      location: 'Hạ Long',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Dịch Vụ Thuê Canoe Khám Phá Vịnh Hạ Long (Nửa Ngày)',
      category: 'Thể thao mạo hiểm',
      location: 'Hạ Long',
      price: 200000,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Vé Cáp Treo Nữ Hoàng Hạ Long QUA Núi Bài Thơ',
      category: 'Vé tham quan',
      location: 'Hạ Long',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Tour Thuyền Kayak Khám Phá Hang Luồn - Vịnh Lan Hạ',
      category: 'Thể thao mạo hiểm',
      location: 'Hạ Long, Cát Bà',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Dịch Vụ Xe Đưa Đón Hạ Long - Hà Nội (Khứ Hồi)',
      category: 'Thuê xe',
      location: 'Hạ Long - Hà Nội',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Tour Câu Mực Đêm Trên Vịnh Hạ Long',
      category: 'Vé tham quan, Trải nghiệm',
      location: 'Hạ Long',
      price: 680000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { destination: searchDestination, date: searchDate });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner with Search */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&h=400&fit=crop" 
            alt="Hạ Long"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Hạ Long
          </h1>
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bạn muốn đi đâu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hạ Long"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày khởi hành
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="md:col-span-3">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            TOUR NỔI BẬT TẠI HẠ LONG
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Link 
                key={tour.id}
                to={`/tour/${tour.code}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                {/* Tour Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {tour.category.includes('Tết') && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <FaGift /> Tour Tết
                    </div>
                  )}
                  {tour.category.includes('Premium') && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <FaStar /> Premium
                    </div>
                  )}
                  {tour.oldPrice && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <FaPercent /> Giảm giá
                    </div>
                  )}
                </div>
                
                {/* Tour Info */}
                <div className="p-5">
                  <div className="text-xs text-blue-600 font-semibold mb-2">
                    Khởi hành: {tour.departureDate}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[48px]">
                    {tour.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MdCategory className="text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{tour.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-1">{tour.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPlane className="text-gray-400 flex-shrink-0" />
                      <span>Xuất phát: {tour.departure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400 flex-shrink-0" />
                      <span>Thời gian: {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPlane className="text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-1">{tour.transport}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {tour.oldPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          {formatPrice(tour.oldPrice)}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-red-600">
                        {formatPrice(tour.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            DỊCH VỤ NỔI BẬT TẠI HẠ LONG
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                {/* Service Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Service Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[48px]">
                    {service.title}
                  </h3>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="mb-1">{service.category}</div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400 text-xs" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xl font-bold text-red-600">
                      {formatPrice(service.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HaLongDetail;
