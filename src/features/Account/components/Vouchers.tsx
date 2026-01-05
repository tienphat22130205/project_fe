import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { fetchMyVouchers } from '../../Vouchers/server';
import type { Voucher } from '../../Vouchers/server';
import { useAuth } from '../../../hooks';

const Vouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadVouchers = async () => {
      try {
        if (!isAuthenticated()) {
          setError('Vui lòng đăng nhập để xem voucher');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Vui lòng đăng nhập để xem voucher');
          setLoading(false);
          return;
        }

        const data = await fetchMyVouchers(token);
        setVouchers(data);
      } catch (err) {
        setError('Không thể tải danh sách voucher');
        console.error('Error loading vouchers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVouchers();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="text-4xl text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center py-20">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatDiscount = (voucher: Voucher) => {
    if (voucher.discountType === 'percentage') {
      return `Giảm ${voucher.discountValue}%`;
    }
    return `Giảm ${voucher.discountValue.toLocaleString('vi-VN')}đ`;
  };

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
          {vouchers.map((voucher) => {
            const isExpired = new Date(voucher.endDate) < new Date();
            const isInactive = !voucher.isActive || isExpired || voucher.isUsed;

            return (
              <div
                key={voucher._id}
                className={`border rounded-lg p-5 ${
                  isInactive
                    ? 'border-gray-300 bg-gray-50 opacity-70'
                    : 'border-blue-200 bg-white hover:shadow-md transition-shadow'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-blue-500 rounded flex items-center justify-center">
                      <FaTicketAlt className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{voucher.name || voucher.description}</h3>
                    
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 bg-blue-50 border border-blue-300 rounded text-blue-700 font-mono text-sm font-semibold">
                        {voucher.code}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-blue-600">{formatDiscount(voucher)}</span>
                      </div>
                      
                      <div>Đơn tối thiểu: <span className="font-medium">{voucher.minOrderValue.toLocaleString('vi-VN')}đ</span></div>
                      
                      {voucher.maxDiscountAmount && (
                        <div>Giảm tối đa: <span className="font-medium">{voucher.maxDiscountAmount.toLocaleString('vi-VN')}đ</span></div>
                      )}

                      <div className="flex items-center gap-1 pt-1">
                        <FaCalendarAlt className="text-gray-400 text-xs" />
                        <span>HSD: {formatDate(voucher.endDate)}</span>
                      </div>
                    </div>

                    {voucher.isUsed && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Đã sử dụng</span>
                      </div>
                    )}
                    {isExpired && !voucher.isUsed && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">Đã hết hạn</span>
                      </div>
                    )}
                  </div>
                </div>

                {!isInactive && (
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                    Sử dụng ngay
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vouchers;
