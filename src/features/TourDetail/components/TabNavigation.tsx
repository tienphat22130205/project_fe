import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'schedule', label: 'Lịch khởi hành' },
    { id: 'itinerary', label: 'Hành trình du lịch' },
    { id: 'pricing', label: 'Chính sách giá' },
    { id: 'cancellation', label: 'Chính sách hủy / phạt' },
    { id: 'info', label: 'Thông tin khác' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-x-auto">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
