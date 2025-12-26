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
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ tourInfo, services, total, timeLeft, formatTime, paymentRate }) => {
  const selectedServices = services.filter(s => s.quantity > 0);
  const rate = parseInt(paymentRate) / 100;
  const amountToPay = total * rate;

  return (
    <div className="space-y-4">
      {/* Countdown Timer */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <FaClock className="text-gray-600" size={16} />
          <div className="text-sm text-gray-700 font-medium">Thời gian giữ chỗ còn lại:</div>
        </div>
        <div className={`text-2xl font-bold ${timeLeft < 120 ? 'text-red-600' : 'text-orange-500'}`}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Vui lòng hoàn tất đặt tour trước khi hết thời gian
        </p>
      </div>

      {/* Tour Info */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold text-gray-800 mb-4">Thông tin thanh toán</h3>

        <div className="border-b pb-4 mb-4">
          <h4 className="font-semibold text-blue-600 text-sm mb-3">{tourInfo.title}</h4>

          <div className="space-y-2 text-sm">
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
        <div className="space-y-3 text-sm">
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
          <div className="border-t mt-4 pt-4">
            <h5 className="font-semibold text-gray-800 text-sm mb-2">Dịch vụ cộng thêm</h5>
            <div className="space-y-2 text-sm">
              {selectedServices.map(service => (
                <div key={service._id} className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{service.name} (x{service.quantity}):</span>
                  <span className="font-medium text-gray-900">{(service.price * service.quantity).toLocaleString('vi-VN')} đ</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Tổng cộng:</span>
            <span className="text-2xl font-bold text-gray-800">
              {total.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Giảm giá:</span>
            <span className="text-gray-700">0</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Thành tiền:</span>
            <span className="text-xl font-bold text-gray-800">
              {total.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="bg-blue-50 rounded p-3 border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Phương thức:</span>
              <span className="font-bold text-blue-600">Thanh toán {paymentRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold">Cần thanh toán:</span>
              <span className="text-2xl font-bold text-red-600">
                {amountToPay.toLocaleString('vi-VN')} đ
              </span>
            </div>
            {rate < 1 && (
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200">
                <span className="text-gray-600 text-xs">Còn lại:</span>
                <span className="text-sm font-medium text-gray-600">
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
