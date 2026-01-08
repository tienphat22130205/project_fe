import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUsers } from 'react-icons/fa';
import type { ComboItem } from './data';

type Props = {
  combos: ComboItem[];
};

export default function ComboList({ combos }: Props) {
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
                <Link
                  to={`/dich-vu/combo/${combo.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
