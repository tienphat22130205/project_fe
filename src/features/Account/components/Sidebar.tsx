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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
