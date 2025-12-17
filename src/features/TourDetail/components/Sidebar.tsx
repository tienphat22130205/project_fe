import React from 'react';
import { FaPhone, FaEnvelope, FaCheck, FaStar } from 'react-icons/fa';

interface SidebarProps {
  price: number;
}

const Sidebar: React.FC<SidebarProps> = ({ price }) => {
  return (
    <div className="space-y-4">
      {/* Giá */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-sm text-gray-600 mb-2">Giá từ</div>
        <div className="text-3xl font-bold text-red-600">
          {price.toLocaleString('vi-VN')} đ
        </div>
      </div>

      {/* Hỗ trợ đặt tour */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-blue-700 mb-4">Hỗ trợ đặt tour</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <FaPhone size={18} />
            <div>
              <div className="text-sm text-gray-600">Hotline:</div>
              <a href="tel:19001808" className="font-semibold hover:text-blue-600">
                1900 1808
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaEnvelope size={18} />
            <div>
              <div className="text-sm text-gray-600">Email:</div>
              <a
                href="mailto:info@saigontourist.net"
                className="font-semibold hover:text-blue-600 text-sm break-all"
              >
                info@saigontourist.net
              </a>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors">
            Bạn muốn được gọi lại?
          </button>
        </div>
      </div>

      {/* Vì sao nên mua tour online */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-blue-700 mb-4">
          Vì sao nên mua tour online
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <FaCheck className="mt-1 flex-shrink-0" size={16} />
            <span>An toàn - bảo mật</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="mt-1 flex-shrink-0" size={16} />
            <span>Tiện lợi, tiết kiệm thời gian</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="mt-1 flex-shrink-0" size={16} />
            <span>Không tính phí giao dịch</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="mt-1 flex-shrink-0" size={16} />
            <span>Giao dịch bảo đảm</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="mt-1 flex-shrink-0" size={16} />
            <span>Nhận thêm ưu đãi</span>
          </li>
        </ul>
      </div>

      {/* Thương hiệu uy tín */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-blue-700 mb-4">Thương hiệu uy tín</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <FaStar className="mt-1 flex-shrink-0" size={16} />
            <span>Thành lập từ năm 1975</span>
          </li>
          <li className="flex items-start gap-2">
            <FaStar className="mt-1 flex-shrink-0" size={16} />
            <span>Thương hiệu lữ hành hàng đầu</span>
          </li>
          <li className="flex items-start gap-2">
            <FaStar className="mt-1 flex-shrink-0" size={16} />
            <span>Thương hiệu quốc gia</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
