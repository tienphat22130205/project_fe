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
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
              Tóm tắt thông tin về chuyến đi
            </h2>
            <div className="space-y-2 text-gray-900">
              <div className="flex items-start gap-2">
                <MdLocationOn className="mt-1 flex-shrink-0" size={20} />
                <span>
                  <strong>Điểm khởi hành:</strong> {tourData.startLocation.address}
                </span>
              </div>
              <p><strong>Thời gian:</strong> {tourData.duration} ngày</p>
              <p><strong>Mô tả:</strong> {tourData.description}</p>
            </div>
            <button className="mt-4 flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors focus:outline-none">
              <MdPrint size={20} />
              Print to PDF
            </button>
          </div>

          {tourData.policies && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                Chính sách khuyến mãi
              </h2>
              <ul className="space-y-2 text-gray-900">
                <li>- {tourData.policies.groupDiscount}</li>
                {tourData.policies.note.map((note, index) => (
                  <li key={index}>- {note}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
              Tour này có gì hấp dẫn
            </h2>
            <ul className="space-y-2 text-gray-900">
              {tourData.includes.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
            Lịch khởi hành
          </h2>

          {/* Dropdown chọn ngày khởi hành */}
          {tourData.departures.length > 1 && (
            <div className="mb-6">
              <select
                value={selectedDeparture}
                onChange={(e) => setSelectedDeparture(Number(e.target.value))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none transition-colors cursor-pointer bg-white"
              >
                {tourData.departures.map((dep, index) => (
                  <option key={dep._id} value={index}>
                    {formatDate(dep.startDate)} - {dep.availableSeats} chỗ trống
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Thông tin ngày khởi hành */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Ngày khởi hành:</span>
              <span className="text-red-600 font-bold text-xl">{formatDate(currentDeparture.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Thời gian:</span>
              <span className="text-red-600 font-bold text-xl">{tourData.duration} ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Ngày kết thúc:</span>
              <span className="font-semibold text-gray-900 text-xl">{formatDate(currentDeparture.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Số chỗ còn:</span>
              <span className="text-green-600 font-bold text-xl">{currentDeparture.availableSeats}</span>
            </div>
          </div>

          {/* Bảng giá tour */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Giá tour</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột trái - Người lớn & Trẻ em */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Người lớn</span>
                  <span className="text-xl font-bold text-red-600">
                    {adultPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Trẻ em</span>
                    <p className="text-sm text-gray-600">Tour nước ngoài: áp dụng từ 2 đến dưới 12 tuổi</p>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    {childPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
              {/* Cột phải - Em bé & Phụ thu */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Em bé</span>
                    <p className="text-sm text-gray-600">Tour nước ngoài: áp dụng từ Dưới 2 tuổi</p>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    {infantPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-semibold text-gray-900">Phụ thu phòng đơn</span>
                  <span className="text-xl font-bold text-red-600">
                    {(adultPrice * 0.25).toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Code tour */}
          <div className="flex justify-between items-center py-4 px-6 bg-white border-2 border-gray-200 rounded-lg">
            <span className="text-lg font-semibold text-gray-900">Code tour</span>
            <span className="text-xl font-bold text-red-600">{tourData.tourCode}</span>
          </div>

          {/* Chọn số lượng khách */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Chọn số lượng khách</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-lg font-semibold text-gray-900">Người lớn</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xl font-bold">{adultCount}</span>
                  <button
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-lg font-semibold text-gray-900">Trẻ em</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xl font-bold">{childCount}</span>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-semibold text-gray-900">Em bé</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xl font-bold">{infantCount}</span>
                  <button
                    onClick={() => setInfantCount(infantCount + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tổng tiền và nút đặt tour */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-gray-200">
            <div className="text-center md:text-left">
              <div className="text-base text-gray-600 mb-1">Tổng tiền</div>
              <div className="text-4xl font-bold text-red-600">
                {totalPrice.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <div className="text-center">
              <div className="text-base text-gray-600 mb-1">Tổng số khách</div>
              <div className="text-3xl font-bold text-gray-900">{totalGuests}</div>
            </div>
            <button 
              onClick={() => window.location.href = '/booking'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none"
            >
              Đặt tour
            </button>
          </div>
        </div>
      )}

      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
            Hành trình du lịch
          </h2>

          {tourData.itinerary.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                <span className="font-semibold text-gray-900">
                  {item.title} {item.meals.length > 0 && `(Ăn ${item.meals.join(', ').toLowerCase()})`}
                </span>
                <MdExpandMore
                  className={`transform ${expandedDay === item.day ? 'rotate-180' : ''}`}
                  size={24}
                />
              </button>
              {expandedDay === item.day && (
                <div className="p-4 text-gray-900">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách giá
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('included')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">Giá tour bao gồm</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'included' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'included' && (
              <div className="p-4 text-sm text-gray-900">
                {tourData.includes.map((item, index) => (
                  <p key={index}>· {item}</p>
                ))}
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('excluded')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">Giá tour không bao gồm</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'excluded' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'excluded' && (
              <div className="p-4 text-sm text-gray-900">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách hủy / phạt
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('cancel')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">Chính sách hủy tour</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'cancel' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'cancel' && (
              <div className="p-4 text-sm text-gray-900 space-y-3">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
            Thông tin khác
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">Liên hệ</span>
              <MdExpandMore
                className={`transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'contact' && (
              <div className="p-4 text-sm text-gray-900">
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
