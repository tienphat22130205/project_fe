import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaStar, FaUsers } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import type { ComboItem } from './data';
import { comboStyles } from './styles';

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

  const handleClose = useCallback(() => {
    setSelectedCombo(null);
    setQuantity(1);
    setStartDate('');
  }, []);

  useEffect(() => {
    if (!selectedCombo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose, selectedCombo]);

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
    <section className={comboStyles.list.section}>
      <div className={comboStyles.list.headingWrap}>
        <h2 className={comboStyles.list.title}>Các combo nổi bật</h2>
        <p className={comboStyles.list.subtitle}>Khám phá những gói combo du lịch hấp dẫn nhất</p>
      </div>

      <div className={comboStyles.list.grid}>
        {combos.map((combo) => (
          <div
            key={combo.id}
            className={comboStyles.list.card}
          >
            <div className={comboStyles.list.imageWrap}>
              <img src={combo.image} alt={combo.title} className={comboStyles.list.image} />
              <div className={comboStyles.list.badge}>
                Giá tốt
              </div>
            </div>
            <div className={comboStyles.list.body}>
              <div className={comboStyles.list.locationRow}>
                <FaMapMarkerAlt className={comboStyles.list.locationIcon} />
                <span className={comboStyles.list.locationText}>{combo.location}</span>
              </div>
              <h3 className={comboStyles.list.cardTitle}>{combo.title}</h3>
              <div className={comboStyles.list.ratingRow}>
                <div className={comboStyles.list.rating.wrap}>
                  <FaStar className={comboStyles.list.rating.star} />
                  <span className={comboStyles.list.rating.text}>{combo.rating}</span>
                </div>
                <div className={comboStyles.list.reviews.wrap}>
                  <FaUsers className={comboStyles.list.reviews.icon} />
                  <span>{combo.reviews} đánh giá</span>
                </div>
              </div>
              <div className={comboStyles.list.footer}>
                <div>
                  <span className={comboStyles.list.priceLabel}>Giá từ</span>
                  <div className={comboStyles.list.price}>{combo.price}đ</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(combo)}
                  className={comboStyles.list.action}
                >
                  Xem & đặt combo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCombo && (
        <div
          className={comboStyles.modal.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Đặt combo"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className={comboStyles.modal.panel}>
            <div className={comboStyles.modal.header}>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedCombo.title}</h3>
                <p className="text-sm text-gray-600">{selectedCombo.location}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className={comboStyles.modal.close}
                aria-label="Đóng"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className={comboStyles.modal.formBox}>
              <div className={comboStyles.modal.grid}>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Giá combo</div>
                  <div className="text-xl font-bold text-red-600">{selectedCombo.price}đ</div>
                </div>
                <div>
                  <label className={comboStyles.modal.label} htmlFor="startDate">
                    Ngày khởi hành
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={comboStyles.modal.input}
                  />
                </div>
                <div>
                  <label className={comboStyles.modal.label} htmlFor="comboQuantity">
                    Số lượng
                  </label>
                  <input
                    id="comboQuantity"
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value || 1))}
                    className={comboStyles.modal.input}
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Tổng tạm tính</div>
                  <div className="text-lg font-bold text-gray-900">{formatVnd(totalPrice)}đ</div>
                </div>
              </div>
            </div>

            <div className={comboStyles.modal.actions}>
              <button
                type="button"
                onClick={handleClose}
                className={comboStyles.modal.cancel}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={comboStyles.modal.confirm}
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
