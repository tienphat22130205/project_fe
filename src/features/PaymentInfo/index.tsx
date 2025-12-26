import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCopy, FaUniversity, FaClock } from 'react-icons/fa';

const PaymentInfo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const bookingId = searchParams.get('bookingId');
  const bankName = searchParams.get('bankName');
  const accountNumber = searchParams.get('accountNumber');
  const accountName = searchParams.get('accountName');
  const amount = searchParams.get('amount');
  const transferContent = searchParams.get('transferContent');
  const tourName = searchParams.get('tourName');

  const handleTransferComplete = () => {
    const params = new URLSearchParams({
      bookingId: bookingId || '',
      tourName: tourName || '',
      paymentMethod: 'bank_transfer',
      amount: amount || '0'
    });
    navigate(`/booking-success?${params.toString()}`);
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Timer expired - redirect to home
      alert('Hết thời gian thanh toán. Vui lòng đặt lại tour.');
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <FaUniversity className="text-blue-600" />
          Thông Tin Chuyển Khoản
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Transfer Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="space-y-6">
                {/* Bank Name */}
                <div className="border-b border-gray-100 pb-4">
                  <label className="block text-sm text-gray-500 mb-1">Ngân hàng</label>
                  <div className="text-lg font-semibold text-gray-900">{bankName}</div>
                </div>

                {/* Account Number */}
                <div className="border-b border-gray-100 pb-4">
                  <label className="block text-sm text-gray-500 mb-1">Số tài khoản</label>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-blue-600 tracking-wide">{accountNumber}</span>
                    <button
                      onClick={() => copyToClipboard(accountNumber || '', 'account')}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Sao chép"
                    >
                      <FaCopy size={18} />
                    </button>
                    {copied === 'account' && <span className="text-xs text-green-600 font-medium">Đã sao chép!</span>}
                  </div>
                </div>

                {/* Account Name */}
                <div className="border-b border-gray-100 pb-4">
                  <label className="block text-sm text-gray-500 mb-1">Tên tài khoản</label>
                  <div className="text-lg font-semibold text-gray-900 uppercase">{accountName}</div>
                </div>

                {/* Amount */}
                <div className="border-b border-gray-100 pb-4">
                  <label className="block text-sm text-gray-500 mb-1">Số tiền cần chuyển</label>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-red-600">
                      {parseInt(amount || '0').toLocaleString('vi-VN')} đ
                    </span>
                    <button
                      onClick={() => copyToClipboard(amount || '', 'amount')}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Sao chép"
                    >
                      <FaCopy size={18} />
                    </button>
                    {copied === 'amount' && <span className="text-xs text-green-600 font-medium">Đã sao chép!</span>}
                  </div>
                </div>

                {/* Transfer Content */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Nội dung chuyển khoản <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-dashed border-gray-300 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{transferContent}</span>
                    <button
                      onClick={() => copyToClipboard(transferContent || '', 'content')}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      title="Sao chép"
                    >
                      <FaCopy size={18} />
                    </button>
                  </div>
                  {copied === 'content' && <div className="text-right mt-1"><span className="text-xs text-green-600 font-medium">Đã sao chép!</span></div>}
                  <p className="text-xs text-red-500 mt-2 italic">
                    * Vui lòng nhập chính xác nội dung này để hệ thống tự động xác nhận
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleTransferComplete}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
              >
                <FaCheckCircle className="text-xl" />
                Tôi đã chuyển khoản
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>

          {/* Right Column: Timer & QR */}
          <div className="lg:col-span-1 space-y-6">
            {/* Timer - Sidebar Style */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-gray-600" size={16} />
                <div className="text-sm text-gray-700 font-medium">Thời gian thanh toán còn lại:</div>
              </div>
              <div className={`text-3xl font-bold ${timeLeft < 120 ? 'text-red-600' : 'text-orange-500'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Đơn hàng sẽ tự động hủy nếu quá hạn thanh toán
              </p>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 text-center">
              <div className="mb-2 font-medium text-gray-900">Quét mã để thanh toán</div>
              <div className="bg-white p-2 inline-block rounded-lg shadow-inner border border-gray-100">
                <img
                  src={`https://img.vietqr.io/image/VCB-${accountNumber}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent || '')}&accountName=${encodeURIComponent(accountName || '')}`}
                  alt="QR Code"
                  className="w-full h-auto object-contain max-w-[280px]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Sử dụng App ngân hàng hoặc Ví điện tử để quét
              </p>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Cần hỗ trợ?</h3>
              <p className="text-sm text-blue-800">
                Hotline: <span className="font-bold">1900 1808</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
