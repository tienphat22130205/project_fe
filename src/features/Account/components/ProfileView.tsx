import React from 'react';

interface ProfileViewProps {
    user: any;
    onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => (
    <div className="space-y-0">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Họ tên</div>
                <div className="text-base font-semibold text-gray-900">{user?.fullName}</div>
            </div>
            <button onClick={onEdit} className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                Sửa
            </button>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="text-base text-gray-900 break-all">{user?.email}</div>
                <div className="flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-gray-500">Đã xác thực</span>
                </div>
            </div>
            <span className="ml-4 text-xs text-gray-400">Không thể sửa</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200">
            <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">Số điện thoại</div>
                        <div className="text-base font-medium text-gray-900">{user?.phone || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                    </div>
                    <button onClick={onEdit} className="ml-2 text-sm text-blue-600 hover:text-blue-700">Sửa</button>
                </div>
            </div>

            <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">Ngày sinh</div>
                        <div className="text-base font-medium text-gray-900">
                            {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : <span className="text-gray-400">Chưa cập nhật</span>}
                        </div>
                    </div>
                    <button onClick={onEdit} className="ml-2 text-sm text-blue-600 hover:text-blue-700">Sửa</button>
                </div>
            </div>

            <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">Giới tính</div>
                        <div className="text-base font-medium text-gray-900">{user?.gender || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                    </div>
                    <button onClick={onEdit} className="ml-2 text-sm text-blue-600 hover:text-blue-700">Sửa</button>
                </div>
            </div>

            <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">Mã số thuế</div>
                        <div className="text-base font-medium text-gray-900">{user?.taxId || <span className="text-gray-400">Chưa cập nhật</span>}</div>
                    </div>
                    <button onClick={onEdit} className="ml-2 text-sm text-blue-600 hover:text-blue-700">Sửa</button>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Địa chỉ</div>
                <div className="text-base font-medium text-gray-900">{user?.address || <span className="text-gray-400">Chưa cập nhật</span>}</div>
            </div>
            <button onClick={onEdit} className="ml-4 text-sm text-blue-600 hover:text-blue-700">Sửa</button>
        </div>
    </div>
);

export default ProfileView;
