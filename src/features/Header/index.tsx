import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPhone, FaSearch, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Header: React.FC = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

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
            <Link to="/travel" className="text-blue-600 hover:text-orange-500 transition-colors font-medium cursor-pointer focus:outline-none">
              Du lịch
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer focus:outline-none">
              Dịch vụ
            </Link>
            <Link to="/car-rental" className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer focus:outline-none">
              Thuê xe
            </Link>
            <Link to="/study-abroad" className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer focus:outline-none">
              Du học
            </Link>
            <Link to="/work-abroad" className="text-gray-700 hover:text-orange-500 transition-colors font-medium cursor-pointer focus:outline-none">
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
