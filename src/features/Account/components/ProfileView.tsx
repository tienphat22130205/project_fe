import React from 'react';
import type { User } from '../types';

interface ProfileViewProps {
    user: User | null;
    onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => (
    <div className="space-y-1">
        {/* Họ tên */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Họ tên</div>
            <div className="flex-1 text-gray-900 font-medium text-base">{user?.fullName || '—'}</div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>

        {/* Email */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Email</div>
            <div className="flex-1">
                <div className="text-gray-900 font-medium text-base">{user?.email}</div>
                <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Email đã xác thực
                </p>
            </div>
            <span className="text-sm text-gray-400 italic">Không thể sửa</span>
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Số điện thoại</div>
            <div className="flex-1 text-base">
                {user?.phone ? (
                    <span className="text-gray-900 font-medium">{user.phone}</span>
                ) : (
                    <span className="text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>

        {/* Ngày sinh */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Ngày sinh</div>
            <div className="flex-1 text-base">
                {user?.dateOfBirth ? (
                    <span className="text-gray-900 font-medium">{new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                ) : (
                    <span className="text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>

        {/* Giới tính */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Giới tính</div>
            <div className="flex-1 text-base">
                {user?.gender ? (
                    <span className="text-gray-900 font-medium">{user.gender}</span>
                ) : (
                    <span className="text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>

        {/* Địa chỉ */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Địa chỉ</div>
            <div className="flex-1 text-base">
                {user?.address ? (
                    <span className="text-gray-900 font-medium">{user.address}</span>
                ) : (
                    <span className="text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>

        {/* Mã số thuế */}
        <div className="flex items-center py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <div className="w-48 lg:w-56 text-gray-600 font-medium">Mã số thuế</div>
            <div className="flex-1 text-base">
                {user?.taxId ? (
                    <span className="text-gray-900 font-medium">{user.taxId}</span>
                ) : (
                    <span className="text-gray-400 italic">Chưa cập nhật</span>
                )}
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                Chỉnh sửa
            </button>
        </div>
    </div>
);

export default ProfileView;
