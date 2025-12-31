import React from 'react';

interface ProfileViewProps {
    user: any;
    onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => (
    <div className="space-y-0">
        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Họ tên</div>
            <div className="flex-1 text-gray-900 py-2">{user?.fullName}</div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Địa chỉ email</div>
            <div className="flex-1">
                <div className="text-gray-900 py-2">{user?.email}</div>
                <p className="text-sm text-gray-500 mt-1">Đây là email Quý khách đã xác thực.</p>
            </div>
            <div className="w-32 text-right"><span className="text-gray-400 text-sm">Không thể sửa</span></div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Số điện thoại</div>
            <div className="flex-1 text-gray-900 py-2">{user?.phone || <span className="text-gray-400">Thêm số điện thoại</span>}</div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Ngày sinh</div>
            <div className="flex-1 text-gray-900 py-2">
                {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : <span className="text-gray-400">Nhập ngày sinh</span>}
            </div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Giới tính</div>
            <div className="flex-1 text-gray-900 py-2">{user?.gender || <span className="text-gray-400">Chưa cập nhật</span>}</div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Địa chỉ</div>
            <div className="flex-1 text-gray-900 py-2">{user?.address || <span className="text-gray-400">Nhập địa chỉ</span>}</div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>

        <div className="flex items-start py-5 border-b-2 border-gray-200">
            <div className="w-48 text-gray-800 font-semibold">Mã số thuế</div>
            <div className="flex-1 text-gray-900 py-2">{user?.taxId || <span className="text-gray-400">Chưa cập nhật</span>}</div>
            <div className="w-32 text-right">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-semibold">Chỉnh sửa</button>
            </div>
        </div>
    </div>
);

export default ProfileView;
