import React, { useState } from 'react';
import { useAuth } from '../../../hooks';

// Move InfoRow component outside to fix React error
interface InfoRowProps {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  type?: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disableEdit?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  name,
  placeholder,
  type = 'text',
  isEditing,
  onEdit,
  onChange,
  disableEdit = false,
}) => (
  <div className="flex items-start py-5 border-b-2 border-gray-200">
    <div className="w-48 text-gray-800 font-semibold">{label}</div>
    <div className="flex-1">
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <div className="text-gray-900 py-2">{value || <span className="text-gray-400">{placeholder}</span>}</div>
      )}
    </div>
    <div className="w-32 text-right">
      {!isEditing && !disableEdit && (
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Chỉnh sửa
        </button>
      )}
    </div>
  </div>
);

const PersonalInfo: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Ngọc Hyn',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    taxInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // TODO: Call API to update user info
    console.log('Saving:', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
          <p className="text-gray-600 mt-1">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
              {formData.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-0">
        <InfoRow
          label="Họ tên"
          value={formData.fullName}
          name="fullName"
          placeholder="Nhập họ tên của bạn"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={handleInputChange}
        />

        <div className="flex items-start py-5 border-b-2 border-gray-200">
          <div className="w-48 text-gray-800 font-semibold">Địa chỉ email</div>
          <div className="flex-1">
            <div className="text-gray-900 py-2">{formData.email || user?.email}</div>
            <p className="text-sm text-gray-500 mt-1">
              Đây là email Quý khách đã xác thực. iViVu sẽ gửi các thông báo đến địa chỉ email này
            </p>
          </div>
          <div className="w-32 text-right">
            <span className="text-gray-400 text-sm">Không thể sửa</span>
          </div>
        </div>

        <InfoRow
          label="Số điện thoại"
          value={formData.phone}
          name="phone"
          placeholder="Thêm số điện thoại của bạn"
          type="tel"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={handleInputChange}
        />

        <InfoRow
          label="Ngày sinh"
          value={formData.dateOfBirth}
          name="dateOfBirth"
          placeholder="Nhập ngày sinh của bạn"
          type="date"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={handleInputChange}
        />

        <div className="flex items-start py-5 border-b-2 border-gray-200">
          <div className="w-48 text-gray-800 font-semibold">Giới tính</div>
          <div className="flex-1">
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Nhập giới tính của bạn</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            ) : (
              <div className="text-gray-900 py-2">
                {formData.gender === 'male'
                  ? 'Nam'
                  : formData.gender === 'female'
                  ? 'Nữ'
                  : formData.gender === 'other'
                  ? 'Khác'
                  : <span className="text-gray-400">Nhập giới tính của bạn</span>}
              </div>
            )}
          </div>
          <div className="w-32 text-right">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <InfoRow
          label="Địa chỉ"
          value={formData.address}
          name="address"
          placeholder="Nhập địa chỉ"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={handleInputChange}
        />

        <InfoRow
          label="Thông tin thuế"
          value={formData.taxInfo}
          name="taxInfo"
          placeholder="Chưa cung cấp"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={handleInputChange}
        />
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-300">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Lưu thay đổi
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
