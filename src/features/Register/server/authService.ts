import { apiClient } from './api';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role?: string;
    avatar?: string;
  };
}

class AuthService {
  /**
   * Đăng ký tài khoản mới
   */
  async register(formData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 'success' && response.data) {
        // Chỉ trả về data, không lưu token (người dùng phải tự đăng nhập)
        const userData = {
          ...response.data,
          user: {
            ...response.data.user,
            avatar: response.data.user.avatar || this.getDefaultAvatar(response.data.user.fullName),
          },
        };
        
        // Không gọi saveAuthData để người dùng phải tự đăng nhập
        return userData;
      } else {
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại';
      console.error('Lỗi đăng ký:', errorMessage);
      throw error;
    }
  }

  /**
   * Lưu thông tin xác thực
   */
  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Tạo avatar mặc định dựa trên tên
   */
  private getDefaultAvatar(fullName: string): string {
    const name = encodeURIComponent(fullName || 'User');
    return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=200`;
  }
}

export const authService = new AuthService();
