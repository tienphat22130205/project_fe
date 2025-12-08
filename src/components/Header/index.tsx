import React from 'react';
import { FaUser, FaPhone } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://via.placeholder.com/120x40/003d82/ffffff?text=IVIVU" 
              alt="IVIVU" 
              className="h-10"
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#hotels" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Khách sạn
            </a>
            <a href="#tours" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Tours
            </a>
            <a href="#flights" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Vé máy bay
            </a>
            <a href="#fun" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Vé vui chơi
            </a>
            <a href="#airport" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Vé tàu
            </a>
            <a href="#more" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              ...
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-orange-500 transition-colors">
              <FaUser className="text-gray-600" />
              <span className="hidden sm:inline text-sm font-medium">Tài khoản</span>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow">
              <FaPhone className="text-sm" />
              <div className="flex flex-col text-xs leading-tight">
                <span className="font-bold">1900 1870</span>
                <span className="text-[10px] opacity-90">7h30 → 21h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
