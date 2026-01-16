import { useState } from 'react';
import { FaPlane, FaClock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import type { Flight } from './data';
import { formatPrice } from './utils';
import { veMayBayStyles } from './styles';

type Props = {
  flights: Flight[];
};

export default function VeMayBayResults({ flights }: Props) {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedFlight) {
      alert(`Đã chọn chuyến bay ${selectedFlight.flightNo}`);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  return (
    <section className={veMayBayStyles.results.section}>
      <div className={veMayBayStyles.results.headingWrap}>
        <h2 className={veMayBayStyles.results.title}>Kết quả tìm kiếm</h2>
        <p className={veMayBayStyles.results.subtitle}>Tìm thấy {flights.length} chuyến bay phù hợp</p>
      </div>

      <div className={veMayBayStyles.results.list}>
        {flights.map((flight) => (
          <div
            key={flight.id}
            className={veMayBayStyles.results.card}
          >
            <div className={veMayBayStyles.results.cardGrid}>
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
                  <div className={veMayBayStyles.results.price}>{formatPrice(flight.price)}đ</div>
                </div>
                <div className={veMayBayStyles.results.seats}>
                  <FaCheckCircle />
                  {flight.seats}
                </div>
                <button 
                  onClick={() => handleSelectFlight(flight)}
                  className={veMayBayStyles.results.choose}
                >
                  Chọn chuyến bay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedFlight && (
        <div className={veMayBayStyles.modal.overlay}>
          <div className={veMayBayStyles.modal.panel}>
            <div className={veMayBayStyles.modal.header}>
              <h3 className="text-2xl font-bold text-gray-900">Xác nhận chuyến bay</h3>
              <button
                onClick={handleCloseModal}
                className={veMayBayStyles.modal.close}
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className={veMayBayStyles.modal.infoBox}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Hãng bay</div>
                  <div className="text-xl font-bold text-gray-900">{selectedFlight.airline}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedFlight.flightNo} • {selectedFlight.aircraft}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Giá vé</div>
                  <div className="text-2xl font-bold text-red-600">
                    {formatPrice(selectedFlight.price)}đ
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedFlight.departTime}</div>
                  <div className="text-sm text-gray-600 mt-1">{selectedFlight.from}</div>
                </div>
                <div className="flex-1 mx-6">
                  <div className="flex items-center">
                    <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
                    <FaPlane className="mx-2 text-blue-600" size={20} />
                    <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">
                    <FaClock className="inline mr-1" />
                    {selectedFlight.duration}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedFlight.arriveTime}</div>
                  <div className="text-sm text-gray-600 mt-1">{selectedFlight.to}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-blue-600">
                <FaCheckCircle className="mr-2" />
                <span>{selectedFlight.seats}</span>
              </div>
            </div>

            <div className={veMayBayStyles.modal.warningBox}>
              <h4 className="font-semibold text-gray-900 mb-2">Lưu ý quan trọng:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Vui lòng kiểm tra kỹ thông tin chuyến bay trước khi xác nhận</li>
                <li>• Giá vé có thể thay đổi tùy theo thời điểm đặt</li>
                <li>• Vé đã đặt không thể hoàn trả theo quy định của hãng bay</li>
              </ul>
            </div>

            <div className={veMayBayStyles.modal.actions}>
              <button
                onClick={handleCloseModal}
                className={veMayBayStyles.modal.cancel}
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmBooking}
                className={veMayBayStyles.modal.confirm}
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
