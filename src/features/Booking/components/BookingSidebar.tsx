import React from 'react';

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
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ tourInfo, services, total }) => {
  const selectedServices = services.filter(s => s.quantity > 0);

  return (
    <div className="space-y-4">
      {/* Countdown Timer */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-600 mb-1">Thời gian giữ chỗ còn lại:</div>
        <div className="text-3xl font-bold text-orange-500">09:30</div>
      </div>

      {/* Tour Info */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold text-gray-800 mb-4">Thông tin thanh toán</h3>
        
        <div className="border-b pb-4 mb-4">
          <h4 className="font-semibold text-blue-600 text-sm mb-3">{tourInfo.title}</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Code:</span>
              <span className="font-semibold">{tourInfo.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày khởi hành:</span>
              <span>{tourInfo.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày kết thúc:</span>
              <span>{tourInfo.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span>{tourInfo.duration}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {tourInfo.adultCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Giá người lớn: {tourInfo.adultPrice.toLocaleString('vi-VN')} đ x {tourInfo.adultCount}
              </span>
            </div>
          )}
          {tourInfo.childCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Giá trẻ em: {tourInfo.childPrice.toLocaleString('vi-VN')} đ x {tourInfo.childCount}
              </span>
            </div>
          )}
          {tourInfo.infantCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Giá em bé: {tourInfo.infantPrice.toLocaleString('vi-VN')} đ x {tourInfo.infantCount}
              </span>
            </div>
          )}
          
          {selectedServices.length > 0 && (
            <>
              <div className="border-t pt-2 mt-2">
                <div className="font-medium text-gray-700 mb-2">Dịch vụ cộng thêm:</div>
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">
                      {service.name.substring(0, 40)}... x {service.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between text-gray-600 pt-2">
            <span>Phụ thu:</span>
            <span>0 đ</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Dịch vụ cộng thêm:</span>
            <span>0 đ</span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Tổng cộng:</span>
            <span className="text-2xl font-bold text-red-600">
              {total.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Giảm giá:</span>
            <span className="text-gray-700">0</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Thành tiền</span>
            <span className="text-xl font-bold text-red-600">
              {total.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="bg-gray-50 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Bạn đã chọn hình thức:</span>
              <span className="font-bold text-green-600">Thanh toán 100%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Cần thanh toán:</span>
              <span className="text-xl font-bold text-orange-500">
                {total.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
