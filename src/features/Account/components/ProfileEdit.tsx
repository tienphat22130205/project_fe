import React from 'react';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    taxId: string;
    city?: string; // Optional for backward compatibility
}

interface ProfileEditProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ formData, onChange, onSave, onCancel }) => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên <span className="text-red-500">*</span></label>
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Nhập họ tên"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="w-full px-3 sm:px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-600 break-all">
                {formData.email}
            </div>
            <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button onClick={onCancel} className="w-full sm:w-auto px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
                Hủy
            </button>
            <button onClick={onSave} className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base">
                Lưu thay đổi
            </button>
        </div>
    </div>
);

export default ProfileEdit;
