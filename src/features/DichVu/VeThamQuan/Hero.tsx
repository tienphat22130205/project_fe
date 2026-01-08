import { FaSearch } from 'react-icons/fa';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

export default function VeThamQuanHero({ searchQuery, onSearchQueryChange }: Props) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vé Tham Quan Sun World</h1>
          <p className="text-xl text-blue-100">Đặt Vé Online - Trải Nghiệm Ngay - Không Xếp Hàng</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 max-w-4xl mx-auto border-2 border-gray-400">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm địa điểm tham quan, công viên giải trí..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center gap-2 shadow-lg">
              <FaSearch />
              Tìm vé
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
