import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUsers, FaTicketAlt } from 'react-icons/fa';
import type { Ticket } from './data';
import { formatPrice } from './utils';

type Props = {
  tickets: Ticket[];
};

export default function TicketsGrid({ tickets }: Props) {
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
                <Link
                  to={`/dich-vu/ve-tham-quan/${ticket.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-1"
                >
                  <FaTicketAlt />
                  Đặt vé
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
