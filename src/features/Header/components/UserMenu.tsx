import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaSignOutAlt, FaUserCircle, FaStar } from 'react-icons/fa';
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
        <FaChevronDown className="text-xs text-gray-500" />
      </button>

      {/* User Dropdown Menu */}
      {showMenu && (
        <div 
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100]"
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
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
              onClick={onCloseMenu}
            >
              <FaUserCircle className="text-lg" />
              <span className="font-medium">Hồ sơ của tôi</span>
            </Link>
            
            <Link
              to="/my-trips"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none"
              onClick={onCloseMenu}
            >
              <MdBeachAccess className="text-lg" />
              <span className="font-medium">Kỳ nghỉ của tôi</span>
            </Link>
            
            <Link
              to="/points"
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
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all w-full text-left focus:outline-none"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
