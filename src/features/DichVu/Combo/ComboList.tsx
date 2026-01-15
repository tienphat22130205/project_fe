import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaStar, FaUsers } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import type { ComboItem } from './data';

type Props = {
  combos: ComboItem[];
};

export default function ComboList({ combos }: Props) {
  const [selectedCombo, setSelectedCombo] = useState<ComboItem | null>(null);
  const [startDate, setStartDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const parseComboPrice = (price: string) => {
    const normalized = price.replace(/\./g, '');
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
  };

  const comboPriceNumber = useMemo(() => {
    if (!selectedCombo) return 0;
    return parseComboPrice(selectedCombo.price);
  }, [selectedCombo]);

  const totalPrice = useMemo(() => {
    return Math.max(1, quantity) * comboPriceNumber;
  }, [comboPriceNumber, quantity]);

  const formatVnd = (value: number) => new Intl.NumberFormat('vi-VN').format(value);

  const handleOpen = (combo: ComboItem) => {
    setSelectedCombo(combo);
    setQuantity(1);
    setStartDate('');
  };

  const handleClose = () => {
    setSelectedCombo(null);
    setQuantity(1);
    setStartDate('');
  };

  useEffect(() => {
    if (!selectedCombo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCombo]);

  const handleConfirm = () => {
    if (!selectedCombo) return;
    if (!startDate) {
      toast.error('Vui lòng chọn ngày khởi hành.');
      return;
    }
    toast.success('Đã ghi nhận yêu cầu đặt combo. Chúng tôi sẽ liên hệ sớm!');
    handleClose();
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Các combo nổi bật</h2>
        <p className="text-gray-600">Khám phá những gói combo du lịch hấp dẫn nhất</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={combo.image} alt={combo.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Giá tốt
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-gray-400 text-sm" />
                <span className="text-sm text-gray-600">{combo.location}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{combo.title}</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{combo.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FaUsers className="text-sm" />
                  <span>{combo.reviews} đánh giá</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500">Giá từ</span>
                  <div className="text-2xl font-bold text-red-600">{combo.price}đ</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(combo)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                >
                  Xem & đặt combo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bảng nhỏ đặt combo */}
      {selectedCombo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Đặt combo"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedCombo.title}</h3>
                <p className="text-sm text-gray-600">{selectedCombo.location}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Đóng"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Giá combo</div>
                  <div className="text-xl font-bold text-red-600">{selectedCombo.price}đ</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block" htmlFor="startDate">
                    Ngày khởi hành
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block" htmlFor="comboQuantity">
                    Số lượng
                  </label>
                  <input
                    id="comboQuantity"
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value || 1))}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Tổng tạm tính</div>
                  <div className="text-lg font-bold text-gray-900">{formatVnd(totalPrice)}đ</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition"
              >
                Xác nhận đặt combo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
