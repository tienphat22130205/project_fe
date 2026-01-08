import { FaPlane, FaClock, FaCheckCircle } from 'react-icons/fa';
import type { Flight } from './data';
import { formatPrice } from './utils';

type Props = {
  flights: Flight[];
};

export default function VeMayBayResults({ flights }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Kết quả tìm kiếm</h2>
        <p className="text-gray-600">Tìm thấy {flights.length} chuyến bay phù hợp</p>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <div className="font-bold text-gray-900 mb-1">{flight.airline}</div>
                <div className="text-sm text-gray-600">{flight.flightNo}</div>
                <div className="text-xs text-gray-500 mt-1">{flight.aircraft}</div>
              </div>

              <div className="md:col-span-5">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{flight.departTime}</div>
                    <div className="text-sm text-gray-600 mt-1">{flight.from}</div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center">
                      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                      <FaPlane className="mx-2 text-blue-600" />
                      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="text-xs text-center text-gray-500 mt-1">
                      <FaClock className="inline mr-1" />
                      {flight.duration}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{flight.arriveTime}</div>
                    <div className="text-sm text-gray-600 mt-1">{flight.to}</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 text-right">
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Từ</span>
                  <div className="text-2xl font-bold text-red-600">{formatPrice(flight.price)}đ</div>
                </div>
                <div className="text-sm text-blue-600 mb-3 flex items-center justify-end gap-1">
                  <FaCheckCircle />
                  {flight.seats}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                  Chọn chuyến bay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
