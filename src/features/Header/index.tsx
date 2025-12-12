import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPhone, FaSearch, FaEnvelope, FaGlobe, FaChevronDown, FaMapMarkerAlt, FaList } from 'react-icons/fa';
import { MdFlight } from 'react-icons/md';

interface TravelDestination {
  id: number;
  name: string;
  region?: string;
}

const Header: React.FC = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showTravelMenu, setShowTravelMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'domestic' | 'international' | 'types'>('international');
  const [domesticDestinations, setDomesticDestinations] = useState<TravelDestination[]>([]);
  const [internationalDestinations, setInternationalDestinations] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  
  const travelTimeoutRef = useRef<number | null>(null);
  const servicesTimeoutRef = useRef<number | null>(null);

  // Fetch dữ liệu du lịch (mock API)
  useEffect(() => {
    const fetchTravelData = async () => {
      setLoading(true);
      try {
        // Mock API cho du lịch trong nước
        const domesticData: TravelDestination[] = [
          { id: 1, name: 'Hà Nội', region: 'Miền Bắc' },
          { id: 2, name: 'Hạ Long', region: 'Miền Bắc' },
          { id: 3, name: 'Sapa', region: 'Miền Bắc' },
          { id: 4, name: 'Ninh Bình', region: 'Miền Bắc' },
          { id: 5, name: 'Đà Nẵng', region: 'Miền Trung' },
          { id: 6, name: 'Hội An', region: 'Miền Trung' },
          { id: 7, name: 'Huế', region: 'Miền Trung' },
          { id: 8, name: 'Nha Trang', region: 'Miền Trung' },
          { id: 9, name: 'TP.HCM', region: 'Miền Nam' },
          { id: 10, name: 'Phú Quốc', region: 'Miền Nam' },
          { id: 11, name: 'Vũng Tàu', region: 'Miền Nam' },
          { id: 12, name: 'Đà Lạt', region: 'Miền Nam' }
        ];

        // Mock API cho du lịch nước ngoài
        const internationalData = {
          'CHÂU Á': ['Thái Lan', 'Hàn Quốc', 'Trung Quốc', 'Indonesia', 'Nhật Bản', 'Singapore', 'Dubai', 'Malaysia', 'Đài Loan', 'Campuchia'],
          'CHÂU ÂU': ['Pháp', 'Đức', 'Thụy Sĩ', 'Ý', 'Tây Ban Nha', 'Bồ Đào Nha', 'Bỉ', 'Na Uy', 'Luxembourg', 'Scotland'],
          'CHÂU MỸ': ['Mỹ', 'Canada', 'Cuba', 'Brazil', 'Argentina'],
          'CHÂU ÚC': ['Úc', 'New Zealand'],
          'CHÂU PHI': ['Ai Cập', 'Nam Phi', 'Morocco']
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setDomesticDestinations(domesticData);
        setInternationalDestinations(internationalData);
      } catch (error) {
        console.error('Error fetching travel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();
  }, []);

  const handleTravelMouseEnter = () => {
    if (travelTimeoutRef.current) {
      clearTimeout(travelTimeoutRef.current);
    }
    setShowTravelMenu(true);
  };

  const handleTravelMouseLeave = () => {
    travelTimeoutRef.current = setTimeout(() => {
      setShowTravelMenu(false);
      setActiveCategory('international');
    }, 300) as unknown as number;
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setShowServicesMenu(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setShowServicesMenu(false);
    }, 300) as unknown as number;
  };

  // Data cho menu Dịch vụ
  const servicesMenuData = [
    { title: 'Combo Free & Easy', icon: '🎯' },
    { title: 'Vé Máy Bay Online', icon: '✈️' },
    { title: 'Vé Tham Quan Sun World', icon: '🎡' }
  ];

  // Group domestic destinations by region
  const groupedDomestic = domesticDestinations.reduce((acc, dest) => {
    const region = dest.region || 'Khác';
    if (!acc[region]) acc[region] = [];
    acc[region].push(dest);
    return acc;
  }, {} as Record<string, TravelDestination[]>);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center gap-4">
            <a href="mailto:info@saigontourist.net" className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
              <FaEnvelope className="text-xs" />
              <span>Mail to: eazytrip@gmail.com</span>
            </a>
            <a href="tel:19001808" className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
              <FaPhone className="text-xs" />
              <span>1900 1808 (8h:00 - 22:00)</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 focus:outline-none">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5" />
              <span>Chọn điểm khởi hành</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 focus:outline-none">
              <FaGlobe className="text-xs" />
              <span>Liên hệ</span>
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
              <Link to="/" className="cursor-pointer focus:outline-none">
                <span 
                  className="ml-2 text-[2.2rem] font-extrabold tracking-tight flex items-center select-none"
                style={{fontFamily: 'Quicksand, Poppins, Segoe UI, Arial, sans-serif'}}
              >
                <span className="mr-2 text-yellow-400 text-2xl">✿</span>
                <span className="bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
                  EasyTrip
                </span>
              </span>
            </Link>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tour"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Du lịch - with dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleTravelMouseEnter}
              onMouseLeave={handleTravelMouseLeave}
            >
              <Link 
                to="/travel" 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors font-medium cursor-pointer focus:outline-none"
              >
                Du lịch
                <FaChevronDown className="text-xs" />
              </Link>
              
              {/* Travel Dropdown */}
              {showTravelMenu && (
                <div className="absolute top-full left-[-200px] mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 w-[1400px] min-h-[500px] overflow-hidden transition-all duration-300">
                  <div className="flex">
                    {/* Left sidebar */}
                    <div className="w-60 bg-blue-600 text-white p-5 min-h-[500px]">
                      <button 
                        onMouseEnter={() => setActiveCategory('domestic')}
                        onClick={() => setActiveCategory('domestic')}
                        className={`flex items-center gap-3 py-4 px-4 w-full text-left rounded-lg transition-all duration-200 mb-3 focus:outline-none ${
                          activeCategory === 'domestic' ? 'bg-white text-blue-600 font-semibold shadow-md' : 'text-white hover:bg-blue-700'
                        }`}
                      >
                        <FaMapMarkerAlt className="text-xl flex-shrink-0 opacity-100" />
                        <span className="text-base font-medium whitespace-nowrap opacity-100 block">Du lịch trong nước</span>
                      </button>
                      <button 
                        onMouseEnter={() => setActiveCategory('international')}
                        onClick={() => setActiveCategory('international')}
                        className={`flex items-center gap-3 py-4 px-4 w-full text-left rounded-lg transition-all duration-200 mb-3 focus:outline-none ${
                          activeCategory === 'international' ? 'bg-white text-blue-600 font-semibold shadow-md' : 'text-white hover:bg-blue-700'
                        }`}
                      >
                        <MdFlight className="text-xl flex-shrink-0 opacity-100" />
                        <span className="text-base font-medium whitespace-nowrap opacity-100 block">Du lịch nước ngoài</span>
                      </button>
                      <button 
                        onMouseEnter={() => setActiveCategory('types')}
                        onClick={() => setActiveCategory('types')}
                        className={`flex items-center gap-3 py-4 px-4 w-full text-left rounded-lg transition-all duration-200 focus:outline-none ${
                          activeCategory === 'types' ? 'bg-white text-blue-600 font-semibold shadow-md' : 'text-white hover:bg-blue-700'
                        }`}
                      >
                        <FaList className="text-xl flex-shrink-0 opacity-100" />
                        <span className="text-base font-medium whitespace-nowrap opacity-100 block">Thể loại</span>
                      </button>
                    </div>
                    
                    {/* Content area */}
                    <div className="flex-1 p-8 min-h-[500px]">
                      {loading ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="text-gray-500">Đang tải...</div>
                        </div>
                      ) : (
                        <>
                          {/* Du lịch trong nước */}
                          {activeCategory === 'domestic' && (
                            <div className="grid grid-cols-3 gap-8 animate-fadeIn">
                              {Object.entries(groupedDomestic).map(([region, destinations]) => (
                                <div key={region}>
                                  <h4 className="font-bold text-blue-600 mb-4 text-xl">{region}</h4>
                                  <ul className="space-y-2">
                                    {destinations.map((dest) => (
                                      <li key={dest.id}>
                                        <Link 
                                          to={`/travel/domestic/${dest.name.toLowerCase()}`} 
                                          className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none block py-1 text-base"
                                        >
                                          {dest.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Du lịch nước ngoài */}
                          {activeCategory === 'international' && (
                            <div className="grid grid-cols-5 gap-8 animate-fadeIn">
                              {Object.entries(internationalDestinations).map(([continent, countries]: [string, string[]]) => (
                                <div key={continent}>
                                  <h4 className="font-bold text-blue-600 mb-4 text-lg">{continent}</h4>
                                  <ul className="space-y-2">
                                    {countries.map((country: string, idx: number) => (
                                      <li key={idx}>
                                        <Link 
                                          to={`/travel/international/${country.toLowerCase()}`} 
                                          className="text-base text-gray-700 hover:text-blue-600 transition-colors focus:outline-none block"
                                        >
                                          {country}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  {countries.length > 8 && (
                                    <button className="text-sm text-blue-500 hover:text-blue-600 mt-3 focus:outline-none">
                                      Xem thêm
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Thể loại */}
                          {activeCategory === 'types' && (
                            <div className="grid grid-cols-4 gap-5 animate-fadeIn">
                              {['Tour Trọn Gói', 'Tour Tiết Kiệm', 'Tour Cao Cấp', 'Tour Gia Đình', 'Tour Nhóm', 'Tour Honeymoon', 'Tour Khám Phá', 'Tour Nghỉ Dưỡng'].map((type, idx) => (
                                <Link
                                  key={idx}
                                  to={`/travel/type/${type.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="flex items-center gap-3 p-5 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all focus:outline-none"
                                >
                                  <span className="text-3xl">🎯</span>
                                  <span className="font-semibold text-gray-700 text-base">{type}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dịch vụ - with dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link 
                to="/services" 
                className="flex items-center gap-1 text-gray-700 hover:text-blue-700 transition-colors font-medium cursor-pointer focus:outline-none"
              >
                Dịch vụ
                <FaChevronDown className="text-xs" />
              </Link>
              
              {/* Services Dropdown */}
              {showServicesMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 py-4 z-50 w-64">
                  {servicesMenuData.map((service, idx) => (
                    <Link
                      key={idx}
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
                    >
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-medium">{service.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/car-rental" className="text-gray-700 hover:text-blue-700 transition-colors font-medium cursor-pointer focus:outline-none">
              Thuê xe
            </Link>
            <Link to="/study-abroad" className="text-gray-700 hover:text-blue-700 transition-colors font-medium cursor-pointer focus:outline-none">
              Du học
            </Link>
            <Link to="/work-abroad" className="text-gray-700 hover:text-blue-700 transition-colors font-medium cursor-pointer focus:outline-none">
              Việc làm ngoài nước
            </Link>
            <Link to="/custom-tour" className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors font-medium cursor-pointer focus:outline-none">
              <span>🎁</span>
              <span>Tour theo yêu cầu</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="relative">
              <button 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center space-x-2 cursor-pointer hover:text-orange-500 transition-colors focus:outline-none"
              >
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <FaUser className="text-sm" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">Tài khoản</span>
              </button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all mb-2 focus:outline-none">
                    Đăng ký
                  </button>
                  <div className="px-4 py-2 text-sm text-gray-600 border-t border-gray-100">
                    <span>Quý khách đã có tài khoản?</span>
                    <a href="#login" className="text-blue-500 hover:text-blue-600 font-medium ml-1">
                      Đăng nhập ngay
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
