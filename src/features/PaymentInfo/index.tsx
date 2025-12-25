import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaCopy, FaUniversity } from 'react-icons/fa';

const PaymentInfo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState<string>('');

  const bookingId = searchParams.get('bookingId');
  const bankName = searchParams.get('bankName');
  const accountNumber = searchParams.get('accountNumber');
  const accountName = searchParams.get('accountName');
  const amount = searchParams.get('amount');
  const transferContent = searchParams.get('transferContent');

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
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-green-600 text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt Tour Thành Công!</h1>
          <p className="text-gray-600 mb-4">Cảm ơn bạn đã đặt tour. Vui lòng chuyển khoản để hoàn tất đặt chỗ.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Mã đặt tour</p>
            <p className="text-xl font-bold text-blue-600">{bookingId}</p>
          </div>
        </div>

        {/* Bank Transfer Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <FaUniversity className="text-blue-600 text-3xl" />
            <h2 className="text-2xl font-bold text-gray-900">Thông Tin Chuyển Khoản</h2>
          </div>

          <div className="space-y-4">
            {/* Bank Name */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Ngân hàng</label>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{bankName}</span>
              </div>
            </div>

            {/* Account Number */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Số tài khoản</label>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{accountNumber}</span>
                <button
                  onClick={() => copyToClipboard(accountNumber || '', 'account')}
                  className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Sao chép"
                >
                  <FaCopy />
                  {copied === 'account' && <span className="ml-2 text-xs text-green-600">Đã sao chép!</span>}
                </button>
              </div>
            </div>

            {/* Account Name */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Tên tài khoản</label>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{accountName}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200">
              <label className="block text-sm font-medium text-gray-600 mb-1">Số tiền cần chuyển</label>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {parseInt(amount || '0').toLocaleString('vi-VN')} đ
                </span>
                <button
                  onClick={() => copyToClipboard(amount || '', 'amount')}
                  className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Sao chép"
                >
                  <FaCopy />
                  {copied === 'amount' && <span className="ml-2 text-xs text-green-600">Đã sao chép!</span>}
                </button>
              </div>
            </div>

            {/* Transfer Content */}
            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nội dung chuyển khoản <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{transferContent}</span>
                <button
                  onClick={() => copyToClipboard(transferContent || '', 'content')}
                  className="ml-2 p-2 text-yellow-700 hover:bg-yellow-100 rounded"
                  title="Sao chép"
                >
                  <FaCopy />
                  {copied === 'content' && <span className="ml-2 text-xs text-green-600">Đã sao chép!</span>}
                </button>
              </div>
              <p className="text-xs text-red-600 mt-2">
                ⚠️ Vui lòng nhập chính xác nội dung này để chúng tôi xác nhận thanh toán
              </p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="font-bold text-blue-900 mb-2">Lưu ý quan trọng:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Vui lòng chuyển khoản đúng số tiền và nội dung như trên</li>
              <li>Sau khi chuyển khoản, vui lòng chờ 5-10 phút để hệ thống xác nhận</li>
              <li>Bạn có thể kiểm tra trạng thái đơn hàng tại mục "Đơn hàng của tôi"</li>
              <li>Nếu cần hỗ trợ, vui lòng liên hệ: 1900 1808</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => window.location.href = '/account?tab=orders'}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Xem đơn hàng của tôi
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
