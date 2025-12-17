'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaStar, FaMapMarkerAlt, FaClock, FaPlane, FaPercent, FaGift, FaUmbrellaBeach, FaHotel, FaUtensils, FaCamera } from 'react-icons/fa';
import { MdCategory, MdFlightTakeoff } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';

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
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-pink-50">
      {/* Hero Banner with Modern Design */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&h=800&fit=crop" 
            alt="Thái Lan"
            className="w-full h-full object-cover transform scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 via-pink-600/70 to-purple-700/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          {/* Animated Title */}
          <div className="mb-6 animate-fadeIn">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
              <span className="text-white font-semibold flex items-center gap-2">
                <MdFlightTakeoff className="text-xl" />
                Du lịch Quốc tế
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl tracking-tight">
              THÁI LAN
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-lg">
              Xứ sở chùa vàng • Thiên đường mua sắm • Ẩm thực đường phố
            </p>
          </div>
          
          {/* Modern Search Box with Glass Morphism */}
          <div className="w-full max-w-4xl mt-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                    Điểm đến
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-xl" />
                    <input
                      type="text"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-orange-400/50 focus:border-orange-400 transition-all text-gray-800 font-semibold placeholder-gray-400"
                      placeholder="Bangkok, Phuket, Pattaya..."
                    />
                  </div>
                </div>
                
                <div className="md:col-span-5">
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                    Ngày khởi hành
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-xl" />
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-orange-400/50 focus:border-orange-400 transition-all text-gray-800 font-semibold"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-12">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <FaSearch className="text-xl group-hover:rotate-90 transition-transform duration-300" />
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
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full blur-3xl opacity-30 -z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
              ✨ TOURS HOT
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              TOUR NỔI BẬT TẠI{' '}
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                THÁI LAN
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá những hành trình tuyệt vời với giá ưu đãi nhất
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <Link 
                key={tour.id}
                to={`/tour/${tour.code}`}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Tour Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {tour.category.includes('Tết') && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        <FaGift className="text-lg" /> TOUR TẾT
                      </div>
                    )}
                    {tour.category.includes('Premium') && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        <FaStar className="text-lg" /> PREMIUM
                      </div>
                    )}
                  </div>
                  
                  {tour.oldPrice && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm animate-pulse">
                      <BsLightningChargeFill className="text-lg" /> 
                      -{Math.round((1 - tour.price / tour.oldPrice) * 100)}%
                    </div>
                  )}

                  {/* Departure Date Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 text-orange-600">
                      <FaCalendarAlt />
                      <span className="font-bold text-sm">{tour.departureDate}</span>
                    </div>
                  </div>
                </div>
                
                {/* Tour Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[56px] leading-tight">
                    {tour.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <FaMapMarkerAlt className="text-orange-600" />
                      </div>
                      <span className="line-clamp-1">{tour.region}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-blue-600" />
                      </div>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <FaPlane className="text-purple-600" />
                      </div>
                      <span className="line-clamp-1">{tour.transport}</span>
                    </div>
                  </div>
                  
                  {/* Price Section */}
                  <div className="pt-5 border-t-2 border-gray-100 flex items-center justify-between">
                    <div>
                      {tour.oldPrice && (
                        <div className="text-sm text-gray-400 line-through font-medium">
                          {formatPrice(tour.oldPrice)}
                        </div>
                      )}
                      <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {formatPrice(tour.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-lg" />
                      ))}
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold text-center">
                      Xem chi tiết →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Modern Cards */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
              🎯 DỊCH VỤ
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              DỊCH VỤ{' '}
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                ĐẶC BIỆT
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trải nghiệm đầy đủ với các dịch vụ cao cấp
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-orange-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    {service.category.includes('Vé') && <FaCamera className="text-orange-600 text-xl" />}
                    {service.category.includes('Thuê xe') && <FaPlane className="text-blue-600 text-xl" />}
                    {service.category.includes('Giải trí') && <FaStar className="text-yellow-600 text-xl" />}
                    {service.category.includes('Ẩm thực') && <FaUtensils className="text-red-600 text-xl" />}
                  </div>
                </div>
                
                {/* Service Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[48px] text-base leading-tight">
                    {service.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      {service.category.split(',')[0]}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400 text-xs" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {formatPrice(service.price)}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>
    </main>
  );
};

export default ThaiLanDetail;
