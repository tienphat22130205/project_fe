import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';

type TripType = 'one-way' | 'round-trip';

type Props = {
  tripType: TripType;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onDepartDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
  onPassengersChange: (value: number) => void;
};

export default function VeMayBaySearchForm({
  tripType,
  from,
  to,
  departDate,
  returnDate,
  passengers,
  onFromChange,
  onToChange,
  onDepartDateChange,
  onReturnDateChange,
  onPassengersChange,
}: Props) {
  return (
    <section className="-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-2xl p-6 relative z-10 border-2 border-gray-400">
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm đi"
                value={from}
                onChange={(e) => onFromChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <div className="relative">
              <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm đến"
                value={to}
                onChange={(e) => onToChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => onDepartDateChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>
            {tripType === 'round-trip' && (
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => onReturnDateChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            )}
            <div className="relative">
              <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={passengers}
                onChange={(e) => onPassengersChange(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none appearance-none text-gray-900"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} người
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg">
            <FaSearch />
            Tìm chuyến bay
          </button>
        </div>
      </div>
    </section>
  );
}
