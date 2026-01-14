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
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Mobile: Horizontal scroll tabs */}
      <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 transition-colors text-left whitespace-nowrap border-b-2 lg:border-b-0 lg:border-l-4 ${
                isActive
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-700 hover:bg-gray-50'
              } ${index === menuItems.length - 1 ? '' : 'lg:border-b lg:border-gray-200'}`}
            >
              <Icon className="text-lg flex-shrink-0" />
              <span className="text-sm sm:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
