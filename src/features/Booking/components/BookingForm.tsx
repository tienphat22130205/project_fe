import React from 'react';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

interface FormData {
  fullName: string;
  gender: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface TourData {
  _id: string;
  title: string;
  tourCode: string;
  images: string[];
  destination: string;
  category: string;
}

interface BookingFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  tourData?: TourData;
}

const BookingForm: React.FC<BookingFormProps> = ({ formData, setFormData, tourData }) => {
  return (
    <div className="space-y-6">
      {/* Thông tin đơn hàng */}
      {tourData && (
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={tourData.images[0] || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100"}
              alt="Tour"
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="text-blue-600 font-semibold text-base">
                {tourData.title}
              </h3>
              <div className="flex gap-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-500" size={14} />
                  {tourData.destination}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-500" size={14} />
                  {tourData.category}
                </span>
                <span className="flex items-center gap-1">
                  <FaTag className="text-gray-500" size={14} />
                  Mã tour: {tourData.tourCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thông tin hành khách */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FaUser className="text-gray-600" size={18} />
          <h3 className="font-bold text-gray-800 text-lg">Người lớn</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-base font-medium mb-2">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-base font-medium mb-2">
              Điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập SDT"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-base font-medium mb-2">Ghi chú</label>
          <textarea
            placeholder="Nhập ghi chú nếu có"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
