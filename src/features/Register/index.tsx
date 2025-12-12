import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaTimes, FaSync, FaUser } from 'react-icons/fa';

interface RegisterProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const generateInitialCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Register: React.FC<RegisterProps> = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState(generateInitialCaptcha());

  // Generate random captcha
  const generateCaptcha = () => {
    setCaptchaText(generateInitialCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check captcha
    if (captchaInput !== captchaText) {
      alert('Captcha không đúng. Vui lòng thử lại!');
      generateCaptcha();
      return;
    }
    
    // Handle register logic here
    console.log('Register', { email, password, name });
  };

  const handleGoogleLogin = () => {
    console.log('Google register');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook register');
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
            <h2 className="text-3xl font-bold mb-2">Đăng ký</h2>
            <p className="text-blue-100">
              Tạo tài khoản để bắt đầu chuyến phiêu lưu của bạn
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
                Đăng ký với Google
              </span>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group focus:outline-none"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="font-medium text-gray-700 group-hover:text-blue-600">
                Đăng ký với Facebook
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác thực Captcha
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập mã captcha"
                    required
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 px-6 py-3 rounded-lg border-2 border-blue-300 relative select-none">
                  <span className="text-2xl font-bold text-blue-700 tracking-wider" style={{ fontFamily: 'monospace', textDecoration: 'line-through wavy rgba(59, 130, 246, 0.3)' }}>
                    {captchaText}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
                  title="Tạo lại captcha"
                >
                  <FaSync className="text-xl" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] shadow-lg focus:outline-none"
            >
              Đăng ký
            </button>
          </form>

          {/* Toggle to Login */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Đã có tài khoản?</span>
            <button
              onClick={onSwitchToLogin}
              className="ml-2 text-blue-500 hover:text-blue-600 font-semibold focus:outline-none"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
