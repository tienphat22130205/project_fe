import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks';
import { authService } from '../../Login/server';
import type { UpdateProfileRequest, User } from '../types';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

const PersonalInfo: React.FC = () => {
  const { user, refreshProfile } = useAuth() as { user: User | null; refreshProfile?: () => Promise<User> };
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Only include fields that have values (not empty strings)
      const updateData: UpdateProfileRequest = {
        fullName: formData.fullName || undefined,
      };
      
      // Only add optional fields if they have values
      if (formData.phone && formData.phone.trim()) {
        updateData.phone = formData.phone.trim();
      }
      if (formData.dateOfBirth && formData.dateOfBirth.trim()) {
        updateData.dateOfBirth = formData.dateOfBirth.trim();
      }
      if (formData.gender && formData.gender.trim() && ['Nam', 'Nữ', 'Khác'].includes(formData.gender)) {
        updateData.gender = formData.gender as 'Nam' | 'Nữ' | 'Khác';
      }
      if (formData.address && formData.address.trim()) {
        updateData.address = formData.address.trim();
      }
      if (formData.taxId && formData.taxId.trim()) {
        updateData.taxId = formData.taxId.trim();
      }

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
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 lg:p-8 border-b border-gray-200">
        <div className="order-2 sm:order-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
        </div>
        <div className="order-1 sm:order-2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 flex-shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl sm:text-2xl font-bold">
              {formData.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {isLoading && <div className="text-center py-8 text-blue-600">Đang xử lý...</div>}

      {!isLoading && (
        <div className="p-4 sm:p-6 lg:p-8">
          {isEditing ? (
            <ProfileEdit
              formData={formData}
              onChange={handleInputChange}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileView user={user} onEdit={() => setIsEditing(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
