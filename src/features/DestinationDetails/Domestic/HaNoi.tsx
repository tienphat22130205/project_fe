'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

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

const HaNoiDetail = () => {
  const [searchDestination, setSearchDestination] = useState('Hà Nội');
  const [searchDate, setSearchDate] = useState('');

  // Tours đặc trưng của Hà Nội
  const tours: Tour[] = [
    {
      id: 1,
      title: 'HÀ NỘI – HẠ LONG – YÊN TỬ – CHÙA BA VÀNG',
      code: 'STN084-2025-03301',
      region: 'Miền Bắc, Hà Nội, Hạ Long',
      departure: 'TP Hồ Chí Minh',
      departureDate: '20/12/2025',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 11590000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 2,
      title: 'HÀ NỘI - SAPA - FANSIPAN - BẢN CÁT CÁT - THÁC TÌNH YÊU',
      code: 'STN084-2025-03302',
      region: 'Miền Bắc, Hà Nội, Sa Pa, Lào Cai',
      departure: 'TP Hồ Chí Minh',
      departureDate: '22/12/2025',
      duration: '3 ngày 2 đêm',
      transport: 'Đường Hàng Không - Vietjet Air',
      price: 7890000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 3,
      title: 'TẾT BÍNH NGỌ 2026: HÀ NỘI – NINH BÌNH – TRÀNG AN – HẠ LONG – SAPA – FANSIPAN',
      code: 'STN084-2026-01010',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Sa Pa, Ninh Bình',
      departure: 'TP Hồ Chí Minh',
      departureDate: '17/02/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 17279000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop',
      category: 'Chùm tour sự kiện, Tour Tết Âm Lịch 2026'
    },
    {
      id: 4,
      title: 'HÀ NỘI – NINH BÌNH – TRÀNG AN – MỘC CHÂU – TÂY YÊN TỬ – HẠ LONG',
      code: 'STN084-2026-00126',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Ninh Bình, Mộc Châu',
      departure: 'TP Hồ Chí Minh',
      departureDate: '14/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 12679000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 5,
      title: 'HÀ NỘI - MÙA XUÂN MAI CHÂU - HÒA BÌNH - BẢN LÁC',
      code: 'STN084-2026-00127',
      region: 'Miền Bắc, Hà Nội, Hòa Bình',
      departure: 'TP Hồ Chí Minh',
      departureDate: '18/01/2026',
      duration: '3 ngày 2 đêm',
      transport: 'Đường Hàng Không - Bamboo Airways',
      price: 6590000,
      image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 6,
      title: 'HÀ NỘI – HẠ LONG – ĐỘNG THIÊN CUNG – VỊNH LAN HẠ',
      code: 'STN084-2026-00128',
      region: 'Miền Bắc, Hà Nội, Hạ Long',
      departure: 'TP Hồ Chí Minh',
      departureDate: '25/01/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 10290000,
      oldPrice: 11990000,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    }
  ];

  // Dịch vụ đặc trưng của Hà Nội
  const services: Service[] = [
    {
      id: 1,
      title: 'Dịch Vụ Đưa Đón Sân Bay Nội Bài - Trung Tâm Hà Nội (Xe 4 Chỗ)',
      category: 'Thuê xe',
      location: 'Hà Nội',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Vé Tham Quan Khu Di Tích Hoàng Thành Thăng Long',
      category: 'Vé tham quan',
      location: 'Hà Nội',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Tour Phố Cổ Hà Nội - Đi Bộ & Ẩm Thực Đường Phố (Nửa Ngày)',
      category: 'Tour trong ngày',
      location: 'Hà Nội',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Dịch Vụ Thuê Xe 7 Chỗ Tham Quan Hà Nội (1 Ngày, Có Tài Xế)',
      category: 'Thuê xe',
      location: 'Hà Nội',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Vé Xem Múa Rối Nước Thăng Long (1 Buổi)',
      category: 'Giải trí',
      location: 'Hà Nội',
      price: 100000,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Tour Tham Quan Làng Gốm Bát Tràng & Làng Nghề Thủ Công (Nửa Ngày)',
      category: 'Tour trong ngày',
      location: 'Hà Nội, Gia Lâm',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Vé Tham Quan Lăng Bác + Chùa Một Cột + Văn Miếu',
      category: 'Vé tham quan',
      location: 'Hà Nội',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Tour Xe Buýt 2 Tầng Tham Quan Hà Nội (Hop On Hop Off)',
      category: 'Tour trong ngày',
      location: 'Hà Nội',
      price: 300000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop'
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
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1920&h=800&fit=crop" 
            alt="Hà Nội"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37, 99, 235, 0.7)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              HÀ NỘI
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Thủ đô ngàn năm văn hiến • Phố cổ Hà Nội • Ẩm thực truyền thống
            </p>
          </div>
          
          {/* Modern Search Box */}
          <div className="w-full max-w-4xl mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Điểm đến
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: 'rgb(37, 99, 235)' }} />
                  <input
                    type="text"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                    placeholder="Hà Nội, Hạ Long, Sa Pa..."
                  />
                </div>
              </div>
              
              <div className="md:col-span-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày khởi hành
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: 'rgb(37, 99, 235)' }} />
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
                  />
                </div>
              </div>
              
              <div className="md:col-span-12">
                <button 
                  type="submit"
                  className="w-full text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'rgb(37, 99, 235)' }}
                >
                  <FaSearch className="text-lg" />
                  TÌM TOUR NGAY
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path fill="#fff" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3" style={{ color: 'rgb(37, 99, 235)' }}>
              TOUR NỔI BẬT TẠI HÀ NỘI
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá những hành trình tuyệt vời với giá ưu đãi nhất
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Link 
                key={tour.id}
                to={`/tour/${tour.code}`}
                className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                {/* Tour Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Tour Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 min-h-[48px]">
                    {tour.title}
                  </h3>
                  
                  <div className="space-y-1.5 mb-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Xuất phát:</span> {tour.departure}
                    </div>
                    <div>
                      <span className="font-semibold">Ngày khởi hành:</span> {tour.departureDate}
                    </div>
                    <div>
                      <span className="font-semibold">Thời gian:</span> {tour.duration}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-2xl font-bold text-red-600">
                    {formatPrice(tour.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3" style={{ color: 'rgb(37, 99, 235)' }}>
              DỊCH VỤ
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trải nghiệm đầy đủ với các dịch vụ cao cấp
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                {/* Service Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Service Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[48px] text-sm leading-tight">
                    {service.title}
                  </h3>
                  
                  <div className="space-y-1.5 mb-3 text-xs text-gray-600">
                    <div>
                      <span className="font-semibold">Loại:</span> {service.category.split(',')[0]}
                    </div>
                    <div>
                      <span className="font-semibold">Địa điểm:</span> {service.location}
                    </div>
                  </div>
                  
                  <div className="text-xl font-bold text-red-600">
                    {formatPrice(service.price)}
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

export default HaNoiDetail;
