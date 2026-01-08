import { FaCalendarAlt } from 'react-icons/fa';

type TripType = 'one-way' | 'round-trip';

type Props = {
  tripType: TripType;
  onTripTypeChange: (value: TripType) => void;
};

export default function VeMayBayHero({ tripType, onTripTypeChange }: Props) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vé Máy Bay Online</h1>
          <p className="text-xl text-blue-100">Đặt Online - Bay Giá Tốt - Dịch Vụ Chuẩn</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => onTripTypeChange('one-way')}
            className={`px-6 py-2 rounded-lg font-semibold transition border-2 ${
              tripType === 'one-way'
                ? 'bg-white text-blue-600 border-white'
                : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
            }`}
          >
            Một chiều
          </button>
          <button
            onClick={() => onTripTypeChange('round-trip')}
            className={`px-6 py-2 rounded-lg font-semibold transition border-2 ${
              tripType === 'round-trip'
                ? 'bg-white text-blue-600 border-white'
                : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
            }`}
          >
            Khứ hồi
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-blue-100/90">
          <FaCalendarAlt />
          <span>Chọn ngày bay phù hợp</span>
        </div>
      </div>
    </section>
  );
}
