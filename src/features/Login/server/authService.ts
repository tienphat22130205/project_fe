import { apiClient } from './api';

export interface LoginData {
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
   * Đăng nhập
   */
  async login(formData: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 'success' && response.data) {
        // Thêm avatar mặc định nếu user chưa có
        const userData = {
          ...response.data,
          user: {
            ...response.data.user,
            avatar: response.data.user.avatar || this.getDefaultAvatar(response.data.user.fullName),
          },
        };
        
        this.saveAuthData(userData);
        return userData;
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      console.error('Lỗi đăng nhập:', errorMessage);
      throw error;
    }
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post('/api/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    } finally {
      // Xóa tokens dù API có lỗi hay không
      this.clearAuthData();
    }
  }

  /**
   * Lưu thông tin xác thực
   */
  private saveAuthData(data: AuthResponse): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  /**
   * Xóa thông tin xác thực
   */
  private clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

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
   * Lấy access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
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
