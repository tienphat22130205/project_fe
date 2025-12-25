import React from 'react';

interface PaymentSectionProps {
  paymentRate: string;
  setPaymentRate: (rate: string) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  onSubmit: () => void;
  submitting?: boolean;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentRate,
  setPaymentRate,
  promoCode,
  setPromoCode,
  paymentMethod,
  setPaymentMethod,
  agreedToTerms,
  setAgreedToTerms,
  onSubmit,
  submitting = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Tỷ lệ thanh toán</h2>

      {/* Payment Rate Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setPaymentRate('100')}
          className={`px-6 py-2 rounded font-medium ${
            paymentRate === '100'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Thanh toán 100% ✓
        </button>
        <button
          onClick={() => setPaymentRate('50')}
          className={`px-6 py-2 rounded font-medium ${
            paymentRate === '50'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Thanh toán 50%
        </button>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 text-sm text-gray-700">
        Sau khi đặt cọc, quý khách vui lòng hoàn tất thanh toán trong <strong>48h</strong>
        <ul className="mt-2 ml-4 list-disc text-red-600">
          <li>Chỉ áp dụng cho thành viên saigontourist.net</li>
          <li>Chỉ áp dụng cho thanh toán online hoặc đặt cọc</li>
        </ul>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Mã khuyến mãi</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600">
            ÁP DỤNG
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 className="font-bold text-gray-800 mb-4">Chọn một trong các phương thức sau:</h3>
      
      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="atm"
            checked={paymentMethod === 'atm'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
          <div>
            <div className="font-semibold text-gray-800">Thanh toán bằng thẻ nội địa ATM</div>
            <div className="text-sm text-gray-600 mt-1">
              Sau khi đặt vé và thanh toán thành công, Lữ hành Saigontourist sẽ gửi vé điện tử của Quý khách qua email.
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
          <div>
            <div className="font-semibold text-gray-800">Thanh toán bằng Thẻ Tín Dụng</div>
            <div className="text-sm text-gray-600 mt-1">
              Sau khi đặt vé và thanh toán thành công, Lữ hành Saigontourist sẽ gửi vé điện tử của Quý khách qua email.
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="bank_transfer"
            checked={paymentMethod === 'bank_transfer'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
          <div>
            <div className="font-semibold text-gray-800">Thanh toán chuyển khoản qua ngân hàng</div>
            <div className="text-sm text-gray-600 mt-1">
              Sau khi đặt vé thành công và chuyển khoản qua tài khoản Saigontourist, nhân viên sẽ gửi liên hệ Quý khách qua email/ ĐT.
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
          <div>
            <div className="font-semibold text-gray-800">Thanh toán bằng tiền mặt tại văn phòng Lữ hành Saigontourist</div>
            <div className="text-sm text-gray-600 mt-1">
              Quý khách vui lòng đến các văn phòng Saigontourist để thanh toán và nhận vé.
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="momo"
            checked={paymentMethod === 'momo'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
          <div>
            <div className="font-semibold text-gray-800">Thanh toán bằng Momo</div>
            <div className="text-sm text-gray-600 mt-1">
              Hạn mức tối đa là 20.000.000 VNĐ. Sau khi đặt vé và thanh toán thành công, Lữ hành Saigontourist sẽ gửi vé điện tử của Quý khách qua email.
            </div>
          </div>
        </label>
      </div>

      {/* Terms Agreement */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <div className="text-sm text-gray-700">
            Tôi đã đọc và đồng ý{' '}
            <a href="#" className="text-blue-600 hover:underline">
              điều khoản
            </a>
          </div>
        </label>

        <div className="mt-4 text-sm text-gray-700 max-h-40 overflow-y-auto border-t pt-3">
          <h4 className="font-bold mb-2">I. Thông tin điều khoản và điều kiện áp dụng cho Tour trọn gói</h4>
          <p className="mb-2">
            Điều khoản này là sự thoả thuận đồng ý của Quý khách khi sử dụng dịch vụ thanh toán trên trang web{' '}
            <a href="#" className="text-blue-600">www.saigontourist.net</a> của Công ty Dịch vụ Lữ hành Saigontourist...
          </p>
          <p className="mb-2">
            <strong>1/ Giải thích từ ngữ</strong><br />
            Điều khoản: là những điều quy định giữa Lữ hành Saigontourist và quý khách
          </p>
          <p className="mb-2">
            Bên thứ ba: là những đơn vị liên kết với Lữ hành Saigontourist (OnePay, Vietcombank) nhằm hỗ trợ việc thanh toán qua mạng cho quý khách
          </p>
        </div>

        <div className="mt-4 text-sm text-orange-600">
          Vui lòng điền thông tin chính xác. Sau khi gửi, bạn không thể thay đổi.
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-600 mb-4">
          Đơn hàng của bạn sẽ được gửi sau khi bạn đến bước tiếp theo (Bạn có thể chọn phương thức thanh toán ở trang tiếp theo)
        </p>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Đang xử lý...' : 'Thanh toán'}
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
