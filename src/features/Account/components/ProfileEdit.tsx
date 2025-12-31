import React from 'react';
import InfoRow from './InfoRow';

interface ProfileEditProps {
    formData: any;
    onChange: (e: any) => void;
    onSave: () => void;
    onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ formData, onChange, onSave, onCancel }) => (
    <div className="space-y-0">
        <InfoRow label="Họ tên" value={formData.fullName} name="fullName" placeholder="Nhập họ tên" isEditing={true} onEdit={() => { }} onChange={onChange} />

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Địa chỉ email</div>
            <div className="flex-1 text-gray-900 py-2 text-gray-500">{formData.email} <span className="italic text-sm">(Không thể sửa)</span></div>
        </div>

        <InfoRow label="Số điện thoại" value={formData.phone} name="phone" placeholder="Nhập số điện thoại" type="tel" isEditing={true} onEdit={() => { }} onChange={onChange} />
        <InfoRow label="Ngày sinh" value={formData.dateOfBirth} name="dateOfBirth" placeholder="Nhập ngày sinh" type="date" isEditing={true} onEdit={() => { }} onChange={onChange} />

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Giới tính</div>
            <div className="flex-1">
                <select name="gender" value={formData.gender} onChange={onChange} className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
        </div>

        <InfoRow label="Địa chỉ" value={formData.address} name="address" placeholder="Nhập địa chỉ" isEditing={true} onEdit={() => { }} onChange={onChange} />
        <InfoRow label="Mã số thuế" value={formData.taxId} name="taxId" placeholder="Nhập mã số thuế" isEditing={true} onEdit={() => { }} onChange={onChange} />

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-300">
            <button onClick={onCancel} className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold">Hủy</button>
            <button onClick={onSave} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Lưu thay đổi</button>
        </div>
    </div>
);

export default ProfileEdit;
