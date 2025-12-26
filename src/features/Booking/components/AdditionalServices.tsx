import React from 'react';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  quantity: number;
  maxQuantity?: number;
}

interface AdditionalServicesProps {
  services: Service[];
  onQuantityChange: (id: string, delta: number) => void;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({ services, onQuantityChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Dịch vụ cộng thêm</h2>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service._id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {service.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {service.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-sm font-bold text-red-600">
                  {service.price.toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-gray-500">{service.unit}</div>
                {service.maxQuantity && (
                  <div className="text-xs text-orange-600">Tối đa: {service.maxQuantity}</div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Chọn số lượng</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onQuantityChange(service._id, -1)}
                  disabled={service.quantity === 0}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{service.quantity}</span>
                <button
                  onClick={() => onQuantityChange(service._id, 1)}
                  disabled={service.maxQuantity ? service.quantity >= service.maxQuantity : false}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
