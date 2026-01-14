import React from 'react';
import { FaClock } from 'react-icons/fa';

interface Service {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
  category?: string;
}

interface BookingSidebarProps {
  tourInfo: {
    title: string;
    code: string;
    startDate: string;
    endDate: string;
    duration: string;
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
    adultCount: number;
    childCount: number;
    infantCount: number;
  };
  services: Service[];
  total: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  paymentRate: string;
  voucherDiscount?: number;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ tourInfo, services, total, timeLeft, formatTime, paymentRate, voucherDiscount = 0 }) => {
  const selectedServices = services.filter(s => s.quantity > 0);
  const rate = parseInt(paymentRate) / 100;
  const subtotal = total + voucherDiscount; // Tính ngược lại subtotal
  const amountToPay = total * rate;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Countdown Timer */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-1 sm:mb-2">
          <FaClock className="text-gray-600" size={14} />
          <div className="text-xs sm:text-sm text-gray-700 font-medium">Thời gian giữ chỗ còn lại:</div>
        </div>
        <div className={`text-xl sm:text-2xl font-bold ${timeLeft < 120 ? 'text-red-600' : 'text-orange-500'}`}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          Vui lòng hoàn tất đặt tour trước khi hết thời gian
        </p>
      </div>

      {/* Tour Info */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Thông tin thanh toán</h3>

        <div className="border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
          <h4 className="font-semibold text-blue-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{tourInfo.title}</h4>

          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã tour:</span>
              <span className="font-medium text-gray-900">{tourInfo.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khởi hành:</span>
              <span className="font-medium text-gray-900">{tourInfo.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kết thúc:</span>
              <span className="font-medium text-gray-900">{tourInfo.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium text-gray-900">{tourInfo.duration}</span>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Người lớn:</span>
            <div className="text-right">
              <div className="font-medium">{tourInfo.adultCount} x {tourInfo.adultPrice.toLocaleString('vi-VN')} đ</div>
            </div>
          </div>
          {tourInfo.childCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Trẻ em:</span>
              <div className="text-right">
                <div className="font-medium">{tourInfo.childCount} x {tourInfo.childPrice.toLocaleString('vi-VN')} đ</div>
              </div>
            </div>
          )}
          {tourInfo.infantCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Em bé:</span>
              <div className="text-right">
                <div className="font-medium">{tourInfo.infantCount} x {tourInfo.infantPrice.toLocaleString('vi-VN')} đ</div>
              </div>
            </div>
          )}
        </div>

        {/* Services */}
        {selectedServices.length > 0 && (
          <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4">
            <h5 className="font-semibold text-gray-800 text-xs sm:text-sm mb-2">Dịch vụ cộng thêm</h5>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {selectedServices.map(service => (
                <div key={service._id} className="flex justify-between text-[10px] sm:text-xs mb-1">
                  <span className="text-gray-600">{service.name} (x{service.quantity}):</span>
                  <span className="font-medium text-gray-900">{(service.price * service.quantity).toLocaleString('vi-VN')} đ</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 text-xs sm:text-sm">Tạm tính:</span>
            <span className="text-base sm:text-lg font-semibold text-gray-800">
              {subtotal.toLocaleString('vi-VN')} đ
            </span>
          </div>
          {voucherDiscount > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-600 text-xs sm:text-sm">Giảm giá voucher:</span>
              <span className="text-green-600 font-semibold text-sm">-{voucherDiscount.toLocaleString('vi-VN')} đ</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-gray-800 font-bold text-sm">Tổng cộng:</span>
            <span className="text-xl sm:text-2xl font-bold text-orange-600">
              {total.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>

        <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4">
          <div className="bg-blue-50 rounded p-2 sm:p-3 border border-blue-100">
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <span className="text-gray-700 font-medium text-xs sm:text-sm">Phương thức:</span>
              <span className="font-bold text-blue-600 text-xs sm:text-sm">Thanh toán {paymentRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-xs sm:text-sm">Cần thanh toán:</span>
              <span className="text-lg sm:text-2xl font-bold text-red-600">
                {amountToPay.toLocaleString('vi-VN')} đ
              </span>
            </div>
            {rate < 1 && (
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200">
                <span className="text-gray-600 text-[10px] sm:text-xs">Còn lại:</span>
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  {(total - amountToPay).toLocaleString('vi-VN')} đ
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
