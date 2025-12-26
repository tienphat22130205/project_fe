import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const BookingSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get('bookingId');
  const tourName = searchParams.get('tourName') || 'Tour du lịch';
  const paymentMethod = searchParams.get('paymentMethod');
  const amount = searchParams.get('amount') || '0';

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
    }
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt Tour Thành Công!</h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi
          </p>

          {/* Booking Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="grid gap-4">
              <div className="flex items-start">
                <span className="font-semibold text-gray-700 w-32">Mã booking:</span>
                <span className="text-gray-900 font-mono">{bookingId}</span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 w-32">Tour:</span>
                <span className="text-gray-900">{tourName}</span>
              </div>

              {paymentMethod === 'bank_transfer' && (
                <>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Thanh toán:</span>
                    <span className="text-gray-900">Chuyển khoản ngân hàng</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Số tiền:</span>
                    <span className="text-red-600 font-semibold">
                      {Number(amount).toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                </>
              )}

              {paymentMethod === 'cash' && (
                <div className="flex items-start">
                  <span className="font-semibold text-gray-700 w-32">Thanh toán:</span>
                  <span className="text-gray-900">Tiền mặt tại văn phòng</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <FaClock className="mr-2" />
              Các bước tiếp theo:
            </h3>
            <ul className="text-blue-800 text-sm space-y-2 ml-6 list-disc">
              {paymentMethod === 'bank_transfer' ? (
                <>
                  <li>Vui lòng hoàn tất thanh toán trong vòng <strong>24 giờ</strong></li>
                  <li>Sau khi chuyển khoản, chúng tôi sẽ xác nhận booking qua email/điện thoại</li>
                  <li>Bạn có thể kiểm tra trạng thái booking trong tài khoản của mình</li>
                </>
              ) : (
                <>
                  <li>Vui lòng đến văn phòng của chúng tôi để thanh toán</li>
                  <li>Mang theo mã booking: <strong>{bookingId}</strong></li>
                  <li>Nhân viên sẽ hướng dẫn bạn hoàn tất thủ tục</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-4">Thông tin liên hệ:</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-orange-500" />
                <span>Hotline: <strong>1900 1808</strong></span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-orange-500" />
                <span>Email: <strong>support@saigontourist.net</strong></span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-orange-500" />
                <span>
                  Địa chỉ: <strong>45 Lê Thánh Tôn, Quận 1, TP.HCM</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate('/account?tab=orders')}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Xem đơn hàng
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Về trang chủ
            </button>
          </div>
        </div>

        {/* Additional Note */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>
            Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua hotline hoặc email
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
