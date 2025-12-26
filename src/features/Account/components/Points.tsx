import React from 'react';
import { FaGift, FaClock, FaInfoCircle } from 'react-icons/fa';

const Points: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">iViVuPoint</h1>
      
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 mb-1">Tổng điểm hiện có</p>
            <h2 className="text-4xl font-bold">0 điểm</h2>
          </div>
          <FaGift className="text-5xl text-white/30" />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaClock className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Điểm sắp hết hạn</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">0 điểm</p>
          <p className="text-sm text-gray-600 mt-1">Trong 30 ngày tới</p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaInfoCircle className="text-green-600" />
            <h3 className="font-semibold text-gray-900">Điểm đã sử dụng</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">0 điểm</p>
          <p className="text-sm text-gray-600 mt-1">Tổng điểm đã dùng</p>
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-3">Cách tích điểm</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Đặt tour và hoàn thành chuyến đi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Tham gia các chương trình khuyến mãi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Giới thiệu bạn bè đặt tour</span>
          </li>
        </ul>
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
        <div className="text-center py-12 text-gray-500">
          <FaGift className="text-5xl text-gray-300 mx-auto mb-3" />
          <p>Chưa có giao dịch nào</p>
        </div>
      </div>
    </div>
  );
};

export default Points;
