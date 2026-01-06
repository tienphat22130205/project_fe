import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getToursByProvince, getProvinceDetail, getToursByCountry, getCountryBySlug } from '../Header/server';
import type { Tour, Province, Country } from '../Header/server';

interface ProvinceDestinationProps {
  provinceSlug: string;
}

const ProvinceDestination: React.FC<ProvinceDestinationProps> = ({ provinceSlug }) => {
  const [destination, setDestination] = useState<Province | Country | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    destination: '',
    departureDate: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch as province first
        const [provinceData, provinceTours] = await Promise.all([
          getProvinceDetail(provinceSlug),
          getToursByProvince(provinceSlug).catch(() => ({ data: { tours: [] } }))
        ]);
        
        if (provinceData) {
          setDestination(provinceData);
          setSearchData(prev => ({ ...prev, destination: provinceData.name }));
          setTours(provinceTours.data.tours);
          return;
        }
        
        // If not province, try to fetch as country
        const [countryData, countryTours] = await Promise.all([
          getCountryBySlug(provinceSlug),
          getToursByCountry(provinceSlug).catch(() => ({ data: { tours: [] } }))
        ]);
        
        if (countryData) {
          setDestination(countryData);
          setSearchData(prev => ({ ...prev, destination: countryData.name }));
          setTours(countryTours.data.tours);
          return;
        }
        
        // Neither province nor country found
        setDestination(null);
      } catch (error) {
        console.error('Error fetching destination data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (provinceSlug) {
      fetchData();
    }
  }, [provinceSlug]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Không tìm thấy thông tin điểm đến</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section 
        className="relative text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-left">{destination.name}</h1>
          <p className="text-xl mb-12 text-left max-w-3xl">{destination.description}</p>
          
          {/* Search Form */}
          <div className="max-w-6xl bg-white rounded-lg shadow-xl p-6">
            <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Bạn muốn đi đâu <span className="text-red-500">(*)</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder={destination.name}
                  />
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
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Tour Nổi Bật Tại {destination.name}
          </h2>
          
          {tours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Hiện chưa có tour nào tại {destination.name}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <div key={tour._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative h-48">
                    <img
                      src={tour.images[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80'}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    {tour.rating && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        ⭐ {tour.rating}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 uppercase">
                      {tour.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-gray-700 min-w-[80px]">Xuất phát:</span>
                        <span className="line-clamp-1">{tour.province?.name || tour.region?.name || 'TP.HCM'}</span>
                      </div>
                      {tour.duration && (
                        <div className="flex items-start gap-2">
                          <FaClock className="text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-gray-700 min-w-[80px]">Thời gian:</span>
                          <span>{tour.duration} ngày</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-gray-700 min-w-[80px]">Điểm đến:</span>
                        <span className="line-clamp-1">{tour.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Giá tour:</span>
                        <span className="text-xl font-bold text-red-600">
                          {tour.price.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>
                      <Link
                        to={`/tours/${tour._id}`}
                        className="bg-brand hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold transition-all focus:outline-none hover:shadow-lg text-sm"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProvinceDestination;
