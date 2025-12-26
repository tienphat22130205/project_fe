import React from 'react';
import { FaUser } from 'react-icons/fa';

interface GuestMenuProps {
  showMenu: boolean;
  onToggleMenu: () => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export const GuestMenu: React.FC<GuestMenuProps> = ({ 
  showMenu, 
  onToggleMenu, 
  onShowLogin, 
  onShowRegister 
}) => {
  return (
    <div className="relative flex-shrink-0">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleMenu();
        }}
        className="flex items-center space-x-2 cursor-pointer hover:text-orange-500 transition-colors focus:outline-none relative z-10"
      >
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <FaUser className="text-sm" />
        </div>
        <span className="hidden sm:inline text-sm font-medium">Tài khoản</span>
      </button>

      {/* Account Dropdown */}
      {showMenu && (
        <div 
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100]"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onShowRegister}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all mb-2 focus:outline-none"
          >
            Đăng ký
          </button>
          <div className="px-4 py-2 text-sm text-gray-600 border-t border-gray-100">
            <span>Quý khách đã có tài khoản?</span>
            <button 
              onClick={onShowLogin}
              className="text-blue-500 hover:text-blue-600 font-medium ml-1 focus:outline-none"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
