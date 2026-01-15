import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaStar, FaUsers, FaTicketAlt, FaTimes } from 'react-icons/fa';
import type { Ticket } from './data';
import { formatPrice } from './utils';

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

  const handleClose = () => {
    setSelectedTicket(null);
    setVisitDate('');
    setQuantity(1);
  };

  useEffect(() => {
    if (!selectedTicket) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTicket]);

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
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Vé tham quan & vui chơi</h2>
        <p className="text-gray-600">Tìm thấy {tickets.length} vé phù hợp</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
              {ticket.badge && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {ticket.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="flex items-center gap-1 text-white text-sm">
                  <FaMapMarkerAlt className="text-xs" />
                  <span>{ticket.location}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                {ticket.title}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm font-semibold text-gray-900">{ticket.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <FaUsers className="text-xs" />
                  <span>{ticket.reviews}</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                <div>
                  {ticket.originalPrice > ticket.price && (
                    <div className="text-xs text-gray-400 line-through mb-1">{formatPrice(ticket.originalPrice)}đ</div>
                  )}
                  <div className="text-xl font-bold text-red-600">{formatPrice(ticket.price)}đ</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(ticket)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-1"
                >
                  <FaTicketAlt />
                  Xem & đặt vé
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bảng nhỏ đặt vé */}
      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Đặt vé tham quan"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-600">{selectedTicket.location}</p>
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
                  <div className="text-xs text-gray-500 mb-1">Giá vé</div>
                  <div className="text-xl font-bold text-red-600">{formatPrice(selectedTicket.price)}đ</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block" htmlFor="visitDate">
                    Ngày đi
                  </label>
                  <input
                    id="visitDate"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block" htmlFor="quantity">
                    Số lượng
                  </label>
                  <input
                    id="quantity"
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
                  <div className="text-lg font-bold text-gray-900">{formatPrice(totalPrice)}đ</div>
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
                Xác nhận đặt vé
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
