import React from 'react';
import { FaUser } from 'react-icons/fa';

interface FormData {
  fullName: string;
  gender: string;
  birthDate: string;
  email: string;
  phone: string;
  singleRoomSupplement: boolean;
}

interface BookingFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      {/* Thông tin đơn hàng */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100" 
            alt="Tour" 
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-blue-600 font-semibold text-sm">
              Tết Bính Ngọ 2026 - ĐỒNG PHONG NHA- ĐỒNG THIÊN ĐƯỜNG - HUẾ - ĐÀ NẴNG - HỘI AN - KDL BÀ NÀ HILLS
            </h3>
            <div className="flex gap-4 text-xs text-gray-600 mt-1">
              <span>🏠 Miền Trung, Đà Nẵng, Hội An, Huế, Quảng Bình</span>
              <span>📅 Chùm tour sự kiện, Tour Tết Âm Lịch 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin hành khách */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FaUser className="text-gray-600" />
          <h3 className="font-bold text-gray-800">Người lớn</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập SDT"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phụ thu Đơn</label>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.singleRoomSupplement}
                  onChange={(e) => setFormData({ ...formData, singleRoomSupplement: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
