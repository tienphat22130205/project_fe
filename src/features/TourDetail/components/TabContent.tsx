import React, { useState } from 'react';
import { MdLocationOn, MdPrint, MdExpandMore } from 'react-icons/md';
import type { TourAPI } from '../server/types';

interface TabContentProps {
  activeTab: string;
  tourData: TourAPI;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tourData }) => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('included');
  const [selectedDeparture, setSelectedDeparture] = useState(0);

  const currentDeparture = tourData.departures[selectedDeparture] || tourData.departures[0];
  const adultPrice = currentDeparture?.pricing.adult || tourData.price;
  const childPrice = currentDeparture?.pricing.child || tourData.price * 0.5;
  const infantPrice = currentDeparture?.pricing.infant || tourData.price * 0.25;

  const totalPrice = adultCount * adultPrice + childCount * childPrice + infantCount * infantPrice;
  const totalGuests = adultCount + childCount + infantCount;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Tóm tắt thông tin về chuyến đi
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <MdLocationOn className="mt-1 flex-shrink-0" size={20} />
                <span>
                  <strong>Điểm khởi hành:</strong> {tourData.startLocation.address}
                </span>
              </div>
              <p><strong>Thời gian:</strong> {tourData.duration} ngày</p>
              <p><strong>Mô tả:</strong> {tourData.description}</p>
            </div>
            <button className="mt-4 flex items-center gap-2 text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors">
              <MdPrint size={20} />
              Print to PDF
            </button>
          </div>

          {tourData.policies && (
            <div>
              <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
                Chính sách khuyến mãi
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>- {tourData.policies.groupDiscount}</li>
                {tourData.policies.note.map((note, index) => (
                  <li key={index}>- {note}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Tour này có gì hấp dẫn
            </h2>
            <ul className="space-y-2 text-gray-700">
              {tourData.includes.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Lịch khởi hành
          </h2>

          {tourData.departures.length > 1 && (
            <div>
              <label className="block font-semibold mb-2">Chọn ngày khởi hành:</label>
              <select
                value={selectedDeparture}
                onChange={(e) => setSelectedDeparture(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {tourData.departures.map((dep, index) => (
                  <option key={dep._id} value={index}>
                    {formatDate(dep.startDate)} - {dep.availableSeats} chỗ trống
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-semibold">Ngày khởi hành: </span>
              <span className="text-red-600">{formatDate(currentDeparture.startDate)}</span>
            </div>
            <div>
              <span className="font-semibold">Thời gian: </span>
              <span className="text-red-600">{tourData.duration} ngày</span>
            </div>
            <div>
              <span className="font-semibold">Ngày kết thúc: </span>
              <span>{formatDate(currentDeparture.endDate)}</span>
            </div>
            <div>
              <span className="font-semibold">Số chỗ còn: </span>
              <span className="text-green-600">{currentDeparture.availableSeats}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Giá tour</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Người lớn</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Em bé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">
                      {adultPrice.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">
                      {infantPrice.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse border border-gray-300 mt-4">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Trẻ em</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">
                      {childPrice.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-b">
            <span className="font-semibold">Code tour</span>
            <span className="text-red-600 font-bold">{tourData.tourCode}</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Chọn số lượng khách</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Người lớn</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{adultCount}</span>
                  <button
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Trẻ em</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{childCount}</span>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Em bé</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{infantCount}</span>
                  <button
                    onClick={() => setInfantCount(infantCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
            <div>
              <div className="text-sm text-gray-600">Tổng tiền</div>
              <div className="text-3xl font-bold text-red-600">
                {totalPrice.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Tổng số khách</div>
              <div className="text-2xl font-bold">{totalGuests}</div>
            </div>
            <button 
              onClick={() => window.location.href = '/booking'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Đặt tour
            </button>
          </div>
        </div>
      )}

      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Hành trình du lịch
          </h2>

          {tourData.itinerary.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-semibold">
                  {item.title} {item.meals.length > 0 && `(Ăn ${item.meals.join(', ').toLowerCase()})`}
                </span>
                <MdExpandMore
                  className={`transform ${expandedDay === item.day ? 'rotate-180' : ''}`}
                  size={24}
                />
              </button>
              {expandedDay === item.day && (
                <div className="p-4 text-gray-700">
                  <p>{item.description}</p>
                  {item.accommodation && (
                    <p className="text-sm italic mt-2">
                      <strong>Lưu trú:</strong> {item.accommodation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách giá
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('included')}
              className="w-full flex justify-between items-center p-4 bg-gray-50"
            >
              <span className="font-semibold">Giá tour bao gồm</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'included' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'included' && (
              <div className="p-4 text-sm text-gray-700">
                {tourData.includes.map((item, index) => (
                  <p key={index}>· {item}</p>
                ))}
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('excluded')}
              className="w-full flex justify-between items-center p-4 bg-gray-50"
            >
              <span className="font-semibold">Giá tour không bao gồm</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'excluded' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'excluded' && (
              <div className="p-4 text-sm text-gray-700">
                {tourData.excludes.map((item, index) => (
                  <p key={index}>· {item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cancellation' && tourData.policies && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách hủy / phạt
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('cancel')}
              className="w-full flex justify-between items-center p-4 bg-gray-50"
            >
              <span className="font-semibold">Chính sách hủy tour</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'cancel' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'cancel' && (
              <div className="p-4 text-sm text-gray-700 space-y-3">
                <div>
                  <p className="font-semibold mb-2">Chính sách hủy:</p>
                  <ul className="ml-4">
                    {tourData.policies.cancellation.map((policy, index) => (
                      <li key={index}>· {policy}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Chính sách thanh toán:</p>
                  <ul className="ml-4">
                    {tourData.policies.payment.map((policy, index) => (
                      <li key={index}>· {policy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Thông tin khác
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex justify-between items-center p-4 bg-gray-50"
            >
              <span className="font-semibold">Liên hệ</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'contact' && (
              <div className="p-4 text-sm text-gray-700">
                <p>
                  Hotline: <strong>1900 1808</strong> | Email: <strong>info@saigontourist.net</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContent;
