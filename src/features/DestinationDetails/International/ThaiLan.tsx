'use client';

import { useState, useEffect } from 'react';
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

const ThaiLanDetail = () => {
  const [searchDestination, setSearchDestination] = useState('Thái Lan');
  const [searchDate, setSearchDate] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tours đặc trưng của Thái Lan
  const tours: Tour[] = [
    {
      id: 1,
      title: 'DU THUYỀN 5 SAO OVATION OF THE SEAS: SINGAPORE - PENANG - PHUKET - SINGAPORE',
      code: 'STSTOB-2026-00047',
      region: 'Châu Á, Thái Lan, Singapore, Malaysia',
      departure: 'TP Hồ Chí Minh',
      departureDate: '18/02/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 56999000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop',
      category: 'Tour cao cấp (Premium tour), Tour du thuyền, Tour Tết Âm Lịch 2026'
    },
    {
      id: 2,
      title: 'THÁI LAN (Bangkok - Pattaya - Đảo San Hô Coral - Vườn Nong Nooch - Safari)',
      code: 'STSTOB-2026-00598',
      region: 'Châu Á, Thái Lan',
      departure: 'TP Hồ Chí Minh',
      departureDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 17999000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour), Tour Tết Âm Lịch 2026'
    },
    {
      id: 3,
      title: 'THÁI LAN (Phuket – Đảo Phi Phi – Vịnh Phang Nga)',
      code: 'STSTOB-2026-00160',
      region: 'Châu Á, Thái Lan',
      departure: 'TP Hồ Chí Minh',
      departureDate: '18/02/2026',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietjet Air',
      price: 21999000,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour), Tour Tết Âm Lịch 2026'
    },
    {
      id: 4,
      title: 'THÁI LAN (Bangkok - Pattaya - Vườn Nong Nooch - Du Thuyền Duck Island - Nhà Hàng Michelin)',
      code: 'STSTOB-2026-00347',
      region: 'Châu Á, Thái Lan',
      departure: 'TP Hồ Chí Minh',
      departureDate: '24/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 15999000,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 5,
      title: 'THÁI LAN (Bangkok - Pattaya - Nong Nooch - Chợ Nổi Lat Mayom - Alcazar Show)',
      code: 'STSTOB-2026-00367',
      region: 'Châu Á, Thái Lan',
      departure: 'TP Hồ Chí Minh',
      departureDate: '20/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 13999000,
      image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour), Tour Tết Âm Lịch 2026'
    },
    {
      id: 6,
      title: 'THÁI LAN (Bangkok - Pattaya - Cầu Vượt Biển - Thủy Cung - Bảo Tàng Nghệ Thuật)',
      code: 'STSTOB-2026-00368',
      region: 'Châu Á, Thái Lan',
      departure: 'TP Hồ Chí Minh',
      departureDate: '22/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 11999000,
      oldPrice: 13999000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour), Tour Tết Âm Lịch 2026'
    }
  ];

  // Dịch vụ đặc trưng của Thái Lan
  const services: Service[] = [
    {
      id: 1,
      title: 'Vé Tham Quan Công Viên Safari World Bangkok (Bao Gồm Marine Park)',
      category: 'Vé tham quan',
      location: 'Bangkok, Thái Lan',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Vé Tham Quan Vườn Nong Nooch Pattaya (Bao Gồm Show Văn Hóa)',
      category: 'Vé tham quan',
      location: 'Pattaya, Thái Lan',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Tour Tham Quan Đảo Phi Phi & Vịnh Maya Bay (1 Ngày)',
      category: 'Tour trong ngày',
      location: 'Phuket, Thái Lan',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Dịch Vụ Đưa Đón Sân Bay Suvarnabhumi - Trung Tâm Bangkok',
      category: 'Thuê xe',
      location: 'Bangkok, Thái Lan',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Vé Xem Show Alcazar Cabaret Pattaya (Buổi Tối)',
      category: 'Giải trí',
      location: 'Pattaya, Thái Lan',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Tour Thuyền Buffet Trên Sông Chao Phraya (Ăn Tối & Ngắm Cảnh)',
      category: 'Tour trong ngày, Ẩm thực',
      location: 'Bangkok, Thái Lan',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Vé Tham Quan Grand Palace & Wat Phra Kaew (Chùa Phật Vàng)',
      category: 'Vé tham quan',
      location: 'Bangkok, Thái Lan',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Tour Chợ Nổi Damnoen Saduak & Rose Garden (Nửa Ngày)',
      category: 'Tour trong ngày',
      location: 'Bangkok, Thái Lan',
      price: 750000,
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
      {/* Hero Banner with Modern Design */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&h=800&fit=crop" 
            alt="Thái Lan"
            className="w-full h-full object-cover transform scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          {/* Animated Title */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              THÁI LAN
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Xứ sở chùa vàng • Thiên đường mua sắm • Ẩm thực đường phố
            </p>
          </div>
          
          {/* Modern Search Box with Glass Morphism */}
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
                      placeholder="Bangkok, Phuket, Pattaya..."
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

      {/* Tours Section - Modern Grid */}
      <section className="py-16 bg-white">
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3" style={{ color: 'rgb(37, 99, 235)' }}>
              TOUR NỔI BẬT TẠI THÁI LAN
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

      {/* Services Section - Modern Cards */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Section Header */}
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

export default ThaiLanDetail;
