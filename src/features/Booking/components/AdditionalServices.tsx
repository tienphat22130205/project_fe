import React from 'react';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface AdditionalServicesProps {
  services: Service[];
  onQuantityChange: (id: number, delta: number) => void;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({ services, onQuantityChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Dịch vụ cộng thêm</h2>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-sm text-gray-600">
                  Giá <span className="font-bold text-red-600">{service.price.toLocaleString('vi-VN')}</span> đ/khách
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Chọn số lượng</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onQuantityChange(service.id, -1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{service.quantity}</span>
                <button
                  onClick={() => onQuantityChange(service.id, 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
