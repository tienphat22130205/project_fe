import React from 'react';
import { FaUser, FaGift, FaShoppingBag, FaTicketAlt } from 'react-icons/fa';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'profile', label: 'Hồ sơ của tôi', icon: FaUser },
    { id: 'points', label: 'iViVuPoint', icon: FaGift },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: FaShoppingBag },
    { id: 'vouchers', label: 'Voucher của tôi', icon: FaTicketAlt },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4">
      {/* Mobile: Horizontal scroll tabs */}
      <nav className="flex lg:flex-col gap-1 sm:gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-left whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-base sm:text-lg flex-shrink-0" />
              <span className="text-sm sm:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
