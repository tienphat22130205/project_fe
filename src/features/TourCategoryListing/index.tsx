import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Tour {
  id: string;
  title: string;
  destination: string;
  region: string;
  country: string;
  departure: string;
  startDate: string;
  duration: string;
  transport: string;
  airline: string;
  price: number;
  originalPrice?: number;
  image: string;
  categories: string[];
}

interface TourCategoryListingProps {
  category: string;
}

const TourCategoryListing: React.FC<TourCategoryListingProps> = ({ category }) => {
  const [showDestinations, setShowDestinations] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  
  // Temporary filter states (what user is currently selecting)
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 140000000]);
  const [tempSelectedDestinations, setTempSelectedDestinations] = useState<string[]>([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([category]);
  
  // Applied filter states (what's actually filtering the results)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 140000000]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([category]);
  
  const [sortBy, setSortBy] = useState<string>('');

  // Apply filters when search button is clicked
  const handleSearch = () => {
    setPriceRange(tempPriceRange);
    setSelectedDestinations(tempSelectedDestinations);
    setSelectedCategories(tempSelectedCategories);
  };

  // Mock data - replace with actual API call
  const tours: Tour[] = [
    {
      id: '1',
      title: 'CANADA - Săn Bắc Cực Quang (Vancouver – Banff - Lake Louise – Surprise Conner - Yellowknife)',
      destination: 'Canada',
      region: 'Châu Mỹ',
      country: 'Canada',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/03/2026',
      duration: '11 ngày 10 đêm',
      transport: 'Đường Hàng Không',
      airline: 'EVA Air',
      price: 199999000,
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-dinh-ky']
    },
    {
      id: '2',
      title: 'NHẬT BẢN - Khám Phá Mùa Hoa Anh Đào (Osaka - Kyoto - Vườn Trái Cây - Núi Phú Sỹ - Tokyo)',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'TP Hồ Chí Minh',
      startDate: '25/03/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 47999000,
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    },
    {
      id: '3',
      title: 'NHẬT BẢN - Thưởng Ngoạn Hoa Anh Đào (Osaka - Kyoto - Núi Phú Sỹ - Tokyo)',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/03/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 47999000,
      image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    },
    {
      id: '4',
      title: 'HÀN QUỐC - Thưởng Ngoạn Hoa Anh Đào (Seoul – Jeju - Nami - Morning Calm - Nanta Show)',
      destination: 'Hàn Quốc',
      region: 'Châu Á',
      country: 'Hàn Quốc',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/03/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 29999000,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-dinh-ky']
    },
    {
      id: '5',
      title: 'NHẬT BẢN - Thưởng Ngoạn Anh Đào Kawazu (Osaka - Kobe - Kyoto - Núi Phú Sỹ - Trải Nghiệm Trượt Tuyết - Tokyo)',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'TP Hồ Chí Minh',
      startDate: '10/03/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 44999000,
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-dinh-ky']
    },
    {
      id: '6',
      title: 'CANADA - Thưởng Ngoạn Hoa Anh Đào (Vancouver – Victoria - Whistler Village - Montreal – Quebec - Ottawa - Toronto)',
      destination: 'Canada',
      region: 'Châu Mỹ',
      country: 'Canada',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/03/2026',
      duration: '12 ngày 11 đêm',
      transport: 'Đường Hàng Không',
      airline: 'EVA Air',
      price: 169999000,
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    },
    {
      id: '7',
      title: 'NHẬT BẢN (TOKYO – NÚI PHÚ SĨ – NAGOYA – KYOTO - OSAKA) - NGẮM HOA ANH ĐÀO NỞ SỚM',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'Đà Nẵng',
      startDate: '25/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietjet Air',
      price: 35990000,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-cao-cap']
    },
    {
      id: '8',
      title: 'HÀN QUỐC - Thưởng Ngoạn Hoa Anh Đào (Seoul – Jeju - Nami - Morning Calm - Nanta Show)',
      destination: 'Hàn Quốc',
      region: 'Châu Á',
      country: 'Hàn Quốc',
      departure: 'TP Hồ Chí Minh',
      startDate: '21/03/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietnam Airlines',
      price: 28999000,
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-dinh-ky']
    },
    {
      id: '9',
      title: 'NHẬT BẢN - NGẮM HOA ANH ĐÀO (OSAKA – KOBE – NAGOYA – NÚI PHÚ SĨ – TOKYO)',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'Đà Nẵng',
      startDate: '06/04/2026',
      duration: '6 ngày 5 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Bamboo Airways',
      price: 42990000,
      originalPrice: 43990000,
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    },
    {
      id: '10',
      title: 'NHẬT BẢN (OSAKA – KYOTO – NAGOYA – NÚI PHÚ SĨ - TOKYO) - TRẢI NGHIỆM TÀU CAO TỐC SHINKANSEN',
      destination: 'Nhật Bản',
      region: 'Châu Á',
      country: 'Nhật Bản',
      departure: 'Đà Nẵng',
      startDate: '10/04/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Vietjet Air',
      price: 35990000,
      originalPrice: 36990000,
      image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&q=80',
      categories: ['mua-hoa-anh-dao', 'tour-dinh-ky']
    },
    {
      id: '11',
      title: 'HÀN QUỐC - MÙA HOA ANH ĐÀO (SEOUL - NAMI - EVERLAND - ĐẢO JEJU)',
      destination: 'Hàn Quốc',
      region: 'Châu Á',
      country: 'Hàn Quốc',
      departure: 'Hà Nội',
      startDate: '15/03/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường Hàng Không',
      airline: 'Korean Air',
      price: 24990000,
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    },
    {
      id: '12',
      title: 'CANADA - Thưởng Ngoạn Hoa Anh Đào (Vancouver - Victoria - Whistler Village – Granville Island)',
      destination: 'Canada',
      region: 'Châu Mỹ',
      country: 'Canada',
      departure: 'TP Hồ Chí Minh',
      startDate: '28/03/2026',
      duration: '7 ngày 6 đêm',
      transport: 'Đường Hàng Không',
      airline: 'EVA Air',
      price: 99999000,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&q=80',
      categories: ['mua-hoa-anh-dao']
    }
  ];

  const categoryNames: Record<string, string> = {
    'mua-hoa-anh-dao': 'Tour Mùa Hoa Anh Đào',
    'tet-nguyen-dan': 'Tour Tết Nguyên Đán',
    'tet-duong-lich': 'Tour Tết Dương Lịch',
    'viet-kieu': 'Tour dành cho Việt Kiều'
  };

  const destinations = [
    { region: 'Châu Á', countries: ['Thái Lan', 'Hàn Quốc', 'Nhật Bản', 'Singapore', 'Malaysia', 'Đài Loan'] },
    { region: 'Châu Âu', countries: ['Pháp', 'Đức', 'Thụy Sĩ', 'Ý', 'Tây Ban Nha'] },
    { region: 'Châu Mỹ', countries: ['Mỹ', 'Canada', 'Brazil'] },
    { region: 'Châu Úc', countries: ['Úc', 'New Zealand'] }
  ];

  const categories = [
    'Tour định kỳ (Regular tour)',
    'Tour cao cấp (Premium tour)',
    'Tour báo hiếu - Người cao tuổi',
    'Tour du thuyền',
    'Tour lễ hội thế giới'
  ];

  const filteredTours = tours.filter(tour => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.some(cat => tour.categories.includes(cat));
    const matchDestination = selectedDestinations.length === 0 || selectedDestinations.includes(tour.country);
    const matchPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    return matchCategory && matchDestination && matchPrice;
  });

  // Sort tours based on selected option
  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date':
        // Sort by departure date (DD/MM/YYYY format)
        const dateA = new Date(a.startDate.split('/').reverse().join('-'));
        const dateB = new Date(b.startDate.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80)',
            backgroundPosition: 'center 40%'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {categoryNames[category] || 'Tours'}
            </h1>
            <p className="text-white text-lg drop-shadow-md">Khám phá vẻ đẹp thiên nhiên cùng EasyTrip</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0 flex-grow-0">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden sticky top-4 w-80">
              {/* Destinations Filter */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setShowDestinations(!showDestinations)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base">Tìm theo điểm đến</span>
                  {showDestinations ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </button>
                {showDestinations && (
                  <div className="px-6 pb-4 space-y-3">
                    {destinations.map((dest) => (
                      <div key={dest.region}>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{dest.region}</h3>
                        <div className="space-y-2 pl-2">
                          {dest.countries.map((country) => (
                            <label key={country} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 mr-3 accent-blue-600 cursor-pointer"
                                checked={tempSelectedDestinations.includes(country)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTempSelectedDestinations([...tempSelectedDestinations, country]);
                                  } else {
                                    setTempSelectedDestinations(tempSelectedDestinations.filter(d => d !== country));
                                  }
                                }}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-blue-600">{country}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base">Tìm theo phân loại</span>
                  {showCategories ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </button>
                {showCategories && (
                  <div className="px-6 pb-4 space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mr-3 accent-blue-600 cursor-pointer"
                          checked={tempSelectedCategories.includes(cat.toLowerCase())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTempSelectedCategories([...tempSelectedCategories, cat.toLowerCase()]);
                            } else {
                              setTempSelectedCategories(tempSelectedCategories.filter(c => c !== cat.toLowerCase()));
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600">{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="px-6 py-4">
                <h3 className="font-semibold text-gray-900 mb-4 text-base">Khoảng giá</h3>
                <div className="space-y-4">
                  <style>{`
                    .price-range-slider {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 100%;
                      height: 8px;
                      border-radius: 5px;
                      background: #e5e7eb;
                      outline: none;
                    }
                    .price-range-slider::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #2563eb;
                      cursor: pointer;
                      transition: all 0.2s ease;
                    }
                    .price-range-slider::-webkit-slider-thumb:hover {
                      background: #1d4ed8;
                      transform: scale(1.1);
                    }
                    .price-range-slider::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #2563eb;
                      cursor: pointer;
                      border: none;
                      transition: all 0.2s ease;
                    }
                    .price-range-slider::-moz-range-thumb:hover {
                      background: #1d4ed8;
                      transform: scale(1.1);
                    }
                  `}</style>
                  <input
                    type="range"
                    min="0"
                    max="140000000"
                    step="1000000"
                    value={tempPriceRange[1]}
                    onChange={(e) => setTempPriceRange([tempPriceRange[0], Number(e.target.value)])}
                    className="price-range-slider cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">{formatPrice(tempPriceRange[0])}</span>
                    <span className="font-medium">{formatPrice(tempPriceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="px-6 pb-6">
                <button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          {/* Tour List */}
          <div style={{ width: 'calc(100% - 352px)' }} className="flex-shrink-0">
            <div className="mb-4 flex items-center justify-end">
              <select 
                className="border border-gray-300 rounded px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sắp xếp</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="date">Ngày khởi hành</option>
              </select>
            </div>

            <div className="space-y-4 min-h-[600px]">
              {sortedTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all duration-300 overflow-hidden flex h-[200px]">
                    {/* Image */}
                    <div className="w-64 flex-shrink-0 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300?text=Tour+Image';
                        }}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col overflow-hidden">
                      <h3 className="text-base font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer uppercase line-clamp-2">
                        {tour.title}
                      </h3>
                      
                      <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1 text-xs overflow-hidden">
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[140px]">Châu lục, Quốc gia:</span>
                          <span className="text-gray-600">{tour.region}, {tour.country}</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[100px]">Xuất phát:</span>
                          <span className="text-gray-600">{tour.departure}</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[140px]">Ngày khởi hành:</span>
                          <span className="text-gray-600">{tour.startDate}</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[100px]">Thời gian:</span>
                          <span className="text-gray-600">{tour.duration}</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[140px]">Phương tiện:</span>
                          <span className="text-gray-600">{tour.transport}</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-gray-700 min-w-[100px]">Hãng hàng không:</span>
                          <span className="text-gray-600">{tour.airline}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <div>
                          {tour.originalPrice && (
                            <span className="text-gray-400 line-through mr-2 text-sm">{formatPrice(tour.originalPrice)}</span>
                          )}
                          <span className="text-xl font-bold text-red-600">{formatPrice(tour.price)}</span>
                        </div>
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm whitespace-nowrap">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">←</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCategoryListing;
