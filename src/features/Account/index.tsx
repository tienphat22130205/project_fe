import React, { useState } from 'react';
import { Sidebar, PersonalInfo, Points, Orders, Vouchers } from './components';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PersonalInfo />;
      case 'points':
        return <Points />;
      case 'orders':
        return <Orders />;
      case 'vouchers':
        return <Vouchers />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Trang chủ</a>
            <span>/</span>
            <span className="text-gray-900">Tài khoản</span>
            <span>/</span>
            <span className="text-blue-600">
              {activeTab === 'profile' && 'Hồ sơ của tôi'}
              {activeTab === 'points' && 'iViVuPoint'}
              {activeTab === 'orders' && 'Đơn hàng của tôi'}
              {activeTab === 'vouchers' && 'Voucher của tôi'}
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
