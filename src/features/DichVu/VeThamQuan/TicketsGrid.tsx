import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaStar, FaUsers, FaTicketAlt, FaTimes } from 'react-icons/fa';
import type { Ticket } from './data';
import { formatPrice } from './utils';
import { veThamQuanStyles } from './styles';

type Props = {
  tickets: Ticket[];
};

export default function TicketsGrid({ tickets }: Props) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [visitDate, setVisitDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    if (!selectedTicket) return 0;
    return Math.max(1, quantity) * selectedTicket.price;
  }, [quantity, selectedTicket]);

  const handleOpen = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setVisitDate('');
  };

  const handleClose = useCallback(() => {
    setSelectedTicket(null);
    setVisitDate('');
    setQuantity(1);
  }, []);

  useEffect(() => {
    if (!selectedTicket) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose, selectedTicket]);

  const handleConfirm = () => {
    if (!selectedTicket) return;
    if (!visitDate) {
      toast.error('Vui lòng chọn ngày đi.');
      return;
    }
    toast.success('Đã ghi nhận yêu cầu đặt vé. Chúng tôi sẽ liên hệ sớm!');
    handleClose();
  };

  return (
    <section className={veThamQuanStyles.grid.section}>
      <div className={veThamQuanStyles.grid.headingWrap}>
        <h2 className={veThamQuanStyles.grid.title}>Vé tham quan & vui chơi</h2>
        <p className={veThamQuanStyles.grid.subtitle}>Tìm thấy {tickets.length} vé phù hợp</p>
      </div>

      <div className={veThamQuanStyles.grid.cards}>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={veThamQuanStyles.grid.card}
          >
            <div className={veThamQuanStyles.grid.imageWrap}>
              <img src={ticket.image} alt={ticket.title} className={veThamQuanStyles.grid.image} />
              {ticket.badge && (
                <div className={veThamQuanStyles.grid.badge}>
                  {ticket.badge}
                </div>
              )}
              <div className={veThamQuanStyles.grid.overlay}>
                <div className={veThamQuanStyles.grid.overlayRow}>
                  <FaMapMarkerAlt className="text-xs" />
                  <span>{ticket.location}</span>
                </div>
              </div>
            </div>
            <div className={veThamQuanStyles.grid.body}>
              <h3 className={veThamQuanStyles.grid.cardTitle}>
                {ticket.title}
              </h3>
              <div className={veThamQuanStyles.grid.metaRow}>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm font-semibold text-gray-900">{ticket.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <FaUsers className="text-xs" />
                  <span>{ticket.reviews}</span>
                </div>
              </div>
              <div className={veThamQuanStyles.grid.priceRow}>
                <div>
                  {ticket.originalPrice > ticket.price && (
                    <div className="text-xs text-gray-400 line-through mb-1">{formatPrice(ticket.originalPrice)}đ</div>
                  )}
                  <div className="text-xl font-bold text-red-600">{formatPrice(ticket.price)}đ</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(ticket)}
                  className={veThamQuanStyles.grid.action}
                >
                  <FaTicketAlt />
                  Xem & đặt vé
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div
          className={veThamQuanStyles.modal.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Đặt vé tham quan"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className={veThamQuanStyles.modal.panel}>
            <div className={veThamQuanStyles.modal.header}>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-600">{selectedTicket.location}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className={veThamQuanStyles.modal.close}
                aria-label="Đóng"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className={veThamQuanStyles.modal.formBox}>
              <div className={veThamQuanStyles.modal.grid}>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Giá vé</div>
                  <div className="text-xl font-bold text-red-600">{formatPrice(selectedTicket.price)}đ</div>
                </div>
                <div>
                  <label className={veThamQuanStyles.modal.label} htmlFor="visitDate">
                    Ngày đi
                  </label>
                  <input
                    id="visitDate"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className={veThamQuanStyles.modal.input}
                  />
                </div>
                <div>
                  <label className={veThamQuanStyles.modal.label} htmlFor="quantity">
                    Số lượng
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value || 1))}
                    className={veThamQuanStyles.modal.input}
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Tổng tạm tính</div>
                  <div className="text-lg font-bold text-gray-900">{formatPrice(totalPrice)}đ</div>
                </div>
              </div>
            </div>

            <div className={veThamQuanStyles.modal.actions}>
              <button
                type="button"
                onClick={handleClose}
                className={veThamQuanStyles.modal.cancel}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={veThamQuanStyles.modal.confirm}
              >
                Xác nhận đặt vé
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
