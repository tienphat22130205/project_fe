import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaSignOutAlt, FaUserCircle, FaStar, FaTimes } from 'react-icons/fa';
import { MdBeachAccess } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';

interface UserMenuProps {
  showMenu: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ showMenu, onToggleMenu, onCloseMenu }) => {
  const { user, logout, getUserAvatar } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
    onCloseMenu();
  };

  if (!user) return null;

  return (
    <div className="relative flex-shrink-0">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleMenu();
        }}
        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-all focus:outline-none relative z-10"
      >
        <img 
          src={getUserAvatar()}
          alt={user.fullName}
          className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="hidden sm:block text-left">
          <div className="text-sm font-semibold text-gray-800">{user.fullName}</div>
          <div className="text-xs text-gray-500">Xem hồ sơ</div>
        </div>
        <FaChevronDown className="hidden sm:block text-xs text-gray-500" />
      </button>

      {/* Desktop Dropdown Menu */}
      {showMenu && (
        <>
          {/* Desktop version */}
          <div 
            className="hidden sm:block absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src={getUserAvatar()}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <div className="font-semibold text-gray-800">{user.fullName}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-2">
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
                onClick={onCloseMenu}
              >
                <FaUserCircle className="text-lg" />
                <span className="font-medium">Hồ sơ của tôi</span>
              </Link>
              
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
                onClick={onCloseMenu}
              >
                <MdBeachAccess className="text-lg" />
                <span className="font-medium">Kỳ nghỉ của tôi</span>
              </Link>
              
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
                onClick={onCloseMenu}
              >
                <FaStar className="text-lg text-yellow-500" />
                <span className="font-medium">easyTrip Point</span>
              </Link>
            </div>
            
            {/* Logout */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-blue-600 hover:bg-blue-50 transition-all w-full text-left focus:outline-none"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Mobile Slide-in Panel */}
          <div className="sm:hidden fixed inset-0 z-50">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={onCloseMenu}
            />
            
            {/* Sidebar from right */}
            <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-xl overflow-y-auto animate-slide-in-right">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-lg font-bold text-brand">Tài khoản</span>
                <button
                  onClick={onCloseMenu}
                  className="p-2 text-gray-600 hover:text-brand focus:outline-none"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* User Info */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img 
                    src={getUserAvatar()}
                    alt={user.fullName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{user.fullName}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="py-2">
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-gray-100"
                  onClick={onCloseMenu}
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-medium">Hồ sơ của tôi</span>
                </Link>
                
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-gray-100"
                  onClick={onCloseMenu}
                >
                  <MdBeachAccess className="text-xl" />
                  <span className="font-medium">Kỳ nghỉ của tôi</span>
                </Link>
                
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-gray-100"
                  onClick={onCloseMenu}
                >
                  <FaStar className="text-xl text-yellow-500" />
                  <span className="font-medium">easyTrip Point</span>
                </Link>
              </nav>

              {/* Logout */}
              <div className="px-4 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <FaSignOutAlt />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
