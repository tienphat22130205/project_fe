import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import { authService } from '../../Login/server';
import type { UpdateProfileRequest } from '../types';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

const PersonalInfo: React.FC = () => {
  const { user, refreshProfile } = useAuth() as any; // Cast to access refreshProfile temporarily
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    taxId: '',
  });

  // Fetch latest profile on mount
  React.useEffect(() => {
    const fetchLatest = async () => {
      if (refreshProfile) {
        try {
          await refreshProfile();
        } catch (error) {
          console.error("Failed to refresh profile", error);
        }
      }
    };
    fetchLatest();
  }, [refreshProfile]);

  // Update form data when user changes (initial load or after update)
  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        address: user.address || '',
        taxId: user.taxId || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updateData: UpdateProfileRequest = {
        fullName: formData.fullName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'Nam' | 'Nữ' | 'Khác',
        address: formData.address,
        taxId: formData.taxId,
      };

      await authService.updateProfile(updateData);
      toast.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Cập nhật thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
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
              {formData.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {isLoading && <div className="text-center py-4 text-blue-600">Đang xử lý...</div>}

      {!isLoading && (
        isEditing ? (
          <ProfileEdit
            formData={formData}
            onChange={handleInputChange}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        )
      )}
    </div>
  );
};

export default PersonalInfo;
