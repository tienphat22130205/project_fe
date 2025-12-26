import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authService } from './server';

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authService.login({
        email,
        password,
      });

      console.log('Đăng nhập thành công!', result);
      toast.success(`Chào mừng ${result.user.fullName}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Đóng modal sau khi đăng nhập thành công
      onClose();
      // Dispatch custom event để Header cập nhật
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại!';
      console.error('Lỗi đăng nhập:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log('Facebook login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10 bg-transparent focus:outline-none"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Header with travel background */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/back1.jpg" 
              alt="Travel" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Đăng nhập
            </h2>
            <p className="text-blue-100">
              Chào mừng trở lại! Hãy đăng nhập để khám phá thế giới
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group focus:outline-none"
            >
              <FaGoogle className="text-red-500 text-xl" />
              <span className="font-medium text-gray-700 group-hover:text-blue-600">
                Đăng nhập với Google
              </span>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group focus:outline-none"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="font-medium text-gray-700 group-hover:text-blue-600">
                Đăng nhập với Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] shadow-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Toggle to Register */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Chưa có tài khoản?</span>
            <button
              onClick={onSwitchToRegister}
              className="ml-2 text-blue-500 hover:text-blue-600 font-semibold focus:outline-none"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
