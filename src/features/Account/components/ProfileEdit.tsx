import React from 'react';
import InfoRow from './InfoRow';

interface ProfileEditProps {
    formData: any;
    onChange: (e: any) => void;
    onSave: () => void;
    onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ formData, onChange, onSave, onCancel }) => (
    <div className="space-y-5">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ tên <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Nhập họ tên"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-base text-gray-600 break-all">
                {formData.email}
            </div>
            <p className="text-xs text-gray-500 mt-2">Email không thể thay đổi</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mã số thuế</label>
                <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={onChange}
                    placeholder="Nhập mã số thuế"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Nhập địa chỉ"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-gray-200">
            <button 
                onClick={onCancel} 
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
                Hủy
            </button>
            <button 
                onClick={onSave} 
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
            >
                Lưu thay đổi
            </button>
        </div>
    </div>
);

export default ProfileEdit;
