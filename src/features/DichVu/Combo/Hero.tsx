import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import type { ComboCategory } from './data';

type Props = {
  categories: ComboCategory[];
};

export default function ComboHero({ categories }: Props) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Combo du lịch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Giải pháp hoàn hảo giúp bạn tiết kiệm chi phí, thuận tiện và tận hưởng trọn vẹn chuyến đi
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {categories.map((cat, i) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition cursor-pointer border border-white/20"
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className="text-3xl" />
                </div>
                <div className="text-sm font-medium">{cat.name}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 border-2 border-gray-400">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm khởi hành"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm đến"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg">
              <FaSearch />
              Tìm combo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
