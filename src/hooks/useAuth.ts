import { useState, useEffect } from 'react';
import { authService } from '../features/Login/server';
import type { User } from '../features/Account/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());

  useEffect(() => {
    const checkAuth = () => {
      setUser(authService.getCurrentUser());
    };

    // Listen for storage changes (when user logs in from another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const logout = async (navigate?: (path: string) => void) => {
    await authService.logout();
    setUser(null);

    // Trigger storage event để các components khác cập nhật
    window.dispatchEvent(new Event('storage'));

    // Redirect về trang chủ sau khi đăng xuất
    if (navigate) {
      navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const updateUser = () => {
    setUser(authService.getCurrentUser());
  };

  const isAuthenticated = (): boolean => {
    return !!user;
  };

  const getUserAvatar = (): string => {
    if (user?.avatar) {
      return user.avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&background=0D8ABC&color=fff&size=200`;
  };

  return {
    user,
    logout,
    updateUser,
    refreshProfile: useState<() => Promise<User>>(() => authService.getProfile.bind(authService))[0],
    isAuthenticated,
    getUserAvatar,
  };
};
