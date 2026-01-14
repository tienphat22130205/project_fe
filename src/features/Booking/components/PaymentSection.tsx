import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaTimes, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { applyVoucher, fetchMyVouchers } from '../../Vouchers/server';
import type { ApplyVoucherResponse, Voucher } from '../../Vouchers/server';

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
  onCancel: () => void;
  submitting?: boolean;
  totalAmount?: number;
  onVoucherApplied?: (discountAmount: number, voucherCode: string) => void;
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
  onCancel,
  submitting = false,
  totalAmount = 0,
  onVoucherApplied,
}) => {
  const [applyingVoucher, setApplyingVoucher] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<ApplyVoucherResponse | null>(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [myVouchers, setMyVouchers] = useState<Voucher[]>([]);
  const [loadingVouchers, setLoadingVouchers] = useState(false);

  // Load vouchers when modal opens
  useEffect(() => {
    if (showVoucherModal) {
      loadVouchers();
    }
  }, [showVoucherModal]);

  const loadVouchers = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setVoucherMessage({ type: 'error', text: 'Vui lòng đăng nhập để xem voucher' });
      setShowVoucherModal(false);
      return;
    }

    setLoadingVouchers(true);
    try {
      const vouchers = await fetchMyVouchers(token);
      // Lọc chỉ lấy voucher còn hiệu lực
      const validVouchers = vouchers.filter(v => {
        const isExpired = new Date(v.endDate) < new Date();
        return v.isActive && !isExpired && !v.isUsed;
      });
      setMyVouchers(validVouchers);
    } catch (error) {
      console.error('Error loading vouchers:', error);
      setVoucherMessage({ type: 'error', text: 'Không thể tải danh sách voucher' });
    } finally {
      setLoadingVouchers(false);
    }
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    setPromoCode(voucher.code);
    setShowVoucherModal(false);
    // Tự động apply voucher sau khi chọn
    setTimeout(() => {
      handleApplyVoucherWithCode(voucher.code);
    }, 100);
  };

  const handleApplyVoucherWithCode = async (code: string) => {
    if (!code.trim()) {
      setVoucherMessage({ type: 'error', text: 'Vui lòng nhập mã voucher' });
      return;
    }

    setApplyingVoucher(true);
    setVoucherMessage(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setVoucherMessage({ type: 'error', text: 'Vui lòng đăng nhập để áp dụng voucher' });
        return;
      }

      console.log('Applying voucher:', {
        voucherCode: code,
        orderAmount: totalAmount,
      });

      const result = await applyVoucher(token, {
        voucherCode: code,
        orderAmount: totalAmount,
      });

      console.log('Apply voucher result:', result);

      // Check cả isValid và success
      if (result.success && (result.isValid || result.isValid === undefined)) {
        const discount = result.discountAmount || 0;
        setVoucherMessage({ 
          type: 'success', 
          text: `Áp dụng voucher thành công! Giảm ${discount.toLocaleString('vi-VN')}đ` 
        });
        setAppliedVoucher(result);
        if (onVoucherApplied) {
          onVoucherApplied(discount, code);
        }
      } else {
        console.error('Voucher apply failed:', result);
        setVoucherMessage({ type: 'error', text: result.message || 'Voucher không hợp lệ hoặc không áp dụng được' });
        setAppliedVoucher(null);
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
      setVoucherMessage({ type: 'error', text: 'Có lỗi xảy ra khi áp dụng voucher' });
      setAppliedVoucher(null);
    } finally {
      setApplyingVoucher(false);
    }
  };

  const handleApplyVoucher = async () => {
    await handleApplyVoucherWithCode(promoCode);
  };

  const handleRemoveVoucher = () => {
    setPromoCode('');
    setAppliedVoucher(null);
    setVoucherMessage(null);
    if (onVoucherApplied) {
      onVoucherApplied(0, '');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Tỷ lệ thanh toán</h2>

      {/* Payment Rate Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => setPaymentRate('100')}
          className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded font-medium text-sm sm:text-base ${paymentRate === '100'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Thanh toán 100% ✓
        </button>
        <button
          onClick={() => setPaymentRate('50')}
          className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded font-medium text-sm sm:text-base ${paymentRate === '50'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
            }`}
        >
          Thanh toán 50%
        </button>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-700">
        Sau khi đặt cọc, quý khách vui lòng hoàn tất thanh toán trong <strong>48h</strong>
        <ul className="mt-2 ml-3 sm:ml-4 list-disc text-red-600">
          <li>Chỉ áp dụng cho thành viên easytrip.com</li>
          <li>Chỉ áp dụng cho thanh toán online hoặc đặt cọc</li>
        </ul>
      </div>

      {/* Promo Code */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium mb-2">Mã khuyến mãi</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={appliedVoucher !== null}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm disabled:bg-gray-100 pr-10"
              placeholder="Nhập mã voucher"
            />
            <button
              onClick={() => setShowVoucherModal(true)}
              disabled={appliedVoucher !== null}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              title="Chọn voucher của tôi"
            >
              <FaTicketAlt className="text-lg sm:text-xl" />
            </button>
          </div>
          {appliedVoucher ? (
            <button 
              onClick={handleRemoveVoucher}
              className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded font-medium hover:bg-red-700 text-sm sm:text-base"
            >
              Xóa
            </button>
          ) : (
            <button 
              onClick={handleApplyVoucher}
              disabled={applyingVoucher || !promoCode.trim()}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
            >
              {applyingVoucher ? 'Đang xử lý...' : 'ÁP DỤNG'}
            </button>
          )}
        </div>

        {/* Voucher Message */}
        {voucherMessage && (
          <div className={`mt-2 text-sm ${
            voucherMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {voucherMessage.text}
          </div>
        )}

        {/* Applied Voucher Details */}
        {appliedVoucher && appliedVoucher.voucher && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800">{appliedVoucher.voucher.name}</p>
                <p className="text-sm text-green-700">{appliedVoucher.voucher.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  -{appliedVoucher.discountAmount?.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <h3 className="font-bold text-gray-800 mb-4">Chọn một trong các phương thức sau:</h3>

      <div className="space-y-3">
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
              Sau khi đặt vé thành công và chuyển khoản qua tài khoản EasyTrip, nhân viên sẽ gửi liên hệ Quý khách qua email/ ĐT.
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
            <div className="font-semibold text-gray-800">Thanh toán bằng tiền mặt tại văn phòng EasyTrip</div>
            <div className="text-sm text-gray-600 mt-1">
              Quý khách vui lòng đến các văn phòng EasyTrip để thanh toán và nhận vé.
            </div>
          </div>
        </label>
      </div>

      {/* Terms Agreement */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded">
        <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <div className="text-xs sm:text-sm text-gray-700">
            Tôi đã đọc và đồng ý{' '}
            <a href="#" className="text-blue-600 hover:underline">
              điều khoản
            </a>
          </div>
        </label>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700 max-h-32 sm:max-h-40 overflow-y-auto border-t pt-3">
          <h4 className="font-bold mb-2">I. Thông tin điều khoản và điều kiện áp dụng cho Tour trọn gói</h4>
          <p className="mb-2">
            Điều khoản này là sự thoả thuận đồng ý của Quý khách khi sử dụng dịch vụ thanh toán trên trang web{' '}
            <a href="#" className="text-blue-600">www.easytrip.com</a> của Công ty EasyTrip...
          </p>
          <p className="mb-2">
            <strong>1/ Giải thích từ ngữ</strong><br />
            Điều khoản: là những điều quy định giữa EasyTrip và quý khách
          </p>
          <p className="mb-2">
            Bên thứ ba: là những đơn vị liên kết với EasyTrip (OnePay, Vietcombank) nhằm hỗ trợ việc thanh toán qua mạng cho quý khách
          </p>
        </div>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-orange-600">
          Vui lòng điền thông tin chính xác. Sau khi gửi, bạn không thể thay đổi.
        </div>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="mt-4 sm:mt-6 border-t pt-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          Đơn hàng của bạn sẽ được gửi sau khi bạn đến bước tiếp theo (Bạn có thể chọn phương thức thanh toán ở trang tiếp theo)
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-white text-red-600 border-2 border-red-600 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-lg hover:bg-red-50 transition-colors"
          >
            Hủy đặt tour
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Đang xử lý...' : 'Thanh toán'}
          </button>
        </div>
      </div>

      {/* Voucher Modal */}
      {showVoucherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">Chọn voucher của bạn</h3>
              <button
                onClick={() => setShowVoucherModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingVouchers ? (
                <div className="flex justify-center items-center py-10">
                  <FaSpinner className="text-3xl text-blue-600 animate-spin" />
                </div>
              ) : myVouchers.length === 0 ? (
                <div className="text-center py-10">
                  <FaTicketAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Bạn chưa có voucher nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myVouchers.map((voucher) => {
                    const isEligible = totalAmount >= voucher.minOrderValue;
                    const discountText = voucher.discountType === 'percentage' 
                      ? `Giảm ${voucher.discountValue}%` 
                      : `Giảm ${voucher.discountValue.toLocaleString('vi-VN')}đ`;

                    return (
                      <div
                        key={voucher._id}
                        className={`border rounded-lg p-4 ${
                          isEligible 
                            ? 'border-blue-200 bg-white hover:shadow-md cursor-pointer' 
                            : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        } transition-shadow`}
                        onClick={() => isEligible && handleSelectVoucher(voucher)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
                              <FaTicketAlt className="text-white text-lg" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 mb-1 truncate">
                              {voucher.name || voucher.description}
                            </h4>
                            
                            <div className="mb-2">
                              <span className="inline-block px-2 py-1 bg-blue-50 border border-blue-300 rounded text-blue-700 font-mono text-xs font-semibold">
                                {voucher.code}
                              </span>
                            </div>

                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-blue-600">{discountText}</span>
                              </div>
                              
                              <div>Đơn tối thiểu: <span className="font-medium">{voucher.minOrderValue.toLocaleString('vi-VN')}đ</span></div>
                              
                              {voucher.maxDiscountAmount && (
                                <div>Giảm tối đa: <span className="font-medium">{voucher.maxDiscountAmount.toLocaleString('vi-VN')}đ</span></div>
                              )}

                              <div className="flex items-center gap-1 pt-1">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>HSD: {new Date(voucher.endDate).toLocaleDateString('vi-VN')}</span>
                              </div>
                            </div>

                            {!isEligible && (
                              <div className="mt-2">
                                <span className="text-xs text-red-600">
                                  Đơn hàng chưa đủ {voucher.minOrderValue.toLocaleString('vi-VN')}đ
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <button
                onClick={() => setShowVoucherModal(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
