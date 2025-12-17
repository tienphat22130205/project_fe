import React, { useState } from 'react';
import { MdLocationOn, MdPrint, MdExpandMore } from 'react-icons/md';

interface TabContentProps {
  activeTab: string;
  tourData: {
    location: string;
    promotions: string[];
    highlights: string[];
    startDate: string;
    endDate: string;
    duration: string;
    price: number;
  };
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tourData }) => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('included');

  const childPrice = 1995000;
  const singleRoomSupplement = 1000000;

  const totalPrice = adultCount * tourData.price + childCount * childPrice;
  const totalGuests = adultCount + childCount + infantCount;

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
          {/* Tóm tắt thông tin */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Tóm tắt thông tin về chuyến đi
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <MdLocationOn className="mt-1 flex-shrink-0" size={20} />
                <span>
                  <strong>Điểm khởi hành:</strong> {tourData.location}
                </span>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors">
              <MdPrint size={20} />
              Print to PDF
            </button>
          </div>

          {/* Chính sách khuyến mãi */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Chính sách khuyến mãi
            </h2>
            <ul className="space-y-2 text-gray-700">
              {tourData.promotions.map((promo, index) => (
                <li key={index}>- {promo}</li>
              ))}
            </ul>
          </div>

          {/* Tour này có gì hấp dẫn */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Tour này có gì hấp dẫn
            </h2>
            <ul className="space-y-2 text-gray-700">
              {tourData.highlights.map((highlight, index) => (
                <li key={index}>- {highlight}</li>
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

          {/* Alert */}
          <div className="bg-orange-100 border-l-4 border-orange-500 px-4 py-3 rounded">
            <p className="text-orange-700 font-medium">Vui lòng chọn ngày khởi hành khác</p>
          </div>

          {/* Date Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-semibold">Ngày khởi hành: </span>
              <span className="text-red-600">{tourData.startDate}</span>
            </div>
            <div>
              <span className="font-semibold">Thời gian: </span>
              <span className="text-red-600">{tourData.duration}</span>
            </div>
            <div>
              <span className="font-semibold">Ngày kết thúc: </span>
              <span>{tourData.endDate}</span>
            </div>
          </div>

          {/* Price Table */}
          <div>
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Giá tour</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Người lớn</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Em bé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">
                      {tourData.price.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
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
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Phụ thu phòng đơn</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">
                      {singleRoomSupplement.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>· Tour nước ngoài: áp dụng từ Dưới 2 tuổi</p>
              <p>· Tour trong nước và tour Campuchia: áp dụng từ 2 đến 5 tuổi</p>
            </div>
          </div>

          {/* Code tour */}
          <div className="flex justify-between items-center py-3 border-t border-b">
            <span className="font-semibold">Code tour</span>
            <span className="text-red-600 font-bold">STN004-2025-02807</span>
          </div>

          {/* Guest Selection */}
          <div>
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">Chọn số lượng khách</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Người lớn</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{adultCount}</span>
                  <button
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
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
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{childCount}</span>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
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
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{infantCount}</span>
                  <button
                    onClick={() => setInfantCount(infantCount + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded">
            <p className="text-orange-700 text-sm">
              Hiện số chỗ của ngày khởi hành Quý khách tham khảo đang tạm kín chỗ. Vui lòng liên hệ với nhân viên.
            </p>
          </div>

          {/* Total and Book Button */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Tổng tiền</div>
              <div className="text-3xl font-bold text-red-600">
                {totalPrice.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Tổng số khách</div>
              <div className="text-2xl font-bold text-gray-800 text-center">{totalGuests}</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
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

          {/* Day 1 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleDay(1)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                Ngày 01: TP. HỒ CHÍ MINH - NHA TRANG (Ăn sáng, trưa, chiều)
              </span>
              <MdExpandMore
                className={`transform transition-transform ${expandedDay === 1 ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedDay === 1 && (
              <div className="p-4 text-gray-700 space-y-2">
                <p>
                  Đón du khách tại văn phòng lữ hành Saigontourist, bắt đầu hành trình đến với thành phố biển Nha Trang xinh đẹp.
                  Chuyến đi sẽ dừa quý khách khám phá những cung đường cao tốc hiện đại bậc nhất phía Nam...
                </p>
                <p>
                  Đến Nha Trang, quý khách nhận phòng khách sạn. Buổi chiều, xe đưa quý khách đến Làng Yến Mai Sinh. 
                  Tại đây, du khách sẽ được tận mắt chiêm ngưỡng mô hình hàng yến sống động...
                </p>
              </div>
            )}
          </div>

          {/* Day 2 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleDay(2)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                Ngày 02: NHA TRANG - ĐỐC LẾT (Ăn sáng, trưa, chiều)
              </span>
              <MdExpandMore
                className={`transform transition-transform ${expandedDay === 2 ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedDay === 2 && (
              <div className="p-4 text-gray-700">
                <p>
                  Buổi sáng, xe đưa quý khách thăm tiên đến Đốc Lết – một trong những bãi biển đẹp nhất của Khánh Hòa...
                </p>
              </div>
            )}
          </div>

          {/* Day 3 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleDay(3)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                Ngày 03: NHA TRANG - I RESORT (Ăn sáng, trưa / Chiều tự túc)
              </span>
              <MdExpandMore
                className={`transform transition-transform ${expandedDay === 3 ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedDay === 3 && (
              <div className="p-4 text-gray-700">
                <p>
                  Buổi sáng, xe đưa quý khách đến Trung tâm Suối khoáng nóng I-resort Nha Trang. 
                  Tại đây, quý khách có thể thư giãn và tận hưởng...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách giá
          </h2>

          {/* Giá tour bao gồm */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('included')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Giá tour bao gồm</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'included' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'included' && (
              <div className="p-4 text-gray-700 space-y-2 text-sm">
                <p>· Chi phí xe phục vụ theo chương trình.</p>
                <p>
                  · Chi phí khách sạn: tiêu chuẩn 2-3 khách/phòng. (Trường hợp khách thứ 3 kê giường phụ đi 
                  động từ 0.8-1.2m (extrabed).
                </p>
                <p>· Chi phí ăn – uống theo chương trình.</p>
                <p>· Chi phí tham quan theo chương trình.</p>
                <p>· Chi phí Hướng dẫn viên tiếng Việt.</p>
                <p>· Quà tặng: Nón, nước suối, khăn lạnh.</p>
              </div>
            )}
          </div>

          {/* Giá tour không bao gồm */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('excluded')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Giá tour không bao gồm</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'excluded' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'excluded' && (
              <div className="p-4 text-gray-700 space-y-2 text-sm">
                <p>
                  · Chi phí tham quan – ăn uống ngoài chương trình, giặt ủi, và các chi phí cá nhân khác...
                </p>
                <p>· Giá vé Vinwonder.</p>
              </div>
            )}
          </div>

          {/* Giá trẻ em */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('child')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Giá trẻ em</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'child' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'child' && (
              <div className="p-4 text-gray-700 space-y-2 text-sm">
                <p>
                  · Vé tour: trẻ em từ 6 đến 11 tuổi mua một nửa giá vé người lớn, trẻ em trên 11 tuổi mua vé 
                  như người lớn.
                </p>
                <p>
                  · Đối với trẻ em dưới 6 tuổi, gia đình tự lo cho bé ăn ngủ và tự trả phí tham quan (nếu có). 
                  Hai người lớn chỉ được kèm một trẻ em. Từ trẻ thứ 2 trở lên, mỗi em phải 50% giá vé người lớn.
                </p>
                <p>
                  · Tiêu chuẩn 50% giá tour bao gồm: Suất ăn, ghế ngồi và ngủ ghép chung với gia đình.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cancellation' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Chính sách hủy / phạt
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('cancel')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Lưu ý về chuyển hoặc hủy tour</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'cancel' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'cancel' && (
              <div className="p-4 text-gray-700 space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-2">a) Đối với ngày thường:</p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      · Du khách chuyển đổi tour sang ngày khác và báo trước ngày khởi hành trước 7 ngày sẽ không 
                      chịu phí (không áp dụng các tour tiết kiệm, tour khách sạn 4- 5 sao), nếu trễ hơn sẽ cần 
                      cứ theo qui định hủy phạt phía dưới và chỉ được chuyển ngày khởi hành tour một (1) lần.
                    </li>
                    <li>· Hủy vé trong vòng 24 giờ hoặc ngay ngày khởi hành, chịu phạt 90% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành từ 2 - 4 ngày, chịu phạt 50% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành từ 5 - 7 ngày, chịu phạt 30% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành 7 ngày, chịu phạt 10% tiền tour.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">b) Đối với dịp Lễ, Tết:</p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      · Du khách chuyển đổi tour sang ngày khác và báo trước ngày khởi hành trước 15 ngày sẽ không 
                      chịu phí (không áp dụng các tour khách sạn 4- 5 sao)...
                    </li>
                    <li>· Hủy vé trong vòng 24 giờ hoặc ngay ngày khởi hành, chịu phạt 100% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành từ 2 - 7 ngày, chịu phạt 80% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành từ 8 - 15 ngày, chịu phạt 50% tiền tour.</li>
                    <li>· Hủy vé trước ngày khởi hành 15 ngày, chịu phạt 20% tiền tour.</li>
                  </ul>
                </div>

                <p>
                  c) Sau khi hủy tour, du khách vui lòng đến nhận tiền trong vòng 15 ngày kể từ ngày kết thúc tour. 
                  Chúng tôi chỉ thanh toán trong khoảng thời gian nói trên.
                </p>

                <p>
                  d) Trường hợp hủy tour do sự cố khách quan như thiên tai, dịch bệnh hoặc do thuỷ, xe lửa, 
                  máy bay hoãn/hủy chuyến, Saigontourist sẽ không chịu trách nhiệm bồi thường thêm bất kỳ chi phí 
                  nào khác ngoài việc hoàn trả chi phí những dịch vụ chưa được sử dụng của tour đó.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
            Thông tin về bảo hiểm du lịch
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('insurance')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Chi tiết thông tin bảo hiểm du lịch</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'insurance' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'insurance' && (
              <div className="p-4 text-gray-700 space-y-3 text-sm">
                <p>
                  Công ty TNHH Một Thành Viên Dịch vụ Lữ hành Saigontourist thực hiện chương trình TẶNG MIỄN PHÍ 
                  BẢO HIỂM DU LỊCH NỘI ĐỊA dành cho tất cả du khách của Công ty và các chi nhánh trực thuộc tham 
                  gia tour trọn gói trên tất cả các tuyến du lịch nội địa, khởi hành trên toàn quốc, với mức bảo 
                  hiểm tối đa <strong>lên đến 150.000.000 VNĐ/khách/vụ</strong>.
                </p>
                <p>
                  Toàn bộ phí bảo hiểm được tặng miễn phí cho khách hàng của Lữ hành Saigontourist với chương trình, 
                  giá vé chất lượng dịch vụ tour không đổi.
                </p>
                <p>
                  Thông tin chi tiết, vui lòng liên hệ các văn phòng thuộc Hệ thống Lữ hành Saigontourist trên 
                  toàn quốc.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('document')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Giấy tờ tùy thân</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'document' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'document' && (
              <div className="p-4 text-gray-700 text-sm">
                <p>Vui lòng mang theo CMND/CCCD hoặc Passport còn hạn sử dụng khi đi tour.</p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-800">Liên hệ</span>
              <MdExpandMore
                className={`transform transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSection === 'contact' && (
              <div className="p-4 text-gray-700 text-sm">
                <p>
                  Mọi thắc mắc vui lòng liên hệ hotline: <strong>1900 1808</strong> hoặc email:{' '}
                  <strong>info@saigontourist.net</strong>
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
