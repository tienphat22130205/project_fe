import React from 'react';
import { FaTicketAlt, FaCalendarAlt, FaPercentage } from 'react-icons/fa';

interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: number;
  expiryDate: string;
  isUsed: boolean;
}

const Vouchers: React.FC = () => {
  // Mock data - replace with real API call
  const vouchers: Voucher[] = [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Voucher của tôi</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nhập mã voucher
        </button>
      </div>

      {vouchers.length === 0 ? (
        <div className="text-center py-20">
          <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có voucher nào</h3>
          <p className="text-gray-600 mb-6">
            Theo dõi các chương trình khuyến mãi để nhận voucher hấp dẫn
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`border-2 rounded-lg p-4 ${
                voucher.isUsed
                  ? 'border-gray-200 bg-gray-50 opacity-60'
                  : 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                    <FaPercentage className="text-white text-2xl" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{voucher.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{voucher.description}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white border border-dashed border-orange-400 rounded text-orange-600 font-mono font-bold">
                      {voucher.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>HSD: {voucher.expiryDate}</span>
                  </div>

                  {voucher.isUsed && (
                    <div className="mt-2">
                      <span className="text-sm text-red-600 font-semibold">Đã sử dụng</span>
                    </div>
                  )}
                </div>
              </div>

              {!voucher.isUsed && (
                <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Sử dụng ngay
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vouchers;
