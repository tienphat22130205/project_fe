'use client';

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaStar, FaMapMarkerAlt, FaClock, FaPlane, FaTag, FaPercent, FaGift } from 'react-icons/fa';
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

const DestinationDetail = () => {
  const { destination } = useParams<{ destination: string }>();
  const [searchDestination, setSearchDestination] = useState(destination || '');
  const [searchDate, setSearchDate] = useState('');

  // Mock data cho tours
  const tours: Tour[] = [
    {
      id: 1,
      title: 'TẾT BÍNH NGỌ 2026: HÀ NỘI – NINH BÌNH – TRÀNG AN – HẠ LONG – SAPA – FANSIPAN – LÀO CAI',
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
      title: 'HÀ NỘI - NINH BÌNH - TRÀNG AN - BÁI ĐÍNH - HẠ LONG - SAPA - FANSIPAN - LÀO CAI',
      code: 'STN084-2025-03217',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Sa Pa, Ninh Bình, Lào Cai',
      departure: 'TP Hồ Chí Minh',
      departureDate: '22/12/2025',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 12720000,
      oldPrice: 13179000,
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 4,
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
      id: 5,
      title: 'HÀ NỘI - SAPA - LAI CHÂU - LÀO CAI',
      code: 'STN084-2025-03303',
      region: 'Miền Bắc, Hà Nội, Sa Pa, Lào Cai',
      departure: 'TP Hồ Chí Minh',
      departureDate: '25/12/2025',
      duration: '4 ngày 3 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 9679000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    },
    {
      id: 6,
      title: 'HÀ NỘI – NINH BÌNH – TRÀNG AN – MỘC CHÂU – TÂY YÊN TỬ – HẠ LONG',
      code: 'STN084-2026-00126',
      region: 'Miền Bắc, Hà Nội, Hạ Long, Ninh Bình, Mộc Châu',
      departure: 'TP Hồ Chí Minh',
      departureDate: '14/01/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không - Vietnam Airlines',
      price: 12679000,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=300&fit=crop',
      category: 'Tour định kỳ (Regular tour)'
    }
  ];

  // Mock data cho services
  const services: Service[] = [
    {
      id: 1,
      title: 'Dịch Vụ Đưa Đón Sân Bay Nội Bài & Cát Bi – Xe 16 Chỗ',
      category: 'Thuê xe',
      location: 'Hạ Long, Hà Nội, Hải Phòng',
      price: 2400000,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Tour Trải Nghiệm Đêm Ở Văn Miếu Quốc Tử Giám – Chủ Đề "Tinh Hoa Đạo Học"',
      category: 'Vé tham quan, City tour',
      location: 'Hà Nội',
      price: 199000,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Vé Vinwonders Wave Park & Water Park Hà Nội',
      category: 'Vé tham quan',
      location: 'Hà Nội',
      price: 100000,
      image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Dịch Vụ Fast Track Tại Sân Bay Quốc Tế Nội Bài',
      category: 'Free & Easy',
      location: 'Hà Nội',
      price: 730000,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=300&fit=crop'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const destinationName = destination?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Hà Nội';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner with Search */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1920&h=400&fit=crop" 
            alt={destinationName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
            {destinationName}
          </h1>
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
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
                    placeholder={destinationName}
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
            </div>
            
            <button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2">
              <FaSearch />
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            TOUR NỔI BẬT TẠI {destinationName.toUpperCase()}
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
            DỊCH VỤ NỔI BẬT TẠI {destinationName.toUpperCase()}
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

export default DestinationDetail;
